# Overview

Focused reference for **pycharm-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# PyCharm

PyCharm is JetBrains' Python IDE, with the deepest Python tooling in the JetBrains catalogue: refactorings that understand the language, a scientific-tooling stack (Notebook, NumPy/pandas support, Jupyter), and a built-in profiler. As of **2025.1 there is one PyCharm**, replacing the separate Community and Professional editions — the free tier is limited by a non-commercial-use condition rather than by features. Practical PyCharm work is about **letting the project's own environment and test runner own the workflow, and never letting the IDE's interpreter silently become a second source of truth**. Language rules live in python.md.

_Verified against PyCharm 2026.2.3 (September 2026) with Python 3.13 and pytest 8.x. The unified edition shipped 2025-04-16 with the 2025.1 release._

---

## 1. Editions & the Unified Release

- **One PyCharm, two tiers.** The free tier requires a non-commercial licence; the paid tier is for commercial use. Feature gating between tiers is narrower than the old Community/Professional split.
- **Check the licence state before relying on a feature.** A free-tier IDE in a commercial context is a licensing problem, not a configuration problem.
- **Non-commercial licences are per user and require periodic verification.** A lapsed one reverts the IDE to the free tier, which can disable the scientific-tooling plugins mid-project.
- **The IDE version is not the Python version.** The interpreter is selected per project from the environment, and is the thing every other Python feature reads from.

---

## 2. Environment Management
