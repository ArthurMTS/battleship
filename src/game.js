function game(Player, Gameboard) {
   const gameInfo = {
     player: undefined,
     computer: undefined
   }

  function newGame(playerName) {
    const playerBoard = Gameboard()
    const computerBoard = Gameboard()

    const player = Player(playerName, playerBoard)
    const computer = Player("Computer", computerBoard, true)

    gameInfo.player = player;
    gameInfo.computer = computer;
  }

  return {
    gameInfo,
    newGame
  }
}

module.exports = game;