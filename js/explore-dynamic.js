/* ==========================================
   DISCOVER EGYPT - EXPLORE DYNAMIC CARDS
   Load all places from data without images
   ========================================== */

// ========== Initialize Explore Cards ==========
function initializeExploreCards() {
    console.log('📍 Loading explore cards dynamically...');

    const cardsContainer = document.getElementById('explore-cards-container');
    if (!cardsContainer) {
        console.error('Cards container not found');
        return;
    }

    // Get current language
    const currentLang = localStorage.getItem('language') || 'en';

    // Get all places from placesEnhanced
    const allPlaces = placesEnhanced.places || [];

    // Clear existing cards
    cardsContainer.innerHTML = '';

    // Create cards for all places
    allPlaces.forEach(place => {
        const card = createExploreCard(place, currentLang);
        cardsContainer.appendChild(card);
    });

    console.log(`✅ Loaded ${allPlaces.length} places`);
}

// ========== Create Explore Card (Without Image) ==========
function createExploreCard(place, currentLang) {
    const card = document.createElement('div');
    card.className = 'explore-card';
    card.setAttribute('data-category', place.category);

    // Get localized content
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
        'cultural': '🎭'
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

    // Create card HTML without image
    card.innerHTML = `
        <div class="explore-card-icon">${categoryIcon}</div>
        <div class="explore-card-content">
            <h3 class="explore-card-title">${placeName}</h3>
            <div class="explore-card-meta">
                <span class="explore-card-category">${categoryName}</span>
                <span class="explore-card-location">📍 ${place.governorate}</span>
            </div>
            <p class="explore-card-description">${placeDesc}</p>
            ${place.rating ? `
                <div class="explore-card-rating">
                    ${'⭐'.repeat(Math.round(place.rating))}
                    <span class="rating-number">${place.rating}</span>
                </div>
            ` : ''}
        </div>
    `;

    // Add click event to show on map
    card.addEventListener('click', () => {
        if (typeof map !== 'undefined' && place.coordinates) {
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

                // Center map on place
                map.setView([place.coordinates.lat, place.coordinates.lng], 13);

                // Optionally, add a marker
                if (typeof L !== 'undefined') {
                    L.marker([place.coordinates.lat, place.coordinates.lng])
                        .addTo(map)
                        .bindPopup(`<b>${placeName}</b><br>${placeDesc}`)
                        .openPopup();
                }
            }
        }
    });

    return card;
}

// ========== Update Cards on Language Change ==========
function updateExploreCardsLanguage() {
    initializeExploreCards();
}

// ========== Initialize on Page Load ==========
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit to ensure placesEnhanced is loaded
    setTimeout(() => {
        initializeExploreCards();
    }, 100);
});
