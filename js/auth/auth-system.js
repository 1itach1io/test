/* ==========================================
   DISCOVER EGYPT - AUTH SYSTEM
   نظام تسجيل الدخول المحسّن
   ========================================== */

// ========== Translation System ==========
const authTranslations = {
    en: {
        login: "Login",
        signup: "Sign Up",
        logout: "Logout",
        email: "Email",
        password: "Password",
        name: "Full Name",
        forgotPassword: "Forgot Password?",
        dontHaveAccount: "Don't have an account?",
        haveAccount: "Already have an account?",
        loginButton: "Login",
        signupButton: "Sign Up",
        loginWithGoogle: "Continue with Google",
        or: "OR",
        welcome: "Welcome back!",
        createAccount: "Create your account",
        favorites: "Favorites",
        settings: "Settings",
        profile: "Profile",
        emailRequired: "Email is required",
        passwordRequired: "Password is required",
        nameRequired: "Name is required",
        invalidEmail: "Invalid email format",
        passwordLength: "Password must be at least 6 characters",
        loginSuccess: "Login successful!",
        signupSuccess: "Account created successfully!",
        loginError: "Login failed. Please check your credentials.",
        signupError: "Sign up failed. Please try again.",
        logoutSuccess: "Logged out successfully"
    },
    ar: {
        login: "تسجيل الدخول",
        signup: "إنشاء حساب",
        logout: "تسجيل الخروج",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        name: "الاسم الكامل",
        forgotPassword: "نسيت كلمة المرور؟",
        dontHaveAccount: "ليس لديك حساب؟",
        haveAccount: "لديك حساب بالفعل؟",
        loginButton: "دخول",
        signupButton: "إنشاء حساب",
        loginWithGoogle: "المتابعة مع جوجل",
        or: "أو",
        welcome: "مرحباً بعودتك!",
        createAccount: "أنشئ حسابك",
        favorites: "المفضلة",
        settings: "الإعدادات",
        profile: "الملف الشخصي",
        emailRequired: "البريد الإلكتروني مطلوب",
        passwordRequired: "كلمة المرور مطلوبة",
        nameRequired: "الاسم مطلوب",
        invalidEmail: "صيغة البريد الإلكتروني غير صحيحة",
        passwordLength: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
        loginSuccess: "تم تسجيل الدخول بنجاح!",
        signupSuccess: "تم إنشاء الحساب بنجاح!",
        loginError: "فشل تسجيل الدخول. تحقق من بياناتك.",
        signupError: "فشل إنشاء الحساب. حاول مرة أخرى.",
        logoutSuccess: "تم تسجيل الخروج بنجاح"
    },
    fr: {
        login: "Connexion",
        signup: "S'inscrire",
        logout: "Déconnexion",
        email: "Email",
        password: "Mot de passe",
        name: "Nom complet",
        forgotPassword: "Mot de passe oublié?",
        dontHaveAccount: "Vous n'avez pas de compte?",
        haveAccount: "Vous avez déjà un compte?",
        loginButton: "Se connecter",
        signupButton: "S'inscrire",
        loginWithGoogle: "Continuer avec Google",
        or: "OU",
        welcome: "Bon retour!",
        createAccount: "Créez votre compte",
        favorites: "Favoris",
        settings: "Paramètres",
        profile: "Profil",
        emailRequired: "L'email est requis",
        passwordRequired: "Le mot de passe est requis",
        nameRequired: "Le nom est requis",
        invalidEmail: "Format d'email invalide",
        passwordLength: "Le mot de passe doit contenir au moins 6 caractères",
        loginSuccess: "Connexion réussie!",
        signupSuccess: "Compte créé avec succès!",
        loginError: "Échec de la connexion. Vérifiez vos identifiants.",
        signupError: "Échec de l'inscription. Veuillez réessayer.",
        logoutSuccess: "Déconnexion réussie"
    }
};

// ========== Get Translation ==========
function getAuthTranslation(key) {
    const lang = localStorage.getItem('language') || 'en';
    return authTranslations[lang][key] || authTranslations.en[key];
}

// ========== Firebase Configuration ==========
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
let auth = null;
let db = null;
let currentUser = null;

try {
    if (typeof firebase !== 'undefined') {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        auth = firebase.auth();
        db = firebase.firestore();
        console.log('✅ Firebase initialized');
    }
} catch (err) {
    console.warn('⚠️ Firebase init failed:', err);
}

