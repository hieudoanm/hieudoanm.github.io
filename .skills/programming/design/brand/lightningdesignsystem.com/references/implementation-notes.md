# Implementation notes

Focused reference for **lightning-design-system**, excerpted from SKILL.md. The skill file remains the canonical guide.

```css
/* wrong — a button-scoped token used inside a card */
.my-card {
  margin: var(--lwc-buttonSpacing);
}

/* right — a global primitive with the value you actually need */
.my-card {
  margin: var(--lwc-spacingMedium);
}
```

The first looks correct and will break when the button's spacing changes. Always
pick a token whose scope matches the component you are building.

---

## 5. Lightning Base Components over Blueprints

| Type                     | Use                                                             |
| ------------------------ | --------------------------------------------------------------- |
| Lightning base component | **Preferred.** Programmatically updated, minimal but sufficient |
| Component blueprint      | Framework-agnostic HTML/CSS reference markup                    |
| Lightning web component  | Your own modular component                                      |

- Blueprints are **framework-agnostic**, using standard HTML. When building an LWC,
  replace standard elements with Lightning base components wherever possible.
- Blueprint markup you copy becomes _your_ code. When SLDS updates the blueprint,
  yours does not update with it. Plan for that.
- Useful base components for layout and structure include `lightning-layout` and
  `lightning-layout-item` for responsive grids, and `lightning-tabset` for tabs.
- Blueprints describe their device support — adaptive (separate markup for
  non-desktop breakpoints) or responsive (scales across sizes). Pick deliberately.

```html
<lightning-card title="Details">
  <lightning-layout multiple-rows>
    <lightning-layout-item
      size="12"
      small-device-size="9"
      padding="around-small">
      <lightning-tabset>
        <lightning-tab label="Item one">…</lightning-tab>
      </lightning-tabset>
    </lightning-layout-item>
  </lightning-layout>
</lightning-card>
```

---

## 6. Theming and Brand

- Salesforce's Cosmos theme runs on **SLDS 2**, as do custom SLDS 2 themes.
- Use **accent-category global styling hooks** so components pick up brand colors
  from the org's Themes and Branding settings automatically.
- The reason to prefer hooks over tokens for brand colors: hooks work across SLDS
  1 and SLDS 2, so a component keeps adapting after an org's theme changes.
- Do not hard-code brand colors in CSS. If the org rebrands, your CSS will not
  follow.
- Component-level CSS overrides are the most common cause of a Lightning app that
  has drifted from the platform. Treat each one as debt to remove.

---

## 7. Accessibility

- Salesforce holds SLDS to **WCAG 2.1** contrast standards — the documented reason
  for moving from tokens to global color styling hooks.
- Every interactive element needs an accessible name, including icon-only record
  actions.
- Lightning base components ship keyboard and ARIA behavior; using them is cheaper
  and more correct than reimplementing.
- Use the **SLDS Linter** and **SLDS Validator** tooling to find deprecated tokens
  and missing hooks. They exist specifically for the SLDS 1 → 2 migration.
- Dense record lists are a common failure zone: truncation without a title or
  tooltip, and state conveyed by color alone.
- Keep Salesforce's own guidance visible: the accessibility requirement is part of
  the platform contract, not an app-level extra.
