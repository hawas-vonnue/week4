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

function drawGraphs() {
    //put 13 just to have a buffer space at the end,increment here means total space taken by a single bar
    let increment = (canvasWidth - padding) / 13;
    let width = increment - 20;
    let gapInBar = padding + increment;
    for (const month in data) {
        let barHeight = canvasHeight - padding;
        let value = data[month];
        //this denotes how much pixel a value denotes
        let ratio = barHeight / numberOfGridLines / incrementGrid;
        let y = value * ratio;
        drawBar(ctx, gapInBar, barHeight - y, width, y, "red");
        ctx.fillText(month, gapInBar + 10, canvasHeight - 5);
        gapInBar += increment;
    }
}
drawGraphs();
