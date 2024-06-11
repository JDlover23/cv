//debounce
function debounce(callback, delay) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback();
    }, delay);
  };
}

//identify screen size vars to change them on load and resize
let isTablet = false;
let isMobile = false;

//fill running line
function fillRunningLine() {
  //finding container for words-pack
  const runningLineWrapper = document.querySelector(".running-line__wrapper");
  //finding the line itself
  const runningLine = document.querySelector(".running-line");
  //identifying how many containers line can include
  const multiplier = Math.floor(
    runningLine.offsetWidth / runningLineWrapper.offsetWidth
  );

  //cloning element to fill the line 3 times (to be sure animation will be smooth)
  const newLineNode = runningLineWrapper.cloneNode(true);
  newLineNode.classList.add("running-line__wrapper");
  runningLine.innerHTML = "";
  for (let i = 0; i < multiplier * 3; i++) {
    runningLine.appendChild(newLineNode.cloneNode(true));
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

//slider vars
let sliderPage = 1;
let sliderItemsCount = 3;

//if mobile, slider contains only one item
function countSliderItems(isMobile) {
  sliderItemsCount = isMobile ? 1 : 3;
}

//creating slider item(skill) for slider (to reuse further)
function createSliderItem(item, prev) {
  //creating figure (main container of skill)
  const slider__figure = document.createElement("div");
  slider__figure.classList.add("figure");

  //creating img wrapper (for awesome gradient border)
  const slider__img_wrapper = document.createElement("div");
  slider__img_wrapper.classList.add("slider__img_wrapper");

  //creating img figcaption
  const silder__img_title = document.createElement("div");
  silder__img_title.classList.add("slider__img_title", "text");

  //creating img (if tablet - making it a little bit smaller)
  const img = document.createElement("img");
  img.setAttribute("width", !isTablet ? "100" : "80");
  img.setAttribute("src", `${slider__content[item].picture}`);

  //filling figcaption with the text
  const text = document.createTextNode(`${slider__content[item].text}`);
  silder__img_title.appendChild(text);

  //adding img to wrapper
  slider__img_wrapper.appendChild(img);

  //adding wrapped image with figcaption to the figure created before
  slider__figure.appendChild(slider__img_wrapper);
  slider__figure.appendChild(silder__img_title);

  //adding filled figure to slider (if prev - adding it before the first child)
  slider__contentContainer.appendChild(slider__figure);
  if (prev) {
    const children = slider__contentContainer.querySelectorAll(".figure");
    const firstChild = children[0];
    firstChild.before(slider__figure);
  } else {
    slider__contentContainer.appendChild(slider__figure);
  }
}
//adding all needed nodes to slider
function fillSlider(isMobile) {
  //if we resize, for example, we need to remove existing nodes before filling again
  if (slider__contentContainer.hasChildNodes()) {
    slider__contentContainer.innerHTML = "";
  }
  //count items for slider and checking if it is mobile or not
  countSliderItems(isMobile);
  //create so many items as we need according to display resolution
  for (let i = 0; i < sliderItemsCount; i++) {
    createSliderItem(i);
  }
  //checking if some slider button needs to be disabled
  checkDisabled();
}

// slider buttons and check if disabled

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
function paginate(turn) {
  //declare var prev for conveniency
  const prev = turn === "prev";
  //identify number of item to be added according to page and items count (isMobile or not)
  const addedItemNumber = prev
    ? sliderPage - 1
    : sliderItemsCount + sliderPage - 2;
  //adding needed dom item to container (prev defines place to add)
  createSliderItem(addedItemNumber, prev);

  //adding slide animation
  slider__contentContainer.classList.add(
    `slider__content-container_${turn}-anim`
  );

  //identifying, if some slider button should be disabled
  checkDisabled();

  //finding all skills figures
  const children = slider__contentContainer.querySelectorAll(".figure");

  //identifying child to remove according to prev var
  child = prev ? children[children.length - 1] : children[0];

  //when animation ends
  slider__contentContainer.onanimationend = () => {
    //removing unnecessary child
    slider__contentContainer.removeChild(child);

    //removing class with slide animation according to parameter
    slider__contentContainer.classList.remove(
      `slider__content-container_${turn}-anim`
    );
  };
}
//slider "pagination"
nextPage.onclick = () => {
  sliderPage++;
  //perform "pagination" with the "next" parameter
  paginate("next");
};
prevPage.onclick = () => {
  sliderPage--;
  //perform "pagination" with the "prev" parameter
  paginate("prev");
};

//activate all necessary functions on load and resize
window.addEventListener(
  "load",
  function () {
    isTablet = 600 > this.innerWidth < 900;
    isMobile = this.innerWidth < 600;
    fillRunningLine();
    fillSlider(isMobile);
  },
  false
);
window.addEventListener(
  "resize",
  function () {
    isTablet = 600 > this.innerWidth < 900;
    isMobile = this.innerWidth < 600;
    debounce(fillRunningLine(), 2000);
    debounce(fillSlider(isMobile), 2000);
  },
  false
);
