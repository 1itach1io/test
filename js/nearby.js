// nearby.js - Nearby Places with Geolocation

import { db } from '../firebase/firebase.js';
import { collection, getDocs } from "firebase/firestore";

// DOM Elements
const nearbyList = document.getElementById('nearby-list');
const nearbyMessage = document.getElementById('nearby-message');

// Haversine Formula for Distance
function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Fetch Places
async function getPlaces() {
    const placesCol = collection(db, 'places');
    const snapshot = await getDocs(placesCol);
    return snapshot.docs.map(doc => doc.data());
}

// Display Nearby
function displayNearby(places) {
    nearbyList.innerHTML = '';
    places.forEach(place => {
        const card = document.createElement('div');
        card.className = 'place-card';
        card.innerHTML = `
      <h3>${place.name}</h3>
      <p>Governorate: ${place.governorate}</p>
      <p>Type: ${place.type}</p>
    `;
        nearbyList.appendChild(card);
    });
}

// Get Location
navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;
    const places = await getPlaces();
    const nearby = places.filter(place => haversine(latitude, longitude, place.lat, place.lng) < 50);
    if (nearby.length > 0) {
        displayNearby(nearby);
    } else {
        nearbyMessage.style.display = 'block';
        // Default to Cairo
        const cairoLat = 30.0444;
        const cairoLng = 31.2357;
        const defaults = places.filter(place => haversine(cairoLat, cairoLng, place.lat, place.lng) < 50);
        displayNearby(defaults);
    }
}, (error) => {
    nearbyMessage.style.display = 'block';
    // Default to Cairo on deny
    getPlaces().then(places => {
        const cairoLat = 30.0444;
        const cairoLng = 31.2357;
        const defaults = places.filter(place => haversine(cairoLat, cairoLng, place.lat, place.lng) < 50);
        displayNearby(defaults);
    });
});