/* ============================================
   COMPLETE TRANSLATION SYSTEM
   This script ensures ALL text is translated
   ============================================ */

// دالة لترجمة عنوان الصفحة
function translatePageTitle() {
    const titleElement = document.getElementById('page-title');
    if (titleElement && translations[currentLanguage]) {
        titleElement.textContent = translations[currentLanguage].siteTitle;
    }
    // أيضاً تحديث title في document
    document.title = translations[currentLanguage]?.siteTitle || document.title;
}

// دالة لترجمة خيارات اللغة
function translateLanguageOptions() {
    const langSelector = document.getElementById('language-selector');
    if (langSelector && translations[currentLanguage]) {
        const options = langSelector.querySelectorAll('option');
        options.forEach(option => {
            const value = option.value;
            if (value === 'en') {
                option.textContent = translations[currentLanguage].language?.english || 'English';
            } else if (value === 'ar') {
                option.textContent = translations[currentLanguage].language?.arabic || 'العربية';
            } else if (value === 'fr') {
                option.textContent = translations[currentLanguage].language?.french || 'Français';
            }
        });
    }
}

// دالة لترجمة عناصر بدون data-translate
function translateMissingElements() {
    if (!translations[currentLanguage]) return;

    const lang = translations[currentLanguage];

    // ترجمة خيارات العملة
    translateCurrencyOptions();

    // ترجمة نصوص قسم Plans
    translatePlansSection();

    // ترجمة نصوص Filter Buttons
    translateFilterButtons();

    // ترجمة زر Send في AI
    translateAISendButton();

    // ترجمة نصوص Footer
    translateFooter();

    // ترجمة Loading text
    translateLoadingTexts();
}

// ترجمة خيارات العملة
function translateCurrencyOptions() {
    const currencySelect = document.getElementById('calculator-currency');
    if (!currencySelect) return;

    const lang = translations[currentLanguage];
    const options = currencySelect.querySelectorAll('option');

    options.forEach(option => {
        const value = option.value;
        switch(value) {
            case 'EGP':
                option.textContent = lang.calculator?.currencyEGP || 'EGP - جنيه مصري';
                break;
            case 'USD':
                option.textContent = lang.calculator?.currencyUSD || 'USD - US Dollar';
                break;
            case 'EUR':
                option.textContent = lang.calculator?.currencyEUR || 'EUR - Euro';
                break;
            case 'GBP':
                option.textContent = lang.calculator?.currencyGBP || 'GBP - British Pound';
                break;
            case 'SAR':
                option.textContent = lang.calculator?.currencySAR || 'SAR - Saudi Riyal';
                break;
        }
    });
}

// ترجمة قسم Plans
function translatePlansSection() {
    const lang = translations[currentLanguage];

    // Duration
    const durationHeadings = document.querySelectorAll('h4');
    durationHeadings.forEach(h4 => {
        if (h4.textContent.includes('المدة') || h4.textContent.includes('Duration')) {
            h4.innerHTML = h4.innerHTML.replace(/المدة|Duration/g, lang.plans?.duration || 'Duration');
        }
        if (h4.textContent.includes('عدد المسافرين') || h4.textContent.includes('Number of Travelers')) {
            h4.innerHTML = h4.innerHTML.replace(/عدد المسافرين|Number of Travelers/g, lang.plans?.travelers || 'Number of Travelers');
        }
        if (h4.textContent.includes('مستوى الميزانية') || h4.textContent.includes('Budget Level')) {
            h4.innerHTML = h4.innerHTML.replace(/مستوى الميزانية|Budget Level/g, lang.plans?.budget || 'Budget Level');
        }
        if (h4.textContent.includes('الاهتمامات') || h4.textContent.includes('Interests')) {
            h4.innerHTML = h4.innerHTML.replace(/الاهتمامات.*\)/g, lang.plans?.interests || 'Interests (select one or more)');
        }
    });

    // Budget prices
    const budgetPrices = document.querySelectorAll('[data-price-type]');
    budgetPrices.forEach(price => {
        const priceType = price.getAttribute('data-price-type');
        if (priceType === 'budget') {
            price.textContent = lang.plans?.budgetEconomyPrice || '~500 EGP/day';
        } else if (priceType === 'moderate') {
            price.textContent = lang.plans?.budgetModeratePrice || '~1200 EGP/day';
        } else if (priceType === 'luxury') {
            price.textContent = lang.plans?.budgetLuxuryPrice || '~3500 EGP/day';
        }
    });

    // Stats in Plans hero
    const statsNumbers = document.querySelectorAll('.stat-number');
    const statsLabels = document.querySelectorAll('.stat-label');
    if (statsLabels.length >= 3) {
        statsLabels[0].textContent = lang.plans?.governorates || 'محافظة';
        statsLabels[1].textContent = lang.plans?.attractions || 'معلم سياحي';
        statsLabels[2].textContent = lang.plans?.regions || 'مناطق';
    }
}

