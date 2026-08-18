# Architecture

> Android Focus Blocker — Kotlin + Jetpack Compose app that blocks access to
> selected apps using Android Accessibility Service.

## Tech Stack

| Layer                | Technology                   |
| -------------------- | ---------------------------- |
| Language             | Kotlin 2.x                   |
| UI                   | Jetpack Compose + Material 3 |
| Architecture         | MVVM                         |
| Navigation           | Navigation Compose           |
| Persistence          | Room                         |
| Preferences          | DataStore                    |
| Async                | Kotlin Coroutines + Flow     |
| Dependency Injection | Hilt                         |
| Blocking             | AccessibilityService         |
| Build                | AGP 9.x, Gradle Kotlin DSL   |
| Min SDK              | 23 (Android 6.0)             |
| Target / Compile SDK | 37 (Android 15)              |

## Directory Structure

```bash
app/src/main/kotlin/io/github/hieudoanm/block/
│
├── FocusBlockApp.kt                 # Application class (@HiltAndroidApp)
│
├── accessibility/
│   └── FocusAccessibilityService.kt # Listens for foreground app changes
│
├── activity/
│   ├── MainActivity.kt              # Single-Activity entry point
│   └── BlockActivity.kt            # Full-screen block overlay
│
├── data/
│   ├── database/
│   │   ├── AppDao.kt               # Room DAO for BlockedApp
│   │   └── FocusDatabase.kt        # Room database definition
│   ├── entity/
│   │   ├── BlockedApp.kt           # Room entity
│   │   └── Schedule.kt            # Future: schedule entity
│   └── preferences/
│       └── SettingsDataStore.kt    # DataStore preferences wrapper
│
├── di/
│   └── AppModule.kt                # Hilt DI module
│
├── navigation/
│   └── NavGraph.kt                 # Compose Navigation graph
│
├── repository/
│   └── FocusRepository.kt          # Data access facade
│
└── ui/
    ├── apps/
    │   ├── AppListScreen.kt        # App picker with search
    │   └── AppListViewModel.kt
    ├── block/
    │   └── BlockScreen.kt          # Block overlay composable
    ├── home/
    │   ├── HomeScreen.kt           # Dashboard (status + blocked count)
    │   └── HomeViewModel.kt
    ├── settings/
    │   ├── SettingsScreen.kt       # Settings toggles
    │   └── SettingsViewModel.kt
    └── theme/
        ├── Color.kt                # Material 3 color palette
        └── Theme.kt               # Light/dark theme
```

## Data Flow

```bash
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

Three routes in a single-Activity Compose Navigation graph:

| Route      | Screen         | Description                    |
| ---------- | -------------- | ------------------------------ |
| `home`     | HomeScreen     | Dashboard (start destination)  |
| `app_list` | AppListScreen  | Pick apps to block             |
| `settings` | SettingsScreen | Toggle blocker and preferences |

`BlockActivity` is launched as a separate Activity by the AccessibilityService
(not part of the Compose nav graph).

## Database

**Room** — `focus_blocker.db`

```kotlin
@Entity(tableName = "blocked_apps")
data class BlockedApp(
    @PrimaryKey val packageName: String,
    val label: String,
    val enabled: Boolean = true,
)
```

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

Hilt `@Module` in `di/AppModule.kt` provides:

- `FocusDatabase` (singleton, Room builder)
- `AppDao` (from database)
- `SettingsDataStore` (singleton)

## Key Design Decisions

- **Single Activity** — `MainActivity` hosts all Compose screens. `BlockActivity`
  is a separate Activity because it must be launched from the AccessibilityService.
- **AccessibilityService uses Hilt** — `@AndroidEntryPoint` with field injection
  for `FocusRepository`.
- **Coroutine scope in service** — `SupervisorJob() + Dispatchers.IO` to avoid
  blocking the main thread during DB lookups.
- **No network calls** — everything is local-first (Room + DataStore).
