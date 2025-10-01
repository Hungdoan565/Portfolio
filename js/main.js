// Main JavaScript File - General Interactions & Utilities

// Custom Cursor
class CustomCursor {
    constructor() {
        this.cursor = document.getElementById('custom-cursor');
        this.cursorDot = document.getElementById('cursor-dot');
        
        if (this.cursor && this.cursorDot) {
            this.init();
        }
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';
            this.cursorDot.style.left = e.clientX + 'px';
            this.cursorDot.style.top = e.clientY + 'px';
        });
        
        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .card, .project-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                this.cursor.style.borderColor = '#ec4899';
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                this.cursor.style.borderColor = '#38bdf8';
            });
        });
    }
}

// Navbar Scroll Effect
class NavbarHandler {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.lastScroll = 0;
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Add background and blur on scroll
            if (currentScroll > 100) {
                this.navbar.classList.add('glass', 'shadow-lg');
                this.navbar.style.backdropFilter = 'blur(12px)';
            } else {
                this.navbar.classList.remove('glass', 'shadow-lg');
                this.navbar.style.backdropFilter = 'none';
            }
            
            // Hide/show navbar on scroll direction
            if (currentScroll > this.lastScroll && currentScroll > 500) {
                this.navbar.style.transform = 'translateY(-100%)';
            } else {
                this.navbar.style.transform = 'translateY(0)';
            }
            
            this.lastScroll = currentScroll;
        });
        
        // Active link highlighting
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('text-primary-400');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('text-primary-400');
                }
            });
        });
    }
}

// Mobile Menu
class MobileMenu {
    constructor() {
        this.menuBtn = document.getElementById('mobile-menu-btn');
        this.menu = document.getElementById('mobile-menu');
        this.menuLinks = this.menu.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        this.menuBtn.addEventListener('click', () => {
            this.menu.classList.toggle('hidden');
            const icon = this.menuBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
        
        // Close menu when clicking a link
        this.menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.menu.classList.add('hidden');
                const icon = this.menuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
}

// Back to Top Button
class BackToTop {
    constructor() {
        this.btn = document.getElementById('back-to-top');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                this.btn.style.opacity = '1';
                this.btn.style.pointerEvents = 'auto';
            } else {
                this.btn.style.opacity = '0';
                this.btn.style.pointerEvents = 'none';
            }
        });
        
        this.btn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Enhanced Theme Toggle with System Preference Support
class ThemeToggler {
    constructor() {
        this.btn = document.getElementById('theme-toggle');
        this.html = document.documentElement;
        this.init();
    }
    
    init() {
        // Check for saved theme or system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'light' || (!savedTheme && !systemPrefersDark)) {
            this.setTheme('light');
        } else {
            this.setTheme('dark');
        }
        
        // Listen for toggle clicks
        this.btn.addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
    
    setTheme(theme) {
        const icon = this.btn.querySelector('i');
        
        if (theme === 'dark') {
            this.html.classList.add('dark');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            this.html.classList.remove('dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
        
        localStorage.setItem('theme', theme);
    }
    
    toggleTheme() {
        const currentTheme = this.html.classList.contains('dark') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
}

// Visitor Counter (Easter Egg)
class VisitorCounter {
    constructor() {
        this.counter = document.getElementById('visitor-count');
        this.init();
    }
    
    init() {
        if (!this.counter) return;
        
        let visits = localStorage.getItem('visits') || 0;
        visits = parseInt(visits) + 1;
        localStorage.setItem('visits', visits);
        
        // Animate counter
        this.animateCounter(1337, visits + 1337);
    }
    
    animateCounter(start, end) {
        const duration = 2000;
        const step = (end - start) / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= end) {
                this.counter.textContent = end;
                clearInterval(timer);
            } else {
                this.counter.textContent = Math.floor(current);
            }
        }, 16);
    }
}

// Smooth Scroll for anchor links
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Konami Code Easter Egg
class KonamiCode {
    constructor() {
        this.pattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        this.current = 0;
        this.init();
    }
    
    init() {
        document.addEventListener('keydown', (e) => {
            if (e.key === this.pattern[this.current]) {
                this.current++;
                if (this.current === this.pattern.length) {
                    this.activate();
                    this.current = 0;
                }
            } else {
                this.current = 0;
            }
        });
    }
    
    activate() {
        // Add fun animation
        document.body.style.animation = 'rainbow 2s ease infinite';
        
        // Add CSS for rainbow effect
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        // Show message
        alert('🎉 You found the secret! 🎉');
        
        // Reset after 5 seconds
        setTimeout(() => {
            document.body.style.animation = '';
            style.remove();
        }, 5000);
    }
}

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
    new CustomCursor();
    new NavbarHandler();
    new MobileMenu();
    new BackToTop();
    new ThemeToggler();
    new VisitorCounter();
    new KonamiCode();
    smoothScroll();
    
    // Log welcome message
    console.log('%c👋 Welcome to my Portfolio!', 'color: #38bdf8; font-size: 20px; font-weight: bold;');
    console.log('%cInterested in the code? Check it out on GitHub!', 'color: #ec4899; font-size: 14px;');
});

// Performance observer
if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            console.log(`⚡ ${entry.name}: ${entry.duration.toFixed(2)}ms`);
        }
    });
    observer.observe({ entryTypes: ['measure'] });
}
