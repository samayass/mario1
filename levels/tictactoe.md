---
layout: default
description: Use JavaScript without external libraries to animate Yoshi moving across screen, OOP style.
categories: []
tags: [javascript]
---
<html>
<head>
  <title>Tic Tac Toe</title>
  <style>
    .cell {
      width: 100px;
      height: 100px;
      border: 1px solid black;
      font-size: 48px;
      text-align: center;
      line-height: 100px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <h1>Tic Tac Toe</h1>
  <div id="board">
    <div class="row">
      <div class="cell" id="cell-0-0" data-row="0" data-col="0"></div>
      <div class="cell" id="cell-0-1" data-row="0" data-col="1"></div>
      <div class="cell" id="cell-0-2" data-row="0" data-col="2"></div>
    </div>
    <div class="row">
      <div class="cell" id="cell-1-0" data-row="1" data-col="0"></div>
      <div class="cell" id="cell-1-1" data-row="1" data-col="1"></div>
      <div class="cell" id="cell-1-2" data-row="1" data-col="2"></div>
    </div>
    <div class="row">
      <div class="cell" id="cell-2-0" data-row="2" data-col="0"></div>
      <div class="cell" id="cell-2-1" data-row="2" data-col="1"></div>
      <div class="cell" id="cell-2-2" data-row="2" data-col="2"></div>
    </div>
  </div>
  <script>
    // Paste the JavaScript code here
  </script>
</body>
</html>

<script>
// Tic Tac Toe Game

// Initialize the game board
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

// Variable to keep track of the current player ('X' or 'O')
let currentPlayer = 'X';

// Function to check if a player has won
function checkWin(player) {
  // Check rows and columns to see if "X" or "O" are in a winning formation
  for (let i = 0; i < 3; i++) {
    if ( (board[i][0] === player && board[i][1] === player && board[i][2] === player) || (board[0][i] === player && board[1][i] === player && board[2][i] === player) ) {
      return true;
    }
  }

  // Check diagonals
  if (
    // checks boxes going from bottom left to top right and the opposite
    (board[0][0] === player && board[1][1] === player && board[2][2] === player) ||
    (board[2][0] === player && board[1][1] === player && board[0][2] === player)
  ) 
  {
    // returns true if there is a diagonal
    return true;
  }
  // no one has won yet
  return false;
}

// Function to check if the game is a draw
function checkDraw() {
  for (let row of board) {
    if (row.includes('')) { // includes checks if has any empty cells
      return false;
    }
  }
  return true; // returns true if it has no more empty cells and no one has won
}

// Function to handle a player's move
function makeMove(row, col) {
  if (board[row][col] === '') {
    board[row][col] = currentPlayer;

    // Update the display
    document.getElementById(`cell-${row}-${col}`).textContent = currentPlayer;

    // Check if the current player has won
    if (checkWin(currentPlayer)) {
      alert(`Player ${currentPlayer} wins!`); // sends message that they won
      resetGame();
      return;
    }

    // Check if the game is a draw
    if (checkDraw()) {
      alert("It's a draw!"); //sends message if draw
      resetGame();
      return;
    }

    // Switch to the next player
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X'; 
    // ? is ternary operator that will rotate between "X" and "O" 
  }
}

// Function to reset the game
function resetGame() {
  // Clear the board
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

  // Clear the display
  let cells = document.getElementsByClassName('cell');
  for (let cell of cells) {
    cell.textContent = '';
  }

  // Reset the current player
  currentPlayer = 'X';
}

// Attach event listener to the game board
let boardElement = document.getElementById('board');
boardElement.addEventListener('click', function(event) { // adds the current player after a click
  let cell = event.target;
  let row = parseInt(cell.getAttribute('data-row'));
  let col = parseInt(cell.getAttribute('data-col'));
  makeMove(row, col);
});

  </script>