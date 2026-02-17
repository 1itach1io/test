/* ═══════════════════════════════════════════════════════════════════
   🧳 Egypt Travel Budget Calculator - Enhanced UX Logic
   ⚠️ لا تغيير في المنطق الحسابي - فقط تحسينات UX
   ═══════════════════════════════════════════════════════════════════ */

'use strict';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   الأسعار الأساسية (Base Prices) - بالجنيه المصري
   تم تعديل الأسعار لتكون أكثر واقعية
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const BASE_PRICES = {
    accommodation: 400,     // فندق 3 نجوم / ليلة (معدل واقعي ومنطقي)
    food: 150,             // طعام / يوم / شخص (منخفض ومعقول)
    transportation: 40,     // مواصلات / يوم / شخص (مخفض)
    activities: 150        // أنشطة سياحية / يوم (معقول)
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   معاملات التكلفة حسب الفئة (Price Category Multipliers)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const CATEGORY_MULTIPLIERS = {
    A: {  // فئة مرتفعة - سياحية/عالمية
        accommodation: 1.3,
        food: 1.2,
        transportation: 1.3,
        activities: 1.5
    },
    B: {  // فئة متوسطة
        accommodation: 1.0,
        food: 1.0,
        transportation: 1.0,
        activities: 1.1
    },
    C: {  // فئة منخفضة
        accommodation: 0.7,
        food: 0.7,
        transportation: 0.6,
        activities: 0.5
    }
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   🆕 خصومات الإقامة الطويلة (Long Stay Discounts)
   واقعي: الفنادق والشقق تعطي خصومات للإقامات الطويلة
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function getAccommodationDiscount(days) {
    if (days <= 3) return 1.0;      // بدون خصم
    if (days <= 7) return 0.92;     // خصم 8%
    if (days <= 14) return 0.82;    // خصم 18%
    if (days <= 21) return 0.72;    // خصم 28%
    return 0.65;                     // خصم 35% للإقامات الشهرية
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   تصنيف المحافظات الـ27 حسب الفئات
   ⚠️ بدون تغيير
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const GOVERNORATES = {
    // ═══ فئة A - مرتفعة (سياحية/عالمية) ═══
    cairo: {
        name: { ar: 'القاهرة', en: 'Cairo', fr: 'Le Caire' },
        category: 'A'
    },
    giza: {
        name: { ar: 'الجيزة', en: 'Giza', fr: 'Gizeh' },
        category: 'A'
    },
    alexandria: {
        name: { ar: 'الإسكندرية', en: 'Alexandria', fr: 'Alexandrie' },
        category: 'A'
    },
    red_sea: {
        name: { ar: 'البحر الأحمر', en: 'Red Sea', fr: 'Mer Rouge' },
        category: 'A'
    },
    south_sinai: {
        name: { ar: 'جنوب سيناء', en: 'South Sinai', fr: 'Sinaï du Sud' },
        category: 'A'
    },
    luxor: {
        name: { ar: 'الأقصر', en: 'Luxor', fr: 'Louxor' },
        category: 'A'
    },
    aswan: {
        name: { ar: 'أسوان', en: 'Aswan', fr: 'Assouan' },
        category: 'A'
    },
    
    // ═══ فئة B - متوسطة ═══
    matrouh: {
        name: { ar: 'مطروح', en: 'Matrouh', fr: 'Matruh' },
        category: 'B'
    },
    port_said: {
        name: { ar: 'بورسعيد', en: 'Port Said', fr: 'Port-Saïd' },
        category: 'B'
    },
    ismailia: {
        name: { ar: 'الإسماعيلية', en: 'Ismailia', fr: 'Ismaïlia' },
        category: 'B'
    },
    suez: {
        name: { ar: 'السويس', en: 'Suez', fr: 'Suez' },
        category: 'B'
    },
    fayoum: {
        name: { ar: 'الفيوم', en: 'Fayoum', fr: 'Fayoum' },
        category: 'B'
    },
    damietta: {
        name: { ar: 'دمياط', en: 'Damietta', fr: 'Damiette' },
        category: 'B'
    },
    
    // ═══ فئة C - منخفضة (الدلتا + الصعيد + الوادي الجديد + شمال سيناء) ═══
    // الدلتا
    beheira: {
        name: { ar: 'البحيرة', en: 'Beheira', fr: 'Béhéra' },
        category: 'C'
    },
    kafr_el_sheikh: {
        name: { ar: 'كفر الشيخ', en: 'Kafr El Sheikh', fr: 'Kafr el-Cheikh' },
        category: 'C'
    },
    dakahlia: {
        name: { ar: 'الدقهلية', en: 'Dakahlia', fr: 'Dakahlia' },
        category: 'C'
    },
    gharbia: {
        name: { ar: 'الغربية', en: 'Gharbia', fr: 'Gharbia' },
        category: 'C'
    },
    sharqia: {
        name: { ar: 'الشرقية', en: 'Sharqia', fr: 'Sharqia' },
        category: 'C'
    },
    monufia: {
        name: { ar: 'المنوفية', en: 'Monufia', fr: 'Ménoufia' },
        category: 'C'
    },
    qalyubia: {
        name: { ar: 'القليوبية', en: 'Qalyubia', fr: 'Qalyubia' },
        category: 'C'
    },
    
    // الصعيد
    beni_suef: {
        name: { ar: 'بني سويف', en: 'Beni Suef', fr: 'Beni Souef' },
        category: 'C'
    },
    minya: {
        name: { ar: 'المنيا', en: 'Minya', fr: 'Minieh' },
        category: 'C'
    },
    asyut: {
        name: { ar: 'أسيوط', en: 'Asyut', fr: 'Assiout' },
        category: 'C'
    },
    sohag: {
        name: { ar: 'سوهاج', en: 'Sohag', fr: 'Sohag' },
        category: 'C'
    },
    qena: {
        name: { ar: 'قنا', en: 'Qena', fr: 'Qéna' },
        category: 'C'
    },
    
    // أخرى
    new_valley: {
        name: { ar: 'الوادي الجديد', en: 'New Valley', fr: 'Nouvelle Vallée' },
        category: 'C'
    },
    north_sinai: {
        name: { ar: 'شمال سيناء', en: 'North Sinai', fr: 'Sinaï du Nord' },
        category: 'C'
    }
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   أسعار الصرف (Exchange Rates) - محدثة 2026
   ⚠️ بدون تغيير
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const EXCHANGE_RATES = {
    // الجنيه المصري (أساسي)
    EGP: 1,
    
    // العملات الرئيسية
    USD: 0.0200,   // دولار أمريكي
    EUR: 0.0185,   // يورو
    GBP: 0.0158,   // جنيه إسترليني
    CHF: 0.0178,   // فرنك سويسري
    JPY: 2.92,     // ين ياباني
    CNY: 0.145,    // يوان صيني
    
    // عملات الخليج
    SAR: 0.0750,   // ريال سعودي
    AED: 0.0734,   // درهم إماراتي
    KWD: 0.0061,   // دينار كويتي
    QAR: 0.0728,   // ريال قطري
    BHD: 0.0075,   // دينار بحريني
    OMR: 0.0077,   // ريال عماني
    
    // عملات عربية
    JOD: 0.0142,   // دينار أردني
    TRY: 0.68,     // ليرة تركية
    
    // عملات أمريكا
    CAD: 0.0278,   // دولار كندي
    BRL: 0.118,    // ريال برازيلي
    MXN: 0.405,    // بيزو مكسيكي
    ARS: 20.3,     // بيزو أرجنتيني
    CLP: 19.5,     // بيزو تشيلي
    COP: 87.5,     // بيزو كولومبي
    
    // عملات آسيا
    INR: 1.67,     // روبية هندية
    THB: 0.71,     // بات تايلندي
    MYR: 0.092,    // رينغيت ماليزي
    SGD: 0.027,    // دولار سنغافوري
    HKD: 0.156,    // دولار هونغ كونغ
    KRW: 27.5,     // وون كوري
    IDR: 325,      // روبية إندونيسية
    PHP: 1.14,     // بيزو فلبيني
    
    // عملات أوروبا
    SEK: 0.218,    // كرونة سويدية
    NOK: 0.220,    // كرونة نرويجية
    DKK: 0.138,    // كرونة دنماركية
    PLN: 0.081,    // زلوتي بولندي
    CZK: 0.465,    // كرونة تشيكية
    HUF: 7.38,     // فورنت مجري
    RON: 0.092,    // ليو روماني
    
    // عملات أخرى
    AUD: 0.0315,   // دولار أسترالي
    NZD: 0.0338,   // دولار نيوزيلندي
    ZAR: 0.378,    // راند جنوب أفريقي
    ILS: 0.073,    // شيكل إسرائيلي
    RUB: 2.05      // روبل روسي
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   معلومات العملات
   ⚠️ بدون تغيير
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const CURRENCY_INFO = {
    EGP: { symbol: 'EGP', name: { ar: 'جنيه مصري', en: 'Egyptian Pound', fr: 'Livre égyptienne' } },
    USD: { symbol: '$', name: { ar: 'دولار أمريكي', en: 'US Dollar', fr: 'Dollar américain' } },
    EUR: { symbol: '€', name: { ar: 'يورو', en: 'Euro', fr: 'Euro' } },
    GBP: { symbol: '£', name: { ar: 'جنيه إسترليني', en: 'British Pound', fr: 'Livre sterling' } },
    SAR: { symbol: 'SAR', name: { ar: 'ريال سعودي', en: 'Saudi Riyal', fr: 'Riyal saoudien' } },
    AED: { symbol: 'AED', name: { ar: 'درهم إماراتي', en: 'UAE Dirham', fr: 'Dirham des EAU' } },
    KWD: { symbol: 'KWD', name: { ar: 'دينار كويتي', en: 'Kuwaiti Dinar', fr: 'Dinar koweïtien' } },
    QAR: { symbol: 'QAR', name: { ar: 'ريال قطري', en: 'Qatari Riyal', fr: 'Riyal qatarien' } }
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   وصف مستويات الأسعار
   ⚠️ بدون تغيير
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const PRICE_LEVEL_DESCRIPTIONS = {
    A: {
        ar: 'منطقة سياحية - أسعار أعلى من المتوسط',
        en: 'Tourist area - Higher than average prices',
        fr: 'Zone touristique - Prix supérieurs à la moyenne'
    },
    B: {
        ar: 'منطقة متوسطة - أسعار معتدلة',
        en: 'Mid-range area - Moderate prices',
        fr: 'Zone moyenne gamme - Prix modérés'
    },
    C: {
        ar: 'منطقة اقتصادية - أسعار منخفضة',
        en: 'Budget area - Lower prices',
        fr: 'Zone économique - Prix bas'
    }
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   🆕 Context ذكي ديناميكي
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const SMART_CONTEXT = {
    A: {
        ar: 'هذه ميزانية مناسبة لسفر متوسط في منطقة سياحية مرتفعة التكلفة',
        en: 'This is a suitable budget for mid-range travel in a high-cost tourist area',
        fr: 'Ceci est un budget adapté pour un voyage moyen gamme dans une zone touristique coûteuse'
    },
    B: {
        ar: 'تم احتساب هذه التكلفة بناءً على متوسط أسعار هذه المنطقة المتوسطة',
        en: 'This cost is calculated based on average prices in this mid-range area',
        fr: 'Ce coût est calculé sur la base des prix moyens de cette zone moyenne gamme'
    },
    C: {
        ar: 'هذه ميزانية تقديرية لمنطقة اقتصادية ذات تكاليف منخفضة',
        en: 'This is an estimated budget for an economical area with lower costs',
        fr: 'Ceci est un budget estimé pour une zone économique à faibles coûts'
    }
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   🆕 Context للإقامات الطويلة
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function getLongStayContext(discount, days) {
    if (discount >= 1.0) return null; // لا يوجد خصم
    
    const discountPercent = Math.round((1 - discount) * 100);
    
    return {
        ar: `✨ تم تطبيق خصم ${discountPercent}% على الإقامة للمدة الطويلة (${days} يوم)`,
        en: `✨ ${discountPercent}% long-stay discount applied for accommodation (${days} days)`,
        fr: `✨ Réduction de ${discountPercent}% appliquée pour séjour long (${days} jours)`
    };
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   حالة التطبيق
   ⚠️ بدون تغيير
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const AppState = {
    selectedGovernorate: '',
    days: 3,
    people: 2,
    currency: 'EGP',
    language: 'ar'
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   حساب الميزانية
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function calculateBudget() {
    if (!AppState.selectedGovernorate) {
        return null;
    }
    
    const governorate = GOVERNORATES[AppState.selectedGovernorate];
    if (!governorate) {
        return null;
    }
    
    const category = governorate.category;
    const multipliers = CATEGORY_MULTIPLIERS[category];
    const days = AppState.days;
    const people = AppState.people;
    
    // 🆕 حساب الإقامة مع خصم الإقامة الطويلة
    const longStayDiscount = getAccommodationDiscount(days);
    const accommodationCost = BASE_PRICES.accommodation * multipliers.accommodation * days * longStayDiscount;
    
    // باقي الحسابات كما هي
    const foodCost = BASE_PRICES.food * multipliers.food * days * people;
    const transportationCost = BASE_PRICES.transportation * multipliers.transportation * days * people;
    const activitiesCost = BASE_PRICES.activities * multipliers.activities * days;
    
    const totalEGP = accommodationCost + foodCost + transportationCost + activitiesCost;
    
    // التحويل للعملة المختارة
    const exchangeRate = EXCHANGE_RATES[AppState.currency];
    const total = totalEGP * exchangeRate;
    const perPerson = total / people;
    const perDay = total / days;
    
    return {
        accommodation: accommodationCost * exchangeRate,
        food: foodCost * exchangeRate,
        transportation: transportationCost * exchangeRate,
        activities: activitiesCost * exchangeRate,
        total: total,
        perPerson: perPerson,
        perDay: perDay,
        category: category,
        governorateName: governorate.name[AppState.language],
        longStayDiscount: longStayDiscount // 🆕 للاستخدام في Context
    };
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   تنسيق الأرقام
   ⚠️ بدون تغيير
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function formatNumber(number) {
    return number.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   🆕 إضافة class للـ animation (NEW!)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function addUpdateAnimation(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add('updating');
        setTimeout(() => {
            element.classList.remove('updating');
        }, 300);
    }
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   🆕 تحديث Context الذكي
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function updateSmartContext(category, longStayDiscount, days) {
    const contextElement = document.getElementById('smartContext');
    const textElement = document.getElementById('contextText');
    
    if (!contextElement || !textElement) return;
    
    // إزالة الكلاسات السابقة
    contextElement.className = 'smart-context';
    
    // إضافة الكلاس المناسب
    const contextClass = category === 'A' ? 'context-high' : 
                        category === 'B' ? 'context-medium' : 'context-low';
    contextElement.classList.add(contextClass);
    
    // تحديث النص الأساسي
    const contextText = SMART_CONTEXT[category];
    textElement.innerHTML = '';
    
    Object.keys(contextText).forEach(lang => {
        const span = document.createElement('span');
        span.setAttribute('data-lang', lang);
        span.textContent = contextText[lang];
        textElement.appendChild(span);
    });
    
    // 🆕 إضافة معلومات الخصم إذا كان موجوداً
    const longStayInfo = getLongStayContext(longStayDiscount, days);
    if (longStayInfo) {
        const br = document.createElement('br');
        textElement.appendChild(br);
        
        Object.keys(longStayInfo).forEach(lang => {
            const span = document.createElement('span');
            span.setAttribute('data-lang', lang);
            span.textContent = longStayInfo[lang];
            span.style.fontWeight = '600';
            span.style.color = 'var(--primary-color)';
            textElement.appendChild(span);
        });
    }
    
    // إضافة animation
    contextElement.classList.add('updating');
    setTimeout(() => {
        contextElement.classList.remove('updating');
    }, 400);
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   تحديث واجهة النتائج (محسّنة مع animations)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function updateResults() {
    const results = calculateBudget();
    
    if (!results) {
        return;
    }
    
    const currencySymbol = CURRENCY_INFO[AppState.currency]?.symbol || AppState.currency;
    
    // 🆕 إضافة animation لكل عنصر
    addUpdateAnimation('accommodationCost');
    addUpdateAnimation('foodCost');
    addUpdateAnimation('transportCost');
    addUpdateAnimation('activitiesCost');
    addUpdateAnimation('totalCost');
    addUpdateAnimation('perPersonCost');
    addUpdateAnimation('perDayCost');
    
    // تحديث التفاصيل
    document.getElementById('accommodationCost').textContent = formatNumber(results.accommodation) + ' ' + currencySymbol;
    document.getElementById('foodCost').textContent = formatNumber(results.food) + ' ' + currencySymbol;
    document.getElementById('transportCost').textContent = formatNumber(results.transportation) + ' ' + currencySymbol;
    document.getElementById('activitiesCost').textContent = formatNumber(results.activities) + ' ' + currencySymbol;
    
    // تحديث المجموع
    document.getElementById('totalCost').innerHTML = formatNumber(results.total) + ' <span class="currency-symbol">' + currencySymbol + '</span>';
    
    // تحديث المعلومات الإضافية
    document.getElementById('perPersonCost').textContent = formatNumber(results.perPerson) + ' ' + currencySymbol;
    document.getElementById('perDayCost').textContent = formatNumber(results.perDay) + ' ' + currencySymbol;
    
    // 🆕 تحديث Context الذكي مع معلومات الخصم
    updateSmartContext(results.category, results.longStayDiscount, AppState.days);
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ملء قائمة المحافظات
   ⚠️ بدون تغيير
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function populateGovernorates() {
    const select = document.getElementById('governorateSelect');
    
    // مسح الخيارات الحالية
    const selectGovernorateText = window.translations?.[AppState.language]?.calculator?.selectGovernorate || 'اختر المحافظة';
    const categoryText = window.translations?.[AppState.language]?.calculator?.category || 'فئة';
    select.innerHTML = `<option value="">${selectGovernorateText}</option>`;
    
    // ترتيب المحافظات حسب الفئة
    const sorted = Object.entries(GOVERNORATES).sort((a, b) => {
        const categoryOrder = { 'A': 1, 'B': 2, 'C': 3 };
        return categoryOrder[a[1].category] - categoryOrder[b[1].category];
    });
    
    sorted.forEach(([key, governorate]) => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = governorate.name[AppState.language] + 
                           ` (${categoryText} ${governorate.category})`;
        select.appendChild(option);
    });
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ملء قائمة العملات
   ⚠️ بدون تغيير
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function populateCurrencies() {
    const select = document.getElementById('currencySelect');
    select.innerHTML = '';
    
    // العملات الرئيسية أولاً
    const mainCurrencies = ['EGP', 'USD', 'EUR', 'GBP', 'SAR', 'AED', 'KWD', 'QAR'];
    const otherCurrencies = Object.keys(EXCHANGE_RATES).filter(c => !mainCurrencies.includes(c)).sort();
    
    [...mainCurrencies, ...otherCurrencies].forEach(currency => {
        const option = document.createElement('option');
        option.value = currency;
        const info = CURRENCY_INFO[currency];
        option.textContent = info ? 
            `${currency} - ${info.name[AppState.language]}` : 
            currency;
        select.appendChild(option);
    });
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   قراءة اللغة من الموقع الأم
   ⚠️ بدون تغيير
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function detectLanguage() {
    // الأولويات:
    // 1. window.siteLanguage
    // 2. document.documentElement.lang
    // 3. document.body.dataset.language
    // 4. الافتراضي: ar
    
    const lang = window.siteLanguage || 
                 document.documentElement.lang || 
                 document.body.dataset.language || 
                 'ar';
    
    AppState.language = lang.toLowerCase().substring(0, 2);
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   تهيئة Event Listeners
   ⚠️ بدون تغيير في المنطق - فقط يتم تحديث النتائج فوراً
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function initEventListeners() {
    // تغيير المحافظة
    document.getElementById('governorateSelect').addEventListener('change', (e) => {
        AppState.selectedGovernorate = e.target.value;
        if (AppState.selectedGovernorate) {
            updateResults();
        }
    });
    
    // تغيير عدد الأيام - تحديث فوري
    document.getElementById('daysInput').addEventListener('input', (e) => {
        AppState.days = parseInt(e.target.value) || 1;
        if (AppState.selectedGovernorate) {
            updateResults();
        }
    });
    
    // تغيير عدد الأشخاص - تحديث فوري
    document.getElementById('peopleInput').addEventListener('input', (e) => {
        AppState.people = parseInt(e.target.value) || 1;
        if (AppState.selectedGovernorate) {
            updateResults();
        }
    });
    
    // تغيير العملة - تحديث فوري
    document.getElementById('currencySelect').addEventListener('change', (e) => {
        AppState.currency = e.target.value;
        if (AppState.selectedGovernorate) {
            updateResults();
        }
    });
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   مراقبة التغييرات على الموقع الأم (Dark/Light Mode & Language)
   ⚠️ بدون تغيير
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function watchParentChanges() {
    // مراقبة تغييرات الـ theme
    const observer = new MutationObserver(() => {
        // CSS سيتعامل مع الـ theme تلقائياً
    });
    
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme', 'class', 'lang']
    });
    
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['data-theme', 'class', 'data-language']
    });
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   التهيئة الرئيسية
   ⚠️ بدون تغيير
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function init() {
    detectLanguage();
    populateGovernorates();
    populateCurrencies();
    initEventListeners();
    watchParentChanges();
    
    // Listen for language changes
    document.addEventListener('languageChange', function(e) {
        console.log('🔄 Language changed, updating calculator...');
        AppState.language = e.detail.lang || 'en';
        populateGovernorates();
        populateCurrencies();
        if (AppState.selectedGovernorate) {
            updateResults();
        }
    });
}

// تشغيل عند تحميل الصفحة
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   API عام (للاستخدام من الخارج)
   ⚠️ بدون تغيير
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
window.EgyptTravelCalculator = {
    recalculate: updateResults,
    setLanguage: (lang) => {
        AppState.language = lang;
        populateGovernorates();
        populateCurrencies();
        if (AppState.selectedGovernorate) {
            updateResults();
        }
    },
    getState: () => ({ ...AppState }),
    getResult: calculateBudget
};
