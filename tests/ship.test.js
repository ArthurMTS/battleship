const Ship = require('./../src/factories/Ship');

it('Create Ship with length 1', () => {
  const ship = Ship(1);

  expect(ship.length).toBe(1);
  expect(ship.hits.length).toBe(1);
});

it('Create Ship with length 2', () => {
  const ship = Ship(2);

  expect(ship.length).toBe(2);
  expect(ship.hits.length).toBe(2);
});

it('Hit Ship', () => {
  const ship = Ship(5);

  ship.hit(0);

  expect(ship.hits[0]).toBeTruthy();
});

it('Miss Ship', () => {
  const ship = Ship(5);

  ship.hit(5);

  expect(ship.hits.every(position => position === false)).toBeTruthy();
});

it('Ship is sunk', () => {
  const ship = Ship(1);

  ship.hit(0);

  expect(ship.isSunk()).toBeTruthy();
});

it('Ship is not sunk', () => {
  const ship = Ship(2);

  ship.hit(0);

  expect(ship.isSunk()).toBeFalsy();
});
