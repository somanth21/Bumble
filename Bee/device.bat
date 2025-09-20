@echo off
echo Disconnecting old connections...
adb disconnect

echo Setting up connected device on TCP/IP mode...
adb tcpip 5555

echo Waiting for device to initialize...
timeout 3

echo Getting device IP address...
FOR /F "tokens=2" %%G IN ('adb shell ip addr show wlan0 ^| find "inet "') DO set ipfull=%%G
FOR /F "tokens=1 delims=/" %%G in ("%ipfull%") DO set ip=%%G

echo Connecting to device with IP %ip%:5555...
adb connect %ip%:5555

echo Setup complete. You should now see 2 devices in 'adb devices'
echo - One USB device 
echo - One Wi-Fi device (%ip%:5555)

exit /b 0
