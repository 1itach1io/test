/* ═══════════════════════════════════════════════════════════════════
   ENTERPRISE-LEVEL TRAVEL PLANS WIZARD SYSTEM
   نظام التخطيط الذكي المتقدم للرحلات - مستوى شركات عالمية
   
   Features:
   ✓ Multi-step intelligent questionnaire
   ✓ AI-powered recommendations
   ✓ Dynamic budget calculator
   ✓ Progress saving & resuming
   ✓ PDF export & sharing
   ✓ Comparison engine
   ✓ Real-time pricing
   ✓ Personalized itinerary
   ═══════════════════════════════════════════════════════════════════ */

'use strict';

// ══════════════════════════════════════════════════════════════════
// WIZARD STATE MANAGEMENT
// ══════════════════════════════════════════════════════════════════

class TravelPlanWizard {
    constructor() {
        this.currentStep = 0;
        this.totalSteps = 7;
        this.answers = {
            travelType: null,
            interests: [],
            budget: null,
            duration: null,
            travelers: null,
            accommodation: null,
            season: null,
            activities: []
        };
        this.recommendations = [];
        this.savedPlans = this.loadSavedPlans();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadProgress();
    }

    // ══════════════════════════════════════════════════════════════
    // WIZARD STEPS CONFIGURATION
    // ══════════════════════════════════════════════════════════════

