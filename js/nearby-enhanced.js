/* ==========================================
   DISCOVER EGYPT - NEARBY PLACES FEATURE
   Enhanced with Geolocation and Google Maps
   ========================================== */

let userLocation = null;
let placesData = [];
let map = null;
let markers = [];

// Initialize Nearby Places Feature
async function initializeNearbyPlaces() {
    console.log('📍 Initializing Nearby Places...');
    
    // Load places data
    await loadPlacesData();
    
    // Setup event listeners
    setupNearbyEventListeners();
    
    // Check if user is on nearby section
    const nearbySection = document.getElementById('nearby');
    if (nearbySection && nearbySection.classList.contains('active')) {
        requestLocationPermission();
    }
}

// Load places data from places-enhanced.js
async function loadPlacesData() {
    try {
        // Get data from placesEnhanced global variable (loaded from places-enhanced.js)
        if (typeof placesEnhanced !== 'undefined' && placesEnhanced.places) {
            placesData = placesEnhanced.places;
            console.log(`✅ Loaded ${placesData.length} places from placesEnhanced`);
        } else {
            console.error('❌ placesEnhanced not found');
            placesData = [];
        }
    } catch (error) {
        console.error('❌ Error loading places:', error);
        placesData = [];
    }
}

// Setup event listeners
function setupNearbyEventListeners() {
    const locationBtn = document.getElementById('get-location-btn');
    if (locationBtn) {
        locationBtn.addEventListener('click', requestLocationPermission);
    }
    
    // Watch for section changes
    const nearbyNavLink = document.querySelector('[data-section="nearby"]');
    if (nearbyNavLink) {
        nearbyNavLink.addEventListener('click', () => {
            setTimeout(() => {
                if (!userLocation) {
                    showLocationPrompt();
                }
            }, 500);
        });
    }
}

// Show location permission prompt
function showLocationPrompt() {
    const promptHtml = `
        <div class="location-prompt">
            <div class="location-prompt-content">
                <div class="location-icon">📍</div>
                <h3 data-translate="nearby.enableLocation">Enable Location</h3>
                <p data-translate="nearby.locationMessage">
                    Allow us to access your location to find nearby tourist attractions
                </p>
                <button id="enable-location-btn" class="btn btn-primary">
                    <i class="fas fa-location-arrow"></i>
                    <span data-translate="nearby.enableBtn">Enable Location</span>
                </button>
            </div>
        </div>
    `;
    
    const nearbyContainer = document.getElementById('nearby-places-container');
    if (nearbyContainer) {
        nearbyContainer.innerHTML = promptHtml;
        
        const enableBtn = document.getElementById('enable-location-btn');
        if (enableBtn) {
            enableBtn.addEventListener('click', requestLocationPermission);
        }
    }
}

// Request location permission
function requestLocationPermission() {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by your browser');
        return;
    }
    
    showLoadingState();
    
    navigator.geolocation.getCurrentPosition(
        handleLocationSuccess,
        handleLocationError,
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}

// Handle successful location retrieval
function handleLocationSuccess(position) {
    userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };
    
    console.log('✅ User location:', userLocation);
    
    // Calculate distances and sort places
    const nearbyPlaces = calculateNearbyPlaces(userLocation);
    
    // Display results
    displayNearbyPlaces(nearbyPlaces);
    
    // Initialize map
    initializeNearbyMap(nearbyPlaces);
}

// Handle location error
function handleLocationError(error) {
    console.error('❌ Location error:', error);
    
    let errorMessage = 'Unable to get your location. ';
    
    switch(error.code) {
        case error.PERMISSION_DENIED:
            errorMessage += 'Please enable location permissions in your browser settings.';
            break;
        case error.POSITION_UNAVAILABLE:
            errorMessage += 'Location information unavailable.';
            break;
        case error.TIMEOUT:
            errorMessage += 'Location request timed out.';
            break;
        default:
            errorMessage += 'An unknown error occurred.';
    }
    
    showError(errorMessage);
}

// Calculate distances and get nearby places
function calculateNearbyPlaces(userLoc) {
    const placesWithDistance = placesData.map(place => {
        const distance = calculateDistance(
            userLoc.lat,
            userLoc.lng,
            place.coordinates.lat,
            place.coordinates.lng
        );
        
        return {
            ...place,
            distance: distance,
            distanceKm: (distance / 1000).toFixed(1),
            travelTime: estimateTravelTime(distance)
        };
    });
    
    // Sort by distance
    placesWithDistance.sort((a, b) => a.distance - b.distance);
    
    // Return top 12 nearest places
    return placesWithDistance.slice(0, 12);
}

// Calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;
    
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    return R * c; // Distance in meters
}

// Estimate travel time
function estimateTravelTime(distanceMeters) {
    const distanceKm = distanceMeters / 1000;
    
    // Assume average speed of 60 km/h
    const hours = distanceKm / 60;
    
    if (hours < 1) {
        const minutes = Math.round(hours * 60);
        return `${minutes} min`;
    } else {
        const wholeHours = Math.floor(hours);
        const minutes = Math.round((hours - wholeHours) * 60);
        return minutes > 0 ? `${wholeHours}h ${minutes}min` : `${wholeHours}h`;
    }
}

// Display nearby places
function displayNearbyPlaces(places) {
    const container = document.getElementById('nearby-places-container');
    if (!container) return;
    
    const currentLang = localStorage.getItem('language') || 'en';
    
    let html = `
        <div class="nearby-header">
            <div class="location-info">
                <i class="fas fa-map-marker-alt"></i>
                <span>Showing ${places.length} places near you</span>
            </div>
            <button class="btn-refresh" onclick="requestLocationPermission()">
                <i class="fas fa-sync-alt"></i>
                Refresh
            </button>
        </div>
        <div class="nearby-grid">
    `;
    
    places.forEach(place => {
        const name = currentLang === 'ar' ? place.nameAr : 
                    currentLang === 'fr' ? place.nameFr : place.name;
        const desc = currentLang === 'ar' ? place.descriptionAr : 
                    currentLang === 'fr' ? place.descriptionFr : place.description;
        
        html += `
            <article class="nearby-card" data-place-id="${place.id}">
                <div class="nearby-image">
                    <img src="${place.image}" alt="${name}" loading="lazy">
                    <span class="distance-badge">${place.distanceKm} km</span>
                </div>
                <div class="nearby-content">
                    <h3 class="nearby-title">${name}</h3>
                    <p class="nearby-description">${desc}</p>
                    <div class="nearby-info">
                        <span class="location-tag">
                            <i class="fas fa-map-pin"></i> ${place.governorate}
                        </span>
                        <span class="time-tag">
                            <i class="fas fa-clock"></i> ${place.travelTime}
                        </span>
                        <span class="rating-tag">
                            <i class="fas fa-star"></i> ${place.rating}
                        </span>
                    </div>
                    <div class="nearby-actions">
                        <button class="btn-directions" onclick="openDirections(${place.coordinates.lat}, ${place.coordinates.lng}, '${name}')">
                            <i class="fas fa-directions"></i>
                            Get Directions
                        </button>
                        <button class="btn-details" onclick="showPlaceDetails('${place.id}')">
                            <i class="fas fa-info-circle"></i>
                            Details
                        </button>
                    </div>
                </div>
            </article>
        `;
    });
    
    html += '</div>';
    
    // Add map container
    html += `
        <div class="nearby-map-section">
            <h3><i class="fas fa-map"></i> Map View</h3>
            <div id="nearby-map" class="nearby-map"></div>
        </div>
    `;
    
    container.innerHTML = html;
}

// Initialize map
function initializeNearbyMap(places) {
    // Create map container if it doesn't exist
    const mapContainer = document.getElementById('nearby-map');
    if (!mapContainer) return;
    
    // Use Leaflet for map (free alternative to Google Maps)
    if (typeof L !== 'undefined') {
        // Clear existing map
        if (map) {
            map.remove();
        }
        
        // Create new map
        map = L.map('nearby-map').setView([userLocation.lat, userLocation.lng], 8);
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(map);
        
        // Add user location marker
        L.marker([userLocation.lat, userLocation.lng], {
            icon: L.divIcon({
                className: 'user-location-marker',
                html: '<div style="background: #3498db; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>',
                iconSize: [20, 20]
            })
        }).addTo(map)
          .bindPopup('<b>Your Location</b>')
          .openPopup();
        
        // Add place markers
        places.forEach((place, index) => {
            if (index < 5) { // Show only top 5 on map
                const marker = L.marker([place.coordinates.lat, place.coordinates.lng])
                    .addTo(map)
                    .bindPopup(`
                        <div class="map-popup">
                            <h4>${place.name}</h4>
                            <p>${place.distanceKm} km away</p>
                            <p>${place.travelTime} travel time</p>
                            <button onclick="openDirections(${place.coordinates.lat}, ${place.coordinates.lng}, '${place.name}')" 
                                    style="margin-top: 8px; padding: 5px 10px; background: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer;">
                                Get Directions
                            </button>
                        </div>
                    `);
                
                markers.push(marker);
            }
        });
        
        // Fit map to show all markers
        if (markers.length > 0) {
            const group = L.featureGroup([...markers]);
            map.fitBounds(group.getBounds().pad(0.1));
        }
    }
}

