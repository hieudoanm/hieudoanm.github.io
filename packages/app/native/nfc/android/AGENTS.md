# NFC Toolkit — Android App Plan

**Stack:** Kotlin, Jetpack Compose, Android NFC APIs (`android.nfc.*`)

---

## 1. Overview

A general-purpose NFC utility app for reading, writing, analyzing, and emulating NFC tags. Targets developers, makers, and power users who want a single tool instead of five separate apps (NFC Tools, TagWriter, NFC TagInfo, etc.).

### Core value proposition

- Read any NDEF or raw tag and show a full technical breakdown
- Write NDEF records (URL, text, contact, Wi-Fi, app launch, custom MIME)
- Save/load "tag profiles" for repeat writes
- Emulate a tag via Host Card Emulation (HCE) where supported
- Tag memory dump / clone (where the tag technology allows)

---

## 2. Target Platform & Constraints

| Item                 | Detail                                                                                                   |
| -------------------- | -------------------------------------------------------------------------------------------------------- |
| Min SDK              | API 23 (Android 6.0) — NFC intent dispatch is stable from here                                           |
| Target/Compile SDK   | Latest stable (API 35 / Android 15)                                                                      |
| Language             | Kotlin 2.x                                                                                               |
| UI                   | Jetpack Compose + Material 3                                                                             |
| Hardware requirement | `android.hardware.nfc` — app should still install on non-NFC devices but disable NFC features gracefully |
| Architecture         | MVVM + Clean Architecture (data / domain / presentation layers)                                          |
| DI                   | Hilt                                                                                                     |
| Async                | Kotlin Coroutines + Flow                                                                                 |
| Persistence          | Room (tag profiles/history) + DataStore (settings)                                                       |

---

## 3. Feature Set

### 3.1 Read

- Foreground dispatch to intercept `ACTION_NDEF_DISCOVERED`, `ACTION_TECH_DISCOVERED`, `ACTION_TAG_DISCOVERED`
- Parse NDEF message into records: Text, URI, Smart Poster, MIME, External Type, Android Application Record (AAR)
- Show raw tag info: UID, technology stack (`NfcA`, `NfcB`, `NfcF`, `NfcV`, `IsoDep`, `MifareClassic`, `MifareUltralight`, `Ndef`, `NdefFormatable`), memory size, max transceive length, ATQA/SAK (for `NfcA`)
- History list of previously scanned tags (Room-backed)

### 3.2 Write

- Compose NDEF records via forms:
  - Plain text (with language code)
  - URI/URL
  - Wi-Fi network handover
  - Contact (vCard)
  - Phone number / SMS
  - App launch (AAR) — opens a specific app/package
  - Custom MIME payload (hex or text)
- Multi-record message builder (reorder, delete, preview total byte size vs tag capacity)
- Write modes: write once, make read-only (irreversible — confirmation dialog), overwrite

### 3.3 Tag Profiles / Templates

- Save a composed NDEF message as a reusable "profile" (e.g. "Office Wi-Fi", "Business Card")
- Quick-write from saved profiles list
- Import/export profiles as JSON

### 3.4 Tag Analysis ("TagInfo" mode)

- Full technical dump: UID, technology list, NDEF capacity/used/free bytes, writable/lockable state
- MIFARE Classic sector/block map (if keys known — default key attempts: `FFFFFFFFFFFF`, etc., clearly labeled as using only well-known public default keys, never brute-forcing arbitrary security)
- Export report as text/JSON/share sheet

### 3.5 Clone / Dump (technology-dependent)

- Dump readable memory (NfcV, Mifare Ultralight, NDEF) to local file
- Restore dump to a same-type blank/compatible tag
- Explicit UI warning that UID cloning is not possible on standard tags (fixed UID) — clarify what "clone" actually means here (payload/data-level, not UID-level)

### 3.6 HCE (Host Card Emulation)

- Emulate an NDEF tag from the phone (requires `HostApduService`)
- Useful for testing readers without a physical tag
- Toggle service on/off, define emulated payload

### 3.7 Settings

- Default write mode (NDEF vs raw)
- Auto-open URLs on scan (toggle, security-conscious default = off)
- Theme (light/dark/dynamic color)
- Clear history

---

## 4. Architecture

