// اكتشف مصر - النسخة المحسّنة والمصلحة
const CONFIG={apiKey:"AIzaSyDdJHBy-Ai8MBQQgFJCsolOE1VvCPwWOCQ",authDomain:"discover-egypt-13ef7.firebaseapp.com",projectId:"discover-egypt-13ef7",storageBucket:"discover-egypt-13ef7.firebasestorage.app",messagingSenderId:"346176085799",appId:"1:346176085799:web:b1bb866154ea56ef6db8e3"};

// فحص Firebase قبل التهيئة لتجنب التكرار
let auth, db;
if (!firebase.apps.length) {
    firebase.initializeApp(CONFIG);
    console.log('[Plans] Firebase initialized');
} else {
    console.log('[Plans] Firebase already initialized, reusing');
}
auth = firebase.auth();
db = firebase.firestore();

const RATES={EGP:1,USD:0.02,EUR:0.019,GBP:0.016,SAR:0.076,AED:0.074};
const SYMBOLS={EGP:'£',USD:'$',EUR:'€',GBP:'£',SAR:'﷼',AED:'د.إ'};

// نظام الترجمة الكامل
const TRANSLATIONS = {
  ar: {
    siteName: 'اكتشف مصر',
    siteSubtitle: '27 محافظة مصرية',
    myAccount: 'حسابي',
    myPlans: 'خططي',
    planYourTrip: 'خطط رحلتك المثالية',
    exploreBeauty: 'استكشف جمال',
    charmingEgypt: 'مصر الساحرة',
    heroSubtitle: 'رحلة عبر 7000 عام من الحضارة • 27 محافظة مصرية • تجارب لا تُنسى',
    governorateLabel: 'محافظة',
    landmarkLabel: 'معلم سياحي',
    regionsLabel: 'مناطق',
    memoriesLabel: 'ذكريات',
    startPlanning: 'ابدأ التخطيط لرحلتك',
    planningDesc: 'اختر تفضيلاتك وسنصمم لك برنامجاً مخصصاً',
    step1Title: 'اختر المنطقة',
    step2Title: 'اختر المحافظة',
    step3Title: 'حدد تفاصيل الرحلة',
    duration: 'المدة',
    day: 'يوم',
    days: 'أيام',
    numberOfTravelers: 'عدد المسافرين',
    travelers: 'المسافرون',
    traveler: 'مسافر',
    budgetLevel: 'مستوى الميزانية',
    economic: 'اقتصادي',
    economicDesc: 'للمسافرين بميزانية محدودة',
    moderate: 'متوسط',
    moderateDesc: 'توازن مثالي بين السعر والجودة',
    luxury: 'فاخر',
    luxuryDesc: 'تجربة استثنائية من الدرجة الأولى',
    mostPopular: 'الأكثر شيوعاً',
    perDay: '/يوم',
    interests: 'الاهتمامات (اختر واحد أو أكثر)',
    pharaonicMonuments: 'آثار فرعونية',
    islamicArchitecture: 'عمارة إسلامية',
    beachesAndSeas: 'شواطئ وبحار',
    desertAndSafari: 'صحراء وسفاري',
    localCulture: 'ثقافة محلية',
    foodTasting: 'طعام وتذوق',
    monumentCount: '+ معلم',
    mosqueCount: '+ مسجد',
    beachCount: '+ شاطئ',
    oasisCount: '+ واحة',
    marketCount: '+ سوق',
    restaurantCount: '+ مطعم',
    generatePlan: 'أنشئ برنامجي المخصص الآن',
    selectGovFirst: 'اختر محافظة أولاً',
    compareCities: 'قارن بين المحافظات',
    compareDesc: 'اختر محافظتين أو أكثر للمقارنة بينهما',
    backToTop: 'العودة للأعلى',
    creatingTrip: 'جاري تصميم رحلتك المثالية...',
    footerAbout: 'منصتك الأولى لتخطيط الرحلات السياحية في مصر',
    quickLinks: 'روابط سريعة',
    home: 'الرئيسية',
    planning: 'التخطيط',
    compare: 'المقارنة',
    contactUs: 'تواصل معنا',
    footerCopyright: '© 2026 اكتشف مصر - جميع الحقوق محفوظة | صُنع بـ ❤️ في مصر',
    totalBudget: 'الميزانية الإجمالية',
    daily: 'يومياً',
    accommodation: 'الإقامة',
    food: 'الطعام',
    activities: 'الأنشطة',
    transportation: 'المواصلات',
    topAttractions: 'أهم المعالم السياحية',
    dailyProgram: 'البرنامج اليومي',
    importantTips: 'نصائح مهمة',
    dayLabel: 'اليوم',
    morning: '09:00 صباحاً',
    afternoon: '14:00 ظهراً',
    evening: '19:00 مساءً',
    economicTrip: 'اقتصادية',
    moderateTrip: 'متوسطة',
    luxuryTrip: 'فاخرة',
    downloadPDF: 'تحميل الخطة PDF',
    editPlan: 'تعديل الخطة',
    savePlan: 'حفظ الخطة',
    sharePlan: 'مشاركة الخطة',
    tripTo: 'رحلة إلى',
    for: 'لـ',
    compareSelected: 'قارن المحافظات المختارة'
  },
  en: {
    siteName: 'Discover Egypt',
    siteSubtitle: '27 Egyptian Governorates',
    myAccount: 'My Account',
    myPlans: 'My Plans',
    planYourTrip: 'Plan Your Perfect Trip',
    exploreBeauty: 'Explore the Beauty of',
    charmingEgypt: 'Enchanting Egypt',
    heroSubtitle: 'A Journey Through 7000 Years of Civilization • 27 Egyptian Governorates • Unforgettable Experiences',
    governorateLabel: 'Governorate',
    landmarkLabel: 'Landmark',
    regionsLabel: 'Regions',
    memoriesLabel: 'Memories',
    startPlanning: 'Start Planning Your Trip',
    planningDesc: 'Choose your preferences and we\'ll design a custom program for you',
    step1Title: 'Choose Region',
    step2Title: 'Choose Governorate',
    step3Title: 'Set Trip Details',
    duration: 'Duration',
    day: 'Day',
    days: 'Days',
    numberOfTravelers: 'Number of Travelers',
    travelers: 'Travelers',
    traveler: 'Traveler',
    budgetLevel: 'Budget Level',
    economic: 'Economic',
    economicDesc: 'For budget-conscious travelers',
    moderate: 'Moderate',
    moderateDesc: 'Perfect balance between price and quality',
    luxury: 'Luxury',
    luxuryDesc: 'Exceptional first-class experience',
    mostPopular: 'Most Popular',
    perDay: '/day',
    interests: 'Interests (Choose one or more)',
    pharaonicMonuments: 'Pharaonic Monuments',
    islamicArchitecture: 'Islamic Architecture',
    beachesAndSeas: 'Beaches & Seas',
    desertAndSafari: 'Desert & Safari',
    localCulture: 'Local Culture',
    foodTasting: 'Food & Tasting',
    monumentCount: '+ Monument',
    mosqueCount: '+ Mosque',
    beachCount: '+ Beach',
    oasisCount: '+ Oasis',
    marketCount: '+ Market',
    restaurantCount: '+ Restaurant',
    generatePlan: 'Generate My Custom Plan Now',
    selectGovFirst: 'Please select a governorate first',
    compareCities: 'Compare Governorates',
    compareDesc: 'Select two or more governorates to compare',
    backToTop: 'Back to Top',
    creatingTrip: 'Creating your perfect trip...',
    footerAbout: 'Your premier platform for planning trips in Egypt',
    quickLinks: 'Quick Links',
    home: 'Home',
    planning: 'Planning',
    compare: 'Compare',
    contactUs: 'Contact Us',
    footerCopyright: '© 2026 Discover Egypt - All Rights Reserved | Made with ❤️ in Egypt',
    totalBudget: 'Total Budget',
    daily: 'Daily',
    accommodation: 'Accommodation',
    food: 'Food',
    activities: 'Activities',
    transportation: 'Transportation',
    topAttractions: 'Top Attractions',
    dailyProgram: 'Daily Program',
    importantTips: 'Important Tips',
    dayLabel: 'Day',
    morning: '09:00 AM',
    afternoon: '02:00 PM',
    evening: '07:00 PM',
    economicTrip: 'Economic',
    moderateTrip: 'Moderate',
    luxuryTrip: 'Luxury',
    downloadPDF: 'Download Plan PDF',
    editPlan: 'Edit Plan',
    savePlan: 'Save Plan',
    sharePlan: 'Share Plan',
    tripTo: 'Trip to',
    for: 'for',
    compareSelected: 'Compare Selected Governorates'
  },
  fr: {
    siteName: 'Découvrir l\'Égypte',
    siteSubtitle: '27 Gouvernorats Égyptiens',
    myAccount: 'Mon Compte',
    myPlans: 'Mes Plans',
    planYourTrip: 'Planifiez Votre Voyage Parfait',
    exploreBeauty: 'Explorez la Beauté de',
    charmingEgypt: 'l\'Égypte Enchanteresse',
    heroSubtitle: 'Un Voyage à Travers 7000 Ans de Civilisation • 27 Gouvernorats Égyptiens • Expériences Inoubliables',
    governorateLabel: 'Gouvernorat',
    landmarkLabel: 'Monument',
    regionsLabel: 'Régions',
    memoriesLabel: 'Souvenirs',
    startPlanning: 'Commencez à Planifier Votre Voyage',
    planningDesc: 'Choisissez vos préférences et nous concevrons un programme personnalisé pour vous',
    step1Title: 'Choisir la Région',
    step2Title: 'Choisir le Gouvernorat',
    step3Title: 'Définir les Détails du Voyage',
    duration: 'Durée',
    day: 'Jour',
    days: 'Jours',
    numberOfTravelers: 'Nombre de Voyageurs',
    travelers: 'Voyageurs',
    traveler: 'Voyageur',
    budgetLevel: 'Niveau de Budget',
    economic: 'Économique',
    economicDesc: 'Pour les voyageurs à budget limité',
    moderate: 'Modéré',
    moderateDesc: 'Équilibre parfait entre prix et qualité',
    luxury: 'Luxe',
    luxuryDesc: 'Expérience exceptionnelle de première classe',
    mostPopular: 'Le Plus Populaire',
    perDay: '/jour',
    interests: 'Intérêts (Choisissez un ou plusieurs)',
    pharaonicMonuments: 'Monuments Pharaoniques',
    islamicArchitecture: 'Architecture Islamique',
    beachesAndSeas: 'Plages et Mers',
    desertAndSafari: 'Désert et Safari',
    localCulture: 'Culture Locale',
    foodTasting: 'Nourriture et Dégustation',
    monumentCount: '+ Monument',
    mosqueCount: '+ Mosquée',
    beachCount: '+ Plage',
    oasisCount: '+ Oasis',
    marketCount: '+ Marché',
    restaurantCount: '+ Restaurant',
    generatePlan: 'Générer Mon Plan Personnalisé Maintenant',
    selectGovFirst: 'Veuillez d\'abord sélectionner un gouvernorat',
    compareCities: 'Comparer les Gouvernorats',
    compareDesc: 'Sélectionnez deux gouvernorats ou plus pour comparer',
    backToTop: 'Retour en Haut',
    creatingTrip: 'Création de votre voyage parfait...',
    footerAbout: 'Votre plateforme de référence pour planifier des voyages en Égypte',
    quickLinks: 'Liens Rapides',
    home: 'Accueil',
    planning: 'Planification',
    compare: 'Comparer',
    contactUs: 'Contactez-nous',
    footerCopyright: '© 2026 Découvrir l\'Égypte - Tous Droits Réservés | Fait avec ❤️ en Égypte',
    totalBudget: 'Budget Total',
    daily: 'Quotidien',
    accommodation: 'Hébergement',
    food: 'Nourriture',
    activities: 'Activités',
    transportation: 'Transport',
    topAttractions: 'Principales Attractions',
    dailyProgram: 'Programme Quotidien',
    importantTips: 'Conseils Importants',
    dayLabel: 'Jour',
    morning: '09:00',
    afternoon: '14:00',
    evening: '19:00',
    economicTrip: 'Économique',
    moderateTrip: 'Modéré',
    luxuryTrip: 'Luxe',
    downloadPDF: 'Télécharger le Plan PDF',
    editPlan: 'Modifier le Plan',
    savePlan: 'Enregistrer le Plan',
    sharePlan: 'Partager le Plan',
    tripTo: 'Voyage à',
    for: 'pour',
    compareSelected: 'Comparer les Gouvernorats Sélectionnés'
  }
};

