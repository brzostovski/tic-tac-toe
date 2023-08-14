const game = (function() {
  /* Variables */
  const cells = document.querySelectorAll('.cell');
  const resetButton = document.querySelector('#reset');
  let board = [];
  let prevTurn = 'player2';

  /* Bindings */
  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      assignValue(cell);
      render();
    })
  })

  resetButton.addEventListener('click', () => clearBoard());

  /* Player factory */
  const players = (function() {
    const playerFactory = (symbol) => {
      return {
        symbol
      }
    }
    const player1 = playerFactory('X');
    const player2 = playerFactory('O');
    return {
      player1,
      player2,
    }
  })()

  /* Functions */
  function assignValue(cell) {
    if (!board[cell.dataset.index]) {
      (prevTurn === 'player1')
        ? (prevTurn = 'player2')
        : (prevTurn = 'player1');
      board[cell.dataset.index] = players[prevTurn].symbol;
    }
  }

  function render() {
    cells.forEach(cell => {
      cell.textContent = board[cell.dataset.index];
      if (cell.textContent !== '') {cell.classList.add('populated')};
    })
  }

  function clearBoard() {
    board = [];
    cells.forEach(cell => {
      cell.classList.remove('populated');
    })
    render();
  }

  return {};
})()