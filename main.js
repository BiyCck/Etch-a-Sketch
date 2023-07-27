let mouseDown = false;

window.addEventListener("mousedown", () => {
    mouseDown = true;
})

window.addEventListener("mouseup", () => {
    mouseDown = false;
})

// Booleans for drawing mode
let draw = true;
let rainbowDraw = false;
let eraser = true;

const gridSection = document.getElementById("grid-container");

// Function for creating grid
function createGrid(dimension) {
    gridSection.innerHTML = ""
    for (let i = 0; i < dimension ** 2; i++) {
        dimensionRatio = 100 / dimension;
        const div = document.createElement("div");
        div.style.backgroundColor = "white";
        div.style.textAlign = "center";
        div.style.verticalAlign = "center";
        div.style.flex = `1 0 ${dimensionRatio}%`;
        // Add an event listener to each div
        div.addEventListener("mouseover", () => {
            if (mouseDown) {
                changeColor(div);
            }
        });
        gridSection.appendChild(div);
    }
}

// Grid Button
const gridButton = document.getElementById("create-grid");

gridButton.addEventListener("click", () => {
    const dimensionValue = document.getElementById("myRange").value;
    createGrid(dimensionValue);
})

// Event listeners for drawing modes

const drawButton = document.getElementById("drawColor");
const rainbowDrawButton = document.getElementById("rainbowColor");
const eraserButton = document.getElementById("erase");

drawButton.addEventListener("click", () => {
    draw = true;
    rainbowDraw = false;
    eraser = false; // Set eraser to false when drawing mode is activated
})

rainbowDrawButton.addEventListener("click", () => {
    draw = false;
    rainbowDraw = true;
    eraser = false; // Set eraser to false when rainbowDraw mode is activated
})

eraserButton.addEventListener("click", () => {
    draw = false;
    rainbowDraw = false;
    eraser = true;
})


// Function for changing color
function changeColor(div) {
    if(draw) {
        const color = document.getElementById("color-picker").value;
        div.style.backgroundColor = color;
   } else if (rainbowDraw) {
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        div.style.backgroundColor = `#${randomColor}`;
   } else if (eraser) {
        div.style.backgroundColor = "white";
   }
}

var slider = document.getElementById("myRange");
var output = document.getElementById("dimensionValue");
output.innerHTML = `${slider.value}x${slider.value}`; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.innerHTML = `${slider.value}x${slider.value}`;
}

createGrid(document.getElementById("dimension-input").value);