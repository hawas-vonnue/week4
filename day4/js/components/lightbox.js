export function lightBox() {
    const cards = document.querySelectorAll(".container div");
    const overlay = document.getElementsByClassName("image-overlay")[0];
    const prevButton = document.querySelector(".image-overlay .prev");
    const nextButton = document.querySelector(".image-overlay .next");
    const images = document.querySelectorAll(".container div figure img");
    const closeButton = document.querySelector(".image-overlay .close");

    function moveToPrev() {
        let imageNow = overlay.querySelector("img");
        for (let i = 0; i < images.length; i++) {
            if (images[i].src === imageNow.src) {
                let index =
                    (((i - 1) % images.length) + images.length) % images.length;
                imageNow.src = images[index].src;
                break;
            }
        }
    }

    function moveToNext() {
        let imageNow = overlay.querySelector("img");
        for (let i = 0; i < images.length; i++) {
            if (images[i].src === imageNow.src) {
                //modular operation ((n%d)+d)%d
                let index =
                    (((i + 1) % images.length) + images.length) % images.length;
                imageNow.src = images[index].src;
                break;
            }
        }
    }
    cards.forEach((card) => {
        card.addEventListener("click", (event) => {
            overlay.style.display = "flex";
            const image = event.currentTarget.querySelector("figure img");
            const overlayImage = overlay.querySelector("img");
            overlayImage.src = image.src;
            window.scrollTo({ top: 0, left: 0 });
            document.body.style.overflow = "hidden";
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            overlay.style.display = "none";
            document.body.style.overflow = "visible";
        }
        if (event.key === "ArrowLeft") {
            moveToPrev();
        }
        if (event.key === "ArrowRight") {
            moveToNext();
        }
        if (event.key === "Tab") {
            if (event.shiftKey) {
                if (document.activeElement === prevButton) {
                    closeButton.focus();
                    event.preventDefault();
                }
            } else {
                if (document.activeElement === closeButton) {
                    prevButton.focus();
                    event.preventDefault();
                }
            }
        }
    });

    prevButton.addEventListener("click", (event) => {
        moveToPrev();
    });

    nextButton.addEventListener("click", (event) => {
        moveToNext();
    });

    closeButton.addEventListener("click", (event) => {
        overlay.style.display = "none";
        document.body.style.overflow = "visible";
    });
    const thresholdX = 30;
    let startX;
    overlay.addEventListener("touchstart", (event) => {
        startX = event.changedTouches[0].screenX;
    });
    overlay.addEventListener("touchend", (event) => {
        let endX = event.changedTouches[0].screenX;
        let difference = endX - startX;
        if (Math.abs(difference) > thresholdX) {
            if (difference > 0) {
                moveToPrev();
            } else {
                moveToNext();
            }
        }
    });
}
