onmessage = function(e) {
    let timeRemaining = e.data; 
    
    const timer = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            postMessage(timeRemaining);
        } else {
            clearInterval(timer); 
            postMessage('timeout');
        }
    }, 1000);
};
