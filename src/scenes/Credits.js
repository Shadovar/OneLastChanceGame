class Credits extends Phaser.Scene{
    constructor() {
        super("creditScene");
    }
    preload(){
        this.load.image('credits', './assets/CreditsScreen.png')
    }

    create(){
        this.credits = this.add.image(0,0,'credits',0).setOrigin(0,0);
        this.credits.alpha = 0;
    }

    update(){
       if (this.credits.alpha < 1){
            this.credits.alpha+=.01;
        }
    }


}