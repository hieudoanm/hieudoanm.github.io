# Features

> NFC Toolkit — a general-purpose NFC utility for reading, writing, analyzing,
> and emulating NFC tags.

## Read

- Foreground dispatch to intercept NFC tags automatically
- Parse NDEF messages into typed records: Text, URI, Smart Poster, MIME, AAR, Unknown
- Show full tag info: UID, technology stack, memory size, writable status
- ATQA and SAK display for NfcA tags
- Detect NDEF-formatable tags

## Tag History

- Automatically save every scanned tag to local Room database
- Browse history list with UID, timestamp, tech summary, memory usage
- Clear history with confirmation dialog
- Empty state with NFC icon

## Settings

- Auto-open URLs on scan (off by default for security)
- Dark mode toggle

## Home / Scan

- Pulsing NFC icon animation while waiting for a tag
- NFC status banners — red if NFC unavailable, orange if NFC disabled
- Full tag detail card on successful scan
- Individual record cards for each NDEF record

## Tag Analysis (Planned)

- Full technical dump: UID, technology list, NDEF capacity/used/free bytes
- MIFARE Classic sector/block map (default keys only — no brute-force)
- Export report as text/JSON/share sheet

## Write (Planned)

- Compose NDEF records via forms: text, URI, Wi-Fi, contact, app launch, custom MIME
- Multi-record message builder with reorder and byte-size preview
- Write once, make read-only (irreversible), or overwrite

## Tag Profiles (Planned)

- Save composed NDEF messages as reusable templates
- Quick-write from saved profiles list
- Import/export profiles as JSON

## HCE (Skeleton)

- Host Card Emulation service registered with NFC Forum Type 4 Tag AID
- Responds to SELECT AID commands
- Full NDEF payload emulation (planned)

---

See [docs/ROADMAP.md](ROADMAP.md) for the full phased roadmap.
