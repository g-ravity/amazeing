import elem from "./base";

const mute = elem.mute;
const play = elem.play;
const music = elem.music;

export const muteAudio = () => {
  mute.style.display = "none";
  play.style.display = "block";
  music.volume = 0;
  music.pause();
  music.currentTime = 0;
};

export const playAudio = () => {
  play.style.display = "none";
  mute.style.display = "block";
  music.volume = 0.3;
  music.play();
};
