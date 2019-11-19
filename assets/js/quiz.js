function quiz(){
	document.getElementById('quiz').style.display = "block";
}

function quizSubmit(){
	var score = 0;
	var radio1 = document.getElementsByName('q1');
	if(radio1[0].checked)
		score++;
	var radio2 = document.getElementsByName('q2');
	var radio3 = document.getElementsByName('q3');
}