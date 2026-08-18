# AGENTS.md

# Port Manager — AI Agent Development Guide

## 1. Project Overview

**Port Manager** is a native macOS menu-bar utility for developers.

Its purpose is to provide a fast, lightweight, native interface for discovering, inspecting, and managing processes that are listening on local TCP/UDP ports.

The application should feel like a first-class macOS utility rather than a web application packaged for macOS.

### Core problem

macOS provides command-line tools such as:

```bash
lsof
netstat
sockstat
```

but does not provide a convenient native GUI for developers to answer:

- What is using port `3000`?
- Which process owns this port?
- What project did this process come from?
- Can I open it in a browser?
- Can I kill the process?
- Which ports are currently listening?
- Why can't my development server bind to this port?

Port Manager solves this problem.

---

# 2. Product Principles

## 2.1 Native first

The application MUST use native macOS technologies.

Preferred stack:

- Swift
- SwiftUI
- AppKit where required
- Swift Concurrency
- macOS system APIs
- Foundation

Do NOT introduce:

- Electron
- Tauri
- React
- WebViews
- JavaScript runtimes
- Chromium-based UI frameworks

The application should have minimal memory and CPU overhead.

---

## 2.2 Menu-bar first

Port Manager is primarily a menu-bar application.

The main interaction should be possible without opening a traditional application window.

The user should be able to:

1. Click the menu-bar icon.
2. Immediately see active ports.
3. Search for a port/process.
4. Inspect details.
5. Open the port.
6. Kill the process.

A full settings window may exist separately.

---

## 2.3 Developer-first

The primary audience is software developers.

Optimize for common local-development scenarios:

- Next.js
- Vite
- Node.js
- Bun
- Deno
- Python
- FastAPI
- Django
- Go
- Rust
- Rails
- Docker
- PostgreSQL
- Redis
- MySQL
- Tauri

Do not attempt to become a generic enterprise network-monitoring application.

---

## 2.4 Fast and lightweight

The app should:

- Launch quickly.
- Consume very little memory.
- Avoid unnecessary background work.
- Avoid polling aggressively.
- Avoid persistent network connections.
- Avoid unnecessary disk writes.

Prefer event-driven mechanisms where practical.

If polling is required, use a reasonable interval and make it configurable internally.

---

# 3. Technology Stack

## Required

```text
Swift
SwiftUI
AppKit
Foundation
Swift Concurrency
Xcode
Swift Package Manager
```

Target:

```text
macOS 14+
```

Unless a lower minimum deployment target is explicitly required by the project.

---

# 4. Application Type

Port Manager should be an `LSUIElement` / menu-bar application.

It should not appear as a normal application in the Dock by default.

Use an `NSStatusItem` or SwiftUI/AppKit integration appropriate for the selected macOS deployment target.

The application should support:

```text
Menu Bar
    ↓
Popover
    ↓
Port List
    ↓
Port Details
```

---

# 5. Architecture

Use a clean layered architecture.

Recommended structure:

```text
PortManager/
├── App/
│   ├── PortManagerApp.swift
│   ├── AppDelegate.swift
│   └── StatusBarController.swift
│
├── Models/
│   ├── Port.swift
│   ├── ProcessInfo.swift
│   ├── NetworkEndpoint.swift
│   └── Project.swift
│
├── Services/
│   ├── PortDiscoveryService.swift
│   ├── ProcessService.swift
│   ├── ProcessTreeService.swift
│   ├── ProjectDetectionService.swift
│   └── BrowserService.swift
│
├── ViewModels/
│   ├── PortListViewModel.swift
│   └── PortDetailViewModel.swift
│
├── Views/
│   ├── MenuBarView.swift
│   ├── PortListView.swift
│   ├── PortRow.swift
│   ├── PortDetailView.swift
│   ├── ProcessDetailView.swift
│   └── SettingsView.swift
│
├── Utilities/
│   ├── Shell.swift
│   ├── Formatters.swift
│   └── Constants.swift
│
├── Resources/
│
└── Tests/
    ├── PortDiscoveryTests.swift
    ├── ProcessServiceTests.swift
    └── ProjectDetectionTests.swift
```

Agents may adjust the structure when necessary, but should preserve separation between:

- UI
- state
- process discovery
- port discovery
- project detection
- OS integration

---

# 6. Domain Model

## Port

A port represents a listening network endpoint.

Conceptually:

```swift
struct Port: Identifiable {
    let id: String

    let port: UInt16
    let protocolType: NetworkProtocol
    let address: String

    let pid: Int32
    let processName: String

    let command: String?
    let executablePath: String?
    let workingDirectory: String?

    let state: PortState
}
```

Possible protocol values:

```swift
enum NetworkProtocol {
    case tcp
    case udp
}
```

Possible states:

```swift
enum PortState {
    case listening
    case established
    case other
}
```

The model can evolve as implementation details become clearer.

---

# 7. Port Discovery

The application must discover processes listening on local ports.

Possible implementation strategies include:

### Option A — System APIs

Prefer native system APIs when they provide sufficient information.

### Option B — System commands

Using commands such as:

```bash
lsof
```

is acceptable when macOS does not expose the required information conveniently through public APIs.

If using command-line tools:

- Do not invoke a shell unnecessarily.
- Prefer `Process` with explicit executable paths.
- Avoid `sh -c`.
- Properly escape arguments.
- Parse output defensively.
- Handle command failures.
- Handle missing permissions.

Do not make the application dependent on Homebrew or third-party binaries.

---

# 8. Process Discovery

For every port, attempt to identify:

```text
PID
Process name
Executable
Command line
Parent PID
Working directory
```

Example:

```text
Port:       3000
Process:    node
PID:        18234
Executable: /opt/homebrew/bin/node
Directory:  ~/Code/my-app
Command:    next dev
```

Process information should be gathered separately from port discovery.

Do not tightly couple the port parser to process metadata.

---

# 9. Process Tree

The application should eventually understand process relationships.

Example:

```text
Terminal
└── pnpm dev
    └── next dev
        └── node
            └── Port 3000
```

Represent process relationships independently from the UI.

A future implementation may use:

```swift
struct ProcessNode {
    let pid: Int32
    let parentPID: Int32?
    let name: String
    let executablePath: String?
    let command: String?
}
```

The process tree should allow the UI to answer:

> "What actually started this process?"

---

# 10. Project Detection

A major differentiating feature is associating a port with a development project.

For example:

```text
3000
Next.js
my-project
~/Code/my-project
PID 18234
```

Possible signals:

1. Process working directory.
2. Parent process working directory.
3. Command-line arguments.
4. Known project configuration files.

Examples:

```text
package.json
pnpm-workspace.yaml
Cargo.toml
go.mod
pyproject.toml
requirements.txt
Gemfile
```

Project detection must be best-effort.

Never assume that every process belongs to a project.

---

# 11. MVP Features

The initial release MUST focus on these features.

## P0 — Port discovery

Display:

```text
Port
Protocol
Address
Process
PID
```

---

## P0 — Automatic refresh

The list should update automatically when processes start or stop.

Example:

```text
3000  node
5173  vite
8080  go
```

If the user starts another server:

```text
3000  node
5173  vite
8080  go
4000  node
```

should appear without restarting the application.

---

## P0 — Search

Search by:

```text
port
process name
PID
project
command
```

Example:

```text
Search: 3000
```

or:

```text
Search: next
```

---

## P0 — Open in browser

For HTTP-like local ports:

```text
localhost:3000
```

provide:

```text
Open in Browser
```

Use native macOS APIs such as `NSWorkspace`.

Do not invoke:

```bash
open
```

unless there is a strong reason.

---

## P0 — Copy address

Provide:

```text
Copy localhost:3000
```

Use `NSPasteboard`.

---

## P0 — Kill process

Provide:

```text
Kill
Force Kill
```

Prefer graceful termination first.

Conceptually:

```text
SIGTERM
    ↓
wait
    ↓
SIGKILL if requested/necessary
```

Do not automatically force-kill processes.

---

# 12. Dangerous Actions

Process termination is destructive.

The UI should make destructive actions explicit.

Prefer:

```text
Kill Process
```

and:

```text
Force Kill
```

Do not place "Force Kill" as the primary button.

Do not kill a process automatically merely because it occupies a port.

Never automatically terminate:

- system processes
- unrelated processes
- processes outside the user's expected scope

