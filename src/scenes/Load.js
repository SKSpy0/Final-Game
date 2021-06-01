// Load.js is called between each level 
class Load extends Phaser.Scene{
    constructor(){
        super("LoadScene");
    }

    preload() {

    }

    create() {
        // Loading text and fading effect
        this.title = this.add.bitmapText(centerWidth, centerHeight, 'customFont', 'Loading...', 60).setOrigin(0.5);
        this.time.delayedCall(1000, () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0);
		})
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('PlayScene');
        })

    }
}