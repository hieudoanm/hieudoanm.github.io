# Workflow notes

Focused reference for **lightning-design-system**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
