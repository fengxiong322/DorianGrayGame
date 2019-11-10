//Base js: Sets up the canvas and provides global variables
var canvas = document.querySelector(".gamewindow");
//var width = canvas.width = window.innerWidth;
//var height = canvas.height = window.innerHeight;
var width = canvas.width=600;
var height = canvas.height = 550;
var ctx = canvas.getContext("bitmaprenderer");
var number = 0;
document.getElementById("normal").style.opacity = 0.5;

//offscreen: new OffscreenCanvas
function render(offscreen) {
  ctx.transferFromImageBitmap(offscreen.transferToImageBitmap());
}

function getNextGame() {
  document.getElementById("nextGame").disabled = true;
  switch(number) {
    case 0:
      dodge();
      break;
    case 1:
      maze();
      break;
    default:
      console.log("No such game!");
  }
  number++;
}

function changeStatus(change) {
  var newValue = parseFloat(document.getElementById("normal").style.opacity) + parseFloat(change);
  document.getElementById("normal").style.opacity = newValue;
  console.log(newValue);
  console.log(document.getElementById("normal").style.opacity);
  document.getElementById("normal").style.opacity = newValue;
  document.getElementById("progressIndicator").style.width = (newValue*100) + "%";
}

function lose(input, change){
	changeStatus(change);
	document.getElementById('loseCustomState').innerHTML = input;
	document.getElementById('loseDiv').style.display = "block";
	prepareNext();
}

function win(input, change){
	changeStatus(change);
	document.getElementById('winCustomState').innerHTML = input;
	document.getElementById('winDiv').style.display = "block";
	prepareNext();
}

function prepareNext(){
	getNextGame();
}