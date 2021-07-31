const Player = require('../src/factories/Player');
const GameBoard = require('../src/factories/GameBoard');

it('Player name', () => {
  expect(Player('Arthur').name).toBe('Arthur');
});

it('Player\'s turn (1)', () => {
  expect(Player('Arthur').myTurn).toBeFalsy();
});

it('Player\'s turn (2)', () => {
  const newPlayer = Player('Arthur');
  newPlayer.myTurn = true;

  expect(newPlayer.myTurn).toBeTruthy();
});

it('Am i a bot (1)', () => {
  const newPlayer = Player('Bot', {}, true);

  expect(newPlayer.isBot).toBeTruthy();
});

it('Am i a bot (2)', () => {
  const newPlayer = Player('Matheus', {}, false);

  expect(newPlayer.isBot).toBeFalsy();
});

it('Am i a bot (3)', () => {
  const newPlayer = Player('Silva');

  expect(newPlayer.isBot).toBeFalsy();
});

it('Player have a Board', () => {
  const gb = GameBoard();

  const { gameboard } = Player('Arthur', gb);

  const toBe = (new Array(10)).fill((new Array(10)).fill({
    wasShooted: false,
    ship: null
  }))

  expect(gameboard.board).toEqual(toBe);
});

it('Player attact', () => {
  const gb = GameBoard();
  const myPlayer = Player('Arthur', gb);

  const attackInfo = myPlayer.attack(0, 0);

  expect(attackInfo).toEqual({
    wasShooted: true,
    ship: null
  });

  expect(myPlayer.gameboard.board[0][0]).toEqual({
    wasShooted: true,
    ship: null
  });
});

it('Bot attack', () => {
  const gb = GameBoard();
  const myPlayer = Player('Botson', gb, true);

  const attackInfo = myPlayer.attack();

  expect(attackInfo).toEqual({
    wasShooted: true,
    ship: null
  });
});