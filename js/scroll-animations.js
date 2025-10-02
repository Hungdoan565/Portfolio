// Scroll-triggered Animations
// Includes: Stats counter animation, skill cards reveal animation, and general scroll reveals

class ScrollAnimations {
    constructor() {
        this.counters = [];
        this.skillCards = [];
        this.revealElements = [];
        this.isInitialized = false;
        
        this.init();
    }
    
    init() {
        try {
            this.setupIntersectionObserver();
            this.findAnimationElements();
            this.setupScrollListener();
            
            console.log('✅ Scroll animations initialized');
            this.isInitialized = true;
        } catch (error) {
            console.error('❌ Failed to initialize scroll animations:', error);
        }
    }
    
    setupIntersectionObserver() {
        // Observer for stats counters
        this.counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-counted')) {
                    this.animateCounter(entry.target);
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        });
        
        // Observer for skill cards
        this.skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                    this.animateSkillCard(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observer for general reveal elements
        this.revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    this.revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
    }
    
    findAnimationElements() {
        // Find stats counters
        this.counters = document.querySelectorAll('[data-counter]');
        this.counters.forEach(counter => {
            this.counterObserver.observe(counter);
        });
        
        // Find skill cards
        this.skillCards = document.querySelectorAll('.skill-card');
        this.skillCards.forEach((card, index) => {
            // Add staggered delay
            card.style.setProperty('--animation-delay', `${index * 0.1}s`);
            this.skillObserver.observe(card);
        });
        
        // Find reveal elements that don't have the 'reveal' class applied yet
        this.revealElements = document.querySelectorAll('.reveal:not(.animate-in)');
        this.revealElements.forEach(element => {
            this.revealObserver.observe(element);
        });
        
        console.log(`Found ${this.counters.length} counters, ${this.skillCards.length} skill cards, ${this.revealElements.length} reveal elements`);
    }
    
    animateCounter(counterElement) {
        try {
            const targetValue = parseInt(counterElement.getAttribute('data-counter'));
            const suffix = counterElement.getAttribute('data-suffix') || '';
            const duration = 2000; // 2 seconds
            const increment = targetValue / (duration / 16); // 60fps
            
            let currentValue = 0;
            counterElement.setAttribute('data-counted', 'true');
            
            const timer = setInterval(() => {
                currentValue += increment;
                
                if (currentValue >= targetValue) {
                    currentValue = targetValue;
                    clearInterval(timer);
                }
                
                // Add easing effect
                const easedValue = this.easeOutQuart(currentValue / targetValue) * targetValue;
                const displayValue = Math.floor(easedValue);
                
                counterElement.textContent = displayValue + suffix;
                
                // Add pulsing effect when counter reaches target
                if (currentValue >= targetValue) {
                    counterElement.classList.add('counter-complete');
                    setTimeout(() => {
                        counterElement.classList.remove('counter-complete');
                    }, 500);
                }
            }, 16);
            
            // Track analytics if available
            if (window.Analytics) {
                Analytics.trackScrollAnimation('stats-counter', targetValue);
            }
            
        } catch (error) {
            console.error('Error animating counter:', error);
            // Fallback: set final value immediately
            const targetValue = parseInt(counterElement.getAttribute('data-counter'));
            const suffix = counterElement.getAttribute('data-suffix') || '';
            counterElement.textContent = targetValue + suffix;
        }
    }
    
    animateSkillCard(skillCard) {
        try {
            skillCard.setAttribute('data-animated', 'true');
            skillCard.classList.add('skill-animate-in');
            
            // Add wave effect to skill section
            const skillSection = skillCard.closest('.mb-12');
            if (skillSection && !skillSection.hasAttribute('data-wave-animated')) {
                skillSection.setAttribute('data-wave-animated', 'true');
                this.createWaveEffect(skillSection);
            }
            
        } catch (error) {
            console.error('Error animating skill card:', error);
        }
    }
    
    createWaveEffect(section) {
        const cards = section.querySelectorAll('.skill-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('wave-animate');
                // Remove the wave class after animation
                setTimeout(() => {
                    card.classList.remove('wave-animate');
                }, 800);
            }, index * 100);
        });
    }
    
    setupScrollListener() {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateScrollProgress();
                    this.handleParallaxElements();
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    updateScrollProgress() {
        try {
            const scrolled = window.pageYOffset;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrolled / maxScroll) * 100;
            
            // Update any progress indicators
            const progressBars = document.querySelectorAll('.scroll-progress');
            progressBars.forEach(bar => {
                bar.style.transform = `scaleX(${progress / 100})`;
            });
            
        } catch (error) {
            console.error('Error updating scroll progress:', error);
        }
    }
    
    handleParallaxElements() {
        try {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax-element');
            
            parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-speed') || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            
        } catch (error) {
            console.error('Error handling parallax elements:', error);
        }
    }
    
    // Easing function for smooth counter animation
    easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }
    
    // Method to manually trigger animations (useful for testing)
    triggerStatsAnimation() {
        this.counters.forEach(counter => {
            if (!counter.hasAttribute('data-counted')) {
                this.animateCounter(counter);
            }
        });
    }
    
    triggerSkillsAnimation() {
        this.skillCards.forEach(card => {
            if (!card.hasAttribute('data-animated')) {
                this.animateSkillCard(card);
            }
        });
    }
    
    // Reset all animations (useful for development/testing)
    resetAnimations() {
        // Reset counters
        this.counters.forEach(counter => {
            counter.removeAttribute('data-counted');
            const targetValue = counter.getAttribute('data-counter');
            const suffix = counter.getAttribute('data-suffix') || '';
            counter.textContent = '0' + suffix;
            counter.classList.remove('counter-complete');
        });
        
        // Reset skill cards
        this.skillCards.forEach(card => {
            card.removeAttribute('data-animated');
            card.classList.remove('skill-animate-in', 'wave-animate');
        });
        
        // Reset reveal elements
        this.revealElements.forEach(element => {
            element.classList.remove('animate-in');
        });
        
        console.log('🔄 Animations reset');
    }
    
    // Cleanup method
    destroy() {
        if (this.counterObserver) this.counterObserver.disconnect();
        if (this.skillObserver) this.skillObserver.disconnect();
        if (this.revealObserver) this.revealObserver.disconnect();
        
        console.log('🧹 Scroll animations cleaned up');
    }
}

