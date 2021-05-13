class Play extends Phaser.Scene{
    constructor(){
        super("PlayScene");
    }
    preload() {
        // Loading temporary assets
        this.load.image('background', './assets/kermitchoke.jpg');
        this.load.image('player', './assets/tempPlayer.png');
    }
    create() {
        // Fade in transition
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        // Set cursors
        cursors = this.input.keyboard.createCursorKeys();

        // Add background
        this.background = this.add.image(0, 0, 'background').setOrigin(0);
        this.background.setScale(4);

        // Add player
        this.player = new Player(this, 1080, 1080, 'player').setOrigin(0.5);

        // Camera setup
        this.cameras.main.setBounds(0, 0, 2160, 2160);
        this.cameras.main.setZoom(0.5);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setLerp(0.1, 0.1);
    }
    update() {
        this.player.update();
    }
}