// ترجمة أزرار التصفية
function translateFilterButtons() {
    const lang = translations[currentLanguage];
    const filterButtons = document.querySelectorAll('.filter-btn[data-category]');

    filterButtons.forEach(btn => {
        const category = btn.getAttribute('data-category');
        if (lang.explore && lang.explore[category]) {
            btn.textContent = lang.explore[category];
        }
    });
}

// ترجمة زر Send
function translateAISendButton() {
    const lang = translations[currentLanguage];
    const sendBtn = document.querySelector('#send-btn span');
    if (sendBtn) {
        sendBtn.textContent = lang.ai?.send || 'Send';
    }
}

// ترجمة Footer
function translateFooter() {
    const lang = translations[currentLanguage];

    // Email label
    const emailParagraphs = document.querySelectorAll('.footer-section p');
    emailParagraphs.forEach(p => {
        if (p.textContent.includes('Email:')) {
            p.innerHTML = p.innerHTML.replace(/Email:/, lang.footer?.email + ':' || 'Email:');
        }
        if (p.textContent.includes('Phone:')) {
            p.innerHTML = p.innerHTML.replace(/Phone:/, lang.footer?.phone + ':' || 'Phone:');
        }
    });

    // Copyright
    const copyright = document.querySelector('.footer-bottom p');
    if (copyright) {
        copyright.textContent = `© 2026 ${lang.footer?.copyright || 'Discover Egypt - OMAR Web Design Project - Middle 2'}`;
    }

    // Aria labels for social links
    const socialLinks = document.querySelectorAll('.social-links a');
    if (socialLinks.length >= 4) {
        socialLinks[0].setAttribute('aria-label', lang.footer?.facebook || 'Facebook');
        socialLinks[1].setAttribute('aria-label', lang.footer?.instagram || 'Instagram');
        socialLinks[2].setAttribute('aria-label', lang.footer?.twitter || 'Twitter');
        socialLinks[3].setAttribute('aria-label', lang.footer?.youtube || 'YouTube');
    }
}

// ترجمة نصوص التحميل
function translateLoadingTexts() {
    const lang = translations[currentLanguage];

    // Loading في Explore
    const loadingTexts = document.querySelectorAll('p');
    loadingTexts.forEach(p => {
        if (p.textContent.includes('Loading places...')) {
            p.textContent = lang.explore?.loading || 'Loading places...';
        }
    });
}

// دالة شاملة لتطبيق جميع الترجمات
function applyCompleteTranslations() {
    // أولاً: تطبيق الترجمات الأساسية (من app.js)
    applyTranslations();

    // ثانياً: ترجمة العناصر الإضافية
    translatePageTitle();
    translateLanguageOptions();
    translateMissingElements();

    console.log(`✅ Complete translations applied for: ${currentLanguage}`);
}

// استدعاء الترجمة الشاملة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تأخير قصير للتأكد من تحميل جميع السكريبتات
    setTimeout(applyCompleteTranslations, 100);
});

// إضافة مراقب لتغيير اللغة
if (typeof MutationObserver !== 'undefined') {
    const languageObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'dir') {
                applyCompleteTranslations();
            }
        });
    });

    // مراقبة تغييرات في html element
    const htmlElement = document.documentElement;
    languageObserver.observe(htmlElement, {
        attributes: true,
        attributeFilter: ['dir', 'lang']
    });
}

console.log('✅ Complete translation system loaded!');
