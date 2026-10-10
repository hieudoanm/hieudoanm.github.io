# Workflow notes

Focused reference for **astryx.atmeta.com**, excerpted from SKILL.md. The skill file remains the canonical guide.


# Astryx implementation workflow

## Before changing UI

- Inspect `package.json`, lockfiles, app bootstrap, theme providers, and
  existing Astryx imports.
- Confirm the installed version; match documentation and examples to that
  version.
- Identify the theme boundary and how the project loads theme styles.
- Confirm whether the request is for Astryx itself, an existing theme, or an
  Astryx-inspired custom design.

## While implementing

1. Find an existing component that matches the interaction.
2. Use documented props and variants; do not recreate its behavior with
   decorative markup.
3. Prefer semantic theme variables for colors, spacing, typography, shape, and
   focus.
4. Keep any custom style local to the feature or theme scope.
5. Add or preserve loading, empty, error, disabled, selected, and focus states
   as appropriate.
6. Avoid reaching into generated classes or private package internals.

## Validation

- Check the layout at narrow and wide viewports.
- Use keyboard-only navigation and verify visible focus.
- Review contrast and status meaning in both light and dark modes.
- Verify reduced-motion behavior if the feature animates.
- Run the repository's formatting, type-check, test, and build commands.
- Re-check the official docs if a token, component, or theme value is uncertain.

## Custom themes

- Extend or override tokens only through the documented theming mechanism.
- Keep semantic roles intact; do not redefine a success color as an unrelated
  brand accent.
- Scope theme overrides deliberately and avoid leaking values into unrelated
  embedded surfaces.
- Test components with both default and custom themes; include dark mode where
  supported.
- Document project-owned tokens and the reason for each override.
