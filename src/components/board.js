function board(player, handler) {
  let i, j;

  const { name, gameboard } = player;

  const grid = document.createElement('div');
  grid.classList.add('grid');
  if (name === 'Computer') 
    grid.classList.add('player');
  else 
    grid.classList.add('computer');

  for(i = 0; i < 10; i++)
    for(j = 0; j < 10; j++) {
      const cell = document.createElement('button');
      cell.classList.add('cell');

      if (name === 'Computer' && gameboard.grid[i][j].ship != null)
        cell.textContent = '🚢';

      if (name !== 'Computer')
        setCellEvent(cell, gameboard, i, j);

      grid.append(cell);
    }

  return grid;
}

function setCellEvent(cell, gameboard, i, j) {
  cell.addEventListener('click', () => {
    if (gameboard.grid[i][j].ship === null)
      cell.classList.add('missed');
    else {
      cell.textContent = '🚢';
      cell.classList.add('hitted');
    }
  });
}

module.exports = board;