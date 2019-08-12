import elem from "./base";

export const buttonClick = btn => {
  elem.clickSound.play();
  btn.style.boxShadow = "0px 0px 0px rgba(0,0,0)";
  btn.style.transform = "scale(0.8)";
  btn.style.transition = "transform .2s";
  setTimeout(() => {
    btn.style.boxShadow = "5px 5px 2px rgba(0,0,0, 0.2)";
    btn.style.transform = "scale(1)";
  }, 200);
};
