class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, initx, inity, texture, frame) {
        super(scene, initx, inity, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.x = initx;
        this.y = inity;

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            console.log(" attemping to move player down")
            this.angle = 180;
            this.anims.play('p1Move', false);
            this.y += 20;
        }
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
            console.log(" attemping to move player up")
            this.angle = 0;
            this.anims.play('p1Move', false);
            this.y -= 20;
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            console.log("Attemping to move player right")
            this.anims.play('p1Move', false);
            this.angle = 90;
            this.x += 20;
        }
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            console.log("Attemping to move player left")
            this.angle = 270;
            this.anims.play('p1Move', false);
            this.x -= 20;
        }
    }

}