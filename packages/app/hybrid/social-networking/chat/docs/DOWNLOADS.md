# Chat

> Talk to any AI from one interface — Chat is a minimal, no-fluff AI chat
> client that runs on your phone, tablet, laptop, or desktop.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

```txt
┌─────────────────────────────────────┐
│  CHAT                    ⚙  👤     │
├──────────┬──────────────────────────┤
│ Convos   │  You: Summarise this PR  │
│ ──────── │                          │
│ > Conv 1 │  AI: Here's a summary…  │
│   Conv 2 │  The changes introduce…  │
│   Conv 3 │  ─────────────────────   │
│          │  Model: GPT-4o    Send → │
└──────────┴──────────────────────────┘
```

---

## Latest release

- **Version:** `app-hybrid-social-networking-chat-latest` — updates ship continuously.
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
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-social-networking-chat-latest/app-universal-release.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-social-networking-chat-latest/app-universal-release.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-social-networking-chat-latest/chat_amd64.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-social-networking-chat-latest/chat_amd64.deb
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-social-networking-chat-latest/chat_aarch64.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-social-networking-chat-latest/chat_x64.msi

<br>

¹ The `.aab` bundle is for Google Play upload, not direct install.

² Apple Silicon (M1+) only. macOS 13 required.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-social-networking-chat-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/social-networking/chat
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

A stripped-down Codex / Claude client — talk to any AI, switch models on the
fly, and keep your conversations organised without the cruft.

---

## Features

All the pieces you need for a focused AI chat workflow.

### 💬 Conversations
- Conversation list with sidebar
- New conversation creation
- Basic search across conversations
- Sort options (date, name, message count)
- Export as JSON
- Import conversations from JSON

### ✉️ Messaging
- Message input with Enter-to-send
- User and assistant message bubbles
- Mock AI responses (random templates)
- Streaming simulation (typewriter effect)
- Typing indicator animation
- Auto-scroll to bottom on new message
- Copy message button
- Regenerate last response
- Edit user message and re-generate

### 🎨 Rendering
- Markdown rendering in messages (bold, italic, lists, links)
- Code blocks with syntax highlighting
- Copy code block button
- Inline code styling
- Table rendering in messages

### ⚙️ Configuration
- Model selector dropdown (GPT-4o, Claude 3.5, Gemini, Llama)
- System prompt editor (custom instructions)
- Prompt templates (Translate, Explain, Write, Summarize)

### 🖥️ UX & Platform
- Responsive layout (sidebar + chat)
- Keyboard shortcuts (Ctrl+K, Ctrl+N, Ctrl+Shift+C)
- Tauri desktop app build (bundling configured; signing not yet)

---

# First run

- **macOS:** Right-click the `.dmg` and choose **Open** to bypass Gatekeeper.
- **Linux AppImage:** `chmod +x chat_amd64.AppImage && ./chat_amd64.AppImage`
- **Windows SmartScreen:** Click **More info → Run anyway** if prompted.
- **Android Play Protect:** Tap **Install anyway** if the warning appears.

---

## First run

---

## Next steps

- Check [CONTRIBUTING](CONTRIBUTING) for dev setup, coding conventions, and how to run tests.
- Browse the [ROADMAP](ROADMAP) for what's shipping next.

---

## License

See [LICENSE](LICENSE).