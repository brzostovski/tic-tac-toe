const game = (function() {
  /* Game module variables */
  const cells = document.querySelectorAll('.cell');
  const resetButton = document.querySelector('#reset');
  const gameOverCard = document.querySelector('#game-over-card');
  let resultDisplay = document.querySelector('#result-display');
  let playerOneInput = document.querySelector('#player1-name');
  let playerTwoInput = document.querySelector('#player2-name');

  /* Bindings */
  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      gameController.makeMove(cell);
      board.render(cell);
    })
  })
  resetButton.addEventListener('click', () => board.reset(cells));

  const gameController = (function() {
    resultDisplay.textContent = 'New Game';

    const _playerFactory = (symbol, name, value) => {
      return {
        symbol,
        name,
        value,
      }
    }

    const _players = [
      _playerFactory('X', playerOneInput.placeholder, 1),
      _playerFactory('O', playerTwoInput.placeholder, 4),
    ];
    let _activePlayer = _players[0];

    function resetPlayers() {
      _players[0].name = (playerOneInput.value || playerOneInput.placeholder);
      _players[1].name = (playerTwoInput.value || playerTwoInput.placeholder);
      _activePlayer = _players[0];
    }

    function _checkGameState() {
      function _checkBoardFull() {
        for (let i = 0; i < board.arr.length; i++) {
          if (board.arr[i] === '') {return false};
        }
        return true;
      }

      function _checkForWinner() {
        let _diagonsValue = [0, 0];
        let _playersSums = [];

        for (let i = 0; i < _players.length; i++) {
          _playersSums[i] = board.sideLen * _players[i].value;
        };

        for (let i = 0; i < board.sideLen; i++) {
          let _rowValue = 0;
          let _colValue = 0;

          for (let j = 0; j < board.sideLen; j++) {
            _rowValue += board.rows[i][j].value;
            _colValue += board.cols[i][j].value;
          };

          for (let k = 0; k < _players.length; k++) {
            _diagonsValue[k] += board.diagons[k][i].value;

            if (
              (_rowValue === _playersSums[k]) ||
              (_colValue === _playersSums[k])) {
                return _players[k];
            }
          }
        }

        for (let j = 0; j < _players.length; j++) {
          for (let k = 0; k < _players.length; k++) {
            if (_diagonsValue[k] === _playersSums[j]) {
              return _players[0];
            }
          }
        }
      }

      let _currentWinner = _checkForWinner();

      (!!_currentWinner)
        ? (resultDisplay.textContent = `${_currentWinner.name} wins!`)
        : (resultDisplay.textContent = 'Tie')

      if (_checkBoardFull() || _currentWinner) {
        board.toggleHidden([resetButton, gameOverCard]);
      };
    }

    function makeMove(cell) {
      if (!board.arr[cell.dataset.index]) {
        board.updateArr(cell.dataset.index, _activePlayer);
        (_activePlayer === _players[0])
          ? (_activePlayer = _players[1])
          : (_activePlayer = _players[0]);
      }
      _checkGameState();
    }

    return {
      resetActivePlayer: resetPlayers,
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
      elementsArr.forEach(element => element.classList.toggle('hidden'));
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
})()