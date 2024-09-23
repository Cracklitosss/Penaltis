onmessage = function(e) {
    let timeLeft = e.data;
    const interval = setInterval(function() {
        timeLeft--;
        postMessage(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(interval);
            postMessage('timeout');
        }
    }, 1000); 
};