// Open directions in Google Maps
function openDirections(lat, lng, placeName) {
    if (userLocation) {
        // Google Maps directions URL
        const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${lat},${lng}&travelmode=driving`;
        window.open(url, '_blank');
    } else {
        // Direct Google Maps link to destination
        const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
        window.open(url, '_blank');
    }
}

// Show place details modal
function showPlaceDetails(placeId) {
    const place = placesData.find(p => p.id === placeId);
    if (!place) return;
    
    const currentLang = localStorage.getItem('language') || 'en';
    const name = currentLang === 'ar' ? place.nameAr : 
                currentLang === 'fr' ? place.nameFr : place.name;
    const desc = currentLang === 'ar' ? place.descriptionAr : 
                currentLang === 'fr' ? place.descriptionFr : place.description;
    
    const modalHtml = `
        <div class="place-modal-overlay" onclick="closePlaceModal()">
            <div class="place-modal" onclick="event.stopPropagation()">
                <button class="modal-close" onclick="closePlaceModal()">
                    <i class="fas fa-times"></i>
                </button>
                <div class="modal-image">
                    <img src="${place.image}" alt="${name}">
                </div>
                <div class="modal-content">
                    <h2>${name}</h2>
                    <div class="modal-info">
                        <span class="info-item">
                            <i class="fas fa-map-marker-alt"></i>
                            ${place.governorate}, Egypt
                        </span>
                        <span class="info-item">
                            <i class="fas fa-star"></i>
                            ${place.rating} Rating
                        </span>
                        <span class="info-item">
                            <i class="fas fa-tag"></i>
                            ${place.category.charAt(0).toUpperCase() + place.category.slice(1)}
                        </span>
                    </div>
                    <p class="modal-description">${desc}</p>
                    ${place.distance ? `
                        <div class="modal-distance">
                            <h4>Location Information</h4>
                            <p><i class="fas fa-route"></i> Distance: ${place.distanceKm} km from you</p>
                            <p><i class="fas fa-clock"></i> Estimated travel time: ${place.travelTime}</p>
                        </div>
                    ` : ''}
                    <div class="modal-actions">
                        <button class="btn btn-primary" onclick="openDirections(${place.coordinates.lat}, ${place.coordinates.lng}, '${name}')">
                            <i class="fas fa-directions"></i>
                            Get Directions
                        </button>
                        <button class="btn btn-secondary" onclick="openGoogleMaps(${place.coordinates.lat}, ${place.coordinates.lng})">
                            <i class="fab fa-google"></i>
                            View on Google Maps
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// Close place details modal
function closePlaceModal() {
    const modal = document.querySelector('.place-modal-overlay');
    if (modal) {
        modal.remove();
    }
}

// Open Google Maps
function openGoogleMaps(lat, lng) {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(url, '_blank');
}

// Show loading state
function showLoadingState() {
    const container = document.getElementById('nearby-places-container');
    if (container) {
        container.innerHTML = `
            <div class="loading-state">
                <div class="spinner"></div>
                <p>Getting your location...</p>
            </div>
        `;
    }
}

// Show error state
function showError(message) {
    const container = document.getElementById('nearby-places-container');
    if (container) {
        container.innerHTML = `
            <div class="error-state">
                <div class="error-icon">⚠️</div>
                <h3>Location Error</h3>
                <p>${message}</p>
                <button class="btn btn-primary" onclick="requestLocationPermission()">
                    Try Again
                </button>
            </div>
        `;
    }
}

// Export functions for global access
window.initializeNearbyPlaces = initializeNearbyPlaces;
window.requestLocationPermission = requestLocationPermission;
window.openDirections = openDirections;
window.showPlaceDetails = showPlaceDetails;
window.closePlaceModal = closePlaceModal;
window.openGoogleMaps = openGoogleMaps;

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeNearbyPlaces);
} else {
    initializeNearbyPlaces();
}
