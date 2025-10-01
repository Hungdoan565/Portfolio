// Timeline Animations - Advanced scroll-triggered animations
class TimelineAnimations {
    constructor() {
        this.timeline = document.getElementById('timeline-container');
        this.timelineLine = document.getElementById('timeline-line');
        this.timelineItems = document.querySelectorAll('.timeline-item');
        this.hasAnimated = false;
        
        this.init();
    }
    
    init() {
        // Setup Intersection Observer
        this.setupObserver();
        
        // Initial check if timeline is already in viewport
        this.checkInitialVisibility();
    }
    
    setupObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '-100px 0px -100px 0px', // Trigger khi còn cách 100px
            threshold: 0.1
        };
        
        // Observer cho timeline line drawing
        const lineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.animateTimeline();
                }
            });
        }, observerOptions);
        
        if (this.timeline) {
            lineObserver.observe(this.timeline);
        }
        
        // Observer cho từng timeline item
        const itemObserverOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.2
        };
        
        const itemObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('timeline-visible');
                }
            });
        }, itemObserverOptions);
        
        this.timelineItems.forEach(item => {
            itemObserver.observe(item);
        });
    }
    
    checkInitialVisibility() {
        const rect = this.timeline?.getBoundingClientRect();
        if (rect && rect.top < window.innerHeight && !this.hasAnimated) {
            setTimeout(() => this.animateTimeline(), 200);
        }
    }
    
    animateTimeline() {
        if (this.hasAnimated) return;
        this.hasAnimated = true;
        
        // Animate timeline line drawing from top to bottom
        if (this.timelineLine) {
            this.timelineLine.classList.add('drawing');
        }
        
        // Stagger animate timeline items
        this.timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('timeline-visible');
                
                // Add extra effects
                this.addExtraEffects(item);
            }, index * 200); // 200ms delay giữa các items
        });
    }
    
    addExtraEffects(item) {
        // Add particle effect on dot
        const dot = item.querySelector('.timeline-dot');
        if (dot) {
            this.createParticleEffect(dot);
        }
    }
    
    createParticleEffect(dot) {
        // Tạo hiệu ứng particles nhỏ bay ra từ dot
        const particles = 6;
        const dotRect = dot.getBoundingClientRect();
        
        for (let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                left: ${dotRect.left + dotRect.width / 2}px;
                top: ${dotRect.top + dotRect.height / 2}px;
                width: 4px;
                height: 4px;
                background: ${this.getParticleColor(i)};
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                animation: particle-burst 0.8s ease-out forwards;
            `;
            
            const angle = (360 / particles) * i;
            particle.style.setProperty('--angle', `${angle}deg`);
            
            document.body.appendChild(particle);
            
            // Remove after animation
            setTimeout(() => particle.remove(), 800);
        }
    }
    
    getParticleColor(index) {
        const colors = [
            '#6366f1', // indigo
            '#a855f7', // purple
            '#ec4899', // pink
            '#06b6d4', // cyan
            '#8b5cf6', // violet
            '#f59e0b'  // amber
        ];
        return colors[index % colors.length];
    }
}

// Add particle burst animation via CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes particle-burst {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(
                calc(cos(var(--angle)) * 40px),
                calc(sin(var(--angle)) * 40px)
            ) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TimelineAnimations();
});
