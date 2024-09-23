let ball;

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {
    this.load.image('background', 'img/background.jpg');
    this.load.image('ball', 'img/ball.png');
    this.load.image('goalkeeper', 'img/goalkeeper.png'); 
}


function create() {
    this.add.image(400, 300, 'background');
    ball = this.physics.add.image(400, 500, 'ball');
    ball.setCollideWorldBounds(true);

    
    initBallController(this, ball);
    initGoalkeeper(this);
}

function update() {
   
}
