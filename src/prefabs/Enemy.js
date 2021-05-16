class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, isRoaming){
        super(scene, x, y, texture);

        // Adds to scene and physics system
        scene.physics.add.existing(this);
        scene.add.existing(this);

        // Check if enemy sees player
        this.detectedPlayer = false;

        // If this enemy is a roamer or not
        this.isRoaming = isRoaming;

        // Enemy velocity
        this.enemyVelocity = 100;
    }

    create(){
    }

    update(){
        if(this.isRoaming){
            
        }
    }
}