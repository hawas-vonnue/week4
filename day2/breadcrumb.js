console.log();
let url = document.location.href;
if (url.includes("home")) {
    let link = document.querySelector("#home");
    link.style.color = "blue";
} else if (url.includes("about")) {
    let link = document.querySelector("#about");
    link.style.color = "blue";
} else {
    let link = document.querySelector("#services");
    link.style.color = "blue";
}
