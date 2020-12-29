class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
        this.startX = config.width / 2;
        this.startY = config.height - 25;
        this.goalNum = 3; //The number of remaining goals to reach. -1 means that the game is over
        this.currentDialogueSection = -1;
        this.nextDialogueSection = 0;
        this.playerDead = false;
        this.currentlyPlayingAudio = false;

    }

    preload() {
        //Load Static Images

        //Load Spritesheets
        this.load.spritesheet('playerWalk', './assets/olcWalk.png', {
            frameWidth: 60,
            frameHeight: 48,
            startFrame: 0,
            endFrame: 14
        });
        this.load.spritesheet('objective', './assets/olcObjectiveInitial.png', {
            frameWidth: 52,
            frameHeight: 52,
            startFrame: 0,
            endFrame: 1
        })
        this.load.image('hangupSymbol', './assets/hangupSymbol.png');
        this.load.image('binary', './assets/olcBinary.png');
        this.load.image('money', './assets/moneyObstacleInitial.png');
        this.load.image('pointless', './assets/pointlessObstacle.png');
        this.load.image('ungrateful', './assets/ungratefulObstacle.png');
        this.load.image('neverCall', './assets/neverCallObstacle.png');
    }

    create() {
        //Define keyboard inputs
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);


        //Initialize Background
        this.binaryTop = this.add.sprite(config.width / 2, 25, 'binary').setOrigin(0.5);
        this.binaryMid = this.add.sprite(config.width / 2, config.height / 2, 'binary').setOrigin(0.5);
        this.binaryBot = this.add.sprite(config.width / 2, config.height - 25, 'binary').setOrigin(0.5);


        //Create goal group and animations
        this.goals = this.add.group({
            runChildUpdate: true
        });
        this.anims.create({
            key: 'goal',
            repeat: 0,
            frames: this.anims.generateFrameNumbers('objective', {start: 0, end: 1}),
            frameRate: 24
        });

        //Create obstacles in Level
        this.obstacles = this.add.group({
            runChildUpdate: true
        });


        //Create an array of each stage of obstacles and goals
        this.currentLevel = 1;
        this.remainingGoals = 1;
        // this.levelSetups = [
        //     this.initialObstaclesandGoals(),
        //     this.secondObstaclesandGoals.bind(this)
        // ]
        this.createLevel(this.currentLevel);
        //Create an initial batch of obstacles and goals
        console.log("The current level is " + this.currentLevel);


        //Create a list of audio file names and their durations
        this.dialogueSectionNames = [
            "ringBack", "dialogue2", "dialogue3", "dialogue4", "dialogue5", "dialogue6",
            "dialogue7", "dialogue8", "dialogue9", "dialogue10", "dialogue11", "dialogue12"
        ]
        this.dialogueSectionTimes = [
            6000, 17000, 9000, 20000, 21000, 9000, 20000, 26000, 13000, 32000, 29000, 25000
        ]


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
        this.tutorialShowing = true

    }

    update() {
        if (this.playerDead) {
            return;
        }

        this.player.update();
        this.physics.world.collide(this.player, this.obstacles, this.collideWithObstacle, null, this);
        this.physics.world.collide(this.player, this.goals, this.reachGoal, null, this);
        if (this.goalNum === 0) { //If all goals have been reached, update map
            console.log("There are no remaining goals");
            if (this.currentLevel < this.levelSetups.length - 1) {
                ++this.currentLevel;
                console.log("Now the current level is " + this.currentLevel);
                this.obstacles.clear(true); //Get rid of old obstacles
                this.goals.clear(true); //Get rid of old goals
                this.levelSetups[this.currentLevel](); //Put in new obstacles and goals
                ++this.nextDialogueSection; //Increase where we are in the dialogue
            } else {
                console.log("The current level is " + this.currentLevel + ", which would be more than " + this.levelSetups.length);
                this.goalNum = -1; //Just so it doesn't keep on printing useless messages
            }
        }
        this.playNextDialogueSection(); //See if we need to run more dialogue
    }


    collideWithObstacle(player, obstacle) {
        console.log("player collides with obstacle " + obstacle.texture.key);
        this.currPlayingDialogue.stop();
        this.cache.audio.remove(this.dialogueSectionNames[this.currentDialogueSection]);
        player.destroy();
        this.playerDead = true;
        this.currPlayingDialogue = this.sound.add(obstacle.audio);
        this.currPlayingDialogue.play();
    }

    reachGoal(player, goal) {
        if (goal.enabled) {
            //this.time.delayedCall(250, () => {
            player.x = this.startX;
            player.y = this.startY;
            goal.enabled = false;
            goal.play('goal');
            this.goalNum -= 1;
            console.log("Remaining Goals: " + this.goalNum);
            //}, null, this);
        }
    }

    playNextDialogueSection() {
        if (this.currentlyPlayingAudio) {
            console.log("Currently Playing Audio");
        } else if (this.playerDead) {
            console.log("Player is dead, no need to play audio");
        } else {
            if (this.currentDialogueSection < this.nextDialogueSection) {
                ++this.currentDialogueSection;
                //Play audio
                this.currPlayingDialogue = this.sound.add(this.dialogueSectionNames[this.currentDialogueSection]);
                this.currPlayingDialogue.play();
                console.log("Just started playing " + this.dialogueSectionNames[this.currentDialogueSection]);
                this.currentlyPlayingAudio = true;
                //After the section is done, set currently playing audio back to false
                this.time.delayedCall(this.dialogueSectionTimes[this.currentDialogueSection], () => {
                    this.currentlyPlayingAudio = false;
                }, null, this);
            } else {
                console.log("Current dialogue same as next dialogue, no need to load new one");
            }
        }

    }

    initialObstaclesandGoals() {
        //Row 1
        this.obstacles.add(new Obstacle(this, config.width / 2, config.height - 75,
            'hangupSymbol', 0, .3, "hangUp").setOrigin(.5, .5).setScale(.08, .08).setCircle(250, 30, -10).setImmovable());
        //Row 2
        this.obstacles.add(new Obstacle(this, config.width / 2, config.height - 125,
            'hangupSymbol', 0, .3, "hangUp").setOrigin(.5, .5).setScale(.08, .08).setCircle(250, 30, -10).setImmovable());
        //Row 3
        this.obstacles.add(new Obstacle(this, config.width / 2, config.height - 175,
            'hangupSymbol', 0, .3, "hangUp").setOrigin(.5, .5).setScale(.08, .08).setCircle(250, 30, -10).setImmovable());
        //Row 4
        this.obstacles.add(new Obstacle(this, config.width / 2, config.height - 225,
            'hangupSymbol', 0, .3, "hangUp").setOrigin(.5, .5).setScale(.08, .08).setCircle(250, 30, -10).setImmovable());
        //Row 5
        this.obstacles.add(new Obstacle(this, config.width / 2, config.height - 275,
            'hangupSymbol', 0, .3, "hangUp").setOrigin(.5, .5).setScale(.08, .08).setCircle(250, 30, -10).setImmovable());
        //Row 6
        this.obstacles.add(new Obstacle(this, config.width / 2, config.height - 375,
            'hangupSymbol', 0, .3, "hangUp").setOrigin(.5, .5).setScale(.08, .08).setCircle(250, 30, -10).setImmovable());
        //Row 7
        this.obstacles.add(new Obstacle(this, config.width / 2, config.height - 425,
            'hangupSymbol', 0, .3, "hangUp").setOrigin(.5, .5).setScale(.08, .08).setCircle(250, 30, -10).setImmovable());
        //Row 8
        this.obstacles.add(new Obstacle(this, config.width / 2, config.height - 475,
            'hangupSymbol', 0, .3, "hangUp").setOrigin(.5, .5).setScale(.08, .08).setCircle(250, 30, -10).setImmovable());
        //Row 9
        this.obstacles.add(new Obstacle(this, config.width / 2, config.height - 525,
            'hangupSymbol', 0, .3, "hangUp").setOrigin(.5, .5).setScale(.08, .08).setCircle(250, 30, -10).setImmovable());
        //Row 10
        this.obstacles.add(new Obstacle(this, config.width / 2, config.height - 575,
            'hangupSymbol', 0, .3, "hangUp").setOrigin(.5, .5).setScale(.08, .08).setCircle(250, 30, -10).setImmovable());
        //Goals
        this.goals.add(new Goal(this, config.width / 3, 0, 'objective', 0).setOrigin(.5, 0));
        this.goalNum = 1;
    }

    secondObstaclesandGoals(currState) {
        console.log("Loading second set of obstacles");
        //Row 3
        this.obstacles.add(new Obstacle(this, 3 * config.width / 8, config.height - 175,
            'money', 0, .3, "moneyExcuse").setOrigin(.5, .5).setScale(.08, .08).setCircle(265, 30, -10).setImmovable());
        this.obstacles.add(new Obstacle(this, 4 * config.width / 5, config.height - 175,
            'money', 0, .3, "moneyExcuse").setOrigin(.5, .5).setScale(.08, .08).setCircle(265, 30, -10).setImmovable());
        //Row 5
        this.obstacles.add(new Obstacle(this, config.width / 5, config.height - 275,
            'money', 0, .3, "moneyExcuse").setOrigin(.5, .5).setScale(.08, .08).setCircle(265, 30, -10).setImmovable());
        this.obstacles.add(new Obstacle(this, 2 * config.width / 5, config.height - 275,
            'money', 0, .3, "moneyExcuse").setOrigin(.5, .5).setScale(.08, .08).setCircle(265, 30, -10).setImmovable());
        //Row 7
        this.obstacles.add(new Obstacle(this, config.width / 2, config.height - 425,
            'hangupSymbol', 0, -.5, "hangUp").setOrigin(.5, .5).setScale(.08, .08).setCircle(250, 30, -10).setImmovable());
        //Row 9
        this.obstacles.add(new Obstacle(this, 3 * config.width / 4, config.height - 525,
            'hangupSymbol', 0, -.4, "hangUp").setOrigin(.5, .5).setScale(.08, .08).setCircle(250, 30, -10).setImmovable());

        //Goals
        this.goals.add(new Goal(this, config.width / 3, 0, 'objective', 0).setOrigin(.5, 0));
        this.goals.add(new Goal(this, 2 * config.width / 3, 0, 'objective', 0).setOrigin(.5, 0));
        this.goalNum = 2;
    }

    createLevel(levelNumber) {
        let level = "level" + levelNumber;
        let levelArr = levels[level];
        for (let row = 0; row < levelArr.length; row++) {
            for (let col = 0; col < levelArr[row].length; col++) {
                let element = levelArr[row][col];
               switch (element[0]) {
                   case 0:
                       break
                   case 1:
                       this.obstacles.add(new Obstacle(this, col*config.width/10 , (.5+row)*config.height/13,
                           'hangupSymbol', 0, element[1], "hangUp").setOrigin(.5, .5).setScale(.08, .08).setCircle(250, 30, -10).setImmovable());
                       break;
                   case 5:
                       this.goals.add(new Goal(this, col*config.width/10 , (.5+row)*config.height/13,'objective',0).setOrigin(.5, .5));
                       this.goalNum++;
                       break;
                   case 2:
                       this.obstacles.add(new Obstacle(this, col*config.width/10 , (.5+row)*config.height/13,
                           'money', 0, .3, "moneyExcuse").setOrigin(.5, .5).setScale(.08, .08).setCircle(265, 30, -10).setImmovable());
                       break;
                   case 3:
                        this.obstacles.add(new Obstacle(this, col*config.width/10 , (.5+row)*config.height/13,
                            'neverCall', 0, .3, "neverCall").setOrigin(.5, .5).setScale(.08, .08).setCircle(265, 30, -10).setImmovable());
                        break;
                   case 4:
                        this.obstacles.add(new Obstacle(this, col*config.width/10 , (.5+row)*config.height/13,
                            'pointless', 0, .3, "pointless").setOrigin(.5, .5).setScale(.08, .08).setCircle(265, 30, -10).setImmovable());
                        break;
                   case 6:
                        this.obstacles.add(new Obstacle(this, col*config.width/10 , (.5+row)*config.height/13,
                            'money', 0, .3, "moneyExcuse").setOrigin(.5, .5).setScale(.08, .08).setCircle(265, 30, -10).setImmovable());
                        break;
               }
            }
        }
    }
}