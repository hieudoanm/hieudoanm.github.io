# 3. Variables, Maps, and Functions

Focused reference for **sass**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 3. Variables, Maps, and Functions

- Variables: `$color: #4b8;` — scope per module/`{}`.
- Maps: `$breakpoints: (sm: 576px, md: 768px);` with `map-get($m, key)`, `map-merge`, iteration via `@each`.
- Functions: built-ins (`lighten`, `darken`, `mix`, `darken`, `pow`, etc.) and `@function` for custom logic.

```scss
// _tokens.scss
@use "sass:map";
@use "sass:math";

$color-primary: #6d28d9;
$space-3: 1rem;
$radius-md: 0.5rem;
$breakpoints: (sm: 576px, md: 768px, lg: 992px);

@function rem($px, $base: 16px) {
  @return math.div($px, $base) * 1rem;
}

@function bp($name) {
  @return map.get($breakpoints, $name);
}
```