```
app/
├── data/
│   ├── nfc/               # Low-level NFC tag tech wrappers
│   │   ├── NdefReader.kt
│   │   ├── NdefWriter.kt
│   │   ├── MifareClassicReader.kt
│   │   ├── TagTechInspector.kt
│   │   └── HceApduService.kt
│   ├── db/                # Room
│   │   ├── TagHistoryDao.kt
│   │   ├── TagProfileDao.kt
│   │   └── AppDatabase.kt
│   ├── repository/
│   │   ├── NfcRepositoryImpl.kt
│   │   └── ProfileRepositoryImpl.kt
│   └── datastore/
│       └── SettingsDataStore.kt
├── domain/
│   ├── model/              # NdefRecordModel, TagInfo, TagProfile
│   ├── repository/         # interfaces
│   └── usecase/
│       ├── ReadTagUseCase.kt
│       ├── WriteTagUseCase.kt
│       ├── BuildNdefMessageUseCase.kt
│       └── AnalyzeTagUseCase.kt
├── presentation/
│   ├── navigation/         # NavHost + routes
│   ├── screen/
│   │   ├── home/
│   │   ├── read/
│   │   ├── write/
│   │   ├── profiles/
│   │   ├── analyze/
│   │   ├── hce/
│   │   └── settings/
│   ├── component/          # Reusable Composables
│   └── theme/               # Color.kt, Type.kt, Theme.kt
└── di/                      # Hilt modules
```

### Data flow

`NFC Intent (Activity)` → `TagDispatcher` → `Repository` → `UseCase` → `ViewModel (StateFlow)` → `Composable UI`

---

## 5. NFC Integration Details

### 5.1 Foreground Dispatch Setup

```kotlin
override fun onResume() {
    super.onResume()
    val intent = Intent(this, javaClass).addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP)
    val pendingIntent = PendingIntent.getActivity(
        this, 0, intent, PendingIntent.FLAG_MUTABLE
    )
    val filters = arrayOf(
        IntentFilter(NfcAdapter.ACTION_NDEF_DISCOVERED),
        IntentFilter(NfcAdapter.ACTION_TECH_DISCOVERED),
        IntentFilter(NfcAdapter.ACTION_TAG_DISCOVERED)
    )
    val techLists = arrayOf(
        arrayOf(NfcA::class.java.name),
        arrayOf(MifareClassic::class.java.name),
        arrayOf(Ndef::class.java.name)
    )
    nfcAdapter?.enableForegroundDispatch(this, pendingIntent, filters, techLists)
}

override fun onPause() {
    super.onPause()
    nfcAdapter?.disableForegroundDispatch(this)
}
```

Route intents into a shared `SharedFlow<Tag>` that ViewModels collect, since Compose activities are typically single-Activity.

### 5.2 Reading NDEF

```kotlin
val tag = intent.getParcelableExtra<Tag>(NfcAdapter.EXTRA_TAG)
val ndef = Ndef.get(tag)
ndef?.let {
    it.connect()
    val message = it.cachedNdefMessage ?: it.ndefMessage
    val records = message?.records?.map { r -> parseRecord(r) }
    it.close()
}
```

### 5.3 Writing NDEF

```kotlin
val ndef = Ndef.get(tag)
if (ndef != null && ndef.isWritable) {
    ndef.connect()
    if (message.byteArrayLength <= ndef.maxSize) {
        ndef.writeNdefMessage(message)
    }
    ndef.close()
} else {
    val formatable = NdefFormatable.get(tag)
    formatable?.connect()
    formatable?.format(message)
    formatable?.close()
}
```

### 5.4 HCE Service (AndroidManifest + APDU)

```xml
<service android:name=".data.nfc.HceApduService"
    android:exported="true"
    android:permission="android.permission.BIND_NFC_SERVICE">
    <intent-filter>
        <action android:name="android.nfc.cardemulation.action.HOST_APDU_SERVICE"/>
    </intent-filter>
    <meta-data android:name="android.nfc.cardemulation.host_apdu_service"
        android:resource="@xml/apduservice"/>
</service>
```

`HostApduService.processCommandApdu()` responds to `SELECT AID` and returns the emulated NDEF payload framed per ISO 7816-4/NDEF Type 4 Tag spec.

### 5.5 Permissions (AndroidManifest.xml)

```xml
<uses-permission android:name="android.permission.NFC" />
<uses-feature android:name="android.hardware.nfc" android:required="false" />
```

Check `nfcAdapter == null` → show "NFC not supported" state; check `!nfcAdapter.isEnabled` → prompt user to enable NFC via `Settings.ACTION_NFC_SETTINGS`.

---

## 6. UI / UX (Jetpack Compose)

### Navigation

Bottom nav or nav rail (adaptive) with 4–5 top-level destinations: **Home / Scan**, **Write**, **Profiles**, **History**, **Settings**. HCE and Analyze reachable from Home or a "Tools" menu.

### Key screens

| Screen        | Purpose                                                         | Key Composables                                      |
| ------------- | --------------------------------------------------------------- | ---------------------------------------------------- |
| Home / Scan   | Waiting-for-tag state, animated NFC icon, last scan result card | `NfcScanAnimation`, `TagResultCard`                  |
| Read Detail   | Full record breakdown, raw hex toggle                           | `RecordListItem`, `ExpandableHexView`                |
| Write Builder | Record type picker, dynamic form, live byte-size meter          | `RecordTypeChips`, `NdefRecordForm`, `CapacityMeter` |
| Profiles      | Grid/list of saved templates                                    | `ProfileCard`, `SwipeToDeleteRow`                    |
| Analyze       | Tech tree, sector/block table for Mifare                        | `TagTechTree`, `SectorTable`                         |
| HCE           | Toggle emulation, define payload                                | `HceToggleCard`, `ApduLogView`                       |
| Settings      | Preferences                                                     | Standard `ListItem` + `Switch`                       |

