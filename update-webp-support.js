// Script to update HTML files to include WebP support for images
// This creates picture elements with WebP sources for better performance

const fs = require('fs');
const path = require('path');

// List of HTML files to update
const htmlFiles = [
    './index.html',
    './optimized-index.html',
    './fully-optimized-index.html',
    './final-optimized-index.html'
];

// Function to convert img tags to picture tags with WebP support
function convertImgToPicture(htmlContent) {
    // Regular expression to find img tags with data-src attributes
    const imgRegex = /<img\s+([^>]*?)data-src=["'](\.\/images\/[^"']+\.(jpg|jpeg))["']([^>]*?)>/gi;
    
    return htmlContent.replace(imgRegex, (match, beforeSrc, imagePath, ext, afterSrc) => {
        const webpPath = imagePath.replace(/\.(jpg|jpeg)$/i, '.webp');
        return `<picture>
                        <source data-src="${webpPath}" type="image/webp">
                        <img ${beforeSrc}data-src="${imagePath}"${afterSrc}>
                    </picture>`;
    });
}

// Process each HTML file
htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Convert img tags to picture tags with WebP support
        const updatedContent = convertImgToPicture(content);
        
        // Write the updated content back to the file
        fs.writeFileSync(filePath, updatedContent);
        console.log(`Updated ${file} with WebP support`);
    } else {
        console.log(`File ${file} not found`);
    }
});

console.log('WebP update process completed!');