// goalkeeperController.js
export function createGoalkeeper(scene) {
    const goalkeeper = scene.physics.add.sprite(400, 400, 'goalkeeper');
    goalkeeper.setCollideWorldBounds(true);  // Evita que el portero salga del campo
    return goalkeeper;
}

export function moveGoalkeeper(workerGoalkeeper, goalkeeper) {
    workerGoalkeeper.postMessage({});

    workerGoalkeeper.onmessage = function(e) {
        const { x } = e.data;  // La posición horizontal del portero
        goalkeeper.setPosition(x, goalkeeper.y);  // Actualizar posición del portero
    };

    workerGoalkeeper.onerror = function(error) {
        console.error("Error en el Web Worker de portero:", error.message);
    };
}
