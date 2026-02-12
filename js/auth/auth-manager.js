/**
 * Authentication Manager
 * ======================
 * Enterprise-grade authentication system
 * Handles login, signup, password reset, and session management
 */

class AuthManager {
  constructor() {
    this.auth = window.firebaseAuth;
    this.db = window.firebaseDB;
    this.currentUser = null;
    this.authStateListeners = [];

    // Initialize auth state listener
    this.initAuthListener();
  }

  /**
   * Initialize authentication state listener
   */
  initAuthListener() {
    this.auth.onAuthStateChanged(async (user) => {
      this.currentUser = user;

      if (user) {
        // User is signed in
        await this.handleUserSignedIn(user);
      } else {
        // User is signed out
        this.handleUserSignedOut();
      }

      // Notify all listeners
      this.notifyAuthStateChange(user);
    });
  }

  /**
   * Handle user signed in
   */
  async handleUserSignedIn(user) {
    try {
      // Update last login
      await this.updateUserLastLogin(user.uid);

      // Track login activity
      if (window.activityTracker) {
        await window.activityTracker.trackLogin('session_restored', {
          email: user.email,
          provider: user.providerData[0]?.providerId
        });
      }

      console.log('✅ User signed in:', user.email);
    } catch (error) {
      console.error('Error handling sign in:', error);
    }
  }

  /**
   * Handle user signed out
   */
  handleUserSignedOut() {
    this.currentUser = null;
    console.log('👋 User signed out');
  }

  /**
   * Register auth state listener
   */
  onAuthStateChanged(callback) {
    this.authStateListeners.push(callback);
    // Immediately call with current state
    callback(this.currentUser);
  }

  /**
   * Notify all listeners of auth state change
   */
  notifyAuthStateChange(user) {
    this.authStateListeners.forEach(listener => {
      try {
        listener(user);
      } catch (error) {
        console.error('Error in auth state listener:', error);
      }
    });
  }

  /**
   * Sign up with email and password
   */
  async signupWithEmail(email, password, fullName) {
    try {
      // Input validation
      this.validateEmail(email);
      this.validatePassword(password);
      this.validateFullName(fullName);

      // Create user account
      const userCredential = await this.auth.createUserWithEmailAndPassword(
        email,
        password
      );

      const user = userCredential.user;

      // Update display name
      await user.updateProfile({
        displayName: fullName
      });

      // Create user document in Firestore
      await this.createUserDocument(user, {
        displayName: fullName,
        provider: 'email'
      });

      // Track signup activity
      if (window.activityTracker) {
        await window.activityTracker.trackSignup('email', {
          email: user.email
        });
      }

      return {
        success: true,
        user: user,
        message: window.i18n.t('auth.signupSuccess')
      };

    } catch (error) {
      console.error('Signup error:', error);
      return {
        success: false,
        error: this.getErrorMessage(error)
      };
    }
  }

