import { FC } from 'react';
import { Section } from './Section';

export const PrimitivesSection: FC = () => {
  return (
    <Section
      id="primitives"
      label="Primitives"
      title="Everything you need"
      sub="Atomic components built from design tokens. Every variant, every state, every size — composable by default.">
      <div className="mb-10">
        <p className="text-base-content/50 mb-4 text-sm">Buttons</p>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <button className="btn btn-primary">Primary action</button>
          <button className="btn btn-ghost">Ghost</button>
          <button className="btn btn-error">Destructive</button>
          <button className="btn btn-primary btn-sm">Small</button>
          <button
            className="btn btn-ghost btn-sm cursor-not-allowed opacity-40"
            disabled>
            Disabled
          </button>
          <button className="btn btn-primary">
            <span className="loading loading-spinner loading-xs" />
            Loading…
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {['⊕', '✎', '⋯'].map((s) => (
            <button
              key={s}
              className="btn btn-square btn-ghost border-base-300 text-base-content/50 border">
              {s}
            </button>
          ))}
          <span className="badge badge-ghost border-base-300 text-base-content/50 rounded-full border px-3 py-1 text-xs">
            v2.4.0
          </span>
          <span className="badge badge-ghost border-base-300 text-base-content/50 rounded-full border px-3 py-1 text-xs">
            MIT
          </span>
          <div className="tooltip tooltip-top" data-tip="This is a tooltip">
            <button className="btn btn-ghost btn-sm">Hover me</button>
          </div>
        </div>
      </div>
      <div className="mb-10 grid grid-cols-2 gap-10">
        <div>
          <p className="text-base-content/50 mb-4 text-sm">Avatars</p>
          <div className="mb-4 flex gap-3">
            {[
              { initials: 'JD', cls: 'bg-primary/20 text-primary' },
              { initials: 'AL', cls: 'bg-success/20 text-success' },
              { initials: 'MK', cls: 'bg-info/20 text-info' },
              { initials: 'PR', cls: 'bg-error/20 text-error' },
            ].map(({ initials, cls }) => (
              <div key={initials} className="avatar placeholder">
                <div className={`w-10 rounded-full ${cls}`}>
                  <span className="text-sm font-medium">{initials}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="avatar-group -space-x-3">
            {[
              { initials: 'JD', cls: 'bg-primary/20 text-primary' },
              { initials: 'AL', cls: 'bg-success/20 text-success' },
              { initials: 'MK', cls: 'bg-info/20 text-info' },
              { initials: '+9', cls: 'bg-base-300 text-base-content/50' },
            ].map(({ initials, cls }) => (
              <div key={initials} className="avatar placeholder">
                <div
                  className={`ring-base-100 w-10 rounded-full ring-2 ${cls}`}>
                  <span className="text-xs font-medium">{initials}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-base-content/50 mb-4 text-sm">Badges &amp; tags</p>
          <div className="flex flex-wrap gap-3">
            <span className="badge badge-success">● Active</span>
            <span className="badge badge-error">● Offline</span>
            <span className="badge badge-warning">● Pending</span>
            <span className="badge badge-info">New</span>
            <span className="badge badge-warning text-warning-content">
              Premium
            </span>
            <span className="badge badge-neutral">Draft</span>
          </div>
        </div>
      </div>
      <p className="text-base-content/50 mb-4 text-sm">Cards</p>
      <div className="grid grid-cols-3 gap-5">
        {[
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
        ].map(({ icon, title, body }) => (
          <div
            key={title}
            className="card bg-base-200 border-base-300 hover:border-primary/40 border transition-colors">
            <div className="card-body p-7">
              <div className="bg-primary/10 mb-4 flex h-10 w-10 items-center justify-center rounded-lg text-lg">
                {icon}
              </div>
              <h3 className="card-title text-sm font-medium">{title}</h3>
              <p className="text-base-content/50 text-sm leading-relaxed">
                {body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
PrimitivesSection.displayName = 'PrimitivesSection';
