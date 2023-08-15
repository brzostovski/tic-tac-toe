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
  resetButton.addEventListener('click', () => board.clear(cells));

  const gameController = (function(){
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

    function checkEndGame() {
      for (let i = 0; i < boardArr.length; i++) {
        if (boardArr[i] === '') {return false};
      }
      return true;
    }

    function makeMove(cell) {
      if (!boardArr[cell.dataset.index]) {
        boardArr[cell.dataset.index] = activePlayer.symbol;
        (activePlayer === player1)
          ? (activePlayer = player2)
          : (activePlayer = player1);
      }
      if (checkEndGame()) {
        board.toggleResetButton();
      };
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

    function clear(cells) {
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
      clear,
    }
  })()

  return {gameController}
})()