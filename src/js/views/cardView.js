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
  card.children[0].style.animation = "fadeOut 0.2s ease-in-out forwards";
  card.children[1].style.animation = "fadeOut 0.2s ease-in-out forwards";
  card.children[2].style.animation = "fadeInUp 0.3s ease-in-out 0.3s forwards";
};

export const hideDescription = card => {
  card.children[0].style.animation = "fadeIn 0.2s ease-in-out forwards";
  card.children[1].style.animation = "fadeIn 0.2s ease-in-out forwards";
  card.children[2].style.animation = "fadeOutDown 0.3s ease-in-out forwards";
};

export const highlightCard = card => {
  for (let i = 0; i < elem.cardGroup.length; i++)
    elem.cardGroup[i].classList.remove("current");

  card.classList.add("current");
};

export const lowlightCard = card => {
  card.classList.remove("current");
};

export const showCards = () => {
  cards.forEach(cur =>
    elem.imgGroup.insertAdjacentHTML(
      "beforeend",
      `<div class="card"><img src=${cur.image} alt=${cur.name} width="200" /><p class="name">${cur.name}</p><p class="description">${cur.description}</p></div>`
    )
  );
};
