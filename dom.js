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
    circleDiv.classList.add("cirlceCss");
    circleDiv.style.left = circle.x - 6 + "px";
    circleDiv.style.top = circle.y - 6 + "px";
    circleDiv.style.backgroundColor = circle.bg;
    wrapper.appendChild(circleDiv);

    circle.element = circleDiv;
    circles.push(circle);
    deleteCircles.length = 0;
}

wrapper.addEventListener("click", function (e) {
    e.stopPropagation();
});

undoBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    // undoCircle();
    handleAction("undo");
});

redoBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    // redoCircle();
    handleAction("redo");
});

resetBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    // resetCircle();
    handleAction("reset");
});

function handleAction(action) {

    if (action === "undo") {

        if (circles.length === 0) return;
        const lastCircle = circles.pop();
        wrapper.removeChild(lastCircle.element);
        deleteCircles.push(lastCircle);
    }
    else if (action === "redo") {

        if (deleteCircles.length === 0) return;

        const lastDeleted = deleteCircles.pop();

        wrapper.appendChild(lastDeleted.element);
        circles.push(lastDeleted);
    }
    else if (action === "reset") {
        circles.forEach(circle => wrapper.removeChild(circle.element));
        circles.length = 0;
        deleteCircles.length = 0;
    }
}