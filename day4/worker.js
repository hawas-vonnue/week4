onmessage = (e) => {
    let arr = e.data;
    arr.sort((a, b) => a.id - b.id);
    postMessage(arr);
};
