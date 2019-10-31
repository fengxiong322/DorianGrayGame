//Base js: Sets up the canvas and provides global variables
var canvas = document.querySelector(".gamewindow");
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
var ctx = canvas.getContext("bitmaprenderer");
var offscreen = new OffscreenCanvas(width, height);
var prectx = offscreen.getContext('2d');
document.getElementById("normal").style.opacity = 0.5;

//clear offscreen
function clearscreen(){
	prectx.clearRect(0, 0, width, height);
	render();
}

//offscreen: new OffscreenCanvas
function render(){
	ctx.transferFromImageBitmap(offscreen.transferToImageBitmap());
}

function getRandomGame(){
	var number = Math.round(Math.random*numberOfGames);
	
}

function changeStatus(change){
	var newValue = parseFloat(document.getElementById("normal").style.opacity) + parseFloat(change);
	document.getElementById("normal").style.opacity = newValue;
	console.log(newValue);
	console.log(document.getElementById("normal").style.opacity);
	document.getElementById("normal").style.opacity = newValue;
	document.getElementById("progressIndicator").style.width = (newValue*100) + "%";
}