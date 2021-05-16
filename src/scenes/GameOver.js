class GameOver extends Phaser.Scene{
    constructor(){
        super("GameOverScene");
    }

    create() {
        this.add.bitmapText(centerWidth, centerHeight/2, 'customFont', 'GAME OVER', 60).setOrigin(0.5);
        this.return = this.add.bitmapText(centerWidth, centerHeight+100, 'customFont', 'Return to main menu', 28).setOrigin(0.5);
        this.return.setInteractive({useHandCursor: true});
        
        // Initialize variables
        this.clicked = false;
        this.nextScene = false;

        this.return.on("pointerup", ()=> {
            this.nextScene = true;
        });

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
    }
}