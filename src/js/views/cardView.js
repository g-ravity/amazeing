import elem from "./base";

export const showDescription = card => {
  card.children[2].style.top = "0";
};

export const hideDescription = card => {
  card.children[2].style.top = "100%";
};

export const highlightCard = card => {
  for (let i = 0; i < elem.cardGroup.length; j++)
    cardGroup[i].classList.remove("current");

  card.classList.add("current");
  //   playerImg = cardGroup[i].children[0];
};
