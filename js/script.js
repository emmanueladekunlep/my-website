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
    
    if (toggle) {
        toggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('open');
        });
    }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
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

// ===== DYNAMIC YEAR =====
const yearSpan = document.querySelector('footer p');
if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = yearSpan.textContent.replace('2026', currentYear);
}

console.log('🚀 Emmanuel Adekunle Peace website loaded successfully!');

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = '#0a3d62';
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
    } else {
        header.style.background = '#0a3d62';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== ANIMATION ON SCROLL =====
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-fade, .animate-slide-left, .animate-slide-right');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 50) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.style.transform = 'translateX(0)';
        }
    });
};

window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// ===== MOBILE MENU TOGGLE =====
const addMobileMenu = () => {
    const nav = document.querySelector('nav');
    const headerContent = document.querySelector('.header-content');
    
    if (!document.querySelector('.menu-toggle')) {
        const toggle = document.createElement('button');
        toggle.className = 'menu-toggle';
        toggle.innerHTML = '☰';
        toggle.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            display: none;
        `;
        
        headerContent.insertBefore(toggle, nav);
        
        toggle.addEventListener('click', function() {
            if (nav.style.display === 'flex') {
                nav.style.display = 'none';
            } else {
                nav.style.display = 'flex';
            }
        });
    }
};

const handleMobileMenu = () => {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (window.innerWidth <= 768) {
        if (toggle) toggle.style.display = 'block';
        nav.style.display = 'none';
    } else {
        if (toggle) toggle.style.display = 'none';
        nav.style.display = 'flex';
    }
};

window.addEventListener('load', () => {
    addMobileMenu();
    handleMobileMenu();
});
window.addEventListener('resize', handleMobileMenu);

// ===== DYNAMIC YEAR IN FOOTER =====
const yearSpan = document.querySelector('footer p');
if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = `© ${currentYear} Emmanuel Adekunle Peace — Empowering minds through digital education.`;
}

console.log('🚀 Emmanuel Adekunle Peace website loaded successfully!');