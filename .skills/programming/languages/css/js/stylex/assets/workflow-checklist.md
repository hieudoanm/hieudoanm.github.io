# stylex: Workflow Checklist

A practical run sheet for applying [stylex](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Idea: Define styles as **typed objects** with create({ ... }) and use stylex.props(styles.x)
- [ ] 1. Core Idea: Compiler generates **atomic CSS classes** at build — avoided runtime class merging
- [ ] 2. Setup and Integration: Dependency: @stylexjs/stylex, @stylexjs/babel-plugin, @stylexjs/webpack-plugin (or Vite/Nuxt adapters)
- [ ] 2. Setup and Integration: Configure the compiler entry (importPath, genConditionalClasses, unstable_moduleResolution)
- [ ] 3. Stylex API: const styles = stylex.create({ root: { color: 'red', padding: 8 } });
- [ ] 3. Stylex API: Apply: <div {...stylex.props(styles.root)} />
- [ ] 4. Theming and Tokens: stylex.defineVars({ colorBrand: 'red' }) returns CSS-variable-backed tokens
- [ ] 4. Theming and Tokens: Use stylex.themeable(tokens, theme) per component for token mapping
- [ ] 5. Component Patterns: Compose conditional styles with stylex.props(...) — never concatenate strings
- [ ] 5. Component Patterns: createStyled not required; typically components create styles once at module scope

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
