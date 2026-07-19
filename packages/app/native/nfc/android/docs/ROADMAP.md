# Roadmap

> Local-first NFC toolkit. No sign-in. Data stays on device. Tag reading and
> writing use Android NFC APIs; history and profiles are persisted in Room;
> preferences live in DataStore.

## Phase 1 — Core Read (Shipped)

> Read any NFC tag and show a full technical breakdown.

- [x] Project setup (Kotlin, Jetpack Compose, Material 3, Hilt, Room, DataStore)
- [x] Single-Activity architecture with Compose Navigation
- [x] NFC foreground dispatch (NDEF, TECH, TAG_DISCOVERED)
- [x] NDEF parsing — Text, URI, Smart Poster, MIME, AAR, Unknown records
- [x] Tag info display — UID, tech list, writable status, memory size
- [x] Tag history — Room persistence, history screen with clear dialog
- [x] Settings — auto-open URLs, dark mode via DataStore
- [x] NFC status handling — banners for unavailable/disabled NFC
- [x] HCE skeleton — `HostApduService` with Type 4 Tag AID registered

## Phase 2 — Core Write

> Write NDEF messages to tags.

- [ ] Write NDEF records — text, URI, contact, Wi-Fi, app launch, custom MIME
- [ ] Multi-record message builder (reorder, delete, byte-size preview)
- [ ] Write modes: write once, make read-only, overwrite
- [ ] Format unformatted tags via `NdefFormatable`
- [ ] Capacity check vs tag max size
- [ ] Write confirmation dialog for irreversible operations

## Phase 3 — Profiles

> Save and reuse NDEF messages.

- [ ] Save composed NDEF message as a named profile
- [ ] Profiles list screen with swipe-to-delete
- [ ] Quick-write from saved profile
- [ ] Import/export profiles as JSON
- [ ] Profile editing

## Phase 4 — Analyze

> Deep tag inspection for developers and power users.

- [ ] Full technical dump — UID, tech tree, NDEF capacity/used/free
- [ ] MIFARE Classic sector/block map (default keys only)
- [ ] ATQA/SAK details for NfcA tags
- [ ] Export report as text/JSON/share sheet
- [ ] Tag comparison (side-by-side)

## Phase 5 — HCE

> Emulate NDEF tags from the phone.

- [ ] Full NDEF payload emulation via `HostApduService`
- [ ] Define emulated payload in UI
- [ ] Toggle HCE service on/off
- [ ] APDU command log viewer
- [ ] Preset emulated tags (business card, Wi-Fi, URL)

## Phase 6 — Clone & Polish

> Technology-dependent dump/restore and platform polish.

- [ ] Dump readable memory (NfcV, Mifare Ultralight, NDEF) to local file
- [ ] Restore dump to same-type blank tag
- [ ] Clear UI warning that UID cloning is not possible
- [ ] Material You dynamic color
- [ ] Accessibility pass — TalkBack labels on all icon buttons
- [ ] Onboarding flow — guide user through NFC permissions
- [ ] E2E testing with Espresso / Compose Testing
- [ ] Play Store listing
