// Definimos el rango de movimiento del portero en píxeles
const maxMovement = 220;  // El portero solo se puede mover 100 píxeles a la izquierda y a la derecha
let direction = 1;  // 1 es a la derecha, -1 es a la izquierda
const speed = 3;  // Velocidad del portero
let position = 0;  // Posición actual del portero

function moveGoalkeeper() {
    setInterval(() => {
        // Limitar la posición a los límites del movimiento para evitar que sobrepase
        if (direction === 1 && position >= maxMovement) {
            position = maxMovement;  // Fijar la posición exactamente en el límite
            direction = -1;  // Cambiar dirección hacia la izquierda
        } else if (direction === -1 && position <= -maxMovement) {
            position = -maxMovement;  // Fijar la posición exactamente en el límite
            direction = 1;  // Cambiar dirección hacia la derecha
        } else {
            position += direction * speed;  // Actualizar la posición dentro del rango permitido
        }

        // Enviar la posición calculada al controlador principal
        postMessage(position);  
    }, 16);  // Intervalo para simular 60 FPS
}

moveGoalkeeper();
