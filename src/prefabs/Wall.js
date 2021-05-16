// Wall.js is used to create our boundaries of the level and any walls within the level
class Wall extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, width, height){
        super(scene, x, y, texture, width, height);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setAlpha(0);
        this.body.width = width;
        this.body.height = height;
        this.body.setImmovable(true);
    }
}