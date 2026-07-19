# Workflow notes

Focused reference for **svelte-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
