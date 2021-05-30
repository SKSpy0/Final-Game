class Seeker extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        // Adds physics elements to seeker
        scene.physics.add.existing(this);
        
        // Adds seeker to scene
        scene.add.existing(this);

        // Initialize variables
        this.pickedUpSeeker = false;
        this.delayActive = false;
        this.seekerActive = false;
        this.timerStarted = false;
        this.destroyed = false;

        // Set movement speed
        this.seekerVelocity = 150;
    }
    update(playerX, playerY, time) {
        if (this.pickedUpSeeker == true && this.seekerActive == false) {
            this.x = playerX;
            this.y = playerY;

            if (pointer.isDown && this.delayActive == false) {
                this.seekerActive = true;
            }
        }
        if (this.seekerActive == true && this.destroyed == false) {
            if(keyA.isDown) {
                this.body.setVelocityX(-this.seekerVelocity);
                this.setAngle(-90);
            } else if (keyD.isDown) {
                this.body.setVelocityX(this.seekerVelocity);
                this.setAngle(90);
            } else {
                this.body.setVelocityX(0);
            }
            if (keyW.isDown) {
                this.body.setVelocityY(-this.seekerVelocity);
                this.setAngle(0);
            } else if (keyS.isDown) {
                this.body.setVelocityY(this.seekerVelocity);
                this.setAngle(180);
            } else {
                this.body.setVelocityY(0);
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
        if(this.seekerActive && this.timerStarted == false) {
            this.timerStarted = true;
            time.delayedCall(6000, () => {
                this.destroyed = true;
                this.setVelocityX(0);
                this.setVelocityY(0);
            });
        }
    }
    delay(time) {
        this.delayActive = true;
        time.delayedCall(500, () => {
            this.delayActive = false;
        })
    }
    seekerX() {
        return this.x;
    }
    seekerY() {
        return this.y;
    }
    pickedUp() {
        this.pickedUpSeeker = true;
    }
    isActive() {
        return this.seekerActive;
    }
    destroyedCheck() {
        return this.destroyed;
    }
    destroySeeker() {
        this.destroy();
    }
}