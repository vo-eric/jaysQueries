/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const view = __webpack_require__(1);

$(function () {
  const rootEl = $('.snake-game');
  new View(rootEl);
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(2)

class View {
  constructor($el) {
    this.$el = $el;
    this.board = new Board(20);

    $(window).on('keydown', this.handleKeyEvent.bind(this));

    this.refresh = window.setInterval(
      this.step.bind(this),
      View.REFRESHRATE
    );
  }

  handleKeyEvent(event) {
    if (View.KEYS[event.keyCode]) {
      this.board.snake.turn(View.KEYS[event.keyCode]);
    }
  }

  step() {
    if (this.board.snake.segments.length > 0) {
      this.board.snake.move();
      this.board.render();
    } else {
      alert("Game Over!");
      window.clearInterval(this.refresh);
    }
  }
}

View.KEYS = {
  37: "W",
  38: "N",
  39: "E",
  40: "S"
};

View.REFRESHRATE = 100

module.exports = View;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Snake = __webpack_require__(3);

class Board {
  constructor(size) {
    this.snake = new Snake(this);
  }

  render() {
    const grid = [];

    for (let i = 0; i < size; i++) {
      const row = [];

      for (let i = 0; i < size; i++) {
        row.push(Board.SYMBOL);
      }
      grid.push(row);
    }
    return grid;
  }

}

Board.SYMBOL = '.';

module.exports = Board;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

class Snake {
  constructor(board) {
    const center = new Coord(Math.floor(board.size / 2), Math.floor(board.size / 2));

    this.board = board;
    this.direction = "N";
    this.segments = [center];
    this.isTurning = false;
  }

  move() {
    this.segments.push(this.head().plus(Snake.MOVE[this.direction]));
  }

  turn(direction) {
    if (Snake.MOVES[this.direction].isOpposite(Snake.MOVES[direction]) || this.turning) {
      return;
    } else {
      this.turning = true;
      this.direction = direction;
    }
  }

}

Snake.MOVES = {
  "N": new Coord(-1, 0),
  "E": new Coord(0, 1),
  "W": new Coord(0, -1),
  "S": new COord(1, 0)
};

module.exports = Snake;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map