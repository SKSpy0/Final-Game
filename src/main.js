let config = {
    type: Phaser.AUTO,
    width: 540,
    height: 540,
    maxLights: 25,
    scene: [Menu, Play, Load],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        }
    },
}
let game = new Phaser.Game(config);
let cursors;
let keyW, keyA, keyS, keyD, pointer;
let level;
let centerHeight = game.config.height/2;
let centerWidth = game.config.width/2;

//Render Texture and Alpha Mask taken from https://phaser.io/examples/v3/view/display/masks/spotlight
