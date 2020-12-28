class Menu extends Phaser.Scene {
    //TODO: Make menu, loading screen, etc
    constructor(){
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sixRings', './assets/sound/90188__howardfrombroward__6rings.wav');
        this.load.audio('dialogue2', './assets/sound/Dialogue_Section_2.wav');
        this.load.audio('dialogue3', './assets/sound/Dialogue_Section_3.wav');
        this.load.audio('dialogue4', './assets/sound/Dialogue_Section_4.wav');
        this.load.audio('dialogue5', './assets/sound/Dialogue_Section_5.wav');
        this.load.audio('dialogue6', './assets/sound/Dialogue_Section_6.wav');
        this.load.audio('dialogue7', './assets/sound/Dialogue_Section_7.wav');
        this.load.audio('dialogue8', './assets/sound/Dialogue_Section_8.wav');
        this.load.audio('dialogue9', './assets/sound/Dialogue_Section_9.wav');
        this.load.audio('dialogue10', './assets/sound/Dialogue_Section_10.wav');
        this.load.audio('dialogue11', './assets/sound/Dialogue_Section_11.wav');
        this.load.audio('dialogue12', './assets/sound/Dialogue_Section_12.wav');
        this.load.audio('hangUp', './assets/sound/Hang_Up_Sound.wav');
        this.load.audio('moneyExcuse', './assets/sound/Money_Sound.wav');
        this.load.audio('ringBack', './assets/sound/RingBack.wav');
        this.load.audio('ungratefulExcuse', './assets/sound/Ungrateful_Sound.wav');
        this.load.audio('givingUp', './assets/sound/fathergivingupnoise.mp3');

        //load spritesheets
        this.load.spritesheet('leftArrowIndicator', './assets/froggerLeftArrow.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 11});
        this.load.spritesheet('rightArrowIndicator', './assets/froggerRightArrow.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 11});
        this.load.spritesheet('upArrowIndicator', './assets/froggerUpArrow.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 11});
        this.load.spritesheet('downArrowIndicator', './assets/froggerDownArrow.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 11});

        //Make the background for the loading bar
        //credit to https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(config.width/2 -160, 270, 320, 50);
        
        //Whenever progress is made
        this.load.on('progress', function (value) {
          console.log(value);
          progressBar.clear();
          progressBar.fillStyle(0xffffff, 1);
          progressBar.fillRect(config.width/2 -150, 280, 300 * value, 30);
        });
                
        //Whenever a file is loaded
        this.load.on('fileprogress', function (file) {
          console.log(file.src);
        });
       
        //When all files are loaded
        this.load.on('complete', function () {
          console.log('complete');
          progressBar.destroy();
          progressBox.destroy();
        });
    }

    create(){
      //Define keyboard inputs
      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
      keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
      keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);


       //Initialize Controls
       this.upArrowAnim = this.add.sprite(config.width - 84, config.height - 72, 'upArrowIndicator', 0).setOrigin(0,0).setScale(.5);
       this.anims.create({
         key: 'upArrowFade',
         repeat: -1,
         frames: this.anims.generateFrameNumbers('upArrowIndicator', { start: 0, end: 11, first: 0}),
         frameRate: 6
       });
       this.downArrowAnim = this.add.sprite(config.width - 84, config.height - 40, 'downArrowIndicator', 0).setOrigin(0,0).setScale(0.5);
       this.anims.create({
         key: 'downArrowFade',
         repeat: -1,
         frames: this.anims.generateFrameNumbers('downArrowIndicator', { start: 0, end: 11, first: 0}),
         frameRate: 6
       });
       this.leftArrowAnim = this.add.sprite(config.width - 116, config.height - 40, 'leftArrowIndicator', 0).setOrigin(0,0).setScale(0.5);
       this.anims.create({
         key: 'leftArrowFade',
         repeat: -1,
         frames: this.anims.generateFrameNumbers('leftArrowIndicator', { start: 0, end: 11, first: 0}),
         frameRate: 6
       });
       this.rightArrowAnim = this.add.sprite(config.width - 52, config.height - 40, 'rightArrowIndicator', 0).setOrigin(0,0).setScale(0.5);
       this.anims.create({
         key: 'rightArrowFade',
         repeat: -1,
         frames: this.anims.generateFrameNumbers('rightArrowIndicator', { start: 0, end: 11, first: 0}),
         frameRate: 6
       });
       this.upArrowAnim.play('upArrowFade', true);
       this.downArrowAnim.play('downArrowFade', true);
       this.leftArrowAnim.play('leftArrowFade', true);
       this.rightArrowAnim.play('rightArrowFade', true);
    }

    update() {
      if (Phaser.Input.Keyboard.JustDown(keyLEFT) ||
          Phaser.Input.Keyboard.JustDown(keyRIGHT) ||
          Phaser.Input.Keyboard.JustDown(keyUP) ||
          Phaser.Input.Keyboard.JustDown(keyDOWN)) {
              this.scene.start("prePlayScene");
      }
    }
}