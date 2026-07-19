# Workflow notes

Focused reference for **github-packages-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 2. Package Setup

- **Scoped names clean (`@myorg/lib`); `name`/`version`/`repository` consistent:**

```json
{
  "name": "@myorg/analytics",
  "version": "1.2.3",
  "publishConfig": { "access": "restricted", "registry": "https://npm.pkg.github.com" },
  "files": ["dist/"]
}
```

- **`access: "restricted"` for private default; `"public"` only for intentional OS.**
- **`files` whitelist dist; `prepublishOnly` runs checks; headless installed packs.**

---

## 3. Publishing in CI

- **Publish workflow — dispatch or tag-driven, build + auth + publish:**

```yaml
name: publish
on:
  push:
    tags: [ "v*" ]
jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { registry-url: "https://npm.pkg.github.com" }
      - run: npm ci
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
