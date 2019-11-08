function dodge() {
  var randomquotes = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in tincidunt augue."];
  var x = 100;
  var move = 0;
  var waves = 0;
  var waveheight = 100;
  const playerHeight = 400;
  var offscreen = new OffscreenCanvas(width, height);
  var prectx = offscreen.getContext('2d');
  var base_image = new Image();
  base_image.src = 'assets/img/lordhenry.jpg';
  var blocks = [
                (Math.round(Math.random()*500)),
                (Math.round(Math.random()*500)),
                (Math.round(Math.random()*500)),
                (Math.round(Math.random()*500)),
                (Math.round(Math.random()*500))
               ];
  document.addEventListener('keydown', function dodgepress(event) {
    if (event.keyCode == 37) {
           move = -1;
      } else if (event.keyCode == 39)
        move = 1;
  });
  document.addEventListener('keyup', function dodgepress(event) {
    if (event.keyCode == 37 && move < 0) {
      move = 0;
    } else if (event.keyCode == 39 && move>0)
      move = 0;
  });
  var counter = 0;
  var prevquote = randomquotes[(Math.round(Math.random()*(randomquotes.length-1)))];
  var timer = setInterval(function() {
    //GameBackground template
    prectx.fillStyle = "white";
    prectx.fillRect(0, 0, 600, height);
    //LordHenry
    counter++;
    if (counter < 50) {
      prectx.save();
      prectx.translate(50, 50);
      prectx.rotate(0.3);
      prectx.drawImage(base_image, -10, -10, 100, 100);
      prectx.restore();
    } else if (counter < 100) {
      prectx.save();
      prectx.translate(50, 50);
      prectx.rotate(-0.3);
      prectx.drawImage(base_image, -10, -10, 100, 100);
      prectx.restore();
    }
    if (counter == 100)
      counter = 0;
    if (waveheight > playerHeight + 99) {
      prevquote = randomquotes[(Math.round(Math.random()*(randomquotes.length-1)))];
      prectx.fillStyle = "black";
      prectx.fillText(prevquote, 170, 100);
    } else {
      prectx.fillStyle = "black";
      prectx.fillText(prevquote, 170, 100);
    }

    if (waves == 10) {
      // TODO
    }
    for (var i = 0; i < blocks.length; i++) {
      if(!(blocks[i] > x+50 || 
           blocks[i]+100 < x || 
           waveheight > playerHeight+50 ||
           waveheight+100 < playerHeight)) {
        prectx.clearRect(0, 0, width, height);
        prectx.fillStyle = "black";
        prectx.fillText("YOU LOSE!", 100, 100);
        prectx.fillText("Just like Dorian, you have failed to dodge the influence of lord Henry", 300, 250);
        prectx.fillText("and so your soul has become more corrupted. You begin to value beauty over other things...", 300, 300);
        console.log("hello");
        render(offscreen);
        clearInterval(timer);
        document.getElementById("nextGame").disabled = false;
        changeStatus(-0.1);
        return;
      }
      prectx.fillStyle = "red";
      if (x + move > 0 && x + move + 50 < 600)
      x = x + move;
      prectx.fillRect(x, playerHeight, 50, 50);
      prectx.fillStyle = "black";
      prectx.fillRect(blocks[i], waveheight, 100,100);
    }
    if (waveheight > playerHeight + 100) {
      blocks = [
                  (Math.round(Math.random()*500)),
                  (Math.round(Math.random()*500)),
                  (Math.round(Math.random()*500)),
                  (Math.round(Math.random()*500)),
                  (Math.round(Math.random()*500))
               ];
      waveheight = 100;
      waves++;
    }
    waveheight+=2;
    render(offscreen);
  }, 10);
}