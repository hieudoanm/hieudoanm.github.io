# Common Pitfalls

Focused reference for **stylex**, excerpted from SKILL.md. The skill file remains the canonical guide.

## Common Pitfalls

- Forgetting the Babel/Vite plugin → styles won't transform and break.
- Conditional strings `className={condition ? 'x' : 'y'}` instead of `stylex.props`.
- Dynamic key lookups (`tokens[color] as object`) lose type safety.

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
