class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        //Load Static Images

        //Load Spritesheets
        this.load.spritesheet('playerWalk', './assets/olcWalk.png', {frameWidth: 60, frameHeight: 48, startFrame: 0, endFrame: 11});
        this.load.spritesheet('leftArrowIndicator', './assets/froggerLeftArrow.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 11});
        this.load.spritesheet('rightArrowIndicator', './assets/froggerRightArrow.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 11});
        this.load.spritesheet('upArrowIndicator', './assets/froggerUpArrow.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 11});
        this.load.image('hangupSymbol','./assets/hangupSymbol.png');
    }

    create() {
        //Define keyboard inputs
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);



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
        // Create Player Object and animations
        this.player = new Player(this, 150, 150, 'playerWalk', 0)
        this.anims.create({                                 //basic movement animation
            key: 'p1Move',
            repeat: 0,
            frames: this.anims.generateFrameNumbers('playerWalk', {start: 0, end: 11, first: 0}),
            frameRate: 30
        });
        //console.log(this.player)

        //Create obstacles in Level
        this.obstacles = this.add.group({
            runChildUpdate: true
        });
        this.obstacles.add(new Obstacle(this, config.width/2,config.height/2,
            'hangupSymbol',0, .3).setOrigin(.5,.5).setScale(.1,.1).setCircle(250,30,-10));



        //Define various gatekeepers
        this.tutorialShowing = true;




        //console.log(this);
    }

    update() {

        this.player.update();
        this.physics.world.collide(this.player,this.obstacles,this.collideWithObstacle, null, this);


        if(this.tutorialShowing){
          this.upArrowAnim.play('upArrowFade', true);
          this.leftArrowAnim.play('leftArrowFade', true);
          this.rightArrowAnim.play('rightArrowFade', true);
          //Remove the tutorial once the player has taken an action
          if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            console.log("Again Key pressed");
          }
        }

        // function addObstacle(x,y,speed,texture,frame){
        //     let obstacle = new Obstacle(this,x,y,texture,frame,speed);
        //     this.obstacles.add(obstacle);
        // }
    }


    collideWithObstacle(player, obstacle){
        console.log("player collides with obstacle " + obstacle.texture.key);
    }

}