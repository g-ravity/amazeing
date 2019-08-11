// Helper Methods
const randomInt = val => {
  return Math.floor(Math.random() * val);
};

class MazeBoard {
  constructor(width, height, ctx, playerImg, targetImg) {
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.pImg = playerImg;
    this.tImg = targetImg;
    this.gameOver = false;
    this.player = {
      row: this.height - 1,
      col: randomInt(this.width)
    };
    this.target = {
      row: 0,
      col: randomInt(this.width)
    };
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

  renderMaze = () => {
    this.ctx.clearRect(0, 0, 640, 640);

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (!this.board[i][j].n) {
          this.ctx.beginPath();
          this.ctx.moveTo(80 * j, 80 * i);
          this.ctx.lineTo(80 * (j + 1), 80 * i);
          this.ctx.stroke();
        }
        if (!this.board[i][j].s) {
          this.ctx.beginPath();
          this.ctx.moveTo(80 * j, 80 * (i + 1));
          this.ctx.lineTo(80 * (j + 1), 80 * (i + 1));
          this.ctx.stroke();
        }
        if (!this.board[i][j].w) {
          this.ctx.beginPath();
          this.ctx.moveTo(80 * j, 80 * i);
          this.ctx.lineTo(80 * j, 80 * (i + 1));
          this.ctx.stroke();
        }
        if (!this.board[i][j].e) {
          this.ctx.beginPath();
          this.ctx.moveTo(80 * (j + 1), 80 * i);
          this.ctx.lineTo(80 * (j + 1), 80 * (i + 1));
          this.ctx.stroke();
        }
      }
    }

    this.ctx.drawImage(
      this.tImg,
      80 * this.target.col,
      80 * this.target.row,
      80,
      80
    );

    this.ctx.drawImage(
      this.pImg,
      80 * this.player.col,
      80 * this.player.row,
      80,
      80
    );
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

  updatePlayer = dir => {
    if (this.board[this.player.row][this.player.col][dir]) {
      switch (dir) {
        case "n":
          this.player.row -= 1;
          break;
        case "s":
          this.player.row += 1;
          break;
        case "e":
          this.player.col += 1;
          break;
        case "w":
          this.player.col -= 1;
      }
      this.renderMaze();
      if (
        this.player.row === this.target.row &&
        this.player.col === this.target.col
      ) {
        this.gameOver = true;
        alert("Congratulations");
      }
    }
  };
}

export default MazeBoard;
