/* ==========================================
   DISCOVER EGYPT - AUTH INTEGRATION
   دمج نظام المصادقة مع الموقع - نسخة مبسطة
   ========================================== */

// ========== Variables ==========
let userDropdownOpen = false;

// ========== Initialize Auth UI ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔐 Initializing simplified auth integration...');

    // Initialize auth state listener
    initializeAuthState();

    // Initialize user menu functionality
    initializeUserMenu();

    console.log('✅ Auth integration initialized');
});

// ========== Initialize Auth State ==========
function initializeAuthState() {
    console.log('👤 Setting up auth state listener...');

    // Listen for authentication state changes
    firebase.auth().onAuthStateChanged((user) => {
        console.log('🔄 Auth state changed:', user ? 'User logged in' : 'User logged out');

        const authButtons = document.getElementById('auth-buttons');
        const authMobileItem = document.getElementById('auth-mobile-item');
        const userMenuContainer = document.getElementById('user-menu-container');

        if (user) {
            // User is signed in
            console.log('✅ User authenticated:', user.email);

            // Hide auth buttons
            if (authButtons) authButtons.style.display = 'none';
            if (authMobileItem) authMobileItem.style.display = 'none';

            // Show user menu
            if (userMenuContainer) userMenuContainer.style.display = 'flex';

            // Update user info
            updateUserInfo(user);
        } else {
            // No user is signed in
            console.log('👤 No user authenticated');

            // Show auth buttons
            if (authButtons) authButtons.style.display = 'flex';
            if (authMobileItem) authMobileItem.style.display = 'block';

            // Hide user menu
            if (userMenuContainer) userMenuContainer.style.display = 'none';
        }
    });
}

// ========== Update User Info ==========
function updateUserInfo(user) {
    const photoURL = user.photoURL || getDefaultAvatar();
    const displayName = user.displayName || user.email.split('@')[0];
    const email = user.email;

    // Update all user photo elements
    const userPhotos = document.querySelectorAll('.user-photo, .user-photo-large');
    userPhotos.forEach(photo => {
        photo.src = photoURL;
        photo.alt = displayName;
    });

    // Update display name
    const displayNameElements = document.querySelectorAll('.user-display-name, .user-name');
    displayNameElements.forEach(element => {
        element.textContent = displayName;
    });

    // Update email
    const emailElement = document.getElementById('user-email');
    if (emailElement) {
        emailElement.textContent = email;
    }
}

// ========== Get Default Avatar ==========
function getDefaultAvatar() {
    return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+CiAgPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGZpbGw9IiM0Mjg1RjQiLz4KICA8dGV4dCB4PSI1MCIgeT0iNTAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0MCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7wn5GMPC90ZXh0Pgo8L3N2Zz4=';
}

// ========== Initialize User Menu ==========
function initializeUserMenu() {
    const userMenuBtn = document.getElementById('user-menu-btn');
    const userDropdown = document.getElementById('user-dropdown');

    if (userMenuBtn && userDropdown) {
        // Toggle dropdown on button click
        userMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleUserDropdown();
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (userDropdownOpen && !userDropdown.contains(e.target) && !userMenuBtn.contains(e.target)) {
                closeUserDropdown();
            }
        });

        // Close dropdown on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && userDropdownOpen) {
                closeUserDropdown();
            }
        });
    }
}

// ========== Toggle User Dropdown ==========
function toggleUserDropdown() {
    const userDropdown = document.getElementById('user-dropdown');
    if (userDropdown) {
        userDropdownOpen = !userDropdownOpen;
        userDropdown.classList.toggle('active', userDropdownOpen);
    }
}

// ========== Close User Dropdown ==========
function closeUserDropdown() {
    const userDropdown = document.getElementById('user-dropdown');
    if (userDropdown) {
        userDropdownOpen = false;
        userDropdown.classList.remove('active');
    }
}

// ========== Handle Logout ==========
async function handleLogout() {
    try {
        await firebase.auth().signOut();
        console.log('✅ Logged out successfully');
        closeUserDropdown();

        // Show success message
        alert('تم تسجيل الخروج بنجاح');

        // Redirect to home
        setTimeout(() => {
            window.location.hash = '#home';
            window.location.reload();
        }, 500);
    } catch (error) {
        console.error('❌ Logout error:', error);
        alert('حدث خطأ أثناء تسجيل الخروج');
    }
}

// Make logout function globally available
window.handleLogout = handleLogout;

console.log('✅ Simplified auth integration script loaded');
