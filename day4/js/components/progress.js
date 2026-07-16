export function progressBar(pageName) {
    if (!window.location.href.includes(pageName)) return;
    const progressBar = document.createElement("div");
    progressBar.style.position = "fixed";
    progressBar.style.top = "0px";
    progressBar.style.left = "0px";
    progressBar.style.height = "4px";
    progressBar.style.zIndex = "150";
    progressBar.style.backgroundColor = "red";

    function updateProgressBar() {
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const progress = Math.floor((scrollY / maxScroll) * 100);
        progressBar.style.width = `${progress}%`;
    }
    document.addEventListener("scroll", (event) => {
        updateProgressBar();
    });
    document.body.prepend(progressBar);
}
