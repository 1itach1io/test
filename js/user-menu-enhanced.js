/* ═══════════════════════════════════════════════════════════════════
   USER MENU SYSTEM - ENHANCED
   Complete user profile management with proper visibility control
   ═══════════════════════════════════════════════════════════════════ */

'use strict';

// ========== GLOBAL STATE ==========
let currentUserMenu = null;
let userMenuInitialized = false;

// ========== Initialize User Menu System ==========
function initializeUserMenu() {
    if (userMenuInitialized) return;
    
    console.log('👤 Initializing User Menu System...');
    
    // Setup user menu button click handler
    const userMenuBtn = document.getElementById('user-menu-btn');
    if (userMenuBtn) {
        userMenuBtn.addEventListener('click', toggleUserDropdown);
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        const userMenuContainer = document.getElementById('user-menu-container');
        const userDropdown = document.getElementById('user-dropdown');
        
        if (userMenuContainer && userDropdown) {
            if (!userMenuContainer.contains(e.target) && userDropdown.classList.contains('show')) {
                closeUserDropdown();
            }
        }
    });
    
    // Setup Firebase auth state observer
    setupAuthObserver();
    
    userMenuInitialized = true;
    console.log('✅ User Menu System initialized');
}

// ========== Setup Firebase Auth Observer ==========
function setupAuthObserver() {
    // Wait for Firebase to be ready
    if (typeof firebase === 'undefined' || !firebase.auth) {
        console.log('⏳ Waiting for Firebase...');
        setTimeout(setupAuthObserver, 500);
        return;
    }
    
    firebase.auth().onAuthStateChanged((user) => {
        console.log('🔐 Auth state changed:', user ? 'Logged in' : 'Not logged in');
        currentUserMenu = user;
        updateAuthUI(user);
    });
}

// ========== Update Auth UI ==========
function updateAuthUI(user) {
    const authButtons = document.getElementById('auth-buttons');
    const userMenuContainer = document.getElementById('user-menu-container');
    const authMobileItem = document.getElementById('auth-mobile-item');
    
    console.log('🔄 Updating Auth UI...', {
        user: user ? user.email : 'Not logged in',
        authButtons: !!authButtons,
        userMenuContainer: !!userMenuContainer,
        authMobileItem: !!authMobileItem
    });
    
    if (user) {
        // User is logged in
        console.log('✅ User logged in:', user.email);
        
        // Hide auth buttons (desktop)
        if (authButtons) {
            authButtons.style.display = 'none';
            authButtons.classList.remove('show');
        }
        
        // Hide auth mobile item (important!)
        if (authMobileItem) {
            authMobileItem.style.display = 'none';
            authMobileItem.classList.add('hidden');
        }
        
        // Show user menu
        if (userMenuContainer) {
            userMenuContainer.style.display = 'flex';
            userMenuContainer.classList.add('show');
        }
        
        // Update user info
        updateUserInfo(user);
        
        // Load saved plans count
        loadUserPlansCount();
        
    } else {
        // User is not logged in
        console.log('ℹ️ User not logged in');
        
        // Show auth buttons (desktop only)
        if (authButtons) {
            authButtons.style.display = 'flex';
            authButtons.classList.add('show');
        }
        
        // Show auth mobile item (mobile only)
        if (authMobileItem) {
            authMobileItem.style.display = 'block';
            authMobileItem.classList.remove('hidden');
        }
        
        // Hide user menu
        if (userMenuContainer) {
            userMenuContainer.style.display = 'none';
            userMenuContainer.classList.remove('show');
        }
    }
    
    console.log('✅ Auth UI updated successfully');
}

// ========== Update User Info ==========
function updateUserInfo(user) {
    // Get user display name or email
    const displayName = user.displayName || user.email.split('@')[0];
    const email = user.email;
    const photoURL = user.photoURL || getDefaultAvatar(displayName);
    
    // Determine authentication method
    const providerData = user.providerData;
    let authMethod = 'email'; // default
    let authMethodText = {
        ar: 'حساب بالبريد الإلكتروني',
        en: 'Email Account',
        fr: 'Compte Email'
    };
    let authMethodIcon = 'fas fa-envelope';
    
    if (providerData && providerData.length > 0) {
        const providerId = providerData[0].providerId;
        if (providerId === 'google.com') {
            authMethod = 'google';
            authMethodText = {
                ar: 'حساب جوجل',
                en: 'Google Account',
                fr: 'Compte Google'
            };
            authMethodIcon = 'fab fa-google';
        }
    }
    
    // Update user photo (small)
    const userPhoto = document.getElementById('user-photo');
    if (userPhoto) {
        userPhoto.src = photoURL;
        userPhoto.alt = displayName;
        userPhoto.onerror = () => {
            userPhoto.src = getDefaultAvatar(displayName);
        };
    }
    
    // Update user photo (large in dropdown)
    const userPhotoLarge = document.getElementById('user-photo-large');
    if (userPhotoLarge) {
        userPhotoLarge.src = photoURL;
        userPhotoLarge.alt = displayName;
        userPhotoLarge.onerror = () => {
            userPhotoLarge.src = getDefaultAvatar(displayName);
        };
    }
    
    // Update display name (button)
    const userDisplayName = document.getElementById('user-display-name');
    if (userDisplayName) {
        userDisplayName.textContent = displayName;
    }
    
    // Update display name (dropdown)
    const userNameDropdown = document.getElementById('user-name-dropdown');
    if (userNameDropdown) {
        userNameDropdown.textContent = displayName;
    }
    
    // Update email
    const userEmailElement = document.getElementById('user-email');
    if (userEmailElement) {
        userEmailElement.textContent = email;
    }
    
    // Update auth method
    const userAuthMethod = document.getElementById('user-auth-method');
    if (userAuthMethod) {
        const currentLang = localStorage.getItem('language') || 'en';
        const iconElement = userAuthMethod.querySelector('i');
        const textElement = userAuthMethod.querySelector('span');
        
        if (iconElement) {
            iconElement.className = authMethodIcon;
        }
        if (textElement) {
            textElement.textContent = authMethodText[currentLang] || authMethodText.en;
        }
    }
    
    console.log('✅ User info updated:', displayName, `(${authMethod})`);
}

