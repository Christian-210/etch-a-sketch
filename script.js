const gridContainer = document.getElementById("grid-container");
const createGridBtn = document.getElementById("create-grid");
const btnWhite = document.getElementById("clr-btn-white");
const btnRandom = document.getElementById("clr-btn-random");
const btnOpacity = document.getElementById("clr-btn-opacity");
const resetColors = document.getElementById("reset-grid");
let gridCountInput = document.getElementById("grid-value");
const modalContainer = document.getElementById("modal-container");
const cancelModalBtn = document.getElementById("cancel-modal-btn");
const submitModalBtn = document.getElementById("submit-btn");
const alertMsg = document.querySelector("#modal p.alert-msg");
const gridSize = document.querySelector(".grid-size");
let gridCount = 8;
let colorMode = "color-white";
let gridElOpacity = 0;

resetColors.addEventListener("click", () => {
  [...gridContainer.children].forEach((child) => {
    child.style.backgroundColor = "#e4e6eb";

    if (btnOpacity.classList.contains("active")) {
      child.style.opacity = 0.1;
    }
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

  e.stopPropagation();
  e.preventDefault();
});

cancelModalBtn.addEventListener("click", (e) => {
  modalContainer.classList.remove("show-modal");
  alertMsg.classList.remove("alert-msg-show");
  gridCountInput.value = " ";

  e.stopPropagation();
  e.preventDefault();
});

submitModalBtn.addEventListener("click", () => {
  if (Number(gridCountInput.value) > 100 || Number(gridCountInput.value) < 2) {
    alertMsg.classList.add("alert-msg-show");
  } else {
    gridCount = Number(gridCountInput.value);
    gridCountInput.value = " ";
    modalContainer.classList.remove("show-modal");
    gridContainer.innerHTML = "";
    //   colorMode = "color-white";
    alertMsg.classList.remove("alert-msg-show");
    createUserGrid(gridCount);
    console.log(gridCount);
  }
});

document.body.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && modalContainer.classList.contains("show-modal")) {
    // Cancel the default action, if needed
    e.preventDefault();

    if (
      Number(gridCountInput.value) > 100 ||
      Number(gridCountInput.value) < 2
    ) {
      alertMsg.classList.add("alert-msg-show");
    } else {
      gridCount = Number(gridCountInput.value);
      gridCountInput.value = " ";
      modalContainer.classList.remove("show-modal");
      gridContainer.innerHTML = "";
      //   colorMode = "color-white";
      alertMsg.classList.remove("alert-msg-show");
      createUserGrid(gridCount);
      console.log(gridCount);
    }
  }
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
    // child.style.backgroundColor = "#e4e6eb";
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
    // child.style.backgroundColor = "#e4e6eb";
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

    if (colorMode === "color-opacity") {
      gridEl.style.opacity = 0.1;
    }

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
    // gridContainer.style.gridTemplateColumns = `repeat(${num}, ${
    //   num > 70 ? "8px" : num > 40 && num < 70 ? "16px" : "50px"
    // })`;
    // gridContainer.style.gridTemplateRows = `repeat(${num}, ${
    //   num > 70 ? "8px" : num > 40 && num < 70 ? "16px" : "50px"
    // })`;

    gridContainer.style.gridTemplateColumns = `repeat(${num}, calc(600px / ${num})`;
    gridContainer.style.gridTemplateRows = `repeat(${num}, calc(600px / ${num})`;
    gridSize.textContent = `Current Grid Size: ${num} x ${num} `;
  }
};

createUserGrid(gridCount);
