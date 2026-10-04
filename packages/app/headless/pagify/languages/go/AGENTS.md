# AGENTS.md

## Project

`pagify` is a Go-based CLI that converts Markdown content into beautiful, modern, static HTML websites.

The product vision is:

> **Write Markdown. Run one command. Get a beautiful website.**

`pagify` is inspired by tools such as Docsify, but the goal is to provide a more polished visual experience while keeping the architecture simple, fast, portable, and dependency-light.

---

## Core Principles

### 1. Markdown first

Markdown is the primary content format.

The user should be able to point `pagify` at a directory of Markdown files and get a complete website with minimal or zero configuration.

Example:

```text
docs/
├── index.md
├── getting-started.md
├── guides/
│   ├── installation.md
│   └── configuration.md
└── reference/
    └── cli.md
```

should become a navigable static website.

---

### 2. Static output

The primary build target is static HTML.

```bash
pagify build
```

should produce something similar to:

```text
dist/
├── index.html
├── styles.css
├── script.js
└── ...
```

The generated site must be deployable to ordinary static hosting without requiring a backend.

It should work with services such as GitHub Pages, Cloudflare Pages, Netlify, Vercel, or a normal web server.

---

### 3. Go CLI

The project is implemented in Go.

Use:

- Go
- Cobra
- Goldmark or another appropriate Go Markdown parser
- `html/template` where appropriate
- Go standard library whenever practical

The CLI should compile to a standalone binary with minimal runtime requirements.

---

### 4. Separate content, structure, and presentation

Maintain a strict separation:

```text
Markdown
    ↓
content

HTML
    ↓
structure

CSS
    ↓
visual design + animation

JavaScript
    ↓
interaction

Go
    ↓
build pipeline
```

Do not mix presentation logic into the Markdown parser.

Do not hard-code visual styling into Go code unless there is a compelling reason.

---

# Architecture

Prefer a structure similar to:

```text
pagify/
├── cmd/
│   ├── root.go
│   ├── build.go
│   ├── serve.go
│   └── init.go
│
├── internal/
│   ├── markdown/
│   ├── site/
│   ├── build/
│   ├── server/
│   └── theme/
│       └── default/
│           ├── template.html
│           ├── styles.css
│           └── script.js
│
├── main.go
├── go.mod
├── go.sum
├── AGENTS.md
└── README.md
```

This structure may evolve as the project grows. Do not reorganize the project purely for aesthetic reasons.

---

# CLI

The CLI should eventually support:

```bash
pagify build
pagify serve
pagify init
```

Potential usage:

```bash
pagify build ./docs
pagify build ./docs --output ./dist
pagify serve ./docs
pagify init
```

### `build`

Converts Markdown files into static HTML.

Expected responsibilities:

1. Discover Markdown files.
2. Parse Markdown.
3. Build site metadata.
4. Build navigation.
5. Render HTML.
6. Copy theme assets.
7. Write the static site.

### `serve`

Runs a local development server.

It should eventually support a workflow such as:

```bash
pagify serve ./docs
```

and serve the generated site locally.

Live reload may be added later.

### `init`

Creates a minimal `pagify` project structure.

Do not make initialization unnecessarily complex.

---

# Theme Architecture

The default theme is a first-class part of the product.

A theme should conceptually contain:

```text
theme/
├── template.html
├── styles.css
└── script.js
```

The theme controls:

- layout
- typography
- colours
- spacing
- navigation appearance
- code blocks
- tables
- callouts
- animations
- responsive behaviour
- browser interaction

The Markdown parser should not know about these visual decisions.

---

# HTML

Generated HTML should be semantic and readable.

Prefer:

```html
<article class="markdown">
  <h1>Getting Started</h1>
  <p>...</p>
</article>
```

over deeply nested generated markup.

Use semantic elements where appropriate:

```text
<header>
<nav>
<main>
<article>
<section>
<aside>
<footer>
```

Avoid unnecessary wrapper elements.

---

# CSS

The default stylesheet should be a complete design system rather than a collection of random component styles.

Recommended organisation:

```text
styles.css

1. Design tokens
2. Reset / base
3. Layout
4. Header
5. Sidebar
6. Markdown typography
7. Links
8. Code blocks
9. Tables
10. Blockquotes
11. Callouts
12. Navigation
13. Animations
14. Responsive behaviour
15. Dark mode
16. Accessibility
```

Use CSS custom properties for design tokens.

Example:

```css
:root {
  --bg: #ffffff;
  --surface: #fafafa;
  --text: #18181b;
  --text-muted: #71717a;
  --border: #e4e4e7;
  --accent: #2563eb;

  --content-width: 760px;
  --sidebar-width: 260px;

  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;

  --duration-fast: 150ms;
  --duration-normal: 250ms;
}
```

Prefer semantic variables over component-specific variables.

Good:

```css
--text-muted
```

Avoid:

```css
--sidebar-gray
```

unless the value truly belongs only to that component.

---

# Design Direction

The default design should feel:

- modern
- minimal
- polished
- technical
- readable
- fast
- calm
- responsive

Use modern documentation and product interfaces as inspiration, but do not copy proprietary designs.

The design should prioritise:

1. readability
2. hierarchy
3. navigation
4. accessibility
5. performance
6. visual polish

Do not add visual effects merely because they are possible.

---

# Animation

Animation is part of the default visual language.

Prefer subtle CSS animations for:

- page entrance
- navigation transitions
- hover states
- expanding sections
- modal appearance
- theme transitions
- copy-button feedback

Example:

```css
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

Animations should be subtle and fast.

Always respect:

```css
@media (prefers-reduced-motion: reduce) {
    ...
}
```

Do not use JavaScript for animation when CSS can perform the same job cleanly.

---

# JavaScript

`script.js` is a first-class asset of the default theme.

It should provide progressive enhancement and browser interaction.

Potential responsibilities:

- code-copy buttons
- client-side search
- command palette
- mobile navigation
- theme switching
- active navigation state
- interactive callouts
- other lightweight UI interactions

Keep JavaScript framework-free unless there is a compelling technical reason otherwise.

Do not introduce React, Vue, Svelte, or another frontend framework simply to implement small interactions.

Prefer:

```js
document.querySelector(...)
```

and small focused modules/functions.

JavaScript should enhance the generated HTML rather than being required for basic content rendering.

---

# No JavaScript Required for Basic Reading

A generated site must remain usable for:

- reading Markdown content
- navigating pages
- following normal links
- viewing code
- viewing images
- reading tables

without JavaScript.

JavaScript should enhance the experience, not be the foundation of the website.

---

# Responsive Design

The generated site must work well on:

- desktop
- laptop
- tablet
- mobile

Desktop may use:

```text
sidebar + content
```

Mobile should collapse into a simpler layout with accessible navigation.

Do not assume a fixed viewport size.

---

# Accessibility

Accessibility is a product requirement.

Consider:

- semantic HTML
- keyboard navigation
- visible focus states
- sufficient colour contrast
- reduced motion
- accessible buttons
- accessible navigation
- meaningful link text
- appropriate ARIA only when necessary

Do not use ARIA to compensate for poor HTML structure.

---

# Performance

The generated website should be lightweight.

Prefer:

- static HTML
- static CSS
- small JavaScript
- no frontend framework
- no runtime server dependency
- no unnecessary external requests

Avoid adding dependencies for functionality that can reasonably be implemented using the Go standard library or browser APIs.

---

# Markdown Features

Start with standard Markdown.

Potential extensions can include:

- tables
- task lists
- footnotes
- syntax-highlighted code
- automatic heading IDs
- callouts
- metadata/frontmatter
- mathematical notation
- images

Do not add custom Markdown syntax until there is a clear use case.

---

# Navigation

Navigation should be generated from the Markdown file structure where practical.

For example:

```text
docs/
├── index.md
├── getting-started.md
├── guides/
│   ├── installation.md
│   └── configuration.md
└── reference/
    └── cli.md
