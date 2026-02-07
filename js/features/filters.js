/* ==========================================
   DISCOVER EGYPT - FILTERS.JS
   Category filtering
   ========================================== */

// ========== EXPLORE FILTERS ==========
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const exploreCards = document.querySelectorAll('.explore-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get selected category
            const category = this.getAttribute('data-category');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter cards
            exploreCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (category === 'all' || cardCategory === category) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}
