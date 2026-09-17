# 2. Component Classes

Focused reference for **daisyui**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Component Classes

- Buttons: `btn btn-primary btn-outline btn-ghost btn-xs…btn-lg`, `btn-circle`.
- Layout: `card`, `navbar`, `drawer`, `menu`, `tabs (tab, tab-active, tab-content)`, `breadcrumbs`.
- Feedback: `alert alert-success`, `toast`, `modal`, `tooltip`, `loading`, `progress`.
- Forms: `input input-bordered`, `select`, `checkbox`, `radio`, `range`, `toggle`.

```html
<div class="navbar bg-base-100 shadow-sm">
  <a class="btn btn-ghost text-xl">Acme</a>
  <nav class="menu menu-horizontal px-1">
    <li><a class="active">Dashboard</a></li>
    <li><a>Projects</a></li>
  </nav>
</div>

<div class="card bg-base-100 w-96 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">Deploy to production?</h2>
    <p>This will roll out the latest build to all users.</p>
    <div class="card-actions justify-end">
      <button class="btn btn-ghost">Cancel</button>
      <button class="btn btn-primary">Deploy</button>
    </div>
  </div>
</div>
```

```html
<form class="flex flex-col gap-3 max-w-sm">
  <input class="input input-bordered" type="email" placeholder="Email" />
  <select class="select select-bordered">
    <option disabled selected>Choose a plan</option>
    <option>Starter</option>
    <option>Team</option>
  </select>
  <label class="label cursor-pointer">
    <span class="label-text">Enable alerts</span>
    <input class="toggle toggle-primary" type="checkbox" checked />
  </label>
</form>
```
