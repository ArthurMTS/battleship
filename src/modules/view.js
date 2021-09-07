const header = require('../components/header');
const footer = require('../components/footer');
const board = require('../components/board');

const View = (function() {
  const root = document.querySelector('#root');
  let player, computer;

  mainPage(root);

  function newGamePage(handler) {
    const main = document.querySelector('#main');
    main.innerHTML = '';

    const newGame = document.createElement('div');
    newGame.id = 'newgame-page';

    const subTitle = document.createElement('h2');
    subTitle.textContent = 'Enter your name';

    const form = document.createElement('form');
    form.id = 'newgame-form';

    form.addEventListener('submit', e => {
      e.preventDefault();

      const [p, c] = handler(input.value);
      player = p;
      computer = c;

      gamePage();
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
    main.append(newGame);
  }

  function gamePage() {
    const main = document.querySelector('#main');
    main.innerHTML = '';
    main.classList.add('game-page');

    main.append(board(player));
    main.append(board(computer));
  }

  return {
    newGamePage
  }
})();

function mainPage(root) {
  header(root);

  const main = document.createElement('main');
  main.id = 'main';

  root.append(main);

  footer(root);
}

module.exports = View;