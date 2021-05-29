class Play extends Phaser.Scene{
    constructor(){
        super("PlayScene");
    }

    preload() {
        // Loading temporary assets
        this.load.image('player', './assets/PlayerA.png');
        this.load.image('enemy', './assets/EnemyA.png');
        this.load.image('bottle', './assets/bottle.png');
        this.load.image('crackedBottle', './assets/bottleCrak.png');
        this.load.image('footprint', './assets/footPrint.png');

        this.load.image('lever', './assets/tempLever.png');
        this.load.image('door', './assets/tempDoor.png');

        this.load.audio('bottlePickup', './assets/glassBottlePickup.mp3');
        this.load.audio('bottleBreak', './assets/glassBottleBreak.mp3');
        this.load.audio('throw', './assets/throw.mp3');
        this.load.audio('footstep', './assets/footStep1.mp3');

        // loading tilemaps
        this.load.image('tiles', './assets/VignetteEscapeTileSet.png');
        this.load.tilemapTiledJSON('level1', './assets/Level1.json');
        this.load.tilemapTiledJSON('level2', './assets/Level2.json');
        this.load.tilemapTiledJSON('level3', './assets/Level3.json');
        this.load.tilemapTiledJSON('level4', './assets/Level4.json');
    }

    create() {
        // Variables for player being caught and if game over has been initiated
        this.playerCaught = false;
        this.gameOver = false;

        // Fade in transition
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        
        //assign sounds
        this.bottlePickupSound = this.sound.add('bottlePickup', {
            loop: false,
            volume: 0.5
        });
        this.bottleBreakSound = this.sound.add('bottleBreak', {
            loop: false,
            volume: 0.3
        });
        this.throwSound = this.sound.add('throw', {
            loop: false,
            volume: 1
        });
        this.footStepSound = this.sound.add('footstep', {
            loop: false,
            volume: 0.15
        });

        // Set cursors
        //cursors = this.input.keyboard.createCursorKeys();
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        pointer = this.input.activePointer;
        
        // Create bottle, wall, and enemy group
        this.bottleGroup = this.add.group();
        this.enemyGroup = this.add.group({
            runChildUpdate: true
        });
        this.doorGroup = this.add.group();

        // Add player
        this.player = new Player(this, 430, 510, 'player').setOrigin(0.5).setScale(0.5);
        this.player.depth = 1;
        
        // Setup each level
        switch(level){
            case 1:
                this.player.setCollideWorldBounds(true);
                this.map = this.add.tilemap('level1');
                this.tileset = this.map.addTilesetImage('VignetteEscapeTileSet', 'tiles');
                this.backgroundLayer = this.map.createLayer('Background', this.tileset, 0, 0).setPipeline('Light2D');
                this.wallLayer = this.map.createLayer('Walls', this.tileset, 0, 0).setPipeline('Light2D');
                this.wallLayer.setCollisionByExclusion(-1, true);
                this.levelOneSetup();
                break;
            case 2:
                this.player.setCollideWorldBounds(true);
                this.map = this.add.tilemap('level2');
                this.tileset = this.map.addTilesetImage('VignetteEscapeTileSet', 'tiles');
                this.backgroundLayer = this.map.createLayer("Background", this.tileset, 0, 0).setPipeline('Light2D');
                this.wallLayer = this.map.createLayer("Walls", this.tileset, 0, 0).setPipeline('Light2D');
                this.wallLayer.setCollisionByExclusion(-1, true);
                this.levelTwoSetup();
                break;
            case 3:
                // setup following camera
                this.cameras.main.setBounds(0, 0, 1080, 1080);
                this.cameras.main.startFollow(this.player);
                this.cameras.main.setLerp(0.1, 0.1);

                this.map = this.add.tilemap('level3');
                this.tileset = this.map.addTilesetImage('VignetteEscapeTileSet', 'tiles');
                this.backgroundLayer = this.map.createLayer('Background', this.tileset, 0, 0).setPipeline('Light2D');
                this.wallLayer = this.map.createLayer('Walls', this.tileset, 0, 0).setPipeline('Light2D');
                this.map.createLayer('Grass', this.tileset, 0, 0).setPipeline('Light2D');
                this.map.createLayer('Roads/Paths', this.tileset, 0, 0).setPipeline('Light2D');
                this.map.createLayer('Physical Objects', this.tileset, 0, 0).setPipeline('Light2D');
                this.wallLayer.setCollisionByExclusion(-1, true);
                this.levelThreeSetup();
                break;
            case 4:
                this.cameras.main.setBounds(0, 0, 1080, 1080);
                this.cameras.main.startFollow(this.player);
                this.cameras.main.setLerp(0.1, 0.1);
                this.map = this.add.tilemap('level4');
                this.tileset = this.map.addTilesetImage('VignetteEscapeTileSet', 'tiles');
                this.backgroundLayer = this.map.createLayer('Background', this.tileset, 0, 0).setPipeline('Light2D');
                this.map.createLayer('Grass', this.tileset, 0, 0).setPipeline('Light2D');
                this.map.createLayer('Roads n Paths', this.tileset, 0, 0).setPipeline('Light2D');
                this.map.createLayer('Physical Objects', this.tileset, 0, 0).setPipeline('Light2D');
                this.wallLayer = this.map.createLayer('Walls', this.tileset, 0, 0).setPipeline('Light2D');
                this.wallLayer.setCollisionByExclusion(-1, true);
                this.levelFourSetup();
                break;
        }

        // Set Collision between wall and player
        this.physics.add.collider(this.player, this.wallLayer);

        // Enables lights and sets ambient color
        this.lights.enable().setAmbientColor(0x000000);

        // Create lights (light0 is constant light around player, light1 for player footsteps, light2 for bottle, light3 for enemies
        this.light0 = this.lights.addLight(this.player.x, this.player.y, 50).setColor(0xffffff).setIntensity(1);

        this.light1 = this.lights.addLight(this.player.x, this.player.y, 0).setColor(0xffffff).setIntensity(2);
        this.light1New = false;
        this.light1Radius = 0;
        this.light1Intensity = 2;

        this.light2 = this.lights.addLight(200, 200, 0).setColor(0xffffff).setIntensity(2);
        this.light2New = false;
        this.light2Radius = 0;
        this.light2Intensity = 2;

        this.light3 = this.lights.addLight(200, 200, 0).setColor(0xffffff).setIntensity(2);
        this.light3New = false;
        this.light3Radius = 0;


        // Interaction/Pickup text for UI
        this.bottlePickupText = this.add.bitmapText(45, 500, 'customFont', "picked up bottle", 28);
        this.bottlePickupText.setAlpha(0);
        this.bottlePickupText.setDepth(99);
        this.interactText = this.add.bitmapText(45, 500, 'customFont', "press E to interact", 28);
        this.interactText.setAlpha(0);
        this.interactText.setDepth(99);

        // Will create a new footstep sound wave 
        this.waveSpawnTimer = this.time.addEvent({
            delay: 1400,
            callback: this.createFootstep,
            callbackScope: this,
            loop: true,
        });

        // Sets overlap between bottle and walls and doors
        for (var i = 0; i < this.bottleGroup.getLength(); i++) {
            var update = this.bottleGroup.getChildren()[i];
            this.physics.add.collider(update, this.wallLayer, (update, wallLayer) => {
                update.hitWall();
            });
            this.physics.add.collider(update, this.doorGroup, (update, doorGroup) => {
                update.hitWall();
            });
        }
    }

    // Setup for Level One
    levelOneSetup() {
        // Spawn Player, Bottles, and Enemies in the level
        this.player.x = 450;
        this.player.y = 510;
        this.newBottle(430, 460);
        this.newBottle(200, 350);
        this.newBottle(60, 276);
        this.newBottle(60, 126);
        this.newBottle(280, 64);
        this.spawnEnemy(485, 150, false, 2);
        this.spawnEnemy(443, 150, false, 2);

        // Spawn Exit
        var exit = new Wall(this, 500, 35, 'footprint', 30,30).setOrigin(0,0);
        exit.setAlpha(1);
        // Setup Collision between Exit and Player
        var collider = this.physics.add.overlap(this.player, exit, (player, exit) => {
                console.log("Level Complete");
                this.physics.world.removeCollider(collider);
                this.cameras.main.fadeOut(500, 0, 0, 0);
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                    level++;
                    this.scene.start('LoadScene');
                })
        });
    }

    // Setup for Level Two
    levelTwoSetup() {
        // Spawn Player, Bottles, and Enemies in the level
        this.player.x = 20;
        this.player.y = 500;
        this.newBottle(60, 500);
        this.newBottle(400, 490);
        this.newBottle(415, 325);
        this.newBottle(500, 55);
        this.newBottle(450, 55);
        this.newBottle(400, 55);
        this.spawnEnemy(40, 165, true, 2);
        this.spawnEnemy(232, 330, true, 3);
        this.spawnEnemy(315, 175, false, 4);
        this.spawnEnemy(315, 215, false, 4);

        // Spawn Exit
        var exit = new Wall(this, 205, 15, 'footprint', 30,30).setOrigin(0,0);
        exit.setAlpha(1);
        // Setup Collision between Exit and Player
        var collider = this.physics.add.overlap(this.player, exit, (player, exit) => {
                console.log("Level Complete");
                this.physics.world.removeCollider(collider);
                this.cameras.main.fadeOut(500, 0, 0, 0);
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                    level++;
                    this.scene.start('LoadScene');
                })
        });
    }

    levelThreeSetup(){
        this.player.x = 105;
        this.player.y = 1025;
        this.newBottle(160, 915);
        this.newBottle(160, 940);
        this.newBottle(160, 765);
        this.newBottle(160, 315);
        this.newBottle(160, 75);
        this.newBottle(255, 1035);
        this.newBottle(435, 975);
        this.newBottle(735, 855);
        this.newBottle(795, 855);
        this.newBottle(860, 855);
        this.newBottle(255, 155);
        this.newBottle(255, 255);
        this.newBottle(255, 285);
        this.newBottle(455, 225);
        this.newBottle(500, 225);
        this.newBottle(615, 225);
        this.newBottle(675, 225);
        this.newBottle(465, 435);
        this.newBottle(585, 645);
        this.newBottle(855, 735);
        this.newBottle(855, 525);
        this.newBottle(800, 525);
        this.newBottle(800, 465);
        this.newBottle(915, 225);
        this.newBottle(975, 975);
        this.newBottle(1035, 490);
        this.newBottle(1035, 315);
        this.spawnEnemy(205, 700, true, 1);
        this.spawnEnemy(240, 385, true, 2);
        this.spawnEnemy(360, 335, true, 2);
        this.spawnEnemy(385, 750, true, 4);
        this.spawnEnemy(465, 645, true, 1);
        this.spawnEnemy(585, 435, true, 2);
        this.spawnEnemy(645, 120, true, 3);
        this.spawnEnemy(780, 315, true, 2);
        this.spawnEnemy(960, 375, true, 1);
        this.spawnEnemy(800, 735, false, 3);
        this.spawnEnemy(680, 955, true, 4);

        // Spawn Exit
        var exit = new Wall(this, 1030, 108, 'footprint', 30,30).setOrigin(0,0);
        exit.setAlpha(1);
        // Setup Collision between Exit and Player
        var collider = this.physics.add.overlap(this.player, exit, (player, exit) => {
                console.log("Level Complete");
                this.physics.world.removeCollider(collider);
                this.cameras.main.fadeOut(500, 0, 0, 0);
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                    //level++;
                    //this.scene.start('LoadScene');
                    this.scene.start('MenuScene');
                })
        });
        this.newLeverAndDoor(270, 515, 278, 465, 4);
    }

    // Creates New Bottles at set location (x, y)
    newBottle(x, y) {
        // Add bottle
        var bottle = new Bottle(this, x, y, 'bottle').setOrigin(0.5);
        bottle.setPipeline('Light2D');
        // Create collision check between player and bottle
        var collider = this.physics.add.overlap(this.player, bottle, (player, bottle) => {
            if (this.player.hasBottle() == false) {
                // Bottle pickup text that fades out
                this.bottlePickupText.x = this.player.x - this.player.width;
                this.bottlePickupText.y = this.player.y - 40;
                this.bottlePickupText.setAlpha(1);
                this.time.delayedCall(1000, () => {
                    this.tweens.add({
                        targets: this.bottlePickupText,
                        alpha: 0,
                        duration: 500,
                        ease: 'Linear'
                    }, this);
                })
                this.bottlePickupSound.play();
                this.player.pickedUpBottle();
                bottle.pickedUp();
                console.log("picked up bottle");
                this.physics.world.removeCollider(collider);
            }
        });
        this.bottleGroup.add(bottle);
    }

    // Spawns new enemies (roaming: true = yes, false = no)
    // (facing: up = 1, down = 2, left = 3, right = 4)
    spawnEnemy(PosX, PosY, roaming, facing){
        let enemy = new Enemy(this, PosX, PosY, 'enemy', roaming, facing);
        enemy.setScale(0.6);
        enemy.setPipeline('Light2D')
        switch(facing){
            case 1:
                break;
            case 2:
                enemy.angle = 180;
                break;
            case 3:
                enemy.angle = -90;
                break;
            case 4:
                enemy.angle = 90;
                break;
        }
        // player and enemy collision will cause a game over
        this.physics.add.overlap(this.player, enemy, () => {
            if(!this.playerCaught){
                this.playerCaught = true;
            }
        });
        
        // enemy turn around if collided with a wall
        if(roaming){
            // setup enemy footprints and adjust orientation to match direction the enemy is facing
            let footprints = this.add.sprite(enemy.returnX(), enemy.returnY(), 'footprint');
            this.footprintsNew = false;
            switch(facing){
                case 1:
                    footprints.angle = 0;
                    break;
                case 2:
                    footprints.angle = 180;
                    break;
                case 3:
                    footprints.angle = -90;
                    break;
                case 4:
                    footprints.angle =  90;
                    break;
            }
            this.tweens.add ({
                targets: footprints,
                alpha: 0,
                duration: 1400,
                repeat: -1,
            });
            // looped event which will update the enemy footprint
            this.time.addEvent({
                delay: 1400,
                callback: this.createEnemyFootstep,
                args: [footprints, enemy],
                callbackScope: this,
                loop: true,
            });

            // collision between wall and enemy
            this.physics.add.collider(enemy, this.wallLayer, (enemy) => {
                // turn around enemy and fix orientation of footprints accordingly
                enemy.turnAround();
            })
        }
        this.enemyGroup.add(enemy);
    }

    // Creates a door and a lever that open/closes that door
    // (facing: up = 1, down = 2, left = 3, right = 4)
    newLeverAndDoor(leverX, leverY, doorX, doorY, facing) {
        var door = new Door(this, doorX, doorY, 'door');
        var lever = new Lever(this, leverX, leverY, 'lever');
        door.setPipeline('Light2D')
        lever.setPipeline('Light2D')
        switch(facing){
            case 1:
                break;
            case 2:
                door.angle = 180;
                lever.angle = 180;
                break;
            case 3:
                door.angle = -90;
                door.rotateHitbox();
                lever.angle = -90;
                lever.rotateHitbox();
                break;
            case 4:
                door.angle = 90;
                door.rotateHitbox();
                lever.angle = 90;
                lever.rotateHitbox();
                break;
        }
        var collider = this.physics.add.collider(this.player, door);
        this.physics.add.overlap(this.player, lever, () => {
            // Add text when near lever with fade out
            this.interactText.x = lever.x - this.interactText.width/2;
            this.interactText.y = lever.y - 40;
            this.interactText.setAlpha(1);
            this.time.delayedCall(1000, () => {
                this.tweens.add({
                    targets: this.interactText,
                    alpha: 0,
                    duration: 500,
                    ease: 'Linear'
                }, this);
            })
            if(keyE.isDown && lever.isPlayerUsing() == false) {
                // Play lever animation with a delay on the next time you can use the lever 
                lever.useLever(this.time);
                // Play door animation and set the door state
                door.openCloseDoor();
                // If the door is closed, add the collider else the door is open - remove the collider
                if(door.isOpen() == false) {
                    collider.active = true;
                } else {
                    collider.active = false;
                }
            }
        });
        this.doorGroup.add(door);
    }

    //generates player footsteps
    createFootstep(){
        this.light1New = true;
        this.light1Radius = 0;
        this.light1.setPosition(this.player.x, this.player.y);
        this.time.addEvent({
            delay: 700,
            callback: () => {
                this.light1New = false;
            }
        })
        this.footStepSound.play();
        console.log("footstep created");
    }

    // generates bottle sound wave
    createBottleWave(bottle){
        this.light2New = true;
        this.light2Radius = 0;
        this.light2.setPosition(bottle.x, bottle.y);
        this.bottleBreakSound.play();
        this.time.addEvent({
            delay: 1200,
            callback: () => {
                this.light2New = false;
            }
        })

        console.log("bottle wave created");
    }

    // generates enemy footsteps
    createEnemyFootstep(footprints, enemy){
        footprints.x = enemy.returnX();
        footprints.y = enemy.returnY(); 
        switch(enemy.checkFacing()){
            case 1:
                footprints.angle = 0;
                break;
            case 2:
                footprints.angle = 180;
                break;
            case 3:
                footprints.angle = -90;
                break;
            case 4:
                footprints.angle =  90;
                break;
        }
        this.footprintsNew = true;
    }

    update() {
        // End game when player gets caught
        if(!this.gameOver && this.playerCaught){
            console.log("death fade out")
            this.gameOver = true;
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.scene.start('GameOverScene');
            })
        }

        // Updates player
        this.player.update();

        // Update bottles in bottle group
        for (var i = 0; i < this.bottleGroup.getLength(); i++) {
            var update = this.bottleGroup.getChildren()[i];
            update.update(this.player.x, this.player.y);

            // If bottle has been thrown
            if(update.hasThrown() == true) {
                this.player.thrownBottle();
                //this.bottlePickupText.setAlpha(0);
                //this.throwSound.play();
                // Set a delay for throwing the next bottle
                for (var j = 0; j < this.bottleGroup.getLength(); j++) {
                    var delayCall = this.bottleGroup.getChildren()[j];
                    delayCall.delay(this.time);
                }
            }
            // checks if bottle has landed
            if(update.landedCheck()){
                console.log('bottle landed');
                // Add cracked bottle where the bottle lands
                this.add.image(update.bottleX(), update.bottleY(), 'crackedBottle');
                if(!this.light2New){
                    this.createBottleWave(update);
                }
            }
        }

        // Keep Light0 on player
        this.light0.x = this.player.x;
        this.light0.y = this.player.y;

        // Wave effect for Footstep Lights
        if(this.light1New){
            this.light1Radius += 1.8;
            this.light1.setRadius(this.light1Radius);
        } else {
            this.light1Intensity -= 0.01;
            this.light1Radius -= 1.8;
            this.light1.setIntensity(this.light1Intensity);
            if(this.light1Radius <= 0){
                this.light1Radius = 0;
                this.light1.setRadius(0);
                this.light1Intensity = 2;
                this.light1.setIntensity(2);
            }
        } 

        // Wave effect for Bottle Lights
        if(this.light2New){
            this.light2Radius += 1.8
            this.light2.setRadius(this.light2Radius);
        } else {
            this.light2Intensity -= 0.01;
            this.light2.setIntensity(this.light2Intensity);
            if(this.light2Intensity <= 0){
                this.light2Radius = 0;
                this.light2.setRadius(0);
                this.light2Intensity = 2;
                this.light2.setIntensity(2);
            }
        }

        /*if(keySPACE.isDown){
            console.log(this.player.x);
            console.log(this.player.y);
        } */
    }
}