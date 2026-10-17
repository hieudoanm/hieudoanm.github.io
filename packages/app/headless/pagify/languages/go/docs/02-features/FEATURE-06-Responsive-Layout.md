# pagify — FEATURE-06: Responsive Layout

## 1. Summary

The generated site works on desktop, laptop, tablet, and mobile.

## 2. Behaviour

- Desktop: sidebar + content layout.
- Mobile: collapsed layout with accessible navigation.
- No fixed viewport size assumed.
- `default/styles.css` organises rules: tokens, reset, layout, header, sidebar, typography, links, code, tables, callouts, navigation, animations, responsive, dark mode, accessibility.

## 3. Acceptance criteria

- Sidebar + content on wide viewports.
- Accessible drawer/navigation on narrow viewports.
- Respects `prefers-reduced-motion: reduce`.
