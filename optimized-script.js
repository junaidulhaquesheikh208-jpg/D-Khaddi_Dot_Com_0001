// Optimized JavaScript for Khaadi website
// Contains only essential functions for performance

// Essential image lazy loading implementation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize lazy loading for images
    const lazyImages = [].slice.call(document.querySelectorAll('img[data-src]'));
    const lazyPictures = [].slice.call(document.querySelectorAll('.lazy-load'));
    
    // Process picture elements with sources
    lazyPictures.forEach(picture => {
        if (picture.tagName === 'PICTURE') {
            const sources = picture.querySelectorAll('source[data-src]');
            sources.forEach(source => {
                // Preload WebP sources for better performance
                const img = new Image();
                img.src = source.dataset.src;
            });
        }
    });
    
    if ('IntersectionObserver' in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    if (entry.target.tagName === 'IMG') {
                        // Handle regular images
                        entry.target.src = entry.target.dataset.src;
                        entry.target.classList.add('loaded');
                        entry.target.removeAttribute('data-src');
                    } else if (entry.target.classList.contains('lazy-load')) {
                        // Handle picture elements
                        const sources = entry.target.querySelectorAll('source[data-src]');
                        sources.forEach(source => {
                            source.src = source.dataset.src;
                            source.removeAttribute('data-src');
                        });
                        
                        const img = entry.target.querySelector('img[data-src]');
                        if (img) {
                            img.src = img.dataset.src;
                            img.classList.add('loaded');
                            img.removeAttribute('data-src');
                        }
                    }
                    observer.unobserve(entry.target);
                }
            });
        });

        lazyImages.forEach(function(img) {
            lazyImageObserver.observe(img);
        });
        
        lazyPictures.forEach(function(picture) {
            lazyImageObserver.observe(picture);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(function(img) {
            loadImageFallback(img);
        });
        
        lazyPictures.forEach(function(picture) {
            const img = picture.querySelector('img[data-src]');
            if (img) {
                loadImageFallback(img);
            }
        });
    }
});

// Fallback function for older browsers
function loadImageFallback(image) {
    const imageSrc = image.dataset.src;
    if (!imageSrc) return;

    const img = new Image();
    img.onload = function() {
        image.src = imageSrc;
        image.classList.add('loaded');
        image.removeAttribute('data-src');
    };
    img.src = imageSrc;
}

// Optimize resource loading
function preloadCriticalResources() {
    // Preload critical resources if needed
    const criticalResources = [];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = resource.as;
        link.href = resource.href;
        document.head.appendChild(link);
    });
}

// Initialize optimizations
preloadCriticalResources();