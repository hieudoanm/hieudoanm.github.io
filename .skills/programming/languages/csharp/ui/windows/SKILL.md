---
name: windows-best-practices
description: Best practices for building Windows desktop apps with the Windows App SDK and WinUI 3 — architecture, MVVM, x:Bind, packaging, windowing, and testing. Use when creating, structuring, or reviewing a Windows app in C#.
---

# Windows App Development

Windows desktop development in C# has converged on the **Windows App SDK**: a NuGet-distributed framework providing WinUI 3, the modern Fluent UI, plus modern windowing, notifications, and AI APIs. It is the recommended platform for new Windows apps, and it can be adopted by existing WPF, Windows Forms, and Win32 apps for platform features without a rewrite. Practical Windows app work leans on **MVVM with the CommunityToolkit source generators, `x:Bind` instead of `{Binding}`, a real DI container, and a deliberate packaging decision**.

_Verified against Windows App SDK 2.4.0 (stable, Aug 2026), .NET 10 LTS, C# 14. .NET 11 RC1 with C# 15 shipped Sept 2026._

---

## 1. Choosing the Stack

- **New app: WinUI 3 via Windows App SDK.** It is the only Microsoft first-party desktop stack that is getting new platform features, and it is the one Microsoft designs against.
- **Existing WPF or Windows Forms app: keep it.** Both are fully supported and run on .NET. Adopt the Windows App SDK for the platform features you need — windowing, notifications, DPI, app lifecycle — without rewriting the UI. A rewrite is a multi-quarter risk that is almost never justified on its own.
- **MAUI for cross-platform, WinUI for Windows-only.** If your product is cross-platform, MAUI is the deliberate choice and the trade is a less capable desktop UI; do not drift back to WinUI for one screen.
- **Do not start new work on UWP.** It is in maintenance and cannot satisfy modern enterprise and store requirements.

---

## 2. Version & Targeting

- **Three release channels**: stable, preview, experimental. Ship stable. Preview APIs change before they land in stable; experimental APIs can be removed outright.
- **Windows App SDK 2.0 introduced semantic versioning**, so minor bumps are additive. On 1.x they were not — a 1.7 → 1.8 upgrade could break your XAML. If you are still on 1.x, plan the 2.x move deliberately.
- **2.3.1 added `XamlOptionalChanges`**, an explicit opt-in for the remaining optional breaking changes. It is how you take a behavioural change before the runtime forces it.
- **The minimum supported OS is Windows 10 1809 (build 17763)** for 2.x. The Windows App SDK version is independent of both the Windows SDK and the OS.
- **Compile against the newest Windows SDK you can, target the oldest OS you must.** Set the TFM to the SDK you develop against and `SupportedOSPlatformVersion` to your real minimum — the platform analyzer then warns you at every call site that needs a runtime check.
- **`.csproj` TFM, not a standalone installer:** `net10.0-windows10.0.26100.0`.

```xml
<PropertyGroup>
  <TargetFramework>net10.0-windows10.0.26100.0</TargetFramework>
  <SupportedOSPlatformVersion>10.0.19041.0</SupportedOSPlatformVersion>
  <UseWinUI>true</UseWinUI>
</PropertyGroup>
<ItemGroup>
  <PackageReference Include="Microsoft.WindowsAppSDK" Version="2.4.0" />
</ItemGroup>
```

---

## 3. Architecture

- **Four layers, dependencies pointing down only:** Views (XAML + code-behind, no business logic) → ViewModels (commands, presentation state) → Services (business rules, orchestration) → Repositories (data access, caching).
- **A ViewModel must never reference a UI type** — no `Page`, `Window`, `ContentDialog`, or `DispatcherQueue`. That single rule is what makes the layer testable without a window.
- **Put ViewModels and Services in a separate class library** so the test project can reference them without pulling in the WinUI project. A test project that references a WinUI app project inherits its build complexity for no benefit.
- **WinUI 3 has no built-in DI container.** Add `Microsoft.Extensions.DependencyInjection` and `Microsoft.Extensions.Hosting`, build the host in `App.xaml.cs`, and resolve through a small `App.GetService<T>()` helper.
- **Fail loudly on an unregistered service.** The standard helper throws with the missing type name; do not return `null` and let a `NullReferenceException` surface three pages later.
- **Verify every registration by navigating to every page** during development. DI failures in WinUI are runtime, not build-time, so nothing else will catch them.
- **Version and migrate your local store at startup.** Desktop apps live for years; a settings file or SQLite schema with a version and an ordered migration chain is not optional.

