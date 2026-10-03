---
name: svelte-best-practices
description: Best practices for building web applications with Svelte. Use when creating, structuring, or reviewing Svelte applications — covers components, reactivity, stores, routing, and performance.
---

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

---

## 4. Props and Slots

- **Props** — define props with `export let`:

```svelte
<script lang="ts">
  export let title: string
  export let count: number = 0
</script>

<h1>{title}</h1>
<p>Count: {count}</p>
```

- **Slots** — use slots for component composition:

```svelte
<div class="card">
  <slot name="header" />
  <slot />
  <slot name="footer" />
</div>

<!-- Usage -->
<Card>
  <h2 slot="header">Title</h2>
  <p>Content</p>
  <p slot="footer">Footer</p>
</Card>
```

- **Named slots** — use named slots for specific sections

---

## 5. State Management

- **Stores** — use Svelte stores for state management:

```typescript
// stores/user.ts
import { writable } from 'svelte/store'

export const user = writable<User | null>(null)

export const setUser = (newUser: User) => {
  user.set(newUser)
}
```

- **Custom stores** — create custom stores with logic:

```typescript
export const createCounter = () => {
  const { subscribe, set, update } = writable(0)

  return {
    subscribe,
    increment: () => update(n => n + 1),
    decrement: () => update(n => n - 1),
    reset: () => set(0)
  }
}
```

- **Local state** — use local variables for component-local state

---

## 6. Lifecycle

- **onMount** — use onMount for component initialization:

```svelte
<script>
  import { onMount } from 'svelte'

  onMount(() => {
    console.log('Component mounted')
  })
</script>
```

- **onDestroy** — use onDestroy for cleanup:

```svelte
<script>
  import { onDestroy } from 'svelte'

  let interval: number

  onMount(() => {
    interval = setInterval(() => {
      console.log('Tick')
    }, 1000)
  })

  onDestroy(() => {
    clearInterval(interval)
  })
</script>
```

- **beforeUpdate/afterUpdate** — use for update lifecycle hooks

---

## 7. Events

- **Event handling** — use `on:` directive for events:

```svelte
<button on:click={handleClick}>
  Click me
</button>

<script>
  function handleClick() {
    console.log('Button clicked')
  }
</script>
```

- **Event modifiers** — use event modifiers:

```svelte
<button on:click|once={handleClick}>
  Click once
</button>

<input on:keydown|preventDefault={handleKeydown} />
```

- **Event dispatching** — dispatch custom events:

```svelte
<script>
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  function handleClick() {
    dispatch('customEvent', { data: 'value' })
  }
</script>
```

---

## 8. Routing

- **SvelteKit routing** — use SvelteKit for routing:

```svelte
<!-- src/routes/+page.svelte -->
<h1>Home</h1>

<!-- src/routes/about/+page.svelte -->
<h1>About</h1>
```

- **Dynamic routes** — use bracket notation for dynamic routes:

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  export let data

  $: post = data.post
</script>

<h1>{post.title}</h1>
```

- **Layouts** — use layouts for shared UI:

```svelte
<!-- src/routes/+layout.svelte -->
<slot />
```

---

## 9. Performance

- **Optimization** — Svelte is already optimized by compilation
- **Lazy loading** — lazy load components:

```svelte
<script>
  import { onMount } from 'svelte'

  let HeavyComponent

  onMount(async () => {
    const module = await import('./HeavyComponent.svelte')
    HeavyComponent = module.default
  })
</script>

{#if HeavyComponent}
  <svelte:component this={HeavyComponent} />
{/if}
```

- **Virtual lists** — use virtual lists for long lists:

```svelte
<script>
  import { VirtualList } from 'svelte-virtual-list'
</script>

<VirtualList {items} let:item>
  <div>{item.name}</div>
</VirtualList>
```

---

## 10. Styling

- **Scoped styles** — styles are scoped by default:

```svelte
<style>
  .button {
    padding: 8px 16px;
  }
</style>
```

- **Global styles** — use `:global()` for global styles:

```svelte
<style>
  :global(.global-class) {
    color: red;
  }
</style>
```

- **CSS modules** — use CSS modules for better scoping:

```svelte
<style module>
  .button {
    padding: 8px 16px;
  }
</style>

<button class={styles.button}>Click me</button>
```

---

## 11. Testing

- **Testing Library** — test components with Testing Library:

```typescript
import { render, fireEvent } from '@testing-library/svelte'
import Counter from './Counter.svelte'

test('increments counter', async () => {
  const { getByText } = render(Counter)
  const button = getByText('Increment')
  await fireEvent.click(button)
  expect(getByText('Count: 1')).toBeInTheDocument()
})
```

- **Unit tests** — test reactive logic separately
- **E2E tests** — use Playwright for E2E testing

---

## 12. General Rules of Thumb

- **Reactivity** — leverage Svelte's reactivity system
- **Stores** — use stores for state management
- **TypeScript** — use TypeScript for type safety
- **Performance** — Svelte is already performant
- **Component composition** — use slots for composition
- **Testing** — test components with Testing Library

---

## Quick-Start Checklist

- [ ] Svelte with TypeScript strict mode
- [ ] Reactive statements with `$:`
- [ ] Stores for state management
- [ ] TypeScript interfaces for props
- [ ] Scoped styles by default
- [ ] onMount/onDestroy for lifecycle
- [ ] Event handling with `on:`
- [ ] SvelteKit for routing (if using)
- [ ] Testing Library for testing
- [ ] Component organization by feature
