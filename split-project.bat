@echo off
REM Create frontend and backend folders
mkdir frontend
mkdir backend

REM Move frontend files and folders
move src frontend\
if exist public move public frontend\
if exist tailwind.config.js move tailwind.config.js frontend\
if exist postcss.config.js move postcss.config.js frontend\
if exist package.json move package.json frontend\
if exist package-lock.json move package-lock.json frontend\
if exist yarn.lock move yarn.lock frontend\

REM (Optional) Move backend files if you have them
REM Example:
REM move server.js backend\
REM move api backend\
REM move backend-package.json backend\package.json

REM Create README files with instructions
echo cd frontend && npm install && npm run dev > frontend\README.md
echo cd backend && npm install && npm start > backend\README.md

echo Separation complete. Update your import paths and configs as needed.
pause