---

## 4. MVVM

- **Use `CommunityToolkit.Mvvm`.** `ObservableObject` plus the `[ObservableProperty]` and `[RelayCommand]` source generators replace the hand-written `INotifyPropertyChanged` and `ICommand` boilerplate, and because generation is compile-time there is no reflection cost.
- **`ICommand` has real per-instance overhead** — the `CanExecuteChanged` listener plus allocations on every binding. For a list with hundreds of rows, prefer code-behind event handlers that call methods on the view model, and manage `IsEnabled` yourself.
- **`Messenger` is for cross-cutting notifications**, not for parent-to-child data. Anything that looks like a message is usually a missing abstraction.
- **Model loading, error, and empty as distinct states**, not an ad-hoc nullable. `ContentDialog` for errors belongs in the view, driven by a property the view model sets.

```csharp
public partial class NotesViewModel : ObservableObject
{
    [ObservableProperty] private string _query = string.Empty;
    [ObservableProperty] private bool _isLoading;
    [ObservableProperty] private string? _error;

    private readonly INotesRepository _repo;

    public NotesViewModel(INotesRepository repo) => _repo = repo;

    [RelayCommand]
    private async Task SearchAsync(CancellationToken ct)
    {
        IsLoading = true;
        Error = null;
        try { Results = await _repo.SearchAsync(Query, ct); }
        catch (OperationCanceledException) { throw; }
        catch (Exception ex) { Error = ex.Message; }
        finally { IsLoading = false; }
    }
}
```

---

## 5. XAML & Performance

- **Use `x:Bind`, not `{Binding}`.** `{Binding}` resolves through reflection and boxing at runtime and allocates on every update; `x:Bind` is compiled at build time, so a renamed property is a compile error instead of a silent empty field.
- **`x:Bind` does not update automatically when a source property changes** unless you pass `Mode=OneWay` explicitly for non-`INotifyPropertyChanged` sources, or use `x:Bind` with a one-way path from an observable property. This is a feature, not a bug — it makes the data flow visible.
- **`x:Load="False"` defers a control out of the startup tree.** Use it for anything that is often not visible.
- **Split page modes into separate `UserControl`s** instead of binding `Visibility` to toggle one big tree. A collapsed tree is still constructed, parsed, and in the working set.
- **Backdrops: `MicaBackdrop` for the window, `AcrylicBackdrop` only for transient surfaces.** Both adapt to theme and are cheap; a hand-rolled blur is neither.
- **Custom title bars go through `AppWindow` / `ExtendsContentIntoTitleBar`**, not a Win32 `HWND` hack. Same for multi-window and window placement.
- **Do not block the UI thread.** Everything off it goes to a `Task`, and every one takes a `CancellationToken`. WinUI enforces the UI thread; it does not stop you from starving it.

---

## 6. Packaging & Distribution

- **This is the first decision, not the last.** The shape determines what platform APIs you can use at all.
- **Packaged (MSIX)** — `WindowsPackageType=MSIX`, `Package.appxManifest` declaring identity, capabilities, and file-type associations, signed via `PackageCertificateThumbprint` or `PackageCertificateKeyFile`. Required for the Microsoft Store, and the cleanest enterprise sideload story.
- **Unpackaged** — `WindowsPackageType=None`, `EnableMsixTooling=false`. Simplest direct-download story, and the only model currently supported for in-process UI testing.
- **Package identity is not cosmetic.** Background tasks, share targets, and the modern `AppNotification` APIs all require it. An unpackaged app cannot call them.
- **Self-contained deployment** (`WindowsAppSDKSelfContained=true`) bundles the Windows App Runtime with your binary, removing the prerequisite installer at the cost of size. Framework-dependent is smaller and needs the bootstrapper documented in your install notes.
- **Always set an explicit `RuntimeIdentifier`** — `win-x64;win-arm64`. `AnyCPU` is rejected by self-contained builds, and listing x64 first makes an unqualified `dotnet build` correct on an x64 dev machine.
- **Single-file publishing** (`PublishSingleFile` + `IncludeNativeLibrariesForSelfExtract`) gives one executable that self-extracts on first launch — a slower start in exchange for one artifact.
- **Never commit the signing certificate or its password.** Source them from a CI secret store.

