// search.js - Search Functionality (Using places-enhanced.js)

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

    // Get all places from placesEnhanced (loaded from places-enhanced.js)
    const allPlaces = placesEnhanced.places || [];

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
                    ${categoryIcon} ${place.category}
                </span>
                <span class="search-result-governorate">
                    📍 ${place.governorate}
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
