const game = (function() {
  /* Global variables */

  /* Bindings */
  const cells = document.querySelectorAll('.cell');
  const resetButton = document.querySelector('#reset');
  const gameOverCard = document.querySelector('#game-over-card');
  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      gameController.makeMove(cell);
      board.render(cell);
    })
  })
  resetButton.addEventListener('click', () => board.reset(cells));

  const gameController = (function() {
    const playerFactory = (symbol, name) => {
      return {
        symbol,
        name,
      }
    }

    const player1 = playerFactory('X', 'player1');
    const player2 = playerFactory('O', 'player2');
    let activePlayer = player1;

    function resetActivePlayer() {
      activePlayer = player1;
    }

    function checkGameState() {
      function checkBoardFull() {
        for (let i = 0; i < board.arr.length; i++) {
          if (board.arr[i] === '') {return false};
        }
        return true;
      }

      function checkForWinner() {
        //find winner logic here
        let rows = {row1: [], row2: [], row3: []};
        let columns = {col1: [], col2: [], col3: []};
        let diagonals = {diagon1: [], diagon2: []};
      }

      if (checkBoardFull() || checkForWinner()) {
        board.toggleHidden([resetButton, gameOverCard]);
      };
    }

    function makeMove(cell) {
      if (!board.arr[cell.dataset.index]) {
        board.arr[cell.dataset.index] = activePlayer.symbol;
        (activePlayer === player1)
          ? (activePlayer = player2)
          : (activePlayer = player1);
      }
      checkGameState();
    }

    return {
      resetActivePlayer,
      makeMove,
    }
  })()

  const board = (function() {
    let arr = new Array(cells.length);
    for (i = 0; i < arr.length; i++) {
      arr[i] = '';
    }

    function render(cell) {
      cell.textContent = board.arr[cell.dataset.index];
      if (cell.textContent !== '') {cell.classList.add('populated')};
    }

    function toggleHidden(elementsArr) {
      window.setTimeout((() => {
        elementsArr.forEach(element => element.classList.toggle('hidden'))
      }),
      500); //timeout duration in ms
    }

    function reset(cells) {
      for (i = 0; i < cells.length; i++) {
        board.arr[i] = '';
        cells[i].classList.remove('populated');
        render(cells[i]);
      }
      gameController.resetActivePlayer();
      toggleHidden([resetButton, gameOverCard]);
    }

    return {
      arr,
      render,
      toggleHidden,
      reset,
    }
  })()
})()