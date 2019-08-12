import elem from "./base";

export const renderMaze = ({ maze, playerImg, targetImg }) => {
  const { board, player, target } = maze;
  const ctx = elem.canvas.getContext("2d");

  ctx.clearRect(0, 0, 640, 640);

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (!board[i][j].n) {
        ctx.beginPath();
        ctx.moveTo(80 * j, 80 * i);
        ctx.lineTo(80 * (j + 1), 80 * i);
        ctx.stroke();
      }
      if (!board[i][j].s) {
        ctx.beginPath();
        ctx.moveTo(80 * j, 80 * (i + 1));
        ctx.lineTo(80 * (j + 1), 80 * (i + 1));
        ctx.stroke();
      }
      if (!board[i][j].w) {
        ctx.beginPath();
        ctx.moveTo(80 * j, 80 * i);
        ctx.lineTo(80 * j, 80 * (i + 1));
        ctx.stroke();
      }
      if (!board[i][j].e) {
        ctx.beginPath();
        ctx.moveTo(80 * (j + 1), 80 * i);
        ctx.lineTo(80 * (j + 1), 80 * (i + 1));
        ctx.stroke();
      }
    }
  }

  ctx.drawImage(targetImg, 80 * target.col, 80 * target.row, 80, 80);
  ctx.drawImage(playerImg, 80 * player.col, 80 * player.row, 80, 80);
};
