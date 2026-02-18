const apiKey = "acad1d66c511a1909331c149301473ec";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";
const geoUrl = "https://api.openweathermap.org/geo/1.0/direct?limit=5&q=";


const searchBtn = document.getElementById("getWeather");
const cityInput = document.getElementById("city");

const extremeCities = ["Jaisalmer", "Leh", "Nagpur", "Delhi", "Mumbai", "Bangalore", "Guwahati", "Srinagar"];

window.addEventListener("load", () => {
    const defaultCity = "Pune";
    getWeather(defaultCity);
    getIndiaExtremes();
    startLiveClock();
});

function startLiveClock() {
    updateTime();
    setInterval(updateTime, 1000);
}

function updateTime() {
    const timeElement = document.getElementById("updateTime");
    if (timeElement) {
        timeElement.innerText = `Current Time: ${new Date().toLocaleTimeString()}`;
    }
}
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
        getForecast(city);
    } else {
        alert("Please enter a city name");
    }
});

let typingTimer;
cityInput.addEventListener("input", () => {
    clearTimeout(typingTimer);
    const query = cityInput.value.trim();
    if (query.length >= 3) {
        typingTimer = setTimeout(() => fetchCitySuggestions(query), 500);
    }
});

function fetchCitySuggestions(query) {
    fetch(`${geoUrl}${query},IN&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const datalist = document.getElementById("city-list");
            datalist.innerHTML = "";
            // Filter to ensure only India results are shown
            data.filter(city => city.country === "IN").forEach(city => {
                const option = document.createElement("option");
                option.value = city.name + (city.state ? `, ${city.state}` : "") + `, ${city.country}`;
                datalist.appendChild(option);
            });
        })
        .catch(err => console.error("Geocoding Error:", err));
}

function getWeather(city) {
    fetch(apiUrl + city + `&appid=${apiKey}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then((data) => {
            updateUI(data);
            getForecast(city); // Also fetch forecast
        })
        .catch((error) => {
            alert("No city found. Please check the name and try again!");
            console.error(error);
        });
}

function getForecast(city) {
    fetch(forecastUrl + city + `&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            updateForecastUI(data);
        })
        .catch(err => console.error("Forecast Error:", err));
}

function updateUI(data) {
    const hour = new Date().getHours();
    const isNight = hour < 6 || hour >= 18;
    const mainIcon = getWeatherIcon(data.weather[0].main, isNight);

    const iconElement = document.getElementById("main-weather-icon");
    if (iconElement) {
        iconElement.className = `fa ${mainIcon}`;
    }

    document.getElementById("temp-value").innerText = `${Math.round(data.main.temp)}°C`;
    document.getElementById("humidity-value").innerText = `${data.main.humidity}%`;
    document.getElementById("wind-value").innerText = `${data.wind.speed} km/h`;
}

function getIndiaExtremes() {
    const requests = extremeCities.map(city =>
        fetch(apiUrl + city + `&appid=${apiKey}`).then(res => res.json())
    );

    Promise.all(requests)
        .then(results => {
            const validResults = results.filter(res => res.cod === 200);
            if (validResults.length === 0) return;

            const hottest = validResults.reduce((prev, curr) => (prev.main.temp > curr.main.temp) ? prev : curr);
            const coldest = validResults.reduce((prev, curr) => (prev.main.temp < curr.main.temp) ? prev : curr);

            document.getElementById("hottestCity").innerText = `${hottest.name}: ${Math.round(hottest.main.temp)}°C`;
            document.getElementById("coldestCity").innerText = `${coldest.name}: ${Math.round(coldest.main.temp)}°C`;
        })
        .catch(err => console.error("Extremes Error:", err));
}

function updateForecastUI(data) {
    const forecastContainer = document.getElementById("hourlyForecast");
    forecastContainer.innerHTML = ""; // Clear existing

    // Loop through the first 8 intervals (24 hours approx)
    data.list.slice(0, 10).forEach(item => {
        const date = new Date(item.dt * 1000);
        const hour = date.getHours();
        const isNight = hour < 6 || hour >= 18;
        const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const temp = Math.round(item.main.temp);

        const weatherIcon = getWeatherIcon(item.weather[0].main, isNight);

        const hourlyItem = `
            <div class="hourly-item">
                <p class="hourly-time">${time}</p>
                <i class="fa ${weatherIcon}" style="font-size: 2rem; margin: 10px 0; color: #fff;"></i>
                <p>${temp}°C</p>
            </div>
        `;
        forecastContainer.innerHTML += hourlyItem;
    });
}

function getWeatherIcon(condition, isNight) {
    if (condition === "Clear" && isNight) {
        return "fa-moon-o";
    }

    const map = {
        "Clear": "fa-sun-o",
        "Clouds": "fa-cloud",
        "Rain": "fa-tint",
        "Drizzle": "fa-umbrella",
        "Thunderstorm": "fa-bolt",
        "Snow": "fa-snowflake-o",
        "Mist": "fa-align-justify",
        "Smoke": "fa-align-justify",
        "Haze": "fa-align-justify",
        "Dust": "fa-align-justify",
        "Fog": "fa-align-justify",
        "Sand": "fa-align-justify",
        "Ash": "fa-align-justify",
        "Squall": "fa-retweet",
        "Tornado": "fa-retweet"
    };
    return map[condition] || "fa-question-circle";
}


