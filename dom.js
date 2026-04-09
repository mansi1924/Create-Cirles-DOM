let colorsCode = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FFA500", "#800080", "#00FFFF", "#FFC0CB", "#A52A2A", "#808000"];
const wrapper = document.querySelector("#wrapper");
const undoBtn = document.querySelector("#undo");
const redoBtn = document.querySelector("#redo");
const resetBtn = document.querySelector("#reset");
const circles = [];
const deleteCircles = [];


window.addEventListener("click", createCircle);

function createCircle(event) {
    const randomValue = Math.floor(Math.random() * 6);
    const circle = {
        id: Date.now(),
        x: event.clientX,
        y: event.clientY,
        bg: colorsCode[randomValue],
    }
    console.log(circle);

    const circleDiv = document.createElement("div");
    circleDiv.style.position = "absolute";
    circleDiv.style.left = circle.x - 6 + "px";
    circleDiv.style.top = circle.y - 6 + "px";
    circleDiv.style.width = "12px";
    circleDiv.style.height = "12px";
    circleDiv.style.borderRadius = "50%";
    circleDiv.style.backgroundColor = circle.bg;
    wrapper.appendChild(circleDiv);

    circle.element = circleDiv;
    circles.push(circle);
    deleteCircles.length = 0;
}

// undoBtn.addEventListener("click", undoCircle);
undoBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    undoCircle();
});

function undoCircle() {
    if (circles.length === 0) return;
    const lastCircle = circles.pop();
    wrapper.removeChild(lastCircle.element);
    deleteCircles.push(lastCircle);
}

// redoBtn.addEventListener("click", redoCircle);
redoBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    redoCircle();
});

function redoCircle() {
    if (deleteCircles.length === 0) return;

    const lastDeleted = deleteCircles.pop();

    wrapper.appendChild(lastDeleted.element);
    circles.push(lastDeleted);
}

// resetBtn.addEventListener("click", resetCircle);
resetBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    resetCircle();
});

function resetCircle() {
    circles.forEach(circle => wrapper.removeChild(circle.element));
    circles.length = 0;
    deleteCircles.length = 0;
}