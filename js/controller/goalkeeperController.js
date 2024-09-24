let workerGoalkeeper;
let goalkeeper;

function initGoalkeeper(scene) {
    goalkeeper = scene.physics.add.image(730, 305, 'goalkeeper'); 
    goalkeeper.setDisplaySize(270, 340);
    goalkeeper.setCollideWorldBounds(false); 

    startGoalkeeperWorker();
}

function startGoalkeeperWorker() {
    workerGoalkeeper = new Worker('js/workers/workerGoalkeeper.js');

    workerGoalkeeper.onmessage = function (e) {
        const position = e.data;
        goalkeeper.setPosition(730 + position, 305);
    };
}

function stopGoalkeeperWorker() {
    if (workerGoalkeeper) {
        workerGoalkeeper.terminate();  
        workerGoalkeeper = null;
    }
}
