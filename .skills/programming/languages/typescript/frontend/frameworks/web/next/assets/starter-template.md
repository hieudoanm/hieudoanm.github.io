# Next.js Best Practices: Starter Template

A reusable starting point derived from the **4. Data Fetching** section of [Next.js Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```tsx
async function getData() {
  const res = await fetch('https://api.example.com/data')
  return res.json()
}

export default async function Page() {
  const data = await getData()
  return <div>{data.title}</div>
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
