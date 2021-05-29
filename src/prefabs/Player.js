class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        // Adds physics elements to player
        scene.physics.add.existing(this);
        
        // Adds player to scene
        scene.add.existing(this);
        
        // Shrink player hitbox
        this.body.setSize(32);

        // Set movement speed
        this.playerVelocity = 150;

        this.holdingBottle = false;
        this.holdingSeeker = false;

        this.playerMovement = true;

    }

    update() {
        // If the player movement is true
        if(this.playerMovement) {
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

        } else {
            this.body.setVelocityX(0);
            this.body.setVelocityY(0);
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
    pickedUpSeeker() {
        this.holdingSeeker = true;
    }
    // Returns true if player is holding bottle
    hasBottle() {
        return this.holdingBottle;
    }
    // Returns true if player is holding seeker
    hasSeeker() {
        return this.holdingSeeker;
    }
    // Sets false when player throws bottle
    thrownBottle() {
        this.holdingBottle = false;
    }
    usedSeeker() {
        this.holdingSeeker = false;
    }
    // Stops player movement when hit by enemy
    stopPlayer() {
        this.playerMovement = false;
    }
    startPlayer() {
        this.playerMovement = true;
    }
}