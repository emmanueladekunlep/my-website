// ===== SPARKLE EFFECT =====
(function createSparkles() {
    const canvas = document.getElementById('sparkle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const PARTICLE_COUNT = 80;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 3 + 1.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.8 + 0.2;
            this.twinkleSpeed = Math.random() * 0.02 + 0.01;
            this.twinklePhase = Math.random() * Math.PI * 2;
            // Gold or plum colors
            this.hue = Math.random() > 0.5 ? 40 : 290; // 40 = gold, 290 = plum
            this.saturation = 70 + Math.random() * 30;
            this.lightness = 60 + Math.random() * 30;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.twinklePhase += this.twinkleSpeed;

            // Wrap around edges
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;

            // Random direction change
            if (Math.random() < 0.005) {
                this.speedX = (Math.random() - 0.5) * 0.8;
                this.speedY = (Math.random() - 0.5) * 0.8;
            }
        }

        draw() {
            const twinkle = 0.6 + 0.4 * Math.sin(this.twinklePhase);
            const alpha = this.opacity * twinkle;

            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * twinkle, 0, Math.PI * 2);
            ctx.fillStyle = 'hsla(' + this.hue + ', ' + this.saturation + '%, ' + this.lightness + '%, ' + alpha + ')';
            ctx.fill();

            // Glow effect for some particles
            if (this.size > 2.5 && twinkle > 0.8) {
                ctx.shadowColor = 'hsla(' + this.hue + ', ' + this.saturation + '%, ' + this.lightness + '%, 0.3)';
                ctx.shadowBlur = 8;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }
    }

    // Create particles
    for (var i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }

    // Connect particles with lines
    function drawLines() {
        for (var i = 0; i < particles.length; i++) {
            for (var j = i + 1; j < particles.length; j++) {
                var dx = particles[i].x - particles[j].x;
                var dy = particles[i].y - particles[j].y;
                var distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    var opacity = 0.15 * (1 - distance / 120);
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = 'rgba(200, 161, 75, ' + opacity + ')';
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (var i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }

        drawLines();
        requestAnimationFrame(animate);
    }

    animate();

    // Reinitialize on resize
    window.addEventListener('resize', function() {
        resize();
        for (var i = 0; i < particles.length; i++) {
            particles[i].reset();
        }
    });
})();

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', function() {
    var header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// ===== MOBILE HAMBURGER MENU =====
document.addEventListener('DOMContentLoaded', function() {
    var hamburger = document.getElementById('hamburger');
    var navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        // Toggle menu on hamburger click
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            navMenu.classList.toggle('open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                navMenu.classList.remove('open');
                hamburger.classList.remove('active');
            }
        });

        // Close menu when clicking a link (mobile)
        var navLinks = navMenu.querySelectorAll('a');
        for (var i = 0; i < navLinks.length; i++) {
            navLinks[i].addEventListener('click', function() {
                // For page navigation, close menu on mobile
                if (window.innerWidth <= 768) {
                    setTimeout(function() {
                        navMenu.classList.remove('open');
                        hamburger.classList.remove('active');
                    }, 200);
                }
            });
        }
    }

    // ===== ACTIVE NAV LINK =====
    var currentPath = window.location.pathname.split('/').pop() || 'index.html';
    var navLinks = document.querySelectorAll('nav a');
    for (var i = 0; i < navLinks.length; i++) {
        var link = navLinks[i];
        var href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    }

    // ===== SMOOTH SCROLL FOR HASH LINKS =====
    var hashLinks = document.querySelectorAll('a[href^="#"]');
    for (var i = 0; i < hashLinks.length; i++) {
        hashLinks[i].addEventListener('click', function(e) {
            var targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                e.preventDefault();
                var targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    }
});

// ===== DYNAMIC YEAR IN FOOTER =====
document.addEventListener('DOMContentLoaded', function() {
    var footerYear = document.querySelector('footer p');
    if (footerYear) {
        var currentYear = new Date().getFullYear();
        footerYear.textContent = footerYear.textContent.replace('2026', currentYear);
    }
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
document.addEventListener('DOMContentLoaded', function() {
    var animateElements = document.querySelectorAll('.animate-fade, .animate-slide-left, .animate-slide-right');
    
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries) {
            for (var i = 0; i < entries.length; i++) {
                if (entries[i].isIntersecting) {
                    entries[i].target.style.opacity = '1';
                }
            }
        }, { threshold: 0.1 });
        
        for (var i = 0; i < animateElements.length; i++) {
            observer.observe(animateElements[i]);
        }
    } else {
        // Fallback for older browsers
        for (var i = 0; i < animateElements.length; i++) {
            animateElements[i].style.opacity = '1';
        }
    }
});

console.log('Plum & Gold website loaded successfully with sparkles!');