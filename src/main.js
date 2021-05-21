let config = {
    type: Phaser.AUTO,
    width: 540,
    height: 540,
    maxLights: 25,
    scene: [Menu, Play, Load, GameOver],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            tileBias: 30,
        }
    },
}
let game = new Phaser.Game(config);
let cursors;
let keyW, keyA, keyS, keyD, pointer;
let level;
let centerHeight = game.config.height/2;
let centerWidth = game.config.width/2;