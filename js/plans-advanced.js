/* ═══════════════════════════════════════════════════════════════════
   ADVANCED TRAVEL PLANS - Premium Features
   نظام الخطط المتطور مع ميزات احترافية
   ═══════════════════════════════════════════════════════════════════ */

'use strict';

// ══════════════════════════════════════════════════════════════════
// Enhanced Governorates Data with Rich Information
// ══════════════════════════════════════════════════════════════════

const ADVANCED_GOVERNORATES = {
    cairo: {
        icon: '🏛️',
        category: 'ancient',
        region: 'greater_cairo',
        estimatedDays: '3-5',
        priceCategory: 'A',
        rating: 4.8,
        visitors: '15M+',
        bestMonths: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
        difficulty: 'Easy',
        familyFriendly: true,
        highlights: [
            { icon: '🔺', name: 'Pyramids of Giza' },
            { icon: '🏛️', name: 'Egyptian Museum' },
            { icon: '🕌', name: 'Islamic Cairo' },
            { icon: '🏪', name: 'Khan El Khalili' }
        ],
        activities: ['Historical Tours', 'Museum Visits', 'Shopping', 'Nile Cruise'],
        transport: ['Metro', 'Uber', 'Taxis', 'Private Tours'],
        accommodation: ['5-star Hotels', '4-star Hotels', 'Budget Hotels', 'Airbnb'],
        avgTemp: { summer: '35°C', winter: '20°C' }
    },
    giza: {
        icon: '🔺',
        category: 'ancient',
        region: 'greater_cairo',
        estimatedDays: '2-3',
        priceCategory: 'A',
        rating: 4.9,
        visitors: '10M+',
        bestMonths: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
        difficulty: 'Easy',
        familyFriendly: true,
        highlights: [
            { icon: '🔺', name: 'Great Pyramid' },
            { icon: '🦁', name: 'Sphinx' },
            { icon: '🏛️', name: 'Solar Boat Museum' },
            { icon: '⛰️', name: 'Saqqara' }
        ],
        activities: ['Pyramid Tours', 'Camel Rides', 'Sound & Light Show', 'Photography'],
        transport: ['Private Tours', 'Uber', 'Taxis'],
        accommodation: ['Pyramid View Hotels', 'Boutique Hotels', 'Guesthouses'],
        avgTemp: { summer: '36°C', winter: '20°C' }
    },
    alexandria: {
        icon: '🌊',
        category: 'beach',
        region: 'mediterranean',
        estimatedDays: '2-3',
        priceCategory: 'A',
        rating: 4.6,
        visitors: '8M+',
        bestMonths: ['Mar', 'Apr', 'May', 'Jun', 'Sep', 'Oct', 'Nov'],
        difficulty: 'Easy',
        familyFriendly: true,
        highlights: [
            { icon: '🏰', name: 'Qaitbay Citadel' },
            { icon: '📚', name: 'Bibliotheca Alexandrina' },
            { icon: '🏖️', name: 'Corniche' },
            { icon: '🏛️', name: 'Montaza Palace' }
        ],
        activities: ['Beach Activities', 'Historical Tours', 'Seafood Dining', 'Walking Tours'],
        transport: ['Train', 'Bus', 'Tram', 'Taxis'],
        accommodation: ['Seaside Resorts', 'City Hotels', 'Beach Apartments'],
        avgTemp: { summer: '30°C', winter: '18°C' }
    },
    luxor: {
        icon: '⛩️',
        category: 'ancient',
        region: 'upper_egypt',
        estimatedDays: '3-4',
        priceCategory: 'A',
        rating: 4.9,
        visitors: '7M+',
        bestMonths: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
        difficulty: 'Moderate',
        familyFriendly: true,
        highlights: [
            { icon: '⛰️', name: 'Valley of the Kings' },
            { icon: '🏛️', name: 'Karnak Temple' },
            { icon: '⛩️', name: 'Luxor Temple' },
            { icon: '👸', name: 'Hatshepsut Temple' }
        ],
        activities: ['Temple Tours', 'Hot Air Balloon', 'Nile Felucca', 'Archaeological Sites'],
        transport: ['Private Tours', 'Taxis', 'Calèche', 'Felucca'],
        accommodation: ['Nile View Hotels', 'Historic Hotels', 'Guesthouses'],
        avgTemp: { summer: '40°C', winter: '23°C' }
    },
    aswan: {
        icon: '🏝️',
        category: 'ancient',
        region: 'upper_egypt',
        estimatedDays: '2-3',
        priceCategory: 'A',
        rating: 4.7,
        visitors: '5M+',
        bestMonths: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
        difficulty: 'Easy',
        familyFriendly: true,
        highlights: [
            { icon: '🏛️', name: 'Abu Simbel' },
            { icon: '⛩️', name: 'Philae Temple' },
            { icon: '🏝️', name: 'Elephantine Island' },
            { icon: '🏘️', name: 'Nubian Villages' }
        ],
        activities: ['Temple Visits', 'Nile Cruise', 'Nubian Culture', 'Sunset Felucca'],
        transport: ['Felucca', 'Motor Boats', 'Taxis', 'Tours'],
        accommodation: ['Nile Cruises', 'Riverside Hotels', 'Nubian Guesthouses'],
        avgTemp: { summer: '42°C', winter: '24°C' }
    },
    red_sea: {
        icon: '🐠',
        category: 'beach',
        region: 'red_sea',
        estimatedDays: '3-7',
        priceCategory: 'A',
        rating: 4.8,
        visitors: '12M+',
        bestMonths: ['Sep', 'Oct', 'Nov', 'Mar', 'Apr', 'May'],
        difficulty: 'Easy',
        familyFriendly: true,
        highlights: [
            { icon: '🤿', name: 'Diving Spots' },
            { icon: '🏖️', name: 'Beach Resorts' },
            { icon: '🐠', name: 'Coral Reefs' },
            { icon: '🏜️', name: 'Desert Safari' }
        ],
        activities: ['Diving', 'Snorkeling', 'Beach Relaxation', 'Water Sports', 'Desert Safari'],
        transport: ['Resort Shuttles', 'Taxis', 'Tour Buses'],
        accommodation: ['All-Inclusive Resorts', 'Beach Hotels', 'Dive Centers'],
        avgTemp: { summer: '35°C', winter: '22°C' }
    },
    south_sinai: {
        icon: '⛰️',
        category: 'nature',
        region: 'sinai',
        estimatedDays: '3-5',
        priceCategory: 'A',
        rating: 4.7,
        visitors: '6M+',
        bestMonths: ['Sep', 'Oct', 'Nov', 'Mar', 'Apr', 'May'],
        difficulty: 'Moderate',
        familyFriendly: true,
        highlights: [
            { icon: '⛰️', name: 'Mount Sinai' },
            { icon: '⛪', name: 'St. Catherine Monastery' },
            { icon: '🏖️', name: 'Sharm El Sheikh' },
            { icon: '🤿', name: 'Dahab' }
        ],
        activities: ['Hiking', 'Diving', 'Beach', 'Spiritual Tourism', 'Desert Adventures'],
        transport: ['Tours', 'Taxis', 'Resort Shuttles'],
        accommodation: ['Beach Resorts', 'Budget Hostels', 'Bedouin Camps'],
        avgTemp: { summer: '34°C', winter: '20°C' }
    }
    // ... يمكن إضافة باقي المحافظات بنفس التفاصيل
};

