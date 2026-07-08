let data = {
    Jan: 10,
    Feb: 20,
    Mar: 10,
    Apr: 20,
    May: 15,
    Jun: 20,
    July: 30,
    Aug: 10,
    Sept: 15,
    Oct: 20,
    Nov: 35,
    Dec: 30,
};
const canvas = document.getElementById("canvas");
const canvasWidth = 800;
const canvasHeight = 800;
const padding = 20;
const numberOfGridLines = 11;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
let ctx = canvas.getContext("2d");

function drawLine(ctx, startX, startY, endX, endY, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.restore();
}

function drawBar(ctx, upperLeftX, upperLeftY, width, height, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(upperLeftX, upperLeftY, width, height);
    ctx.restore();
}
let gap = (canvasHeight - padding) / numberOfGridLines;
let maximumValue = Math.max(...Object.values(data));
let incrementGrid = Math.ceil(maximumValue / (numberOfGridLines - 1));
let barHeight = canvasHeight - padding;

function drawGrids() {
    drawLine(ctx, padding, 0, padding, canvasHeight, "black");
    let value = 0;
    for (let i = 0; i < numberOfGridLines; i++) {
        let y = canvasHeight - padding - i * gap;
        ctx.fillText(value, padding - 15, y - 5);
        value += incrementGrid;
        drawLine(ctx, 0, y, canvasWidth, y, "black");
    }
}
drawGrids();
//put 13 just to have a buffer space at the end,increment here means total space taken by a single bar
let increment = (canvasWidth - padding) / 13;
let width = increment - 20;
let obj = {};

function drawGraph(month, percent, gapInBar) {
    let value = data[month];
    //this denotes how much pixel a value denotes
    let ratio = barHeight / numberOfGridLines / incrementGrid;
    let y = value * ratio;
    if (percent < 100) {
        percent++;
        requestAnimationFrame(function () {
            drawGraph(month, percent, gapInBar);
        });
    }
    let rectangle = new Path2D();
    rectangle.rect(gapInBar, barHeight - y, width, y);
    obj[month] = {
        rectangle: rectangle,
        x: gapInBar,
        y: barHeight - y,
    };

    let newHeight = (y * percent) / 100;
    drawBar(ctx, gapInBar, barHeight - newHeight, width, newHeight, "red");
}

function drawGraphs() {
    let gapInBar = padding + increment;
    for (const month in data) {
        let percent = 0;
        drawGraph(month, percent, gapInBar);
        ctx.fillText(month, gapInBar + 10, canvasHeight - 5);
        gapInBar += increment;
    }
}
drawGraphs();
const toolTip = document.querySelector(".toolTip");
canvas.addEventListener("mousemove", (event) => {
    for (const month in obj) {
        if (
            ctx.isPointInPath(
                obj[month].rectangle,
                event.offsetX,
                event.offsetY
            )
        ) {
            toolTip.style.top = `${obj[month].y + padding}px`;
            toolTip.style.left = `${obj[month].x + 5}px`;
            toolTip.textContent = data[month];
        }
    }
});
const linkElement = document.querySelector("button");
linkElement.addEventListener("click", (event) => {
    let url = canvas.toDataURL("image/png");
    linkElement.querySelector("a").href = url;
});
