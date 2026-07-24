export function showToast(message, duration, type = "error") {
    const toasts = document.querySelectorAll(".showToast");
    toasts.forEach((toast) => {
        toast.remove();
    });
    const showToastElement = document.createElement("div");
    showToastElement.style.zIndex = "120";
    showToastElement.classList.add("showToast");
    const toastContainerElement = document.createElement("div");
    toastContainerElement.classList.add("toastContainer");
    const imageElement = document.createElement("img");
    const progressBarElement = document.createElement("div");
    progressBarElement.classList.add("progressBar");
    if (type === "warning") {
        imageElement.src =
            "https://img.icons8.com/?size=100&id=781qLOihKEEg&format=png&color=000000";
        progressBarElement.style.border = "solid yellow";
        showToastElement.style.backgroundColor = "#ffffdd";
    }
    if (type === "info") {
        imageElement.src =
            "https://img.icons8.com/?size=100&id=FJjsgnE4CWTg&format=png&color=000000";
        progressBarElement.style.border = "solid blue";
        showToastElement.style.backgroundColor = "#ADD8E6";
    }
    if (type === "error") {
        imageElement.src =
            "https://img.icons8.com/?size=100&id=43735&format=png&color=000000";
        progressBarElement.style.border = "solid red";
        showToastElement.style.backgroundColor = "#FF474C";
    }
    if (type === "success") {
        imageElement.src =
            "https://img.icons8.com/?size=100&id=43711&format=png&color=000000";
        progressBarElement.style.border = "solid green";
        showToastElement.style.backgroundColor = "#90EE90";
    }
    const messageElement = document.createElement("span");
    messageElement.textContent = message;
    toastContainerElement.appendChild(imageElement);
    toastContainerElement.appendChild(messageElement);
    showToastElement.appendChild(toastContainerElement);
    showToastElement.appendChild(progressBarElement);
    const styleElement = document.createElement("style");
    styleElement.textContent = `  .showToast {
        box-sizing: border-box;
        position: fixed;
        top: 60px;
        right: 30px;
        border: solid;
        padding: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        transform: translateX(120%);
        animation:
          slideIn 0.3s ease-in forwards,
          slideOut 0.5s ease-out forwards ${duration}s;
      }
      .toastContainer {
        display: flex;
        align-items: center;
        gap:4px;
      }
      .progressBar {
        box-sizing: border-box;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0%;
        animation: progress ${duration}s ease-in ;
      }
      .showToast img {
        height: 30px;
        width:30px;
      }
      @keyframes slideIn {
        0% {
          transform: translateX(120%);
        }
        100% {
          transform: translateX(0%);
        }
      }
      @keyframes slideOut {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
      @keyframes progress {
        0% {
          width: 100%;
        }
        100% {
          width: 0%;
        }
      }`;
    const head = document.head;
    head.appendChild(styleElement);
    document.body.prepend(showToastElement);
}
