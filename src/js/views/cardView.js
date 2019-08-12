import elem from "./base";

export const showDescription = card => {
  card.children[2].style.top = "0";
};

export const hideDescription = card => {
  card.children[2].style.top = "100%";
};

export const highlightCard = (card, updateImage) => {
  for (let i = 0; i < elem.cardGroup.length; i++)
    elem.cardGroup[i].classList.remove("current");

  card.classList.add("current");
  updateImage(card.children[0].src);
};
