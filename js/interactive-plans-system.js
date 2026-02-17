/* ═══════════════════════════════════════════════════════════════════
   INTERACTIVE TRAVEL PLANS SYSTEM - نظام الخطط التفاعلي الجديد
   نظام متطور لإنشاء خطط سفر مخصصة عبر الأسئلة التفاعلية
   
   Features:
   ✓ نظام أسئلة تفاعلي خطوة بخطوة
   ✓ تغطية جميع ال 27 محافظة المصرية
   ✓ توصيات ذكية مبنية على الإجابات
   ✓ حساب ميزانية دقيق
   ✓ خطة سفر مفصلة وجاهزة للتنفيذ
   ✓ حفظ وتصدير الخطط
   ═══════════════════════════════════════════════════════════════════ */

class InteractivePlansSystem {
    constructor() {
        // بيانات جميع المحافظات المصرية ال 27
        this.governorates = {
            // محافظات القاهرة الكبرى
            'Cairo': {
                nameAr: 'القاهرة',
                nameFr: 'Le Caire',
                region: 'Greater Cairo',
                highlights: ['Egyptian Museum', 'Khan El-Khalili', 'Citadel of Cairo', 'Al-Azhar Mosque'],
                bestFor: ['culture', 'history', 'shopping', 'nightlife'],
                avgCost: { budget: 800, moderate: 1500, luxury: 3500 },
                emoji: '🏛️'
            },
            'Giza': {
                nameAr: 'الجيزة',
                nameFr: 'Gizeh',
                region: 'Greater Cairo',
                highlights: ['Pyramids of Giza', 'Sphinx', 'Grand Egyptian Museum', 'Saqqara'],
                bestFor: ['ancient', 'history', 'photography', 'wonder'],
                avgCost: { budget: 900, moderate: 1700, luxury: 4000 },
                emoji: '🔺'
            },
            'Qalyubia': {
                nameAr: 'القليوبية',
                nameFr: 'Qalyubia',
                region: 'Greater Cairo',
                highlights: ['Banha', 'Qanater El-Khayreya', 'Agricultural lands'],
                bestFor: ['nature', 'peaceful', 'agriculture'],
                avgCost: { budget: 600, moderate: 1200, luxury: 2500 },
                emoji: '🌾'
            },
            
            // محافظات الدلتا
            'Alexandria': {
                nameAr: 'الإسكندرية',
                nameFr: 'Alexandrie',
                region: 'Mediterranean',
                highlights: ['Bibliotheca Alexandrina', 'Qaitbay Citadel', 'Montaza Palace', 'Mediterranean Beaches'],
                bestFor: ['beaches', 'history', 'mediterranean', 'culture'],
                avgCost: { budget: 850, moderate: 1600, luxury: 3800 },
                emoji: '🌊'
            },
            'Beheira': {
                nameAr: 'البحيرة',
                nameFr: 'Beheira',
                region: 'Delta',
                highlights: ['Rashid (Rosetta)', 'Lake Burullus', 'Agricultural heritage'],
                bestFor: ['nature', 'lakes', 'peaceful', 'birdwatching'],
                avgCost: { budget: 650, moderate: 1300, luxury: 2800 },
                emoji: '🦢'
            },
            'Kafr El Sheikh': {
                nameAr: 'كفر الشيخ',
                nameFr: 'Kafr El Sheikh',
                region: 'Delta',
                highlights: ['Lake Burullus National Park', 'Agricultural lands', 'Traditional villages'],
                bestFor: ['nature', 'birds', 'agriculture', 'peaceful'],
                avgCost: { budget: 600, moderate: 1200, luxury: 2600 },
                emoji: '🦆'
            },
            'Gharbia': {
                nameAr: 'الغربية',
                nameFr: 'Gharbia',
                region: 'Delta',
                highlights: ['Tanta', 'Al-Ahmadi Mosque', 'Cotton fields'],
                bestFor: ['culture', 'festivals', 'agriculture'],
                avgCost: { budget: 650, moderate: 1250, luxury: 2700 },
                emoji: '🕌'
            },
            'Monufia': {
                nameAr: 'المنوفية',
                nameFr: 'Monufia',
                region: 'Delta',
                highlights: ['Shibin El Kom', 'Agricultural heritage', 'Traditional markets'],
                bestFor: ['culture', 'traditional', 'peaceful'],
                avgCost: { budget: 600, moderate: 1200, luxury: 2600 },
                emoji: '🌾'
            },
            'Dakahlia': {
                nameAr: 'الدقهلية',
                nameFr: 'Dakahlia',
                region: 'Delta',
                highlights: ['Mansoura', 'Lake Manzala', 'Nile branches'],
                bestFor: ['nature', 'culture', 'water', 'peaceful'],
                avgCost: { budget: 700, moderate: 1350, luxury: 2900 },
                emoji: '🏞️'
            },
            'Damietta': {
                nameAr: 'دمياط',
                nameFr: 'Damiette',
                region: 'Mediterranean',
                highlights: ['Mediterranean beaches', 'Furniture crafts', 'Nile Delta mouth'],
                bestFor: ['beaches', 'crafts', 'seafood', 'peaceful'],
                avgCost: { budget: 750, moderate: 1400, luxury: 3000 },
                emoji: '🪑'
            },
            'Sharqia': {
                nameAr: 'الشرقية',
                nameFr: 'Sharqia',
                region: 'Delta',
                highlights: ['Zagazig', 'Tell Basta', 'Ancient Bubastis'],
                bestFor: ['history', 'ancient', 'culture'],
                avgCost: { budget: 650, moderate: 1300, luxury: 2800 },
                emoji: '🏛️'
            },
            'Port Said': {
                nameAr: 'بورسعيد',
                nameFr: 'Port Saïd',
                region: 'Canal',
                highlights: ['Suez Canal', 'Port Said National Museum', 'Mediterranean beaches'],
                bestFor: ['beaches', 'history', 'port', 'seafood'],
                avgCost: { budget: 800, moderate: 1500, luxury: 3200 },
                emoji: '⚓'
            },
            'Ismailia': {
                nameAr: 'الإسماعيلية',
                nameFr: 'Ismaïlia',
                region: 'Canal',
                highlights: ['Suez Canal', 'Lake Timsah', 'De Lesseps House'],
                bestFor: ['water', 'history', 'peaceful', 'gardens'],
                avgCost: { budget: 750, moderate: 1450, luxury: 3100 },
                emoji: '🚢'
            },
            'Suez': {
                nameAr: 'السويس',
                nameFr: 'Suez',
                region: 'Canal',
                highlights: ['Suez Canal', 'Port activities', 'Red Sea access'],
                bestFor: ['canal', 'port', 'maritime', 'history'],
                avgCost: { budget: 750, moderate: 1400, luxury: 3000 },
                emoji: '⛴️'
            },
            
            // محافظات الصعيد
            'Giza': {
                nameAr: 'الجيزة',
                nameFr: 'Gizeh',
                region: 'Greater Cairo',
                highlights: ['Pyramids', 'Sphinx', 'Grand Egyptian Museum'],
                bestFor: ['ancient', 'wonders', 'history'],
                avgCost: { budget: 900, moderate: 1700, luxury: 4000 },
                emoji: '🔺'
            },
            'Fayoum': {
                nameAr: 'الفيوم',
                nameFr: 'Fayoum',
                region: 'Upper Egypt',
                highlights: ['Wadi El-Hitan', 'Lake Qarun', 'Waterwheels', 'Wadi El-Rayan'],
                bestFor: ['nature', 'desert', 'fossils', 'lakes'],
                avgCost: { budget: 700, moderate: 1350, luxury: 3000 },
                emoji: '🏜️'
            },
            'Beni Suef': {
                nameAr: 'بني سويف',
                nameFr: 'Beni Suef',
                region: 'Upper Egypt',
                highlights: ['Meidum Pyramid', 'Nile views', 'Agricultural areas'],
                bestFor: ['history', 'peaceful', 'nature'],
                avgCost: { budget: 650, moderate: 1250, luxury: 2700 },
                emoji: '🌾'
            },
            'Minya': {
                nameAr: 'المنيا',
                nameFr: 'Minya',
                region: 'Upper Egypt',
                highlights: ['Beni Hassan tombs', 'Tell el-Amarna', 'Tuna el-Gebel'],
                bestFor: ['ancient', 'history', 'archaeology'],
                avgCost: { budget: 700, moderate: 1300, luxury: 2800 },
                emoji: '🏛️'
            },
            'Asyut': {
                nameAr: 'أسيوط',
                nameFr: 'Assiout',
                region: 'Upper Egypt',
                highlights: ['Ancient tombs', 'Coptic monasteries', 'Traditional crafts'],
                bestFor: ['history', 'culture', 'crafts'],
                avgCost: { budget: 650, moderate: 1250, luxury: 2700 },
                emoji: '⛪'
            },
            'Sohag': {
                nameAr: 'سوهاج',
                nameFr: 'Sohag',
                region: 'Upper Egypt',
                highlights: ['Abydos Temple', 'Red Monastery', 'White Monastery'],
                bestFor: ['ancient', 'religious', 'history'],
                avgCost: { budget: 700, moderate: 1300, luxury: 2900 },
                emoji: '🏛️'
            },
            'Qena': {
                nameAr: 'قنا',
                nameFr: 'Qena',
                region: 'Upper Egypt',
                highlights: ['Dendera Temple', 'Ancient sites', 'Nile scenery'],
                bestFor: ['ancient', 'temples', 'history'],
                avgCost: { budget: 750, moderate: 1400, luxury: 3100 },
                emoji: '⛩️'
            },
            'Luxor': {
                nameAr: 'الأقصر',
                nameFr: 'Louxor',
                region: 'Upper Egypt',
                highlights: ['Valley of the Kings', 'Karnak Temple', 'Luxor Temple', 'Hot air balloons'],
                bestFor: ['ancient', 'history', 'temples', 'pharaonic'],
                avgCost: { budget: 1000, moderate: 2000, luxury: 5000 },
                emoji: '👑'
            },
            'Aswan': {
                nameAr: 'أسوان',
                nameFr: 'Assouan',
                region: 'Upper Egypt',
                highlights: ['Abu Simbel', 'Philae Temple', 'Nubian villages', 'Nile cruises'],
                bestFor: ['ancient', 'nubian', 'cruises', 'peaceful'],
                avgCost: { budget: 950, moderate: 1900, luxury: 4500 },
                emoji: '⛵'
            },
            
            // البحر الأحمر وسيناء
            'Red Sea': {
                nameAr: 'البحر الأحمر',
                nameFr: 'Mer Rouge',
                region: 'Red Sea',
                highlights: ['Hurghada', 'Marsa Alam', 'Diving', 'Coral reefs', 'Desert safari'],
                bestFor: ['beaches', 'diving', 'snorkeling', 'luxury'],
                avgCost: { budget: 1000, moderate: 2200, luxury: 5500 },
                emoji: '🤿'
            },
            'South Sinai': {
                nameAr: 'جنوب سيناء',
                nameFr: 'Sinaï du Sud',
                region: 'Sinai',
                highlights: ['Sharm El Sheikh', 'Dahab', 'St. Catherine', 'Ras Muhammad', 'Colored Canyon'],
                bestFor: ['beaches', 'diving', 'mountains', 'religious'],
                avgCost: { budget: 1100, moderate: 2300, luxury: 6000 },
                emoji: '🏖️'
            },
            'North Sinai': {
                nameAr: 'شمال سيناء',
                nameFr: 'Sinaï du Nord',
                region: 'Sinai',
                highlights: ['Al-Arish', 'Mediterranean beaches', 'Palm groves'],
                bestFor: ['beaches', 'peaceful', 'nature'],
                avgCost: { budget: 700, moderate: 1400, luxury: 3000 },
                emoji: '🌴'
            },
            
            // الصحراء الغربية
            'Matrouh': {
                nameAr: 'مطروح',
                nameFr: 'Matrouh',
                region: 'Western Desert',
                highlights: ['Marsa Matrouh', 'Siwa Oasis', 'Cleopatra Beach', 'WWII sites'],
                bestFor: ['beaches', 'oasis', 'desert', 'history'],
                avgCost: { budget: 850, moderate: 1700, luxury: 4000 },
                emoji: '🏝️'
            },
            'New Valley': {
                nameAr: 'الوادي الجديد',
                nameFr: 'Nouvelle Vallée',
                region: 'Western Desert',
                highlights: ['Kharga Oasis', 'Dakhla Oasis', 'White Desert', 'Hot springs'],
                bestFor: ['desert', 'oasis', 'adventure', 'nature'],
                avgCost: { budget: 800, moderate: 1600, luxury: 3800 },
                emoji: '🏜️'
            }
        };

        // حالة النظام
        this.state = {
            currentStep: 0,
            answers: {},
            recommendations: [],
            finalPlan: null
        };

        // خطوات الأسئلة
        this.questions = [
            {
                id: 'travelStyle',
                type: 'single',
                required: true
            },
            {
                id: 'interests',
                type: 'multiple',
                min: 2,
                max: 5,
                required: true
            },
            {
                id: 'budget',
                type: 'single',
                required: true
            },
            {
                id: 'duration',
                type: 'single',
                required: true
            },
            {
                id: 'season',
                type: 'single',
                required: true
            },
            {
                id: 'travelers',
                type: 'single',
                required: true
            },
            {
                id: 'accommodation',
                type: 'single',
                required: true
            }
        ];

        this.init();
    }

