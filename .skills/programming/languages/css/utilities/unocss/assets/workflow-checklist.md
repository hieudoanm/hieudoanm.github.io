# unocss: Workflow Checklist

A practical run sheet for applying [unocss](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Ideas: **Utility detection**: scans source (content) for class names, generating only used CSS (JIT-like, ultra-fast)
- [ ] 1. Core Ideas: **Presets**: unocss/preset-uno, preset-wind, preset-attributify, preset-icons, preset-typography, etc
- [ ] 2. Installation and Setup: Vite: npm i -D unocss + import UnoCSS from 'unocss/vite' → add plugin, then import 'virtual:uno.css'
- [ ] 2. Installation and Setup: Nuxt: use @unocss/nuxt module
- [ ] 3. Utilities & Variants: Work like Tailwind-ish atomic classes: p-4, flex, text-red-500, w-1/2, hover: states
- [ ] 3. Utilities & Variants: Variants: hover:, focus:, dark:, md:; media/dark via preset-wind
- [ ] 4. Extending: Custom rules: shortcuts: { btn: 'px-4 py-2 rounded' } and rules: [[/^bg-(.*)$/, m => ({ background: m[1] })]]
- [ ] 4. Extending: Use safelist / preflights for runtime-driven classes
- [ ] 5. Performance Notes: Effective content scanning keeps bundles at ~1-10 KB for typical apps
- [ ] 5. Performance Notes: Cache (.cache folder) to avoid re-scan; scan content vectors precisely

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
