const gridContainer = document.querySelector(`.grid-container`);
let size = 16;
let isDrawing = false;
const resetBtn = document.querySelector(`.reset-button`);

function createGrid() {
  for (let i = 0; i < size * size; i++) {
    const divElement = document.createElement(`div`);
    divElement.classList.add(`element`);
    divElement.style.flexBasis = `${100 / size}%`;
    gridContainer.appendChild(divElement);

    divElement.addEventListener("mouseover", function (event) {
      if (event.buttons === 1) {
        changeColor(event);
      }
    });
  }

  function resetGrid() {
    gridContainer.textContent = "";
    createGrid();
  }

  resetBtn.addEventListener(`click`, resetGrid);
}
function changeColor(event) {
  event.target.style.backgroundColor = "#131313";
}
createGrid();