// قاعدة بيانات المناطق والمحافظات (مختصرة للحجم)
const REGIONS={
  'القاهرة الكبرى':{
    nameEn:'Greater Cairo',
    nameFr:'Grand Caire',
    emoji:'🏛️',
    desc:'قلب مصر النابض بالحياة والتاريخ',
    descEn:'The vibrant heart of Egypt, pulsing with life and history',
    descFr:'Le cœur vibrant de l\'Égypte, palpitant de vie et d\'histoire',
    governorates:{
      cairo:{icon:'🏛️',name:'القاهرة',nameEn:'Cairo',nameFr:'Le Caire',type:'عاصمة تاريخية',typeEn:'Historic Capital',typeFr:'Capitale Historique',desc:'مدينة الألف مئذنة والأهرامات',descEn:'City of a Thousand Minarets and Pyramids',descFr:'Ville aux Mille Minarets et Pyramides',attractions:['الأهرامات','المتحف المصري','خان الخليلي','برج القاهرة','قلعة صلاح الدين','مسجد محمد علي','حي المعز','الفسطاط'],attractionsEn:['Pyramids','Egyptian Museum','Khan El-Khalili','Cairo Tower','Saladin Citadel','Muhammad Ali Mosque','Al-Muizz Street','Fustat'],attractionsFr:['Pyramides','Musée Égyptien','Khan El-Khalili','Tour du Caire','Citadelle de Saladin','Mosquée Mohamed Ali','Rue Al-Muizz','Fustat'],budget:{budget:400,moderate:1000,luxury:3000},activities:{history:['زيارة الأهرامات الثلاثة وأبو الهول','المتحف المصري الكبير','قلعة صلاح الدين الأيوبي','مدينة ممفيس القديمة'],islamic:['مسجد محمد علي','مسجد السلطان حسن','جامع الأزهر الشريف','خان الخليلي'],culture:['حي المعز لدين الله الفاطمي','مدينة الفسطاط','سوق الجمعة','المسرح الروماني'],food:['مطاعم وسط البلد','كشري التحرير','فطير الحسين','قهاوي الأزهر']}},
      giza:{icon:'🔺',name:'الجيزة',nameEn:'Giza',nameFr:'Gizeh',type:'عجائب الدنيا',typeEn:'Wonders of the World',typeFr:'Merveilles du Monde',desc:'موطن الأهرامات الخالدة',descEn:'Home of the eternal Pyramids',descFr:'Foyer des Pyramides éternelles',attractions:['أهرامات الجيزة','أبو الهول','سقارة','دهشور','هرم زوسر'],attractionsEn:['Giza Pyramids','Sphinx','Saqqara','Dahshur','Pyramid of Djoser'],attractionsFr:['Pyramides de Gizeh','Sphinx','Saqqarah','Dahchour','Pyramide de Djéser'],budget:{budget:350,moderate:900,luxury:2800},activities:{history:['جولة الأهرامات الثلاثة','هرم زوسر المدرج بسقارة','الأهرامات الحمراء بدهشور','متحف المركب الشمسي'],desert:['جولة جمال حول الأهرامات','رحلة سفاري صحراوية','غروب الشمس الصحراوي','التخييم الصحراوي'],culture:['قرية كرداسة للحرف','حديقة الحيوان بالجيزة','شارع الهرم التجاري']}},
      qalyubia:{icon:'🌳',name:'القليوبية',nameEn:'Qalyubia',nameFr:'Qalyubia',type:'حدائق ونيل',typeEn:'Gardens & Nile',typeFr:'Jardins et Nil',desc:'القناطر الخيرية والطبيعة',descEn:'Al-Qanater and Nature',descFr:'Al-Qanater et Nature',attractions:['القناطر الخيرية','شبرا الخيمة','بنها','القناطر'],attractionsEn:['Al-Qanater','Shubra El-Kheima','Benha','Qanater'],attractionsFr:['Al-Qanater','Shubra El-Kheima','Benha','Qanater'],budget:{budget:250,moderate:600,luxury:1500},activities:{culture:['القناطر الخيرية','حدائق النيل','الحدائق النباتية'],food:['مطاعم شعبية','كافيهات النيل','مأكولات محلية']}}
    }
  },
  'البحر المتوسط':{
    nameEn:'Mediterranean',
    nameFr:'Méditerranée',
    emoji:'🌊',
    desc:'لؤلؤة البحر المتوسط والتاريخ',
    descEn:'Pearl of the Mediterranean and History',
    descFr:'Perle de la Méditerranée et de l\'Histoire',
    governorates:{
      alexandria:{icon:'🏖️',name:'الإسكندرية',nameEn:'Alexandria',nameFr:'Alexandrie',type:'عروس المتوسط',typeEn:'Bride of the Mediterranean',typeFr:'Épouse de la Méditerranée',desc:'مكتبة الإسكندرية وقلعة قايتباي',descEn:'Library of Alexandria and Qaitbay Citadel',descFr:'Bibliothèque d\'Alexandrie et Citadelle de Qaitbay',attractions:['مكتبة الإسكندرية','قلعة قايتباي','عمود السواري','المسرح الروماني','كورنيش الإسكندرية','قصر المنتزه','حدائق المنتزه'],attractionsEn:['Library of Alexandria','Qaitbay Citadel','Pompey\'s Pillar','Roman Theatre','Alexandria Corniche','Montazah Palace','Montazah Gardens'],attractionsFr:['Bibliothèque d\'Alexandrie','Citadelle de Qaitbay','Colonne de Pompée','Théâtre Romain','Corniche d\'Alexandrie','Palais Montazah','Jardins Montazah'],budget:{budget:450,moderate:1100,luxury:3200},activities:{beach:['شواطئ ستانلي','شاطئ المعمورة','كورنيش الإسكندرية','شاطئ العجمي'],history:['قلعة قايتباي','المسرح الروماني','كوم الشقافة','متحف الآثار','عمود السواري'],culture:['مكتبة الإسكندرية الحديثة','حي الأنفوشي','سوق زنقة الستات','قصر المنتزه'],food:['مطاعم الأسماك الطازجة','محمد أحمد للفول','كافيهات البحر','حلويات السمان']}},
      matrouh:{icon:'🏝️',name:'مطروح',nameEn:'Matrouh',nameFr:'Matrouh',type:'شواطئ بيضاء',typeEn:'White Beaches',typeFr:'Plages Blanches',desc:'عجيبة والشواطئ الفيروزية',descEn:'Agiba and Turquoise Beaches',descFr:'Agiba et Plages Turquoise',attractions:['شاطئ عجيبة','شاطئ الأبيض','كليوباترا','سيوة','الصحراء البيضاء'],attractionsEn:['Agiba Beach','White Beach','Cleopatra','Siwa','White Desert'],attractionsFr:['Plage Agiba','Plage Blanche','Cléopâtre','Siwa','Désert Blanc'],budget:{budget:500,moderate:1200,luxury:3500},activities:{beach:['شاطئ عجيبة الساحر','الشواطئ البيضاء','غطس وسنوركل','رياضات مائية'],desert:['واحة سيوة','رحلات سفاري','الصحراء البيضاء','عيون كليوباترا'],relax:['منتجعات ساحلية','حمامات كليوباترا الطبيعية','التأمل والهدوء']}},
      beheira:{icon:'🌾',name:'البحيرة',nameEn:'Beheira',nameFr:'Beheira',type:'دلتا ونيل',typeEn:'Delta & Nile',typeFr:'Delta et Nil',desc:'رشيد والتاريخ',descEn:'Rosetta and History',descFr:'Rosette et Histoire',attractions:['دمنهور','رشيد التاريخية','أبو المطامير','بحيرة البرلس'],attractionsEn:['Damanhour','Historic Rosetta','Abu Al-Matamir','Burullus Lake'],attractionsFr:['Damanhour','Rosette Historique','Abu Al-Matamir','Lac Burullus'],budget:{budget:300,moderate:700,luxury:1800},activities:{culture:['مدينة رشيد التاريخية','المباني الأثرية','الأسواق المحلية'],food:['مأكولات بحرية طازجة','أطباق ريفية','أسماك البحيرة']}}
    }
  },
  'الدلتا':{
    nameEn:'The Delta',
    nameFr:'Le Delta',
    emoji:'🌾',
    desc:'سلة غذاء مصر والخير الوفير',
    descEn:'Egypt\'s Food Basket and Abundant Goodness',
    descFr:'Panier Alimentaire de l\'Égypte et Abondance',
    governorates:{
      damietta:{icon:'🛋️',name:'دمياط',nameEn:'Damietta',nameFr:'Damiette',type:'صناعة وشواطئ',typeEn:'Industry & Beaches',typeFr:'Industrie et Plages',desc:'رأس البر والأثاث',descEn:'Ras El-Bar and Furniture',descFr:'Ras El-Bar et Meubles',attractions:['شاطئ رأس البر','عزبة البرج','دمياط الجديدة','ملتقى النيل والبحر'],attractionsEn:['Ras El-Bar Beach','Ezbet El-Borg','New Damietta','Nile-Sea Junction'],attractionsFr:['Plage Ras El-Bar','Ezbet El-Borg','Nouvelle Damiette','Jonction Nil-Mer'],budget:{budget:400,moderate:900,luxury:2400},activities:{beach:['رأس البر حيث يلتقي النيل بالبحر','شواطئ النيل','شواطئ البحر المتوسط'],culture:['صناعة الأثاث المشهورة','سوق الأثاث العالمي','الحرف اليدوية'],food:['أسماك طازجة','مأكولات بحرية','حلويات دمياط']}}
    }
  },
  'الصعيد':{
    nameEn:'Upper Egypt',
    nameFr:'Haute-Égypte',
    emoji:'🏺',
    desc:'مهد الحضارة الفرعونية',
    descEn:'Cradle of Pharaonic Civilization',
    descFr:'Berceau de la Civilisation Pharaonique',
    governorates:{
      luxor:{icon:'👑',name:'الأقصر',nameEn:'Luxor',nameFr:'Louxor',type:'عاصمة الفراعنة',typeEn:'Capital of Pharaohs',typeFr:'Capitale des Pharaons',desc:'متحف مفتوح للآثار',descEn:'Open-air Museum of Antiquities',descFr:'Musée à Ciel Ouvert',attractions:['معبد الكرنك','معبد الأقصر','وادي الملوك','معبد حتشبسوت','الدير البحري','وادي الملكات','الكولوسي','الرامسيوم'],attractionsEn:['Karnak Temple','Luxor Temple','Valley of the Kings','Hatshepsut Temple','Deir El-Bahari','Valley of the Queens','Colossi of Memnon','Ramesseum'],attractionsFr:['Temple de Karnak','Temple de Louxor','Vallée des Rois','Temple d\'Hatchepsout','Deir El-Bahari','Vallée des Reines','Colosses de Memnon','Ramesseum'],budget:{budget:450,moderate:1100,luxury:3200},activities:{history:['معبد الكرنك العظيم','وادي الملوك ومقابره','معبد حتشبسوت الرائع','معبد الأقصر المضيء','معابد البر الغربي','وادي الملكات','تمثالا ممنون'],culture:['كورنيش النيل الساحر','سوق الأقصر الشعبي','رحلة بالفلوكة التقليدية','متحف الأقصر'],relax:['رحلات نيلية فاخرة','منتجعات عالمية','بالونات الهواء الساخن'],food:['مطاعم نيلية فاخرة','مأكولات صعيدية','المطبخ العالمي']}},
      aswan:{icon:'⛵',name:'أسوان',nameEn:'Aswan',nameFr:'Assouan',type:'لؤلؤة النوبة',typeEn:'Pearl of Nubia',typeFr:'Perle de Nubie',desc:'أبو سمبل والسد العالي',descEn:'Abu Simbel and High Dam',descFr:'Abou Simbel et Haut Barrage',attractions:['معبد فيلة','السد العالي','جزيرة الفنتين','معبد أبو سمبل','المسلة الناقصة','المتحف النوبي','جزيرة النباتات'],attractionsEn:['Philae Temple','High Dam','Elephantine Island','Abu Simbel','Unfinished Obelisk','Nubian Museum','Botanical Island'],attractionsFr:['Temple de Philae','Haut Barrage','Île Éléphantine','Abou Simbel','Obélisque Inachevé','Musée Nubien','Île Botanique'],budget:{budget:500,moderate:1200,luxury:3500},activities:{history:['معبد فيلة الساحر','معبد أبو سمبل العظيم','المسلة الناقصة','جزيرة الفنتين الأثرية','معبد كلابشة','محجر المسلات'],culture:['القرية النوبية الملونة','سوق أسوان الشعبي','حديقة النباتات النادرة','المتحف النوبي'],desert:['معبد كلابشة الصحراوي','محجر المسلة','جزر النيل'],relax:['رحلات نيلية فاخرة','فنادق نيلية','غروب النيل']}}
    }
  },
  'البحر الأحمر':{
    nameEn:'Red Sea',
    nameFr:'Mer Rouge',
    emoji:'🐠',
    desc:'جنة الغطس والشعاب المرجانية',
    descEn:'Diving Paradise and Coral Reefs',
    descFr:'Paradis de la Plongée et Récifs Coralliens',
    governorates:{
      red_sea:{icon:'🤿',name:'البحر الأحمر',nameEn:'Red Sea',nameFr:'Mer Rouge',type:'عالم تحت الماء',typeEn:'Underwater World',typeFr:'Monde Sous-Marin',desc:'الغردقة ومرسى علم',descEn:'Hurghada and Marsa Alam',descFr:'Hurghada et Marsa Alam',attractions:['الغردقة','سفاجا','مرسى علم','القصير','الجونة','سهل حشيش'],attractionsEn:['Hurghada','Safaga','Marsa Alam','Quseir','El Gouna','Sahl Hasheesh'],attractionsFr:['Hurghada','Safaga','Marsa Alam','Quseir','El Gouna','Sahl Hasheesh'],budget:{budget:600,moderate:1500,luxury:4500},activities:{beach:['شواطئ الغردقة الذهبية','سفاجا للاستشفاء','مرسى علم البكر','الجونة المخططة','سهل حشيش الفاخر'],adventure:['غطس في الشعاب المرجانية','سنوركل مع الدلافين','جزر الجفتون المحمية','رحلات قوارب','رحلات غواصات','سفاري صحراوي','quad biking'],relax:['منتجعات شاطئية عالمية','سبا ومساج','يوجا على الشاطئ']}}
    }
  },
  'سيناء':{
    emoji:'🏔️',
    desc:'أرض الفيروز والجبال المقدسة',
    descEn:'Land of Turquoise and Sacred Mountains',
    descFr:'Terre de Turquoise et Montagnes Sacrées',
    governorates:{
      south_sinai:{icon:'🏔️',name:'جنوب سيناء',nameEn:'South Sinai',nameFr:'Sinaï du Sud',type:'جنة سياحية',typeEn:'Tourist Paradise',typeFr:'Paradis Touristique',desc:'شرم الشيخ ودهب',descEn:'Sharm El-Sheikh and Dahab',descFr:'Charm El-Cheikh et Dahab',attractions:['شرم الشيخ','دهب','نويبع','سانت كاترين','طابا','رأس محمد','الثقب الأزرق'],attractionsEn:['Sharm El-Sheikh','Dahab','Nuweiba','St. Catherine','Taba','Ras Mohammed','Blue Hole'],attractionsFr:['Charm El-Cheikh','Dahab','Nuweiba','Sainte-Catherine','Taba','Ras Mohammed','Trou Bleu'],budget:{budget:700,moderate:1800,luxury:5000},activities:{beach:['شرم الشيخ العالمية','خليج نعمة الشهير','دهب للغوص','نويبع الهادئة','طابا الحدودية'],adventure:['غطس في رأس محمد','الثقب الأزرق','سفاري صحراوي','تسلق جبل موسى','دير سانت كاترين','رحلات جبلية'],relax:['منتجعات 5 نجوم','سبا عالمي','يوجا وتأمل']}}
    }
  }
};

