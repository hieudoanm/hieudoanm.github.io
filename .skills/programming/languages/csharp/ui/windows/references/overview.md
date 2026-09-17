# Overview

Focused reference for **windows-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