    init() {
        console.log('🎯 Interactive Plans System initialized');
        this.setupEventListeners();
    }

    setupEventListeners() {
        // سيتم إضافة مستمعي الأحداث
    }

    // بدء معالج الخطط
    start() {
        this.state.currentStep = 0;
        this.state.answers = {};
        this.renderQuestion();
    }

    renderQuestion() {
        const question = this.questions[this.state.currentStep];
        const container = document.getElementById('plans-cards-container');
        
        if (!container) {
            console.error('Plans container not found');
            return;
        }

        const currentLang = window.currentLanguage || 'en';
        const questionData = this.getQuestionData(question.id, currentLang);

        container.innerHTML = this.generateQuestionHTML(question, questionData, currentLang);
        this.attachQuestionListeners(question);
        this.updateProgressBar();
    }

    getQuestionData(questionId, lang) {
        const questions = {
            travelStyle: {
                title: {
                    en: 'What\'s your travel style?',
                    ar: 'ما هو أسلوب سفرك؟',
                    fr: 'Quel est votre style de voyage?'
                },
                subtitle: {
                    en: 'Choose the option that best describes you',
                    ar: 'اختر الخيار الذي يناسبك أكثر',
                    fr: 'Choisissez l\'option qui vous décrit le mieux'
                },
                options: [
                    {
                        id: 'adventure',
                        icon: '🏔️',
                        label: { en: 'Adventure Seeker', ar: 'باحث عن المغامرة', fr: 'Aventurier' },
                        desc: { en: 'Thrilling experiences and outdoor activities', ar: 'تجارب مثيرة وأنشطة خارجية', fr: 'Expériences palpitantes' }
                    },
                    {
                        id: 'culture',
                        icon: '🏛️',
                        label: { en: 'Culture Enthusiast', ar: 'محب الثقافة', fr: 'Passionné de culture' },
                        desc: { en: 'Ancient history and archaeological sites', ar: 'التاريخ القديم والمواقع الأثرية', fr: 'Histoire ancienne et sites' }
                    },
                    {
                        id: 'relaxation',
                        icon: '🏖️',
                        label: { en: 'Beach Lover', ar: 'محب الشواطئ', fr: 'Amateur de plage' },
                        desc: { en: 'Sun, sea, and relaxation', ar: 'شمس وبحر واسترخاء', fr: 'Soleil, mer et détente' }
                    },
                    {
                        id: 'family',
                        icon: '👨‍👩‍👧‍👦',
                        label: { en: 'Family Vacation', ar: 'عطلة عائلية', fr: 'Vacances en famille' },
                        desc: { en: 'Activities for all ages', ar: 'أنشطة لجميع الأعمار', fr: 'Activités pour tous' }
                    },
                    {
                        id: 'luxury',
                        icon: '💎',
                        label: { en: 'Luxury Traveler', ar: 'مسافر فاخر', fr: 'Voyageur de luxe' },
                        desc: { en: 'Premium experiences only', ar: 'تجارب فاخرة فقط', fr: 'Expériences premium' }
                    },
                    {
                        id: 'budget',
                        icon: '🎒',
                        label: { en: 'Budget Explorer', ar: 'مستكشف اقتصادي', fr: 'Explorateur économique' },
                        desc: { en: 'Value for money', ar: 'قيمة مقابل المال', fr: 'Bon rapport qualité-prix' }
                    }
                ]
            },
            interests: {
                title: {
                    en: 'What interests you most?',
                    ar: 'ما الذي يثير اهتمامك أكثر؟',
                    fr: 'Qu\'est-ce qui vous intéresse le plus?'
                },
                subtitle: {
                    en: 'Select 2-5 options',
                    ar: 'اختر من 2 إلى 5 خيارات',
                    fr: 'Sélectionnez 2 à 5 options'
                },
                options: [
                    { id: 'pyramids', icon: '🔺', label: { en: 'Ancient Pyramids', ar: 'الأهرامات', fr: 'Pyramides' } },
                    { id: 'temples', icon: '⛩️', label: { en: 'Pharaonic Temples', ar: 'المعابد الفرعونية', fr: 'Temples pharaoniques' } },
                    { id: 'museums', icon: '🏛️', label: { en: 'Museums', ar: 'المتاحف', fr: 'Musées' } },
                    { id: 'beaches', icon: '🏖️', label: { en: 'Beaches', ar: 'الشواطئ', fr: 'Plages' } },
                    { id: 'diving', icon: '🤿', label: { en: 'Diving', ar: 'الغوص', fr: 'Plongée' } },
                    { id: 'desert', icon: '🏜️', label: { en: 'Desert', ar: 'الصحراء', fr: 'Désert' } },
                    { id: 'nile', icon: '⛵', label: { en: 'Nile Cruises', ar: 'رحلات النيل', fr: 'Croisières sur le Nil' } },
                    { id: 'oasis', icon: '🌴', label: { en: 'Oases', ar: 'الواحات', fr: 'Oasis' } },
                    { id: 'food', icon: '🍲', label: { en: 'Egyptian Food', ar: 'الطعام المصري', fr: 'Cuisine égyptienne' } },
                    { id: 'shopping', icon: '🛍️', label: { en: 'Shopping', ar: 'التسوق', fr: 'Shopping' } }
                ]
            },
            budget: {
                title: {
                    en: 'What\'s your budget per person?',
                    ar: 'ما هي ميزانيتك للشخص الواحد؟',
                    fr: 'Quel est votre budget par personne?'
                },
                subtitle: {
                    en: 'For the entire trip',
                    ar: 'للرحلة كاملة',
                    fr: 'Pour tout le voyage'
                },
                options: [
                    {
                        id: 'budget',
                        icon: '💵',
                        label: { en: 'Budget', ar: 'اقتصادي', fr: 'Économique' },
                        range: { en: '$500-1000', ar: '500-1000 دولار', fr: '500-1000$' }
                    },
                    {
                        id: 'moderate',
                        icon: '💰',
                        label: { en: 'Moderate', ar: 'متوسط', fr: 'Modéré' },
                        range: { en: '$1000-2500', ar: '1000-2500 دولار', fr: '1000-2500$' }
                    },
                    {
                        id: 'premium',
                        icon: '💎',
                        label: { en: 'Premium', ar: 'مميز', fr: 'Premium' },
                        range: { en: '$2500-5000', ar: '2500-5000 دولار', fr: '2500-5000$' }
                    },
                    {
                        id: 'luxury',
                        icon: '👑',
                        label: { en: 'Luxury', ar: 'فاخر', fr: 'Luxe' },
                        range: { en: '$5000+', ar: '5000+ دولار', fr: '5000+$' }
                    }
                ]
            },
            duration: {
                title: {
                    en: 'How long is your trip?',
                    ar: 'كم مدة رحلتك؟',
                    fr: 'Quelle est la durée de votre voyage?'
                },
                subtitle: {
                    en: 'Number of days',
                    ar: 'عدد الأيام',
                    fr: 'Nombre de jours'
                },
                options: [
                    { id: '3-5', icon: '📅', label: { en: '3-5 Days', ar: '3-5 أيام', fr: '3-5 jours' } },
                    { id: '6-10', icon: '📅', label: { en: '6-10 Days', ar: '6-10 أيام', fr: '6-10 jours' } },
                    { id: '11-14', icon: '📅', label: { en: '11-14 Days', ar: '11-14 يوم', fr: '11-14 jours' } },
                    { id: '15+', icon: '📅', label: { en: '15+ Days', ar: '15+ يوم', fr: '15+ jours' } }
                ]
            },
            season: {
                title: {
                    en: 'When are you planning to visit?',
                    ar: 'متى تخطط للزيارة؟',
                    fr: 'Quand prévoyez-vous de visiter?'
                },
                subtitle: {
                    en: 'Best season for your trip',
                    ar: 'أفضل موسم لرحلتك',
                    fr: 'Meilleure saison pour votre voyage'
                },
                options: [
                    { id: 'winter', icon: '❄️', label: { en: 'Winter (Dec-Feb)', ar: 'شتاء (ديسمبر-فبراير)', fr: 'Hiver (Déc-Fév)' } },
                    { id: 'spring', icon: '🌸', label: { en: 'Spring (Mar-May)', ar: 'ربيع (مارس-مايو)', fr: 'Printemps (Mar-Mai)' } },
                    { id: 'summer', icon: '☀️', label: { en: 'Summer (Jun-Aug)', ar: 'صيف (يونيو-أغسطس)', fr: 'Été (Jun-Aoû)' } },
                    { id: 'autumn', icon: '🍂', label: { en: 'Autumn (Sep-Nov)', ar: 'خريف (سبتمبر-نوفمبر)', fr: 'Automne (Sep-Nov)' } }
                ]
            },
            travelers: {
                title: {
                    en: 'How many people are traveling?',
                    ar: 'كم عدد المسافرين؟',
                    fr: 'Combien de personnes voyagent?'
                },
                subtitle: {
                    en: 'Group size',
                    ar: 'حجم المجموعة',
                    fr: 'Taille du groupe'
                },
                options: [
                    { id: 'solo', icon: '🧍', label: { en: 'Solo', ar: 'فردي', fr: 'Solo' } },
                    { id: 'couple', icon: '👫', label: { en: 'Couple', ar: 'زوجان', fr: 'Couple' } },
                    { id: 'family', icon: '👨‍👩‍👧‍👦', label: { en: 'Family (3-5)', ar: 'عائلة (3-5)', fr: 'Famille (3-5)' } },
                    { id: 'group', icon: '👥', label: { en: 'Group (6+)', ar: 'مجموعة (6+)', fr: 'Groupe (6+)' } }
                ]
            },
            accommodation: {
                title: {
                    en: 'What type of accommodation do you prefer?',
                    ar: 'ما نوع الإقامة التي تفضلها؟',
                    fr: 'Quel type d\'hébergement préférez-vous?'
                },
                subtitle: {
                    en: 'Choose your comfort level',
                    ar: 'اختر مستوى راحتك',
                    fr: 'Choisissez votre niveau de confort'
                },
                options: [
                    { id: 'hostel', icon: '🏠', label: { en: 'Hostels', ar: 'نزل', fr: 'Auberges' } },
                    { id: '3star', icon: '⭐⭐⭐', label: { en: '3-Star Hotels', ar: 'فنادق 3 نجوم', fr: 'Hôtels 3 étoiles' } },
                    { id: '4star', icon: '⭐⭐⭐⭐', label: { en: '4-Star Hotels', ar: 'فنادق 4 نجوم', fr: 'Hôtels 4 étoiles' } },
                    { id: '5star', icon: '⭐⭐⭐⭐⭐', label: { en: '5-Star Hotels', ar: 'فنادق 5 نجوم', fr: 'Hôtels 5 étoiles' } },
                    { id: 'resort', icon: '🏝️', label: { en: 'Resorts', ar: 'منتجعات', fr: 'Resorts' } }
                ]
            }
        };

        return questions[questionId] || {};
    }

