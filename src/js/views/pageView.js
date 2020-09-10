import elem from "./base";

const buttonPageMap = {
  playBtn: {
    cur: elem.page1,
    next: elem.page2
  },
  continueBtn: {
    cur: elem.page2,
    next: elem.page3
  }
};

const renderPage = id => {
  if (id in buttonPageMap) {
    setTimeout(() => {
      buttonPageMap[id].cur.classList.remove("current-page");
      buttonPageMap[id].next.classList.add("current-page");
      setTimeout(() => {
        buttonPageMap[id].cur.classList.add("hide");
      }, 500);
    }, 500);
  }
};

export default renderPage;
