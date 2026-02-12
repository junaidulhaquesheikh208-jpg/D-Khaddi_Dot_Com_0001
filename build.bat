@echo off
REM Build script for Khaadi website optimization
REM This script automates the minification and optimization process

echo Starting Khaadi website optimization process...

REM Create dist directory if it doesn't exist
if not exist "dist" mkdir dist

REM Copy all files to dist folder
xcopy /E /I .\* .\dist\

REM Note: In a real-world scenario, we would use actual minification tools
REM For demonstration purposes, we'll copy the already minified files
copy styles.min.css dist\
copy script.min.js dist\
copy sw.js dist\
copy manifest.json dist\
copy offline.html dist\

echo Optimization complete!
echo Files have been copied to the 'dist' folder.
echo To serve the optimized site, use the files in the 'dist' folder.

pause