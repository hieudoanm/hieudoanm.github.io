# Implementation notes

Focused reference for **playwright-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Seed data via API/`request` fixture**, not via the UI.

---

## 4. Network & Storage

- **`page.route` for API stubs when the backend is heavy; otherwise run the real app + seeded data:**

```ts
await page.route("**/api/user", route => route.fulfill({ json: fakeUser }));
```

- **`storageState` reuses authenticated sessions** — login once, share state across specs:

```ts
test.use({ storageState: "states/authenticated.json" });
```

- **Deterministic time** via `page.clock`/`clock` for date-sensitive scenes.

---

## 5. Structure & CI
