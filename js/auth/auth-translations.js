/**
 * Internationalization (i18n) System
 * ==================================
 * Multi-language support: Arabic (RTL), English (LTR), French (LTR)
 * Enterprise-grade translation management
 */

const translations = {
  // ============================================
  // ARABIC (العربية)
  // ============================================
  ar: {
    direction: 'rtl',
    auth: {
      // Titles
      login: 'تسجيل الدخول',
      signup: 'إنشاء حساب',
      forgotPassword: 'نسيت كلمة المرور',
      resetPassword: 'إعادة تعيين كلمة المرور',

      // Form Labels
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      fullName: 'الاسم الكامل',

      // Placeholders
      emailPlaceholder: 'أدخل بريدك الإلكتروني',
      passwordPlaceholder: 'أدخل كلمة المرور',
      confirmPasswordPlaceholder: 'أعد إدخال كلمة المرور',
      fullNamePlaceholder: 'أدخل اسمك الكامل',

      // Buttons
      loginButton: 'تسجيل الدخول',
      signupButton: 'إنشاء حساب',
      googleLogin: 'تسجيل الدخول بواسطة Google',
      resetPasswordButton: 'إرسال رابط إعادة التعيين',
      backToLogin: 'العودة لتسجيل الدخول',
      logout: 'تسجيل الخروج',

      // Links
      noAccount: 'ليس لديك حساب؟',
      haveAccount: 'لديك حساب بالفعل؟',
      forgotPasswordLink: 'نسيت كلمة المرور؟',

      // Messages
      loading: 'جارٍ التحميل...',
      processing: 'جارٍ المعالجة...',
      checkEmail: 'تفقد بريدك الإلكتروني',

      // Success Messages
      loginSuccess: 'تم تسجيل الدخول بنجاح!',
      signupSuccess: 'تم إنشاء الحساب بنجاح!',
      resetEmailSent: 'تم إرسال رابط إعادة التعيين إلى بريدك الإلكتروني',
      logoutSuccess: 'تم تسجيل الخروج بنجاح',

      // Error Messages
      emailRequired: 'البريد الإلكتروني مطلوب',
      emailInvalid: 'البريد الإلكتروني غير صالح',
      passwordRequired: 'كلمة المرور مطلوبة',
      passwordTooShort: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
      passwordMismatch: 'كلمات المرور غير متطابقة',
      fullNameRequired: 'الاسم الكامل مطلوب',

      // Firebase Error Messages
      'auth/email-already-in-use': 'البريد الإلكتروني مستخدم بالفعل',
      'auth/invalid-email': 'البريد الإلكتروني غير صالح',
      'auth/operation-not-allowed': 'العملية غير مسموحة',
      'auth/weak-password': 'كلمة المرور ضعيفة جداً',
      'auth/user-disabled': 'تم تعطيل هذا الحساب',
      'auth/user-not-found': 'لم يتم العثور على المستخدم',
      'auth/wrong-password': 'كلمة المرور غير صحيحة',
      'auth/too-many-requests': 'محاولات كثيرة جداً. حاول لاحقاً',
      'auth/network-request-failed': 'خطأ في الاتصال بالإنترنت',
      'auth/popup-closed-by-user': 'تم إغلاق النافذة المنبثقة',
      'auth/cancelled-popup-request': 'تم إلغاء الطلب',

      // Password Strength
      passwordStrength: 'قوة كلمة المرور',
      weak: 'ضعيفة',
      medium: 'متوسطة',
      strong: 'قوية',
      veryStrong: 'قوية جداً',

      // Terms
      agreeToTerms: 'بإنشاء حساب، أنت توافق على',
      termsOfService: 'شروط الخدمة',
      privacyPolicy: 'سياسة الخصوصية',
      and: 'و'
    },

    // General UI
    ui: {
      close: 'إغلاق',
      cancel: 'إلغاء',
      confirm: 'تأكيد',
      save: 'حفظ',
      delete: 'حذف',
      edit: 'تعديل',
      welcome: 'مرحباً',
      profile: 'الملف الشخصي'
    }
  },

  // ============================================
  // ENGLISH
  // ============================================
  en: {
    direction: 'ltr',
    auth: {
      // Titles
      login: 'Login',
      signup: 'Sign Up',
      forgotPassword: 'Forgot Password',
      resetPassword: 'Reset Password',

      // Form Labels
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      fullName: 'Full Name',

      // Placeholders
      emailPlaceholder: 'Enter your email',
      passwordPlaceholder: 'Enter your password',
      confirmPasswordPlaceholder: 'Re-enter your password',
      fullNamePlaceholder: 'Enter your full name',

      // Buttons
      loginButton: 'Login',
      signupButton: 'Sign Up',
      googleLogin: 'Continue with Google',
      resetPasswordButton: 'Send Reset Link',
      backToLogin: 'Back to Login',
      logout: 'Logout',

      // Links
      noAccount: "Don't have an account?",
      haveAccount: 'Already have an account?',
      forgotPasswordLink: 'Forgot password?',

      // Messages
      loading: 'Loading...',
      processing: 'Processing...',
      checkEmail: 'Check your email',

      // Success Messages
      loginSuccess: 'Successfully logged in!',
      signupSuccess: 'Account created successfully!',
      resetEmailSent: 'Password reset link sent to your email',
      logoutSuccess: 'Successfully logged out',

      // Error Messages
      emailRequired: 'Email is required',
      emailInvalid: 'Invalid email address',
      passwordRequired: 'Password is required',
      passwordTooShort: 'Password must be at least 6 characters',
      passwordMismatch: 'Passwords do not match',
      fullNameRequired: 'Full name is required',

      // Firebase Error Messages
      'auth/email-already-in-use': 'Email is already in use',
      'auth/invalid-email': 'Invalid email address',
      'auth/operation-not-allowed': 'Operation not allowed',
      'auth/weak-password': 'Password is too weak',
      'auth/user-disabled': 'This account has been disabled',
      'auth/user-not-found': 'User not found',
      'auth/wrong-password': 'Incorrect password',
      'auth/too-many-requests': 'Too many attempts. Try again later',
      'auth/network-request-failed': 'Network connection error',
      'auth/popup-closed-by-user': 'Popup closed by user',
      'auth/cancelled-popup-request': 'Request cancelled',

      // Password Strength
      passwordStrength: 'Password Strength',
      weak: 'Weak',
      medium: 'Medium',
      strong: 'Strong',
      veryStrong: 'Very Strong',

      // Terms
      agreeToTerms: 'By signing up, you agree to our',
      termsOfService: 'Terms of Service',
      privacyPolicy: 'Privacy Policy',
      and: 'and'
    },

    // General UI
    ui: {
      close: 'Close',
      cancel: 'Cancel',
      confirm: 'Confirm',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      welcome: 'Welcome',
      profile: 'Profile'
    }
  },

  // ============================================
  // FRENCH (Français)
  // ============================================
  fr: {
    direction: 'ltr',
    auth: {
      // Titles
      login: 'Connexion',
      signup: 'Inscription',
      forgotPassword: 'Mot de passe oublié',
      resetPassword: 'Réinitialiser le mot de passe',

      // Form Labels
      email: 'Email',
      password: 'Mot de passe',
      confirmPassword: 'Confirmer le mot de passe',
      fullName: 'Nom complet',

      // Placeholders
      emailPlaceholder: 'Entrez votre email',
      passwordPlaceholder: 'Entrez votre mot de passe',
      confirmPasswordPlaceholder: 'Ressaisissez votre mot de passe',
      fullNamePlaceholder: 'Entrez votre nom complet',

      // Buttons
      loginButton: 'Se connecter',
      signupButton: "S'inscrire",
      googleLogin: 'Continuer avec Google',
      resetPasswordButton: 'Envoyer le lien',
      backToLogin: 'Retour à la connexion',
      logout: 'Déconnexion',

      // Links
      noAccount: "Vous n'avez pas de compte?",
      haveAccount: 'Vous avez déjà un compte?',
      forgotPasswordLink: 'Mot de passe oublié?',

      // Messages
      loading: 'Chargement...',
      processing: 'Traitement...',
      checkEmail: 'Vérifiez votre email',

      // Success Messages
      loginSuccess: 'Connexion réussie!',
      signupSuccess: 'Compte créé avec succès!',
      resetEmailSent: 'Lien de réinitialisation envoyé à votre email',
      logoutSuccess: 'Déconnexion réussie',

      // Error Messages
      emailRequired: "L'email est requis",
      emailInvalid: 'Adresse email invalide',
      passwordRequired: 'Le mot de passe est requis',
      passwordTooShort: 'Le mot de passe doit contenir au moins 6 caractères',
      passwordMismatch: 'Les mots de passe ne correspondent pas',
      fullNameRequired: 'Le nom complet est requis',

      // Firebase Error Messages
      'auth/email-already-in-use': 'Cet email est déjà utilisé',
      'auth/invalid-email': 'Adresse email invalide',
      'auth/operation-not-allowed': 'Opération non autorisée',
      'auth/weak-password': 'Mot de passe trop faible',
      'auth/user-disabled': 'Ce compte a été désactivé',
      'auth/user-not-found': 'Utilisateur non trouvé',
      'auth/wrong-password': 'Mot de passe incorrect',
      'auth/too-many-requests': 'Trop de tentatives. Réessayez plus tard',
      'auth/network-request-failed': 'Erreur de connexion réseau',
      'auth/popup-closed-by-user': 'Popup fermée par l\'utilisateur',
      'auth/cancelled-popup-request': 'Demande annulée',

      // Password Strength
      passwordStrength: 'Force du mot de passe',
      weak: 'Faible',
      medium: 'Moyen',
      strong: 'Fort',
      veryStrong: 'Très fort',

      // Terms
      agreeToTerms: 'En vous inscrivant, vous acceptez nos',
      termsOfService: "Conditions d'utilisation",
      privacyPolicy: 'Politique de confidentialité',
      and: 'et'
    },

    // General UI
    ui: {
      close: 'Fermer',
      cancel: 'Annuler',
      confirm: 'Confirmer',
      save: 'Enregistrer',
      delete: 'Supprimer',
      edit: 'Modifier',
      welcome: 'Bienvenue',
      profile: 'Profil'
    }
  }
};

