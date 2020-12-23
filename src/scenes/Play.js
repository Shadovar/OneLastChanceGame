class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        //Load Static Images

        //Load Spritesheets
        this.load.spritesheet('playerWalk', './assets/olcWalk.png', {frameWidth: 60, frameHeight: 48, startFrame: 0, endFrame: 14});
        this.load.spritesheet('leftArrowIndicator', './assets/froggerLeftArrow.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 11});
        this.load.spritesheet('rightArrowIndicator', './assets/froggerRightArrow.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 11});
        this.load.spritesheet('upArrowIndicator', './assets/froggerUpArrow.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 11});
        this.load.spritesheet('downArrowIndicator', './assets/froggerDownArrow.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 11});
        this.load.image('hangupSymbol','./assets/hangupSymbol.png');
        this.load.image('binary', './assets/olcBinary.png');
    }

    create() {
        //Define keyboard inputs
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);



        //Initialize Background
        this.binaryTop = this.add.sprite(config.width/2, 25, 'binary').setOrigin(0.5);
        this.binaryMid = this.add.sprite(config.width/2, config.height/2, 'binary').setOrigin(0.5);
        this.binaryBot = this.add.sprite(config.width/2, config.height-25, 'binary').setOrigin(0.5);

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

        // Create Player Object and animations
        this.player = new Player(this, config.width/2, config.height-25, 'playerWalk', 0).setOrigin(0.5);
        this.anims.create({                                 //basic movement animation
            key: 'pMove1',
            repeat: 0,
            frames: this.anims.generateFrameNumbers('playerWalk', {start: 0, end: 7}),
            frameRate: 24
        });
        this.anims.create({                                 //basic movement animation
          key: 'pMove2',
          repeat: 0,
          frames: this.anims.generateFrameNumbers('playerWalk', {start: 8, end: 14}),
          frameRate: 24
      });
        //console.log(this.player)

        //Create obstacles in Level
        this.obstacles = this.add.group({
            runChildUpdate: true
        });

        //Create an initial batch of obstacles
        this.initialObstacleBatch();



        //Define various gatekeepers
        this.tutorialShowing = true;

    }

    update() {

        this.player.update();
        this.physics.world.collide(this.player,this.obstacles,this.collideWithObstacle, null, this);

        // function addObstacle(x,y,speed,texture,frame){
        //     let obstacle = new Obstacle(this,x,y,texture,frame,speed);
        //     this.obstacles.add(obstacle);
        // }
    }


    collideWithObstacle(player, obstacle){
        console.log("player collides with obstacle " + obstacle.texture.key);
    }

    initialObstacleBatch(){
      //Row 1
      this.obstacles.add(new Obstacle(this, config.width/2,config.height - 75,
        'hangupSymbol',0, .3).setOrigin(.5,.5).setScale(.08,.08).setCircle(250,30,-10).setImmovable());
      //Row 2
      this.obstacles.add(new Obstacle(this, config.width/2,config.height - 125,
        'hangupSymbol',0, .3).setOrigin(.5,.5).setScale(.08,.08).setCircle(250,30,-10).setImmovable());
      //Row 3
      this.obstacles.add(new Obstacle(this, config.width/2,config.height - 175,
        'hangupSymbol',0, .3).setOrigin(.5,.5).setScale(.08,.08).setCircle(250,30,-10).setImmovable());
      //Row 4
      this.obstacles.add(new Obstacle(this, config.width/2,config.height - 225,
        'hangupSymbol',0, .3).setOrigin(.5,.5).setScale(.08,.08).setCircle(250,30,-10).setImmovable());
      //Row 5
      this.obstacles.add(new Obstacle(this, config.width/2,config.height - 275,
        'hangupSymbol',0, .3).setOrigin(.5,.5).setScale(.08,.08).setCircle(250,30,-10).setImmovable());
      //Row 6
      this.obstacles.add(new Obstacle(this, config.width/2,config.height - 375,
        'hangupSymbol',0, .3).setOrigin(.5,.5).setScale(.08,.08).setCircle(250,30,-10).setImmovable());
      //Row 7
      this.obstacles.add(new Obstacle(this, config.width/2,config.height - 425,
        'hangupSymbol',0, .3).setOrigin(.5,.5).setScale(.08,.08).setCircle(250,30,-10).setImmovable());
      //Row 8
      this.obstacles.add(new Obstacle(this, config.width/2,config.height - 475,
        'hangupSymbol',0, .3).setOrigin(.5,.5).setScale(.08,.08).setCircle(250,30,-10).setImmovable());
      //Row 9
      this.obstacles.add(new Obstacle(this, config.width/2,config.height - 525,
        'hangupSymbol',0, .3).setOrigin(.5,.5).setScale(.08,.08).setCircle(250,30,-10).setImmovable());
      //Row 10
      this.obstacles.add(new Obstacle(this, config.width/2,config.height - 575,
        'hangupSymbol',0, .3).setOrigin(.5,.5).setScale(.08,.08).setCircle(250,30,-10).setImmovable());
    }
}