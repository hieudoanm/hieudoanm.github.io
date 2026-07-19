# Stylex: Common Pitfalls

## Source guidance

This example applies the **Common Pitfalls** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Forgetting the Babel/Vite plugin → styles won't transform and break.
- Conditional strings `className={condition ? 'x' : 'y'}` instead of `stylex.props`.
- Dynamic key lookups (`tokens[color] as object`) lose type safety.

## Example

```tsx
import type { Style } from '@stylexjs/stylex';
import { tokens } from './tokens.stylex';

const isError = true;
const colorName = 'colorBrand';

// Bad: not statically analysable — no atoms are generated at build time
const bad = <p className={isError ? 'error' : 'ok'}>Failed</p>;
const alsoBad = tokens[colorName] as unknown as Style;

// Good: the compiler sees every literal style it must emit
const styles = stylex.create({ error: { color: tokens.colorBrand } });
const good = <p {...stylex.props(styles.error)}>Failed</p>;
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for stylex.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
