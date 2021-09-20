function Ship(shipSize) {
  const length = shipSize;
  const hits = initializeHits(shipSize);

  function hit(position) {
    if (position < 0 || position >= length) return;

    hits[position] = true;
  }

  function isSunk() {
    return hits.every(position => position === true);
  }

  return {
    length,
    hits,
    hit,
    isSunk
  }
}

function initializeHits(shipSize) {
  let i;
  const hits = [];

  for (i = 0; i < shipSize; i++)
    hits.push(false);

  return hits;
}

module.exports = Ship;