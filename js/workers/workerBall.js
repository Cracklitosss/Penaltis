onmessage = function(e) {
    const { angle, power } = e.data;
    const gravity = 9.8;
    const velocity = power * 50;

    let time = 0;
    const interval = 0.016;

    function calculatePosition() {
        time += interval;

        const x = velocity * Math.cos(angle) * time;

        const y = velocity * Math.sin(angle) * time - 0.5 * gravity * Math.pow(time, 2);

        console.log(`Tiempo: ${time}, Posición x: ${x}, Posición y: ${y}`);

        if (y <= 0) {
            postMessage({ x, y: 0 });
            console.log('El balón ha tocado el suelo. Worker finalizado.');
            close();
        } else {
            postMessage({ x, y });  
        }
    }

    setInterval(calculatePosition, interval * 1000);
};