# Browser Extensions

## Table of Contents

- [Browser Extensions](#browser-extensions)
  - [Table of Contents](#table-of-contents)
  - [Extensions](#extensions)
  - [Browsers](#browsers)
  - [Structure](#structure)
    - [Script \& Folder Descriptions](#script--folder-descriptions)

## Extensions

1. [blocked](https://github.com/hieudoanm/hieudoanm.github.io/tree/master/packages/extensions/browser/blocked)
2. [chess/focus](https://github.com/hieudoanm/hieudoanm.github.io/tree/master/packages/extensions/chess/focus)
3. [claude/limit](https://github.com/hieudoanm/hieudoanm.github.io/tree/master/packages/extensions/claude/limit)
4. [github/open-link](https://github.com/hieudoanm/hieudoanm.github.io/tree/master/packages/extensions/github/open-link)
5. [instagram/download](https://github.com/hieudoanm/hieudoanm.github.io/tree/master/packages/extensions/instagram/download)
6. [new-tab](https://github.com/hieudoanm/hieudoanm.github.io/tree/master/packages/extensions/browser/new-tab)
7. [shopify/detect](https://github.com/hieudoanm/hieudoanm.github.io/tree/master/packages/extensions/shopify/detect)
8. [snapshot](https://github.com/hieudoanm/hieudoanm.github.io/tree/master/packages/extensions/snapshot)
9. [youtube/transcript](https://github.com/hieudoanm/hieudoanm.github.io/tree/master/packages/extensions/youtube/transcript)

## Browsers

| No  | Ext   | Engine               | Browser                                           |
| --- | ----- | -------------------- | ------------------------------------------------- |
| 01  | `crx` | [Chromium][chromium] | [Chrome](https://www.google.com/chrome/)          |
| 02  | `crx` | [Chromium][chromium] | [Microsoft Edge](https://www.microsoft.com/edge/) |
| 03  | `crx` | [Chromium][chromium] | [Brave](https://brave.com/)                       |
| 04  | `crx` | [Chromium][chromium] | [Opera](https://www.opera.com/)                   |
| 05  | `crx` | [Chromium][chromium] | [Vivaldi](https://vivaldi.com/)                   |
| 06  | `crx` | [Chromium][chromium] | [Arc](https://arc.net/)                           |
| 07  | `xpi` | [Gecko][gecko]       | [Firefox](https://www.mozilla.org/firefox/)       |
| 08  | `xpi` | [Gecko][gecko]       | [Tor Browser](https://www.torproject.org/)        |
| 09  | `xpi` | [Gecko][gecko]       | [Zed Browser](https://zed.dev/)                   |
| 10  |       | [WebKit][webkit]     | [Safari](https://www.apple.com/safari/)           |

[chromium]: https://www.chromium.org/
[gecko]: https://developer.mozilla.org/en-US/docs/Glossary/Gecko
[webkit]: https://webkit.org/

## Structure

```terminal
extension/
├── public/
│   ├── manifest.json
│   ├── popup.html
│   ├── options.html
│   └── icons/
│       ├── icon16.png
│       ├── icon48.png
│       └── icon128.png
│
├── src/
│   ├── background.ts
│   ├── content.ts
│   ├── devtools.ts
│   ├── inject.ts
│   ├── options.ts
│   ├── popup.ts
│   │
│   ├── styles/
│   │   ├── popup.css
│   │   ├── options.css
│   │   └── content.css
│   │
│   ├── lib/
│   │   ├── storage.ts
│   │   ├── messaging.ts
│   │   ├── tabs.ts
│   │   └── utils.ts
│   │
│   ├── components/
│   └── types/
│
├── package.json
├── tsconfig.json
├── webpack.config.ts
└── README.md
```

### Script & Folder Descriptions

- **`src/background.ts`**: Handles background events, browser API lifecycles, and maintains long-running orchestrations (e.g., cross-origin requests, tab notifications, and persistent states).
- **`src/content.ts`**: Runs in the context of specific web pages (shares DOM access), executes content scraping, acts as DOM observers, and interacts with page structures.
- **`src/devtools.ts`**: Integrates customized panels, sidebars, or inspector panels into the browser's Developer Tools.
- **`src/inject.ts`**: Embedded directly in the webpage runtime to access page-level variables and functions that content scripts cannot ordinarily reach.
- **`src/options.ts`**: Coordinates configuration values, settings state, and preferences on the extension's Options page.
- **`src/popup.ts`**: Logic driving the interactive toolbar dropdown menu displayed upon clicking the extension's icon.
- **`src/styles/`**: Housing for stylesheets tailored to each display view (`popup.css`, `options.css`, `content.css`).
- **`src/lib/`**: Reusable low-level wrappers to abstract platform actions cleanly:
  - `storage.ts`: Handles local and synced browser settings.
  - `messaging.ts`: Simplifies background-to-content script communications.
  - `tabs.ts`: Utilities to query, modify, or create browser tabs.
  - `utils.ts`: Generic string, DOM, or array utility functions.
- **`src/components/`**: Reusable component views (React or web elements) used by the popup or options interfaces.
- **`src/types/`**: Ambient types, namespaces, and typescript definitions.
