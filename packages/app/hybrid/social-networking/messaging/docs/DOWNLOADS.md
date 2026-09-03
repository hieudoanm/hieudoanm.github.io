# Messaging

> End-to-end encrypted, peer-to-peer messaging — no server, no middleman. Runs
> on your phone, tablet, laptop, or desktop.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

```txt
┌─────────────────────────────────────┐
│  MESSAGING              🔒  👤     │
├──────────┬──────────────────────────┤
│ Alice    │  🔒 End-to-end encrypted │
│ ● Online │  ──────────────────────  │
│ Bob      │  Alice: Hey, are you in? │
│ ○ Last   │  Bob: Joining now!       │
│   seen   │                          │
│ Carol    │  📎  🎤  😀  Send →      │
└──────────┴──────────────────────────┘
```

---

## Latest release

- **Version:** `app-hybrid-social-networking-messaging-latest` — updates ship
  continuously.
- **What's new:** see the [roadmap](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the file that matches your platform and you're good to go.

### Downloads

| No  | Platform | Distro | Architecture | Requirements | Download Link                              | Note             |
| --- | -------- | ------ | ------------ | ------------ | ------------------------------------------ | ---------------- |
| 1   | Android  |        | Universal    | 14.+         | [Download `.apk`][download-apk]            | Install directly |
| 2   | Android  |        | Universal    | 14.+         | [Download `.aab`][download-aab]¹           | For store upload |
| 3   | Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] | Run — no install |
| 4   | Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]            |                  |
| 5   | macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]²           | Apple Silicon    |
| 6   | Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]            |                  |

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

<br>

¹ The `.aab` bundle is for Google Play upload, not direct install.

² Apple Silicon (M1+) only. macOS 13 required.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-social-networking-messaging-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/social-networking/messaging
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

Telegram / WhatsApp / Signal in one package — peer-to-peer, encrypted messaging
with no back-end server. Your messages go straight to the other side.

---

## Features

Full-featured, private messaging with everything you expect from a modern chat
app.

### ✉️ Messaging

- 1:1 text messaging with delivery states (sending, sent, delivered, read)
- Group chats with participant management and admin roles
- Reply threading with quoted messages
- Message edit, forward, and delete (for me / for everyone)
- Emoji reactions with reaction picker
- In-chat search with jump-to-message
- Typing indicators and presence (online, last seen)
- Unread badge counts and per-chat settings (mute, notifications)

### 🖼️ Media & Rich Content

- Image, video, audio, and file attachments
- Voice messages with recording
- Image lightbox with zoom and swipe
- Per-chat media gallery
- Stickers and GIF picker
- Emoji autocomplete and link preview cards
- Forward messages to multiple chats

### 🔒 Privacy & Security

- End-to-end encryption (X25519 + AES-GCM via Web Crypto)
- Key verification and device trust list
- Secret chats with screenshot warnings
- Disappearing messages with timers
- Blocked contacts and spam reports
- Privacy settings (last seen, profile photo, read receipts)
- Two-step verification / PIN lock
- Message deletion for everyone

### 📞 Calls

- 1:1 voice and video calls (WebRTC)
- Group voice/video calls
- Call controls (mute, camera, speaker, switch)
- Call history with missed-call indicators
- Picture-in-picture and screen sharing

### 🌐 Peer-to-Peer & Real-time

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

### 📱 Platform & Ecosystem

- Tauri desktop and Android shells
- Channels and broadcast lists
- Bots with slash commands (mock)
- Status/stories (24-hour ephemeral)
- Encrypted backup and restore
- Contact import and OS share-sheet integration

---

# First run

- **macOS:** Right-click the `.dmg` and choose **Open** to bypass Gatekeeper.
- **Linux AppImage:**
  `chmod +x messaging_amd64.AppImage && ./messaging_amd64.AppImage`
- **Windows SmartScreen:** Click **More info → Run anyway** if prompted.
- **Android Play Protect:** Tap **Install anyway** if the warning appears.

---

## First run

---

## Next steps

- Check [CONTRIBUTING](CONTRIBUTING) for dev setup, coding conventions, and how
  to run tests.
- Browse the [ROADMAP](ROADMAP) for what's shipping next.

---

## License

See [LICENSE](LICENSE).
