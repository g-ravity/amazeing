// Helper Methods
const randomInt = val => {
  return Math.floor(Math.random() * val);
};

class MazeBoard {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.stack = [
      {
        row: randomInt(height),
        col: randomInt(width)
      }
    ];

    this.board = [];
    for (let i = 0; i < this.height; i++) {
      this.board.push([]);
      for (let j = 0; j < this.width; j++)
        this.board[i].push({
          n: false,
          s: false,
          e: false,
          w: false,
          visited: false
        });
    }
  }

  displayMaze = context => {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (!this.board[i][j].n) {
          context.beginPath();
          context.moveTo(80 * j, 80 * i);
          context.lineTo(80 * (j + 1), 80 * i);
          context.stroke();
        }
        if (!this.board[i][j].s) {
          context.beginPath();
          context.moveTo(80 * j, 80 * (i + 1));
          context.lineTo(80 * (j + 1), 80 * (i + 1));
          context.stroke();
        }
        if (!this.board[i][j].w) {
          context.beginPath();
          context.moveTo(80 * j, 80 * i);
          context.lineTo(80 * j, 80 * (i + 1));
          context.stroke();
        }
        if (!this.board[i][j].e) {
          context.beginPath();
          context.moveTo(80 * (j + 1), 80 * i);
          context.lineTo(80 * (j + 1), 80 * (i + 1));
          context.stroke();
        }
      }
    }
  };

  calculateNeighbours = (row, col) => {
    let direction = "";
    if (row > 0 && !this.board[row - 1][col].visited) direction += "n";
    if (row < this.height - 1 && !this.board[row + 1][col].visited)
      direction += "s";
    if (col > 0 && !this.board[row][col - 1].visited) direction += "w";
    if (col < this.height - 1 && !this.board[row][col + 1].visited)
      direction += "e";
    return direction;
  };

  createMaze = () => {
    while (this.stack.length) {
      const { row, col } = this.stack[this.stack.length - 1];
      this.board[row][col].visited = true;
      const validDirections = this.calculateNeighbours(row, col);
      if (!validDirections.length) this.stack.pop();
      else {
        const nextCell = validDirections[randomInt(validDirections.length)];
        this.board[row][col][nextCell] = true;
        switch (nextCell) {
          case "n":
            this.stack.push({
              row: row - 1,
              col
            });
            this.board[row - 1][col].s = true;
            break;
          case "s":
            this.stack.push({
              row: row + 1,
              col
            });
            this.board[row + 1][col].n = true;
            break;
          case "e":
            this.stack.push({
              row,
              col: col + 1
            });
            this.board[row][col + 1].w = true;
            break;
          case "w":
            this.stack.push({
              row,
              col: col - 1
            });
            this.board[row][col - 1].e = true;
        }
      }
    }
  };
}

export default MazeBoard;
