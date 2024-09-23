let workerGoalkeeper;
let goalkeeper;

function initGoalkeeper(scene) {
    goalkeeper = scene.physics.add.image(400, 245, 'goalkeeper'); 
    goalkeeper.setCollideWorldBounds(false); 

    startGoalkeeperWorker();
    
}

function startGoalkeeperWorker() {
    workerGoalkeeper = new Worker('js/workers/workerGoalkeeper.js');

    workerGoalkeeper.onmessage = function (e) {
        const position = e.data;
        goalkeeper.setPosition(400 + position, 245);
    };
}

function stopGoalkeeperWorker() {
    if (workerGoalkeeper) {
        workerGoalkeeper.terminate();  
        workerGoalkeeper = null;
    }
}
