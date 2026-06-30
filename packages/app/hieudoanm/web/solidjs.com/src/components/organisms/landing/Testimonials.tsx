const testimonials = [
  {
    quote:
      'Forma has transformed how our team builds UIs. The component API is intuitive and the accessibility guarantees give us confidence.',
    author: 'Sarah Chen',
    role: 'Lead Designer at Pitch Studio',
  },
  {
    quote:
      'We evaluated a dozen design systems before choosing Forma. The developer experience is unmatched — TypeScript types alone save us hours each week.',
    author: 'Marcus Rivera',
    role: 'Senior Engineer at DataFlow',
  },
  {
    quote:
      'The token system is brilliant. We migrated our entire design language in two days and the consistency improvements were immediate.',
    author: 'Priya Kapoor',
    role: 'DesignOps at ScaleUp',
  },
];

export const Testimonials = () => (
  <section class="mx-auto max-w-5xl px-12 py-24">
    <p class="text-primary mb-3 text-center text-xs font-medium tracking-[0.14em] uppercase">
      Testimonials
    </p>
    <h2 class="mb-4 text-center font-serif text-4xl leading-snug font-bold">
      Loved by teams
    </h2>
    <p class="text-base-content/60 mx-auto mb-12 max-w-xl text-center text-base leading-relaxed">
      See what our community says about building with Forma.
    </p>
    <div class="grid grid-cols-3 gap-5">
      {testimonials.map(({ quote, author, role }) => (
        <div key={author} class="card bg-base-200 border-base-300 border">
          <div class="card-body p-7">
            <div class="text-primary mb-4 text-2xl leading-none">&ldquo;</div>
            <p class="text-base-content/70 mb-6 text-sm leading-relaxed">
              {quote}
            </p>
            <div class="mt-auto">
              <p class="text-sm font-medium">{author}</p>
              <p class="text-base-content/40 text-xs">{role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);
