const Snake = require('./snake');

class Board {
  constructor(size) {
    this.snake = new Snake(this);
  }
}
