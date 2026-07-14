const fetchData = require("./weather-utils.js");

async function updateWeather(
    url = "https://geocoding-api.open-meteo.com/v1/search?name=kozhikode&count=1&language=en&format=json"
) {
    const response = await fetchData(url);
    console.log(response);
}

module.exports = updateWeather;
