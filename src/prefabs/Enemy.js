class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, isRoaming, facing){
        super(scene, x, y, texture);

        // Adds to scene and physics system
        scene.physics.add.existing(this);
        scene.add.existing(this);

        // If this enemy is a roamer or not
        this.isRoaming = isRoaming;

        // Direction of enemy
        this.facing = facing;


        // Enemy velocity
        this.enemyVelocity = 75;
        
        // If Enemy is set to roaming, set velocity for that enemy according to where it's facing
        if(isRoaming){
            switch(facing){
                case 1:
                    this.setVelocityY(-this.enemyVelocity);
                    break;
                case 2:
                    this.setVelocityY(this.enemyVelocity);
                    break;
                case 3:
                    this.setVelocityX(-this.enemyVelocity);
                    break;
                case 4:
                    this.setVelocityX(this.enemyVelocity);
            }
        }
    }

    // Turns around the Enemy when collided with a wall
    turnAround(){
        switch(this.facing){
            case 1:
                this.setVelocityY(this.enemyVelocity);
                this.facing = 2;
                this.angle = 180;
                break;
            case 2:
                this.setVelocityY(-this.enemyVelocity);
                this.facing = 1;
                this.angle = 0;
                break;
            case 3:
                this.setVelocityX(this.enemyVelocity);
                this.facing = 4;
                this.angle = 90;
                break;
            case 4:
                this.setVelocityX(-this.enemyVelocity);
                this.facing = 3;
                this.angle = -90;
                break;
        }
    }

    // Returns if enemy is a roamer or not
    checkRoaming(){
        return this.isRoaming;
    }

    // Returns what direction enemy is facing
    checkFacing(){
        return this.facing;
    }

    // Returns X and Y position of enemy
    returnX(){
        return this.x;
    }

    returnY(){
        return this.y;
    }
}