/* ═══════════════════════════════════════════════════════════════════
   ENHANCED WEATHER SYSTEM WITH OPEN-METEO MAPS & COMPARISON
   نظام الطقس المحسن مع خرائط Open-Meteo وأداة المقارنة
   ═══════════════════════════════════════════════════════════════════ */

(function() {
    'use strict';
    
    console.log('🌤️ Loading Enhanced Weather System with Maps...');
    
    /* ========================================
       CONFIGURATION
       ======================================== */
    
    const CONFIG = {
        // Open-Meteo API (FREE - No API Key needed!)
        API_URL: 'https://api.open-meteo.com/v1/forecast',
        MAP_TILES: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        
        // API Plans Configuration
        API_PLANS: {
            free: {
                name: { ar: 'مجاني', en: 'Free', fr: 'Gratuit' },
                maxRequests: 10,
                dailyLimit: 100,
                features: {
                    basicWeather: true,
                    forecast7Days: false,
                    hourlyData: false,
                    comparison: false,
                    maps: false,
                    alerts: false
                },
                icon: '🆓'
            },
            basic: {
                name: { ar: 'أساسي', en: 'Basic', fr: 'Basique' },
                maxRequests: 50,
                dailyLimit: 1000,
                features: {
                    basicWeather: true,
                    forecast7Days: true,
                    hourlyData: true,
                    comparison: false,
                    maps: false,
                    alerts: false
                },
                icon: '⭐'
            },
            pro: {
                name: { ar: 'احترافي', en: 'Pro', fr: 'Pro' },
                maxRequests: 200,
                dailyLimit: 5000,
                features: {
                    basicWeather: true,
                    forecast7Days: true,
                    hourlyData: true,
                    comparison: true,
                    maps: true,
                    alerts: true
                },
                icon: '💎'
            },
            enterprise: {
                name: { ar: 'مؤسسات', en: 'Enterprise', fr: 'Entreprise' },
                maxRequests: -1, // Unlimited
                dailyLimit: -1, // Unlimited
                features: {
                    basicWeather: true,
                    forecast7Days: true,
                    hourlyData: true,
                    comparison: true,
                    maps: true,
                    alerts: true,
                    advanced: true
                },
                icon: '🚀'
            }
        },
        
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
    
    const TRANSLATIONS = {
        ar: {
            weatherTools: 'أدوات الطقس',
            currentWeather: 'الطقس الحالي',
            comparison: 'المقارنة بين المحافظات',
            weatherMap: 'خريطة الطقس',
            selectCity: 'اختر محافظة',
            selectCities: 'اختر المحافظات للمقارنة',
            addCity: 'إضافة محافظة',
            compare: 'مقارنة',
            temperature: 'درجة الحرارة',
            humidity: 'الرطوبة',
            windSpeed: 'سرعة الرياح',
            feelsLike: 'تشعر كـ',
            conditions: 'الحالة',
            forecast: 'التوقعات',
            hourly: 'بالساعة',
            daily: 'يومي',
            loading: 'جاري التحميل...',
            error: 'حدث خطأ',
            noData: 'لا توجد بيانات',
            apiPlan: 'خطة API',
            requestsUsed: 'الطلبات المستخدمة',
            requestsRemaining: 'الطلبات المتبقية',
            upgrade: 'ترقية الخطة',
            features: 'المميزات',
            limitReached: 'تم الوصول للحد الأقصى',
            upgradeRequired: 'يتطلب ترقية الخطة'
        },
        en: {
            weatherTools: 'Weather Tools',
            currentWeather: 'Current Weather',
            comparison: 'Governorate Comparison',
            weatherMap: 'Weather Map',
            selectCity: 'Select Governorate',
            selectCities: 'Select Governorates to Compare',
            addCity: 'Add Governorate',
            compare: 'Compare',
            temperature: 'Temperature',
            humidity: 'Humidity',
            windSpeed: 'Wind Speed',
            feelsLike: 'Feels Like',
            conditions: 'Conditions',
            forecast: 'Forecast',
            hourly: 'Hourly',
            daily: 'Daily',
            loading: 'Loading...',
            error: 'Error occurred',
            noData: 'No data available',
            apiPlan: 'API Plan',
            requestsUsed: 'Requests Used',
            requestsRemaining: 'Requests Remaining',
            upgrade: 'Upgrade Plan',
            features: 'Features',
            limitReached: 'Limit Reached',
            upgradeRequired: 'Upgrade Required'
        },
        fr: {
            weatherTools: 'Outils Météo',
            currentWeather: 'Météo Actuelle',
            comparison: 'Comparaison des Gouvernorats',
            weatherMap: 'Carte Météo',
            selectCity: 'Sélectionner un Gouvernorat',
            selectCities: 'Sélectionner les Gouvernorats à Comparer',
            addCity: 'Ajouter un Gouvernorat',
            compare: 'Comparer',
            temperature: 'Température',
            humidity: 'Humidité',
            windSpeed: 'Vitesse du Vent',
            feelsLike: 'Ressenti',
            conditions: 'Conditions',
            forecast: 'Prévisions',
            hourly: 'Par Heure',
            daily: 'Quotidien',
            loading: 'Chargement...',
            error: 'Erreur',
            noData: 'Aucune donnée',
            apiPlan: 'Plan API',
            requestsUsed: 'Requêtes Utilisées',
            requestsRemaining: 'Requêtes Restantes',
            upgrade: 'Mettre à Niveau',
            features: 'Fonctionnalités',
            limitReached: 'Limite Atteinte',
            upgradeRequired: 'Mise à Niveau Requise'
        }
    };

    /* ========================================
       API USAGE TRACKER
       ======================================== */
    
    class APIUsageTracker {
        constructor() {
            this.currentPlan = 'free';
            this.requestCount = 0;
            this.dailyCount = 0;
            this.lastReset = new Date().toDateString();
            this.loadFromStorage();
        }

        loadFromStorage() {
            const saved = localStorage.getItem('weatherAPIUsage');
            if (saved) {
                const data = JSON.parse(saved);
                this.currentPlan = data.plan || 'free';
                this.requestCount = data.requestCount || 0;
                this.dailyCount = data.dailyCount || 0;
                this.lastReset = data.lastReset || new Date().toDateString();
                
                // Reset daily count if new day
                if (this.lastReset !== new Date().toDateString()) {
                    this.dailyCount = 0;
                    this.lastReset = new Date().toDateString();
                    this.saveToStorage();
                }
            }
        }

        saveToStorage() {
            localStorage.setItem('weatherAPIUsage', JSON.stringify({
                plan: this.currentPlan,
                requestCount: this.requestCount,
                dailyCount: this.dailyCount,
                lastReset: this.lastReset
            }));
        }

        canMakeRequest() {
            const plan = CONFIG.API_PLANS[this.currentPlan];
            
            if (plan.dailyLimit === -1) return true; // Unlimited
            
            return this.dailyCount < plan.dailyLimit;
        }

        incrementRequest() {
            this.requestCount++;
            this.dailyCount++;
            this.saveToStorage();
        }

        hasFeature(feature) {
            const plan = CONFIG.API_PLANS[this.currentPlan];
            return plan.features[feature] === true;
        }

        getRemainingRequests() {
            const plan = CONFIG.API_PLANS[this.currentPlan];
            if (plan.dailyLimit === -1) return '∞';
            return Math.max(0, plan.dailyLimit - this.dailyCount);
        }

        upgradePlan(newPlan) {
            if (CONFIG.API_PLANS[newPlan]) {
                this.currentPlan = newPlan;
                this.saveToStorage();
                return true;
            }
            return false;
        }
    }

    const apiTracker = new APIUsageTracker();

    /* ========================================
       WEATHER API FUNCTIONS
       ======================================== */
    
    async function fetchWeather(cityKey, detailed = false) {
        if (!apiTracker.canMakeRequest()) {
            throw new Error('API_LIMIT_REACHED');
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

        if (detailed && apiTracker.hasFeature('hourlyData')) {
            params.append('hourly', 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m');
        }

        if (detailed && apiTracker.hasFeature('forecast7Days')) {
            params.append('daily', 'temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code');
            params.append('forecast_days', '7');
        }

        const response = await fetch(`${CONFIG.API_URL}?${params}`);
        if (!response.ok) throw new Error('API request failed');

        apiTracker.incrementRequest();
        
        const data = await response.json();
        return { city, data };
    }

    /* ========================================
       UI COMPONENTS
       ======================================== */
    
    function createWeatherToolsSection() {
        const lang = document.documentElement.lang || 'en';
        const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
        const plan = CONFIG.API_PLANS[apiTracker.currentPlan];

        return `
            <div class="weather-tools-container">
                <!-- API Plan Status -->
                <div class="api-plan-status">
                    <div class="plan-badge ${apiTracker.currentPlan}">
                        <span class="plan-icon">${plan.icon}</span>
                        <span class="plan-name">${plan.name[lang]}</span>
                    </div>
                    <div class="plan-usage">
                        <span class="usage-label">${t.requestsUsed}:</span>
                        <span class="usage-value">${apiTracker.dailyCount} / ${plan.dailyLimit === -1 ? '∞' : plan.dailyLimit}</span>
                    </div>
                    <button class="upgrade-btn" onclick="WeatherEnhanced.showUpgradeModal()">
                        ${t.upgrade}
                    </button>
                </div>

                <!-- Tools Navigation -->
                <div class="weather-tools-nav">
                    <button class="tool-nav-btn active" data-tool="current">
                        <span class="tool-icon">🌡️</span>
                        <span class="tool-label">${t.currentWeather}</span>
                    </button>
                    <button class="tool-nav-btn ${!apiTracker.hasFeature('comparison') ? 'locked' : ''}" 
                            data-tool="comparison"
                            ${!apiTracker.hasFeature('comparison') ? 'disabled' : ''}>
                        <span class="tool-icon">📊</span>
                        <span class="tool-label">${t.comparison}</span>
                        ${!apiTracker.hasFeature('comparison') ? '<span class="lock-icon">🔒</span>' : ''}
                    </button>
                    <button class="tool-nav-btn ${!apiTracker.hasFeature('maps') ? 'locked' : ''}" 
                            data-tool="map"
                            ${!apiTracker.hasFeature('maps') ? 'disabled' : ''}>
                        <span class="tool-icon">🗺️</span>
                        <span class="tool-label">${t.weatherMap}</span>
                        ${!apiTracker.hasFeature('maps') ? '<span class="lock-icon">🔒</span>' : ''}
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
        const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

        return `
            <div class="current-weather-panel">
                <div class="city-selector">
                    <label>${t.selectCity}</label>
                    <select id="weather-city-select" onchange="WeatherEnhanced.loadWeather(this.value)">
                        <option value="">-- ${t.selectCity} --</option>
                        ${Object.keys(CITIES).map(key => {
                            const city = CITIES[key];
                            return `<option value="${key}">${city.icon} ${city[lang === 'ar' ? 'name' : lang === 'fr' ? 'nameFr' : 'nameEn']}</option>`;
                        }).join('')}
                    </select>
                </div>
                <div id="current-weather-display"></div>
            </div>
        `;
    }

    function createComparisonPanel() {
        const lang = document.documentElement.lang || 'en';
        const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

        if (!apiTracker.hasFeature('comparison')) {
            return `
                <div class="feature-locked">
                    <div class="lock-icon-large">🔒</div>
                    <h3>${t.upgradeRequired}</h3>
                    <p>${t.features}: ${t.comparison}</p>
                    <button class="upgrade-btn-large" onclick="WeatherEnhanced.showUpgradeModal()">
                        ${t.upgrade}
                    </button>
                </div>
            `;
        }

        return `
            <div class="comparison-panel">
                <div class="comparison-selector">
                    <label>${t.selectCities}</label>
                    <div class="city-chips-container" id="comparison-cities"></div>
                    <select id="comparison-city-select">
                        <option value="">-- ${t.addCity} --</option>
                        ${Object.keys(CITIES).map(key => {
                            const city = CITIES[key];
                            return `<option value="${key}">${city.icon} ${city[lang === 'ar' ? 'name' : lang === 'fr' ? 'nameFr' : 'nameEn']}</option>`;
                        }).join('')}
                    </select>
                    <button id="compare-btn" class="compare-btn" onclick="WeatherEnhanced.compareWeather()">
                        ${t.compare}
                    </button>
                </div>
                <div id="comparison-results"></div>
            </div>
        `;
    }

    function createMapPanel() {
        const lang = document.documentElement.lang || 'en';
        const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

        if (!apiTracker.hasFeature('maps')) {
            return `
                <div class="feature-locked">
                    <div class="lock-icon-large">🔒</div>
                    <h3>${t.upgradeRequired}</h3>
                    <p>${t.features}: ${t.weatherMap}</p>
                    <button class="upgrade-btn-large" onclick="WeatherEnhanced.showUpgradeModal()">
                        ${t.upgrade}
                    </button>
                </div>
            `;
        }

        return `
            <div class="map-panel">
                <div id="weather-map" style="width: 100%; height: 600px; border-radius: 12px; overflow: hidden;"></div>
                <div class="map-legend">
                    <h4>${t.temperature} (°C)</h4>
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
        if (!mapElement) return;

        // Initialize map centered on Egypt
        const map = L.map('weather-map').setView([26.8206, 30.8025], 6);

        // Add OpenStreetMap tiles
        L.tileLayer(CONFIG.MAP_TILES, {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(map);

        // Add markers for all cities with weather data
        for (const [key, city] of Object.entries(CITIES)) {
            try {
                const { data } = await fetchWeather(key);
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
                        <p><strong>${TRANSLATIONS[lang].temperature}:</strong> ${temp}°C</p>
                        <p><strong>${TRANSLATIONS[lang].windSpeed}:</strong> ${data.current_weather.windspeed} km/h</p>
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
            alert(TRANSLATIONS[document.documentElement.lang || 'en'].limitReached + ': 4 cities maximum');
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
                    <button class="chip-remove" onclick="WeatherEnhanced.removeComparisonCity('${key}')">×</button>
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
        const t = TRANSLATIONS[lang];

        return `
            <div class="comparison-table-container">
                <table class="comparison-table">
                    <thead>
                        <tr>
                            <th>City</th>
                            <th>${t.temperature}</th>
                            <th>${t.feelsLike}</th>
                            <th>${t.humidity}</th>
                            <th>${t.windSpeed}</th>
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
       UPGRADE MODAL
       ======================================== */
    
    function showUpgradeModal() {
        const lang = document.documentElement.lang || 'en';
        const t = TRANSLATIONS[lang];

        const modal = document.createElement('div');
        modal.className = 'upgrade-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${t.upgrade}</h2>
                    <button class="modal-close" onclick="this.closest('.upgrade-modal').remove()">×</button>
                </div>
                <div class="modal-body">
                    <div class="plans-grid">
                        ${Object.entries(CONFIG.API_PLANS).map(([key, plan]) => `
                            <div class="plan-card ${key === apiTracker.currentPlan ? 'current' : ''}">
                                <div class="plan-icon">${plan.icon}</div>
                                <h3>${plan.name[lang]}</h3>
                                <div class="plan-limits">
                                    <p><strong>${t.requestsUsed}:</strong> ${plan.dailyLimit === -1 ? '∞' : plan.dailyLimit}/day</p>
                                </div>
                                <div class="plan-features">
                                    <h4>${t.features}:</h4>
                                    <ul>
                                        ${Object.entries(plan.features).filter(([, enabled]) => enabled).map(([feature]) => 
                                            `<li>✓ ${feature.replace(/([A-Z])/g, ' $1').trim()}</li>`
                                        ).join('')}
                                    </ul>
                                </div>
                                ${key !== apiTracker.currentPlan ? 
                                    `<button class="select-plan-btn" onclick="WeatherEnhanced.selectPlan('${key}')">${t.upgrade}</button>` :
                                    `<div class="current-plan-badge">Current Plan</div>`
                                }
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    function selectPlan(planKey) {
        if (apiTracker.upgradePlan(planKey)) {
            alert('Plan upgraded successfully! Reloading...');
            location.reload();
        }
    }

    /* ========================================
       INITIALIZATION
       ======================================== */
    
    function init() {
        console.log('🌤️ Initializing Enhanced Weather System...');

        // Add weather tools section to page
        const weatherSection = document.getElementById('weather') || document.querySelector('.weather-section');
        if (weatherSection) {
            const toolsHTML = createWeatherToolsSection();
            const container = document.createElement('div');
            container.innerHTML = toolsHTML;
            weatherSection.appendChild(container);

            // Setup event listeners
            setupEventListeners();
        }

        // Load Leaflet library for maps
        if (!window.L && apiTracker.hasFeature('maps')) {
            const leafletCSS = document.createElement('link');
            leafletCSS.rel = 'stylesheet';
            leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            document.head.appendChild(leafletCSS);

            const leafletJS = document.createElement('script');
            leafletJS.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            document.head.appendChild(leafletJS);
        }
    }

    function setupEventListeners() {
        // Tool navigation
        document.querySelectorAll('.tool-nav-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                if (this.disabled) return;

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

    async function loadWeather(cityKey) {
        if (!cityKey) return;

        const displayEl = document.getElementById('current-weather-display');
        if (!displayEl) return;

        displayEl.innerHTML = '<div class="loading">Loading...</div>';

        try {
            const { city, data } = await fetchWeather(cityKey, true);
            displayEl.innerHTML = createWeatherDisplay(city, data);
        } catch (error) {
            if (error.message === 'API_LIMIT_REACHED') {
                displayEl.innerHTML = `
                    <div class="error">
                        <h3>API Limit Reached</h3>
                        <p>You have reached your daily API request limit.</p>
                        <button onclick="WeatherEnhanced.showUpgradeModal()">Upgrade Plan</button>
                    </div>
                `;
            } else {
                displayEl.innerHTML = `<div class="error">Error: ${error.message}</div>`;
            }
        }
    }

    function createWeatherDisplay(city, data) {
        const lang = document.documentElement.lang || 'en';
        const t = TRANSLATIONS[lang];
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
                            <span class="detail-label">${t.windSpeed}:</span>
                            <span class="detail-value">${current.windspeed} km/h</span>
                        </div>
                        ${data.hourly ? `
                            <div class="detail-item">
                                <span class="detail-label">${t.humidity}:</span>
                                <span class="detail-value">${data.hourly.relative_humidity_2m[0]}%</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">${t.feelsLike}:</span>
                                <span class="detail-value">${Math.round(data.hourly.apparent_temperature[0])}°C</span>
                            </div>
                        ` : ''}
                    </div>
                </div>
                ${data.daily ? `
                    <div class="weather-forecast">
                        <h3>${t.forecast}</h3>
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
       EXPOSE PUBLIC API
       ======================================== */
    
    window.WeatherEnhanced = {
        init,
        loadWeather,
        compareWeather,
        addComparisonCity,
        removeComparisonCity,
        showUpgradeModal,
        selectPlan,
        apiTracker
    };

    // Auto-initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
