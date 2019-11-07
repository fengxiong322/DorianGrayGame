function maze(){

	/*
	Position of player is determined from the top left
	Text input format, 0 indexed. First line contains 2 integers, the players starting position, the next lines contain maze values;
	*/
	var map;
	var client = new XMLHttpRequest();
	client.open('GET', 'assets/maps/testmap.txt', false);//Deprecated, may need to change
	client.onreadystatechange = function() {
  		map = client.responseText.split("\n");
	}
	client.send();
	var firstLine = map[0].split(" ");
	var posX = parseInt(firstLine[0]);
	var posY = parseInt(firstLine[1]);
	document.getElementById('maze').style.display = "block";
	for(int i = 0; i<map.length; i++){
		document.getElementById('maze').innerHTML += map[i] + "\n";
	}
	document.addEventListener('keydown', function dodgepress(event){//TODO: add updates to the map, and add vertical control
		if(event.keyCode == 37){
			if(checkMap(map, posX-1, posY))
       				posX--;
		}else if(event.keyCode == 39){
			if(checkMap(map, posX+1, posY))
    				posX++;
		}else if(event.keyCode == 38){
			if(checkMap(map, posX, posY+1))
				posY++;
		}else if(event.keyCode == 40){
			if(checkMap(map, posX-1, posY-1))
				posY--;
		}else
			return;
		var temp = map;
		temp[posY]= temp[posY].substr(0, posX) + "@" + temp[posY].substr(posX+1, temp[posY].length());
		document.getElementById('maze').innerHTML = "";
		for(int i = 0; i<temp.length; i++){
			document.getElementById('maze').innerHTML += temp[i] + "\n";
		}
	});
}

function checkMap(map, posX, posY){
	if(posX < 0 || posX > map[0].length()-1||posY<0||posY>map.length-1 || map[posY].charAt(posX)=='#')
		return false;
	return true;
}
