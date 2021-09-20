const Player = require('./../src/factories/Player');

it('Creating a Player', () => {
  expect(Player('Arthur').name).toBe('Arthur');
});

it('Checking the Player Gameboard', () => {
  const player = Player('Arthur');

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

  expect(player.gameboard.grid).toEqual(dummyGrid);
});

it('Creating a bot player', () => {
  const player = Player('Silva', true);

  expect(player.isBot).toBeTruthy();
});

it('Player attack', () => {
  const player = Player('Matheus');

  player.attack(0, 0);

  expect(player.gameboard.grid[0][0]).toEqual({ hitted: true, ship: null });
});

it('Bot attack', () => {
  const player = Player('Computer', true);

  const wasHitted = player.attack();

  expect(wasHitted).toBeTruthy();
});