function Player(playerName, gb, bot = false) {
  const name = playerName;
  const isBot = bot;
  const gameboard = gb;
  
  let myTurn = false;

  function attack(x = undefined, y = undefined) {
    if (isBot) {
      x = getRandomInt(10);
      y = getRandomInt(10);
    } 

    return gameboard.attack(x, y);
  }

  return {
    name,
    myTurn,
    isBot,
    gameboard,
    attack
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

module.exports = Player;