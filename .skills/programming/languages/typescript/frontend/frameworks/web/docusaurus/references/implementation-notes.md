# Implementation notes

Focused reference for **docusaurus-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 3. Versioning

- **`docker run` version bumps** — `npm run docusaurus docs:version 2.0` freezes a snapshot and creates a versioned docset.
- **`versioned docs/`** — each version gets its own `versioned_docs/...` directory; don't edit shared docs across versions.
- **`sidebar` per version** — `sidebars.js` can export different sidebar configs per version.

---

## 4. Configuration
