# Browserverless

A lightweight headless browser runtime written in Rust.

## Goal

Build a single-binary CLI application called **Browserverless** that:

1. Accepts a URL as the first argument.
2. Downloads the page.
3. Parses the HTML into a DOM.
4. Executes JavaScript found on the page.
5. Supports network requests initiated by JavaScript.
6. Waits until the page becomes idle.
7. Returns the final hydrated HTML to stdout.

The project is intentionally **not** a visual browser.

## CLI

```bash
browserverless <url>
```

Examples:

```bash
browserverless https://example.com

browserverless https://news.ycombinator.com

browserverless https://my-app.com > page.html
```

## Core Principle

```text
URL
 ↓
Fetch HTML
 ↓
Parse DOM
 ↓
Execute JavaScript
 ↓
Process Network Requests
 ↓
Wait Until Idle
 ↓
Serialize DOM
 ↓
Output HTML
```

The final output is fully hydrated HTML.

No screenshots.

No rendering.

No browser window.

No Chromium.

No Playwright.

No Selenium.

Just:

```text
URL → Final HTML
```

## Non-Goals

The following features are explicitly out of scope:

- GUI
- Tabs
- Bookmarks
- CSS rendering
- CSS layout
- Paint engine
- GPU acceleration
- Screenshots
- PDF generation
- Video playback
- Audio playback
- Canvas rendering
- WebGL
- WebRTC
- Service Workers
- Browser extensions
- DevTools

## Technology Stack

Language:

```text
Rust Stable
```

Recommended crates:

```toml
reqwest
html5ever
markup5ever_rcdom
rquickjs
tokio
clap
serde
serde_json
```

Alternative crates are acceptable if they improve correctness or maintainability.

## Runtime Architecture

```text
main
 └── browser
      ├── network
      ├── dom
      ├── javascript
      ├── events
      ├── timers
      ├── idle
      └── serializer
```

## Browser Pipeline

```text
URL
 ↓
HTTP Request
 ↓
Receive HTML
 ↓
Parse HTML
 ↓
Build DOM
 ↓
Execute Scripts
 ↓
Handle Async Tasks
 ↓
Wait Until Idle
 ↓
Serialize DOM
 ↓
Stdout
```

## HTTP Requirements

Support:

- GET requests
- Redirects
- HTTPS
- Cookies
- Custom User-Agent

Cookies must persist during page execution.

## DOM Requirements

### Document

```javascript
document.querySelector();
document.querySelectorAll();
document.getElementById();
document.createElement();
```

### Element

```javascript
element.innerHTML;
element.textContent;
element.value;
element.id;
element.className;
```

Methods:

```javascript
element.appendChild();
element.removeChild();
element.setAttribute();
element.getAttribute();
element.click();
```

## JavaScript Runtime

Recommended engine:

```text
QuickJS via rquickjs
```

Expose globals:

```javascript
window;
document;
console;
fetch;
setTimeout;
clearTimeout;
```

Example:

```javascript
document.querySelector('#app').innerHTML = '<h1>Hello World</h1>';
```

## Fetch API

Support:

```javascript
fetch(url);
```

Requirements:

- Relative URLs
- Absolute URLs
- Cookies
- Promise-based responses

Example:

```javascript
fetch('/api/user')
  .then((r) => r.text())
  .then((html) => {
    document.body.innerHTML = html;
  });
```

## Timers

Support:

```javascript
setTimeout(fn, delay);
clearTimeout(id);
```

## Event System

Support:

```javascript
element.click();
```

and:

```javascript
addEventListener();
removeEventListener();
dispatchEvent();
```

Basic DOM event compatibility is sufficient for the MVP.

## Idle Detection

The browser should wait until:

```text
pending_fetches == 0
pending_timers == 0
pending_microtasks == 0
```

and no DOM mutations have occurred for:

```text
500ms
```

Pseudo-code:

```rust
while !idle {
    process_tasks();
}

return html;
```

## Serialization

Convert the final DOM state back into HTML.

Example:

Input:

```html
<body>
  <div id="app"></div>

  <script>
    document.querySelector('#app').innerHTML = '<h1>Hello</h1>';
  </script>
</body>
```

Output:

```html
<body>
  <div id="app">
    <h1>Hello</h1>
  </div>
</body>
```

## Performance Targets

### Binary Size

Target:

```text
10 MB - 30 MB
```

Maximum acceptable:

```text
50 MB
```

### Memory Usage

Target:

```text
< 150 MB RAM
```

### Startup Time

Target:

```text
< 100ms
```

### Timeout

Default:

```text
30 seconds
```

If the page never becomes idle:

```text
Exit Code 4
```

## Exit Codes

```text
0 Success
1 Invalid Arguments
2 Network Error
3 JavaScript Error
4 Timeout
5 Internal Error
```

## Compatibility Goals

Must support:

- Vanilla JavaScript websites
- AJAX-driven pages
- Form submissions
- DOM manipulation
- Simple SPA applications

Nice-to-have:

- React
- Vue
- Svelte

Not required:

- Full browser compatibility

## Development Phases

### Phase 1

Static HTML support.

Features:

- URL input
- HTTP fetch
- HTML parse
- HTML output

### Phase 2

JavaScript execution.

Features:

- DOM APIs
- Script execution
- DOM mutations

### Phase 3

Async runtime.

Features:

- fetch()
- Promises
- Timers
- Idle detection

### Phase 4

Interaction.

Features:

- click()
- Events
- Form submission

### Phase 5

Optimization.

Features:

- Reduced memory usage
- Reduced binary size
- Faster startup

## Success Criteria

The following command:

```bash
browserverless https://example.com
```

must return the final DOM state as HTML after JavaScript execution and asynchronous network activity have completed.

The application must:

- Be a standalone Rust binary
- Run in containers
- Run in serverless environments
- Avoid launching external browser processes
- Avoid Chromium, Firefox, WebKit, Playwright, and Selenium

The primary purpose of Browserverless is:

```text
URL → Fully Hydrated HTML
```
