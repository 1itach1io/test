/* ==========================================
   DISCOVER EGYPT - NAVIGATION.JS
   SPA navigation system
   ========================================== */

// ========== SECTION NAVIGATION (SPA Behavior) ==========
function initializeNavigation() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // Add click event to each navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior

            // Get the target section from data attribute
            const targetSection = this.getAttribute('data-section');

            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });

            // Show the target section
            const activeSection = document.getElementById(targetSection);
            if (activeSection) {
                activeSection.classList.add('active');
            }

            // Update active state on navigation links
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');

            // Close mobile menu after navigation (if open)
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }

            // Scroll to top smoothly
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // CTA Button - Navigate to Plans section
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Find and click the Plans navigation link
            const plansLink = document.querySelector('[data-section="plans"]');
            if (plansLink) {
                plansLink.click();
            }
        });
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const toolButtons = document.querySelectorAll('.tool-card');  // ✅ تم الإصلاح
    const sections = document.querySelectorAll('.section');

    toolButtons.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault(); // يمنع الانتقال الافتراضي

            const targetId = btn.getAttribute('href').substring(1); // اسم القسم
            const targetSection = document.getElementById(targetId);

            // خفي كل الأقسام
            sections.forEach(sec => sec.classList.remove('visible'));

            // أظهر القسم المطلوب
            if(targetSection) targetSection.classList.add('visible');

            // تمرير الصفحة للقسم بشكل ناعم
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
});


// ========== UTILITY FUNCTIONS ==========

// Initialize Tools Section
function initializeTools() {  // ✅ تم التصحيح إلى camelCase
    console.log('✅ Tools section initialized');
    // Navigation is handled by initializeNavigation()
    // This function can be extended for additional tools features
}
