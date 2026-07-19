# Components

## Philosophy

Components follow **atomic design** — small, composable, single-responsibility.
Every component is a named export, typed with explicit props, and co-located in
its own file.

## Folder Structure

```txt
src/components/
├── atoms/          # Smallest building blocks
│   ├── Avatar.tsx
│   ├── Badge.tsx
│   ├── Separator.tsx
│   ├── Skeleton.tsx
│   ├── Spinner.tsx
│   └── TextField.tsx
├── molecules/      # Combinations of atoms
│   ├── Card.tsx
│   ├── Dropdown.tsx
│   ├── EmptyState.tsx
│   ├── Modal.tsx
│   ├── Tabs.tsx
│   └── Toast.tsx
├── organisms/      # Complex UI sections
│   ├── Header.tsx
│   └── Navbar.tsx
└── templates/      # Page-level layout shells
    ├── AboutTemplate.tsx
    ├── ErrorTemplate.tsx
    ├── SettingsTemplate.tsx
    └── VersionTemplate.tsx
```

## Component Types

| Type     | Purpose                         | Example            |
| -------- | ------------------------------- | ------------------ |
| Atom     | Indivisible UI primitive        | `Spinner`, `Badge` |
| Molecule | 组合 atoms into UI patterns     | `Toast`, `Modal`   |
| Organism | Complex, self-contained section | `Header`, `Navbar` |
| Template | Page-level layout with slots    | `ErrorTemplate`    |

## Naming

- **Files**: `PascalCase.tsx` — one component per file
- **Exports**: named exports — `export const Spinner: FC<SpinnerProps> = ...`
- **Props**: `interface` or `type` suffixed with `Props` — defined in the same
  file
- **Hooks**: `use` prefix — `useSWRegister`

## Composition

```tsx
// Prefer composition over configuration
<Card>
  <Card.Title>Title</Card.Title>
  <Card.Body>Content</Card.Body>
</Card>

// Over prop-heavy alternatives
<Card title="Title" content="Content" />
```

## Props

- Use explicit types — no `any`
- Optional props use `?` — `size?: 'sm' | 'md' | 'lg'`
- Destructure in the function signature
- Provide sensible defaults

```tsx
interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

export const Spinner: FC<SpinnerProps> = ({ size = 'md' }) => (
  <span className={`loading loading-spinner loading-${size}`} />
);
```

## Variants

Use DaisyUI variant classes for visual differences:

- Buttons: `btn-primary`, `btn-secondary`, `btn-ghost`, `btn-error`
- Badges: `badge-success`, `badge-warning`, `badge-error`
- Alerts: `alert-info`, `alert-success`, `alert-warning`, `alert-error`

## Accessibility

- Use semantic HTML (`<button>`, `<nav>`, `<header>`, `<main>`)
- All interactive elements must have visible focus rings
- Icons paired with text labels — never icon-only without `aria-label`
- Modal triggers must manage focus on open/close

## Loading States

Use `Skeleton` atoms for content placeholders:

```tsx
{
  isLoading ? (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="skeleton h-24 w-full rounded-lg" />
      ))}
    </div>
  ) : (
    <Content />
  );
}
```

## Error States

Use `ErrorTemplate` for page-level errors. For component-level errors, render
inline fallbacks:

```tsx
if (!data) {
  return <EmptyState icon={<FiAlertTriangle />} title="No data available" />;
}
```
