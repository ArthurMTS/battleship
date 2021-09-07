function board(player) {
  let i;

  const gameboard = document.createElement('div');
  gameboard.classList.add('gameboard');

  const grid = document.createElement('div');
  grid.classList.add('grid');

  const owner = document.createElement('p');
  owner.classList.add('owner');
  owner.textContent = `${player.name}'s board`;

  for(i = 0; i < 100; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');

    cell.addEventListener('click', () => {});

    grid.append(cell);
  }

  gameboard.append(grid, owner);

  return gameboard;
}

module.exports = board;