# SvelteKit: Basic Usage

Best practices for building SvelteKit applications — server-first load functions, form actions, streaming, route groups, adapters, and the runes/SSR boundaries. Use when creating, structuring, or debugging a SvelteKit app.

## Scenario

Use this example as a starting point when applying **sveltekit-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **3. Rendering & Data Loading** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ts
// +page.server.ts — secrets stay here, never serialised
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
  if (!locals.user) error(401, 'Sign in required');
  const project = await db.projects.find(params.id);
  if (!project || project.ownerId !== locals.user.id) error(404, 'Not found');
  return { project };
};
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
