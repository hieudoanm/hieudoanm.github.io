# Implementation notes

Focused reference for **npm-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```json
{
  "name": "repo",
  "workspaces": ["packages/*"]
}
```

- **Secondary package.json files consistent; `npm install` at root; cross-workspace files resolved.**
- **`--workspace` targeting for global builds; dependency honesty per package.**

---

## 5. Publishing

- **`npm publish` from a clean artifact — `files` whitelist, `prepublishOnly` run tests:**

```json
"files": ["dist/"], "prepublishOnly": "npm run check"
```

- **NPM granule controls (@scope publishing via `publishConfig.access`/auth token as env, never inline).**
- **Version bump via `npm version` ceremonies; tag flows (`latest`/`beta`) explicit.**

---

## 6. Security & Audits

- **`npm audit` wired into CI (fail on `high`+); `npm outdated` quarterly:**
