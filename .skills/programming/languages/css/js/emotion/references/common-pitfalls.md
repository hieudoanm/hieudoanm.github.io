# Common Pitfalls

Focused reference for **emotion**, excerpted from SKILL.md. The skill file remains the canonical guide.

## Common Pitfalls

- Server/client class mismatch with runtime CSS — use extraction on SSR.
- Passing internal prop through `styled` without `shouldForwardProp`.
- Mixing Emotion and other CSS-in-JS (duplicate `cache`/`injectGlobal`).

## 3. The `styled` API

- styled.div\color: red;\`orstyled.div({ color: 'red' })`.
- Reuse with shouldForwardProp, dynamic props via function: styled.div(p => ({ color: p.color })).
- Compose: styled(Component) (needs className forwarding).

## 4. Global Styles and Keyframes

- Global component: <Global styles={css\body { margin: 0; }\} />.
- keyframes: const spin = keyframes\...\`gives a named animation to use inanimation: ${spin}`.

## 5. Theming

- <ThemeProvider theme={theme}> + useTheme() or css={({ theme }) => ...}.
- emotion-theming provides <ThemeProvider>; type-safe with generics ThemeProvider<MyTheme>.