// ========== Auth State Observer ==========
function initAuthStateObserver() {
    if (!auth) return;
    
    auth.onAuthStateChanged((user) => {
        currentUser = user;
        updateAuthUI(user);
        
        if (user) {
            console.log('✅ User logged in:', user.email);
            loadUserFavorites(user.uid);
        } else {
            console.log('ℹ️ No user logged in');
        }
    });
}

// ========== Update Auth UI ==========
function updateAuthUI(user) {
    const authButtons = document.getElementById('auth-buttons');
    const userMenu = document.getElementById('user-menu');
    const authMobileItem = document.getElementById('auth-mobile-item');
    
    if (user) {
        // User is logged in
        if (authButtons) authButtons.style.display = 'none';
        if (userMenu) {
            userMenu.style.display = 'flex';
            const userName = document.getElementById('user-name');
            if (userName) {
                userName.textContent = user.displayName || user.email.split('@')[0];
            }
        }
        if (authMobileItem) authMobileItem.style.display = 'none';
    } else {
        // User is logged out
        if (authButtons) authButtons.style.display = 'flex';
        if (userMenu) userMenu.style.display = 'none';
        if (authMobileItem) authMobileItem.style.display = 'block';
    }
}

// ========== Login with Email ==========
async function loginWithEmail(email, password) {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        showMessage(getAuthTranslation('loginSuccess'), 'success');
        return userCredential.user;
    } catch (error) {
        console.error('Login error:', error);
        showMessage(getAuthTranslation('loginError'), 'error');
        throw error;
    }
}

// ========== Sign Up with Email ==========
async function signUpWithEmail(email, password, name) {
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        
        // Update profile with name
        await userCredential.user.updateProfile({
            displayName: name
        });
        
        showMessage(getAuthTranslation('signupSuccess'), 'success');
        return userCredential.user;
    } catch (error) {
        console.error('Signup error:', error);
        showMessage(getAuthTranslation('signupError'), 'error');
        throw error;
    }
}

// ========== Login with Google ==========
async function loginWithGoogle() {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await auth.signInWithPopup(provider);
        showMessage(getAuthTranslation('loginSuccess'), 'success');
        return result.user;
    } catch (error) {
        console.error('Google login error:', error);
        showMessage(getAuthTranslation('loginError'), 'error');
        throw error;
    }
}

// ========== Logout ==========
async function logout() {
    try {
        await auth.signOut();
        showMessage(getAuthTranslation('logoutSuccess'), 'success');
        
        // Redirect to home if on login page
        if (window.location.pathname.includes('login.html')) {
            window.location.href = 'index.html';
        }
    } catch (error) {
        console.error('Logout error:', error);
    }
}

// ========== Show Message ==========
function showMessage(message, type = 'info') {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `auth-message auth-message-${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        font-size: 14px;
        max-width: 300px;
    `;
    
    document.body.appendChild(messageDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}

// ========== Favorites Management ==========
let userFavorites = [];

async function loadUserFavorites(userId) {
    if (!db) return;
    
    try {
        const doc = await db.collection('favorites').doc(userId).get();
        if (doc.exists) {
            userFavorites = doc.data().places || [];
            updateFavoritesUI();
        }
    } catch (error) {
        console.error('Error loading favorites:', error);
    }
}

async function toggleFavorite(placeId) {
    if (!currentUser) {
        showMessage('Please login to save favorites', 'error');
        return;
    }
    
    const index = userFavorites.indexOf(placeId);
    
    if (index > -1) {
        userFavorites.splice(index, 1);
    } else {
        userFavorites.push(placeId);
    }
    
    // Save to Firestore
    try {
        await db.collection('favorites').doc(currentUser.uid).set({
            places: userFavorites
        });
        updateFavoritesUI();
    } catch (error) {
        console.error('Error saving favorite:', error);
    }
}

function updateFavoritesUI() {
    // Update favorite buttons
    document.querySelectorAll('[data-place-id]').forEach(btn => {
        const placeId = btn.getAttribute('data-place-id');
        if (userFavorites.includes(placeId)) {
            btn.classList.add('favorited');
        } else {
            btn.classList.remove('favorited');
        }
    });
}

// ========== Initialize ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔐 Auth system initializing...');
    initAuthStateObserver();
    
    // Setup logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }
});

// Export functions for use in other files
if (typeof window !== 'undefined') {
    window.authSystem = {
        loginWithEmail,
        signUpWithEmail,
        loginWithGoogle,
        logout,
        toggleFavorite,
        getAuthTranslation,
        getCurrentUser: () => currentUser,
        getFavorites: () => userFavorites
    };
}
