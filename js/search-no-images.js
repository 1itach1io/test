// search.js - Search Functionality (WITHOUT IMAGES)

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
        'Matrouh': 'Matrouh',
        'New Valley': 'New Valley',
        'Fayoum': 'Fayoum',
        'Qena': 'Qena',
        'Sohag': 'Sohag',
        'Beheira': 'Beheira'
    },
    ar: {
        'Giza': 'الجيزة',
        'Cairo': 'القاهرة',
        'Luxor': 'الأقصر',
        'Aswan': 'أسوان',
        'Alexandria': 'الإسكندرية',
        'Red Sea': 'البحر الأحمر',
        'South Sinai': 'جنوب سيناء',
        'Matrouh': 'مطروح',
        'New Valley': 'الوادي الجديد',
        'Fayoum': 'الفيوم',
        'Qena': 'قنا',
        'Sohag': 'سوهاج',
        'Beheira': 'البحيرة'
    },
    fr: {
        'Giza': 'Gizeh',
        'Cairo': 'Le Caire',
        'Luxor': 'Louxor',
        'Aswan': 'Assouan',
        'Alexandria': 'Alexandrie',
        'Red Sea': 'Mer Rouge',
        'South Sinai': 'Sinaï du Sud',
        'Matrouh': 'Matrouh',
        'New Valley': 'Nouvelle Vallée',
        'Fayoum': 'Fayoum',
        'Qena': 'Qena',
        'Sohag': 'Sohag',
        'Beheira': 'Beheira'
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
    
    // Get all places from placesData (loaded from places-enhanced.js)
    const allPlaces = placesData.places || [];
    
    // Filter places based on search term
    const filtered = allPlaces.filter(place => {
        // Get names in all languages
        const nameEn = (place.name || '').toLowerCase();
        const nameAr = (place.nameAr || '').toLowerCase();
        const nameFr = (place.nameFr || '').toLowerCase();
        const governorate = (place.governorate || '').toLowerCase();
        const category = (place.category || '').toLowerCase();
        const description = (place.description || '').toLowerCase();
        const descriptionAr = (place.descriptionAr || '').toLowerCase();
        
        // Search in all relevant fields
        return nameEn.includes(searchTerm) ||
               nameAr.includes(searchTerm) ||
               nameFr.includes(searchTerm) ||
               governorate.includes(searchTerm) ||
               category.includes(searchTerm) ||
               description.includes(searchTerm) ||
               descriptionAr.includes(searchTerm);
    });
    
    // Display results
    displaySearchResults(filtered, currentLang);
    
    console.log('🔍 Search results for "' + query + '":', filtered.length, 'places found');
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

// ========== Create Search Result Item (WITHOUT IMAGE) ==========
function createSearchResultItem(place, currentLang) {
    const item = document.createElement('div');
    item.className = 'search-result-item no-image';
    
    // Get localized name and description
    let placeName = place.name;
    let placeDesc = place.description;
    
    if (currentLang === 'ar') {
        placeName = place.nameAr || place.name;
        placeDesc = place.descriptionAr || place.description;
    } else if (currentLang === 'fr') {
        placeName = place.nameFr || place.name;
        placeDesc = place.descriptionFr || place.description;
    }
    
    // Get category icon
    const categoryIcons = {
        'ancient': '🏛️',
        'nature': '🌿',
        'beach': '🏖️',
        'museum': '🏛️',
        'religious': '🕌',
        'historical': '📜',
        'modern': '🏙️',
        'cultural': '🎭',
        'adventure': '🎢'
    };
    
    const categoryIcon = categoryIcons[place.category] || '📍';
    
    // Get category name localized
    const categoryNames = {
        en: {
            'ancient': 'Ancient Sites',
            'nature': 'Nature',
            'beach': 'Beach',
            'museum': 'Museum',
            'religious': 'Religious',
            'historical': 'Historical',
            'modern': 'Modern',
            'cultural': 'Cultural',
            'adventure': 'Adventure'
        },
        ar: {
            'ancient': 'المواقع الأثرية',
            'nature': 'الطبيعة',
            'beach': 'شواطئ',
            'museum': 'متحف',
            'religious': 'ديني',
            'historical': 'تاريخي',
            'modern': 'حديث',
            'cultural': 'ثقافي',
            'adventure': 'مغامرة'
        },
        fr: {
            'ancient': 'Sites Antiques',
            'nature': 'Nature',
            'beach': 'Plage',
            'museum': 'Musée',
            'religious': 'Religieux',
            'historical': 'Historique',
            'modern': 'Moderne',
            'cultural': 'Culturel',
            'adventure': 'Aventure'
        }
    };
    
    const categoryName = categoryNames[currentLang][place.category] || place.category;
    
    // Get localized governorate
    const governorateName = governorateTranslations[currentLang][place.governorate] || place.governorate;
    
    // Truncate description
    const shortDesc = placeDesc.length > 120 ? placeDesc.substring(0, 120) + '...' : placeDesc;
    
    // Create HTML WITHOUT IMAGE
    item.innerHTML = `
        <div class="search-result-icon">${categoryIcon}</div>
        <div class="search-result-info">
            <div class="search-result-name">${placeName}</div>
            <div class="search-result-description">${shortDesc}</div>
            <div class="search-result-details">
                <span class="search-result-category">
                    ${categoryIcon} ${categoryName}
                </span>
                <span class="search-result-governorate">
                    📍 ${governorateName}
                </span>
                ${place.rating ? `
                <span class="search-result-rating">
                    ⭐ ${place.rating}
                </span>
                ` : ''}
            </div>
        </div>
    `;
    
    // Click event - close modal and show place on map
    item.addEventListener('click', () => {
        closeSearchModal();
        
        // If map exists, center on this place
        if (typeof map !== 'undefined' && place.coordinates) {
            map.setView([place.coordinates.lat, place.coordinates.lng], 13);
            
            // Navigate to map section
            const mapSection = document.getElementById('map');
            if (mapSection) {
                // Hide all sections
                document.querySelectorAll('.section').forEach(sec => {
                    sec.classList.remove('active');
                });
                
                // Show map section
                mapSection.classList.add('active');
                
                // Update navigation
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === 'map') {
                        link.classList.add('active');
                    }
                });
                
                // Add marker
                if (typeof L !== 'undefined') {
                    L.marker([place.coordinates.lat, place.coordinates.lng])
                        .addTo(map)
                        .bindPopup(`<b>${placeName}</b><br>${shortDesc}`)
                        .openPopup();
                }
            }
        }
    });
    
    return item;
}

// ========== Initialize on Page Load ==========
document.addEventListener('DOMContentLoaded', () => {
    // Wait for placesData to be loaded
    setTimeout(() => {
        if (typeof placesData !== 'undefined') {
            initializeSearch();
            console.log('✅ Search initialized with', placesData.places.length, 'places');
        } else {
            console.error('❌ placesData not loaded');
        }
    }, 500);
});
