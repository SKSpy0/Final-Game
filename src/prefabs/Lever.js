class Lever extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);

        scene.physics.add.existing(this);

        scene.add.existing(this);

        // Makes sure the player can't spam the lever before the lever animation finishes
        this.playerUsing = false;
    }

    // Play lever animation and set player using back to false on animation end
    useLever(time) {
        this.playerUsing = true;
        // put animation stuff here
        time.delayedCall(500, () => {
            this.playerUsing = false;
        })
    }

    isPlayerUsing() {
        return this.playerUsing;
    }

    rotateHitbox() {
        this.body.setSize(20, 4);
    }
}