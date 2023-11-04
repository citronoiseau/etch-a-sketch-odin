const gridContainer = document.querySelector(`.grid-container`);
let size = 16;

function createGrid() {
  for (let i = 0; i < size * size; i++) {
    const divElement = document.createElement(`div`);
    divElement.classList.add(`element`);
    divElement.style.flexBasis = `${100 / size}%`;
    divElement.style.height = `${100 / size}%`;
    gridContainer.appendChild(divElement);

    divElement.addEventListener(`mouseover`, changeColor);
  }
}
function changeColor(event) {
  event.target.style.backgroundColor = "#131313";
}
createGrid();