without explicit user action.

---

# 13. Port Conflict Detection

A future feature should detect common port conflicts.

Example:

```text
⚠️ Port 3000 is already in use

node
PID 18234
~/Code/old-project

[Open]
[Kill]
```

Potential future workflow:

```text
Start server
     ↓
Port 3000 occupied
     ↓
Port Manager detects conflict
     ↓
Show owning process
```

This should not attempt to modify the user's application configuration automatically in the MVP.

---

# 14. UI Design

The UI should follow macOS design conventions.

Prefer:

- Native SwiftUI controls.
- Native typography.
- System materials where appropriate.
- SF Symbols.
- Keyboard navigation.
- Accessibility labels.
- Context menus.
- Familiar macOS interaction patterns.

Avoid:

- Web-style dashboards.
- Excessive cards.
- Large gradients.
- Custom decorative UI.
- unnecessary animations.
- excessive rounded containers.

The application should feel like a macOS utility.

---

# 15. Main UI

Recommended layout:

```text
┌─────────────────────────────────────┐
│ Ports                         🔍 ⚙ │
├─────────────────────────────────────┤
│                                     │
│  ● 3000   Next.js                  │
│           my-project                │
│           PID 18234                 │
│                              Open   │
│                                     │
│  ● 5173   Vite                    │
│           frontend                  │
│           PID 19342                 │
│                              Open   │
│                                     │
│  ● 5432   PostgreSQL              │
│           PID 1023                  │
│                                     │
└─────────────────────────────────────┘
```

The exact visual design may evolve.

The information hierarchy should not.

---

# 16. Port Row

Each row should make the most important information immediately visible:

```text
PORT
PROCESS
PROJECT
PID
```

Example:

```text
3000
Next.js
my-app
PID 18234
```

Secondary information can be shown on hover, context menu, or detail view.

---

# 17. Context Menu

A port should support a context menu.

Recommended actions:

```text
Open in Browser
Copy Address
Copy Port
Copy PID
Show Details
Show Process
Show in Finder
Open Terminal Here
──────────────
Kill Process
Force Kill
──────────────
Ignore Port
```

Not every action must exist in the MVP.

---

# 18. Keyboard Support

The application should be usable without a mouse.

Important interactions:

```text
⌘F        Search
↑ / ↓     Navigate
Return    Open/select
⌘C        Copy
Escape    Close
```

A global shortcut can be considered later.

---

# 19. Filtering

Future filtering:

```text
All
TCP
UDP
Listening
Established
Development
System
Docker
```

The default view should prioritize:

```text
Listening
```

because that is the primary developer use case.

---

# 20. Favorites

Future versions may allow users to assign aliases:

```text
3000 → Frontend
8080 → Backend
5432 → PostgreSQL
6379 → Redis
```

UI:

```text
Favorites

3000  Frontend
8080  Backend
5432  PostgreSQL
6379  Redis
```

Do not implement this before the core port-management workflow is reliable.

---

# 21. History

A future version may maintain a lightweight local history:

```text
Recently Used

3000  Next.js      stopped 2m ago
5173  Vite         stopped 8m ago
8080  Go API       stopped 15m ago
```

History should:

- be opt-in if necessary.
- have a clear retention policy.
- remain local.
- avoid collecting unnecessary information.

Do not send process information to external servers.

---

# 22. Privacy

Port Manager should be completely local.

The application should NOT:

- upload process information.
- upload port information.
- collect project paths.
- collect command lines.
- collect telemetry by default.

If analytics are ever introduced, they must be explicitly designed and documented.

---

# 23. Security

Treat process and command-line information as potentially sensitive.

Do not expose unnecessary information.

Avoid executing arbitrary command strings.

Bad:

```swift
Process("/bin/sh", arguments: ["-c", command])
```

Preferred:

```swift
Process(
    executableURL: executableURL,
    arguments: arguments
)
```

Never construct shell commands from untrusted process metadata.

---

# 24. Permissions

The application should operate with the minimum permissions required.

Do not request:

- Full Disk Access
- Accessibility
- Screen Recording
- Network extensions
- Administrator privileges

unless a specific feature genuinely requires them.

If a feature requires elevated permissions, document exactly why.