// Add CSS animations via JavaScript (for better encapsulation)
const addScrollAnimationStyles = () => {
    const styles = `
        /* Stats Counter Animations */
        [data-counter] {
            transition: all 0.3s ease;
        }
        
        .counter-complete {
            transform: scale(1.1);
            color: #6366f1;
        }
        
        /* Skill Card Animations */
        .skill-card {
            opacity: 0;
            transform: translateY(50px) scale(0.8);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .skill-card.skill-animate-in {
            opacity: 1;
            transform: translateY(0) scale(1);
            transition-delay: var(--animation-delay, 0s);
        }
        
        .skill-card.wave-animate {
            animation: skillWave 0.8s ease-out forwards;
        }
        
        @keyframes skillWave {
            0% {
                transform: translateY(0) scale(1);
            }
            30% {
                transform: translateY(-10px) scale(1.05);
            }
            60% {
                transform: translateY(-5px) scale(1.02);
            }
            100% {
                transform: translateY(0) scale(1);
            }
        }
        
        /* General Reveal Animations */
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .reveal.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Scroll Progress Bar */
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
            transform-origin: left;
            transform: scaleX(0);
            transition: transform 0.1s ease;
            z-index: 1000;
        }
        
        /* Parallax elements */
        .parallax-element {
            will-change: transform;
        }
        
        /* Enhanced counter styling */
        [data-counter] {
            font-variant-numeric: tabular-nums;
            min-width: 2ch;
            display: inline-block;
        }
        
        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
            .skill-card,
            .reveal,
            [data-counter] {
                transition: none !important;
                animation: none !important;
            }
            
            .parallax-element {
                transform: none !important;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
};

// Initialize when DOM is ready
let scrollAnimations;
document.addEventListener('DOMContentLoaded', () => {
    try {
        addScrollAnimationStyles();
        scrollAnimations = new ScrollAnimations();
    } catch (error) {
        console.error('❌ Failed to initialize scroll animations:', error);
    }
});

// Add to window for debugging/testing
if (typeof window !== 'undefined') {
    window.ScrollAnimations = ScrollAnimations;
    window.scrollAnimations = scrollAnimations;
}