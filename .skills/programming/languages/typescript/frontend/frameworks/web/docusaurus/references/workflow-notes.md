# Workflow notes

Focused reference for **docusaurus-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```txt
/
├── docs/
│   ├── intro/
│   │   └── intro.md
│   ├── api/
│   │   └── api-reference.md
│   └── guides/
│       └── getting-started.md
├── theme/
│   └── src/
│       └── css/
│           └── custom.css
├── sidebars.js
└── docusaurus.config.js
```

---

## 2. MDX & Content

- **Use MDX for interactive examples** — import React components directly in Markdown (`import Tabs from '@theme/Tabs'`).
- **Admonitions for callouts** — `:::tip`, `:::note`, `:::warning`, `:::danger` for structured emphasis.
- **`tabs` component for multi-language examples** — `import Tabs from '@theme/Tabs'` with `import CodeBlock from '@theme/CodeBlock'`.

````mdx
<Tabs defaultValue="js" values={[{ label: 'JavaScript', value: 'js' }, { label: 'TypeScript', value: 'ts' }]}>
<TabItem value="js">

```js
// JS example
```

</TabItem>
<TabItem value="ts">

```ts
// TS example
```

</TabItem>
</Tabs>
````
