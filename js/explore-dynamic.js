/* ==========================================
   DISCOVER EGYPT - EXPLORE DYNAMIC CARDS
   Load all places from data WITH IMAGES
   ========================================== */

// ========== Get Place Image ==========
function getPlaceImage(placeId, category) {
    // Check if placeImages is defined and has the image
    if (typeof placeImages !== 'undefined' && placeImages[placeId]) {
        return placeImages[placeId];
    }
    
    // Fallback images by category
    const fallbackImages = {
        'ancient': 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=800&q=80',
        'nature': 'https://images.unsplash.com/photo-1589802829985-817e51171b92?w=800&q=80',
        'beach': 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
        'museum': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        'religious': 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80',
        'historical': 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80',
        'modern': 'https://images.unsplash.com/photo-1517732306149-e8f829eb588a?w=800&q=80',
        'cultural': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
    };
    
    return fallbackImages[category] || fallbackImages['ancient'];
}

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

// ========== UI Translations ==========
const uiTranslations = {
    en: {
        viewOnMap: 'View on Map',
        showDetails: 'Show Details',
        addToFavorites: 'Add to Favorites'
    },
    ar: {
        viewOnMap: 'عرض على الخريطة',
        showDetails: 'عرض التفاصيل',
        addToFavorites: 'إضافة للمفضلة'
    },
    fr: {
        viewOnMap: 'Voir sur la carte',
        showDetails: 'Afficher les détails',
        addToFavorites: 'Ajouter aux favoris'
    }
};

// ========== Initialize Explore Cards ==========
function initializeExploreCards() {
    console.log('📍 Loading explore cards dynamically...');
    
    const cardsContainer = document.getElementById('explore-cards-container');
    if (!cardsContainer) {
        console.error('Cards container not found');
        return;
    }
    
    // Get current language
    const currentLang = window.currentLanguage || localStorage.getItem('language') || 'en';
    
    // Get all places from placesData
    const allPlaces = placesData.places || [];
    
    // Clear existing cards
    cardsContainer.innerHTML = '';
    
    // Create cards for all places
    allPlaces.forEach(place => {
        const card = createExploreCard(place, currentLang);
        cardsContainer.appendChild(card);
    });
    
    console.log(`✅ Loaded ${allPlaces.length} places in ${currentLang}`);
    
    // Dispatch event to notify filters
    document.dispatchEvent(new CustomEvent('cardsLoaded'));
    
    // Initialize filters
    if (typeof initializeFilters === 'function') {
        initializeFilters();
    }
}

// ========== Listen for language changes ==========
document.addEventListener('languageChange', function(e) {
    console.log('🔄 Language changed, reloading explore cards...');
    initializeExploreCards();
});

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
    
    // Get place image
    const placeImageUrl = getPlaceImage(place.id, place.category);
    
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
    
    // Get governorate name localized
    const governorateName = governorateTranslations[currentLang][place.governorate] || place.governorate;
    
    // Create card HTML with image
    card.innerHTML = `
        <div class="explore-card-image-container">
            <img src="${placeImageUrl}" alt="${placeName}" class="explore-card-image" loading="lazy">
            <div class="explore-card-category-badge">${categoryIcon} ${categoryName}</div>
        </div>
        <div class="explore-card-content">
            <h3 class="explore-card-title">${placeName}</h3>
            <div class="explore-card-meta">
                <span class="explore-card-location">📍 ${governorateName}</span>
                ${place.rating ? `
                    <div class="explore-card-rating">
                        <span class="rating-stars">${'⭐'.repeat(Math.round(place.rating))}</span>
                        <span class="rating-number">${place.rating}</span>
                    </div>
                ` : ''}
            </div>
            <p class="explore-card-description">${placeDesc}</p>
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
    // Wait a bit to ensure placesData is loaded
    setTimeout(() => {
        initializeExploreCards();
    }, 100);
});
