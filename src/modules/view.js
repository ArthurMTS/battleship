const view = (function() {
  const root = document.querySelector('#root');

  const header = document.createElement('header');
  header.id = 'main-header';
  const title = document.createElement('h1');
  title.textContent = '⚓ Battleship ⚓';

  const main = document.createElement('main');
  main.id =  'main';

  const footer = document.createElement('footer');
  footer.id = 'main-footer';
  const copy = document.createElement('p');
  copy.textContent = 'Made with ❤️ by ArthurMTS';

  header.append(title);
  footer.append(copy);

  root.append(
    header,
    main,
    footer
  )

  function renderStartPage(newGame) {
    main.innerHTML = '';

    const startPage = document.createElement('div');
    startPage.id = 'start-page';

    const title = document.createElement('h2');
    title.textContent = 'Battleship Game';

    const form = document.createElement('form');

    form.addEventListener('submit', event => {
      event.preventDefault();

      newGame(input.value);

      renderGamePage();
    });
    
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Player name';
    input.required = true;

    const submit = document.createElement('button');
    submit.textContent = 'Start Game';
    submit.type = 'submit';

    form.append(input, submit);

    startPage.append(title, form);

    main.append(startPage);
  }

  function renderGamePage() {
    main.innerHTML = '';
  }

  function gameOver() {}

  return {
    renderStartPage
  }
})();

module.exports = view;