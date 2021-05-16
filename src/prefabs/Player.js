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

    // Returns true if player is moving
    isMoving(){
        return this.moving;
    }
    // Sets true when player is holding bottle
    pickedUpBottle() {
        this.holdingBottle = true;
    }
    // Returns true if player is holding bottle
    hasBottle() {
        return this.holdingBottle;
    }
    // Sets false when player throws bottle
    thrownBottle() {
        this.holdingBottle = false;
    }
}