// ══════════════════════════════════════════════════════════════════
// Initialize Advanced Plans
// ══════════════════════════════════════════════════════════════════

function initializeAdvancedPlans() {
    console.log('🚀 Initializing Advanced Plans System...');
    
    renderAdvancedCards();
    setupAdvancedFilters();
    setupAdvancedModal();
    animateOnScroll();
    
    // Listen for language changes
    document.addEventListener('languageChange', function(e) {
        console.log('🔄 Language changed, reloading plans cards...');
        renderAdvancedCards();
    });
    
    console.log('✅ Advanced Plans System Ready');
}

// ══════════════════════════════════════════════════════════════════
// Render Advanced Cards with Rich Information
// ══════════════════════════════════════════════════════════════════

function renderAdvancedCards(filter = 'all') {
    const container = document.getElementById('plans-cards-container');
    if (!container) return;
    
    // Show loading state
    container.innerHTML = `
        <div class="plans-loading">
            <div class="plans-loading-spinner"></div>
            <p class="plans-loading-text">Loading amazing destinations...</p>
        </div>
    `;
    
    // Simulate loading for smooth experience
    setTimeout(() => {
        container.innerHTML = '';
        
        const currentLang = getCurrentLanguage();
        let cardDelay = 0;
        
        Object.keys(ADVANCED_GOVERNORATES).forEach(key => {
            const gov = ADVANCED_GOVERNORATES[key];
            const govTranslation = translations[currentLang].governorates[key];
            
            if (filter !== 'all' && gov.category !== filter) {
                return;
            }
            
            const card = createAdvancedCard(key, gov, govTranslation, currentLang, cardDelay);
            container.appendChild(card);
            cardDelay += 50;
        });
    }, 300);
}

