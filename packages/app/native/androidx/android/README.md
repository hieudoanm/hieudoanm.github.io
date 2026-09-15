# AndroidX (Android)

A Kotlin + Jetpack Compose Android "super app" that bundles two applications under one launcher icon. The first screen lists both apps — **Focus Blocker** and **NFC Toolkit** — and opens each inside the shared AndroidX process.

## Apps

| App | Module | Package |
| --- | ------ | ------- |
| AndroidX (hub) | `:app` | `io.github.hieudoanm.androidx` |
| Focus Blocker | `:block` | `io.github.hieudoanm.block` |
| NFC Toolkit | `:nfc` | `io.github.hieudoanm.nfc` |

### Focus Blocker

Blocks distracting apps using the Accessibility Service. When a blocked app is opened, the service intercepts it and shows a full-screen block overlay.

- Home dashboard (accessibility + blocking status, blocked count, time saved)
- App picker with search and per-app toggle
- Room persistence + DataStore preferences
- Scheduling data layer (Room entity + DAO, no UI yet)

### NFC Toolkit

Reads, scans, and emulates NFC tags.

- NDEF / tech / tag tag-read flows (launchable via NFC intents)
- HCE (Host Card Emulation) APDU service
- History, settings, and dark mode via DataStore

## Tech Stack

| Layer        | Library                      |
| ------------ | ---------------------------- |
| UI           | Jetpack Compose + Material 3 |
| Navigation   | Compose Navigation           |
| DI           | Dagger Hilt                  |
| Local DB     | Room (per module)            |
| Preferences  | DataStore Preferences        |
| Blocking     | Accessibility Service        |
| NFC          | Android NFC + HCE            |
| Architecture | MVVM + Repository            |

## Build

```bash
./gradlew assembleDebug        # debug APK
./gradlew assembleRelease      # release APK (requires keystore)
./gradlew bundleRelease        # release AAB (requires keystore)
```

## Test

```bash
./gradlew test                 # unit tests for :app, :block, :nfc
./gradlew lint                 # Android lint
```

## Project Structure

```text
app/      AndroidX hub — launcher activity, home screen listing both apps
block/    Focus Blocker feature (android library)
nfc/      NFC Toolkit feature (android library)
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the module layout and
[AGENTS.md](AGENTS.md) for engineering details.