/**
 * i18n Manager Class
 * Handles language switching and text translation
 */
class I18nManager {
  constructor() {
    this.currentLanguage = this.detectLanguage();
    this.translations = translations;
  }

  /**
   * Detect user's preferred language
   * Priority: localStorage > browser language > default (en)
   */
  detectLanguage() {
    const saved = localStorage.getItem('preferredLanguage');
    if (saved && translations[saved]) {
      return saved;
    }

    const browserLang = navigator.language.split('-')[0];
    return translations[browserLang] ? browserLang : 'en';
  }

  /**
   * Set current language
   */
  setLanguage(lang) {
    if (!translations[lang]) {
      console.warn(`Language ${lang} not found, using English`);
      lang = 'en';
    }

    this.currentLanguage = lang;
    localStorage.setItem('preferredLanguage', lang);

    // Update document direction and lang attribute
    document.documentElement.dir = translations[lang].direction;
    document.documentElement.lang = lang;

    // Dispatch custom event for language change
    window.dispatchEvent(new CustomEvent('languageChanged', {
      detail: { language: lang }
    }));
  }

  /**
   * Get translation for a key
   * Supports nested keys like "auth.login"
   */
  t(key) {
    const keys = key.split('.');
    let value = this.translations[this.currentLanguage];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  }

  /**
   * Get current language code
   */
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  /**
   * Get current direction (rtl/ltr)
   */
  getDirection() {
    return translations[this.currentLanguage].direction;
  }

  /**
   * Get all available languages
   */
  getAvailableLanguages() {
    return Object.keys(translations);
  }
}

// Create global instance
window.i18n = new I18nManager();
