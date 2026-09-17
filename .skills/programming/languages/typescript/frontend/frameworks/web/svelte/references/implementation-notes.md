# Implementation notes

Focused reference for **svelte-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
