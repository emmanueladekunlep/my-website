// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== MOBILE MENU TOGGLE =====
document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (toggle && nav) {
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            nav.classList.toggle('open');
        });
    }
});

// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu
                const nav = document.querySelector('nav');
                const toggle = document.querySelector('.menu-toggle');
                if (nav) nav.classList.remove('open');
                if (toggle) toggle.classList.remove('active');
            }
        }
    });
});

// ===== DYNAMIC YEAR IN FOOTER =====
const yearSpan = document.querySelector('footer p');
if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = `© ${currentYear} Emmanuel Adekunle Peace — Empowering minds through digital education.`;
}

console.log('🚀 Emmanuel Adekunle Peace website loaded successfully!');