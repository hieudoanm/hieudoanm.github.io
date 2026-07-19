# Roadmap

## Phase 1 — Core UI

> Foundation: video library, player, basic playback controls

- [ ] Home page with featured, trending, recent sections
- [ ] Video player page with play/pause, seek, volume, fullscreen
- [ ] Video library with watch history and saved videos
- [ ] Search page with real-time text filter
- [ ] Settings page with theme switcher
- [ ] Profile page (local stats, no auth)
- [ ] Version page
- [ ] Demo video seed data
- [ ] Responsive layout
- [x] 32 DaisyUI themes with dark default

## Phase 2 — Enhanced UX

> Polish: playlist management, keyboard shortcuts, playback features

- [ ] Playlist creation, edit, delete
- [ ] Add/remove videos to playlists
- [ ] Playlist grid and detail view
- [ ] Keyboard shortcuts (space, arrow keys, M, F)
- [x] Playback speed control (0.5x, 1x, 1.5x, 2x) — processing tool, not a
      player control
- [ ] Quality selector (mock)
- [ ] Mini-player on scroll
- [ ] Page transition animations (Framer Motion)
- [ ] Skeleton loading states

## Phase 3 — Content & Discovery

> Browse: channels, categories, recommendations

- [ ] Channel list page
- [ ] Channel detail with videos and playlists
- [ ] Category browsing (Entertainment, Education, Music, Gaming)
- [ ] Trending and recommended sections
- [ ] Subscription management (mock)
- [ ] Related videos sidebar on watch page

## Phase 4 — Interaction & Social

> Engagement: likes, comments, sharing

- [ ] Like/dislike video with toggle
- [ ] Comment section with timestamps
- [ ] Add/edit/delete comments
- [ ] Share video (copy link, mock social share)
- [ ] View count and engagement stats
- [ ] Save to watch later
- [ ] History management (clear, filter)

## Phase 5 — Upload & Management

> Creator: upload flow, analytics, channel management

- [ ] Upload flow with progress bar (mock)
- [ ] Video metadata editor (title, description, tags)
- [ ] Thumbnail selection (mock)
- [ ] Channel creation and customization
- [ ] Upload analytics (views, watch time)
- [ ] Video management (edit, delete, visibility)
- [ ] Playlist ordering and management

## Phase 6 — Advanced Playback

> Features: subtitles, picture-in-picture, offline downloads

- [ ] Subtitle/caption support (mock — inert form only)
- [ ] Picture-in-picture mode
- [ ] Offline download management (mock — inert form only)
- [ ] Resume playback from last position
- [ ] Autoplay next in playlist
- [ ] Queue management
- [ ] Cast support (mock)

## Phase 7 — Platform & Integration

> Ecosystem: native apps, notifications, advanced features

- [x] Tauri desktop app build (bundling configured; signing not yet)
- [x] iOS/Android native shells (Tauri mobile entry point wired)
- [ ] Push notifications for new uploads
- [ ] Live stream support (mock)
- [ ] Content moderation tools (mock)
- [ ] Monetization dashboard (mock)
- [ ] Multi-language support (i18n)
