const Gameboard = require('./../src/factories/Gameboard');

it('Creating Gameboard', () => {
  let i, j, aux;
  const dummyGrid = [];

  for(i = 0; i < 10; i++) {
    aux = [];
    for (j = 0; j < 10; j++) {
      aux.push({
        hitted: false,
        ship: null
      });
    }
    dummyGrid.push(aux);
  }

  const gb = Gameboard();

  expect(gb.grid).toEqual(dummyGrid);
});

it('Placing a size one Ship', () => {
  const gb = Gameboard();

  gb.placeShip(0, 0, 1);

  expect(gb.grid[0][0].ship).toEqual({
    id: 0,
    position: 0
  });
});

it('Placing two size four Ships', () => {
  const gb = Gameboard();

  gb.placeShip(0, 0, 4);
  gb.placeShip(4, 5, 4);

  expect(gb.grid[0][0].ship).toEqual({ id: 0, position: 0 });
  expect(gb.grid[0][1].ship).toEqual({ id: 0, position: 1 });
  expect(gb.grid[0][2].ship).toEqual({ id: 0, position: 2 });
  expect(gb.grid[0][3].ship).toEqual({ id: 0, position: 3 });
  expect(gb.grid[4][5].ship).toEqual({ id: 1, position: 0 });
  expect(gb.grid[4][6].ship).toEqual({ id: 1, position: 1 });
  expect(gb.grid[4][7].ship).toEqual({ id: 1, position: 2 });
  expect(gb.grid[4][8].ship).toEqual({ id: 1, position: 3 });
});

it('Attacking the grid', () => {
  const gb = Gameboard();

  gb.receiveAttack(0, 0);

  expect(gb.grid[0][0]).toEqual({
    hitted: true,
    ship: null
  });
});

it('Attacking a ship on the grid', () => {
  const gb = Gameboard();

  gb.placeShip(0, 0, 2);

  gb.receiveAttack(0, 0);

  expect(gb.grid[0][0]).toEqual({
    hitted: true,
    ship: {
      id: 0,
      position: 0
    }
  });

  expect(gb.grid[0][1]).toEqual({
    hitted: false,
    ship: {
      id: 0,
      position: 1
    }
  });

  expect(gb.ships[0].hits[0]).toBeTruthy();
});

it('All ships sunk', () => {
  const gb = Gameboard();

  gb.placeShip(0, 0, 1);
  gb.receiveAttack(0, 0);

  expect(gb.allSunk()).toBeTruthy();
});

it('Not all ships sunk', () => {
  const gb = Gameboard();

  gb.placeShip(0, 0, 1);
  gb.placeShip(1, 2, 3);
  gb.receiveAttack(0, 0);

  expect(gb.allSunk()).toBeFalsy();
});