# Chat — AI Chat Interface

## Table of Contents

- [Chat — AI Chat Interface](#chat--ai-chat-interface)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Tech Stack](#tech-stack)
    - [Pages](#pages)
    - [File Structure](#file-structure)
  - [Development](#development)
    - [Key Conventions](#key-conventions)
    - [Features](#features)
      - [Business Features](#business-features)
        - [Conversations](#conversations)
        - [Messages](#messages)
        - [AI Models](#ai-models)
        - [Message Actions](#message-actions)
        - [Thread Organization](#thread-organization)
        - [Rich Content](#rich-content)
        - [File \& Image Attachments](#file--image-attachments)
        - [Export \& History](#export--history)
        - [Custom Instructions](#custom-instructions)
      - [Technical Features](#technical-features)
        - [Data \& Persistence](#data--persistence)
        - [UI \& Theming](#ui--theming)
        - [Streaming Simulation](#streaming-simulation)
        - [Markdown Rendering](#markdown-rendering)
        - [Code Syntax Highlighting](#code-syntax-highlighting)
        - [Navigation \& Routing](#navigation--routing)
        - [Code Quality](#code-quality)
        - [Keyboard Shortcuts](#keyboard-shortcuts)
        - [Page Transitions](#page-transitions)
        - [Offline Support](#offline-support)
        - [Accessibility](#accessibility)
  - [Design](#design)
    - [UX for Mobile](#ux-for-mobile)
      - [Layout](#layout)
      - [Touch Targets](#touch-targets)
      - [Forms](#forms)
      - [Navigation Patterns](#navigation-patterns)
      - [Feedback](#feedback)
      - [Lists \& Scrolling](#lists--scrolling)
      - [Modals](#modals)
      - [Theming](#theming)
  - [Roadmap](#roadmap)
    - [Product Roadmap](#product-roadmap)
      - [Phase 1 — Core UI](#phase-1--core-ui)
      - [Phase 2 — Enhanced UX](#phase-2--enhanced-ux)
      - [Phase 3 — Rich Content](#phase-3--rich-content)
      - [Phase 4 — Organization](#phase-4--organization)
      - [Phase 5 — Intelligence](#phase-5--intelligence)
      - [Phase 6 — Collaboration](#phase-6--collaboration)
      - [Phase 7 — Platform \& Integration](#phase-7--platform--integration)

---

## Overview

### Tech Stack

1. **pnpm** (always pin dependencies version)
2. **ESLint** (with next)
3. **Prettier** (with tailwindcss)
4. **Jest** (coverage >= 80%)
5. **Playwright** (coverage all page level)
6. **Next.js 16** (App Router, static export)
7. **TypeScript 6** (strict mode)
8. **Tailwind CSS 4** + **DaisyUI 5** (32 themes, dark default)
9. **Tauri 2** (desktop shell)
10. **Mock data** with IndexedDB persistence

### Pages

| #   | Route              | Page           | Key Features                                          |
| --- | ------------------ | -------------- | ----------------------------------------------------- |
| 1   | `/`                | Chat Home      | Conversation list, new chat button, search, sidebar   |
| 2   | `/chat/[id]`       | Chat Thread    | Message list, input box, model selector, streaming    |
| 3   | `/chat/[id]/[msg]` | Message Detail | Expanded message, metadata, version history           |
| 4   | `/settings`        | Settings       | Theme, model defaults, system prompt, data management |
| 5   | `/profile`         | Profile        | User info, avatar, display preferences                |

### File Structure

```terminal
src/
  app/                # Next.js App Router pages
  components/
    atoms/            # MessageBubble, CodeBlock, ModelBadge, etc.
    molecules/        # ChatInput, MessageActions, ConversationCard
    organisms/        # Sidebar, ChatHeader, ModelPicker
    templates/        # ChatTemplate, SettingsTemplate
    RouteGuard.tsx    # Auth route protection
  data/               # Mock data, model definitions
  hooks/              # useStreaming, useMarkdown, useKeyboard
  lib/                # IndexedDB wrapper (db.ts)
  providers/          # DataProvider, Providers, ToastProvider
  styles/             # globals.css (Tailwind + DaisyUI)
  types/              # TypeScript interfaces
  utils/              # formatMessage, highlightCode, exportChat
src-tauri/            # Tauri desktop (Rust)
e2e/                  # Playwright E2E tests
```

---

## Development

### Key Conventions

- Arrow functions for all function declarations and component exports
- `FC` type for components
- `@/*` path aliases
- DaisyUI component classes (`btn` + `btn-*`, `card`, `input`, etc.)
- Dark theme as default
- `prettier-plugin-tailwindcss` for class sorting
- Atomic design: atoms → molecules → organisms → templates
- `console.*` with `[Module]` prefix for structured debug logging
- `console.*` stripped in production via `compiler.removeConsole`
- Mock delay via `NEXT_PUBLIC_MOCK_DELAY` env var (default `800`ms) for
  simulating network latency; applied in `db.ts` before every query

### Features

#### Business Features

##### Conversations

- **Create new chat**: Single-click button opens blank conversation;
  auto-generates ID and timestamped title
- **Conversation list**: Sidebar shows all conversations with title, preview
  text, timestamp, model badge; sorted by last message date
- **Search**: Real-time text filter across conversation titles and messages
- **Rename**: Inline edit on conversation title via double-click
- **Delete**: Swipe-to-delete on mobile, context menu on desktop; confirmation
  modal before permanent removal
- **Duplicate**: Clone a conversation with all messages forking into new thread

##### Messages

- **Send message**: Text input with Enter-to-send, Shift+Enter for newline;
  auto-resize textarea up to 6 lines
- **Mock AI responses**: Pre-defined response templates per model; random
  selection from context-appropriate responses
- **Streaming simulation**: Typewriter effect — characters appear at 30ms
  intervals with cursor blinking; pauses at sentence boundaries (200ms)
- **User message styling**: Right-aligned, primary-colored bubble with timestamp
- **Assistant message styling**: Left-aligned, base-200 bubble with model badge
  and avatar
- **Markdown in messages**: Bold, italic, code, links, lists, blockquotes,
  headings rendered inline
- **Copy message**: One-click copy entire message content to clipboard
- **Message timestamp**: Relative time ("2 min ago") with absolute tooltip

##### AI Models

- **Model selector**: Dropdown in chat header with available models; persists
  per conversation
- **Mock models**: GPT-4o, Claude 3.5, Gemini Pro, Llama 3 — each with distinct
  response style and badge color
- **Model info**: Tooltip showing model description, context window,
  capabilities
- **Switch model mid-conversation**: Changes model for next message; visual
  indicator that model changed

##### Message Actions

- **Copy**: Copy message text to clipboard with toast confirmation
- **Regenerate**: Replaces last assistant response with new mock generation;
  shows loading animation
- **Edit message**: Inline edit on user messages; re-sends to regenerate
  assistant response from that point
- **Delete message**: Removes message and all subsequent messages in thread
- **Reaction**: Thumbs up / thumbs down toggle on assistant messages; persisted

##### Thread Organization

- **Folders**: Create named folders; drag conversations into folders for
  grouping (Work, Personal, Research, etc.)
- **Pin**: Pin conversations to top of sidebar; max 5 pinned items
- **Archive**: Move old conversations to archive; filter toggle to show/hide
- **Favorites**: Star individual messages for quick access from sidebar

##### Rich Content

- **Code blocks**: Syntax-highlighted code with language label, copy button,
  line numbers; dark background regardless of theme
- **Inline code**: Backtick-wrapped code with subtle background highlight
- **Tables**: Rendered markdown tables with alternating row colors
- **Images**: Inline image display from URLs with lightbox on click
- **LaTeX**: Inline math rendering for simple expressions (stretch goal)
- **Collapsible sections**: `<details>`-style expand/collapse in responses

##### File & Image Attachments

- **Image upload**: Paste or drag-drop images into chat input; thumbnail preview
  before send
- **File attachment**: Attach files (mock: display filename, size, type icon)
- **Multi-attach**: Up to 5 files per message with removal badges
- **Image in messages**: Full-width display in assistant responses with zoom

##### Export & History

- **Export as Markdown**: Download entire conversation as `.md` file
- **Export as JSON**: Structured export with messages, metadata, timestamps
- **Chat history sidebar**: Chronological list of all conversations across
  sessions
- **Search across all**: Global search across every message in every
  conversation

##### Custom Instructions

- **System prompt editor**: Textarea for custom instructions that prepend to
  every conversation
- **Prompt templates**: Pre-built prompts (Translate, Explain Code, Write Essay,
  Summarize) with one-click apply
- **Per-conversation overrides**: Set unique system prompt per thread

#### Technical Features

##### Data & Persistence

- **IndexedDB storage**: Conversations, messages, reactions, folders, settings
  stored in `chat-db`
- **Seed on first load**: Demo conversations with pre-populated messages and
  different model responses
- **Mock network delay**: `NEXT_PUBLIC_MOCK_DELAY` (default 800ms) applied
  before every DB operation to simulate real API latency
- **Optimistic UI**: Message appears instantly in UI; persists to IndexedDB in
  background
- **CRUD operations**: Full create/read/update/delete for conversations and
  messages

##### UI & Theming

- **32 DaisyUI themes**: Dark/light toggle with visual theme picker; persisted
  to `data-theme` attribute and localStorage
- **Skeleton loading**: Chat skeleton with message bubbles and input placeholder
- **Toast notifications**: In-app toast system via `ToastProvider`; auto-dismiss
  with success/error/info variants
- **Responsive layout**: Sidebar + main chat on desktop; full-screen chat with
  hamburger sidebar on mobile; breakpoints at `md:` (768px)

##### Streaming Simulation

- **`useStreaming()` hook**: Accepts full text, returns partial text with
  configurable speed (chars per interval)
- **Cursor blink**: Animated cursor at end of streaming text
- **Sentence pauses**: 200ms delay at `.`, `!`, `?` for natural feel
- **Stop generation**: Button to halt streaming mid-response; keeps partial text
- **Typing indicator**: Animated dots while "generating" before first character

##### Markdown Rendering

- **`react-markdown`**: Full CommonMark support with remark-gfm plugin
- **Custom components**: Styled `pre`, `code`, `table`, `blockquote`, `a` to
  match DaisyUI theme
- **Sanitization**: Strip unsafe HTML; allow only safe attributes

##### Code Syntax Highlighting

- **`rehype-highlight`** or **Prism.js**: Language-aware highlighting for 50+
  languages
- **Language label**: Badge showing language name (e.g., "TypeScript", "Python")
- **Copy button**: One-click copy code block content to clipboard
- **Line numbers**: Toggle-able line numbers on code blocks

##### Navigation & Routing

- **Route groups**: Pages organized into `(chat)`, `(settings)` — URLs
  unaffected, code logically grouped
- **Dynamic routes**: `/chat/[id]` for conversation threads
- **Back navigation**: Consistent `FiArrowLeft` +
  `btn-neutral btn-sm btn-circle`

##### Code Quality

- **Arrow functions**: All function declarations and component exports use arrow
  syntax; test files excluded
- **Debug logging**: `console.*` with `[Module]` prefix throughout source;
  stripped from production via `compiler.removeConsole`
- **Testing**: Jest (unit) + Playwright (E2E) framework ready
- **Atomic design**: atoms → molecules → organisms → templates hierarchy

##### Keyboard Shortcuts

- **Ctrl+K**: Focus search input
- **Ctrl+N**: New conversation
- **Ctrl+Shift+C**: Copy last assistant message
- **Enter**: Send message (Shift+Enter for newline)
- **↑/↓**: Navigate message history in input (up arrow recall)
- **Ctrl+/**: Show keyboard shortcuts modal

##### Page Transitions

- **`PageTransition` component**: Framer Motion wrapper with fade + slide-up
  variants (opacity 0→1, y 12→0, 200ms ease-out)
- **Applied via template**: All pages receive smooth transitions on route change

##### Offline Support

- **`OfflineBanner`**: Fixed top banner using `AnimatePresence` for enter/exit
  transitions; listens to `online`/`offline` events
- **Cached conversations**: Previous conversations viewable offline from
  IndexedDB
- **PWA manifest**: Standalone display, portrait orientation, dark background

##### Accessibility

- **Focus-visible**: Global `focus-visible:outline-primary` on interactive
  elements
- **ARIA labels**: Chat input, send button, sidebar toggle, model selector
- **Screen reader toasts**: `aria-live="assertive"` region announces toast
  messages
- **Keyboard navigation**: Full sidebar and message list navigable via Tab/Arrow

---

## Design

### UX for Mobile

#### Layout

- **Full-screen chat** on mobile; conversation list accessed via hamburger menu
  or swipe from left edge
- **Sticky input bar** at bottom with auto-resize textarea, send button, and
  attachment icon
- **Header** with conversation title, model badge, and action menu (rename,
  delete, export)
- **Safe area** respected for devices with notches/home indicators

#### Touch Targets

- Minimum `44px` tap target for all interactive elements (DaisyUI `btn`
  defaults)
- **Message actions** appear on long-press or swipe-left on message bubble
- **Send button** large and prominent in input area

#### Forms

- **Auto-resize textarea**: Grows with content up to 6 lines, then scrolls
- **Send button**: Primary-colored circle with arrow icon; disabled when empty
- **Attachment button**: Paperclip icon next to input for file/image upload

#### Navigation Patterns

- **Sidebar toggle**: Hamburger icon on mobile, persistent sidebar on desktop
- **Back navigation**: `FiArrowLeft` + `btn-neutral btn-sm btn-circle` on
  sub-pages
- **Conversation list**: Scrollable with pull-to-refresh

#### Feedback

- **Streaming animation**: Typewriter text with cursor blinking
- **Typing indicator**: Three bouncing dots while "AI is thinking"
- **Toast notifications**: Copy success, export complete, error messages
- **Skeleton loading**: Message bubble skeletons during initial load

#### Lists & Scrolling

- **Message list**: Auto-scroll to bottom on new message; scroll-up to load
  history
- **Conversation list**: Newest first with swipe-to-delete
- **Infinite scroll**: Load older messages in batches when scrolling up

#### Modals

- **Delete confirmation**: Modal before permanently deleting conversation
- **Export modal**: Format selection (Markdown, JSON) with download button
- **Shortcuts modal**: Keyboard shortcuts reference overlay

#### Theming

- **Dark mode default** (`data-theme="night"`) for extended reading comfort
- **Theme picker** on Settings page with visual preview
- **Code blocks** always dark regardless of theme for readability

---

## Roadmap

### Product Roadmap

#### Phase 1 — Core UI

> Foundation: chat list, message thread, input, mock responses

- [ ] Conversation list with sidebar
- [ ] New conversation creation
- [ ] Message input with Enter-to-send
- [ ] User and assistant message bubbles
- [ ] Mock AI responses (random templates)
- [ ] Conversation rename and delete
- [ ] Basic search across conversations
- [ ] Responsive layout (sidebar + chat)

#### Phase 2 — Enhanced UX

> Polish: animations, keyboard shortcuts, search

- [ ] Streaming simulation (typewriter effect)
- [ ] Stop generation button
- [ ] Typing indicator animation
- [ ] Keyboard shortcuts (Ctrl+K, Ctrl+N, Ctrl+Shift+C)
- [ ] Message recall with ↑ arrow
- [ ] Auto-scroll to bottom on new message
- [ ] Pull-to-refresh on conversation list
- [ ] Page transition animations (Framer Motion)
- [ ] Skeleton loading states

#### Phase 3 — Rich Content

> Content: markdown, code highlighting, attachments

- [ ] Markdown rendering in messages (bold, italic, lists, links)
- [ ] Code blocks with syntax highlighting
- [ ] Copy code block button
- [ ] Inline code styling
- [ ] Table rendering in messages
- [ ] Image paste/drag-drop into chat input
- [ ] Image display in messages with lightbox
- [ ] File attachment (mock: filename, size, icon)
- [ ] Copy message button

#### Phase 4 — Organization

> Structure: folders, pinning, archiving, tags

- [ ] Folder creation and management
- [ ] Drag conversations into folders
- [ ] Pin conversations to sidebar top
- [ ] Archive old conversations
- [ ] Favorite/star individual messages
- [ ] Conversation grouping by date (Today, Yesterday, Previous 7 Days, etc.)
- [ ] Bulk delete/select conversations
- [ ] Sort options (date, name, message count)

#### Phase 5 — Intelligence

> Smart: model selector, custom instructions, summaries

- [ ] Model selector dropdown (GPT-4o, Claude 3.5, Gemini, Llama)
- [ ] Per-model response styles and badges
- [ ] System prompt editor (custom instructions)
- [ ] Prompt templates (Translate, Explain, Write, Summarize)
- [ ] Per-conversation system prompt overrides
- [ ] Message reactions (thumbs up/down)
- [ ] Regenerate last response
- [ ] Edit user message and re-generate
- [ ] Conversation title auto-generation from first message

#### Phase 6 — Collaboration

> Sharing: export, import, shared conversations

- [ ] Export as Markdown
- [ ] Export as JSON
- [ ] Import conversations from JSON
- [ ] Share conversation link (mock: generates shareable URL)
- [ ] Public conversation view (read-only)
- [ ] Conversation statistics (message count, word count, model usage)
- [ ] Search across all conversations with filters

#### Phase 7 — Platform & Integration

> Ecosystem: native apps, API, plugins

- [ ] Tauri desktop app build and signing
- [ ] iOS/Android native shells (Capacitor or Tauri Mobile)
- [ ] API key management for real LLM integration
- [ ] Plugin system for custom tools
- [ ] Voice input for messages
- [ ] Image generation integration (mock DALL-E)
- [ ] Web search integration (mock browsing)
- [ ] Multi-user workspace (shared team conversations)
- [ ] Conversation branching (fork from any message)
