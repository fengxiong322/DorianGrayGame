function lose(input){
	document.getElementById('loseCustomState').innerHTML = input;
	document.getElementById('loseDiv').style.display = "block";
}

function win(input){
	document.getElementById('winCustomState').innerHTML = input;
	document.getElementById('winDiv').style.display = "block";
}