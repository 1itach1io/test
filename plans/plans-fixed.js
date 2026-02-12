// اكتشف مصر - النسخة المحسّنة والمصلحة بالكامل
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

// نظام الترجمة الكامل - كل حرف مترجم للثلاث لغات
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
    compareSelected: 'قارن المحافظات المختارة',
    selectAtLeast2: 'اختر محافظتين على الأقل للمقارنة',
    max4Selection: 'يمكنك مقارنة 4 محافظات كحد أقصى',
    comparisonTitle: 'مقارنة المحافظات',
    dailyBudget: 'الميزانية اليومية',
    attractions: 'المعالم',
    pdfDownloading: 'جاري تحميل ملف PDF...',
    pdfSuccess: 'تم تحميل PDF بنجاح!',
    pdfError: 'حدث خطأ في تحميل PDF. الرجاء المحاولة مرة أخرى.',
    loginRequired: 'يجب تسجيل الدخول أولاً لحفظ الخطة',
    createPlanFirst: 'يجب إنشاء خطة أولاً',
    planSaved: '✅ تم حفظ الخطة بنجاح! يمكنك العثور عليها في "خططي"',
    goToMyPlans: 'هل تريد الذهاب لصفحة خططي المحفوظة؟',
    saveFailed: '❌ فشل حفظ الخطة. الرجاء المحاولة مرة أخرى.',
    canEditNow: 'يمكنك الآن تعديل اختياراتك',
    linkCopied: 'تم نسخ الرابط'
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
    compareSelected: 'Compare Selected Governorates',
    selectAtLeast2: 'Select at least 2 governorates to compare',
    max4Selection: 'You can compare up to 4 governorates',
    comparisonTitle: 'Governorate Comparison',
    dailyBudget: 'Daily Budget',
    attractions: 'Attractions',
    pdfDownloading: 'Downloading PDF file...',
    pdfSuccess: 'PDF downloaded successfully!',
    pdfError: 'Error downloading PDF. Please try again.',
    loginRequired: 'Please login first to save your plan',
    createPlanFirst: 'Please create a plan first',
    planSaved: '✅ Plan saved successfully! You can find it in "My Plans"',
    goToMyPlans: 'Do you want to go to My Saved Plans?',
    saveFailed: '❌ Failed to save plan. Please try again.',
    canEditNow: 'You can now edit your selections',
    linkCopied: 'Link copied'
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
    compareSelected: 'Comparer les Gouvernorats Sélectionnés',
    selectAtLeast2: 'Sélectionnez au moins 2 gouvernorats pour comparer',
    max4Selection: 'Vous pouvez comparer jusqu\'à 4 gouvernorats',
    comparisonTitle: 'Comparaison des Gouvernorats',
    dailyBudget: 'Budget Quotidien',
    attractions: 'Attractions',
    pdfDownloading: 'Téléchargement du fichier PDF...',
    pdfSuccess: 'PDF téléchargé avec succès!',
    pdfError: 'Erreur lors du téléchargement du PDF. Veuillez réessayer.',
    loginRequired: 'Veuillez d\'abord vous connecter pour enregistrer votre plan',
    createPlanFirst: 'Veuillez d\'abord créer un plan',
    planSaved: '✅ Plan enregistré avec succès! Vous pouvez le retrouver dans "Mes Plans"',
    goToMyPlans: 'Voulez-vous aller à Mes Plans Enregistrés?',
    saveFailed: '❌ Échec de l\'enregistrement du plan. Veuillez réessayer.',
    canEditNow: 'Vous pouvez maintenant modifier vos sélections',
    linkCopied: 'Lien copié'
  }
};

