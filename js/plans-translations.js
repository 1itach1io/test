/* ============================================
   PLANS SECTION TRANSLATION SYSTEM
   Translates all Arabic texts in Plans section
   ============================================ */

function translatePlansSection() {
    if (!translations[currentLanguage] || !translations[currentLanguage].plans) return;

    const lang = translations[currentLanguage].plans;

    // Hero Badge
    const heroBadge = document.querySelector('.hero-badge span:nth-child(2)');
    if (heroBadge) {
        heroBadge.textContent = lang.heroTitle || 'خطط رحلتك المثالية';
    }

    // Hero Title
    const heroTitleLine = document.querySelector('.title-line');
    const heroTitleHighlight = document.querySelector('.title-highlight');
    if (heroTitleLine && heroTitleHighlight && lang.heroSubtitle) {
        // Split the subtitle
        const parts = lang.heroSubtitle.split(' ');
        if (currentLanguage === 'ar') {
            heroTitleLine.textContent = 'استكشف جمال';
            heroTitleHighlight.textContent = 'مصر الساحرة';
        } else if (currentLanguage === 'en') {
            heroTitleLine.textContent = 'Explore the Magic';
            heroTitleHighlight.textContent = 'of Egypt';
        } else if (currentLanguage === 'fr') {
            heroTitleLine.textContent = 'Découvrez la Magie';
            heroTitleHighlight.textContent = 'de l\'Égypte';
        }
    }

    // Hero Subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        heroSubtitle.textContent = lang.heroDescription || 'رحلة عبر 7000 عام من الحضارة';
    }

    // Quick Stats Labels
    const statLabels = document.querySelectorAll('.stat-label');
    if (statLabels.length >= 3) {
        statLabels[0].textContent = lang.governorates || 'محافظة';
        statLabels[1].textContent = lang.attractions || 'معلم سياحي';
        statLabels[2].textContent = lang.regions || 'مناطق';
        if (statLabels[3]) {
            statLabels[3].textContent = currentLanguage === 'ar' ? 'ذكريات' :
                                       currentLanguage === 'en' ? 'Memories' : 'Souvenirs';
        }
    }

    // Section Header
    const sectionHeaders = document.querySelectorAll('.section-header h2');
    if (sectionHeaders[0]) {
        sectionHeaders[0].textContent = currentLanguage === 'ar' ? 'ابدأ التخطيط لرحلتك' :
                                       currentLanguage === 'en' ? 'Start Planning Your Trip' :
                                       'Commencez à planifier votre voyage';
    }

    const sectionHeaderP = document.querySelectorAll('.section-header p');
    if (sectionHeaderP[0]) {
        sectionHeaderP[0].textContent = currentLanguage === 'ar' ? 'اختر تفضيلاتك وسنصمم لك برنامجاً مخصصاً' :
                                       currentLanguage === 'en' ? 'Choose your preferences and we will create a customized program for you' :
                                       'Choisissez vos préférences et nous créerons un programme personnalisé pour vous';
    }

    // Step Headers
    const stepHeaders = document.querySelectorAll('.step-header h3');
    if (stepHeaders[0]) {
        stepHeaders[0].textContent = currentLanguage === 'ar' ? 'اختر المنطقة' :
                                    currentLanguage === 'en' ? 'Choose Region' :
                                    'Choisissez la région';
    }
    if (stepHeaders[1]) {
        stepHeaders[1].textContent = currentLanguage === 'ar' ? 'اختر المحافظة' :
                                    currentLanguage === 'en' ? 'Choose Governorate' :
                                    'Choisissez le gouvernorat';
    }
    if (stepHeaders[2]) {
        stepHeaders[2].textContent = currentLanguage === 'ar' ? 'حدد تفاصيل الرحلة' :
                                    currentLanguage === 'en' ? 'Specify Trip Details' :
                                    'Spécifiez les détails du voyage';
    }

    // Duration Label
    const optionLabels = document.querySelectorAll('.option-label');
    optionLabels.forEach((label, index) => {
        const days = parseInt(label.closest('.option-card').getAttribute('data-days'));
        if (days === 1) {
            label.textContent = currentLanguage === 'ar' ? 'يوم' :
                               currentLanguage === 'en' ? 'day' : 'jour';
        } else {
            label.textContent = currentLanguage === 'ar' ? 'أيام' :
                               currentLanguage === 'en' ? 'days' : 'jours';
        }
    });

    // Travelers Label
    const counterLabel = document.querySelector('.counter-label');
    if (counterLabel) {
        const count = parseInt(document.getElementById('travelersCount')?.textContent || 2);
        counterLabel.textContent = count === 1 ?
            (currentLanguage === 'ar' ? 'مسافر' : currentLanguage === 'en' ? 'traveler' : 'voyageur') :
            (currentLanguage === 'ar' ? 'مسافر' : currentLanguage === 'en' ? 'travelers' : 'voyageurs');
    }

    // Budget Cards
    const budgetCards = document.querySelectorAll('.budget-card');
    if (budgetCards[0]) {
        const budgetName0 = budgetCards[0].querySelector('.budget-name');
        const budgetDesc0 = budgetCards[0].querySelector('.budget-desc');
        if (budgetName0) budgetName0.textContent = lang.budgetEconomy || 'اقتصادي';
        if (budgetDesc0) budgetDesc0.textContent = currentLanguage === 'ar' ? 'للمسافرين بميزانية محدودة' :
                                                   currentLanguage === 'en' ? 'For budget travelers' :
                                                   'Pour les voyageurs à petit budget';
    }
    if (budgetCards[1]) {
        const budgetName1 = budgetCards[1].querySelector('.budget-name');
        const budgetDesc1 = budgetCards[1].querySelector('.budget-desc');
        const recommended = budgetCards[1].querySelector('.recommended-badge');
        if (budgetName1) budgetName1.textContent = lang.budgetModerate || 'متوسط';
        if (budgetDesc1) budgetDesc1.textContent = currentLanguage === 'ar' ? 'توازن مثالي بين السعر والجودة' :
                                                   currentLanguage === 'en' ? 'Perfect balance between price and quality' :
                                                   'Équilibre parfait entre prix et qualité';
        if (recommended) recommended.textContent = currentLanguage === 'ar' ? 'الأكثر شيوعاً' :
                                                   currentLanguage === 'en' ? 'Most Popular' :
                                                   'Le plus populaire';
    }
    if (budgetCards[2]) {
        const budgetName2 = budgetCards[2].querySelector('.budget-name');
        const budgetDesc2 = budgetCards[2].querySelector('.budget-desc');
        if (budgetName2) budgetName2.textContent = lang.budgetLuxury || 'فاخر';
        if (budgetDesc2) budgetDesc2.textContent = currentLanguage === 'ar' ? 'تجربة استثنائية من الدرجة الأولى' :
                                                   currentLanguage === 'en' ? 'Exceptional first-class experience' :
                                                   'Expérience exceptionnelle de première classe';
    }

    // Interest Cards
    const interestCards = document.querySelectorAll('.interest-card');
    const interestTexts = [
        {
            ar: {name: 'آثار فرعونية', count: '80+ معلم'},
            en: {name: 'Pharaonic Sites', count: '80+ sites'},
            fr: {name: 'Sites pharaoniques', count: '80+ sites'}
        },
        {
            ar: {name: 'عمارة إسلامية', count: '60+ مسجد'},
            en: {name: 'Islamic Architecture', count: '60+ mosques'},
            fr: {name: 'Architecture islamique', count: '60+ mosquées'}
        },
        {
            ar: {name: 'شواطئ وبحار', count: '40+ شاطئ'},
            en: {name: 'Beaches & Seas', count: '40+ beaches'},
            fr: {name: 'Plages et mers', count: '40+ plages'}
        },
        {
            ar: {name: 'صحراء وسفاري', count: '15+ واحة'},
            en: {name: 'Desert & Safari', count: '15+ oases'},
            fr: {name: 'Désert et safari', count: '15+ oasis'}
        },
        {
            ar: {name: 'ثقافة محلية', count: '100+ سوق'},
            en: {name: 'Local Culture', count: '100+ markets'},
            fr: {name: 'Culture locale', count: '100+ marchés'}
        },
        {
            ar: {name: 'طعام وتذوق', count: '200+ مطعم'},
            en: {name: 'Food & Tasting', count: '200+ restaurants'},
            fr: {name: 'Cuisine et dégustation', count: '200+ restaurants'}
        }
    ];

    interestCards.forEach((card, index) => {
        if (interestTexts[index]) {
            const name = card.querySelector('.interest-name');
            const count = card.querySelector('.interest-count');
            const text = interestTexts[index][currentLanguage];
            if (name && text) name.textContent = text.name;
            if (count && text) count.textContent = text.count;
        }
    });

    // Generate Button
    const generateBtn = document.querySelector('.generate-btn span');
    if (generateBtn) {
        generateBtn.textContent = currentLanguage === 'ar' ? 'أنشئ برنامجي المخصص الآن' :
                                 currentLanguage === 'en' ? 'Create My Custom Program Now' :
                                 'Créer mon programme personnalisé maintenant';
    }
}

// Auto-translate Plans on language change
document.addEventListener('languageChange', translatePlansSection);

// Initial translation
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(translatePlansSection, 200);
    });
} else {
    setTimeout(translatePlansSection, 200);
}

console.log('✅ Plans translation system loaded!');
