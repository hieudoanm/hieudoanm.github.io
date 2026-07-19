# 3. Components

Focused reference for **uikit**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 3. Components

- Elements: buttons (`uk-button-*`), badges, icons, labels, progress, cards, tables, forms.
- Complex: navbar, dropdown, modal, off-canvas, slider, tabs, accordion, lightbox, notification (`UIkit.notification`).
- Most components use `uk-*` attributes (`uk-toggle`, `uk-modal`, `uk-accordion`), minimal markup needed.

```html
<button class="uk-button uk-button-primary" uk-toggle="target: #demo-modal">
  Open modal
</button>

<div id="demo-modal" uk-modal>
  <div class="uk-modal-dialog uk-modal-body">
    <h2 class="uk-modal-title">Confirm</h2>
    <p>Publish the release?</p>
    <p class="uk-text-right">
      <button class="uk-button uk-button-default uk-modal-close" type="button">
        Cancel
      </button>
      <button class="uk-button uk-button-primary" type="button">Publish</button>
    </p>
  </div>
</div>

<ul uk-accordion>
  <li class="uk-open">
    <a class="uk-accordion-title" href>Step 1</a>
    <div class="uk-accordion-content"><p>Install dependencies.</p></div>
  </li>
  <li>
    <a class="uk-accordion-title" href>Step 2</a>
    <div class="uk-accordion-content"><p>Run the build.</p></div>
  </li>
</ul>
```