    generateQuestionHTML(question, data, lang) {
        const progress = ((this.state.currentStep + 1) / this.questions.length * 100).toFixed(0);
        
        let html = `
            <div class="interactive-plans-wizard">
                <!-- شريط التقدم -->
                <div class="wizard-progress-container">
                    <div class="wizard-progress-bar">
                        <div class="wizard-progress-fill" style="width: ${progress}%"></div>
                    </div>
                    <div class="wizard-progress-text">
                        <span>${this.state.currentStep + 1} / ${this.questions.length}</span>
                    </div>
                </div>

                <!-- رأس السؤال -->
                <div class="wizard-question-header">
                    <h2 class="wizard-question-title">${data.title[lang]}</h2>
                    <p class="wizard-question-subtitle">${data.subtitle[lang]}</p>
                </div>

                <!-- خيارات السؤال -->
                <div class="wizard-options ${question.type === 'multiple' ? 'multiple-choice' : 'single-choice'}">
        `;

        // إضافة الخيارات
        data.options.forEach(option => {
            const isSelected = question.type === 'multiple' 
                ? (this.state.answers[question.id] || []).includes(option.id)
                : this.state.answers[question.id] === option.id;

            html += `
                <div class="wizard-option ${isSelected ? 'selected' : ''}" data-option-id="${option.id}">
                    <div class="wizard-option-icon">${option.icon}</div>
                    <div class="wizard-option-content">
                        <div class="wizard-option-label">${option.label[lang]}</div>
                        ${option.desc ? `<div class="wizard-option-desc">${option.desc[lang]}</div>` : ''}
                        ${option.range ? `<div class="wizard-option-range">${option.range[lang]}</div>` : ''}
                    </div>
                    ${question.type === 'multiple' ? '<div class="wizard-option-check">✓</div>' : ''}
                </div>
            `;
        });

        html += `
                </div>

                <!-- أزرار التنقل -->
                <div class="wizard-navigation">
                    ${this.state.currentStep > 0 ? `
                        <button class="wizard-btn wizard-btn-back" onclick="interactivePlans.previousQuestion()">
                            <i class="fas fa-arrow-left"></i>
                            <span data-translate="common.back">${lang === 'ar' ? 'السابق' : lang === 'fr' ? 'Précédent' : 'Back'}</span>
                        </button>
                    ` : '<div></div>'}
                    
                    <button class="wizard-btn wizard-btn-next" onclick="interactivePlans.nextQuestion()" ${!this.isStepValid(question) ? 'disabled' : ''}>
                        <span data-translate="common.next">${this.state.currentStep === this.questions.length - 1 ? (lang === 'ar' ? 'إنشاء الخطة' : lang === 'fr' ? 'Créer le plan' : 'Create Plan') : (lang === 'ar' ? 'التالي' : lang === 'fr' ? 'Suivant' : 'Next')}</span>
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;

        return html;
    }

    attachQuestionListeners(question) {
        const options = document.querySelectorAll('.wizard-option');
        
        options.forEach(option => {
            option.addEventListener('click', () => {
                const optionId = option.dataset.optionId;
                
                if (question.type === 'single') {
                    // اختيار واحد فقط
                    options.forEach(opt => opt.classList.remove('selected'));
                    option.classList.add('selected');
                    this.state.answers[question.id] = optionId;
                } else {
                    // اختيارات متعددة
                    if (!this.state.answers[question.id]) {
                        this.state.answers[question.id] = [];
                    }
                    
                    if (option.classList.contains('selected')) {
                        option.classList.remove('selected');
                        const index = this.state.answers[question.id].indexOf(optionId);
                        if (index > -1) {
                            this.state.answers[question.id].splice(index, 1);
                        }
                    } else {
                        if (this.state.answers[question.id].length < (question.max || 999)) {
                            option.classList.add('selected');
                            this.state.answers[question.id].push(optionId);
                        }
                    }
                }
                
                // تحديث حالة زر التالي
                const nextBtn = document.querySelector('.wizard-btn-next');
                if (nextBtn) {
                    nextBtn.disabled = !this.isStepValid(question);
                }
            });
        });
    }

    isStepValid(question) {
        const answer = this.state.answers[question.id];
        
        if (question.type === 'single') {
            return answer !== undefined && answer !== null;
        } else {
            return Array.isArray(answer) && 
                   answer.length >= (question.min || 1) && 
                   answer.length <= (question.max || 999);
        }
    }

    nextQuestion() {
        if (this.state.currentStep < this.questions.length - 1) {
            this.state.currentStep++;
            this.renderQuestion();
            this.saveProgress();
        } else {
            this.generatePlan();
        }
    }

    previousQuestion() {
        if (this.state.currentStep > 0) {
            this.state.currentStep--;
            this.renderQuestion();
        }
    }

    updateProgressBar() {
        const progressFill = document.querySelector('.wizard-progress-fill');
        if (progressFill) {
            const progress = ((this.state.currentStep + 1) / this.questions.length * 100);
            progressFill.style.width = `${progress}%`;
        }
    }

    generatePlan() {
        console.log('🎯 Generating personalized plan...', this.state.answers);
        
        // تحليل الإجابات وإنشاء التوصيات
        const recommendations = this.analyzeAnswers();
        this.state.recommendations = recommendations;
        
        // عرض الخطة النهائية
        this.displayFinalPlan(recommendations);
    }

    analyzeAnswers() {
        const answers = this.state.answers;
        const recommendations = [];
        
        // تحليل الإجابات لإيجاد أفضل المحافظات
        Object.entries(this.governorates).forEach(([key, gov]) => {
            let score = 0;
            
            // تسجيل بناءً على الاهتمامات
            if (answers.interests) {
                answers.interests.forEach(interest => {
                    if (gov.bestFor.includes(interest) || 
                        gov.highlights.some(h => h.toLowerCase().includes(interest))) {
                        score += 20;
                    }
                });
            }
            
            // تسجيل بناءً على الميزانية
            if (answers.budget) {
                const budgetLevel = answers.budget;
                const govCost = gov.avgCost[budgetLevel];
                if (govCost) {
                    score += 10;
                }
            }
            
            // تسجيل بناءً على نوع السفر
            if (answers.travelStyle) {
                if (gov.bestFor.includes(answers.travelStyle)) {
                    score += 15;
                }
            }
            
            if (score > 0) {
                recommendations.push({
                    governorate: key,
                    data: gov,
                    score: score
                });
            }
        });
        
        // ترتيب حسب الدرجة
        recommendations.sort((a, b) => b.score - a.score);
        
        // أخذ أفضل 5 محافظات
        return recommendations.slice(0, 5);
    }

    displayFinalPlan(recommendations) {
        const container = document.getElementById('plans-cards-container');
        const lang = window.currentLanguage || 'en';
        
        let html = `
            <div class="final-plan-container">
                <div class="final-plan-header">
                    <div class="success-icon">✨</div>
                    <h2 class="final-plan-title">
                        ${lang === 'ar' ? 'خطتك السياحية الشخصية جاهزة!' : 
                          lang === 'fr' ? 'Votre plan touristique personnalisé est prêt!' : 
                          'Your Personalized Travel Plan is Ready!'}
                    </h2>
                    <p class="final-plan-subtitle">
                        ${lang === 'ar' ? 'بناءً على تفضيلاتك، هذه أفضل الوجهات لك' : 
                          lang === 'fr' ? 'Basé sur vos préférences, voici les meilleures destinations' : 
                          'Based on your preferences, here are the best destinations for you'}
                    </p>
                </div>

                <div class="recommended-governorates">
        `;
        
        recommendations.forEach((rec, index) => {
            const gov = rec.data;
            const govName = lang === 'ar' ? gov.nameAr : lang === 'fr' ? gov.nameFr : rec.governorate;
            const budgetCost = gov.avgCost[this.state.answers.budget] || gov.avgCost.moderate;
            
            html += `
                <div class="recommended-gov-card" data-gov="${rec.governorate}">
                    <div class="rec-badge">#${index + 1}</div>
                    <div class="rec-emoji">${gov.emoji}</div>
                    <h3 class="rec-gov-name">${govName}</h3>
                    <p class="rec-gov-region">${gov.region}</p>
                    
                    <div class="rec-highlights">
                        ${gov.highlights.slice(0, 3).map(h => `
                            <span class="rec-highlight">✓ ${h}</span>
                        `).join('')}
                    </div>
                    
                    <div class="rec-budget">
                        <span class="rec-budget-label">
                            ${lang === 'ar' ? 'التكلفة المقدرة' : lang === 'fr' ? 'Coût estimé' : 'Estimated Cost'}:
                        </span>
                        <span class="rec-budget-value">$${budgetCost}</span>
                    </div>
                    
                    <button class="rec-view-details" onclick="interactivePlans.showGovernorateDetails('${rec.governorate}')">
                        ${lang === 'ar' ? 'عرض التفاصيل' : lang === 'fr' ? 'Voir les détails' : 'View Details'}
                    </button>
                </div>
            `;
        });
        
        html += `
                </div>

                <div class="final-plan-actions">
                    <button class="plan-action-btn save-plan" onclick="interactivePlans.savePlan()">
                        <i class="fas fa-save"></i>
                        ${lang === 'ar' ? 'حفظ الخطة' : lang === 'fr' ? 'Enregistrer' : 'Save Plan'}
                    </button>
                    <button class="plan-action-btn export-plan" onclick="interactivePlans.exportPlan()">
                        <i class="fas fa-download"></i>
                        ${lang === 'ar' ? 'تصدير PDF' : lang === 'fr' ? 'Exporter PDF' : 'Export PDF'}
                    </button>
                    <button class="plan-action-btn start-over" onclick="interactivePlans.start()">
                        <i class="fas fa-redo"></i>
                        ${lang === 'ar' ? 'ابدأ من جديد' : lang === 'fr' ? 'Recommencer' : 'Start Over'}
                    </button>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
    }

