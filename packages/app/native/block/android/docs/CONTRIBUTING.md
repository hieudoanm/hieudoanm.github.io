# Contributing

## Prerequisites

| Tool        | Version                                               |
| ----------- | ----------------------------------------------------- |
| JDK         | 17+                                                   |
| Android SDK | API 37 (installed via Android Studio or `sdkmanager`) |
| Gradle      | 9.7+ (wrapper included)                               |
| Kotlin      | 2.4.10 (managed by Gradle plugin)                     |

## Setup

```bash
# Clone the repo
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd hieudoanm.github.io/packages/app/native/block/android

# Create local.properties with your SDK path
echo "sdk.dir=$HOME/Library/Android/sdk" > local.properties

# Build
./gradlew assembleDebug
```

## Dev Commands

| Command                               | Description                          |
| ------------------------------------- | ------------------------------------ |
| `./gradlew assembleDebug`             | Build debug APK                      |
| `./gradlew assembleRelease`           | Build release APK (needs signing)    |
| `./gradlew lint`                      | Run Android lint (errors + warnings) |
| `./gradlew testDebugUnitTest`         | Run unit tests                       |
| `./gradlew connectedDebugAndroidTest` | Run instrumented tests               |
| `./gradlew clean`                     | Clean build artifacts                |

## Coding Conventions

- **Kotlin first** — no Java source files.
- **Compose for all UI** — no XML layouts.
- **MVVM** — `Screen` composable owns a `ViewModel` via `hiltViewModel()`.
- **StateFlow + collectAsStateWithLifecycle** for reactive UI.
- **`val` over `var`** — prefer immutability.
- **Explicit types** — prefer explicit return types on public functions.
- **Small files** — aim for < 200 lines per file.
- **Small functions** — aim for < 30 lines per function.
- **No comments** unless the intent is genuinely non-obvious.
- **Test names as documentation** — `test("returns empty list when no apps blocked")`.

## Testing

Unit tests use:

- **JUnit 4** with Robolectric for Android context
- **MockK** for mocking
- **Turbine** for Flow testing
- **Compose Testing** (`createComposeRule`) for UI tests

```bash
./gradlew testDebugUnitTest
```

### Test structure

```bash
app/src/test/kotlin/io/github/hieudoanm/block/
├── ui/
│   ├── apps/AppListScreenTest.kt
│   ├── home/HomeScreenTest.kt
│   └── settings/SettingsScreenTest.kt
└── ...
```

## Project Structure

See [docs/ARCHITECTURE.md](ARCHITECTURE.md) for the full directory layout and
data flow.
