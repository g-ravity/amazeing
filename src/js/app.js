import MazeBoard from "./models/MazeBoard";

const btn = document.getElementById("btn-group");
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const imgGroup = document.getElementById("image-group");
const html = document.getElementsByTagName("html")[0];

let maze;
let playerImg;
let targetImg;

const keyDir = {
  ArrowUp: "n",
  ArrowDown: "s",
  ArrowRight: "e",
  ArrowLeft: "w"
};

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
  maze = new MazeBoard(width, height, ctx, playerImg, targetImg);
  maze.createMaze();
  maze.renderMaze();
});

imgGroup.addEventListener("click", event => {
  if (event.target.tagName === "IMG") {
    playerImg = event.target;
    targetImg = event.target.nextElementSibling;
  }
});

html.addEventListener("keyup", event => {
  if (!maze.gameOver) maze.updatePlayer(keyDir[event.key]);
});
