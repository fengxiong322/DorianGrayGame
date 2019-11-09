function dodge() {
	document.getElementById( 'dodge' ).style.display = "block";
	const playerHeight = 100;
	var x = 100;
  	var move = 0;
  	var playerSpan = document.createElement('span');
  	playerSpan.innerHTML = "@";
  	document.getElementById( 'dodge' ).appendChild(playerSpan);
  	playerSpan.style.position = "relative";
  	playerSpan.style.top = playerHeight+"px";
  	playerSpan.style.left = "100px";
  	playerSpan.style.fontFamily = "monospace";
  	playerSpan.style.fontSize = "15px";
  	var obstacles=[document.createElement('span'), document.createElement('span'), document.createElement('span'), document.createElement('span')];
  	for (var i = 0; i < obstacles.length; i++) {
  		obstacles[i].style.whiteSpace = "nowrap";
  		obstacles[i].style.position = "relative";
  		obstacles[i].style.fontFamily = "monospace";
  		obstacles[i].style.fontSize = "15px";
  		obstacles[i].innerHTML = "A";//Random text
  		obstacles[i].style.left = Math.round(Math.random()*300)+"px";
  		obstacles[i].style.top = 0-Math.round(Math.random()*100)+"px";
  		document.getElementById( 'dodge' ).appendChild(obstacles[i]);
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
    	} else if (event.keyCode == 39 && move>0)
      		move = 0;
  	});

  	var timer = setInterval(function() {
  		x+=move;
  		playerSpan.style.left = x + "px";
  		for (var i = 0; i < obstacles.length; i++) {
  			obstacles[i].style.top = parseInt(obstacles[i].style.top.substring(0, obstacles[i].style.top.length-2))+1 + "px";
  			var blockY = parseInt(obstacles[i].style.top.substring(0, obstacles[i].style.top.length-2));
  			if(blockY>playerHeight+100){//Move block to top
  				obstacles[i].innerHTML = "hello me name bob";//Random text
  				obstacles[i].style.left = Math.round(Math.random()*300)+"px";
  				obstacles[i].style.top = 0-Math.round(Math.random()*100)+"px";
  			}
  			var blockX = parseInt(obstacles[i].style.left.substring(0, obstacles[i].style.left.length-2));
  			if(!(blockX> x||
  				blockX+obstacles[i].offsetWidth < x-playerSpan.offsetWidth || 
  				blockY>playerHeight+playerSpan.offsetHeight || 
  				blockY+obstacles[i].offsetHeight<playerHeight)){
  				console.log("LOSE SCREEN");
  			}
  		}
  	}, 10);
}