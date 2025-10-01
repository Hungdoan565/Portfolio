// Skills Animation System
class SkillsAnimator {
    constructor() {
        this.skillItems = document.querySelectorAll('.skill-item');
        this.statsElements = document.querySelectorAll('[data-count]');
        this.animated = new Set();
        
        this.init();
    }
    
    init() {
        this.createSkillBars();
        this.setupObserver();
    }
    
    createSkillBars() {
        this.skillItems.forEach(item => {
            const skillName = item.dataset.skill;
            const level = item.dataset.level;
            
            item.innerHTML = `
                <div class="flex justify-between mb-2">
                    <span class="text-sm font-medium text-gray-300">${skillName}</span>
                    <span class="text-sm font-mono text-primary-400">${level}%</span>
                </div>
                <div class="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div class="skill-progress h-full bg-gradient-to-r from-primary-500 to-accent-purple rounded-full transition-all duration-1000 ease-out"
                         style="width: 0%"
                         data-target="${level}">
                    </div>
                </div>
            `;
        });
    }
    
    setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated.has(entry.target)) {
                    this.animateSkills(entry.target);
                    this.animated.add(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        // Observe skill sections
        document.querySelectorAll('.skill-item').forEach(item => {
            observer.observe(item);
        });
        
        // Observe stats
        document.querySelectorAll('[data-count]').forEach(stat => {
            observer.observe(stat);
        });
    }
    
    animateSkills(skillItem) {
        const progressBar = skillItem.querySelector('.skill-progress');
        if (progressBar) {
            const targetWidth = progressBar.dataset.target;
            setTimeout(() => {
                progressBar.style.width = `${targetWidth}%`;
            }, 100);
        }
    }
    
    animateCounter(element) {
        const target = parseInt(element.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
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
