# 5. Operations and Deployment

Focused reference for **fauna**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 5. Operations and Deployment

- It is a managed service — no installation; use the web dashboard or CLI (`fauna` npm).
- Driver: official `fauna-js` (ESM, `FQL`, or legacy `fql-lite`).
- Deploy code with `fauna`/`fauna shell`; use respitory connection via the dashboard env vars.
- Backups: Fauna has automatic rollback/windowing; configure retention settings.
