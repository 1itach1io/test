/* ==========================================
   FIREBASE AUTHENTICATION SYSTEM
   Real authentication with Firebase
   ========================================== */

// Initialize Firebase Auth after page loads
let auth;
let googleProvider;

document.addEventListener('DOMContentLoaded', function() {
    // Wait for Firebase to be initialized
    setTimeout(() => {
        auth = window.firebaseAuth;
        googleProvider = window.googleProvider;
        initializeFirebaseAuth();
    }, 100);
});

// Initialize Firebase Authentication
function initializeFirebaseAuth() {
    console.log('🔐 Initializing Firebase authentication...');
    
    // Get elements
    const loginBtn = document.getElementById('login-btn');
    const mobileLoginBtn = document.getElementById('mobile-login-btn');
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const loginClose = document.getElementById('login-close');
    const signupClose = document.getElementById('signup-close');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const switchToSignup = document.getElementById('switch-to-signup');
    const switchToLogin = document.getElementById('switch-to-login');
    const logoutBtn = document.getElementById('logout-btn');
    const mobileLogoutBtn = document.getElementById('mobile-logout-btn');
    const googleLoginBtn = document.getElementById('google-login-btn');
    const googleSignupBtn = document.getElementById('google-signup-btn');
    
    // Check authentication state
    auth.onAuthStateChanged(user => {
        if (user) {
            console.log('✅ User logged in:', user.email);
            updateUIForLoggedInUser(user);
        } else {
            console.log('ℹ️ No user logged in');
            updateUIForLoggedOutUser();
        }
    });
    
    // Open login modal
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            loginModal.classList.add('active');
            clearErrors();
        });
    }
    
    if (mobileLoginBtn) {
        mobileLoginBtn.addEventListener('click', () => {
            loginModal.classList.add('active');
            clearErrors();
        });
    }
    
    // Close modals
    if (loginClose) {
        loginClose.addEventListener('click', () => {
            loginModal.classList.remove('active');
            clearErrors();
        });
    }
    
    if (signupClose) {
        signupClose.addEventListener('click', () => {
            signupModal.classList.remove('active');
            clearErrors();
        });
    }
    
    // Close on outside click
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
            clearErrors();
        }
    });
    
    signupModal.addEventListener('click', (e) => {
        if (e.target === signupModal) {
            signupModal.classList.remove('active');
            clearErrors();
        }
    });
    
    // Switch between modals
    if (switchToSignup) {
        switchToSignup.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.classList.remove('active');
            signupModal.classList.add('active');
            clearErrors();
        });
    }
    
    if (switchToLogin) {
        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            signupModal.classList.remove('active');
            loginModal.classList.add('active');
            clearErrors();
        });
    }
    
    // Google Sign In - Login
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                await auth.signInWithPopup(googleProvider);
                loginModal.classList.remove('active');
                showSuccessMessage('Welcome! Signed in with Google 🎉');
            } catch (error) {
                console.error('Google login error:', error);
                showError('login-error', getErrorMessage(error.code));
            }
        });
    }
    
    // Google Sign In - Signup
    if (googleSignupBtn) {
        googleSignupBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                await auth.signInWithPopup(googleProvider);
                signupModal.classList.remove('active');
                showSuccessMessage('Welcome! Account created with Google 🎉');
            } catch (error) {
                console.error('Google signup error:', error);
                showError('signup-error', getErrorMessage(error.code));
            }
        });
    }
    
    // Handle signup with email/password
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('signup-name').value.trim();
            const email = document.getElementById('signup-email').value.trim();
            const password = document.getElementById('signup-password').value;
            
            // Validation
            if (!name || !email || !password) {
                showError('signup-error', 'Please fill in all fields');
                return;
            }
            
            if (!isValidEmail(email)) {
                showError('signup-error', 'Please enter a valid email address');
                return;
            }
            
            if (password.length < 6) {
                showError('signup-error', 'Password must be at least 6 characters');
                return;
            }
            
            try {
                // Create user with email and password
                const userCredential = await auth.createUserWithEmailAndPassword(email, password);
                
                // Update profile with display name
                await userCredential.user.updateProfile({
                    displayName: name
                });
                
                signupModal.classList.remove('active');
                signupForm.reset();
                showSuccessMessage(`Welcome, ${name}! 🎉`);
                
                console.log('✅ User registered:', email);
            } catch (error) {
                console.error('Signup error:', error);
                showError('signup-error', getErrorMessage(error.code));
            }
        });
    }
    
    // Handle login with email/password
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value;
            
            // Validation
            if (!email || !password) {
                showError('login-error', 'Please fill in all fields');
                return;
            }
            
            try {
                await auth.signInWithEmailAndPassword(email, password);
                
                loginModal.classList.remove('active');
                loginForm.reset();
                showSuccessMessage('Welcome back! 👋');
                
                console.log('✅ User logged in:', email);
            } catch (error) {
                console.error('Login error:', error);
                showError('login-error', getErrorMessage(error.code));
            }
        });
    }
    
    // Handle logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            await logout();
        });
    }
    
    if (mobileLogoutBtn) {
        mobileLogoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            await logout();
        });
    }
    
    console.log('✅ Firebase auth system initialized');
}

