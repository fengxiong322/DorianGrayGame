function maze(){

	/*
	Text input format, 0 indexed. First line contains 2 integers, the players starting position, the next lines contain maze values;
	*/
	var map;
	var client = new XMLHttpRequest();
	client.open('GET', 'assets/maps/testmap.txt');
	client.onreadystatechange = function() {
  		console.log(client.responseText);
  		map = client.responseText.split("\n");
	}
	client.send();
	var firstLine = map[0].split(" ");
	var posX = parseInt(firstLine[0]);
	var posY = parseInt(firstLine[1]);

	var gameDiv = document.getElementById('maze');
	gameDiv.style.display = "block";
	gameDiv.innerHTML = map;
	document.addEventListener('keydown', function dodgepress(event){//TODO: add updates to the map, and add vertical control
	if(event.keyCode == 37) {
       	posX--;
    }else if(event.keyCode == 39)
    	posX++;
});
}