// نصائح السفر مترجمة بالكامل
const TRAVEL_TIPS = {
  ar: {
    history: [
      '📸 احرص على التقاط صور تذكارية عند كل معلم تاريخي',
      '🎫 احجز تذاكر المعالم الأثرية مسبقاً لتجنب الازدحام',
      '👥 استعن بمرشد سياحي محترف لفهم التاريخ بعمق',
      '🌅 زر المعالم في الصباح الباكر لتجنب الحر والزحام',
      '💧 احمل معك مياه كافية وواقي شمس',
      '📚 اقرأ عن تاريخ المكان قبل زيارته'
    ],
    islamic: [
      '👕 ارتدِ ملابس محتشمة عند زيارة المساجد والأماكن الدينية',
      '👞 اخلع حذاءك قبل دخول المساجد',
      '📿 احترم أوقات الصلاة وتجنب الإزعاج',
      '📷 استأذن قبل التصوير في الأماكن الدينية',
      '🤫 حافظ على الهدوء داخل دور العبادة',
      '🕌 تعرّف على العمارة الإسلامية وروعة الزخارف'
    ],
    beach: [
      '🏊 السباحة في الأماكن المخصصة والآمنة فقط',
      '☀️ استخدم واقي شمس قوي وكرر وضعه كل ساعتين',
      '🥽 جرّب الغطس والسنوركل لرؤية الشعاب المرجانية',
      '🌊 تحقق من حالة البحر قبل السباحة',
      '💦 اشرب كميات كافية من الماء',
      '🏖️ نظّف مكانك واحترم البيئة البحرية'
    ],
    desert: [
      '🐪 جرّب رحلة الجمال في الصحراء',
      '🌅 شاهد غروب الشمس الساحر في الصحراء',
      '⛺ جرّب التخييم ليلة تحت النجوم',
      '🧢 ارتدِ قبعة ونظارات شمسية للحماية',
      '🗺️ لا تغامر بالذهاب للصحراء بدون مرشد',
      '📱 تأكد من شحن هاتفك وإخبار أحدهم بخط سيرك'
    ],
    culture: [
      '🎭 شارك في الفعاليات الثقافية المحلية',
      '🛍️ زر الأسواق الشعبية واكتشف الحرف اليدوية',
      '🤝 تفاعل مع السكان المحليين بلطف واحترام',
      '🎨 تعرّف على الفنون والحرف التقليدية',
      '🎪 احضر العروض الفلكلورية والموسيقية',
      '📖 تعلّم بعض العبارات البسيطة بالعربية'
    ],
    food: [
      '🍽️ جرّب الأطباق المصرية التقليدية الأصيلة',
      '🥙 لا تفوّت تجربة الكشري والفول والطعمية',
      '☕ احتسِ الشاي والقهوة في المقاهي الشعبية',
      '🧃 تجنب مياه الصنبور واشرب المياه المعدنية',
      '🍰 جرّب الحلويات الشرقية التقليدية',
      '🥗 تأكد من نظافة المطعم قبل تناول الطعام'
    ]
  },
  en: {
    history: [
      '📸 Take memorable photos at each historical landmark',
      '🎫 Book archaeological site tickets in advance to avoid crowds',
      '👥 Hire a professional tour guide for deep historical understanding',
      '🌅 Visit landmarks early morning to avoid heat and crowds',
      '💧 Carry enough water and sunscreen',
      '📚 Read about the place\'s history before visiting'
    ],
    islamic: [
      '👕 Wear modest clothing when visiting mosques and religious sites',
      '👞 Remove your shoes before entering mosques',
      '📿 Respect prayer times and avoid disturbance',
      '📷 Ask permission before taking photos in religious places',
      '🤫 Maintain silence inside places of worship',
      '🕌 Learn about Islamic architecture and decorations'
    ],
    beach: [
      '🏊 Swim only in designated and safe areas',
      '☀️ Use strong sunscreen and reapply every two hours',
      '🥽 Try snorkeling to see coral reefs',
      '🌊 Check sea conditions before swimming',
      '💦 Drink plenty of water',
      '🏖️ Clean your area and respect the marine environment'
    ],
    desert: [
      '🐪 Try a camel ride in the desert',
      '🌅 Watch the magical sunset in the desert',
      '⛺ Try camping under the stars',
      '🧢 Wear a hat and sunglasses for protection',
      '🗺️ Don\'t venture into the desert without a guide',
      '📱 Ensure your phone is charged and inform someone of your route'
    ],
    culture: [
      '🎭 Participate in local cultural events',
      '🛍️ Visit local markets and discover handicrafts',
      '🤝 Interact with locals kindly and respectfully',
      '🎨 Learn about traditional arts and crafts',
      '🎪 Attend folkloric and musical performances',
      '📖 Learn some simple Arabic phrases'
    ],
    food: [
      '🍽️ Try authentic traditional Egyptian dishes',
      '🥙 Don\'t miss trying Koshari, Ful, and Falafel',
      '☕ Have tea and coffee in traditional cafes',
      '🧃 Avoid tap water and drink bottled water',
      '🍰 Try traditional Middle Eastern sweets',
      '🥗 Ensure restaurant cleanliness before eating'
    ]
  },
  fr: {
    history: [
      '📸 Prenez des photos mémorables à chaque monument historique',
      '🎫 Réservez les billets des sites archéologiques à l\'avance',
      '👥 Engagez un guide touristique professionnel pour une compréhension approfondie',
      '🌅 Visitez les monuments tôt le matin pour éviter la chaleur et la foule',
      '💧 Emportez suffisamment d\'eau et de crème solaire',
      '📚 Lisez sur l\'histoire du lieu avant de visiter'
    ],
    islamic: [
      '👕 Portez des vêtements modestes lors de la visite des mosquées',
      '👞 Enlevez vos chaussures avant d\'entrer dans les mosquées',
      '📿 Respectez les heures de prière et évitez le dérangement',
      '📷 Demandez la permission avant de photographier',
      '🤫 Maintenez le silence dans les lieux de culte',
      '🕌 Apprenez sur l\'architecture islamique et les décorations'
    ],
    beach: [
      '🏊 Nagez uniquement dans les zones désignées et sûres',
      '☀️ Utilisez une crème solaire forte et réappliquez toutes les deux heures',
      '🥽 Essayez la plongée avec tuba pour voir les récifs coralliens',
      '🌊 Vérifiez les conditions de la mer avant de nager',
      '💦 Buvez beaucoup d\'eau',
      '🏖️ Nettoyez votre zone et respectez l\'environnement marin'
    ],
    desert: [
      '🐪 Essayez une balade à chameau dans le désert',
      '🌅 Regardez le coucher de soleil magique dans le désert',
      '⛺ Essayez le camping sous les étoiles',
      '🧢 Portez un chapeau et des lunettes de soleil pour vous protéger',
      '🗺️ Ne vous aventurez pas dans le désert sans guide',
      '📱 Assurez-vous que votre téléphone est chargé et informez quelqu\'un de votre itinéraire'
    ],
    culture: [
      '🎭 Participez aux événements culturels locaux',
      '🛍️ Visitez les marchés locaux et découvrez l\'artisanat',
      '🤝 Interagissez avec les habitants gentiment et respectueusement',
      '🎨 Apprenez les arts et artisanats traditionnels',
      '🎪 Assistez aux spectacles folkloriques et musicaux',
      '📖 Apprenez quelques phrases simples en arabe'
    ],
    food: [
      '🍽️ Essayez les plats traditionnels égyptiens authentiques',
      '🥙 Ne manquez pas d\'essayer le Koshari, le Ful et les Falafels',
      '☕ Prenez du thé et du café dans les cafés traditionnels',
      '🧃 Évitez l\'eau du robinet et buvez de l\'eau en bouteille',
      '🍰 Essayez les pâtisseries orientales traditionnelles',
      '🥗 Assurez-vous de la propreté du restaurant avant de manger'
    ]
  }
};