// Update UI for logged in user
function updateUIForLoggedInUser(user) {
    // Get user info
    const userName = user.displayName || user.email.split('@')[0];
    const userEmail = user.email;
    const userAvatar = user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=random&color=fff`;
    
    // Desktop UI
    const loginBtn = document.getElementById('login-btn');
    const userMenu = document.getElementById('user-menu');
    const userAvatarImg = document.getElementById('user-avatar');
    const userNameSpan = document.getElementById('user-name');
    const dropdownAvatar = document.getElementById('dropdown-avatar');
    const dropdownUserName = document.getElementById('dropdown-user-name');
    const dropdownUserEmail = document.getElementById('dropdown-user-email');
    
    if (loginBtn) loginBtn.style.display = 'none';
    if (userMenu) userMenu.style.display = 'flex';
    if (userAvatarImg) userAvatarImg.src = userAvatar;
    if (userNameSpan) userNameSpan.textContent = userName;
    if (dropdownAvatar) dropdownAvatar.src = userAvatar;
    if (dropdownUserName) dropdownUserName.textContent = userName;
    if (dropdownUserEmail) dropdownUserEmail.textContent = userEmail;
    
    // Mobile UI
    const mobileAuthItem = document.getElementById('mobile-auth-item');
    const mobileUserItem = document.getElementById('mobile-user-item');
    const mobileLogoutItem = document.getElementById('mobile-logout-item');
    const mobileUserAvatar = document.getElementById('mobile-user-avatar');
    const mobileUserName = document.getElementById('mobile-user-name');
    const mobileUserEmail = document.getElementById('mobile-user-email');
    
    if (mobileAuthItem) mobileAuthItem.style.display = 'none';
    if (mobileUserItem) mobileUserItem.style.display = 'block';
    if (mobileLogoutItem) mobileLogoutItem.style.display = 'block';
    if (mobileUserAvatar) mobileUserAvatar.src = userAvatar;
    if (mobileUserName) mobileUserName.textContent = userName;
    if (mobileUserEmail) mobileUserEmail.textContent = userEmail;
    
    // User menu toggle
    const userMenuBtn = document.getElementById('user-menu-btn');
    const userDropdown = document.getElementById('user-dropdown');
    
    if (userMenuBtn && userDropdown) {
        // Remove old listeners
        const newUserMenuBtn = userMenuBtn.cloneNode(true);
        userMenuBtn.parentNode.replaceChild(newUserMenuBtn, userMenuBtn);
        
        newUserMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            const userMenuElement = document.getElementById('user-menu');
            if (userMenuElement && !userMenuElement.contains(e.target)) {
                userDropdown.classList.remove('active');
            }
        });
    }
}

// Update UI for logged out user
function updateUIForLoggedOutUser() {
    // Desktop UI
    const loginBtn = document.getElementById('login-btn');
    const userMenu = document.getElementById('user-menu');
    
    if (loginBtn) loginBtn.style.display = 'flex';
    if (userMenu) userMenu.style.display = 'none';
    
    // Mobile UI
    const mobileAuthItem = document.getElementById('mobile-auth-item');
    const mobileUserItem = document.getElementById('mobile-user-item');
    const mobileLogoutItem = document.getElementById('mobile-logout-item');
    
    if (mobileAuthItem) mobileAuthItem.style.display = 'block';
    if (mobileUserItem) mobileUserItem.style.display = 'none';
    if (mobileLogoutItem) mobileLogoutItem.style.display = 'none';
}

// Logout function
async function logout() {
    try {
        const currentUser = auth.currentUser;
        await auth.signOut();
        showSuccessMessage(`Goodbye! See you soon! 👋`);
        console.log('✅ User logged out');
    } catch (error) {
        console.error('Logout error:', error);
    }
}

// Show error message
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 4000);
    }
}

// Clear all errors
function clearErrors() {
    const errors = document.querySelectorAll('.auth-error');
    errors.forEach(error => {
        error.style.display = 'none';
        error.textContent = '';
    });
}

// Show success message
function showSuccessMessage(message) {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = 'success-toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-weight: 500;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (toast.parentNode) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Email validation
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Get user-friendly error messages
function getErrorMessage(errorCode) {
    const errorMessages = {
        'auth/email-already-in-use': 'This email is already registered. Please login instead.',
        'auth/invalid-email': 'Please enter a valid email address.',
        'auth/operation-not-allowed': 'Email/password accounts are not enabled.',
        'auth/weak-password': 'Password should be at least 6 characters.',
        'auth/user-disabled': 'This account has been disabled.',
        'auth/user-not-found': 'No account found with this email.',
        'auth/wrong-password': 'Incorrect password. Please try again.',
        'auth/invalid-credential': 'Invalid email or password.',
        'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
        'auth/network-request-failed': 'Network error. Please check your connection.',
        'auth/popup-closed-by-user': 'Sign-in popup was closed.',
        'auth/cancelled-popup-request': 'Only one popup allowed at a time.',
        'auth/popup-blocked': 'Popup was blocked. Please allow popups for this site.'
    };
    
    return errorMessages[errorCode] || 'An error occurred. Please try again.';
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
