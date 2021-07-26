const Ship = require('../src/factories/Ship');

it('Ship created', () => {
  expect(Ship(3).length).toBe(3);
});


it('Ship not created', () => {
  expect(Ship(0)).toBeNull();
  expect(Ship(-1)).toBeNull();
  expect(Ship(6)).toBeNull();
});

it('Ship has no damage', () => {
  expect(Ship(2).positions).toEqual([false, false]);
});

it('Ship was hitted', () => {
  const myShip = Ship(3);
  myShip.hit(1);

  expect(myShip.positions).toEqual([false, true, false]);
});

it('Ship was not hitted', () => {
  const myShip = Ship(3);
  myShip.hit(-1);
  myShip.hit(3);

  expect(myShip.positions).toEqual([false, false, false]);
});

it('Ship is sunk', () => {
  const myShip = Ship(1);
  myShip.hit(0);

  expect(myShip.isSunk()).toBeTruthy();
});

it('Ship is not sunk', () => {
  const myShip = Ship(2);
  myShip.hit(0);

  expect(myShip.isSunk()).toBeFalsy();
});