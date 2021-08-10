const GameBoard = require('../src/factories/GameBoard');
const Ship = require('../src/factories/Ship');

it('Board created', () => {
  const expecting = GameBoard().board;
  const toBe = (new Array(10)).fill((new Array(10)).fill({
    wasShooted: false,
    ship: null
  }))

  expect(expecting).toEqual(toBe);
});

it('No ships', () => {
  const gb = GameBoard();

  expect(gb.ships).toEqual([]);
});

it('Adding a ship', () => {
  const gb = GameBoard();
  const ship = Ship(1)

  gb.placeShip(ship, 0, 0);

  expect(gb.ships.length).toBe(1);
  expect(gb.ships[0].length).toBe(1);
  expect(gb.board[0][0].ship).toEqual({
    index: 0,
    position: 0
  });
});

it('No ships sunk', () => {
  const gb = GameBoard();
  const ship = Ship(1);

  gb.placeShip(ship, 0, 0);

  expect(gb.allSunk()).toBeFalsy();
});

it('Are all ships sunk?', () => {
  const gb = GameBoard();

  const ship1 = Ship(1)
  const ship2 = Ship(2)

  gb.placeShip(ship1, 0, 0);
  gb.placeShip(ship2, 1, 2);

  gb.ships[0].hit(0);
  gb.ships[1].hit(0);
  gb.ships[1].hit(1);

  expect(gb.allSunk()).toBeTruthy();
});

it('Miss attack', () => {
  const gb = GameBoard();

  expect(gb.attack(0, 0)).toEqual({
    wasShooted: true,
    ship: null
  });
});

it('Hit attack', () => {
  const gb = GameBoard();
  const ship = Ship(1)

  gb.placeShip(ship, 0, 0);

  expect(gb.attack(0, 0)).toEqual({
    wasShooted: true,
    ship: { index: 0, position: 0 }
  });

  expect(gb.ships[0].isSunk()).toBeTruthy();

  expect(gb.allSunk()).toBeTruthy();
});