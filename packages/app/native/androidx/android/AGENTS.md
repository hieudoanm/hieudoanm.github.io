# AndroidX (Android)

_Kotlin + Jetpack Compose Android super app bundling Focus Blocker and NFC Toolkit._

---

# Goal

Deliver a single launcher app, **AndroidX**, whose home screen lists two
applications:

- **Focus Blocker** — block access to selected apps using Accessibility Service.
- **NFC Toolkit** — read, scan, and emulate NFC tags.

Both apps live in the same Gradle project as Android **library** modules; the
`app` module hosts the hub UI, the single `@HiltAndroidApp` (`AndroidXApp`),
and the launcher activity.

---

# High-Level Architecture

```text
                        ┌──────────────┐
                        │  AndroidXApp │   (@HiltAndroidApp, single Application)
                        └──────┬───────┘
                               │
                    AppComponent (Hilt)
                        │
                 ┌──────┴───────────────┐
                 │  :app (hub)          │
                 │  MainActivity        │
                 │  HomeScreen          │  - Focus Blocker card -> startActivity(:block)
   │  - NFC Toolkit card  -> startActivity(:nfc)
                 └──┬───────────────────┘
        ┌──────────┴──────────────┐
        ▼                         ▼
   :block (library)          :nfc (library)
   Focus Blocker app         NFC Toolkit app
```

# Module Layout

```text
android/
├── app/       AndroidX hub — `io.github.hieudoanm.androidx`
├── block/     Focus Blocker feature — `io.github.hieudoanm.block`
└── nfc/       NFC Toolkit feature — `io.github.hieudoanm.nfc`
```

Each feature has its own namespace, `AndroidManifest.xml`, resources, Room
database, DataStore, Hilt modules, and Compose UI. The hub launches each
feature `MainActivity` with an explicit `Intent` — no shared classes across
feature packages, so identical class names (e.g. `MainActivity`,
`HomeViewModel`) are independent.

# Feature Manifests

Library manifests keep only the components the hub does not provide:

- **`:block`** — `MainActivity` (exported=false, opened by the hub),
  `BlockActivity` (overlay, singleInstance), `FocusAccessibilityService`,
  and the `queries` element for the app picker.
- **`:nfc`** — `MainActivity` (exported=true with `NDEF_DISCOVERED`,
  `TECH_DISCOVERED`, `TAG_DISCOVERED` intent filters), `HceApduService`
  (HOST_APDU_SERVICE), NFC permission + feature declarations.

Libraries must **not** declare `android:name` on `<application>` or set a
launcher intent-filter — `:app` owns the Application class and the icon.

# Resource Conventions

- Launcher icon lives only in `:app` (`res/mipmap-anydpi-v26/ic_launcher.xml`).
- Feature string labels are namespaced to avoid AAPT2 collisions:
  `block_app_name`, `nfc_app_name`. The hub label is `app_name` (AndroidX).
- Feature theme names stay distinct: `Theme.FocusBlock`, `Theme.NfcToolkit`,
  `Theme.AndroidX` — no merge conflicts.

# Dependencies

| Plugin        | Version |
| ------------- | ------- |
| AGP           | 9.3.2   |
| Kotlin        | 2.4.10  |
| KSP           | 2.3.11  |
| Hilt          | 2.60.1  |
| Compose BOM   | 2026.08.00 |

`build.gradle.kts` at the root applies all plugins with `apply false`; each
module applies the ones it needs. `com.android.library` is declared for the
two feature modules.

# Build & Test

```bash
./gradlew assembleDebug     # APK
./gradlew lint              # static analysis
./gradlew test              # all unit tests (:app, :block, :nfc)
./gradlew assembleRelease   # release APK (requires keystore env)
./gradlew bundleRelease     # release AAB (requires keystore env)
```

Release signing reads `RELEASE_STORE_FILE`, `RELEASE_STORE_PASSWORD`,
`RELEASE_KEY_ALIAS`, `RELEASE_KEY_PASSWORD` from the environment (defaults:
`release.keystore` / `android`). CI generates the keystore with keytool.

# Testing

- **`:app`** — hub [HomeScreenTest](app/src/test) - cards render and fire
  their `Open` callbacks.
- **`:block`** — full suite: repository, DataStore, Room DAO, services,
  screens, ViewModels (Robolectric + MockK + Turbine).
- **`:nfc`** — smoke test that core classes load.

Robolectric tests pin `@Config(sdk = [34])`.

# Repository Responsibilities

- `:block` — `FocusRepository` gates Room + package queries; the
  AccessibilityService asks `isBlocked(packageName)` and launches
  `BlockActivity`.
- `:nfc` — `NfcRepository` wraps NFC tag IO + tag history (Room);
  `HceApduService` responds to reader APDUs.

# Streamlined by the merger

- `NfcToolkitApp` and `FocusBlockApp` `@HiltAndroidApp` classes were removed —
  `AndroidXApp` is now the single Application.
- Launcher icons + `app_name` strings were moved out of the features and into
  the hub to guarantee clean manifest/resource merges.