## React Native Invoice App

**Source: Invoice Builder App | React native | $100+ Project**  
https://www.youtube.com/watch?v=etMWYBcqNhY

## Steps to build the app

### 1. Install EAS CLI

```sh
npm install -g eas-cli
```

or with yarn:

```sh
yarn global add eas-cli
```

---

### 2. Log in to Expo

```sh
eas login
```

---

### 3. Configure the project for EAS

Inside the project folder, run:

```sh
eas build:configure
```

This will create an `eas.json` file for build configuration.

---

### 4. Build the Android app

To create an APK or AAB:

```sh
eas build -p android --profile preview
```

* `-p android` → platform
* `--profile preview` → quick build (good for testing)

For a **production-ready build**:

```sh
eas build -p android --profile production
```

---

### 5. Download the build

Once finished, EAS will give a URL to download the APK/AAB.

