let config = {
    type: Phaser.AUTO,
    width: 540,
    height: 540,
    scene: [Play],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        }
    },
}
let game = new Phaser.Game(config);
let cursors;
let centerHeight = game.config.height/2;
let centerWidth = game.config.width/2;