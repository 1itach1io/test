/* ==========================================
   DISCOVER EGYPT - AUTH UI & SEARCH
   User interface for authentication and search
   ========================================== */

import {
    signUpWithEmail,
    signInWithEmail,
    signInWithGoogle,
    signOutUser,
    resetPassword,
    onAuthChange,
    getCurrentUser,
    isValidEmail,
    isValidPassword
} from './firebase-auth.js';

let currentUser = null;
let currentUserData = null;

/* ==========================================
   INITIALIZATION
   ========================================== */

export function initializeAuthUI() {
    console.log('🔐 Starting Auth UI initialization...');

    try {
        // Initialize auth state listener
        console.log('   📡 Setting up auth state listener...');
        initAuthStateListener();

        // Initialize login buttons
        console.log('   🔘 Setting up login buttons...');
        initLoginButtons();

        // Initialize logout buttons
        console.log('   🔘 Setting up logout buttons...');
        initLogoutButtons();

        // Initialize search functionality
        console.log('   🔍 Setting up search functionality...');
        initSearchFunctionality();

        // Initialize mobile menu auth
        console.log('   📱 Setting up mobile auth...');
        initMobileAuth();

        console.log('✅ Auth UI initialization complete!');
    } catch (error) {
        console.error('❌ Auth UI initialization failed:', error);
        throw error;
    }
}

/* ==========================================
   AUTH STATE MANAGEMENT
   ========================================== */

function initAuthStateListener() {
    onAuthChange((user, userData) => {
        currentUser = user;
        currentUserData = userData;

        if (user) {
            console.log('User logged in:', user.email);
            showUserUI(user, userData);
        } else {
            console.log('User logged out');
            showLoginUI();
        }
    });
}

