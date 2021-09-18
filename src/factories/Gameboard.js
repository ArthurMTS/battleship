const Ship = require('./Ship');

const getRandomInt = require('../utils/getRandomInt');
const checkPositions = require('../utils/checkPositions');

function Gameboard() {
  const grid = createGrid(10);
  let ships = [];

  function placeShip(x, y, shipSize, vertical = false) {
    if (ships.length >= 5) return false;
    if (x < 0 || x >= 10 || y < 0 || y >= 10) return false;
    if (!vertical && y + shipSize >= 10) return false;
    if (vertical && x + shipSize >= 10) return false;
    if (grid[x][y].ship != null) return false;

    const ship = Ship(shipSize);
    ships.push(ship);

    const id = ships.length - 1;

    if (vertical)
      ship.hits.forEach((_, position) =>
        grid[x + position][y].ship = {
          id,
          position
        }
      );
    else 
      ship.hits.forEach((_, position) =>
        grid[x][y + position].ship = {
          id,
          position
        }
      );

    return true;
  }

  function placeRandomShip(shipSize) {
    if (ships.length >= 5) return;
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
    if (x < 0 || x >= 10 || y < 0 || y >= 10) return false;

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

    ships.splice(0, ships.length);
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