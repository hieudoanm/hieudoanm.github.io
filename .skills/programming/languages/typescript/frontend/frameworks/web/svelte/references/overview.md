# Overview

Focused reference for **svelte-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Svelte Best Practices

Svelte is a component framework that compiles your code at build time, resulting in highly efficient vanilla JavaScript. Best practice is to leverage Svelte's reactivity system, use stores for state management, follow component patterns, and optimize for performance.

---

## 1. Core Stack

- Svelte **latest stable**
- TypeScript **strict mode**
- Vite for build tooling
- SvelteKit for full-stack applications (optional)

```bash
npm create svelte@latest my-app
# or with SvelteKit
npm create svelte@latest my-app --template skeleton
```

---

## 2. Component Structure

- **Svelte components** — use `.svelte` files for components:

```svelte
<script lang="ts">
  let count = 0

  function increment() {
    count += 1
  }
</script>

<button on:click={increment}>
  Count: {count}
</button>

<style>
  button {
    padding: 8px 16px;
  }
</style>
```

- **TypeScript** — use TypeScript for type safety:

```svelte
<script lang="ts">
  interface Props {
    title: string
    count?: number
  }

  export let title: Props['title']
  export let count: Props['count'] = 0
</script>
```

- **Component organization** — organize components by feature

---

## 3. Reactivity

- **Reactive statements** — use `$:` for reactive statements:

```svelte
<script>
  let count = 0
  let doubled = 0

  $: doubled = count * 2
</script>
```

- **Reactive declarations** — use reactive declarations for derived state:

```svelte
<script>
  let firstName = 'John'
  let lastName = 'Doe'

  $: fullName = `${firstName} ${lastName}`
</script>
```

- **Reactive blocks** — use reactive blocks for multiple statements:

```svelte
<script>
  let value = 0

  $: {
    console.log('Value changed:', value)
    // Multiple statements
  }
</script>
```
