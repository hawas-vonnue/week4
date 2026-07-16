export function scrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting)
                entry.target.classList.add("scroll-animation");
            else entry.target.classList.remove("scroll-animation");
        });
    });
    const features = document.querySelectorAll(".feature");
    features.forEach((feature) => {
        observer.observe(feature);
    });
}
