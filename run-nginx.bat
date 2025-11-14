@echo off
echo ==========================================
echo   Starting NGINX with custom config
echo ==========================================

REM === SET THESE TWO PATHS ===

REM Path to folder where nginx.exe is installed
set NGINX_HOME="C:\Program Files\Nginx\nginx-1.29.3"

REM Path to your project nginx.conf
set NGINX_CONF="%~dp0nginx.conf"

REM ==========================================

echo NGINX folder: %NGINX_HOME%
echo Using config: %NGINX_CONF%
echo.

REM Go to the nginx installation folder
cd /d %NGINX_HOME%

REM Start nginx with your custom config
start "" /b nginx.exe -c %NGINX_CONF%

echo ==========================================
echo NGINX started successfully!
echo ==========================================
