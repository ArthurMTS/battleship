const Ship = require('./Ship');

const MAX = 10;

function Gameboard() {
  const grid = createGrid(MAX);
  const ships = [];

  function placeShip(x, y, shipSize) {
    // need some refactoring
    // - don't allow ships on the same positions
    // - allow to place ships vertically
    if (x < 0 || x >= MAX || y < 0 || y >= MAX) return;
    if (x + shipSize >= 10 && y + shipSize >= 10) return;

    const ship = Ship(shipSize);
    ships.push(ship);

    const shipId = ships.length - 1;

    ship.hits.forEach((_, index) =>
      grid[x][y + index].ship = {
        id: shipId,
        position: index
      }
    );
  }

  function receiveAttack(x, y) {
    if (x < 0 || x >= MAX || y < 0 || y >= MAX) return;

    const { hitted, ship } = grid[x][y];

    if (hitted) return false;

    grid[x][y].hitted = true;

    if (ship != null) {
      const { id, position } = ship;

      ships[id].hit(position);
    }

    return true;
  }

  function allSunk() {
    return ships.every(ship => ship.isSunk());
  }

  return {
    grid,
    ships,
    placeShip,
    receiveAttack,
    allSunk
  }
}

function createGrid(gridSize) {
  let i, j, aux;
  const grid = [];

  for(i = 0; i < gridSize; i++) {
    aux = [];
    for (j = 0; j < gridSize; j++)
      aux.push({
        hitted: false,
        ship: null
      });
    grid.push(aux);
  }

  return grid;
}

module.exports = Gameboard;