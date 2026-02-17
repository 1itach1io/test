/* ==========================================
   DISCOVER EGYPT - LOCAL AUTH SYSTEM
   Professional authentication without Firebase
   ========================================== */

// Initialize authentication system
function initializeAuth() {
    console.log('🔐 Initializing professional authentication system...');
    
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
    
    // Check if user is already logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const userData = JSON.parse(currentUser);
        updateUIForLoggedInUser(userData);
    }
    
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
    
    // Google Sign In (Demo - creates account instantly)
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            handleGoogleAuth('login');
        });
    }
    
    if (googleSignupBtn) {
        googleSignupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            handleGoogleAuth('signup');
        });
    }
    
    // Handle signup
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
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
            
            // Get existing users
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            
            // Check if email already exists
            if (users.find(u => u.email === email)) {
                showError('signup-error', 'Email already registered. Please login.');
                return;
            }
            
            // Create new user
            const newUser = {
                id: Date.now().toString(),
                name: name,
                email: email,
                password: password,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`,
                joinDate: new Date().toISOString()
            };
            
            // Save user
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            
            // Log in the user
            const userData = { 
                id: newUser.id, 
                name: newUser.name, 
                email: newUser.email, 
                avatar: newUser.avatar 
            };
            localStorage.setItem('currentUser', JSON.stringify(userData));
            
            // Update UI
            updateUIForLoggedInUser(userData);
            
            // Close modal and show success
            signupModal.classList.remove('active');
            signupForm.reset();
            showSuccessMessage(`Welcome, ${userData.name}! 🎉`);
            
            console.log('✅ User registered and logged in:', userData.name);
        });
    }
    
    // Handle login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value;
            
            // Validation
            if (!email || !password) {
                showError('login-error', 'Please fill in all fields');
                return;
            }
            
            // Get existing users
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            
            // Find user
            const user = users.find(u => u.email === email && u.password === password);
            
            if (!user) {
                showError('login-error', 'Invalid email or password');
                return;
            }
            
            // Log in the user
            const userData = { 
                id: user.id, 
                name: user.name, 
                email: user.email, 
                avatar: user.avatar 
            };
            localStorage.setItem('currentUser', JSON.stringify(userData));
            
            // Update UI
            updateUIForLoggedInUser(userData);
            
            // Close modal and show success
            loginModal.classList.remove('active');
            loginForm.reset();
            showSuccessMessage(`Welcome back, ${userData.name}! 👋`);
            
            console.log('✅ User logged in:', userData.name);
        });
    }
    
    // Handle logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }
    
    if (mobileLogoutBtn) {
        mobileLogoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }
    
    console.log('✅ Professional auth system initialized');
}

// Google Auth Demo (creates demo account)
function handleGoogleAuth(mode) {
    // Create demo Google user
    const demoUser = {
        id: 'google-' + Date.now(),
        name: 'Demo User',
        email: 'demo@google.com',
        password: 'demo123',
        avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=4285F4&color=fff',
        joinDate: new Date().toISOString()
    };
    
    // Save to users if signup
    if (mode === 'signup') {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (!users.find(u => u.email === demoUser.email)) {
            users.push(demoUser);
            localStorage.setItem('users', JSON.stringify(users));
        }
    }
    
    // Log in
    const userData = {
        id: demoUser.id,
        name: demoUser.name,
        email: demoUser.email,
        avatar: demoUser.avatar
    };
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    // Update UI
    updateUIForLoggedInUser(userData);
    
    // Close modals
    document.getElementById('login-modal').classList.remove('active');
    document.getElementById('signup-modal').classList.remove('active');
    
    showSuccessMessage(`Signed in with Google! Welcome, ${userData.name}! 🎉`);
    console.log('✅ Google auth successful:', userData.name);
}

// Update UI for logged in user
function updateUIForLoggedInUser(userData) {
    // Desktop UI
    const loginBtn = document.getElementById('login-btn');
    const userMenu = document.getElementById('user-menu');
    const userAvatar = document.getElementById('user-avatar');
    const userName = document.getElementById('user-name');
    const dropdownAvatar = document.getElementById('dropdown-avatar');
    const dropdownUserName = document.getElementById('dropdown-user-name');
    const dropdownUserEmail = document.getElementById('dropdown-user-email');
    
    if (loginBtn) loginBtn.style.display = 'none';
    if (userMenu) userMenu.style.display = 'flex';
    if (userAvatar) userAvatar.src = userData.avatar;
    if (userName) userName.textContent = userData.name;
    if (dropdownAvatar) dropdownAvatar.src = userData.avatar;
    if (dropdownUserName) dropdownUserName.textContent = userData.name;
    if (dropdownUserEmail) dropdownUserEmail.textContent = userData.email;
    
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
    if (mobileUserAvatar) mobileUserAvatar.src = userData.avatar;
    if (mobileUserName) mobileUserName.textContent = userData.name;
    if (mobileUserEmail) mobileUserEmail.textContent = userData.email;
    
    // User menu toggle
    const userMenuBtn = document.getElementById('user-menu-btn');
    const userDropdown = document.getElementById('user-dropdown');
    
    if (userMenuBtn && userDropdown) {
        userMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!userMenu.contains(e.target)) {
                userDropdown.classList.remove('active');
            }
        });
    }
}

// Logout function
function logout() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    localStorage.removeItem('currentUser');
    
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
    
    showSuccessMessage(`Goodbye, ${currentUser.name}! See you soon! 👋`);
    console.log('✅ User logged out');
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
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Email validation
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeAuth();
});
