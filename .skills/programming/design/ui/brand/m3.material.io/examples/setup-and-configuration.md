# Google Design System (Material Design 3): 3. Wire Roles Into Tokens

## Source guidance

This example applies the **3. Wire Roles Into Tokens** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

Define once as CSS variables; Tailwind v4 `@theme` promotes them to utilities.
Themes swap variables, never classes.
- **`oklch`, not hex** — perceptual lightness makes tonal ramps and contrast
checks meaningful; hex lightness does not.
- **Never redefine a role per component.** If a screen needs a look the roles
can't express, that's a missing role — add it to the theme, don't patch the
component.

## Example

```tsx
export function ReceiptTotal({ total }: { total: Money }) {
  return (
    <p className="bg-surface text-on-surface font-title tabular-nums">
      {total.format()}
    </p>
  );
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for google-design-system.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
