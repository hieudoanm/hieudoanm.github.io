# Adding new templates/pages

1. Create `<Name>Template.tsx` in the appropriate
   `src/components/templates/<folder>/` folder (create the folder if the domain
   is new).
2. Create the thin page wrapper at the route path, e.g.
   `src/app/(templates)/<folder>/<route>/page.tsx`.
3. Add the route to `GROUPS` in
   `src/components/page/home/demo/pages/PagesDirectory.tsx` (a `PageEntry` with
   `label`, `href`, `icon`, `description`) and bump `TEMPLATE_COUNT`.
4. Add a colocated suite in `<folder>/__tests__/`; every route and interaction
   must stay above the 90% coverage gate in `jest.config.ts`.
5. Verify with `pnpm exec tsc --noEmit` and `pnpm exec jest`.

---

[Back to index](README.md)
