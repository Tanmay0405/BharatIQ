document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const cells = document.querySelectorAll(".cell");
    const status = document.getElementById("status");
    const restartButton = document.getElementById("restartButton");
  
    let currentPlayer = "X";
    let gameActive = true;
  
    function checkWin() {
      const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
  
      for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
          gameActive = false;
          cells[a].classList.add("win");
          cells[b].classList.add("win");
          cells[c].classList.add("win");
          status.textContent = `Player ${currentPlayer} wins!`;
        }
      }
  
      if (Array.from(cells).every(cell => cell.textContent !== "")) {
        gameActive = false;
        status.textContent = "It's a draw!";
      }
    }
  
    function handleCellClick(e) {
      const cell = e.target;
  
      if (!gameActive || cell.textContent !== "") {
        return;
      }
  
      cell.textContent = currentPlayer;
      cell.classList.add("taken");
  
      checkWin();
  
      currentPlayer = currentPlayer === "X" ? "O" : "X";
  
      if (gameActive) {
        status.textContent = `Player ${currentPlayer}'s turn`;
      }
    }
  
    function restartGame() {
      cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken", "win");
      });
  
      status.textContent = `Player ${currentPlayer}'s turn`;
      gameActive = true;
    }
  
    cells.forEach(cell => {
      cell.addEventListener("click", handleCellClick);
    });
  
    restartButton.addEventListener("click", restartGame);
  });
  