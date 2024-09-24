let workerBall;
let workerTimer;
let angleInput, shootButton;
let angleDirection = 1;
let angleInterval;
let initialBallPosition = { x: 400, y: 500 };

//Balon
function initBallController(scene, ball) {
    angleInput = document.getElementById('angle');
    shootButton = document.getElementById('shootButton');

    startAutoAdjustAngle();
    
    startTimer(
        function onTimeout() {
            showNotification('¡Tiempo agotado! Dispara más rápido la próxima vez.');
            resetBallAndAngle(scene, ball); 
        },
        function onTick(timeRemaining) {
            document.getElementById('timer').textContent = `Tiempo: ${timeRemaining} s`;  // Actualizar el tiempo en la pantalla
        }
    );

    shootButton.addEventListener('click', function () {
        shootBall(scene, ball);
        stopAutoAdjustAngle();
        stopTimer();
        startTimer(
            function onTimeout() {
                showNotification('¡Tiempo agotado! Dispara más rápido la próxima vez.');
                resetBallAndAngle(scene, ball);
            },
            function onTick(timeRemaining) {
                document.getElementById('timer').textContent = `Tiempo: ${timeRemaining} s`;
            }
        ); 
    });
}

function startAutoAdjustAngle() {
    angleInterval = setInterval(function () {
        let visualAngle = parseInt(angleInput.value);
        let internalAngle = mapToInternalAngle(visualAngle);

        if (internalAngle >= 65) {
            angleDirection = -1;
        } else if (internalAngle <= 25) {
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

function shootBall(scene, ball) {
    const visualAngle = parseInt(angleInput.value);
    const internalAngle = mapToInternalAngle(visualAngle);
    const angle = Phaser.Math.DegToRad(internalAngle);
    const power = 7;

    workerBall = new Worker('js/workers/workerBall.js');
    workerBall.postMessage({ angle, power });

    workerBall.onmessage = function (e) {
        const { x, y } = e.data;
        let adjustedX = 750;

        if (internalAngle < 45) {
            adjustedX = 750 - x * 0.5;
        } else if (internalAngle >= 45 && internalAngle <= 55) {
            adjustedX = 750;
        } else if (internalAngle > 55) {
            adjustedX = 750 + x * 1.5;
        }

        const posY = 610 - y;
        ball.setPosition(adjustedX, posY);
    };

    setTimeout(function () {
        resetBallAndAngle(scene, ball);
    }, 2000);

    workerBall.onerror = function (error) {
        console.error("Error en el Web Worker:", error.message);
    };
}

function resetBallAndAngle(scene, ball) {
    ball.setVelocity(0, 0);
    ball.setAcceleration(0, 0);
    ball.setVisible(true);
    ball.setPosition(750, 610);

    if (workerBall) {
        workerBall.terminate();
        workerBall = null;
    }

    angleInput.value = 45;
    document.getElementById('angleValue').textContent = 45;

    startAutoAdjustAngle();
}

function mapToInternalAngle(visualAngle) {
    return Math.max(10, Math.min(80, visualAngle));
}


//Timer
function startTimer() {
    const initialTime = 10; 
    workerTimer = new Worker('js/workers/workerTimer.js');
    workerTimer.postMessage(initialTime); 

    workerTimer.onmessage = function (e) {
        if (e.data === 'timeout') {
            showNotification('¡Tiempo agotado! Dispara más rapido la proxima vez.');
            resetBallAndAngle(scene, ball);
            stopTimer(); 
            startTimer();
        } else {
            document.getElementById('timer').textContent = `Tiempo: ${e.data} s`; 
             }
    };
}

function stopTimer() {
    if (workerTimer) {
        workerTimer.terminate(); 
        workerTimer = null;
    }
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
        notification.style.display = 'none';
    }, 2000);
}
