# Windows App Development: Validation Plan

Use this plan to verify work guided by [Windows App Development](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with C# and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Use x:Bind, not {Binding}.** {Binding} resolves through reflection and boxing at runtime and allocates on every update; x:Bind is compiled at build time, so a renamed property is a compile error instead of a silent empty field
- [ ] **x:Bind does not update automatically when a source property changes** unless you pass Mode=OneWay explicitly for non-INotifyPropertyChanged sources, or use x:Bind with a one-way path from an observable property. This is a feature, not a bug — it makes the data flow visible
- [ ] **x:Load="False" defers a control out of the startup tree.** Use it for anything that is often not visible
- [ ] **Split page modes into separate UserControls** instead of binding Visibility to toggle one big tree. A collapsed tree is still constructed, parsed, and in the working set
- [ ] **Backdrops: MicaBackdrop for the window, AcrylicBackdrop only for transient surfaces.** Both adapt to theme and are cheap; a hand-rolled blur is neither
- [ ] **Custom title bars go through AppWindow / ExtendsContentIntoTitleBar**, not a Win32 HWND hack. Same for multi-window and window placement
- [ ] **Do not block the UI thread.** Everything off it goes to a Task, and every one takes a CancellationToken. WinUI enforces the UI thread; it does not stop you from starving it
- [ ] **Packaged: ApplicationData.Current.LocalSettings** for key-value preferences. Windows App SDK 2.2 added ApplicationData for unpackaged apps — use it rather than hand-rolling a path
- [ ] **Unpackaged: a JSON file under SpecialFolder.LocalApplicationData**, in a folder named for your app. Create the directory before writing, or first-run fails
- [ ] **Encrypt anything sensitive with DPAPI**, via DataProtectionProvider with ProtectKeysWithDpApi() and an explicit SetApplicationName. Plaintext settings files are a common and entirely avoidable finding

## Test record

| Check | Expected result | Evidence / command | Outcome |
|---|---|---|---|
| Primary success path | Meets the stated acceptance criteria |  |  |
| Boundary or failure case | Behaves safely and predictably |  |  |
| Regression / compatibility | Existing required behavior remains intact |  |  |

## Release decision

- Result: <!-- pass / pass with known limitations / fail -->
- Known limitations:
- Follow-up owner and date:
