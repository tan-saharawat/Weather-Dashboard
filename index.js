const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

darkModeToggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode', darkModeToggle.checked);
});

async function fetchWeather(city) {
    const apiKey = 'f7f13723031c6d95e70d9cf2dd0b0fc4';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        throw error;
    }
}

const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const weatherBody = document.getElementById('weather-body');

async function updateWeatherTable(cityName) {
    try {
        const data = await fetchWeather(cityName);
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${data.name}</td>
            <td>${data.main.temp}</td>
            <td>${data.weather[0].description}</td>
            <td>${data.main.humidity || ''}</td>
            <td>${data.wind.speed || ''}</td>
        `;
        weatherBody.innerHTML = '';
        weatherBody.appendChild(newRow);
    } catch (error) {
        console.error('Error updating weather table:', error.message);
    }
}

searchButton.addEventListener('click', () => {
    const cityName = cityInput.value.trim();
    if (cityName !== '') {
        updateWeatherTable(cityName);
        cityInput.value = '';
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    const cities = ['Delhi', 'Chennai', 'Hyderabad', 'Bangalore', 'Kolkata'];
    const apiKey = 'f7f13723031c6d95e70d9cf2dd0b0fc4';

    for (const city of cities) {
        try {
            await fetchWeather(city, apiKey);
        } catch (error) {
            console.error(`Error fetching weather data for ${city}:`, error.message);
        }
    }
});