    showGovernorateDetails(govKey) {
        const gov = this.governorates[govKey];
        const lang = window.currentLanguage || 'en';
        const govName = lang === 'ar' ? gov.nameAr : lang === 'fr' ? gov.nameFr : govKey;
        
        // يمكن فتح مودال أو الانتقال لصفحة تفاصيل
        alert(`Details for ${govName} - Coming soon!`);
    }

    async savePlan() {
        const lang = window.currentLanguage || 'en';
        
        // Show loading
        const saveBtn = document.querySelector('.save-plan');
        if (saveBtn) {
            saveBtn.disabled = true;
            saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + 
                (lang === 'ar' ? 'جاري إنشاء الخطة الذكية...' : 'Creating smart plan...');
        }
        
        try {
            // Get first recommendation as main destination
            const mainDestination = this.state.recommendations[0];
            
            // Create basic plan data
            const basicPlanData = {
                governorate: mainDestination.governorate,
                duration: this.state.answers.duration || 3,
                budget: this.state.answers.budget || 'moderate',
                travelers: this.state.answers.travelers || 1,
                interests: this.state.answers.interests || [],
                answers: this.state.answers
            };
            
            // Create Smart Plan with Weather + AI
            let smartPlan = null;
            if (window.createSmartPlan) {
                smartPlan = await window.createSmartPlan(basicPlanData);
                console.log('✅ Smart plan created with weather & AI!');
            }
            
            // Prepare plan data to save
            const planData = {
                basic: basicPlanData,
                recommendations: this.state.recommendations,
                smartPlan: smartPlan ? {
                    weather: smartPlan.weather,
                    warnings: smartPlan.warnings,
                    advice: smartPlan.smartAdvice,
                    packingList: smartPlan.packingList,
                    bestTimeToVisit: smartPlan.bestTimeToVisit
                } : null,
                timestamp: new Date().toISOString()
            };
            
            // Save to localStorage
            let savedPlans = [];
            try {
                const existing = localStorage.getItem('savedTravelPlans');
                if (existing) {
                    savedPlans = JSON.parse(existing);
                }
            } catch (e) {
                console.warn('Could not load existing plans');
            }
            
            // Add new plan
            savedPlans.unshift(planData);
            
            // Keep only last 10
            savedPlans = savedPlans.slice(0, 10);
            
            // Save
            localStorage.setItem('savedTravelPlans', JSON.stringify(savedPlans));
            
            // Show smart plan details in modal
            if (smartPlan) {
                this.showSmartPlanModal(smartPlan);
            } else {
                alert(lang === 'ar' ? '✅ تم حفظ خطتك بنجاح!' : 
                      lang === 'fr' ? '✅ Plan enregistré avec succès!' : 
                      '✅ Plan saved successfully!');
            }
            
        } catch (error) {
            console.error('❌ Error saving plan:', error);
            alert(lang === 'ar' ? '❌ حدث خطأ أثناء حفظ الخطة' : 
                  '❌ Error saving plan');
        } finally {
            // Reset button
            if (saveBtn) {
                saveBtn.disabled = false;
                saveBtn.innerHTML = '<i class="fas fa-save"></i> ' + 
                    (lang === 'ar' ? 'حفظ الخطة' : lang === 'fr' ? 'Enregistrer' : 'Save Plan');
            }
        }
    }
    
