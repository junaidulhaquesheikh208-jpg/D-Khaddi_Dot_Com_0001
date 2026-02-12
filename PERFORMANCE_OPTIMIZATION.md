# Khaadi Website Performance Optimization

This project contains optimized files for the Khaadi website to achieve a 100 performance score. The following optimizations have been implemented:

## Optimizations Applied

### 1. CSS and JavaScript Minification
- All CSS files have been minified (styles.min.css)
- All JavaScript files have been minified (script.min.js)
- Critical CSS is inlined in the HTML for faster rendering

### 2. Image Lazy Loading
- Implemented Intersection Observer API for efficient lazy loading
- Images below the fold are loaded only when they come into view
- Placeholder SVG images are shown while loading
- All images have `loading="lazy"` attribute

### 3. Font Optimization
- Implemented `font-display: swap` for faster text rendering
- Fonts are preloaded efficiently
- Asynchronous font loading to prevent render blocking

### 4. Main Thread Optimization
- Removed blocking code from the main thread
- Used `defer` and `async` attributes for JavaScript loading
- Implemented requestIdleCallback for low priority tasks
- Optimized DOM manipulation

### 5. Additional Performance Improvements
- Preconnect to external domains
- DNS prefetching for external resources
- Resource prioritization
- Efficient caching strategies

## Files Included

- `index.html` - Original HTML with basic optimizations
- `optimized-index.html` - Fully optimized HTML with all performance enhancements
- `styles.css` - Original CSS
- `styles.min.css` - Minified CSS
- `script.js` - Original JavaScript
- `script.min.js` - Minified JavaScript

## Performance Impact

These optimizations should improve:
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- Overall Page Speed Score

## How to Deploy

1. Replace your current index.html with the optimized-index.html
2. Upload the minified CSS and JS files to your server
3. Update any references to the old files with the new optimized ones
4. Test performance using tools like Google PageSpeed Insights or Lighthouse

## Testing

After deployment, test your site using:
- Google PageSpeed Insights: https://pagespeed.web.dev/
- Lighthouse in Chrome DevTools
- GTmetrix: https://gtmetrix.com/
- WebPageTest: https://www.webpagetest.org/

With these optimizations, your site should achieve a significantly improved performance score, potentially reaching 100 depending on other factors like server response time and hosting infrastructure.