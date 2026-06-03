import { createSignal, type JSX } from 'solid-js';

// ── GOOGLE SIGN IN MODAL ──
const GoogleSignInModal = () => (
  <>
    <input type="checkbox" id="google-signin-modal" class="modal-toggle" />
    <div class="modal modal-bottom sm:modal-middle" role="dialog">
      <div class="modal-box bg-base-200 border-base-300 max-w-sm border">
        <h3 class="mb-2 font-serif text-xl font-bold">Welcome back</h3>
        <p class="text-base-content/50 mb-7 text-sm leading-relaxed">
          Sign in to access your Forma workspace, saved components, and team
          settings.
        </p>
        <label for="google-signin-modal" class="btn btn-primary w-full gap-2">
          <span class="font-bold tracking-tight">G</span>
          Sign in with Google
        </label>
        <div class="divider text-base-content/20 text-xs">or</div>
        <p class="text-base-content/40 text-center text-xs">
          No account?{' '}
          <a href="#" class="text-primary hover:underline">
            Create one free
          </a>
        </p>
        <div class="modal-action mt-4">
          <label
            for="google-signin-modal"
            class="btn btn-ghost btn-sm border-base-300 w-full border">
            Cancel
          </label>
        </div>
      </div>
      <label class="modal-backdrop" for="google-signin-modal" />
    </div>
  </>
);

// ── NAV ──
const Nav = () => (
  <div class="navbar bg-base-100/85 border-base-300 sticky top-0 z-50 min-h-[60px] border-b px-12 backdrop-blur-xl">
    <div class="navbar-start">
      <span class="text-primary font-serif text-2xl font-bold tracking-widest">
        Forma
      </span>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal text-base-content/60 gap-2 px-1 text-sm">
        <li>
          <a href="#primitives" class="hover:text-base-content">
            Components
          </a>
        </li>
        <li>
          <a href="#forms" class="hover:text-base-content">
            Forms
          </a>
        </li>
        <li>
          <a href="#feedback" class="hover:text-base-content">
            Feedback
          </a>
        </li>
        <li>
          <a href="#navigation" class="hover:text-base-content">
            Navigation
          </a>
        </li>
        <li>
          <a href="#data" class="hover:text-base-content">
            Data
          </a>
        </li>
        <li>
          <a href="#pricing" class="hover:text-base-content">
            Pricing
          </a>
        </li>
      </ul>
    </div>
    <div class="navbar-end gap-2">
      <label
        for="google-signin-modal"
        class="btn btn-ghost btn-sm cursor-pointer">
        Sign in
      </label>
      <button class="btn btn-primary btn-sm">Get started</button>
    </div>
  </div>
);

