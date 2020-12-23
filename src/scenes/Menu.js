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
        });
    }

    update() {
      this.scene.start("playScene");    
    }
}