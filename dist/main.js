/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/footer.js":
/*!**********************************!*\
  !*** ./src/components/footer.js ***!
  \**********************************/
/***/ ((module) => {

eval("function footer() {\n  var footer = document.createElement('footer');\n  footer.id = 'main-footer';\n  var p = document.createElement('p');\n  p.textContent = 'Made with ❤️ by ArthurMTS';\n  footer.append(p);\n  return footer;\n}\n\nmodule.exports = footer;\n\n//# sourceURL=webpack://battleship/./src/components/footer.js?");

/***/ }),

/***/ "./src/components/header.js":
/*!**********************************!*\
  !*** ./src/components/header.js ***!
  \**********************************/
/***/ ((module) => {

eval("function header() {\n  var header = document.createElement('header');\n  header.id = 'main-header';\n  var title = document.createElement('h1');\n  title.textContent = 'Battleship';\n  title.id = 'title';\n  title.addEventListener('click', function () {\n    return location.reload();\n  });\n  var nav = document.createElement('nav');\n  nav.id = 'nav';\n  var list = document.createElement('ul');\n  var github = document.createElement('li');\n  var githubLink = document.createElement('a');\n  githubLink.textContent = 'My Github';\n  githubLink.href = 'https://github.com/ArthurMTS';\n  githubLink.target = '_blank';\n  github.append(githubLink);\n  var source = document.createElement('li');\n  var sourceLink = document.createElement('a');\n  sourceLink.textContent = 'Source Code';\n  sourceLink.href = 'https://github.com/ArthurMTS/battleship';\n  sourceLink.target = '_blank';\n  source.append(sourceLink);\n  list.append(github, source);\n  nav.append(list);\n  header.append(title, nav);\n  return header;\n}\n\nmodule.exports = header;\n\n//# sourceURL=webpack://battleship/./src/components/header.js?");

/***/ }),

/***/ "./src/factories/Gameboard.js":
/*!************************************!*\
  !*** ./src/factories/Gameboard.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var Ship = __webpack_require__(/*! ./Ship */ \"./src/factories/Ship.js\");\n\nvar getRandomInt = __webpack_require__(/*! ../utils/getRandomInt */ \"./src/utils/getRandomInt.js\");\n\nvar checkPositions = __webpack_require__(/*! ../utils/checkPositions */ \"./src/utils/checkPositions.js\");\n\nfunction Gameboard() {\n  var grid = createGrid(10);\n  var ships = [];\n\n  function placeShip(x, y, shipSize) {\n    var vertical = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;\n    if (ships.length >= 5) return false;\n    if (x < 0 || x >= 10 || y < 0 || y >= 10) return false;\n    if (!vertical && y + shipSize >= 10) return false;\n    if (vertical && x + shipSize >= 10) return false;\n    if (grid[x][y].ship != null) return false;\n    var ship = Ship(shipSize);\n    ships.push(ship);\n    var id = ships.length - 1;\n    if (vertical) ship.hits.forEach(function (_, position) {\n      return grid[x + position][y].ship = {\n        id: id,\n        position: position\n      };\n    });else ship.hits.forEach(function (_, position) {\n      return grid[x][y + position].ship = {\n        id: id,\n        position: position\n      };\n    });\n    return true;\n  }\n\n  function placeRandomShip(shipSize) {\n    if (ships.length >= 5) return;\n    var x, y, vertical;\n\n    do {\n      x = getRandomInt(10);\n      y = getRandomInt(10);\n    } while (checkPositions(grid, x, y) || x + shipSize >= 10 && y + shipSize >= 10 || checkPositions(grid, x + shipSize - 1, y) || checkPositions(grid, x, y + shipSize - 1));\n\n    if (x + shipSize >= 10) vertical = false;else if (y + shipSize >= 10) vertical = true;else vertical = getRandomInt(2) ? true : false;\n    placeShip(x, y, shipSize, vertical);\n  }\n\n  function receiveAttack(x, y) {\n    if (x < 0 || x >= 10 || y < 0 || y >= 10) return false;\n    var _grid$x$y = grid[x][y],\n        hitted = _grid$x$y.hitted,\n        ship = _grid$x$y.ship;\n    if (hitted) return false;\n    grid[x][y].hitted = true;\n\n    if (ship != null) {\n      var id = ship.id,\n          position = ship.position;\n      ships[id].hit(position);\n    }\n\n    return true;\n  }\n\n  function removeShips() {\n    if (ships.length === 0) return;\n    var i, j;\n\n    for (i = 0; i < 10; i++) {\n      for (j = 0; j < 10; j++) {\n        if (grid[i][j].ship !== null) grid[i][j].ship = null;\n      }\n    }\n\n    ships.splice(0, ships.length);\n  }\n\n  function allSunk() {\n    return ships.every(function (ship) {\n      return ship.isSunk();\n    });\n  }\n\n  return {\n    grid: grid,\n    ships: ships,\n    placeShip: placeShip,\n    placeRandomShip: placeRandomShip,\n    receiveAttack: receiveAttack,\n    removeShips: removeShips,\n    allSunk: allSunk\n  };\n}\n\nfunction createGrid(gridSize) {\n  var i, j, aux;\n  var grid = [];\n\n  for (i = 0; i < gridSize; i++) {\n    aux = [];\n\n    for (j = 0; j < gridSize; j++) {\n      aux.push({\n        hitted: false,\n        ship: null\n      });\n    }\n\n    grid.push(aux);\n  }\n\n  return grid;\n}\n\nmodule.exports = Gameboard;\n\n//# sourceURL=webpack://battleship/./src/factories/Gameboard.js?");

