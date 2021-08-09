const GameBoard = require('./factories/GameBoard');
const Player = require('./factories/Player');

const view = require('./modules/view');
const game = require('./game');

const gameLoop = game(Player, GameBoard);

view.renderStartPage(gameLoop.newGame);

console.log(gameLoop.gameInfo)