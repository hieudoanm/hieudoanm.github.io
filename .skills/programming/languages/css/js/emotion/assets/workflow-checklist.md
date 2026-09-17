# emotion: Workflow Checklist

A practical run sheet for applying [emotion](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Setup and Babel: React: npm i @emotion/react @emotion/styled
- [ ] 1. Setup and Babel: Zero-config works with Vite/webpack (@emotion/babel-plugin optional for previews and details)
- [ ] 2. The `css` API: css prop on React elements: import { css } from '@emotion/react' — <div css={style}>
- [ ] 2. The `css` API: Define styles with object syntax or template strings; labels via label: in objects
- [ ] 3. The `styled` API: styled.div\color: red;\`orstyled.div({ color: 'red' })`
- [ ] 3. The `styled` API: Reuse with shouldForwardProp, dynamic props via function: styled.div(p => ({ color: p.color }))
- [ ] 4. Global Styles and Keyframes: Global component: <Global styles={css\body { margin: 0; }\} />
- [ ] 4. Global Styles and Keyframes: keyframes: const spin = keyframes\...\`gives a named animation to use inanimation: ${spin}`
- [ ] 5. Theming: <ThemeProvider theme={theme}> + useTheme() or css={({ theme }) => ...}
- [ ] 5. Theming: emotion-theming provides <ThemeProvider>; type-safe with generics ThemeProvider<MyTheme>

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
