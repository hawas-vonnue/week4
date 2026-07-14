async function fetchData(url) {
    try {
        const response = await fetch(url);
        const responseJson = await response.json();
        if (!response.ok) {
            throw new Error("error in fetching");
        }

        return responseJson;
    } catch (error) {
        return Promise.reject("error");
    }
}

module.exports = fetchData;
