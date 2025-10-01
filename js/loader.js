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
        // Count resources to load
        this.totalResources = document.querySelectorAll('img, link[rel="stylesheet"], script').length;
        
        // Track loaded resources
        this.trackResources();
        
        // Minimum display time
        this.minimumDisplayTime();
    }
    
    trackResources() {
        // Track images
        document.querySelectorAll('img').forEach(img => {
            if (img.complete) {
                this.updateProgress();
            } else {
                img.addEventListener('load', () => this.updateProgress());
                img.addEventListener('error', () => this.updateProgress());
            }
        });
        
        // Track stylesheets
        document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            link.addEventListener('load', () => this.updateProgress());
        });
        
        // Track scripts
        document.querySelectorAll('script').forEach(script => {
            if (script.src) {
                script.addEventListener('load', () => this.updateProgress());
            }
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
    
    hide() {
        if (this.loader) {
            this.loader.style.opacity = '0';
            setTimeout(() => {
                this.loader.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        }
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
