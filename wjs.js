const apiKey = '215ed3b0919443e4a6f103118232508'; 

const searchButton = document.getElementById('searchButton');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');
const body = document.body;

searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        weatherInfo.innerHTML = '';
        fetchWeather(city);
    }
});

async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
        const data = await response.json();

        if (data.error) {
            weatherInfo.innerHTML = `<p class="error">${data.error.message}</p>`;
        } else {
            const temperature = data.current.temp_c;
            const condition = data.current.condition.text;
            const iconCode = data.current.condition.code;

            weatherInfo.innerHTML = `
                <div class="icon">
                    <i class="wi wi-day-${iconCode}"></i>
                </div>
                <div class="temperature">${temperature}°C</div>
                <div class="condition">${condition}</div>
            `;

            
            setWeatherBackground(iconCode);
        }
    } catch (error) {
        weatherInfo.innerHTML = '<p class="error">An error occurred. Please try again later.</p>';
    }
}

function setWeatherBackground(iconCode) {
    const backgroundMap = {
        1000: 'clear',
        1003: 'partly-cloudy',
        1006: 'cloudy',
        1009: 'cloudy',
        1030: 'mist',
        1063: 'rain',
        1066: 'snow',
        1069: 'rain',
        1072: 'rain',
        1087: 'thunderstorm',
        1114: 'snow',
        1117: 'snow',
        1135: 'mist',
        1147: 'mist',
        1150: 'rain',
        1153: 'rain',
        1168: 'rain',
        1171: 'rain',
        1180: 'rain',
        1183: 'rain',
        1186: 'rain',
        1189: 'rain',
        1192: 'rain',
        1195: 'rain',
        1198: 'rain',
        1201: 'rain',
        1204: 'rain',
        1207: 'snow',
        1210: 'snow',
        1213: 'snow',
        1216: 'snow',
        1219: 'snow',
        1222: 'snow',
        1225: 'snow',
        1237: 'hail',
        1240: 'rain',
        1243: 'rain',
        1246: 'rain',
        1249: 'rain',
        1252: 'rain',
        1255: 'rain',
        1258: 'rain',
        1261: 'rain',
        1264: 'rain',
        1273: 'rain',
        1276: 'rain',
        1279: 'rain',
        1282: 'rain'
    };

    const keyword = backgroundMap[iconCode] || 'default';
    fetch(`https://source.unsplash.com/1920x1080/?${keyword}`)
        .then(response => {
            body.style.backgroundImage = `url('${response.url}')`;
        })
        .catch(error => {
            console.error('Failed to set background image:', error);
        });
}
