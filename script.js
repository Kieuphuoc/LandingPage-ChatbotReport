/**
 * AI ERP CHATBOT LANDING PAGE - SCRIPT.JS
 * Handles animations, interactions, and dynamic functionality
 */

// ==================== DOM READY ====================
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initRoleTabs();
    initScrollAnimations();
    initSmoothScroll();
    initMobileMenu();
    initLottieAnimations();
    initParallaxEffects();
});

// ==================== NAVBAR SCROLL EFFECT ====================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });
}

// ==================== ROLE TABS ====================
function initRoleTabs() {
    const tabs = document.querySelectorAll('.role-tab');
    const contents = document.querySelectorAll('.role-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const role = tab.dataset.role;

            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update active content with animation
            contents.forEach(content => {
                content.classList.remove('active');
                if (content.id === role) {
                    content.classList.add('active');

                    // Re-trigger animations for new content
                    const cards = content.querySelectorAll('.role-feature-card');
                    cards.forEach((card, index) => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.transition = 'all 0.5s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            });
        });
    });
}

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');

                // Add stagger effect for grid items
                if (entry.target.parentElement) {
                    const siblings = entry.target.parentElement.querySelectorAll('.animate-on-scroll');
                    siblings.forEach((sibling, index) => {
                        sibling.style.transitionDelay = `${index * 0.1}s`;
                    });
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const mobileMenu = document.querySelector('.nav-menu');
                if (mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });
}

// ==================== MOBILE MENU ====================
function initMobileMenu() {
    const toggle = document.getElementById('mobileToggle');
    const navbar = document.getElementById('navbar');

    if (toggle) {
        toggle.addEventListener('click', () => {
            navbar.classList.toggle('mobile-open');
            toggle.classList.toggle('active');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navbar.classList.contains('mobile-open')) {
            navbar.classList.remove('mobile-open');
            toggle.classList.remove('active');
        }
    });
}

// ==================== LOTTIE ANIMATIONS ====================
function initLottieAnimations() {
    // Hero Animation - Using a reliable robot/dashboard animation
    const heroLottie = document.getElementById('heroLottie');
    if (heroLottie) {
        // Use a working Lottie animation URL
        heroLottie.src = 'https://lottie.host/e7b97fcd-2d81-4c93-8fc0-4d1b3b51d5e5/X8pEMPQW3u.json';

        // Fallback animation if main fails
        heroLottie.addEventListener('error', () => {
            heroLottie.src = 'https://assets10.lottiefiles.com/packages/lf20_fcfjwiyb.json';
        });
    }

    // Solution Animation
    const solutionLottie = document.getElementById('solutionLottie');
    if (solutionLottie) {
        solutionLottie.src = 'https://lottie.host/0c34f2b4-d8bf-48e4-bc67-0f3cc5d14f45/0QLvhBXb6A.json';

        // Fallback
        solutionLottie.addEventListener('error', () => {
            solutionLottie.src = 'https://assets5.lottiefiles.com/packages/lf20_kuiikza1.json';
        });
    }
}

// ==================== PARALLAX EFFECTS ====================
function initParallaxEffects() {
    const heroVisual = document.querySelector('.hero-visual');
    const heroGlow = document.querySelector('.hero-glow');

    if (heroVisual && heroGlow) {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;

            heroGlow.style.transform = `translate(${mouseX * 30}px, ${mouseY * 30}px)`;
        });
    }
}

// ==================== COUNTER ANIMATION ====================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const step = target / (duration / 16);

    const updateCounter = () => {
        start += step;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    };

    updateCounter();
}

// Initialize counters when visible
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number span');
            statNumbers.forEach(num => {
                const text = num.textContent;
                if (text.includes('+')) {
                    const value = parseInt(text.replace(/\D/g, ''));
                    animateCounter(num, value);
                    num.dataset.animated = 'true';
                }
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    counterObserver.observe(heroStats);
}

// ==================== PRICING CARD HOVER EFFECTS ====================
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        // Add glow effect
        this.style.boxShadow = '0 0 40px rgba(79, 70, 229, 0.3)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.boxShadow = '';
    });
});

// ==================== BUTTON RIPPLE EFFECT ====================
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple styles dynamically
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: rippleAnimation 0.6s linear;
        pointer-events: none;
    }
    @keyframes rippleAnimation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ==================== TYPING EFFECT FOR HERO ====================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// ==================== MOBILE MENU STYLES ====================
const mobileStyles = document.createElement('style');
mobileStyles.textContent = `
    @media (max-width: 768px) {
        .navbar.mobile-open .nav-menu {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            padding: 20px;
            gap: 16px;
            border-bottom: 1px solid rgba(79, 70, 229, 0.1);
            animation: slideDown 0.3s ease;
        }
        
        .navbar.mobile-open .nav-cta {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: calc(100% + 160px);
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            padding: 20px;
            gap: 12px;
            border-bottom: 1px solid rgba(79, 70, 229, 0.1);
        }
        
        .mobile-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    }
`;
document.head.appendChild(mobileStyles);

// ==================== PERFORMANCE OPTIMIZATION ====================
// Lazy load images
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

// ==================== LOADING SCREEN ====================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Animate hero elements after load
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-cta, .hero-stats');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';

        setTimeout(() => {
            el.style.transition = 'all 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });
});

// ==================== CONSOLE BRANDING ====================
console.log('%c🤖 AI ERP Chatbot', 'font-size: 24px; font-weight: bold; color: #4F46E5;');
console.log('%cTrợ lý điều hành doanh nghiệp thông minh', 'font-size: 14px; color: #7C3AED;');
