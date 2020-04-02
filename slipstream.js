const width = 600;
const height = 400;

let victory = false;
let start; // use closure
let player;
let target;

class Player {
  constructor() {
    this.x = 100;
    this.y = height / 2;
    this.diameter = 20;
    this.tolerance = 100;
    this.speedMultiplier = 2;
  }

  draw() {
    circle(this.x, this.y, 20);
    fill(0);
  }

  move() {
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
      this.y -= 1 * this.speedMultiplier;
    } else if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
      this.y += 1 * this.speedMultiplier;
    }
  }

  moveForward(targetY) {
    if (Math.abs(this.y - targetY) < this.tolerance) {
      this.x += 1;
    }
  }
}

class Target {
  constructor(canvasHeight) {
    this.x = 500;
    this.y = canvasHeight / 2;
    this.diameter = 20;
    this.direction = 1;
    this.canvasHeight = canvasHeight;
  }
  draw() {
    circle(this.x, this.y, this.diameter);
    fill(255);
  }

  move() {
    const move = Math.floor(Math.random() * 30);
    if (move > 28) {
      this.direction *= -1;
    }

    if (this.y <= this.diameter) {
      this.direction = 1;
    } else if (this.y >= this.canvasHeight - this.diameter) {
      this.direction = -1;
    }

    this.y += this.direction;
  }
}

function setup() {
  createCanvas(width, height);
  player = new Player();
  target = new Target(height);
  start = Date.now();
}

function checkVictory() {
	console.log(player.x, target.x, target.diameter, player.diameter);
  if (player.x > target.x - target.diameter + player.diameter) {
    const seconds = (Date.now() - start) / 1000;
    const message = `Victory in ${seconds} seconds!`;

    textSize(32);
    text(message, 100, height / 5);
    victory = true;
  }
}

function draw() {
  if (!victory) {
    background(220);
    target.move();
    player.move();
    player.moveForward(target.y);
    player.draw();
    target.draw();
    checkVictory();
  }
}
