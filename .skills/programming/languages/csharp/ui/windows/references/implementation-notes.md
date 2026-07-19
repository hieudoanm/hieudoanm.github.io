# Implementation notes

Focused reference for **windows-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
