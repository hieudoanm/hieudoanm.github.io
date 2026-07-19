# Slint + Material Design Best Practices: 2. Color: Use Material Tokens, Don't Hardcode

## Source guidance

This example applies the **2. Color: Use Material Tokens, Don't Hardcode** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

Slint's Material style already defines a Material 3 color scheme via `Palette`. Reference it instead of raw hex values so light/dark switching works for free:
If you need custom brand colors on top, define them once as a global and derive from Material roles rather than replacing them wholesale:
**Suggested palette** (if you need to define your own instead of relying on defaults):

## Example

```slint
export global AppColors {
    out property <color> primary: #4F9CFF;
    out property <color> accent: #A78BFA;
    out property <color> error: #FF5C5C;
    out property <color> success: #4FD68C;
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for slint-material-design.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
