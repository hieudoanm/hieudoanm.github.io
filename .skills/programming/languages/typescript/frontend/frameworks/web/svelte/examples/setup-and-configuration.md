# Svelte Best Practices: 2. Component Structure

## Source guidance

This example applies the **2. Component Structure** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Svelte components** — use `.svelte` files for components:
- **TypeScript** — use TypeScript for type safety:
- **Component organization** — organize components by feature

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for svelte-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
