import elem from "./base";

export const renderMaze = ({ maze, playerImg, targetImg }) => {
  const { board, player, target } = maze;
  const ctx = elem.canvas.getContext("2d");
  const blockSize = 640 / board.length;

  ctx.clearRect(0, 0, 640, 640);

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (!board[i][j].n) {
        ctx.beginPath();
        ctx.moveTo(blockSize * j, blockSize * i);
        ctx.lineTo(blockSize * (j + 1), blockSize * i);
        ctx.stroke();
      }
      if (!board[i][j].s) {
        ctx.beginPath();
        ctx.moveTo(blockSize * j, blockSize * (i + 1));
        ctx.lineTo(blockSize * (j + 1), blockSize * (i + 1));
        ctx.stroke();
      }
      if (!board[i][j].w) {
        ctx.beginPath();
        ctx.moveTo(blockSize * j, blockSize * i);
        ctx.lineTo(blockSize * j, blockSize * (i + 1));
        ctx.stroke();
      }
      if (!board[i][j].e) {
        ctx.beginPath();
        ctx.moveTo(blockSize * (j + 1), blockSize * i);
        ctx.lineTo(blockSize * (j + 1), blockSize * (i + 1));
        ctx.stroke();
      }
    }
  }

  ctx.drawImage(
    targetImg,
    blockSize * target.col,
    blockSize * target.row,
    blockSize,
    blockSize
  );
  ctx.drawImage(
    playerImg,
    blockSize * player.col,
    blockSize * player.row,
    blockSize,
    blockSize
  );
};