    showSmartPlanModal(smartPlan) {
        const lang = window.currentLanguage || 'en';
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'smart-plan-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            padding: 2rem;
            overflow-y: auto;
        `;
        
        modal.innerHTML = `
            <div style="
                background: white;
                max-width: 800px;
                width: 100%;
                border-radius: 16px;
                overflow: hidden;
                max-height: 90vh;
                overflow-y: auto;
            ">
                <div style="
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 2rem;
                    text-align: center;
                ">
                    <h2 style="margin: 0 0 0.5rem 0;">🎉 ${lang === 'ar' ? 'خطتك الذكية جاهزة!' : 'Your Smart Plan is Ready!'}</h2>
                    <p style="margin: 0; opacity: 0.9;">${lang === 'ar' ? 'تم دمج معلومات الطقس والنصائح الذكية' : 'Weather data and smart advice integrated'}</p>
                </div>
                
                <div style="padding: 2rem; color: #333;">
                    ${smartPlan.exportAsHTML()}
                    
                    <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                        <button onclick="this.closest('.smart-plan-modal').remove()" style="
                            flex: 1;
                            padding: 1rem;
                            background: #667eea;
                            color: white;
                            border: none;
                            border-radius: 8px;
                            cursor: pointer;
                            font-weight: 600;
                        ">
                            ${lang === 'ar' ? 'حسناً، شكراً!' : 'OK, Thanks!'}
                        </button>
                        
                        <button onclick="navigator.clipboard.writeText(${JSON.stringify(smartPlan.exportAsText())}); alert('${lang === 'ar' ? 'تم النسخ!' : 'Copied!'}')" style="
                            flex: 1;
                            padding: 1rem;
                            background: #10b981;
                            color: white;
                            border: none;
                            border-radius: 8px;
                            cursor: pointer;
                            font-weight: 600;
                        ">
                            📋 ${lang === 'ar' ? 'نسخ الخطة' : 'Copy Plan'}
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    exportPlan() {
        // تصدير كـ PDF (يحتاج مكتبة jsPDF)
        alert('PDF Export feature - Coming soon!');
    }

    saveProgress() {
        localStorage.setItem('wizardProgress', JSON.stringify({
            currentStep: this.state.currentStep,
            answers: this.state.answers
        }));
    }

    loadProgress() {
        const saved = localStorage.getItem('wizardProgress');
        if (saved) {
            const data = JSON.parse(saved);
            this.state.currentStep = data.currentStep || 0;
            this.state.answers = data.answers || {};
        }
    }

    loadSavedPlans() {
        const saved = localStorage.getItem('savedTravelPlan');
        return saved ? JSON.parse(saved) : null;
    }
}

// تهيئة النظام عند تحميل الصفحة
let interactivePlans;

document.addEventListener('DOMContentLoaded', () => {
    interactivePlans = new InteractivePlansSystem();
    console.log('✅ Interactive Plans System Ready');
});
