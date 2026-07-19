# Next.js Best Practices: Workflow Checklist

A practical run sheet for applying [Next.js Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack: Next.js **latest stable** (App Router preferred)
- [ ] 1. Core Stack: React **18+**
- [ ] 2. Project Structure: **App Router (app/)** for new projects — supports React Server Components, streaming, and better data fetching
- [ ] 2. Project Structure: **Route groups ()** for organization without affecting URL structure
- [ ] 3. Routing & Navigation: **File-based routing** — app/page.tsx becomes /, app/blog/page.tsx becomes /blog
- [ ] 3. Routing & Navigation: **Dynamic routes** — app/blog/[slug]/page.tsx for /blog/my-post
- [ ] 4. Data Fetching: **Server Components** — fetch data directly in components:
- [ ] 4. Data Fetching: **Static Generation** — fetch with next: { revalidate: 3600 } for ISR:
- [ ] 5. Server vs Client Components: **Default to Server Components** — no JavaScript sent to client, better performance
- [ ] 5. Server vs Client Components: **Use Client Components** only when:

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
