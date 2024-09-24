const config = {
    type: Phaser.AUTO,
    width: window.innerWidth, 
    height: window.innerHeight, 
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
    },
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};


const game = new Phaser.Game(config);

window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    game.scale.resize(width, height);
});


function preload() {
    this.load.image('background', 'img/porteria2.avif');
    this.load.image('ball', 'img/ball.png');
    this.load.image('goalkeeper', 'img/goalkeeper.png');
     
}


function create() {
    this.add.image(750, 150, 'background').setDisplaySize(2200, 1180);

    ball = this.physics.add.image(750, 610, 'ball');
    ball.setDisplaySize(50, 50);

    ball.setCollideWorldBounds(true);

    
    initBallController(this, ball);
    initGoalkeeper(this);
}

function update() {
   
}
