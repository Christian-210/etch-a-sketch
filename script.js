const gridContainer = document.getElementById("grid-container");
const createGridBtn = document.getElementById("create-grid");
const btnWhite = document.getElementById("clr-btn-white");
const btnRandom = document.getElementById("clr-btn-random");
const btnOpacity = document.getElementById("clr-btn-opacity");
const resetColors = document.getElementById("reset-grid");
const gridCountInput = document.getElementById("grid-value");
const modalContainer = document.getElementById("modal-container");
const cancelModalBtn = document.getElementById("cancel-modal-btn");
const submitModalBtn = document.getElementById("submit-btn");
let gridCount = 4;
let colorMode = "color-white";
let gridElOpacity = 0;

resetColors.addEventListener("click", () => {
  [...gridContainer.children].forEach((child) => {
    child.style.backgroundColor = "#e4e6eb";
  });
});

// createGridBtn.addEventListener("click", () => {
//   gridContainer.innerHTML = "";
//   colorMode = "color-white";

//   gridCount = prompt("How many squares do you want per side?");
//   createUserGrid(gridCount);
// });

createGridBtn.addEventListener("click", (e) => {
  //   gridContainer.innerHTML = "";
  //   colorMode = "color-white";
  modalContainer.classList.add("show-modal");

  setInterval(() => {
    modalContainer.classList.add("fade-modal");
  }, 100);
  //   createUserGrid(gridCount);
  e.stopPropagation();
  e.preventDefault();
});

cancelModalBtn.addEventListener("click", (e) => {
  modalContainer.classList.remove("fade-modal");

  setInterval(() => {
    modalContainer.classList.remove("show-modal");
  }, 100);

  e.stopPropagation();
  e.preventDefault();
});

const hoverWhite = (gridItem) => {
  gridItem.style.backgroundColor = "#18191a";
};

const hoverRandomColor = (gridItem) => {
  let r = Math.floor(Math.random() * 255) + 1;
  let g = Math.floor(Math.random() * 255) + 1;
  let b = Math.floor(Math.random() * 255) + 1;
  let bgColor = `${r}, ${g}, ${b}`;

  gridItem.style.backgroundColor = `rgb(${bgColor})`;
};

const hoverBlkOpacity = (gridItem) => {
  let opacityIncrementor = 0.1;
  let gridItemOpacity = Number(gridItem.style.opacity);

  gridItemOpacity += opacityIncrementor;

  gridItem.style.opacity = gridItemOpacity.toString();
};

btnWhite.addEventListener("click", (e) => {
  [...e.target.parentElement.children].forEach((child) =>
    child.classList.remove("active")
  );

  gridElOpacity = 1.0;

  e.target.classList.add("active");
  colorMode = "color-white";
  console.log("color mode:", colorMode);
  [...gridContainer.children].forEach((child) => {
    child.style.backgroundColor = "#e4e6eb";
    child.style.opacity = gridElOpacity;
  });
});

btnRandom.addEventListener("click", (e) => {
  [...e.target.parentElement.children].forEach((child) =>
    child.classList.remove("active")
  );

  gridElOpacity = 1.0;

  e.target.classList.add("active");
  colorMode = "color-randomize";
  console.log("color mode:", colorMode);
  [...gridContainer.children].forEach((child) => {
    child.style.backgroundColor = "#e4e6eb";
    child.style.opacity = gridElOpacity;
  });
});

btnOpacity.addEventListener("click", (e) => {
  [...e.target.parentElement.children].forEach((child) =>
    child.classList.remove("active")
  );

  //   gridElOpacity = 0.1;

  e.target.classList.add("active");
  colorMode = "color-opacity";
  console.log("color mode:", colorMode);
  [...gridContainer.children].forEach((child) => {
    child.style.backgroundColor = "#e4e6eb";
    child.style.opacity = 0.1;
  });
});

const createUserGrid = (num) => {
  for (let i = 0; i < gridCount ** 2; i++) {
    const gridEl = document.createElement("div");
    gridEl.classList.add("grid-square");

    gridEl.addEventListener("mouseenter", (e) => {
      if (colorMode === "color-white") {
        hoverWhite(e.target);
      }

      if (colorMode === "color-randomize") {
        hoverRandomColor(e.target);
      }

      if (colorMode === "color-opacity") {
        // hoverBlkOpacity(e.target);
        if (Number(e.target.style.opacity) < 1.0) {
          hoverBlkOpacity(e.target);
        }
      }
    });

    gridContainer.appendChild(gridEl);
    gridContainer.style.gridTemplateColumns = `repeat(${num}, 50px)`;
    gridContainer.style.gridTemplateRows = `repeat(${num}, 50px)`;
  }
};

createUserGrid(gridCount);
