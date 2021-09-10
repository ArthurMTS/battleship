function setCellEvent(cell, gameboard, handler, i, j) {
  if (gameboard.grid[i][j].hitted) {
    if (gameboard.grid[i][j].ship !== null) {
      cell.classList.add('hitted');
      cell.textContent = '🚢';
    } else cell.classList.add('missed');
  }

  cell.addEventListener('click', () => {
    handler(i, j);
  });
}

module.exports = setCellEvent;