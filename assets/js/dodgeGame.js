function dodge() {
    document.getElementById('dodge').style.display = "block";
    const words = ["Aestheism", "beliefs", "poetic speech"];
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
        obstacles[i].innerHTML = words[Math.round(Math.random() * 2)]; //Random text
        obstacles[i].style.left = Math.round(Math.random() * 300) + "px";
        obstacles[i].style.top = 0 - Math.round(Math.random() * 300) + "px";
        document.getElementById('dodge').appendChild(obstacles[i]);
    }
    var objective = document.createElement('span');
    objective.style.whiteSpace = "nowrap";
        objective.style.position = "absolute";
        objective.style.fontFamily = "monospace";
        objective.style.fontSize = "15px";
        objective.innerHTML = "IGNORE HENRY"; //Random text
        objective.style.left = Math.round(Math.random() * 300) + "px";
        objective.style.top = 0 - Math.round(Math.random() * 300) + "px";
        document.getElementById('dodge').appendChild(objective);
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
        if (x + move * 2 + playerSpan.offsetWidth < document.getElementById('dodge').offsetWidth &&
            x + move * 2 > 0)
            x += move * 2;
        playerSpan.style.left = x + "px";
        for (var i = 0; i < obstacles.length; i++) {
            obstacles[i].style.top = parseInt(obstacles[i].style.top.substring(0, obstacles[i].style.top.length - 2)) + 1 + "px";
            var blockY = parseInt(obstacles[i].style.top.substring(0, obstacles[i].style.top.length - 2));
            var blockX = parseInt(obstacles[i].style.left.substring(0, obstacles[i].style.left.length - 2));
            if (blockY > playerHeight + 100) { //Move block to top
                obstacles[i].innerHTML = words[Math.round(Math.random() * 2)]; //Random text
                obstacles[i].style.left = Math.round(Math.random() * 300) + "px";
                obstacles[i].style.top = 0 - Math.round(Math.random() * 300) + "px";
            }
            if (!(blockX + obstacles[i].offsetWidth < x ||
                    blockX > x + playerSpan.offsetWidth ||
                    blockY + obstacles[i].offsetHeight < playerHeight ||
                    blockY > playerHeight + playerSpan.offsetHeight)) {
                clearInterval(timer);
                console.log(blockX + " " + blockY + " " + obstacles[i].offsetWidth + " " + obstacles[i].offsetHeight + " " + playerHeight + " " + x);
                document.getElementById('dodge').style.display = "none";
                lose("Oh No! You have succumbed to Lord Henry's " + obstacles[i].innerHTML);
            }
            
        }
        objective.style.top = parseInt(objective.style.top.substring(0, objective.style.top.length - 2)) + 1 + "px";
        var objY = parseInt(objective.style.top.substring(0, objective.style.top.length - 2));
        var objX = parseInt(objective.style.left.substring(0, objective.style.left.length - 2));
        if (!(objX + objective.offsetWidth < x ||
                    objX > x + playerSpan.offsetWidth ||
                    objY + objective.offsetHeight < playerHeight ||
                    objY > playerHeight + playerSpan.offsetHeight)) {
                counter++;
                objective.style.left = Math.round(Math.random() * 300) + "px";
                objective.style.top = 0 - Math.round(Math.random() * 300) + "px";
            }
        if(objY > playerHeight + 100){
            objective.style.left = Math.round(Math.random() * 300) + "px";
                objective.style.top = 0 - Math.round(Math.random() * 300) + "px";
                console.log("bruv");
        }
        if (counter > 4) { //10 seconds
            clearInterval(timer);
            document.getElementById('dodge').style.display = "none";
            win("You succeeded in dodging all obstacles!");
        }
    }, 10);
}
