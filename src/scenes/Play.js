class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        //Load Static Images

        //Load Spritesheets
        this.load.spritesheet('playerWalk', './assets/characterWalkRedo.png', {frameWidth: 60, frameHeight: 48, startFrame: 0, endFrame: 11});
        this.load.spritesheet('leftArrowIndicator', './assets/froggerLeftArrow.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 11});
        this.load.spritesheet('rightArrowIndicator', './assets/froggerRightArrow.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 11});
        this.load.spritesheet('upArrowIndicator', './assets/froggerUpArrow.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 11});

    }

    create() {
        //Define keyboard inputs
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //Initialize Player

        //Initialize Background

        //Initialize Controls
        this.upArrowAnim = this.add.sprite(128, 128, 'upArrowIndicator', 0).setOrigin(0,0);
        this.anims.create({
          key: 'upArrowFade',
          frames: this.anims.generateFrameNumbers('upArrowIndicator', { start: 0, end: 11, first: 0}),
          frameRate: 6
        });
        this.leftArrowAnim = this.add.sprite(64, 192, 'leftArrowIndicator', 0).setOrigin(0,0);
        this.anims.create({
          key: 'leftArrowFade',
          frames: this.anims.generateFrameNumbers('leftArrowIndicator', { start: 0, end: 11, first: 0}),
          frameRate: 6
        });
        this.rightArrowAnim = this.add.sprite(192, 192, 'rightArrowIndicator', 0).setOrigin(0,0);
        this.anims.create({
          key: 'rightArrowFade',
          frames: this.anims.generateFrameNumbers('rightArrowIndicator', { start: 0, end: 11, first: 0}),
          frameRate: 6
        });

        //Define various gatekeepers
        this.tutorialShowing = true;

        console.log(this);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          console.log("Left Key pressed");
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          console.log("Right Key pressed");
        }

        if(this.tutorialShowing){
          this.upArrowAnim.play('upArrowFade', true);
          this.leftArrowAnim.play('leftArrowFade', true);
          this.rightArrowAnim.play('rightArrowFade', true);
          //Remove the tutorial once the player has taken an action
          if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            console.log("Again Key pressed");
          }
        }
    }

}