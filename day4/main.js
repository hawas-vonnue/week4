const myWorker = new Worker("worker.js");

const objects = [];

function createObjects() {
    //increased the number to feel the difference
    for (let i = 10000000; i > 0; i--) {
        let obj = {
            id: i,
            name: `name${i} `,
        };
        objects.push(obj);
    }
}
createObjects();

//main thread blocking sort
// objects.sort((a, b) => a.id - b.id);
// console.log("hey");
// console.log(objects);

myWorker.postMessage(objects);
myWorker.onmessage = (e) => {
    console.log("message receieved");
    console.log(e.data);
};

console.log("here");
const main = document.querySelector("main");
const div = document.createElement("div");
div.textContent = "hello ";
main.append(div);
