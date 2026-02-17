// SAVED PLANS MANAGER WITH FIREBASE
// Manages saving, loading, and displaying travel plans

// Initialize Firebase reference
let savedPlansDB = null;

// Get current user from auth system
function getCurrentUser() {
    if (window.firebase && firebase.auth) {
        return firebase.auth().currentUser;
    }
    return null;
}

// Initialize when auth is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Saved Plans Manager...');
    
    // Wait for Firebase to be ready
    setTimeout(() => {
        if (window.firebase && firebase.auth) {
            firebase.auth().onAuthStateChanged((user) => {
                console.log('User state changed:', user ? 'Logged in' : 'Not logged in');
                if (user && firebase.firestore) {
                    savedPlansDB = firebase.firestore();
                    loadSavedPlansCount();
                }
            });
        } else {
            console.log('Firebase not available');
        }
    }, 1000);
});

// Open Saved Plans Modal - WORKS WITHOUT LOGIN
function openSavedPlansModal() {
    console.log('Opening saved plans modal...');
    const modal = document.getElementById('saved-plans-modal');
    
    if (!modal) {
        console.error('Modal element not found');
        return;
    }
    
    // Show modal even if not logged in
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Load saved plans
    loadSavedPlans();
    
    // Animation
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

// Close Saved Plans Modal
function closeSavedPlansModal() {
    const modal = document.getElementById('saved-plans-modal');
    
    if (!modal) return;
    
    modal.classList.remove('active');
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
}

// Load Saved Plans
async function loadSavedPlans() {
    const container = document.getElementById('saved-plans-list');
    
    if (!container) return;
    
    // Check if user is logged in
    const currentUser = getCurrentUser();
    if (!currentUser) {
        container.innerHTML = `
            <div class="no-saved-plans">
                <i class="fas fa-user-lock"></i>
                <h3>${getCurrentLangText({
                    ar: 'يرجى تسجيل الدخول',
                    en: 'Please Login',
                    fr: 'Veuillez vous connecter'
                })}</h3>
                <p>${getCurrentLangText({
                    ar: 'سجل الدخول لعرض وحفظ خططك السياحية',
                    en: 'Login to view and save your travel plans',
                    fr: 'Connectez-vous pour voir et sauvegarder vos plans'
                })}</p>
                <button onclick="window.location.href=''" class="btn-primary">
                    <i class="fas fa-sign-in-alt"></i> ${getCurrentLangText({
                        ar: 'تسجيل الدخول',
                        en: 'Login',
                        fr: 'Se connecter'
                    })}
                </button>
            </div>
        `;
        return;
    }
    
    if (!savedPlansDB) {
        container.innerHTML = `
            <div class="saved-plans-error">
                <i class="fas fa-exclamation-circle"></i>
                <p>${getCurrentLangText({
                    ar: 'قاعدة البيانات غير جاهزة',
                    en: 'Database not ready',
                    fr: 'Base de données non prête'
                })}</p>
            </div>
        `;
        return;
    }
    
    // Show loading
    container.innerHTML = `
        <div class="saved-plans-loading">
            <i class="fas fa-spinner fa-spin"></i>
            <p>${getCurrentLangText({
                ar: 'جاري التحميل...',
                en: 'Loading...',
                fr: 'Chargement...'
            })}</p>
        </div>
    `;
    
    try {
        const plansRef = savedPlansDB.collection('users').doc(currentUser.uid).collection('savedPlans');
        const snapshot = await plansRef.orderBy('createdAt', 'desc').get();
        
        if (snapshot.empty) {
            container.innerHTML = `
                <div class="no-saved-plans">
                    <i class="fas fa-folder-open"></i>
                    <h3>${getCurrentLangText({
                        ar: 'لا توجد خطط محفوظة',
                        en: 'No Saved Plans',
                        fr: 'Aucun plan sauvegardé'
                    })}</h3>
                    <p>${getCurrentLangText({
                        ar: 'ابدأ بإنشاء خطة رحلتك الأولى!',
                        en: 'Start by creating your first travel plan!',
                        fr: 'Commencez par créer votre premier plan!'
                    })}</p>
                    <button onclick="closeSavedPlansModal(); openTravelPlannerModal();" class="btn-primary">
                        <i class="fas fa-plus"></i> ${getCurrentLangText({
                            ar: 'إنشاء خطة جديدة',
                            en: 'Create New Plan',
                            fr: 'Créer un nouveau plan'
                        })}
                    </button>
                </div>
            `;
            return;
        }
        
        let plansHTML = '<div class="saved-plans-grid">';
        
        snapshot.forEach((doc) => {
            const plan = doc.data();
            plansHTML += createPlanCard(doc.id, plan);
        });
        
        plansHTML += '</div>';
        container.innerHTML = plansHTML;
        
    } catch (error) {
        console.error('Error loading saved plans:', error);
        container.innerHTML = `
            <div class="saved-plans-error">
                <i class="fas fa-exclamation-circle"></i>
                <p>${getCurrentLangText({
                    ar: 'حدث خطأ في تحميل الخطط',
                    en: 'Error loading plans',
                    fr: 'Erreur de chargement'
                })}</p>
                <button onclick="loadSavedPlans()" class="btn-secondary">
                    <i class="fas fa-redo"></i> ${getCurrentLangText({
                        ar: 'إعادة المحاولة',
                        en: 'Retry',
                        fr: 'Réessayer'
                    })}
                </button>
            </div>
        `;
    }
}

// Create Plan Card HTML with Real Shareable Link
function createPlanCard(planId, plan) {
    const date = plan.createdAt ? new Date(plan.createdAt.toDate()).toLocaleDateString() : '';
    const governorates = plan.governorates ? plan.governorates.join(', ') : '';
    const totalCost = plan.totalCost || 0;
    
    // Generate real shareable link
    const currentUser = getCurrentUser();
    const planUrl = `${window.location.origin}${window.location.pathname}?plan=${planId}&user=${currentUser.uid}`;
    
    return `
        <div class="saved-plan-card" data-plan-id="${planId}">
            <div class="plan-card-header">
                <h3 class="plan-card-title">
                    <i class="fas fa-map-marked-alt"></i>
                    ${plan.title || getCurrentLangText({
                        ar: 'خطة رحلة',
                        en: 'Travel Plan',
                        fr: 'Plan de voyage'
                    })}
                </h3>
                <div class="plan-card-actions">
                    <button onclick="openPlanLink('${planId}')" class="btn-icon" title="${getCurrentLangText({
                        ar: 'فتح الخطة',
                        en: 'Open Plan',
                        fr: 'Ouvrir le plan'
                    })}">
                        <i class="fas fa-external-link-alt"></i>
                    </button>
                    <button onclick="copyPlanLink('${planUrl}')" class="btn-icon" title="${getCurrentLangText({
                        ar: 'نسخ الرابط',
                        en: 'Copy Link',
                        fr: 'Copier le lien'
                    })}">
                        <i class="fas fa-link"></i>
                    </button>
                    <button onclick="viewPlan('${planId}')" class="btn-icon" title="${getCurrentLangText({
                        ar: 'عرض',
                        en: 'View',
                        fr: 'Voir'
                    })}">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button onclick="deletePlan('${planId}')" class="btn-icon btn-danger" title="${getCurrentLangText({
                        ar: 'حذف',
                        en: 'Delete',
                        fr: 'Supprimer'
                    })}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="plan-card-body">
                <div class="plan-link-display">
                    <i class="fas fa-link"></i>
                    <input type="text" readonly value="${planUrl}" class="plan-link-input" onclick="this.select()">
                </div>
                <div class="plan-info">
                    <div class="plan-info-item">
                        <i class="fas fa-calendar-alt"></i>
                        <span>${plan.days || 0} ${getCurrentLangText({
                            ar: 'يوم',
                            en: 'Days',
                            fr: 'Jours'
                        })}</span>
                    </div>
                    <div class="plan-info-item">
                        <i class="fas fa-users"></i>
                        <span>${plan.people || 0} ${getCurrentLangText({
                            ar: 'شخص',
                            en: 'People',
                            fr: 'Personnes'
                        })}</span>
                    </div>
                    <div class="plan-info-item">
                        <i class="fas fa-money-bill-wave"></i>
                        <span>${totalCost.toLocaleString()} ${getCurrentLangText({
                            ar: 'ج.م',
                            en: 'EGP',
                            fr: 'EGP'
                        })}</span>
                    </div>
                </div>
                ${governorates ? `
                    <div class="plan-governorates">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${governorates}</span>
                    </div>
                ` : ''}
                <div class="plan-date">
                    <i class="fas fa-clock"></i>
                    <span>${date}</span>
                </div>
            </div>
        </div>
    `;
}

// View Plan Details
async function viewPlan(planId) {
    const currentUser = getCurrentUser();
    if (!currentUser || !savedPlansDB) return;
    
    try {
        const planDoc = await savedPlansDB.collection('users').doc(currentUser.uid)
            .collection('savedPlans').doc(planId).get();
        
        if (!planDoc.exists) {
            alert(getCurrentLangText({
                ar: 'الخطة غير موجودة',
                en: 'Plan not found',
                fr: 'Plan introuvable'
            }));
            return;
        }
        
        const plan = planDoc.data();
        closeSavedPlansModal();
        openTravelPlannerWithData(plan);
        
    } catch (error) {
        console.error('Error viewing plan:', error);
        alert(getCurrentLangText({
            ar: 'حدث خطأ في عرض الخطة',
            en: 'Error viewing plan',
            fr: 'Erreur lors de l\'affichage'
        }));
    }
}

// Delete Plan
async function deletePlan(planId) {
    const currentUser = getCurrentUser();
    if (!currentUser || !savedPlansDB) return;
    
    const confirmText = getCurrentLangText({
        ar: 'هل أنت متأكد من حذف هذه الخطة؟',
        en: 'Are you sure you want to delete this plan?',
        fr: 'Êtes-vous sûr de vouloir supprimer ce plan?'
    });
    
    if (!confirm(confirmText)) return;
    
    try {
        await savedPlansDB.collection('users').doc(currentUser.uid)
            .collection('savedPlans').doc(planId).delete();
        
        loadSavedPlans();
        loadSavedPlansCount();
        
        alert(getCurrentLangText({
            ar: 'تم حذف الخطة بنجاح',
            en: 'Plan deleted successfully',
            fr: 'Plan supprimé avec succès'
        }));
        
    } catch (error) {
        console.error('Error deleting plan:', error);
        alert(getCurrentLangText({
            ar: 'حدث خطأ في حذف الخطة',
            en: 'Error deleting plan',
            fr: 'Erreur lors de la suppression'
        }));
    }
}

// Save Plan to Firebase
async function savePlanToFirebase(planData) {
    console.log('savePlanToFirebase called with:', planData);
    
    const currentUser = getCurrentUser();
    console.log('Current user:', currentUser);
    console.log('SavedPlansDB:', savedPlansDB);
    
    if (!currentUser) {
        console.error('No user logged in');
        alert(getCurrentLangText({
            ar: 'يرجى تسجيل الدخول أولاً لحفظ الخطة',
            en: 'Please login first to save plan',
            fr: 'Veuillez vous connecter d\'abord'
        }));
        return false;
    }
    
    if (!savedPlansDB) {
        console.error('Firestore not initialized');
        alert(getCurrentLangText({
            ar: 'قاعدة البيانات غير جاهزة',
            en: 'Database not ready',
            fr: 'Base de données non prête'
        }));
        return false;
    }
    
    try {
        console.log('Attempting to save to Firestore...');
        const plansRef = savedPlansDB.collection('users').doc(currentUser.uid).collection('savedPlans');
        
        const docRef = await plansRef.add({
            ...planData,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            userId: currentUser.uid
        });
        
        console.log('Plan saved successfully with ID:', docRef.id);
        loadSavedPlansCount();
        
        alert(getCurrentLangText({
            ar: '✅ تم حفظ الخطة بنجاح!',
            en: '✅ Plan saved successfully!',
            fr: '✅ Plan sauvegardé avec succès!'
        }));
        
        return true;
        
    } catch (error) {
        console.error('Error saving plan:', error);
        alert(getCurrentLangText({
            ar: 'حدث خطأ في حفظ الخطة: ' + error.message,
            en: 'Error saving plan: ' + error.message,
            fr: 'Erreur: ' + error.message
        }));
        return false;
    }
}

// Load Saved Plans Count
async function loadSavedPlansCount() {
    const countElement = document.getElementById('saved-plans-count');
    
    if (!countElement) return;
    
    const currentUser = getCurrentUser();
    if (!currentUser || !savedPlansDB) {
        countElement.textContent = '0';
        return;
    }
    
    try {
        const plansRef = savedPlansDB.collection('users').doc(currentUser.uid).collection('savedPlans');
        const snapshot = await plansRef.get();
        countElement.textContent = snapshot.size;
    } catch (error) {
        console.error('Error loading plans count:', error);
        countElement.textContent = '0';
    }
}

// Open Travel Planner with existing data
function openTravelPlannerWithData(planData) {
    const modal = document.getElementById('travel-planner-modal');
    const iframe = document.getElementById('travel-planner-iframe');
    
    if (modal && iframe) {
        const planDataEncoded = encodeURIComponent(JSON.stringify(planData));
        iframe.src = `planner/index.html?data=${planDataEncoded}`;
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }
}

// Listen for messages from iframe
window.addEventListener('message', function(event) {
    console.log('Message received:', event.data);
    
    if (event.data && event.data.type === 'SAVE_PLAN') {
        console.log('Save plan request received:', event.data.planData);
        savePlanToFirebase(event.data.planData);
    }
    
    if (event.data.type === 'IFRAME_READY') {
        notifyPlannerThemeChange();
    }
});

// Helper function
function getCurrentLangText(translations) {
    const currentLang = window.currentLang || localStorage.getItem('preferredLanguage') || 'en';
    return translations[currentLang] || translations.en;
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeSavedPlansModal();
    }
});

