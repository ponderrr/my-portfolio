// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

function setTheme(isDark) {
    body.classList.toggle('dark-mode', isDark);
    themeIcon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
    lucide.createIcons();
}

themeToggle.addEventListener('click', () => {
    const isDark = !body.classList.contains('dark-mode');
    setTheme(isDark);
    localStorage.setItem('darkMode', isDark);
});

// Load saved theme
const savedTheme = localStorage.getItem('darkMode') === 'true';
setTheme(savedTheme);

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href'))?.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize icons
lucide.createIcons();

// Smart Advisor Showcase
function initSmartAdvisorShowcase() {
    const slides = [
        {
            title: 'Home Page',
            lightImage: 'images/smart-advisor/home-light.png',
            darkImage: 'images/smart-advisor/home-dark.png',
            description: 'Landing page with Movie, Book, or Movie & Book recommendation options'
        },
        {
            title: 'Sign In / Sign Up',
            lightImage: 'images/smart-advisor/auth-light.png',
            darkImage: 'images/smart-advisor/auth-dark.png',
            description: 'Authentication page for user accounts'
        },
        {
            title: 'Question Selection',
            lightImage: 'images/smart-advisor/questions-select-light.png',
            darkImage: 'images/smart-advisor/questions-select-dark.png',
            description: 'Choose how many questions (3-15) to answer'
        },
        {
            title: 'Questionnaire',
            lightImage: 'images/smart-advisor/questionnaire-light.png',
            darkImage: 'images/smart-advisor/questionnaire-dark.png',
            description: 'Dynamic questions based on age and preferences'
        },
        {
            title: 'Results Page',
            lightImage: 'images/smart-advisor/results-light.png',
            darkImage: 'images/smart-advisor/results-dark.png',
            description: 'AI-powered recommendations based on user responses'
        }
    ];

    let currentSlide = 0;
    const track = document.querySelector('.slider-track');
    const dots = document.querySelector('.slide-dots');
    const titleEl = document.querySelector('.slide-title');
    const descriptionEl = document.querySelector('.slide-description');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');

    function createSlides() {
        slides.forEach((slide, index) => {
            const slideEl = document.createElement('div');
            slideEl.className = 'slide';
            slideEl.innerHTML = `
                <div class="slide-half">
                    <img src="${slide.lightImage}" alt="${slide.title} Light Mode">
                </div>
                <div class="slide-half">
                    <img src="${slide.darkImage}" alt="${slide.title} Dark Mode">
                </div>
            `;
            track.appendChild(slideEl);

            const dot = document.createElement('button');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => goToSlide(index));
            dots.appendChild(dot);

            slideEl.querySelectorAll('img').forEach(img => {
                img.style.cursor = 'pointer';
                img.addEventListener('click', () => {
                    modalImg.src = img.src;
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
            });
        });
    }

    function updateSlide() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        titleEl.textContent = slides[currentSlide].title;
        descriptionEl.textContent = slides[currentSlide].description;
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlide();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide();
    }

    document.querySelector('.modal-close')?.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Initialize slider
    createSlides();
    updateSlide();
    document.querySelector('.slider-nav.prev')?.addEventListener('click', prevSlide);
    document.querySelector('.slider-nav.next')?.addEventListener('click', nextSlide);
}


function initProjectNavigation() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.dataset.project;
            const content = document.getElementById(`${projectId}-content`);
            document.querySelectorAll('.project-expanded').forEach(el => el.classList.remove('active'));
            content?.classList.add('active');
            content?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}


document.addEventListener('DOMContentLoaded', () => {
    initSmartAdvisorShowcase();
    initProjectNavigation();
});


// Skills Section Functionality
function initializeSkills() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            button.classList.add('active');
            const tabId = button.dataset.tab;
            document.getElementById(tabId).classList.add('active');
        });
    });
    

    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        const header = card.querySelector('.skill-header');
        const details = card.querySelector('.skill-details');
        const expandBtn = card.querySelector('.expand-btn i');
        
        header.addEventListener('click', () => {
            const isExpanded = details.classList.contains('expanded');
            details.classList.toggle('expanded');
            expandBtn.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
        });
    });
}


document.addEventListener('DOMContentLoaded', () => {
    initializeSkills();
});




function initializeSkills() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            const tabId = button.dataset.tab;
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Handle skill box hover effects on mobile
    const skillBoxes = document.querySelectorAll('.skill-box');
    let touchStartY;

    skillBoxes.forEach(box => {
        box.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        });

        box.addEventListener('touchend', (e) => {
            const touchEndY = e.changedTouches[0].clientY;
            const touchDiff = touchStartY - touchEndY;

            // Only trigger flip if the user didn't scroll
            if (Math.abs(touchDiff) < 5) {
                box.classList.toggle('flipped');
            }
        });
    });
}

