# AGENTS.md

## Table of Contents

- [AGENTS.md](#agentsmd)
  - [Table of Contents](#table-of-contents)
  - [Project: Lightweight Browser Runtime](#project-lightweight-browser-runtime)
  - [1. Core Product Vision](#1-core-product-vision)
  - [2. Guiding Principles](#2-guiding-principles)
    - [2.1 Small over complete](#21-small-over-complete)
    - [2.2 Correctness over compatibility hacks](#22-correctness-over-compatibility-hacks)
    - [2.3 Browser core must remain UI-independent](#23-browser-core-must-remain-ui-independent)
    - [2.4 Prefer Rust-native components](#24-prefer-rust-native-components)
  - [3. Target Architecture](#3-target-architecture)
  - [4. Recommended Technology](#4-recommended-technology)
  - [5. Dependency Policy](#5-dependency-policy)
  - [6. GUI and Headless Architecture](#6-gui-and-headless-architecture)
  - [7. Browser Pipeline](#7-browser-pipeline)
  - [8. MVP Scope](#8-mvp-scope)
    - [HTML](#html)
    - [CSS](#css)
  - [9. Layout Strategy](#9-layout-strategy)
  - [10. Rendering Strategy](#10-rendering-strategy)
  - [11. JavaScript](#11-javascript)
  - [12. Web APIs](#12-web-apis)
  - [13. Networking](#13-networking)
  - [14. Security](#14-security)
  - [15. Testing Strategy](#15-testing-strategy)
    - [Unit tests](#unit-tests)
    - [Rendering tests](#rendering-tests)
    - [Integration tests](#integration-tests)
    - [Headless tests](#headless-tests)
  - [16. Golden Tests](#16-golden-tests)
  - [17. Debugging](#17-debugging)
  - [18. Performance](#18-performance)
  - [19. Error Handling](#19-error-handling)
  - [20. Unsupported Features](#20-unsupported-features)
  - [21. Code Organization](#21-code-organization)
  - [22. Public API](#22-public-api)
  - [23. CLI](#23-cli)
  - [24. GUI](#24-gui)
  - [25. Development Priorities](#25-development-priorities)
  - [26. Feature Development Workflow](#26-feature-development-workflow)
  - [27. AI Agent Rules](#27-ai-agent-rules)
  - [28. Agent Task Files](#28-agent-task-files)
  - [29. Loop Engineering](#29-loop-engineering)
  - [30. Definition of Done](#30-definition-of-done)
  - [31. Git Discipline](#31-git-discipline)
  - [32. Licensing](#32-licensing)
  - [33. What NOT to Build Yet](#33-what-not-to-build-yet)
  - [34. MVP Definition](#34-mvp-definition)
  - [35. Long-Term Vision](#35-long-term-vision)
  - [Final Rule](#final-rule)

## Project: Lightweight Browser Runtime

This repository contains a lightweight browser/runtime written primarily in Rust.

The goal is **not** to clone Chromium or build a full modern browser immediately.

The goal is to build a small, understandable, embeddable HTML/CSS/JavaScript runtime that can operate in both:

1. **GUI mode** — render pages in a desktop window.
2. **Headless mode** — render pages without a window for servers, automation, screenshots, PDF generation, testing, and other programmatic use cases.

Both modes MUST use the same browser core.

---

## 1. Core Product Vision

The project should eventually support:

```text
mybrowser https://example.com

mybrowser --headless https://example.com

mybrowser --screenshot https://example.com page.png

mybrowser --pdf https://example.com page.pdf
```

And as a library:

```rust
Browser::new()
    .load(url)
    .wait_for_load()
    .screenshot();
```

The core abstraction is:

```text
HTML
  ↓
DOM
  ↓
CSS
  ↓
Style
  ↓
Layout
  ↓
Paint
  ↓
Compositing
  ↓
Renderer
  ↓
┌───────────────┬────────────────┐
│               │                │
GUI             Headless         Future targets
│               │                │
Window          Image buffer     PDF/etc.
```

The browser must never have separate implementations for GUI and headless rendering.

---

## 2. Guiding Principles

### 2.1 Small over complete

Prefer a small, correct implementation over a large, partially working implementation.

Do not implement browser features simply because real browsers have them.

Every feature should have a clear reason to exist.

---

### 2.2 Correctness over compatibility hacks

Do not solve rendering problems by adding page-specific hacks such as:

```rust
if domain == "example.com" {
    ...
}
```

or:

```rust
if element.tag_name() == "some-site-specific-element" {
    ...
}
```

Implement standards-oriented behavior instead.

---

### 2.3 Browser core must remain UI-independent

The browser engine must not depend on:

- winit
- window handles
- desktop event loops
- GUI widgets
- terminal output
- filesystem paths specific to GUI mode

The core should be usable from:

- desktop applications
- CLI applications
- servers
- tests
- other Rust applications

---

### 2.4 Prefer Rust-native components

The default implementation language is Rust.

Use external libraries for well-defined primitives where appropriate, but do not embed an existing complete browser engine.

Do NOT introduce:

- Chromium
- CEF
- Electron
- WebKit as the browser engine
- WebView2
- Tauri WebView
- Gecko as the browser engine

The project is intended to own the browser/runtime architecture.

Using individual libraries such as parsers, graphics libraries, TLS implementations, or JavaScript engines is allowed.

---

## 3. Target Architecture

The repository should evolve toward:

```text
crates/
├── browser/
│   └── Browser orchestration
│
├── dom/
│   └── DOM tree and document model
│
├── html/
│   └── HTML parsing
│
├── css/
│   └── CSS parsing and CSSOM
│
├── style/
│   └── Style calculation / cascade
│
├── layout/
│   └── Layout tree and layout algorithms
│
├── paint/
│   └── Display list / painting commands
│
├── compositor/
│   └── Layering and compositing
│
├── renderer/
│   └── GPU/software rendering
│
├── javascript/
│   └── JavaScript runtime integration
│
├── webapi/
│   └── Browser APIs exposed to JavaScript
│
├── network/
│   └── HTTP, TLS, URLs, resources
│
├── storage/
│   └── Cookies, local storage, etc.
│
├── gui/
│   └── Desktop window integration
│
├── headless/
│   └── Offscreen rendering
│
└── cli/
    └── Command-line interface
```

Do not create all of these crates immediately.

Introduce a crate when there is a real architectural reason for it.

Avoid premature fragmentation.

---

## 4. Recommended Technology

The default technology stack is:

| Area         | Technology                                                            |
| ------------ | --------------------------------------------------------------------- |
| Language     | Rust                                                                  |
| Build        | Cargo                                                                 |
| HTML parsing | html5ever                                                             |
| CSS parsing  | cssparser                                                             |
| DOM          | Custom                                                                |
| CSSOM        | Custom                                                                |
| Style system | Custom                                                                |
| Layout       | Custom                                                                |
| Rendering    | wgpu                                                                  |
| Windowing    | winit                                                                 |
| Fonts        | fontdb + rustybuzz                                                    |
| Images       | image                                                                 |
| Networking   | hyper / reqwest                                                       |
| TLS          | rustls                                                                |
| Async        | Tokio where required                                                  |
| CLI          | clap                                                                  |
| JavaScript   | Start with a replaceable abstraction; Boa or SpiderMonkey may be used |
| Testing      | Rust unit/integration tests                                           |
| Formatting   | rustfmt                                                               |
| Linting      | clippy                                                                |

Dependencies may change if technical evidence justifies it.

Do not introduce a dependency merely because it is popular.

---

## 5. Dependency Policy

Before adding a dependency, determine:

1. Does the standard library already provide enough functionality?
2. Is the dependency actively maintained?
3. Is the dependency compatible with the project's license?
4. Does it substantially increase binary size?
5. Does it introduce C/C++ dependencies?
6. Does it introduce platform-specific behavior?
7. Does it duplicate functionality already present?
8. Will it make future replacement difficult?

Prefer small, focused dependencies.

Avoid large frameworks unless there is a compelling architectural reason.

---

## 6. GUI and Headless Architecture

This is a fundamental requirement.

The browser engine must render into an abstract target.

Conceptually:

```rust
trait RenderingTarget {
    fn width(&self) -> u32;
    fn height(&self) -> u32;

    fn present(&mut self, frame: Frame);
}
```

The exact API may evolve.

At minimum, support:

```text
WindowTarget
OffscreenTarget
```

Eventually:

```text
WindowTarget
OffscreenTarget
ImageTarget
PdfTarget
```

The browser pipeline must not know which target is being used.

---

## 7. Browser Pipeline

The primary pipeline is:

```text
URL
 ↓
Navigation
 ↓
Network
 ↓
Response
 ↓
HTML parser
 ↓
DOM
 ↓
CSS discovery
 ↓
CSS parser
 ↓
CSSOM
 ↓
Style calculation
 ↓
Layout tree
 ↓
Layout
 ↓
Display list
 ↓
Painting
 ↓
Compositing
 ↓
Renderer
 ↓
RenderingTarget
```

JavaScript should integrate into this pipeline without becoming the center of the architecture.

---

## 8. MVP Scope

The first milestone should be deliberately small.

### HTML

Support:

- document
- html
- head
- body
- div
- span
- p
- headings
- links
- images
- lists
- tables eventually
- text nodes
- comments
- basic forms eventually

Use `html5ever` where appropriate.

---

### CSS

Initial support:

- selectors
  - element
  - class
  - ID
  - descendant
  - child eventually

- colors
- background-color
- width
- height
- margin
- padding
- border
- font-size
- font-family
- font-weight
- display
- visibility
- opacity
- position eventually

Initial layout should prioritize:

1. normal flow
2. block layout
3. inline text layout

Flexbox comes later.

Grid comes later.

Do not implement every CSS property before validating the architecture.

---

## 9. Layout Strategy

The DOM tree and layout tree should be conceptually separate.

```text
DOM Tree

Document
 └── body
      ├── div
      │    └── text
      └── p
           └── text


Layout Tree

Block
 ├── Block
 │    └── Text
 └── Block
      └── Text
```

Do not force every DOM node to become a layout node.

The layout system should operate on computed styles and layout-relevant nodes.

---

## 10. Rendering Strategy

Rendering should be divided into:

```text
Layout
 ↓
Display List
 ↓
Painting
 ↓
Compositing
 ↓
Rasterization
```

Do not directly render DOM nodes from the DOM traversal.

The display list should provide a useful intermediate representation.

For example:

```rust
DrawRect(...)
DrawBorder(...)
DrawText(...)
DrawImage(...)
Clip(...)
Transform(...)
```

The exact representation may evolve.

This separation will make:

- headless rendering
- testing
- debugging
- screenshots
- PDF output
- GPU rendering

much easier.

---

## 11. JavaScript

JavaScript is intentionally NOT an MVP requirement.

Do not allow JavaScript implementation to block:

- HTML parsing
- CSS
- layout
- rendering
- screenshots
- headless operation

The JavaScript layer should be replaceable.

Use an abstraction similar to:

```text
JavaScriptRuntime
        │
        ├── evaluate()
        ├── execute_script()
        ├── expose_global()
        └── event_loop()
```

Possible implementations:

- Boa
- SpiderMonkey
- another suitable engine

Do not tightly couple DOM implementation to one JavaScript engine.

---

## 12. Web APIs

Do not implement the entire browser API surface.

Prioritize APIs required by real pages.

Potential order:

```text
console
 ↓
setTimeout
 ↓
DOM events
 ↓
fetch
 ↓
URL
 ↓
localStorage
 ↓
Web APIs required by target applications
```

Each API should have:

1. Rust implementation
2. JavaScript binding
3. tests
4. clear ownership

---

## 13. Networking

Networking should be independent from rendering.

The network layer should provide resources such as:

```text
HTML
CSS
JavaScript
Images
Fonts
```

Conceptually:

```rust
ResourceLoader::load(url) -> Resource
```

Support:

- HTTP
- HTTPS
- redirects
- content types
- compression where practical
- caching eventually

Do not implement a browser cache before the basic navigation pipeline works.

---

## 14. Security

Never assume downloaded web content is trusted.

Eventually the browser needs isolation for:

- JavaScript
- filesystem access
- process access
- network access
- cookies
- local storage
- cross-origin access

The first MVP may have a limited security model, but the architecture must not assume that arbitrary webpage JavaScript can access the host system.

Never expose:

```text
filesystem
shell
environment variables
process execution
arbitrary native APIs
```

to webpage JavaScript.

---

## 15. Testing Strategy

Browser development requires aggressive testing.

Use multiple levels.

### Unit tests

For:

- HTML parsing
- CSS parsing
- selectors
- cascade
- style computation
- layout
- painting
- URL parsing
- networking

---

### Rendering tests

Given:

```text
input.html
```

produce:

```text
expected.png
```

Compare rendered output against expected output.

Prefer deterministic rendering.

---

### Integration tests

Example:

```text
HTML
 ↓
DOM
 ↓
CSS
 ↓
Style
 ↓
Layout
 ↓
Paint
 ↓
Render
```

Test the complete pipeline.

---

### Headless tests

Headless mode should be a first-class test environment.

Example:

```bash
browser --headless tests/pages/basic.html
```

should produce deterministic output.

---

## 16. Golden Tests

Maintain a collection of small HTML/CSS fixtures.

Example:

```text
tests/
├── html/
│   ├── basic.html
│   ├── nested.html
│   └── malformed.html
│
├── css/
│   ├── colors.html
│   ├── margin.html
│   ├── padding.html
│   └── selectors.html
│
└── rendering/
    ├── block-layout.html
    ├── inline-layout.html
    └── text.html
```

Keep fixtures small.

When a rendering bug is discovered:

1. create a minimal reproduction
2. add it as a fixture
3. fix the engine
4. preserve the regression test permanently

---

## 17. Debugging

The browser should eventually provide debug representations for:

```text
DOM
CSSOM
Computed styles
Layout tree
Display list
Compositor layers
```

Useful commands might become:

```bash
browser --dump-dom page.html
browser --dump-style page.html
browser --dump-layout page.html
browser --dump-display-list page.html
```

Do not prioritize polished developer tools initially.

Make internal state inspectable first.

---

## 18. Performance

Do not optimize before profiling.

First establish correctness.

Then measure:

- HTML parse time
- CSS parse time
- style calculation
- layout
- paint
- rasterization
- JavaScript execution
- network
- memory usage
- startup time

Avoid allocations in hot paths when profiling demonstrates they matter.

Do not sacrifice architecture for speculative performance.

---

## 19. Error Handling

Avoid:

```rust
unwrap()
expect()
panic!()
```

in production paths unless the invariant is genuinely impossible to violate and documented.

Prefer explicit errors.

The browser should attempt graceful degradation.

For example:

```text
unsupported CSS property
        ↓
ignore property
        ↓
continue rendering
```

A malformed webpage should generally not crash the browser.

---

## 20. Unsupported Features

The browser is expected to have incomplete web compatibility.

Unsupported features should fail gracefully.

Good:

```text
Unsupported CSS property → ignore it
Unsupported HTML element → preserve children
Unsupported image format → report resource failure
Unsupported JS API → throw appropriate JS error
```

Bad:

```text
Unsupported feature → panic
```

Maintain an explicit compatibility document as the project grows.

---

## 21. Code Organization

Prefer clear module ownership.

Avoid enormous modules such as:

```text
browser.rs
renderer.rs
dom.rs
```

containing thousands of lines.

Split code by responsibility.

Good:

```text
layout/
├── block.rs
├── inline.rs
├── text.rs
├── box_model.rs
└── tree.rs
```

Bad:

```text
layout.rs
```

containing every layout algorithm.

Do not over-fragment tiny modules either.

---

## 22. Public API

The public API should remain small.

Prefer:

```rust
Browser
Page
Navigation
Viewport
RenderOptions
RenderingTarget
```

Avoid exposing internal implementation details such as:

```text
internal layout nodes
CSS parser internals
GPU buffers
internal DOM bookkeeping
```

unless there is a compelling reason.

---

## 23. CLI

The CLI should eventually support:

```text
browser <url>

browser --headless <url>

browser --screenshot <url> output.png

browser --viewport 1280x720 <url>

browser --pdf <url> output.pdf

browser --dump-dom <url>

browser --dump-layout <url>
```

The CLI must call the same browser core used by the GUI.

Never implement a separate headless renderer.

---

## 24. GUI

The GUI should initially be minimal.

MVP GUI:

```text
┌──────────────────────────────────────────┐
│ URL                                      │
├──────────────────────────────────────────┤
│                                          │
│                                          │
│             Rendered webpage             │
│                                          │
│                                          │
└──────────────────────────────────────────┘
```

Do not build:

- tabs
- bookmarks
- history
- extensions
- developer tools
- password manager

until the rendering engine is sufficiently mature.

The project is primarily a browser runtime, not a browser product UI.

---

## 25. Development Priorities

When deciding what to implement next, use this priority:

```text
1. Correctness
2. Architecture
3. Testability
4. Web compatibility
5. Performance
6. Developer experience
7. GUI polish
```

Do not reverse this order.

---

## 26. Feature Development Workflow

Every feature should follow:

```text
Understand
   ↓
Research
   ↓
Define behavior
   ↓
Write tests
   ↓
Implement
   ↓
Run tests
   ↓
Render verification
   ↓
Review
   ↓
Document
```

For browser behavior, research relevant web standards when applicable.

Do not rely solely on how Chromium happens to implement something.

---

## 27. AI Agent Rules

AI agents working on this repository MUST:

1. Read `AGENTS.md` before modifying code.
2. Inspect existing architecture before creating new abstractions.
3. Search the repository before adding duplicate functionality.
4. Prefer extending existing abstractions over creating parallel implementations.
5. Write tests for new behavior.
6. Add regression tests for discovered bugs.
7. Run formatting.
8. Run clippy.
9. Run relevant tests.
10. Run integration/rendering tests when rendering behavior changes.
11. Never claim success without running verification.
12. Never silently remove tests to make CI pass.
13. Never weaken assertions merely to make a test pass.
14. Never add website-specific hacks.
15. Never introduce a complete external browser engine.
16. Keep GUI and headless implementations on the same core pipeline.

---

## 28. Agent Task Files

Complex work should be represented as Markdown task files.

Recommended structure:

```text
tasks/
├── 001-html-parser.md
├── 002-dom.md
├── 003-css-parser.md
├── 004-style-system.md
├── 005-block-layout.md
└── ...
```

Each task should contain:

```markdown
## Feature

### Status

pending

### Goal

...

### Requirements

- ...

### Non-goals

- ...

### Implementation

...

### Verification

- cargo test
- cargo clippy
- rendering tests

### Acceptance Criteria

- ...

### Notes

...
```

Agents should update task status as work progresses.

Recommended states:

```text
pending
researching
planned
implementing
reviewing
testing
blocked
completed
```

Never mark a task `completed` unless its acceptance criteria have been verified.

---

## 29. Loop Engineering

When operating autonomously, the agent should follow:

```text
Find task
    ↓
Understand
    ↓
Research
    ↓
Plan
    ↓
Implement
    ↓
Test
    ↓
Review
    ↓
Fix
    ↓
Test again
    ↓
Complete task
    ↓
Find next task
```

A failed test is not a reason to stop.

A failed test is feedback.

Continue until:

- the task is complete, or
- the task is genuinely blocked.

Do not repeatedly make random changes.

If progress stalls, stop and document the blocker.

---

## 30. Definition of Done

A feature is DONE only when:

- implementation exists
- architecture is consistent
- tests exist
- tests pass
- clippy passes
- formatting passes
- relevant rendering tests pass
- no known regression was introduced
- documentation is updated where appropriate
- unsupported cases fail gracefully

For rendering features, "it looks correct on one page" is not sufficient.

---

## 31. Git Discipline

Keep commits focused.

Prefer:

```text
feat(dom): add document tree
feat(css): implement class selectors
feat(layout): implement block formatting
test(layout): add nested block fixtures
fix(layout): correct margin collapse
```

Avoid giant commits containing unrelated changes.

Do not rewrite unrelated code merely for stylistic preference.

---

## 32. Licensing

The project is intended for open-source development and may eventually have commercial distribution.

Before adding dependencies:

- inspect their license
- inspect transitive dependencies when practical
- document important licensing constraints
- avoid dependencies with licensing incompatible with the project's distribution goals

Do not copy implementation code from projects with incompatible licenses.

Standards may be implemented independently.

---

## 33. What NOT to Build Yet

Unless explicitly requested, do not prioritize:

- browser extensions
- DRM
- WebRTC
- WebGPU
- service workers
- IndexedDB
- complex accessibility infrastructure
- developer tools
- browser synchronization
- password management
- bookmarks
- browser history
- multiple tabs
- ad blockers
- private browsing
- full browser security sandbox
- full CSS Grid
- complete CSS compatibility
- complete JavaScript compatibility

These may eventually become important, but they are not MVP priorities.

---

## 34. MVP Definition

The first meaningful milestone is:

```text
Given:

<html>
  <style>
    body {
      background: white;
    }

    .box {
      width: 300px;
      height: 100px;
      margin: 50px;
      padding: 20px;
      background: lightgray;
    }
  </style>

  <div class="box">
    Hello Browser
  </div>
</html>
```

The browser should:

1. parse HTML
2. construct the DOM
3. parse CSS
4. calculate styles
5. construct a layout tree
6. perform layout
7. generate a display list
8. render the display list
9. display it in GUI mode
10. render it offscreen in headless mode
11. produce deterministic screenshot output

This milestone is more important than adding dozens of browser APIs.

---

## 35. Long-Term Vision

The eventual architecture should allow:

```text
                    Browser Runtime
                           │
            ┌──────────────┼──────────────┐
            │              │              │
           GUI          Headless        Library
            │              │              │
          winit         Offscreen       Rust API
            │              │              │
            └──────────────┼──────────────┘
                           │
                      Browser Core
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
       DOM                CSS                JS
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
                         Layout
                           │
                         Paint
                           │
                       Compositor
                           │
                        Renderer
                           │
                         wgpu
```

The most important architectural property is:

> **The same browser core must be capable of driving both interactive GUI rendering and deterministic headless rendering.**

Everything else should evolve around this principle.

---

## Final Rule

When uncertain between:

```text
quick hack
```

and:

```text
small, principled browser-engine abstraction
```

prefer the principled abstraction.

When uncertain between:

```text
implement another browser feature
```

and:

```text
make existing features more correct and testable
```

prefer correctness and testability.

The goal is not to build the biggest browser.

The goal is to build the **smallest useful browser runtime with a clean architecture that can grow into a serious HTML/CSS/JS engine.**
