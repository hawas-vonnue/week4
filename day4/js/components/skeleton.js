export function loadSkeletons() {
    const skeletonPlaceholders = document.querySelectorAll(
        ".skeletonPlaceholder"
    );
    skeletonPlaceholders.forEach((skeletonPlaceholder) => {
        skeletonPlaceholder.classList.add("skeleton");
        skeletonPlaceholder.classList.remove("hidden");
    });
}

export function removeSkeletons() {
    const skeletonPlaceholders = document.querySelectorAll(
        ".skeletonPlaceholder"
    );
    skeletonPlaceholders.forEach((skeletonPlaceholder) => {
        skeletonPlaceholder.classList.add("hidden");
        skeletonPlaceholder.classList.remove("skeleton");
    });
}
