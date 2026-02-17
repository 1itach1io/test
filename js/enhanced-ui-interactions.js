/* ==========================================
   DISCOVER EGYPT - ENHANCED UI/UX INTERACTIONS
   تفاعلات متقدمة وتأثيرات ديناميكية
   Advanced Interactions & Dynamic Effects
   ========================================== */

// ========== SMOOTH SCROLL & HEADER EFFECTS ==========

class EnhancedUIManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupSmoothScroll();
        this.setupHeaderEffects();
        this.setupParallaxEffects();
        this.setupCardAnimations();
        this.setupRippleEffects();
        this.setupLoadingAnimations();
        this.setupTooltips();
        this.setupImageLazyLoad();
        this.setupIntersectionObserver();
        this.setupCursorEffects();
        this.setupPageTransitions();
        this.setupFormEnhancements();
    }

    // Smooth Scroll Behavior
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '#0') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Enhanced Header on Scroll
    setupHeaderEffects() {
        const header = document.querySelector('.header');
        if (!header) return;

        let lastScroll = 0;
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScroll = window.pageYOffset;

                    // Add scrolled class for shadow effect
                    if (currentScroll > 50) {
                        header.classList.add('scrolled');
                    } else {
                        header.classList.remove('scrolled');
                    }

                    // Hide/Show header on scroll
                    if (currentScroll > lastScroll && currentScroll > 100) {
                        header.style.transform = 'translateY(-100%)';
                    } else {
                        header.style.transform = 'translateY(0)';
                    }

                    lastScroll = currentScroll;
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // Parallax Effects for Hero Section
    setupParallaxEffects() {
        const heroBg = document.querySelector('.hero-bg');
        if (!heroBg) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            heroBg.style.transform = `translateY(${parallax}px) scale(1.1)`;
        });
    }

    // Card Animation on Scroll
    setupCardAnimations() {
        const cards = document.querySelectorAll('.tool-card, .place-card-enhanced, .settings-card');
        
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            // Add stagger delay
            setTimeout(() => {
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }, index * 50);
        });
    }

    // Ripple Effect on Buttons
    setupRippleEffects() {
        const buttons = document.querySelectorAll('.cta-button, .filter-btn, .tool-card, button');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.5);
                    border-radius: 50%;
                    pointer-events: none;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                `;

                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });
        });

        // Add ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Loading Animations
    setupLoadingAnimations() {
        // Simulate page load progress
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #d4af37, #f4e4a6);
            z-index: 9999;
            transition: width 0.3s ease;
            box-shadow: 0 0 10px rgba(212, 175, 55, 0.6);
        `;
        document.body.appendChild(progressBar);

        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setTimeout(() => {
                    progressBar.style.opacity = '0';
                    setTimeout(() => progressBar.remove(), 300);
                }, 200);
            }
            progressBar.style.width = progress + '%';
        }, 200);

        // Page loaded - trigger animations
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            this.triggerCardAnimations();
        });
    }

    // Trigger Card Animations when in viewport
    triggerCardAnimations() {
        const cards = document.querySelectorAll('.tool-card, .place-card-enhanced, .settings-card');
        
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Enhanced Tooltips
    setupTooltips() {
        const elementsWithTooltip = document.querySelectorAll('[title]');
        
        elementsWithTooltip.forEach(element => {
            const title = element.getAttribute('title');
            if (title) {
                element.setAttribute('data-tooltip', title);
                element.removeAttribute('title');
            }
        });
    }

    // Lazy Loading for Images
    setupImageLazyLoad() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Intersection Observer for Scroll Animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    
                    // Add specific animation based on element
                    if (entry.target.classList.contains('tool-card')) {
                        entry.target.style.animationDelay = '0.1s';
                    }
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        const animatables = document.querySelectorAll(
            '.section-header, .tool-card, .place-card-enhanced, .settings-card, .hero-content'
        );
        
        animatables.forEach(el => observer.observe(el));
    }

    // Custom Cursor Effects (Desktop only)
    setupCursorEffects() {
        if (window.innerWidth < 768) return; // Skip on mobile

        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid #d4af37;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.2s ease, opacity 0.2s ease;
            opacity: 0;
        `;
        document.body.appendChild(cursor);

        const cursorDot = document.createElement('div');
        cursorDot.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: #d4af37;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            opacity: 0;
        `;
        document.body.appendChild(cursorDot);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursor.style.opacity = '1';
            
            cursorDot.style.left = (e.clientX - 3) + 'px';
            cursorDot.style.top = (e.clientY - 3) + 'px';
            cursorDot.style.opacity = '1';
        });

        // Enlarge cursor on hover over interactive elements
        const interactives = document.querySelectorAll('a, button, .tool-card, .filter-btn');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.borderColor = '#f4e4a6';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.borderColor = '#d4af37';
            });
        });
    }

    // Page Transition Effects
    setupPageTransitions() {
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            section.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        });

        // Listen to section changes
        const navLinks = document.querySelectorAll('.nav-link[data-section]');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetSection = this.dataset.section;
                const section = document.getElementById(targetSection);
                
                if (section) {
                    // Fade out current section
                    const activeSection = document.querySelector('.section.active');
                    if (activeSection) {
                        activeSection.style.opacity = '0';
                        activeSection.style.transform = 'translateY(-20px)';
                    }
                    
                    // Fade in new section
                    setTimeout(() => {
                        section.style.opacity = '1';
                        section.style.transform = 'translateY(0)';
                    }, 200);
                }
            });
        });
    }

    // Form Enhancement Effects
    setupFormEnhancements() {
        const inputs = document.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Floating label effect
            const label = input.previousElementSibling;
            
            if (input.value) {
                label?.classList.add('active');
            }

            input.addEventListener('focus', () => {
                label?.classList.add('active');
                input.parentElement?.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    label?.classList.remove('active');
                }
                input.parentElement?.classList.remove('focused');
            });

            input.addEventListener('input', () => {
                if (input.value) {
                    label?.classList.add('active');
                } else {
                    label?.classList.remove('active');
                }
            });
        });
    }
}

