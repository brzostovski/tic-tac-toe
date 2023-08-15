const game = (function() {
  /* Variables */
  let boardArr = [];

  /* Bindings */
  (function() {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.querySelector('#reset');

    cells.forEach(cell => {
      cell.addEventListener('click', () => {
        gameController.makeMove(cell);
        board.render(cell);
      })
    })
    resetButton.addEventListener('click', () => board.clear(cells));
  })()

  const gameController = (function(){
    const playerFactory = (symbol, name) => {
      return {
        symbol,
        name,
      }
    }

    const player1 = playerFactory('X', 'player1');
    const player2 = playerFactory('O', 'player2');
    let activePlayer = player1;

    function makeMove(cell) {
      if (!boardArr[cell.dataset.index]) {
        boardArr[cell.dataset.index] = activePlayer.symbol;
        (activePlayer === player1)
          ? (activePlayer = player2)
          : (activePlayer = player1);
      }
    }

    return {
      makeMove,
    }
  })()

  const board = (function() {
    function render(cell) {
      cell.textContent = boardArr[cell.dataset.index];
      if (cell.textContent !== '') {cell.classList.add('populated')};
    }

    function clear(cells) {
      boardArr = [];
      cells.forEach(cell => {
        cell.classList.remove('populated');
        render(cell);
      })
    }

    return {
      render,
      clear,
    }
  })()
})()