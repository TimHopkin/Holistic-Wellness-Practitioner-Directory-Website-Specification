// Directory page functionality

// Sample practitioner data
const practitionersData = [
    {
        id: 1,
        name: "Sarah Chen",
        modalities: ["Somatic Therapy", "Energy Healing", "Breathwork"],
        location: "San Francisco, CA",
        sessionTypes: ["virtual", "in-person"],
        priceRange: "100-150",
        bio: "Sarah is a compassionate somatic therapist with over 8 years of experience helping women reconnect with their bodies and heal from trauma. Her integrative approach combines somatic experiencing, energy healing, and breathwork.",
        specialties: ["Trauma Recovery", "Anxiety", "Body Image"],
        featured: true
    },
    {
        id: 2,
        name: "Maria Rodriguez",
        modalities: ["Life Coaching", "Mindfulness"],
        location: "Austin, TX",
        sessionTypes: ["virtual", "hybrid"],
        priceRange: "100-150",
        bio: "Maria empowers women to create meaningful lives through evidence-based coaching and mindfulness practices. She specializes in helping clients navigate life transitions and build resilience.",
        specialties: ["Life Transitions", "Career Coaching", "Mindfulness"],
        featured: true
    },
    {
        id: 3,
        name: "Luna Thompson",
        modalities: ["Reiki", "Crystal Healing"],
        location: "Portland, OR",
        sessionTypes: ["virtual", "in-person"],
        priceRange: "50-100",
        bio: "Luna brings a gentle, intuitive approach to energy healing. With certifications in Reiki and crystal therapy, she helps clients restore balance and tap into their inner wisdom.",
        specialties: ["Energy Healing", "Spiritual Guidance", "Chakra Balancing"],
        featured: true
    },
    {
        id: 4,
        name: "Aisha Patel",
        modalities: ["Acupuncture", "Herbalism"],
        location: "Seattle, WA",
        sessionTypes: ["in-person"],
        priceRange: "150-200",
        bio: "Licensed acupuncturist with 12 years of experience in Traditional Chinese Medicine. Aisha combines ancient wisdom with modern understanding to support women's health and wellness.",
        specialties: ["Women's Health", "Fertility", "Digestive Health"],
        featured: false
    },
    {
        id: 5,
        name: "Jennifer Kim",
        modalities: ["Breathwork", "Mindfulness"],
        location: "Denver, CO",
        sessionTypes: ["virtual", "in-person"],
        priceRange: "100-150",
        bio: "Jennifer guides clients through transformative breathwork journeys that release stored tension and expand consciousness. Her approach integrates mindfulness and somatic awareness.",
        specialties: ["Breathwork", "Anxiety", "Stress Management"],
        featured: false
    },
    {
        id: 6,
        name: "Dr. Rachel Greene",
        modalities: ["Somatic Therapy", "Life Coaching"],
        location: "Boulder, CO",
        sessionTypes: ["virtual", "hybrid"],
        priceRange: "200+",
        bio: "Dr. Greene is a licensed psychologist specializing in somatic approaches to healing. She helps high-achieving women reconnect with their bodies and find sustainable balance.",
        specialties: ["High Achievers", "Burnout Recovery", "Leadership"],
        featured: false
    },
    {
        id: 7,
        name: "Isabella Martinez",
        modalities: ["Energy Healing", "Crystal Healing"],
        location: "Miami, FL",
        sessionTypes: ["virtual", "in-person"],
        priceRange: "50-100",
        bio: "Isabella is a certified energy healer who works with crystals, sound healing, and intuitive guidance. She creates sacred spaces for deep healing and spiritual growth.",
        specialties: ["Spiritual Awakening", "Emotional Healing", "Intuitive Guidance"],
        featured: false
    },
    {
        id: 8,
        name: "Amanda Foster",
        modalities: ["Life Coaching", "Breathwork"],
        location: "Nashville, TN",
        sessionTypes: ["virtual"],
        priceRange: "100-150",
        bio: "Amanda empowers women entrepreneurs to align their business with their values while maintaining personal wellness. She combines strategic coaching with breathwork practices.",
        specialties: ["Entrepreneurship", "Work-Life Balance", "Business Alignment"],
        featured: false
    }
];