function showUserUI(user, userData) {
    // Desktop UI
    const loginBtn = document.getElementById('login-btn');
    const userMenu = document.getElementById('user-menu');
    const userName = document.getElementById('user-name');
    const userAvatar = document.getElementById('user-avatar');

    if (loginBtn) loginBtn.style.display = 'none';
    if (userMenu) userMenu.style.display = 'block';

    const displayName = user.displayName || userData?.displayName || user.email.split('@')[0];
    const photoURL = user.photoURL || userData?.photoURL ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=4F46E5&color=fff`;

    if (userName) userName.textContent = displayName;
    if (userAvatar) {
        userAvatar.src = photoURL;
        userAvatar.alt = displayName;
    }

    // Mobile UI
    const mobileAuthItem = document.getElementById('mobile-auth-item');
    const mobileUserItem = document.getElementById('mobile-user-item');
    const mobileLogoutItem = document.getElementById('mobile-logout-item');
    const mobileUserName = document.getElementById('mobile-user-name');
    const mobileUserEmail = document.getElementById('mobile-user-email');
    const mobileUserAvatar = document.getElementById('mobile-user-avatar');

    if (mobileAuthItem) mobileAuthItem.style.display = 'none';
    if (mobileUserItem) mobileUserItem.style.display = 'block';
    if (mobileLogoutItem) mobileLogoutItem.style.display = 'block';

    if (mobileUserName) mobileUserName.textContent = displayName;
    if (mobileUserEmail) mobileUserEmail.textContent = user.email;
    if (mobileUserAvatar) {
        mobileUserAvatar.src = photoURL;
        mobileUserAvatar.alt = displayName;
    }
}

function showLoginUI() {
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

/* ==========================================
   LOGIN MODAL
   ========================================== */

function initLoginButtons() {
    // Desktop login button
    const loginBtn = document.getElementById('login-btn');
    console.log('   🖱️ Desktop login button:', loginBtn ? 'Found ✓' : 'Not found ✗');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            console.log('🖱️ Desktop login button clicked!');
            openAuthModal();
        });
    }

    // Mobile login button
    const mobileLoginBtn = document.getElementById('mobile-login-btn');
    console.log('   📱 Mobile login button:', mobileLoginBtn ? 'Found ✓' : 'Not found ✗');
    if (mobileLoginBtn) {
        mobileLoginBtn.addEventListener('click', () => {
            console.log('📱 Mobile login button clicked!');
            openAuthModal();
        });
    }
}

function openAuthModal() {
    console.log('🔐 Opening authentication modal...');
    const modal = createAuthModal();
    document.body.appendChild(modal);
    console.log('✅ Modal created and added to DOM');

    // Animate in
    setTimeout(() => {
        modal.classList.add('active');
        console.log('✅ Modal animated in');
    }, 10);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function createAuthModal() {
    const modal = document.createElement('div');
    modal.className = 'auth-modal';
    modal.id = 'auth-modal';

    modal.innerHTML = `
        <div class="auth-modal-overlay"></div>
        <div class="auth-modal-content">
            <button class="auth-modal-close" aria-label="Close">
                <i class="fas fa-times"></i>
            </button>

            <div class="auth-tabs">
                <button class="auth-tab active" data-tab="login">
                    <span data-translate="auth.login">تسجيل الدخول</span>
                </button>
                <button class="auth-tab" data-tab="signup">
                    <span data-translate="auth.signup">إنشاء حساب</span>
                </button>
            </div>

            <!-- Login Form -->
            <form class="auth-form active" id="login-form">
                <h2 data-translate="auth.welcomeBack">مرحباً بعودتك!</h2>

                <div class="form-group">
                    <label for="login-email" data-translate="auth.email">البريد الإلكتروني</label>
                    <input type="email" id="login-email" required
                           placeholder="your@email.com">
                </div>

                <div class="form-group">
                    <label for="login-password" data-translate="auth.password">كلمة المرور</label>
                    <input type="password" id="login-password" required
                           placeholder="••••••••">
                </div>

                <button type="button" class="forgot-password-btn" data-translate="auth.forgotPassword">
                    نسيت كلمة المرور؟
                </button>

                <div class="auth-error" id="login-error"></div>

                <button type="submit" class="auth-submit-btn">
                    <span data-translate="auth.login">تسجيل الدخول</span>
                </button>

                <div class="auth-divider">
                    <span data-translate="auth.orContinueWith">أو المتابعة بواسطة</span>
                </div>

                <button type="button" class="google-btn">
                    <svg width="18" height="18" viewBox="0 0 18 18">
                        <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                        <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                        <path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z"/>
                        <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
                    </svg>
                    <span data-translate="auth.continueWithGoogle">المتابعة بواسطة Google</span>
                </button>
            </form>

            <!-- Signup Form -->
            <form class="auth-form" id="signup-form">
                <h2 data-translate="auth.createAccount">إنشاء حساب جديد</h2>

                <div class="form-group">
                    <label for="signup-name" data-translate="auth.name">الاسم</label>
                    <input type="text" id="signup-name" required
                           placeholder="Your Name">
                </div>

                <div class="form-group">
                    <label for="signup-email" data-translate="auth.email">البريد الإلكتروني</label>
                    <input type="email" id="signup-email" required
                           placeholder="your@email.com">
                </div>

                <div class="form-group">
                    <label for="signup-password" data-translate="auth.password">كلمة المرور</label>
                    <input type="password" id="signup-password" required
                           placeholder="••••••••">
                    <small class="form-hint" data-translate="auth.passwordHint">6 أحرف على الأقل</small>
                </div>

                <div class="auth-error" id="signup-error"></div>

                <button type="submit" class="auth-submit-btn">
                    <span data-translate="auth.signup">إنشاء حساب</span>
                </button>

                <div class="auth-divider">
                    <span data-translate="auth.orContinueWith">أو المتابعة بواسطة</span>
                </div>

                <button type="button" class="google-btn">
                    <svg width="18" height="18" viewBox="0 0 18 18">
                        <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                        <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                        <path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z"/>
                        <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
                    </svg>
                    <span data-translate="auth.continueWithGoogle">المتابعة بواسطة Google</span>
                </button>
            </form>
        </div>
    `;

    // Add event listeners
    setupModalListeners(modal);

    return modal;
}

function setupModalListeners(modal) {
    // Close button
    const closeBtn = modal.querySelector('.auth-modal-close');
    const overlay = modal.querySelector('.auth-modal-overlay');

    closeBtn.addEventListener('click', () => closeAuthModal(modal));
    overlay.addEventListener('click', () => closeAuthModal(modal));

    // Tab switching
    const tabs = modal.querySelectorAll('.auth-tab');
    const forms = modal.querySelectorAll('.auth-form');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            forms.forEach(f => f.classList.remove('active'));

            tab.classList.add('active');
            const formId = tab.dataset.tab === 'login' ? 'login-form' : 'signup-form';
            modal.querySelector(`#${formId}`).classList.add('active');
        });
    });

    // Form submissions
    const loginForm = modal.querySelector('#login-form');
    const signupForm = modal.querySelector('#signup-form');

    loginForm.addEventListener('submit', handleLogin);
    signupForm.addEventListener('submit', handleSignup);

    // Google sign in buttons
    const googleBtns = modal.querySelectorAll('.google-btn');
    googleBtns.forEach(btn => {
        btn.addEventListener('click', handleGoogleSignIn);
    });

    // Forgot password
    const forgotPasswordBtn = modal.querySelector('.forgot-password-btn');
    forgotPasswordBtn.addEventListener('click', handleForgotPassword);
}

function closeAuthModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => modal.remove(), 300);
}

/* ==========================================
   AUTHENTICATION HANDLERS
   ========================================== */

async function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const errorDiv = document.getElementById('login-error');
    const submitBtn = e.target.querySelector('.auth-submit-btn');

    // Validate
    if (!isValidEmail(email)) {
        showError(errorDiv, 'البريد الإلكتروني غير صالح / Invalid email');
        return;
    }

    // Show loading
    submitBtn.disabled = true;
    submitBtn.textContent = 'جاري تسجيل الدخول...';

    // Sign in
    const result = await signInWithEmail(email, password);

    if (result.success) {
        showSuccess(errorDiv, 'تم تسجيل الدخول بنجاح! / Login successful!');
        setTimeout(() => {
            const modal = document.getElementById('auth-modal');
            if (modal) closeAuthModal(modal);
        }, 1000);
    } else {
        showError(errorDiv, result.error);
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span data-translate="auth.login">تسجيل الدخول</span>';
    }
}

async function handleSignup(e) {
    e.preventDefault();

    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    const errorDiv = document.getElementById('signup-error');
    const submitBtn = e.target.querySelector('.auth-submit-btn');

    // Validate
    if (name.length < 2) {
        showError(errorDiv, 'الاسم قصير جداً / Name is too short');
        return;
    }

    if (!isValidEmail(email)) {
        showError(errorDiv, 'البريد الإلكتروني غير صالح / Invalid email');
        return;
    }

    if (!isValidPassword(password)) {
        showError(errorDiv, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل / Password must be at least 6 characters');
        return;
    }

    // Show loading
    submitBtn.disabled = true;
    submitBtn.textContent = 'جاري إنشاء الحساب...';

    // Sign up
    const result = await signUpWithEmail(email, password, name);

    if (result.success) {
        showSuccess(errorDiv, 'تم إنشاء الحساب بنجاح! / Account created successfully!');
        setTimeout(() => {
            const modal = document.getElementById('auth-modal');
            if (modal) closeAuthModal(modal);
        }, 1000);
    } else {
        showError(errorDiv, result.error);
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span data-translate="auth.signup">إنشاء حساب</span>';
    }
}

async function handleGoogleSignIn() {
    const modal = document.getElementById('auth-modal');
    const googleBtns = modal.querySelectorAll('.google-btn');

    googleBtns.forEach(btn => {
        btn.disabled = true;
        btn.textContent = 'جاري الاتصال...';
    });

    const result = await signInWithGoogle();

    if (result.success) {
        setTimeout(() => {
            if (modal) closeAuthModal(modal);
        }, 500);
    } else {
        googleBtns.forEach(btn => {
            btn.disabled = false;
            btn.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 18 18">
                    <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                    <path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z"/>
                    <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
                </svg>
                <span data-translate="auth.continueWithGoogle">المتابعة بواسطة Google</span>
            `;
        });

        alert(result.error);
    }
}

async function handleForgotPassword() {
    const email = document.getElementById('login-email').value.trim();

    if (!email || !isValidEmail(email)) {
        alert('الرجاء إدخال بريدك الإلكتروني أولاً / Please enter your email address first');
        return;
    }

    const result = await resetPassword(email);

    if (result.success) {
        alert(`تم إرسال رابط إعادة تعيين كلمة المرور إلى ${email} / Password reset link sent to ${email}`);
    } else {
        alert(result.error);
    }
}

/* ==========================================
   LOGOUT HANDLERS
   ========================================== */

function initLogoutButtons() {
    // Desktop logout button
    const userMenuBtn = document.getElementById('user-menu-btn');
    if (userMenuBtn) {
        userMenuBtn.addEventListener('click', toggleUserDropdown);
    }

    // Desktop dropdown logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Mobile logout button
    const mobileLogoutBtn = document.getElementById('mobile-logout-btn');
    if (mobileLogoutBtn) {
        mobileLogoutBtn.addEventListener('click', handleLogout);
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        const dropdown = document.getElementById('user-dropdown');
        const menuBtn = document.getElementById('user-menu-btn');

        if (dropdown && menuBtn &&
            !dropdown.contains(e.target) &&
            !menuBtn.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
}

function toggleUserDropdown() {
    const dropdown = document.getElementById('user-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

async function handleLogout() {
    if (confirm('هل تريد تسجيل الخروج؟ / Do you want to logout?')) {
        const result = await signOutUser();

        if (result.success) {
            console.log('Logged out successfully');
            // Close dropdown if open
            const dropdown = document.getElementById('user-dropdown');
            if (dropdown) dropdown.classList.remove('active');
        } else {
            alert('حدث خطأ أثناء تسجيل الخروج / Error during logout');
        }
    }
}

/* ==========================================
   MOBILE AUTH
   ========================================== */

function initMobileAuth() {
    // Mobile menu toggle already handled in main.js
    // Just ensure auth items respond correctly
}

/* ==========================================
   SEARCH FUNCTIONALITY
   ========================================== */

function initSearchFunctionality() {
    // Desktop search button
    const desktopSearchBtn = document.getElementById('desktop-search-btn');
    console.log('   🔍 Desktop search button:', desktopSearchBtn ? 'Found ✓' : 'Not found ✗');
    if (desktopSearchBtn) {
        desktopSearchBtn.addEventListener('click', () => {
            console.log('🔍 Desktop search button clicked!');
            openSearchModal();
        });
    }

    // Mobile search button
    const mobileSearchBtn = document.getElementById('mobile-search-btn');
    console.log('   📱 Mobile search button:', mobileSearchBtn ? 'Found ✓' : 'Not found ✗');
    if (mobileSearchBtn) {
        mobileSearchBtn.addEventListener('click', () => {
            console.log('📱 Mobile search button clicked!');
            openSearchModal();
        });
    }
}

function openSearchModal() {
    console.log('🔍 Opening search modal...');
    const modal = createSearchModal();
    document.body.appendChild(modal);
    console.log('✅ Search modal created and added to DOM');

    // Animate in
    setTimeout(() => {
        modal.classList.add('active');
        const searchInput = modal.querySelector('.search-input');
        if (searchInput) searchInput.focus();
        console.log('✅ Search modal animated in');
    }, 10);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function createSearchModal() {
    const modal = document.createElement('div');
    modal.className = 'search-modal';
    modal.id = 'search-modal';

    modal.innerHTML = `
        <div class="search-modal-overlay"></div>
        <div class="search-modal-content">
            <div class="search-header">
                <div class="search-input-wrapper">
                    <i class="fas fa-search"></i>
                    <input type="text" class="search-input"
                           placeholder="Search destinations, places, activities..."
                           data-translate-placeholder="search.placeholder">
                </div>
                <button class="search-close-btn" aria-label="Close">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div class="search-body">
                <div class="search-suggestions" id="search-suggestions">
                    <h3 data-translate="search.popular">Popular Searches</h3>
                    <div class="suggestion-tags">
                        <button class="suggestion-tag" data-query="pyramids">
                            <i class="fas fa-landmark"></i> Pyramids
                        </button>
                        <button class="suggestion-tag" data-query="luxor">
                            <i class="fas fa-monument"></i> Luxor
                        </button>
                        <button class="suggestion-tag" data-query="red sea">
                            <i class="fas fa-water"></i> Red Sea
                        </button>
                        <button class="suggestion-tag" data-query="cairo">
                            <i class="fas fa-city"></i> Cairo
                        </button>
                        <button class="suggestion-tag" data-query="siwa">
                            <i class="fas fa-tree"></i> Siwa Oasis
                        </button>
                        <button class="suggestion-tag" data-query="museum">
                            <i class="fas fa-building"></i> Museums
                        </button>
                    </div>
                </div>

                <div class="search-results" id="search-results" style="display: none;">
                    <h3 data-translate="search.results">Search Results</h3>
                    <div class="results-list" id="results-list"></div>
                </div>

                <div class="search-empty" id="search-empty" style="display: none;">
                    <i class="fas fa-search"></i>
                    <p data-translate="search.noResults">No results found</p>
                </div>
            </div>
        </div>
    `;

    setupSearchListeners(modal);

    return modal;
}

function setupSearchListeners(modal) {
    const closeBtn = modal.querySelector('.search-close-btn');
    const overlay = modal.querySelector('.search-modal-overlay');
    const searchInput = modal.querySelector('.search-input');
    const suggestionTags = modal.querySelectorAll('.suggestion-tag');

    // Close handlers
    closeBtn.addEventListener('click', () => closeSearchModal(modal));
    overlay.addEventListener('click', () => closeSearchModal(modal));

    // Search input handler
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();

        if (query.length >= 2) {
            searchTimeout = setTimeout(() => performSearch(query), 300);
        } else {
            showSuggestions();
        }
    });

    // Suggestion tags
    suggestionTags.forEach(tag => {
        tag.addEventListener('click', () => {
            const query = tag.dataset.query;
            searchInput.value = query;
            performSearch(query);
        });
    });

    // Keyboard shortcuts
    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSearchModal(modal);
        }
    });
}

function closeSearchModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => modal.remove(), 300);
}

function showSuggestions() {
    const suggestions = document.getElementById('search-suggestions');
    const results = document.getElementById('search-results');
    const empty = document.getElementById('search-empty');

    if (suggestions) suggestions.style.display = 'block';
    if (results) results.style.display = 'none';
    if (empty) empty.style.display = 'none';
}

async function performSearch(query) {
    const suggestions = document.getElementById('search-suggestions');
    const results = document.getElementById('search-results');
    const empty = document.getElementById('search-empty');
    const resultsList = document.getElementById('results-list');

    if (suggestions) suggestions.style.display = 'none';
    if (results) results.style.display = 'block';
    if (empty) empty.style.display = 'none';

    // Show loading
    if (resultsList) {
        resultsList.innerHTML = `
            <div class="search-loading">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Searching...</p>
            </div>
        `;
    }

    try {
        // Load places data
        const response = await fetch('/data/places.json');
        const data = await response.json();

        // Search in places
        const searchResults = searchPlaces(data, query);

        displaySearchResults(searchResults);
    } catch (error) {
        console.error('Search error:', error);
        if (empty) empty.style.display = 'block';
        if (results) results.style.display = 'none';
    }
}

function searchPlaces(data, query) {
    const lowerQuery = query.toLowerCase();
    const results = [];

    // Search in all governorates and places
    for (const governorate of data.governorates) {
        // Check governorate name
        if (governorate.name.toLowerCase().includes(lowerQuery) ||
            governorate.nameAr?.includes(query)) {
            results.push({
                type: 'governorate',
                data: governorate
            });
        }

        // Check places in this governorate
        for (const place of governorate.places) {
            if (place.name.toLowerCase().includes(lowerQuery) ||
                place.nameAr?.includes(query) ||
                place.description?.toLowerCase().includes(lowerQuery) ||
                place.category?.toLowerCase().includes(lowerQuery)) {
                results.push({
                    type: 'place',
                    data: place,
                    governorate: governorate.name
                });
            }
        }
    }

    return results.slice(0, 10); // Limit to 10 results
}

function displaySearchResults(results) {
    const resultsList = document.getElementById('results-list');
    const empty = document.getElementById('search-empty');
    const resultsDiv = document.getElementById('search-results');

    if (results.length === 0) {
        if (resultsDiv) resultsDiv.style.display = 'none';
        if (empty) empty.style.display = 'block';
        return;
    }

    if (resultsList) {
        resultsList.innerHTML = results.map(result => {
            if (result.type === 'governorate') {
                return `
                    <div class="search-result-item" data-governorate="${result.data.name}">
                        <div class="result-icon">
                            <i class="fas fa-map-marker-alt"></i>
                        </div>
                        <div class="result-content">
                            <h4>${result.data.name}</h4>
                            <p>${result.data.places.length} places to explore</p>
                        </div>
                        <i class="fas fa-chevron-right"></i>
                    </div>
                `;
            } else {
                return `
                    <div class="search-result-item" data-place="${result.data.name}" data-governorate="${result.governorate}">
                        <div class="result-icon">
                            <i class="fas fa-${getCategoryIcon(result.data.category)}"></i>
                        </div>
                        <div class="result-content">
                            <h4>${result.data.name}</h4>
                            <p><i class="fas fa-map-pin"></i> ${result.governorate}</p>
                            <span class="result-category">${result.data.category || 'Tourism'}</span>
                        </div>
                        <i class="fas fa-chevron-right"></i>
                    </div>
                `;
            }
        }).join('');

        // Add click handlers
        const resultItems = resultsList.querySelectorAll('.search-result-item');
        resultItems.forEach(item => {
            item.addEventListener('click', () => handleResultClick(item));
        });
    }
}

function handleResultClick(item) {
    const governorate = item.dataset.governorate;
    const place = item.dataset.place;

    // Close search modal
    const modal = document.getElementById('search-modal');
    if (modal) closeSearchModal(modal);

    // Navigate to explore section
    const exploreLink = document.querySelector('[data-section="explore"]');
    if (exploreLink) exploreLink.click();

    // If it's a specific place, you can highlight it or scroll to it
    // This requires the explore section to be initialized
    setTimeout(() => {
        if (place) {
            console.log(`Navigating to: ${place} in ${governorate}`);
            // You can implement highlighting or filtering here
        }
    }, 500);
}

function getCategoryIcon(category) {
    const icons = {
        'historical': 'landmark',
        'museum': 'building',
        'beach': 'umbrella-beach',
        'nature': 'tree',
        'religious': 'place-of-worship',
        'entertainment': 'gamepad',
        'shopping': 'shopping-bag',
        'restaurant': 'utensils'
    };
    return icons[category?.toLowerCase()] || 'map-marker-alt';
}

/* ==========================================
   UTILITY FUNCTIONS
   ========================================== */

function showError(element, message) {
    if (element) {
        element.textContent = message;
        element.className = 'auth-error show';
    }
}

function showSuccess(element, message) {
    if (element) {
        element.textContent = message;
        element.className = 'auth-error show success';
    }
}

/* ==========================================
   EXPORTS
   ========================================== */

export { currentUser, currentUserData, getCurrentUser };
