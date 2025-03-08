const apiKey = 'e19415c27a9d978587e3d7771dc00810'; 
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

searchButton.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location) {
        fetchWeather(location);
    } else {
        alert('Please enter a location');
    }
});

async function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            locationElement.textContent = data.name || 'Unknown Location';
            temperatureElement.textContent = data.main ? `${Math.round(data.main.temp)}°C` : 'N/A';
            descriptionElement.textContent = data.weather && data.weather.length > 0 ? data.weather[0].description : 'No description available';
        } else {
            alert(data.message || 'Error fetching weather data');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data. Please try again.');
    }
}
