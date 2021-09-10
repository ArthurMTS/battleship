const setCellEvent = require('../utils/setCellEvent');

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

      if (name === 'Computer' && gameboard.grid[i][j].ship !== null)
        cell.textContent = '🚢';

      setCellEvent(cell, gameboard, handler, i, j);

      grid.append(cell);
    }

  return grid;
}

module.exports = board;