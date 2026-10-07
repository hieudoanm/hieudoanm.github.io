---
name: lightning-design-system
description: Build Salesforce enterprise application UI on the Lightning Design System. Covers the SLDS 1 to SLDS 2 migration, why design tokens are deprecated in favour of global styling hooks, the --slds-g-* hook grammar, Lightning base components over blueprints, blueprint drift, token scope discipline, theming through Themes and Branding, and accessibility. Use when building or reviewing LWC, Lightning pages, Apex-facing UI, or any Salesforce-native surface.
---

# Lightning Design System (Salesforce)

SLDS is the design system behind Salesforce: Lightning pages, Lightning web
components, the console, and the admin surfaces around them. It is the reference
for dense CRM UI where records, lists, and forms dominate the screen.

**You buy:** the Salesforce look and feel, components that map to Lightning base
components, and a theming layer that lets an org's brand flow through without
forking anything.

**You pay:** you are inside Salesforce's platform constraints, and — this is the
part that catches people — **the original design tokens are deprecated in SLDS 2
in favour of global styling hooks.** Code written against the token model will
need migrating.

**Version note:** SLDS 2 was introduced in Spring '25 and the original system is
now called SLDS 1. Salesforce's own theme (Cosmos) runs on SLDS 2. The upstream
open-source SLDS 1 repository has been archived and is read-only, so treat it as a
historical reference, not a dependency to track.

---

## 1. Core Principles

- **Prefer Lightning base components.** They are the supported path; blueprints are
  framework-agnostic markup you copy, and copies drift.
- **Styling hooks, not design tokens, for anything that must work in SLDS 2.**
- **Theming happens in Themes and Branding**, not in your CSS. An override is a
  defect with a deadline.
- **Blueprint markup does not auto-update.** Salesforce updates base components
  when SLDS changes; your copied blueprint markup does not.
- **Density is the requirement.** Records lists and forms are the product.
- **Accessibility is a platform requirement**, not a preference.

---

## 2. SLDS 1 vs SLDS 2

|                        | SLDS 1                       | SLDS 2                                             |
| ---------------------- | ---------------------------- | -------------------------------------------------- |
| Structure vs style     | Coupled                      | **Decoupled**                                      |
| Visual language        | Design tokens                | **CSS custom properties**                          |
| Theming                | Themes                       | Themes + styling hooks                             |
| Components             | Base components + blueprints | Lightning base components                          |
| Backward compatibility | —                            | Blueprints still work; base components recommended |

- SLDS 1 and SLDS 2 **share the same component blueprints.** Only the CSS property
  _values_ differ, and blueprints are not republished on the new site.
- Design tokens "are still present and work normally in SLDS 1 themes, but aren't
  included in SLDS 2 themes."
- Global styling hooks work in **both** SLDS 1 and SLDS 2, which makes them the
  safe choice for code that has to survive the migration.
- Salesforce's guidance is to move off tokens toward global color styling hooks
  where possible, on contrast-accessibility grounds as well as forward
  compatibility.

**Practical consequence:** new code should use global styling hooks. Existing
token-based code is a migration backlog item, not a pattern to copy.

---

## 3. The Global Styling Hook Grammar

Hooks are CSS custom properties with a fixed, parseable structure:

```
--[namespace]-[scope]-[category]-[property]-[pairing]-[role]-[attribute]-[state]-[range]
```

| Segment     | Example     | Meaning                             | Required |
| ----------- | ----------- | ----------------------------------- | -------- |
| `namespace` | `slds`      | System that owns the hook           | yes      |
| `scope`     | `g`         | Reach of the hook (global)          | yes      |
| `category`  | `spacing`   | General area affected               | yes      |
| `property`  | `border`    | Aspect of styling you control       | no       |
| `pairing`   | `on`        | Whether a color is paired           | no       |
| `role`      | `surface`   | Semantic role of the element        | no       |
| `attribute` | `container` | Semantic characteristic of property | no       |
| `state`     | `disabled`  | State within interaction design     | no       |
| `range`     | `1-100`     | Numerical indicator of scale        | yes      |

```css
/* global spacing hook — works in SLDS 1 and SLDS 2 */
.my-card {
  margin-right: var(--slds-g-spacing-2);
}
```

Because the structure is regular, a missing hook can be found by walking the
category you expect rather than searching the entire token list.

---

## 4. Two Salesforce-Specific Traps

**Compile-time substitution.** In some Salesforce contexts the variables are
replaced with their values at compile time. That means at runtime:

- `CSSStyleDeclaration.getPropertyValue()` does **not** work on them.
- `CSSStyleDeclaration.setPropertyValue()` does **not** work on them.

Do not write code that reads or writes styling hooks at runtime.

**Token scope discipline.** SLDS 1 tokens come in global and component-scoped
variants, and using the wrong scope is the classic error:

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

---

## General Rules of Thumb

- Global styling hooks (`--slds-g-*`) for all new styling; tokens are legacy.
- Hook grammar is regular — navigate by category instead of searching everything.
- Lightning base components over copied blueprint markup.
- Never read or write hooks at runtime; substitution is compile-time.
- Match token scope to the component you are building.
- Brand color via accent-category hooks and Themes and Branding, never hard-coded.
- WCAG 2.1 contrast, and accessible names on record actions.
- Linter and Validator before you ship, especially on migrated code.

---

## Quick-Start Checklist

- [ ] New styles use global styling hooks, not SLDS 1 design tokens
- [ ] Hooks work under both SLDS 1 and SLDS 2 themes
- [ ] No runtime `getPropertyValue` / `setPropertyValue` on styling hooks
- [ ] Interactive elements are Lightning base components, not copied blueprint markup
- [ ] Token/hook scope matches the component using it
- [ ] Brand color comes from accent-category hooks + Themes and Branding
- [ ] No hard-coded brand hex values in component CSS
- [ ] Accessible names present on icon-only and record-level actions
- [ ] SLDS Linter and Validator clean
- [ ] Layout handles both adaptive and responsive breakpoints intentionally

---

## Sources

- Salesforce Lightning Design System — https://www.lightningdesignsystem.com/
- SLDS 1 vs SLDS 2 comparison — https://developer.salesforce.com/docs/platform/lwc/guide/create-components-css-slds1-slds2.html
- Using design tokens (deprecated) — https://developer.salesforce.com/docs/platform/lwc/guide/create-components-css-design-tokens.html
- SLDS blueprints — https://developer.salesforce.com/docs/platform/lwc/guide/create-components-css-slds-blueprint
- Getting started with SLDS 2 (styling hook grammar) — https://trailhead.salesforce.com/content/learn/modules/salesforce-lightning-design-system-2-for-developers/explore-salesforce-lightning-design-system-2
- SLDS best practices (token scope) — https://trailhead.salesforce.com/content/learn/modules/lightning-design-system-development-for-designers/understand-slds-best-practices
- Historical SLDS 1 source (archived, read-only) — https://github.com/salesforce-ux/design-system

Note: `developer.salesforce.com` may reject automated requests; if it does, use the
Trailhead modules or the archived repository above as the source for the same facts.
