let gameOver;

function board(player) {
  let i, j;
  gameOver = false;

  const gameboard = document.createElement('div');
  gameboard.classList.add('gameboard');

  const grid = document.createElement('div');
  grid.classList.add('grid');

  const owner = document.createElement('p');
  owner.classList.add('owner');
  owner.textContent = `${player.name}'s board`;

  for(i = 0; i < 10; i++) {
    for(j = 0; j < 10; j++) {
      const cell = document.createElement('button');
      cell.classList.add('cell');

      if (player.name != 'Computer') {
        cell.classList.add('player');
      }

      setCellEvent(cell, player, i, j);

      grid.append(cell);
    }
  }

  gameboard.append(grid, owner);

  return gameboard;
}

function setCellEvent(cell, player, x, y) {
  cell.addEventListener('click', () => {
    if (player.gameboard.grid[x][y].hitted) return;
    if (player.name != 'Computer') return;
    if (gameOver) return;

    player.attack(x, y);

    if (player.gameboard.grid[x][y].ship == null) 
      cell.classList.add('missed');
    else {
      cell.classList.add('hitted');
      cell.textContent = '🚢';
    }

    if (player.gameboard.allSunk()) {
      alert(`${player.name} Win!`);
      gameOver = true;
    }
  });
}

module.exports = board;