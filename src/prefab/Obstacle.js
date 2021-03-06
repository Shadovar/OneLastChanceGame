class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, initx, inity, texture, frame, speed, audio) {
        super(scene, initx, inity, texture, frame);
        this.speed = speed;
        this.audio = audio;
        scene.add.existing(this);
        scene.physics.add.existing(this);

    }

    update() {
        this.x += this.speed;
        if (this.x > config.width + 25) {
            this.x = -25;
        } else if (this.x < -25) {
            this.x = config.width + 25;
        }
    }

}