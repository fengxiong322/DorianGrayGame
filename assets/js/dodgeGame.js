function dodge() {
    document.getElementById('dodge').style.display = "block";
    const playerHeight = 300;
    var x = 100;
    var move = 0;
    var playerSpan = document.createElement('span');
    playerSpan.innerHTML = "@";
    document.getElementById('dodge').appendChild(playerSpan);
    playerSpan.style.position = "absolute";
    playerSpan.style.top = playerHeight + "px";
    playerSpan.style.left = "100px";
    playerSpan.style.fontFamily = "monospace";
    playerSpan.style.fontSize = "15px";
    var obstacles = [document.createElement('span'), document.createElement('span'), document.createElement('span'), document.createElement('span'), document.createElement('span'), document.createElement('span'), document.createElement('span'), document.createElement('span'), document.createElement('span'), document.createElement('span'), document.createElement('span'), document.createElement('span'), document.createElement('span'), document.createElement('span'), document.createElement('span'), document.createElement('span')];
    for (var i = 0; i < obstacles.length; i++) {
        obstacles[i].style.whiteSpace = "nowrap";
        obstacles[i].style.position = "absolute";
        obstacles[i].style.fontFamily = "monospace";
        obstacles[i].style.fontSize = "15px";
        obstacles[i].innerHTML = "A"; //Random text
        obstacles[i].style.left = Math.round(Math.random() * 300) + "px";
        obstacles[i].style.top = 0 - Math.round(Math.random() * 300) + "px";
        document.getElementById('dodge').appendChild(obstacles[i]);
    }
    document.addEventListener('keydown', function dodgepress(event) {
        if (event.keyCode == 37) {
            move = -1;
        } else if (event.keyCode == 39)
            move = 1;
    });
    document.addEventListener('keyup', function dodgepress(event) {
        if (event.keyCode == 37 && move < 0) {
            move = 0;
        } else if (event.keyCode == 39 && move > 0)
            move = 0;
    });
    var counter = 0;
    var timer = setInterval(function() {
        counter++;
        if (x + move * 2 + playerSpan.offsetWidth < document.getElementById('dodge').offsetWidth &&
            x + move * 2 > 0)
            x += move * 2;
        playerSpan.style.left = x + "px";
        for (var i = 0; i < obstacles.length; i++) {
            obstacles[i].style.top = parseInt(obstacles[i].style.top.substring(0, obstacles[i].style.top.length - 2)) + 1 + "px";
            var blockY = parseInt(obstacles[i].style.top.substring(0, obstacles[i].style.top.length - 2));
            var blockX = parseInt(obstacles[i].style.left.substring(0, obstacles[i].style.left.length - 2));
            if (blockY > playerHeight + 100) { //Move block to top
                obstacles[i].innerHTML = "A"; //Random text
                obstacles[i].style.left = Math.round(Math.random() * 300) + "px";
                obstacles[i].style.top = 0 - Math.round(Math.random() * 300) + "px";
            }
            if (!(blockX + obstacles[i].offsetWidth < x ||
                    blockX > x + playerSpan.offsetWidth ||
                    blockY + obstacles[i].offsetHeight < playerHeight ||
                    blockY > playerHeight + playerSpan.offsetHeight)) {
                clearInterval(timer);
                document.getElementById('dodge').style.display = "none";
                lose("Oh Nose! You have succumbed to Lord Henry's beautiful words! His strong belief of " + obstacles[i].innerHTML);
            }
        }
        if (counter > 1000) { //10 seconds
            clearInterval(timer);
            document.getElementById('dodge').style.display = "none";
            win("You succeeded in dodging all obstacles!");
        }
    }, 10);
}
