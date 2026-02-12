/* ==========================================
   DISCOVER EGYPT - APP.JS
   DOMContentLoaded + initialization
   ========================================== */

// ========== GLOBAL VARIABLES ==========
var currentLanguage = 'en'; // Default language (using var for global scope)
// translations variable is now loaded from translations.js file

// ========== GLOBAL HELPER FUNCTIONS (Available to all files) ==========

// Helper function to get nested translation (e.g., "hero.title")
function getNestedTranslation(obj, key) {
    return key.split('.').reduce((o, k) => (o || {})[k], obj);
}

function applyTranslations() {
    console.log('🎨 Applying translations for:', currentLanguage);
    const langData = translations[currentLanguage];

    if (!langData) {
        console.warn('❌ No translation data for language:', currentLanguage);
        console.log('Available languages:', Object.keys(translations));
        return;
    }

    console.log('✅ Language data found for:', currentLanguage);

    let translatedCount = 0;
    let notFoundCount = 0;

    // Translate all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = getNestedTranslation(langData, key);

        if (translation) {
            element.textContent = translation;
            translatedCount++;
            console.log(`  ✅ Translated: ${key} = "${translation}"`);
        } else {
            notFoundCount++;
            console.warn(`  ❌ Not found: ${key}`);
        }
    });

    // Translate placeholder attributes
    const chatInput = document.getElementById('chat-input');
    if (chatInput && langData.ai && langData.ai.placeholder) {
        chatInput.placeholder = langData.ai.placeholder;
    }

    console.log(`✅ Translations applied: ${translatedCount} successful, ${notFoundCount} not found`);
}

// ========== INITIALIZATION ==========
// This function runs when the page loads
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Website loaded successfully!');
    console.log('🌍 Translations loaded from translations.js');
    console.log('📊 Available languages:', Object.keys(translations));

    // Initialize all features
    initializeNavigation();
    initializeTheme();
    initializeLanguage();
    initializeMobileMenu();
    initializeFilters();
    initializeMap();
    initializeAIGuide();
    initializeTools();
});

// Log for educational purposes
console.log('✅ All JavaScript modules loaded successfully!');
console.log('📚 Features: Navigation, Theme Toggle, Language System, AI Guide, Mobile Menu, Authentication');
console.log('🎓 Built with Vanilla JavaScript - No Frameworks');
