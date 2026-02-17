/* ═══════════════════════════════════════════════════════════════════
   SMART PLANS INTEGRATION
   دمج الطقس والمرشد الذكي في نظام الخطط
   ═══════════════════════════════════════════════════════════════════ */

(function() {
    'use strict';
    
    console.log('🤖 Loading Smart Plans Integration...');
    
    /* ========================================
       ENHANCED PLAN DATA STRUCTURE
       ======================================== */
    
    class SmartPlan {
        constructor(basicPlanData) {
            this.basic = basicPlanData;
            this.weather = null;
            this.aiRecommendations = null;
            this.smartAdvice = [];
            this.warnings = [];
            this.bestTimeToVisit = null;
            this.packingList = [];
        }
        
        // Add weather data
        async addWeatherData() {
            if (!this.basic.governorate) return;
            
            try {
                // Get city key from governorate name
                const cityKey = this.governorateToWeatherCity(this.basic.governorate);
                
                if (cityKey && window.getWeatherForCity) {
                    this.weather = await window.getWeatherForCity(cityKey);
                    
                    if (this.weather) {
                        // Generate weather-based advice
                        this.generateWeatherAdvice();
                        console.log('✅ Weather data added to plan');
                    }
                }
            } catch (error) {
                console.error('❌ Error adding weather:', error);
            }
        }
        
        // Add AI recommendations
        async addAIRecommendations() {
            if (!this.basic.governorate || !this.basic.interests) return;
            
            try {
                const prompt = this.buildAIPrompt();
                
                // Check if AI Guide is available
                if (window.AIGuideDebug?.testMessage) {
                    // Use AI Guide to get recommendations
                    const recommendations = await this.getAIRecommendations(prompt);
                    this.aiRecommendations = recommendations;
                    console.log('✅ AI recommendations added to plan');
                }
            } catch (error) {
                console.error('❌ Error adding AI recommendations:', error);
            }
        }
        
        // Generate complete smart plan
        async generateSmartPlan() {
            console.log('🚀 Generating smart plan...');
            
            // Add weather data
            await this.addWeatherData();
            
            // Add AI recommendations (if available)
            await this.addAIRecommendations();
            
            // Generate packing list
            this.generatePackingList();
            
            // Determine best time to visit
            this.determineBestTimeToVisit();
            
            // Generate warnings
            this.generateWarnings();
            
            console.log('✅ Smart plan generated!');
            return this;
        }
        
        // Helper: Convert governorate to weather city key
        governorateToWeatherCity(governorate) {
            const mapping = {
                'Cairo': 'cairo',
                'Giza': 'giza',
                'Alexandria': 'alexandria',
                'Luxor': 'luxor',
                'Aswan': 'aswan',
                'Red Sea': 'red-sea',
                'South Sinai': 'south-sinai',
                'North Sinai': 'north-sinai',
                'Matrouh': 'matrouh',
                'New Valley': 'new-valley',
                'Qalyubia': 'qalyubia',
                'Beheira': 'beheira',
                'Kafr El Sheikh': 'kafr-el-sheikh',
                'Dakahlia': 'dakahlia',
                'Damietta': 'damietta',
                'Port Said': 'port-said',
                'Sharqia': 'sharqia',
                'Gharbia': 'gharbia',
                'Monufia': 'monufia',
                'Ismailia': 'ismailia',
                'Suez': 'suez',
                'Faiyum': 'faiyum',
                'Beni Suef': 'beni-suef',
                'Minya': 'minya',
                'Asyut': 'asyut',
                'Sohag': 'sohag',
                'Qena': 'qena'
            };
            
            return mapping[governorate] || null;
        }
        
        // Generate weather-based advice
        generateWeatherAdvice() {
            if (!this.weather) return;
            
            const temp = this.weather.temperature;
            const condition = this.weather.weatherCode;
            
            // Temperature advice
            if (temp > 40) {
                this.warnings.push({
                    type: 'extreme-heat',
                    icon: '🌡️',
                    message: 'حرارة شديدة جداً! تجنب الأنشطة الخارجية بين 11 صباحاً - 4 مساءً',
                    messageEn: 'Extreme heat! Avoid outdoor activities between 11 AM - 4 PM'
                });
                this.smartAdvice.push('اشرب 3-4 لتر ماء يومياً');
                this.packingList.push('قبعة واسعة', 'نظارة شمسية', 'واقي شمس SPF 50+', 'ملابس قطنية فاتحة');
            } else if (temp > 35) {
                this.smartAdvice.push('الطقس حار - خطط للأنشطة في الصباح الباكر أو المساء');
                this.packingList.push('قبعة', 'نظارة شمسية', 'واقي شمس', 'ملابس خفيفة');
            } else if (temp > 25) {
                this.smartAdvice.push('طقس مثالي للسياحة والأنشطة الخارجية');
                this.packingList.push('ملابس خفيفة', 'واقي شمس');
            } else if (temp > 15) {
                this.smartAdvice.push('طقس معتدل - أحضر سترة للمساء');
                this.packingList.push('سترة خفيفة', 'ملابس متوسطة');
            } else {
                this.smartAdvice.push('طقس بارد - ارتدِ طبقات من الملابس');
                this.packingList.push('سترة دافئة', 'وشاح', 'ملابس دافئة');
            }
            
            // Rain warnings
            if (condition >= 51 && condition <= 82) {
                this.warnings.push({
                    type: 'rain',
                    icon: '☔',
                    message: 'توقعات بهطول أمطار',
                    messageEn: 'Rain expected'
                });
                this.packingList.push('مظلة', 'معطف مقاوم للماء', 'حذاء مقاوم للماء');
            }
            
            // Wind warnings
            if (this.weather.windSpeed > 40) {
                this.warnings.push({
                    type: 'wind',
                    icon: '💨',
                    message: 'رياح قوية - قد تؤثر على بعض الأنشطة',
                    messageEn: 'Strong winds - may affect some activities'
                });
            }
        }
        
        // Build AI prompt
        buildAIPrompt() {
            const currentLang = document.documentElement.lang || 'ar';
            
            if (currentLang === 'ar') {
                return `أنت مرشد سياحي خبير. اقترح خطة سفر مفصلة:

المحافظة: ${this.basic.governorate}
المدة: ${this.basic.duration} أيام
الميزانية: ${this.basic.budget}
الاهتمامات: ${this.basic.interests?.join(', ')}
${this.weather ? `الطقس المتوقع: ${this.weather.temperature}°C، ${this.weather.description}` : ''}

اقترح:
1. أفضل 5 أماكن للزيارة
2. أفضل مطعمين محليين
3. نصيحة واحدة مهمة
4. نشاط مميز

(كن مختصراً - 5 جمل كحد أقصى)`;
            } else {
                return `You are an expert tour guide. Suggest a detailed travel plan:

Governorate: ${this.basic.governorate}
Duration: ${this.basic.duration} days
Budget: ${this.basic.budget}
Interests: ${this.basic.interests?.join(', ')}
${this.weather ? `Weather forecast: ${this.weather.temperature}°C, ${this.weather.descriptionEn}` : ''}

Suggest:
1. Top 5 places to visit
2. Best 2 local restaurants
3. One important tip
4. Unique activity

(Keep it brief - max 5 sentences)`;
            }
        }
        
        // Get AI recommendations (placeholder - will integrate with actual AI)
        async getAIRecommendations(prompt) {
            // This will integrate with the AI Guide system
            // For now, return smart recommendations based on data
            
            return {
                places: this.getSmartPlaceRecommendations(),
                restaurants: this.getSmartRestaurantRecommendations(),
                tips: this.getSmartTips(),
                activities: this.getSmartActivities()
            };
        }
        
        // Smart place recommendations based on interests and weather
        getSmartPlaceRecommendations() {
            const places = [];
            const governorate = this.basic.governorate;
            
            // Basic recommendations (will be enhanced with actual data)
            const recommendations = {
                'Cairo': ['Egyptian Museum', 'Khan El-Khalili', 'Citadel', 'Al-Azhar Park', 'Cairo Tower'],
                'Giza': ['Pyramids', 'Sphinx', 'Grand Egyptian Museum', 'Saqqara', 'Memphis'],
                'Alexandria': ['Bibliotheca', 'Qaitbay Citadel', 'Montaza', 'Corniche', 'Roman Theater'],
                'Luxor': ['Karnak Temple', 'Valley of Kings', 'Luxor Temple', 'Hatshepsut Temple', 'Colossi of Memnon'],
                'Aswan': ['Philae Temple', 'Abu Simbel', 'Nubian Museum', 'Elephantine Island', 'Unfinished Obelisk']
            };
            
            // Adjust based on weather
            if (this.weather && this.weather.temperature > 35) {
                // Prioritize indoor/shaded places
                places.push({
                    note: '🌡️ نظراً للحرارة العالية، نوصي بزيارة الأماكن المغلقة أولاً',
                    noteEn: '🌡️ Due to high temperature, we recommend indoor places first'
                });
            }
            
            const cityPlaces = recommendations[governorate] || [];
            cityPlaces.forEach(place => {
                places.push({ name: place, type: 'attraction' });
            });
            
            return places;
        }
        
        // Smart restaurant recommendations
        getSmartRestaurantRecommendations() {
            // Basic recommendations
            return [
                { name: 'مطعم محلي تقليدي', type: 'traditional' },
                { name: 'مطعم مع إطلالة', type: 'scenic' }
            ];
        }
        
        // Smart tips based on conditions
        getSmartTips() {
            const tips = [];
            
            // Weather-based tips
            if (this.weather) {
                if (this.weather.temperature > 35) {
                    tips.push('ابدأ يومك مبكراً للاستفادة من الطقس الأقل حرارة');
                }
                if (this.weather.humidity > 70) {
                    tips.push('الرطوبة عالية - تجنب المجهود الزائد');
                }
            }
            
            // Budget-based tips
            if (this.basic.budget === 'budget') {
                tips.push('استخدم المواصلات العامة لتوفير المال');
            }
            
            return tips;
        }
        
        // Smart activities
        getSmartActivities() {
            const activities = [];
            
            // Weather-appropriate activities
            if (this.weather) {
                if (this.weather.temperature < 30) {
                    activities.push({ name: 'جولة مشي في المدينة', icon: '🚶' });
                }
                if (this.weather.temperature > 35 && ['Red Sea', 'South Sinai', 'Alexandria'].includes(this.basic.governorate)) {
                    activities.push({ name: 'سباحة وغطس', icon: '🏊' });
                }
            }
            
            return activities;
        }
        
        // Generate packing list
        generatePackingList() {
            // Add basics
            const basics = ['جواز سفر', 'بطاقة هوية', 'بطاقة ائتمان', 'نقود'];
            basics.forEach(item => {
                if (!this.packingList.includes(item)) {
                    this.packingList.push(item);
                }
            });
            
            // Add based on governorate
            if (['Red Sea', 'South Sinai'].includes(this.basic.governorate)) {
                this.packingList.push('ملابس سباحة', 'منشفة شاطئ', 'نظارة غطس');
            }
            
            if (['Luxor', 'Aswan'].includes(this.basic.governorate)) {
                this.packingList.push('كاميرا', 'حذاء مريح للمشي');
            }
        }
        
        // Determine best time to visit
        determineBestTimeToVisit() {
            const currentMonth = new Date().getMonth() + 1; // 1-12
            
            // General Egypt best times
            const bestMonths = {
                'default': [10, 11, 12, 1, 2, 3], // Oct-Mar
                'Red Sea': [1, 2, 3, 4, 10, 11, 12], // Extended for diving
                'South Sinai': [1, 2, 3, 4, 10, 11, 12],
                'Alexandria': [5, 6, 7, 8, 9] // Summer for beaches
            };
            
            const governorate = this.basic.governorate;
            const idealMonths = bestMonths[governorate] || bestMonths['default'];
            
            this.bestTimeToVisit = {
                isIdealNow: idealMonths.includes(currentMonth),
                idealMonths: idealMonths,
                message: idealMonths.includes(currentMonth) ? 
                    'وقت مثالي للزيارة! 🎉' : 
                    'يمكن الزيارة ولكن الطقس قد يكون حاراً 🌡️'
            };
        }
        
        // Generate warnings
        generateWarnings() {
            // Temperature warnings already added in weather advice
            
            // Add health warnings
            if (this.weather && this.weather.temperature > 38) {
                this.warnings.push({
                    type: 'health',
                    icon: '⚕️',
                    message: 'احذر من ضربة الشمس - ابق رطباً',
                    messageEn: 'Beware of heat stroke - stay hydrated'
                });
            }
            
            // Add safety warnings for specific governorates
            if (['North Sinai'].includes(this.basic.governorate)) {
                this.warnings.push({
                    type: 'safety',
                    icon: '⚠️',
                    message: 'تحقق من تحذيرات السفر الحالية',
                    messageEn: 'Check current travel advisories'
                });
            }
        }
        
        // Export plan as formatted text
        exportAsText() {
            const currentLang = document.documentElement.lang || 'ar';
            let text = '';
            
            if (currentLang === 'ar') {
                text = `📋 خطة السفر الذكية
━━━━━━━━━━━━━━━━━━━━━

📍 الوجهة: ${this.basic.governorate}
📅 المدة: ${this.basic.duration} أيام
💰 الميزانية: ${this.basic.budget}
👥 عدد الأشخاص: ${this.basic.travelers || 1}

`;
                
                // Weather
                if (this.weather) {
                    text += `🌤️ الطقس المتوقع:
${this.weather.icon} ${this.weather.temperature}°C - ${this.weather.description}
💧 رطوبة: ${this.weather.humidity}%
💨 رياح: ${this.weather.windSpeed} كم/س

`;
                }
                
                // Warnings
                if (this.warnings.length > 0) {
                    text += `⚠️ تنبيهات مهمة:\n`;
                    this.warnings.forEach(w => {
                        text += `${w.icon} ${w.message}\n`;
                    });
                    text += '\n';
                }
                
                // Advice
                if (this.smartAdvice.length > 0) {
                    text += `💡 نصائح ذكية:\n`;
                    this.smartAdvice.forEach(advice => {
                        text += `• ${advice}\n`;
                    });
                    text += '\n';
                }
                
                // Packing list
                if (this.packingList.length > 0) {
                    text += `🎒 قائمة الأمتعة:\n`;
                    this.packingList.forEach(item => {
                        text += `☐ ${item}\n`;
                    });
                    text += '\n';
                }
                
                // Best time
                if (this.bestTimeToVisit) {
                    text += `🗓️ أفضل وقت للزيارة: ${this.bestTimeToVisit.message}\n\n`;
                }
                
                text += `━━━━━━━━━━━━━━━━━━━━━
تم الإنشاء بواسطة Discover Egypt
${new Date().toLocaleString('ar-EG')}`;
                
            } else {
                // English version
                text = `📋 Smart Travel Plan
━━━━━━━━━━━━━━━━━━━━━

📍 Destination: ${this.basic.governorate}
📅 Duration: ${this.basic.duration} days
💰 Budget: ${this.basic.budget}
👥 Travelers: ${this.basic.travelers || 1}

`;
                
                if (this.weather) {
                    text += `🌤️ Weather Forecast:
${this.weather.icon} ${this.weather.temperature}°C - ${this.weather.descriptionEn}
💧 Humidity: ${this.weather.humidity}%
💨 Wind: ${this.weather.windSpeed} km/h

`;
                }
                
                if (this.warnings.length > 0) {
                    text += `⚠️ Important Warnings:\n`;
                    this.warnings.forEach(w => {
                        text += `${w.icon} ${w.messageEn}\n`;
                    });
                    text += '\n';
                }
                
                text += `━━━━━━━━━━━━━━━━━━━━━
Generated by Discover Egypt
${new Date().toLocaleString('en-US')}`;
            }
            
            return text;
        }
        
        // Export plan as HTML
        exportAsHTML() {
            const weather = this.weather;
            const warnings = this.warnings;
            const advice = this.smartAdvice;
            const packing = this.packingList;
            
            return `
<div class="smart-plan-card" style="
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem;
    border-radius: 16px;
    margin: 1rem 0;
">
    <h3 style="margin-top: 0;">📋 خطة السفر الذكية</h3>
    
    <div class="plan-basic" style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; margin: 1rem 0;">
        <p><strong>📍 الوجهة:</strong> ${this.basic.governorate}</p>
        <p><strong>📅 المدة:</strong> ${this.basic.duration} أيام</p>
        <p><strong>💰 الميزانية:</strong> ${this.basic.budget}</p>
    </div>
    
    ${weather ? `
    <div class="plan-weather" style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; margin: 1rem 0;">
        <h4>🌤️ الطقس المتوقع</h4>
        <p style="font-size: 2rem; margin: 0.5rem 0;">${weather.icon} ${weather.temperature}°C</p>
        <p>${weather.description}</p>
        <div style="display: flex; gap: 1rem; margin-top: 0.5rem;">
            <span>💧 ${weather.humidity}%</span>
            <span>💨 ${weather.windSpeed} كم/س</span>
        </div>
    </div>
    ` : ''}
    
    ${warnings.length > 0 ? `
    <div class="plan-warnings" style="background: rgba(255,200,0,0.2); padding: 1rem; border-radius: 8px; margin: 1rem 0;">
        <h4>⚠️ تنبيهات مهمة</h4>
        ${warnings.map(w => `<p>${w.icon} ${w.message}</p>`).join('')}
    </div>
    ` : ''}
    
    ${advice.length > 0 ? `
    <div class="plan-advice" style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; margin: 1rem 0;">
        <h4>💡 نصائح ذكية</h4>
        <ul style="margin: 0; padding-right: 1.5rem;">
            ${advice.map(a => `<li>${a}</li>`).join('')}
        </ul>
    </div>
    ` : ''}
    
    ${packing.length > 0 ? `
    <div class="plan-packing" style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; margin: 1rem 0;">
        <h4>🎒 قائمة الأمتعة</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 0.5rem;">
            ${packing.map(item => `<div>☐ ${item}</div>`).join('')}
        </div>
    </div>
    ` : ''}
</div>
            `.trim();
        }
    }
    
    /* ========================================
       EXPORT TO GLOBAL
       ======================================== */
    
    window.SmartPlan = SmartPlan;
    
    // Function to create smart plan from basic plan data
    window.createSmartPlan = async function(basicPlanData) {
        const smartPlan = new SmartPlan(basicPlanData);
        await smartPlan.generateSmartPlan();
        return smartPlan;
    };
    
    console.log('✅ Smart Plans Integration loaded!');
    
})();

/* ═══════════════════════════════════════════════════════════════════
   نهاية ملف Smart Plans Integration
   ═══════════════════════════════════════════════════════════════════ */
