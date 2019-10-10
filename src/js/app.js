import MazeBoard from "./models/MazeBoard";
import * as mazeView from "./views/mazeView";
import * as audioView from "./views/audioView";
import * as cardView from "./views/cardView";
import * as buttonView from "./views/buttonView";
import * as modalView from "./views/modalView";
import renderPage from "./views/pageView";
import elem from "./views/base";

import target from "../js/assets/img/donut.png";

let playerImg = new Image();
let targetImg = new Image();
targetImg.src = target;

const state = {
  maze: null,
  playerImg: playerImg,
  targetImg: targetImg
};

const updatePlayerImage = src => {
  state.playerImg = {...state.playerImg, src};
};

const keyDir = {
  ArrowUp: "n",
  ArrowDown: "s",
  ArrowRight: "e",
  ArrowLeft: "w"
};

let timer = null;

(() => cardView.showCards())();

elem.btnGroup.addEventListener("click", event => {
  let width, height;
  if (event.target === elem.easyBtn) width = 8;
  if (event.target === elem.mediumBtn) width = 16;
  if (event.target === elem.hardBtn) width = 24;
  state.maze = new MazeBoard(width, height);
  state.maze.createMaze();
  mazeView.renderMaze(state);
  clearInterval(timer);
  elem.timeCounter.innerHTML = 0;
  elem.stepCounter.innerHTML = 0;
  timer = setInterval(
    () => (elem.timeCounter.innerHTML = Number(elem.timeCounter.innerHTML) + 1),
    1000
  );
});

elem.html.addEventListener("keyup", event => {
  const { maze } = state;
  const dir = keyDir[event.key];
  if (!maze.gameOver && maze.board[maze.player.row][maze.player.col][dir]) {
    const prevRow = maze.player.row;
    const prevCol = maze.player.col;
    maze.updatePlayer(dir);
    elem.stepCounter.innerHTML = Number(elem.stepCounter.innerHTML) + 1;
    mazeView.updatePlayerImg(
      prevRow,
      prevCol,
      maze.player.row,
      maze.player.col,
      state.playerImg
    );
    if (maze.gameOver) {
      clearInterval(timer);
      alert("Congratulations!");
    }
  }
});

elem.audio.addEventListener("click", event => {
  if (event.target === elem.mute) audioView.muteAudio();
  else audioView.playAudio();
});

for (let i = 0; i < elem.cardGroup.length; i++) {
  elem.cardGroup[i].addEventListener("mouseenter", event => {
    let classCheck = event.target.classList;
    if(!classCheck.contains("current")){
      cardView.showDescription(event.target);
    }
  });

  elem.cardGroup[i].addEventListener("mouseleave", event => {
    cardView.hideDescription(event.target);
  });

  elem.cardGroup[i].addEventListener("click", e => {
    let classCheck = e.target.parentElement.classList;
    if(classCheck.contains("current")){
      cardView.lowlightCard(updatePlayerImage);
      elem.avatar.src = state.playerImg.src;
      cardView.hideDescription(elem.cardGroup[i]);
    }
    else{
      cardView.highlightCard(elem.cardGroup[i], updatePlayerImage);
      elem.avatar.src = state.playerImg.src;
      cardView.hideDescription(elem.cardGroup[i]);
    }
  });
}

elem.html.addEventListener("click", event => {
  if (Array.from(elem.btnList).includes(event.target)) {
    buttonView.buttonClick(event.target);
    if (event.target.id === elem.btn1.id) audioView.playAudio();
    if (event.target.id !== elem.btn2.id) renderPage(event.target.id);
  }
});

elem.btn2.addEventListener("click", () => {
  if (state.playerImg.src) renderPage(elem.btn2.id);
  else setTimeout(() => modalView.showModal(), 500);
});

elem.modalBtn.addEventListener("click", () => {
  buttonView.buttonClick(event.target);
  setTimeout(() => modalView.hideModal(), 500);
});
