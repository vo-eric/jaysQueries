class Snake {
  constructor(board) {
    const center = new Coord(Math.floor(board.size / 2), Math.floor(board.size / 2));

    this.board = board;
    this.direction = "E";
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

  Snake.MOVES = {
    "N": new Coord(-1, 0),
    "E": new Coord(0, 1),
    "W": new Coord(0, -1),
    "S": new COord(1, 0)
  };
}
