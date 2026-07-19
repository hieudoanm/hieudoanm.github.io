# iOS Development: Validation Plan

Use this plan to verify work guided by [iOS Development](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Swift and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Measure launch with Instruments**; a cold start over ~400ms reads as jank. Defer non-essential initialization past first frame
- [ ] **Downsample images to the display size** — a full-resolution UIImage in a thumbnail is the most common iOS memory bug
- [ ] **Keep view bodies pure and cheap.** A body that reads Date() or allocates a formatter invalidates on every pass
- [ ] **Offload with actors or a background task**, never with DispatchQueue.global() plus a data race on a @State
- [ ] **Profile on a real low-end device in Release.** Simulator and Debug builds hide most of what matters
- [ ] **Branching on userInterfaceIdiom or screen size** — use size classes and adaptive containers; idiom is no longer meaningful
- [ ] **Reading UIScreen.main** — wrong under iPhone Mirroring, iPad multitasking, and external displays
- [ ] **Requesting permissions at launch**, or without a denial path
- [ ] **A missing usage description key** — guaranteed crash on first use
- [ ] **Assuming a long-running background task will finish.** It will not

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
