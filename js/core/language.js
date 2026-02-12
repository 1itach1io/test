/* ==========================================
   DISCOVER EGYPT - LANGUAGE.JS
   Multi-language system
   ========================================== */

// ========== LANGUAGE SYSTEM ==========
function initializeLanguage() {
    const languageSelector = document.getElementById('language-selector');
    const languageRadios = document.querySelectorAll('input[name="language"]');
    const autoDetectCheckbox = document.getElementById('auto-detect-lang');

    // Check for auto-detect preference
    const autoDetect = localStorage.getItem('autoDetectLang') !== 'false';
    if (autoDetectCheckbox) {
        autoDetectCheckbox.checked = autoDetect;
    }

    // Auto-detect browser language if enabled
    if (autoDetect) {
        const browserLang = navigator.language.substring(0, 2); // Get 'en' from 'en-US'
        const supportedLangs = ['en', 'ar', 'fr'];

        if (supportedLangs.includes(browserLang)) {
            window.currentLanguage = browserLang;
            currentLanguage = browserLang;
        }
    } else {
        // Use saved language
        const savedLang = localStorage.getItem('language') || 'en';
        window.currentLanguage = savedLang;
        currentLanguage = savedLang;
    }

    // Set initial language
    setLanguage(currentLanguage);

    // Language selector in navbar
    if (languageSelector) {
        languageSelector.addEventListener('change', function() {
            const selectedLang = this.value;
            setLanguage(selectedLang);
        });
    }

    // Language radio buttons in settings
    languageRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                const selectedLang = this.value;
                setLanguage(selectedLang);
            }
        });
    });

    // Auto-detect checkbox
    if (autoDetectCheckbox) {
        autoDetectCheckbox.addEventListener('change', function() {
            localStorage.setItem('autoDetectLang', this.checked);

            if (this.checked) {
                // Re-detect browser language
                const browserLang = navigator.language.substring(0, 2);
                const supportedLangs = ['en', 'ar', 'fr'];

                if (supportedLangs.includes(browserLang)) {
                    setLanguage(browserLang);
                }
            }
        });
    }
}

function setLanguage(lang) {
    console.log(`🌐 setLanguage() called with: ${lang}`);

    // Update the global variable
    window.currentLanguage = lang;
    currentLanguage = lang;

    // Update HTML lang and dir attributes
    document.documentElement.setAttribute('lang', lang);

    // Set RTL for Arabic
    if (lang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
    }

    // Update selectors and radio buttons
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        languageSelector.value = lang;
    }

    const languageRadios = document.querySelectorAll('input[name="language"]');
    languageRadios.forEach(radio => {
        radio.checked = (radio.value === lang);
    });

    // Save to localStorage
    localStorage.setItem('language', lang);

    // Dispatch language change event for other components
    document.dispatchEvent(new CustomEvent('languageChange', {
        detail: { lang: lang }
    }));

    // Apply translations if loaded
    console.log('📦 Checking if translations are loaded...');
    console.log('translations object keys:', Object.keys(translations));

    if (Object.keys(translations).length > 0) {
        console.log('✅ Translations are loaded, applying...');
        // استخدام الترجمة الشاملة
        if (typeof applyCompleteTranslations === 'function') {
            applyCompleteTranslations();
        } else {
            applyTranslations();
        }
    } else {
        console.warn('⚠️ Translations not loaded yet');
    }

    console.log(`✅ Language changed to: ${lang}`);
}

// ========== MOBILE MENU TOGGLE ==========
function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    // Create overlay element
    let overlay = document.querySelector('.mobile-menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
            z-index: 998;
        `;
        body.appendChild(overlay);
    }

    if (mobileToggle && navMenu) {
        // Toggle menu on button click
        mobileToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });

        // Close menu when clicking overlay
        overlay.addEventListener('click', function() {
            closeMenu();
        });

        // Close menu when clicking nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMenu();
            });
        });

        // Close menu when pressing Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });

        function toggleMenu() {
            const isActive = navMenu.classList.contains('active');
            if (isActive) {
                closeMenu();
            } else {
                openMenu();
            }
        }

        function openMenu() {
            navMenu.classList.add('active');
            mobileToggle.classList.add('active');
            overlay.style.opacity = '1';
            overlay.style.visibility = 'visible';
            body.style.overflow = 'hidden';
        }

        function closeMenu() {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            overlay.style.opacity = '0';
            overlay.style.visibility = 'hidden';
            body.style.overflow = '';
        }
    }
}