// Theme sync
function notifyPlannerThemeChange() {
    const iframe = document.getElementById('travel-planner-iframe');
    if (iframe && iframe.contentWindow) {
        const theme = document.documentElement.getAttribute('data-theme') || 'light';
        iframe.contentWindow.postMessage({
            type: 'THEME_CHANGE',
            theme: theme
        }, '*');
    }
}

// ========== NEW FUNCTIONS FOR PLAN LINKS ==========

// Open Plan Link - Opens plan in new tab/window
function openPlanLink(planId) {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        alert(getCurrentLangText({
            ar: 'يرجى تسجيل الدخول أولاً',
            en: 'Please login first',
            fr: 'Veuillez vous connecter d\'abord'
        }));
        return;
    }
    
    const planUrl = `${window.location.origin}${window.location.pathname}?plan=${planId}&user=${currentUser.uid}`;
    window.open(planUrl, '_blank');
}

// Copy Plan Link to Clipboard
async function copyPlanLink(url) {
    try {
        await navigator.clipboard.writeText(url);
        
        // Show success message
        showNotification(getCurrentLangText({
            ar: 'تم نسخ الرابط!',
            en: 'Link copied!',
            fr: 'Lien copié!'
        }), 'success');
    } catch (err) {
        console.error('Failed to copy:', err);
        
        // Fallback: Select the input
        const input = event.target.closest('.saved-plan-card').querySelector('.plan-link-input');
        if (input) {
            input.select();
            document.execCommand('copy');
            showNotification(getCurrentLangText({
                ar: 'تم نسخ الرابط!',
                en: 'Link copied!',
                fr: 'Lien copié!'
            }), 'success');
        }
    }
}

