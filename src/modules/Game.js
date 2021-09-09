const Gameboard = require('../factories/Gameboard');
const Player = require('../factories/Player');

class Game {
  constructor(view) {
    this.view = view;
    this.players = [];

    this.view.renderForm(this.newGame);
  }

  newGame = (playerName) => {
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

    const player = Player(playerName, computerBoard);
    const computer = Player('Computer', playerBoard);
   
    this.players.push(player);
    this.players.push(computer);

    this.view.gamePage(this.players[0], this.players[1]);
  }
}

module.exports = Game;