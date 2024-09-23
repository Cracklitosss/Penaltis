let workerBall;
let workerTimer;
let angleInput, shootButton;
let angleDirection = 1;
let angleInterval;
let initialBallPosition = { x: 400, y: 500 };

function initBallController(scene, ball) {
    angleInput = document.getElementById('angle');
    shootButton = document.getElementById('shootButton');

    startAutoAdjustAngle();
    startTimer();  // Iniciar el temporizador cuando se inicialice el controlador

    shootButton.addEventListener('click', function () {
        shootBall(scene, ball);
        stopAutoAdjustAngle();
        stopTimer();  // Detener el temporizador al disparar
        startTimer();  // Reiniciar el temporizador para la próxima ronda
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
        let adjustedX = 400;

        if (internalAngle < 45) {
            adjustedX = 400 - x * 0.5;
        } else if (internalAngle >= 45 && internalAngle <= 55) {
            adjustedX = 400;
        } else if (internalAngle > 55) {
            adjustedX = 400 + x * 1.5;
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

function resetBallAndAngle(scene, ball) {
    ball.setVelocity(0, 0);
    ball.setAcceleration(0, 0);
    ball.setVisible(true);
    ball.setPosition(initialBallPosition.x, initialBallPosition.y);

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

// Lógica del Web Worker para el temporizador
function startTimer() {
    const initialTime = 10;  // Tiempo en segundos
    workerTimer = new Worker('js/workers/workerTimer.js');
    workerTimer.postMessage(initialTime);  // Enviar el tiempo inicial al Worker

    workerTimer.onmessage = function (e) {
        if (e.data === 'timeout') {
            console.log('¡Tiempo agotado!');
            alert('¡Tiempo agotado! Dispara más rápido la próxima vez.');
            resetBallAndAngle(scene, ball);  // Reiniciar el balón cuando el tiempo se agote
            stopTimer();  // Detener el temporizador después del tiempo agotado
        } else {
            console.log(`Tiempo restante: ${e.data} segundos`);
            document.getElementById('timer').textContent = `Tiempo: ${e.data} s`;  // Actualizar el temporizador en pantalla
        }
    };
}

// Función para detener el Web Worker del temporizador
function stopTimer() {
    if (workerTimer) {
        workerTimer.terminate();  // Detener el Worker si está activo
        workerTimer = null;
    }
}