```

should naturally produce a hierarchy.

Do not require users to manually maintain a navigation file for basic projects.

Explicit configuration may be added later for advanced use cases.

---

# Frontmatter

Frontmatter may be supported for page metadata.

Example:

```yaml
---
title: Getting Started
description: Learn how to get started with pagify.
order: 1
---
```

Possible metadata includes:

- title
- description
- order
- draft
- navigation label
- layout

Do not invent a large frontmatter specification prematurely.

---

# Templates

Use Go templates for HTML generation where appropriate.

Keep templates readable.

Avoid generating huge HTML strings directly in Go.

Prefer:

```go
template.Execute(...)
```

over:

```go
html := "<html>" + ...
```

---

# Embedded Assets

The default theme should be embeddable into the Go binary using `go:embed`.

For example:

```go
//go:embed theme/default/styles.css
var stylesCSS []byte
```

The user should not need Node.js, npm, or another runtime to build a basic site.

---

# Dependencies

Before adding a dependency:

1. Check whether the standard library can solve the problem.
2. Check whether the dependency is actively maintained.
3. Check its licence.
4. Check its size and transitive dependencies.
5. Check whether it meaningfully improves the project.

Avoid dependency creep.

---

# Testing

Tests should focus on behaviour rather than implementation details.

Important areas:

- Markdown parsing
- file discovery
- navigation generation
- URL generation
- template rendering
- static build output
- asset copying
- CLI commands
- error handling

Prefer table-driven Go tests.

Example:

```go
func TestBuildPage(t *testing.T) {
    tests := []struct {
        name string
        input string
        want string
    }{
        {
            name:  "heading",
            input: "# Hello",
            want:  "<h1>Hello</h1>",
        },
    }

    // ...
}
```

---

# Error Handling

Errors should be actionable.

Bad:

```text
Error
```

Better:

```text
pagify: failed to read docs/index.md: permission denied
```

CLI errors should identify:

- what failed
- which file/path was involved
- enough context for the user to fix it

Do not silently ignore malformed input.

---

# Code Style

Follow idiomatic Go.

Prefer:

```go
const
```

when values are immutable.

Keep functions small and focused.

Avoid premature abstraction.

Avoid interfaces unless they provide a real benefit.

Do not introduce a framework or architecture pattern simply because it is popular.

---

# Development Workflow

Before implementing a significant feature:

1. Understand the current architecture.
2. Inspect existing code.
3. Identify the smallest appropriate change.
4. Implement it.
5. Run tests.
6. Run formatting.
7. Run static analysis where available.
8. Verify generated output manually when the change affects HTML/CSS/JS.

Typical commands:

```bash
go test ./...
go vet ./...
gofmt -w .
go build ./...
```

Use project-specific Makefile commands if they exist.

---

# Generated Output

Never commit generated `dist/` output unless the repository explicitly requires it.

Generated output should normally be reproducible from source:

```text
Markdown + theme + configuration
                ↓
           pagify build
                ↓
              dist/
```

---

# Backwards Compatibility

Avoid breaking existing Markdown projects unnecessarily.

When changing generated HTML or CSS:

- preserve normal Markdown behaviour
- avoid unnecessary URL changes
- avoid changing default semantics without reason
- consider migration implications

---

# Product Philosophy

`pagify` should remain:

> **Simple enough to understand, beautiful enough to use, and small enough to trust.**

Avoid turning it into a full CMS.

Avoid requiring configuration for things that can be inferred.

Avoid frontend framework complexity.

Avoid building features simply because other documentation tools have them.

The strongest version of `pagify` is:

```bash
pagify build
```

followed by:

```text
Beautiful static website.
```

---

# Agent Instructions

When working on this repository:

1. Read this file before making changes.
2. Inspect the existing implementation before introducing architecture.
3. Prefer small, composable changes.
4. Preserve the separation between Go, HTML, CSS, and JavaScript.
5. Keep the default experience zero-config.
6. Keep generated sites static.
7. Keep the frontend lightweight.
8. Test changes before declaring them complete.
9. Do not introduce unnecessary dependencies.
10. Do not redesign unrelated parts of the project while implementing a feature.
11. If a requirement conflicts with this document, follow the explicit user requirement and update this document if the new direction is intended to be permanent.
12. When making UI changes, inspect the generated HTML/CSS and verify the result visually when possible.

## Definition of Done

A feature is not complete until:

- the implementation is finished
- tests pass
- the project builds
- generated output is valid
- errors are handled appropriately
- documentation is updated when necessary
- the implementation follows the architecture and principles in this file
