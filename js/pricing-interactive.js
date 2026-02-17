/* ═══════════════════════════════════════════════════════════════════
   PRICING SECTION - INTERACTIVE FEATURES
   Monthly/Yearly Toggle & Price Animation
   ═══════════════════════════════════════════════════════════════════ */

(function() {
    'use strict';
    
    // Initialize pricing features when DOM is loaded
    document.addEventListener('DOMContentLoaded', initializePricing);
    
    function initializePricing() {
        const billingToggle = document.getElementById('billing-toggle');
        
        if (!billingToggle) {
            console.log('Billing toggle not found - pricing section may not be loaded');
            return;
        }
        
        // Set up billing toggle
        billingToggle.addEventListener('change', handleBillingToggle);
        
        // Initialize with monthly pricing (default)
        updatePricing(false);
    }
    
    function handleBillingToggle(event) {
        const isYearly = event.target.checked;
        updatePricing(isYearly);
        
        // Add animation to price change
        animatePriceChange();
    }
    
    function updatePricing(isYearly) {
        const priceElements = document.querySelectorAll('.pricing-card .amount');
        
        priceElements.forEach(element => {
            const monthlyPrice = element.getAttribute('data-monthly');
            const yearlyPrice = element.getAttribute('data-yearly');
            
            if (monthlyPrice && yearlyPrice) {
                const newPrice = isYearly ? yearlyPrice : monthlyPrice;
                
                // Animate number change
                animateNumber(element, parseInt(element.textContent), parseInt(newPrice));
            }
        });
        
        // Update period text if needed
        updatePeriodText(isYearly);
    }
    
    function animateNumber(element, from, to) {
        const duration = 500; // ms
        const steps = 20;
        const increment = (to - from) / steps;
        let current = from;
        let step = 0;
        
        const timer = setInterval(() => {
            step++;
            current += increment;
            
            if (step >= steps) {
                element.textContent = to;
                clearInterval(timer);
            } else {
                element.textContent = Math.round(current);
            }
        }, duration / steps);
    }
    
    function animatePriceChange() {
        const priceWrappers = document.querySelectorAll('.price-wrapper');
        
        priceWrappers.forEach(wrapper => {
            wrapper.style.transform = 'scale(1.1)';
            wrapper.style.transition = 'transform 0.2s ease';
            
            setTimeout(() => {
                wrapper.style.transform = 'scale(1)';
            }, 200);
        });
    }
    
    function updatePeriodText(isYearly) {
        // This can be extended to update any text that changes with billing cycle
        // For now, the period stays as "/month" since yearly is shown as monthly equivalent
    }
    
    // Add smooth scroll to pricing section if coming from a CTA
    const pricingLinks = document.querySelectorAll('a[href="#pricing"]');
    pricingLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pricingSection = document.getElementById('pricing');
            if (pricingSection) {
                pricingSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Handle CTA button clicks (you can customize this)
    const ctaButtons = document.querySelectorAll('.pricing-cta');
    ctaButtons.forEach(button => {
        button.addEventListener('click', handleCTAClick);
    });
    
    function handleCTAClick(event) {
        const button = event.currentTarget;
        const card = button.closest('.pricing-card');
        const plan = card.getAttribute('data-plan');
        
        // Add click animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 100);
        
        // Log the action (replace with your actual subscription logic)
        console.log(`User selected plan: ${plan}`);
        
        // You can add your subscription logic here
        // For example: redirect to signup, open modal, etc.
        
        // Example: Show alert (replace with your logic)
        const planNames = {
            'free': 'Explorer',
            'pro': 'Adventurer', 
            'enterprise': 'Premium'
        };
        
        alert(`You selected the ${planNames[plan]} plan! This is where you'd integrate your payment system.`);
    }
    
    // Add intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe pricing cards for scroll animations
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => observer.observe(card));
    
    // Observe FAQ items
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => observer.observe(item));
    
})();
