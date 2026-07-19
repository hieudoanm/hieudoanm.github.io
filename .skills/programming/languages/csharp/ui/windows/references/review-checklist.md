# Review checklist

Focused reference for **windows-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 10. Common Pitfalls

- **`{Binding}` where `x:Bind` works**, giving up compiled bindings, reflection, and build-time rename checking.
- **A `Visibility`-toggled mega-tree** instead of `x:Load="False"` and separate `UserControl`s.
- **A ViewModel referencing `Page`, `Window`, or `ContentDialog`**, which makes the layer untestable and the app unportable.
- **Hand-written `INotifyPropertyChanged` and `ICommand`** when the MVVM source generators do it at compile time.
- **Returning `null` from a service locator**, converting a registration mistake into a `NullReferenceException` three pages away.
- **Leaving `AnyCPU`**, which self-contained builds reject.
- **Choosing the packaging model after writing the features**, then discovering you cannot call the notification APIs.
- **Committing a signing certificate or password.**
- **`dotnet exec` instead of `dotnet run`**, producing a PRI resolution failure that looks like a corrupt build.
- **Shipping preview or experimental Windows App SDK packages** to production.
- **Building an in-process packaged UI test host** against the experimental extension that was not publicly released.
- **Treating UWP as a current packaging option** for a WinUI 3 desktop app.

---

## General Rules of Thumb

- WinUI 3 for new Windows apps; keep WPF and Windows Forms where they are and borrow platform features.
- Stable channel, semantic versioning from 2.0, newest Windows SDK in the TFM, honest `SupportedOSPlatformVersion`.
- Views → ViewModels → Services → Repositories, dependencies downward, UI types out of ViewModels.
- `CommunityToolkit.Mvvm` generators over hand-rolled MVVM; `x:Bind` over `{Binding}`; `x:Load="False"` over `Visibility`.
- MSIX if you need package identity or Store/enterprise distribution; unpackaged if you need simple download or UI tests.
- DPAPI for secrets, local-first caching for offline, and an unavailable path for every AI feature.

---

## Quick-Start Checklist

- [ ] Stack chosen deliberately — WinUI 3 new, WPF/WinForms preserved, MAUI only for cross-platform
- [ ] Windows App SDK on the **stable** channel; no preview or experimental packages in Release
- [ ] TFM set to the newest Windows SDK, `SupportedOSPlatformVersion` to the real minimum OS
- [ ] Layers split, with ViewModels and Services in a class library free of WinUI references
- [ ] DI container built in `App.xaml.cs`; every registration verified by navigating every page
- [ ] `CommunityToolkit.Mvvm` (`[ObservableProperty]`, `[RelayCommand]`) in use; no hand-rolled `INotifyPropertyChanged`
- [ ] `x:Bind` throughout; `x:Load="False"` on rarely-visible controls; page modes split into `UserControl`s
- [ ] Every `await` passes a `CancellationToken`; nothing blocking the UI thread
- [ ] Packaging model decided first; explicit `RuntimeIdentifier`; MSIX signed from a secret store
- [ ] Settings in `ApplicationData` (packaged) or LocalAppData JSON (unpackaged); secrets via DPAPI
- [ ] ViewModels and services unit-tested with fakes; architecture test enforcing the layer rule
- [ ] In-process UI tests use the **unpackaged** MTP model with `[UITestMethod]`; VSTest for packaged hosts
- [ ] Run with `dotnet run`, not `dotnet exec`
- [ ] AI features have a local-unavailable path and a remote fallback behind a feature flag
