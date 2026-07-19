# Implementation notes

Focused reference for **xcode-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **DerivedData is a build cache and must never be committed.** It is large, machine-specific, and regenerable.
- **The GUI path (`~/Library/Developer/Xcode/DerivedData`) is per-project-named and per-user**; a `-derivedDataPath` flag gives you a predictable location, which is what CI and tooling want.
- **"Clean Build Folder" is not a real clean.** It clears intermediate products but leaves module caches; delete the directory when in doubt.
- **Index-While-Building (Index Store) is the biggest startup-cost lever.** If typing lags, the index is stale or huge; the Build pane's "Index Store" indicator tells you.
- **Keep `DerivedData` off your backup and off iCloud.** Both corrupt or throttle it.

```bash
xcodebuild -project App.xcodeproj -scheme App \
  -derivedDataPath .build/dd -destination 'platform=iOS Simulator,name=iPhone 17' build
```

---

## 7. Debugging

- **LLDB is the debugger and it is scriptable.** `po` for a quick look, `p` for the address, `expression` for evaluation, and `thread backtrace all` when you have lost the plot.
- **Symbolic breakpoints beat line breakpoints for crashes.** `objc_exception_throw`, `UIViewAlertForUnsatisfiableConstraints`, and `swift_willThrow` find the whole class of bug that a line break never will.
- **The exception breakpoint in Debug is nearly free and worth always on.** It is how a "silent" nil-coalescing crash becomes an actual stop.
- **View Debugger** (`debugView()`) is a debugger attached at runtime — it catches view hierarchy and rendering problems that look like layout bugs in the simulator.
- **Memory Graph, Allocations, and Leaks** answer the three distinct questions (retain cycles, growth, unreachable). Leaks is the one that turns on for you.
- **Instruments' Time Profiler** is the ground truth for "why is this slow". The signpost in the simulator is a preview; the Time Profiler is the measurement.
- **Check the report navigator after every launch.** Crashes and hangs are collected whether or not you were watching.

```lldb
(lldb) po viewModel.items.count
(lldb) thread backtrace all
(lldb) expression -l objc -O -- [UIWindow keyWindow]
```

---

## 8. Previews & Refactoring

- **SwiftUI previews are a live compile, not a screenshot.** A type error in the previewed view is a real error in that view.
- **Use `#Preview` and keep previews at the bottom of a file**, or in a `Previews` folder excluded from the release target.
- **Preview sample data in one place.** A `SampleData` enum or a `PreviewProvider` shared across views stops each preview inventing its own inconsistent model.
- **The refactor menu is Roslyn-backed and reliable** for rename (it updates strings, XIB outlets, and Swift name references), extract, and convert closures to async.
- **A project-wide rename touches `project.pbxproj` too.** Expect the generated file to churn; with a project generator it does not matter.
- **Do not use "Find and Replace" for a type rename.** It misses storyboard XML and localised strings that the refactor tool handles.

---

## 9. Command Line & CI

- **`xcodebuild` is the same build the IDE runs.** If it works in the terminal, the IDE is not the problem; if it fails there, the GUI is hiding nothing.
- **Always pass `-destination` explicitly.** Without it, `xcodebuild` picks a default and a multi-destination scheme fails unpredictably.
- **`xcodebuild test` needs a booted simulator or a device UDID.** Use `-destination 'platform=iOS Simulator,name=iPhone 17,OS=latest'`.
- **Sign CI with an ephemeral certificate** and set `CODE_SIGNING_ALLOWED=NO` for simulator-only jobs — the fastest way to stop a build failing on a machine without a keychain.
- **Pipe through `xcbeautify` or `xcpretty`.** Raw `xcodebuild` output is unreadable in CI logs; the pretty-printer also emits JUnit XML.
- **Archive separately from build.** `xcodebuild -archivePath` produces the `.xcarchive` you then export from; do not try to reuse a plain build's products.
