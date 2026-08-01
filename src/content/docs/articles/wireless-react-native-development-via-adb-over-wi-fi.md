---
title: "Wireless React Native Development via ADB Over Wi-Fi"
description: "A complete guide to setting up Android devices for wireless development using ADB over Wi-Fi — ideal for React Native and Android development teams."
---

## Why Wireless ADB?

Tired of tangled USB cables? Want to freely hold your device while debugging UI issues in React Native? ADB over Wi-Fi lets you run, debug, and test your app wirelessly once it's set up correctly.

## Prerequisites

Before you start, make sure of the following:

**On your Android phone:**

- Developer Options enabled
- USB Debugging turned ON
- Phone is connected to same Wi-Fi as your computer

**On your computer:**

- Latest ADB installed (comes with Android Studio or install via `platform-tools`)
- React Native CLI project already set up

## Step-by-Step Setup for ADB over Wi-Fi

**Step 1: 🔓 Enable Developer Options on Your Phone**

If not already done:

- Open Settings → About Phone
- Tap Build Number 7 times
- A message appears: “You are now a developer!”

## Step 2: 🐞 Enable USB Debugging

Go to:

- Settings → System → Developer Options
- Turn on USB Debugging

You may also find “Developer Options” directly under Settings on some devices.

## Step 3: 🔌 Connect Phone via USB (First-Time Only)

Connect your Android device to your PC with a USB cable.

Then open a terminal and run:

```sh
adb devices
```

🔔 Check your phone screen!
A popup should appear:

> "Allow USB debugging?" \
> ✔️ [Always allow from this computer] \
> ✅ Tap Allow

## Step 4: 🌐 Ensure Both Devices Are on the Same Wi-Fi

- Your computer and phone must be on the exact same Wi-Fi network.
- Hotspot connections sometimes block port communication, so use a router-based Wi-Fi if possible.

You can check the IP address of your phone by running:

```sh
adb shell ip addr show wlan0
```

Look for an IP like 192.168.1.xxx.

## Step 5: 🌐 Switch ADB to TCP/IP Mode

Run:

```sh
adb tcpip 5555
```

This restarts ADB in TCP/IP mode on port 5555.
You'll see:

```sh
restarting in TCP mode port: 5555
```

## Step 6: 🔌 Disconnect the USB Cable

Now unplug the USB cable. You're ready to go wireless!

## Step 7: 🔗 Connect Over Wi-Fi

Run:

```sh
adb connect <your-phone-ip>:5555
```

Example:

```sh
adb connect 192.168.1.105:5555
```

You should see:

```sh
connected to 192.168.1.105:5555
```

✔️ Your device is now connected wirelessly!

To verify:

```sh
adb devices
```

You’ll see your device listed with its IP and port.

## Step 8: 🚀 Run Your React Native App

Now you can use:

```sh
npx react-native run-android
```

And your app will launch wirelessly!

🔄 Switching Back to USB Mode

If you want to switch back:

```sh
adb usb
```

This reverts ADB to USB mode.

## 🔧 Troubleshooting Tips

**🟥 `unauthorized` in `adb devices`**
- Unlock phone and check for "Allow USB debugging" prompt
- Go to Developer Options → Revoke USB debugging authorizations, then reconnect

**🟥 `cannot connect` or timeout**
- Ensure both devices are on same Wi-Fi
- Use `adb kill-server` and `adb start-server` to reset adb
- Restart your router if port connections are blocked
- Avoid using mobile hotspot if possible

**🟥 Different IP after reboot**
- If your phone reboots or changes network, its IP may change. Recheck with:

```sh
adb shell ip addr show wlan0
```

## 🧼 Clean-Up and Automation Tip
You can automate the setup with this script (after first USB connect):

```sh
adb tcpip 5555
adb connect $(adb shell ip route | awk '{print $9}'):5555
```

## 📦 Bonus: Persist Wireless ADB Across Reboots (Optional, Root Only)
If your device is rooted, you can run:

```sh
setprop service.adb.tcp.port 5555
stop adbd
start adbd
```

This will enable ADB over Wi-Fi at boot. Otherwise, repeat USB + adb tcpip 5555 each time after reboot.

## 🧠 Summary

| Step | Action                        |
| ---- | ----------------------------- |
| 1    | Enable Developer Options      |
| 2    | Turn on USB Debugging         |
| 3    | Connect via USB and authorize |
| 4    | Run `adb tcpip 5555`          |
| 5    | Disconnect USB                |
| 6    | Run `adb connect <ip>:5555`   |
| 7    | Run your React Native app     |

## 📋 Final Words

Wireless ADB is a huge quality-of-life boost for React Native developers. Once set up, you'll enjoy a cable-free development flow, great for testing layout, gestures, and real-world app usage.
