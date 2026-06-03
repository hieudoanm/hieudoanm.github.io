interface HeroProps {
  onViewDemoClick?: () => void;
  onDocsClick?: () => void;
}

export const Hero = (props: HeroProps) => (
  <section id="hero" class="relative mx-auto max-w-5xl px-12 py-36 text-center">
    <div class="bg-primary/5 pointer-events-none absolute top-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full blur-3xl" />
    <p class="text-primary mb-7 text-xs tracking-[0.2em] uppercase">
      v2.4.0 &middot; 47 components &middot; MIT license
    </p>
    <h1 class="mb-6 font-serif text-7xl leading-[1.05] font-black tracking-tight">
      Build interfaces
      <br />
      that <span class="text-primary">feel</span> right
    </h1>
    <p class="text-base-content/60 mx-auto mb-11 max-w-xl text-lg leading-relaxed">
      Forma is a refined design system for teams who care about every pixel.
      Accessible, composable, and darkly beautiful.
    </p>
    <div class="flex flex-wrap justify-center gap-3">
      <button
        type="button"
        class="btn btn-primary"
        onClick={props.onViewDemoClick}>
        ▶ View demo
      </button>
      <button type="button" class="btn btn-ghost" onClick={props.onDocsClick}>
        Read the docs
      </button>
      <button
        type="button"
        class="btn btn-ghost text-primary font-mono text-sm">
        npm i @forma/ui
      </button>
    </div>
    <div class="mt-16 flex flex-wrap justify-center gap-3">
      <span class="badge badge-success gap-1">● Stable</span>
      <span class="badge badge-info">TypeScript</span>
      <span class="badge badge-warning text-warning-content">React 18</span>
      <span class="badge badge-neutral">Next.js ready</span>
      <span class="badge badge-ghost border-base-300 border">WCAG 2.1 AA</span>
    </div>
  </section>
);
