# 6. Performance Notes

Focused reference for **styled-components**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 6. Performance Notes

- CSS-in-JS has runtime cost: render passes on every prop change; use memo/PureComponent where possible.
- Consider `styled-components/macro` for combinator/to-something-safe builds.

## 3. Theming

- <ThemeProvider theme={theme}> injects theme; consume with p.theme or useTheme().
- Type-safe theme: declare DefaultTheme module augmentation.
- Per-instance variants via attrs (attrs({ 'data-testid': 'x' })).
