# Unocss: 5. Performance Notes

## Source guidance

This example applies the **5. Performance Notes** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Effective content scanning keeps bundles at ~1-10 KB for typical apps.
- Cache (`.cache` folder) to avoid re-scan; scan `content` vectors precisely.
- Use the browser DevTools preflight to inspect generated CSS.

## Example

```ts
// Restrict scanning to source files — fewer files, faster rebuilds
export default defineConfig({
  content: {
    pipeline: {
      include: [/\.(vue|svelte|[jt]sx|mdx?|html)($|\?)/],
    },
  },
});
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for unocss.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
