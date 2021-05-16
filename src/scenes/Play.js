class Play extends Phaser.Scene{
    constructor(){
        super("PlayScene");
    }

    preload() {
        // Loading temporary assets
        this.load.image('map1', './assets/Map01.png');
        this.load.image('map2', './assets/Map02.png');
        this.load.image('player', './assets/PlayerA.png');
        this.load.image('enemy', './assets/EnemyA.png');
        this.load.image('wave', './assets/wave2.png');
        this.load.image('bottle', './assets/bottle.png');
        this.load.image('wall', './assets/wallTest.png');
        this.load.audio('bottlePickup', './assets/glassBottlePickup.mp3');
        this.load.audio('bottleBreak', './assets/glassBottleBreak.mp3');
        this.load.audio('throw', './assets/throw.mp3');
        this.load.audio('footstep', './assets/footStep1.mp3');
    }

    create() {
        // If Player gets caught
        this.playerCaught = false;

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
            volume: 0.5
        });

        // Set cursors
        //cursors = this.input.keyboard.createCursorKeys();
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        pointer = this.input.activePointer;

        // Enables lights and sets ambient color
        this.lights.enable().setAmbientColor(0x000000);
        this.lights.enable();
        this.radiuslight = 10;
        
        // Create bottle, wall, and enemy group
        this.bottleGroup = this.add.group();
        this.wallGroup = this.add.group();
        this.enemyGroup = this.add.group({
            runChildUpdate: true
        });

        // Add player
        this.player = new Player(this, 430, 510, 'player').setOrigin(0.5).setScale(0.5);
        //this.player.setCollideWorldBounds(true);
        this.player.depth = 1;

        // Setup each level
        switch(level){
            case 1:
                this.background = this.add.image(0, 0, 'map1').setOrigin(0);
                this.levelOneSetup();
                break;
            case 2:
                this.background = this.add.image(0, 0, 'map2').setOrigin(0);
                this.levelTwoSetup();
                break;
        }
        this.background.setPipeline('Light2D');

        // Create lights (light1 for player footsteps, light2 for enemy footsteps, light3 for bottle)
        this.light1 = this.lights.addLight(this.player.x, this.player.y, 0).setColor(0xffffff).setIntensity(3);
        this.light1New = false;
        this.light1Radius = 0;

        this.light2 = this.lights.addLight(200, 200, 0).setColor(0xffffff).setIntensity(3);
        this.light2New = false;
        this.light1Radius = 0;

        // Will create a new footstep sound wave every 2 seconds
        this.waveSpawnTimer = this.time.addEvent({
            delay: 1000,
            callback: this.createFootstep,
            callbackScope: this,
            loop: true,
        });

        // Sets overlap between bottle and walls
        for (var i = 0; i < this.bottleGroup.getLength(); i++) {
            var update = this.bottleGroup.getChildren()[i];
            this.physics.add.overlap(update, this.wallGroup, (update, wallGroup) => {
                update.hitWall();
            });
        }
    }

    levelOneSetup() {
        this.newBottle(430, 460);
        this.newBottle(200, 350);
        this.spawnEnemy(460, 150, false, 2);
        this.spawnEnemy(405, 150, false, 2);
        // Boundary walls
        this.newWall(0, 0, 540, 4);
        this.newWall(0, 536, 540, 4);
        this.newWall(0, 0, 4, 540);
        this.newWall(536, 0, 4, 540);

        // Level Layout walls
        this.newWall(0, 427, 373, 113);
        this.newWall(486, 128, 60, 412);
        this.newWall(378, 340, 110, 30);
        this.newWall(109, 125, 270, 170);
        this.newWall(0, 0, 14, 540);
        this.newWall(0, 0, 540, 10);
        var exit = new Wall(this, 530, 10, 'wall', 25,117).setOrigin(0,0);
        var collider = this.physics.add.overlap(this.player, exit, (player, exit) => {
                console.log("Level Complete");
                this.physics.world.removeCollider(collider);
                this.cameras.main.fadeOut(500, 0, 0, 0);
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                    level++;
                    this.scene.start('LoadScene');
                })
        });
        this.wallGroup.add(exit);
    }

    levelTwoSetup() {
        this.player.x = 20;
        this.player.y = 500;
        this.newBottle(60, 500);
        this.newBottle(400, 490);
        this.newBottle(415, 325);

        // Boundary walls
        this.newWall(0, 0, 540, 4);
        this.newWall(0, 536, 540, 4);
        this.newWall(0, 0, 4, 540);
        this.newWall(536, 0, 4, 540);

        // Level layout walls
        this.newWall(0, 389, 159, 53);
        this.newWall(215, 389, 53, 53);
        this.newWall(344, 277, 105, 15);
        this.newWall(260, 0, 90, 159);
        this.newWall(527, 273, 14, 265);
        this.newWall(0, 530, 540, 10);
        this.newWall(350, 360, 15, 82);
        this.newWall(350, 427, 97, 15);
        this.newWall(0, 162, 12, 15);
        this.newWall(115, 162, 235, 15);
        var exit = new Wall(this, 205, 0, 'wall', 50,50).setOrigin(0,0);
        var collider = this.physics.add.overlap(this.player, exit, (player, exit) => {
                console.log("Level Complete");
                this.physics.world.removeCollider(collider);
                this.cameras.main.fadeOut(500, 0, 0, 0);
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                    level++;
                    this.scene.start('LoadScene');
                })
        });
        this.wallGroup.add(exit);
    }

    // Creates new wall in level
    newWall(x, y, width, height) {
        var wall = new Wall(this, x, y, 'wall', width, height).setOrigin(0,0);
        this.physics.add.collider(this.player, wall);
        this.wallGroup.add(wall);
    }

    // Creates New Bottles at set location (x, y)
    newBottle(x, y) {
        // Add bottle
        var bottle = new Bottle(this, x, y, 'bottle').setOrigin(0.5);
        bottle.setPipeline('Light2D');
        // Create collision check between player and bottle
        var collider = this.physics.add.overlap(this.player, bottle, (player, bottle) => {
            if (this.player.hasBottle() == false) {
                this.bottlePickupSound.play();
                this.player.pickedUpBottle();
                bottle.pickedUp();
                console.log("picked up bottle");
                this.physics.world.removeCollider(collider);
            }
        });
        this.bottleGroup.add(bottle);
    }

    //generates footsteps
    createFootstep(){
        this.light1New = true;
        this.light1Radius = 0;
        this.light1.setPosition(this.player.x, this.player.y);
        this.time.addEvent({
            delay: 500,
            callback: () => {
                this.light1New = false;
            }
        })
        //this.footStepSound.play();
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

    // Spawns new enemies (roaming: true = yes, false = no)
    // (facing: up = 1, down = 2, left = 3, right = 4)
    spawnEnemy(PosX, PosY, roaming, facing){
        let enemy = new Enemy(this, PosX, PosY, 'enemy', roaming, facing);
        enemy.setScale(0.7);
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
        this.physics.add.overlap(this.player, enemy, () => {
            if(!this.playerCaught){
                this.playerCaught = true;
            } else {
                console.log("death fade out")
                this.cameras.main.fadeOut(500, 0, 0, 0);
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('MenuScene');
            })
            }
        });

        if(roaming){
            this.physics.add.overlap(enemy, this.wallGroup, (enemy) => {
                enemy.turnAround();
            })
        }
        this.enemyGroup.add(enemy);
    }

    update() {
        // Updates player
        this.player.update();

        // Update bottles in bottle group
        for (var i = 0; i < this.bottleGroup.getLength(); i++) {
            var update = this.bottleGroup.getChildren()[i];
            update.update(this.player.x, this.player.y);

            // If bottle has been thrown
            if(update.hasThrown() == true) {
                this.player.thrownBottle();
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
                if(!this.light2New){
                    this.createBottleWave(update);
                }
            }
        }

        // Wave effect for Lights
        if(this.light1New){
            this.light1Radius += 1.8
            this.light1.setRadius(this.light1Radius);
        } else {
            this.light1Radius -= 1.8
            this.light1.setRadius(this.light1Radius);
            if(this.light1Radius <= 0){
                this.light1.setRadius(0);
            }
        } 

        // Wave effect for Lights
        if(this.light2New){
            this.light2Radius += 1.8
            this.light2.setRadius(this.light2Radius);
        } else {
            this.light2Radius -= 1.8
            this.light2.setRadius(this.light2Radius);
            if(this.light2Radius <= 0){
                this.light2.setRadius(0);
            }
        }
    
        /*if(this.player.isMoving()){
            console.log(this.player.x);
            console.log(this.player.y);
        } */
    }
}