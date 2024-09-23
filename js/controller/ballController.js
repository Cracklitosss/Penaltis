let workerBall;
let workerTimer, workerGoalkeeper; 
let angleInput, shootButton; 
let angleDirection = 1;
let angleInterval;
let initialBallPosition = { x: 400, y: 500 }; 
let goalkeeper;

function initBallController(scene, ball) {

    angleInput = document.getElementById('angle');
    shootButton = document.getElementById('shootButton');

    goalkeeper = scene.physics.add.image(400, 200, 'goalkeeper'); 
    goalkeeper.setCollideWorldBounds(true); 


    startAutoAdjustAngle();

    shootButton.addEventListener('click', function () {
        shootBall(scene, ball);
        stopAutoAdjustAngle(); 
    });

    startTimer();
    startGoalkeeper();
}

function startAutoAdjustAngle() {
    angleInterval = setInterval(function () {
        let visualAngle = parseInt(angleInput.value);
        let internalAngle = mapToInternalAngle(visualAngle);

        if (internalAngle >= 61) {
            angleDirection = -1;
        } else if (internalAngle <= 16) {
            angleDirection = 1;
        }

        visualAngle = visualAngle + angleDirection;
        angleInput.value = visualAngle;
        document.getElementById('angleValue').textContent = visualAngle;
    }, 50);
}

function stopAutoAdjustAngle() {
    clearInterval(angleInterval);
}

function resetBallAndAngle(scene, ball) {
    ball.setVelocity(0, 0);
    ball.setAcceleration(0, 0);
    ball.setPosition(initialBallPosition.x, initialBallPosition.y);
    
    angleInput.value = 45;
    document.getElementById('angleValue').textContent = 45;

    startAutoAdjustAngle();
}

function shootBall(scene, ball) {
    const visualAngle = parseInt(angleInput.value);
    const internalAngle = mapToInternalAngle(visualAngle);
    const angle = Phaser.Math.DegToRad(internalAngle);
    const power = 5;

    console.log(`Ángulo visual: ${visualAngle}, Ángulo interno: ${internalAngle}`);

    workerBall = new Worker('js/workers/workerBall.js');
    workerBall.postMessage({ angle, power });

    workerBall.onmessage = function (e) {
        const { x, y } = e.data;
        let adjustedX = 400;
        const internalAngleValue = internalAngle;

        if (internalAngleValue < 45) {
            adjustedX = 400 - x * 0.1;
        } else if (internalAngleValue >= 45 && internalAngleValue <= 55) {
            adjustedX = 400;
        } else if (internalAngleValue > 55) {
            if (internalAngleValue > 77) {
                adjustedX = 400 + x * 1.5;
            } else {
                adjustedX = 400 + x;
            }
        }

        const posY = 500 - y;
        ball.setPosition(adjustedX, posY);
    };

    setTimeout(function () {
        resetBallAndAngle(scene, ball);
    }, 2000);

    workerBall.onerror = function (error) {
        console.error("Error en el Web Worker:", error.message);
    };
}

function startTimer() {
    const initialTime = 10;
    workerTimer = new Worker('js/workers/workerTimer.js');
    workerTimer.postMessage(initialTime);

    workerTimer.onmessage = function (e) {
        if (e.data === 'timeout') {
            console.log('¡Tiempo agotado!');
            resetBallAndAngle(scene, ball); 
        } else {
            console.log(`Tiempo restante: ${e.data} segundos`);
            document.getElementById('timer').textContent = `Tiempo: ${e.data} s`;
        }
    };
}

function startGoalkeeper() {
    workerGoalkeeper = new Worker('js/workers/workerGoalkeeper.js');

    workerGoalkeeper.onmessage = function (e) {
        const position = e.data;
        goalkeeper.setPosition(position + 200, 200);
    };
}

function mapToInternalAngle(visualAngle) {
    return Math.max(10, Math.min(80, visualAngle));
}