// نصائح السفر مترجمة
const TRAVEL_TIPS={
  ar:{
    history:['📚 احجز مرشد سياحي متخصص','🌅 ابدأ الزيارات مبكراً','📸 التقط صوراً تذكارية','💧 احمل مياه كافية'],
    islamic:['👔 ارتدِ ملابس محتشمة','🕌 احترم أوقات الصلاة','📖 تعرف على التاريخ','🤝 تفاعل باحترام'],
    beach:['☀️ استخدم واقي شمس قوي','🏊 تعلم السباحة مسبقاً','🐠 احجز الغطس مبكراً','👙 جهز ملابس البحر'],
    desert:['🌡️ ملابس خفيفة نهاراً ودافئة ليلاً','💧 ماء كثير للشرب','🚙 شركة سفاري موثوقة','📱 شاحن متنقل'],
    culture:['🗣️ تحدث مع السكان','🍽️ جرب الطعام المحلي','🛍️ زر الأسواق الشعبية','📷 وثق اللحظات'],
    food:['🍴 المطاعم الشعبية أفضل','🔥 تأكد من نظافة الطعام','🥤 اشرب المياه المعبأة','🍰 جرب الحلويات'],
    relax:['🧘 خذ وقتك للراحة','🌅 استمتع بالمناظر','📵 ابتعد عن التكنولوجيا','🌙 نم مبكراً'],
    adventure:['🎒 جهز معداتك جيداً','⛑️ احتياطات السلامة','📋 خطط المسار مسبقاً','👥 لا تذهب منفرداً']
  },
  en:{
    history:['📚 Book a specialized tour guide','🌅 Start visits early','📸 Take memorable photos','💧 Carry enough water'],
    islamic:['👔 Wear modest clothing','🕌 Respect prayer times','📖 Learn about history','🤝 Interact respectfully'],
    beach:['☀️ Use strong sunscreen','🏊 Learn to swim beforehand','🐠 Book diving early','👙 Prepare beach clothes'],
    desert:['🌡️ Light clothes during day, warm at night','💧 Drink lots of water','🚙 Reliable safari company','📱 Portable charger'],
    culture:['🗣️ Talk to locals','🍽️ Try local food','🛍️ Visit popular markets','📷 Document moments'],
    food:['🍴 Local restaurants are best','🔥 Ensure food cleanliness','🥤 Drink bottled water','🍰 Try desserts'],
    relax:['🧘 Take time to rest','🌅 Enjoy the views','📵 Disconnect from technology','🌙 Sleep early'],
    adventure:['🎒 Prepare equipment well','⛑️ Safety precautions','📋 Plan route in advance','👥 Don\'t go alone']
  },
  fr:{
    history:['📚 Réservez un guide spécialisé','🌅 Commencez tôt les visites','📸 Prenez des photos','💧 Portez assez d\'eau'],
    islamic:['👔 Portez des vêtements modestes','🕌 Respectez les heures de prière','📖 Apprenez l\'histoire','🤝 Interagissez respectueusement'],
    beach:['☀️ Utilisez un écran solaire fort','🏊 Apprenez à nager avant','🐠 Réservez la plongée tôt','👙 Préparez vêtements de plage'],
    desert:['🌡️ Vêtements légers le jour, chauds la nuit','💧 Beaucoup d\'eau','🚙 Société de safari fiable','📱 Chargeur portable'],
    culture:['🗣️ Parlez aux locaux','🍽️ Essayez la nourriture locale','🛍️ Visitez les marchés','📷 Documentez les moments'],
    food:['🍴 Restaurants locaux sont meilleurs','🔥 Vérifiez la propreté','🥤 Buvez de l\'eau en bouteille','🍰 Essayez les desserts'],
    relax:['🧘 Prenez le temps de vous reposer','🌅 Profitez des vues','📵 Déconnectez de la technologie','🌙 Dormez tôt'],
    adventure:['🎒 Préparez bien l\'équipement','⛑️ Précautions de sécurité','📋 Planifiez l\'itinéraire','👥 N\'allez pas seul']
  }
};

