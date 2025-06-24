alert("HI! nigga! Welcome to Pixel Dashboard! \n\nThis is a simple dashboard that shows the current time, date, weather, and some shortcuts to your favorite apps.  \n\nHave fun!");
// === COOKIE BANNER FUNCTIONALITY ===
  function acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    document.getElementById('cookie-banner').style.display = 'none';
  }

  window.onload = function() {
    if (!localStorage.getItem('cookiesAccepted')) {
      document.getElementById('cookie-banner').style.display = 'block';
    }
  }



// === CLOCK FUNCTIONALITY ===
function updateClock() {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const ist = new Date(utc + istOffset);

    let hours = ist.getHours();
    const minutes = ist.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('ampm').textContent = ampm;

    const options = { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'Asia/Kolkata' };
    document.getElementById('date').textContent = ist.toLocaleDateString('en-US', options);
}

setInterval(updateClock, 1000);
updateClock();



/// === WEATHER FUNCTIONALITY .. Fu nonsense
const API_KEY = '49be5149374efc4859904ff933721ede';
const CITY = 'Dispur';

function getWeatherIcon(condition) {
    const icons = {
        Thunderstorm: '⛈️',
        Drizzle: '🌦️',
        Rain: '🌧️',
        Snow: '❄️',
        Clear: '☀️',
        Clouds: '☁️',
        Mist: '🌫️'
    };
    return icons[condition] || '🌡️';
}

async function updateWeather() {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const weatherData = {
            location: data.name,
            condition: data.weather[0].main,
            temp: Math.round(data.main.temp),
            feelsLike: Math.round(data.main.feels_like),
            humidity: data.main.humidity,
            minTemp: Math.round(data.main.temp_min),
            maxTemp: Math.round(data.main.temp_max),
            icon: getWeatherIcon(data.weather[0].main)
        };

        document.getElementById('weather-location').textContent = weatherData.location;
        document.getElementById('weather-icon').textContent = weatherData.icon;
        document.getElementById('weather-temp').textContent = `${weatherData.temp}°C`;
        document.getElementById('weather-condition').textContent = weatherData.condition;
        document.getElementById('feels-like').textContent = `${weatherData.feelsLike}°C`;
        document.getElementById('humidity').textContent = `${weatherData.humidity}%`;
        document.getElementById('min-temp').textContent = `${weatherData.minTemp}°C`;
        document.getElementById('max-temp').textContent = `${weatherData.maxTemp}°C`;

        console.log('✅ Weather widget updated successfully:', weatherData);
    } catch (error) {
        console.error('❌ Failed to fetch weather data:', error);
    }
}

// good morning, good afternoon, good evening
function updateGreeting() {
    const hour = new Date().getHours();
    let greeting = hour < 12
        ? "Good morning! Start your day with purpose and creativity."
        : hour < 17
        ? "Good afternoon! Keep pushing forward with your amazing projects."
        : "Good evening! Time to reflect on today's accomplishments.";
    console.log('🌅 Greeting:', greeting);
}

// === whatsapp, discord, etc. SHORTCUTS ===
function initializeAppShortcuts() {
    const shortcuts = document.querySelectorAll('.app-icon');
    const appUrls = {
        whatsapp: 'https://web.whatsapp.com',
        email: 'https://mail.google.com',
        github: 'https://github.com/justdoit-63',
        discord: 'https://discord.com/channels/@me'
    };

    shortcuts.forEach(icon => {
        icon.addEventListener('click', function () {
            const app = this.classList[1];
            this.style.transform = 'scale(0.95)';
            setTimeout(() => (this.style.transform = 'scale(1.1)'), 150);
            if (appUrls[app]) window.open(appUrls[app], '_blank');
        });
    });
}

// === RESPONSIVE ANIMATIONS ===
function initializeAnimations() {
    document.querySelectorAll('.widget').forEach((widget, i) => {
        widget.style.animationDelay = `${i * 0.1}s`;
    });
}

// === INITIALIZATION === copied
document.addEventListener('DOMContentLoaded', () => {
    updateClock();
    setInterval(updateClock, 1000);
    updateWeather();
    updateGreeting();
    initializeAppShortcuts();
    initializeAnimations();

    console.log('🎨 Pixel Dashboard loaded');
});

// copied   
document.documentElement.style.scrollBehavior = 'smooth';

document.addEventListener('keydown', function (e) {
    if ((e.key === 'r' || e.key === 'R') && !e.ctrlKey && !e.metaKey) {
        updateWeather();
        console.log('🔄 Weather manually refreshed!');
    }
});

if ('ontouchstart' in window) {
    document.querySelectorAll('.widget, .app-icon').forEach(el => {
        el.addEventListener('touchstart', () => (el.style.transform = 'scale(0.98)'));
        el.addEventListener('touchend', () => (el.style.transform = ''));
    });
}
