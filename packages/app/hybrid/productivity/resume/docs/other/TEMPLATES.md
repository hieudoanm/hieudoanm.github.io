# Templates

The app ships **64 free templates**. Each is a React component that renders a
full `ResumeData` at 100% of the sheet size, styled entirely with **inline
styles** (no Tailwind classes) so it prints and exports cleanly as standalone
HTML.

## How it works

- Templates live in eight group folders under `src/components/templates/resume/`
  (classic·minimal·sidebar·bands·colorful·natural·soft·specialty), eight
  templates per folder. Each folder carries its templates' tests in a nested
  `__tests__/` directory.
- `TemplatePicker` renders a divider heading per group between the template
  buttons; groups with no matches are hidden.
- Registry: `src/components/templates/resume/index.ts` exports
  `TEMPLATE_GROUPS`, `RESUME_TEMPLATES: ResumeTemplate[]` and `getTemplate(id)`.
- `ResumeTemplate = { id, name, description, component: ComponentType<{ data: ResumeData }> }`.
- `ResumeSheet` resolves the active id with `getTemplate` and renders
  `<Template data={data} />` inside a `mm`-sized sheet.
- `TemplatePicker` lists all templates (id as the React key, `aria-pressed` for
  selection).
- The sidebar tab label shows `Templates ({RESUME_TEMPLATES.length})` — it
  updates automatically.

## Shared primitives

`src/components/atoms/` provides the building blocks used by every template:

| Primitive     | Purpose                                       |
| ------------- | --------------------------------------------- |
| `Section`     | Uppercase section title + optional divider    |
| `TextBlock`   | Paragraph with `pre-line` whitespace          |
| `BulletList`  | Splits `description` on newlines into bullets |
| `HeaderRow`   | Left primary/secondary + right-aligned meta   |
| `ContactList` | Wrapped row of non-empty contact fields       |

Supporting helpers: `collectContact(data)` (`utils/contact.ts`) and `splitComma`
/ `splitLines` (`utils/text.ts`).

## Requirements

A template must:

1. Accept `TemplateProps` (`{ data: ResumeData }`).
2. Always render `personal.fullName` — even when every section is empty (covered
   by the "renders empty sections gracefully" test).
3. Render section headings that contain the word "Experience" when experience
   items exist (covered by the render test).
4. Not use Tailwind utilities — inline styles only.
5. Set `displayName`.

## Adding a template

1. Copy an existing template (e.g. `SlateTemplate.tsx`) to `NovaTemplate.tsx`.
2. Rework the palette, typography, and layout via inline styles. Use the
   primitives for consistent rendering. Vary the structure — two-column sidebar,
   top band, accent bars, colored headers — so it is visually distinct.
3. Register it in `index.ts`: unique slug `id`, `name`, one-line `description`,
   and the `component`. **Descriptions should not contain other template names**
   (the picker/e2e match on name substrings, e.g. `/^Elegant/`).
4. Verify:

```sh
pnpm exec jest src/components/templates/resume --coverage=false
pnpm exec jest src/app/__tests__/page.test.tsx --coverage=false   # count assertions
pnpm exec playwright test e2e/home.spec.ts --reporter=line        # picker count + names
```

## Guardrails wired into tests

- `registry.test.ts` asserts the registry has exactly **64** entries, unique
  ids, non-empty names/descriptions. Every template also has its own
  template-specific render + empty-data test in the same directory.
- `page.test.tsx` asserts the picker shows **64** selectable buttons.
- `e2e/home.spec.ts` asserts `button[aria-pressed]` count is **64** and that
  Classic / Modern / Elegant / Creative are present.
- Changing the count means updating all of the above plus the marketing copy
  (`src/content/about.ts`, `src/app/layout.tsx`) and the docs.

## Visual reference

The 64 templates are organized into eight folders (see `TEMPLATE_GROUPS` in
`index.ts`):

- **Classic & Formal** — classic serifs and letterpress: Classic, Elegant,
  Topaz, Inkwell, Pinnacle, Vintage, Terra, Ceremony.
- **Minimal & Clean** — single-column modern: Minimal, Slate, Quartz, Lattice,
  Simple, Compact, Align, Zen.
- **Sidebar Layouts** — colored / two-column sidebars: Modern, Beacon, Nova,
  Aurora, Dusk, Iris, Harbor, Willow.
- **Header Bands** — strong top color bands: Executive, Meadow, Ember, Timber,
  Sterling, Summit, Wave, Kinetic.
- **Colorful & Gradient** — vivid gradients and neon: Amber, Azure, Sol,
  Solstice, Glow, Pulse, Saffron, Prism.
- **Nature & Earth** — earthy and botanical: Grove, Flora, Pine, Nectar, Oasis,
  Peaks, Tide, Ridge.
- **Soft & Neutral** — pastels, light, and muted: Sherbet, Rose, Opal, Marble,
  Canvas, Breeze, Copper, Coral.
- **Specialty** — distinctive utilities: Technical, Academic, Orbit, Sierra,
  Creative, Bold, Professional, Muse.
