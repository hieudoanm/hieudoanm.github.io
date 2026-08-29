# Chat

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

### Checksums

SHA-256 digests for every asset are published alongside the release in
[SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-social-networking-chat-latest/SHA256SUMS.txt

## About

Chat — minimal AI chat client like Codex / Claude.

## Features

## Conversations

- Conversation list with sidebar
- New conversation creation
- Basic search across conversations
- Sort options (date, name, message count)
- Export as JSON
- Import conversations from JSON

## Messaging

- Message input with Enter-to-send
- User and assistant message bubbles
- Mock AI responses (random templates)
- Streaming simulation (typewriter effect)
- Typing indicator animation
- Auto-scroll to bottom on new message
- Copy message button
- Regenerate last response
- Edit user message and re-generate

## Rendering

- Markdown rendering in messages (bold, italic, lists, links)
- Code blocks with syntax highlighting
- Copy code block button
- Inline code styling
- Table rendering in messages

## Configuration

- Model selector dropdown (GPT-4o, Claude 3.5, Gemini, Llama)
- System prompt editor (custom instructions)
- Prompt templates (Translate, Explain, Write, Summarize)

## UX & Platform

- Responsive layout (sidebar + chat)
- Keyboard shortcuts (Ctrl+K, Ctrl+N, Ctrl+Shift+C)
- Tauri desktop app build (bundling configured; signing not yet)

## Requirements

- Android 14+
- Linux (Ubuntu) 22.04+
- Linux (Debian) 13+
- macOS 13+
- Windows 10+

## LICENSE

See [LICENSE](LICENSE).
