const gridContainer = document.querySelector(`.grid-container`);
let size = 16;

const resetBtn = document.querySelector(`.reset-button`);
const colorPick = document.querySelector(`.colorPick`);
const gridSizeBtn = document.querySelector(`.gridSizeChoose`);

const drawBtn = document.querySelector(`#colorMode`);
const eraseBtn = document.querySelector(`#eraserMode`);
const randomBtn = document.querySelector(`#randomMode`);

let isDrawing = true;
let isRandomColor = false;

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
  if (isDrawing) {
    let color = document.querySelector(".colorPick").value;
    event.target.style.backgroundColor = color;
  } else if (isRandomColor) {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    event.target.style.backgroundColor = "#" + randomColor;
  } else {
    event.target.style.backgroundColor = null;
  }
}
colorPick.addEventListener(`click`, changeColor);

function activeDrawBtn() {
  drawBtn.classList.add("active");
  eraseBtn.classList.remove("active");
  randomBtn.classList.remove("active");
  isRandomColor = false;
  isDrawing = true;
}
drawBtn.addEventListener(`click`, activeDrawBtn);

function activeEraseBtn() {
  drawBtn.classList.remove("active");
  randomBtn.classList.remove("active");
  eraseBtn.classList.add("active");
  isDrawing = false;
}
eraseBtn.addEventListener(`click`, activeEraseBtn);

function activeRandomBtn() {
  drawBtn.classList.remove("active");
  eraseBtn.classList.remove("active");
  randomBtn.classList.add("active");
  isDrawing = false;
  isRandomColor = true;
}

randomBtn.addEventListener(`click`, activeRandomBtn);
function changeGridSize() {
  size = prompt(`Enter a grid size:`);
  if (size > 100) {
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
