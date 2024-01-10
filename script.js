//board
var blockSize = 25;
var rows = 15;
var cols = 30;
var board;
var c; //context

//snake head
var snakex = blockSize * 5;
var snakey = blockSize * 5;

var velocityx = 0;
var velocityy = 0;

var snakeBody = [];

//food
var foodx;
var foody;

var gameOver = false;
var score = 0;
var updateScore = 0;

window.onload = function () {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  c = board.getContext("2d");

  placeFood();
  document.addEventListener("keyup", changeDirection);
  setInterval(update, 1000 / 10); //100 millisecond
};

function update() {
  if (gameOver) {
    return;
  }
  //draw board
  c.fillStyle = "black";
  c.fillRect(0, 0, board.width, board.height);

  //draw food
  c.fillStyle = "red";
  c.fillRect(foodx, foody, blockSize, blockSize);

  if (snakex == foodx && snakey == foody) {
    snakeBody.push([foodx, foody]);
    placeFood();
    console.log(snakeBody);
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakex, snakey];
  }

  //draw snake
  c.fillStyle = "lime";
  snakex += velocityx * blockSize;
  snakey += velocityy * blockSize;
  c.fillRect(snakex, snakey, blockSize, blockSize);
  for (let i = 0; i < snakeBody.length; i++) {
    c.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  //game-over
  score = snakeBody.length * 10;
  updateScore = document.getElementById("score");
  updateScore.textContent = score;
  if (
    snakex < 0 ||
    snakex > board.width ||
    snakey < 0 ||
    snakey > board.height
  ) {
    gameOver = true;
    alert(`Game Over! Your score is ${score}`);
    location.reload();
  }
  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
      alert(`Game Over! Your score is ${score}`);
    }
  }
}

function changeDirection() {
  if (event.code == "ArrowUp" && velocityy != 1) {
    velocityx = 0;
    velocityy = -1;
  } else if (event.code == "ArrowDown" && velocityy != -1) {
    velocityx = 0;
    velocityy = 1;
  } else if (event.code == "ArrowLeft" && velocityx != 1) {
    velocityx = -1;
    velocityy = 0;
  } else if (event.code == "ArrowRight" && velocityx != -1) {
    velocityx = 1;
    velocityy = 0;
  }
}

function placeFood() {
  foodx = Math.floor(Math.random() * cols) * blockSize;
  foody = Math.floor(Math.random() * rows) * blockSize;
}

function exitGame() {
  gameOver = true;
  window.location.href = "splash.html";
}
