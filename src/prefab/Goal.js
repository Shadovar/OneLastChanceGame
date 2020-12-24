class Goal extends Phaser.GameObjects.Sprite{
    constructor(scene, initx, inity, texture, frame) {
        super(scene, initx, inity, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.enabled = true;
    }

    update(){
        //idk if it needs anything to update
    }
}