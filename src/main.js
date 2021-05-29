let config = {
    type: Phaser.AUTO,
    width: 540,
    height: 540,
    maxLights: 25,
    scene: [Menu, Play, Load, GameOver],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            tileBias: 30,
        }
    },
}
let game = new Phaser.Game(config);
let cursors;
let keyW, keyA, keyS, keyD, keySPACE, pointer, keyE;
let level;
let centerHeight = game.config.height/2;
let centerWidth = game.config.width/2;

//Vignette Escape create by "Dog Squad"
//Jesse Park (Art & Sound Designer), Timothy Tai (Programmer), William Lee (Programmer)
//Completed: 5/30/21
//All sound effects obtained from https://www.zapsplat.com