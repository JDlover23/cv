//identify screen size
const isMobile = window.innerWidth < 600;
const isTablet = window.innerWidth < 900;

//fill running line
function fillRunningLine() {
  const runningLineWrapper = document.querySelector(".running-line__wrapper");
  const runningLine = document.querySelector(".running-line");
  const multiplier = Math.floor(
    runningLine.offsetWidth / runningLineWrapper.offsetWidth
  );
  for (let i = 0; i < multiplier * 2; i++) {
    runningLine.appendChild(runningLineWrapper.cloneNode(true));
  }
}

//slider
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
  slider__img_wrapper.classList.add("slider__img_wrapper");

  const silder__img_title = document.createElement("div");
  silder__img_title.classList.add("slider__img_title", "text", "text_info");

  const img = document.createElement("img");
  img.setAttribute("width", !isTablet ? "100" : "80");
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
  for (let i = 0; i < sliderItemsCount; i++) {
    createSliderItem(i);
  }
}

// slider vars, buttons and check if disabled
let sliderPage = 1;

let sliderItemsCount = countSliderItems();
function countSliderItems() {
  return isMobile ? 1 : 3;
}

const prevPage = document.querySelector(".slider__button_prev");
const nextPage = document.querySelector(".slider__button_next");

function checkDisabled() {
  if (sliderPage === 1) {
    prevPage.classList.add("slider__button_disabled");
    prevPage.disabled = true;
  } else {
    prevPage.disabled = false;
    prevPage.classList.remove("slider__button_disabled");
  }
  if (sliderPage == slider__content.length - sliderItemsCount + 1) {
    nextPage.classList.add("slider__button_disabled");
    nextPage.disabled = true;
  } else {
    nextPage.disabled = false;
    nextPage.classList.remove("slider__button_disabled");
  }
}

//slider "pagination"
nextPage.onclick = () => {
  sliderPage++;
  createSliderItem(sliderItemsCount + sliderPage - 2);
  slider__contentContainer.classList.add("slider__content-container_next-anim");
  const children = slider__contentContainer.querySelectorAll(".figure");

  checkDisabled();
  slider__contentContainer.onanimationend = () => {
    slider__contentContainer.removeChild(children[0]);
    slider__contentContainer.classList.remove(
      "slider__content-container_next-anim"
    );
  };
};
prevPage.onclick = () => {
  sliderPage--;
  createSliderItem(sliderPage - 1, true);
  slider__contentContainer.classList.add("slider__content-container_prev-anim");
  const children = slider__contentContainer.querySelectorAll(".figure");
  const lastChild = children.length - 1;

  checkDisabled();
  slider__contentContainer.onanimationend = () => {
    slider__contentContainer.removeChild(children[lastChild]);
    slider__contentContainer.classList.remove(
      "slider__content-container_prev-anim"
    );
  };
};

//activate all necessary functions on load
window.addEventListener(
  "load",
  function () {
    checkDisabled();
    fillRunningLine();
    countSliderItems();
    fillSlider();
  },
  false
);
