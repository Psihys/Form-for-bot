@echo off
echo Installing Redis for Windows...

echo.
echo Option 1: Download Redis manually
echo Go to: https://github.com/microsoftarchive/redis/releases
echo Download: Redis-x64-3.0.504.msi
echo Install and run redis-server.exe

echo.
echo Option 2: Use Chocolatey (if installed)
echo choco install redis-64

echo.
echo Option 3: Use Docker
echo docker run -d -p 6379:6379 redis:alpine

echo.
echo After installation, start Redis:
echo redis-server.exe

pause