### State handling pattern

```kotlin
sealed interface ScanUiState {
    data object WaitingForTag : ScanUiState
    data object Reading : ScanUiState
    data class Success(val tagInfo: TagInfo) : ScanUiState
    data class Error(val message: String) : ScanUiState
}
```

ViewModel exposes `StateFlow<ScanUiState>`; Composable collects via `collectAsStateWithLifecycle()`.

### Design notes

- Use Material 3 dynamic color + a distinct accent for "scanning" state (pulsing animation, `rememberInfiniteTransition`)
- Respect dark/light theme, support edge-to-edge
- Empty/error states should be explicit and actionable, not blank screens

---

## 7. Data Models (Domain)

```kotlin
data class TagInfo(
    val uid: String,
    val techList: List<String>,
    val isWritable: Boolean,
    val isNdefFormatable: Boolean,
    val maxSize: Int,
    val usedSize: Int,
    val ndefRecords: List<NdefRecordModel>
)

sealed class NdefRecordModel {
    data class TextRecord(val text: String, val languageCode: String) : NdefRecordModel()
    data class UriRecord(val uri: String) : NdefRecordModel()
    data class MimeRecord(val mimeType: String, val payload: ByteArray) : NdefRecordModel()
    data class AarRecord(val packageName: String) : NdefRecordModel()
    data class UnknownRecord(val tnf: Short, val type: ByteArray, val payload: ByteArray) : NdefRecordModel()
}

data class TagProfile(
    val id: Long = 0,
    val name: String,
    val records: List<NdefRecordModel>,
    val createdAt: Long
)
```

---

## 8. Testing Strategy

| Layer           | Approach                                                                                                                                                      |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Domain/UseCase  | JUnit5 + MockK, no Android dependency                                                                                                                         |
| NDEF parsing    | Unit tests with hand-built `NdefMessage` byte arrays                                                                                                          |
| Repository      | Fake `NfcAdapter`/`Tag` wrappers via interfaces (abstract the Android NFC classes behind your own `TagReader` interface for testability)                      |
| Compose UI      | `ComposeTestRule`, semantics-based assertions                                                                                                                 |
| Manual/hardware | Physical test matrix: NTAG213/215/216, Mifare Classic 1K, Mifare Ultralight, ISO 15693 tag, at least 2 physical Android devices (NFC chipsets vary in quirks) |

---

## 9. Security & Privacy Considerations

- Never attempt to brute-force or crack Mifare Classic keys — only try well-known/default keys and clearly label this in UI as "manufacturer default key" attempts
- Warn clearly before any "make read-only" action (irreversible on the physical tag)
- Do not auto-launch URLs/apps from scanned tags without explicit user confirmation (prevents malicious tag attacks)
- Tag history stored locally only, no cloud sync by default
- If adding cloud profile sync later, encrypt at rest and be explicit in privacy policy

---

## 10. Suggested Build Phases

**Phase 1 — Core Read (MVP)**

- Foreground dispatch, NDEF parsing, basic tag info screen, history list

**Phase 2 — Core Write**

- Record builder UI, write/format flow, capacity checks

**Phase 3 — Profiles**

- Room-backed save/load, JSON import/export

**Phase 4 — Analyze**

- Tech tree, Mifare Classic sector reading, export report

**Phase 5 — HCE**

- Host card emulation service, APDU logging UI

**Phase 6 — Polish**

- Theming, animations, onboarding, Play Store listing, accessibility pass (TalkBack labels on all icon buttons)

---

## 11. Key Libraries

| Purpose       | Library                                                |
| ------------- | ------------------------------------------------------ |
| DI            | `com.google.dagger:hilt-android`                       |
| DB            | `androidx.room:room-runtime` + `room-ktx`              |
| Settings      | `androidx.datastore:datastore-preferences`             |
| Navigation    | `androidx.navigation:navigation-compose`               |
| Serialization | `kotlinx-serialization-json` (profile import/export)   |
| Testing       | `io.mockk:mockk`, `androidx.compose.ui:ui-test-junit4` |

---

## 12. Open Questions to Resolve Early

1. Single-Activity vs multi-Activity for NFC intent handling? (Single-Activity + Compose Navigation is recommended.)
2. How far to go with Mifare Classic support given legal/ethical sensitivity around key handling?
3. Ship HCE in v1 or defer to a later release (adds manifest complexity and a distinct testing surface)?
4. Minimum tag types to officially support/test against (NTAG21x is the most common consumer tag family — good default baseline).