// قاعدة بيانات المناطق والمحافظات (مختصرة)
const REGIONS={
  'القاهرة الكبرى':{
    nameEn:'Greater Cairo',
    nameFr:'Grand Caire',
    emoji:'🏛️',
    desc:'قلب مصر النابض بالحياة والتاريخ',
    descEn:'The vibrant heart of Egypt, pulsing with life and history',
    descFr:'Le cœur vibrant de l\'Égypte, palpitant de vie et d\'histoire',
    governorates:{
      cairo:{icon:'🏛️',name:'القاهرة',nameEn:'Cairo',nameFr:'Le Caire',type:'عاصمة تاريخية',typeEn:'Historic Capital',typeFr:'Capitale Historique',desc:'مدينة الألف مئذنة والأهرامات',descEn:'City of a Thousand Minarets and Pyramids',descFr:'Ville aux Mille Minarets et Pyramides',attractions:['الأهرامات','المتحف المصري','خان الخليلي','برج القاهرة','قلعة صلاح الدين','مسجد محمد علي','حي المعز','الفسطاط'],attractionsEn:['Pyramids','Egyptian Museum','Khan El-Khalili','Cairo Tower','Saladin Citadel','Muhammad Ali Mosque','Al-Muizz Street','Fustat'],attractionsFr:['Pyramides','Musée Égyptien','Khan El-Khalili','Tour du Caire','Citadelle de Saladin','Mosquée Mohamed Ali','Rue Al-Muizz','Fustat'],budget:{budget:400,moderate:1000,luxury:3000},activities:{history:['زيارة الأهرامات الثلاثة وأبو الهول','المتحف المصري الكبير','قلعة صلاح الدين الأيوبي','مدينة ممفيس القديمة'],historyEn:['Visit the Three Pyramids and Sphinx','Grand Egyptian Museum','Saladin Citadel','Ancient Memphis City'],historyFr:['Visiter les Trois Pyramides et le Sphinx','Grand Musée Égyptien','Citadelle de Saladin','Ancienne Ville de Memphis'],islamic:['مسجد محمد علي','مسجد السلطان حسن','جامع الأزهر الشريف','خان الخليلي'],islamicEn:['Muhammad Ali Mosque','Sultan Hassan Mosque','Al-Azhar Mosque','Khan El-Khalili'],islamicFr:['Mosquée Mohamed Ali','Mosquée du Sultan Hassan','Mosquée Al-Azhar','Khan El-Khalili'],culture:['حي المعز لدين الله الفاطمي','مدينة الفسطاط','سوق الجمعة','المسرح الروماني'],cultureEn:['Al-Muizz Street','Fustat City','Friday Market','Roman Theatre'],cultureFr:['Rue Al-Muizz','Ville de Fustat','Marché du Vendredi','Théâtre Romain'],food:['مطاعم وسط البلد','كشري التحرير','فطير الحسين','قهاوي الأزهر'],foodEn:['Downtown Restaurants','Tahrir Koshari','Hussein Feteer','Al-Azhar Cafes'],foodFr:['Restaurants du Centre-Ville','Koshari de Tahrir','Feteer de Hussein','Cafés d\'Al-Azhar']}},
      giza:{icon:'🔺',name:'الجيزة',nameEn:'Giza',nameFr:'Gizeh',type:'عجائب الدنيا',typeEn:'Wonders of the World',typeFr:'Merveilles du Monde',desc:'موطن الأهرامات الخالدة',descEn:'Home of the eternal Pyramids',descFr:'Foyer des Pyramides éternelles',attractions:['أهرامات الجيزة','أبو الهول','سقارة','دهشور','هرم زوسر'],attractionsEn:['Giza Pyramids','Sphinx','Saqqara','Dahshur','Pyramid of Djoser'],attractionsFr:['Pyramides de Gizeh','Sphinx','Saqqarah','Dahchour','Pyramide de Djéser'],budget:{budget:350,moderate:900,luxury:2800},activities:{history:['جولة الأهرامات الثلاثة','هرم زوسر المدرج بسقارة','الأهرامات الحمراء بدهشور','متحف المركب الشمسي'],historyEn:['Three Pyramids Tour','Saqqara Step Pyramid of Djoser','Red Pyramids of Dahshur','Solar Boat Museum'],historyFr:['Visite des Trois Pyramides','Pyramide à Degrés de Djéser à Saqqarah','Pyramides Rouges de Dahchour','Musée du Bateau Solaire'],desert:['جولة جمال حول الأهرامات','رحلة سفاري صحراوية','غروب الشمس الصحراوي','التخييم الصحراوي'],desertEn:['Camel Tour Around Pyramids','Desert Safari Trip','Desert Sunset','Desert Camping'],desertFr:['Tour en Chameau Autour des Pyramides','Safari dans le Désert','Coucher de Soleil dans le Désert','Camping dans le Désert'],culture:['قرية كرداسة للحرف','حديقة الحيوان بالجيزة','شارع الهرم التجاري'],cultureEn:['Kerdasa Craft Village','Giza Zoo','Haram Commercial Street'],cultureFr:['Village d\'Artisanat de Kerdasa','Zoo de Gizeh','Rue Commerciale Haram']}}
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
      alexandria:{icon:'🏖️',name:'الإسكندرية',nameEn:'Alexandria',nameFr:'Alexandrie',type:'عروس المتوسط',typeEn:'Bride of the Mediterranean',typeFr:'Épouse de la Méditerranée',desc:'مكتبة الإسكندرية وقلعة قايتباي',descEn:'Library of Alexandria and Qaitbay Citadel',descFr:'Bibliothèque d\'Alexandrie et Citadelle de Qaitbay',attractions:['مكتبة الإسكندرية','قلعة قايتباي','عمود السواري','المسرح الروماني','كورنيش الإسكندرية','قصر المنتزه'],attractionsEn:['Library of Alexandria','Qaitbay Citadel','Pompey\'s Pillar','Roman Theatre','Alexandria Corniche','Montazah Palace'],attractionsFr:['Bibliothèque d\'Alexandrie','Citadelle de Qaitbay','Colonne de Pompée','Théâtre Romain','Corniche d\'Alexandrie','Palais Montazah'],budget:{budget:450,moderate:1100,luxury:3200},activities:{beach:['شواطئ ستانلي','شاطئ المعمورة','كورنيش الإسكندرية','شاطئ العجمي'],beachEn:['Stanley Beaches','Mamoura Beach','Alexandria Corniche','Agami Beach'],beachFr:['Plages de Stanley','Plage Mamoura','Corniche d\'Alexandrie','Plage Agami'],history:['قلعة قايتباي','المسرح الروماني','كوم الشقافة','متحف الآثار','عمود السواري'],historyEn:['Qaitbay Citadel','Roman Theatre','Kom El Shoqafa','Archaeological Museum','Pompey\'s Pillar'],historyFr:['Citadelle de Qaitbay','Théâtre Romain','Kom El Shoqafa','Musée Archéologique','Colonne de Pompée'],culture:['مكتبة الإسكندرية الحديثة','حي الأنفوشي','سوق زنقة الستات','قصر المنتزه'],cultureEn:['Modern Library of Alexandria','Anfoushi District','Zanqet Elsetat Market','Montazah Palace'],cultureFr:['Bibliothèque Moderne d\'Alexandrie','Quartier Anfoushi','Marché Zanqet Elsetat','Palais Montazah'],food:['مطاعم الأسماك الطازجة','محمد أحمد للفول','كافيهات البحر','حلويات السمان'],foodEn:['Fresh Fish Restaurants','Mohamed Ahmed Ful','Sea Cafes','Al-Samman Sweets'],foodFr:['Restaurants de Poisson Frais','Mohamed Ahmed Ful','Cafés de Mer','Pâtisseries Al-Samman']}}
    }
  }
};

