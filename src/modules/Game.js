const Player = require('../factories/Player');

class Game {
  constructor(view) {
    this.view = view;
    this.players = [];
    this.gameOver = false;

    this.view.renderForm(this.newGame);
  }

  newGame = (playerName) => {
    // has computer gameboard
    const player = Player(playerName);
    player.gameboard.placeShip(0, 0, 5);
    player.gameboard.placeShip(1, 0, 4);
    player.gameboard.placeShip(2, 0, 3);
    player.gameboard.placeShip(3, 0, 2);
    player.gameboard.placeShip(4, 0, 1);

    // has player gameboard
    const computer = Player('Computer', true);
    computer.gameboard.placeShip(0, 0, 5);
    computer.gameboard.placeShip(1, 0, 4);
    computer.gameboard.placeShip(2, 0, 3);
    computer.gameboard.placeShip(3, 0, 2);
    computer.gameboard.placeShip(4, 0, 1);

    this.players.push(player);
    this.players.push(computer);

    this.view.gamePage(this.players[0], this.players[1], this.handleBoardAttack);
  }

  handleBoardAttack = (x, y) => {
    if (this.gameOver) return;

    this.players[0].attack(x, y);
    this.view.loadBoard(
      'player',
      this.players[0].gameboard,
      this.handleBoardAttack
    );
    this.checkWinner();

    if (this.gameOver) return;

    this.players[1].attack();
    this.view.loadBoard(
      'computer',
      this.players[1].gameboard,
      this.handleBoardAttack
    );
    this.checkWinner();
  }

  checkWinner() {
    if (this.players[0].gameboard.allSunk()) {
      this.gameOver = true;
      this.view.showWinner(this.players[0].name);
    }
    else if (this.players[1].gameboard.allSunk()) {
      this.gameOver = true;
      this.view.showWinner(this.players[1].name);
    }
  }
}

module.exports = Game;