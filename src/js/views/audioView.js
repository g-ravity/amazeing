import elem from "./base";
import music from "../assets/audio/music.mp3";

const bgMusic = new Audio();
bgMusic.src = music;
bgMusic.loop = true;

export const muteAudio = () => {
  elem.play.style.display = "block";
  elem.mute.style.display = "none";
  bgMusic.volume = 0;
  bgMusic.pause();
  bgMusic.currentTime = 0;
};

export const playAudio = () => {
  elem.mute.style.display = "block";
  elem.play.style.display = "none";
  bgMusic.volume = 0.3;
  bgMusic.play();
};
