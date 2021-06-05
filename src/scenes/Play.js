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
        this.load.image('exit', './assets/Exit.png');

        this.load.image('lever', './assets/tempLever.png');
        this.load.image('door', './assets/tempDoor.png');
        this.load.image('seeker', './assets/tempSeeker.png');

        this.load.audio('bottlePickup', './assets/glassBottlePickup.mp3');
        this.load.audio('bottleBreak', './assets/glassBottleBreak.mp3');
        this.load.audio('throw', './assets/throw.mp3');
        this.load.audio('footstep', './assets/footStep1.mp3');
        this.load.audio('doorOpen', './assets/doorOpening.mp3');
        this.load.audio('levelbgm', './assets/ambientSong.mp3');

        // loading tilemaps
        this.load.image('tiles', './assets/VignetteEscapeTileSet.png');
        this.load.tilemapTiledJSON('level1', './assets/Level1.json');
        this.load.tilemapTiledJSON('level2', './assets/Level2.json');
        this.load.tilemapTiledJSON('level3', './assets/Level3.json');
        this.load.tilemapTiledJSON('level4', './assets/Level4.json');
        this.load.tilemapTiledJSON('level5', './assets/Level5.json');
        this.load.tilemapTiledJSON('level6', './assets/Level6.json');
    }

    create() {
        // Variables for player being caught and if game over has been initiated
        this.playerCaught = false;
        this.gameOver = false;

        // Fade in transition
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        
        //assign sounds
        this.levelBgm = this.sound.add('levelbgm', {
            loop: true,
            volume: 0.12
        });
        this.levelBgm.play();
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
        this.doorOpenSound = this.sound.add('doorOpen', {
            loop: false,
            volume: 0.3
        })

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
        this.seekerGroup = this.add.group();

        // Add player
        this.player = new Player(this, 430, 510, 'player').setOrigin(0.5).setScale(0.5);
        this.player.depth = 1;
        
        // Setup each level
        switch(level){
            case 1:
                this.player.setCollideWorldBounds(true);
                this.mapSizeWidth = 540;
                this.mapSizeHeight = 540;
                // create each layer in the tilemap
                this.map = this.add.tilemap('level1');
                this.tileset = this.map.addTilesetImage('VignetteEscapeTileSet', 'tiles');
                this.backgroundLayer = this.map.createLayer('Background', this.tileset, 0, 0).setPipeline('Light2D');
                this.wallLayer = this.map.createLayer('Walls', this.tileset, 0, 0).setPipeline('Light2D');
                this.wallLayer.setCollisionByExclusion(-1, true);
                this.levelOneSetup();
                break;
            case 2:
                this.player.setCollideWorldBounds(true);
                this.mapSizeWidth = 540;
                this.mapSizeHeight = 540;
                // create each layer in the tilemap
                this.map = this.add.tilemap('level2');
                this.tileset = this.map.addTilesetImage('VignetteEscapeTileSet', 'tiles');
                this.backgroundLayer = this.map.createLayer("Background", this.tileset, 0, 0).setPipeline('Light2D');
                this.wallLayer = this.map.createLayer("Walls", this.tileset, 0, 0).setPipeline('Light2D');
                this.wallLayer.setCollisionByExclusion(-1, true);
                this.levelTwoSetup();
                break;
            case 3:
                // setup following camera
                this.mapSizeWidth = 1080;
                this.mapSizeHeight = 1080;
                this.cameras.main.setBounds(0, 0, this.mapSizeWidth, this.mapSizeHeight);
                this.cameras.main.startFollow(this.player);
                this.cameras.main.setLerp(0.1, 0.1);

                // create each layer in the tilemap
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
                // setup camera
                this.mapSizeWidth = 1080;
                this.mapSizeHeight = 1080;
                this.cameras.main.setBounds(0, 0, this.mapSizeWidth, this.mapSizeHeight);
                this.cameras.main.startFollow(this.player);
                this.cameras.main.setLerp(0.1, 0.1);

                // create each layer in the tilemap
                this.map = this.add.tilemap('level4');
                this.tileset = this.map.addTilesetImage('VignetteEscapeTileSet', 'tiles');
                this.backgroundLayer = this.map.createLayer('Background', this.tileset, 0, 0).setPipeline('Light2D');
                this.map.createLayer('Grass', this.tileset, 0, 0).setPipeline('Light2D');
                this.map.createLayer('Roads n Paths', this.tileset, 0, 0).setPipeline('Light2D');
                this.map.createLayer('physical object', this.tileset, 0, 0).setPipeline('Light2D');
                this.wallLayer = this.map.createLayer('Walls', this.tileset, 0, 0).setPipeline('Light2D');
                this.wallLayer.setCollisionByExclusion(-1, true);
                this.levelFourSetup();
                break;
            case 5:
                // setup camera
                this.mapSizeWidth = 2220;
                this.mapSizeHeight = 600;
                this.cameras.main.setBounds(0, 0, this.mapSizeWidth, this.mapSizeHeight);
                this.cameras.main.startFollow(this.player);
                this.cameras.main.setLerp(0.1, 0.1);

                // create each layer in the tilemap
                this.map = this.add.tilemap('level5');
                this.tileset = this.map.addTilesetImage('VignetteEscapeTileSet', 'tiles');
                this.map.createLayer('Grass', this.tileset, 0, 0).setPipeline('Light2D');
                this.map.createLayer('Roads/Path', this.tileset, 0, 0).setPipeline('Light2D');
                this.wallLayer = this.map.createLayer('Walls', this.tileset, 0, 0).setPipeline('Light2D');
                this.map.createLayer('Physical Objects', this.tileset, 0, 0).setPipeline('Light2D');
                this.wallLayer.setCollisionByExclusion(-1, true);
                this.levelFiveSetup();
                break;
            case 6:
                // setup camera
                this.mapSizeWidth = 720;
                this.mapSizeHeight = 720;
                this.cameras.main.setBounds(0, 0, this.mapSizeWidth, this.mapSizeHeight);
                this.cameras.main.startFollow(this.player);
                this.cameras.main.setLerp(0.1, 0.1);

                // create each layer in the tilemap
                this.map = this.add.tilemap('level6');
                this.tileset = this.map.addTilesetImage('VignetteEscapeTileSet', 'tiles');
                this.backgroundLayer = this.map.createLayer('Background', this.tileset, 0, 0).setPipeline('Light2D');
                this.map.createLayer('Roads/Paths', this.tileset, 0, 0).setPipeline('Light2D');
                this.map.createLayer('Physical Objects', this.tileset, 0, 0).setPipeline('Light2D');
                this.wallLayer = this.map.createLayer('Walls', this.tileset, 0, 0).setPipeline('Light2D');
                this.wallLayer.setCollisionByExclusion(-1, true);
                this.levelSixSetup();
                break;
        }

        // Set Collision between wall and player
        this.physics.add.collider(this.player, this.wallLayer);

        // Enables lights and sets ambient color
        this.lights.enable().setAmbientColor(0x000000);

        // Create lights (light0 is constant light around player, light1 for player footsteps, light2 for bottle, light3 for doors, seekerlight for seekers)
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

        this.seekerLight = this.lights.addLight(0, 0, 50).setColor(0xffffff).setIntensity(2);
        this.seekerLight.setRadius(0);
        this.light3Intensity = 2;

        // Interaction/Pickup text for UI
        this.bottlePickupText = this.add.bitmapText(45, 500, 'customFont', "picked up bottle", 28);
        this.bottlePickupText.setAlpha(0);
        this.bottlePickupText.setDepth(99);
        this.seekerPickupText = this.add.bitmapText(45, 500, 'customFont', "picked up seeker", 28);
        this.seekerPickupText.setAlpha(0);
        this.interactText = this.add.bitmapText(45, 500, 'customFont', "press E to interact", 28);
        this.interactText.setAlpha(0);
        this.interactText.setDepth(99);

        // Will create a new footstep sound wave 
        this.waveSpawnTimer = this.time.addEvent({
            delay: 1800,
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

        // Tutorial for Level 1
        if(level == 1){
            this.tutorialOn = true;
            var popup = this.add.group();
            var popupBack = this.add.sprite(centerWidth, centerHeight, 'popup').setOrigin(0.5);
            var text1 = this.add.bitmapText(popupBack.x, popupBack.y-110, 'customFont', 'Welcome Detective', 30).setOrigin(0.5);
            var text2 = this.add.bitmapText(popupBack.x, popupBack.y-75, 'customFont', 'You can move around with WASD', 25).setOrigin(0.5);
            var text3 = this.add.bitmapText(popupBack.x, popupBack.y-50, 'customFont', 'Pickup items and use them', 25).setOrigin(0.5);
            var text4 = this.add.bitmapText(popupBack.x, popupBack.y-25, 'customFont', 'with your mouse and LEFT CLICK', 25).setOrigin(0.5);
            var text5 = this.add.bitmapText(popupBack.x, popupBack.y, 'customFont', '', 25).setOrigin(0.5);
            var text6 = this.add.bitmapText(popupBack.x, popupBack.y+25, 'customFont', '', 25).setOrigin(0.5);
            var text7 = this.add.bitmapText(popupBack.x, popupBack.y+50, 'customFont', 'If there is a door blocking you', 25).setOrigin(0.5);
            var text8 = this.add.bitmapText(popupBack.x, popupBack.y+75, 'customFont', 'try looking for a lever to open it', 25).setOrigin(0.5);
            var next = this.add.bitmapText(popupBack.x, popupBack.y+110, 'customFont', 'Next', 30).setOrigin(0.5);
        
            popup.add(popupBack);
            popup.add(text1);
            popup.add(text2);
            popup.add(text3);
            popup.add(text4);
            popup.add(text5);
            popup.add(text6);
            popup.add(text7);
            popup.add(text8);
            popup.add(next);
            next.setInteractive({useHandCursor: true});
            next.on("pointerup", () => {
                text2.setText('Be wary of your surroundings');
                text3.setText('Sentinels patrol these parts');
                text4.setText('So do not get caught');
                text5.setText('');
                text6.setText("You're our department's best");
                text7.setText("We're counting on you");
                text8.setText('Good luck');
                next.destroy(true);
                var close = this.add.bitmapText(popupBack.x, popupBack.y+110, 'customFont', 'Close', 30).setOrigin(0.5);
                popup.add(close);
                close.setInteractive({useHandCursor: true});
                close.on("pointerup", () => {
                    this.tutorialOn = false;
                    popup.destroy(true);
                })
            })
        }
    }

    // Helper Functions for each levels setup, each will place the player, bottles, and enemies in each level and spawn the exit for each
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
        this.newSeeker(374, 440);
        // Spawn Exit
        var exit = new Wall(this, 500, 35, 'exit', 30,30).setOrigin(0,0);
        exit.setAlpha(1);
        // Setup Collision between Exit and Player
        var collider = this.physics.add.overlap(this.player, exit, (player, exit) => {
                //console.log("Level Complete");
                this.physics.world.removeCollider(collider);
                this.cameras.main.fadeOut(500, 0, 0, 0);
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                    this.levelBgm.pause();
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
        this.newSeeker(357, 58);
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
        var exit = new Wall(this, 205, 15, 'exit', 30,30).setOrigin(0,0);
        exit.setAlpha(1);
        // Setup Collision between Exit and Player
        var collider = this.physics.add.overlap(this.player, exit, (player, exit) => {
                //console.log("Level Complete");
                this.physics.world.removeCollider(collider);
                this.cameras.main.fadeOut(500, 0, 0, 0);
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                    this.levelBgm.pause();
                    level++;
                    this.scene.start('LoadScene');
                })
        });
    }

    levelThreeSetup(){
        this.player.x = 105;
        this.player.y = 1025;
        this.newSeeker(157, 810);
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
        var exit = new Wall(this, 1030, 108, 'exit', 30,30).setOrigin(0,0);
        exit.setAlpha(1);
        // Setup Collision between Exit and Player
        var collider = this.physics.add.overlap(this.player, exit, (player, exit) => {
                //console.log("Level Complete");
                this.physics.world.removeCollider(collider);
                this.cameras.main.fadeOut(500, 0, 0, 0);
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                    this.levelBgm.pause();
                    level++;
                    this.scene.start('LoadScene');
                })
        });
        this.newLeverAndDoor(270, 515, 278, 465, 4, 4);
        this.newLeverAndDoor(270, 665, 278, 615, 4, 4);
        this.newLeverAndDoor(908, 195, 998, 525, 3, 4);
    }

    levelFourSetup(){
        this.player.x = 1004;
        this.player.y = 73;
        this.newSeeker(1022, 132);
        this.newBottle(976, 132);
        this.newBottle(1035, 225);
        this.newBottle(706, 43);
        this.newBottle(555, 103);
        this.newBottle(704, 345);
        this.newBottle(373, 284);
        this.newBottle(224, 463);
        this.newBottle(168, 1007);
        this.newBottle(45, 1004);
        this.newBottle(884, 674);
        this.newBottle(705, 857);
        this.newBottle(735, 1004);
        this.newBottle(857, 824);
        this.newBottle(1034, 943);

        this.spawnEnemy(910, 195, true, 1);
        this.spawnEnemy(860, 195, true, 2);
        this.spawnEnemy(643, 225, false, 4);
        this.spawnEnemy(375, 105, false, 4);
        this.spawnEnemy(347, 165, true, 4, true);
        this.spawnEnemy(583, 367, true, 3);
        this.spawnEnemy(430, 350, true, 4);
        this.spawnEnemy(1030, 443, true, 3);
        this.spawnEnemy(1030, 480, true, 3);
        this.spawnEnemy(990, 527, false, 1);
        this.spawnEnemy(43, 344, true, 2, true);
        this.spawnEnemy(224, 555, false, 2);
        this.spawnEnemy(104, 553, false, 2);
        this.spawnEnemy(105, 463, false, 2);
        this.spawnEnemy(165, 374, true, 2, true);
        this.spawnEnemy(345, 733, true, 2, true);
        this.spawnEnemy(43, 733, true, 4, true);
        this.spawnEnemy(43, 795, true, 4, true);
        this.spawnEnemy(198, 858, true, 2, true);
        this.spawnEnemy(375, 1032, true, 1, true);
        this.spawnEnemy(433, 1032, true, 1, true);
        this.spawnEnemy(765, 765, true, 2, true);
        this.spawnEnemy(825, 764, false, 4);
        this.spawnEnemy(915, 765, false, 4);
        this.spawnEnemy(795, 1034, false, 1, true);
        this.spawnEnemy(705, 915, false, 2, true);
        this.spawnEnemy(672, 450, true, 4);

        var exit = new Wall(this, 1020, 1020, 'exit', 30,30).setOrigin(0,0);
        exit.setAlpha(1);
        var collider = this.physics.add.overlap(this.player, exit, (player, exit) => {
            //console.log("Level Complete");
            this.physics.world.removeCollider(collider);
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.levelBgm.pause();
                level++;
                this.scene.start('LoadScene');
            })
    });
    }
    levelFiveSetup() {
        this.player.x = 55;
        this.player.y = 295;
        this.newSeeker(122, 300);
        this.newBottle(105, 432);
        this.newBottle(285, 434);
        this.newBottle(287, 165);
        this.newBottle(343, 132);
        this.newBottle(343, 105);
        this.newBottle(343, 467);
        this.newBottle(343, 493);
        this.newBottle(582, 134);
        this.newBottle(583, 463);
        this.newBottle(735, 463);
        this.newBottle(828, 463);
        this.newBottle(828, 493);
        this.newBottle(735, 493);
        this.newBottle(1094, 468);
        this.newBottle(1154, 133);
        this.newBottle(1217, 378);
        this.newBottle(1312, 378);
        this.newBottle(1424, 192);
        this.newBottle(1424, 407);
        this.newBottle(1694, 518);
        this.newBottle(1872, 298);
        this.newBottle(1997, 215);
        this.newBottle(1997, 383);
        this.newBottle(1772, 490);
        this.newBottle(1772, 103);
        this.newBottle(2114, 103);
        this.newBottle(2114, 490);
        this.spawnEnemy(377, 108, true, 2, true);
        this.spawnEnemy(404, 493, true, 1, true);
        this.spawnEnemy(494, 554, true, 3, true);
        this.spawnEnemy(494, 47, true, 3, true);
        this.spawnEnemy(1242, 554, true, 3, true);
        this.spawnEnemy(1242, 47, true, 3, true);
        this.spawnEnemy(612, 467, true, 1);
        this.spawnEnemy(797, 487, true, 1, true);
        this.spawnEnemy(764, 134, true, 2, true);
        this.spawnEnemy(1004, 489, true, 1);
        this.spawnEnemy(1102, 168, true, 2);
        this.spawnEnemy(1184, 437, true, 1);
        this.spawnEnemy(1215, 135, true, 1, true);
        this.spawnEnemy(1305, 283, true, 4, true);
        this.spawnEnemy(1305, 315, true, 4, true);
        this.spawnEnemy(1725, 315, true, 3, true);
        this.spawnEnemy(1725, 283, true, 3, true);
        this.spawnEnemy(1320, 507, true, 4);
        this.spawnEnemy(1320, 92, true, 4);
        this.spawnEnemy(1882, 472, true, 4, true);
        this.spawnEnemy(1882, 130, true, 4, true);
        this.spawnEnemy(2117, 305, true, 1);
        this.newLeverAndDoor(440, 464, 1273, 374, 4, 4);
        this.newLeverAndDoor(440, 103, 1273, 224, 4, 4);
        var exit = new Wall(this, 2168, 282, 'exit', 30,30).setOrigin(0,0);
        exit.setAlpha(1);
        var collider = this.physics.add.overlap(this.player, exit, (player, exit) => {
            //console.log("Level Complete");
            this.physics.world.removeCollider(collider);
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.levelBgm.pause();
                level++;
                this.scene.start('LoadScene');
            })
        });
    }
    levelSixSetup(){
        this.player.x = 580;
        this.player.y = 605;
        this.newSeeker(528, 644);
        this.newBottle(550, 580);
        this.newBottle(615, 580);
        this.newBottle(555, 375);
        this.newBottle(565, 195);
        this.newBottle(450, 195);
        this.newBottle(375, 465);
        this.newBottle(285, 345);
        this.newBottle(105, 345);
        this.newBottle(225, 675);
        this.spawnEnemy(510, 485, true, 1);
        this.spawnEnemy(315, 415, true, 4);
        this.spawnEnemy(215, 350, false, 2);
        this.spawnEnemy(45, 415, false, 4);
        this.spawnEnemy(55, 670, true, 1);
        this.spawnEnemy(100, 655, false, 4);
        this.spawnEnemy(515, 300, true, 3);
        this.spawnEnemy(365, 235, true, 4);
        this.spawnEnemy(445, 615, true, 1);
        this.spawnEnemy(365, 115, true, 4);
        var exit = new Wall(this, 78, 78, 'exit', 30,30).setOrigin(0,0);
        exit.setAlpha(1);
        var collider = this.physics.add.overlap(this.player, exit, (player, exit) => {
            //console.log("Level Complete");
            this.physics.world.removeCollider(collider);
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.levelBgm.pause();
                //level++;
                //this.scene.start('LoadScene');
                this.scene.start('WinScene');
            })
        });
        this.newLeverAndDoor(43, 338, 313, 74, 2, 3);
        this.newLeverAndDoor(128, 614, 75, 224, 3, 2);
        this.newLeverAndDoor(343, 608, 138, 74, 2, 4);
        this.newLeverAndDoor(202, 47, 435, 585, 4, 2);
    }

    // Creates New Bottles at set location (x, y)
    newBottle(x, y) {
        // Add bottle
        var bottle = new Bottle(this, x, y, 'bottle').setOrigin(0.5);
        bottle.setPipeline('Light2D');
        // Create collision check between player and bottle
        var collider = this.physics.add.overlap(this.player, bottle, (player, bottle) => {
            if (this.player.hasBottle() == false && this.player.hasSeeker() == false) {
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
                //console.log("picked up bottle");
                this.physics.world.removeCollider(collider);
            }
        });
        this.bottleGroup.add(bottle);
    }

    // Spawns new enemies (roaming: true = yes, false = no)
    // (facing: up = 1, down = 2, left = 3, right = 4)
    spawnEnemy(PosX, PosY, roaming, facing, scaleDown){
        let enemy = new Enemy(this, PosX, PosY, 'enemy', roaming, facing);
        if (scaleDown == true) {
            enemy.setScale(0.4);
        } else {
            enemy.setScale(0.6);
        }
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
                duration: 1800,
                repeat: -1,
            });
            // looped event which will update the enemy footprint
            this.time.addEvent({
                delay: 1800,
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
    newLeverAndDoor(leverX, leverY, doorX, doorY, leverFacing, doorFacing) {
        var door = new Door(this, doorX, doorY, 'door');
        var lever = new Lever(this, leverX, leverY, 'lever');
        door.setPipeline('Light2D')
        lever.setPipeline('Light2D')
        switch(leverFacing){
            case 1:
                break;
            case 2:
                lever.angle = 180;
                break;
            case 3:
                lever.angle = -90;
                lever.rotateHitbox();
                break;
            case 4:
                lever.angle = 90;
                lever.rotateHitbox();
                break;
        }
        switch(doorFacing){
            case 1:
                break;
            case 2:
                door.angle = 180;
                break;
            case 3:
                door.angle = -90;
                door.rotateHitbox();
                break;
            case 4:
                door.angle = 90;
                door.rotateHitbox();
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
                // Create wave for door opening and sound
                this.createDoorWave(door.x, door.y);

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

    // Seeker on use stops player movement and allows use as a drone that destroys itself after 4 seconds
    newSeeker(seekerX, seekerY) {
        var seeker = new Seeker(this, seekerX, seekerY, 'seeker').setOrigin(0.5);
        seeker.setPipeline('Light2D');
        // Create collision check between player and seeker
        var collider = this.physics.add.overlap(this.player, seeker, (player, seeker) => {
            if (this.player.hasBottle() == false && this.player.hasSeeker() == false) {
                this.player.pickedUpSeeker();
                seeker.pickedUp();
                this.seekerPickupText.x = this.player.x - this.player.width;
                this.seekerPickupText.y = this.player.y - 40;
                this.seekerPickupText.setAlpha(1);
                this.time.delayedCall(1000, () => {
                    this.tweens.add({
                        targets: this.seekerPickupText,
                        alpha: 0,
                        duration: 500,
                        ease: 'Linear'
                    }, this);
                })
                this.physics.world.removeCollider(collider);
            }
        });
        this.seekerGroup.add(seeker);
    }

    //generates player footsteps
    createFootstep(){
        this.light1.setPosition(this.player.x, this.player.y);
        this.light1New = true;
        this.light1Radius = 0;
        this.time.addEvent({
            delay: 900,
            callback: () => {
                this.light1New = false;
            }
        })
        this.footStepSound.play();
        //console.log("footstep created");
    }

    // generates bottle sound wave
    createBottleWave(bottle){
        this.light2.setPosition(bottle.x, bottle.y);
        this.light2New = true;
        this.light2Radius = 0;
        this.bottleBreakSound.play();
        this.time.addEvent({
            delay: 1200,
            callback: () => {
                this.light2New = false;
            }
        })

        //console.log("bottle wave created");
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

    // generates door sound waves
    createDoorWave(x, y){
        this.light3.setPosition(x, y);
        this.light3New = true;
        this.light3Radius = 0;
        this.doorOpenSound.play();
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.light3New = false;
            }
        })
    }

    update() {
        // While tutorial is up, restrict player movement
        if(this.tutorialOn){
            this.player.x = 450;
            this.player.y = 510;
        }

        // End game when player gets caught
        if(!this.gameOver && this.playerCaught){
            this.levelBgm.pause();
            this.player.stopPlayer();
            this.cameras.main.shake(100, 0.0035);
            //console.log("death fade out")
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
                for (var j = 0; j < this.seekerGroup.getLength(); j++) {
                    var delayCall = this.seekerGroup.getChildren()[j];
                    delayCall.delay(this.time);
                }
            }
            // checks if bottle has landed
            if(update.landedCheck()){
                //console.log('bottle landed');
                // Add cracked bottle where the bottle lands
                this.add.image(update.bottleX(), update.bottleY(), 'crackedBottle');
                if(!this.light2New){
                    this.createBottleWave(update);
                }
            }
        }

        // Update seekers in seeker group
        for (var i = 0; i < this.seekerGroup.getLength(); i++) {
            var update = this.seekerGroup.getChildren()[i];
            update.update(this.player.x, this.player.y, this.time);
            // If seeker is active stop player movement, enable seeker movement an camera follow
            if(update.isActive() == true) {
                this.player.usedSeeker();
                this.player.stopPlayer();
                // Activate seeker light
                this.seekerLight.x = update.x;
                this.seekerLight.y = update.y;
                this.seekerLight.setRadius(50);
                // Set camera to follow seeker
                this.cameras.main.startFollow(update);
                this.cameras.main.setBounds(0, 0, this.mapSizeWidth, this.mapSizeHeight);
                this.cameras.main.setLerp(0.1, 0.1);
                // Set a delay for using the next seeker
                for (var j = 0; j < this.seekerGroup.getLength(); j++) {
                    var delayCall = this.seekerGroup.getChildren()[j];
                    delayCall.delay(this.time);
                }
                for (var j = 0; j < this.bottleGroup.getLength(); j++) {
                    var delayCall = this.bottleGroup.getChildren()[j];
                    delayCall.delay(this.time);
                }
            }
            // checks if seeker has been destroyed
            if(update.destroyedCheck()){
                //console.log('seeker destroyed');
                this.seekerLight.setRadius(0);
                update.destroySeeker();
                // Reset camera follow and player movement. Create a particle explosion and camera shake camera reset on delay
                this.time.delayedCall(500, () => {
                    this.cameras.main.startFollow(this.player);
                    this.cameras.main.setBounds(0, 0, this.mapSizeWidth, this.mapSizeHeight);
                    this.cameras.main.setLerp(0.1, 0.1);
                })
                this.time.delayedCall(500, () => {
                    this.player.startPlayer();
                })
            }
        }
        // Keep Light0 on player
        this.light0.x = this.player.x;
        this.light0.y = this.player.y;

        // Wave effect for Footstep Lights
        if(this.light1New){
            this.light1Radius += 1.3;
            this.light1.setRadius(this.light1Radius);
            this.light1Intensity = 2;
            this.light1.setIntensity(this.light1Intensity);
        } else {
            if(this.light1Intensity > 0){
                this.light1Intensity -= 0.07;
            }
            this.light1Radius -= 1.3;
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
            this.light2Intensity = 2;
            this.light2.setIntensity(this.light2Intensity);
        } else {
            if(this.light2Intensity > 0){
                this.light2Intensity -= 0.05;
            }
            this.light2Radius -= 1.8;
            this.light2.setIntensity(this.light2Intensity);
            if(this.light2Radius <= 0){
                this.light2Radius = 0;
                this.light2.setRadius(0);
                this.light2Intensity = 2;
                this.light2.setIntensity(2);
            }
        }

        // Wave Effect for Door Lights
        if(this.light3New){
            this.light3Radius += 1.8;
            this.light3.setRadius(this.light3Radius);
            this.light3Intensity = 2;
            this.light3.setIntensity(this.light3Intensity);
        } else {
            if(this.light3Intensity > 0){
                this.light3Intensity -= 0.05;
            }
            this.light3Radius -= 1.8;
            this.light3.setIntensity(this.light3Intensity);
            if(this.light3Radius <= 0){
                this.light3Radius = 0;
                this.light3.setRadius(0);
                this.light3Intensity = 2;
                this.light3.setIntensity(2);
            }
        }

        if(keySPACE.isDown){
            console.log(this.player.x);
            console.log(this.player.y);
        }
    }
}