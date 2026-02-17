/* ═══════════════════════════════════════════════════════════════════
   ADVANCED SEARCH SYSTEM
   Multi-language support with fuzzy matching and smart filtering
   ═══════════════════════════════════════════════════════════════════ */

'use strict';

// ========== SEARCH TRANSLATIONS ==========
const searchTranslations = {
    en: {
        searchPlaceholder: 'Search destinations, restaurants, activities...',
        searching: 'Searching...',
        noResults: 'No results found',
        tryDifferent: 'Try different keywords or check spelling',
        resultsFound: 'results found',
        categories: {
            all: 'All Results',
            restaurants: 'Restaurants',
            attractions: 'Attractions',
            activities: 'Activities',
            shopping: 'Shopping'
        },
        filters: {
            all: 'All',
            restaurants: 'Restaurants',
            attractions: 'Attractions',
            activities: 'Activities',
            shopping: 'Shopping'
        }
    },
    ar: {
        searchPlaceholder: 'ابحث عن وجهات، مطاعم، أنشطة...',
        searching: 'جاري البحث...',
        noResults: 'لم يتم العثور على نتائج',
        tryDifferent: 'جرب كلمات مفتاحية مختلفة أو تحقق من الإملاء',
        resultsFound: 'نتيجة',
        categories: {
            all: 'جميع النتائج',
            restaurants: 'مطاعم',
            attractions: 'معالم سياحية',
            activities: 'أنشطة',
            shopping: 'تسوق'
        },
        filters: {
            all: 'الكل',
            restaurants: 'مطاعم',
            attractions: 'معالم',
            activities: 'أنشطة',
            shopping: 'تسوق'
        }
    },
    fr: {
        searchPlaceholder: 'Rechercher destinations, restaurants, activités...',
        searching: 'Recherche en cours...',
        noResults: 'Aucun résultat trouvé',
        tryDifferent: 'Essayez différents mots-clés ou vérifiez l\'orthographe',
        resultsFound: 'résultats trouvés',
        categories: {
            all: 'Tous les résultats',
            restaurants: 'Restaurants',
            attractions: 'Attractions',
            activities: 'Activités',
            shopping: 'Shopping'
        },
        filters: {
            all: 'Tout',
            restaurants: 'Restaurants',
            attractions: 'Attractions',
            activities: 'Activités',
            shopping: 'Shopping'
        }
    }
};

// ========== GOVERNORATE TRANSLATIONS (COMPLETE) ==========
const governorateTranslations_advanced = {
    en: {
        'Giza': 'Giza', 'Cairo': 'Cairo', 'Luxor': 'Luxor', 'Aswan': 'Aswan',
        'Alexandria': 'Alexandria', 'Red Sea': 'Red Sea', 'South Sinai': 'South Sinai',
        'North Sinai': 'North Sinai', 'Matrouh': 'Matrouh', 'New Valley': 'New Valley',
        'Fayoum': 'Fayoum', 'Qena': 'Qena', 'Sohag': 'Sohag', 'Beheira': 'Beheira',
        'Kafr El Sheikh': 'Kafr El Sheikh', 'Dakahlia': 'Dakahlia', 'Gharbia': 'Gharbia',
        'Sharqia': 'Sharqia', 'Monufia': 'Monufia', 'Qalyubia': 'Qalyubia',
        'Beni Suef': 'Beni Suef', 'Minya': 'Minya', 'Assiut': 'Assiut',
        'Port Said': 'Port Said', 'Ismailia': 'Ismailia', 'Suez': 'Suez', 'Damietta': 'Damietta'
    },
    ar: {
        'Giza': 'الجيزة', 'Cairo': 'القاهرة', 'Luxor': 'الأقصر', 'Aswan': 'أسوان',
        'Alexandria': 'الإسكندرية', 'Red Sea': 'البحر الأحمر', 'South Sinai': 'جنوب سيناء',
        'North Sinai': 'شمال سيناء', 'Matrouh': 'مطروح', 'New Valley': 'الوادي الجديد',
        'Fayoum': 'الفيوم', 'Qena': 'قنا', 'Sohag': 'سوهاج', 'Beheira': 'البحيرة',
        'Kafr El Sheikh': 'كفر الشيخ', 'Dakahlia': 'الدقهلية', 'Gharbia': 'الغربية',
        'Sharqia': 'الشرقية', 'Monufia': 'المنوفية', 'Qalyubia': 'القليوبية',
        'Beni Suef': 'بني سويف', 'Minya': 'المنيا', 'Assiut': 'أسيوط',
        'Port Said': 'بورسعيد', 'Ismailia': 'الإسماعيلية', 'Suez': 'السويس', 'Damietta': 'دمياط'
    },
    fr: {
        'Giza': 'Gizeh', 'Cairo': 'Le Caire', 'Luxor': 'Louxor', 'Aswan': 'Assouan',
        'Alexandria': 'Alexandrie', 'Red Sea': 'Mer Rouge', 'South Sinai': 'Sinaï du Sud',
        'North Sinai': 'Sinaï du Nord', 'Matrouh': 'Matrouh', 'New Valley': 'Nouvelle Vallée',
        'Fayoum': 'Fayoum', 'Qena': 'Qena', 'Sohag': 'Sohag', 'Beheira': 'Beheira',
        'Kafr El Sheikh': 'Kafr El Sheikh', 'Dakahlia': 'Dakahlia', 'Gharbia': 'Gharbia',
        'Sharqia': 'Sharqia', 'Monufia': 'Monufia', 'Qalyubia': 'Qalyubia',
        'Beni Suef': 'Beni Suef', 'Minya': 'Minya', 'Assiut': 'Assiut',
        'Port Said': 'Port-Saïd', 'Ismailia': 'Ismaïlia', 'Suez': 'Suez', 'Damietta': 'Damiette'
    }
};

