# 3. Components

Focused reference for **bulma**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 3. Components

- Elements: buttons (`.button.is-primary`), forms, icons, boxes, tables, `notification`, `tag`.
- Components: `card`, `navbar` (with burger toggle), `tabs`, `modal`, `message`, `dropdown`, `breadcrumb`, `pagination`.
- Most components are pure CSS: JavaScript needed only for interactive behaviors (navbar burger, dropdowns).

```html
<nav class="navbar is-primary" role="navigation" aria-label="Main">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">Acme</a>
    <a
      role="button"
      class="navbar-burger"
      aria-label="Toggle menu"
      aria-expanded="false"
      data-target="mainNav"
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
  <div id="mainNav" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item">Docs</a>
      <a class="navbar-item">Pricing</a>
    </div>
  </div>
</nav>
```
