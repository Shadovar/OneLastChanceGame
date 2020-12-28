class Cloud extends Phaser.GameObjects.Sprite {
    constructor(scene, initx, inity, texture, frame) {
        super(scene, initx, inity, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.fadeRate = .025;
        this.fading = false;
    }


    //TODO implement fading cloud?

    update(){
        if (this.alpha > 0 ) {
            if (this.fading) {
                console.log("fading....")
                this.alpha -= this.fadeRate;
            }
        } else {
            this.destroy();
        }
    }
}