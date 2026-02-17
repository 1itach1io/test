/* ═══════════════════════════════════════════════════════════════════
   WEATHER API - Open-Meteo Integration (FREE!)
   نظام الطقس المتكامل لمصر - مجاني بالكامل بدون API Key
   ═══════════════════════════════════════════════════════════════════ */

(function() {
    'use strict';
    
    console.log('🌤️ Loading Open-Meteo Weather API...');
    
    /* ========================================
       CONFIGURATION
       ======================================== */
    
    const CONFIG = {
        // Open-Meteo API (FREE - No API Key needed!)
        API_URL: 'https://api.open-meteo.com/v1/forecast',
        
        // Settings
        TIMEZONE: 'Africa/Cairo',
        CACHE_DURATION: 10 * 60 * 1000, // 10 minutes
        
        // Debug
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
            region: 'greater-cairo'
        },
        'giza': { 
            name: 'الجيزة', 
            nameEn: 'Giza',
            nameFr: 'Gizeh', 
            lat: 30.0131, 
            lon: 31.2089, 
            icon: '🗿',
            elevation: 20,
            region: 'greater-cairo'
        },
        'qalyubia': { 
            name: 'القليوبية', 
            nameEn: 'Qalyubia',
            nameFr: 'Qalyubia', 
            lat: 30.1792, 
            lon: 31.2125, 
            icon: '🏘️',
            elevation: 15,
            region: 'greater-cairo'
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
            region: 'delta'
        },
        'beheira': { 
            name: 'البحيرة', 
            nameEn: 'Beheira',
            nameFr: 'Béhéra', 
            lat: 30.8481, 
            lon: 30.3436, 
            icon: '🌾',
            elevation: 10,
            region: 'delta'
        },
        'kafr-el-sheikh': { 
            name: 'كفر الشيخ', 
            nameEn: 'Kafr El Sheikh',
            nameFr: 'Kafr el-Cheikh', 
            lat: 31.1107, 
            lon: 30.9388, 
            icon: '🌾',
            elevation: 8,
            region: 'delta'
        },
        'dakahlia': { 
            name: 'الدقهلية', 
            nameEn: 'Dakahlia',
            nameFr: 'Dakahlia', 
            lat: 31.0409, 
            lon: 31.3785, 
            icon: '🌾',
            elevation: 5,
            region: 'delta'
        },
        'damietta': { 
            name: 'دمياط', 
            nameEn: 'Damietta',
            nameFr: 'Damiette', 
            lat: 31.4175, 
            lon: 31.8144, 
            icon: '⚓',
            elevation: 3,
            region: 'delta'
        },
        'port-said': { 
            name: 'بورسعيد', 
            nameEn: 'Port Said',
            nameFr: 'Port-Saïd', 
            lat: 31.2653, 
            lon: 32.3019, 
            icon: '🚢',
            elevation: 1,
            region: 'delta'
        },
        'sharqia': { 
            name: 'الشرقية', 
            nameEn: 'Sharqia',
            nameFr: 'Sharqiya', 
            lat: 30.5965, 
            lon: 31.5041, 
            icon: '🌾',
            elevation: 12,
            region: 'delta'
        },
        'gharbia': { 
            name: 'الغربية', 
            nameEn: 'Gharbia',
            nameFr: 'Gharbia', 
            lat: 30.8754, 
            lon: 31.0335, 
            icon: '🌾',
            elevation: 15,
            region: 'delta'
        },
        'monufia': { 
            name: 'المنوفية', 
            nameEn: 'Monufia',
            nameFr: 'Ménoufia', 
            lat: 30.5972, 
            lon: 30.9876, 
            icon: '🌾',
            elevation: 18,
            region: 'delta'
        },
        'ismailia': { 
            name: 'الإسماعيلية', 
            nameEn: 'Ismailia',
            nameFr: 'Ismaïlia', 
            lat: 30.5833, 
            lon: 32.2667, 
            icon: '🌊',
            elevation: 5,
            region: 'canal'
        },
        
        // قناة السويس (Suez Canal)
        'suez': { 
            name: 'السويس', 
            nameEn: 'Suez',
            nameFr: 'Suez', 
            lat: 29.9668, 
            lon: 32.5498, 
            icon: '🚢',
            elevation: 5,
            region: 'canal'
        },
        
        // الصعيد (Upper Egypt)
        'faiyum': { 
            name: 'الفيوم', 
            nameEn: 'Faiyum',
            nameFr: 'Fayoum', 
            lat: 29.3084, 
            lon: 30.8428, 
            icon: '🏞️',
            elevation: -43,
            region: 'upper-egypt'
        },
        'beni-suef': { 
            name: 'بني سويف', 
            nameEn: 'Beni Suef',
            nameFr: 'Beni Souef', 
            lat: 29.0661, 
            lon: 31.0994, 
            icon: '🌾',
            elevation: 31,
            region: 'upper-egypt'
        },
        'minya': { 
            name: 'المنيا', 
            nameEn: 'Minya',
            nameFr: 'Minya', 
            lat: 28.0871, 
            lon: 30.7618, 
            icon: '🏛️',
            elevation: 45,
            region: 'upper-egypt'
        },
        'asyut': { 
            name: 'أسيوط', 
            nameEn: 'Asyut',
            nameFr: 'Assiout', 
            lat: 27.1809, 
            lon: 31.1837, 
            icon: '🏛️',
            elevation: 52,
            region: 'upper-egypt'
        },
        'sohag': { 
            name: 'سوهاج', 
            nameEn: 'Sohag',
            nameFr: 'Sohag', 
            lat: 26.5569, 
            lon: 31.6948, 
            icon: '🏛️',
            elevation: 60,
            region: 'upper-egypt'
        },
        'qena': { 
            name: 'قنا', 
            nameEn: 'Qena',
            nameFr: 'Qéna', 
            lat: 26.1551, 
            lon: 32.7160, 
            icon: '🏺',
            elevation: 75,
            region: 'upper-egypt'
        },
        'luxor': { 
            name: 'الأقصر', 
            nameEn: 'Luxor',
            nameFr: 'Louxor', 
            lat: 25.6872, 
            lon: 32.6396, 
            icon: '🏺',
            elevation: 85,
            region: 'upper-egypt'
        },
        'aswan': { 
            name: 'أسوان', 
            nameEn: 'Aswan',
            nameFr: 'Assouan', 
            lat: 24.0889, 
            lon: 32.8998, 
            icon: '⛵',
            elevation: 194,
            region: 'upper-egypt'
        },
        
        // البحر الأحمر (Red Sea)
        'red-sea': { 
            name: 'البحر الأحمر', 
            nameEn: 'Red Sea',
            nameFr: 'Mer Rouge', 
            lat: 27.2579, 
            lon: 33.8116, 
            icon: '🏊',
            elevation: 11,
            region: 'red-sea'
        },
        
        // الصحراء الغربية (Western Desert)
        'new-valley': { 
            name: 'الوادي الجديد', 
            nameEn: 'New Valley',
            nameFr: 'Nouvelle Vallée', 
            lat: 25.4533, 
            lon: 29.0733, 
            icon: '🏜️',
            elevation: 140,
            region: 'western-desert'
        },
        'matrouh': { 
            name: 'مطروح', 
            nameEn: 'Matrouh',
            nameFr: 'Matruh', 
            lat: 31.3543, 
            lon: 27.2373, 
            icon: '🌊',
            elevation: 20,
            region: 'western-desert'
        },
        
        // سيناء (Sinai)
        'north-sinai': { 
            name: 'شمال سيناء', 
            nameEn: 'North Sinai',
            nameFr: 'Sinaï du Nord', 
            lat: 31.0456, 
            lon: 33.7963, 
            icon: '🏜️',
            elevation: 50,
            region: 'sinai'
        },
        'south-sinai': { 
            name: 'جنوب سيناء', 
            nameEn: 'South Sinai',
            nameFr: 'Sinaï du Sud', 
            lat: 28.9753, 
            lon: 33.6156, 
            icon: '🤿',
            elevation: 28,
            region: 'sinai'
        }
    };
    
    /* ========================================
       WEATHER CODES - Open-Meteo
       ======================================== */
    
    const WEATHER_CODES = {
        0: { desc: 'سماء صافية', descEn: 'Clear sky', icon: '☀️', emoji: '☀️' },
        1: { desc: 'صافي في الغالب', descEn: 'Mainly clear', icon: '🌤️', emoji: '🌤️' },
        2: { desc: 'غائم جزئياً', descEn: 'Partly cloudy', icon: '⛅', emoji: '⛅' },
        3: { desc: 'غائم', descEn: 'Overcast', icon: '☁️', emoji: '☁️' },
        45: { desc: 'ضباب', descEn: 'Fog', icon: '🌫️', emoji: '🌫️' },
        48: { desc: 'ضباب متجمد', descEn: 'Depositing rime fog', icon: '🌫️', emoji: '🌫️' },
        51: { desc: 'رذاذ خفيف', descEn: 'Light drizzle', icon: '🌦️', emoji: '🌦️' },
        53: { desc: 'رذاذ متوسط', descEn: 'Moderate drizzle', icon: '🌦️', emoji: '🌦️' },
        55: { desc: 'رذاذ كثيف', descEn: 'Dense drizzle', icon: '🌧️', emoji: '🌧️' },
        61: { desc: 'مطر خفيف', descEn: 'Slight rain', icon: '🌧️', emoji: '🌧️' },
        63: { desc: 'مطر متوسط', descEn: 'Moderate rain', icon: '🌧️', emoji: '🌧️' },
        65: { desc: 'مطر غزير', descEn: 'Heavy rain', icon: '⛈️', emoji: '⛈️' },
        71: { desc: 'ثلج خفيف', descEn: 'Slight snow', icon: '🌨️', emoji: '🌨️' },
        73: { desc: 'ثلج متوسط', descEn: 'Moderate snow', icon: '🌨️', emoji: '🌨️' },
        75: { desc: 'ثلج كثيف', descEn: 'Heavy snow', icon: '❄️', emoji: '❄️' },
        77: { desc: 'حبات ثلجية', descEn: 'Snow grains', icon: '❄️', emoji: '❄️' },
        80: { desc: 'زخات مطر خفيفة', descEn: 'Slight rain showers', icon: '🌦️', emoji: '🌦️' },
        81: { desc: 'زخات مطر متوسطة', descEn: 'Moderate rain showers', icon: '🌧️', emoji: '🌧️' },
        82: { desc: 'زخات مطر عنيفة', descEn: 'Violent rain showers', icon: '⛈️', emoji: '⛈️' },
        85: { desc: 'زخات ثلج خفيفة', descEn: 'Slight snow showers', icon: '🌨️', emoji: '🌨️' },
        86: { desc: 'زخات ثلج غزيرة', descEn: 'Heavy snow showers', icon: '❄️', emoji: '❄️' },
        95: { desc: 'عاصفة رعدية', descEn: 'Thunderstorm', icon: '⛈️', emoji: '⛈️' },
        96: { desc: 'عاصفة رعدية مع برَد خفيف', descEn: 'Thunderstorm with slight hail', icon: '⛈️', emoji: '⛈️' },
        99: { desc: 'عاصفة رعدية مع برَد غزير', descEn: 'Thunderstorm with heavy hail', icon: '⛈️', emoji: '⛈️' }
    };
    
    /* ========================================
       STATE
       ======================================== */
    
    const state = {
        cache: {},
        currentCity: 'cairo',
        initialized: false
    };
    
    /* ========================================
       DOM ELEMENTS
       ======================================== */
    
    let elements = {};
    
    function initElements() {
        elements = {
            citySelect: document.getElementById('weather-city-select'),
            currentTemp: document.getElementById('current-temp'),
            weatherDesc: document.getElementById('weather-desc'),
            weatherIcon: document.getElementById('weather-icon'),
            feelsLike: document.getElementById('feels-like'),
            humidity: document.getElementById('humidity'),
            windSpeed: document.getElementById('wind-speed'),
            pressure: document.getElementById('pressure'),
            sunrise: document.getElementById('sunrise'),
            sunset: document.getElementById('sunset'),
            forecastContainer: document.getElementById('forecast-container'),
            lastUpdate: document.getElementById('last-update'),
            weatherCard: document.querySelector('.weather-card')
        };
        
        const mainElementsFound = elements.citySelect && 
                                 elements.currentTemp && 
                                 elements.weatherDesc;
        
        if (CONFIG.DEBUG) {
            console.log('📋 Weather Elements:', {
                found: mainElementsFound,
                total: Object.keys(elements).length
            });
        }
        
        return mainElementsFound;
    }
    
    /* ========================================
       API CALLS - Open-Meteo
       ======================================== */
    
    async function fetchWeather(city) {
        try {
            const cityData = CITIES[city];
            if (!cityData) {
                throw new Error('City not found');
            }
            
            // Check cache
            const cacheKey = `${city}_weather`;
            const cached = state.cache[cacheKey];
            if (cached && Date.now() - cached.timestamp < CONFIG.CACHE_DURATION) {
                if (CONFIG.DEBUG) {
                    console.log('📦 Using cached weather data for:', cityData.nameEn);
                }
                return cached.data;
            }
            
            // Build API URL
            const params = new URLSearchParams({
                latitude: cityData.lat,
                longitude: cityData.lon,
                current: [
                    'temperature_2m',
                    'relative_humidity_2m',
                    'apparent_temperature',
                    'weather_code',
                    'surface_pressure',
                    'wind_speed_10m'
                ].join(','),
                daily: [
                    'weather_code',
                    'temperature_2m_max',
                    'temperature_2m_min',
                    'sunrise',
                    'sunset'
                ].join(','),
                timezone: CONFIG.TIMEZONE,
                forecast_days: 7
            });
            
            const url = `${CONFIG.API_URL}?${params.toString()}`;
            
            if (CONFIG.DEBUG) {
                console.log('🌐 Fetching weather from:', url);
            }
            
            // Fetch data
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            const data = await response.json();
            
            if (CONFIG.DEBUG) {
                console.log('📥 Weather data received:', data);
            }
            
            // Cache the data
            state.cache[cacheKey] = {
                data: data,
                timestamp: Date.now()
            };
            
            return data;
            
        } catch (error) {
            console.error('❌ Weather API Error:', error);
            throw error;
        }
    }
    
    /* ========================================
       UI UPDATES
       ======================================== */
    
    function updateCurrentWeather(data) {
        if (!data || !data.current) return;
        
        const cityData = CITIES[state.currentCity];
        const currentLang = document.documentElement.lang || 'ar';
        const current = data.current;
        const daily = data.daily;
        
        // Get weather info
        const weatherCode = current.weather_code;
        const weatherInfo = WEATHER_CODES[weatherCode] || WEATHER_CODES[0];
        
        // Temperature
        if (elements.currentTemp) {
            elements.currentTemp.textContent = Math.round(current.temperature_2m);
        }
        
        // Description
        if (elements.weatherDesc) {
            elements.weatherDesc.textContent = currentLang === 'ar' ? weatherInfo.desc : weatherInfo.descEn;
        }
        
        // Weather Icon
        if (elements.weatherIcon) {
            elements.weatherIcon.innerHTML = `<div style="font-size: 5rem;">${weatherInfo.emoji}</div>`;
        }
        
        // Feels Like
        if (elements.feelsLike) {
            elements.feelsLike.textContent = Math.round(current.apparent_temperature);
        }
        
        // Humidity
        if (elements.humidity) {
            elements.humidity.textContent = Math.round(current.relative_humidity_2m);
        }
        
        // Wind Speed (convert m/s to km/h)
        if (elements.windSpeed) {
            elements.windSpeed.textContent = Math.round(current.wind_speed_10m * 3.6);
        }
        
        // Pressure
        if (elements.pressure) {
            elements.pressure.textContent = Math.round(current.surface_pressure);
        }
        
        // Sunrise
        if (elements.sunrise && daily.sunrise && daily.sunrise[0]) {
            const sunrise = new Date(daily.sunrise[0]);
            elements.sunrise.textContent = sunrise.toLocaleTimeString(currentLang === 'ar' ? 'ar-EG' : 'en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: currentLang === 'en'
            });
        }
        
        // Sunset
        if (elements.sunset && daily.sunset && daily.sunset[0]) {
            const sunset = new Date(daily.sunset[0]);
            elements.sunset.textContent = sunset.toLocaleTimeString(currentLang === 'ar' ? 'ar-EG' : 'en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: currentLang === 'en'
            });
        }
        
        // Last Update
        if (elements.lastUpdate) {
            const now = new Date();
            elements.lastUpdate.textContent = now.toLocaleTimeString(currentLang === 'ar' ? 'ar-EG' : 'en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: currentLang === 'en'
            });
        }
        
        // Update background based on weather
        updateWeatherBackground(weatherCode);
    }
    
    function updateForecast(data) {
        if (!data || !data.daily || !elements.forecastContainer) return;
        
        elements.forecastContainer.innerHTML = '';
        
        const daily = data.daily;
        const currentLang = document.documentElement.lang || 'ar';
        
        // Show next 5 days (skip today)
        for (let i = 1; i <= 5 && i < daily.time.length; i++) {
            const date = new Date(daily.time[i]);
            const dayName = date.toLocaleDateString(currentLang === 'ar' ? 'ar-EG' : 'en-US', { weekday: 'short' });
            const weatherCode = daily.weather_code[i];
            const weatherInfo = WEATHER_CODES[weatherCode] || WEATHER_CODES[0];
            const maxTemp = Math.round(daily.temperature_2m_max[i]);
            const minTemp = Math.round(daily.temperature_2m_min[i]);
            
            const forecastCard = document.createElement('div');
            forecastCard.className = 'forecast-item';
            forecastCard.innerHTML = `
                <div class="forecast-day">${dayName}</div>
                <div style="font-size: 2.5rem; margin: 0.5rem 0;">${weatherInfo.emoji}</div>
                <div class="forecast-temp">
                    <span class="temp-high">${maxTemp}°</span>
                    <span class="temp-low">${minTemp}°</span>
                </div>
            `;
            
            elements.forecastContainer.appendChild(forecastCard);
        }
    }
    
    function updateWeatherBackground(weatherCode) {
        if (!elements.weatherCard) return;
        
        // Remove all weather classes
        elements.weatherCard.classList.remove(
            'weather-clear', 
            'weather-clouds', 
            'weather-rain', 
            'weather-snow', 
            'weather-thunderstorm'
        );
        
        // Add appropriate class based on weather code
        if (weatherCode === 0 || weatherCode === 1) {
            elements.weatherCard.classList.add('weather-clear');
        } else if (weatherCode >= 2 && weatherCode <= 3) {
            elements.weatherCard.classList.add('weather-clouds');
        } else if (weatherCode >= 51 && weatherCode <= 82) {
            elements.weatherCard.classList.add('weather-rain');
        } else if (weatherCode >= 71 && weatherCode <= 86) {
            elements.weatherCard.classList.add('weather-snow');
        } else if (weatherCode >= 95) {
            elements.weatherCard.classList.add('weather-thunderstorm');
        }
    }
    
    function showLoading() {
        if (elements.currentTemp) {
            elements.currentTemp.innerHTML = '<div class="loading-spinner-small"></div>';
        }
        if (elements.weatherDesc) {
            elements.weatherDesc.textContent = 'جاري التحميل...';
            elements.weatherDesc.style.color = '';
        }
    }
    
    function showError(message) {
        if (elements.weatherDesc) {
            elements.weatherDesc.textContent = message || 'حدث خطأ في تحميل بيانات الطقس';
            elements.weatherDesc.style.color = 'var(--error-color, #ef4444)';
        }
        if (elements.currentTemp) {
            elements.currentTemp.textContent = '--';
        }
    }
    
    /* ========================================
       CITY SELECTION
       ======================================== */
    
    async function loadWeatherForCity(cityKey) {
        showLoading();
        
        try {
            state.currentCity = cityKey;
            
            // Fetch weather data
            const weatherData = await fetchWeather(cityKey);
            
            // Update UI
            updateCurrentWeather(weatherData);
            updateForecast(weatherData);
            
            if (CONFIG.DEBUG) {
                console.log('✅ Weather loaded for:', CITIES[cityKey].nameEn);
            }
            
        } catch (error) {
            console.error('❌ Error loading weather:', error);
            showError('❌ فشل تحميل بيانات الطقس');
        }
    }
    
    /* ========================================
       EVENT LISTENERS
       ======================================== */
    
    function setupEventListeners() {
        if (elements.citySelect) {
            elements.citySelect.addEventListener('change', (e) => {
                const cityKey = e.target.value;
                loadWeatherForCity(cityKey);
            });
        }
    }
    
    /* ========================================
       POPULATE CITY SELECT WITH REGIONS
       ======================================== */
    
    function populateCitySelect() {
        if (!elements.citySelect) return;
        
        const currentLang = document.documentElement.lang || 'ar';
        
        elements.citySelect.innerHTML = '';
        
        // Define regions
        const regions = {
            'greater-cairo': currentLang === 'ar' ? 'القاهرة الكبرى' : (currentLang === 'fr' ? 'Grand Caire' : 'Greater Cairo'),
            'delta': currentLang === 'ar' ? 'الدلتا' : (currentLang === 'fr' ? 'Delta du Nil' : 'Nile Delta'),
            'canal': currentLang === 'ar' ? 'قناة السويس' : (currentLang === 'fr' ? 'Canal de Suez' : 'Suez Canal'),
            'upper-egypt': currentLang === 'ar' ? 'الصعيد' : (currentLang === 'fr' ? 'Haute-Égypte' : 'Upper Egypt'),
            'red-sea': currentLang === 'ar' ? 'البحر الأحمر' : (currentLang === 'fr' ? 'Mer Rouge' : 'Red Sea'),
            'western-desert': currentLang === 'ar' ? 'الصحراء الغربية' : (currentLang === 'fr' ? 'Désert Occidental' : 'Western Desert'),
            'sinai': currentLang === 'ar' ? 'سيناء' : (currentLang === 'fr' ? 'Sinaï' : 'Sinai')
        };
        
        // Group cities by region
        const groupedCities = {};
        Object.entries(CITIES).forEach(([key, city]) => {
            const region = city.region || 'other';
            if (!groupedCities[region]) {
                groupedCities[region] = [];
            }
            groupedCities[region].push({ key, city });
        });
        
        // Add cities grouped by region
        Object.entries(regions).forEach(([regionKey, regionName]) => {
            if (groupedCities[regionKey]) {
                // Add optgroup
                const optgroup = document.createElement('optgroup');
                optgroup.label = regionName;
                
                groupedCities[regionKey].forEach(({ key, city }) => {
                    const option = document.createElement('option');
                    option.value = key;
                    
                    // Get city name based on language
                    let cityName = city.name;
                    if (currentLang === 'en') cityName = city.nameEn;
                    if (currentLang === 'fr' && city.nameFr) cityName = city.nameFr;
                    
                    option.textContent = `${city.icon} ${cityName}`;
                    
                    if (key === state.currentCity) {
                        option.selected = true;
                    }
                    
                    optgroup.appendChild(option);
                });
                
                elements.citySelect.appendChild(optgroup);
            }
        });
    }
    
    /* ========================================
       INITIALIZATION
       ======================================== */
    
    async function init() {
        console.log('🚀 Initializing Open-Meteo Weather API...');
        
        // Wait for DOM
        if (document.readyState === 'loading') {
            await new Promise(resolve => {
                document.addEventListener('DOMContentLoaded', resolve);
            });
        }
        
        // Initialize elements
        const elementsReady = initElements();
        
        if (!elementsReady) {
            console.warn('⚠️ Weather elements not ready - will retry when section is shown');
            return false;
        }
        
        // Populate city select
        populateCitySelect();
        
        // Setup event listeners
        setupEventListeners();
        
        // Load initial weather
        await loadWeatherForCity(state.currentCity);
        
        // Auto-refresh every 10 minutes
        setInterval(() => {
            if (CONFIG.DEBUG) {
                console.log('🔄 Auto-refreshing weather data...');
            }
            loadWeatherForCity(state.currentCity);
        }, CONFIG.CACHE_DURATION);
        
        state.initialized = true;
        console.log('✅ Open-Meteo Weather API initialized successfully!');
        console.log('🎉 No API Key needed - 100% FREE!');
        
        return true;
    }
    
    /* ========================================
       AUTO-INITIALIZATION
       ======================================== */
    
    // Try to initialize immediately
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 100);
    }
    
    // Re-initialize when weather section becomes active
    const sectionObserver = new MutationObserver(() => {
        const weatherSection = document.getElementById('weather');
        if (weatherSection?.classList.contains('active') && !state.initialized) {
            console.log('🔄 Weather section activated - initializing...');
            init();
        }
    });
    
    if (document.body) {
        sectionObserver.observe(document.body, {
            attributes: true,
            subtree: true,
            attributeFilter: ['class']
        });
    }
    
    // Export for manual refresh
    window.refreshWeather = function() {
        if (state.initialized) {
            console.log('🔄 Manually refreshing weather...');
            loadWeatherForCity(state.currentCity);
        } else {
            console.warn('⚠️ Weather not initialized yet');
        }
    };
    
    // Export for Plans Integration
    window.getWeatherForCity = async function(cityKey) {
        try {
            if (!CITIES[cityKey]) {
                console.error('❌ City not found:', cityKey);
                return null;
            }
            
            const weatherData = await fetchWeather(cityKey);
            const cityData = CITIES[cityKey];
            
            if (!weatherData || !weatherData.current) {
                return null;
            }
            
            const current = weatherData.current;
            const weatherCode = current.weather_code;
            const weatherInfo = WEATHER_CODES[weatherCode] || WEATHER_CODES[0];
            
            return {
                city: cityData.name,
                cityEn: cityData.nameEn,
                temperature: Math.round(current.temperature_2m),
                feelsLike: Math.round(current.apparent_temperature),
                description: weatherInfo.desc,
                descriptionEn: weatherInfo.descEn,
                icon: weatherInfo.emoji,
                humidity: Math.round(current.relative_humidity_2m),
                windSpeed: Math.round(current.wind_speed_10m * 3.6),
                pressure: Math.round(current.surface_pressure),
                weatherCode: weatherCode
            };
        } catch (error) {
            console.error('❌ Error getting weather for city:', error);
            return null;
        }
    };
    
    // Export all cities for Plans
    window.getWeatherCities = function() {
        return Object.entries(CITIES).map(([key, city]) => ({
            key: key,
            name: city.name,
            nameEn: city.nameEn,
            nameFr: city.nameFr || city.nameEn,
            icon: city.icon,
            region: city.region
        }));
    };
    
    // Add weather info to a plan
    window.addWeatherToPlan = async function(cityKey) {
        const weatherData = await window.getWeatherForCity(cityKey);
        
        if (!weatherData) {
            console.error('❌ Could not get weather data');
            return null;
        }
        
        // Format for display in plans
        return {
            cityName: weatherData.city,
            temperature: `${weatherData.temperature}°C`,
            condition: weatherData.description,
            icon: weatherData.icon,
            advice: getWeatherAdvice(weatherData),
            timestamp: Date.now()
        };
    };
    
    // Get weather-based travel advice
    function getWeatherAdvice(weatherData) {
        const temp = weatherData.temperature;
        const code = weatherData.weatherCode;
        
        const currentLang = document.documentElement.lang || 'ar';
        
        let advice = '';
        
        // Temperature advice
        if (temp > 40) {
            advice = currentLang === 'ar' ? 
                '🌡️ حر شديد! اشرب الكثير من الماء وتجنب الشمس المباشرة' :
                '🌡️ Very hot! Drink plenty of water and avoid direct sun';
        } else if (temp > 35) {
            advice = currentLang === 'ar' ? 
                '☀️ حار جداً، ارتدِ ملابس خفيفة واستخدم واقي الشمس' :
                '☀️ Very warm, wear light clothes and use sunscreen';
        } else if (temp > 25) {
            advice = currentLang === 'ar' ? 
                '🌤️ طقس دافئ ومناسب للسياحة' :
                '🌤️ Warm and pleasant weather for tourism';
        } else if (temp > 15) {
            advice = currentLang === 'ar' ? 
                '🧥 طقس معتدل، أحضر سترة خفيفة' :
                '🧥 Mild weather, bring a light jacket';
        } else {
            advice = currentLang === 'ar' ? 
                '🧥 طقس بارد، ارتدِ ملابس دافئة' :
                '🧥 Cold weather, wear warm clothes';
        }
        
        // Rain advice
        if (code >= 51 && code <= 82) {
            advice += currentLang === 'ar' ? 
                ' | ☔ توقع أمطار، أحضر مظلة' :
                ' | ☔ Rain expected, bring an umbrella';
        }
        
        return advice;
    }
    
    // Export for debugging
    if (CONFIG.DEBUG) {
        window.WeatherDebug = {
            state,
            config: CONFIG,
            cities: CITIES,
            weatherCodes: WEATHER_CODES,
            loadCity: (city) => loadWeatherForCity(city),
            clearCache: () => { 
                state.cache = {}; 
                console.log('✅ Cache cleared'); 
            },
            showAllCities: () => {
                console.table(Object.entries(CITIES).map(([key, city]) => ({
                    Key: key,
                    Name: city.name,
                    NameEn: city.nameEn,
                    Lat: city.lat,
                    Lon: city.lon,
                    Region: city.region
                })));
            }
        };
        console.log('🐛 Debug mode enabled - use window.WeatherDebug');
    }
    
})();

