class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        // Adds physics elements to player
        scene.physics.add.existing(this);
        
        // Adds player to scene
        scene.add.existing(this);

        // Set movement speed
        this.playerVelocity = 150;

        this.holdingBottle = false;
    }

    update() {
        // Player movement
        if(keyA.isDown) {
            this.body.setVelocityX(-this.playerVelocity);
            this.moving = true;
        } else if (keyD.isDown) {
            this.body.setVelocityX(this.playerVelocity);
            this.moving = true;
        } else {
            this.body.setVelocityX(0);
            this.moving = false;
        }
        if (keyW.isDown) {
            this.body.setVelocityY(-this.playerVelocity);
            this.moving = true;
        } else if (keyS.isDown) {
            this.body.setVelocityY(this.playerVelocity);
            this.moving = true;
        } else {
            this.body.setVelocityY(0);
            this.moving = false;
        }
    }

    isMoving(){
        return this.moving;
    }
    pickedUpBottle() {
        this.holdingBottle = true;
    }
    hasBottle() {
        return this.holdingBottle;
    }

    thrownBottle() {
        this.holdingBottle = false;
    }
}