// ========== ENHANCED SEARCH FUNCTIONALITY ==========

class EnhancedSearch {
    constructor() {
        this.searchModal = document.getElementById('search-modal');
        this.searchInput = document.getElementById('search-input');
        this.searchResults = document.getElementById('search-results');
        this.init();
    }

    init() {
        if (!this.searchInput) return;

        // Debounce search input
        let debounceTimer;
        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                this.performSearch(e.target.value);
            }, 300);
        });

        // Add search animation
        this.searchInput.addEventListener('focus', () => {
            this.searchInput.parentElement.style.transform = 'scale(1.02)';
        });

        this.searchInput.addEventListener('blur', () => {
            this.searchInput.parentElement.style.transform = 'scale(1)';
        });
    }

    performSearch(query) {
        if (!this.searchResults) return;

        // Add loading state
        this.searchResults.innerHTML = '<div class="skeleton" style="height: 100px; margin: 10px;"></div>'.repeat(3);

        // Simulate search (replace with actual search logic)
        setTimeout(() => {
            this.displayResults([]);
        }, 500);
    }

    displayResults(results) {
        if (!this.searchResults) return;

        if (results.length === 0) {
            this.searchResults.innerHTML = `
                <div class="search-no-results animate-fade-in">
                    <i class="fas fa-search" style="font-size: 3rem; color: var(--text-secondary);"></i>
                    <p>No results found</p>
                </div>
            `;
        } else {
            // Display results with animation
            this.searchResults.innerHTML = '';
            results.forEach((result, index) => {
                const resultCard = this.createResultCard(result);
                resultCard.style.animationDelay = `${index * 0.1}s`;
                this.searchResults.appendChild(resultCard);
            });
        }
    }

    createResultCard(result) {
        const card = document.createElement('div');
        card.className = 'search-result-card animate-slide-in-left';
        // Add card content here
        return card;
    }
}

// ========== ENHANCED THEME SWITCHER ==========

class EnhancedTheme {
    constructor() {
        this.themeButtons = document.querySelectorAll('.theme-option-btn');
        this.init();
    }

    init() {
        this.themeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const theme = button.dataset.theme;
                this.switchTheme(theme);
                
                // Add animation
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                }, 200);
            });
        });
    }

    switchTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // Add page transition
        document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
    }
}

// ========== NOTIFICATION SYSTEM ==========

class NotificationManager {
    constructor() {
        this.container = this.createContainer();
    }

    createContainer() {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(container);
        return container;
    }

    show(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        
        const colors = {
            success: '#27ae60',
            error: '#e74c3c',
            warning: '#f39c12',
            info: '#3498db'
        };

        notification.style.cssText = `
            background: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.16);
            border-left: 4px solid ${colors[type] || colors.info};
            display: flex;
            align-items: center;
            gap: 12px;
            min-width: 300px;
            animation: slideInRight 0.3s ease;
        `;

        notification.innerHTML = `
            <i class="fas fa-${this.getIcon(type)}" style="color: ${colors[type]}; font-size: 1.2rem;"></i>
            <span style="flex: 1; font-weight: 500;">${message}</span>
            <button onclick="this.parentElement.remove()" style="background: none; border: none; cursor: pointer; font-size: 1.2rem; color: #999;">×</button>
        `;

        this.container.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }

    getIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || icons.info;
    }
}

// ========== INITIALIZE EVERYTHING ==========

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Enhanced UI
    window.enhancedUI = new EnhancedUIManager();
    window.enhancedSearch = new EnhancedSearch();
    window.enhancedTheme = new EnhancedTheme();
    window.notifications = new NotificationManager();

    // Add welcome notification
    setTimeout(() => {
        window.notifications.show('Welcome to Discover Egypt! 🇪🇬', 'success');
    }, 1000);

    console.log('✨ Enhanced UI/UX Loaded Successfully!');
});

// ========== PERFORMANCE MONITORING ==========

// Track page performance
window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`📊 Page Load Time: ${pageLoadTime}ms`);
});

// ========== EXPORT FOR USE ==========

window.EnhancedUIManager = EnhancedUIManager;
window.EnhancedSearch = EnhancedSearch;
window.EnhancedTheme = EnhancedTheme;
window.NotificationManager = NotificationManager;
