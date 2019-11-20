
var number = 0;
document.getElementById("normal").style.opacity = 0.5;

//offscreen: new OffscreenCanvas
function render(offscreen) {
  ctx.transferFromImageBitmap(offscreen.transferToImageBitmap());
}

function getNextGame() {
  document.getElementById("nextGame").disabled = true;
  document.getElementById("loseDiv").style.display = "none";
  document.getElementById("winDiv").style.display = "none";
  switch(number) {
    case 0:
      dodge();
      break;
    case 1:
      bounce();
      break;
    case 2:
      options();
      break;
    case 3:
      quiz();
      break;
    default:
      document.getElementById('done').style.display = "block";
      console.log("No such game!");
  }
  number++;
}

function changeStatus(change = 0.1) {
  var newValue = parseFloat(document.getElementById("normal").style.opacity) + parseFloat(change);
  document.getElementById("normal").style.opacity = newValue;
  console.log(newValue);
  console.log(document.getElementById("normal").style.opacity);
  document.getElementById("normal").style.opacity = newValue;
  document.getElementById("progressIndicator").style.width = (newValue*100) + "%";
}

function lose(input, change = 0-0.1){
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
	document.getElementById("nextGame").disabled = false;
}