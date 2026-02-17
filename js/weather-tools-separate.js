/* ═══════════════════════════════════════════════════════════════════
   SEPARATE WEATHER TOOLS - أدوات الطقس المنفصلة
   ثلاث أدوات مستقلة: الطقس الحالي، المقارنة، الخريطة
   ═══════════════════════════════════════════════════════════════════ */

(function() {
    'use strict';
    
    console.log('🌤️ Loading Separate Weather Tools...');
    
    /* ========================================
       CONFIGURATION
       ======================================== */
    
    const CONFIG = {
        API_URL: 'https://api.open-meteo.com/v1/forecast',
        MAP_TILES: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        TIMEZONE: 'Africa/Cairo',
        CACHE_DURATION: 10 * 60 * 1000
    };
    
    /* ========================================
       CITIES DATA - 27 محافظة
       ======================================== */
    
    const CITIES = {
        'cairo': { name: 'القاهرة', nameEn: 'Cairo', nameFr: 'Le Caire', lat: 30.0444, lon: 31.2357, icon: '🏛️', color: '#d4af37' },
        'giza': { name: 'الجيزة', nameEn: 'Giza', nameFr: 'Gizeh', lat: 30.0131, lon: 31.2089, icon: '🗿', color: '#c4a027' },
        'qalyubia': { name: 'القليوبية', nameEn: 'Qalyubia', nameFr: 'Qalyubia', lat: 30.1792, lon: 31.2125, icon: '🏘️', color: '#b49017' },
        'alexandria': { name: 'الإسكندرية', nameEn: 'Alexandria', nameFr: 'Alexandrie', lat: 31.2001, lon: 29.9187, icon: '🏖️', color: '#3498db' },
        'beheira': { name: 'البحيرة', nameEn: 'Beheira', nameFr: 'Béhéra', lat: 30.8481, lon: 30.3436, icon: '🌾', color: '#2ecc71' },
        'kafr-el-sheikh': { name: 'كفر الشيخ', nameEn: 'Kafr El Sheikh', nameFr: 'Kafr el-Cheikh', lat: 31.1107, lon: 30.9388, icon: '🌾', color: '#27ae60' },
        'dakahlia': { name: 'الدقهلية', nameEn: 'Dakahlia', nameFr: 'Dakahlia', lat: 31.0409, lon: 31.3785, icon: '🌾', color: '#1abc9c' },
        'damietta': { name: 'دمياط', nameEn: 'Damietta', nameFr: 'Damiette', lat: 31.4175, lon: 31.8144, icon: '⚓', color: '#16a085' },
        'port-said': { name: 'بورسعيد', nameEn: 'Port Said', nameFr: 'Port-Saïd', lat: 31.2653, lon: 32.3019, icon: '🚢', color: '#2980b9' },
        'sharqia': { name: 'الشرقية', nameEn: 'Sharqia', nameFr: 'Sharqiya', lat: 30.5965, lon: 31.5041, icon: '🌾', color: '#8e44ad' },
        'gharbia': { name: 'الغربية', nameEn: 'Gharbia', nameFr: 'Gharbia', lat: 30.8754, lon: 31.0335, icon: '🌾', color: '#9b59b6' },
        'monufia': { name: 'المنوفية', nameEn: 'Monufia', nameFr: 'Ménoufia', lat: 30.5972, lon: 30.9876, icon: '🌾', color: '#f39c12' },
        'ismailia': { name: 'الإسماعيلية', nameEn: 'Ismailia', nameFr: 'Ismaïlia', lat: 30.5833, lon: 32.2667, icon: '🚢', color: '#e67e22' },
        'suez': { name: 'السويس', nameEn: 'Suez', nameFr: 'Suez', lat: 29.9668, lon: 32.5498, icon: '⚓', color: '#e74c3c' },
        'faiyum': { name: 'الفيوم', nameEn: 'Faiyum', nameFr: 'Fayoum', lat: 29.3084, lon: 30.8428, icon: '🏞️', color: '#95a5a6' },
        'beni-suef': { name: 'بني سويف', nameEn: 'Beni Suef', nameFr: 'Beni Souef', lat: 29.0661, lon: 31.0994, icon: '🏞️', color: '#7f8c8d' },
        'minya': { name: 'المنيا', nameEn: 'Minya', nameFr: 'Minya', lat: 28.0871, lon: 30.7618, icon: '🏛️', color: '#34495e' },
        'asyut': { name: 'أسيوط', nameEn: 'Asyut', nameFr: 'Assiout', lat: 27.1809, lon: 31.1837, icon: '🏛️', color: '#2c3e50' },
        'sohag': { name: 'سوهاج', nameEn: 'Sohag', nameFr: 'Sohag', lat: 26.5569, lon: 31.6948, icon: '🏛️', color: '#c0392b' },
        'qena': { name: 'قنا', nameEn: 'Qena', nameFr: 'Qena', lat: 26.1551, lon: 32.7160, icon: '🏛️', color: '#e67e22' },
        'luxor': { name: 'الأقصر', nameEn: 'Luxor', nameFr: 'Louxor', lat: 25.6872, lon: 32.6396, icon: '🏛️', color: '#f39c12' },
        'aswan': { name: 'أسوان', nameEn: 'Aswan', nameFr: 'Assouan', lat: 24.0889, lon: 32.8998, icon: '⛵', color: '#f1c40f' },
        'red-sea': { name: 'البحر الأحمر', nameEn: 'Red Sea', nameFr: 'Mer Rouge', lat: 27.2579, lon: 33.8116, icon: '🏝️', color: '#e74c3c' },
        'north-sinai': { name: 'شمال سيناء', nameEn: 'North Sinai', nameFr: 'Sinaï du Nord', lat: 31.1656, lon: 33.8010, icon: '🏜️', color: '#d35400' },
        'south-sinai': { name: 'جنوب سيناء', nameEn: 'South Sinai', nameFr: 'Sinaï du Sud', lat: 28.9738, lon: 33.6158, icon: '⛰️', color: '#c0392b' },
        'matrouh': { name: 'مطروح', nameEn: 'Matrouh', nameFr: 'Matruh', lat: 31.3543, lon: 27.2373, icon: '🏖️', color: '#3498db' },
        'new-valley': { name: 'الوادي الجديد', nameEn: 'New Valley', nameFr: 'Nouvelle Vallée', lat: 25.4533, lon: 30.5433, icon: '🏜️', color: '#e67e22' }
    };

    const weatherCache = new Map();
    const comparisonCities = new Set();

    /* ========================================
       HELPER FUNCTIONS
       ======================================== */
    
    function getTranslation(key) {
        const lang = document.documentElement.lang || 'en';
        const translations = window.translations || {};
        const keys = key.split('.');
        let value = translations[lang];
        for (const k of keys) value = value?.[k];
        return value || key;
    }

    function getCityName(city) {
        const lang = document.documentElement.lang || 'en';
        return lang === 'ar' ? city.name : lang === 'fr' ? city.nameFr : city.nameEn;
    }

    function getColorForTemp(temp) {
        if (temp < 10) return '#0066cc';
        if (temp < 20) return '#00cc66';
        if (temp < 30) return '#cccc00';
        if (temp < 40) return '#ff9900';
        return '#ff0000';
    }

    /* ========================================
       API FUNCTIONS
       ======================================== */
    
    async function fetchWeather(cityKey, detailed = true) {
        const cacheKey = `${cityKey}_${detailed}`;
        const cached = weatherCache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < CONFIG.CACHE_DURATION) {
            return cached.data;
        }

        const city = CITIES[cityKey];
        if (!city) throw new Error('City not found');

        const params = new URLSearchParams({
            latitude: city.lat,
            longitude: city.lon,
            current_weather: 'true',
            timezone: CONFIG.TIMEZONE,
            temperature_unit: 'celsius',
            windspeed_unit: 'kmh'
        });

        if (detailed) {
            params.append('hourly', 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m');
            params.append('daily', 'temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code');
            params.append('forecast_days', '7');
        }

        const response = await fetch(`${CONFIG.API_URL}?${params}`);
        if (!response.ok) throw new Error('API request failed');

        const data = await response.json();
        const result = { city, data };
        
        weatherCache.set(cacheKey, { data: result, timestamp: Date.now() });
        return result;
    }

    /* ========================================
       TOOL 1: CURRENT WEATHER
       ======================================== */
    
    function initCurrentWeatherTool() {
        const container = document.getElementById('current-weather-container');
        if (!container) return;

        container.innerHTML = `
            <div class="weather-tool-card">
                <div class="city-selector">
                    <label>${getTranslation('weather.tools.selectCity')}</label>
                    <select id="current-weather-select" onchange="WeatherToolsSeparate.loadCurrentWeather(this.value)">
                        <option value="">-- ${getTranslation('weather.tools.selectCity')} --</option>
                        ${Object.keys(CITIES).map(key => {
                            const city = CITIES[key];
                            return `<option value="${key}">${city.icon} ${getCityName(city)}</option>`;
                        }).join('')}
                    </select>
                </div>
                <div id="current-weather-display"></div>
            </div>
        `;
    }

    async function loadCurrentWeather(cityKey) {
        if (!cityKey) return;

        const display = document.getElementById('current-weather-display');
        if (!display) return;

        display.innerHTML = '<div class="loading">⏳ Loading...</div>';

        try {
            const { city, data } = await fetchWeather(cityKey, true);
            const current = data.current_weather;

            display.innerHTML = `
                <div class="weather-display">
                    <div class="weather-header">
                        <h2>${city.icon} ${getCityName(city)}</h2>
                    </div>
                    <div class="weather-current">
                        <div class="temp-main">${Math.round(current.temperature)}°C</div>
                        <div class="weather-details">
                            <div class="detail-item">
                                <span class="detail-label">${getTranslation('weather.tools.windSpeed')}:</span>
                                <span class="detail-value">${current.windspeed} km/h</span>
                            </div>
                            ${data.hourly ? `
                                <div class="detail-item">
                                    <span class="detail-label">${getTranslation('weather.humidity')}:</span>
                                    <span class="detail-value">${data.hourly.relative_humidity_2m[0]}%</span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">${getTranslation('weather.feelsLike')}:</span>
                                    <span class="detail-value">${Math.round(data.hourly.apparent_temperature[0])}°C</span>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    ${data.daily ? `
                        <div class="weather-forecast">
                            <h3>${getTranslation('weather.forecast')}</h3>
                            <div class="forecast-grid">
                                ${data.daily.time.slice(0, 7).map((date, i) => `
                                    <div class="forecast-day">
                                        <div class="forecast-date">${new Date(date).toLocaleDateString(document.documentElement.lang)}</div>
                                        <div class="forecast-temp">
                                            ${Math.round(data.daily.temperature_2m_max[i])}° / ${Math.round(data.daily.temperature_2m_min[i])}°
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            `;
        } catch (error) {
            display.innerHTML = `<div class="error">❌ ${error.message}</div>`;
        }
    }

    /* ========================================
       TOOL 2: COMPARISON
       ======================================== */
    
    function initComparisonTool() {
        const container = document.getElementById('weather-comparison-container');
        if (!container) return;

        container.innerHTML = `
            <div class="weather-tool-card">
                <div class="comparison-selector">
                    <label>${getTranslation('weather.tools.selectCities')}</label>
                    <div class="city-chips-container" id="comparison-cities"></div>
                    <select id="comparison-city-select">
                        <option value="">-- ${getTranslation('weather.tools.addCity')} --</option>
                        ${Object.keys(CITIES).map(key => {
                            const city = CITIES[key];
                            return `<option value="${key}">${city.icon} ${getCityName(city)}</option>`;
                        }).join('')}
                    </select>
                    <button id="compare-btn" class="compare-btn" onclick="WeatherToolsSeparate.compareWeather()" disabled>
                        ${getTranslation('weather.tools.compare')}
                    </button>
                </div>
                <div id="comparison-results"></div>
            </div>
        `;

        document.getElementById('comparison-city-select').addEventListener('change', function() {
            if (this.value) {
                addComparisonCity(this.value);
                this.value = '';
            }
        });
    }

    function addComparisonCity(cityKey) {
        if (comparisonCities.size >= 4) {
            alert('Maximum 4 cities');
            return;
        }
        comparisonCities.add(cityKey);
        updateComparisonChips();
    }

    function removeComparisonCity(cityKey) {
        comparisonCities.delete(cityKey);
        updateComparisonChips();
    }

    function updateComparisonChips() {
        const container = document.getElementById('comparison-cities');
        if (!container) return;

        container.innerHTML = Array.from(comparisonCities).map(key => {
            const city = CITIES[key];
            return `
                <div class="city-chip">
                    <span class="chip-icon">${city.icon}</span>
                    <span class="chip-name">${getCityName(city)}</span>
                    <button class="chip-remove" onclick="WeatherToolsSeparate.removeComparisonCity('${key}')">×</button>
                </div>
            `;
        }).join('');

        const btn = document.getElementById('compare-btn');
        if (btn) btn.disabled = comparisonCities.size < 2;
    }

    async function compareWeather() {
        if (comparisonCities.size < 2) return;

        const results = document.getElementById('comparison-results');
        if (!results) return;

        results.innerHTML = '<div class="loading">⏳ Loading comparison...</div>';

        try {
            const weatherData = await Promise.all(
                Array.from(comparisonCities).map(key => fetchWeather(key, true))
            );

            results.innerHTML = `
                <div class="comparison-table-container">
                    <table class="comparison-table">
                        <thead>
                            <tr>
                                <th>City</th>
                                <th>${getTranslation('weather.tools.temperature')}</th>
                                <th>${getTranslation('weather.feelsLike')}</th>
                                <th>${getTranslation('weather.humidity')}</th>
                                <th>${getTranslation('weather.tools.windSpeed')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${weatherData.map(({ city, data }) => {
                                const current = data.current_weather;
                                return `
                                    <tr>
                                        <td>
                                            <span class="city-icon">${city.icon}</span>
                                            <strong>${getCityName(city)}</strong>
                                        </td>
                                        <td><span class="temp-value">${Math.round(current.temperature)}°C</span></td>
                                        <td>${data.hourly ? Math.round(data.hourly.apparent_temperature[0]) : '-'}°C</td>
                                        <td>${data.hourly ? data.hourly.relative_humidity_2m[0] : '-'}%</td>
                                        <td>${current.windspeed} km/h</td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        } catch (error) {
            results.innerHTML = `<div class="error">❌ ${error.message}</div>`;
        }
    }

    /* ========================================
       TOOL 3: WEATHER MAP
       ======================================== */
    
    function initWeatherMapTool() {
        const container = document.getElementById('weather-map-container');
        if (!container) return;

        container.innerHTML = `
            <div class="weather-tool-card">
                <div id="weather-map" style="width: 100%; height: 600px; border-radius: 12px; overflow: hidden;"></div>
                <div class="map-legend">
                    <h4>${getTranslation('weather.tools.temperature')} (°C)</h4>
                    <div class="legend-colors">
                        <div class="legend-item"><span style="background: #0066cc;"></span> < 10°</div>
                        <div class="legend-item"><span style="background: #00cc66;"></span> 10-20°</div>
                        <div class="legend-item"><span style="background: #cccc00;"></span> 20-30°</div>
                        <div class="legend-item"><span style="background: #ff9900;"></span> 30-40°</div>
                        <div class="legend-item"><span style="background: #ff0000;"></span> > 40°</div>
                    </div>
                </div>
            </div>
        `;

        // Initialize map when Leaflet is ready
        if (window.L) {
            initMap();
        } else {
            // Load Leaflet
            const css = document.createElement('link');
            css.rel = 'stylesheet';
            css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            document.head.appendChild(css);

            const js = document.createElement('script');
            js.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            js.onload = initMap;
            document.head.appendChild(js);
        }
    }

    async function initMap() {
        if (window.weatherMapInstance) return;

        const map = L.map('weather-map').setView([26.8206, 30.8025], 6);
        window.weatherMapInstance = map;

        L.tileLayer(CONFIG.MAP_TILES, {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(map);

        for (const [key, city] of Object.entries(CITIES)) {
            try {
                const { data } = await fetchWeather(key, false);
                const temp = data.current_weather.temperature;
                
                const icon = L.divIcon({
                    className: 'weather-marker',
                    html: `
                        <div class="marker-content" style="background-color: ${getColorForTemp(temp)};">
                            <div class="marker-icon">${city.icon}</div>
                            <div class="marker-temp">${Math.round(temp)}°</div>
                        </div>
                    `,
                    iconSize: [60, 60]
                });

                const marker = L.marker([city.lat, city.lon], { icon }).addTo(map);
                
                marker.bindPopup(`
                    <div class="weather-popup">
                        <h3>${city.icon} ${getCityName(city)}</h3>
                        <p><strong>${getTranslation('weather.tools.temperature')}:</strong> ${temp}°C</p>
                        <p><strong>${getTranslation('weather.tools.windSpeed')}:</strong> ${data.current_weather.windspeed} km/h</p>
                    </div>
                `);
            } catch (error) {
                console.error(`Failed to load weather for ${key}:`, error);
            }
        }
    }

    /* ========================================
       INITIALIZATION
       ======================================== */
    
    function init() {
        console.log('🌤️ Initializing Separate Weather Tools...');
        
        initCurrentWeatherTool();
        initComparisonTool();
        initWeatherMapTool();
    }

    /* ========================================
       PUBLIC API
       ======================================== */
    
    window.WeatherToolsSeparate = {
        init,
        loadCurrentWeather,
        compareWeather,
        addComparisonCity,
        removeComparisonCity
    };

    // Auto-initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
