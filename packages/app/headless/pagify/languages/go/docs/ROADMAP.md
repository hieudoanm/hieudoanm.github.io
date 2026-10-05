# Roadmap

## Vision

> **Write Markdown. Run one command. Get a beautiful website.**

pagify aims to be the simplest path from Markdown files to a polished, production-ready documentation site.

---

## Current Status: v0.x (Alpha)

**Core features complete:**
- [x] Markdown → static HTML build
- [x] Zero-config file discovery & navigation
- [x] GitHub-flavored Markdown (tables, task lists, footnotes, callouts)
- [x] Frontmatter for page metadata
- [x] Client-side search (no backend)
- [x] Dark/light theme with toggle
- [x] Responsive layout (sidebar + content)
- [x] Local dev server with live rebuild
- [x] Syntax highlighting via CSS (no JS)
- [x] Copy code button
- [x] Anchor links on headings
- [x] On-page table of contents
- [x] Site config via index.md frontmatter
- [x] Light/dark favicons

---

## v1.0 — Stability & Polish

**Target: "Simple enough to understand, beautiful enough to use, small enough to trust."**

### Must Have
- [ ] Semantic versioning + changelog
- [ ] Comprehensive test coverage (target >90%)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Performance budget: <50KB HTML + CSS + JS (gzipped)
- [ ] Windows support verified in CI
- [ ] Documentation for all features

### Should Have
- [ ] `pagify init` improvements (interactive prompts, template selection)
- [ ] Better error messages with file/line context
- [ ] `pagify check` — validate links, frontmatter, structure
- [ ] Migration guide from Docsify/VitePress/MkDocs

---

## v1.1 — Developer Experience

### CLI
- [ ] `--watch` flag for `pagify serve` (file watching instead of per-request rebuild)
- [ ] `--port` / `--host` for serve
- [ ] `--base-path` CLI flag (override frontmatter)
- [ ] Shell completions (bash, zsh, fish, PowerShell)

### Configuration
- [ ] `pagify.yaml` for site-wide overrides (optional, backward compatible)
- [ ] Per-page layout selection (default, landing, blank)
- [ ] Custom CSS/JS injection via config

### Templates
- [ ] Theme system: `pagify init --theme=minimal|docs|blog`
- [ ] Template override via `theme/` directory in content root

---

## v1.2 — Content Features

### Markdown Extensions
- [ ] Math notation (KaTeX via optional flag)
- [ ] Diagrams (Mermaid via optional flag)
- [ ] Tabs/grouped content
- [ ] Definition lists
- [ ] Footnote back-references

### Navigation
- [ ] `order` frontmatter for sections (not just pages)
- [ ] `hidden` frontmatter to exclude from nav but keep accessible
- [ ] External links in navigation
- [ ] Version dropdown (for multi-version docs)

### Assets
- [ ] Image optimization (WebP/AVIF, responsive sizes)
- [ ] Asset hashing for cache busting
- [ ] `public/` folder for static files copied as-is

---

## v1.3 — Scale & Teams

### Multi-language
- [ ] i18n support: `docs/en/`, `docs/zh/`, etc.
- [ ] Language switcher in header
- [ ] Per-language navigation

### Search
- [ ] Search index splitting for large sites (>1000 pages)
- [ ] Search analytics (local only, privacy-first)

### Build
- [ ] Incremental builds (only changed pages)
- [ ] Parallel rendering
- [ ] Plugin API (Go plugins or WASM)

---

## v2.0 — Modern Web

### Progressive Enhancement
- [ ] Service worker for offline viewing
- [ ] View transitions API for page navigation
- [ ] Web components for interactive elements

### Deployment
- [ ] `pagify deploy` — push to GitHub Pages/Netlify/Vercel/Cloudflare
- [ ] Preview deployments for PRs
- [ ] Custom domain verification

---

## Non-Goals (Explicitly Out of Scope)

| Feature | Reason |
|---------|--------|
| CMS / admin UI | Markdown files *are* the source of truth |
| Dynamic backend | Static output is a core principle |
| React/Vue/Svelte components | Adds complexity, breaks "no JS required" |
| Plugin marketplace | Go plugins are compile-time; prefer forks |
| WYSIWYG editor | Markdown is the format |
| Database / user auth | Not a docs tool |

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and guidelines.

### Priority Voting

Community can vote on issues with 👍 reactions. High-vote issues get attention first.

### RFC Process

Major features (v1.2+) should start as an RFC issue:
1. Open issue with "RFC:" prefix
2. Discussion period (2 weeks minimum)
3. Implementation PR references RFC

---

## Release Cadence

- **Patch** (v1.0.x): Bug fixes, weekly as needed
- **Minor** (v1.x.0): Features, ~monthly
- **Major** (vx.0.0): Breaking changes, yearly max

---

## Maintenance

- Go version: track latest two major releases
- Dependencies: update monthly via Dependabot
- Security: patch within 7 days of CVE