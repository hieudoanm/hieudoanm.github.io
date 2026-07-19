# styled-components: Workflow Checklist

A practical run sheet for applying [styled-components](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Setup: Install: npm i styled-components
- [ ] 1. Setup: Babel: optional babel-plugin-styled-components for better debugging (component display names) and SSR
- [ ] 2. Creating Components: const Button = styled.button\ background: coral; font-size: 18px; \;
- [ ] 2. Creating Components: Dynamic props: styled.button(p => ({ background: p.primary ? 'coral' : '#fff' })) — reuse p.prop
- [ ] 3. Theming: <ThemeProvider theme={theme}> injects theme; consume with p.theme or useTheme()
- [ ] 3. Theming: Type-safe theme: declare DefaultTheme module augmentation
- [ ] 4. Global Styles and Animations: createGlobalStyle\body { margin:0; } \`` for resets — renders once
- [ ] 4. Global Styles and Animations: keyframes for reusable animation names
- [ ] 5. SSR and Extraction: With SSR, use ServerStyleSheet and collectStyles/extractStyleTags to render critical CSS into <head>
- [ ] 5. SSR and Extraction: For static extraction at build (Next.js), use babel-plugin + secret-interpolation or framework integrations

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
