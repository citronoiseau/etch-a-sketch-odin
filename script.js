const gridContainer = document.querySelector(`.grid-container`);
let size = 16;

const resetBtn = document.querySelector(`.reset-button`);
const colorPick = document.querySelector(`.colorPick`);
const gridSizeBtn = document.querySelector(`.gridSizeChoose`);

const drawBtn = document.querySelector(`#colorMode`);
const eraseBtn = document.querySelector(`#eraserMode`);
const randomBtn = document.querySelector(`#randomMode`);
const darkenBtn = document.querySelector(`#darkenMode`);
const buttons = [drawBtn, eraseBtn, randomBtn, darkenBtn];

let drawingMode = "drawing";

function createGrid() {
  for (let i = 0; i < size * size; i++) {
    const divElement = document.createElement(`div`);
    divElement.classList.add(`element`);
    divElement.style.flexBasis = `${100 / size}%`;
    divElement.style.height = `${100 / size}%`;
    gridContainer.appendChild(divElement);

    divElement.addEventListener("mouseover", function (event) {
      if (event.buttons === 1) {
        changeColor(event);
      }
    });
  }
}

function changeColor(event) {
  let color = document.querySelector(".colorPick").value;
  if (drawingMode === "drawing") {
    event.target.style.backgroundColor = color;
    event.target.style.filter = "";
  } else if (drawingMode === "rainbow") {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    event.target.style.backgroundColor = "#" + randomColor;
    event.target.style.filter = "";
  } else if (drawingMode === "erasing") {
    event.target.style.backgroundColor = null;
  } else if (drawingMode === "darken") {
    let currentDarkness;
    if (event.target.style.filter) {
      currentDarkness = parseFloat(event.target.style.filter.slice(11, -1));
    } else {
      currentDarkness = 1;
    }
    let newDarkness = currentDarkness - 0.1;
    if (newDarkness < 0) {
      newDarkness = 0;
    }
    event.target.style.filter = `brightness(${newDarkness})`;
  }
}
colorPick.addEventListener(`click`, changeColor);

function setActiveButton(clickedBtn, mode) {
  buttons.forEach((btn) => {
    if (btn === clickedBtn) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
  drawingMode = mode;
}
drawBtn.addEventListener(`click`, () => setActiveButton(drawBtn, "drawing"));
eraseBtn.addEventListener(`click`, () => setActiveButton(eraseBtn, "erasing"));
randomBtn.addEventListener(`click`, () =>
  setActiveButton(randomBtn, "rainbow")
);
darkenBtn.addEventListener("click", () => setActiveButton(darkenBtn, "darken"));

function changeGridSize() {
  size = prompt(`Enter a grid size:`);
  if (size === null || size === "") {
    alert(`Please enter a value!`);
  } else if (size > 100) {
    alert(`It's too big, enter another size!`);
  } else if (size < 1) {
    alert(`It's too small, enter another size!`);
  } else {
    resetGrid();
  }
}

gridSizeBtn.addEventListener(`click`, changeGridSize);

function resetGrid() {
  gridContainer.textContent = "";
  createGrid();
}
resetBtn.addEventListener(`click`, resetGrid);

createGrid();
