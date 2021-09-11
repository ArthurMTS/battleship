const Gameboard = require('../factories/Gameboard');
const Player = require('../factories/Player');

class Game {
  constructor(view) {
    this.view = view;
    this.players = [];
    this.gameOver = false;

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

    const player = Player(playerName, computerBoard, true);
    const computer = Player('Computer', playerBoard);
   
    this.players.push(player);
    this.players.push(computer);

    this.view.gamePage(this.players[0], this.players[1], this.handleBoardAttack);
  }

  handleBoardAttack = (x, y) => {
    if (this.gameOver) return;

    this.players[1].attack(x, y);
    this.players[0].attack();
  
    this.view.loadBoard('computer', this.players[1].name, this.players[1].gameboard, this.handleBoardAttack);
    this.view.loadBoard('player', this.players[0].name, this.players[0].gameboard, this.handleBoardAttack);
    
    this.checkWinner();
  }

  checkWinner() {
    if (this.players[1].gameboard.allSunk()) {
      this.gameOver = true;
      setTimeout(() => this.view.showWinner(this.players[0].name), 500);
    }
    else if (this.players[0].gameboard.allSunk()) {
      this.gameOver = true;
      setTimeout(() => this.view.showWinner(this.players[1].name), 500);
    }
  }
}

module.exports = Game;