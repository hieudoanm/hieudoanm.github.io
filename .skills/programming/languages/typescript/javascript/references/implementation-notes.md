# Implementation notes

Focused reference for **javascript-best-practices**, excerpted from [SKILL.md](../../SKILL.md). The skill file remains the canonical guide.

## 4. Errors

- **Throw descriptive Errors; subclass for domain errors (`class RateLimitError extends Error`).**
- **Catch and rethrow with context (cause chains) — don't swallow types.**
- **Validate inputs at boundaries (functions/APIs); assert invariants early with clear messages.**

---

## 5. DOM & Browser JS

- **Query once, use listeners; never append inline handlers:**

```js
const btn = document.querySelector("[data-action='save']");
btn?.addEventListener("click", onSave);   // defer work off micro-task storms
```

- **`event.preventDefault()` intentionally; extend APIs with `export`, not globals.**
- **Use `requestAnimationFrame`/`setTimeout` for heavy work; profile listeners (`performance.now`).**
- **Never set `innerHTML` from untrusted data — `textContent`/sanitization for dynamic strings.**

---

## 6. Project & Tooling
