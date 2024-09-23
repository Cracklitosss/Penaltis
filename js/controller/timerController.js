onmessage = function(e) {
    let timeRemaining = e.data;  // El tiempo inicial que recibimos (10 segundos)
    
    const timer = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            postMessage(timeRemaining);  // Enviar el tiempo restante al controlador
        } else {
            clearInterval(timer);  // Detener el temporizador
            postMessage('timeout');  // Enviar el mensaje de tiempo agotado
        }
    }, 1000);  // Actualizar cada segundo
};
