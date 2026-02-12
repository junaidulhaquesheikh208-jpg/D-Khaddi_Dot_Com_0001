@echo off
REM Khaadi Website Optimization Build Script
REM This script prepares all optimized files for deployment

echo.
echo ================================================
echo    Khaadi Website Performance Optimization
echo ================================================
echo.

echo Creating deployment directory...
if not exist "dist" mkdir dist
if not exist "dist\images" mkdir dist\images

echo Copying optimized HTML file...
copy "ultimate-performance.html" "dist\index.html"

echo Copying optimized CSS files...
copy "optimized-styles.min.css" "dist\"

echo Copying optimized JavaScript files...
copy "optimized-script.min.js" "dist\"
copy "performance-monitoring.js" "dist\"

echo Copying PWA assets...
copy "manifest.json" "dist\"
copy "sw.js" "dist\"
copy "offline.html" "dist\"

echo Copying images...
copy "images\*.webp" "dist\images\"
copy "images\*.jpg" "dist\images\"

echo.
echo ================================================
echo    Build completed successfully!
echo    Optimized files are in the 'dist' folder
echo ================================================
echo.

pause