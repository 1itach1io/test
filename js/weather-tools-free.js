/* ═══════════════════════════════════════════════════════════════════
   FREE WEATHER TOOLS SYSTEM - نظام أدوات الطقس المجاني
   مع خرائط Open-Meteo وأداة المقارنة - مجاني 100%
   ═══════════════════════════════════════════════════════════════════ */

(function() {
    'use strict';
    
    console.log('🌤️ Loading Free Weather Tools System...');
    
    /* ========================================
       CONFIGURATION
       ======================================== */
    
    const CONFIG = {
        // Open-Meteo API (FREE - No API Key needed!)
        API_URL: 'https://api.open-meteo.com/v1/forecast',
        MAP_TILES: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        
        // Settings
        TIMEZONE: 'Africa/Cairo',
        CACHE_DURATION: 10 * 60 * 1000, // 10 minutes
        DEBUG: window.location.search.includes('debug=true')
    };
    
    /* ========================================
       ALL 27 EGYPTIAN GOVERNORATES
       ======================================== */
    
    const CITIES = {
        // القاهرة الكبرى (Greater Cairo)
        'cairo': { 
            name: 'القاهرة', 
            nameEn: 'Cairo', 
            nameFr: 'Le Caire',
            lat: 30.0444, 
            lon: 31.2357, 
            icon: '🏛️',
            elevation: 23,
            region: 'greater-cairo',
            color: '#d4af37'
        },
        'giza': { 
            name: 'الجيزة', 
            nameEn: 'Giza',
            nameFr: 'Gizeh', 
            lat: 30.0131, 
            lon: 31.2089, 
            icon: '🗿',
            elevation: 20,
            region: 'greater-cairo',
            color: '#c4a027'
        },
        'qalyubia': { 
            name: 'القليوبية', 
            nameEn: 'Qalyubia',
            nameFr: 'Qalyubia', 
            lat: 30.1792, 
            lon: 31.2125, 
            icon: '🏘️',
            elevation: 15,
            region: 'greater-cairo',
            color: '#b49017'
        },
        
        // الدلتا (Nile Delta)
        'alexandria': { 
            name: 'الإسكندرية', 
            nameEn: 'Alexandria',
            nameFr: 'Alexandrie', 
            lat: 31.2001, 
            lon: 29.9187, 
            icon: '🏖️',
            elevation: 5,
            region: 'delta',
            color: '#3498db'
        },
        'beheira': { 
            name: 'البحيرة', 
            nameEn: 'Beheira',
            nameFr: 'Béhéra', 
            lat: 30.8481, 
            lon: 30.3436, 
            icon: '🌾',
            elevation: 10,
            region: 'delta',
            color: '#2ecc71'
        },
        'kafr-el-sheikh': { 
            name: 'كفر الشيخ', 
            nameEn: 'Kafr El Sheikh',
            nameFr: 'Kafr el-Cheikh', 
            lat: 31.1107, 
            lon: 30.9388, 
            icon: '🌾',
            elevation: 8,
            region: 'delta',
            color: '#27ae60'
        },
        'dakahlia': { 
            name: 'الدقهلية', 
            nameEn: 'Dakahlia',
            nameFr: 'Dakahlia', 
            lat: 31.0409, 
            lon: 31.3785, 
            icon: '🌾',
            elevation: 12,
            region: 'delta',
            color: '#1abc9c'
        },
        'damietta': { 
            name: 'دمياط', 
            nameEn: 'Damietta',
            nameFr: 'Damiette', 
            lat: 31.4175, 
            lon: 31.8144, 
            icon: '⚓',
            elevation: 3,
            region: 'delta',
            color: '#16a085'
        },
        'port-said': { 
            name: 'بورسعيد', 
            nameEn: 'Port Said',
            nameFr: 'Port-Saïd', 
            lat: 31.2653, 
            lon: 32.3019, 
            icon: '🚢',
            elevation: 2,
            region: 'delta',
            color: '#2980b9'
        },
        'sharqia': { 
            name: 'الشرقية', 
            nameEn: 'Sharqia',
            nameFr: 'Sharqiya', 
            lat: 30.5965, 
            lon: 31.5041, 
            icon: '🌾',
            elevation: 14,
            region: 'delta',
            color: '#8e44ad'
        },
        'gharbia': { 
            name: 'الغربية', 
            nameEn: 'Gharbia',
            nameFr: 'Gharbia', 
            lat: 30.8754, 
            lon: 31.0335, 
            icon: '🌾',
            elevation: 11,
            region: 'delta',
            color: '#9b59b6'
        },
        'monufia': { 
            name: 'المنوفية', 
            nameEn: 'Monufia',
            nameFr: 'Ménoufia', 
            lat: 30.5972, 
            lon: 30.9876, 
            icon: '🌾',
            elevation: 13,
            region: 'delta',
            color: '#f39c12'
        },
        'ismailia': { 
            name: 'الإسماعيلية', 
            nameEn: 'Ismailia',
            nameFr: 'Ismaïlia', 
            lat: 30.5833, 
            lon: 32.2667, 
            icon: '🚢',
            elevation: 7,
            region: 'delta',
            color: '#e67e22'
        },
        
        // قناة السويس (Suez Canal)
        'suez': { 
            name: 'السويس', 
            nameEn: 'Suez',
            nameFr: 'Suez', 
            lat: 29.9668, 
            lon: 32.5498, 
            icon: '⚓',
            elevation: 5,
            region: 'suez-canal',
            color: '#e74c3c'
        },
        
        // صعيد مصر (Upper Egypt)
        'faiyum': { 
            name: 'الفيوم', 
            nameEn: 'Faiyum',
            nameFr: 'Fayoum', 
            lat: 29.3084, 
            lon: 30.8428, 
            icon: '🏞️',
            elevation: -43,
            region: 'upper-egypt',
            color: '#95a5a6'
        },
        'beni-suef': { 
            name: 'بني سويف', 
            nameEn: 'Beni Suef',
            nameFr: 'Beni Souef', 
            lat: 29.0661, 
            lon: 31.0994, 
            icon: '🏞️',
            elevation: 30,
            region: 'upper-egypt',
            color: '#7f8c8d'
        },
        'minya': { 
            name: 'المنيا', 
            nameEn: 'Minya',
            nameFr: 'Minya', 
            lat: 28.0871, 
            lon: 30.7618, 
            icon: '🏛️',
            elevation: 40,
            region: 'upper-egypt',
            color: '#34495e'
        },
        'asyut': { 
            name: 'أسيوط', 
            nameEn: 'Asyut',
            nameFr: 'Assiout', 
            lat: 27.1809, 
            lon: 31.1837, 
            icon: '🏛️',
            elevation: 50,
            region: 'upper-egypt',
            color: '#2c3e50'
        },
        'sohag': { 
            name: 'سوهاج', 
            nameEn: 'Sohag',
            nameFr: 'Sohag', 
            lat: 26.5569, 
            lon: 31.6948, 
            icon: '🏛️',
            elevation: 60,
            region: 'upper-egypt',
            color: '#c0392b'
        },
        'qena': { 
            name: 'قنا', 
            nameEn: 'Qena',
            nameFr: 'Qena', 
            lat: 26.1551, 
            lon: 32.7160, 
            icon: '🏛️',
            elevation: 70,
            region: 'upper-egypt',
            color: '#e67e22'
        },
        'luxor': { 
            name: 'الأقصر', 
            nameEn: 'Luxor',
            nameFr: 'Louxor', 
            lat: 25.6872, 
            lon: 32.6396, 
            icon: '🏛️',
            elevation: 80,
            region: 'upper-egypt',
            color: '#f39c12'
        },
        'aswan': { 
            name: 'أسوان', 
            nameEn: 'Aswan',
            nameFr: 'Assouan', 
            lat: 24.0889, 
            lon: 32.8998, 
            icon: '⛵',
            elevation: 100,
            region: 'upper-egypt',
            color: '#f1c40f'
        },
        
        // البحر الأحمر (Red Sea)
        'red-sea': { 
            name: 'البحر الأحمر', 
            nameEn: 'Red Sea',
            nameFr: 'Mer Rouge', 
            lat: 27.2579, 
            lon: 33.8116, 
            icon: '🏝️',
            elevation: 0,
            region: 'red-sea',
            color: '#e74c3c'
        },
        
        // سيناء (Sinai)
        'north-sinai': { 
            name: 'شمال سيناء', 
            nameEn: 'North Sinai',
            nameFr: 'Sinaï du Nord', 
            lat: 31.1656, 
            lon: 33.8010, 
            icon: '🏜️',
            elevation: 50,
            region: 'sinai',
            color: '#d35400'
        },
        'south-sinai': { 
            name: 'جنوب سيناء', 
            nameEn: 'South Sinai',
            nameFr: 'Sinaï du Sud', 
            lat: 28.9738, 
            lon: 33.6158, 
            icon: '⛰️',
            elevation: 800,
            region: 'sinai',
            color: '#c0392b'
        },
        
        // الصحراء الغربية (Western Desert)
        'matrouh': { 
            name: 'مطروح', 
            nameEn: 'Matrouh',
            nameFr: 'Matruh', 
            lat: 31.3543, 
            lon: 27.2373, 
            icon: '🏖️',
            elevation: 20,
            region: 'western-desert',
            color: '#3498db'
        },
        'new-valley': { 
            name: 'الوادي الجديد', 
            nameEn: 'New Valley',
            nameFr: 'Nouvelle Vallée', 
            lat: 25.4533, 
            lon: 30.5433, 
            icon: '🏜️',
            elevation: 100,
            region: 'western-desert',
            color: '#e67e22'
        }
    };

    /* ========================================
       TRANSLATION SYSTEM
       ======================================== */
    
    function getTranslation(key) {
        const lang = document.documentElement.lang || 'en';
        const translations = window.translations || {};
        const keys = key.split('.');
        
        let value = translations[lang];
        for (const k of keys) {
            value = value?.[k];
        }
        
        return value || key;
    }

    /* ========================================
       WEATHER API FUNCTIONS
       ======================================== */
    
    const weatherCache = new Map();

    async function fetchWeather(cityKey, detailed = true) {
        // Check cache first
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
        
        // Cache the result
        weatherCache.set(cacheKey, { data: result, timestamp: Date.now() });
        
        return result;
    }

    /* ========================================
       UI COMPONENTS
       ======================================== */
    
    function createWeatherToolsSection() {
        return `
            <div class="weather-tools-container">
                <!-- Tools Navigation -->
                <div class="weather-tools-nav">
                    <button class="tool-nav-btn active" data-tool="current">
                        <span class="tool-icon">🌡️</span>
                        <span class="tool-label" data-translate="weather.tools.currentWeather">Current Weather</span>
                    </button>
                    <button class="tool-nav-btn" data-tool="comparison">
                        <span class="tool-icon">📊</span>
                        <span class="tool-label" data-translate="weather.tools.comparison">Comparison</span>
                    </button>
                    <button class="tool-nav-btn" data-tool="map">
                        <span class="tool-icon">🗺️</span>
                        <span class="tool-label" data-translate="weather.tools.weatherMap">Weather Map</span>
                    </button>
                </div>

                <!-- Tool Content Areas -->
                <div class="weather-tool-content">
                    <div id="current-weather-tool" class="tool-panel active">
                        ${createCurrentWeatherPanel()}
                    </div>
                    <div id="comparison-tool" class="tool-panel">
                        ${createComparisonPanel()}
                    </div>
                    <div id="map-tool" class="tool-panel">
                        ${createMapPanel()}
                    </div>
                </div>
            </div>
        `;
    }

    function createCurrentWeatherPanel() {
        const lang = document.documentElement.lang || 'en';

        return `
            <div class="current-weather-panel">
                <div class="city-selector">
                    <label data-translate="weather.tools.selectCity">Select Governorate</label>
                    <select id="weather-city-select" onchange="WeatherTools.loadWeather(this.value)">
                        <option value="">-- ${getTranslation('weather.tools.selectCity')} --</option>
                        ${Object.keys(CITIES).map(key => {
                            const city = CITIES[key];
                            const cityName = lang === 'ar' ? city.name : lang === 'fr' ? city.nameFr : city.nameEn;
                            return `<option value="${key}">${city.icon} ${cityName}</option>`;
                        }).join('')}
                    </select>
                </div>
                <div id="current-weather-display"></div>
            </div>
        `;
    }

    function createComparisonPanel() {
        return `
            <div class="comparison-panel">
                <div class="comparison-selector">
                    <label data-translate="weather.tools.selectCities">Select Governorates to Compare</label>
                    <div class="city-chips-container" id="comparison-cities"></div>
                    <select id="comparison-city-select">
                        <option value="">-- ${getTranslation('weather.tools.addCity')} --</option>
                        ${Object.keys(CITIES).map(key => {
                            const city = CITIES[key];
                            const lang = document.documentElement.lang || 'en';
                            const cityName = lang === 'ar' ? city.name : lang === 'fr' ? city.nameFr : city.nameEn;
                            return `<option value="${key}">${city.icon} ${cityName}</option>`;
                        }).join('')}
                    </select>
                    <button id="compare-btn" class="compare-btn" onclick="WeatherTools.compareWeather()" disabled>
                        <span data-translate="weather.tools.compare">Compare</span>
                    </button>
                </div>
                <div id="comparison-results"></div>
            </div>
        `;
    }

    function createMapPanel() {
        return `
            <div class="map-panel">
                <div id="weather-map" style="width: 100%; height: 600px; border-radius: 12px; overflow: hidden;"></div>
                <div class="map-legend">
                    <h4><span data-translate="weather.tools.temperature">Temperature</span> (°C)</h4>
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
    }

    /* ========================================
       WEATHER MAP WITH OPEN-METEO
       ======================================== */
    
    async function initWeatherMap() {
        if (!window.L) {
            console.error('Leaflet library not loaded');
            return;
        }

        const mapElement = document.getElementById('weather-map');
        if (!mapElement || window.weatherMapInstance) return;

        // Initialize map centered on Egypt
        const map = L.map('weather-map').setView([26.8206, 30.8025], 6);
        window.weatherMapInstance = map;

        // Add OpenStreetMap tiles
        L.tileLayer(CONFIG.MAP_TILES, {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(map);

        // Add markers for all cities with weather data
        for (const [key, city] of Object.entries(CITIES)) {
            try {
                const { data } = await fetchWeather(key, false);
                const temp = data.current_weather.temperature;
                
                // Create custom marker with temperature
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
                
                // Add popup with detailed info
                const lang = document.documentElement.lang || 'en';
                const cityName = lang === 'ar' ? city.name : lang === 'fr' ? city.nameFr : city.nameEn;
                
                marker.bindPopup(`
                    <div class="weather-popup">
                        <h3>${city.icon} ${cityName}</h3>
                        <p><strong>${getTranslation('weather.tools.temperature')}:</strong> ${temp}°C</p>
                        <p><strong>${getTranslation('weather.tools.windSpeed')}:</strong> ${data.current_weather.windspeed} km/h</p>
                    </div>
                `);
            } catch (error) {
                console.error(`Failed to load weather for ${key}:`, error);
            }
        }
    }

    function getColorForTemp(temp) {
        if (temp < 10) return '#0066cc';
        if (temp < 20) return '#00cc66';
        if (temp < 30) return '#cccc00';
        if (temp < 40) return '#ff9900';
        return '#ff0000';
    }

    /* ========================================
       COMPARISON FEATURE
       ======================================== */
    
    const comparisonCities = new Set();

    function addComparisonCity(cityKey) {
        if (comparisonCities.size >= 4) {
            alert('Maximum 4 cities can be compared at once');
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

        const lang = document.documentElement.lang || 'en';
        
        container.innerHTML = Array.from(comparisonCities).map(key => {
            const city = CITIES[key];
            const cityName = lang === 'ar' ? city.name : lang === 'fr' ? city.nameFr : city.nameEn;
            return `
                <div class="city-chip" data-city="${key}">
                    <span class="chip-icon">${city.icon}</span>
                    <span class="chip-name">${cityName}</span>
                    <button class="chip-remove" onclick="WeatherTools.removeComparisonCity('${key}')">×</button>
                </div>
            `;
        }).join('');

        // Enable/disable compare button
        const compareBtn = document.getElementById('compare-btn');
        if (compareBtn) {
            compareBtn.disabled = comparisonCities.size < 2;
        }
    }

    async function compareWeather() {
        if (comparisonCities.size < 2) {
            alert('Please select at least 2 cities to compare');
            return;
        }

        const resultsContainer = document.getElementById('comparison-results');
        if (!resultsContainer) return;

        resultsContainer.innerHTML = '<div class="loading">Loading comparison...</div>';

        try {
            const weatherData = await Promise.all(
                Array.from(comparisonCities).map(key => fetchWeather(key, true))
            );

            resultsContainer.innerHTML = createComparisonTable(weatherData);
        } catch (error) {
            resultsContainer.innerHTML = `<div class="error">Error loading comparison: ${error.message}</div>`;
        }
    }

    function createComparisonTable(weatherData) {
        const lang = document.documentElement.lang || 'en';

        return `
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
                            const cityName = lang === 'ar' ? city.name : lang === 'fr' ? city.nameFr : city.nameEn;
                            const current = data.current_weather;
                            return `
                                <tr>
                                    <td>
                                        <span class="city-icon">${city.icon}</span>
                                        <strong>${cityName}</strong>
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
    }

    /* ========================================
       LOAD WEATHER FOR SELECTED CITY
       ======================================== */
    
    async function loadWeather(cityKey) {
        if (!cityKey) return;

        const displayEl = document.getElementById('current-weather-display');
        if (!displayEl) return;

        displayEl.innerHTML = '<div class="loading">Loading...</div>';

        try {
            const { city, data } = await fetchWeather(cityKey, true);
            displayEl.innerHTML = createWeatherDisplay(city, data);
        } catch (error) {
            displayEl.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        }
    }

    function createWeatherDisplay(city, data) {
        const lang = document.documentElement.lang || 'en';
        const cityName = lang === 'ar' ? city.name : lang === 'fr' ? city.nameFr : city.nameEn;
        const current = data.current_weather;

        return `
            <div class="weather-display">
                <div class="weather-header">
                    <h2>${city.icon} ${cityName}</h2>
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
                                    <div class="forecast-date">${new Date(date).toLocaleDateString(lang)}</div>
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
    }

    /* ========================================
       INITIALIZATION
       ======================================== */
    
    function init() {
        console.log('🌤️ Initializing Free Weather Tools System...');

        // Add weather tools section to page
        const weatherSection = document.getElementById('weather-tools-root');
        if (weatherSection) {
            weatherSection.innerHTML = createWeatherToolsSection();

            // Setup event listeners
            setupEventListeners();
        }

        // Load Leaflet library for maps
        if (!window.L) {
            const leafletCSS = document.createElement('link');
            leafletCSS.rel = 'stylesheet';
            leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            document.head.appendChild(leafletCSS);

            const leafletJS = document.createElement('script');
            leafletJS.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            leafletJS.onload = () => console.log('✅ Leaflet loaded');
            document.head.appendChild(leafletJS);
        }
    }

    function setupEventListeners() {
        // Tool navigation
        document.querySelectorAll('.tool-nav-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const tool = this.dataset.tool;
                
                // Update active states
                document.querySelectorAll('.tool-nav-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tool-panel').forEach(p => p.classList.remove('active'));
                
                this.classList.add('active');
                document.getElementById(`${tool}-${tool === 'current' ? 'weather-' : ''}tool`).classList.add('active');

                // Initialize map if needed
                if (tool === 'map' && !window.weatherMapInitialized) {
                    setTimeout(initWeatherMap, 100);
                    window.weatherMapInitialized = true;
                }
            });
        });

        // Comparison city selector
        const comparisonSelect = document.getElementById('comparison-city-select');
        if (comparisonSelect) {
            comparisonSelect.addEventListener('change', function() {
                if (this.value) {
                    addComparisonCity(this.value);
                    this.value = '';
                }
            });
        }
    }

    /* ========================================
       EXPOSE PUBLIC API
       ======================================== */
    
    window.WeatherTools = {
        init,
        loadWeather,
        compareWeather,
        addComparisonCity,
        removeComparisonCity
    };

    // Auto-initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
