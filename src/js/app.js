import MazeBoard from "./models/MazeBoard";
import * as mazeView from "./views/mazeView";
import * as audioView from "./views/audioView";
import * as cardView from "./views/cardView";
import * as buttonView from "./views/buttonView";
import renderPage from "./views/pageView";
import elem from "./views/base";

import player from "../js/img/bart.png";
import target from "../js/img/donut.png";

let playerImg = new Image();
playerImg.src = player;
let targetImg = new Image();
targetImg.src = target;

const state = {
  maze: null,
  playerImg: playerImg,
  targetImg: targetImg,
  page: 1
};

const keyDir = {
  ArrowUp: "n",
  ArrowDown: "s",
  ArrowRight: "e",
  ArrowLeft: "w"
};

elem.btn.addEventListener("click", event => {
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
  state.maze = new MazeBoard(width, height);
  state.maze.createMaze();
  mazeView.renderMaze(state.maze, state.playerImg, state.targetImg);
});

elem.html.addEventListener("keyup", event => {
  if (!state.maze.gameOver) {
    state.maze.updatePlayer(keyDir[event.key]);
    mazeView.renderMaze(state.maze);
  }
  if (
    state.maze.player.row === state.maze.target.row &&
    state.maze.player.col === state.maze.target.col
  ) {
    state.maze.gameOver = true;
    alert("Congratulations");
  }
});

elem.audio.addEventListener("click", event => {
  if (event.target === elem.mute) audioView.muteAudio();
  else audioView.playAudio();
});

for (let i = 0; i < elem.cardGroup.length; i++) {
  elem.cardGroup[i].addEventListener("mouseenter", event => {
    cardView.showDescription(event.target);
  });

  elem.cardGroup[i].addEventListener("mouseleave", event => {
    cardView.hideDescription(event.target);
  });

  elem.cardGroup[i].addEventListener("click", () => {
    cardView.highlightCard(cardGroup[i]);
  });
}

html.addEventListener("click", event => {
  if (event.target.classList.value.includes("btn")) {
    buttonView.buttonClick(event.target);
    if (event.target.id !== elem.btn2.id) renderPage(event.target.id);
  }
});

elem.btn2.addEventListener("click", () => {
  if (state.playerImg) renderPage(elem.btn2.id);
  else alert("Please choose an avatar!");
});

// window.onload = music.play();
// music.volume = 0.3;
