/* ==========================================
   DISCOVER EGYPT - SIMPLE AUTH SYSTEM
   Based on working school project pattern
   ========================================== */

// ========== Firebase Config ==========
const firebaseConfig = {
    apiKey: "AIzaSyDdJHBy-Ai8MBQQgFJCsolOE1VvCPwWOCQ",
    authDomain: "discover-egypt-13ef7.firebaseapp.com",
    projectId: "discover-egypt-13ef7",
    storageBucket: "discover-egypt-13ef7.firebasestorage.app",
    messagingSenderId: "200252880261",
    appId: "1:200252880261:web:b24b6b09151830b82580ec",
    measurementId: "G-R46HC715KF"
};

// ========== Initialize Firebase ==========
let firebaseAvailable = false;
let auth = null;
let db = null;

try {
    if (typeof firebase !== 'undefined') {
        firebase.initializeApp(firebaseConfig);
        auth = firebase.auth();
        db = firebase.firestore();
        firebaseAvailable = true;
        console.log('✅ Firebase initialized');
    }
} catch (err) {
    console.warn('⚠️ Firebase init failed:', err);
    firebaseAvailable = false;
}

// ========== State ==========
let currentUser = null; // لا تسجيل دخول تلقائي - يبدأ المستخدم غير مسجل دخول

// ========== Demo Users ==========
const demoUsers = [
    {
        email: 'admin@discover-egypt.com',
        password: 'admin123',
        name: 'المدير',
        role: 'admin',
        avatar: '👨‍💼'
    },
    {
        email: 'user@discover-egypt.com',
        password: 'user123',
        name: 'مستخدم تجريبي',
        role: 'user',
        avatar: '👤'
    }
];

// ========== Initialize Auth UI ==========
export function initAuth() {
    console.log('🔐 Initializing Simple Auth System...');

    // Check for saved session ONLY on page load
    const savedUser = JSON.parse(localStorage.getItem('discover_egypt_user') || 'null');
    if (savedUser) {
        currentUser = savedUser;
        console.log('✅ Restored session:', currentUser.name);
    } else {
        console.log('👋 No saved session - user starts logged out');
    }

    // Render user area
    renderUserArea();

    // Setup event listeners
    setupLoginButton();
    setupLogoutButton();
    setupSearchButton();

    // Firebase auth observer
    if (firebaseAvailable && auth) {
        auth.onAuthStateChanged(handleAuthStateChange);
    }

    console.log('✅ Auth system ready');
}

// ========== User Area Rendering ==========
function renderUserArea() {
    // Desktop login button
    const loginBtn = document.getElementById('login-btn');
    const userMenu = document.getElementById('user-menu');

    // Mobile elements
    const mobileAuthItem = document.getElementById('mobile-auth-item');
    const mobileUserItem = document.getElementById('mobile-user-item');
    const mobileLogoutItem = document.getElementById('mobile-logout-item');

    if (currentUser) {
        // User is logged in
        console.log('👤 User logged in:', currentUser.name);

        // Desktop
        if (loginBtn) loginBtn.style.display = 'none';
        if (userMenu) {
            userMenu.style.display = 'block';

            const userName = document.getElementById('user-name');
            const userAvatar = document.getElementById('user-avatar');

            if (userName) userName.textContent = currentUser.name || currentUser.email;
            if (userAvatar) {
                userAvatar.src = currentUser.photoURL ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=4F46E5&color=fff`;
            }
        }

        // Mobile
        if (mobileAuthItem) mobileAuthItem.style.display = 'none';
        if (mobileUserItem) {
            mobileUserItem.style.display = 'block';
            const mobileName = document.getElementById('mobile-user-name');
            const mobileEmail = document.getElementById('mobile-user-email');
            const mobileAvatar = document.getElementById('mobile-user-avatar');

            if (mobileName) mobileName.textContent = currentUser.name || currentUser.email;
            if (mobileEmail) mobileEmail.textContent = currentUser.email;
            if (mobileAvatar) {
                mobileAvatar.src = currentUser.photoURL ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=4F46E5&color=fff`;
            }
        }
        if (mobileLogoutItem) mobileLogoutItem.style.display = 'block';

    } else {
        // User is logged out
        console.log('👋 No user logged in');

        // Desktop
        if (loginBtn) loginBtn.style.display = 'flex';
        if (userMenu) userMenu.style.display = 'none';

        // Mobile
        if (mobileAuthItem) mobileAuthItem.style.display = 'block';
        if (mobileUserItem) mobileUserItem.style.display = 'none';
        if (mobileLogoutItem) mobileLogoutItem.style.display = 'none';
    }
}