  /**
   * Login with email and password
   */
  async loginWithEmail(email, password) {
    try {
      // Input validation
      this.validateEmail(email);
      this.validatePassword(password);

      // Sign in
      const userCredential = await this.auth.signInWithEmailAndPassword(
        email,
        password
      );

      const user = userCredential.user;

      // Update last login
      await this.updateUserLastLogin(user.uid);

      // Track login activity
      if (window.activityTracker) {
        await window.activityTracker.trackLogin('email', {
          email: user.email
        });
      }

      return {
        success: true,
        user: user,
        message: window.i18n.t('auth.loginSuccess')
      };

    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: this.getErrorMessage(error)
      };
    }
  }

  /**
   * Login with Google
   */
  async loginWithGoogle() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');

      const result = await this.auth.signInWithPopup(provider);
      const user = result.user;

      // Check if this is a new user
      const isNewUser = result.additionalUserInfo?.isNewUser;

      if (isNewUser) {
        // Create user document for new users
        await this.createUserDocument(user, {
          provider: 'google'
        });

        // Track signup
        if (window.activityTracker) {
          await window.activityTracker.trackSignup('google', {
            email: user.email
          });
        }
      } else {
        // Update last login for existing users
        await this.updateUserLastLogin(user.uid);

        // Track login
        if (window.activityTracker) {
          await window.activityTracker.trackLogin('google', {
            email: user.email
          });
        }
      }

      return {
        success: true,
        user: user,
        isNewUser: isNewUser,
        message: isNewUser
          ? window.i18n.t('auth.signupSuccess')
          : window.i18n.t('auth.loginSuccess')
      };

    } catch (error) {
      console.error('Google login error:', error);

      // Handle popup closed
      if (error.code === 'auth/popup-closed-by-user') {
        return {
          success: false,
          error: window.i18n.t('auth.auth/popup-closed-by-user'),
          cancelled: true
        };
      }

      return {
        success: false,
        error: this.getErrorMessage(error)
      };
    }
  }

  /**
   * Send password reset email
   */
  async resetPassword(email) {
    try {
      this.validateEmail(email);

      await this.auth.sendPasswordResetEmail(email);

      // Track password reset
      if (window.activityTracker) {
        await window.activityTracker.trackPasswordReset(email);
      }

      return {
        success: true,
        message: window.i18n.t('auth.resetEmailSent')
      };

    } catch (error) {
      console.error('Password reset error:', error);
      return {
        success: false,
        error: this.getErrorMessage(error)
      };
    }
  }

  /**
   * Logout
   */
  async logout() {
    try {
      // Track logout before signing out
      if (window.activityTracker) {
        await window.activityTracker.trackLogout();
      }

      await this.auth.signOut();

      return {
        success: true,
        message: window.i18n.t('auth.logoutSuccess')
      };

    } catch (error) {
      console.error('Logout error:', error);
      return {
        success: false,
        error: this.getErrorMessage(error)
      };
    }
  }

  /**
   * Create user document in Firestore
   */
  async createUserDocument(user, additionalData = {}) {
    try {
      const userRef = this.db.collection('users').doc(user.uid);

      // Check if document already exists
      const doc = await userRef.get();
      if (doc.exists) {
        console.log('User document already exists');
        return;
      }

      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: additionalData.displayName || user.displayName || '',
        photoURL: user.photoURL || null,
        provider: additionalData.provider || 'email',
        language: window.i18n.getCurrentLanguage(),

        // Timestamps
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        lastLogin: firebase.firestore.FieldValue.serverTimestamp(),

        // Stats (will be updated over time)
        stats: {
          plansCreated: 0,
          favoritesCount: 0,
          chatsCount: 0
        },

        // Preferences
        preferences: {
          theme: 'light',
          notifications: true
        }
      };

      await userRef.set(userData);
      console.log('✅ User document created');

    } catch (error) {
      console.error('Error creating user document:', error);
      throw error;
    }
  }

  /**
   * Update user's last login timestamp
   */
  async updateUserLastLogin(uid) {
    try {
      const userRef = this.db.collection('users').doc(uid);
      await userRef.update({
        lastLogin: firebase.firestore.FieldValue.serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating last login:', error);
    }
  }

  /**
   * Get user document from Firestore
   */
  async getUserDocument(uid) {
    try {
      const userRef = this.db.collection('users').doc(uid);
      const doc = await userRef.get();

      if (doc.exists) {
        return {
          id: doc.id,
          ...doc.data()
        };
      }
      return null;

    } catch (error) {
      console.error('Error getting user document:', error);
      return null;
    }
  }

  /**
   * Update user profile
   */
  async updateUserProfile(updates) {
    try {
      const user = this.auth.currentUser;
      if (!user) {
        throw new Error('No user signed in');
      }

      // Update Firebase Auth profile
      if (updates.displayName || updates.photoURL) {
        await user.updateProfile({
          displayName: updates.displayName,
          photoURL: updates.photoURL
        });
      }

      // Update Firestore document
      const userRef = this.db.collection('users').doc(user.uid);
      await userRef.update(updates);

      return { success: true };

    } catch (error) {
      console.error('Error updating profile:', error);
      return {
        success: false,
        error: this.getErrorMessage(error)
      };
    }
  }

  /**
   * Increment user stat
   */
  async incrementUserStat(statName, incrementBy = 1) {
    try {
      const user = this.auth.currentUser;
      if (!user) return;

      const userRef = this.db.collection('users').doc(user.uid);
      await userRef.update({
        [`stats.${statName}`]: firebase.firestore.FieldValue.increment(incrementBy)
      });

    } catch (error) {
      console.error('Error incrementing stat:', error);
    }
  }

  /**
   * Input validation methods
   */
  validateEmail(email) {
    if (!email) {
      throw new Error(window.i18n.t('auth.emailRequired'));
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error(window.i18n.t('auth.emailInvalid'));
    }
  }

  validatePassword(password) {
    if (!password) {
      throw new Error(window.i18n.t('auth.passwordRequired'));
    }

    if (password.length < 6) {
      throw new Error(window.i18n.t('auth.passwordTooShort'));
    }
  }

  validateFullName(name) {
    if (!name || name.trim().length === 0) {
      throw new Error(window.i18n.t('auth.fullNameRequired'));
    }
  }

  /**
   * Get user-friendly error message
   */
  getErrorMessage(error) {
    const errorCode = error.code;

    // Try to get translated error message
    const translatedError = window.i18n.t(`auth.${errorCode}`);

    // If translation exists and is different from the key, use it
    if (translatedError && translatedError !== `auth.${errorCode}`) {
      return translatedError;
    }

    // Otherwise return the error message
    return error.message || 'An error occurred';
  }

  /**
   * Calculate password strength
   */
  calculatePasswordStrength(password) {
    if (!password) return { score: 0, label: '' };

    let score = 0;

    // Length check
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;

    // Character variety
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    // Determine label
    let label;
    if (score <= 2) {
      label = window.i18n.t('auth.weak');
    } else if (score <= 3) {
      label = window.i18n.t('auth.medium');
    } else if (score <= 5) {
      label = window.i18n.t('auth.strong');
    } else {
      label = window.i18n.t('auth.veryStrong');
    }

    return {
      score: Math.min(score, 6),
      label: label,
      percentage: Math.min((score / 6) * 100, 100)
    };
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return !!this.currentUser;
  }

  /**
   * Get current user
   */
  getCurrentUser() {
    return this.currentUser;
  }
}

// Create global instance
window.authManager = new AuthManager();