const app={
  lang:localStorage.getItem('lang')||'ar',
  currency:localStorage.getItem('currency')||'EGP',
  user:null,
  selection:{region:null,governorate:null,days:3,travelers:2,budget:'moderate',interests:[]},
  compareSelection:[],
  currentPlan:null,

  init(){
    this.setupAuth();
    this.setupLanguage();
    this.renderSteps();
    this.renderCompareSelector();
    this.updateUI();
  },

  setupAuth(){
    auth.onAuthStateChanged(user=>{
      this.user=user;
      this.updateUserDisplay();
    });
  },

  updateUserDisplay(){
    const userBtn=document.getElementById('userAccountBtn');
    if(!userBtn)return;

    if(this.user){
      const photoURL=this.user.photoURL||'';
      const displayName=this.user.displayName||this.user.email||'User';
      userBtn.innerHTML=photoURL?`<img src="${photoURL}" alt="" style="width:35px;height:35px;border-radius:50%;object-fit:cover;border:2px solid white;">`:`<span style="width:35px;height:35px;border-radius:50%;background:#fff;color:#667eea;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px;">${displayName.charAt(0).toUpperCase()}</span>`;
      
      // إضافة قائمة منسدلة
      userBtn.onclick=()=>this.showUserMenu();
    }else{
      userBtn.innerHTML='<span>👤</span>';
      userBtn.onclick=()=>window.location.href='../login.html';
    }
  },

  showUserMenu(){
    const menu=document.createElement('div');
    menu.className='user-dropdown-menu';
    menu.style.cssText=`
      position:absolute;
      top:60px;
      left:20px;
      background:white;
      border-radius:12px;
      box-shadow:0 8px 24px rgba(0,0,0,0.15);
      padding:10px 0;
      min-width:200px;
      z-index:9999;
      animation:slideDown 0.3s ease;
    `;
    
    menu.innerHTML=`
      <div style="padding:12px 20px;border-bottom:1px solid #eee;">
        <div style="font-weight:700;color:#1a1a2e;margin-bottom:4px;">${this.user.displayName||this.user.email}</div>
        <div style="font-size:12px;color:#999;">${this.user.email}</div>
      </div>
      <a href="../my-plans.html" style="display:block;padding:12px 20px;color:#333;text-decoration:none;transition:all 0.2s;" onmouseover="this.style.background='#f5f5f5'" onmouseout="this.style.background='transparent'">
        <span style="margin-left:8px;">📋</span> ${this.t('myPlans')}
      </a>
      <a href="../index.html#settings" style="display:block;padding:12px 20px;color:#333;text-decoration:none;transition:all 0.2s;" onmouseover="this.style.background='#f5f5f5'" onmouseout="this.style.background='transparent'">
        <span style="margin-left:8px;">⚙️</span> الإعدادات
      </a>
      <div style="border-top:1px solid #eee;margin:8px 0;"></div>
      <a href="#" onclick="firebase.auth().signOut();return false;" style="display:block;padding:12px 20px;color:#d32f2f;text-decoration:none;transition:all 0.2s;" onmouseover="this.style.background='#fff5f5'" onmouseout="this.style.background='transparent'">
        <span style="margin-left:8px;">🚪</span> تسجيل الخروج
      </a>
    `;
    
    // إزالة القوائم القديمة
    document.querySelectorAll('.user-dropdown-menu').forEach(m=>m.remove());
    document.body.appendChild(menu);
    
    // إغلاق القائمة عند النقر خارجها
    setTimeout(()=>{
      document.addEventListener('click',function closeMenu(e){
        if(!menu.contains(e.target)&&!document.getElementById('userAccountBtn').contains(e.target)){
          menu.remove();
          document.removeEventListener('click',closeMenu);
        }
      });
    },100);
  },

  setupLanguage(){
    document.querySelectorAll('.lang-btn').forEach(btn=>{
      btn.addEventListener('click',()=>{
        this.setLang(btn.dataset.lang);
      });
      if(btn.dataset.lang===this.lang)btn.classList.add('active');
    });

    document.querySelectorAll('.currency-btn').forEach(btn=>{
      btn.addEventListener('click',()=>{
        this.setCurrency(btn.dataset.currency);
      });
      if(btn.dataset.currency===this.currency)btn.classList.add('active');
    });
  },

  setLang(lang){
    this.lang=lang;
    localStorage.setItem('lang',lang);
    document.documentElement.lang=lang;
    document.documentElement.dir=lang==='ar'?'rtl':'ltr';
    document.querySelectorAll('.lang-btn').forEach(btn=>{
      btn.classList.toggle('active',btn.dataset.lang===lang);
    });
    this.updateUI();
  },

  setCurrency(currency){
    this.currency=currency;
    localStorage.setItem('currency',currency);
    document.querySelectorAll('.currency-btn').forEach(btn=>{
      btn.classList.toggle('active',btn.dataset.currency===currency);
    });
    this.updateUI();
  },

  t(key){
    return TRANSLATIONS[this.lang]&&TRANSLATIONS[this.lang][key]?TRANSLATIONS[this.lang][key]:key;
  },

  updateUI(){
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key=el.dataset.i18n;
      el.textContent=this.t(key);
    });
    this.renderSteps();
    this.renderCompareSelector();
    if(this.currentPlan){
      this.generatePlan();
    }
  },

  renderSteps(){
    this.renderStep1();
    this.renderStep2();
    this.renderStep3();
  },

  renderStep1(){
    const container=document.getElementById('regionsGrid');
    if(!container)return;

    container.innerHTML='';
    Object.keys(REGIONS).forEach(key=>{
      const r=REGIONS[key];
      const name=this.lang==='ar'?key:this.lang==='en'?(r.nameEn||key):(r.nameFr||key);
      const desc=this.lang==='ar'?r.desc:this.lang==='en'?(r.descEn||r.desc):(r.descFr||r.desc);

      const card=document.createElement('div');
      card.className='region-card';
      if(this.selection.region===key)card.classList.add('selected');
      card.innerHTML=`
        <div class="region-emoji">${r.emoji}</div>
        <div class="region-name">${name}</div>
        <div class="region-desc">${desc}</div>
        <div class="region-count">${Object.keys(r.governorates||{}).length} ${this.t('governorateLabel')}</div>
      `;
      card.onclick=()=>{
        this.selection.region=key;
        this.selection.governorate=null;
        this.renderSteps();
        document.getElementById('step2').scrollIntoView({behavior:'smooth'});
      };
      container.appendChild(card);
    });
  },

  renderStep2(){
    const container=document.getElementById('governoratesGrid');
    if(!container)return;

    container.innerHTML='';
    if(!this.selection.region){
      container.innerHTML=`<div style="grid-column:1/-1;text-align:center;padding:40px;color:#999;">${this.t('selectGovFirst')}</div>`;
      return;
    }

    const region=REGIONS[this.selection.region];
    if(!region||!region.governorates)return;

    Object.keys(region.governorates).forEach(key=>{
      const gov=region.governorates[key];
      const name=this.lang==='ar'?gov.name:this.lang==='en'?(gov.nameEn||gov.name):(gov.nameFr||gov.name);
      const type=this.lang==='ar'?gov.type:this.lang==='en'?(gov.typeEn||gov.type):(gov.typeFr||gov.type);
      const desc=this.lang==='ar'?gov.desc:this.lang==='en'?(gov.descEn||gov.desc):(gov.descFr||gov.desc);
      const attractions=this.lang==='ar'?gov.attractions:this.lang==='en'?(gov.attractionsEn||gov.attractions):(gov.attractionsFr||gov.attractions);

      const card=document.createElement('div');
      card.className='governorate-card';
      if(this.selection.governorate===key)card.classList.add('selected');
      card.innerHTML=`
        <div class="gov-header">
          <span class="gov-icon">${gov.icon||'🏛️'}</span>
          <div class="gov-info">
            <div class="gov-name">${name}</div>
            <div class="gov-type">${type}</div>
          </div>
        </div>
        <div class="gov-desc">${desc}</div>
        <div class="gov-price">${this.formatPrice(gov.budget?.moderate||1000)} ${this.t('perDay')}</div>
        <div class="gov-count">${attractions&&Array.isArray(attractions)?attractions.length:0}${this.t('monumentCount')}</div>
      `;
      card.onclick=()=>{
        this.selection.governorate=key;
        this.renderSteps();
        document.getElementById('step3').scrollIntoView({behavior:'smooth'});
      };
      container.appendChild(card);
    });
  },

  renderStep3(){
    const container=document.getElementById('tripOptions');
    if(!container)return;

    if(!this.selection.governorate){
      container.innerHTML='';
      return;
    }

    const region=REGIONS[this.selection.region];
    const gov=region?.governorates?.[this.selection.governorate];
    if(!gov)return;

    const daysHTML=`
      <div class="option-group">
        <label>${this.t('duration')}</label>
        <div class="counter">
          <button onclick="app.changeDays(-1)">-</button>
          <span id="daysDisplay">${this.selection.days} ${this.selection.days===1?this.t('day'):this.t('days')}</span>
          <button onclick="app.changeDays(1)">+</button>
        </div>
      </div>
    `;

    const travelersHTML=`
      <div class="option-group">
        <label>${this.t('numberOfTravelers')}</label>
        <div class="counter">
          <button onclick="app.changeTravelers(-1)">-</button>
          <span id="travelersDisplay">${this.selection.travelers} ${this.selection.travelers===1?this.t('traveler'):this.t('travelers')}</span>
          <button onclick="app.changeTravelers(1)">+</button>
        </div>
      </div>
    `;

    const budgetHTML=`
      <div class="option-group">
        <label>${this.t('budgetLevel')}</label>
        <div class="budget-options">
          ${['budget','moderate','luxury'].map(b=>{
            const price=gov.budget?.[b==='budget'?'budget':b]||0;
            const label=this.t(b==='budget'?'economic':b);
            const desc=this.t(b==='budget'?'economicDesc':b+'Desc');
            return `
              <div class="budget-card ${this.selection.budget===b?'selected':''}" onclick="app.setBudget('${b}')">
                <div class="budget-label">${label}</div>
                <div class="budget-price">${this.formatPrice(price)}${this.t('perDay')}</div>
                <div class="budget-desc">${desc}</div>
                ${b==='moderate'?`<div class="popular-badge">${this.t('mostPopular')}</div>`:''}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    const activities=gov.activities||{};
    const interestOptions=[
      {key:'history',icon:'🏛️',count:this.t('monumentCount')},
      {key:'islamic',icon:'🕌',count:this.t('mosqueCount')},
      {key:'beach',icon:'🏖️',count:this.t('beachCount')},
      {key:'desert',icon:'🏜️',count:this.t('oasisCount')},
      {key:'culture',icon:'🎭',count:this.t('marketCount')},
      {key:'food',icon:'🍽️',count:this.t('restaurantCount')}
    ];

    const interestsHTML=`
      <div class="option-group">
        <label>${this.t('interests')}</label>
        <div class="interests-grid">
          ${interestOptions.map(int=>{
            const label=this.t(int.key==='history'?'pharaonicMonuments':int.key==='islamic'?'islamicArchitecture':int.key==='beach'?'beachesAndSeas':int.key==='desert'?'desertAndSafari':int.key==='culture'?'localCulture':'foodTasting');
            const hasActivity=activities[int.key]&&Array.isArray(activities[int.key])&&activities[int.key].length>0;
            return hasActivity?`
              <div class="interest-card ${this.selection.interests.includes(int.key)?'selected':''}" onclick="app.toggleInterest('${int.key}')">
                <div class="interest-icon">${int.icon}</div>
                <div class="interest-name">${label}</div>
                <div class="interest-count">${activities[int.key].length}${int.count}</div>
              </div>
            `:'';
          }).join('')}
        </div>
      </div>
    `;

    container.innerHTML=daysHTML+travelersHTML+budgetHTML+interestsHTML;
  },

  changeDays(delta){
    this.selection.days=Math.max(1,Math.min(14,this.selection.days+delta));
    document.getElementById('daysDisplay').textContent=`${this.selection.days} ${this.selection.days===1?this.t('day'):this.t('days')}`;
  },

  changeTravelers(delta){
    this.selection.travelers=Math.max(1,Math.min(10,this.selection.travelers+delta));
    document.getElementById('travelersDisplay').textContent=`${this.selection.travelers} ${this.selection.travelers===1?this.t('traveler'):this.t('travelers')}`;
  },

  setBudget(budget){
    this.selection.budget=budget;
    this.renderStep3();
  },

  toggleInterest(interest){
    const idx=this.selection.interests.indexOf(interest);
    if(idx>-1)this.selection.interests.splice(idx,1);
    else this.selection.interests.push(interest);
    this.renderStep3();
  },

  generatePlan(){
    if(!this.selection.governorate){
      alert(this.t('selectGovFirst'));
      return;
    }

    this.showLoader();
    setTimeout(()=>{
      this.createPlan();
      this.hideLoader();
    },1500);
  },

  createPlan(){
    const region=REGIONS[this.selection.region];
    const g=region?.governorates?.[this.selection.governorate];
    if(!g)return;

    const name=this.lang==='ar'?g.name:this.lang==='en'?(g.nameEn||g.name):(g.nameFr||g.name);
    const type=this.lang==='ar'?g.type:this.lang==='en'?(g.typeEn||g.type):(g.typeFr||g.type);
    const desc=this.lang==='ar'?g.desc:this.lang==='en'?(g.descEn||g.desc):(g.descFr||g.desc);
    const attractions=this.lang==='ar'?g.attractions:this.lang==='en'?(g.attractionsEn||g.attractions):(g.attractionsFr||g.attractions);
    
    const{days,travelers,budget,interests}=this.selection;
    const daily=g.budget?.[budget==='budget'?'budget':budget]||1000;
    const total=daily*days*travelers;

    const budgetType=budget==='budget'?this.t('economicTrip'):budget==='moderate'?this.t('moderateTrip'):this.t('luxuryTrip');

    const html=`
      <div class="plan-container" id="planToPrint">
        <div class="plan-header">
          <h2>${g.icon||'🏛️'} ${this.t('tripTo')} ${name}</h2>
          <div class="plan-meta">
            <span>${days} ${days===1?this.t('day'):this.t('days')}</span>
            <span>•</span>
            <span>${travelers} ${travelers===1?this.t('traveler'):this.t('travelers')}</span>
            <span>•</span>
            <span>${budgetType}</span>
          </div>
        </div>

        <div class="plan-actions">
          <button onclick="app.downloadPDF()" class="btn-action primary">
            <span>📥</span> ${this.t('downloadPDF')}
          </button>
          <button onclick="app.savePlan()" class="btn-action success">
            <span>💾</span> ${this.t('savePlan')}
          </button>
          <button onclick="app.editPlan()" class="btn-action">
            <span>✏️</span> ${this.t('editPlan')}
          </button>
          <button onclick="app.sharePlan()" class="btn-action">
            <span>🔗</span> ${this.t('sharePlan')}
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
      const langKey=this.lang+'En';
      const acts=gov.activities&&gov.activities[int+langKey.charAt(0).toUpperCase()+langKey.slice(1)]?gov.activities[int+langKey.charAt(0).toUpperCase()+langKey.slice(1)]:
                gov.activities&&gov.activities[int]?gov.activities[int]:[];
      
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
    if(!interests||!Array.isArray(interests))return tips;

    interests.forEach(int=>{
      if(TRAVEL_TIPS[this.lang]&&TRAVEL_TIPS[this.lang][int]){
        tips.push(...TRAVEL_TIPS[this.lang][int]);
      }
    });

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
    const element=document.getElementById('planToPrint');
    if(!element){
      alert(this.t('createPlanFirst'));
      return;
    }

    try{
      this.showLoader();
      document.getElementById('loader').querySelector('.loader-text').textContent=this.t('pdfDownloading');

      await new Promise(resolve=>setTimeout(resolve,800));

      element.style.display='block';
      element.style.opacity='1';

      const opt={
        margin:[10,10,10,10],
        filename:`egypt-trip-${this.selection.governorate||'plan'}-${Date.now()}.pdf`,
        image:{type:'jpeg',quality:0.98},
        html2canvas:{
          scale:2,
          useCORS:true,
          logging:false,
          letterRendering:true,
          allowTaint:true,
          backgroundColor:'#ffffff',
          windowWidth:1200,
          windowHeight:element.scrollHeight
        },
        jsPDF:{
          unit:'mm',
          format:'a4',
          orientation:'portrait',
          compress:true
        },
        pagebreak:{
          mode:['avoid-all','css','legacy'],
          before:'.page-break-before',
          after:'.page-break-after',
          avoid:['.no-break','.budget-summary','.attractions-list']
        }
      };

      if(typeof html2pdf==='undefined'){
        throw new Error('PDF library not loaded. Please refresh the page and try again.');
      }

      await html2pdf().set(opt).from(element).save();

      this.hideLoader();
      alert(this.t('pdfSuccess'));

    }catch(error){
      console.error('PDF Error:',error);
      this.hideLoader();
      alert(this.t('pdfError'));
    }
  },

  editPlan(){
    document.getElementById('step1').scrollIntoView({behavior:'smooth'});
    alert(this.t('canEditNow'));
  },

  async savePlan(){
    if(!this.user){
      alert(this.t('loginRequired'));
      window.location.href='../login.html';
      return;
    }

    if(!this.selection.governorate){
      alert(this.t('createPlanFirst'));
      return;
    }

    try{
      const planData={
        userId:this.user.uid,
        userEmail:this.user.email,
        userName:this.user.displayName||this.user.email,
        region:this.selection.region,
        governorate:this.selection.governorate,
        duration:this.selection.days,
        days:this.selection.days,
        travelers:this.selection.travelers,
        budget:this.selection.budget,
        interests:this.selection.interests||[],
        language:this.lang,
        currency:this.currency,
        timestamp:Date.now(),
        createdAt:firebase.firestore.FieldValue.serverTimestamp(),
        planData:this.currentPlan
      };

      await db.collection('plans').add(planData);
      
      alert(this.t('planSaved'));

      const redirect=confirm(this.t('goToMyPlans'));
      if(redirect){
        window.location.href='../my-plans.html';
      }

    }catch(error){
      console.error('Save Plan Error:',error);
      alert(this.t('saveFailed'));
    }
  },

  sharePlan(){
    const url=window.location.href;
    const title=this.t('siteName');
    const text=this.lang==='ar'?'شاهد خطة رحلتي إلى مصر!':this.lang==='en'?'Check out my Egypt trip plan!':'Découvrez mon plan de voyage en Égypte!';

    if(navigator.share){
      navigator.share({title,text,url}).catch(e=>console.log('Share cancelled'));
    }else{
      navigator.clipboard.writeText(url);
      alert(this.t('linkCopied'));
    }
  },

  formatPrice(amount){
    if(!amount||isNaN(amount))return SYMBOLS[this.currency]+'0';
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

  renderCompareSelector(){
    const container=document.getElementById('compareSelectorGrid');
    if(!container)return;

    container.innerHTML='';
    const allGovs=[];

    Object.keys(REGIONS).forEach(regionKey=>{
      const region=REGIONS[regionKey];
      if(region.governorates){
        Object.keys(region.governorates).forEach(govKey=>{
          const gov=region.governorates[govKey];
          allGovs.push({
            key:govKey,
            data:gov,
            region:regionKey
          });
        });
      }
    });

    allGovs.forEach(gov=>{
      const name=this.lang==='ar'?gov.data.name:this.lang==='en'?(gov.data.nameEn||gov.data.name):(gov.data.nameFr||gov.data.name);
      const type=this.lang==='ar'?gov.data.type:this.lang==='en'?(gov.data.typeEn||gov.data.type):(gov.data.typeFr||gov.data.type);

      const item=document.createElement('div');
      item.className='compare-item';
      item.innerHTML=`
        <div class="compare-item-icon">${gov.data.icon||'🏛️'}</div>
        <div class="compare-item-name">${name}</div>
        <div class="compare-item-type">${type}</div>
      `;

      item.onclick=()=>this.toggleCompareSelection(gov);

      if(this.compareSelection.find(g=>g.key===gov.key)){
        item.classList.add('selected');
      }

      container.appendChild(item);
    });
  },

  toggleCompareSelection(gov){
    const index=this.compareSelection.findIndex(g=>g.key===gov.key);

    if(index>-1){
      this.compareSelection.splice(index,1);
    }else{
      if(this.compareSelection.length>=4){
        alert(this.t('max4Selection'));
        return;
      }
      this.compareSelection.push(gov);
    }

    this.renderCompareSelector();

    const btn=document.getElementById('compareBtn');
    if(btn){
      btn.disabled=this.compareSelection.length<2;
    }
  },

  showComparison(){
    if(this.compareSelection.length<2){
      alert(this.t('selectAtLeast2'));
      return;
    }

    const container=document.getElementById('compareContainer');
    if(!container)return;

    let html=`
      <div class="comparison-table">
        <div class="comparison-header">
          <h3>${this.t('comparisonTitle')}</h3>
        </div>
        <div class="comparison-cards">
    `;

    this.compareSelection.forEach(gov=>{
      if(!gov||!gov.data)return;

      const name=this.lang==='ar'?gov.data.name:this.lang==='en'?(gov.data.nameEn||gov.data.name):(gov.data.nameFr||gov.data.name);
      const type=this.lang==='ar'?gov.data.type:this.lang==='en'?(gov.data.typeEn||gov.data.type):(gov.data.typeFr||gov.data.type);
      const attractions=this.lang==='ar'?gov.data.attractions:this.lang==='en'?(gov.data.attractionsEn||gov.data.attractions):(gov.data.attractionsFr||gov.data.attractions);

      const budget=gov.data.budget||{budget:400,moderate:1000,luxury:3000};
      const attractionCount=attractions&&Array.isArray(attractions)?attractions.length:0;

      html+=`
        <div class="comparison-card">
          <div class="comparison-card-header">
            <div class="comparison-card-icon">${gov.data.icon||'🏛️'}</div>
            <div class="comparison-card-name">${name}</div>
            <div class="comparison-card-type">${type}</div>
          </div>
          <div class="comparison-card-body">
            <div class="comparison-card-item">
              <span class="comparison-card-item-label">${this.t('dailyBudget')} (${this.t('economic')})</span>
              <span class="comparison-card-item-value">${this.formatPrice(budget.budget)}</span>
            </div>
            <div class="comparison-card-item">
              <span class="comparison-card-item-label">${this.t('dailyBudget')} (${this.t('moderate')})</span>
              <span class="comparison-card-item-value">${this.formatPrice(budget.moderate)}</span>
            </div>
            <div class="comparison-card-item">
              <span class="comparison-card-item-label">${this.t('dailyBudget')} (${this.t('luxury')})</span>
              <span class="comparison-card-item-value">${this.formatPrice(budget.luxury)}</span>
            </div>
            <div class="comparison-card-item">
              <span class="comparison-card-item-label">${this.t('attractions')}</span>
              <span class="comparison-card-item-value">${attractionCount}+</span>
            </div>
          </div>
        </div>
      `;
    });

    html+=`
        </div>
      </div>
    `;

    container.innerHTML=html;
    container.style.display='block';
    container.scrollIntoView({behavior:'smooth',block:'start'});
  }
};

document.addEventListener('DOMContentLoaded',()=>app.init());