// ========== Setup Event Listeners ==========
function setupLoginButton() {
    const loginBtn = document.getElementById('login-btn');
    const mobileLoginBtn = document.getElementById('mobile-login-btn');

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            console.log('🖱️ Login button clicked');
            openLoginModal();
        });
    }

    if (mobileLoginBtn) {
        // Set initial content
        mobileLoginBtn.innerHTML = `
            <i class="fas fa-user"></i>
            <span data-translate="auth.login">Log in</span>
        `;
        mobileLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('📱 Mobile login clicked');
            openLoginModal();
        });
    }
}

function setupLogoutButton() {
    const logoutBtn = document.getElementById('logout-btn');
    const mobileLogoutBtn = document.getElementById('mobile-logout-btn');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    if (mobileLogoutBtn) {
        mobileLogoutBtn.addEventListener('click', handleLogout);
    }
}

function setupSearchButton() {
    const desktopSearch = document.getElementById('desktop-search-btn');
    const mobileSearch = document.getElementById('mobile-search-btn');

    if (desktopSearch) {
        desktopSearch.addEventListener('click', () => {
            console.log('🔍 Search clicked');
            openSearchModal();
        });
    }

    if (mobileSearch) {
        mobileSearch.addEventListener('click', () => {
            console.log('🔍 Mobile search clicked');
            openSearchModal();
        });
    }
}

// ========== Login Modal ==========
function openLoginModal() {
    const modal = createLoginModal();
    document.body.appendChild(modal);

    setTimeout(() => modal.classList.add('active'), 10);
    document.body.style.overflow = 'hidden';
}

function createLoginModal() {
    const modal = document.createElement('div');
    modal.className = 'auth-modal';
    modal.id = 'simple-auth-modal';

    modal.innerHTML = `
        <div class="auth-modal-overlay"></div>
        <div class="auth-modal-content">
            <button class="auth-modal-close">×</button>

            <h2 style="text-align: center; margin-bottom: 2rem;">تسجيل الدخول</h2>

            <div id="login-error" class="auth-error" style="display: none;"></div>

            <div class="form-group">
                <label>البريد الإلكتروني</label>
                <input type="email" id="auth-email" placeholder="example@email.com" />
            </div>

            <div class="form-group">
                <label>كلمة المرور</label>
                <input type="password" id="auth-password" placeholder="••••••••" />
            </div>

            <button class="auth-submit-btn" id="do-login">
                تسجيل الدخول
            </button>

            <div class="auth-divider">
                <span>أو</span>
            </div>

            <button class="google-btn" id="google-login-btn">
                <svg width="18" height="18" viewBox="0 0 18 18">
                    <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                    <path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z"/>
                    <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
                </svg>
                تسجيل الدخول بواسطة Google
            </button>

            <div class="note" style="margin-top: 1.5rem; padding: 1rem; background: rgba(99, 102, 241, 0.1); border-radius: 10px; font-size: 0.9rem;">
                <strong>حسابات تجريبية:</strong><br/>
                <strong>مدير:</strong> admin@discover-egypt.com / admin123<br/>
                <strong>مستخدم:</strong> user@discover-egypt.com / user123
            </div>
        </div>
    `;

    // Setup listeners
    const closeBtn = modal.querySelector('.auth-modal-close');
    const overlay = modal.querySelector('.auth-modal-overlay');
    const loginBtn = modal.querySelector('#do-login');
    const googleBtn = modal.querySelector('#google-login-btn');

    closeBtn.addEventListener('click', () => closeModal(modal));
    overlay.addEventListener('click', () => closeModal(modal));
    loginBtn.addEventListener('click', () => handleEmailLogin(modal));
    googleBtn.addEventListener('click', () => handleGoogleLogin(modal));

    return modal;
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => modal.remove(), 300);
}