// Show notification helper
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Load Plan from URL Parameter
function loadPlanFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const planId = urlParams.get('plan');
    const userId = urlParams.get('user');
    
    if (planId && userId) {
        console.log('Loading plan from URL:', planId, userId);
        loadSharedPlan(planId, userId);
    }
}

// Load Shared Plan
async function loadSharedPlan(planId, userId) {
    if (!savedPlansDB) {
        console.error('Database not ready');
        return;
    }
    
    try {
        const planDoc = await savedPlansDB
            .collection('users')
            .doc(userId)
            .collection('savedPlans')
            .doc(planId)
            .get();
        
        if (planDoc.exists) {
            const plan = planDoc.data();
            
            // Show the plan
            showNotification(getCurrentLangText({
                ar: 'تم تحميل الخطة!',
                en: 'Plan loaded!',
                fr: 'Plan chargé!'
            }), 'success');
            
            // Open the plan in a modal or display it
            viewPlanFromData(planId, plan);
        } else {
            showNotification(getCurrentLangText({
                ar: 'الخطة غير موجودة',
                en: 'Plan not found',
                fr: 'Plan introuvable'
            }), 'error');
        }
    } catch (error) {
        console.error('Error loading shared plan:', error);
        showNotification(getCurrentLangText({
            ar: 'حدث خطأ في تحميل الخطة',
            en: 'Error loading plan',
            fr: 'Erreur de chargement'
        }), 'error');
    }
}

// View Plan from Data (helper function)
function viewPlanFromData(planId, plan) {
    // Navigate to plans section and open the plan
    const plansSection = document.getElementById('plans');
    if (plansSection) {
        // Switch to plans section
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        plansSection.classList.add('active');
        
        // Update nav
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === 'plans') {
                link.classList.add('active');
            }
        });
    }
    
    // Open the plan details
    setTimeout(() => {
        viewPlan(planId);
    }, 500);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadPlanFromURL();
});

// ========== END NEW FUNCTIONS ==========

if (typeof MutationObserver !== 'undefined') {
    const themeObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'data-theme') {
                notifyPlannerThemeChange();
            }
        });
    });
    
    themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });
}

// Export functions
window.savedPlansManager = {
    savePlan: savePlanToFirebase,
    loadPlans: loadSavedPlans,
    loadCount: loadSavedPlansCount,
    openModal: openSavedPlansModal,
    closeModal: closeSavedPlansModal
};

window.openSavedPlansModal = openSavedPlansModal;
window.closeSavedPlansModal = closeSavedPlansModal;
window.viewPlan = viewPlan;
window.deletePlan = deletePlan;

console.log('✅ Saved Plans Manager loaded');
