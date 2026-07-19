# Adding new templates/pages

1. Create `<Name>Template.tsx` in the appropriate
   `src/components/templates/<domain>/` folder (create the folder if the domain
   is new). Use `shared/` for templates used across route groups.
2. Create the thin page wrapper at the route path, e.g.
   `src/app/(templates)/<domain>/<route>/page.tsx`.
3. Add the route to `GROUPS` in
   `src/components/pages/home/components/levels/TemplatesLevel.tsx` (a
   `PageEntry` with `label`, `href`, `template`, `icon`, `description`);
   `TEMPLATE_COUNT` is derived from `GROUPS`, and the level files export the
   `ATOMS_COUNT` / `MOLECULES_COUNT` / `ORGANISMS_COUNT` / `TEMPLATE_COUNT`
   constants shown on the home page.
4. Add a colocated suite in `<domain>/__tests__/`; every route and interaction
   must stay above the 90% coverage gate in `jest.config.ts`.
5. Verify with `pnpm exec tsc --noEmit` and `pnpm exec jest`.

---

[Back to index](README.md)
