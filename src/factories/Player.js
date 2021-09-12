const Gameboard = require('../factories/Gameboard');

const getRandomInt = require('../utils/getRandomInt');

function Player(playerName, bot = false) {
  const name = playerName;
  const gameboard = Gameboard();
  const isBot = bot;

  function attack(x, y) {
    if (isBot) {
      do {
        x = getRandomInt(10);
        y = getRandomInt(10);
      } while (gameboard.grid[x][y].hitted);
    }

    return gameboard.receiveAttack(x, y);
  }

  return {
    name,
    gameboard,
    isBot,
    attack
  }
}

module.exports = Player;