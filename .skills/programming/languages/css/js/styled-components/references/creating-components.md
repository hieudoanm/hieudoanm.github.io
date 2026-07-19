# 2. Creating Components

Focused reference for **styled-components**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Creating Components

- `const Button = styled.button\` background: coral; font-size: 18px; \`;`
- Dynamic props: `styled.button(p => ({ background: p.primary ? 'coral' : '#fff' }))` — reuse `p.prop`.
- Extend existing: `styled(Button)\`...\``forwards a`className` automatically.

```tsx
import styled from 'styled-components';

const Card = styled.section`
  display: grid;
  gap: 0.75rem;
  padding: 1.25rem;
  border-radius: 12px;
`;

type PrimaryButtonProps = { tone?: 'brand' | 'danger' };

export const PrimaryButton = styled.button<PrimaryButtonProps>`
  padding: ${({ theme }) => theme.space(2)}px;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
  color: #fff;
  background: ${({ tone = 'brand', theme }) =>
    tone === 'brand' ? theme.colors.brand : theme.colors.danger};
`;
```

```tsx
// `tone` is styling-only — withConfig filters it before it reaches the DOM
const ElevatedCard = styled(Card).withConfig({
  shouldForwardProp: (prop) => prop !== 'tone',
})<{ tone?: 'brand' | 'muted' }>`
  box-shadow: 0 8px 24px rgb(0 0 0 / 0.12);
`;

// attrs inject static props and per-instance data without touching markup
const SaveAction = styled.button.attrs({ type: 'submit', 'data-testid': 'save' })`
  font-weight: 600;
`;
```
