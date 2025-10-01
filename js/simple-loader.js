// Simple, Reliable Page Loader
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('page-loader');
    const progress = document.getElementById('loader-progress');
    const percentage = document.getElementById('loader-percentage');
    
    if (!loader || !progress || !percentage) {
        console.log('Loader elements not found');
        return;
    }
    
    let currentProgress = 0;
    
    // Simulate loading progress
    function updateProgress() {
        if (currentProgress < 90) {
            currentProgress += Math.random() * 20 + 5;
            currentProgress = Math.min(currentProgress, 90);
        }
        
        progress.style.width = currentProgress + '%';
        percentage.textContent = Math.round(currentProgress) + '%';
        
        if (currentProgress < 90) {
            setTimeout(updateProgress, Math.random() * 200 + 100);
        }
    }
    
    // Start loading animation
    updateProgress();
    
    // Complete loading when page is ready
    function completeLoading() {
        currentProgress = 100;
        progress.style.width = '100%';
        percentage.textContent = '100%';
        
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        }, 300);
    }
    
    // Complete loading after minimum time or when window loads
    const minLoadTime = 1000; // 1 second minimum
    let isComplete = false;
    
    setTimeout(() => {
        if (!isComplete) {
            isComplete = true;
            completeLoading();
        }
    }, minLoadTime);
    
    window.addEventListener('load', () => {
        if (!isComplete) {
            isComplete = true;
            setTimeout(completeLoading, 200);
        }
    });
    
    // Fallback: force hide after 4 seconds
    setTimeout(() => {
        if (!isComplete) {
            console.log('Force hiding loader');
            isComplete = true;
            completeLoading();
        }
    }, 4000);
});

// Simple Lazy Loading
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('loading');
                    img.classList.add('loaded');
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
});