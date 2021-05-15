class Play extends Phaser.Scene{
    constructor(){
        super("PlayScene");
    }

    preload() {
        // Loading temporary assets
        this.load.image('map1', './assets/Map01.png');
        this.load.image('player', './assets/tempPlayer.png');
        this.load.image('wave', './assets/wave2.png');
    }

    create() {

        // Fade in transition and camera zoom
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.cameras.main.setZoom(0.5);

        // Set cursors
        //cursors = this.input.keyboard.createCursorKeys();
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // Enables lights and sets ambient color
        this.lights.enable().setAmbientColor(0x000000);
        this.radiuslight = 10;
        
        // Add background
        var background = this.add.image(-270, -270, 'map1').setOrigin(0).setScale(2);
        background.setPipeline('Light2D');

        // Add player
        this.player = new Player(this, 600, 780, 'player').setOrigin(0.5);


        // Create lights (light1 for player footsteps, light2 for enemy footsteps, light3 for bottle)
        this.light1 = this.lights.addLight(this.player.x, this.player.y, 0).setColor(0xffffff).setIntensity(3);
        this.light1New = true;
        this.light1Radius = 0;

        this.light2 = this.lights.addLight(200, 200, 0).setColor(0xffffff).setIntensity(3);
        this.light2New = true;

        /* Camera setup
        this.cameras.main.setBounds(0, 0, 2160, 2160);
        this.cameras.main.setZoom(0.5);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setLerp(0.1, 0.1);
        */

        // Will create a new footstep sound wave every 2 seconds
        this.waveSpawnTimer = this.time.addEvent({
            delay: 1000,
            callback: this.createFootstep,
            callbackScope: this,
            loop: true,
        });
    }

    //generates footsteps
    createFootstep(){
        this.light1New = true;
        this.light1Radius = 0;
        this.light1.setPosition(this.player.x, this.player.y);
        this.time.addEvent({
            delay: 800,
            callback: () => {
                this.light1New = false;
            }
        })
        // Play audio footstep
        console.log("footstep created");
    }

    update() {
        this.player.update();

        // Wave effect for Lights
        if(this.light1New){
            this.light1Radius += 3.5
            this.light1.setRadius(this.light1Radius);
        } else {
            this.light1.setRadius(0);
        }

        /*if(this.player.isMoving()){
            console.log(this.player.x);
            console.log(this.player.y);
        }*/
        
        // Makes wave expand and stop after a certain scale is reached
        /*if(this.newWave){
            this.wave.scaleX += 0.2;
            this.wave.scaleY += 0.2;
            if(this.wave.scaleX >= 30){
                this.newWave = false;
                
            }
        } else {
            this.wave.alpha = 0;
        } */
    }
}