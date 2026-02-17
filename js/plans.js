/* ═══════════════════════════════════════════════════════════════════
   TRAVEL PLANS - 27 Governorates of Egypt
   Interactive Trip Planning System
   ═══════════════════════════════════════════════════════════════════ */

'use strict';

// Governorates Data with full details
const GOVERNORATES_DATA = {
    cairo: {
        icon: '🏛️',
        category: 'ancient',
        region: 'greater_cairo',
        estimatedDays: '3-5',
        priceCategory: 'A'
    },
    giza: {
        icon: '🔺',
        category: 'ancient',
        region: 'greater_cairo',
        estimatedDays: '2-3',
        priceCategory: 'A'
    },
    alexandria: {
        icon: '🌊',
        category: 'beach',
        region: 'mediterranean',
        estimatedDays: '2-3',
        priceCategory: 'A'
    },
    luxor: {
        icon: '⛩️',
        category: 'ancient',
        region: 'upper_egypt',
        estimatedDays: '3-4',
        priceCategory: 'A'
    },
    aswan: {
        icon: '🏝️',
        category: 'ancient',
        region: 'upper_egypt',
        estimatedDays: '2-3',
        priceCategory: 'A'
    },
    red_sea: {
        icon: '🐠',
        category: 'beach',
        region: 'red_sea',
        estimatedDays: '3-7',
        priceCategory: 'A'
    },
    south_sinai: {
        icon: '⛰️',
        category: 'nature',
        region: 'sinai',
        estimatedDays: '3-5',
        priceCategory: 'A'
    },
    port_said: {
        icon: '⚓',
        category: 'modern',
        region: 'canal',
        estimatedDays: '1-2',
        priceCategory: 'B'
    },
    ismailia: {
        icon: '🌳',
        category: 'modern',
        region: 'canal',
        estimatedDays: '1-2',
        priceCategory: 'B'
    },
    suez: {
        icon: '🚢',
        category: 'modern',
        region: 'canal',
        estimatedDays: '1-2',
        priceCategory: 'B'
    },
    damietta: {
        icon: '🏖️',
        category: 'beach',
        region: 'delta',
        estimatedDays: '2-3',
        priceCategory: 'B'
    },
    matrouh: {
        icon: '🏝️',
        category: 'beach',
        region: 'mediterranean',
        estimatedDays: '3-5',
        priceCategory: 'B'
    },
    fayoum: {
        icon: '🌄',
        category: 'nature',
        region: 'middle_egypt',
        estimatedDays: '2-3',
        priceCategory: 'B'
    },
    north_sinai: {
        icon: '🏜️',
        category: 'nature',
        region: 'sinai',
        estimatedDays: '2-3',
        priceCategory: 'B'
    },
    beheira: {
        icon: '🌾',
        category: 'cultural',
        region: 'delta',
        estimatedDays: '1-2',
        priceCategory: 'C'
    },
    kafr_el_sheikh: {
        icon: '🌿',
        category: 'cultural',
        region: 'delta',
        estimatedDays: '1-2',
        priceCategory: 'C'
    },
    dakahlia: {
        icon: '🏘️',
        category: 'cultural',
        region: 'delta',
        estimatedDays: '1-2',
        priceCategory: 'C'
    },
    gharbia: {
        icon: '🧵',
        category: 'cultural',
        region: 'delta',
        estimatedDays: '1-2',
        priceCategory: 'C'
    },
    sharqia: {
        icon: '🌾',
        category: 'cultural',
        region: 'delta',
        estimatedDays: '1-2',
        priceCategory: 'C'
    },
    monufia: {
        icon: '🌱',
        category: 'cultural',
        region: 'delta',
        estimatedDays: '1-2',
        priceCategory: 'C'
    },
    qalyubia: {
        icon: '🏞️',
        category: 'cultural',
        region: 'delta',
        estimatedDays: '1-2',
        priceCategory: 'C'
    },
    beni_suef: {
        icon: '🏔️',
        category: 'ancient',
        region: 'middle_egypt',
        estimatedDays: '1-2',
        priceCategory: 'C'
    },
    minya: {
        icon: '⛪',
        category: 'ancient',
        region: 'middle_egypt',
        estimatedDays: '2-3',
        priceCategory: 'C'
    },
    assiut: {
        icon: '🏛️',
        category: 'cultural',
        region: 'upper_egypt',
        estimatedDays: '1-2',
        priceCategory: 'C'
    },
    sohag: {
        icon: '🕌',
        category: 'ancient',
        region: 'upper_egypt',
        estimatedDays: '2-3',
        priceCategory: 'C'
    },
    qena: {
        icon: '🏺',
        category: 'ancient',
        region: 'upper_egypt',
        estimatedDays: '1-2',
        priceCategory: 'C'
    },
    new_valley: {
        icon: '🏜️',
        category: 'nature',
        region: 'desert',
        estimatedDays: '3-5',
        priceCategory: 'C'
    }
};

// Initialize Plans Section
function initializePlans() {
    console.log('🗺️ Initializing Travel Plans Section...');
    
    const plansContainer = document.getElementById('plans-cards-container');
    if (!plansContainer) {
        console.error('Plans container not found');
        return;
    }
    
    renderGovernorateCards();
    setupFilters();
    setupModal();
}

