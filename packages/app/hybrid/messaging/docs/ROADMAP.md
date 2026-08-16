# Roadmap

> No back-end — the messaging app is purely client-to-client with end-to-end
> encryption (Web Crypto). Real-time delivery, calls, and sync run over WebRTC;
> no account servers.

## Phase 1 — Foundation

> Core: scaffold, account, contacts, 1:1 chat — **in progress (mock client
> done)**

- [x] App scaffold (Next.js + Tauri) with dark theme
- [x] Phone number / username sign-up and sign-in (mock)
- [x] Contact list with avatars and search
- [x] Chat list with last-message preview and timestamp
- [x] 1:1 chat view with message bubbles
- [x] Message composer (send with Enter, newline with Shift+Enter)
- [x] Delivery states (sending, sent, delivered, read)
- [x] Unread badge counts
- [x] Empty, loading, and offline states
- [x] Responsive layout (desktop sidebar + mobile tabs)

## Phase 2 — Conversations & Groups

> Conversations: groups, reactions, search, message actions — **in progress**

- [x] Group chats with participant management
- [ ] Group admins and roles
- [x] Emoji reactions (double-tap heart, reaction picker)
- [ ] Message actions (copy, forward, delete, reply)
- [ ] Reply threading with quoted messages
- [ ] In-chat search with jump-to-message
- [ ] Typing indicators
- [x] Presence (online/offline, last seen)
- [ ] Message edit and delete-for-everyone
- [ ] Chat settings (mute, notifications, wallpaper)

## Phase 3 — Media & Rich Messages

> Media: images, video, audio, files, voice, stickers

- [ ] Image attachment with compression
- [ ] Video attachment with playback
- [ ] Voice messages with recording
- [ ] File attachment with upload progress
- [ ] Image lightbox with zoom and swipe
- [ ] Per-chat media gallery
- [ ] Stickers and GIF picker
- [ ] Emoji autocomplete in composer
- [ ] Link preview cards
- [ ] Forward messages to multiple chats

## Phase 4 — Privacy & Security

> Security: E2E encryption, secret chats, disappearing messages

- [ ] End-to-end encryption via Web Crypto (X25519 + AES-GCM)
- [ ] Device key exchange and verification codes
- [ ] Secret chats (locked, screenshot warning)
- [ ] Disappearing messages with timers
- [ ] Blocked contacts and spam report
- [ ] Privacy settings (last seen, profile photo, read receipts)
- [ ] Two-step verification / PIN lock
- [ ] Incognito keyboard for sensitive chats
- [ ] Message deletion for everyone
- [ ] Device trust list with signed keys

## Phase 5 — Voice & Video Calls

> Calls: WebRTC voice, video, group calls

- [ ] 1:1 voice calls (WebRTC)
- [ ] 1:1 video calls with camera controls
- [ ] Group voice/video calls
- [ ] Call controls (mute, camera, speaker, switch)
- [ ] Call history with missed-call indicators
- [ ] Picture-in-picture during calls
- [ ] Screen sharing
- [ ] Call quality indicators (mock)

## Phase 6 — Peer-to-Peer & Real-time

> P2P: WebRTC transport, E2EE key exchange, sync — **no back-end, purely
> client-to-client**

- [ ] WebRTC DataChannel transport (no server)
- [ ] Pairing via QR code or copy-paste SDP offer/answer
- [ ] E2EE key exchange (X25519 + AES-GCM via Web Crypto)
- [ ] Key verification codes (safety numbers)
- [ ] Real-time message delivery over data channels
- [ ] Presence and typing events over data channels
- [ ] End-to-end delivery/read receipt tracking
- [ ] Multi-device sync with encrypted key backup
- [ ] Reconnect and retry logic with backoff
- [ ] Optional TURN relay for NAT traversal (no app logic)

## Phase 7 — Platform & Ecosystem

> Ecosystem: desktop, mobile, stickers, bots, backup

- [ ] Tauri desktop build and signing
- [ ] Android shell (Capacitor or Tauri Mobile)
- [ ] Sticker pack manager
- [ ] Channels and broadcast lists
- [ ] Bots with slash commands (mock)
- [ ] Status/stories (24-hour ephemeral)
- [ ] Encrypted backup and restore
- [ ] Contact import from device
- [ ] OS share-sheet integration
- [ ] Voice message transcription
