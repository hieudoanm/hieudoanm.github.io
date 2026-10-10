# 3. Components

Focused reference for **materializecss**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 3. Components

- Typography, buttons (`btn`, `btn-flat`, `btn-floating`), cards, navbars, side nav, tabs.
- Forms: inputs with floating labels (`validate`, `label`), selects, switches, checkboxes/radios, range, datepickers.
- UI: modals, toasts (`M.toast`), tooltips, collapsibles, dropdowns, chips, carousels.

```html
<div class="card">
  <div class="card-image">
    <img src="/hero.jpg" alt="Release cover" />
    <span class="card-title">Release</span>
  </div>
  <div class="card-content"><p>Version 1.0 is out.</p></div>
  <div class="card-action"><a href="/changelog">Changelog</a></div>
</div>

<a class="waves-effect waves-light btn" href="/upload">
  <i class="material-icons left">cloud_upload</i>Upload
</a>
```

```html
<div class="row">
  <div class="input-field col s12 m6">
    <input id="email" type="email" class="validate" />
    <label for="email">Email</label>
  </div>
  <div class="input-field col s12 m6">
    <select>
      <option value="" disabled selected>Choose a plan</option>
      <option value="starter">Starter</option>
      <option value="team">Team</option>
    </select>
    <label>Plan</label>
  </div>
</div>
```
