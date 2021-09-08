function board(player) {
  let i, j;

  const gameboard = document.createElement('div');
  gameboard.classList.add('grid');

  for(i = 0; i < 10; i++) {
    for(j = 0; j < 10; j++) {
      const cell = document.createElement('button');
      cell.classList.add('cell');

      if (player.name == 'Computer') {
        cell.classList.add('player');
      }

      gameboard.append(cell);
    }
  }

  return gameboard;
}

module.exports = board;