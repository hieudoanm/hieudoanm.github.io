import { Section } from './Section';

export const ContainersSection = () => {
  const faqs = [
    {
      q: 'What tokens does DaisyX export?',
      a: 'DaisyX exports CSS custom properties for color, spacing, radius, shadow, and typography — plus a JS token object for use in styled-components or Tailwind configs.',
    },
    {
      q: 'Is it framework-agnostic?',
      a: 'The core tokens and CSS utilities work anywhere. React components are available via @forma/react, with Vue and Svelte packages coming soon.',
    },
    {
      q: 'How are accessibility levels tested?',
      a: 'We run automated axe-core tests in CI and manual audits with NVDA and VoiceOver on every major release. All interactive components meet WCAG 2.1 AA criteria.',
    },
    {
      q: 'Can I use DaisyX in a commercial project?',
      a: 'Yes — DaisyX is MIT licensed. You can use it in personal, open-source, and commercial projects with no restrictions.',
    },
  ];
  const calDays = [
    { day: 29, type: 'other' },
    { day: 30, type: 'other' },
    { day: 31, type: 'other' },
    { day: 1, type: '' },
    { day: 2, type: '' },
    { day: 3, type: '' },
    { day: 4, type: 'today' },
    { day: 5, type: '' },
    { day: 6, type: '' },
    { day: 7, type: '' },
    { day: 8, type: 'range' },
    { day: 9, type: 'range' },
    { day: 10, type: 'range' },
    { day: 11, type: 'selected' },
    ...[
      12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
      30,
    ].map((d) => ({ day: d, type: '' as const })),
    { day: 1, type: 'other' },
    { day: 2, type: 'other' },
  ];
  const dayTypeClass: Record<string, string> = {
    today: 'text-primary font-semibold',
    selected: 'bg-primary text-primary-content font-semibold',
    range: 'bg-primary/10 text-base-content',
    other: 'text-base-content/20',
    '': 'text-base-content/50 hover:bg-base-300 hover:text-base-content',
  };
  return (
    <Section
      label="Containers"
      title="Structured surfaces"
      sub="Cards, modals, drawers, accordions — flexible containers that adapt to any layout.">
      <div className="grid grid-cols-2 gap-10">
        <div>
          <p className="text-base-content/50 mb-4 text-sm">Accordion</p>
          <div className="border-base-300 overflow-hidden rounded-2xl border">
            {faqs.map(({ q, a }, i) => (
              <div
                key={i}
                className={`collapse-arrow collapse ${i === 0 ? 'collapse-open' : ''} border-base-300 border-b bg-transparent last:border-b-0`}>
                <input type="radio" name="faq" defaultChecked={i === 0} />
                <div className="collapse-title text-base-content px-5 py-4 text-sm font-medium">
                  {q}
                </div>
                <div className="collapse-content px-5">
                  <p className="text-base-content/50 pb-2 text-sm leading-relaxed">
                    {a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-base-content/50 mb-4 text-sm">
            Calendar / Date picker
          </p>
          <div className="border-base-300 overflow-hidden rounded-2xl border">
            <div className="bg-base-300 border-base-content/10 flex items-center justify-between border-b px-5 py-4">
              <button className="btn btn-ghost btn-xs">‹</button>
              <span className="text-sm font-medium">April 2026</span>
              <button className="btn btn-ghost btn-xs">›</button>
            </div>
            <div className="grid grid-cols-7">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                <div
                  key={d}
                  className="text-base-content/40 bg-base-300 border-base-content/10 border-b py-2 text-center text-[11px] font-medium tracking-wider uppercase">
                  {d}
                </div>
              ))}
              {calDays.map(({ day, type }, i) => (
                <div
                  key={i}
                  className={`border-base-content/10 cursor-pointer border-r border-b py-[10px] text-center text-xs transition-colors last:border-r-0 ${dayTypeClass[type]}`}>
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
