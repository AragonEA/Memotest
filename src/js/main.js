let moves = 0;
let seconds = 0;
let interval;

const $moves = document.querySelector('#moves');
const $timer = document.querySelector('#timer');
const $board = document.querySelector('#board');
const $squares = $board.querySelectorAll('.square');
const $gameOverMessage = document.querySelector('#game-over');
const $startGameButton = document.querySelector('button[type=button]');

$startGameButton.onclick = startGame;

function startGame() {
  setUpGame();
}

function setUpGame() {
  const colors = ['palevioletred', 'goldenrod', 'yellow', 'purple', 'violet', 'lightskyblue'];
  const repeatedColors = colors.concat(colors);
  $board.style.display = '';
  hideStartGameButton()
  setUpSquares($squares, repeatedColors);
  startTimer();
}

function setUpSquares($squares, colors) {
  const randomColors = colors.sort(() => Math.random() - 0.5);
  randomColors.forEach((color, i) => {
    $squares[i].classList.add(color);
  })
}

function startTimer() {
  interval = setInterval(() => {
    seconds++;
    updateTimerText(`${seconds} seconds.`);
  }, 1000);
};

function resetTimer() {
  time = 0;
  $timer.textContent = time;
  seconds = 0;
  clearInterval(interval);
}

function updateTimerText(time) {
  $timer.textContent = time;
}

function updateMoves() {
  $moves.textContent = moves;
}

function hideStartGameButton() {
  $startGameButton.style.display = 'none';
}

function showSquare($square) {
  $square.style.opacity = '1';
}

function hideSquare($square) {
  // setTimeout(function () {
  //   $square.style.opacity = '0';
  // }, 500);
  $square.style.opacity = '0';

}
