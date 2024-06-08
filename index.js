const isMobile = window.innerWidth < 600;
const isTablet = window.innerWidth < 900;
let count = checkCount();
let page = 1;
function checkCount() {
  return isMobile ? 1 : 3;
}
const runningLineContent = document.querySelector(".running-line__content");
const runningLine = document.querySelector(".running-line");
const multiplier = Math.floor(
  runningLine.offsetWidth / runningLineContent.offsetWidth
);
for (let i = 0; i < multiplier * 2; i++) {
  runningLine.appendChild(runningLineContent.cloneNode(true));
}

const slider__content = [
  { text: "HTML", picture: "images/skills/html.png" },
  { text: "CSS", picture: "images/skills/css.png" },
  { text: "JS", picture: "images/skills/js.png" },
  { text: "Nuxt.js", picture: "images/skills/nuxt.png" },
  { text: "SASS", picture: "images/skills/sass.png" },
  { text: "SQL", picture: "images/skills/sql.png" },
  { text: "Twig", picture: "images/skills/twig.png" },
  { text: "Vue.js", picture: "images/skills/vue.png" },
];
const slider__contentContainer = document.querySelector(
  ".slider__content-container"
);
function createSliderItem(item, before) {
  const slider__figure = document.createElement("div");
  slider__figure.classList.add("figure");

  const slider__img_wrapper = document.createElement("div");
  if (isTablet) {
    slider__img_wrapper.classList.add("slider__img_wrapper_tablet");
  } else {
    slider__img_wrapper.classList.add("slider__img_wrapper");
  }

  const silder__img_title = document.createElement("div");
  silder__img_title.classList.add("slider__img_title", "text");

  const img = document.createElement("img");
  img.setAttribute("width", !isMobile ? "100" : "60");
  img.setAttribute("src", `${slider__content[item].picture}`);
  const text = document.createTextNode(`${slider__content[item].text}`);
  silder__img_title.appendChild(text);

  slider__img_wrapper.appendChild(img);

  slider__figure.appendChild(slider__img_wrapper);
  slider__figure.appendChild(silder__img_title);

  slider__contentContainer.appendChild(slider__figure);
  if (before) {
    const children = slider__contentContainer.querySelectorAll(".figure");
    const firstChild = children[0];
    firstChild.before(slider__figure);
  } else {
    slider__contentContainer.appendChild(slider__figure);
  }
}
function fillSlider() {
  for (let i = 0; i < count; i++) {
    createSliderItem(i);
  }
}
const prevPage = document.querySelector(".slider__button_prev");
const nextPage = document.querySelector(".slider__button_next");

function checkDisabled() {
  console.log(page, "from check disabled");
  if (page === 1) {
    prevPage.classList.add("slider__button_disabled");
    prevPage.disabled = true;
  } else {
    prevPage.disabled = false;
    prevPage.classList.remove("slider__button_disabled");
  }
  if (page == slider__content.length - count + 1) {
    nextPage.classList.add("slider__button_disabled");
    nextPage.disabled = true;
  } else {
    nextPage.disabled = false;
    nextPage.classList.remove("slider__button_disabled");
  }
}

nextPage.onclick = () => {
  slider__contentContainer.classList.add("slider__content-container_next-anim");
  const children = slider__contentContainer.querySelectorAll(".figure");
  page++;
  checkDisabled();
  createSliderItem(count + page - 2);
  slider__contentContainer.onanimationend = () => {
    slider__contentContainer.removeChild(children[0]);
    slider__contentContainer.classList.remove(
      "slider__content-container_next-anim"
    );
  };
};
prevPage.onclick = () => {
  slider__contentContainer.classList.add("slider__content-container_prev-anim");
  const children = slider__contentContainer.querySelectorAll(".figure");
  const lastChild = children.length - 1;
  page--;
  checkDisabled();
  createSliderItem(page - 1, true);
  slider__contentContainer.onanimationend = () => {
    slider__contentContainer.removeChild(children[lastChild]);
    slider__contentContainer.classList.remove(
      "slider__content-container_prev-anim"
    );
  };
};
window.addEventListener(
  "load",
  function () {
    checkDisabled();
    checkCount();
    fillSlider();
  },
  false
);