// Render Governorate Cards
function renderGovernorateCards(filter = 'all') {
    const container = document.getElementById('plans-cards-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    const currentLang = getCurrentLanguage();
    
    Object.keys(GOVERNORATES_DATA).forEach(key => {
        const gov = GOVERNORATES_DATA[key];
        const govTranslation = translations[currentLang].governorates[key];
        
        if (filter !== 'all' && gov.category !== filter) {
            return;
        }
        
        const card = document.createElement('div');
        card.className = 'governorate-card';
        card.setAttribute('data-governorate', key);
        card.setAttribute('data-category', gov.category);
        
        card.innerHTML = `
            <div class="governorate-card-header">
                <div class="governorate-card-icon">${gov.icon}</div>
                <h3 class="governorate-card-title">${govTranslation.name}</h3>
            </div>
            <p class="governorate-card-desc">${govTranslation.desc}</p>
            <div class="governorate-card-tags">
                <span class="governorate-card-tag">📍 ${govTranslation.highlights.split(',')[0]}</span>
                <span class="governorate-card-tag">⏱️ ${gov.estimatedDays} ${translations[currentLang].plans.days}</span>
            </div>
            <div class="governorate-card-footer">
                <span class="governorate-card-price">${getPriceRange(gov.priceCategory)}</span>
                <button class="governorate-card-btn" onclick="showPlanDetails('${key}')">
                    ${translations[currentLang].plans.viewPlan}
                </button>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Setup Filter Buttons
function setupFilters() {
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
        
        btn.addEventListener('click', () => {
            document.querySelectorAll('.plan-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderGovernorateCards(category);
        });
        
        filtersContainer.appendChild(btn);
    });
}

// Setup Modal
function setupModal() {
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
}

// Show Plan Details in Modal
function showPlanDetails(governorateKey) {
    const modal = document.getElementById('plan-modal');
    const modalBody = document.getElementById('plan-modal-body');
    
    if (!modal || !modalBody) return;
    
    const currentLang = getCurrentLanguage();
    const gov = GOVERNORATES_DATA[governorateKey];
    const govTrans = translations[currentLang].governorates[governorateKey];
    const plansTrans = translations[currentLang].plans;
    
    modal.querySelector('.plan-modal-title').textContent = govTrans.name;
    
    modalBody.innerHTML = `
        <div class="plan-detail-section">
            <h3>${govTrans.icon} ${plansTrans.planDetails}</h3>
            <p class="plan-detail-desc">${govTrans.desc}</p>
        </div>
        
        <div class="plan-detail-section">
            <h4>🎯 ${plansTrans.mustVisit}</h4>
            <p>${govTrans.highlights}</p>
        </div>
        
        <div class="plan-detail-section">
            <h4>🍽️ ${plansTrans.localFood}</h4>
            <p>${govTrans.food}</p>
        </div>
        
        <div class="plan-detail-section">
            <h4>📅 ${plansTrans.bestTime}</h4>
            <p>${govTrans.bestTime}</p>
        </div>
        
        <div class="plan-detail-section">
            <h4>⏱️ ${plansTrans.tripDuration}</h4>
            <p>${gov.estimatedDays} ${plansTrans.days}</p>
        </div>
        
        <div class="plan-detail-section">
            <h4>💰 ${plansTrans.estimatedCost}</h4>
            <p>${getPriceRange(gov.priceCategory)}</p>
        </div>
        
        <div class="plan-detail-actions">
            <button class="plan-action-btn primary" onclick="goToCalculator('${governorateKey}')">
                📊 ${translations[currentLang].calculator.title}
            </button>
            <button class="plan-action-btn" onclick="sharePlan('${governorateKey}')">
                📤 ${plansTrans.sharePlan}
            </button>
        </div>
    `;
    
    modal.classList.add('active');
}

// Close Plan Modal
function closePlanModal() {
    const modal = document.getElementById('plan-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Get Price Range based on Category
function getPriceRange(category) {
    const currentLang = getCurrentLanguage();
    const ranges = {
        'A': { ar: '2000-5000 جنيه/يوم', en: 'EGP 2000-5000/day', fr: '2000-5000 EGP/jour' },
        'B': { ar: '1000-2000 جنيه/يوم', en: 'EGP 1000-2000/day', fr: '1000-2000 EGP/jour' },
        'C': { ar: '500-1000 جنيه/يوم', en: 'EGP 500-1000/day', fr: '500-1000 EGP/jour' }
    };
    return ranges[category][currentLang] || ranges[category]['en'];
}

// Navigate to Calculator with selected governorate
function goToCalculator(governorateKey) {
    closePlanModal();
    
    // Navigate to calculator section
    const calculatorSection = document.getElementById('calculator');
    if (calculatorSection) {
        calculatorSection.scrollIntoView({ behavior: 'smooth' });
        
        // Pre-select governorate after a short delay
        setTimeout(() => {
            const select = document.getElementById('governorateSelect');
            if (select) {
                select.value = governorateKey;
                select.dispatchEvent(new Event('change'));
            }
        }, 500);
    }
}

// Share Plan functionality
function sharePlan(governorateKey) {
    const currentLang = getCurrentLanguage();
    const govTrans = translations[currentLang].governorates[governorateKey];
    
    const shareText = `${govTrans.name} - ${govTrans.desc}\n\nDiscover Egypt Travel Plans`;
    const shareUrl = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: govTrans.name,
            text: shareText,
            url: shareUrl
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
            .then(() => alert('Link copied to clipboard!'))
            .catch(err => console.error('Failed to copy:', err));
    }
}

// Get current language
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'en';
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePlans);
} else {
    initializePlans();
}

// Export functions for global access
window.showPlanDetails = showPlanDetails;
window.closePlanModal = closePlanModal;
window.goToCalculator = goToCalculator;
window.sharePlan = sharePlan;
