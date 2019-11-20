var canvas = document.getElementById("decision");
			//Set size if u want
			var width = canvas.width=700;
			var height = canvas.height = 700;
			var score = 0;

			var ctx = canvas.getContext("bitmaprenderer");//Double buffer so no flicker

			function render(off){
				ctx.transferFromImageBitmap(off.transferToImageBitmap());
			}

			function options(){
				canvas.style.display = "block";
				var runThrough = 0;
				var text = true;
				var xCoord = 340;
				var yCoord = 340;
				var offscreen = new OffscreenCanvas(width, height);
				var prectx = offscreen.getContext('2d');
				var rightDoor = [true,false,true];
				var choice = false;
				var questions = ["Sybil has died","You find out the portrait reflects your bad decisions","You need help from someone but they refuse to help you","You are told that you will have eternal pleasure of you kill someone","Do you believe you should control your emotions and take advantage of them?"];
				var rightAnswers = ["Go through the top door to talk to her mother about it ","Go through the bottom door to use this to know when you’ve done somehing wrong so you can learn from your mistakes","Go through the top door to solve your problem in a way that does not involve their help","Go through the bottom door to kill the person","Go through the top door for yes"];
				var wrongAnswers = ["Go through the bottom door to forget about it and move on","Go through the top door to hide the painting and ignore it","Go through the bottom door to blackmail them and make them do what you need from them","Go through the bottom door to choose morality over pleasure","Go through the bottom door for no"];

				    document.addEventListener('keydown', function dodgepress(event) {

							text = false;
							choice = false;
						if (event.keyCode == 87) {
							if (yCoord<=48)
								if (xCoord+10>336 && xCoord+10<=365){
									if (rightDoor[runThrough]){
										score++;
										choice = true;
									}
									yCoord = 340;
									//if run Through is at 3 move to the next minigame
									runThrough++;
									text = true;
								}
								else
									yCoord = 28
							else
								yCoord-=20;
						} else if (event.keyCode == 65){
							if (xCoord<=48)
								xCoord = 28
							else
								xCoord-=20;
						}else if (event.keyCode == 83){
							if (yCoord>=652)
								if (xCoord+10>336 && xCoord+10<=365){
									if (!rightDoor[runThrough]){
										score++;
										choice = true;
									}
									yCoord = 340;
									//if run Through is at 3 move to the next minigame
									runThrough++;
									text = true;
								}
								else
									yCoord = 652
							else
								yCoord+=20;
						}else if (event.keyCode == 68){
							if (xCoord>=652)
								xCoord = 652
							else
								xCoord+=20;
						}
					
					});

				var time =setInterval(function(){
					//every 10 milliseconds calls this function
					//draw all ur stuff here
						//background
						prectx.font = "15px Arial";
						prectx.fillStyle="#BB9447";
						for (var i =0;i<700;i+=28)
						{
							prectx.fillRect(i,0,28,28);
							prectx.fillRect(0,i,28,28);
							prectx.fillRect(672,i,28,28);
							prectx.fillRect(i,672,28,28);
						}
						prectx.fillStyle="black";
						prectx.fillRect(336,0,28,28);
						prectx.fillRect(336,672,28,28);
						prectx.beginPath();
						for (var i =0;i<700;i+=28)
						{
							prectx.rect(i,0,28,28);
							prectx.rect(0,i,28,28);
							prectx.rect(672,i,28,28);
							prectx.rect(i,672,28,28);
							prectx.stroke();
						}
						prectx.fillStyle="#F1C46C";
						prectx.fillRect(29,29,643,643);
						prectx.fillStyle="green";
						prectx.fillRect(xCoord,yCoord,20,20);
						if (text)
						{
							prectx.fillStyle="#663300";
							prectx.fillRect(20,20,660,660);
							prectx.fillStyle="D1B74F";
							if (runThrough>0)
							{
								if (choice)
									prectx.strokeText("You got that right keep going.",40,230);
								else
									prectx.strokeText("That's wrong, better luck with this round.",40,230);
							}
							else
							{
								prectx.strokeText("Use wasd to go through the door that represents which option",40,230);
							}
							prectx.strokeText(questions[runThrough],40,250);
							prectx.strokeText(rightAnswers[runThrough],40,270);
							prectx.strokeText(wrongAnswers[runThrough],40,290);
							prectx.strokeText("Press any key to move your character to one of the doors",40,310);
						}
						console.log(score);	
						if(runThrough==5){
							clearInterval(time);
							canvas.style.display = "none";
							if(score == 5){
								win("Congrats! You succeeded in answer all of the questions");
							}else
								lose("You didn't solve all the problems. Your score was "+score + "/5");
						}
						render(offscreen);
				},10);
			}