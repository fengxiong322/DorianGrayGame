//Base js: Sets up the canvas and provides global variables
var canvas = document.querySelector(".gamewindow");
//var width = canvas.width = window.innerWidth;
//var height = canvas.height = window.innerHeight;
var width = canvas.width=600;
var height = canvas.height = 550;
var ctx = canvas.getContext("bitmaprenderer");
document.getElementById("normal").style.opacity = 0.5;

//offscreen: new OffscreenCanvas
function render(offscreen) {
  ctx.transferFromImageBitmap(offscreen.transferToImageBitmap());
}

function getNextGame() {
  document.getElementById("nextGame").disabled = true;
  number = 0;
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
}

function changeStatus(change) {
  var newValue = parseFloat(document.getElementById("normal").style.opacity) + parseFloat(change);
  document.getElementById("normal").style.opacity = newValue;
  console.log(newValue);
  console.log(document.getElementById("normal").style.opacity);
  document.getElementById("normal").style.opacity = newValue;
  document.getElementById("progressIndicator").style.width = (newValue*100) + "%";
}
