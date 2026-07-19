# Review checklist

Focused reference for **ios-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## Common Pitfalls

- **Branching on `userInterfaceIdiom` or screen size** — use size classes and adaptive containers; idiom is no longer meaningful.
- **Reading `UIScreen.main`** — wrong under iPhone Mirroring, iPad multitasking, and external displays.
- **Requesting permissions at launch**, or without a denial path.
- **A missing usage description key** — guaranteed crash on first use.
- **Assuming a long-running background task will finish.** It will not.
- **Glassifying every view**, or putting a solid background behind a glass surface.
- **Full-resolution images in lists** — memory spikes and scroll drops.
- **Shipping without a Privacy Manifest**, which is now an upload rejection.

---

## General Rules of Thumb

- Scene lifecycle, size classes, and Dynamic Type over any device or screen assumption.
- Request permissions in context, at the moment of need, with every outcome handled.
- Background work is deferred by design: schedule, don't block.
- `UserDefaults` for preferences, a real store for data, Keychain for secrets.
- Prefer system components over custom chrome so Liquid Glass works for free.
- Verify on the oldest supported OS, on a real low-end device, before calling it done.

---

## Quick-Start Checklist

- [ ] `UIScene` lifecycle adopted; no `UIScreen.main` or idiom checks anywhere
- [ ] Usage description keys present for every requested permission; limited access handled
- [ ] `PrivacyInfo.xcprivacy` shipped and consistent with privacy labels
- [ ] Background work via `BGTaskScheduler` with `BGTaskSchedulerPermittedIdentifiers` set
- [ ] Secrets in Keychain; preferences in `AppStorage`; structured data in SwiftData/Core Data
- [ ] `ViewThatFits` / size classes drive layout; Dynamic Type verified at accessibility sizes
- [ ] Glass confined to floating controls, grouped in `GlassEffectContainer`, interactive only when tappable
- [ ] Images downsampled; launch profiled in Release; no per-frame allocation in `body`
- [ ] Tested on the oldest supported iOS, small and large iPhone, and under Reduce Motion/Transparency
- [ ] TestFlight pass complete; export compliance answered; staged rollout enabled
