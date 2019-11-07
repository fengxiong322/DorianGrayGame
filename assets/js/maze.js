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
	var gameDiv = document.getElementById('maze');
	gameDiv.style.display = "block";
	gameDiv.innerHTML = map;
	console.log("dun");
}

function printmaze(){

}