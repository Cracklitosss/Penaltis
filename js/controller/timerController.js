// timerController.js
export function startTimer(workerTimer, onTimeUpdate, onTimeEnd) {
    workerTimer.postMessage({});

    workerTimer.onmessage = function(e) {
        const { timeRemaining } = e.data;
        if (timeRemaining > 0) {
            onTimeUpdate(timeRemaining);  // Actualiza la pantalla con el tiempo restante
        } else {
            onTimeEnd();  // Llamar al final del tiempo
        }
    };

    workerTimer.onerror = function(error) {
        console.error("Error en el Web Worker del cronómetro:", error.message);
    };
}
