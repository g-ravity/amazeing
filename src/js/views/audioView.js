import elem from "./base";
import music from "../assets/music.mp3";

const bgMusic = new Audio();
bgMusic.src = music;
bgMusic.loop = true;

export const muteAudio = () => {
  elem.mute.style.display = "none";
  elem.play.style.display = "block";
  bgMusic.volume = 0;
  bgMusic.pause();
  bgMusic.currentTime = 0;
};

export const playAudio = () => {
  elem.play.style.display = "none";
  elem.mute.style.display = "block";
  bgMusic.volume = 0.3;
  bgMusic.play();
};