    getStepConfig(stepIndex) {
        const steps = [
            {
                id: 'travel-type',
                title: { en: 'What type of traveler are you?', ar: 'ما نوع المسافر أنت؟', fr: 'Quel type de voyageur êtes-vous?' },
                subtitle: { en: 'Choose your travel style', ar: 'اختر نمط سفرك', fr: 'Choisissez votre style de voyage' },
                options: [
                    { id: 'adventure', icon: '🏔️', label: { en: 'Adventure Seeker', ar: 'باحث عن المغامرة', fr: 'Aventurier' }, desc: { en: 'I love thrilling experiences', ar: 'أحب التجارب المثيرة', fr: 'J\'aime les expériences palpitantes' } },
                    { id: 'cultural', icon: '🏛️', label: { en: 'Cultural Explorer', ar: 'مستكشف ثقافي', fr: 'Explorateur culturel' }, desc: { en: 'I want to learn history', ar: 'أريد تعلم التاريخ', fr: 'Je veux apprendre l\'histoire' } },
                    { id: 'relaxation', icon: '🏖️', label: { en: 'Beach Lover', ar: 'محب الشواطئ', fr: 'Amateur de plage' }, desc: { en: 'I prefer peaceful retreats', ar: 'أفضل الاسترخاء', fr: 'Je préfère les retraites paisibles' } },
                    { id: 'family', icon: '👨‍👩‍👧‍👦', label: { en: 'Family Vacation', ar: 'عطلة عائلية', fr: 'Vacances en famille' }, desc: { en: 'Fun for all ages', ar: 'متعة لجميع الأعمار', fr: 'Plaisir pour tous les âges' } },
                    { id: 'luxury', icon: '💎', label: { en: 'Luxury Traveler', ar: 'رحالة فاخر', fr: 'Voyageur de luxe' }, desc: { en: 'Premium experiences only', ar: 'تجارب فاخرة فقط', fr: 'Expériences premium uniquement' } },
                    { id: 'budget', icon: '🎒', label: { en: 'Budget Backpacker', ar: 'رحالة اقتصادي', fr: 'Routard économique' }, desc: { en: 'Smart spending', ar: 'إنفاق ذكي', fr: 'Dépenses intelligentes' } }
                ],
                type: 'single-choice'
            },
            {
                id: 'interests',
                title: { en: 'What interests you most?', ar: 'ما الذي يهمك أكثر؟', fr: 'Qu\'est-ce qui vous intéresse le plus?' },
                subtitle: { en: 'Select all that apply', ar: 'اختر كل ما ينطبق', fr: 'Sélectionnez tout ce qui s\'applique' },
                options: [
                    { id: 'pyramids', icon: '🔺', label: { en: 'Ancient Pyramids', ar: 'الأهرامات القديمة', fr: 'Pyramides anciennes' } },
                    { id: 'temples', icon: '⛩️', label: { en: 'Pharaonic Temples', ar: 'المعابد الفرعونية', fr: 'Temples pharaoniques' } },
                    { id: 'museums', icon: '🏛️', label: { en: 'Museums & Artifacts', ar: 'المتاحف والآثار', fr: 'Musées et artefacts' } },
                    { id: 'beaches', icon: '🏖️', label: { en: 'Red Sea Beaches', ar: 'شواطئ البحر الأحمر', fr: 'Plages de la Mer Rouge' } },
                    { id: 'diving', icon: '🤿', label: { en: 'Diving & Snorkeling', ar: 'الغوص والسنوركل', fr: 'Plongée et snorkeling' } },
                    { id: 'desert', icon: '🏜️', label: { en: 'Desert Adventures', ar: 'مغامرات الصحراء', fr: 'Aventures dans le désert' } },
                    { id: 'nile', icon: '⛵', label: { en: 'Nile Cruises', ar: 'رحلات النيل', fr: 'Croisières sur le Nil' } },
                    { id: 'markets', icon: '🏪', label: { en: 'Local Markets', ar: 'الأسواق المحلية', fr: 'Marchés locaux' } },
                    { id: 'food', icon: '🍲', label: { en: 'Egyptian Cuisine', ar: 'المطبخ المصري', fr: 'Cuisine égyptienne' } },
                    { id: 'nightlife', icon: '🌃', label: { en: 'Nightlife & Events', ar: 'الحياة الليلية', fr: 'Vie nocturne' } }
                ],
                type: 'multi-choice',
                min: 2,
                max: 5
            },
            {
                id: 'budget',
                title: { en: 'What\'s your budget range?', ar: 'ما هو نطاق ميزانيتك؟', fr: 'Quelle est votre fourchette budgétaire?' },
                subtitle: { en: 'Per person for the entire trip', ar: 'للشخص الواحد للرحلة كاملة', fr: 'Par personne pour tout le voyage' },
                options: [
                    { id: 'budget', icon: '💵', label: { en: 'Budget', ar: 'اقتصادي', fr: 'Économique' }, range: '$500-1000', desc: { en: 'Smart spending', ar: 'إنفاق ذكي', fr: 'Dépenses intelligentes' } },
                    { id: 'moderate', icon: '💰', label: { en: 'Moderate', ar: 'متوسط', fr: 'Modéré' }, range: '$1000-2500', desc: { en: 'Comfortable travel', ar: 'سفر مريح', fr: 'Voyage confortable' } },
                    { id: 'premium', icon: '💎', label: { en: 'Premium', ar: 'فاخر', fr: 'Premium' }, range: '$2500-5000', desc: { en: 'Upscale experience', ar: 'تجربة راقية', fr: 'Expérience haut de gamme' } },
                    { id: 'luxury', icon: '👑', label: { en: 'Luxury', ar: 'فخم جداً', fr: 'Luxe' }, range: '$5000+', desc: { en: 'No expense spared', ar: 'بلا حدود', fr: 'Sans limite de dépenses' } }
                ],
                type: 'single-choice'
            },
            {
                id: 'duration',
                title: { en: 'How long will you stay?', ar: 'كم ستبقى؟', fr: 'Combien de temps resterez-vous?' },
                subtitle: { en: 'Choose your trip duration', ar: 'اختر مدة رحلتك', fr: 'Choisissez la durée de votre voyage' },
                options: [
                    { id: 'weekend', icon: '🗓️', label: { en: 'Weekend (2-3 days)', ar: 'عطلة نهاية الأسبوع (2-3 أيام)', fr: 'Week-end (2-3 jours)' } },
                    { id: 'short', icon: '📅', label: { en: 'Short Trip (4-6 days)', ar: 'رحلة قصيرة (4-6 أيام)', fr: 'Court séjour (4-6 jours)' } },
                    { id: 'week', icon: '📆', label: { en: 'One Week (7-9 days)', ar: 'أسبوع (7-9 أيام)', fr: 'Une semaine (7-9 jours)' } },
                    { id: 'extended', icon: '🗓️', label: { en: 'Extended (10-14 days)', ar: 'ممتد (10-14 يوم)', fr: 'Prolongé (10-14 jours)' } },
                    { id: 'long', icon: '📋', label: { en: 'Long Stay (15+ days)', ar: 'إقامة طويلة (15+ يوم)', fr: 'Long séjour (15+ jours)' } }
                ],
                type: 'single-choice'
            },
            {
                id: 'travelers',
                title: { en: 'Who\'s traveling?', ar: 'من سيسافر؟', fr: 'Qui voyage?' },
                subtitle: { en: 'Select your group size', ar: 'اختر حجم مجموعتك', fr: 'Sélectionnez la taille de votre groupe' },
                options: [
                    { id: 'solo', icon: '🧳', label: { en: 'Solo Traveler', ar: 'مسافر منفرد', fr: 'Voyageur solo' }, count: 1 },
                    { id: 'couple', icon: '👫', label: { en: 'Couple', ar: 'زوجان', fr: 'Couple' }, count: 2 },
                    { id: 'small-family', icon: '👨‍👩‍👧', label: { en: 'Small Family (3-4)', ar: 'عائلة صغيرة (3-4)', fr: 'Petite famille (3-4)' }, count: 3.5 },
                    { id: 'large-family', icon: '👨‍👩‍👧‍👦', label: { en: 'Large Family (5+)', ar: 'عائلة كبيرة (5+)', fr: 'Grande famille (5+)' }, count: 6 },
                    { id: 'friends', icon: '👥', label: { en: 'Friends Group', ar: 'مجموعة أصدقاء', fr: 'Groupe d\'amis' }, count: 5 },
                    { id: 'custom', icon: '🔢', label: { en: 'Custom Number', ar: 'عدد مخصص', fr: 'Nombre personnalisé' }, count: null }
                ],
                type: 'single-choice-with-input'
            },
            {
                id: 'accommodation',
                title: { en: 'Where do you prefer to stay?', ar: 'أين تفضل الإقامة؟', fr: 'Où préférez-vous séjourner?' },
                subtitle: { en: 'Choose your accommodation style', ar: 'اختر نمط إقامتك', fr: 'Choisissez votre style d\'hébergement' },
                options: [
                    { id: 'luxury-hotels', icon: '🏨', label: { en: '5-Star Hotels', ar: 'فنادق 5 نجوم', fr: 'Hôtels 5 étoiles' }, priceMultiplier: 2.5 },
                    { id: 'upscale', icon: '🏩', label: { en: '4-Star Hotels', ar: 'فنادق 4 نجوم', fr: 'Hôtels 4 étoiles' }, priceMultiplier: 1.7 },
                    { id: 'mid-range', icon: '🏪', label: { en: '3-Star Hotels', ar: 'فنادق 3 نجوم', fr: 'Hôtels 3 étoiles' }, priceMultiplier: 1.0 },
                    { id: 'budget', icon: '🛏️', label: { en: 'Budget Hotels', ar: 'فنادق اقتصادية', fr: 'Hôtels économiques' }, priceMultiplier: 0.6 },
                    { id: 'hostel', icon: '🎒', label: { en: 'Hostels', ar: 'نزل', fr: 'Auberges' }, priceMultiplier: 0.3 },
                    { id: 'airbnb', icon: '🏠', label: { en: 'Apartments/Airbnb', ar: 'شقق مفروشة', fr: 'Appartements/Airbnb' }, priceMultiplier: 0.8 }
                ],
                type: 'single-choice'
            },
            {
                id: 'season',
                title: { en: 'When are you planning to travel?', ar: 'متى تخطط للسفر؟', fr: 'Quand prévoyez-vous de voyager?' },
                subtitle: { en: 'Select your preferred season', ar: 'اختر موسمك المفضل', fr: 'Sélectionnez votre saison préférée' },
                options: [
                    { id: 'winter', icon: '❄️', label: { en: 'Winter (Dec-Feb)', ar: 'شتاء (ديسمبر-فبراير)', fr: 'Hiver (Déc-Fév)' }, temp: '15-25°C', crowd: 'High' },
                    { id: 'spring', icon: '🌸', label: { en: 'Spring (Mar-May)', ar: 'ربيع (مارس-مايو)', fr: 'Printemps (Mar-Mai)' }, temp: '20-30°C', crowd: 'High' },
                    { id: 'summer', icon: '☀️', label: { en: 'Summer (Jun-Aug)', ar: 'صيف (يونيو-أغسطس)', fr: 'Été (Juin-Août)' }, temp: '30-40°C', crowd: 'Low' },
                    { id: 'autumn', icon: '🍂', label: { en: 'Autumn (Sep-Nov)', ar: 'خريف (سبتمبر-نوفمبر)', fr: 'Automne (Sep-Nov)' }, temp: '25-35°C', crowd: 'Medium' },
                    { id: 'flexible', icon: '📅', label: { en: 'Flexible', ar: 'مرن', fr: 'Flexible' }, temp: 'Anytime', crowd: 'Varies' }
                ],
                type: 'single-choice'
            }
        ];

        return steps[stepIndex];
    }

