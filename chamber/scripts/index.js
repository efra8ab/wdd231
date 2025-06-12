document.addEventListener('DOMContentLoaded', () => {
    const tempToggle = document.getElementById('temp-toggle');
    if (tempToggle) {
        tempToggle.addEventListener('click', () => {
            document.body.classList.toggle('celsius');
            const useCelsius = document.body.classList.contains('celsius');
            tempToggle.textContent = useCelsius ? 'Show °F' : 'Show °C';
            setTimeout(() => {
                getWeather();
            }, 10);
        });

        const useCelsius = document.body.classList.contains('celsius');
        tempToggle.textContent = useCelsius ? 'Show °F' : 'Show °C';
    }

    getWeather();
    getSpotlights();
});

async function getWeather() {
    const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
    const lat = 19.4326;
    const lon = -99.1332;
    const useCelsius = document.body.classList.contains('celsius');
    const units = useCelsius ? 'metric' : 'imperial';
    console.log('Using units:', units);
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Weather data fetch failed');
        const data = await response.json();

        const currentTempEl = document.querySelector('.current-weather .temp');
        const currentDescEl = document.querySelector('.current-weather .condition');
        const highLowEl = document.querySelector('.current-weather .highlow');
        const humidityEl = document.querySelector('.current-weather .humidity');
        const sunriseEl = document.querySelector('.current-weather .sunrise');
        const sunsetEl = document.querySelector('.current-weather .sunset');
        const weatherIconEl = document.querySelector('.current-weather .weather-icon');

        const current = data.current;
        console.log(`API returned current temp: ${current.temp}`);
        console.log(`Today's high: ${data.daily[0].temp.max}, low: ${data.daily[0].temp.min}`);
        const todayHigh = data.daily[0].temp.max;
        const todayLow = data.daily[0].temp.min;
        const description = current.weather[0].description;
        const iconCode = current.weather[0].icon;

        currentTempEl.textContent = `${Math.round(current.temp)}°${useCelsius ? 'C' : 'F'}`;
        currentDescEl.textContent = capitalize(description);
        highLowEl.textContent = `High: ${Math.round(todayHigh)}°${useCelsius ? 'C' : 'F'}  |  Low: ${Math.round(todayLow)}°${useCelsius ? 'C' : 'F'}`;
        humidityEl.textContent = `Humidity: ${current.humidity}%`;

        const sunriseTime = new Date(current.sunrise * 1000).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
        const sunsetTime = new Date(current.sunset * 1000).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
        sunriseEl.textContent = `Sunrise: ${sunriseTime}`;
        sunsetEl.textContent = `Sunset: ${sunsetTime}`;

        weatherIconEl.setAttribute(
            'src',
            `https://openweathermap.org/img/wn/${iconCode}@2x.png`
        );
        weatherIconEl.setAttribute('alt', description);

        const forecastListEl = document.querySelector('.weather-forecast ul');
        forecastListEl.innerHTML = '';

        for (let i = 1; i <= 3; i++) {
            const dayData = data.daily[i];
            const date = new Date(dayData.dt * 1000);
            const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
            const high = Math.round(dayData.temp.max);
            const low = Math.round(dayData.temp.min);

            const li = document.createElement('li');
            li.innerHTML = `<strong>${weekday}:</strong> High ${high}°${useCelsius ? 'C' : 'F'} / Low ${low}°${useCelsius ? 'C' : 'F'}`;
            forecastListEl.appendChild(li);
        }
    } catch (error) {
        console.error('Error fetching weather:', error);
    }
}

async function getSpotlights() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) throw new Error('Members data fetch failed');
        const jsonData = await response.json();

        const allMembers = Array.isArray(jsonData)
            ? jsonData
            : jsonData.members;

        const eligible = allMembers.filter((m) => {
            const level = Number(m.membershipLevel || m.membership || m.level);
            return level === 2 || level === 3;
        });

        if (eligible.length === 0) return;

        shuffleArray(eligible);
        const picked = eligible.slice(0, Math.min(3, eligible.length));

        const spotlightGrid = document.querySelector('.spotlight-grid');
        spotlightGrid.innerHTML = ''; 

        picked.forEach((m) => {
            const levelNum = Number(m.membershipLevel || m.membership || m.level);
            const levelText = levelNum === 3 ? 'Gold' : 'Silver';
            const logoPath = m.image || m.logo || m.imageURL;

            const article = document.createElement('article');
            article.classList.add('spotlight-card');

            article.innerHTML = `
          <header>
            <h3>${m.name || m.company || ''}</h3>
            <p class="tagline">Membership: ${levelText}</p>
          </header>
          <div class="spotlight-content">
            <div class="spotlight-image">
              <img src="images/${logoPath}" alt="${m.name || m.company} logo">
            </div>
            <div class="spotlight-details">
              ${m.address ? `<p><strong>Address:</strong> ${m.address}</p>` : ''}
              ${m.phone ? `<p><strong>Phone:</strong> ${m.phone}</p>` : ''}
              ${m.website
                    ? `<p class="website"><strong>URL:</strong> <a href="${m.website}" target="_blank" rel="noopener">${m.website}</a></p>`
                    : ''
                }
              <p><strong>Level:</strong> ${levelText}</p>
            </div>
          </div>
        `;

            spotlightGrid.appendChild(article);
        });
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}

function capitalize(str) {
    return str
        .split(' ')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    document.body.classList.toggle('nav-open');
    hamburger.classList.toggle('open');
}

document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = new Date(document.lastModified).toLocaleDateString();