---

## 7. Storage, Settings & Security

- **Packaged: `ApplicationData.Current.LocalSettings`** for key-value preferences. Windows App SDK 2.2 added `ApplicationData` for unpackaged apps — use it rather than hand-rolling a path.
- **Unpackaged: a JSON file under `SpecialFolder.LocalApplicationData`**, in a folder named for your app. Create the directory before writing, or first-run fails.
- **Encrypt anything sensitive with DPAPI**, via `DataProtectionProvider` with `ProtectKeysWithDpApi()` and an explicit `SetApplicationName`. Plaintext settings files are a common and entirely avoidable finding.
- **Use `Microsoft.Windows.Storage.Pickers` for file open/save dialogs** in WinUI 3. The classic `FileOpenPicker` requires package identity; the newer picker does not.
- **Assume the user can reach the file system.** Never gate a feature on the app's install directory being unwritable.
- **Cache for offline use deliberately.** Read local first, refresh in the background, and fall back to cache on `HttpRequestException`. Desktop users lose connectivity mid-task constantly.

---

## 8. Testing

- **Unit-test ViewModels and services on the plain .NET test project** with fakes for repositories and HTTP. Most of an app's logic lives there and none of it needs a window.
- **`Microsoft.Testing.Platform` is the modern runner.** Set `EnableMSTestRunner=true` and `GenerateTestingPlatformEntryPoint=false` so WinUI keeps ownership of the entry point.
- **Build the in-process UI test app unpackaged** — `WindowsPackageType=None`, `EnableMsixTooling=false`. It needs no package registration and no Developer Mode, and it is the supported path.
- **Use `[UITestMethod]` for anything touching a WinUI object** so MSTest schedules it on the dispatcher queue. A plain `[TestMethod]` does not run on the UI thread — use it for logic only.
- **The packaged full-trust in-process test host is still experimental** and was not publicly released as of August 2026. Use VSTest for packaged full-trust and for any AppContainer/UWP host.
- **`dotnet run`, not `dotnet exec`.** WinUI resolves PRI resources relative to the process path, and `dotnet exec` breaks that — the classic "it builds but won't start" cause.
- **Architecture test the layer rule.** A test that fails when a ViewModel assembly references a WinUI type keeps the boundary honest as the team grows.

---

## 9. AI & Newer Platform APIs

- **The `Microsoft.WindowsAppSDK.AI` package exposes `LanguageModel`** (Phi Silica, Foundry Local) for on-device inference — no network, no data leaving the machine, and a graceful unavailable path.
- **2.3.1 added schema-constrained structured JSON output** for `LanguageModel`, which is what turns a prompt into a typed result instead of a string you parse hopefully.
- **2.4.0 sharpened `LanguageModelResponseStatus`** with `UnsupportedLanguage` and `LanguageMismatch`, so an unsupported language is distinguishable from a generic failure. Branch on it; do not surface a raw error.
- **Haptics (`Windows.Devices.Haptics`) and touchpad panning landed in 2.4**; **Video Super Resolution and unpackaged `ApplicationData` in 2.2**.
- **Ink (`InkCanvas`, `InkToolbar`, `InkPresenter`) is 2.4 _experimental_ only.** Do not ship a dependency on it.
- **Always implement the model-unavailable path.** On-device AI is absent on much of the installed base, and an app that assumes it exists is broken for those users.
- **Ship a remote fallback behind a feature flag** if AI is load-bearing, so you can turn it off without shipping a new build.

---

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
