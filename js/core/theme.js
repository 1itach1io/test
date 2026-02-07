/* ==========================================
   DISCOVER EGYPT - THEME.JS
   Dark/Light mode toggle with system detection
   ========================================== */

// ========== THEME TOGGLE (Dark/Light Mode) ==========
function initializeTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    const themeOptionBtns = document.querySelectorAll('.theme-option-btn');

    // Detect system preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Get saved theme or use system preference
    let savedTheme = localStorage.getItem('theme');
    
    // If no saved theme, use system preference
    if (!savedTheme) {
        savedTheme = prefersDarkScheme.matches ? 'dark' : 'light';
    }
    
    setTheme(savedTheme);

    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        // Only auto-switch if user hasn't manually set a preference
        if (!localStorage.getItem('theme-manual')) {
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
        });
    });

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

        // Update icon
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
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
