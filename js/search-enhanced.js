/* ═══════════════════════════════════════════════════════════════════
   ENHANCED SEARCH FUNCTIONALITY
   Fixed and Improved Search with Full Language Support
   ═══════════════════════════════════════════════════════════════════ */

'use strict';

// ========== GLOBAL VARIABLES ==========
let searchModal;
let searchInput;
let searchResults;
let searchNoResults;

// ========== Initialize Search ==========
function initializeSearch() {
    console.log('🔍 Initializing enhanced search functionality...');
    
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
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchModal && searchModal.classList.contains('active')) {
            closeSearchModal();
        }
    });
    
    // Search input event
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch();
            }
        });
    }
    
    console.log('✅ Search initialized successfully');
}

// ========== Open Search Modal ==========
function openSearchModal() {
    if (searchModal) {
        searchModal.classList.add('active');
        if (searchInput) {
            searchInput.focus();
            searchInput.value = '';
        }
        if (searchResults) searchResults.innerHTML = '';
        if (searchNoResults) searchNoResults.style.display = 'none';
    }
}

// ========== Close Search Modal ==========
function closeSearchModal() {
    if (searchModal) {
        searchModal.classList.remove('active');
        if (searchInput) searchInput.value = '';
        if (searchResults) searchResults.innerHTML = '';
        if (searchNoResults) searchNoResults.style.display = 'none';
    }
}

// ========== Handle Search ==========
function handleSearch() {
    if (!searchInput || !searchResults || !searchNoResults) return;
    
    const query = searchInput.value.trim().toLowerCase();
    
    if (query.length < 2) {
        searchResults.innerHTML = '';
        searchNoResults.style.display = 'none';
        return;
    }
    
    console.log('🔍 Searching for:', query);
    
    // Get current language
    const currentLang = getCurrentLanguage();
    
    // Search in places data
    const results = searchInPlaces(query, currentLang);
    
    // Display results
    displaySearchResults(results, currentLang);
}

// ========== Search in Places ==========
function searchInPlaces(query, lang) {
    // Try different variable names for places data
    let placesSource = [];
    
    if (window.placesData && window.placesData.places) {
        placesSource = window.placesData.places;
    } else if (window.places && Array.isArray(window.places)) {
        placesSource = window.places;
    } else if (window.PLACES && Array.isArray(window.PLACES)) {
        placesSource = window.PLACES;
    }
    
    if (!Array.isArray(placesSource) || placesSource.length === 0) {
        console.error('Places data not available');
        return [];
    }
    
    const results = [];
    
    placesSource.forEach(place => {
        const placeName = place.name || place.nameAr || place.nameEn || '';
        const placeDesc = place.description || place.descriptionAr || place.descriptionEn || '';
        const placeCity = place.governorate || place.city || '';
        const category = place.category || '';
        
        // Search in name, description, city, and category
        if (
            placeName.toLowerCase().includes(query) ||
            placeDesc.toLowerCase().includes(query) ||
            placeCity.toLowerCase().includes(query) ||
            category.toLowerCase().includes(query)
        ) {
            results.push({
                ...place,
                relevance: calculateRelevance(query, placeName, placeDesc, placeCity)
            });
        }
    });
    
    // Sort by relevance
    results.sort((a, b) => b.relevance - a.relevance);
    
    return results;
}

// ========== Calculate Relevance ==========
function calculateRelevance(query, name, desc, city) {
    let score = 0;
    
    // Exact match in name = highest score
    if (name.toLowerCase() === query) score += 100;
    // Name starts with query
    else if (name.toLowerCase().startsWith(query)) score += 50;
    // Name contains query
    else if (name.toLowerCase().includes(query)) score += 25;
    
    // Match in city
    if (city.toLowerCase().includes(query)) score += 15;
    
    // Match in description
    if (desc.toLowerCase().includes(query)) score += 10;
    
    return score;
}

// ========== Display Search Results ==========
function displaySearchResults(results, lang) {
    if (!searchResults || !searchNoResults) return;
    
    if (results.length === 0) {
        searchResults.innerHTML = '';
        searchNoResults.style.display = 'flex';
        return;
    }
    
    searchNoResults.style.display = 'none';
    
    searchResults.innerHTML = results.map(place => {
        // Support different data structures
        let name, desc, city;
        
        if (lang === 'ar') {
            name = place.nameAr || place.name || '';
            desc = place.descriptionAr || place.description || '';
        } else if (lang === 'fr') {
            name = place.nameFr || place.name || '';
            desc = place.descriptionFr || place.description || '';
        } else {
            name = place.name || place.nameEn || '';
            desc = place.description || place.descriptionEn || '';
        }
        
        city = place.governorate || place.city || '';
        
        return `
            <div class="search-result-item" onclick="selectSearchPlace('${place.id}')" role="button" tabindex="0">
                <div class="search-result-content">
                    <div class="search-result-title">${name}</div>
                    <div class="search-result-meta">
                        <span class="search-result-city">📍 ${city}</span>
                        <span class="search-result-category">${getCategoryIcon(place.category)} ${getCategoryName(place.category, lang)}</span>
                    </div>
                    <div class="search-result-desc">${truncateText(desc, 100)}</div>
                </div>
            </div>
        `;
    }).join('');
}

// ========== Select Search Place ==========
function selectSearchPlace(placeId) {
    console.log('Selected place:', placeId);
    
    // Close search modal
    closeSearchModal();
    
    // Navigate to explore section
    const exploreSection = document.getElementById('explore');
    if (exploreSection) {
        exploreSection.scrollIntoView({ behavior: 'smooth' });
        
        // Highlight the selected card
        setTimeout(() => {
            const card = document.querySelector(`[data-place-id="${placeId}"]`);
            if (card) {
                card.classList.add('highlight');
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                setTimeout(() => {
                    card.classList.remove('highlight');
                }, 2000);
            }
        }, 500);
    }
}

// ========== Helper Functions ==========
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'en';
}

function getCategoryIcon(category) {
    const icons = {
        'ancient': '🏛️',
        'modern': '🏙️',
        'nature': '🌄',
        'beach': '🏖️',
        'museum': '🏛️',
        'religious': '🕌',
        'historical': '📜',
        'cultural': '🎭'
    };
    return icons[category] || '📍';
}

function getCategoryName(category, lang) {
    if (!window.translations || !window.translations[lang]) return category;
    return window.translations[lang].explore[category] || category;
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// ========== Initialize on Load ==========
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSearch);
} else {
    initializeSearch();
}

// Export for global use
window.openSearchModal = openSearchModal;
window.closeSearchModal = closeSearchModal;
window.selectSearchPlace = selectSearchPlace;
