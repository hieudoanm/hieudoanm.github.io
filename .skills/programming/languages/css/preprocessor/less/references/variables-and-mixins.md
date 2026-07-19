# 2. Variables and Mixins

Focused reference for **less**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Variables and Mixins

- Variables: `@brand: #4b8; .btn { color: @brand; }` (lazy evaluation, scoped).
- Mixins: reusable style blocks with arguments, defaults, and `;variadic(...)`:
  `.border-radius(@r: 4px) { border-radius: @r; }` then `.card { .border-radius(); }`.
- Namespace mixins and access properties via `#ns.mixin();` and use **guards** (`when`) for conditional rules.

```less
// variables.less
@brand: #4b8;
@space-3: 1rem;
@radius-md: 4px;
```

```less
// components/card.less
@import "variables.less";

.card-radius(@r: @radius-md) {
  border-radius: @r;
}

.card {
  .card-radius(8px);
  padding: @space-3;
  background: @brand;
}
```

```less
// guards pick the matching rule at compile time
.respond(@width) when (@width >= 768px) {
  display: grid;
  grid-template-columns: 16rem 1fr;
}

.respond(@width) when (@width < 768px) {
  display: block;
}

.page-layout {
  .respond(1024px);
}
```
