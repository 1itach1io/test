/* ==========================================
   DISCOVER EGYPT - THEME.JS
   Dark/Light mode toggle with system detection
   ========================================== */

// ========== THEME TOGGLE (Dark/Light Mode) ==========
function initializeTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    const themeOptionBtns = document.querySelectorAll('.theme-option-btn');
    const autoDetectThemeCheckbox = document.getElementById('auto-detect-theme');
    const reducedMotionCheckbox = document.getElementById('reduced-motion');
    const highContrastCheckbox = document.getElementById('high-contrast');

    // Detect system preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Check for auto-detect preference
    const autoDetect = localStorage.getItem('autoDetectTheme') !== 'false';
    if (autoDetectThemeCheckbox) {
        autoDetectThemeCheckbox.checked = autoDetect;
    }

    // Get saved theme or use system preference
    let savedTheme = localStorage.getItem('theme');

    // If no saved theme or auto-detect is enabled, use system preference
    if (!savedTheme || autoDetect) {
        savedTheme = prefersDarkScheme.matches ? 'dark' : 'light';
    }

    setTheme(savedTheme);

    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        // Only auto-switch if user has auto-detect enabled
        if (autoDetectThemeCheckbox && autoDetectThemeCheckbox.checked) {
            const newTheme = e.matches ? 'dark' : 'light';
            setTheme(newTheme, false); // false = don't mark as manual change
        }
    });

    // Theme toggle button in navbar (removed from navbar, only in settings now)
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme, true); // true = mark as manual change
        });
    }

    // Theme option buttons in settings
    themeOptionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const selectedTheme = this.getAttribute('data-theme');
            setTheme(selectedTheme, true); // true = mark as manual change

            // Update active state
            themeOptionBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Disable auto-detect when manually selecting theme
            if (autoDetectThemeCheckbox) {
                autoDetectThemeCheckbox.checked = false;
                localStorage.setItem('autoDetectTheme', 'false');
            }
        });
    });

    // Auto-detect theme checkbox
    if (autoDetectThemeCheckbox) {
        autoDetectThemeCheckbox.addEventListener('change', function() {
            localStorage.setItem('autoDetectTheme', this.checked);

            if (this.checked) {
                // Re-detect system theme
                const newTheme = prefersDarkScheme.matches ? 'dark' : 'light';
                setTheme(newTheme);
            }
        });
    }

    // Reduced Motion
    if (reducedMotionCheckbox) {
        const reducedMotion = localStorage.getItem('reducedMotion') === 'true';
        reducedMotionCheckbox.checked = reducedMotion;
        if (reducedMotion) {
            document.documentElement.classList.add('reduced-motion');
        }

        reducedMotionCheckbox.addEventListener('change', function() {
            localStorage.setItem('reducedMotion', this.checked);
            if (this.checked) {
                document.documentElement.classList.add('reduced-motion');
            } else {
                document.documentElement.classList.remove('reduced-motion');
            }
        });
    }

    // High Contrast
    if (highContrastCheckbox) {
        const highContrast = localStorage.getItem('highContrast') === 'true';
        highContrastCheckbox.checked = highContrast;
        if (highContrast) {
            document.documentElement.classList.add('high-contrast');
        }

        highContrastCheckbox.addEventListener('change', function() {
            localStorage.setItem('highContrast', this.checked);
            if (this.checked) {
                document.documentElement.classList.add('high-contrast');
            } else {
                document.documentElement.classList.remove('high-contrast');
            }
        });
    }

    // Function to set theme
    function setTheme(theme, isManual = false) {
        // Set theme attribute on HTML element
        document.documentElement.setAttribute('data-theme', theme);

        // Save to localStorage
        localStorage.setItem('theme', theme);

        // Mark if user manually changed theme
        if (isManual) {
            localStorage.setItem('theme-manual', 'true');
        }

        // Update active button in settings
        themeOptionBtns.forEach(btn => {
            if (btn.getAttribute('data-theme') === theme) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        console.log(`Theme changed to: ${theme}`);
    }
}
