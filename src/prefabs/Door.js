class Door extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);

        scene.physics.add.existing(this);

        scene.add.existing(this);

        this.open = false;

        this.body.setImmovable(true);
    }

    // Play animation and set door state
    openCloseDoor() {
        if (this.open == true) {
            this.open = false;
            this.setAlpha(1);
        } else {
            this.open = true;
            this.setAlpha(0);
        }
    }

    // Return if the door is open or not
    isOpen() {
        return this.open;
    }

    // Manually changing the hitbox on angle change
    rotateHitbox() {
        this.body.setSize(15, 90);
    }
}