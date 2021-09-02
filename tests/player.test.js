const Player = require('./../src/factories/Player');
const Gameboard = require('./../src/factories/Gameboard');

it('Creating a Player', () => {
  expect(Player('Arthur').name).toBe('Arthur');
});

it('Giving the Player a Gameboard', () => {
  const gb = Gameboard();
  const player = Player('Arthur', gb);

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
  const gb = Gameboard();

  const player = Player('Silva', gb, true);

  expect(player.isBot).toBeTruthy();
});

it('Player attack', () => {
  const gb = Gameboard();
  const player = Player('Matheus', gb);

  player.attack(0, 0);

  expect(player.gameboard.grid[0][0]).toEqual({ hitted: true, ship: null });
});

it('Bot attack', () => {
  const gb = Gameboard();
  const player = Player('Computer', gb, true);

  const wasHitted = player.attack();

  expect(wasHitted).toBeTruthy();
});