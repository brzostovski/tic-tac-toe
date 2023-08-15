const game = (function() {
  /* Global variables */

  /* Bindings */
  const cells = document.querySelectorAll('.cell');
  const resetButton = document.querySelector('#reset');
  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      gameController.makeMove(cell);
      board.render(cell);
    })
  })
  resetButton.addEventListener('click', () => board.reset(cells));

  const gameController = (function() {
    let boardArr = new Array(cells.length);
    for (i = 0; i < boardArr.length; i++) {
      boardArr[i] = '';
    }

    const playerFactory = (symbol, name) => {
      return {
        symbol,
        name,
      }
    }

    const player1 = playerFactory('X', 'player1');
    const player2 = playerFactory('O', 'player2');
    let activePlayer = player1;

    function checkGameState() {
      function checkBoardFull() {
        for (let i = 0; i < boardArr.length; i++) {
          if (boardArr[i] === '') {return false};
        }
        return true;
      }

      if (checkBoardFull()) {
        board.toggleResetButton();
      };
    }

    function makeMove(cell) {
      if (!boardArr[cell.dataset.index]) {
        boardArr[cell.dataset.index] = activePlayer.symbol;
        (activePlayer === player1)
          ? (activePlayer = player2)
          : (activePlayer = player1);
      }
      checkGameState();
    }

    return {
      boardArr,
      makeMove,
    }
  })()

  const board = (function() {
    function render(cell) {
      cell.textContent = gameController.boardArr[cell.dataset.index];
      if (cell.textContent !== '') {cell.classList.add('populated')};
    }

    function toggleResetButton() {
      resetButton.classList.toggle('hidden');
    }

    function reset(cells) {
      for (i = 0; i < cells.length; i++) {
        gameController.boardArr[i] = '';
        cells[i].classList.remove('populated');
        render(cells[i]);
      }
      toggleResetButton();
    }

    return {
      render,
      toggleResetButton,
      reset,
    }
  })()
})()