// التطبيق المحسّن
const app={
  lang:'ar',
  currency:'EGP',
  user:null,
  selection:{region:null,governorate:null,days:3,travelers:2,budget:'moderate',interests:['history']},
  currentPlan:null,
  compareSelection:[], // المحافظات المختارة للمقارنة

  t(key){
    return TRANSLATIONS[this.lang][key]||key;
  },

  init(){
    this.renderRegions();
    this.setupEvents();
    this.updateAllTexts();
    this.renderCompareSelector(); // إضافة قائمة المقارنة
    auth.onAuthStateChanged(u=>this.user=u);
  },

  updateAllTexts(){
    // تحديث جميع النصوص الثابتة في HTML
    const updates = {
      '.logo-text h1': 'siteName',
      '.logo-text span': 'siteSubtitle',
      '#userName': 'myAccount',
      '#myPlansText': 'myPlans',
      '.hero-badge span:nth-child(2)': 'planYourTrip',
      '.title-line': 'exploreBeauty',
      '.title-highlight': 'charmingEgypt',
      '.hero-subtitle': 'heroSubtitle',
      '.section-header h2': 'startPlanning',
      '.section-header p': 'planningDesc',
      '#step1 h3': 'step1Title',
      '#step2 h3': 'step2Title',
      '#step3 h3': 'step3Title',
      '.generate-btn span': 'generatePlan',
      '.compare-section h2': 'compareCities',
      '.compare-section p': 'compareDesc',
      '.compare-btn span': 'compareSelected',
      '.loader-text': 'creatingTrip',
      '.footer-bottom p': 'footerCopyright'
    };

    Object.keys(updates).forEach(selector => {
      const el = document.querySelector(selector);
      if(el) el.textContent = this.t(updates[selector]);
    });

    // تحديث الإحصائيات
    const stats = document.querySelectorAll('.stat-label');
    if(stats[0]) stats[0].textContent = this.t('governorateLabel');
    if(stats[1]) stats[1].textContent = this.t('landmarkLabel');
    if(stats[2]) stats[2].textContent = this.t('regionsLabel');
    if(stats[3]) stats[3].textContent = this.t('memoriesLabel');

    // تحديث عناوين الأقسام
    const detailSections = document.querySelectorAll('.detail-section h4');
    if(detailSections[0]) {
      detailSections[0].innerHTML = detailSections[0].innerHTML.replace(/المدة|Duration|Durée/, this.t('duration'));
    }
    if(detailSections[1]) {
      detailSections[1].innerHTML = detailSections[1].innerHTML.replace(/عدد المسافرين|Number of Travelers|Nombre de Voyageurs/, this.t('numberOfTravelers'));
    }
    if(detailSections[2]) {
      detailSections[2].innerHTML = detailSections[2].innerHTML.replace(/مستوى الميزانية|Budget Level|Niveau de Budget/, this.t('budgetLevel'));
    }
    if(detailSections[3]) {
      detailSections[3].innerHTML = detailSections[3].innerHTML.replace(/الاهتمامات.*|Interests.*|Intérêts.*/, this.t('interests'));
    }

    // تحديث أزرار المدة
    const durationLabels = document.querySelectorAll('.option-label');
    durationLabels.forEach((label, i) => {
      const days = parseInt(label.parentElement.dataset.days);
      label.textContent = days === 1 ? this.t('day') : this.t('days');
    });

    // تحديث عداد المسافرين
    const travelerLabel = document.querySelector('.counter-label');
    if(travelerLabel) travelerLabel.textContent = this.t('traveler');

    // تحديث بطاقات الميزانية
    const budgetNames = document.querySelectorAll('.budget-name');
    const budgetDescs = document.querySelectorAll('.budget-desc');
    if(budgetNames[0]) budgetNames[0].textContent = this.t('economic');
    if(budgetDescs[0]) budgetDescs[0].textContent = this.t('economicDesc');
    if(budgetNames[1]) budgetNames[1].textContent = this.t('moderate');
    if(budgetDescs[1]) budgetDescs[1].textContent = this.t('moderateDesc');
    if(budgetNames[2]) budgetNames[2].textContent = this.t('luxury');
    if(budgetDescs[2]) budgetDescs[2].textContent = this.t('luxuryDesc');

    const recommendedBadge = document.querySelector('.recommended-badge');
    if(recommendedBadge) recommendedBadge.textContent = this.t('mostPopular');

    // تحديث بطاقات الاهتمامات
    const interestNames = document.querySelectorAll('.interest-name');
    const interestCounts = document.querySelectorAll('.interest-count');
    if(interestNames[0]) interestNames[0].textContent = this.t('pharaonicMonuments');
    if(interestCounts[0]) interestCounts[0].textContent = '80' + this.t('monumentCount');
    if(interestNames[1]) interestNames[1].textContent = this.t('islamicArchitecture');
    if(interestCounts[1]) interestCounts[1].textContent = '60' + this.t('mosqueCount');
    if(interestNames[2]) interestNames[2].textContent = this.t('beachesAndSeas');
    if(interestCounts[2]) interestCounts[2].textContent = '40' + this.t('beachCount');
    if(interestNames[3]) interestNames[3].textContent = this.t('desertAndSafari');
    if(interestCounts[3]) interestCounts[3].textContent = '15' + this.t('oasisCount');
    if(interestNames[4]) interestNames[4].textContent = this.t('localCulture');
    if(interestCounts[4]) interestCounts[4].textContent = '100' + this.t('marketCount');
    if(interestNames[5]) interestNames[5].textContent = this.t('foodTasting');
    if(interestCounts[5]) interestCounts[5].textContent = '200' + this.t('restaurantCount');

    // تحديث روابط التذييل
    const footerLinks = document.querySelectorAll('.footer-section a');
    if(footerLinks[0]) footerLinks[0].textContent = this.t('home');
    if(footerLinks[1]) footerLinks[1].textContent = this.t('planning');
    if(footerLinks[2]) footerLinks[2].textContent = this.t('compare');

    const footerHeaders = document.querySelectorAll('.footer-section h4');
    if(footerHeaders[0]) footerHeaders[0].textContent = this.t('siteName');
    if(footerHeaders[1]) footerHeaders[1].textContent = this.t('quickLinks');
    if(footerHeaders[2]) footerHeaders[2].textContent = this.t('contactUs');

    const footerAbout = document.querySelector('.footer-section p');
    if(footerAbout) footerAbout.textContent = this.t('footerAbout');

    // إعادة رسم المناطق والمحافظات إذا كانت محددة
    this.renderRegions();
    if(this.selection.region) this.renderGovernorates(this.selection.region);
    if(this.selection.governorate) this.updateBudgetPrices(this.selection.governorate.data.budget);
    if(this.currentPlan) this.displayPlan();

    // إعادة رسم قائمة المقارنة
    this.renderCompareSelector();
    if(this.compareSelection.length > 0){
      this.showComparison();
    }
  },

  renderRegions(){
    const container=document.getElementById('regionsShowcase');
    if(!container) return;
    container.innerHTML='';
    Object.keys(REGIONS).forEach(key=>{
      const r=REGIONS[key];
      const card=document.createElement('div');
      card.className='region-card';
      const regionName=this.lang==='ar'?key:this.lang==='en'?(r.nameEn||key):(r.nameFr||key);
      const desc=this.lang==='ar'?r.desc:this.lang==='en'?r.descEn:r.descFr;
      const countLabel=this.t('governorateLabel');
      card.innerHTML=`
        <span class="region-emoji">${r.emoji}</span>
        <div class="region-name">${regionName}</div>
        <div class="region-count">${Object.keys(r.governorates).length} ${countLabel}</div>
        <div class="region-desc">${desc}</div>
      `;
      card.onclick=()=>this.selectRegion(key,card);
      if(this.selection.region===key)card.classList.add('selected');
      container.appendChild(card);
    });
  },

  selectRegion(region,card){
    document.querySelectorAll('.region-card').forEach(c=>c.classList.remove('selected'));
    card.classList.add('selected');
    this.selection.region=region;
    this.renderGovernorates(region);
    document.getElementById('step2').classList.add('active');
    document.getElementById('step2').scrollIntoView({behavior:'smooth',block:'center'});
  },

  renderGovernorates(region){
    const container=document.getElementById('governoratesGrid');
    container.innerHTML='';
    const govs=REGIONS[region].governorates;
    Object.keys(govs).forEach(key=>{
      const g=govs[key];
      const card=document.createElement('div');
      card.className='gov-card';
      const name=this.lang==='ar'?g.name:this.lang==='en'?g.nameEn:g.nameFr;
      const type=this.lang==='ar'?g.type:this.lang==='en'?g.typeEn:g.typeFr;
      const desc=this.lang==='ar'?g.desc:this.lang==='en'?g.descEn:g.descFr;
      card.innerHTML=`
        <div class="gov-icon">${g.icon}</div>
        <div class="gov-name">${name}</div>
        <div class="gov-type">${type}</div>
        <div class="gov-info">${desc}</div>
      `;
      card.onclick=()=>this.selectGovernorate(key,card,g);
      if(this.selection.governorate&&this.selection.governorate.id===key)card.classList.add('selected');
      container.appendChild(card);
    });
  },

  selectGovernorate(id,card,data){
    document.querySelectorAll('.gov-card').forEach(c=>c.classList.remove('selected'));
    card.classList.add('selected');
    this.selection.governorate={id,data};
    this.updateBudgetPrices(data.budget);
    document.getElementById('step3').classList.add('active');
    document.getElementById('step3').scrollIntoView({behavior:'smooth',block:'start'});
  },

  updateBudgetPrices(budget){
    const perDayText=this.t('perDay');
    document.querySelector('[data-price-type="budget"]').textContent=this.formatPrice(budget.budget)+perDayText;
    document.querySelector('[data-price-type="moderate"]').textContent=this.formatPrice(budget.moderate)+perDayText;
    document.querySelector('[data-price-type="luxury"]').textContent=this.formatPrice(budget.luxury)+perDayText;
  },

  setupEvents(){
    // Language
    document.querySelectorAll('.lang-btn').forEach(btn=>{
      btn.onclick=()=>{
        document.querySelectorAll('.lang-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        this.lang=btn.dataset.lang;
        document.documentElement.lang=this.lang;
        document.documentElement.dir=this.lang==='ar'?'rtl':'ltr';
        this.updateAllTexts();
      };
    });

    // Currency
    document.getElementById('currency').onchange=e=>{
      this.currency=e.target.value;
      if(this.selection.governorate)
        this.updateBudgetPrices(this.selection.governorate.data.budget);
      if(this.currentPlan)
        this.displayPlan();
    };

    // Duration
    document.querySelectorAll('.option-card').forEach(card=>{
      card.onclick=()=>{
        document.querySelectorAll('.option-card').forEach(c=>c.classList.remove('active'));
        card.classList.add('active');
        this.selection.days=parseInt(card.dataset.days);
      };
    });

    // Budget
    document.querySelectorAll('.budget-card').forEach(card=>{
      card.onclick=()=>{
        document.querySelectorAll('.budget-card').forEach(c=>c.classList.remove('active'));
        card.classList.add('active');
        this.selection.budget=card.dataset.budget;
      };
    });

    // Interests (multi-select)
    document.querySelectorAll('.interest-card').forEach(card=>{
      card.onclick=()=>{
        card.classList.toggle('active');
        const interest=card.dataset.interest;
        const idx=this.selection.interests.indexOf(interest);
        if(idx>-1)this.selection.interests.splice(idx,1);
        else this.selection.interests.push(interest);
        if(this.selection.interests.length===0){
          card.classList.add('active');
          this.selection.interests.push(interest);
        }
      };
    });
  },

  changeTravelers(delta){
    this.selection.travelers=Math.max(1,Math.min(20,this.selection.travelers+delta));
    document.getElementById('travelersCount').textContent=this.selection.travelers;
  },

  generatePlan(){
    if(!this.selection.governorate){
      alert(this.t('selectGovFirst'));
      return;
    }

    this.showLoader();
    setTimeout(()=>{
      this.hideLoader();
      this.displayPlan();
    },2500);
  },

  displayPlan(){
    const{governorate,days,travelers,budget,interests}=this.selection;
    if(!governorate||!governorate.data){
      alert(this.t('selectGovFirst'));
      return;
    }

    const g=governorate.data;
    const daily=g.budget&&g.budget[budget]?g.budget[budget]:500;
    const total=daily*days*travelers;

    const name=this.lang==='ar'?g.name:this.lang==='en'?(g.nameEn||g.name):(g.nameFr||g.name);
    const tripType=budget==='budget'?this.t('economicTrip'):budget==='moderate'?this.t('moderateTrip'):this.t('luxuryTrip');
    const travelerText=travelers===1?this.t('traveler'):this.t('travelers');
    const dayText=days===1?this.t('day'):this.t('days');
    const attractions=this.lang==='ar'?g.attractions:this.lang==='en'?(g.attractionsEn||g.attractions):(g.attractionsFr||g.attractions);

    let html=`
      <div class="plan-result" id="planToPrint">
        <div class="plan-header-result">
          <h2>${this.t('tripTo')} ${name} - ${days} ${dayText}</h2>
          <p>${tripType} ${this.t('for')} ${travelers} ${travelerText}</p>
        </div>

        <div class="plan-actions no-print">
          <button class="action-btn primary" onclick="app.downloadPDF()">
            📄 ${this.t('downloadPDF')}
          </button>
          <button class="action-btn" onclick="app.editPlan()">
            ✏️ ${this.t('editPlan')}
          </button>
          <button class="action-btn" onclick="app.savePlan()">
            💾 ${this.t('savePlan')}
          </button>
          <button class="action-btn" onclick="app.sharePlan()">
            🔗 ${this.t('sharePlan')}
          </button>
        </div>

        <div class="budget-summary">
          <h3>💰 ${this.t('totalBudget')}</h3>
          <div class="total-price">${this.formatPrice(total)}</div>
          <div class="daily-price">${this.formatPrice(daily*travelers)} ${this.t('daily')}</div>

          <div class="budget-breakdown">
            <div class="breakdown-item">
              <span>🏨 ${this.t('accommodation')}</span>
              <span>${this.formatPrice(daily*0.45*days*travelers)}</span>
            </div>
            <div class="breakdown-item">
              <span>🍽️ ${this.t('food')}</span>
              <span>${this.formatPrice(daily*0.3*days*travelers)}</span>
            </div>
            <div class="breakdown-item">
              <span>🎯 ${this.t('activities')}</span>
              <span>${this.formatPrice(daily*0.15*days*travelers)}</span>
            </div>
            <div class="breakdown-item">
              <span>🚗 ${this.t('transportation')}</span>
              <span>${this.formatPrice(daily*0.1*days*travelers)}</span>
            </div>
          </div>
        </div>

        <div class="attractions-list">
          <h3>🎯 ${this.t('topAttractions')}</h3>
          <div class="attractions-grid">
            ${attractions&&Array.isArray(attractions)?attractions.map(a=>`<div class="attraction-tag">✓ ${a}</div>`).join(''):''}
          </div>
        </div>

        <div class="itinerary-plan">
          <h3>📅 ${this.t('dailyProgram')}</h3>
          ${this.generateItinerary(g,days,interests)}
        </div>

        <div class="travel-tips-box">
          <h3>💡 ${this.t('importantTips')}</h3>
          <div class="tips-list">
            ${this.getTips(interests).map(t=>`<div class="tip-item">${t}</div>`).join('')}
          </div>
        </div>
      </div>
    `;

    this.currentPlan=html;
    document.getElementById('planResults').innerHTML=html;
    document.getElementById('resultsSection').style.display='block';
    document.getElementById('resultsSection').scrollIntoView({behavior:'smooth'});
  },

  generateItinerary(gov,days,interests){
    let html='';
    const times=[this.t('morning'),this.t('afternoon'),this.t('evening')];
    let activityCount=0;

    interests.forEach(int=>{
      const acts=gov.activities&&gov.activities[int]?gov.activities[int]:[];
      acts.slice(0,days*3).forEach((act,i)=>{
        const day=Math.floor(activityCount/3)+1;
        const time=times[activityCount%3];
        if(activityCount%3===0)html+=`<div class="day-header">${this.t('dayLabel')} ${day}</div>`;
        html+=`<div class="activity-item"><span class="time">${time}</span><span>${act}</span></div>`;
        activityCount++;
      });
    });

    if(!html){
      const msg=this.lang==='ar'?'برنامج مخصص سيتم إعداده':this.lang==='en'?'Custom program will be prepared':'Programme personnalisé sera préparé';
      html=`<div class="activity-item"><span>${msg}</span></div>`;
    }

    return html;
  },

  getTips(interests){
    let tips=[];
    if(!interests||!Array.isArray(interests)) return tips;

    interests.forEach(int=>{
      if(TRAVEL_TIPS[this.lang]&&TRAVEL_TIPS[this.lang][int]){
        tips.push(...TRAVEL_TIPS[this.lang][int]);
      }
    });

    // إذا لم توجد نصائح، إضافة نصائح عامة
    if(tips.length===0){
      const generalTips=this.lang==='ar'?
        ['📸 التقط صوراً تذكارية','💧 احمل مياه كافية','🗺️ خطط رحلتك مسبقاً']:
        this.lang==='en'?
        ['📸 Take memorable photos','💧 Carry enough water','🗺️ Plan your trip in advance']:
        ['📸 Prenez des photos','💧 Portez assez d\'eau','🗺️ Planifiez votre voyage'];
      tips=generalTips;
    }

    return tips.slice(0,6);
  },

  async downloadPDF(){
    const element = document.getElementById('planToPrint');
    if(!element){
      alert(this.lang==='ar'?'لا توجد خطة لتحميلها':this.lang==='en'?'No plan to download':'Aucun plan à télécharger');
      return;
    }

    try {
      // إظهار رسالة انتظار
      this.showLoader();

      // الانتظار لتحميل العناصر وضمان عرضها بشكل صحيح
      await new Promise(resolve => setTimeout(resolve, 800));

      // التأكد من أن العنصر مرئي بشكل كامل
      element.style.display = 'block';
      element.style.opacity = '1';

      const opt = {
        margin: [10, 10, 10, 10],
        filename: `egypt-trip-${this.selection.governorate || 'plan'}-${Date.now()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          letterRendering: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          windowWidth: 1200,
          windowHeight: element.scrollHeight
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait',
          compress: true
        },
        pagebreak: { 
          mode: ['avoid-all', 'css', 'legacy'],
          before: '.page-break-before',
          after: '.page-break-after',
          avoid: ['.no-break', '.budget-summary', '.attractions-list']
        }
      };

      if(typeof html2pdf === 'undefined'){
        throw new Error('PDF library not loaded. Please refresh the page and try again.');
      }

      // إنشاء وتنزيل PDF
      await html2pdf().set(opt).from(element).save();

      this.hideLoader();

      // إظهار رسالة نجاح
      const successMsg = this.lang==='ar'?'تم تحميل PDF بنجاح!':this.lang==='en'?'PDF downloaded successfully!':'PDF téléchargé avec succès!';
      alert(successMsg);

    } catch(error) {
      console.error('PDF Error:', error);
      this.hideLoader();
      const errorMsg = this.lang==='ar'?'حدث خطأ في تحميل PDF. الرجاء المحاولة مرة أخرى.':this.lang==='en'?'Error downloading PDF. Please try again.':'Erreur lors du téléchargement du PDF. Veuillez réessayer.';
      alert(errorMsg);
    }
  },

  editPlan(){
    document.getElementById('step1').scrollIntoView({behavior:'smooth'});
    const msg = this.lang==='ar'?'يمكنك الآن تعديل اختياراتك':this.lang==='en'?'You can now edit your selections':'Vous pouvez maintenant modifier vos sélections';
    alert(msg);
  },

  async savePlan(){
    if(!this.user){
      const msg = this.lang==='ar'?'يجب تسجيل الدخول أولاً لحفظ الخطة':this.lang==='en'?'Please login first to save your plan':'Veuillez d\'abord vous connecter pour enregistrer votre plan';
      alert(msg);
      // إعادة توجيه لصفحة تسجيل الدخول
      window.location.href = '../login.html';
      return;
    }

    // التحقق من وجود خطة
    if(!this.selection.governorate){
      const msg = this.lang==='ar'?'يجب إنشاء خطة أولاً':this.lang==='en'?'Please create a plan first':'Veuillez d\'abord créer un plan';
      alert(msg);
      return;
    }

    try {
      // بيانات الخطة الكاملة
      const planData = {
        userId: this.user.uid,
        userEmail: this.user.email,
        userName: this.user.displayName || this.user.email,
        region: this.selection.region,
        governorate: this.selection.governorate,
        duration: this.selection.days,
        days: this.selection.days,
        travelers: this.selection.travelers,
        budget: this.selection.budget,
        interests: this.selection.interests || [],
        language: this.lang,
        currency: this.currency,
        timestamp: Date.now(),
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        planData: this.currentPlan // حفظ تفاصيل الخطة كاملة
      };

      // حفظ في قاعدة البيانات
      const docRef = await db.collection('plans').add(planData);
      
      const msg = this.lang==='ar'?'✅ تم حفظ الخطة بنجاح! يمكنك العثور عليها في "خططي"':
                  this.lang==='en'?'✅ Plan saved successfully! You can find it in "My Plans"':
                  '✅ Plan enregistré avec succès! Vous pouvez le retrouver dans "Mes Plans"';
      alert(msg);

      // اختياري: إعادة توجيه لصفحة خططي
      const redirect = confirm(this.lang==='ar'?'هل تريد الذهاب لصفحة خططي المحفوظة؟':
                               this.lang==='en'?'Do you want to go to My Saved Plans?':
                               'Voulez-vous aller à Mes Plans Enregistrés?');
      if(redirect){
        window.location.href = '../my-plans.html';
      }

    } catch(error) {
      console.error('Save Plan Error:', error);
      const msg = this.lang==='ar'?'❌ فشل حفظ الخطة. الرجاء المحاولة مرة أخرى.':
                  this.lang==='en'?'❌ Failed to save plan. Please try again.':
                  '❌ Échec de l\'enregistrement du plan. Veuillez réessayer.';
      alert(msg);
    }
  },
      });
  },

  sharePlan(){
    const url=window.location.href;
    const title=this.t('siteName');
    const text=this.lang==='ar'?'شاهد خطة رحلتي إلى مصر!':this.lang==='en'?'Check out my Egypt trip plan!':'Découvrez mon plan de voyage en Égypte!';

    if(navigator.share){
      navigator.share({title,text,url}).catch(e=>console.log('Share cancelled'));
    }else{
      navigator.clipboard.writeText(url);
      const msg = this.lang==='ar'?'تم نسخ الرابط':this.lang==='en'?'Link copied':'Lien copié';
      alert(msg);
    }
  },

  formatPrice(amount){
    if(!amount || isNaN(amount)) return SYMBOLS[this.currency]+'0';
    const val=amount/RATES.EGP*RATES[this.currency];
    const rounded=Math.round(val);
    return SYMBOLS[this.currency]+rounded.toLocaleString();
  },

  showLoader(){
    document.getElementById('loader').classList.add('active');
  },

  hideLoader(){
    document.getElementById('loader').classList.remove('active');
  },

  scrollToTop(){
    window.scrollTo({top:0,behavior:'smooth'});
  },

  // دوال المقارنة
  renderCompareSelector(){
    const container = document.getElementById('compareSelectorGrid');
    if(!container) return;

    container.innerHTML = '';
    const allGovs = [];

    // جمع كل المحافظات من جميع المناطق
    Object.keys(REGIONS).forEach(regionKey => {
      const region = REGIONS[regionKey];
      if(region.governorates){
        Object.keys(region.governorates).forEach(govKey => {
          const gov = region.governorates[govKey];
          allGovs.push({
            key: govKey,
            data: gov,
            region: regionKey
          });
        });
      }
    });

    // عرض كل المحافظات
    allGovs.forEach(gov => {
      const name = this.lang==='ar' ? gov.data.name : this.lang==='en' ? (gov.data.nameEn||gov.data.name) : (gov.data.nameFr||gov.data.name);
      const type = this.lang==='ar' ? gov.data.type : this.lang==='en' ? (gov.data.typeEn||gov.data.type) : (gov.data.typeFr||gov.data.type);

      const item = document.createElement('div');
      item.className = 'compare-item';
      item.innerHTML = `
        <div class="compare-item-icon">${gov.data.icon||'🏛️'}</div>
        <div class="compare-item-name">${name}</div>
        <div class="compare-item-type">${type}</div>
      `;

      item.onclick = () => this.toggleCompareSelection(gov);

      // تحديد الزر إذا كان مختاراً
      if(this.compareSelection.find(g => g.key === gov.key)){
        item.classList.add('selected');
      }

      container.appendChild(item);
    });
  },

  toggleCompareSelection(gov){
    const index = this.compareSelection.findIndex(g => g.key === gov.key);
    const items = document.querySelectorAll('.compare-item');

    if(index > -1){
      // إزالة من القائمة
      this.compareSelection.splice(index, 1);
    } else {
      // إضافة للقائمة (بحد أقصى 4 محافظات)
      if(this.compareSelection.length >= 4){
        const msg = this.lang==='ar'?'يمكنك مقارنة 4 محافظات كحد أقصى':this.lang==='en'?'You can compare up to 4 governorates':'Vous pouvez comparer jusqu\'à 4 gouvernorats';
        alert(msg);
        return;
      }
      this.compareSelection.push(gov);
    }

    // تحديث الأزرار المختارة
    items.forEach((item, i) => {
      const allGovs = [];
      Object.keys(REGIONS).forEach(regionKey => {
        const region = REGIONS[regionKey];
        Object.keys(region.governorates).forEach(govKey => {
          allGovs.push({key: govKey});
        });
      });

      const currentGov = allGovs[i];
      if(currentGov && this.compareSelection.find(g => g.key === currentGov.key)){
        item.classList.add('selected');
      } else {
        item.classList.remove('selected');
      }
    });

    // تحديث زر المقارنة
    const btn = document.getElementById('compareBtn');
    if(this.compareSelection.length >= 2){
      btn.disabled = false;
    } else {
      btn.disabled = true;
    }
  },

  showComparison(){
    if(this.compareSelection.length < 2){
      const msg = this.lang==='ar'?'اختر محافظتين على الأقل للمقارنة':this.lang==='en'?'Select at least 2 governorates to compare':'Sélectionnez au moins 2 gouvernorats pour comparer';
      alert(msg);
      return;
    }

    const container = document.getElementById('compareContainer');
    if(!container) return;

    const title = this.lang==='ar'?'مقارنة المحافظات':this.lang==='en'?'Governorate Comparison':'Comparaison des Gouvernorats';

    let html = `
      <div class="comparison-table">
        <div class="comparison-header">
          <h3>${title}</h3>
        </div>
        <div class="comparison-cards">
    `;

    // بطاقة لكل محافظة
    this.compareSelection.forEach(gov => {
      if(!gov||!gov.data) return;

      const name = this.lang==='ar' ? gov.data.name : this.lang==='en' ? (gov.data.nameEn||gov.data.name) : (gov.data.nameFr||gov.data.name);
      const type = this.lang==='ar' ? gov.data.type : this.lang==='en' ? (gov.data.typeEn||gov.data.type) : (gov.data.typeFr||gov.data.type);
      const desc = this.lang==='ar' ? gov.data.desc : this.lang==='en' ? (gov.data.descEn||gov.data.desc) : (gov.data.descFr||gov.data.desc);
      const attractions = this.lang==='ar' ? gov.data.attractions : this.lang==='en' ? (gov.data.attractionsEn||gov.data.attractions) : (gov.data.attractionsFr||gov.data.attractions);

      const budgetLabel = this.lang==='ar'?'الميزانية اليومية':this.lang==='en'?'Daily Budget':'Budget Quotidien';
      const attractionsLabel = this.lang==='ar'?'المعالم':this.lang==='en'?'Attractions':'Attractions';
      const economicLabel = this.lang==='ar'?'اقتصادي':this.lang==='en'?'Economic':'Économique';
      const moderateLabel = this.lang==='ar'?'متوسط':this.lang==='en'?'Moderate':'Modéré';
      const luxuryLabel = this.lang==='ar'?'فاخر':this.lang==='en'?'Luxury':'Luxe';

      const budget = gov.data.budget||{budget:400,moderate:1000,luxury:3000};
      const attractionCount = attractions&&Array.isArray(attractions)?attractions.length:0;

      html += `
        <div class="comparison-card">
          <div class="comparison-card-header">
            <div class="comparison-card-icon">${gov.data.icon||'🏛️'}</div>
            <div class="comparison-card-name">${name}</div>
            <div class="comparison-card-type">${type}</div>
          </div>
          <div class="comparison-card-body">
            <div class="comparison-card-item">
              <span class="comparison-card-item-label">${budgetLabel} (${economicLabel})</span>
              <span class="comparison-card-item-value">${this.formatPrice(budget.budget)}</span>
            </div>
            <div class="comparison-card-item">
              <span class="comparison-card-item-label">${budgetLabel} (${moderateLabel})</span>
              <span class="comparison-card-item-value">${this.formatPrice(budget.moderate)}</span>
            </div>
            <div class="comparison-card-item">
              <span class="comparison-card-item-label">${budgetLabel} (${luxuryLabel})</span>
              <span class="comparison-card-item-value">${this.formatPrice(budget.luxury)}</span>
            </div>
            <div class="comparison-card-item">
              <span class="comparison-card-item-label">${attractionsLabel}</span>
              <span class="comparison-card-item-value">${attractionCount}+</span>
            </div>
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;

    container.innerHTML = html;
    container.style.display = 'block';
    container.scrollIntoView({behavior: 'smooth', block: 'start'});
  }
};

document.addEventListener('DOMContentLoaded',()=>app.init());
