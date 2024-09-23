// timerController.js
export function startTimer(workerTimer, onTimeUpdate, onTimeEnd) {
    workerTimer.postMessage({});

    workerTimer.onmessage = function(e) {
        const { timeRemaining } = e.data;
        if (timeRemaining > 0) {
            onTimeUpdate(timeRemaining);
        } else {
            onTimeEnd(); 
        }
    };

    workerTimer.onerror = function(error) {
        console.error("Error en el Web Worker del cronómetro:", error.message);
    };
}
