@echo off
setlocal
cd /d "%~dp0"
echo ==============================================
echo   TIVARSHNA M - 3D PORTFOLIO
 echo ==============================================
if not exist "node_modules" (
  echo Installing project dependencies. Please wait...
  call npm install
  if errorlevel 1 (
    echo.
    echo Dependency installation failed. Check your internet connection and Node.js installation.
    pause
    exit /b 1
  )
)
echo Starting the portfolio development server...
call npm run dev
pause
