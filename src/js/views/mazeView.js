import elem from "./base";

const boardCtx = elem.boardCanvas.getContext("2d");
const playerCtx = elem.playerCanvas.getContext("2d");
let blockSize;
const canvasWidth = 640;

export const renderMaze = ({ maze, playerImg, targetImg }) => {
  const { board, player, target } = maze;
  blockSize = canvasWidth / board.length;
  boardCtx.clearRect(0, 0, canvasWidth, canvasWidth);
  playerCtx.clearRect(0, 0, canvasWidth, canvasWidth);

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (!board[i][j].n) {
        boardCtx.beginPath();
        boardCtx.moveTo(blockSize * j, blockSize * i);
        boardCtx.lineTo(blockSize * (j + 1), blockSize * i);
        boardCtx.stroke();
      }
      if (!board[i][j].s) {
        boardCtx.beginPath();
        boardCtx.moveTo(blockSize * j, blockSize * (i + 1));
        boardCtx.lineTo(blockSize * (j + 1), blockSize * (i + 1));
        boardCtx.stroke();
      }
      if (!board[i][j].w) {
        boardCtx.beginPath();
        boardCtx.moveTo(blockSize * j, blockSize * i);
        boardCtx.lineTo(blockSize * j, blockSize * (i + 1));
        boardCtx.stroke();
      }
      if (!board[i][j].e) {
        boardCtx.beginPath();
        boardCtx.moveTo(blockSize * (j + 1), blockSize * i);
        boardCtx.lineTo(blockSize * (j + 1), blockSize * (i + 1));
        boardCtx.stroke();
      }
    }
  }

  boardCtx.drawImage(
    targetImg,
    blockSize * target.col,
    blockSize * target.row,
    blockSize,
    blockSize
  );
  updatePlayerImg(0, 0, player.row, player.col, playerImg);
};

export const updatePlayerImg = (prevRow, prevCol, curRow, curCol, img) => {
  playerCtx.clearRect(
    blockSize * prevCol,
    blockSize * prevRow,
    blockSize,
    blockSize
  );
  playerCtx.drawImage(
    img,
    blockSize * curCol,
    blockSize * curRow,
    blockSize,
    blockSize
  );
};
