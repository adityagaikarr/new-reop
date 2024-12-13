const boxes = document.querySelectorAll('.box');
const resetButton = document.getElementById('reset-button');
let currentPlayer = 'X';
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function checkWinner() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      highlightWinner(combination);
      return board[a];
    }
  }
  if (!board.includes('')) {
    gameActive = false;
    return 'Draw';
  }
  return null;
}

function highlightWinner(combination) {
  combination.forEach(index => {
    boxes[index].style.backgroundColor = 'lightgreen';
  });
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  boxes.forEach(box => {
    box.textContent = '';
    box.style.backgroundColor = '';
  });
}

function aiMove() {
  let available = board.map((val, idx) => (val === '' ? idx : null)).filter(val => val !== null);
  let move = available[Math.floor(Math.random() * available.length)];
  board[move] = 'O';
  boxes[move].textContent = 'O';
  currentPlayer = 'X';
}

function handleBoxClick(e) {
  const index = Array.from(boxes).indexOf(e.target);
  if (board[index] || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  let winner = checkWinner();
  if (winner) {
    if (winner === 'Draw') alert('Game is a draw!');
    else alert(`${winner} wins!`);
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

  if (currentPlayer === 'O' && gameActive) {
    setTimeout(aiMove, 500);
    setTimeout(() => {
      let winner = checkWinner();
      if (winner) {
        if (winner === 'Draw') alert('Game is a draw!');
        else alert(`${winner} wins!`);
      }
    }, 600);
  }
}

boxes.forEach(box => box.addEventListener('click', handleBoxClick));
resetButton.addEventListener('click', resetGame);
