function quiz(){
	document.getElementById('quiz').style.display = "block";
}

document.getElementById("form").addEventListener('submit', function(e){e.preventDefault();});

function quizSubmit(){

	var score = 0;
	var radio1 = document.getElementsByName('q1');
	if(radio1[0].checked)
		score++;
	var radio2 = document.getElementsByName('q2');
	if(radio2[0].checked)
		score++;
	var radio3 = document.getElementsByName('q3');
	if(radio3[1].checked)
		score++;
	var radio4 = document.getElementsByName('q4');
	if(radio4[2].checked)
		score++;
	var radio5 = document.getElementsByName('q5');
	if(radio5[0].checked)
		score++;
	document.getElementById('quiz').style.display = "none";
	if(score == 5)
		win("You acheived a perfect score!", 0.2);
	else
		lose("Rip, you only achieved a score of " + score + "/5", 0-(5-score)/5);
}