/***/ }),

/***/ "./src/factories/Player.js":
/*!*********************************!*\
  !*** ./src/factories/Player.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var Gameboard = __webpack_require__(/*! ../factories/Gameboard */ \"./src/factories/Gameboard.js\");\n\nvar getRandomInt = __webpack_require__(/*! ../utils/getRandomInt */ \"./src/utils/getRandomInt.js\");\n\nfunction Player(playerName) {\n  var bot = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n  var name = playerName;\n  var gameboard = Gameboard();\n  var isBot = bot;\n\n  function attack(x, y) {\n    if (isBot) {\n      do {\n        x = getRandomInt(10);\n        y = getRandomInt(10);\n      } while (gameboard.grid[x][y].hitted);\n    }\n\n    return gameboard.receiveAttack(x, y);\n  }\n\n  return {\n    name: name,\n    gameboard: gameboard,\n    isBot: isBot,\n    attack: attack\n  };\n}\n\nmodule.exports = Player;\n\n//# sourceURL=webpack://battleship/./src/factories/Player.js?");

/***/ }),

/***/ "./src/factories/Ship.js":
/*!*******************************!*\
  !*** ./src/factories/Ship.js ***!
  \*******************************/
/***/ ((module) => {

eval("function Ship(shipSize) {\n  var length = shipSize;\n  var hits = initializeHits(shipSize);\n\n  function hit(position) {\n    if (position < 0 || position >= length) return;\n    hits[position] = true;\n  }\n\n  function isSunk() {\n    return hits.every(function (position) {\n      return position === true;\n    });\n  }\n\n  return {\n    length: length,\n    hits: hits,\n    hit: hit,\n    isSunk: isSunk\n  };\n}\n\nfunction initializeHits(shipSize) {\n  var i;\n  var hits = [];\n\n  for (i = 0; i < shipSize; i++) {\n    hits.push(false);\n  }\n\n  return hits;\n}\n\nmodule.exports = Ship;\n\n//# sourceURL=webpack://battleship/./src/factories/Ship.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("var View = __webpack_require__(/*! ./modules/View */ \"./src/modules/View.js\");\n\nvar Game = __webpack_require__(/*! ./modules/Game */ \"./src/modules/Game.js\");\n\nnew Game(new View());\n\n//# sourceURL=webpack://battleship/./src/main.js?");

/***/ }),

/***/ "./src/modules/Game.js":
/*!*****************************!*\
  !*** ./src/modules/Game.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar Player = __webpack_require__(/*! ../factories/Player */ \"./src/factories/Player.js\");\n\nvar Game = /*#__PURE__*/function () {\n  function Game(view) {\n    var _this = this;\n\n    _classCallCheck(this, Game);\n\n    _defineProperty(this, \"newGame\", function (playerName) {\n      var i;\n      var player = Player(playerName);\n\n      for (i = 5; i >= 1; i--) {\n        player.gameboard.placeRandomShip(i);\n      }\n\n      var computer = Player('Computer', true);\n\n      _this.players.push(player);\n\n      _this.players.push(computer);\n\n      _this.view.settingPlayerBoard(_this.players[1], _this.startGame);\n    });\n\n    _defineProperty(this, \"startGame\", function () {\n      _this.view.gamePage(_this.players[0], _this.players[1], _this.handleBoardAttack);\n    });\n\n    _defineProperty(this, \"handleBoardAttack\", function (x, y) {\n      if (_this.gameOver) return;\n\n      _this.players[0].attack(x, y);\n\n      _this.view.loadBoard('player', _this.players[0].gameboard, _this.handleBoardAttack);\n\n      _this.checkWinner();\n\n      if (_this.gameOver) return;\n\n      _this.players[1].attack();\n\n      _this.view.loadBoard('computer', _this.players[1].gameboard);\n\n      _this.checkWinner();\n    });\n\n    this.view = view;\n    this.players = [];\n    this.gameOver = false;\n    this.view.renderForm(this.newGame);\n  }\n\n  _createClass(Game, [{\n    key: \"checkWinner\",\n    value: function checkWinner() {\n      if (this.players[0].gameboard.allSunk()) {\n        this.gameOver = true;\n        this.view.showWinner(this.players[0].name);\n      } else if (this.players[1].gameboard.allSunk()) {\n        this.gameOver = true;\n        this.view.showWinner(this.players[1].name);\n      }\n    }\n  }]);\n\n  return Game;\n}();\n\nmodule.exports = Game;\n\n//# sourceURL=webpack://battleship/./src/modules/Game.js?");

