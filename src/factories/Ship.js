function Ship(positions = []) {
  const length = positions.length;
  const hits = [];

  function hit(index) {
    if (!positions.includes(index)) return;
    if (hits.length >= length) return;
    if (hits.includes(index)) return;

    hits.push(index);
  }
  
  function isSunk() {
    return hits.length === length && hits.every(hit => positions.includes(hit));
  }

  return {
    positions,
    length,
    hits,
    hit,
    isSunk
  }
}

module.exports = Ship;