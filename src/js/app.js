import MazeBoard from "./models/MazeBoard";
import * as mazeView from "./views/mazeView";
import * as audioView from "./views/audioView";
import * as cardView from "./views/cardView";
import * as buttonView from "./views/buttonView";
import renderPage from "./views/pageView";
import elem from "./views/base";

import target from "../js/assets/donut.png";

let playerImg = new Image();
let targetImg = new Image();
targetImg.src = target;

const state = {
  maze: null,
  playerImg: playerImg,
  targetImg: targetImg
};

const updatePlayerImage = src => {
  state.playerImg.src = src;
};

const keyDir = {
  ArrowUp: "n",
  ArrowDown: "s",
  ArrowRight: "e",
  ArrowLeft: "w"
};

elem.btnGroup.addEventListener("click", event => {
  let width, height;
  if (event.target === elem.easyBtn) {
    width = 8;
    height = 8;
  }
  if (event.target === elem.mediumBtn) {
    width = 16;
    height = 16;
  }
  if (event.target === elem.hardBtn) {
    width = 32;
    height = 32;
  }
  state.maze = new MazeBoard(width, height);
  state.maze.createMaze();
  mazeView.renderMaze(state);
});

elem.html.addEventListener("keyup", event => {
  if (!state.maze.gameOver) {
    state.maze.updatePlayer(keyDir[event.key]);
    mazeView.renderMaze(state);
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
    cardView.highlightCard(elem.cardGroup[i], updatePlayerImage);
    elem.avatar.src = state.playerImg.src;
    cardView.hideDescription(elem.cardGroup[i]);
  });
}

elem.html.addEventListener("click", event => {
  if (Array.from(elem.btnList).includes(event.target)) {
    buttonView.buttonClick(event.target);
    if (event.target.id !== elem.btn2.id) renderPage(event.target.id);
  }
});

elem.btn2.addEventListener("click", () => {
  if (state.playerImg.src) renderPage(elem.btn2.id);
  else alert("Please choose an avatar!");
});

// window.onload = music.play();
// music.volume = 0.3;