// ========== Login Handlers ==========
async function handleEmailLogin(modal) {
    const email = document.getElementById('auth-email').value.trim();
    const password = document.getElementById('auth-password').value;
    const errorDiv = document.getElementById('login-error');
    const loginBtn = document.getElementById('do-login');

    if (!email || !password) {
        showError(errorDiv, 'الرجاء إدخال البريد الإلكتروني وكلمة المرور');
        return;
    }

    loginBtn.disabled = true;
    loginBtn.textContent = 'جاري تسجيل الدخول...';

    // Try Firebase first
    if (firebaseAvailable && auth) {
        try {
            await auth.signInWithEmailAndPassword(email, password);
            closeModal(modal);
            return;
        } catch (err) {
            console.log('Firebase login failed, trying demo accounts...');
        }
    }

    // Try demo accounts
    const user = demoUsers.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = {
            email: user.email,
            name: user.name,
            avatar: user.avatar,
            role: user.role,
            photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=4F46E5&color=fff`
        };
        localStorage.setItem('discover_egypt_user', JSON.stringify(currentUser));
        renderUserArea();
        closeModal(modal);
        console.log('✅ Login successful:', user.name);
    } else {
        showError(errorDiv, 'بيانات الدخول غير صحيحة');
        loginBtn.disabled = false;
        loginBtn.textContent = 'تسجيل الدخول';
    }
}

async function handleGoogleLogin(modal) {
    if (!firebaseAvailable || !auth) {
        alert('تسجيل الدخول بـ Google غير متاح. الرجاء استخدام الحسابات التجريبية.');
        return;
    }

    const provider = new firebase.auth.GoogleAuthProvider();
    try {
        await auth.signInWithPopup(provider);
        closeModal(modal);
    } catch (err) {
        console.error('Google login error:', err);
        const errorDiv = document.getElementById('login-error');
        showError(errorDiv, 'حدث خطأ في تسجيل الدخول بواسطة Google');
    }
}

async function handleLogout() {
    if (confirm('هل تريد تسجيل الخروج؟')) {
        if (firebaseAvailable && auth && auth.currentUser) {
            try {
                await auth.signOut();
            } catch (e) {
                console.warn('Sign out error:', e);
            }
        }

        currentUser = null;
        localStorage.removeItem('discover_egypt_user');
        renderUserArea();
        console.log('👋 Logged out');
    }
}

// ========== Firebase Auth Observer ==========
function handleAuthStateChange(fbUser) {
    if (fbUser && !currentUser) {
        // Only update if we don't already have a user (avoid duplication)
        currentUser = {
            uid: fbUser.uid,
            email: fbUser.email,
            name: fbUser.displayName || fbUser.email.split('@')[0],
            photoURL: fbUser.photoURL,
            role: fbUser.email.includes('admin') ? 'admin' : 'user'
        };
        localStorage.setItem('discover_egypt_user', JSON.stringify(currentUser));
        renderUserArea();
        console.log('✅ Firebase auth state changed - user logged in');
    } else if (!fbUser && currentUser && currentUser.uid) {
        // Firebase user logged out
        currentUser = null;
        localStorage.removeItem('discover_egypt_user');
        renderUserArea();
        console.log('👋 Firebase auth state changed - user logged out');
    }
}

// ========== Search Modal ==========
function openSearchModal() {
    const modal = createSearchModal();
    document.body.appendChild(modal);

    setTimeout(() => {
        modal.classList.add('active');
        const input = modal.querySelector('.search-input');
        if (input) input.focus();
    }, 10);
    document.body.style.overflow = 'hidden';
}

function createSearchModal() {
    const modal = document.createElement('div');
    modal.className = 'search-modal';
    modal.id = 'simple-search-modal';

    modal.innerHTML = `
        <div class="search-modal-overlay"></div>
        <div class="search-modal-content">
            <div class="search-header">
                <div class="search-input-wrapper">
                    <i class="fas fa-search"></i>
                    <input type="text" class="search-input" placeholder="ابحث عن وجهات، أماكن، أنشطة..." />
                </div>
                <button class="search-close-btn">×</button>
            </div>

            <div class="search-body">
                <div class="search-suggestions">
                    <h3>عمليات البحث الشائعة</h3>
                    <div class="suggestion-tags">
                        <button class="suggestion-tag" data-query="pyramids">
                            <i class="fas fa-landmark"></i> الأهرامات
                        </button>
                        <button class="suggestion-tag" data-query="luxor">
                            <i class="fas fa-monument"></i> الأقصر
                        </button>
                        <button class="suggestion-tag" data-query="red sea">
                            <i class="fas fa-water"></i> البحر الأحمر
                        </button>
                        <button class="suggestion-tag" data-query="cairo">
                            <i class="fas fa-city"></i> القاهرة
                        </button>
                        <button class="suggestion-tag" data-query="alexandria">
                            <i class="fas fa-umbrella-beach"></i> الإسكندرية
                        </button>
                    </div>
                </div>

                <div class="search-results" style="display: none;">
                    <h3>نتائج البحث</h3>
                    <div class="results-list"></div>
                </div>
            </div>
        </div>
    `;

    const closeBtn = modal.querySelector('.search-close-btn');
    const overlay = modal.querySelector('.search-modal-overlay');
    const searchInput = modal.querySelector('.search-input');
    const tags = modal.querySelectorAll('.suggestion-tag');

    closeBtn.addEventListener('click', () => closeModal(modal));
    overlay.addEventListener('click', () => closeModal(modal));

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        if (query.length >= 2) {
            performSearch(query, modal);
        }
    });

    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            const query = tag.dataset.query;
            searchInput.value = query;
            performSearch(query, modal);
        });
    });

    return modal;
}

async function performSearch(query, modal) {
    console.log('🔍 Searching for:', query);

    const suggestions = modal.querySelector('.search-suggestions');
    const results = modal.querySelector('.search-results');
    const resultsList = modal.querySelector('.results-list');

    suggestions.style.display = 'none';
    results.style.display = 'block';

    resultsList.innerHTML = '<div style="padding: 2rem; text-align: center;">جاري البحث...</div>';

    try {
        // Load places data
        const response = await fetch('data/places-enhanced.json');
        const data = await response.json();
        const places = data.places || [];

        // Search in places
        const searchTerm = query.toLowerCase();
        const currentLang = localStorage.getItem('language') || 'en';

        const filtered = places.filter(place => {
            const nameEn = (place.name || '').toLowerCase();
            const nameAr = (place.nameAr || '').toLowerCase();
            const nameFr = (place.nameFr || '').toLowerCase();
            const governorate = (place.governorate || '').toLowerCase();
            const category = (place.category || '').toLowerCase();

            return nameEn.includes(searchTerm) ||
                   nameAr.includes(searchTerm) ||
                   nameFr.includes(searchTerm) ||
                   governorate.includes(searchTerm) ||
                   category.includes(searchTerm);
        });

        if (filtered.length > 0) {
            resultsList.innerHTML = filtered.slice(0, 8).map(place => {
                const name = currentLang === 'ar' ? place.nameAr :
                            currentLang === 'fr' ? place.nameFr : place.name;
                const desc = currentLang === 'ar' ? place.descriptionAr :
                            currentLang === 'fr' ? place.descriptionFr : place.description;

                return `
                    <div class="search-result-item" style="
                        padding: 1rem;
                        border-bottom: 1px solid var(--border-color);
                        cursor: pointer;
                        transition: background 0.2s;
                    " onmouseover="this.style.background='var(--bg-secondary)'"
                       onmouseout="this.style.background='transparent'"
                       onclick="navigateToPlace('${place.id}')">
                        <div style="display: flex; gap: 1rem; align-items: center;">
                            <img src="${place.image}" alt="${name}"
                                 style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
                            <div style="flex: 1;">
                                <h4 style="margin: 0 0 0.25rem 0; font-size: 1rem;">${name}</h4>
                                <p style="margin: 0; font-size: 0.875rem; color: var(--text-secondary);
                                          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                                    ${desc.substring(0, 80)}...
                                </p>
                                <div style="display: flex; gap: 1rem; margin-top: 0.5rem; font-size: 0.75rem;">
                                    <span style="color: var(--primary-color);">
                                        <i class="fas fa-map-marker-alt"></i> ${place.governorate}
                                    </span>
                                    <span style="color: var(--text-secondary);">
                                        <i class="fas fa-star"></i> ${place.rating}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        } else {
            resultsList.innerHTML = `
                <div style="padding: 3rem; text-align: center; color: var(--text-secondary);">
                    <i class="fas fa-search" style="font-size: 3rem; opacity: 0.3; margin-bottom: 1rem;"></i>
                    <p>لم يتم العثور على نتائج لـ "${query}"</p>
                    <p style="font-size: 0.875rem; margin-top: 0.5rem;">حاول البحث عن الأهرامات، الأقصر، البحر الأحمر...</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Search error:', error);
        resultsList.innerHTML = `
            <div style="padding: 2rem; text-align: center; color: var(--text-secondary);">
                <i class="fas fa-exclamation-circle" style="font-size: 3rem; opacity: 0.3; margin-bottom: 1rem;"></i>
                <p>حدث خطأ في البحث</p>
            </div>
        `;
    }
}

// Navigate to place (helper function)
function navigateToPlace(placeId) {
    // Close search modal
    const modal = document.getElementById('simple-search-modal');
    if (modal) {
        closeModal(modal);
    }

    // Navigate to explore section and filter by place
    const exploreLink = document.querySelector('[data-section="explore"]');
    if (exploreLink) {
        exploreLink.click();

        // Scroll to the place card
        setTimeout(() => {
            const placeCard = document.querySelector(`[data-place-id="${placeId}"]`);
            if (placeCard) {
                placeCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                placeCard.style.animation = 'highlight 1s ease';
            }
        }, 300);
    }
}

// Make navigateToPlace available globally
window.navigateToPlace = navigateToPlace;

// ========== Utility Functions ==========
function showError(element, message) {
    if (element) {
        element.textContent = message;
        element.style.display = 'block';
        element.style.color = '#ef4444';
        element.style.padding = '0.75rem';
        element.style.marginBottom = '1rem';
        element.style.background = 'rgba(239, 68, 68, 0.1)';
        element.style.borderRadius = '8px';
    }
}

// ========== Get Current User ==========
export function getCurrentUser() {
    return currentUser;
}

export function isLoggedIn() {
    return currentUser !== null;
}
