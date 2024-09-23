const maxMovement = 220; 
let direction = 1;
const speed = 3;
let position = 0;  

function moveGoalkeeper() {
    setInterval(() => {

        if (direction === 1 && position >= maxMovement) {
            position = maxMovement;
            direction = -1;  
        } else if (direction === -1 && position <= -maxMovement) {
            position = -maxMovement;  
            direction = 1; 
        } else {
            position += direction * speed; 
        }

        postMessage(position);  
    }, 16); 
}

moveGoalkeeper();