/* ═══════════════════════════════════════════════════════════════════
   PLANS INTEGRATION FUNCTIONS
   ═══════════════════════════════════════════════════════════════════ */

async function addCurrentWeatherToPlan() {
    try {
        // Get current weather data
        const cityKey = document.getElementById('weather-city-select')?.value;
        
        if (!cityKey) {
            showMessage('⚠️ الرجاء اختيار محافظة أولاً', 'warning');
            return;
        }
        
        const weatherData = await window.getWeatherForCity(cityKey);
        
        if (!weatherData) {
            showMessage('❌ فشل تحميل بيانات الطقس', 'error');
            return;
        }
        
        // Format weather info
        const weatherInfo = {
            city: weatherData.city,
            cityEn: weatherData.cityEn,
            temperature: weatherData.temperature,
            condition: weatherData.description,
            icon: weatherData.icon,
            humidity: weatherData.humidity,
            wind: weatherData.windSpeed,
            advice: getWeatherAdviceText(weatherData),
            timestamp: new Date().toLocaleString('ar-EG')
        };
        
        // Save to localStorage for Plans section
        let savedWeatherInfo = [];
        try {
            const saved = localStorage.getItem('weather_for_plans');
            if (saved) {
                savedWeatherInfo = JSON.parse(saved);
            }
        } catch (e) {
            console.warn('Could not load saved weather info');
        }
        
        // Add new weather info
        savedWeatherInfo.unshift(weatherInfo);
        
        // Keep only last 10
        savedWeatherInfo = savedWeatherInfo.slice(0, 10);
        
        // Save back
        localStorage.setItem('weather_for_plans', JSON.stringify(savedWeatherInfo));
        
        // Show success message
        const currentLang = document.documentElement.lang || 'ar';
        const message = currentLang === 'ar' ? 
            `✅ تم إضافة طقس ${weatherData.city} إلى خططك!` :
            `✅ Weather for ${weatherData.cityEn} added to your plans!`;
        
        showMessage(message, 'success');
        
        // Navigate to plans section after 1 second
        setTimeout(() => {
            const plansLink = document.querySelector('[data-section="plans"]');
            if (plansLink) {
                plansLink.click();
            }
        }, 1500);
        
    } catch (error) {
        console.error('❌ Error adding weather to plan:', error);
        showMessage('❌ حدث خطأ أثناء إضافة معلومات الطقس', 'error');
    }
}

