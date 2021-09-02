function Player(playerName, gb = undefined, bot = false) {
  const name = playerName;
  const gameboard = gb;
  const isBot = bot;

  function attack(x, y) {
    if (isBot) {
      // random x and y
      x = getRandomInt(10);
      y = getRandomInt(10);
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

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

module.exports = Player;