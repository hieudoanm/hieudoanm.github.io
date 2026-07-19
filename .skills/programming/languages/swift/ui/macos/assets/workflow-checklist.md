# macOS Development: Workflow Checklist

A practical run sheet for applying [macOS Development](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Target, Sandbox & Distribution: **Enable the App Sandbox.** The Mac App Store requires it, and it is the single biggest security decision in a Mac app
- [ ] 1. Target, Sandbox & Distribution: **Request the narrowest entitlements that work.** Camera, microphone, location, and file access each add a user-consent prompt; only ask for what ships
- [ ] 2. App Structure & Scenes: **The App protocol is the app.** Declare WindowGroup, Window, Settings, MenuBarExtra, and DocumentGroup there — no main.swift boilerplate
- [ ] 2. App Structure & Scenes: **Give every window a stable id.** WindowGroup(id:for:) plus @Environment(\.openWindow) is how you reopen a specific window onto specific data; stringly-typed global state is not
- [ ] 3. Windows: **A Mac user expects windows to be independent.** Two windows on different documents must not share mutable state by accident
- [ ] 3. Windows: **Model document-backed state per window** via WindowGroup(id:for:) with a Codable route, so reopening restores the right content
- [ ] 4. Navigation & Data Presentation: **NavigationSplitView with .balanced or .prominentDetail** is the standard three-pane shape; a List(selection:) sidebar is the state driver
- [ ] 4. Navigation & Data Presentation: **TabView with .tabViewStyle(.sidebarAdaptable)** gives a modern sidebar-tab hybrid for top-level sections
- [ ] 5. Menus & Commands: **Every meaningful action belongs in the menu bar** with a keyboard shortcut. A Mac app where "Export" is reachable only by a toolbar button is incomplete
- [ ] 5. Menus & Commands: **Use Commands/CommandGroup to replace or add items** — .newItem, .undoRedo, .pasteboard, .sidebar, .toolbar — instead of rebuilding standard menus

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
