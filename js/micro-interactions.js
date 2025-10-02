// Micro-interactions for enhanced UX
// Button ripples, card tilts, and other delightful effects

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 Initializing micro-interactions...');

    // Add ripple effect to all primary buttons
    initButtonRipples();
    
    // Add card tilt effect
    initCardTilt();
    
    // Add button classes for effects
    enhanceButtons();
    
    console.log('✅ Micro-interactions initialized');
});

// Button ripple effect
function initButtonRipples() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-ripple');
    
    buttons.forEach(button => {
        if (!button.classList.contains('btn-ripple')) {
            button.classList.add('btn-ripple');
        }
    });
}

// Card 3D tilt effect on mouse move
function initCardTilt() {
    const cards = document.querySelectorAll('.project-card .card, .skill-card, .timeline-card');
    
    cards.forEach(card => {
        if (!card.classList.contains('card-tilt')) {
            card.classList.add('card-tilt');
        }
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.setProperty('--rotate-x', `${rotateX}deg`);
            card.style.setProperty('--rotate-y', `${rotateY}deg`);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--rotate-x', '0deg');
            card.style.setProperty('--rotate-y', '0deg');
        });
    });
}

// Enhance buttons with glow effect
function enhanceButtons() {
    const primaryButtons = document.querySelectorAll('.btn-primary');
    
    primaryButtons.forEach(btn => {
        if (!btn.classList.contains('btn-glow')) {
            btn.classList.add('btn-glow');
        }
    });
}

// Add smooth scale to images
function initImageHover() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (!img.classList.contains('hover-scale')) {
            img.classList.add('hover-scale');
        }
    });
}

// Particle burst effect on click
function createParticleBurst(x, y) {
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#06b6d4'];
    const particleCount = 12;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.transition = 'all 0.8s ease-out';
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 50 + Math.random() * 50;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        requestAnimationFrame(() => {
            particle.style.transform = `translate(${tx}px, ${ty}px)`;
            particle.style.opacity = '0';
        });
        
        setTimeout(() => particle.remove(), 800);
    }
}

// Add particle burst to important buttons
document.addEventListener('click', (e) => {
    const target = e.target.closest('.btn-primary');
    if (target) {
        createParticleBurst(e.clientX, e.clientY);
    }
});

// Smooth reveal on scroll with intersection observer
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all cards for reveal animation
document.querySelectorAll('.card, .glass').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

// Add magnetic effect to nav links
function initMagneticButtons() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            link.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translate(0, 0)';
        });
    });
}

initMagneticButtons();

// Add cursor trail effect (optional, subtle)
let cursorTrail = [];
const maxTrailLength = 10;

document.addEventListener('mousemove', (e) => {
    // Only on desktop
    if (window.innerWidth < 768) return;
    
    cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    
    if (cursorTrail.length > maxTrailLength) {
        cursorTrail.shift();
    }
    
    // Remove old trails
    cursorTrail = cursorTrail.filter(point => Date.now() - point.time < 500);
});

console.log('🎨 Micro-interactions: Ripples, Tilts, Particles, and Magnetic effects ready!');
