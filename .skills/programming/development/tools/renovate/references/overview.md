# Overview

Focused reference for **renovate-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Renovate

Renovate is a dependency-update bot that opens pull requests across every ecosystem, and its real value is not the updates themselves — plenty of bots do that — but **the policy you encode about which updates group together, which merge automatically, and when a major is acceptable**. A Renovate config is a statement of your team's risk posture. Practical Renovate work is about **separating low-risk from high-risk updates so the safe ones stop costing attention, keeping the bot's own config reviewable, and never letting an automerge hide a breaking change**. Security scanning is complementary; see snyk.md.

_Verified against Renovate's 2026 releases. The configuration schema evolves; validate against the current JSON schema after editing._

---

## 1. The Core Distinction: Update Types

- **Renovate classifies every update, and the classification drives everything else** — grouping, schedule, automerge, and labels. Get it right and the rest is policy; get it wrong and a major merge becomes routine.
- **The four levels, and what they mean in practice:**
  - `digest` — a rebuilt image or pinned commit moved. Usually behaviour-identical; the safest class.
  - `patch` — bug fixes, no API change. Usually safe to merge unattended, once tests pass.
  - `minor` — additive changes, new features. Usually safe, but watch for a tool that changes defaults in a minor.
  - `major` — breaking changes. Never automerge; this is a human reading a changelog.
- **Severity is a security attribute, not a change-size attribute.** Renovate's vulnerability alerts carry a severity from the advisory, and they are handled separately from routine updates.
- **A tool that changes a default in a minor is a real category failure** — the only defence is requiring tests to actually cover the behaviour that changed.

---
