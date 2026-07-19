# Implementation notes

Focused reference for **axios-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```ts
try {
  return await getOrder(id);
} catch (err) {
  if (axios.isAxiosError(err) && err.response?.status === 404) {
    throw new NotFoundError();
  }
  throw err;
}
```

- **`axios.isAxiosError` narrows; distinguish network vs HTTP errors (`err.code`/`err.request`/`err.response`).**
- **Never swallow — convert errors into the domain shape for the UI layer.**

---

## 5. Abort & Cancellation

- **`AbortController` signal for requests tied to component lifecycles (no setState-after-unmount):**

```ts
const controller = new AbortController();
api.get("/slow", { signal: controller.signal });
controller.abort();
```

- **The signal passed in request; on unmount abort.**
- **Cancellation errors caught (not treated as failures).**

---

## 6. Testing

- **Mock via `axios-mock-adapter` or intercept the adapter; assert instance-level behavior:**