    // ══════════════════════════════════════════════════════════════
    // UI RENDERING
    // ══════════════════════════════════════════════════════════════

    renderWizard() {
        const container = document.getElementById('plans-cards-container');
        if (!container) return;

        const lang = document.documentElement.lang || 'en';
        const step = this.getStepConfig(this.currentStep);

        container.innerHTML = `
            <div class="wizard-container" data-step="${this.currentStep}">
                <!-- Progress Bar -->
                <div class="wizard-progress">
                    <div class="wizard-progress-bar">
                        <div class="wizard-progress-fill" style="width: ${((this.currentStep + 1) / this.totalSteps) * 100}%"></div>
                    </div>
                    <div class="wizard-progress-text">
                        ${this.currentStep + 1} / ${this.totalSteps}
                    </div>
                </div>

                <!-- Step Content -->
                <div class="wizard-step">
                    <div class="wizard-header">
                        <h2 class="wizard-title">${step.title[lang]}</h2>
                        <p class="wizard-subtitle">${step.subtitle[lang]}</p>
                    </div>

                    <div class="wizard-options ${step.type}">
                        ${this.renderOptions(step, lang)}
                    </div>

                    <!-- Navigation -->
                    <div class="wizard-nav">
                        ${this.currentStep > 0 ? `
                            <button class="wizard-btn wizard-btn-secondary" onclick="travelWizard.previousStep()">
                                <i class="fas fa-arrow-left"></i>
                                ${lang === 'ar' ? 'السابق' : lang === 'fr' ? 'Précédent' : 'Previous'}
                            </button>
                        ` : '<div></div>'}
                        
                        <button class="wizard-btn wizard-btn-primary" 
                                onclick="travelWizard.nextStep()" 
                                ${!this.isStepValid() ? 'disabled' : ''}>
                            ${this.currentStep === this.totalSteps - 1 ? 
                                (lang === 'ar' ? 'إنشاء خطة' : lang === 'fr' ? 'Créer le plan' : 'Create Plan') : 
                                (lang === 'ar' ? 'التالي' : lang === 'fr' ? 'Suivant' : 'Next')}
                            <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>

                <!-- Save Progress -->
                <div class="wizard-save">
                    <button class="wizard-save-btn" onclick="travelWizard.saveProgress()">
                        <i class="fas fa-save"></i>
                        ${lang === 'ar' ? 'حفظ التقدم' : lang === 'fr' ? 'Sauvegarder' : 'Save Progress'}
                    </button>
                </div>
            </div>
        `;
    }

