// Skills Animation System (Icon Grid Version)
class SkillsAnimator {
    constructor() {
        this.skillCards = document.querySelectorAll('.skill-card');
        this.animated = new Set();
        
        this.init();
    }
    
    init() {
        this.setupObserver();
    }
    
    setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated.has(entry.target)) {
                    this.animateSkillCard(entry.target);
                    this.animated.add(entry.target);
                }
            });
        }, { 
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe skill cards
        this.skillCards.forEach(card => {
            observer.observe(card);
        });
        
        // Observe stats
        document.querySelectorAll('[data-count]').forEach(stat => {
            observer.observe(stat);
        });
    }
    
    animateSkillCard(card) {
        // Add stagger animation to skill cards
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 50);
    }
}

// Counter Animation
class CounterAnimator {
    constructor() {
        this.counters = document.querySelectorAll('[data-count]');
        this.animated = new Set();
        this.setupObserver();
    }
    
    setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated.has(entry.target)) {
                    this.animateCounter(entry.target);
                    this.animated.add(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        this.counters.forEach(counter => observer.observe(counter));
    }
    
    animateCounter(element) {
        const target = parseInt(element.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target + (target >= 100 ? '+' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new SkillsAnimator();
    new CounterAnimator();
});
