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
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
        return true;
      }
    }
  
    // Check columns
    for (let i = 0; i < 3; i++) {
      if (board[0][i] === player && board[1][i] === player && board[2][i] === player) {
        return true;
      }
    }
  
    // Check diagonals
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
      return true;
    }
  
    if (board[2][0] === player && board[1][1] === player && board[0][2] === player) {
      return true;
    }
  
    return false;
  }
  
  // Function to check if the game is a draw
  function checkDraw() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          return false;
        }
      }
    }
    return true;
  }
  
  // Function to handle a player's move
  function makeMove(row, col) {
    if (board[row][col] === '') {
      board[row][col] = currentPlayer;
  
      // Update the display
      document.getElementById(`cell-${row}-${col}`).textContent = currentPlayer;
  
      // Check if the current player has won
      if (checkWin(currentPlayer)) {
        alert(`Player ${currentPlayer} wins!`);
        resetGame();
        return;
      }
  
      // Check if the game is a draw
      if (checkDraw()) {
        alert("It's a draw!");
        resetGame();
        return;
      }
  
      // Switch to the next player
      currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
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
    for (let i = 0; i < cells.length; i++) {
      cells[i].textContent = '';
    }
  
    // Reset the current player
    currentPlayer = 'X';
  }
  
  // Attach event listeners to the cells
  let cells = document.getElementsByClassName('cell');
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', function() {
      let row = parseInt(this.getAttribute('data-row'));
      let col = parseInt(this.getAttribute('data-col'));
      makeMove(row, col);
    });
  }
  </script>