---

# 25. Error Handling

Never silently fail.

Examples:

```text
Unable to inspect process

The process information could not be accessed.
```

or:

```text
Unable to terminate process

You may not have permission to terminate this process.
```

Do not expose raw system errors unless useful.

Log detailed errors for debugging while presenting concise errors to users.

---

# 26. Logging

Use Apple's unified logging system.

Prefer:

```swift
import OSLog

private let logger = Logger(
    subsystem: "com.example.PortManager",
    category: "PortDiscovery"
)
```

Use appropriate log levels:

```text
debug
info
notice
error
fault
```

Do not log:

- unnecessary command-line arguments
- sensitive project paths
- user data

unless required for debugging.

---

# 27. Concurrency

Use Swift Concurrency.

Prefer:

```swift
async
await
Task
TaskGroup
actor
@MainActor
```

UI state must remain on the main actor.

Long-running discovery operations must not block the main thread.

Avoid:

```swift
Thread.sleep(...)
```

in UI code.

Avoid unnecessary detached tasks.

---

# 28. State Management

The UI should not directly perform port discovery.

Preferred flow:

```text
PortDiscoveryService
        ↓
PortListViewModel
        ↓
SwiftUI Views
```

For example:

```swift
@MainActor
final class PortListViewModel: ObservableObject {
    @Published private(set) var ports: [Port] = []

    func refresh() async {
        ...
    }
}
```

Services should remain UI-independent.

---

# 29. Testing

Core logic must be testable without requiring the full UI.

Test:

### Port parsing

```text
lsof output
    ↓
[Port]
```

Test:

- TCP
- UDP
- IPv4
- IPv6
- multiple processes
- malformed output
- missing fields

### Process discovery

Test:

- PID parsing
- parent PID
- executable path
- working directory

### Filtering

Test:

```text
3000
node
my-project
18234
```

### Project detection

Test known project structures.

---

# 30. Mock System Services

Do not make tests depend on the developer machine's current ports.

Bad:

```swift
lsof(...)
```

directly inside unit tests.

Instead use abstractions:

```swift
protocol PortDiscovering {
    func discoverPorts() async throws -> [Port]
}
```

Then provide:

```text
SystemPortDiscoveryService
MockPortDiscoveryService
```

This makes tests deterministic.

---

# 31. Performance Requirements

The application should be lightweight.

Target:

```text
Idle CPU:       near 0%
Idle memory:    as low as reasonably possible
Startup:        near-instant
Refresh:        non-blocking
```

Do not optimize prematurely.

Measure before introducing complex caching.

---

# 32. Refresh Strategy

The first implementation may use periodic refresh.

Example conceptual behavior:

```text
Application starts
       ↓
Discover ports
       ↓
Display ports
       ↓
Refresh periodically
       ↓
Diff old/new state
       ↓
Update UI only when necessary
```

Do not rebuild the entire UI unnecessarily.

Future versions may investigate more event-driven approaches.

---

# 33. Port Diffing

The UI should recognize:

```text
Added
Removed
Changed
```

Example:

```text
3000 started
```

or:

```text
3000 stopped
```

This enables future notifications and history.

---

# 34. Browser Detection

Opening a port should use native APIs.

For example:

```swift
NSWorkspace.shared.open(url)
```

Potential URL:

```text
http://localhost:3000
```

Do not assume every port speaks HTTP.

The MVP may provide "Open in Browser" only when:

- the user explicitly requests it, or
- the port is detected/configured as HTTP.

---

# 35. Networking Scope

Port Manager is primarily concerned with **local listening ports**.

Do not turn the MVP into:

- packet analyzer
- Wireshark replacement
- firewall
- VPN
- network scanner
- remote port scanner
- intrusion detection system

These are different products.

---

# 36. Docker Support

Docker support is a future feature.

Eventually detect:

```text
Host port → Container port

3000 → 3000
5432 → 5432
```

Possible UI:

```text
3000
Docker
my-web-container

Host:      3000
Container: 3000
```

Do not require Docker to be installed for the application to work.

---

# 37. AI Agent Awareness

Modern development workflows increasingly involve AI coding agents.

A future feature may detect processes spawned by:

- coding agents
- terminal agents
- IDE agents

