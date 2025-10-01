// Scroll Reveal Animation
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.reveal');
        this.options = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Uncomment to animate only once
                    // this.observer.unobserve(entry.target);
                }
            });
        }, this.options);
        
        this.init();
    }
    
    init() {
        this.elements.forEach(element => {
            this.observer.observe(element);
        });
    }
}

// Add CSS for reveal animation
const style = document.createElement('style');
style.textContent = `
    .reveal {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .reveal.revealed {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Initialize scroll reveal
document.addEventListener('DOMContentLoaded', () => {
    new ScrollReveal();
});
