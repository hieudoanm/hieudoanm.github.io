# SvelteKit: Starter Template

A reusable starting point derived from the **3. Rendering & Data Loading** section of [SvelteKit](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
