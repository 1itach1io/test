// search.js - Search Functionality (Using places-enhanced.js)

// ========== Governorate Translations ==========
const governorateTranslations = {
    en: {
        'Giza': 'Giza',
        'Cairo': 'Cairo',
        'Luxor': 'Luxor',
        'Aswan': 'Aswan',
        'Alexandria': 'Alexandria',
        'Red Sea': 'Red Sea',
        'South Sinai': 'South Sinai',
        'North Sinai': 'North Sinai',
        'Matrouh': 'Matrouh',
        'New Valley': 'New Valley',
        'Fayoum': 'Fayoum',
        'Qena': 'Qena',
        'Sohag': 'Sohag',
        'Beheira': 'Beheira',
        'Kafr El Sheikh': 'Kafr El Sheikh',
        'Dakahlia': 'Dakahlia',
        'Gharbia': 'Gharbia',
        'Sharqia': 'Sharqia',
        'Monufia': 'Monufia',
        'Qalyubia': 'Qalyubia',
        'Beni Suef': 'Beni Suef',
        'Minya': 'Minya',
        'Assiut': 'Assiut',
        'Port Said': 'Port Said',
        'Ismailia': 'Ismailia',
        'Suez': 'Suez',
        'Damietta': 'Damietta'
    },
    ar: {
        'Giza': 'الجيزة',
        'Cairo': 'القاهرة',
        'Luxor': 'الأقصر',
        'Aswan': 'أسوان',
        'Alexandria': 'الإسكندرية',
        'Red Sea': 'البحر الأحمر',
        'South Sinai': 'جنوب سيناء',
        'North Sinai': 'شمال سيناء',
        'Matrouh': 'مطروح',
        'New Valley': 'الوادي الجديد',
        'Fayoum': 'الفيوم',
        'Qena': 'قنا',
        'Sohag': 'سوهاج',
        'Beheira': 'البحيرة',
        'Kafr El Sheikh': 'كفر الشيخ',
        'Dakahlia': 'الدقهلية',
        'Gharbia': 'الغربية',
        'Sharqia': 'الشرقية',
        'Monufia': 'المنوفية',
        'Qalyubia': 'القليوبية',
        'Beni Suef': 'بني سويف',
        'Minya': 'المنيا',
        'Assiut': 'أسيوط',
        'Port Said': 'بورسعيد',
        'Ismailia': 'الإسماعيلية',
        'Suez': 'السويس',
        'Damietta': 'دمياط'
    },
    fr: {
        'Giza': 'Gizeh',
        'Cairo': 'Le Caire',
        'Luxor': 'Louxor',
        'Aswan': 'Assouan',
        'Alexandria': 'Alexandrie',
        'Red Sea': 'Mer Rouge',
        'South Sinai': 'Sinaï du Sud',
        'North Sinai': 'Sinaï du Nord',
        'Matrouh': 'Matrouh',
        'New Valley': 'Nouvelle Vallée',
        'Fayoum': 'Fayoum',
        'Qena': 'Qena',
        'Sohag': 'Sohag',
        'Beheira': 'Beheira',
        'Kafr El Sheikh': 'Kafr El Sheikh',
        'Dakahlia': 'Dakahlia',
        'Gharbia': 'Gharbia',
        'Sharqia': 'Sharqia',
        'Monufia': 'Monufia',
        'Qalyubia': 'Qalyubia',
        'Beni Suef': 'Beni Suef',
        'Minya': 'Minya',
        'Assiut': 'Assiut',
        'Port Said': 'Port-Saïd',
        'Ismailia': 'Ismaïlia',
        'Suez': 'Suez',
        'Damietta': 'Damiette'
    }
};

// ========== GLOBAL VARIABLES ==========
let searchModal;
let searchInput;
let searchResults;
let searchNoResults;

// ========== Initialize Search ==========
function initializeSearch() {
    console.log('🔍 Initializing search functionality...');
    
    // Get elements
    searchModal = document.getElementById('search-modal');
    searchInput = document.getElementById('search-input');
    searchResults = document.getElementById('search-results');
    searchNoResults = document.getElementById('search-no-results');
    
    const desktopSearchBtn = document.getElementById('desktop-search-btn');
    const mobileSearchBtn = document.getElementById('mobile-search-btn');
    const searchClose = document.getElementById('search-close');
    
    // Open search modal - Desktop
    if (desktopSearchBtn) {
        desktopSearchBtn.addEventListener('click', () => {
            openSearchModal();
        });
    }
    
    // Open search modal - Mobile
    if (mobileSearchBtn) {
        mobileSearchBtn.addEventListener('click', () => {
            openSearchModal();
            // Close mobile menu
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    }
    
    // Close search modal
    if (searchClose) {
        searchClose.addEventListener('click', () => {
            closeSearchModal();
        });
    }
    
    // Close on outside click
    if (searchModal) {
        searchModal.addEventListener('click', (e) => {
            if (e.target === searchModal) {
                closeSearchModal();
            }
        });
    }
    
    // Search on input
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            performSearch(e.target.value);
        });
    }
    
    console.log('✅ Search initialized');
}

// ========== Open Search Modal ==========
function openSearchModal() {
    if (searchModal) {
        searchModal.classList.add('active');
        searchInput.focus();
        searchInput.value = '';
        searchResults.innerHTML = '';
        searchNoResults.style.display = 'none';
    }
}

// ========== Close Search Modal ==========
function closeSearchModal() {
    if (searchModal) {
        searchModal.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '';
    }
}

