const config = {
  width: 600,
  height: 400,
  victory: false
};

const assets = {
  playerImg: "",
  targetImg: ""
};

let player;
let target;
let performance;

function preloadAssets() {
  assets.playerImg = loadImage("assets/car.png");
  assets.targetImg = loadImage("assets/target-car.png");
}

function timer() {
  const start = Date.now();
  return () => {
    return (Date.now() - start) / 1000;
  };
}

class Player {
  constructor(canvasHeight) {
    this.x = 100;
    this.y = canvasHeight / 2;
    this.diameter = 20;
    this.tolerance = 100;
    this.speedMultiplier = 2;
  }

  draw() {
    image(assets.playerImg, this.x, this.y);
    // circle(this.x, this.y, 20);
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
   image(assets.targetImg, this.x, this.y);
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
  createCanvas(config.width, config.height);
  preloadAssets();
  player = new Player(config.height);
  target = new Target(config.height);
  performance = timer();
}

function checkVictory() {
  console.log(player.x, target.x, target.diameter, player.diameter);
  if (player.x > target.x - target.diameter + player.diameter) {
    const message = `Victory in ${performance()} seconds!`;

    textSize(32);
    text(message, 100, config.height / 5);
    config.victory = true;
  }
}

function draw() {
  if (!config.victory) {
    background(220);
    target.move();
    player.move();
    player.moveForward(target.y);
    player.draw();
    target.draw();
    checkVictory();
  }
}
