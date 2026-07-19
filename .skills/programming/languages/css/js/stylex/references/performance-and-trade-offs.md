# 6. Performance and Trade-offs

Focused reference for **stylex**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 6. Performance and Trade-offs

- Zero runtime CSS logic: styles compile at build → bundled `stylex` runtime is tiny.
- Atomic class reuse shrinks CSS file; class counts grow but bytes stay similar.
- SSR works without special server extraction (classes deterministic).

## 3. Stylex API

- const styles = stylex.create({ root: { color: 'red', padding: 8 } });.
- Apply: <div {...stylex.props(styles.root)} />.
- Dynamic: p => stylex.props(styles.root, isError && styles.error).
- Fonts, media queries, pseudo-selectors and @ rules supported in objects.
