# Messaging

## Installation

| Platform | Distro | Architecture | Requirements | Download Link                              |
| -------- | ------ | ------------ | ------------ | ------------------------------------------ |
| Android  |        | Universal    | 14.+         | [Download `.apk`][download-apk]            |
| Android  |        | Universal    | 14.+         | [Download `.aab`][download-aab]¹           |
| Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] |
| Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]            |
| macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]²           |
| Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]            |

[download-apk]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-social-networking-messaging-latest/app-universal-release.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-social-networking-messaging-latest/app-universal-release.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-social-networking-messaging-latest/messaging_amd64.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-social-networking-messaging-latest/messaging_amd64.deb
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-social-networking-messaging-latest/messaging_aarch64.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-social-networking-messaging-latest/messaging_x64.msi

### Checksums

SHA-256 digests for every asset are published alongside the release in
[SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-social-networking-messaging-latest/SHA256SUMS.txt

## About

Messaging — Telegram / WhatsApp / Messenger / Signal-style chat client. No
back-end: purely client-to-client with end-to-end encryption.

## Features

## Status

13/68 roadmap items complete — Phase 1 (Foundation) fully complete and part of
Phase 2 (Conversations & Groups): chat list, 1:1/group chat, composer, delivery
states, unread badges, reactions, presence, responsive layout, sign-up/sign-in.
No back-end — the app is purely client-to-client with end-to-end encryption;
real-time delivery is planned over WebRTC DataChannels.

---

## Messaging

- 1:1 text messaging with delivery states (sending, sent, delivered, read)
- Group chats with participant management and admin roles
- Reply threading with quoted messages
- Message edit, forward, and delete (for me / for everyone)
- Emoji reactions with reaction picker
- In-chat search with jump-to-message
- Typing indicators and presence (online, last seen)
- Unread badge counts and per-chat settings (mute, notifications)

## Media & Rich Content

- Image, video, audio, and file attachments
- Voice messages with recording
- Image lightbox with zoom and swipe
- Per-chat media gallery
- Stickers and GIF picker
- Emoji autocomplete and link preview cards
- Forward messages to multiple chats

## Privacy & Security

- End-to-end encryption (X25519 + AES-GCM via Web Crypto)
- Key verification and device trust list
- Secret chats with screenshot warnings
- Disappearing messages with timers
- Blocked contacts and spam reports
- Privacy settings (last seen, profile photo, read receipts)
- Two-step verification / PIN lock
- Message deletion for everyone

## Calls

- 1:1 voice and video calls (WebRTC)
- Group voice/video calls
- Call controls (mute, camera, speaker, switch)
- Call history with missed-call indicators
- Picture-in-picture and screen sharing

## Peer-to-Peer & Real-time

- WebRTC DataChannel transport (no back-end)
- Pairing via QR code or copy-paste SDP offer/answer
- End-to-end encryption (X25519 + AES-GCM via Web Crypto)
- Key verification codes (safety numbers)
- Real-time delivery, presence, and typing over data channels
- End-to-end delivery/read receipt tracking
- Multi-device sync with encrypted key backup
- Local/Web Push notifications (no app server)
- Reconnect and retry logic with backoff
- Optional TURN relay for NAT traversal (no app logic)

## Platform & Ecosystem

- Tauri desktop and Android shells
- Channels and broadcast lists
- Bots with slash commands (mock)
- Status/stories (24-hour ephemeral)
- Encrypted backup and restore
- Contact import and OS share-sheet integration

## Requirements

- Android 14+
- Linux (Ubuntu) 22.04+
- Linux (Debian) 13+
- macOS 13+
- Windows 10+

## LICENSE

No LICENSE file is included for this project.
