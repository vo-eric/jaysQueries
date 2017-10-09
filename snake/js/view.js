const Board = require('./board.js')

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