function getWeatherAdviceText(weatherData) {
    const temp = weatherData.temperature;
    const code = weatherData.weatherCode;
    const currentLang = document.documentElement.lang || 'ar';
    
    let advice = '';
    
    // Temperature advice
    if (temp > 40) {
        advice = currentLang === 'ar' ? 
            '🌡️ حر شديد! اشرب الكثير من الماء وتجنب الشمس المباشرة' :
            '🌡️ Very hot! Drink plenty of water and avoid direct sun';
    } else if (temp > 35) {
        advice = currentLang === 'ar' ? 
            '☀️ حار جداً، ارتدِ ملابس خفيفة واستخدم واقي الشمس' :
            '☀️ Very warm, wear light clothes and use sunscreen';
    } else if (temp > 25) {
        advice = currentLang === 'ar' ? 
            '🌤️ طقس دافئ ومناسب للسياحة' :
            '🌤️ Warm and pleasant weather for tourism';
    } else if (temp > 15) {
        advice = currentLang === 'ar' ? 
            '🧥 طقس معتدل، أحضر سترة خفيفة' :
            '🧥 Mild weather, bring a light jacket';
    } else {
        advice = currentLang === 'ar' ? 
            '🧥 طقس بارد، ارتدِ ملابس دافئة' :
            '🧥 Cold weather, wear warm clothes';
    }
    
    // Rain advice
    if (code >= 51 && code <= 82) {
        advice += currentLang === 'ar' ? 
            ' | ☔ توقع أمطار، أحضر مظلة' :
            ' | ☔ Rain expected, bring an umbrella';
    }
    
    return advice;
}

function showMessage(text, type = 'info') {
    // Create toast message
    const toast = document.createElement('div');
    toast.className = `toast-message toast-message-${type}`;
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-weight: 500;
        max-width: 400px;
    `;
    
    toast.innerHTML = `
        <span style="font-size: 1.2rem;">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
        <span>${text}</span>
    `;
    
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Add CSS animation
if (!document.getElementById('weather-toast-styles')) {
    const style = document.createElement('style');
    style.id = 'weather-toast-styles';
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        
        [dir="rtl"] .toast-message {
            right: auto;
            left: 20px;
        }
    `;
    document.head.appendChild(style);
}

/* ═══════════════════════════════════════════════════════════════════
   نهاية ملف Weather API - Open-Meteo (FREE!)
   
   📝 ملاحظة: Open-Meteo مجاني 100% بدون حاجة لـ API Key
   🌐 الموقع الرسمي: https://open-meteo.com/
   📊 الحد: غير محدود للاستخدام غير التجاري
   ⚡ السرعة: ممتازة مع Cache ذكي
   ═══════════════════════════════════════════════════════════════════ */
