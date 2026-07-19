# Matplotlib Best Practices: 5. Export & Sharing

## Source guidance

This example applies the **5. Export & Sharing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`fig.savefig("out.png", dpi=300, bbox_inches="tight")` — dpi/formats explicit:**
- **Vector formats (PDF/SVG) for documents; PNG at target dpi for the screen.**
- **Fonts/Arial default OK; `rcParams` theme centralized for the repo.**

## Example

```python
fig.savefig("rev.png", dpi=300, bbox_inches="tight")
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for matplotlib-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
