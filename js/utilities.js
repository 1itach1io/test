/* ==========================================
   DISCOVER EGYPT - UTILITIES.JS
   دوال مساعدة للموقع
   ========================================== */

// ========== LOADING FUNCTIONS ==========

/**
 * Show loading overlay
 */
function showLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Hide loading overlay
 */
function hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// ========== MESSAGE FUNCTIONS ==========

/**
 * Show a message to the user
 * @param {string} message - The message text
 * @param {string} type - Message type: 'success', 'error', 'warning', 'info'
 * @param {number} duration - How long to show the message in ms (0 = permanent)
 */
function showMessage(message, type = 'info', duration = 5000) {
    const container = document.getElementById('message-container');
    if (!container) return;
    
    const messageEl = document.createElement('div');
    messageEl.className = `message message-${type}`;
    messageEl.setAttribute('role', 'alert');
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    messageEl.innerHTML = `
        <i class="fas ${icons[type] || icons.info} message-icon"></i>
        <span>${message}</span>
        <button class="message-close" onclick="this.parentElement.remove()" aria-label="Close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    container.appendChild(messageEl);
    
    // Animate in
    setTimeout(() => {
        messageEl.style.opacity = '1';
        messageEl.style.transform = 'translateY(0)';
    }, 10);
    
    // Auto-remove after duration
    if (duration > 0) {
        setTimeout(() => {
            messageEl.style.opacity = '0';
            messageEl.style.transform = 'translateY(-20px)';
            setTimeout(() => messageEl.remove(), 300);
        }, duration);
    }
}

/**
 * Show success message
 */
function showSuccess(message, duration) {
    showMessage(message, 'success', duration);
}

/**
 * Show error message
 */
function showError(message, duration) {
    showMessage(message, 'error', duration);
}

/**
 * Show warning message
 */
function showWarning(message, duration) {
    showMessage(message, 'warning', duration);
}

/**
 * Show info message
 */
function showInfo(message, duration) {
    showMessage(message, 'info', duration);
}

// ========== FORM VALIDATION FUNCTIONS ==========

/**
 * Validate a number input
 * @param {HTMLInputElement} input - The input element
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {boolean} - Whether the input is valid
 */
function validateNumberInput(input, min, max) {
    const value = parseInt(input.value);
    const errorElement = document.getElementById(input.id + '-error');
    
    if (isNaN(value) || value < min || value > max) {
        input.classList.add('invalid');
        if (errorElement) {
            errorElement.style.display = 'block';
            errorElement.textContent = `يجب إدخال رقم بين ${min} و ${max}`;
        }
        return false;
    } else {
        input.classList.remove('invalid');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
        return true;
    }
}

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - Whether the email is valid
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Validate required field
 * @param {HTMLInputElement} input - The input element
 * @returns {boolean} - Whether the input has a value
 */
function validateRequired(input) {
    if (!input.value.trim()) {
        input.classList.add('invalid');
        return false;
    }
    input.classList.remove('invalid');
    return true;
}

// ========== UTILITY FUNCTIONS ==========

/**
 * Debounce function to limit how often a function is called
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to limit how often a function is called
 * @param {Function} func - Function to throttle
 * @param {number} limit - Limit in milliseconds
 * @returns {Function} - Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Format a number with thousand separators
 * @param {number} num - Number to format
 * @returns {string} - Formatted number
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Get current language
 * @returns {string} - Current language code
 */
function getCurrentLanguage() {
    return document.documentElement.getAttribute('lang') || 'en';
}

/**
 * Get translation for a key
 * @param {string} key - Translation key (e.g., 'nav.home')
 * @returns {string} - Translated text
 */
function getTranslation(key) {
    const lang = getCurrentLanguage();
    const keys = key.split('.');
    let value = translations[lang];
    
    for (const k of keys) {
        if (value && value[k]) {
            value = value[k];
        } else {
            return key; // Return key if translation not found
        }
    }
    
    return value;
}

/**
 * Smooth scroll to an element
 * @param {string} selector - Element selector
 * @param {number} offset - Offset from top in pixels
 */
function smoothScrollTo(selector, offset = 80) {
    const element = document.querySelector(selector);
    if (element) {
        const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
            top: top,
            behavior: 'smooth'
        });
    }
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} - Whether element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise} - Promise that resolves when copied
 */
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showSuccess(getTranslation('common.copied') || 'Copied to clipboard!');
        return true;
    } catch (err) {
        showError(getTranslation('common.copyError') || 'Failed to copy');
        return false;
    }
}

/**
 * Generate a unique ID
 * @returns {string} - Unique ID
 */
function generateId() {
    return 'id-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

/**
 * Format date
 * @param {Date} date - Date object
 * @param {string} locale - Locale for formatting
 * @returns {string} - Formatted date
 */
function formatDate(date, locale = 'en-US') {
    return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

/**
 * Check if user is on mobile device
 * @returns {boolean} - Whether on mobile
 */
function isMobile() {
    return window.innerWidth <= 768;
}

/**
 * Check if user is on tablet device
 * @returns {boolean} - Whether on tablet
 */
function isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
}

/**
 * Get device type
 * @returns {string} - 'mobile', 'tablet', or 'desktop'
 */
function getDeviceType() {
    if (isMobile()) return 'mobile';
    if (isTablet()) return 'tablet';
    return 'desktop';
}

// ========== LOCAL STORAGE HELPERS ==========

/**
 * Save to local storage
 * @param {string} key - Storage key
 * @param {any} value - Value to store
 */
function saveToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error('Error saving to localStorage:', e);
    }
}

/**
 * Load from local storage
 * @param {string} key - Storage key
 * @returns {any} - Stored value or null
 */
function loadFromStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (e) {
        console.error('Error loading from localStorage:', e);
        return null;
    }
}

/**
 * Remove from local storage
 * @param {string} key - Storage key
 */
function removeFromStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch (e) {
        console.error('Error removing from localStorage:', e);
    }
}

// ========== ANIMATION HELPERS ==========

/**
 * Animate element fade in
 * @param {HTMLElement} element - Element to animate
 * @param {number} duration - Animation duration in ms
 */
function fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.display = 'block';
    
    let start = null;
    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        element.style.opacity = Math.min(progress / duration, 1);
        
        if (progress < duration) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

/**
 * Animate element fade out
 * @param {HTMLElement} element - Element to animate
 * @param {number} duration - Animation duration in ms
 */
function fadeOut(element, duration = 300) {
    let start = null;
    const initialOpacity = parseFloat(window.getComputedStyle(element).opacity);
    
    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        element.style.opacity = initialOpacity * (1 - Math.min(progress / duration, 1));
        
        if (progress < duration) {
            requestAnimationFrame(animate);
        } else {
            element.style.display = 'none';
        }
    }
    
    requestAnimationFrame(animate);
}

// ========== EXPORT FOR MODULE USAGE (if needed) ==========
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showLoading,
        hideLoading,
        showMessage,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        validateNumberInput,
        validateEmail,
        validateRequired,
        debounce,
        throttle,
        formatNumber,
        getCurrentLanguage,
        getTranslation,
        smoothScrollTo,
        isInViewport,
        copyToClipboard,
        generateId,
        formatDate,
        isMobile,
        isTablet,
        getDeviceType,
        saveToStorage,
        loadFromStorage,
        removeFromStorage,
        fadeIn,
        fadeOut
    };
}
