# Block (Android)

An Android app that blocks distracting apps using the Accessibility Service. When a blocked app is opened, Focus Block shows a full-screen overlay prompting the user to stay focused.

## Features

- **App Blocking**: Select which installed apps to block. When a blocked app is launched, the accessibility service intercepts it and displays a block screen.
- **Home Dashboard**: Shows accessibility and blocking status, blocked app count, and time saved (time since the last blocked event).
- **App List**: Browse all installed apps with search, icons, and labels. Filter out system apps.
- **Settings**: Toggle blocking on/off, enable dark mode, launch on boot, and ignore system apps.
- **Scheduling** (data layer only): Room entity and DAO queries exist for time-based block schedules, but no scheduling UI is wired yet.
- **Theming**: Custom dark/light color palette with Android 12+ dynamic color (Material You) support.

## Tech Stack

| Layer        | Library                      |
| ------------ | ---------------------------- |
| UI           | Jetpack Compose + Material 3 |
| Navigation   | Compose Navigation           |
| DI           | Dagger Hilt                  |
| Local DB     | Room                         |
| Preferences  | DataStore Preferences        |
| Blocking     | Accessibility Service        |
| Architecture | MVVM + Repository            |

## Build

```bash
./gradlew assembleDebug     # APK
./gradlew bundleRelease      # AAB (requires keystore)
```

## Test

```bash
./gradlew test
```

## Project Structure

```txt
app/
 src/
  main/
   kotlin/.../block/
    activity/              # MainActivity, BlockActivity
    accessibility/         # FocusAccessibilityService
    data/
     database/             # FocusDatabase, AppDao
     entity/               # BlockedApp, Schedule
     preferences/          # SettingsDataStore
    di/                    # AppModule (Hilt)
    navigation/            # NavGraph
    repository/            # FocusRepository
    ui/
     home/                 # HomeScreen + HomeViewModel
     apps/                 # AppListScreen + AppListViewModel
     settings/             # SettingsScreen + SettingsViewModel
     block/                # BlockScreen
     theme/                # Theme, Color
   res/
   AndroidManifest.xml
 build.gradle.kts
```

## Permissions

- `BIND_ACCESSIBILITY_SERVICE` -- required for monitoring app switches to detect blocked apps.