// ========== Get Default Avatar ==========
function getDefaultAvatar(name) {
    // Generate a colorful avatar based on the first letter
    const firstLetter = name.charAt(0).toUpperCase();
    const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', 
        '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
        '#F8B739', '#52B788', '#E76F51', '#2A9D8F'
    ];
    
    const colorIndex = name.charCodeAt(0) % colors.length;
    const color = colors[colorIndex];
    
    // Create SVG avatar
    const svg = `
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" fill="${color}"/>
            <text x="50" y="50" font-size="45" fill="white" 
                  text-anchor="middle" dominant-baseline="central" 
                  font-family="Arial, sans-serif" font-weight="bold">
                ${firstLetter}
            </text>
        </svg>
    `;
    
    return 'data:image/svg+xml;base64,' + btoa(svg);
}

// ========== Toggle User Dropdown ==========
function toggleUserDropdown() {
    const dropdown = document.getElementById('user-dropdown');
    if (!dropdown) return;
    
    const isOpen = dropdown.classList.contains('show');
    
    if (isOpen) {
        closeUserDropdown();
    } else {
        openUserDropdown();
    }
}

// ========== Open User Dropdown ==========
function openUserDropdown() {
    const dropdown = document.getElementById('user-dropdown');
    if (!dropdown) return;
    
    dropdown.classList.add('show');
    
    // Update chevron icon
    const userMenuBtn = document.getElementById('user-menu-btn');
    if (userMenuBtn) {
        const chevron = userMenuBtn.querySelector('.fa-chevron-down');
        if (chevron) {
            chevron.classList.remove('fa-chevron-down');
            chevron.classList.add('fa-chevron-up');
        }
    }
}

// ========== Close User Dropdown ==========
function closeUserDropdown() {
    const dropdown = document.getElementById('user-dropdown');
    if (!dropdown) return;
    
    dropdown.classList.remove('show');
    
    // Update chevron icon
    const userMenuBtn = document.getElementById('user-menu-btn');
    if (userMenuBtn) {
        const chevron = userMenuBtn.querySelector('.fa-chevron-up');
        if (chevron) {
            chevron.classList.remove('fa-chevron-up');
            chevron.classList.add('fa-chevron-down');
        }
    }
}

// ========== Open Saved Plans from Dropdown ==========
function openSavedPlansFromDropdown() {
    closeUserDropdown();
    
    // Wait a bit for dropdown to close
    setTimeout(() => {
        if (typeof openSavedPlansModal === 'function') {
            openSavedPlansModal();
        } else {
            console.error('openSavedPlansModal function not found');
        }
    }, 100);
}

// ========== Load User Plans Count ==========
async function loadUserPlansCount() {
    if (!currentUserMenu) return;
    
    const countElement = document.getElementById('dropdown-plans-count');
    if (!countElement) return;
    
    try {
        if (typeof firebase !== 'undefined' && firebase.firestore) {
            const db = firebase.firestore();
            const plansRef = db.collection('users').doc(currentUserMenu.uid).collection('savedPlans');
            const snapshot = await plansRef.get();
            
            const count = snapshot.size;
            countElement.textContent = count;
            countElement.style.display = count > 0 ? 'inline-block' : 'none';
            
            // Also update the main saved plans count if it exists
            const mainCountElement = document.getElementById('saved-plans-count');
            if (mainCountElement) {
                mainCountElement.textContent = count;
            }
            
            console.log('✅ Plans count loaded:', count);
        }
    } catch (error) {
        console.error('❌ Error loading plans count:', error);
        countElement.textContent = '0';
    }
}

// ========== Handle Logout ==========
async function handleLogout() {
    if (!confirm(getCurrentLangText({
        ar: 'هل أنت متأكد من تسجيل الخروج؟',
        en: 'Are you sure you want to logout?',
        fr: 'Êtes-vous sûr de vouloir vous déconnecter?'
    }))) {
        return;
    }
    
    try {
        if (typeof firebase !== 'undefined' && firebase.auth) {
            await firebase.auth().signOut();
            
            console.log('✅ User logged out');
            
            // Show success message
            alert(getCurrentLangText({
                ar: 'تم تسجيل الخروج بنجاح',
                en: 'Logged out successfully',
                fr: 'Déconnexion réussie'
            }));
            
            // Refresh page
            window.location.reload();
        }
    } catch (error) {
        console.error('❌ Logout error:', error);
        alert(getCurrentLangText({
            ar: 'حدث خطأ في تسجيل الخروج',
            en: 'Error logging out',
            fr: 'Erreur de déconnexion'
        }));
    }
}

// ========== Helper Functions ==========
function getCurrentLangText(translations) {
    const currentLang = localStorage.getItem('language') || 'en';
    return translations[currentLang] || translations.en;
}

// ========== Initialize on Load ==========
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeUserMenu);
} else {
    initializeUserMenu();
}

// ========== Export for Global Access ==========
window.toggleUserDropdown = toggleUserDropdown;
window.openUserDropdown = openUserDropdown;
window.closeUserDropdown = closeUserDropdown;
window.handleLogout = handleLogout;
window.openSavedPlansFromDropdown = openSavedPlansFromDropdown;
window.loadUserPlansCount = loadUserPlansCount;

console.log('✅ User Menu System loaded');