Example:

```text
3000
Next.js
my-project

Started by:
AI coding agent
```

This is a future differentiator, not an MVP requirement.

Do not hard-code assumptions about a particular AI vendor.

---

# 38. Configuration

Configuration should be local.

Possible settings:

```text
Launch at Login
Refresh Interval
Show TCP
Show UDP
Show System Processes
Default Browser Action
Ignored Ports
Favorites
```

Do not build a settings system before it is needed.

---

# 39. Accessibility

Support macOS accessibility from the beginning.

Use:

- meaningful labels
- semantic SwiftUI controls
- keyboard navigation
- VoiceOver-friendly descriptions

Do not rely solely on icons.

For example, an icon-only kill button must have an accessibility label:

```text
"Kill Process"
```

---

# 40. App Icon and Menu-Bar Icon

Use SF Symbols where appropriate for menu-bar UI.

The menu-bar icon should remain recognizable at small sizes.

Do not overload the icon with text.

Potential concept:

```text
🔌
```

or a custom minimal port/network symbol.

The final icon should be monochrome and work with macOS menu-bar rendering.

---

# 41. Build and Distribution

The project should support:

```text
Debug
Release
Archive
DMG
```

The application should eventually support:

```text
Developer ID signing
Notarization
```

Do not make distribution signing a requirement for local development.

---

# 42. Git Practices

Keep commits focused.

Good:

```text
feat: add port discovery service
feat: add process termination
feat: add menu bar popover
feat: add port search
test: add lsof parser tests
```

Avoid large commits such as:

```text
implement entire application
```

Agents should preserve a clean, understandable Git history.

---

# 43. Agent Workflow

Before implementing a feature:

1. Inspect the existing project.
2. Read this `AGENTS.md`.
3. Understand the current architecture.
4. Identify existing abstractions.
5. Avoid duplicating services.
6. Implement the smallest useful change.
7. Add tests.
8. Build the application.
9. Run tests.
10. Check for Swift concurrency warnings.
11. Check for macOS-specific issues.
12. Summarize the changes.

Never rewrite working architecture merely because another architecture looks cleaner.

---

# 44. Definition of Done

A feature is not complete until:

- It compiles.
- Unit tests pass.
- UI works on macOS.
- No obvious main-thread blocking exists.
- Errors are handled.
- Accessibility labels exist where necessary.
- No unnecessary permissions are introduced.
- No sensitive information is transmitted.
- The implementation follows the existing architecture.

---

# 45. MVP Roadmap

## Phase 1 — Foundation

Implement:

- Swift/macOS project
- Menu-bar application
- SwiftUI popover
- Basic application lifecycle

---

## Phase 2 — Port Discovery

Implement:

- TCP listening ports
- UDP ports
- PID
- Process name
- Address
- Port number
- Automatic refresh

---

## Phase 3 — Developer Context

Implement:

- executable path
- command line
- working directory
- project detection
- process tree

---

## Phase 4 — Actions

Implement:

- Open in Browser
- Copy address
- Copy PID
- Kill
- Force Kill
- Show details

---

## Phase 5 — UX

Implement:

- Search
- Filters
- Keyboard navigation
- Context menu
- Empty states
- Error states
- Accessibility

---

## Phase 6 — Advanced Features

Consider:

- Port conflict detection
- Favorites
- Port aliases
- History
- Notifications
- Docker awareness
- Global keyboard shortcut
- AI-agent process awareness

---

# 46. Non-Goals

The following are explicitly outside the initial scope:

- Remote port scanning
- Packet inspection
- Firewall management
- VPN
- Network traffic analysis
- Bandwidth monitoring
- Enterprise network management
- Cloud infrastructure monitoring
- Automatic process termination
- Automatic application configuration changes

Port Manager should remain a **small, focused local-development utility**.

---

# 47. Guiding Product Question

For every feature, ask:

> "Does this help a macOS developer understand or manage a local port faster?"

If the answer is no, do not add the feature merely because it is technically interesting.

The ideal experience is:

```text
Something is wrong with my dev server.
             ↓
Open Port Manager.
             ↓
See who owns the port.
             ↓
Understand what project/process it is.
             ↓
Take action.
             ↓
Continue working.
```

That is the core product.
