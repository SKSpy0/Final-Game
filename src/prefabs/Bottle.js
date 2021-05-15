class Bottle extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        // Adds physics elements to player
        scene.physics.add.existing(this);
        
        // Adds player to scene
        scene.add.existing(this);

        // To check if bottle has been picked up
        this.pickedUpBottle = false;

        // To check if bottle is thrown
        this.throwing = false;

        // True if bottle lands and breaks
        this.landed = false;

        // X and Y value the bottle will end at
        this.travelToX = 0;
        this.travelToY = 0;

        this.throwSpeed = 250;

        // Initialize delay
        this.delayActive = false;

        // To check when the bottle reaches the pointer location
        this.distanceToX = 0;
        this.distanceToY = 0;

        this.collidedWithWall = false;
    }


    update(playerX, playerY) {
        // The player is holding the bottle
        if (this.pickedUpBottle == true && this.throwing == false) {
            this.x = playerX;
            this.y = playerY;

            // Throw bottle
            if (pointer.isDown && this.delayActive == false) {
                this.throwing = true;
                this.travelToX = pointer.x;
                this.travelToY = pointer.y;
                this.scene.physics.moveTo(this, pointer.x, pointer.y, this.throwSpeed);
                console.log("pointer x:" + pointer.x);
                console.log("pointer y:" + pointer.y);
                console.log("player x:" + playerX);
                console.log("player y:" + playerY);
            }
        }
        // Once it reaches destination, destroy
        if(this.throwing == true) {
            this.distanceToX = this.x - this.travelToX;
            if (this.distanceToX < 0) {
                this.distanceToX *= -1;
            }
            this.distanceToY = this.y - this.travelToY;
            if (this.distanceToY < 0) {
                this.distanceToY *= -1;
            }
        }
        if ((this.throwing == true && this.distanceToX <= 5 && this.distanceToY <= 5) || this.collidedWithWall == true) {
            this.landed = true;
            console.log("destroy");
            this.destroy();
        }
    }

    // Bottle has landed and broke
    landedCheck() {
        return this.landed;
    }

    // The bottle has been picked up
    pickedUp() {
        this.pickedUpBottle = true;
    }

    // The bottle has been thrown
    throw() {
        this.pickedUpBottle = false;
        this.throwing = true;
    }

    // Check if bottle is thrown
    hasThrown() {
        return this.throwing;
    }

    // Set a delay between throwing bottles
    delay(time) {
        this.delayActive = true;
        time.delayedCall(500, () => {
            this.delayActive = false;
        })
    }

    hitWall() {
        console.log("hit wall");
        this.landed = true;
        console.log("destroy");
        this.collidedWithWall = true;
    }
}