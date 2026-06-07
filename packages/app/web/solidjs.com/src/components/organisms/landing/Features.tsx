const items = [
  {
    icon: '⬡',
    title: 'Design tokens',
    body: 'Color, spacing, and typography exported as CSS variables and JS constants.',
  },
  {
    icon: '◈',
    title: 'Composable API',
    body: 'Every component is headless-first. Bring your own styles or use our presets.',
  },
  {
    icon: '◉',
    title: 'Accessible by default',
    body: 'ARIA patterns, keyboard navigation, and focus management built in from day one.',
  },
  {
    icon: '⚡',
    title: 'Performance first',
    body: 'Tree-shakeable, lazy-loadable, and optimized for both server and client rendering.',
  },
  {
    icon: '✦',
    title: 'Dark mode native',
    body: 'Built-in dark and light themes with automatic system preference detection.',
  },
  {
    icon: '⊞',
    title: 'Developer DX',
    body: 'Full TypeScript support, auto-complete, and extensive Storybook documentation.',
  },
];

export const Features = () => (
  <section class="mx-auto max-w-5xl px-12 py-24">
    <p class="text-primary mb-3 text-xs font-medium tracking-[0.14em] uppercase">
      Primitives
    </p>
    <h2 class="mb-4 font-serif text-4xl leading-snug font-bold">
      Everything you need
    </h2>
    <p class="text-base-content/60 mb-12 max-w-xl text-base leading-relaxed">
      Atomic components built from design tokens. Every variant, every state,
      every size — composable by default.
    </p>
    <div class="grid grid-cols-3 gap-5">
      {items.map(({ icon, title, body }) => (
        <div
          key={title}
          class="card bg-base-200 border-base-300 hover:border-primary/40 border transition-colors">
          <div class="card-body p-7">
            <div class="bg-primary/10 mb-4 flex h-10 w-10 items-center justify-center rounded-lg text-lg">
              {icon}
            </div>
            <h3 class="card-title text-sm font-medium">{title}</h3>
            <p class="text-base-content/50 text-sm leading-relaxed">{body}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);
