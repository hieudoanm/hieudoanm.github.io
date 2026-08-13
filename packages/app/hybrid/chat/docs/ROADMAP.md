# Roadmap

## Phase 1 — Core

> Foundation: chat list, message thread, input, mock responses

- [x] Conversation list with sidebar
- [x] New conversation creation
- [x] Message input with Enter-to-send
- [x] User and assistant message bubbles
- [x] Mock AI responses (random templates)
- [ ] Conversation rename and delete
- [x] Basic search across conversations
- [x] Responsive layout (sidebar + chat)

## Phase 2 — Enhanced

> Polish: animations, keyboard shortcuts, search

- [x] Streaming simulation (typewriter effect)
- [ ] Stop generation button
- [x] Typing indicator animation
- [x] Keyboard shortcuts (Ctrl+K, Ctrl+N, Ctrl+Shift+C)
- [ ] Message recall with up arrow
- [x] Auto-scroll to bottom on new message
- [ ] Pull-to-refresh on conversation list
- [ ] Page transition animations (Framer Motion)
- [ ] Skeleton loading states

## Phase 3 — Rich Content

> Content: markdown, code highlighting, attachments

- [x] Markdown rendering in messages (bold, italic, lists, links)
- [x] Code blocks with syntax highlighting
- [x] Copy code block button
- [x] Inline code styling
- [x] Table rendering in messages
- [ ] Image paste/drag-drop into chat input
- [ ] Image display in messages with lightbox
- [ ] File attachment (mock: filename, size, icon)
- [x] Copy message button

## Phase 4 — Organization

> Structure: folders, pinning, archiving, tags

- [ ] Folder creation and management
- [ ] Drag conversations into folders
- [ ] Pin conversations to sidebar top
- [ ] Archive old conversations
- [ ] Favorite/star individual messages
- [ ] Conversation grouping by date (Today, Yesterday, Previous 7 Days, etc.)
- [ ] Bulk delete/select conversations
- [x] Sort options (date, name, message count)

## Phase 5 — Intelligence

> Smart: model selector, custom instructions, summaries

- [x] Model selector dropdown (GPT-4o, Claude 3.5, Gemini, Llama)
- [ ] Per-model response styles and badges
- [x] System prompt editor (custom instructions)
- [x] Prompt templates (Translate, Explain, Write, Summarize)
- [ ] Per-conversation system prompt overrides
- [ ] Message reactions (thumbs up/down)
- [x] Regenerate last response
- [x] Edit user message and re-generate
- [ ] Conversation title auto-generation from first message

## Phase 6 — Collaboration

> Sharing: export, import, shared conversations

- [ ] Export as Markdown
- [x] Export as JSON
- [x] Import conversations from JSON
- [ ] Share conversation link (mock: generates shareable URL)
- [ ] Public conversation view (read-only)
- [ ] Conversation statistics (message count, word count, model usage)
- [ ] Search across all conversations with filters

## Phase 7 — Platform & Integration

> Ecosystem: native apps, API, plugins

- [x] Tauri desktop app build (bundling configured; signing not yet)
- [ ] iOS/Android native shells (Capacitor or Tauri Mobile)
- [ ] API key management for real LLM integration
- [ ] Plugin system for custom tools
- [ ] Voice input for messages
- [ ] Image generation integration (mock DALL-E)
- [ ] Web search integration (mock browsing)
- [ ] Multi-user workspace (shared team conversations)
- [ ] Conversation branching (fork from any message)
