const Ship = require('../src/factories/Ship');

it('Ship positions', () => {
  expect(Ship([0, 1, 2]).positions).toEqual([0, 1, 2]);
});

it('Ship length', () => {
  expect(Ship([0, 1, 2]).length).toBe(3);
});

it('Ship length 0', () => {
  expect(Ship().length).toBe(0);
});

it('Ship 0 hits', () => {
  expect(Ship([0, 1, 2]).hits.length).toBe(0);
});

it('Hit the ship', () => {
  const myShip = Ship([12, 13, 14]);
  myShip.hit(12);
  myShip.hit(13);
  myShip.hit(14);
  myShip.hit(15);

  expect(myShip.hits).toEqual([12, 13, 14]);
});

it('Is ship sunk? (1)', () => {
  const myShip = Ship([12, 13, 14]);
  myShip.hit(12);
  myShip.hit(13);
  myShip.hit(14);

  expect(myShip.isSunk()).toBeTruthy();
});

it('Is ship sunk? (2)', () => {
  const myShip = Ship([12, 13, 14]);
  myShip.hit(12);

  expect(myShip.isSunk()).toBeFalsy();
});