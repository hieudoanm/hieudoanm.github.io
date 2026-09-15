# Architecture

> AndroidX — Kotlin + Jetpack Compose super app bundling Focus Blocker and
> NFC Toolkit under one launcher icon.

## Tech Stack

| Layer                | Technology                   |
| -------------------- | ---------------------------- |
| Language             | Kotlin 2.x                   |
| UI                   | Jetpack Compose + Material 3 |
| Architecture         | MVVM                         |
| Navigation           | Navigation Compose (per mod) |
| Persistence          | Room (per feature)           |
| Preferences          | DataStore                    |
| Async                | Kotlin Coroutines + Flow     |
| Dependency Injection | Hilt                         |
| Blocking             | AccessibilityService         |
| NFC                  | NFC + Host Card Emulation    |
| Build                | AGP 9.x, Gradle Kotlin DSL   |
| Min SDK              | 26 (Android 8.0)             |
| Target / Compile SDK | 37 (Android 15+)             |

## Module Structure

```text
android/
├── app/                       # AndroidX hub  (io.github.hieudoanm.androidx)
│   └── src/main/kotlin/.../
│       ├── AndroidXApp.kt     # @HiltAndroidApp — single Application
│       ├── activity/MainActivity.kt
│       └── ui/home/HomeScreen.kt   # cards for Block + NFC
│
├── block/                     # Focus Blocker (io.github.hieudoanm.block)
│   └── src/main/kotlin/.../
│       ├── accessibility/FocusAccessibilityService.kt
│       ├── activity/{MainActivity, BlockActivity}.kt
│       ├── data/database/     # Room: BlockedApp, Schedule
│       ├── data/preferences/SettingsDataStore.kt
│       ├── di/AppModule.kt
│       ├── navigation/NavGraph.kt
│       ├── repository/FocusRepository.kt
│       └── ui/{home, apps, block, settings, theme}/
│
└── nfc/                       # NFC Toolkit   (io.github.hieudoanm.nfc)
    └── src/main/kotlin/.../
        ├── activity/MainActivity.kt
        ├── data/nfc/HceApduService.kt
        ├── data/database/     # Room: tag history
        ├── data/preferences/SettingsDataStore.kt
        ├── di/AppModule.kt
        ├── navigation/NavGraph.kt
        ├── domain/model/
        └── ui/{home, history, settings, theme}/
```

## Hub Launch Flow

```text
Launcher
   │
   ▼
app: MainActivity (HomeScreen)
   │
   ├── "Focus Blocker" card  ──► startActivity(:block MainActivity)
   └── "NFC Toolkit" card    ──► startActivity(:nfc MainActivity)
```

The `:app` module is the only Gradle *application* module. Features are
*android library* modules with their own namespaces; identical class names
across features (e.g. `MainActivity`) are independent and never collide.

## Feature Manifests

Libraries contribute components via manifest merge but stay launcher-less:

- `:block` — `MainActivity` (exported=false), `BlockActivity` (singleInstance
  overlay), `FocusAccessibilityService`, `queries`.
- `:nfc` — `MainActivity` (exported=true, NDEF/TECH/TAG filters),
  `HceApduService` (HOST_APDU_SERVICE), NFC permission/feature.

Neither library sets `android:name` on `<application>` nor includes a launcher
intent-filter, and neither ships a launcher icon.

## Blocking Data Flow

```text
AccessibilityService
        │
        ▼
TYPE_WINDOW_STATE_CHANGED
        │
        ▼
FocusRepository.isBlocked(packageName)
        │
   ┌────┴────┐
   │         │
  No       Yes
   │         │
   ▼         ▼
 Skip   BlockActivity
```

## Navigation

Each feature owns a Compose `NavGraph` inside its own `MainActivity`:

- **Block**: `home` → `app_list` → `settings` (`BlockActivity` is launched
  separately by the AccessibilityService).
- **NFC**: `home` / `history` / `settings`.

## Database

Room instances are per-feature (distinct DB names):

- `:block` — `focus_blocker.db`, entity `BlockedApp(packageName, label, enabled)`
  and future `Schedule`.
- `:nfc` — tag history, entity persisted on read/write.

## DataStore Preferences

| Key                     | Type    | Default |
| ----------------------- | ------- | ------- |
| `blocking_enabled`      | Boolean | false   |
| `first_launch`          | Boolean | true    |
| `dark_mode`             | Boolean | false   |
| `last_blocked_time`     | Long    | 0       |
| `accessibility_enabled` | Boolean | false   |
| `ignore_system_apps`    | Boolean | true    |
| `launch_on_boot`        | Boolean | false   |

## Dependency Injection

Per-module Hilt `@Module` provides that feature's Room database, DAO, and
`SettingsDataStore`. The hub's `AndroidXApp` is the single @HiltAndroidApp and
roots the shared `AppComponent`.

## Key Design Decisions

- **Hub + feature libraries** — the second screen is one `startActivity` away,
  with no cross-feature class dependencies.
- **Single Application subclass** — features declare no `<application>`
  `android:name`; `AndroidXApp` owns the process.
- **AccessibilityService uses Hilt** — `@AndroidEntryPoint` with field injection.
- **No network calls** — everything is local-first (Room + DataStore).