// Helper Methods
const randomInt = val => {
  return Math.floor(Math.random() * val);
};

class MazeBoard {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.gameOver = false;
    // Assigning the starting position
    this.player = {
      row: this.height - 1,
      col: randomInt(this.width)
    };
    // Assigning the target position
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
      // Mark the current cell as visited
      this.board[row][col].visited = true;
      // Check for unvisited neighbours
      const validDirections = this.calculateNeighbours(row, col);
      // Pop the cell if no unvisited neighbours
      if (!validDirections.length) this.stack.pop();
      else {
        // Choose a random unvisited neighbour
        const nextCell = validDirections[randomInt(validDirections.length)];
        // Mark the path to that cell
        this.board[row][col][nextCell] = true;
        switch (nextCell) {
          // Push the next cell onto stack
          case "n":
            this.stack.push({
              row: row - 1,
              col
            });
            // Mark the path from the next cell back to current cell
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
      if (
        this.player.row === this.target.row &&
        this.player.col === this.target.col
      )
        this.gameOver = true;
    }
  };
}

export default MazeBoard;
