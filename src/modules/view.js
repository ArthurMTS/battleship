const header = require('../components/header');
const footer = require('../components/footer');

const View = (function() {
  const root = document.querySelector('#root');

  mainPage(root);

  function newGamePage() {
    const main = document.querySelector('#main');
    main.innerHTML = '';

    const subTitle = document.createElement('h2');
    subTitle.textContent = 'Enter your name';

    const form = document.createElement('form');
    form.id = 'newgame-form';

    const input = document.createElement('input');
    input.id = 'username-ipt';
    input.type = 'text';
    input.placeholder = 'Player name';
    input.required = true;

    const button = document.createElement('button');
    button.id = 'newgame-btn';
    button.type = 'submit';
    button.textContent = "New Game";

    form.append(input, button);
    main.append(subTitle, form);
  }

  return {
    newGamePage,
  }
})();

function mainPage(root) {
  header(root);

  const main = document.createElement('main');
  main.id = "main";

  root.append(main);

  footer(root);
}

module.exports = View;