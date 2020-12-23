class Goal extends Phaser.GameObjects.Sprite{
    constructor(scene, initx, inity, texture, frame) {
        super(scene, initx, inity, texture, frame);
        scene.add.existing(this);
    }
    //TODO : Implement collision checking with player?
}