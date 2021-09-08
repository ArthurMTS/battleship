const header = require('../components/header');
const footer = require('../components/footer');

class View {
  constructor() {
    this.root = document.querySelector('#root');
    this.main = document.createElement('main');
    this.main.id = 'main';

    this.root.append(header(), this.main, footer());
  }

  renderForm() {
    const newGame = document.createElement('div');
    newGame.id = 'newgame-page';

    const subTitle = document.createElement('h2');
    subTitle.textContent = 'Enter your name';

    const form = document.createElement('form');
    form.id = 'newgame-form';

    form.addEventListener('submit', e => {
      e.preventDefault();
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
}

module.exports = View;