// ══════════════════════════════════════════════════════════════════
// Create Advanced Card Element
// ══════════════════════════════════════════════════════════════════

function createAdvancedCard(key, gov, translation, lang, delay) {
    const card = document.createElement('div');
    card.className = 'governorate-card';
    card.setAttribute('data-governorate', key);
    card.setAttribute('data-category', gov.category);
    card.style.animation = `fadeInUp 0.6s ease-out ${delay}ms both`;
    
    // Get difficulty and family-friendly labels
    const difficultyLabel = {
        en: { Easy: 'Easy', Moderate: 'Moderate', Hard: 'Hard' },
        ar: { Easy: 'سهل', Moderate: 'متوسط', Hard: 'صعب' },
        fr: { Easy: 'Facile', Moderate: 'Modéré', Hard: 'Difficile' }
    };
    
    const familyLabel = {
        en: gov.familyFriendly ? 'Family Friendly' : 'Adults Only',
        ar: gov.familyFriendly ? 'مناسب للعائلات' : 'للبالغين فقط',
        fr: gov.familyFriendly ? 'Pour familles' : 'Adultes seulement'
    };
    
    card.innerHTML = `
        <div class="governorate-card-image">
            <div class="governorate-card-icon-large">${gov.icon}</div>
        </div>
        
        <div class="governorate-card-content">
            <div class="governorate-card-header">
                <div class="governorate-card-icon">${gov.icon}</div>
                <h3 class="governorate-card-title">${translation.name}</h3>
            </div>
            
            <p class="governorate-card-desc">${translation.desc}</p>
            
            <div class="governorate-card-stats">
                <div class="card-stat">
                    <span class="card-stat-value">⭐ ${gov.rating}</span>
                    <span class="card-stat-label">Rating</span>
                </div>
                <div class="card-stat">
                    <span class="card-stat-value">${gov.visitors}</span>
                    <span class="card-stat-label">Visitors</span>
                </div>
                <div class="card-stat">
                    <span class="card-stat-value">${gov.estimatedDays}</span>
                    <span class="card-stat-label">Days</span>
                </div>
            </div>
            
            <div class="governorate-card-tags">
                <span class="governorate-card-tag">
                    📅 ${gov.bestMonths[0]}-${gov.bestMonths[gov.bestMonths.length - 1]}
                </span>
                <span class="governorate-card-tag">
                    ${gov.difficulty === 'Easy' ? '✅' : gov.difficulty === 'Moderate' ? '⚠️' : '🔴'}
                    ${difficultyLabel[lang][gov.difficulty]}
                </span>
                <span class="governorate-card-tag">
                    ${gov.familyFriendly ? '👨‍👩‍👧‍👦' : '👤'}
                    ${familyLabel[lang]}
                </span>
            </div>
            
            <div class="governorate-card-footer">
                <div class="governorate-card-price">
                    <span class="price-range">${getPriceRange(gov.priceCategory, lang)}</span>
                    <span class="price-label">${translations[lang].calculator.perDay}</span>
                </div>
                <button class="governorate-card-btn" onclick="showAdvancedPlanDetails('${key}')">
                    ${translations[lang].plans.viewPlan} →
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// ══════════════════════════════════════════════════════════════════
// Show Advanced Plan Details
// ══════════════════════════════════════════════════════════════════

function showAdvancedPlanDetails(governorateKey) {
    const modal = document.getElementById('plan-modal');
    const modalBody = document.getElementById('plan-modal-body');
    
    if (!modal || !modalBody) return;
    
    const currentLang = getCurrentLanguage();
    const gov = ADVANCED_GOVERNORATES[governorateKey] || GOVERNORATES_DATA[governorateKey];
    const govTrans = translations[currentLang].governorates[governorateKey];
    const plansTrans = translations[currentLang].plans;
    
    // Update modal title
    modal.querySelector('.plan-modal-title').innerHTML = `${gov.icon} ${govTrans.name}`;
    modal.querySelector('.plan-modal-subtitle').textContent = govTrans.desc;
    
    // Build advanced modal content
    modalBody.innerHTML = `
        <!-- Overview Section -->
        <div class="plan-detail-section">
            <h3>📊 ${plansTrans.planDetails || 'Overview'}</h3>
            <div class="plan-info-grid">
                <div class="plan-info-item">
                    <div class="plan-info-label">⭐ Rating</div>
                    <div class="plan-info-value">${gov.rating || 'N/A'}/5.0</div>
                </div>
                <div class="plan-info-item">
                    <div class="plan-info-label">👥 Annual Visitors</div>
                    <div class="plan-info-value">${gov.visitors || 'N/A'}</div>
                </div>
                <div class="plan-info-item">
                    <div class="plan-info-label">⏱️ Recommended Days</div>
                    <div class="plan-info-value">${gov.estimatedDays} ${plansTrans.days}</div>
                </div>
                <div class="plan-info-item">
                    <div class="plan-info-label">💰 Budget Level</div>
                    <div class="plan-info-value">${gov.priceCategory}</div>
                </div>
            </div>
        </div>
        
        <!-- Highlights Section -->
        <div class="plan-detail-section">
            <h3>🎯 ${plansTrans.mustVisit || 'Must Visit'}</h3>
            <p>${govTrans.highlights}</p>
            ${gov.highlights ? `
                <div class="highlights-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 20px;">
                    ${gov.highlights.map(h => `
                        <div style="padding: 15px; background: #f9f9f9; border-radius: 12px; border-left: 4px solid var(--gold-primary);">
                            <div style="font-size: 1.5rem; margin-bottom: 5px;">${h.icon}</div>
                            <div style="font-weight: 600; color: #333;">${h.name}</div>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
        </div>
        
        <!-- Activities Section -->
        ${gov.activities ? `
        <div class="plan-detail-section">
            <h4>🎭 ${translations[currentLang].plans.recommendations || 'Activities'}</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 15px;">
                ${gov.activities.map(activity => `
                    <span style="background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(244, 228, 193, 0.1)); 
                                 padding: 8px 16px; border-radius: 20px; font-weight: 600; color: var(--gold-dark);">
                        ${activity}
                    </span>
                `).join('')}
            </div>
        </div>
        ` : ''}
        
        <!-- Best Time & Weather -->
        <div class="plan-detail-section">
            <h4>📅 ${plansTrans.bestTime || 'Best Time to Visit'}</h4>
            <p>${govTrans.bestTime}</p>
            ${gov.avgTemp ? `
                <div style="display: flex; gap: 20px; margin-top: 15px;">
                    <div style="flex: 1; padding: 15px; background: #fff3e0; border-radius: 12px;">
                        <div style="font-size: 0.85rem; color: #f57c00; font-weight: 600; margin-bottom: 5px;">☀️ SUMMER</div>
                        <div style="font-size: 1.3rem; font-weight: 700; color: #f57c00;">${gov.avgTemp.summer}</div>
                    </div>
                    <div style="flex: 1; padding: 15px; background: #e3f2fd; border-radius: 12px;">
                        <div style="font-size: 0.85rem; color: #1976d2; font-weight: 600; margin-bottom: 5px;">❄️ WINTER</div>
                        <div style="font-size: 1.3rem; font-weight: 700; color: #1976d2;">${gov.avgTemp.winter}</div>
                    </div>
                </div>
            ` : ''}
        </div>
        
        <!-- Food Section -->
        <div class="plan-detail-section">
            <h4>🍽️ ${plansTrans.localFood || 'Local Cuisine'}</h4>
            <p>${govTrans.food}</p>
        </div>
        
        <!-- Transport & Accommodation -->
        <div class="plan-detail-section">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                ${gov.transport ? `
                <div>
                    <h4>🚗 ${plansTrans.transportation || 'Transportation'}</h4>
                    <ul style="list-style: none; padding: 0; margin-top: 10px;">
                        ${gov.transport.map(t => `<li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">✓ ${t}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
                ${gov.accommodation ? `
                <div>
                    <h4>🏨 ${plansTrans.accommodation || 'Accommodation'}</h4>
                    <ul style="list-style: none; padding: 0; margin-top: 10px;">
                        ${gov.accommodation.map(a => `<li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">✓ ${a}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
            </div>
        </div>
        
        <!-- Budget Estimate -->
        <div class="plan-detail-section">
            <h4>💰 ${plansTrans.estimatedCost || 'Estimated Cost'}</h4>
            <p>${getPriceRange(gov.priceCategory, currentLang)} ${translations[currentLang].calculator.perDay}</p>
            <p style="font-size: 0.9rem; color: #888; margin-top: 10px;">
                ${translations[currentLang].calculator.disclaimer}
            </p>
        </div>
        
        <!-- Actions -->
        <div class="plan-detail-actions">
            <button class="plan-action-btn primary" onclick="goToCalculator('${governorateKey}')">
                📊 ${translations[currentLang].calculator.title}
            </button>
            <button class="plan-action-btn secondary" onclick="sharePlan('${governorateKey}')">
                📤 ${plansTrans.sharePlan || 'Share Plan'}
            </button>
            <button class="plan-action-btn secondary" onclick="printPlan('${governorateKey}')">
                🖨️ ${translations[currentLang].common.print || 'Print'}
            </button>
        </div>
    `;
    
    modal.classList.add('active');
}

// ══════════════════════════════════════════════════════════════════
// Setup Advanced Filters
// ══════════════════════════════════════════════════════════════════

function setupAdvancedFilters() {
    const filtersContainer = document.querySelector('.plans-filters');
    if (!filtersContainer) return;
    
    const categories = ['all', 'ancient', 'beach', 'nature', 'cultural', 'modern'];
    const currentLang = getCurrentLanguage();
    
    filtersContainer.innerHTML = '';
    
    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = `plan-filter-btn ${category === 'all' ? 'active' : ''}`;
        btn.setAttribute('data-filter', category);
        btn.textContent = translations[currentLang].explore[category] || category;
        
        btn.addEventListener('click', function() {
            document.querySelectorAll('.plan-filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderAdvancedCards(category);
        });
        
        filtersContainer.appendChild(btn);
    });
}

// ══════════════════════════════════════════════════════════════════
// Animate on Scroll
// ══════════════════════════════════════════════════════════════════

function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.governorate-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// ══════════════════════════════════════════════════════════════════
// Print Plan Function
// ══════════════════════════════════════════════════════════════════

function printPlan(governorateKey) {
    window.print();
}

// ══════════════════════════════════════════════════════════════════
// Setup Modal
// ══════════════════════════════════════════════════════════════════

function setupAdvancedModal() {
    const modal = document.getElementById('plan-modal');
    if (!modal) return;
    
    const closeBtn = modal.querySelector('.plan-modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closePlanModal);
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closePlanModal();
        }
    });
    
    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closePlanModal();
        }
    });
}

// ══════════════════════════════════════════════════════════════════
// Helper Functions
// ══════════════════════════════════════════════════════════════════

function closePlanModal() {
    const modal = document.getElementById('plan-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function getPriceRange(category, lang = 'en') {
    const ranges = {
        'A': { 
            ar: '400-800 جنيه', 
            en: '400-800 EGP', 
            fr: '400-800 EGP' 
        },
        'B': { 
            ar: '250-450 جنيه', 
            en: '250-450 EGP', 
            fr: '250-450 EGP' 
        },
        'C': { 
            ar: '150-300 جنيه', 
            en: '150-300 EGP', 
            fr: '150-300 EGP' 
        }
    };
    return ranges[category][lang] || ranges[category]['en'];
}

function getCurrentLanguage() {
    return window.currentLanguage || localStorage.getItem('language') || 'en';
}

function goToCalculator(governorateKey) {
    closePlanModal();
    const calculatorSection = document.getElementById('calculator');
    if (calculatorSection) {
        calculatorSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            const select = document.getElementById('governorateSelect');
            if (select) {
                select.value = governorateKey;
                select.dispatchEvent(new Event('change'));
            }
        }, 500);
    }
}

function sharePlan(governorateKey) {
    const currentLang = getCurrentLanguage();
    const govTrans = translations[currentLang].governorates[governorateKey];
    
    const shareText = `🇪🇬 ${govTrans.name}\n\n${govTrans.desc}\n\nDiscover Egypt - Travel Plans`;
    const shareUrl = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: govTrans.name,
            text: shareText,
            url: shareUrl
        }).catch(err => console.log('Error sharing:', err));
    } else {
        navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
            .then(() => alert('✅ Link copied to clipboard!'))
            .catch(err => console.error('Failed to copy:', err));
    }
}

// ══════════════════════════════════════════════════════════════════
// Initialize on Load
// ══════════════════════════════════════════════════════════════════

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAdvancedPlans);
} else {
    initializeAdvancedPlans();
}

// Export functions for global access
window.showAdvancedPlanDetails = showAdvancedPlanDetails;
window.closePlanModal = closePlanModal;
window.goToCalculator = goToCalculator;
window.sharePlan = sharePlan;
window.printPlan = printPlan;
