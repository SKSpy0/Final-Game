class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        // Adds physics elements to player
        scene.physics.add.existing(this);
        
        // Adds player to scene
        this.scene.add.existing(this);

        // Set movement speed
        this.playerVelocity = 200;
    }

    update() {
        // Player movement
        if(cursors.left.isDown) {
            this.body.setVelocityX(-this.playerVelocity);
        } else if (cursors.right.isDown) {
            this.body.setVelocityX(this.playerVelocity);
        } else {
            this.body.setVelocityX(0);
        }
        if (cursors.up.isDown) {
            this.body.setVelocityY(-this.playerVelocity);
        } else if (cursors.down.isDown) {
            this.body.setVelocityY(this.playerVelocity);
        } else {
            this.body.setVelocityY(0);
        }
    }
}