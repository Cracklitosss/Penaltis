onmessage = function(e) {
    let position = 0;
    let direction = 1;
    const speed = 5;

    const interval = setInterval(function() {
        position += direction * speed;

        if (position >= 300) {
            direction = -1;
        } else if (position <= 0) {
            direction = 1;
        }

        postMessage(position);
    }, 50); 
};