    renderOptions(step, lang) {
        if (step.type === 'single-choice' || step.type === 'single-choice-with-input') {
            return step.options.map(option => `
                <div class="wizard-option ${this.answers[step.id] === option.id ? 'selected' : ''}" 
                     data-option-id="${option.id}"
                     onclick="travelWizard.selectOption('${step.id}', '${option.id}')">
                    <div class="wizard-option-icon">${option.icon}</div>
                    <div class="wizard-option-content">
                        <h3 class="wizard-option-label">${option.label[lang]}</h3>
                        ${option.desc ? `<p class="wizard-option-desc">${option.desc[lang]}</p>` : ''}
                        ${option.range ? `<p class="wizard-option-range">${option.range}</p>` : ''}
                        ${option.temp ? `<p class="wizard-option-temp">🌡️ ${option.temp}</p>` : ''}
                        ${option.crowd ? `<p class="wizard-option-crowd">👥 ${option.crowd} Season</p>` : ''}
                    </div>
                    ${this.answers[step.id] === option.id ? '<i class="fas fa-check-circle wizard-option-check"></i>' : ''}
                </div>
                ${option.id === 'custom' && this.answers[step.id] === 'custom' ? `
                    <div class="wizard-custom-input">
                        <input type="number" 
                               min="1" 
                               max="50" 
                               placeholder="${lang === 'ar' ? 'عدد المسافرين' : lang === 'fr' ? 'Nombre de voyageurs' : 'Number of travelers'}"
                               value="${this.answers.customTravelers || ''}"
                               onchange="travelWizard.setCustomTravelers(this.value)">
                    </div>
                ` : ''}
            `).join('');
        }

        if (step.type === 'multi-choice') {
            return `
                <div class="wizard-multi-info">
                    ${lang === 'ar' ? `اختر من ${step.min} إلى ${step.max} خيارات` : 
                      lang === 'fr' ? `Choisissez de ${step.min} à ${step.max} options` : 
                      `Select ${step.min} to ${step.max} options`}
                    <span class="wizard-multi-count">(${this.answers[step.id].length}/${step.max})</span>
                </div>
                <div class="wizard-options-grid">
                    ${step.options.map(option => `
                        <div class="wizard-option wizard-option-small ${this.answers[step.id].includes(option.id) ? 'selected' : ''}" 
                             data-option-id="${option.id}"
                             onclick="travelWizard.toggleMultiOption('${step.id}', '${option.id}', ${step.min}, ${step.max})">
                            <div class="wizard-option-icon">${option.icon}</div>
                            <div class="wizard-option-label">${option.label[lang]}</div>
                            ${this.answers[step.id].includes(option.id) ? '<i class="fas fa-check-circle wizard-option-check"></i>' : ''}
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }

    // ══════════════════════════════════════════════════════════════
    // USER INTERACTIONS
    // ══════════════════════════════════════════════════════════════

    selectOption(stepId, optionId) {
        this.answers[stepId] = optionId;
        this.renderWizard();
        this.saveProgress();
    }

    toggleMultiOption(stepId, optionId, min, max) {
        if (!this.answers[stepId]) this.answers[stepId] = [];
        
        const index = this.answers[stepId].indexOf(optionId);
        if (index > -1) {
            this.answers[stepId].splice(index, 1);
        } else {
            if (this.answers[stepId].length < max) {
                this.answers[stepId].push(optionId);
            }
        }
        
        this.renderWizard();
        this.saveProgress();
    }

    setCustomTravelers(value) {
        this.answers.customTravelers = parseInt(value);
        this.saveProgress();
    }

    isStepValid() {
        const step = this.getStepConfig(this.currentStep);
        
        if (step.type === 'multi-choice') {
            return this.answers[step.id].length >= step.min && this.answers[step.id].length <= step.max;
        }
        
        if (step.type === 'single-choice-with-input') {
            if (this.answers[step.id] === 'custom') {
                return this.answers.customTravelers > 0;
            }
            return this.answers[step.id] !== null;
        }
        
        return this.answers[step.id] !== null;
    }

    nextStep() {
        if (!this.isStepValid()) return;

        if (this.currentStep < this.totalSteps - 1) {
            this.currentStep++;
            this.renderWizard();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            this.generatePlan();
        }
        
        this.saveProgress();
    }

    previousStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.renderWizard();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // ══════════════════════════════════════════════════════════════
    // INTELLIGENT RECOMMENDATIONS ENGINE
    // ══════════════════════════════════════════════════════════════

    generatePlan() {
        // Calculate recommendations based on answers
        this.recommendations = this.calculateRecommendations();
        
        // Show results page
        this.renderResults();
    }

    calculateRecommendations() {
        const governorates = this.getGovernoratesData();
        const scored = [];

        for (const [key, gov] of Object.entries(governorates)) {
            let score = 0;
            let reasons = [];

            // Travel type matching
            if (this.answers.travelType === 'cultural' && gov.category === 'ancient') {
                score += 30;
                reasons.push('Perfect for cultural exploration');
            }
            if (this.answers.travelType === 'relaxation' && gov.category === 'beach') {
                score += 30;
                reasons.push('Ideal for relaxation');
            }
            if (this.answers.travelType === 'adventure' && gov.category === 'adventure') {
                score += 30;
                reasons.push('Great for adventures');
            }

            // Interest matching
            this.answers.interests.forEach(interest => {
                if (gov.activities.some(act => act.toLowerCase().includes(interest))) {
                    score += 10;
                }
            });

            // Budget matching
            const budgetMatch = this.matchBudget(gov.priceCategory);
            score += budgetMatch;

            // Season matching
            if (this.answers.season !== 'flexible') {
                const seasonalScore = this.matchSeason(gov.bestMonths, this.answers.season);
                score += seasonalScore;
            }

            // Family friendly
            if (this.answers.travelType === 'family' && gov.familyFriendly) {
                score += 20;
                reasons.push('Family-friendly destination');
            }

            if (score > 20) {
                scored.push({
                    ...gov,
                    key,
                    score,
                    reasons
                });
            }
        }

        return scored.sort((a, b) => b.score - a.score).slice(0, 5);
    }

    matchBudget(priceCategory) {
        const budgetMapping = {
            'budget': { 'A': 10, 'B': 20, 'C': 30 },
            'moderate': { 'A': 20, 'B': 30, 'C': 20 },
            'premium': { 'A': 30, 'B': 20, 'C': 10 },
            'luxury': { 'A': 30, 'B': 15, 'C': 5 }
        };

        return budgetMapping[this.answers.budget]?.[priceCategory] || 0;
    }

    matchSeason(bestMonths, selectedSeason) {
        const seasonMonths = {
            'winter': ['Dec', 'Jan', 'Feb'],
            'spring': ['Mar', 'Apr', 'May'],
            'summer': ['Jun', 'Jul', 'Aug'],
            'autumn': ['Sep', 'Oct', 'Nov']
        };

        const overlap = seasonMonths[selectedSeason].filter(m => bestMonths.includes(m));
        return overlap.length * 5;
    }

    // ══════════════════════════════════════════════════════════════
    // RESULTS DISPLAY
    // ══════════════════════════════════════════════════════════════

    renderResults() {
        const container = document.getElementById('plans-cards-container');
        const lang = document.documentElement.lang || 'en';

        const plan = this.buildDetailedPlan();

        container.innerHTML = `
            <div class="wizard-results">
                <div class="results-header">
                    <div class="results-badge">
                        <i class="fas fa-check-circle"></i>
                        ${lang === 'ar' ? 'خطتك جاهزة!' : lang === 'fr' ? 'Votre plan est prêt!' : 'Your Plan is Ready!'}
                    </div>
                    <h2 class="results-title">
                        ${lang === 'ar' ? 'خطة السفر المخصصة لك' : lang === 'fr' ? 'Votre plan de voyage personnalisé' : 'Your Personalized Travel Plan'}
                    </h2>
                    <p class="results-subtitle">
                        ${lang === 'ar' ? 'بناءً على تفضيلاتك، أنشأنا الخطة المثالية لك' : 
                          lang === 'fr' ? 'Basé sur vos préférences, nous avons créé le plan parfait pour vous' : 
                          'Based on your preferences, we\'ve created the perfect plan for you'}
                    </p>
                </div>

                <!-- Plan Summary -->
                <div class="plan-summary">
                    <div class="plan-summary-card">
                        <i class="fas fa-calendar-alt"></i>
                        <div>
                            <span class="plan-summary-label">${lang === 'ar' ? 'المدة' : lang === 'fr' ? 'Durée' : 'Duration'}</span>
                            <span class="plan-summary-value">${plan.durationText[lang]}</span>
                        </div>
                    </div>
                    <div class="plan-summary-card">
                        <i class="fas fa-dollar-sign"></i>
                        <div>
                            <span class="plan-summary-label">${lang === 'ar' ? 'الميزانية' : lang === 'fr' ? 'Budget' : 'Budget'}</span>
                            <span class="plan-summary-value">$${plan.estimatedBudget.toLocaleString()}</span>
                        </div>
                    </div>
                    <div class="plan-summary-card">
                        <i class="fas fa-map-marked-alt"></i>
                        <div>
                            <span class="plan-summary-label">${lang === 'ar' ? 'الوجهات' : lang === 'fr' ? 'Destinations' : 'Destinations'}</span>
                            <span class="plan-summary-value">${this.recommendations.length}</span>
                        </div>
                    </div>
                    <div class="plan-summary-card">
                        <i class="fas fa-users"></i>
                        <div>
                            <span class="plan-summary-label">${lang === 'ar' ? 'المسافرون' : lang === 'fr' ? 'Voyageurs' : 'Travelers'}</span>
                            <span class="plan-summary-value">${plan.travelers}</span>
                        </div>
                    </div>
                </div>

                <!-- Recommendations -->
                <div class="recommendations">
                    <h3 class="recommendations-title">
                        ${lang === 'ar' ? 'الوجهات الموصى بها' : lang === 'fr' ? 'Destinations recommandées' : 'Recommended Destinations'}
                    </h3>
                    <div class="recommendations-grid">
                        ${this.recommendations.map((rec, index) => this.renderRecommendationCard(rec, index, lang)).join('')}
                    </div>
                </div>

                <!-- Actions -->
                <div class="results-actions">
                    <button class="wizard-btn wizard-btn-primary" onclick="travelWizard.exportPDF()">
                        <i class="fas fa-file-pdf"></i>
                        ${lang === 'ar' ? 'تصدير PDF' : lang === 'fr' ? 'Exporter en PDF' : 'Export as PDF'}
                    </button>
                    <button class="wizard-btn wizard-btn-secondary" onclick="travelWizard.savePlan()">
                        <i class="fas fa-bookmark"></i>
                        ${lang === 'ar' ? 'حفظ الخطة' : lang === 'fr' ? 'Sauvegarder le plan' : 'Save Plan'}
                    </button>
                    <button class="wizard-btn wizard-btn-secondary" onclick="travelWizard.sharePlan()">
                        <i class="fas fa-share-alt"></i>
                        ${lang === 'ar' ? 'مشاركة' : lang === 'fr' ? 'Partager' : 'Share'}
                    </button>
                    <button class="wizard-btn wizard-btn-outline" onclick="travelWizard.restart()">
                        <i class="fas fa-redo"></i>
                        ${lang === 'ar' ? 'بدء جديد' : lang === 'fr' ? 'Recommencer' : 'Start Over'}
                    </button>
                </div>
            </div>
        `;
    }

    renderRecommendationCard(rec, index, lang) {
        const translations = window.translations?.[lang] || {};
        const govTranslations = translations.governorates?.[rec.key] || {};

        return `
            <div class="recommendation-card" data-rank="${index + 1}">
                <div class="recommendation-rank">#${index + 1}</div>
                <div class="recommendation-icon">${rec.icon}</div>
                <h4 class="recommendation-name">${govTranslations.name || rec.key}</h4>
                <div class="recommendation-score">
                    <i class="fas fa-star"></i>
                    ${rec.rating}/5
                </div>
                <p class="recommendation-desc">${govTranslations.desc || 'Discover this amazing destination'}</p>
                <div class="recommendation-reasons">
                    ${rec.reasons.slice(0, 2).map(r => `<span class="recommendation-reason">✓ ${r}</span>`).join('')}
                </div>
                <div class="recommendation-details">
                    <span><i class="fas fa-clock"></i> ${rec.estimatedDays}</span>
                    <span><i class="fas fa-users"></i> ${rec.visitors}</span>
                </div>
                <button class="recommendation-btn" onclick="travelWizard.viewDestinationDetails('${rec.key}')">
                    ${lang === 'ar' ? 'عرض التفاصيل' : lang === 'fr' ? 'Voir détails' : 'View Details'}
                </button>
            </div>
        `;
    }

    buildDetailedPlan() {
        const durationMap = {
            'weekend': { days: 2.5, text: { en: '2-3 Days', ar: '2-3 أيام', fr: '2-3 jours' } },
            'short': { days: 5, text: { en: '4-6 Days', ar: '4-6 أيام', fr: '4-6 jours' } },
            'week': { days: 8, text: { en: '7-9 Days', ar: '7-9 أيام', fr: '7-9 jours' } },
            'extended': { days: 12, text: { en: '10-14 Days', ar: '10-14 يوم', fr: '10-14 jours' } },
            'long': { days: 18, text: { en: '15+ Days', ar: '15+ يوم', fr: '15+ jours' } }
        };

        const travelersMap = {
            'solo': 1,
            'couple': 2,
            'small-family': 4,
            'large-family': 6,
            'friends': 5,
            'custom': this.answers.customTravelers || 1
        };

        const budgetBase = {
            'budget': 50,
            'moderate': 100,
            'premium': 200,
            'luxury': 400
        };

        const duration = durationMap[this.answers.duration];
        const travelers = travelersMap[this.answers.travelers];
        const dailyBudget = budgetBase[this.answers.budget];

        return {
            durationText: duration.text,
            travelers,
            estimatedBudget: Math.round(dailyBudget * duration.days * travelers),
            destinations: this.recommendations
        };
    }

    // ══════════════════════════════════════════════════════════════
    // SAVE & EXPORT FUNCTIONS
    // ══════════════════════════════════════════════════════════════

    saveProgress() {
        localStorage.setItem('travelWizardProgress', JSON.stringify({
            currentStep: this.currentStep,
            answers: this.answers,
            timestamp: Date.now()
        }));
    }

    loadProgress() {
        const saved = localStorage.getItem('travelWizardProgress');
        if (saved) {
            const data = JSON.parse(saved);
            // Load if less than 7 days old
            if (Date.now() - data.timestamp < 7 * 24 * 60 * 60 * 1000) {
                this.currentStep = data.currentStep;
                this.answers = data.answers;
            }
        }
    }

    savePlan() {
        const plan = {
            id: Date.now(),
            answers: this.answers,
            recommendations: this.recommendations,
            createdAt: new Date().toISOString()
        };

        this.savedPlans.push(plan);
        localStorage.setItem('savedTravelPlans', JSON.stringify(this.savedPlans));

        alert('Plan saved successfully!');
    }

    loadSavedPlans() {
        const saved = localStorage.getItem('savedTravelPlans');
        return saved ? JSON.parse(saved) : [];
    }

    exportPDF() {
        alert('PDF export will be available soon! This would generate a beautiful travel itinerary PDF.');
        // TODO: Implement PDF generation with jsPDF
    }

    sharePlan() {
        if (navigator.share) {
            navigator.share({
                title: 'My Egypt Travel Plan',
                text: 'Check out my personalized Egypt travel plan!',
                url: window.location.href
            });
        } else {
            alert('Share functionality coming soon!');
        }
    }

    restart() {
        if (confirm('Are you sure you want to start over? Your current progress will be lost.')) {
            this.currentStep = 0;
            this.answers = {
                travelType: null,
                interests: [],
                budget: null,
                duration: null,
                travelers: null,
                accommodation: null,
                season: null
            };
            this.recommendations = [];
            localStorage.removeItem('travelWizardProgress');
            this.renderWizard();
        }
    }

    viewDestinationDetails(key) {
        // Show detailed modal for the destination
        alert(`Detailed information for ${key} coming soon!`);
    }

    // ══════════════════════════════════════════════════════════════
    // EVENT LISTENERS
    // ══════════════════════════════════════════════════════════════

    setupEventListeners() {
        // Listen for language changes
        document.addEventListener('languageChanged', () => {
            if (this.currentStep >= 0) {
                this.renderWizard();
            }
        });
    }

    // ══════════════════════════════════════════════════════════════
    // DATA HELPERS
    // ══════════════════════════════════════════════════════════════

    getGovernoratesData() {
        // Return simplified governorates data
        return window.ADVANCED_GOVERNORATES || {
            cairo: {
                icon: '🏛️',
                category: 'ancient',
                priceCategory: 'A',
                rating: 4.8,
                visitors: '15M+',
                estimatedDays: '3-5',
                familyFriendly: true,
                bestMonths: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
                activities: ['Historical Tours', 'Museum Visits', 'Shopping']
            },
            luxor: {
                icon: '⛩️',
                category: 'ancient',
                priceCategory: 'A',
                rating: 4.9,
                visitors: '7M+',
                estimatedDays: '3-4',
                familyFriendly: true,
                bestMonths: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
                activities: ['Temple Tours', 'Hot Air Balloon', 'Archaeological Sites']
            },
            alexandria: {
                icon: '🌊',
                category: 'beach',
                priceCategory: 'A',
                rating: 4.6,
                visitors: '8M+',
                estimatedDays: '2-3',
                familyFriendly: true,
                bestMonths: ['Mar', 'Apr', 'May', 'Jun', 'Sep', 'Oct'],
                activities: ['Beach Activities', 'Historical Tours', 'Seafood Dining']
            },
            hurghada: {
                icon: '🏖️',
                category: 'beach',
                priceCategory: 'B',
                rating: 4.7,
                visitors: '6M+',
                estimatedDays: '4-7',
                familyFriendly: true,
                bestMonths: ['Mar', 'Apr', 'May', 'Sep', 'Oct', 'Nov'],
                activities: ['Diving', 'Snorkeling', 'Water Sports', 'Desert Safari']
            },
            sharm: {
                icon: '🤿',
                category: 'beach',
                priceCategory: 'B',
                rating: 4.8,
                visitors: '5M+',
                estimatedDays: '4-7',
                familyFriendly: true,
                bestMonths: ['Mar', 'Apr', 'May', 'Sep', 'Oct', 'Nov'],
                activities: ['Diving', 'Snorkeling', 'Beach Relaxation']
            }
        };
    }
}

// ══════════════════════════════════════════════════════════════════
// INITIALIZE ON PAGE LOAD
// ══════════════════════════════════════════════════════════════════

let travelWizard;

document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on the plans section
    const plansSection = document.getElementById('plans');
    if (plansSection) {
        travelWizard = new TravelPlanWizard();
        
        // Render wizard when plans section is shown
        const observer = new MutationObserver(() => {
            if (plansSection.classList.contains('active') || !plansSection.classList.contains('hidden')) {
                travelWizard.renderWizard();
            }
        });
        
        observer.observe(plansSection, { attributes: true, attributeFilter: ['class'] });
        
        // Initial render if already active
        if (plansSection.classList.contains('active')) {
            travelWizard.renderWizard();
        }
    }
});
