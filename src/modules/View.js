const header = require('../components/header');
const footer = require('../components/footer');
const board = require('../components/board');

const setCellEvent = require('../utils/setCellEvent');

class View {
  constructor() {
    this.root = document.querySelector('#root');
    this.main = document.createElement('main');
    this.main.id = 'main';

    this.root.append(header(), this.main, footer());
  }

  renderForm(handler) {
    const newGame = document.createElement('div');
    newGame.id = 'newgame-page';

    const subTitle = document.createElement('h2');
    subTitle.textContent = 'Enter your name';

    const form = document.createElement('form');
    form.id = 'newgame-form';

    form.addEventListener('submit', e => {
      e.preventDefault();

      handler(input.value);
    });

    const input = document.createElement('input');
    input.id = 'username-ipt';
    input.type = 'text';
    input.placeholder = 'Player name';
    input.required = true;

    const button = document.createElement('button');
    button.id = 'newgame-btn';
    button.type = 'submit';
    button.textContent = 'New Game';

    form.append(input, button);
    newGame.append(subTitle, form);

    this.main.append(newGame);
  }

  gamePage(player, computer, handler) {
    this.main.innerHTML = '';

    this.main.append(board(computer, handler));
    this.main.append(board(player, handler));
  }

  loadBoard(player, name, gameboard, handler) {
    const grid = document.querySelector(`div .${player}`);
    grid.innerHTML = '';

    for(i = 0; i < 10; i++)
      for(j = 0; j < 10; j++) {
        const cell = document.createElement('button');
        cell.classList.add('cell');

        if (name !== 'Computer' && gameboard.grid[i][j].ship !== null)
          cell.textContent = '🚢';

        setCellEvent(cell, gameboard, handler, i, j);

        grid.append(cell);
      }
  }
}

module.exports = View;