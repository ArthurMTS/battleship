const Player = require('../factories/Player');
const Gameboard = require('../factories/Gameboard');

const Game = (function() {

  function newGame(playerName) {
    const playerBoard = Gameboard();
    playerBoard.placeShip(0, 0, 5);
    playerBoard.placeShip(1, 0, 4);
    playerBoard.placeShip(2, 0, 3);
    playerBoard.placeShip(3, 0, 2);
    playerBoard.placeShip(4, 0, 1);

    const computerBoard = Gameboard();
    computerBoard.placeShip(0, 0, 5);
    computerBoard.placeShip(1, 0, 4);
    computerBoard.placeShip(2, 0, 3);
    computerBoard.placeShip(3, 0, 2);
    computerBoard.placeShip(4, 0, 1);

    const player = Player(playerName, playerBoard);
    const computer = Player('Computer', computerBoard);
   
    return [player, computer];
  }

  return {
    newGame
  }
})();

module.exports = Game;