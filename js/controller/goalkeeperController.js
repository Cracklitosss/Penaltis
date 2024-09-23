let workerGoalkeeper;
let goalkeeper;

// Función para inicializar al portero
function initGoalkeeper(scene) {
    goalkeeper = scene.physics.add.image(400, 245, 'goalkeeper');  // Inicializamos el portero en el centro
    goalkeeper.setCollideWorldBounds(false);  // Aseguramos que el portero no salga de los límites

    startGoalkeeperWorker();  // Iniciar el Web Worker para mover al portero
}

// Función para iniciar el Worker que controla al portero
function startGoalkeeperWorker() {
    workerGoalkeeper = new Worker('js/workers/workerGoalkeeper.js');

    workerGoalkeeper.onmessage = function (e) {
        const position = e.data;
        goalkeeper.setPosition(400 + position, 245);  // Ajustamos la posición en Y a 245 y usamos la posición en X calculada
    };
}


// Función para detener el Worker del portero si es necesario
function stopGoalkeeperWorker() {
    if (workerGoalkeeper) {
        workerGoalkeeper.terminate();  // Detener el Worker si está activo
        workerGoalkeeper = null;
    }
}