// ========== ARABIC NORMALIZATION MAP ==========
const arabicNormalizationMap = {
    'أ': 'ا', 'إ': 'ا', 'آ': 'ا', 'ٱ': 'ا',
    'ة': 'ه', 'ى': 'ي',
    'ؤ': 'و', 'ئ': 'ي'
};

// ========== GLOBAL VARIABLES ==========
let searchModal, searchInput, searchResults, searchNoResults, searchFilters;
let currentFilter = 'all';
let searchDebounceTimer = null;
let lastSearchTerm = '';

// ========== Initialize Advanced Search ==========
function initializeAdvancedSearch() {
    console.log('🔍 Initializing Advanced Search System...');
    
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
        desktopSearchBtn.addEventListener('click', openSearchModal);
    }
    
    // Open search modal - Mobile
    if (mobileSearchBtn) {
        mobileSearchBtn.addEventListener('click', () => {
            openSearchModal();
            // Close mobile menu
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu) navMenu.classList.remove('active');
        });
    }
    
    // Close search modal
    if (searchClose) {
        searchClose.addEventListener('click', closeSearchModal);
    }
    
    // Close on outside click
    if (searchModal) {
        searchModal.addEventListener('click', (e) => {
            if (e.target === searchModal) {
                closeSearchModal();
            }
        });
    }
    
    // Search on input with debounce
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchDebounceTimer);
            searchDebounceTimer = setTimeout(() => {
                performAdvancedSearch(e.target.value);
            }, 300);
        });
        
        // Update placeholder based on language
        updateSearchPlaceholder();
    }
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchModal && searchModal.classList.contains('active')) {
            closeSearchModal();
        }
    });
    
    // Create filter buttons
    createSearchFilters();
    
    console.log('✅ Advanced Search System initialized');
}

// ========== Create Search Filters ==========
function createSearchFilters() {
    // Find or create filter container
    let filterContainer = document.querySelector('.search-filters');
    if (!filterContainer) {
        filterContainer = document.createElement('div');
        filterContainer.className = 'search-filters';
        
        const searchContent = document.querySelector('.search-content');
        if (searchContent) {
            searchContent.insertBefore(filterContainer, searchResults);
        }
    }
    
    const currentLang = getCurrentLanguage();
    const filters = searchTranslations[currentLang].filters;
    
    filterContainer.innerHTML = '';
    
    Object.keys(filters).forEach(filterKey => {
        const button = document.createElement('button');
        button.className = `filter-btn ${filterKey === 'all' ? 'active' : ''}`;
        button.textContent = filters[filterKey];
        button.setAttribute('data-filter', filterKey);
        
        button.addEventListener('click', () => {
            currentFilter = filterKey;
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            performAdvancedSearch(searchInput.value);
        });
        
        filterContainer.appendChild(button);
    });
}

// ========== Update Search Placeholder ==========
function updateSearchPlaceholder() {
    if (!searchInput) return;
    const currentLang = getCurrentLanguage();
    searchInput.placeholder = searchTranslations[currentLang].searchPlaceholder;
}

// ========== Open Search Modal ==========
function openSearchModal() {
    if (!searchModal) return;
    
    searchModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    if (searchInput) {
        setTimeout(() => searchInput.focus(), 100);
    }
    
    updateSearchPlaceholder();
    createSearchFilters();
}

