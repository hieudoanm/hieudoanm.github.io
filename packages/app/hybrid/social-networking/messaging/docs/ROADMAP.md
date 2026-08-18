# Roadmap

> No back-end — the messaging app is purely client-to-client with end-to-end
> encryption (Web Crypto). Real-time delivery, calls, and sync run over WebRTC;
> no account servers.

## Phase 1 — Foundation

> Core: scaffold, account, contacts, 1:1 chat — **done**

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

> Conversations: groups, reactions, search, message actions — **done**

- [x] Group chats with participant management
- [x] Group admins and roles
- [x] Emoji reactions (double-tap heart, reaction picker)
- [x] Message actions (copy, forward, delete, reply)
- [x] Reply threading with quoted messages
- [x] In-chat search with jump-to-message
- [x] Typing indicators
- [x] Presence (online/offline, last seen)
- [x] Message edit and delete-for-everyone
- [x] Chat settings (mute, notifications, wallpaper)

## Phase 3 — Media & Rich Messages

> Media: images, video, audio, files, voice, stickers — **done**

- [x] Image attachment with compression
- [x] Video attachment with playback
- [x] Voice messages with recording
- [x] File attachment with upload progress
- [x] Image lightbox with zoom and swipe
- [x] Per-chat media gallery
- [x] Stickers and GIF picker
- [x] Emoji autocomplete in composer
- [x] Link preview cards
- [x] Forward messages to multiple chats

## Phase 4 — Privacy & Security

> Security: E2E encryption, secret chats, disappearing messages — **done**

- [x] End-to-end encryption via Web Crypto (ECDH P-256 + AES-GCM)
- [x] Device key exchange and verification codes
- [x] Secret chats (locked, screenshot warning, incognito keyboard)
- [x] Disappearing messages with timers
- [x] Blocked contacts and spam report
- [x] Privacy settings (last seen, profile photo, read receipts)
- [x] Two-step verification / PIN lock
- [x] Incognito keyboard for sensitive chats
- [x] Message deletion for everyone
- [x] Device trust list with signed keys

## Phase 5 — Voice & Video Calls

> Calls: WebRTC voice, video, group calls — **done**

- [x] 1:1 voice calls (WebRTC)
- [x] 1:1 video calls with camera controls
- [x] Group voice/video calls
- [x] Call controls (mute, camera, speaker, switch)
- [x] Call history with missed-call indicators
- [x] Picture-in-picture during calls
- [x] Screen sharing
- [x] Call quality indicators (mock)

## Phase 6 — Peer-to-Peer & Real-time

> P2P: WebRTC transport, E2EE key exchange, sync — **no back-end, purely
> client-to-client** — **done**

- [x] WebRTC DataChannel transport (no server)
- [x] Pairing via QR code or copy-paste SDP offer/answer
- [x] E2EE key exchange (ECDH P-256 + AES-GCM via Web Crypto)
- [x] Key verification codes (safety numbers)
- [x] Real-time message delivery over data channels
- [x] Presence and typing events over data channels
- [x] End-to-end delivery/read receipt tracking
- [x] Multi-device sync with encrypted key backup
- [x] Reconnect and retry logic with backoff
- [x] Optional TURN relay for NAT traversal (no app logic)

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
