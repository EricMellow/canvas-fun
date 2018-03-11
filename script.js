var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');

// ctx.fillStyle = "purple"
// ctx.fillRect(100, 100, 100, 100);
// ctx.fillStyle = "green"
// ctx.fillRect(200, 200, 100, 100);
// ctx.fillStyle = "purple"
// ctx.fillRect(300, 300, 100, 100);
// ctx.fillRect(300, 100, 100, 100);
// ctx.fillRect(100, 300, 100, 100);

// Lines
// ctx.beginPath();
// ctx.moveTo(100, 200);
// ctx.lineTo(100, 300);
// ctx.lineTo(300, 100);
// ctx.lineTo(200, 100);
// ctx.strokeStyle = "#000";
// ctx.stroke();

// Arc or Circle

// for (var i = 0; i < 75; i++) {
//   var x = Math.random() * window.innerWidth;
//   var y = Math.random() * window.innerHeight;
// ctx.beginPath();
// ctx.arc(x, y, 30, 0, Math.PI * 2, false);
// ctx.strokeStyle = getRandomColor();
// ctx.stroke();
// }

// function getRandomColor() {
//   var letters = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
//   var color = '#';
//   for (var i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color
// }

var mouse = {
  x: undefined,
  y: undefined
};

var maxRadius = 40;
// var minRadius = 5;

var colorArray = [
'#008FCC',
'#003073',
'#8DCEEB',
'#87FFDE',
'#2BFFC9'
]

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
})

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.minRadius = radius;
  this.radius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  ctx.fillStyle = this.color;
  ctx.fill();
  }

  this.update = function() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
  this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
    this.dy = -this.dy;
    }

  this.x += this.dx;
  this.y += this.dy;

  // Interactivity
  if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
    if (this.radius < maxRadius) {
    this.radius +=1;
    }
  } else if (this.radius > this.minRadius) {
    this.radius -= 1
  }

  this.draw();
  }
}

var circleArray = [];

function init() {
  circleArray = [];
for (var i = 0; i < 800; i++) {
  var radius = Math.random() * 5 + 1;
  var x = Math.random() * (innerWidth - radius * 2) + radius;
  var y = Math.random() * (innerHeight - radius * 2) + radius;
  var dy = (Math.random() - 0.5);
  var dx = (Math.random() - 0.5);
  circleArray.push(new Circle(x, y, dx, dy, radius));
}
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

init();
animate();
