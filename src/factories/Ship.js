function Ship(shipSize) {
  if (shipSize < 1 || shipSize > 5) return null;

  const length = shipSize;
  const positions = (new Array(length)).fill(false);

  function hit(index) {
    if (index < 0 || index >= length) return;

    positions[index] = true;
  }
  
  function isSunk() {
    return positions.every(position => position);
  }

  return {
    positions,
    length,
    isSunk,
    hit
  }
}

module.exports = Ship;