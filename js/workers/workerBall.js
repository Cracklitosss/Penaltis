onmessage = function(e) {
    const { angle, power } = e.data;
    const gravity = 9.8;
    const velocity = power * 50; 

    const maxHeight = 250;

    let time = 0;
    const interval = 0.016;  
    let stopMovement = false; 

    function calculatePosition() {
        if (stopMovement) return;

        time += interval; 

        let x = velocity * Math.cos(angle) * time;

        let y = velocity * Math.sin(angle) * time - 0.5 * gravity * Math.pow(time, 2);

        // Limitar la altura máxima del balón
        if (y > maxHeight) {
            y = maxHeight;
            stopMovement = true;
            triggerReset(); 
            return;
        }

        console.log(`Tiempo: ${time}, Posición x: ${x}, Posición y: ${y}`);

        if (y <= 0) {
            postMessage({ x, y: 0 }); 
            console.log('El balón ha tocado el suelo. Worker finalizado.');
            triggerReset();
            return;
        }

        postMessage({ x, y });
    }

    function triggerReset() {
        setTimeout(function() {
            postMessage({ reset: true });
        }, 2000);
    }

    setInterval(calculatePosition, interval * 1000);
};
