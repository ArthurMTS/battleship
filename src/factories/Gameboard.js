const Ship = require('./Ship');

function Gameboard() {
  const grid = createGrid(10);
  const ships = [];

  function placeShip(x, y, shipSize, vertical = false) {
    if (x < 0 || x >= 10 || y < 0 || y >= 10) return;
    if (x + shipSize >= 10 && y + shipSize >= 10) return;
    if (!vertical && y + shipSize >= 10) return;
    if (vertical && x + shipSize >= 10) return;
    if (grid[x][y].ship != null) return;

    const ship = Ship(shipSize);
    ships.push(ship);

    const shipId = ships.length - 1;

    if (!vertical)
      ship.hits.forEach((_, index) =>
        grid[x][y + index].ship = {
          id: shipId,
          position: index
        }
      );
    else 
      ship.hits.forEach((_, index) =>
        grid[x + index][y].ship = {
          id: shipId,
          position: index
        }
      );
  }

  function receiveAttack(x, y) {
    if (x < 0 || x >= 10 || y < 0 || y >= 10) return;

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