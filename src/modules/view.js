const header = require('../components/header');
const footer = require('../components/footer');

const View = (function() {
  const root = document.querySelector('#root');

  mainPage(root);

  return {}
})();

function mainPage(root) {
  header(root);

  const main = document.createElement('main');
  main.id = "main";

  root.append(main);

  footer(root);
}

module.exports = View;