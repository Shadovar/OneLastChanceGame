class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, initx, inity, texture, frame) {
        super(scene, initx, inity, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.x = initx;
        this.y = inity;
        this.body.setSize(42, 42, true);
        this.setImmovable();
        this.stepLeft = true;
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            //console.log(" attemping to move player down")
            this.angle = 180;
            if(this.stepLeft){
                this.anims.play('pMove1', false);
            }
            else{
                this.anims.play('pMove2', false);
            }
            this.stepLeft = !this.stepLeft;
            if(this.y < config.height - 50){
                this.y += 50;
            }
        }
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
            //console.log(" attemping to move player up")
            this.angle = 0;
            if(this.stepLeft){
                this.anims.play('pMove1', false);
            }
            else{
                this.anims.play('pMove2', false);
            }
            this.stepLeft = !this.stepLeft;
            if(this.y > 50){
                this.y -= 50;
            }
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            //console.log("Attemping to move player right")
            if(this.stepLeft){
                this.anims.play('pMove1', false);
            }
            else{
                this.anims.play('pMove2', false);
            }
            this.stepLeft = !this.stepLeft;
            this.angle = 90;
            if(this.x < config.width - 50){
                this.x += 50;
            }
        }
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
           //console.log("Attemping to move player left")
            this.angle = 270;
            if(this.stepLeft){
                this.anims.play('pMove1', false);
            }
            else{
                this.anims.play('pMove2', false);
            }
            this.stepLeft = !this.stepLeft;
            if(this.x > 50){
                this.x -= 50;
            }
        }
    }

}