const Snake = require('./snake');

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
