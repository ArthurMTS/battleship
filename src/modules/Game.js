const Player = require('../factories/Player');

class Game {
  constructor(view) {
    this.view = view;
    this.players = [];
    this.gameOver = false;

    this.view.renderForm(this.newGame);
  }

  newGame = (playerName) => {
    let i;

    // has computer gameboard
    const player = Player(playerName);
    for (i = 5; i >= 1; i--) {
      player.gameboard.placeRandomShip(i);
    }

    // has player gameboard
    const computer = Player('Computer', true);
    for (i = 5; i >= 1; i--) {
      computer.gameboard.placeRandomShip(i);
    }

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