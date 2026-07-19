# 5. Performance Notes

Focused reference for **unocss**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 5. Performance Notes

- Effective content scanning keeps bundles at ~1-10 KB for typical apps.
- Cache (`.cache` folder) to avoid re-scan; scan `content` vectors precisely.
- Use the browser DevTools preflight to inspect generated CSS.

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
