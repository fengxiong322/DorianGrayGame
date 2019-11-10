async function maze() {
  /*
  Position of player is determined from the top left
  Text input format, 0 indexed. First line contains 2 integers, the players starting position, the next lines contain maze values;
  */
  const response = await fetch('assets/maps/map.json');
  const json = await response.json();
  console.log(json);
  /*var client = new XMLHttpRequest();
  client.open('GET', 'assets/maps/testmap.txt', false);//Deprecated, may need to change
  client.onreadystatechange = function() {
    input = client.responseText.split("\n");
  }
  client.send();*/
  var firstLine = json.start;
  var map = json.map;
  var posX = parseInt(firstLine[0]);
  var posY = parseInt(firstLine[1]);
  document.getElementById('maze').style.display = "block";
  for (var i = 0; i < map.length; i++) {
    if(posY == i)
        document.getElementById('maze').innerHTML += map[i].substring(0, posX) + "@" + map[i].substring(posX+1, map[i].length)+ "<br>";
      else
        document.getElementById('maze').innerHTML += map[i] + "<br>";
  }
  document.addEventListener('keydown', function dodgepress(event) { //TODO: add updates to the map, and add vertical control
    if (event.keyCode == 37) {
      if (checkMap(map, posX-1, posY))
         posX--;
    } else if (event.keyCode == 39) {
      if (checkMap(map, posX+1, posY))
        posX++;
    } else if (event.keyCode == 38){
      if(checkMap(map, posX, posY-1))
        posY--;
    } else if (event.keyCode == 40) {
      if(checkMap(map, posX, posY+1))
        posY++;
    } else
      return;
    document.getElementById('maze').innerHTML = "";
    for (var i = 0; i < map.length; i++){
      if(posY == i)
        document.getElementById('maze').innerHTML += map[i].substring(0, posX) + "@" + map[i].substring(posX+1, map[i].length)+ "<br>";
      else
        document.getElementById('maze').innerHTML += map[i] + "<br>";
    }
  });
}

function checkMap(map, posX, posY) {
  if (posX < 0 || posX > map[0].length - 1 || posY < 0 || posY > map.length - 2 || map[posY].charAt(posX) == '#')
    return false;
  return true;
}
