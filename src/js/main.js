let moves = 0;
let seconds = 0;
let $firstSquare = null;
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
  handleEvents($board);
  startTimer();
}

function setUpSquares($squares, colors) {
  const randomColors = colors.sort(() => Math.random() - 0.5);
  randomColors.forEach((color, i) => {
    $squares[i].classList.add(color);
  })
}

function handleEvents($board) {

  $squares.forEach(function ($square) {
    $square.onclick = function () {
      handleClickToSquare($square);
    }
  });
  // $board.onclick = function (event) {
  //   const $element = event.target;
  //   if ($element.classList.contains('square')) {
  //     handleClickToSquare($element);
  //   }
  // };
}

function handleClickToSquare($currentSquare) {
  showSquare($currentSquare);
  if ($firstSquare === null) {
    $firstSquare = $currentSquare;
  } else {
    if ($firstSquare === $currentSquare) {
      return;
    }
    if (squaresAreEqual($firstSquare, $currentSquare)) {
      deleteSquare($firstSquare);
      deleteSquare($currentSquare);
    } else {
      hideSquare($firstSquare);
      hideSquare($currentSquare);
    }
    $firstSquare = null;
  }
}

function squaresAreEqual($square1, $square2) {
  return $square1.className === $square2.className;
}
function deleteSquare($square) {
  setTimeout(function () {
    $square.parentElement.classList.add('complete');
    $square.remove();
    checkIfGameOver();
  }, 500);
}

function checkIfGameOver() {
  if (document.querySelectorAll('.square').length === 0) {
    $board.style.display = 'none';
    $gameOverMessage.style.display = 'block';
    clearInterval(interval);
  }
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
