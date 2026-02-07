/**
 * Plans Engine - Simple Question Flow
 */

class PlansEngine {
  constructor() {
    this.answers = {};
    this.currentStep = 1;
    this.totalSteps = 4;
    this.places = null;
  }

  async init() {
    // Use places from globally loaded data
    if (typeof placesEnhanced !== 'undefined' && placesEnhanced.places) {
      this.places = placesEnhanced.places;
    } else {
      console.error('Places data not loaded');
      this.places = [];
    }
    
    this.setupEventListeners();
  }

  setupEventListeners() {
    const wizard = document.getElementById('plans-wizard');
    if (!wizard) return;

    wizard.addEventListener('click', (e) => {
      if (e.target.classList.contains('option-btn')) {
        this.handleAnswer(e.target);
      }
    });
  }

  handleAnswer(btn) {
    const step = parseInt(btn.closest('.question-step').dataset.step);
    const value = btn.dataset.value;

    // Save answer
    const keys = ['days', 'budget', 'type', 'family'];
    this.answers[keys[step - 1]] = value;

    // Highlight selected
    btn.closest('.options-grid').querySelectorAll('.option-btn').forEach(b => {
      b.classList.remove('selected');
    });
    btn.classList.add('selected');

    // Move to next step
    setTimeout(() => {
      if (step < this.totalSteps) {
        this.goToStep(step + 1);
      } else {
        this.generatePlan();
      }
    }, 300);
  }

  goToStep(stepNumber) {
    const steps = document.querySelectorAll('.question-step');
    steps.forEach(step => {
      step.classList.remove('active');
      if (parseInt(step.dataset.step) === stepNumber) {
        step.classList.add('active');
      }
    });
    this.currentStep = stepNumber;
  }

  generatePlan() {
    // Hide wizard
    document.getElementById('plans-wizard').style.display = 'none';

    // Select best place
    const selectedPlace = this.selectPlace();
    const reason = this.generateReason(selectedPlace);
    const itinerary = this.generateItinerary(selectedPlace);

    // Show result
    this.displayResult(selectedPlace, reason, itinerary);
  }

  selectPlace() {
    let filtered = [...this.places];

    // Filter by type
    if (this.answers.type) {
      filtered = filtered.filter(p => p.category === this.answers.type);
    }

    // Filter by family (prefer high rating)
    if (this.answers.family === 'yes') {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    // Filter by popularity based on budget
    if (this.answers.budget === 'low') {
      filtered = filtered.filter(p => p.popularity !== 'high');
    }

    return filtered[0] || this.places[0];
  }

  generateReason(place) {
    const reasons = [];
    
    if (this.answers.type) {
      const types = {
        ancient: 'rich in history',
        beach: 'perfect for relaxation',
        nature: 'beautiful natural scenery',
        modern: 'vibrant city life'
      };
      reasons.push(types[this.answers.type] || 'great destination');
    }

    if (this.answers.budget === 'low') {
      reasons.push('budget-friendly');
    } else if (this.answers.budget === 'high') {
      reasons.push('premium experience');
    }

    if (this.answers.family === 'yes') {
      reasons.push('family-friendly');
    }

    return reasons.join(', ');
  }

  generateItinerary(place) {
    const days = parseInt(this.answers.days);
    const itinerary = [];

    for (let i = 1; i <= days; i++) {
      itinerary.push({
        day: i,
        title: `Day ${i} at ${place.name}`,
        activities: this.getDayActivities(place, i)
      });
    }

    return itinerary;
  }

  getDayActivities(place, dayNum) {
    const baseActivities = {
      ancient: ['Visit the main site', 'Explore the museum', 'Photography', 'Learn the history'],
      beach: ['Swimming', 'Snorkeling', 'Beach relaxation', 'Water sports'],
      nature: ['Hiking', 'Wildlife watching', 'Photography', 'Picnic'],
      modern: ['City tour', 'Shopping', 'Local cuisine', 'Entertainment']
    };

    const activities = baseActivities[place.category] || ['Explore the area', 'Take photos', 'Relax'];
    
    // Rotate activities based on day
    const startIdx = (dayNum - 1) % activities.length;
    return activities.slice(startIdx, startIdx + 2).concat(activities.slice(0, Math.max(0, startIdx + 2 - activities.length)));
  }

  displayResult(place, reason, itinerary) {
    const result = document.getElementById('plans-result');
    const lang = document.documentElement.lang || 'en';
    
    const placeName = lang === 'ar' ? place.nameAr : lang === 'fr' ? place.nameFr : place.name;
    const placeDesc = lang === 'ar' ? place.descriptionAr : lang === 'fr' ? place.descriptionFr : place.description;

    result.innerHTML = `
      <div class="result-card">
        <h2 data-translate="plans.result.title">Your Perfect Destination</h2>
        
        <div class="place-result">
          <img src="${place.image}" alt="${placeName}">
          <h3>${placeName}</h3>
          <p>${placeDesc}</p>
          <div class="place-meta">
            <span>📍 ${place.governorate}</span>
            <span>⭐ ${place.rating || 'N/A'}</span>
          </div>
        </div>

        <div class="reason-box">
          <h4 data-translate="plans.result.reason">Why we chose this</h4>
          <p>${reason}</p>
        </div>

        <div class="itinerary-box">
          <h4 data-translate="plans.result.itinerary">Trip Plan</h4>
          ${itinerary.map(day => `
            <div class="day-plan">
              <h5 data-translate="plans.result.day">Day</h5> ${day.day}
              <ul>
                ${day.activities.map(act => `<li>${act}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>

        <button class="restart-btn" onclick="plansEngine.restart()">
          🔄 Start Over
        </button>
      </div>
    `;

    result.style.display = 'block';
    result.scrollIntoView({ behavior: 'smooth' });
  }

  restart() {
    this.answers = {};
    this.currentStep = 1;
    
    // Reset wizard
    document.getElementById('plans-wizard').style.display = 'block';
    document.getElementById('plans-result').style.display = 'none';
    
    // Clear selections
    document.querySelectorAll('.option-btn').forEach(btn => {
      btn.classList.remove('selected');
    });
    
    // Go to step 1
    this.goToStep(1);
  }
}

// Initialize
const plansEngine = new PlansEngine();
document.addEventListener('DOMContentLoaded', () => {
  plansEngine.init();
});
