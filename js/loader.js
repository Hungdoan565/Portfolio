// Page Loader & Loading States
class PageLoader {
    constructor() {
        this.loader = document.getElementById('page-loader');
        this.progress = document.getElementById('loader-progress');
        this.percentage = document.getElementById('loader-percentage');
        this.loadedResources = 0;
        this.totalResources = 0;
        this.init();
    }
    
    init() {
        // Count only immediately-loading resources
        const imgs = Array.from(document.querySelectorAll('img:not([data-src])'));
        const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
        const scripts = Array.from(document.querySelectorAll('script[src]'));
        this.totalResources = imgs.length + styles.length + scripts.length;
        if (this.totalResources === 0) this.totalResources = 1; // avoid division by zero
        
        // Track loaded resources
        this.trackResources();
        
        // Minimum display time and safety timeout
        this.minimumDisplayTime();
        this.safetyTimeout(3000);
    }
    
    trackResources() {
        // Track images that load immediately (ignore lazy images)
        document.querySelectorAll('img:not([data-src])').forEach(img => {
            if (img.complete) {
                this.updateProgress();
            } else {
                img.addEventListener('load', () => this.updateProgress(), { once: true });
                img.addEventListener('error', () => this.updateProgress(), { once: true });
            }
        });
        
        // Track stylesheets
        document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            link.addEventListener('load', () => this.updateProgress(), { once: true });
            link.addEventListener('error', () => this.updateProgress(), { once: true });
        });
        
        // Track external scripts only
        document.querySelectorAll('script[src]').forEach(script => {
            script.addEventListener('load', () => this.updateProgress(), { once: true });
            script.addEventListener('error', () => this.updateProgress(), { once: true });
        });
    }
    
    updateProgress() {
        this.loadedResources++;
        const percentage = Math.round((this.loadedResources / this.totalResources) * 100);
        
        if (this.progress) {
            this.progress.style.width = percentage + '%';
        }
        
        if (this.percentage) {
            this.percentage.textContent = percentage + '%';
        }
        
        if (percentage >= 100) {
            setTimeout(() => this.hide(), 300);
        }
    }
    
    minimumDisplayTime() {
        // Ensure loader shows for at least 500ms
        setTimeout(() => {
            if (this.loadedResources >= this.totalResources) {
                this.hide();
            }
        }, 500);
    }
    
    safetyTimeout(ms = 3000) {
        // In case some resources never fire events (e.g., lazy images), hide after a timeout
        setTimeout(() => this.hide(), ms);
    }
    
    hide() {
        if (!this.loader || this.loader.style.display === 'none') return;
        this.loader.style.opacity = '0';
        setTimeout(() => {
            if (!this.loader) return;
            this.loader.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Image Lazy Loading
class LazyLoader {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.config = {
            rootMargin: '50px 0px',
            threshold: 0.01
        };
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        this.observer.unobserve(entry.target);
                    }
                });
            }, this.config);
            
            this.images.forEach(img => this.observer.observe(img));
        } else {
            // Fallback for older browsers
            this.images.forEach(img => this.loadImage(img));
        }
    }
    
    loadImage(img) {
        const src = img.getAttribute('data-src');
        if (!src) return;
        
        // Add loading class
        img.classList.add('loading');
        
        // Create temp image
        const tempImg = new Image();
        tempImg.onload = () => {
            img.src = src;
            img.removeAttribute('data-src');
            img.classList.remove('loading');
            img.classList.add('loaded');
        };
        
        tempImg.onerror = () => {
            img.classList.remove('loading');
            img.classList.add('error');
        };
        
        tempImg.src = src;
    }
}

// Skeleton Screen Manager
class SkeletonManager {
    constructor() {
        this.skeletons = document.querySelectorAll('.skeleton');
        this.init();
    }
    
    init() {
        // Remove skeletons when content loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.skeletons.forEach(skeleton => {
                    skeleton.style.opacity = '0';
                    setTimeout(() => skeleton.remove(), 300);
                });
            }, 300);
        });
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    new PageLoader();
    new LazyLoader();
    new SkeletonManager();
});
