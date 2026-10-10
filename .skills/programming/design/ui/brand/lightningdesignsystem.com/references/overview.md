# Overview

Focused reference for **lightning-design-system**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
