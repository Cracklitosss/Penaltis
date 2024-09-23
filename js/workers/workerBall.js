onmessage = function(e) {
    const { angle, power } = e.data;
    const gravity = 9.8; // Constante de gravedad
    const velocity = power * 50;  // Ajuste de velocidad inicial

    const maxHeight = 250;  // Definimos la altura máxima (en píxeles)

    let time = 0;
    const interval = 0.016;  // Simulación a 60 FPS (1/60 segundos)
    let stopMovement = false;  // Bandera para detener el movimiento

    // Función para calcular la posición del balón
    function calculatePosition() {
        if (stopMovement) return;  // Si el movimiento está detenido, no hacemos nada

        time += interval;  // Incrementa el tiempo antes de calcular las posiciones

        // Cálculo de la posición en el eje X (horizontal)
        let x = velocity * Math.cos(angle) * time;

        // Cálculo de la posición en el eje Y (vertical)
        let y = velocity * Math.sin(angle) * time - 0.5 * gravity * Math.pow(time, 2);

        // Limitar la altura máxima del balón
        if (y > maxHeight) {
            y = maxHeight;  // Si la altura excede el máximo, la limitamos
            stopMovement = true;  // Detenemos el movimiento al alcanzar la altura máxima
            triggerReset();  // Activamos el reinicio después de 2 segundos
            return;
        }

        // Agregar log para depurar la posición
        console.log(`Tiempo: ${time}, Posición x: ${x}, Posición y: ${y}`);

        // Si el balón toca el suelo
        if (y <= 0) {
            postMessage({ x, y: 0 });  // El balón toca el suelo
            console.log('El balón ha tocado el suelo. Worker finalizado.');
            triggerReset();  // Activamos el reinicio después de 2 segundos
            return;
        }

        postMessage({ x, y });  // Enviamos la nueva posición del balón
    }

    // Función para activar el reinicio después de 2 segundos
    function triggerReset() {
        setTimeout(function() {
            postMessage({ reset: true });  // Enviamos el mensaje de reinicio al controlador principal
        }, 2000);  // 2 segundos de espera
    }

    // Ejecuta el cálculo de la posición en intervalos regulares (frames)
    setInterval(calculatePosition, interval * 1000);
};
