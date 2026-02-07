// Authentication UI Component
class AuthUI {
  constructor() {
    this.user = null;
    this.translations = null;
    this.currentLang = 'ar';
    this.init();
  }

  init() {
    // Load translations
    if (typeof translations !== 'undefined') {
      this.translations = translations;
    }
    
    // Check if user is logged in
    this.checkUserStatus();
    
    // Render auth button
    this.render();
    
    // Listen for language changes
    document.addEventListener('languageChange', (e) => {
      this.currentLang = e.detail.lang;
      this.render();
    });
  }

  checkUserStatus() {
    // Check localStorage for user data
    const userData = localStorage.getItem('egyptUser');
    if (userData) {
      try {
        this.user = JSON.parse(userData);
      } catch (e) {
        console.error('Error parsing user data:', e);
        localStorage.removeItem('egyptUser');
      }
    }
  }

  render() {
    let container = document.getElementById('auth-btn-container');
    
    if (!container) {
      container = document.createElement('div');
      container.id = 'auth-btn-container';
      container.className = 'auth-btn-container';
      document.body.appendChild(container);
    }

    if (this.user) {
      container.innerHTML = this.renderUserInfo();
    } else {
      container.innerHTML = this.renderLoginButton();
    }

    this.attachEventListeners();
  }

  renderLoginButton() {
    const loginText = this.getTranslation('auth.login');
    
    return `
      <button class="auth-btn auth-btn-login" id="login-btn">
        <span class="auth-btn-icon">🔐</span>
        <span class="auth-btn-text">${loginText}</span>
      </button>
    `;
  }

  renderUserInfo() {
    const logoutText = this.getTranslation('auth.logout');
    const userName = this.user.name || 'User';
    const firstLetter = userName.charAt(0).toUpperCase();

    return `
      <div class="user-info">
        <div class="user-avatar">${firstLetter}</div>
        <span class="user-name">${userName}</span>
      </div>
      <button class="auth-btn auth-btn-logout" id="logout-btn">
        <span class="auth-btn-icon">🚪</span>
        <span class="auth-btn-text">${logoutText}</span>
      </button>
    `;
  }

  attachEventListeners() {
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');

    if (loginBtn) {
      loginBtn.addEventListener('click', () => this.showLoginModal());
    }

    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => this.logout());
    }
  }

  showLoginModal() {
    // هذه الدالة ستُطور لاحقاً لعرض نموذج تسجيل الدخول
    console.log('Login modal will be implemented soon...');
    
    // مؤقتاً: محاكاة تسجيل الدخول للاختبار
    const demoLogin = confirm('هل تريد تسجيل الدخول كمستخدم تجريبي؟');
    
    if (demoLogin) {
      this.login({
        name: 'محمد أحمد',
        email: 'demo@egypt.com',
        avatar: null
      });
    }
  }

  login(userData) {
    this.user = userData;
    localStorage.setItem('egyptUser', JSON.stringify(userData));
    this.render();
    
    // Dispatch event for other components
    document.dispatchEvent(new CustomEvent('userLogin', { 
      detail: { user: userData } 
    }));
    
    // Show welcome message
    this.showWelcomeMessage();
  }

  logout() {
    const confirmLogout = confirm(this.getTranslation('auth.logout') + '?');
    
    if (confirmLogout) {
      this.user = null;
      localStorage.removeItem('egyptUser');
      this.render();
      
      // Dispatch event for other components
      document.dispatchEvent(new CustomEvent('userLogout'));
    }
  }

  showWelcomeMessage() {
    const welcomeText = this.getTranslation('auth.welcome');
    const userName = this.user.name || 'User';
    
    // Create temporary welcome message
    const message = document.createElement('div');
    message.className = 'welcome-message';
    message.textContent = `${welcomeText} ${userName}`;
    message.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      padding: 15px 25px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      z-index: 9999;
      animation: slideIn 0.3s ease;
      font-weight: 600;
    `;
    
    document.body.appendChild(message);
    
    // Remove after 3 seconds
    setTimeout(() => {
      message.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => message.remove(), 300);
    }, 3000);
  }

  getTranslation(key) {
    if (!this.translations) return key;
    
    const keys = key.split('.');
    let value = this.translations[this.currentLang];
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return value;
  }

  getUser() {
    return this.user;
  }

  isLoggedIn() {
    return this.user !== null;
  }
}

// Add animations to document
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
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
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Initialize auth UI when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.authUI = new AuthUI();
  });
} else {
  window.authUI = new AuthUI();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AuthUI;
}
