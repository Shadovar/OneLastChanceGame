let config = {
    type: Phaser.CANVAS,
    width: 650,
    height: 650,
    scene: [ Menu, Play ],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    }
};

let game = new Phaser.Game(config);

// define game settings
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000    
}

//reserve some keyboard variables
let keyUP, keyLEFT, keyRIGHT, keyDOWN;