/***/ }),

/***/ "./src/modules/View.js":
/*!*****************************!*\
  !*** ./src/modules/View.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar header = __webpack_require__(/*! ../components/header */ \"./src/components/header.js\");\n\nvar footer = __webpack_require__(/*! ../components/footer */ \"./src/components/footer.js\");\n\nvar View = /*#__PURE__*/function () {\n  function View() {\n    _classCallCheck(this, View);\n\n    this.main = document.createElement('main');\n    this.main.id = 'main';\n    this.playerGrid;\n    this.computerGrid;\n    document.querySelector('#root').append(header(), this.main, footer());\n  }\n\n  _createClass(View, [{\n    key: \"renderForm\",\n    value: function renderForm(handler) {\n      var newGame = document.createElement('div');\n      newGame.id = 'newgame-page';\n      var subTitle = document.createElement('h2');\n      subTitle.textContent = 'Enter your name';\n      var form = document.createElement('form');\n      form.id = 'newgame-form';\n      form.addEventListener('submit', function (e) {\n        e.preventDefault();\n        handler(input.value);\n      });\n      var input = document.createElement('input');\n      input.placeholder = 'Player name';\n      input.type = 'text';\n      input.required = true;\n      var button = document.createElement('button');\n      button.textContent = 'New Game';\n      button.classList.add('pink-button');\n      button.type = 'submit';\n      form.append(input, button);\n      newGame.append(subTitle, form);\n      this.main.append(newGame);\n    }\n  }, {\n    key: \"settingPlayerBoard\",\n    value: function settingPlayerBoard(computer, handler) {\n      var _this = this;\n\n      this.main.innerHTML = '';\n      var shipSize = 5;\n      var vertical = false;\n      var text = document.createElement('p');\n      text.classList.add('bottom-text');\n      text.textContent = \"Place ship with size \".concat(shipSize);\n      var grid = document.createElement('div');\n      grid.classList.add('grid');\n      grid.classList.add('computer');\n      grid.addEventListener('mouseover', function (e) {\n        if (shipSize > 5 || shipSize < 1) return;\n        var cell = e.path[0];\n        cell.style.background = '#AF2A40';\n      });\n      grid.addEventListener('mouseout', function (e) {\n        var cell = e.path[0];\n        cell.style.background = '#fff';\n      });\n      grid.addEventListener('click', function (e) {\n        if (shipSize > 5 || shipSize < 1) return;\n        var cell = e.path[0];\n        var x = Number(cell.getAttribute('data-x'));\n        var y = Number(cell.getAttribute('data-y'));\n\n        if (computer.gameboard.placeShip(x, y, shipSize, vertical)) {\n          shipSize--;\n\n          _this.loadBoard('computer', computer.gameboard);\n\n          if (shipSize === 0) text.textContent = 'Ready to go';else text.textContent = \"Place ship with size \".concat(shipSize);\n        }\n      });\n      var buttons = document.createElement('div');\n      buttons.classList.add('buttons');\n      var random = document.createElement('button');\n      random.textContent = 'Random';\n      random.classList.add('pink-button');\n      random.addEventListener('click', function () {\n        computer.gameboard.removeShips();\n\n        for (i = 5; i >= 1; i--) {\n          computer.gameboard.placeRandomShip(i);\n        }\n\n        _this.loadBoard('computer', computer.gameboard);\n\n        shipSize = 0;\n        text.textContent = \"Ready to go\";\n      });\n      var rotate = document.createElement('button');\n      rotate.textContent = 'Rotate';\n      rotate.classList.add('pink-button');\n      rotate.addEventListener('click', function () {\n        return vertical = !vertical;\n      });\n      var clean = document.createElement('button');\n      clean.textContent = 'Clean';\n      clean.classList.add('pink-button');\n      clean.addEventListener('click', function () {\n        shipSize = 5;\n        text.textContent = \"Place ship with size \".concat(shipSize);\n        computer.gameboard.removeShips();\n\n        _this.loadBoard('computer', computer.gameboard);\n      });\n      var startGame = document.createElement('button');\n      startGame.textContent = 'Start Game';\n      startGame.classList.add('pink-button');\n      startGame.addEventListener('click', function () {\n        if (computer.gameboard.ships.length === 5) handler();\n      });\n      this.computerGrid = grid;\n      buttons.append(random, rotate, clean, startGame);\n      this.main.append(grid, buttons, text);\n      this.loadBoard('computer', computer.gameboard);\n    }\n  }, {\n    key: \"gamePage\",\n    value: function gamePage(player, computer, handler) {\n      this.main.innerHTML = '';\n      var gridPlayer = document.createElement('div');\n      gridPlayer.classList.add('grid');\n      gridPlayer.classList.add('player');\n      var gridComputer = document.createElement('div');\n      gridComputer.classList.add('grid');\n      gridComputer.classList.add('computer');\n      this.playerGrid = gridPlayer;\n      this.computerGrid = gridComputer;\n      this.main.append(this.computerGrid, this.playerGrid);\n      this.loadBoard('player', player.gameboard, handler);\n      this.loadBoard('computer', computer.gameboard, handler);\n    }\n  }, {\n    key: \"loadBoard\",\n    value: function loadBoard(player, gameboard, handler) {\n      var grid = player === 'player' ? this.playerGrid : this.computerGrid;\n      grid.innerHTML = '';\n      var i, j;\n\n      for (i = 0; i < 10; i++) {\n        for (j = 0; j < 10; j++) {\n          var cell = document.createElement('button');\n          cell.title = 'cell';\n          cell.setAttribute('data-x', i);\n          cell.setAttribute('data-y', j);\n          cell.classList.add('cell');\n          var _gameboard$grid$i$j = gameboard.grid[i][j],\n              hitted = _gameboard$grid$i$j.hitted,\n              ship = _gameboard$grid$i$j.ship;\n          if (player === 'computer' && ship !== null) cell.textContent = '🚢';\n\n          if (hitted && ship !== null) {\n            cell.classList.add('hitted');\n            cell.textContent = '🚢';\n          } else if (hitted && ship === null) cell.classList.add('missed');else cell.classList.add('scale');\n\n          if (!hitted && player !== 'computer') this.setCellEvent(cell, handler, i, j);\n          grid.append(cell);\n        }\n      }\n    }\n  }, {\n    key: \"setCellEvent\",\n    value: function setCellEvent(cell, handler, i, j) {\n      cell.addEventListener('click', function () {\n        return handler(i, j);\n      });\n    }\n  }, {\n    key: \"showWinner\",\n    value: function showWinner(winner) {\n      var firstGrid = document.querySelector('.grid');\n      var div = document.createElement('div');\n      div.id = 'winner';\n      var p = document.createElement('p');\n      p.textContent = \"\\u270C\\uFE0F \".concat(winner, \" WINS! \\u270C\\uFE0F\");\n      var button = document.createElement('button');\n      button.textContent = 'Play again';\n      button.classList.add('pink-button');\n      button.addEventListener('click', function () {\n        return location.reload();\n      });\n      div.append(p, button);\n      firstGrid.after(div);\n    }\n  }]);\n\n  return View;\n}();\n\nmodule.exports = View;\n\n//# sourceURL=webpack://battleship/./src/modules/View.js?");

