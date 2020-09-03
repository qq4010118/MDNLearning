// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ball_count = document.querySelector('.ball_count');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function Two_D_Object(x, y, velX, velY, exists){
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;
}

function Ball(x, y, velX, velY, exists, color, size) {
    Two_D_Object.call(this, x, y, velX, velY, exists);
    this.color = color;
    this.size = size;
}

Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}

Ball.prototype.update = function() {
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }
  
    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }
  
    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }
  
    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }
  
    this.x += this.velX;
    this.y += this.velY;
}

Ball.prototype.collisionDetect = function() {
    for (let j = 0; j < balls.length; j++) {
      if (!(this === balls[j])) {
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + balls[j].size) {
          //change each balls' color
          //balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';

          //bouncing each other
          
            this.velX = -(this.velX);
            balls[j].velX = -(balls[j].velX);
        
          
            this.velY = -(this.velY);
            balls[j].velY = -(balls[j].velY); 
    
            this.x += this.velX;
            this.y += this.velY;

            balls[j].x += balls[j].velX;
            balls[j].y += balls[j].velY;
        }
      }
    }
}

function EvilCircle(x, y, exists){
  Two_D_Object.call(this, x, y, 20, 20, exists);
  this.color = 'white';
  this.size = 10;
}

EvilCircle.prototype.draw = function() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
}

EvilCircle.prototype.checkBounds = function() {
  if ((this.x + this.size) >= width) {
    this.size -= this.size / 2;
    this.size += this.size;
    this.x -= this.size;
  }

  if ((this.x - this.size) <= 0) {
    this.size -= this.size / 2;
    this.size += this.size;
    this.x += this.size;
  }

  if ((this.y + this.size) >= height) {
    this.size -= this.size / 2;
    this.size += this.size;
    this.y -= this.size;
  }

  if ((this.y - this.size) <= 0) {
    this.size -= this.size / 2;
    this.size += this.size;
    this.y += this.size;
  }
}

EvilCircle.prototype.setControl = function() {
    let _this = this;
    window.onkeydown = function(e) {
      if (e.key === 'a') {
        _this.x -= _this.velX;
      } else if (e.key === 'd') {
        _this.x += _this.velX;
      } else if (e.key === 'w') {
        _this.y -= _this.velY;
      } else if (e.key === 's') {
        _this.y += _this.velY;
      }
    }
}

EvilCircle.prototype.collisionDetect = function() {
  for (let j = 0; j < balls.length; j++) {
    if (balls[j].exists === true) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
 
      if (distance < this.size + balls[j].size) {
        //change each balls' color
        //balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';

        //bouncing each other
          balls[j].exists = false;
      }
    }
  }
}

let balls = [];
let evilBall = new EvilCircle(8, 8, true);
evilBall.setControl();

while (balls.length < 25) {
  let size = random(10,20);
  let ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-7,7),
    random(-7,7),
    true,
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size,
    
  );

  balls.push(ball);
}

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, width, height);
    
    evilBall.draw();
    evilBall.checkBounds();
    evilBall.collisionDetect();

    let count = 0;
    
    for (let i = 0; i < balls.length; i++) {
      if(balls[i].exists === true) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();

        count += 1;
      }
    }
    ball_count.textContent = `Ball count: ${count}`;
    requestAnimationFrame(loop);
}

loop();