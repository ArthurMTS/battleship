const view = (function() {
  const root = document.querySelector('#root');

  const header = document.createElement('header');
  header.id = 'main-header';
  const title = document.createElement('h1');
  title.textContent = '⚓ Battleship ⚓';

  const main = document.createElement('main');

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

  function renderStartPage() {}

  function renderGamePage() {}

  function gameOver() {}

  return {

  }
})();

module.exports = view;