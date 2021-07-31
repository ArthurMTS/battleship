const Ship = require('./Ship');

function GameBoard() {

  const board = (new Array(10)).fill((new Array(10)).fill({
    wasShooted: false,
    ship: null
  }))

  const ships = [];

  function placeShip(x, y, shipSize) {
    // faltando colocar o navio no 'board'
    // verificação para não colocar navios na mesma posição ou fora do grid
    const newShip = Ship(shipSize);

    newShip.positions.forEach((_, index) => {
      board[x][y + index].ship = {
        index: ships.length,
        position: y + index,
      }
    });

    ships.push(newShip);
  }

  function allSunk() {
    return ships.every(ship => ship.isSunk());
  }

  function attack(x, y) {
    if (x < 0 || x > 9 || y < 0 || y > 9) return null;
    if (board[x][y].wasShooted) return null;

    board[x][y].wasShooted = true;

    if (board[x][y].ship) {
      const { index, position } = board[x][y].ship;

      ships[index].hit(position);
    }

    return board[x][y];
  }

  return {
    board,
    ships,
    attack,
    placeShip,
    allSunk,
  }
}

module.exports = GameBoard;