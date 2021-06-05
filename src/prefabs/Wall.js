// Wall.js is used to create our exits at each level, it's still called wall because when we try to change the name Phaser keeps breaking :(
class Wall extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, width, height){
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setAlpha(0);
        this.body.width = width;
        this.body.height = height;
        this.body.setImmovable(true);
    }
}