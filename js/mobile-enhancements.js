/* ==========================================
   DISCOVER EGYPT - MOBILE ENHANCEMENTS
   تحسينات JavaScript للهواتف المحمولة
   Mobile-Specific JavaScript Enhancements
   ========================================== */

class MobileEnhancements {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.isTouch = 'ontouchstart' in window;
        this.init();
    }

    init() {
        if (!this.isMobile) return;

        this.setupMobileMenu();
        this.setupSwipeGestures();
        this.setupPullToRefresh();
        this.setupScrollBehavior();
        this.setupTouchOptimizations();
        this.setupBottomNavigation();
        this.setupVirtualKeyboard();
        this.monitorOrientation();
    }

    // ========== MOBILE MENU ==========
    setupMobileMenu() {
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!menuToggle || !navMenu) return;

        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        document.body.appendChild(overlay);

        // Toggle menu
        const toggleMenu = () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        };

        menuToggle.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);

        // Close menu when clicking nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    }

    // ========== SWIPE GESTURES ==========
    setupSwipeGestures() {
        const navMenu = document.querySelector('.nav-menu');
        if (!navMenu) return;

        let touchStartX = 0;
        let touchEndX = 0;

        navMenu.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        navMenu.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX, navMenu);
        });

        // Swipe to close menu
        const overlay = document.querySelector('.mobile-menu-overlay');
        if (overlay) {
            overlay.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });

            overlay.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe(touchStartX, touchEndX, navMenu);
            });
        }
    }

    handleSwipe(startX, endX, navMenu) {
        const swipeThreshold = 50;
        const diff = startX - endX;

        // Swipe left to close
        if (diff > swipeThreshold && navMenu.classList.contains('active')) {
            const menuToggle = document.querySelector('.mobile-menu-toggle');
            const overlay = document.querySelector('.mobile-menu-overlay');
            
            menuToggle?.classList.remove('active');
            navMenu.classList.remove('active');
            overlay?.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // ========== PULL TO REFRESH ==========
    setupPullToRefresh() {
        let startY = 0;
        let currentY = 0;
        let pulling = false;

        const createRefreshIndicator = () => {
            const indicator = document.createElement('div');
            indicator.className = 'pull-to-refresh';
            indicator.innerHTML = '<i class="fas fa-sync-alt"></i><span>Pull to refresh</span>';
            document.body.appendChild(indicator);
            return indicator;
        };

        const indicator = createRefreshIndicator();

        document.addEventListener('touchstart', (e) => {
            if (window.scrollY === 0) {
                startY = e.touches[0].pageY;
                pulling = false;
            }
        });

        document.addEventListener('touchmove', (e) => {
            if (window.scrollY === 0) {
                currentY = e.touches[0].pageY;
                const diff = currentY - startY;

                if (diff > 80 && !pulling) {
                    pulling = true;
                    indicator.classList.add('active');
                    indicator.querySelector('span').textContent = 'Release to refresh';
                }
            }
        });

        document.addEventListener('touchend', () => {
            if (pulling) {
                indicator.querySelector('span').textContent = 'Refreshing...';
                
                setTimeout(() => {
                    indicator.classList.remove('active');
                    pulling = false;
                    indicator.querySelector('span').textContent = 'Pull to refresh';
                    
                    // Refresh content
                    this.refreshContent();
                }, 1000);
            }
        });
    }

    refreshContent() {
        // Add your refresh logic here
        console.log('Content refreshed!');
        window.notifications?.show('Content refreshed!', 'success', 2000);
    }

    // ========== SCROLL BEHAVIOR ==========
    setupScrollBehavior() {
        let lastScrollY = window.scrollY;
        const header = document.querySelector('.header');
        
        if (!header) return;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            // Hide header on scroll down, show on scroll up
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }

            // Make filter sticky
            const filterContainer = document.querySelector('.filter-container');
            if (filterContainer && currentScrollY > 200) {
                filterContainer.classList.add('sticky');
            } else {
                filterContainer?.classList.remove('sticky');
            }

            lastScrollY = currentScrollY;
        });

        // Smooth scroll to top button
        const scrollToTop = document.createElement('button');
        scrollToTop.className = 'scroll-to-top';
        scrollToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollToTop.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #d4af37, #c89b3c);
            color: white;
            border: none;
            border-radius: 50%;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            transition: all 0.3s ease;
        `;

        document.body.appendChild(scrollToTop);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTop.style.display = 'flex';
            } else {
                scrollToTop.style.display = 'none';
            }
        });

        scrollToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========== TOUCH OPTIMIZATIONS ==========
    setupTouchOptimizations() {
        // Prevent double-tap zoom on specific elements
        const preventDoubleTapZoom = (elements) => {
            elements.forEach(el => {
                let lastTap = 0;
                el.addEventListener('touchend', (e) => {
                    const currentTime = new Date().getTime();
                    const tapLength = currentTime - lastTap;
                    
                    if (tapLength < 300 && tapLength > 0) {
                        e.preventDefault();
                    }
                    lastTap = currentTime;
                });
            });
        };

        preventDoubleTapZoom(document.querySelectorAll('.tool-card, .place-card-no-image'));

        // Add active state for touch
        const addTouchActive = (elements) => {
            elements.forEach(el => {
                el.addEventListener('touchstart', function() {
                    this.classList.add('touch-active');
                });
                
                el.addEventListener('touchend', function() {
                    setTimeout(() => {
                        this.classList.remove('touch-active');
                    }, 300);
                });
            });
        };

        addTouchActive(document.querySelectorAll('.filter-btn, .cta-button, .tool-card'));

        // Add CSS for touch-active state
        const style = document.createElement('style');
        style.textContent = `
            .touch-active {
                opacity: 0.7;
                transform: scale(0.98);
            }
        `;
        document.head.appendChild(style);
    }

    // ========== BOTTOM NAVIGATION ==========
    setupBottomNavigation() {
        const createBottomNav = () => {
            const bottomNav = document.createElement('div');
            bottomNav.className = 'bottom-nav';
            
            const navItems = [
                { icon: 'home', label: 'Home', section: 'home' },
                { icon: 'map-marked-alt', label: 'Explore', section: 'explore' },
                { icon: 'search', label: 'Search', action: 'search' },
                { icon: 'cog', label: 'Settings', section: 'settings' }
            ];

            navItems.forEach(item => {
                const navItem = document.createElement('div');
                navItem.className = 'bottom-nav-item';
                navItem.innerHTML = `
                    <i class="fas fa-${item.icon}"></i>
                    <span>${item.label}</span>
                `;

                if (item.section) {
                    navItem.addEventListener('click', () => {
                        this.navigateToSection(item.section, bottomNav);
                    });
                } else if (item.action === 'search') {
                    navItem.addEventListener('click', () => {
                        document.getElementById('mobile-search-btn')?.click();
                    });
                }

                bottomNav.appendChild(navItem);
            });

            document.body.appendChild(bottomNav);
            
            // Set initial active state
            this.setActiveBottomNav('home', bottomNav);
        };

        createBottomNav();
    }

    navigateToSection(section, bottomNav) {
        const sectionEl = document.getElementById(section);
        if (sectionEl) {
            sectionEl.scrollIntoView({ behavior: 'smooth' });
            this.setActiveBottomNav(section, bottomNav);
        }
    }

    setActiveBottomNav(activeSection, bottomNav) {
        const items = bottomNav.querySelectorAll('.bottom-nav-item');
        items.forEach((item, index) => {
            const sections = ['home', 'explore', 'search', 'settings'];
            if (sections[index] === activeSection || (index === 2 && activeSection === 'search')) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // ========== VIRTUAL KEYBOARD HANDLING ==========
    setupVirtualKeyboard() {
        // Adjust viewport when keyboard appears
        let initialHeight = window.innerHeight;

        window.addEventListener('resize', () => {
            const currentHeight = window.innerHeight;
            const diff = initialHeight - currentHeight;

            // If height decreased significantly, keyboard is likely open
            if (diff > 150) {
                document.body.style.paddingBottom = diff + 'px';
            } else {
                document.body.style.paddingBottom = '0';
            }
        });

        // Scroll input into view when focused
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                setTimeout(() => {
                    this.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }, 300);
            });
        });
    }

    // ========== ORIENTATION CHANGE ==========
    monitorOrientation() {
        let currentOrientation = window.orientation || 0;

        window.addEventListener('orientationchange', () => {
            const newOrientation = window.orientation || 0;
            
            if (currentOrientation !== newOrientation) {
                // Show notification
                window.notifications?.show(
                    Math.abs(newOrientation) === 90 ? 'Landscape mode' : 'Portrait mode',
                    'info',
                    2000
                );

                // Refresh layout
                setTimeout(() => {
                    window.scrollTo(0, 0);
                }, 100);

                currentOrientation = newOrientation;
            }
        });
    }
}

// ========== HAPTIC FEEDBACK ==========

class HapticFeedback {
    constructor() {
        this.isSupported = 'vibrate' in navigator;
    }

    light() {
        if (this.isSupported) {
            navigator.vibrate(10);
        }
    }

    medium() {
        if (this.isSupported) {
            navigator.vibrate(20);
        }
    }

    heavy() {
        if (this.isSupported) {
            navigator.vibrate(30);
        }
    }

    success() {
        if (this.isSupported) {
            navigator.vibrate([10, 50, 10]);
        }
    }

    error() {
        if (this.isSupported) {
            navigator.vibrate([50, 100, 50]);
        }
    }
}

// ========== PERFORMANCE MONITORING ==========

class MobilePerformance {
    constructor() {
        this.metrics = {
            fps: [],
            memoryUsage: [],
            loadTime: 0
        };
        this.init();
    }

    init() {
        this.measureLoadTime();
        this.monitorFPS();
        this.monitorMemory();
    }

    measureLoadTime() {
        window.addEventListener('load', () => {
            const perfData = performance.timing;
            this.metrics.loadTime = perfData.loadEventEnd - perfData.navigationStart;
            
            console.log(`📱 Mobile Load Time: ${this.metrics.loadTime}ms`);
            
            if (this.metrics.loadTime > 3000) {
                console.warn('⚠️ Slow page load detected');
            }
        });
    }

    monitorFPS() {
        let lastTime = performance.now();
        let frames = 0;

        const measureFPS = () => {
            const currentTime = performance.now();
            frames++;

            if (currentTime >= lastTime + 1000) {
                const fps = Math.round((frames * 1000) / (currentTime - lastTime));
                this.metrics.fps.push(fps);
                
                if (fps < 30) {
                    console.warn(`⚠️ Low FPS detected: ${fps}`);
                }

                frames = 0;
                lastTime = currentTime;
            }

            requestAnimationFrame(measureFPS);
        };

        requestAnimationFrame(measureFPS);
    }

    monitorMemory() {
        if (performance.memory) {
            setInterval(() => {
                const used = Math.round(performance.memory.usedJSHeapSize / 1048576);
                this.metrics.memoryUsage.push(used);
                
                if (used > 100) {
                    console.warn(`⚠️ High memory usage: ${used}MB`);
                }
            }, 5000);
        }
    }
}

// ========== INITIALIZE MOBILE ENHANCEMENTS ==========

document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth <= 768) {
        window.mobileEnhancements = new MobileEnhancements();
        window.haptic = new HapticFeedback();
        window.mobilePerf = new MobilePerformance();

        // Add haptic feedback to interactive elements
        document.querySelectorAll('.filter-btn, .cta-button, .tool-card').forEach(el => {
            el.addEventListener('click', () => {
                window.haptic.light();
            });
        });

        console.log('📱 Mobile Enhancements Loaded!');
    }
});

// ========== EXPORT FOR USE ==========

window.MobileEnhancements = MobileEnhancements;
window.HapticFeedback = HapticFeedback;
window.MobilePerformance = MobilePerformance;
