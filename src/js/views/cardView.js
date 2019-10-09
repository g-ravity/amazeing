import elem from "./base";

import bart from "../assets/img/bart.png";
import marge from "../assets/img/marge.png";
import lisa from "../assets/img/lisa.png";
import homer from "../assets/img/homer.png";
import maggie from "../assets/img/maggie.png";

const cards = [
  {
    image: homer,
    name: "Homer Simpson",
    description:
      "As the family's provider, Homer works at the Springfield Nuclear Power Plant as safety inspector. Homer embodies many American working class stereotypes: he is obese, incompetent, lazy, dim-witted, hot-tempered, addicted to beer, junk food and watching television."
  },
  {
    image: marge,
    name: "Marge Simpson",
    description:
      "Marge is the matriarch of the Simpson family. With her husband Homer, she has three children: Bart, Lisa, and Maggie. Marge is the moralistic force in her family and often provides a grounding voice in the midst of her family's antics by trying to maintain order in the Simpson household."
  },
  {
    image: bart,
    name: "Bart Simpson",
    description:
      "Bart is the eldest child and only son of Homer and Marge, and the brother of Lisa and Maggie. Bart's most prominent and popular character traits are his mischievousness, rebelliousness and disrespect for authority."
  },
  {
    image: lisa,
    name: "Lisa Simpson",
    description:
      "Intelligent, passionate, and the moral center of the family, Lisa Simpson, is the second child of Homer and Marge, younger sister of Bart, and older sister of Maggie. Lisa's high intellect and liberal political stance creates a barrier between her and other children her age, therefore she is a bit of a loner and social outcast."
  },
  {
    image: maggie,
    name: "Maggie Simpson",
    description:
      "Maggie is the youngest child of Homer and Marge, and sister to Bart and Lisa. She is often seen sucking on her red pacifier and, when she walks, she trips over her clothing and falls on her face. Being an infant, she has not learned how to talk."
  }
];

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

export const lowlightCard = updateImage => {
  for (let i = 0; i < elem.cardGroup.length; i++)
    elem.cardGroup[i].classList.remove("current");
  updateImage("");
};

export const showCards = () => {
  cards.forEach(cur =>
    elem.imgGroup.insertAdjacentHTML(
      "beforeend",
      `<div class="card"><img src=${cur.image} alt=${cur.name} width="200" /><p class="name">${cur.name}</p><p class="description">${cur.description}</p></div>`
    )
  );
};
