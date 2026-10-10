# Workflow notes

Focused reference for **android-studio-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 3. Project & Module Structure

- **One `app` module, plus library modules only when the boundary earns it.** Every module costs build time, and Studio's indexer degrades as the module count grows.
- **Use `app/src/main`, `debug`, and `release` source sets deliberately.** `debug`-only manifest entries (cleartext traffic, the `applicationIdSuffix`) keep test config out of release.
- **Keep the `AndroidManifest.xml` minimal and let the manifest merger do its job.** Every module declaring `<application>` attributes is a merge-conflict source.
- **Namespace replaces the package attribute** on `application` (AGP 8+). Set it per module and do not also set `package` in the manifest — they must agree.
- **Prefer view binding or Compose over `findViewById`**, and generate it in the module it is used in. Data binding is legacy unless you need two-way binding with XML.
- **A version catalog and a convention plugin** are the two investments that make a multi-module project maintainable; do them early, not after the third copy-pasted `build.gradle.kts`.

---

## 4. Editor & Inspections

- **The Layout Editor is a genuine WYSIWYG editor**, but the XML is the source of truth — know how to fix a constraint by hand.
- **Compose previews are live and typed.** A preview that will not compile is a real error in that composable; `@Preview` bodies are compiled by default in debug builds.
- **Parameterised previews let you render the same composable across themes, font scales, and locales** — the fastest way to catch a layout that only works in English at default text size.
- **Use the Layout Inspector to see the live view hierarchy** and its bounds, rather than inferring depth from screenshots.
- **Enable `@Preview` and lint checks in the build, not just the IDE**, so they run in CI. Studio's inspections are a superset of what `lint` will catch.
- **The "Code Vision" inspections are opt-in per setting** and useful (`@Preview`, parameter names), but keep the important ones as lint/compiler checks so they cannot be turned off by one developer.
- **Turn on "Apply code changes without restart"** (Apply Changes) for the Compose/Hot Reload loop; it is materially faster than a full rebuild and is Studio's best iteration feature.

---

## 5. Emulator & Devices

- **Use a physical device for anything performance-related.** The emulator runs on your host CPU and its timing, thermal behaviour, and graphics driver are not representative.
- **Create AVDs per API level you support and keep a hardware profile per form factor** (phone, foldable, tablet). One "Pixel 8" AVD does not cover a foldable's posture changes.
- **Test edge-to-edge and insets on a device with a cutout**, not a rectangular emulator image.
- **`adb` is the real interface** — `adb install -r`, `adb logcat`, `adb shell am start`, `adb devices`. Learn it; the IDE buttons are conveniences over it.
- **`adb logcat` with a package filter beats the IDE Logcat pane** for anything you intend to read closely or grep.
- **Cold boot vs quick boot, and snapshots, change first-launch behaviour** — a test that only passes after a snapshot restore is a test you do not trust.
- **For CI, use a managed device or a cloud device farm** rather than trying to keep an emulator alive in a container.

```bash
adb devices -l
adb install -r app/build/outputs/apk/debug/app-debug.apk
adb logcat --pid=$(adb shell pidof com.example.app)
adb shell am start -n com.example.app/.MainActivity
```

---

## 6. Profiling & Debugging
