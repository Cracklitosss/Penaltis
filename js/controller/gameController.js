const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,  // Usar todo el ancho de la ventana
    height: window.innerHeight,  // Usar todo el alto de la ventana
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

// Listener para ajustar el tamaño del juego cuando la ventana cambia de tamaño
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

    ball = this.physics.add.image(750, 600, 'ball');
    ball.setDisplaySize(50, 50);

    ball.setCollideWorldBounds(true);

    
    initBallController(this, ball);
    initGoalkeeper(this);
}

function update() {
   
}