// ========== Perform Search ==========
function performSearch(query) {
    const searchTerm = query.toLowerCase().trim();
    
    // Clear results if search is empty
    if (!searchTerm || searchTerm.length < 2) {
        searchResults.innerHTML = '';
        searchNoResults.style.display = 'none';
        return;
    }
    
    // Get current language
    const currentLang = localStorage.getItem('language') || 'en';
    
    console.log('🔍 Search - Query:', searchTerm, 'Language:', currentLang);
    
    // Get all places from placesData (loaded from places-enhanced.js)
    const allPlaces = placesData.places || [];
    
    // Normalize search term for better matching (remove diacritics for Arabic)
    const normalizedSearch = searchTerm.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    
    // Filter places based on search term with enhanced matching
    const filtered = allPlaces.filter(place => {
        // Get names in all languages and normalize
        const nameEn = (place.name || '').toLowerCase();
        const nameAr = (place.nameAr || '').toLowerCase();
        const nameFr = (place.nameFr || '').toLowerCase();
        const governorate = (place.governorate || '').toLowerCase();
        const category = (place.category || '').toLowerCase();
        const description = (place.description || '').toLowerCase();
        const descriptionAr = (place.descriptionAr || '').toLowerCase();
        const descriptionFr = (place.descriptionFr || '').toLowerCase();
        
        // Create searchable string for each language
        const searchableEn = `${nameEn} ${governorate} ${category} ${description}`;
        const searchableAr = `${nameAr} ${descriptionAr}`;
        const searchableFr = `${nameFr} ${descriptionFr}`;
        
        // Check for matches in any language
        const matchesEn = searchableEn.includes(searchTerm);
        const matchesAr = searchableAr.includes(searchTerm);
        const matchesFr = searchableFr.includes(searchTerm);
        
        // Also check normalized versions for better Arabic matching
        const normalizedAr = searchableAr.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const matchesNormalized = normalizedAr.includes(normalizedSearch);
        
        return matchesEn || matchesAr || matchesFr || matchesNormalized;
    });
    
    // Display results
    displaySearchResults(filtered, currentLang);
    
    console.log('✅ Found', filtered.length, 'results for "' + query + '"');
}

// ========== Display Search Results ==========
function displaySearchResults(places, currentLang) {
    // Clear previous results
    searchResults.innerHTML = '';
    
    // Show/hide no results message
    if (places.length === 0) {
        searchNoResults.style.display = 'block';
        return;
    } else {
        searchNoResults.style.display = 'none';
    }
    
    // Create result items
    places.forEach(place => {
        const resultItem = createSearchResultItem(place, currentLang);
        searchResults.appendChild(resultItem);
    });
}

// ========== Create Search Result Item ==========
function createSearchResultItem(place, currentLang) {
    const item = document.createElement('div');
    item.className = 'search-result-item';
    
    // Get localized name
    let placeName = place.name;
    if (currentLang === 'ar' && place.nameAr) {
        placeName = place.nameAr;
    } else if (currentLang === 'fr' && place.nameFr) {
        placeName = place.nameFr;
    }
    
    // Get localized governorate
    const governorateName = governorateTranslations[currentLang][place.governorate] || place.governorate;
    
    // Get category names localized
    const categoryNames = {
        en: {
            'ancient': 'Ancient Sites',
            'nature': 'Nature',
            'beach': 'Beach',
            'museum': 'Museum',
            'religious': 'Religious',
            'historical': 'Historical',
            'modern': 'Modern',
            'cultural': 'Cultural'
        },
        ar: {
            'ancient': 'المواقع الأثرية',
            'nature': 'الطبيعة',
            'beach': 'شواطئ',
            'museum': 'متحف',
            'religious': 'ديني',
            'historical': 'تاريخي',
            'modern': 'حديث',
            'cultural': 'ثقافي'
        },
        fr: {
            'ancient': 'Sites Antiques',
            'nature': 'Nature',
            'beach': 'Plage',
            'museum': 'Musée',
            'religious': 'Religieux',
            'historical': 'Historique',
            'modern': 'Moderne',
            'cultural': 'Culturel'
        }
    };
    
    const categoryName = categoryNames[currentLang][place.category] || place.category;
    
    // Get category icon
    const categoryIcons = {
        'ancient': '🏛️',
        'nature': '🌿',
        'beach': '🏖️',
        'museum': '🏛️',
        'religious': '🕌',
        'adventure': '🎢'
    };
    
    const categoryIcon = categoryIcons[place.category] || '📍';
    
    // Create HTML
    item.innerHTML = `
        <img src="${place.image}" alt="${placeName}" class="search-result-image" onerror="this.src='images/giza-pyramids-frygia9m5ggjhaz1.webp'">
        <div class="search-result-info">
            <div class="search-result-name">${placeName}</div>
            <div class="search-result-details">
                <span class="search-result-category">
                    ${categoryIcon} ${categoryName}
                </span>
                <span class="search-result-governorate">
                    📍 ${governorateName}
                </span>
            </div>
        </div>
    `;
    
    // Click event - close modal and show place on map (if map is initialized)
    item.addEventListener('click', () => {
        closeSearchModal();
        
        // If map exists, center on this place
        if (typeof map !== 'undefined' && place.coordinates) {
            map.setView([place.coordinates.lat, place.coordinates.lng], 13);
            
            // Navigate to nearby section
            const nearbySection = document.getElementById('nearby');
            if (nearbySection) {
                nearbySection.classList.add('active');
                
                // Hide other sections
                document.querySelectorAll('.section').forEach(sec => {
                    if (sec.id !== 'nearby') {
                        sec.classList.remove('active');
                    }
                });
                
                // Update navigation
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === 'nearby') {
                        link.classList.add('active');
                    }
                });
            }
        }
    });
    
    return item;
}

// ========== Initialize on Page Load ==========
document.addEventListener('DOMContentLoaded', () => {
    initializeSearch();
});