// ── HERO ──
const Hero = () => (
  <section id="hero" class="relative mx-auto max-w-5xl px-12 py-36 text-center">
    <div class="bg-primary/5 pointer-events-none absolute top-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full blur-3xl" />
    <p class="text-primary mb-7 text-xs tracking-[0.2em] uppercase">
      v2.4.0 · 47 components · MIT license
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
      <label for="demo-modal" class="btn btn-primary">
        ▶ View demo
      </label>
      <button class="btn btn-ghost">Read the docs</button>
      <button class="btn btn-ghost text-primary font-mono text-sm">
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

// ── SECTION WRAPPER ──
const Section = ({
  id,
  label,
  title,
  sub,
  children,
  center = false,
}: {
  id?: string;
  label?: string;
  title?: string;
  sub?: string;
  children?: JSX.Element;
  center?: boolean;
}) => (
  <section id={id} class="mx-auto max-w-5xl px-12 py-24">
    {label && (
      <p class="text-primary mb-3 text-xs font-medium tracking-[0.14em] uppercase">
        {label}
      </p>
    )}
    {title && (
      <h2
        class={`mb-4 font-serif text-4xl leading-snug font-bold ${center ? 'text-center' : ''}`}>
        {title}
      </h2>
    )}
    {sub && (
      <p
        class={`text-base-content/60 mb-12 max-w-xl text-base leading-relaxed ${center ? 'mx-auto text-center' : ''}`}>
        {sub}
      </p>
    )}
    {children}
  </section>
);

// ── PRIMITIVES / BUTTONS + AVATARS + BADGES + CARDS ──
const PrimitivesSection = () => (
  <Section
    id="primitives"
    label="Primitives"
    title="Everything you need"
    sub="Atomic components built from design tokens. Every variant, every state, every size — composable by default.">
    {/* Buttons */}
    <div class="mb-10">
      <p class="text-base-content/50 mb-4 text-sm">Buttons</p>
      <div class="mb-4 flex flex-wrap items-center gap-3">
        <button class="btn btn-primary">Primary action</button>
        <button class="btn btn-ghost">Ghost</button>
        <button class="btn btn-error">Destructive</button>
        <button class="btn btn-primary btn-sm">Small</button>
        <button
          class="btn btn-ghost btn-sm cursor-not-allowed opacity-40"
          disabled>
          Disabled
        </button>
        <button class="btn btn-primary">
          <span class="loading loading-spinner loading-xs" />
          Loading…
        </button>
      </div>
      <div class="flex flex-wrap items-center gap-3">
        <button class="btn btn-square btn-ghost border-base-300 text-base-content/50 border">
          ⊕
        </button>
        <button class="btn btn-square btn-ghost border-base-300 text-base-content/50 border">
          ✎
        </button>
        <button class="btn btn-square btn-ghost border-base-300 text-base-content/50 border">
          ⋯
        </button>
        <span class="badge badge-ghost border-base-300 text-base-content/50 rounded-full border px-3 py-1 text-xs">
          v2.4.0
        </span>
        <span class="badge badge-ghost border-base-300 text-base-content/50 rounded-full border px-3 py-1 text-xs">
          MIT
        </span>
        <div class="tooltip tooltip-top" data-tip="This is a tooltip">
          <button class="btn btn-ghost btn-sm">Hover me</button>
        </div>
      </div>
    </div>

    {/* Avatars & Badges */}
    <div class="mb-10 grid grid-cols-2 gap-10">
      <div>
        <p class="text-base-content/50 mb-4 text-sm">Avatars</p>
        <div class="mb-4 flex gap-3">
          {[
            { initials: 'JD', cls: 'bg-primary/20 text-primary' },
            { initials: 'AL', cls: 'bg-success/20 text-success' },
            { initials: 'MK', cls: 'bg-info/20 text-info' },
            { initials: 'PR', cls: 'bg-error/20 text-error' },
          ].map(({ initials, cls }) => (
            <div class="avatar placeholder">
              <div class={`w-10 rounded-full ${cls}`}>
                <span class="text-sm font-medium">{initials}</span>
              </div>
            </div>
          ))}
        </div>
        <div class="avatar-group -space-x-3">
          {[
            { initials: 'JD', cls: 'bg-primary/20 text-primary' },
            { initials: 'AL', cls: 'bg-success/20 text-success' },
            { initials: 'MK', cls: 'bg-info/20 text-info' },
            { initials: '+9', cls: 'bg-base-300 text-base-content/50' },
          ].map(({ initials, cls }) => (
            <div class="avatar placeholder">
              <div class={`ring-base-100 w-10 rounded-full ring-2 ${cls}`}>
                <span class="text-xs font-medium">{initials}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p class="text-base-content/50 mb-4 text-sm">Badges &amp; tags</p>
        <div class="flex flex-wrap gap-3">
          <span class="badge badge-success">● Active</span>
          <span class="badge badge-error">● Offline</span>
          <span class="badge badge-warning">● Pending</span>
          <span class="badge badge-info">New</span>
          <span class="badge badge-warning text-warning-content">Premium</span>
          <span class="badge badge-neutral">Draft</span>
        </div>
      </div>
    </div>

    {/* Cards */}
    <p class="text-base-content/50 mb-4 text-sm">Cards</p>
    <div class="grid grid-cols-3 gap-5">
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
        <div class="card bg-base-200 border-base-300 hover:border-primary/40 border transition-colors">
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
  </Section>
);

// ── FORMS SECTION ──
const FormsSection = () => (
  <Section
    id="forms"
    label="Form controls"
    title="Forms that don't frustrate"
    sub="Validation states, accessible labels, and composable field groups — all wired up and ready to go.">
    <div class="grid grid-cols-2 gap-10">
      <div>
        <div class="mb-5 grid grid-cols-2 gap-5">
          <div class="form-control">
            <label class="label">
              <span class="label-text text-base-content/50 text-xs">
                First name
              </span>
            </label>
            <input
              type="text"
              placeholder="Jane"
              class="input input-bordered w-full"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text text-base-content/50 text-xs">
                Last name
              </span>
            </label>
            <input
              type="text"
              placeholder="Doe"
              class="input input-bordered w-full"
            />
          </div>
        </div>
        <div class="form-control mb-5">
          <label class="label">
            <span class="label-text text-base-content/50 text-xs">
              Email address
            </span>
          </label>
          <input
            type="email"
            placeholder="jane@forma.io"
            class="input input-bordered w-full"
          />
          <label class="label">
            <span class="label-text-alt text-base-content/40">
              We&apos;ll never share your email.
            </span>
          </label>
        </div>
        <div class="form-control mb-5">
          <label class="label">
            <span class="label-text text-base-content/50 text-xs">
              Invalid input
            </span>
          </label>
          <input
            type="text"
            defaultValue="bad-email@"
            class="input input-bordered input-error w-full"
          />
          <label class="label">
            <span class="label-text-alt text-error">
              Please enter a valid email address.
            </span>
          </label>
        </div>
        <div class="form-control mb-5">
          <label class="label">
            <span class="label-text text-base-content/50 text-xs">Role</span>
          </label>
          <select class="select select-bordered w-full">
            <option>Designer</option>
            <option>Engineer</option>
            <option>Product manager</option>
          </select>
        </div>
        <div class="form-control mb-5">
          <label class="label">
            <span class="label-text text-base-content/50 text-xs">
              Experience (years)
            </span>
          </label>
          <input
            type="range"
            min="0"
            max="20"
            defaultValue="5"
            class="range range-primary range-sm"
          />
        </div>
        <button class="btn btn-primary w-full">Submit</button>
      </div>
      <div>
        <p class="text-base-content/50 mb-4 text-sm">
          Toggles, checkboxes &amp; radios
        </p>
        <div class="mb-6 flex flex-col gap-3">
          {['Send email notifications', 'Weekly digest', 'Product updates'].map(
            (label, i) => (
              <label class="flex cursor-pointer items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  defaultChecked={i !== 1}
                  class="checkbox checkbox-primary checkbox-sm"
                />
                {label}
              </label>
            )
          )}
        </div>
        <div class="mb-6 flex flex-col gap-3">
          {['Monthly billing', 'Annual billing (save 20%)', 'Enterprise'].map(
            (label, i) => (
              <label class="flex cursor-pointer items-center gap-3 text-sm">
                <input
                  type="radio"
                  name="plan"
                  defaultChecked={i === 0}
                  class="radio radio-primary radio-sm"
                />
                {label}
              </label>
            )
          )}
        </div>
        <div class="flex flex-col gap-3">
          {[
            { label: 'Dark mode', checked: true },
            { label: 'Auto-save', checked: true },
            { label: 'Beta features', checked: false },
          ].map(({ label, checked }) => (
            <label class="flex cursor-pointer items-center gap-3 text-sm">
              <input
                type="checkbox"
                defaultChecked={checked}
                class="toggle toggle-primary toggle-sm"
              />
              {label}
            </label>
          ))}
        </div>
      </div>
    </div>
  </Section>
);

// ── FEEDBACK SECTION ──
const FeedbackSection = () => (
  <Section
    id="feedback"
    label="Feedback & display"
    title="Communicate every state"
    sub="Alerts, toasts, progress, skeletons — all the patterns you need to tell users what's happening.">
    <div class="mb-10 grid grid-cols-2 gap-10">
      <div>
        <p class="text-base-content/50 mb-4 text-sm">Alerts</p>
        <div class="flex flex-col gap-3">
          <div role="alert" class="alert alert-success text-sm">
            <span>✓</span>
            <div>
              <strong class="block">Changes saved</strong>
              <span class="text-xs opacity-80">
                Your profile was updated successfully.
              </span>
            </div>
          </div>
          <div role="alert" class="alert alert-error text-sm">
            <span>✕</span>
            <div>
              <strong class="block">Payment failed</strong>
              <span class="text-xs opacity-80">
                Your card was declined. Please try again.
              </span>
            </div>
          </div>
          <div role="alert" class="alert alert-warning text-sm">
            <span>⚠</span>
            <div>
              <strong class="block">Trial ending soon</strong>
              <span class="text-xs opacity-80">
                7 days left in your free trial.
              </span>
            </div>
          </div>
          <div role="alert" class="alert alert-info text-sm">
            <span>ℹ</span>
            <div>
              <strong class="block">Scheduled maintenance</strong>
              <span class="text-xs opacity-80">
                Downtime on Sat, Apr 6 from 02:00–04:00 UTC.
              </span>
            </div>
          </div>
        </div>
        <p class="text-base-content/50 mt-6 mb-4 text-sm">Toast</p>
        <div class="relative h-14">
          <div class="bg-base-300 border-base-content/10 absolute right-0 bottom-0 flex items-center gap-3 rounded-xl border px-4 py-3 text-sm shadow-lg">
            <span class="text-success">✓</span>
            <span>Copied to clipboard</span>
            <button class="text-base-content/40 hover:text-base-content ml-2 text-base leading-none">
              ✕
            </button>
          </div>
        </div>
      </div>
      <div>
        <p class="text-base-content/50 mb-4 text-sm">Progress &amp; steps</p>
        <div class="mb-8 flex flex-col gap-2">
          {[
            { label: 'Uploading files', pct: 72 },
            { label: 'Processing', pct: 40 },
            { label: 'Indexing', pct: 100 },
          ].map(({ label, pct }) => (
            <div>
              <div class="text-base-content/50 mb-1 flex justify-between text-xs">
                <span>{label}</span>
                <span>{pct}%</span>
              </div>
              <progress
                class="progress progress-primary h-[6px] w-full"
                value={pct}
                max="100"
              />
            </div>
          ))}
        </div>
        <ul class="steps steps-horizontal mb-8 w-full text-xs">
          <li class="step step-primary" data-content="✓">
            Account
          </li>
          <li class="step step-primary" data-content="✓">
            Profile
          </li>
          <li class="step step-primary">Billing</li>
          <li class="step">Done</li>
        </ul>
        <p class="text-base-content/50 mb-4 text-sm">Skeleton &amp; spinner</p>
        <div class="flex items-start gap-3">
          <div class="skeleton h-11 w-11 shrink-0 rounded-full" />
          <div class="flex flex-1 flex-col gap-2">
            <div class="skeleton h-3 w-3/5" />
            <div class="skeleton h-3 w-4/5" />
            <div class="skeleton h-3 w-2/5" />
          </div>
        </div>
        <div class="mt-4 flex items-center gap-3">
          <span class="loading loading-spinner loading-sm text-primary" />
          <span class="text-base-content/50 text-sm">
            Loading your workspace…
          </span>
        </div>
      </div>
    </div>
    {/* Empty state */}
    <div class="card bg-base-200 border-base-300 border">
      <div class="card-body items-center py-12 text-center">
        <div class="mb-4 text-5xl opacity-40">◌</div>
        <h3 class="mb-2 text-base font-medium">No components yet</h3>
        <p class="text-base-content/50 mb-6 text-sm">
          Start building your library by adding your first component.
        </p>
        <button class="btn btn-primary btn-sm">Add component</button>
      </div>
    </div>
  </Section>
);

// ── NAVIGATION SECTION ──
const NavigationSection = () => {
  const [activeTab, setActiveTab] = createSignal<
    'overview' | 'api' | 'examples' | 'changelog'
  >('overview');
  const tabContent: Record<string, string> = {
    overview:
      'The Overview tab shows a high-level description of the component, its variants, and usage guidelines. Switch tabs to explore the API reference, live code examples, and version history.',
    api: 'API reference: Button accepts `variant` (primary | ghost | danger), `size` (sm | md | lg), `loading` (boolean), `disabled` (boolean), and all native button props via rest spread.',
    examples:
      '<Button variant="primary" size="md" onClick={handleSubmit}>Save changes</Button>',
    changelog:
      'v2.4.0 — Added icon-only variant and loading state. v2.3.0 — New danger variant. v2.2.0 — Keyboard focus ring improvements.',
  };
  return (
    <Section
      id="navigation"
      label="Navigation"
      title="Find your way"
      sub="Tabs, breadcrumbs, pagination, and more — every pattern users expect, executed with precision.">
      {/* Breadcrumb */}
      <div class="mb-8">
        <p class="text-base-content/50 mb-4 text-sm">Breadcrumb</p>
        <div class="breadcrumbs text-base-content/50 text-sm">
          <ul>
            <li>
              <a href="#" class="hover:text-primary">
                Home
              </a>
            </li>
            <li>
              <a href="#" class="hover:text-primary">
                Components
              </a>
            </li>
            <li>
              <a href="#" class="hover:text-primary">
                Navigation
              </a>
            </li>
            <li class="text-base-content">Breadcrumb</li>
          </ul>
        </div>
      </div>
      {/* Tabs */}
      <div class="mb-8">
        <p class="text-base-content/50 mb-4 text-sm">Tabs</p>
        <div role="tablist" class="tabs tabs-bordered">
          {(['overview', 'api', 'examples', 'changelog'] as const).map((t) => (
            <button
              role="tab"
              onClick={() => setActiveTab(t)}
              class={`tab capitalize ${activeTab() === t ? 'tab-active text-primary' : 'text-base-content/50'}`}>
              {t}
            </button>
          ))}
        </div>
        <p class="text-base-content/50 mt-4 font-mono text-sm leading-relaxed">
          {tabContent[activeTab()]}
        </p>
      </div>
      {/* Pagination */}
      <div class="mb-8">
        <p class="text-base-content/50 mb-4 text-sm">Pagination</p>
        <div class="join">
          {['‹', '1', '2', '3', '…', '12', '›'].map((p, i) => (
            <button
              class={`join-item btn btn-sm ${p === '1' ? 'btn-primary' : 'btn-ghost border-base-300 border'} ${p === '…' ? 'btn-disabled opacity-40' : ''}`}>
              {p}
            </button>
          ))}
        </div>
      </div>
      {/* Overlay triggers */}
      <div class="flex flex-wrap gap-3">
        <label for="demo-modal" class="btn btn-ghost border-base-300 border">
          Open modal ↗
        </label>
        <label for="demo-drawer" class="btn btn-ghost border-base-300 border">
          Open drawer ↗
        </label>
        <ColorPopover />
      </div>
    </Section>
  );
};

// ── COLOR POPOVER ──
const ColorPopover = () => {
  const [open, setOpen] = createSignal(false);
  const colors = [
    { bg: '#c9a84c', label: 'Gold' },
    { bg: '#6fcfa4', label: 'Teal' },
    { bg: '#6fa0cf', label: 'Blue' },
    { bg: '#cf6f6f', label: 'Red' },
    { bg: '#cf9f6f', label: 'Orange' },
    { bg: '#9f6fcf', label: 'Purple' },
  ];
  return (
    <div class="relative">
      <button
        class="btn btn-ghost border-base-300 border"
        onClick={() => setOpen(!open())}>
        Color popover ↓
      </button>
      {open() && (
        <div class="bg-base-300 border-base-content/10 absolute top-full left-0 z-50 mt-2 w-56 rounded-2xl border p-4 shadow-xl">
          <p class="text-base-content/50 mb-3 text-xs">Choose accent color</p>
          <div class="flex flex-wrap gap-2">
            {colors.map(({ bg, label }) => (
              <div
                title={label}
                class="hover:border-base-content h-8 w-8 cursor-pointer rounded-lg border-2 border-transparent transition-colors"
                style={{ background: bg }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ── CONTAINERS / ACCORDION + CALENDAR ──
const ContainersSection = () => {
  const faqs = [
    {
      q: 'What tokens does Forma export?',
      a: 'Forma exports CSS custom properties for color, spacing, radius, shadow, and typography — plus a JS token object for use in styled-components or Tailwind configs.',
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
      q: 'Can I use Forma in a commercial project?',
      a: 'Yes — Forma is MIT licensed. You can use it in personal, open-source, and commercial projects with no restrictions.',
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
    ].map((d) => ({ day: d, type: '' })),
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
      <div class="grid grid-cols-2 gap-10">
        {/* Accordion */}
        <div>
          <p class="text-base-content/50 mb-4 text-sm">Accordion</p>
          <div class="border-base-300 overflow-hidden rounded-2xl border">
            {faqs.map(({ q, a }, i) => (
              <div
                class={`collapse-arrow collapse ${i === 0 ? 'collapse-open' : ''} border-base-300 border-b bg-transparent last:border-b-0`}>
                <input type="radio" name="faq" defaultChecked={i === 0} />
                <div class="collapse-title text-base-content px-5 py-4 text-sm font-medium">
                  {q}
                </div>
                <div class="collapse-content px-5">
                  <p class="text-base-content/50 pb-2 text-sm leading-relaxed">
                    {a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Calendar */}
        <div>
          <p class="text-base-content/50 mb-4 text-sm">
            Calendar / Date picker
          </p>
          <div class="border-base-300 overflow-hidden rounded-2xl border">
            <div class="bg-base-300 border-base-content/10 flex items-center justify-between border-b px-5 py-4">
              <button class="btn btn-ghost btn-xs">‹</button>
              <span class="text-sm font-medium">April 2026</span>
              <button class="btn btn-ghost btn-xs">›</button>
            </div>
            <div class="grid grid-cols-7">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                <div class="text-base-content/40 bg-base-300 border-base-content/10 border-b py-2 text-center text-[11px] font-medium tracking-wider uppercase">
                  {d}
                </div>
              ))}
              {calDays.map(({ day, type }, i) => (
                <div
                  class={`border-base-content/10 cursor-pointer border-r border-b py-[10px] text-center text-xs transition-colors last:border-r-0 ${dayTypeClass[type]}`}>
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

// ── DATA SECTION ──
const DataSection = () => {
  const bars = [
    { month: 'Jan', val: '$42k', pct: 58 },
    { month: 'Feb', val: '$55k', pct: 72 },
    { month: 'Mar', val: '$49k', pct: 65 },
    { month: 'Apr', val: '$78k', pct: 100, gold: true },
    { month: 'May', val: '$61k', pct: 80 },
    { month: 'Jun', val: '$70k', pct: 92 },
  ];
  const rows = [
    {
      name: 'Button',
      cat: 'Primitive',
      catBadge: 'badge-info',
      status: '● Stable',
      statusBadge: 'badge-success',
      ver: '2.4.0',
      checked: true,
    },
    {
      name: 'DataTable',
      cat: 'Data',
      catBadge: 'badge-warning',
      status: '● Stable',
      statusBadge: 'badge-success',
      ver: '2.3.1',
      checked: false,
    },
    {
      name: 'CommandMenu',
      cat: 'Navigation',
      catBadge: 'badge-neutral',
      status: '● Beta',
      statusBadge: 'badge-warning',
      ver: '0.9.2',
      checked: false,
    },
    {
      name: 'DateRangePicker',
      cat: 'Form',
      catBadge: 'badge-neutral',
      status: '● Deprecated',
      statusBadge: 'badge-error',
      ver: '1.8.0',
      checked: false,
    },
  ];
  return (
    <Section
      id="data"
      label="Data display"
      title="Make data legible"
      sub="Tables, charts, and lists that scale from a handful of records to millions — without sacrificing clarity.">
      {/* Chart */}
      <div class="card bg-base-200 border-base-300 mb-8 border">
        <div class="card-body p-7">
          <p class="mb-1 text-sm font-medium">Monthly revenue</p>
          <p class="text-base-content/40 mb-6 text-xs">Q1 · Q2 2026</p>
          <div class="relative flex h-36 items-end gap-2">
            <div class="bg-base-content/10 absolute right-0 bottom-7 left-0 h-px" />
            {bars.map(({ month, val, pct, gold }) => (
              <div class="flex h-full flex-1 flex-col items-center justify-end gap-1">
                <span class="text-base-content/30 text-[11px]">{val}</span>
                <div
                  class={`w-full cursor-pointer rounded-t opacity-85 transition-opacity hover:opacity-100 ${gold ? 'bg-primary' : 'bg-base-300'}`}
                  style={{ height: `${pct}%` }}
                />
                <span class="text-base-content/30 text-[11px]">{month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Table */}
      <div class="border-base-300 overflow-hidden rounded-2xl border">
        <table class="table-sm table w-full text-sm">
          <thead class="bg-base-300 text-base-content/40 text-xs tracking-wider uppercase">
            <tr>
              <th>
                <input
                  type="checkbox"
                  class="checkbox checkbox-primary checkbox-xs"
                />
              </th>
              <th class="hover:text-primary cursor-pointer">Component ↑</th>
              <th class="hover:text-primary cursor-pointer">Category</th>
              <th>Status</th>
              <th class="hover:text-primary cursor-pointer">Version</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(
              ({ name, cat, catBadge, status, statusBadge, ver, checked }) => (
                <tr class="hover:bg-base-content/[0.02] border-base-300 border-t">
                  <td>
                    <input
                      type="checkbox"
                      defaultChecked={checked}
                      class="checkbox checkbox-primary checkbox-xs"
                    />
                  </td>
                  <td class="font-medium">{name}</td>
                  <td>
                    <span class={`badge ${catBadge} badge-sm`}>{cat}</span>
                  </td>
                  <td>
                    <span class={`badge ${statusBadge} badge-sm`}>
                      {status}
                    </span>
                  </td>
                  <td>
                    <span class="text-primary font-mono text-xs">{ver}</span>
                  </td>
                  <td>
                    <button class="btn btn-ghost btn-xs border-base-300 border">
                      View
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </Section>
  );
};

// ── PRICING SECTION ──
const PricingSection = () => {
  const plans = [
    {
      tier: 'Starter',
      price: 'Free',
      period: 'forever',
      features: ['47 base components', 'Community support', 'MIT license'],
      cta: 'Get started',
      featured: false,
      primary: false,
    },
    {
      tier: 'Pro',
      price: '$29',
      period: 'per seat / month',
      features: [
        'Everything in Starter',
        'Figma kit included',
        'Priority support',
        'Private Slack channel',
      ],
      cta: 'Start free trial',
      featured: true,
      primary: true,
    },
    {
      tier: 'Enterprise',
      price: 'Custom',
      period: 'talk to us',
      features: [
        'Everything in Pro',
        'White-label rights',
        'SLA & dedicated support',
        'Custom token generation',
      ],
      cta: 'Contact sales',
      featured: false,
      primary: false,
    },
  ];
  return (
    <Section
      id="pricing"
      label="Pricing"
      title="Simple, honest pricing"
      sub="No hidden fees. Cancel anytime. Every plan includes the full component library."
      center>
      <div class="grid grid-cols-3 gap-5">
        {plans.map(
          ({ tier, price, period, features, cta, featured, primary }) => (
            <div
              class={`card border ${featured ? 'border-primary relative' : 'border-base-300'} bg-base-200`}>
              {featured && (
                <div class="bg-primary text-primary-content absolute -top-px right-5 rounded-b-lg px-3 py-1 text-[11px] font-semibold tracking-wider">
                  POPULAR
                </div>
              )}
              <div class="card-body p-8">
                <p class="text-base-content/40 mb-3 text-xs font-medium tracking-widest uppercase">
                  {tier}
                </p>
                <p
                  class={`mb-1 font-serif text-4xl font-bold ${featured ? 'text-primary' : ''}`}>
                  {price}
                </p>
                <p class="text-base-content/40 mb-7 text-sm">{period}</p>
                <ul class="text-base-content/50 mb-7 flex flex-col gap-2 text-sm">
                  {features.map((f) => (
                    <li class="before:text-primary before:font-semibold before:content-['✓_']">
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  class={`btn w-full ${primary ? 'btn-primary' : 'btn-ghost border-base-300'}`}>
                  {cta}
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </Section>
  );
};

// ── FOOTER ──
const Footer = () => (
  <footer class="border-base-300 border-t py-12 text-center">
    <p class="text-primary mb-3 font-serif text-3xl">Forma</p>
    <p class="text-base-content/30 text-sm">
      © 2026 Forma Design System · Built with care · MIT License
    </p>
  </footer>
);

// ── MODAL ──
const DemoModal = () => (
  <>
    <input type="checkbox" id="demo-modal" class="modal-toggle" />
    <div class="modal modal-bottom sm:modal-middle" role="dialog">
      <div class="modal-box bg-base-200 border-base-300 border">
        <h3 class="mb-4 font-serif text-xl font-bold">Modal component</h3>
        <p class="text-base-content/50 mb-7 text-sm leading-relaxed">
          This is a modal dialog. It traps focus, supports Escape key dismissal,
          and renders in a portal to avoid z-index collisions. Use it for
          confirmations, forms, and contextual detail views.
        </p>
        <div class="modal-action">
          <label for="demo-modal" class="btn btn-ghost border-base-300 border">
            Cancel
          </label>
          <label for="demo-modal" class="btn btn-primary">
            Confirm
          </label>
        </div>
      </div>
      <label class="modal-backdrop" for="demo-modal" />
    </div>
  </>
);

// ── DRAWER ──
const DemoDrawer = () => (
  <div class="drawer drawer-end">
    <input id="demo-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-side z-50">
      <label for="demo-drawer" class="drawer-overlay" />
      <div class="bg-base-200 border-base-300 min-h-full w-96 border-l p-8">
        <div class="mb-7 flex items-center justify-between">
          <h3 class="font-serif text-xl font-bold">Drawer panel</h3>
          <label
            for="demo-drawer"
            class="btn btn-ghost btn-sm btn-square text-base-content/50">
            ✕
          </label>
        </div>
        <p class="text-base-content/50 mb-6 text-sm leading-relaxed">
          Drawers slide in from the edge of the screen. Ideal for settings
          panels, detail views, and secondary navigation. Focus is trapped
          within the drawer while it&apos;s open.
        </p>
        <div class="form-control mb-4">
          <label class="label">
            <span class="label-text text-base-content/50 text-xs">Theme</span>
          </label>
          <select class="select select-bordered w-full">
            <option>Dark (Obsidian)</option>
            <option>Light (Chalk)</option>
            <option>Auto (system)</option>
          </select>
        </div>
        <div class="form-control mb-6">
          <label class="label">
            <span class="label-text text-base-content/50 text-xs">
              Accent color
            </span>
          </label>
          <select class="select select-bordered w-full">
            <option>Gold</option>
            <option>Teal</option>
            <option>Coral</option>
          </select>
        </div>
        <button class="btn btn-primary w-full">Save settings</button>
      </div>
    </div>
  </div>
);

// ── Template ──
export const ComponentsTemplate = () => {
  return (
    <div
      class="bg-base-100 text-base-content min-h-screen font-sans"
      data-theme="luxury">
      <DemoDrawer />
      <Nav />
      <Hero />
      <div class="border-base-300 mx-12 border-t" />
      <PrimitivesSection />
      <div class="border-base-300 mx-12 border-t" />
      <FormsSection />
      <div class="border-base-300 mx-12 border-t" />
      <FeedbackSection />
      <div class="border-base-300 mx-12 border-t" />
      <NavigationSection />
      <div class="border-base-300 mx-12 border-t" />
      <ContainersSection />
      <div class="border-base-300 mx-12 border-t" />
      <DataSection />
      <div class="border-base-300 mx-12 border-t" />
      <PricingSection />
      <Footer />
      <DemoModal />
      <GoogleSignInModal />
    </div>
  );
};
