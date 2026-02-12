// Image Lazy Loading Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize lazy loading for images
    const lazyImages = [].slice.call(document.querySelectorAll('.lazy-load'));
    
    if ('IntersectionObserver' in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.add('loaded');
                    observer.unobserve(lazyImage);
                }
            });
        });
        
        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(function(lazyImage) {
            lazyLoadImage(lazyImage);
        });
    }
    
    // Preload critical resources
    preloadCriticalResources();
});

// Fallback function for older browsers
function lazyLoadImage(image) {
    const imageSrc = image.dataset.src;
    if (!imageSrc) return;
    
    const img = new Image();
    img.onload = function() {
        image.src = imageSrc;
        image.classList.add('loaded');
    };
    img.src = imageSrc;
}

// Preload critical resources
function preloadCriticalResources() {
    // Preload critical CSS and JS if needed
    const criticalResources = [
        // Add any critical resources here
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = resource;
        document.head.appendChild(link);
    });
}

// Optimize font loading
function optimizeFontLoading() {
    // Font loading optimization is handled in CSS with font-display: swap
    // This function could be expanded to dynamically load fonts as needed
}

// Remove unused code that blocks the main thread
// This is a simplified example - in a real scenario, we'd identify and remove specific blocking code
function optimizeMainThread() {
    // Defer non-critical JavaScript execution
    setTimeout(() => {
        // Non-critical operations can be scheduled here
        console.log('Non-critical operations executed');
    }, 0);
    
    // Use requestIdleCallback for low priority tasks
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            // Perform low priority tasks here
        });
    } else {
        // Fallback for browsers that don't support requestIdleCallback
        setTimeout(() => {
            // Perform low priority tasks here
        }, 1);
    }
}

// Optimize images that are loaded
function optimizeLoadedImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Ensure images have proper loading attribute
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });
}

// Initialize optimizations
optimizeFontLoading();
optimizeMainThread();
optimizeLoadedImages();