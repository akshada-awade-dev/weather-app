
 ## Project 2 - Weather App

A responsive Weather Application built using HTML, CSS, Bootstrap, and JavaScript.  
The app fetches real-time weather data and hourly forecast using the OpenWeatherMap API.

---

## 🚀 Features

- 🌍 Search weather by city name
- 🇮🇳 India-only city suggestions (Geocoding API)
- 🌡️ Real-time temperature (°C)
- 💧 Humidity details
- 🌬️ Wind speed display
- 🔥 Hottest & ❄ Coldest city tracker (India)
- ⏰ Live digital clock
- 📊 Hourly forecast (scrollable layout)
- 🌙 Dynamic weather icons (day/night support)
- 📱 Fully responsive (Mobile / Tablet / Desktop)

---

## 🛠️ Technologies Used

- HTML5
- CSS3
- Bootstrap 5
- JavaScript (ES6)
- Fetch API
- OpenWeatherMap API
- Font Awesome Icons

---

## 📂 Project Structure

weather-app/
│
├── index.html
├── style.css
├── script.js
├── images/
└── README.md


---

## 🔗 API Used

### 1️⃣ Current Weather API
https://api.openweathermap.org/data/2.5/weather


### 2️⃣ 5-Day / 3-Hour Forecast API
https://api.openweathermap.org/data/2.5/forecast


### 3️⃣ Geocoding API (City Suggestions)
https://api.openweathermap.org/geo/1.0/direct


---

## 🧠 Key Concepts Implemented

- Asynchronous JavaScript (Fetch API)
- Promise handling
- Dynamic DOM manipulation
- Event listeners
- Debouncing (City suggestion input)
- Conditional rendering
- API error handling
- Responsive layout with Bootstrap Grid
- Glassmorphism UI styling

---

## ▶️ How to Run Locally

1. Clone the repository
2. Open the folder in VS Code
3. Run using Live Server

⚠️ Do not open using direct double-click (API calls may fail).

---

## 🌐 Deployment

This project can be deployed on:

- Vercel
- Netlify
- GitHub Pages

Make sure:
- API key is active
- All image paths are correct
- index.html is in the root folder

---

## 🔐 Note About API Key

Replace the API key inside `script.js` with your own:

```js
const apiKey = "YOUR_API_KEY";
You can generate one from:
https://openweathermap.org/api

📌 Future Improvements
Add loading spinner

Add error UI instead of alert()

Add unit toggle (°C / °F)

Add 7-day forecast

Add dark/light theme toggle

Add recent search history

Improve weather animations

👩‍💻 Author
Akshada Awade

Aspiring Full Stack Developer 🚀