// Initialize directory page
document.addEventListener('DOMContentLoaded', function() {
    initializeDirectory();
});

function initializeDirectory() {
    const practitionersGrid = document.getElementById('practitionersGrid');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const filters = {
        modality: document.getElementById('modalityFilter'),
        sessionType: document.getElementById('sessionTypeFilter'),
        priceRange: document.getElementById('priceRangeFilter'),
        sortBy: document.getElementById('sortBy')
    };
    const clearFiltersBtn = document.getElementById('clearFilters');
    const resultsCount = document.getElementById('resultsCount');
    const gridViewBtn = document.getElementById('gridView');
    const listViewBtn = document.getElementById('listView');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    let currentPractitioners = [...practitionersData];
    let displayedCount = 0;
    const itemsPerPage = 6;

    // Initial render
    renderPractitioners();
    
    // Category card functionality
    initializeCategoryCards();

    // Search functionality
    if (searchInput && searchButton) {
        const debouncedSearch = utils.debounce(() => {
            filterAndSort();
        }, 300);

        searchInput.addEventListener('input', debouncedSearch);
        searchButton.addEventListener('click', filterAndSort);
    }

    // Filter change handlers
    Object.values(filters).forEach(filter => {
        if (filter) {
            filter.addEventListener('change', filterAndSort);
        }
    });

    // Clear filters
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearAllFilters);
    }

    // View toggle
    if (gridViewBtn && listViewBtn) {
        gridViewBtn.addEventListener('click', () => setViewMode('grid'));
        listViewBtn.addEventListener('click', () => setViewMode('list'));
    }

    // Load more
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMorePractitioners);
    }

    function filterAndSort() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const modalityFilter = filters.modality ? filters.modality.value : '';
        const sessionTypeFilter = filters.sessionType ? filters.sessionType.value : '';
        const priceRangeFilter = filters.priceRange ? filters.priceRange.value : '';
        const sortBy = filters.sortBy ? filters.sortBy.value : 'featured';

        // Filter practitioners
        currentPractitioners = practitionersData.filter(practitioner => {
            const matchesSearch = !searchTerm || 
                practitioner.name.toLowerCase().includes(searchTerm) ||
                practitioner.modalities.some(m => m.toLowerCase().includes(searchTerm)) ||
                practitioner.location.toLowerCase().includes(searchTerm) ||
                practitioner.specialties.some(s => s.toLowerCase().includes(searchTerm));

            const matchesModality = !modalityFilter || 
                practitioner.modalities.some(m => m.toLowerCase().replace(/\s+/g, '-') === modalityFilter);

            const matchesSessionType = !sessionTypeFilter ||
                practitioner.sessionTypes.includes(sessionTypeFilter);

            const matchesPriceRange = !priceRangeFilter ||
                practitioner.priceRange === priceRangeFilter;

            return matchesSearch && matchesModality && matchesSessionType && matchesPriceRange;
        });

        // Sort practitioners
        switch (sortBy) {
            case 'featured':
                currentPractitioners.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
                break;
            case 'newest':
                // Random order to simulate newest (since we don't have dates)
                currentPractitioners.sort(() => Math.random() - 0.5);
                break;
            case 'popular':
                // Random order to simulate popularity (since we don't have popularity data)
                currentPractitioners.sort(() => Math.random() - 0.5);
                break;
            case 'name':
                currentPractitioners.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }

        displayedCount = 0;
        renderPractitioners();
    }

    function clearAllFilters() {
        if (searchInput) searchInput.value = '';
        Object.values(filters).forEach(filter => {
            if (filter) filter.value = '';
        });
        filterAndSort();
    }

    function renderPractitioners() {
        if (!practitionersGrid) return;

        const practitionersToShow = currentPractitioners.slice(0, displayedCount + itemsPerPage);
        displayedCount = practitionersToShow.length;

        if (practitionersToShow.length === 0) {
            utils.showNoResults(practitionersGrid, 'No practitioners found');
            updateResultsCount(0);
            hideLoadMoreButton();
            return;
        }

        practitionersGrid.innerHTML = practitionersToShow.map(practitioner => 
            createPractitionerCard(practitioner)
        ).join('');

        updateResultsCount(currentPractitioners.length);
        updateLoadMoreButton();
    }

    function createPractitionerCard(practitioner) {
        const modalitiesText = practitioner.modalities.join(' • ');
        const sessionTypesText = practitioner.sessionTypes.map(type => 
            type === 'virtual' ? '💻 Virtual' : 
            type === 'in-person' ? '🏠 In-Person' : 
            '🔄 Hybrid'
        ).join(' • ');

        return `
            <div class="practitioner-card ${practitioner.featured ? 'featured' : ''}">
                ${practitioner.featured ? '<div class="featured-badge">Featured</div>' : ''}
                <div class="card-header">
                    <div class="practitioner-avatar">
                        <span>Photo</span>
                    </div>
                    <div class="card-info">
                        <h3>${practitioner.name}</h3>
                        <p class="modalities-list">${modalitiesText}</p>
                        <p class="location-info">📍 ${practitioner.location}</p>
                    </div>
                </div>
                <div class="card-content">
                    <div class="card-body">
                        <p class="practitioner-bio">${practitioner.bio}</p>
                        <div class="session-details">
                            <span class="session-tag">${sessionTypesText}</span>
                            <span class="price-range">$${practitioner.priceRange.replace('-', ' - ')}</span>
                        </div>
                    </div>
                    <div class="card-footer">
                        <a href="practitioner-profile.html?id=${practitioner.id}" class="view-profile-btn">View Profile</a>
                        <button class="contact-btn" onclick="contactPractitioner(${practitioner.id})">Contact</button>
                    </div>
                </div>
            </div>
        `;
    }

    function updateResultsCount(count) {
        if (resultsCount) {
            resultsCount.textContent = `${count} practitioner${count !== 1 ? 's' : ''} found`;
        }
    }

    function updateLoadMoreButton() {
        if (loadMoreBtn) {
            if (displayedCount >= currentPractitioners.length) {
                hideLoadMoreButton();
            } else {
                loadMoreBtn.style.display = 'block';
            }
        }
    }

    function hideLoadMoreButton() {
        if (loadMoreBtn) {
            loadMoreBtn.style.display = 'none';
        }
    }

    function loadMorePractitioners() {
        renderPractitioners();
    }

    function setViewMode(mode) {
        if (practitionersGrid) {
            practitionersGrid.className = `practitioners-results ${mode}-view`;
        }
        
        if (gridViewBtn && listViewBtn) {
            gridViewBtn.classList.toggle('active', mode === 'grid');
            listViewBtn.classList.toggle('active', mode === 'list');
        }
    }

    function initializeCategoryCards() {
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            card.addEventListener('click', function() {
                const categoryTitle = this.querySelector('h3').textContent.toLowerCase();
                let modalityFilter = '';
                
                // Map category titles to modality filters
                switch(categoryTitle) {
                    case 'mind & meditation':
                        modalityFilter = 'mindfulness';
                        break;
                    case 'energy healing':
                        modalityFilter = 'energy-healing';
                        break;
                    case 'somatic therapy':
                        modalityFilter = 'somatic-therapy';
                        break;
                    case 'life coaching':
                        modalityFilter = 'life-coaching';
                        break;
                    case 'traditional healing':
                        modalityFilter = 'acupuncture';
                        break;
                    case 'breathwork':
                        modalityFilter = 'breathwork';
                        break;
                }
                
                // Set the modality filter and scroll to results
                if (filters.modality) {
                    filters.modality.value = modalityFilter;
                    filterAndSort();
                }
                
                // Scroll to results section
                const resultsSection = document.querySelector('.results-section');
                if (resultsSection) {
                    resultsSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
}

// Contact practitioner function
function contactPractitioner(practitionerId) {
    const practitioner = practitionersData.find(p => p.id === practitionerId);
    if (practitioner) {
        alert(`Contact feature would open communication with ${practitioner.name}. This would typically open a contact form or email client.`);
    }
}

// Export for global access
window.practitionersData = practitionersData;