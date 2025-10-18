const apiKey = 'e19415c27a9d978587e3d7771dc00810';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Select elements
const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

// Event listeners
searchButton.addEventListener('click', handleSearch);
locationInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleSearch();
});

// Main handler
function handleSearch() {
  const location = locationInput.value.trim();
  if (!location) {
    showAlert('Please enter a location');
    return;
  }
  fetchWeather(location);
}

// Fetch weather data
async function fetchWeather(location) {
  const url = `${apiUrl}?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      showAlert(data.message || 'Error fetching weather data');
      return;
    }

    updateUI(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    showAlert('Failed to fetch weather data. Please check your connection.');
  }
}

// Update UI
function updateUI(data) {
  locationElement.textContent = data.name || 'Unknown Location';
  temperatureElement.textContent = data.main?.temp
    ? `${Math.round(data.main.temp)}°C`
    : 'N/A';
  descriptionElement.textContent =
    data.weather?.[0]?.description ||
    'No description available';

  animateTemperature();
}

// Helper: Alert box with fade effect
function showAlert(message) {
  const alertBox = document.createElement('div');
  alertBox.textContent = message;
  alertBox.className = 'custom-alert';

  document.body.appendChild(alertBox);
  setTimeout(() => alertBox.classList.add('fade-out'), 2000);
  setTimeout(() => alertBox.remove(), 2600);
}

// Helper: smooth update animation
function animateTemperature() {
  temperatureElement.classList.add('temp-pulse');
  setTimeout(() => temperatureElement.classList.remove('temp-pulse'), 800);
}

function updateBackground(weatherType) {
  const body = document.body;
  if (weatherType.includes('rain')) {
    body.style.background = 'linear-gradient(-45deg, #3a7bd5, #3a6073)';
  } else if (weatherType.includes('clear')) {
    body.style.background = 'linear-gradient(-45deg, #56ccf2, #2f80ed)';
  } else if (weatherType.includes('cloud')) {
    body.style.background = 'linear-gradient(-45deg, #757f9a, #d7dde8)';
  } else {
    body.style.background = 'linear-gradient(-45deg, #00c9ff, #92fe9d)';
  }
  body.style.backgroundSize = '400% 400%';
  body.style.animation = 'gradientShift 15s ease infinite';
}
