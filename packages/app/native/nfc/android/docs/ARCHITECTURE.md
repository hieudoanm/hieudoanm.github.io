# Architecture

> NFC Toolkit — Kotlin + Jetpack Compose app for reading, writing, analyzing,
> and emulating NFC tags. Uses Android NFC APIs (`android.nfc.*`).

## Tech Stack

| Layer                | Technology                    |
| -------------------- | ----------------------------- |
| Language             | Kotlin 2.x                    |
| UI                   | Jetpack Compose + Material 3  |
| Architecture         | MVVM + Clean Architecture     |
| Navigation           | Navigation Compose            |
| Persistence          | Room (tag history + profiles) |
| Preferences          | DataStore                     |
| Async                | Kotlin Coroutines + Flow      |
| Dependency Injection | Hilt                          |
| NFC                  | Android NFC APIs + HCE        |
| Build                | AGP 9.x, Gradle Kotlin DSL    |
| Min SDK              | 23 (Android 6.0)              |
| Target / Compile SDK | 37 (Android 15)               |

## Directory Structure

```bash
app/src/main/kotlin/io/github/hieudoanm/nfc/
│
├── NfcToolkitApp.kt                  # Application class (@HiltAndroidApp)
│
├── activity/
│   └── MainActivity.kt              # Single-Activity, NFC foreground dispatch
│
├── data/
│   ├── nfc/
│   │   ├── TagDispatcher.kt         # NFC foreground dispatch lifecycle
│   │   ├── NdefReader.kt            # Read + parse NDEF messages
│   │   ├── NdefWriter.kt            # Write NDEF messages to tags
│   │   ├── TagTechInspector.kt      # Inspect tag tech details (UID, ATQA, SAK)
│   │   └── HceApduService.kt       # Host Card Emulation service
│   ├── database/
│   │   ├── AppDatabase.kt           # Room database (v2)
│   │   ├── TagHistoryDao.kt         # DAO for scan history
│   │   └── TagProfileDao.kt         # DAO for saved tag profiles
│   ├── entity/
│   │   ├── TagHistory.kt            # Room entity — scan history
│   │   └── TagProfile.kt           # Room entity — saved profiles
│   ├── repository/
│   │   └── NfcRepository.kt         # Data access facade
│   └── preferences/
│       └── SettingsDataStore.kt     # DataStore preferences wrapper
│
├── di/
│   └── AppModule.kt                 # Hilt DI module
│
├── domain/
│   └── model/
│       ├── TagInfo.kt               # Tag metadata (uid, tech, size, records)
│       └── NdefRecordModel.kt       # Sealed interface for NDEF record types
│
├── navigation/
│   └── NavGraph.kt                  # Compose Navigation graph
│
└── ui/
    ├── home/
    │   ├── HomeScreen.kt            # Scan screen with NFC animation
    │   └── HomeViewModel.kt         # Reads tags, manages scan state
    ├── history/
    │   ├── HistoryScreen.kt         # List of previously scanned tags
    │   └── HistoryViewModel.kt      # History list + clear
    ├── settings/
    │   ├── SettingsScreen.kt        # Settings toggles
    │   └── SettingsViewModel.kt     # Preferences state
    └── theme/
        ├── Color.kt                 # Material 3 color palette
        └── Theme.kt                # Light/dark/dynamic theme
```

## Data Flow

```bash
NFC Tag Detected
        │
        ▼
MainActivity.onNewIntent()
        │
        ▼
TagDispatcher.handleIntent()
        │
        ▼
SharedFlow<Tag>
        │
        ▼
HomeViewModel (collects)
        │
        ├──▶ TagTechInspector.inspect(tag)  → uid, tech, writable, size
        │
        ├──▶ NdefReader.read(ndef)          → List<NdefRecordModel>
        │
        ├──▶ NfcRepository.saveToHistory()  → Room persistence
        │
        ▼
HomeUiState.Success(tagInfo)
        │
        ▼
HomeScreen (Compose UI)
```

## Navigation

| Route              | Screen         | Description                   |
| ------------------ | -------------- | ----------------------------- |
| `home`             | HomeScreen     | NFC scan screen (destination) |
| `history`          | HistoryScreen  | Previously scanned tags       |
| `settings`         | SettingsScreen | App preferences               |
| `read_detail/{id}` | (planned)      | Tag detail view               |

## Database

**Room** — `nfc_toolkit.db` (version 2)

```kotlin
@Entity(tableName = "tag_history")
data class TagHistory(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val uid: String,
    val techSummary: String,
    val ndefRecords: String,        // JSON-serialized
    val isWritable: Boolean,
    val maxSize: Int,
    val usedSize: Int,
    val scannedAt: Long,
)

@Entity(tableName = "tag_profiles")
data class TagProfile(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val name: String,
    val uid: String,
    val techSummary: String,
    val ndefRecords: String,        // JSON-serialized
    val isWritable: Boolean,
    val maxSize: Int,
    val usedSize: Int,
    val createdAt: Long,
)
```

## DataStore Preferences

| Key             | Type    | Default |
| --------------- | ------- | ------- |
| `auto_open_url` | Boolean | false   |
| `dark_mode`     | Boolean | false   |

## NFC Integration

### Foreground Dispatch

`TagDispatcher` manages the NFC foreground dispatch lifecycle:

- Registers intent filters for `NDEF_DISCOVERED`, `TECH_DISCOVERED`, `TAG_DISCOVERED`
- Registers tech lists: NfcA/B/F/V, IsoDep, MifareClassic/Ultralight, Ndef, NdefFormatable
- Emits scanned `Tag` objects via `SharedFlow<Tag>`

### NDEF Parsing

`NdefReader` parses NDEF records by TNF (Type Name Format):

- **Well-Known**: Text, URI, Smart Poster
- **MIME Media**: custom MIME types
- **Absolute URI**: raw URI
- **External Type**: Android Application Record (AAR)
- **Unknown**: raw hex dump

### HCE (Host Card Emulation)

`HceApduService` extends `HostApduService`:

- Registered with NFC Forum Type 4 Tag AID (`D2760000850101`)
- Responds to SELECT AID commands with `0x9000` (success)
- Unknown commands return `0x6A82` (file not found)

## Key Design Decisions

- **Clean Architecture** — domain models (`TagInfo`, `NdefRecordModel`) are
  independent of Android NFC types; conversion happens in the data layer.
- **Single Activity** — `MainActivity` hosts all Compose screens and manages
  NFC foreground dispatch lifecycle.
- **Singleton NFC objects** — `TagDispatcher`, `NdefReader`, `NdefWriter`,
  `TagTechInspector` are singletons injected via Hilt.
- **JSON serialization** — NDEF records are stored as JSON strings in Room
  (via `kotlinx.serialization` or manual serialization).
- **Graceful degradation** — app installs on non-NFC devices; NFC features
  are disabled gracefully with status banners.
