const header = require('../components/header');
const footer = require('../components/footer');

class View {
  constructor() {
    this.main = document.createElement('main');
    this.main.id = 'main';
    this.playerGrid;
    this.computerGrid;

    document.querySelector('#root').append(
      header(), 
      this.main, 
      footer()
    );
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
    input.placeholder = 'Player name';
    input.type = 'text';
    input.required = true;

    const button = document.createElement('button');
    button.textContent = 'New Game';
    button.classList.add('pink-button');
    button.type = 'submit';

    form.append(input, button);
    newGame.append(subTitle, form);

    this.main.append(newGame);
  }

  settingPlayerBoard(computer, handler) {
    this.main.innerHTML = '';
    let shipSize = 5;
    let vertical = false;

    const text = document.createElement('p');
    text.classList.add('bottom-text');
    text.textContent = `Place ship with size ${shipSize}`;

    const grid = document.createElement('div');
    grid.classList.add('grid');
    grid.classList.add('computer');
    grid.addEventListener('mouseover', e => {
      if (shipSize > 5 || shipSize < 0) return;

      const cell = e.path[0];
      cell.style.background = '#AF2A40';
    });

    grid.addEventListener('mouseout', e => {
      const cell = e.path[0];
      cell.style.background = '#fff';
    });

    grid.addEventListener('click', e => {
      if (shipSize > 5 || shipSize < 0) return;

      const cell = e.path[0];
      const x = +cell.getAttribute('data-x');
      const y = +cell.getAttribute('data-y');

      if (computer.gameboard.placeShip(x, y, shipSize, vertical)) {
        shipSize--;
        this.loadBoard('computer', computer.gameboard);
        if (shipSize === 0) text.textContent = 'Ready to go';
        else text.textContent = `Place ship with size ${shipSize}`;
      }
    });

    const buttons = document.createElement('div');
    buttons.classList.add('buttons');

    const startGame = document.createElement('button');
    startGame.textContent = 'Start Game';
    startGame.classList.add('pink-button');
    startGame.addEventListener('click', () => {
      if (computer.gameboard.ships.length === 5)
        handler();
    });

    const clean = document.createElement('button');
    clean.textContent = 'Clean';
    clean.classList.add('pink-button');
    clean.addEventListener('click', () => {
      shipSize = 5;
      text.textContent = `Place ship with size ${shipSize}`;
      computer.gameboard.removeShips();
      this.loadBoard('computer', computer.gameboard);
    });

    const random = document.createElement('button');
    random.textContent = 'Random';
    random.classList.add('pink-button');
    random.addEventListener('click', () => {
      computer.gameboard.removeShips();

      for (i = 5; i >= 1; i--) {
        computer.gameboard.placeRandomShip(i);
      }

      this.loadBoard('computer', computer.gameboard);
      shipSize = 0;
      text.textContent = `Ready to go`;
    });

    const rotate = document.createElement('button');
    rotate.textContent = 'Rotate';
    rotate.classList.add('pink-button');
    rotate.addEventListener('click', () => vertical = !vertical);

    buttons.append(random, rotate, clean, startGame);

    this.computerGrid = grid;

    this.main.append(grid, buttons, text);
    this.loadBoard('computer', computer.gameboard);
  }

  gamePage(player, computer, handler) {
    this.main.innerHTML = '';

    const gridPlayer = document.createElement('div');
    gridPlayer.classList.add('grid');
    gridPlayer.classList.add('player');
    
    const gridComputer = document.createElement('div');
    gridComputer.classList.add('grid');
    gridComputer.classList.add('computer');

    this.playerGrid = gridPlayer;
    this.computerGrid = gridComputer;

    this.main.append(this.computerGrid, this.playerGrid);
    
    this.loadBoard('player', player.gameboard, handler);
    this.loadBoard('computer', computer.gameboard, handler);
  }

  loadBoard(player, gameboard, handler) {
    const grid = player === 'player' ? this.playerGrid : this.computerGrid;
    grid.innerHTML = '';

    let i, j;

    for(i = 0; i < 10; i++)
      for(j = 0; j < 10; j++) {
        const cell = document.createElement('button');
        cell.title = 'cell';
        cell.setAttribute('data-x', i);
        cell.setAttribute('data-y', j);
        cell.classList.add('cell');

        const { hitted, ship } = gameboard.grid[i][j];

        if (player === 'computer' && ship !== null)
          cell.textContent = '🚢';

        if (hitted && ship !== null) {
            cell.classList.add('hitted');
            cell.textContent = '🚢';
        } else if (hitted && ship === null) 
          cell.classList.add('missed');
        else 
          cell.classList.add('scale');

        if (!hitted && player !== 'computer')
          this.setCellEvent(cell, handler, i, j);
      
        grid.append(cell);
      }
  }

  setCellEvent(cell, handler, i, j) {
    cell.addEventListener('click', () => handler(i, j));
  }

  showWinner(winner) {
    const firstGrid = document.querySelector('.grid');

    const div = document.createElement('div');
    div.id = 'winner';

    const p = document.createElement('p');
    p.textContent = `✌️ ${winner} WINS! ✌️`;

    const button = document.createElement('button');
    button.textContent = 'Play again';
    button.classList.add('pink-button');
    button.addEventListener('click', () => location.reload());

    div.append(p, button);
    firstGrid.after(div);
  }
}

module.exports = View;