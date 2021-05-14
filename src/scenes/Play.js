class Play extends Phaser.Scene{
    constructor(){
        super("PlayScene");
    }

    preload() {
        // Loading temporary assets
        this.load.image('background', './assets/kermitchoke.jpg');
        this.load.image('player', './assets/tempPlayer.png');
        this.load.image('wave', './assets/wave.png');
    }

    create() {
        // Fade in transition
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        // Set cursors
        //cursors = this.input.keyboard.createCursorKeys();
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // Add background
        this.background = this.add.image(0, 0, 'background').setOrigin(0);
        this.background.setScale(4);

        // Add player
        this.player = new Player(this, 1080, 1080, 'player').setOrigin(0.5);

        // Create wave parameters
        this.wave = this.make.sprite({
            x: 1080,
            y: 1080,
            key: 'wave',
            add: false
        });
        this.newWave = true; // Used for checking when to expand and stop a wave

        //create mask between wave and background
        this.background.mask = new Phaser.Display.Masks.BitmapMask(this, this.wave);

        // Camera setup
        this.cameras.main.setBounds(0, 0, 2160, 2160);
        this.cameras.main.setZoom(0.5);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setLerp(0.1, 0.1);

        // Wave group
        this.waveGroup = this.add.group({
            runChildUpdate:true
        });

        // Will update and move a wave to player every 2 seconds
        this.waveCreateClock = this.time.addEvent({
            delay: 2000,
            callback: this.moveWave,
            callbackScope: this,
            loop: true
        });
    }

    //moves wave to new spot
    moveWave(){
        this.wave.scaleX = 0.5;
        this.wave.scaleY = 0.5;
        this.wave.x = this.player.x;
        this.wave.y = this.player.y;
        this.wave.alpha = 1;
        this.newWave = true;
        console.log("wave created");
    }

    update() {
        this.player.update();
        
        // Makes wave expand and stop after a certain scale is reached
        if(this.newWave){
            this.wave.scaleX += 0.1;
            this.wave.scaleY += 0.1;
            if(this.wave.scaleX >= 25){
                this.newWave = false;
            }
        } else {
            this.wave.alpha = 0;
        }
    }
}