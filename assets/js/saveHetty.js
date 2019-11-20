    
    var canvas1 = document.getElementById("hetty");
    const c = canvas1.getContext("2d");
    canvas1.width = 500;
    canvas1.height = 600;
    var xPos = 0;
    var yPos = 0;
    var left;
    var right;
    var up;
    var down;
    var end = false;
    var alive = 5;

    let mouse = {
      x: 0,
      y: 0
    };



    function getDistance(x1,y1, x2, y2) {
      let xDistance = x2 - x1;
      let yDistance = y2 - y1;

      return Math.sqrt(Math.pow(xDistance,2) + Math.pow(yDistance,2));
    }

   function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
    }

    function resolveCollision(circle, otherCircle) {
    if (circle != null && otherCircle != null) {
    if (circle.velocity != null && otherCircle.velocity != null) {
    const xVelocityDiff = circle.velocity.x - otherCircle.velocity.x;
    const yVelocityDiff = circle.velocity.y - otherCircle.velocity.y;

    const xDist = otherCircle.x - circle.x;
    const yDist = otherCircle.y - circle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherCircle.y - circle.y, otherCircle.x - circle.x);

        // Store mass in var for better readability in collision equation
        const m1 = circle.mass;
        const m2 = otherCircle.mass;

        // Velocity before equation
        const u1 = rotate(circle.velocity, angle);
        const u2 = rotate(otherCircle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        circle.velocity.x = vFinal1.x;
        circle.velocity.y = vFinal1.y;

        otherCircle.velocity.x = vFinal2.x;
        otherCircle.velocity.y = vFinal2.y;
    }
  }
}
}

    function Circle(x,y,radius,color,mass) {
      let deleted = false;
      this.x = x;
      this.y = y;
      this.radius = radius;

      this.velocity = {
        x: 0.001,
        y: 1
      };
      this.color = color;
      this.mass = mass;


      this.update = function (){
        this.draw();

        for (let i = 0; i < circles.length; i++) {
          if ((this == circles[i] && this != circle2) && this != circle1) continue;
          //if (this != circles[i] && this != circle2) continue;
          if (this.velocity != null) {
          if (getDistance(this.x,this.y,circles[i].x,circles[i].y) - this.radius*2 < 0) {
                resolveCollision(this, circles[i]);
            } 
          }

        if (this != circle1 && this != circle2) {
          if (getDistance(circle1.x,circle1.y,this.x,this.y) - (circle1.radius + this.radius)< 0) {
            //Lose Condition
            canvas1.style.display = "none";
            lose("Rip, Dorian was unable to protect Hetty from himself. As a result, your soul has become more corrupt");
            end = true;
            return;
          }
        }

        if (this != circle1) {
        if (this.velocity != null && this != circle2) {
        
        if (getDistance(circle2.x,circle2.y, this.x,this.y ) - (circle2.radius + this.radius) < 0) {
            resolveCollision(circle2,this.circle);
        }
      }

      }
      }

       if (up == true) {
        circle2.velocity.y = -10;
        
       }
       if (down == true) {
        circle2.velocity.y = 10;
        
       }
       if (left == true) {
        circle2.velocity.x = -10;
        
       }
       if (right == true) {
        circle2.velocity.x = 10;
        
       }
       
       


        if (this.x - this.radius <= 0 || this.x + this.radius >= canvas1.width) {
          this.velocity.x = -this.velocity.x;
        }

        if (this.y + this.radius >= canvas1.height) {
          if(!deleted){
            alive--;
          }
          deleted = true;
          if(alive == 0){
            canvas1.style.display = "none";
            win("Congrats! You succeeded in saving Hetty!", 0.02);
            end = true;
            return;
          }
          delete this;
        }

        if (this.y - this.radius <= 0) {
          
          this.velocity.y = -this.velocity.y;
        }
      

        this.x += this.velocity.x;
        this.y += this.velocity.y;

      };

      this.draw = function() {
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2, false);
        c.strokeStyle = this.color;
        c.stroke();
        c.closePath();
      }
    }
    
    let circle1;
    let circle2;
    let circles;
    function init() {
      circles = [];
      circle1 = new Circle(10,10,30, 'red',2);
      circle2 = new Circle(10,10,30, 'red',2);

        for (let i = 0; i < 5; i++) {
          let x = Math.random() * canvas1.width;
          let y = (Math.random() * (canvas1.height-200));
          let radius = 10;
          circles.push(new Circle(x,y,radius,'blue',0.5));
        } 
        console.log (circles);
    }

    function animate () {
      if(!end)
        requestAnimationFrame(animate);
      c.clearRect(0,0,canvas1.width, canvas1.height);

      circles.forEach(circle => {
        circle.update(circles);
      });

      circle2.x = mouse.x;
      circle2.y = mouse.y;

      circle1.x = canvas1.width/2;
      circle1.y = canvas1.height-canvas1.height/4;
      circle1.update();
      circle2.update();

    }

    function bounce(){
      canvas1.style.display = "block";
      addEventListener("mousemove", function mouseListen(event) {
      mouse.x = event.pageX - canvas1.offsetLeft;
      mouse.y = event.pageY - canvas1.offsetTop;
      console.log(mouse.x +  " " +mouse.y);
      if (mouse.x >= xPos) {
          right = true;
          left = false;
      }
      if (mouse.x <= xPos) {
        left = true;
        right = false;
      }
      if (mouse.y >= yPos) {
        down = true;
        up = false;
      }
      if (mouse.y <= yPos) {
        up = true;
        down = false;
      }
      xPos = mouse.x;
      yPos = mouse.y;

    });
      init();
      animate();
    }