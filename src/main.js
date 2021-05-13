let config = {
    type: Phaser.AUTO,
    width: 540,
    height: 540,
    scene: [Menu, Play],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        }
    },
}
let game = new Phaser.Game(config);
let cursors;
let keyW, keyA, keyS, keyD;
let centerHeight = game.config.height/2;
let centerWidth = game.config.width/2;

//Render Texture and Alpha Mask taken from https://phaser.io/examples/v3/view/display/masks/spotlight
