/* ===================================
   PORTFOLIO JAVASCRIPT
   Main functionality for portfolio website
   =================================== */

// ===== THEME TOGGLE (DARK MODE) =====
// Initialize dark mode from localStorage and toggle functionality

const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const body = document.body;

/**
 * Initialize theme from localStorage
 * Check if user has previously selected dark mode
 */
function initializeTheme() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (isDarkMode) {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    } else {
        body.classList.remove('dark-mode');
        themeToggle.textContent = '🌙';
    }
}

/**
 * Toggle dark mode on/off
 * Save preference to localStorage
 */
themeToggle.addEventListener('click', () => {
    const isDarkMode = body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    
    // Update icon based on current mode
    themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
});

// Initialize theme when page loads
document.addEventListener('DOMContentLoaded', initializeTheme);

// ===== NAVIGATION TOGGLE =====
// Handle mobile menu open/close with hamburger menu

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

/**
 * Toggle hamburger menu and navigation
 */
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

/**
 * Close mobile menu when a navigation link is clicked
 */
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

/**
 * Close mobile menu when clicking outside of it
 */
document.addEventListener('click', (event) => {
    const isClickInsideNav = navMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);
    
    if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===== FORM VALIDATION =====
// Handle contact form submission and validation

const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

/**
 * Validate email format using regex
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if email is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate a single form field
 * @param {string} fieldId - The ID of the form field
 * @param {string} errorId - The ID of the error message element
 * @returns {boolean} - True if field is valid
 */
function validateField(fieldId, errorId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(errorId);
    const fieldGroup = field.parentElement;
    let isValid = true;
    let errorMessage = '';

    // Clear previous error
    field.parentElement.classList.remove('error');
    errorElement.classList.remove('show');

    if (field.value.trim() === '') {
        isValid = false;
        errorMessage = `${field.name.charAt(0).toUpperCase() + field.name.slice(1)} is required`;
    } else if (fieldId === 'email' && !isValidEmail(field.value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
    } else if (fieldId === 'name' && field.value.trim().length < 2) {
        isValid = false;
        errorMessage = 'Name must be at least 2 characters long';
    } else if (fieldId === 'message' && field.value.trim().length < 10) {
        isValid = false;
        errorMessage = 'Message must be at least 10 characters long';
    }

    if (!isValid) {
        fieldGroup.classList.add('error');
        errorElement.textContent = errorMessage;
        errorElement.classList.add('show');
    }

    return isValid;
}

/**
 * Handle form submission
 */
contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Validate all fields
    const isNameValid = validateField('name', 'nameError');
    const isEmailValid = validateField('email', 'emailError');
    const isSubjectValid = validateField('subject', 'subjectError');
    const isMessageValid = validateField('message', 'messageError');

    // If all fields are valid
    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        // Simulate form submission (in real scenario, send to backend)
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        console.log('Form Data:', formData);

        // Show success message
        successMessage.textContent = '✓ Message sent successfully! Thank you for reaching out. I\'ll get back to you soon.';
        successMessage.classList.add('show');

        // Reset form
        contactForm.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
    }
});

/**
 * Real-time validation on field blur
 */
['name', 'email', 'subject', 'message'].forEach(fieldId => {
    document.getElementById(fieldId).addEventListener('blur', () => {
        const errorId = fieldId + 'Error';
        validateField(fieldId, errorId);
    });
});

// ===== SMOOTH SCROLL =====
// Enhance smooth scrolling behavior (CSS handles scroll-behavior: smooth)

/**
 * Smooth scroll to a section
 * @param {string} targetId - The ID of the target section
 */
function smoothScrollToSection(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===== SCROLL ANIMATIONS =====
// Animate elements when they come into view

/**
 * Initialize Intersection Observer for scroll animations
 */
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when element comes into view
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all skill cards, project cards, and education cards
    const elementsToObserve = document.querySelectorAll(
        '.skill-card, .project-card, .education-card, .achievement-card'
    );

    elementsToObserve.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// ===== PROGRESS BAR ANIMATION =====
// Animate progress bars when they come into view

function animateProgressBars() {
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger animation
                const progressBar = entry.target.querySelector('.progress');
                if (progressBar) {
                    progressBar.style.animation = 'none';
                    // Trigger reflow to restart animation
                    void progressBar.offsetWidth;
                    progressBar.style.animation = 'slideIn 1.5s ease-out forwards';
                }
            }
        });
    }, observerOptions);

    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => observer.observe(card));
}

// Add animation keyframe
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            width: 0;
        }
        to {
            width: var(--width);
        }
    }
`;
document.head.appendChild(style);

// ===== ACTIVE NAV LINK INDICATOR =====
// Highlight current section in navigation

/**
 * Update active nav link based on scroll position
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

/**
 * Add styles for active nav link
 */
const navLinkStyle = document.createElement('style');
navLinkStyle.textContent = `
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(navLinkStyle);

// ===== UTILITY FUNCTIONS =====

/**
 * Debounce function to limit how often a function is called
 * @param {function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {function} - Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== EVENT LISTENERS =====

// Update active nav link on scroll
window.addEventListener('scroll', debounce(updateActiveNavLink, 100));

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeScrollAnimations();
    animateProgressBars();
    updateActiveNavLink();
});

// Handle window resize for responsive behavior
window.addEventListener('resize', debounce(() => {
    // Add any resize-specific logic here if needed
}, 250));

// ===== ACCESSIBILITY ENHANCEMENTS =====

/**
 * Add focus styles for keyboard navigation
 */
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    .btn:focus,
    .nav-link:focus,
    input:focus,
    textarea:focus,
    .project-btn:focus,
    .social-btn:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
    }
`;
document.head.appendChild(focusStyle);

/**
 * Log portfolio information to console
 */
console.log('%cWelcome to Sahithi Sai\'s Portfolio', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%cExplore the website and feel free to get in touch!', 'font-size: 14px; color: #64748b;');
console.log('%cTechnologies used: HTML5, CSS3, JavaScript (Vanilla)', 'font-size: 12px; color: #94a3b8;');
