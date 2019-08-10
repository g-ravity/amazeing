import MazeBoard from "./models/MazeBoard";

const btn = document.getElementById("btn-group");
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

btn.addEventListener("click", event => {
  ctx.clearRect(0, 0, 640, 640);
  let width, height;
  if (event.target.classList.contains("btn-easy")) {
    width = 8;
    height = 8;
  }
  if (event.target.classList.contains("btn-medium")) {
    width = 16;
    height = 16;
  }
  if (event.target.classList.contains("btn-hard")) {
    width = 32;
    height = 32;
  }
  const maze = new MazeBoard(width, height);
  maze.createMaze();
  maze.displayMaze(ctx);
});
