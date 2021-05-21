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
            this.setAngle(-90);
            this.moving = true;
        } else if (keyD.isDown) {
            this.body.setVelocityX(this.playerVelocity);
            this.setAngle(90);
            this.moving = true;
        } else {
            this.body.setVelocityX(0);
            this.moving = false;
        }
        if (keyW.isDown) {
            this.body.setVelocityY(-this.playerVelocity);
            this.setAngle(0);
            this.moving = true;
        } else if (keyS.isDown) {
            this.body.setVelocityY(this.playerVelocity);
            this.setAngle(180);
            this.moving = true;
        } else {
            this.body.setVelocityY(0);
            this.moving = false;
        }

        // Diagonal Movement Check
        if(keyW.isDown && keyD.isDown) {
            this.setAngle(45);
        }
        if(keyW.isDown && keyA.isDown) {
            this.setAngle(-45);
        }
        if(keyD.isDown && keyS.isDown) {
            this.setAngle(135);
        }
        if(keyA.isDown && keyS.isDown) {
            this.setAngle(-135);
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