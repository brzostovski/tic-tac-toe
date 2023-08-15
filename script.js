const game = (function() {
  /* Global variables */
  const cells = document.querySelectorAll('.cell');
  const resetButton = document.querySelector('#reset');
  const gameOverCard = document.querySelector('#game-over-card');

  /* Bindings */
  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      gameController.makeMove(cell);
      board.render(cell);
    })
  })
  resetButton.addEventListener('click', () => board.reset(cells));

  const gameController = (function() {
    const _playerFactory = (symbol, name, value) => {
      return {
        symbol,
        name,
        value,
      }
    }

    const _players = [
      _playerFactory('X', 'player1', 1),
      _playerFactory('O', 'player2', 4),
    ];
    let activePlayer = _players[0];

    function resetActivePlayer() {
      activePlayer = _players[0];
    }

    function _checkGameState() {
      function _checkBoardFull() {
        for (let i = 0; i < board.arr.length; i++) {
          if (board.arr[i] === '') {return false};
        }
        return true;
      }

      function _checkForWinner() {
        let diagonsValue = [0, 0];
        for (let i = 0; i < board.sideLen; i++) {
          let rowValue = 0;
          let colValue = 0;
          for (let j = 0; j < board.sideLen; j++) {
            rowValue += board.rows[i][j].value;
            colValue += board.cols[i][j].value;
          };
          diagonsValue[0] += board.diagons[0][i].value;
          diagonsValue[1] += board.diagons[1][i].value;

          if (
            (rowValue === (3 * _players[0].value)) ||
            (colValue === (3 * _players[0].value))) {
              return _players[0];
          } else if (
            (rowValue === (3 * _players[1].value)) ||
            (colValue === (3 * _players[1].value))) {
              return _players[1];
          }
        }
        if (diagonsValue[0] === (3 * _players[0].value)) {
          return _players[0];
        } else if (diagonsValue[1] === (3 * _players[1].value)) {
          return _players[1];
        }
      }

      if (_checkBoardFull() || _checkForWinner()) {
        board.toggleHidden([resetButton, gameOverCard]);
      };
    }

    function makeMove(cell) {
      if (!board.arr[cell.dataset.index]) {
        board.updateArr(cell.dataset.index, activePlayer);
        (activePlayer === _players[0])
          ? (activePlayer = _players[1])
          : (activePlayer = _players[0]);
      }
      _checkGameState();
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

    function _updateArrChildren() {  
      for (let i = 0; i < sideLen; i++) {
        rows[i] = [];
        cols[i] = [];
      };
      
      for (let i = 0; i < sideLen; i++) {
        for (let j = 0; j < sideLen; j++) {
          rows[j][i] = arr[i + (j * 3)];
          cols[i][j] = arr[i + (j * 3)];
        };
      };

      for (let i = 0; i < sideLen; i++) {
        diagons[0][i] = rows[i][i];
        diagons[1][i] = rows[i][sideLen - 1 -i];
      };
    }

    function updateArr(index = 0, symbol = '') {
      arr[index] = symbol;
      _updateArrChildren();
    }

    function render(cell) {
      cell.textContent = board.arr[cell.dataset.index].symbol;
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
        arr[i] = '';
        cells[i].classList.remove('populated');
        render(cells[i]);
      }
      updateArr();
      gameController.resetActivePlayer();
      toggleHidden([resetButton, gameOverCard]);
    }

    return {
      arr,
      sideLen,
      rows,
      cols,
      diagons,
      updateArr,
      render,
      toggleHidden,
      reset,
    }
  })()
  return {
    gameController,
    board,
  }
})()