class PrePlay extends Phaser.Scene {

    constructor() {
        super("prePlayScene");
        this.startX = config.width / 2;
        this.startY = config.height - 25;
        this.playerDead = false;
        this.currentlyPlayingAudio = false;
        this.goal = 1;
    }

    preload(){
        //Load Static Images

        //Load Spritesheets
        this.load.spritesheet('playerWalk', './assets/olcWalk.png', {frameWidth: 60, frameHeight: 48, startFrame: 0, endFrame: 14});
        this.load.spritesheet('objective','./assets/olcObjectiveInitial.png',{frameWidth: 52, frameHeight: 52, startFrame: 0, endFrame: 1})
        this.load.image('hangupSymbol','./assets/hangupSymbol.png');
        this.load.image('binary', './assets/olcBinary.png');
        this.load.image('money', './assets/moneyObstacleInitial.png');
        this.load.image('cloud','./assets/olc_Cloud-2.png');
        this.load.image('phoneNumber', './assets/phoneNumber.png');
        this.load.image('startCall', './assets/startCall.png');
    }

    create(){

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        //Initialize Background
        this.phoneNumber = this.add.sprite(config.width/2, config.height/2, 'phoneNumber').setOrigin(0.5);
        //this.binaryTop = this.add.sprite(config.width/2, 25, 'binary').setOrigin(0.5);
        //this.binaryMid = this.add.sprite(config.width/2, config.height/2, 'binary').setOrigin(0.5);
        //this.binaryBot = this.add.sprite(config.width/2, config.height-25, 'binary').setOrigin(0.5);

        //Create goal group and animations
        this.goals = this.add.group({
            runChildUpdate: true
        });
        this.clouds = this.add.group({
            runChildUpdate: true
        })
        this.anims.create({
            key: 'goal',
            repeat: 0,
            frames: this.anims.generateFrameNumbers('objective', {start: 0, end: 1}),
            frameRate: 24
        });

        this.goals.add(new Goal(this, config.width/2, 75,'startCall',0).setScale(.1).setOrigin(.5,0));

        // Create Player Object and animations
        this.player = new Player(this, this.startX, this.startY, 'playerWalk', 0).setOrigin(0.5);
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
        //Define various gatekeepers
        this.tutorialShowing = true;
        this.createLevel(0)
    }

    update(){
        this.player.update();
        this.physics.world.collide(this.player,this.clouds,this.touchCloud, null, this);
        this.physics.world.collide(this.player,this.goals,this.touchGoal, null, this);
    }

    touchCloud(player, cloud){
        cloud.fading = true;
    }
    touchGoal(){
        this.scene.start('playScene');
    }

    createLevel(levelNumber) {
        let level = "level" + levelNumber;
        let levelArr = levels[level];
        if (Object.keys(levels).length < levelNumber){
            return;
        }
        for (let row = 0; row < levelArr.length; row++) {
            for (let col = 0; col < levelArr[row].length; col++) {
                let element = levelArr[row][col];
                switch (element[0]) {
                    case 0:
                        break;
                    case 7:
                        this.clouds.add(new Cloud(this, col*config.width/11 , (.5+row)*config.height/13,
                            'cloud',0, element[1]).setScale(1.5, 1.5).setAngle(Math.random()*360))
                }
            }
        }
    }
}