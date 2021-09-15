const Ship = require('./Ship');

const getRandomInt = require('../utils/getRandomInt');
const checkPositions = require('../utils/checkPositions');

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

  function placeRandomShip(shipSize) {
    let x, y, vertical;

    do {
      x = getRandomInt(10);
      y = getRandomInt(10);

    } while (
      checkPositions(grid, x, y) || (x + shipSize >= 10 && y + shipSize >= 10) ||
      (checkPositions(grid, x + shipSize - 1, y) || checkPositions(grid, x, y + shipSize - 1))
    );

    if (x + shipSize >= 10) vertical = false;
    else if (y + shipSize >= 10) vertical = true;
    else vertical = getRandomInt(2) ? true : false;

    placeShip(x, y, shipSize, vertical);
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

  function removeShips() {
    if (ships.length === 0) return;
    let i, j;

    for (i = 0; i < 10; i++)
      for (j = 0; j < 10; j++) {
        if (grid[i][j].ship !== null) grid[i][j].ship = null;
      }

    for (i = 0; i <= ships.length; i++)
      ships.pop();
  }

  function allSunk() {
    return ships.every(ship => ship.isSunk());
  }

  return {
    grid,
    ships,
    placeShip,
    placeRandomShip,
    receiveAttack,
    removeShips,
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