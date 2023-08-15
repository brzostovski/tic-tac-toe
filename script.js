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

    const players = [
      playerFactory('X', 'player1'),
      playerFactory('O', 'player2'),
    ];
    let activePlayer = players[0];

    function resetActivePlayer() {
      activePlayer = players[0];
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
      }

      if (checkBoardFull() || checkForWinner()) {
        board.toggleHidden([resetButton, gameOverCard]);
      };
    }

    function makeMove(cell) {
      if (!board.arr[cell.dataset.index]) {
        board.arr[cell.dataset.index] = activePlayer.symbol;
        (activePlayer === players[0])
          ? (activePlayer = players[1])
          : (activePlayer = players[0]);
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
    let sideLen = Math.sqrt(arr.length);
    let rows = [];
    let cols = [];
    let diagons = [[], []];

    for (let i = 0; i < sideLen; i++) {
      rows[i] = [];
      cols[i] = [];
    };
    
    for (let i = 0; i < sideLen; i++) {
      for (let j = 0; j < sideLen; j++) {
        rows[j][i] = cells[i + (j * 3)];
        cols[i][j] = cells[i + (j * 3)];
      };
    };

    for (let i = 0; i < sideLen; i++) {
      diagons[0][i] = rows[i][i];
      diagons[1][i] = rows[i][sideLen - 1 -i];
    };

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
      sideLen,
      cols,
      rows,
      diagons,
      render,
      toggleHidden,
      reset,
    }
  })()
})()