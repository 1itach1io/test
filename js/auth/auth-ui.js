/**
 * Authentication UI Manager
 * =========================
 * Handles all UI interactions for authentication
 * Modal management, form validation, and user feedback
 */

class AuthUI {
  constructor() {
    this.modal = null;
    this.currentView = 'login'; // login, signup, forgot
    this.isProcessing = false;
    
    this.init();
  }
  
  /**
   * Initialize UI
   */
  init() {
    // Listen for auth state changes
    window.authManager.onAuthStateChanged((user) => {
      this.updateUIForAuthState(user);
    });
    
    // Listen for language changes
    window.addEventListener('languageChanged', () => {
      this.updateLanguage();
    });
  }
  
  /**
   * Show authentication modal
   */
  showAuthModal(initialView = 'login') {
    this.currentView = initialView;
    this.createModal();
    this.renderView();
    this.attachEventListeners();
  }
  
  /**
   * Create modal structure
   */
  createModal() {
    // Remove existing modal if any
    this.closeModal();
    
    const modalHTML = `
      <div class="auth-modal-overlay" id="authModalOverlay">
        <div class="auth-modal">
          <button class="auth-modal-close" id="authModalClose">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div class="auth-modal-content" id="authModalContent">
            <!-- Content will be dynamically inserted here -->
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    this.modal = document.getElementById('authModalOverlay');
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Fade in animation
    setTimeout(() => {
      this.modal.classList.add('active');
    }, 10);
  }
  
  /**
   * Render current view
   */
  renderView() {
    const content = document.getElementById('authModalContent');
    if (!content) return;
    
    let html = '';
    
    switch (this.currentView) {
      case 'login':
        html = this.renderLoginView();
        break;
      case 'signup':
        html = this.renderSignupView();
        break;
      case 'forgot':
        html = this.renderForgotPasswordView();
        break;
    }
    
    content.innerHTML = html;
  }
  
  /**
   * Render Login View
   */
  renderLoginView() {
    const t = window.i18n.t.bind(window.i18n);
    
    return `
      <div class="auth-view">
        <div class="auth-header">
          <h2 class="auth-title">${t('auth.login')}</h2>
        </div>
        
        <form class="auth-form" id="loginForm">
          <div class="form-group">
            <label for="loginEmail">${t('auth.email')}</label>
            <input 
              type="email" 
              id="loginEmail" 
              class="form-input"
              placeholder="${t('auth.emailPlaceholder')}"
              required
              autocomplete="email"
            />
          </div>
          
          <div class="form-group">
            <label for="loginPassword">${t('auth.password')}</label>
            <div class="password-input-wrapper">
              <input 
                type="password" 
                id="loginPassword" 
                class="form-input"
                placeholder="${t('auth.passwordPlaceholder')}"
                required
                autocomplete="current-password"
              />
              <button type="button" class="password-toggle" id="loginPasswordToggle">
                <svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>
          </div>
          
          <div class="form-error" id="loginError" style="display: none;"></div>
          
          <button type="submit" class="btn btn-primary" id="loginButton">
            <span class="btn-text">${t('auth.loginButton')}</span>
            <span class="btn-loader" style="display: none;">
              <svg class="spinner" viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
              </svg>
            </span>
          </button>
          
          <div class="form-link">
            <a href="#" id="showForgotPassword">${t('auth.forgotPasswordLink')}</a>
          </div>
        </form>
        
        <div class="auth-divider">
          <span>or</span>
        </div>
        
        <button class="btn btn-google" id="googleLoginButton">
          <svg class="google-icon" width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
            <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"/>
          </svg>
          <span>${t('auth.googleLogin')}</span>
        </button>
        
        <div class="auth-footer">
          <p>${t('auth.noAccount')} <a href="#" id="showSignup">${t('auth.signup')}</a></p>
        </div>
      </div>
    `;
  }
  
  /**
   * Render Signup View
   */
  renderSignupView() {
    const t = window.i18n.t.bind(window.i18n);
    
    return `
      <div class="auth-view">
        <div class="auth-header">
          <h2 class="auth-title">${t('auth.signup')}</h2>
        </div>
        
        <form class="auth-form" id="signupForm">
          <div class="form-group">
            <label for="signupName">${t('auth.fullName')}</label>
            <input 
              type="text" 
              id="signupName" 
              class="form-input"
              placeholder="${t('auth.fullNamePlaceholder')}"
              required
              autocomplete="name"
            />
          </div>
          
          <div class="form-group">
            <label for="signupEmail">${t('auth.email')}</label>
            <input 
              type="email" 
              id="signupEmail" 
              class="form-input"
              placeholder="${t('auth.emailPlaceholder')}"
              required
              autocomplete="email"
            />
          </div>
          
          <div class="form-group">
            <label for="signupPassword">${t('auth.password')}</label>
            <div class="password-input-wrapper">
              <input 
                type="password" 
                id="signupPassword" 
                class="form-input"
                placeholder="${t('auth.passwordPlaceholder')}"
                required
                autocomplete="new-password"
              />
              <button type="button" class="password-toggle" id="signupPasswordToggle">
                <svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>
            <div class="password-strength" id="passwordStrength" style="display: none;">
              <div class="password-strength-bar">
                <div class="password-strength-fill" id="passwordStrengthFill"></div>
              </div>
              <span class="password-strength-label" id="passwordStrengthLabel"></span>
            </div>
          </div>
          
          <div class="form-group">
            <label for="signupConfirmPassword">${t('auth.confirmPassword')}</label>
            <div class="password-input-wrapper">
              <input 
                type="password" 
                id="signupConfirmPassword" 
                class="form-input"
                placeholder="${t('auth.confirmPasswordPlaceholder')}"
                required
                autocomplete="new-password"
              />
              <button type="button" class="password-toggle" id="signupConfirmPasswordToggle">
                <svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>
          </div>
          
          <div class="form-error" id="signupError" style="display: none;"></div>
          
          <button type="submit" class="btn btn-primary" id="signupButton">
            <span class="btn-text">${t('auth.signupButton')}</span>
            <span class="btn-loader" style="display: none;">
              <svg class="spinner" viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
              </svg>
            </span>
          </button>
        </form>
        
        <div class="auth-divider">
          <span>or</span>
        </div>
        
        <button class="btn btn-google" id="googleSignupButton">
          <svg class="google-icon" width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
            <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"/>
          </svg>
          <span>${t('auth.googleLogin')}</span>
        </button>
        
        <div class="auth-footer">
          <p>${t('auth.haveAccount')} <a href="#" id="showLogin">${t('auth.login')}</a></p>
        </div>
      </div>
    `;
  }
  
  /**
   * Render Forgot Password View
   */
  renderForgotPasswordView() {
    const t = window.i18n.t.bind(window.i18n);
    
    return `
      <div class="auth-view">
        <div class="auth-header">
          <h2 class="auth-title">${t('auth.forgotPassword')}</h2>
          <p class="auth-subtitle">${t('auth.checkEmail')}</p>
        </div>
        
        <form class="auth-form" id="forgotPasswordForm">
          <div class="form-group">
            <label for="resetEmail">${t('auth.email')}</label>
            <input 
              type="email" 
              id="resetEmail" 
              class="form-input"
              placeholder="${t('auth.emailPlaceholder')}"
              required
              autocomplete="email"
            />
          </div>
          
          <div class="form-error" id="resetError" style="display: none;"></div>
          <div class="form-success" id="resetSuccess" style="display: none;"></div>
          
          <button type="submit" class="btn btn-primary" id="resetButton">
            <span class="btn-text">${t('auth.resetPasswordButton')}</span>
            <span class="btn-loader" style="display: none;">
              <svg class="spinner" viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
              </svg>
            </span>
          </button>
          
          <div class="form-link">
            <a href="#" id="backToLogin">${t('auth.backToLogin')}</a>
          </div>
        </form>
      </div>
    `;
  }
  
  /**
   * Attach event listeners
   */
  attachEventListeners() {
    // Close modal
    const closeBtn = document.getElementById('authModalClose');
    const overlay = document.getElementById('authModalOverlay');
    
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeModal());
    }
    
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          this.closeModal();
        }
      });
    }
    
    // View switching
    const showSignup = document.getElementById('showSignup');
    const showLogin = document.getElementById('showLogin');
    const showForgotPassword = document.getElementById('showForgotPassword');
    const backToLogin = document.getElementById('backToLogin');
    
    if (showSignup) {
      showSignup.addEventListener('click', (e) => {
        e.preventDefault();
        this.switchView('signup');
      });
    }
    
    if (showLogin) {
      showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        this.switchView('login');
      });
    }
    
    if (showForgotPassword) {
      showForgotPassword.addEventListener('click', (e) => {
        e.preventDefault();
        this.switchView('forgot');
      });
    }
    
    if (backToLogin) {
      backToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        this.switchView('login');
      });
    }
    
    // Form submissions
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => this.handleLogin(e));
    }
    
    if (signupForm) {
      signupForm.addEventListener('submit', (e) => this.handleSignup(e));
      
      // Password strength indicator
      const passwordInput = document.getElementById('signupPassword');
      if (passwordInput) {
        passwordInput.addEventListener('input', () => {
          this.updatePasswordStrength(passwordInput.value);
        });
      }
    }
    
    if (forgotPasswordForm) {
      forgotPasswordForm.addEventListener('submit', (e) => this.handleForgotPassword(e));
    }
    
    // Google login buttons
    const googleLoginButton = document.getElementById('googleLoginButton');
    const googleSignupButton = document.getElementById('googleSignupButton');
    
    if (googleLoginButton) {
      googleLoginButton.addEventListener('click', () => this.handleGoogleLogin());
    }
    
    if (googleSignupButton) {
      googleSignupButton.addEventListener('click', () => this.handleGoogleLogin());
    }
    
    // Password toggle buttons
    this.attachPasswordToggleListeners();
  }
  
  /**
   * Attach password toggle listeners
   */
  attachPasswordToggleListeners() {
    const toggleButtons = document.querySelectorAll('.password-toggle');
    
    toggleButtons.forEach(button => {
      button.addEventListener('click', () => {
        const input = button.previousElementSibling;
        if (!input) return;
        
        if (input.type === 'password') {
          input.type = 'text';
          button.classList.add('active');
        } else {
          input.type = 'password';
          button.classList.remove('active');
        }
      });
    });
  }
  
  /**
   * Handle login form submission
   */
  async handleLogin(e) {
    e.preventDefault();
    
    if (this.isProcessing) return;
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    this.setProcessing(true, 'loginButton');
    this.hideError('loginError');
    
    const result = await window.authManager.loginWithEmail(email, password);
    
    if (result.success) {
      this.showSuccess(result.message);
      setTimeout(() => this.closeModal(), 1000);
    } else {
      this.showError('loginError', result.error);
    }
    
    this.setProcessing(false, 'loginButton');
  }
  
  /**
   * Handle signup form submission
   */
  async handleSignup(e) {
    e.preventDefault();
    
    if (this.isProcessing) return;
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    // Client-side validation
    if (password !== confirmPassword) {
      this.showError('signupError', window.i18n.t('auth.passwordMismatch'));
      return;
    }
    
    this.setProcessing(true, 'signupButton');
    this.hideError('signupError');
    
    const result = await window.authManager.signupWithEmail(email, password, name);
    
    if (result.success) {
      this.showSuccess(result.message);
      setTimeout(() => this.closeModal(), 1000);
    } else {
      this.showError('signupError', result.error);
    }
    
    this.setProcessing(false, 'signupButton');
  }
  
  /**
   * Handle forgot password form submission
   */
  async handleForgotPassword(e) {
    e.preventDefault();
    
    if (this.isProcessing) return;
    
    const email = document.getElementById('resetEmail').value;
    
    this.setProcessing(true, 'resetButton');
    this.hideError('resetError');
    this.hideSuccess('resetSuccess');
    
    const result = await window.authManager.resetPassword(email);
    
    if (result.success) {
      this.showSuccess('resetSuccess', result.message);
    } else {
      this.showError('resetError', result.error);
    }
    
    this.setProcessing(false, 'resetButton');
  }
  
  /**
   * Handle Google login
   */
  async handleGoogleLogin() {
    if (this.isProcessing) return;
    
    this.isProcessing = true;
    
    const result = await window.authManager.loginWithGoogle();
    
    if (result.success) {
      this.showSuccess(result.message);
      setTimeout(() => this.closeModal(), 1000);
    } else if (!result.cancelled) {
      alert(result.error);
    }
    
    this.isProcessing = false;
  }
  
  /**
   * Update password strength indicator
   */
  updatePasswordStrength(password) {
    const strengthContainer = document.getElementById('passwordStrength');
    const strengthFill = document.getElementById('passwordStrengthFill');
    const strengthLabel = document.getElementById('passwordStrengthLabel');
    
    if (!strengthContainer || !strengthFill || !strengthLabel) return;
    
    const strength = window.authManager.calculatePasswordStrength(password);
    
    if (password.length === 0) {
      strengthContainer.style.display = 'none';
      return;
    }
    
    strengthContainer.style.display = 'block';
    strengthFill.style.width = `${strength.percentage}%`;
    strengthLabel.textContent = strength.label;
    
    // Color based on strength
    strengthFill.className = 'password-strength-fill';
    if (strength.score <= 2) {
      strengthFill.classList.add('weak');
    } else if (strength.score <= 4) {
      strengthFill.classList.add('medium');
    } else {
      strengthFill.classList.add('strong');
    }
  }
  
  /**
   * Switch between views
   */
  switchView(view) {
    this.currentView = view;
    this.renderView();
    this.attachEventListeners();
  }
  
  /**
   * Close modal
   */
  closeModal() {
    if (!this.modal) return;
    
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
    
    setTimeout(() => {
      if (this.modal && this.modal.parentNode) {
        this.modal.parentNode.removeChild(this.modal);
      }
      this.modal = null;
    }, 300);
  }
  
  /**
   * Set processing state for button
   */
  setProcessing(processing, buttonId) {
    this.isProcessing = processing;
    const button = document.getElementById(buttonId);
    if (!button) return;
    
    const btnText = button.querySelector('.btn-text');
    const btnLoader = button.querySelector('.btn-loader');
    
    if (processing) {
      button.disabled = true;
      button.classList.add('loading');
      if (btnText) btnText.style.display = 'none';
      if (btnLoader) btnLoader.style.display = 'flex';
    } else {
      button.disabled = false;
      button.classList.remove('loading');
      if (btnText) btnText.style.display = 'block';
      if (btnLoader) btnLoader.style.display = 'none';
    }
  }
  
  /**
   * Show error message
   */
  showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (!errorElement) return;
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
  
  /**
   * Hide error message
   */
  hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (!errorElement) return;
    
    errorElement.style.display = 'none';
  }
  
  /**
   * Show success message
   */
  showSuccess(elementId, message) {
    // If only one parameter, use it as message with default element
    if (arguments.length === 1) {
      message = elementId;
      this.showTemporaryMessage(message, 'success');
      return;
    }
    
    const successElement = document.getElementById(elementId);
    if (!successElement) return;
    
    successElement.textContent = message;
    successElement.style.display = 'block';
  }
  
  /**
   * Hide success message
   */
  hideSuccess(elementId) {
    const successElement = document.getElementById(elementId);
    if (!successElement) return;
    
    successElement.style.display = 'none';
  }
  
  /**
   * Show temporary toast message
   */
  showTemporaryMessage(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }
  
  /**
   * Update UI for auth state
   */
  updateUIForAuthState(user) {
    const loginButtons = document.querySelectorAll('.show-auth-modal');
    const userMenus = document.querySelectorAll('.user-menu');
    const protectedElements = document.querySelectorAll('[data-auth-required]');
    
    if (user) {
      // User is logged in
      loginButtons.forEach(btn => btn.style.display = 'none');
      userMenus.forEach(menu => menu.style.display = 'block');
      protectedElements.forEach(el => el.style.display = 'block');
      
      // Update user info
      this.updateUserInfo(user);
    } else {
      // User is logged out
      loginButtons.forEach(btn => btn.style.display = 'block');
      userMenus.forEach(menu => menu.style.display = 'none');
      protectedElements.forEach(el => el.style.display = 'none');
    }
  }
  
  /**
   * Update user info in UI
   */
  updateUserInfo(user) {
    const userNameElements = document.querySelectorAll('.user-display-name');
    const userEmailElements = document.querySelectorAll('.user-email');
    const userPhotoElements = document.querySelectorAll('.user-photo');
    
    userNameElements.forEach(el => {
      el.textContent = user.displayName || user.email.split('@')[0];
    });
    
    userEmailElements.forEach(el => {
      el.textContent = user.email;
    });
    
    userPhotoElements.forEach(el => {
      if (user.photoURL) {
        el.src = user.photoURL;
      } else {
        el.src = this.generateAvatarURL(user.email);
      }
    });
  }
  
  /**
   * Generate avatar URL from email
   */
  generateAvatarURL(email) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(email)}&background=random&size=200`;
  }
  
  /**
   * Update language in current view
   */
  updateLanguage() {
    if (this.modal) {
      this.renderView();
      this.attachEventListeners();
    }
  }
}

// Create global instance
window.authUI = new AuthUI();
