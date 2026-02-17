/* ==========================================
   DISCOVER EGYPT - MAP.JS
   Map functionality with language-specific links
   ========================================== */

// Map URLs for different languages
const mapUrls = {
    en: 'https://maps.app.goo.gl/ZoZbhHz61my5TJEe8',
    ar: 'https://maps.app.goo.gl/jJs37kMzLsS2g59MA',
    fr: 'https://maps.app.goo.gl/88tD641e7y3k6BcR8'
};

// ========== MAP INTERACTION ==========
function initializeMap() {
    const openMapBtn = document.getElementById('openMapBtn');
    
    if (openMapBtn) {
        openMapBtn.addEventListener('click', function() {
            const currentLang = localStorage.getItem('language') || 'en';
            const mapUrl = mapUrls[currentLang] || mapUrls['en'];
            
            // Open map in new tab
            window.open(mapUrl, '_blank');
            
            console.log(`🗺️ Opening map for language: ${currentLang} - URL: ${mapUrl}`);
        });
    }
    
    // Listen for language changes
    document.addEventListener('languageChange', function(event) {
        updateMapButton(event.detail.lang);
    });
    
    console.log('✅ Map section initialized with language-specific links');
}

// Update map button when language changes
function updateMapButton(lang) {
    const openMapBtn = document.getElementById('openMapBtn');
    if (openMapBtn) {
        const currentLang = lang || localStorage.getItem('language') || 'en';
        console.log(`🗺️ Map button updated for language: ${currentLang}`);
    }
}

// Export function for use in other scripts
window.updateMapButton = updateMapButton;