/***/ }),

/***/ "./src/utils/checkPositions.js":
/*!*************************************!*\
  !*** ./src/utils/checkPositions.js ***!
  \*************************************/
/***/ ((module) => {

eval("function checkPositions(grid, x, y) {\n  return checkPosition(grid, x, y) || checkPosition(grid, x - 1, y - 1) || checkPosition(grid, x + 1, y + 1) || checkPosition(grid, x + 1, y - 1) || checkPosition(grid, x - 1, y + 1) || checkPosition(grid, x - 1, y) || checkPosition(grid, x, y - 1) || checkPosition(grid, x + 1, y) || checkPosition(grid, x, y + 1);\n}\n\nfunction checkPosition(grid, x, y) {\n  if (x < 0 || y >= 10 || y < 0 || y >= 10) return false;\n\n  try {\n    return grid[x][y].ship != null;\n  } catch (e) {\n    return true;\n  }\n}\n\nmodule.exports = checkPositions;\n\n//# sourceURL=webpack://battleship/./src/utils/checkPositions.js?");

/***/ }),

/***/ "./src/utils/getRandomInt.js":
/*!***********************************!*\
  !*** ./src/utils/getRandomInt.js ***!
  \***********************************/
/***/ ((module) => {

eval("function getRandomInt(range) {\n  return Math.floor(Math.random() * range);\n}\n\nmodule.exports = getRandomInt;\n\n//# sourceURL=webpack://battleship/./src/utils/getRandomInt.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;