// ========== Close Search Modal ==========
function closeSearchModal() {
    if (!searchModal) return;
    
    searchModal.classList.remove('active');
    document.body.style.overflow = '';
    
    if (searchInput) {
        searchInput.value = '';
    }
    if (searchResults) {
        searchResults.innerHTML = '';
    }
    if (searchNoResults) {
        searchNoResults.style.display = 'none';
    }
    
    currentFilter = 'all';
    lastSearchTerm = '';
}

// ========== Normalize Arabic Text ==========
function normalizeArabicText(text) {
    if (!text) return '';
    
    let normalized = text.toLowerCase();
    
    // Replace Arabic characters with normalized versions
    for (const [char, replacement] of Object.entries(arabicNormalizationMap)) {
        normalized = normalized.replace(new RegExp(char, 'g'), replacement);
    }
    
    // Remove diacritics
    normalized = normalized.replace(/[\u064B-\u0652]/g, '');
    
    return normalized;
}

// ========== Calculate Match Score ==========
function calculateMatchScore(place, searchTerms, currentLang) {
    let score = 0;
    
    // Get all searchable text for this place
    const nameEn = (place.name || '').toLowerCase();
    const nameAr = normalizeArabicText(place.nameAr || '');
    const nameFr = (place.nameFr || '').toLowerCase();
    
    const descEn = (place.description || '').toLowerCase();
    const descAr = normalizeArabicText(place.descriptionAr || '');
    const descFr = (place.descriptionFr || '').toLowerCase();
    
    const governorate = (place.governorate || '').toLowerCase();
    const category = (place.category || '').toLowerCase();
    
    // Get translated governorate names
    const govEn = governorateTranslations.en[place.governorate] || '';
    const govAr = governorateTranslations.ar[place.governorate] || '';
    const govFr = governorateTranslations.fr[place.governorate] || '';
    
    searchTerms.forEach(term => {
        const normalizedTerm = normalizeArabicText(term);
        
        // Name matches (highest priority)
        if (nameEn.includes(term)) score += 10;
        if (nameAr.includes(normalizedTerm)) score += 10;
        if (nameFr.includes(term)) score += 10;
        
        // Exact matches
        if (nameEn === term) score += 20;
        if (nameAr === normalizedTerm) score += 20;
        if (nameFr === term) score += 20;
        
        // Starts with (high priority)
        if (nameEn.startsWith(term)) score += 15;
        if (nameAr.startsWith(normalizedTerm)) score += 15;
        if (nameFr.startsWith(term)) score += 15;
        
        // Governorate matches
        if (governorate.includes(term)) score += 8;
        if (govEn.toLowerCase().includes(term)) score += 8;
        if (normalizeArabicText(govAr).includes(normalizedTerm)) score += 8;
        if (govFr.toLowerCase().includes(term)) score += 8;
        
        // Category matches
        if (category.includes(term)) score += 6;
        
        // Description matches (lower priority)
        if (descEn.includes(term)) score += 3;
        if (descAr.includes(normalizedTerm)) score += 3;
        if (descFr.includes(term)) score += 3;
    });
    
    // Boost score based on current language
    if (currentLang === 'ar' && nameAr) score += 5;
    if (currentLang === 'fr' && nameFr) score += 5;
    if (currentLang === 'en' && nameEn) score += 5;
    
    return score;
}

// ========== Perform Advanced Search ==========
function performAdvancedSearch(query) {
    const searchTerm = query.toLowerCase().trim();
    
    // Clear results if search is empty
    if (!searchTerm || searchTerm.length < 2) {
        if (searchResults) searchResults.innerHTML = '';
        if (searchNoResults) searchNoResults.style.display = 'none';
        return;
    }
    
    // Check if same search
    if (searchTerm === lastSearchTerm) return;
    lastSearchTerm = searchTerm;
    
    const currentLang = getCurrentLanguage();
    
    console.log('🔍 Advanced Search - Query:', searchTerm, 'Language:', currentLang, 'Filter:', currentFilter);
    
    // Show loading state
    if (searchResults) {
        searchResults.innerHTML = `
            <div class="search-loading">
                <i class="fas fa-spinner fa-spin"></i>
                <p>${searchTranslations[currentLang].searching}</p>
            </div>
        `;
    }
    
    // Perform search after short delay for UI feedback
    setTimeout(() => {
        executeSearch(searchTerm, currentLang);
    }, 100);
}

