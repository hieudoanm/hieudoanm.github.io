# AGENTS.md

# Brewery — AI Agent Development Guide

## 1. Project Overview

**Brewery** is a native macOS GUI for [Homebrew](https://brew.sh/).

Brewery provides a graphical interface for discovering, installing, updating, upgrading, uninstalling, and inspecting Homebrew packages.

The application exists because Homebrew is powerful but primarily CLI-driven:

```bash
brew search
brew install
brew uninstall
brew update
brew upgrade
brew list
brew info
brew services
```

Brewery should make common Homebrew workflows accessible through a fast, clean, native macOS interface.

---

# 2. Product Definition

Brewery is:

> A native macOS interface for managing Homebrew.

Brewery is NOT:

- A replacement for Homebrew.
- A new package manager.
- A Homebrew fork.
- A package registry.
- A system optimizer.
- A macOS app store replacement.
- A general-purpose software installer.

**Homebrew remains the source of truth.**

Brewery is a presentation and interaction layer over Homebrew.

---

# 3. Product Principles

## 3.1 Homebrew-first

Never duplicate Homebrew's package-management logic unnecessarily.

Prefer:

```text
Brewery
   ↓
Homebrew
   ↓
Formulae / Casks
```

rather than:

```text
Brewery
   ↓
Custom package-management implementation
```

If Homebrew already knows how to perform an operation, Brewery should delegate to Homebrew.

---

## 3.2 Native macOS application

Use native macOS technologies.

Preferred stack:

```text
Swift
SwiftUI
AppKit
Foundation
Swift Concurrency
Swift Package Manager
Xcode
```

Do NOT use:

- Electron
- Tauri
- React
- Next.js
- WebView-based UI
- Chromium
- JavaScript runtimes

The application should feel like a first-class macOS application.

---

## 3.3 Lightweight

Brewery should be significantly lighter than an Electron-based package manager.

Priorities:

1. Fast startup.
2. Low idle CPU usage.
3. Low memory usage.
4. No unnecessary background processes.
5. No unnecessary network services.
6. No telemetry by default.

---

## 3.4 CLI compatibility

Anything performed through Brewery should remain compatible with normal Homebrew CLI usage.

For example:

```bash
brew install node
```

and:

```text
Brewery → Install Node.js
```

should result in the same Homebrew-managed installation.

Brewery must never create a separate package database.

---

# 4. Target Users

Primary users:

- macOS developers
- Software engineers
- Students learning development
- DevOps engineers
- Power users
- Developers who prefer graphical interfaces

Primary use cases:

```text
Discover a package
        ↓
Install it
        ↓
See installation status
        ↓
Update it
        ↓
Inspect it
        ↓
Uninstall it
```

---

# 5. Homebrew Concepts

Agents must understand the distinction between:

### Formula

Command-line software and libraries.

Examples:

```text
node
git
python
postgresql
redis
wget
jq
```

Installed with:

```bash
brew install <formula>
```

### Cask

GUI applications and other macOS software distributed through Homebrew.

Examples:

```text
firefox
visual-studio-code
docker
raycast
iterm2
```

Installed with:

```bash
brew install --cask <cask>
```

Brewery should clearly distinguish Formulae and Casks in the UI.

---

# 6. Supported Homebrew Environments

Brewery must support both common Homebrew installation locations.

Apple Silicon:

```text
/opt/homebrew
```

Intel:

```text
/usr/local
```

Do not hard-code one architecture.

Homebrew's executable location should be discovered dynamically where possible.

Possible detection:

```bash
which brew
```

or known installation locations.

Do not assume:

```text
/opt/homebrew/bin/brew
```

always exists.

---

# 7. Architecture

Recommended architecture:

```text
Brewery/
├── App/
│   ├── BreweryApp.swift
│   ├── AppDelegate.swift
│   └── AppState.swift
│
├── Models/
│   ├── Package.swift
│   ├── Formula.swift
│   ├── Cask.swift
│   ├── PackageVersion.swift
│   ├── PackageStatus.swift
│   └── BrewError.swift
│
├── Services/
│   ├── BrewService.swift
│   ├── BrewExecutable.swift
│   ├── BrewSearchService.swift
│   ├── BrewInstallService.swift
│   ├── BrewUpdateService.swift
│   ├── BrewUpgradeService.swift
│   ├── BrewUninstallService.swift
│   └── BrewServicesService.swift
│
├── ViewModels/
│   ├── PackageListViewModel.swift
│   ├── PackageDetailViewModel.swift
│   ├── InstalledViewModel.swift
│   └── UpdatesViewModel.swift
│
├── Views/
│   ├── ContentView.swift
│   ├── SidebarView.swift
│   ├── PackageListView.swift
│   ├── PackageRow.swift
│   ├── PackageDetailView.swift
│   ├── InstalledView.swift
│   ├── UpdatesView.swift
│   ├── ServicesView.swift
│   └── SettingsView.swift
│
├── Utilities/
│   ├── ProcessRunner.swift
│   ├── Formatters.swift
│   └── Constants.swift
│
└── Tests/
    ├── BrewServiceTests.swift
    ├── BrewParserTests.swift
    └── PackageModelTests.swift
```

Agents may modify the structure when justified.

Maintain separation between:

```text
UI
↓
ViewModel
↓
Service
↓
Homebrew
```

---

# 8. Homebrew Integration

Homebrew should be invoked through `Process` / `Process`-compatible APIs.

Avoid unnecessary shell invocation.

Bad:

```swift
Process(
    executableURL: "/bin/zsh",
    arguments: ["-c", "brew install node"]
)
```

Prefer:

```swift
Process(
    executableURL: brewURL,
    arguments: ["install", "node"]
)
```

Never construct shell commands by concatenating user input.

---

# 9. Brew Service Abstraction

All Homebrew interaction should go through a service abstraction.

Example:

```swift
protocol BrewService {
    func version() async throws -> String
    func listInstalled() async throws -> [Package]
    func search(query: String) async throws -> [Package]
    func info(package: String) async throws -> Package
    func install(package: String, type: PackageType) async throws
    func uninstall(package: String, type: PackageType) async throws
    func update() async throws
    func upgrade() async throws
}
```

The exact API may evolve.

Views must not directly invoke `Process`.

---

# 10. JSON Output

Prefer Homebrew JSON output when available.

For example:

```bash
brew info --json=v2
```

JSON output is preferable to parsing human-readable CLI output because it is more structured and less fragile.

Use human-readable output primarily for:

- progress
- logs
- diagnostics
- commands where structured output is unavailable

Do not build fragile parsers against terminal formatting when structured output exists.

---

# 11. Command Execution

Create a reusable command runner.

Conceptually:

```swift
struct ProcessResult {
    let stdout: String
    let stderr: String
    let exitCode: Int32
}
```

The runner should:

- capture stdout
- capture stderr
- expose exit code
- support async execution
- support cancellation where practical
- avoid blocking the main actor
- report errors clearly

---

# 12. Installation

Brewery should support:

```text
Install Formula
Install Cask
```

UI example:

```text
Node.js

Command-line runtime

Version
22.15.0

[ Install ]
```

For casks:

```text
Firefox

Web browser

Version
141.0

[ Install ]
```

Do not silently install packages.

The user must explicitly initiate installation.

---

# 13. Installation Progress

Homebrew installation may take time.

The UI should show an active operation.

Example:

```text
Installing Node.js…

Downloading
██████████████░░░░░

Installing dependencies…
```

Where reliable progress information is unavailable, use an indeterminate progress indicator.

Never fake percentage progress.

---

# 14. Operation State

Represent package operations explicitly.

Example:

```swift
enum OperationState {
    case idle
    case running
    case succeeded
    case failed
    case cancelled
}
```

A package may also have:

```text
Installing
Updating
Upgrading
Uninstalling
```

Do not allow conflicting operations on the same package.

---

# 15. Installed Packages

The application should provide an Installed view.

Example:

```text
Installed

Formulae
──────────────
Git             2.50.1
Node.js         22.15.0
PostgreSQL      17.5
Redis           8.0

Casks
──────────────
Firefox         141.0
Visual Studio Code
Docker
```

Provide:

- Search
- Sort
- Package type
- Version
- Update availability

---

# 16. Discover

The main Discover screen should make package discovery easy.

Example:

```text
Discover

🔍 Search packages…

Popular
──────────────
Node.js
Git
Python
PostgreSQL
Redis

Categories
──────────────
Development
Databases
Networking
CLI Tools
Editors
Productivity
```

Avoid inventing package popularity data unless it is actually available from a trusted source.

Initially, package discovery can simply use Homebrew search.

---

# 17. Search

Search should support:

```text
package name
description
formula
cask
```

Example:

```text
Search: postgres
```

Results:

```text
postgresql@17
PostgreSQL database server

postgresql@16
PostgreSQL database server

libpq
PostgreSQL client libraries
```

Search should debounce input where appropriate.

Do not execute a Homebrew command for every keystroke without throttling.

---

# 18. Package Detail

A package detail view should provide:

```text
Name
Description
Current version
Installed version
Latest version
Formula/Cask
Homepage
Dependencies
Installation status
```

Actions:

```text
Install
Upgrade
Uninstall
```

Only show actions applicable to the current state.

---

# 19. Updates

Provide a dedicated Updates view.

Example:

```text
Updates

12 packages can be upgraded

Node.js              22.14 → 22.15
Git                  2.49  → 2.50
PostgreSQL            17.4  → 17.5

[ Upgrade All ]
```

Individual upgrades should also be available.

Before implementing upgrade logic, understand the behavior of:

```bash
brew outdated
brew upgrade
```

Do not reproduce Homebrew's dependency-resolution logic inside Brewery.

---

# 20. Update Homebrew

Brewery should provide a way to update Homebrew's package metadata:

```bash
brew update
```

UI:

```text
Homebrew

Last updated:
2 hours ago

[ Check for Updates ]
```

Do not automatically run `brew update` excessively.

Avoid running it on every application launch.

---

# 21. Upgrade All

Provide:

```text
Upgrade All
```

This should delegate to:

```bash
brew upgrade
```

The UI should display:

- current package
- operation output
- success
- failure
- final summary

If one package fails, do not hide the failure.

---

# 22. Uninstall

Uninstallation must require explicit user action.

Example confirmation:

```text
Uninstall Node.js?

This will remove the Homebrew package.

[Cancel] [Uninstall]
```

Do not automatically use destructive cleanup flags.

Do not remove unrelated files.

---

# 23. Dependency Awareness

Package details may display dependencies:

```text
Node.js

Dependencies

openssl@3
libuv
icu4c@77
```

Initially this is informational.

Do not implement custom dependency management.

Homebrew owns dependency resolution.

---

# 24. Services

Homebrew services are an important developer workflow.

Eventually provide:

```text
Services

PostgreSQL     ● Running
Redis          ● Running
MySQL          ○ Stopped
```

Actions:

```text
Start
Stop
Restart
```

Use Homebrew's service management:

```bash
brew services list
brew services start <formula>
brew services stop <formula>
brew services restart <formula>
```

Do not implement a parallel service manager.

---

# 25. Service View

A future service UI:

```text
Services

PostgreSQL
● Running
Port 5432

[ Stop ] [ Restart ]

Redis
● Running
Port 6379

[ Stop ] [ Restart ]
```

Port information should only be displayed if reliably available.

Do not assume:

```text
postgresql → 5432
redis → 6379
```

without verifying actual configuration.

---

# 26. Cleanup

A future feature may expose Homebrew cleanup.

Possible command:

```bash
brew cleanup
```

UI:

```text
Cleanup

Old versions:
2.4 GB

Cache:
1.1 GB

[ Clean Up ]
```

Do not expose destructive cleanup operations until their behavior is clearly understood.

Do not delete Homebrew files directly.

---

# 27. Diagnostics

Provide a diagnostics section in Settings or Help.

Potential information:

```text
Brewery version
macOS version
Architecture
Homebrew version
Homebrew prefix
Homebrew path
```

Potential actions:

```text
Check Homebrew
Open Homebrew Docs
Copy Diagnostics
```

Do not automatically upload diagnostics.

---

# 28. Homebrew Detection

On startup, detect whether Homebrew exists.

If Homebrew is unavailable:

```text
Homebrew not found

Brewery requires Homebrew to manage packages.

[ Install Homebrew ]
[ Learn More ]
```

The MVP may simply provide a link/instruction rather than automatically installing Homebrew.

Do not execute an external installation script without explicit user consent.

---

# 29. Architecture Detection

Display useful diagnostics:

```text
Apple Silicon
Homebrew:
/opt/homebrew

Intel
Homebrew:
/usr/local
```

Do not use CPU architecture alone to determine whether Homebrew is installed.

Detect the actual executable.

---

# 30. Permissions

Brewery should operate with minimal permissions.

Do not request:

- Full Disk Access
- Accessibility
- Screen Recording
- Network Extension
- administrator privileges

unless a specific Homebrew workflow genuinely requires them.

If Homebrew itself requests authentication, clearly communicate why.

Do not attempt to bypass macOS security mechanisms.

---

# 31. Authentication / sudo

Some Homebrew operations may trigger permission problems depending on system state.

Brewery must not:

- collect passwords
- store passwords
- implement its own sudo mechanism
- bypass authorization

If an operation requires authentication, rely on macOS/system mechanisms where appropriate.

---

# 32. Privacy

Brewery should be local-first.

Do not transmit:

- installed package lists
- package history
- project paths
- environment variables
- terminal output
- Homebrew configuration

unless the user explicitly chooses to share diagnostics.

No telemetry by default.

---

# 33. UI Design

Follow native macOS design principles.

Use:

- SwiftUI
- SF Symbols
- native controls
- system typography
- standard navigation
- sidebar layouts
- keyboard navigation
- accessibility

Avoid:

- web-style dashboards
- excessive cards
- unnecessary gradients
- custom UI frameworks
- fake macOS controls

---

# 34. Main Window

Unlike a menu-bar-only utility, Brewery should primarily use a normal macOS application window.

Recommended layout:

```text
┌────────────────────────────────────────────────┐
│ Brewery                                   🔍 │
├──────────────┬─────────────────────────────────┤
│              │                                 │
│ Discover     │ Discover                       │
│ Installed    │                                 │
│ Updates      │ Search packages…               │
│ Services     │                                 │
│              │ Popular                         │
│              │                                 │
│              │ Node.js                         │
│              │ Git                             │
│              │ PostgreSQL                      │
│              │ Redis                           │
│              │                                 │
│              │                                 │
└──────────────┴─────────────────────────────────┘
```

A menu-bar companion may be considered later.

---

# 35. Menu Bar

A menu-bar component is optional.

If implemented, it should focus on quick status:

```text
🍺 Brewery

12 Updates Available

PostgreSQL   ●
Redis        ●

Open Brewery
Check for Updates
```

Do not duplicate the entire application in the menu bar.

---

# 36. Keyboard Navigation

Support standard macOS interactions.

Examples:

```text
⌘F       Search
⌘R       Refresh
⌘,       Settings
Escape   Close search
Return   Open package
```

Do not override standard macOS shortcuts without a strong reason.

---

# 37. Accessibility

All interactive controls must have meaningful accessibility labels.

Examples:

```text
"Install Node.js"
"Upgrade Git"
"Uninstall PostgreSQL"
"Search packages"
```

Do not rely solely on icons.

Support:

- VoiceOver
- keyboard navigation
- Dynamic Type where appropriate
- sufficient contrast

---

# 38. Error Handling

Homebrew errors should be converted into understandable messages.

Instead of showing only:

```text
Process terminated with exit code 1
```

show:

```text
Installation failed

Homebrew could not install Node.js.

View Details
```

Allow advanced users to inspect raw output.

---

# 39. Terminal Output

For operations such as:

```text
Install
Upgrade
Uninstall
Update
Cleanup
```

provide an expandable log view.

Example:

```text
Installing Node.js…

▾ Details

==> Downloading...
==> Installing...
==> Linking...
🍺 node was successfully installed
```

Do not permanently store logs unless required.

---

# 40. Cancellation

Long-running operations should support cancellation where safe.

However, cancellation must not leave Homebrew in an inconsistent state.

If Homebrew cannot safely cancel a particular operation:

- do not fake cancellation.
- disable the cancel button.
- explain what is happening.

---

# 41. Concurrent Operations

Avoid launching multiple Homebrew operations simultaneously.

Homebrew operations can modify shared package state.

Default behavior:

```text
One Homebrew mutation at a time.
```

Read-only operations may be concurrent where safe.

For example:

```text
Search
Info
Installed list
```

may be performed concurrently if there is no conflict.

---

# 42. State Refresh

After a mutating operation:

```text
Install
Upgrade
Uninstall
Update
Cleanup
```

refresh relevant state.

Example:

```text
Install Node.js
       ↓
Operation succeeds
       ↓
Refresh Installed
       ↓
Refresh Package Detail
       ↓
Refresh Updates
```

Do not require the user to restart Brewery to see the new state.

---

# 43. Caching

Caching may be used for expensive read operations.

However:

> Homebrew is the source of truth.

Never allow stale cache data to override actual Homebrew state.

After mutations, invalidate relevant caches.

Do not build an elaborate cache before performance requires it.

---

# 44. Offline Behavior

Brewery should degrade gracefully when network access is unavailable.

Already-installed package information should remain accessible.

For network-dependent operations:

```text
Unable to reach package source

Please check your network connection.
```

Do not invent package information.

---

# 45. Security

Never execute arbitrary shell commands generated from user-controlled strings.

Bad:

```swift
"brew install \(packageName)"
```

inside a shell.

Preferred:

```swift
brewURL
arguments: ["install", packageName]
```

Validate package identifiers where appropriate.

Do not treat Homebrew package metadata as executable code.

---

# 46. Process Isolation

Homebrew commands must run asynchronously.

Never block the main UI thread while executing:

```bash
brew install
brew update
brew upgrade
```

The UI must remain responsive.

---

# 47. Testing

Unit-test all important logic.

Test:

### Homebrew detection

```text
/opt/homebrew/bin/brew
/usr/local/bin/brew
brew unavailable
```

### JSON parsing

Test:

- Formula
- Cask
- multiple versions
- dependencies
- missing optional fields
- malformed JSON

### Package states

Test:

```text
Installed
Not installed
Outdated
Installing
Uninstalling
Failed
```

### Command execution

Use mocked process execution.

Do not run destructive Homebrew commands in unit tests.

---

# 48. Mock Homebrew Service

Define an abstraction:

```swift
protocol BrewClient {
    func execute(
        arguments: [String]
    ) async throws -> ProcessResult
}
```

Then implement:

```text
SystemBrewClient
MockBrewClient
```

Tests should use `MockBrewClient`.

This allows deterministic testing without requiring Homebrew on the test machine.

---

# 49. Integration Tests

Integration tests may be added for actual Homebrew environments.

These must:

- detect Homebrew availability.
- avoid destructive operations by default.
- use disposable/test packages where possible.
- never uninstall arbitrary user software.

Never assume CI has Homebrew installed.

---

# 50. Logging

Use Apple's unified logging system.

Example:

```swift
import OSLog

private let logger = Logger(
    subsystem: "com.example.Brewery",
    category: "Brew"
)
```

Log:

- command failures
- unexpected Homebrew output
- parsing failures
- lifecycle events

Avoid logging:

- secrets
- environment variables
- unnecessary personal paths
- complete command output by default

---

# 51. Performance

Target:

```text
Fast startup
Low idle CPU
Low idle memory
Responsive UI
Non-blocking Homebrew operations
```

Do not poll Homebrew aggressively.

Avoid:

```text
brew update
```

on every launch.

Avoid repeatedly spawning `brew` processes when existing state can be reused safely.

---

# 52. Settings

Initial settings should remain minimal.

Potential settings:

```text
General
──────────────
Launch at Login

Updates
──────────────
Check for updates automatically
Update Homebrew automatically

Appearance
──────────────
System
Light
Dark
```

Do not introduce unnecessary configuration.

---

# 53. Notifications

Future feature.

Useful notifications:

```text
Homebrew update available
```

or:

```text
12 packages can be upgraded
```

Do not notify after every package installation unless explicitly configured.

---

# 54. Package Categories

Homebrew itself has a large ecosystem.

Brewery may provide UI categories for discovery, but categories should be derived from reliable metadata or clearly presented as Brewery-created groupings.

Possible categories:

```text
Development
Databases
Networking
CLI
Security
Media
Fonts
Browsers
Editors
Productivity
Utilities
```

Do not claim that these are official Homebrew categories unless they are.

---

# 55. Search Ranking

Initially delegate search to Homebrew.

Do not build a custom ranking algorithm prematurely.

Future ranking could consider:

- exact name match
- prefix match
- description match
- installed status
- recently used packages

Only implement custom ranking when user experience demonstrates a need.

---

# 56. Package Actions

A package detail page should expose contextual actions.

Not installed:

```text
[ Install ]
```

Installed and current:

```text
[ Uninstall ]
```

Installed and outdated:

```text
[ Upgrade ] [ Uninstall ]
```

Cask:

```text
[ Install ]
```

The UI must reflect actual Homebrew state rather than assuming it.

---

# 57. No Custom Package Database

This is a critical architectural rule.

Do NOT create:

```text
packages.db
```

or another authoritative package database.

Brewery should obtain package state from Homebrew.

Local persistence may be used for:

- UI preferences
- favorites
- recently viewed packages
- dismissed notifications

but not package installation state.

---

# 58. No Automatic Shell Modification

Do not automatically modify:

```text
~/.zshrc
~/.bashrc
~/.bash_profile
~/.config/*
```

unless a specific future feature explicitly requires it and the user confirms the change.

Brewery should not silently change the user's shell environment.

---

# 59. Homebrew Formulae vs Casks

The UI must clearly distinguish them.

For example:

```text
Git
Formula
CLI tool
```

versus:

```text
Firefox
Cask
macOS application
```

Do not call both simply "apps."

---

# 60. Future Multi-Package-Manager Support

The architecture should not prevent future support for:

```text
Homebrew
MacPorts
Nix
```

However:

> Do NOT implement multi-package-manager support in the MVP.

Do not abstract prematurely around hypothetical package managers.

The initial architecture should be clearly Homebrew-focused.

---

# 61. Future Developer Features

Potential future integrations:

### Port Manager

Show:

```text
PostgreSQL
● Running
Port 5432
```

and connect to a dedicated Port Manager application.

### Process Manager

Show package-related processes.

### Dev Cleanup

Identify:

```text
Homebrew cache
old package versions
```

### Environment Manager

Show installed runtimes:

```text
Node.js
Python
Go
Rust
```

These should remain separate concerns.

---

# 62. Distribution

The application should eventually support:

```text
Debug
Release
Archive
DMG
Developer ID signing
Notarization
```

Brewery itself should not require Homebrew to be installed before launching.

The app should launch and explain how to install Homebrew if it is missing.

---

# 63. Git Practices

Use focused commits.

Good:

```text
feat: detect homebrew installation
feat: add brew command runner
feat: display installed formulae
feat: add package search
feat: add package installation
feat: add upgrade view
test: add brew json parser tests
```

Avoid:

```text
implement everything
```

Agents should preserve a clean Git history.

---

# 64. Agent Workflow

Before making changes:

1. Read `AGENTS.md`.
2. Inspect the existing project.
3. Understand the current architecture.
4. Check existing services and models.
5. Avoid duplicate abstractions.
6. Make the smallest useful change.
7. Add or update tests.
8. Build the application.
9. Run tests.
10. Check Swift concurrency warnings.
11. Check macOS-specific behavior.
12. Verify Homebrew integration.
13. Summarize the change.

Never rewrite working architecture without a concrete reason.

---

# 65. Definition of Done

A feature is complete when:

- The project compiles.
- Tests pass.
- UI works on supported macOS versions.
- Homebrew operations execute correctly.
- UI remains responsive during operations.
- Errors are handled.
- Accessibility labels exist.
- No unnecessary permissions are introduced.
- No sensitive information is transmitted.
- Homebrew remains the source of truth.
- No duplicate package-management logic has been introduced.

---

# 66. MVP Roadmap

## Phase 1 — Foundation

Implement:

- Native SwiftUI macOS application
- Homebrew detection
- Brew executable discovery
- Basic navigation
- Brew command runner

---

## Phase 2 — Installed Packages

Implement:

- Installed Formulae
- Installed Casks
- Search
- Package details
- Versions
- Refresh

---

## Phase 3 — Discovery

Implement:

- Homebrew search
- Formula/Cask distinction
- Package detail
- Install

---

## Phase 4 — Updates

Implement:

- `brew update`
- Outdated packages
- Individual upgrade
- Upgrade all
- Update status

---

## Phase 5 — Package Management

Implement:

- Uninstall
- Operation logs
- Error handling
- Progress states
- Refresh after mutation

---

## Phase 6 — Services

Implement:

- Homebrew services
- Start
- Stop
- Restart
- Service status

---

## Phase 7 — Polish

Implement:

- Keyboard navigation
- Accessibility
- Notifications
- Settings
- Menu-bar companion
- Diagnostics

---

# 67. Non-Goals

The following are explicitly outside the MVP:

- Replacing Homebrew
- Implementing a package registry
- Custom dependency resolution
- Remote package management
- Linux support
- Windows support
- MacPorts support
- Nix support
- Automatic shell configuration
- Automatic software installation without confirmation
- System cleaning unrelated to Homebrew
- Antivirus functionality
- Network monitoring

---

# 68. Guiding Product Question

For every feature, ask:

> "Does this make managing Homebrew on macOS significantly easier than using the terminal?"

If not, do not add it.

The ideal workflow is:

```text
I need a developer tool
        ↓
Open Brewery
        ↓
Search
        ↓
Inspect
        ↓
Install
        ↓
Done
```

For existing packages:

```text
Open Brewery
        ↓
See Updates
        ↓
Upgrade
        ↓
Done
```

For local services:

```text
Open Brewery
        ↓
Services
        ↓
PostgreSQL
        ↓
Start / Stop / Restart
```

Brewery should make Homebrew **visible, understandable, and easy to control** without hiding the fact that Homebrew is doing the actual package management.
