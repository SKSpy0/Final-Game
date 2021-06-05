class Win extends Phaser.Scene{
    constructor(){
        super("WinScene");
    }
    preload() {
        this.load.image('win', './assets/Win.png');

        this.load.audio('winSound', './assets/Win.mp3');
    }
    create() {
        //assign win sound and play it

        this.winSound = this.sound.add('winSound', {
            loop: false,
            volume: 0.5
        });
        this.winSound.play();

        // setting up image and text for win screen
        this.add.image(0, 0, 'win').setOrigin(0);
        this.add.bitmapText(centerWidth, centerHeight/3, 'customFont', 'YOU WIN', 60).setOrigin(0.5);
        this.return = this.add.bitmapText(centerWidth, centerHeight-20, 'customFont', 'Return to main menu', 36).setOrigin(0.5);
        this.replay = this.add.bitmapText(centerWidth, centerHeight-70, 'customFont', 'Restart Game', 36).setOrigin(0.5);
        this.return.setInteractive({useHandCursor: true});
        this.replay.setInteractive({useHandCursor: true});
        
        // Initialize variables
        this.clicked = false;
        this.nextScene = false;
        this.replayClicked = false;
        this.replayScene = false;

        this.return.on("pointerup", ()=> {
            this.nextScene = true;
        });

        this.replay.on("pointerup", ()=> {
            this.replayScene = true;
        })
    }

    update() {
        // Go to menu scene
        if (this.nextScene == true && this.clicked == false) {
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('MenuScene');
            })
            this.clicked = true;
        }

        //Replay play scene
        if(this.replayScene == true && this.replayClicked == false){
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                level = 1;
                this.scene.start('PlayScene');
            })
            this.replayClicked = true;
        }
    }
}