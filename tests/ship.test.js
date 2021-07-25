const ship = require('../src/factories/ship');

it('Ship positions', () => {
  expect(ship([0, 1, 2]).positions).toEqual([0, 1, 2]);
});

it('Ship length', () => {
  expect(ship([0, 1, 2]).length).toBe(3);
});

it('Ship length 0', () => {
  expect(ship().length).toBe(0);
});

it('Ship 0 hits', () => {
  expect(ship([0, 1, 2]).hits.length).toBe(0);
});

it('Hit the ship', () => {
  const myShip = ship([12, 13, 14]);
  myShip.hit(12);
  myShip.hit(13);
  myShip.hit(14);
  myShip.hit(15);

  expect(myShip.hits).toEqual([12, 13, 14]);
});

it('Is ship sunk? (1)', () => {
  const myShip = ship([12, 13, 14]);
  myShip.hit(12);
  myShip.hit(13);
  myShip.hit(14);

  expect(myShip.isSunk()).toBeTruthy();
});

it('Is ship sunk? (2)', () => {
  const myShip = ship([12, 13, 14]);
  myShip.hit(12);

  expect(myShip.isSunk()).toBeFalsy();
});