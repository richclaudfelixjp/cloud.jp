// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Age Calculator
    function calculateAge() {
        const birthDate = new Date('1999-10-30');
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age;
    }

    // Update age display
    const ageElement = document.getElementById('age-display');
    if (ageElement) {
        ageElement.textContent = `${calculateAge()}`;
    }

    // Simplified Navigation System
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollPos = window.pageYOffset + 100;
        
        // Clear all active states
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Find current section (excluding home)
        let currentSection = '';
        
        sections.forEach(section => {
            const id = section.getAttribute('id');
            if (id === 'home') return; // Skip home section
            
            const rect = section.getBoundingClientRect();
            const sectionTop = window.pageYOffset + rect.top;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop - 50 && scrollPos < sectionTop + sectionHeight - 50) {
                currentSection = id;
            }
        });
        
        // Set active navigation
        if (currentSection) {
            const activeLink = document.querySelector(`[href="#${currentSection}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }

    // Smooth scroll for navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const isMobile = window.innerWidth <= 768;
                const offset = isMobile ? 0 : 70;
                const targetPosition = targetSection.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Logo click handler
    const logoLink = document.querySelector('.logo a');
    if (logoLink) {
        logoLink.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(link => link.classList.remove('active'));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Language Dropdown
    const languageDropdown = document.querySelector('.language-dropdown');
    const languageToggle = document.querySelector('.language-toggle');
    const languageOptions = document.querySelectorAll('.language-option');

    if (languageToggle) {
        languageToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            languageDropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!languageDropdown.contains(e.target)) {
                languageDropdown.classList.remove('active');
            }
        });

        // Handle language selection
        languageOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                
                const langCode = this.dataset.lang.toUpperCase();
                const langText = languageToggle.querySelector('.language-text');
                if (langText) langText.textContent = langCode;
                
                languageDropdown.classList.remove('active');
                
                const href = this.getAttribute('href');
                if (href && href !== '#') {
                    window.location.href = href;
                }
            });
        });
    }

    // Form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            const submitButton = this.querySelector('.btn-submit');
            if (submitButton) {
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
            }
        });
    }

    // Simple fade-in animation
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Apply animations
    document.querySelectorAll('.timeline-item, .project-card, .info-card').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `all 0.6s ease ${i * 0.1}s`;
        observer.observe(el);
    });

    // Throttled scroll handler
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) return;
        scrollTimeout = setTimeout(() => {
            updateActiveNav();
            scrollTimeout = null;
        }, 10);
    });

    // Initialize
    updateActiveNav();
});