// ========== Execute Search ==========
function executeSearch(searchTerm, currentLang) {
    // Get all places from placesData
    const allPlaces = placesData?.places || [];
    
    if (allPlaces.length === 0) {
        console.warn('⚠️ No places data available');
        displayNoResults(currentLang);
        return;
    }
    
    // Split search term into words
    const searchTerms = searchTerm.split(/\s+/).filter(t => t.length > 1);
    
    // Score and filter places
    const scoredPlaces = allPlaces.map(place => ({
        place: place,
        score: calculateMatchScore(place, searchTerms, currentLang)
    }))
    .filter(item => item.score > 0);
    
    // Apply category filter
    let filtered = scoredPlaces;
    if (currentFilter !== 'all') {
        filtered = scoredPlaces.filter(item => 
            item.place.category === currentFilter
        );
    }
    
    // Sort by score (highest first)
    filtered.sort((a, b) => b.score - a.score);
    
    // Get top results (limit to 50 for performance)
    const results = filtered.slice(0, 50).map(item => item.place);
    
    console.log(`✅ Found ${results.length} results (from ${scoredPlaces.length} total matches)`);
    
    // Display results
    displaySearchResults(results, currentLang);
}

// ========== Display Search Results ==========
function displaySearchResults(places, currentLang) {
    if (!searchResults) return;
    
    // Clear previous results
    searchResults.innerHTML = '';
    
    // Show/hide no results message
    if (places.length === 0) {
        displayNoResults(currentLang);
        return;
    } else {
        if (searchNoResults) searchNoResults.style.display = 'none';
    }
    
    // Show results count
    const resultsCount = document.createElement('div');
    resultsCount.className = 'search-results-count';
    resultsCount.textContent = `${places.length} ${searchTranslations[currentLang].resultsFound}`;
    searchResults.appendChild(resultsCount);
    
    // Create result items
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'search-results-container';
    
    places.forEach(place => {
        const resultItem = createSearchResultItem(place, currentLang);
        resultsContainer.appendChild(resultItem);
    });
    
    searchResults.appendChild(resultsContainer);
}

// ========== Display No Results ==========
function displayNoResults(currentLang) {
    if (!searchNoResults) return;
    
    searchNoResults.style.display = 'block';
    searchNoResults.innerHTML = `
        <i class="fas fa-search"></i>
        <h3>${searchTranslations[currentLang].noResults}</h3>
        <p>${searchTranslations[currentLang].tryDifferent}</p>
    `;
    
    if (searchResults) {
        searchResults.innerHTML = '';
    }
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
    
    // Get localized description
    let description = place.description || '';
    if (currentLang === 'ar' && place.descriptionAr) {
        description = place.descriptionAr;
    } else if (currentLang === 'fr' && place.descriptionFr) {
        description = place.descriptionFr;
    }
    
    // Truncate description
    if (description.length > 120) {
        description = description.substring(0, 120) + '...';
    }
    
    // Get localized governorate
    const governorateName = governorateTranslations_advanced[currentLang][place.governorate] || place.governorate;
    
    // Get category icon and name
    const categoryIcons = {
        restaurants: 'fa-utensils',
        attractions: 'fa-landmark',
        activities: 'fa-running',
        shopping: 'fa-shopping-bag'
    };
    
    const categoryIcon = categoryIcons[place.category] || 'fa-map-marker-alt';
    const categoryName = searchTranslations[currentLang].categories[place.category] || place.category;
    
    item.innerHTML = `
        <div class="result-icon">
            <i class="fas ${categoryIcon}"></i>
        </div>
        <div class="result-content">
            <h4 class="result-title">${placeName}</h4>
            <p class="result-description">${description}</p>
            <div class="result-meta">
                <span class="result-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${governorateName}
                </span>
                <span class="result-category">
                    <i class="fas fa-tag"></i>
                    ${categoryName}
                </span>
            </div>
        </div>
    `;
    
    // Add click handler
    item.addEventListener('click', () => {
        closeSearchModal();
        // Navigate to the appropriate section
        showPlaceDetails(place);
    });
    
    return item;
}

// ========== Show Place Details ==========
function showPlaceDetails(place) {
    // This function should navigate to the place or show details
    // For now, we'll just log it
    console.log('Showing place details:', place);
    
    // You can implement navigation to the explore section with this place highlighted
    // Or open a modal with place details
}

// ========== Get Current Language ==========
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'en';
}

// ========== Update on Language Change ==========
document.addEventListener('languageChanged', () => {
    updateSearchPlaceholder();
    createSearchFilters();
    
    // Re-run search if there's an active search
    if (searchInput && searchInput.value.trim().length >= 2) {
        performAdvancedSearch(searchInput.value);
    }
});

// ========== Initialize on Load ==========
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAdvancedSearch);
} else {
    initializeAdvancedSearch();
}

// ========== Export for Global Access ==========
window.openSearchModal = openSearchModal;
window.closeSearchModal = closeSearchModal;
window.performAdvancedSearch = performAdvancedSearch;

console.log('✅ Advanced Search System loaded');
