function checkPositions(grid, x, y) {
  return checkPosition(grid, x, y) || checkPosition(grid, x - 1, y - 1) ||
         checkPosition(grid, x + 1, y + 1) || checkPosition(grid, x + 1, y - 1) ||
         checkPosition(grid, x - 1, y + 1) || checkPosition(grid, x - 1, y) ||
         checkPosition(grid, x, y - 1) || checkPosition(grid, x + 1, y) ||
         checkPosition(grid, x, y + 1);
}

function checkPosition(grid, x, y) {
  if (x < 0 || y >= 10 || y < 0 || y >= 10) return false;

  try {
    if (grid[x][y].ship != null) return true;
  } catch(e) {
    return true;
  }

  return false;
}

module.exports = checkPositions;