---
title: "Lost Android Keystore? Here’s How to Recover & Continue Publishing Your App"
description: "If you’ve ever lost your Android app keystore file, you know the sinking feeling — without it, you can’t update your app on Google Play. But all is not lost. In this guide, we’ll walk through what happens when a keystore is lost, how to request a new upload key from Google Play, so you can get back to publishing quickly."
---

## Understanding the Problem

When you publish an Android app to the Play Store, it must be signed with a **keystore file**. This file contains your **private key**, and without it, you cannot generate valid APK/AAB updates for your existing app.

If your keystore file is **deleted or lost**, you **cannot recreate the exact same file** — the cryptographic key is unique. However, if your app is already in the Play Store, Google provides a solution: **upload key reset**.

## What is an Upload Key?

Google Play App Signing (enabled by default for new apps) stores your original app signing key securely on Google’s servers. You use a separate **upload key** to sign and upload new versions.

If you lose your upload key, Google can **replace it with a new one** without affecting the original signing key.

## Step 1: Request a New Upload Key from Google

1. Go to the [Google Play Console Support](https://support.google.com/googleplay/android-developer/contact/key) page
1. Fill in the form with:
    1. **App package name** (e.g., `com.example.android`)
    1. Your developer account email
1. Confirmation that you’ve lost the key
1. Google will email you instructions to **generate a new upload key** and share the **public certificate** with them.

## Step 2: Generate a New Upload Key

You can create a `.jks` (Java Keystore) file with this command:

```sh
keytool -genkeypair -v  -storetype JKS  -keystore my-upload-key.jks  -alias upload  -keyalg RSA  -keysize 2048  -validity 10000
```

You’ll be prompted for:
- Keystore password
- Key password
- Organization details
- Alias (e.g., `upload`)

## Step 3: Export the Public Certificate

Once you create the new `.jks` file, export its public certificate (PEM format) and send it to Google:

```sh
keytool -export -rfc  -keystore my-upload-key.jks  -alias upload  -file upload_certificate.pem
```

**Note**: The .jks file path must match where your new file is stored.

## Step 4: Update build.gradle to Use New Keystore

In your `app/build.gradle`:

```
signingConfigs {
    release {
        storeFile file('my-upload-key.jks')
        storePassword localProps['MYAPP_RELEASE_STORE_PASSWORD']
        keyAlias 'upload'
        keyPassword localProps['MYAPP_RELEASE_KEY_PASSWORD']
    }
}
```

Make sure `local.properties` contains the correct values.

### `.keystore` vs `.jks` — What’s the Difference?

- `.keystore` – Older Java keystore format (still works but less common for new projects).
- `.jks` – Java KeyStore format introduced in newer Java versions (recommended now).
- Functionally, they store the same thing — the main difference is the store type (`JKS` vs `PKCS12`).

### Final Tips

- Always `back up` your keystore file in multiple secure locations.
- Store passwords in a `password manager` — losing them is just as bad as losing the file.
- If Google issues a new upload key, `old builds signed with the old key will still work`.

**In Short**: If you lose your Android keystore file but your app is already on the Play Store, you can’t recover the exact file — but you can request a new upload key from Google, create a new `.jks` file, and keep publishing updates without starting over.
