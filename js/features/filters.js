/* ==========================================
   DISCOVER EGYPT - FILTERS.JS
   Category filtering for dynamic cards
   ========================================== */

// ========== EXPLORE FILTERS ==========
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get selected category
            const category = this.getAttribute('data-category');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter cards dynamically
            filterExploreCards(category);
        });
    });
}

// ========== Filter Cards Function ==========
function filterExploreCards(category) {
    const exploreCards = document.querySelectorAll('.explore-card');
    
    exploreCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            card.classList.remove('hidden');
            // Animate in
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 10);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
                card.classList.add('hidden');
            }, 300);
        }
    });
}

// Re-initialize filters when cards are reloaded
document.addEventListener('cardsLoaded', () => {
    initializeFilters();
});
