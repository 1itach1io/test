/* ==========================================
   DISCOVER EGYPT - LANGUAGE FIXES
   إصلاح مشكلة اللغات في جميع أجزاء الموقع
   ========================================== */

// ========== Listen for Language Change ==========
document.addEventListener('languageChange', function(e) {
    const newLang = e.detail.lang;
    console.log('🌐 Language changed to:', newLang);
    
    // تحديث الحاسبة
    if (window.EgyptTravelCalculator && typeof window.EgyptTravelCalculator.setLanguage === 'function') {
        console.log('🧮 Updating calculator language...');
        window.EgyptTravelCalculator.setLanguage(newLang);
    }
    
    // تحديث placeholder البحث
    updateSearchPlaceholder(newLang);
    
    // تحديث auth UI إذا كان موجود
    if (window.i18n && typeof window.i18n.setLanguage === 'function') {
        console.log('🔐 Updating auth UI language...');
        window.i18n.setLanguage(newLang);
    }
});

// ========== Update Search Placeholder ==========
function updateSearchPlaceholder(lang) {
    const searchInput = document.getElementById('search-input');
    if (searchInput && window.translations && window.translations[lang]) {
        const placeholder = window.translations[lang].search?.placeholder || 'Search for places, cities...';
        searchInput.placeholder = placeholder;
        searchInput.setAttribute('data-translate-placeholder', 'search.placeholder');
        console.log('🔍 Search placeholder updated to:', placeholder);
    }
}

// ========== Initialize on DOMContentLoaded ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Language fixes initialized');
    
    // التأكد من تحديث placeholder البحث عند التحميل الأولي
    const currentLang = localStorage.getItem('language') || 'en';
    updateSearchPlaceholder(currentLang);
});
