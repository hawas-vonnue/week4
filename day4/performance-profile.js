const box = document.querySelector(".container");
//forced reflow- put this line inside the loop to create forced reflow
const offwidth = box.offsetWidth;
for (let i = 1; i < 10000; i++) {
    box.style.width = `${offwidth}px`;
}
