# Organisms

Full sections in `src/components/organisms/`.

### BlogSection

File: `src/components/organisms/BlogSection.tsx`

| Prop     | Type                                                                             | Default          | Description     |
| -------- | -------------------------------------------------------------------------------- | ---------------- | --------------- |
| `posts`  | `{ id: string; title: string; excerpt?: string; date?: string; tag?: string }[]` | —                | Blog post cards |
| `title?` | `string`                                                                         | `'Latest posts'` | Section heading |

Three-column card grid. Each post shows an optional `badge-ghost` tag, title,
excerpt, and `time` date.

```tsx
<BlogSection
  posts={[
    {
      id: '1',
      title: 'Announcing v2',
      excerpt: 'Big release.',
      date: 'Aug 2026',
      tag: 'Release',
    },
  ]}
/>
```

### CTASection

File: `src/components/organisms/CTASection.tsx`

| Prop            | Type                              | Default | Description           |
| --------------- | --------------------------------- | ------- | --------------------- |
| `title`         | `string`                          | —       | Heading               |
| `description?`  | `string`                          | —       | Muted subtitle        |
| `primaryCta?`   | `{ label: string; href: string }` | —       | Primary `Link` button |
| `secondaryCta?` | `{ label: string; href: string }` | —       | Outline `Link` button |
| `badge?`        | `string`                          | —       | `badge badge-primary` |

Centered call-to-action panel using `next/link` for both CTAs.

```tsx
<CTASection
  title="Ready to ship?"
  primaryCta={{ label: 'Get started', href: '/signup' }}
  secondaryCta={{ label: 'Talk to sales', href: '/contact' }}
/>
```

### ContactSection

File: `src/components/organisms/ContactSection.tsx` — client component.

| Prop           | Type                                                                  | Default        | Description            |
| -------------- | --------------------------------------------------------------------- | -------------- | ---------------------- |
| `title?`       | `string`                                                              | `'Contact us'` | Section heading        |
| `description?` | `string`                                                              | —              | Muted subtitle         |
| `onSubmit?`    | `(payload: { name: string; email: string; message: string }) => void` | —              | Called with valid data |

Validates name/email/message, shows a `text-error` message on failure, and
replaces the form with a `Message sent` status badge on success. Built with
`FormRow` and `Button`.

```tsx
<ContactSection title="Get in touch" onSubmit={(data) => sendMessage(data)} />
```

### ChatWindow

File: `src/components/organisms/ChatWindow.tsx` — client component.

| Prop           | Type                                                                          | Default               | Description                    |
| -------------- | ----------------------------------------------------------------------------- | --------------------- | ------------------------------ |
| `messages`     | `{ id: string; sender: 'user' \| 'assistant'; text: string; name?; time? }[]` | —                     | Thread history                 |
| `onSend`       | `(text: string) => void`                                                      | —                     | Called when a message is sent  |
| `title?`       | `string`                                                                      | —                     | Header heading                 |
| `placeholder?` | `string`                                                                      | `'Type a message...'` | Input placeholder              |
| `disabled?`    | `boolean`                                                                     | `false`               | Disables input and send button |

Renders a scrollable `ChatBubble` list with a message input; `Enter` or the send
button submits non-empty drafts.

### DataTable

File: `src/components/organisms/DataTable.tsx`

| Prop         | Type                                                             | Default               | Description                |
| ------------ | ---------------------------------------------------------------- | --------------------- | -------------------------- |
| `columns`    | `{ key: string; header: string; render?: (row) => ReactNode }[]` | —                     | Column definitions         |
| `rows`       | `Record<string, unknown>[]`                                      | —                     | Data rows                  |
| `emptyText?` | `string`                                                         | `'No records found.'` | Shown when `rows` is empty |

```tsx
<DataTable
  columns={[
    { key: 'name', header: 'Member' },
    { key: 'role', header: 'Role' },
  ]}
  rows={[{ name: 'Jane Doe', role: 'Admin' }]}
/>
```

### FeatureGrid

File: `src/components/organisms/FeatureGrid.tsx`

| Prop       | Type                                                        | Default | Description             |
| ---------- | ----------------------------------------------------------- | ------- | ----------------------- |
| `features` | `{ icon: ReactNode; title: string; description: string }[]` | —       | Feature cards           |
| `columns?` | `1 \| 2 \| 3 \| 4`                                          | `3`     | Responsive grid columns |

### FAQSection

File: `src/components/organisms/FAQSection.tsx`

| Prop     | Type                                     | Default | Description           |
| -------- | ---------------------------------------- | ------- | --------------------- |
| `items`  | `{ question: string; answer: string }[]` | —       | Question/answer pairs |
| `title?` | `string`                                 | `'FAQ'` | Section heading       |

Renders an `Accordion` (multi-open) centered in a `max-w-3xl` column.

### Footer

File: `src/components/organisms/Footer.tsx`

| Prop           | Type                                            | Default | Description       |
| -------------- | ----------------------------------------------- | ------- | ----------------- |
| `brand`        | `string`                                        | —       | Brand name        |
| `description?` | `string`                                        | —       | Brand blurb       |
| `columns`      | `{ title: string; links: { label, href }[] }[]` | —       | Link columns      |
| `copyright?`   | `string`                                        | —       | Bottom legal line |

### Header

File: `src/components/organisms/Header.tsx`

| Prop        | Type        | Default | Description                        |
| ----------- | ----------- | ------- | ---------------------------------- |
| `title`     | `string`    | —       | `h1` page title                    |
| `subtitle?` | `string`    | —       | Muted text under title             |
| `badges?`   | `ReactNode` | —       | Badges next to the title           |
| `action?`   | `ReactNode` | —       | Right-aligned action (e.g. button) |
| `backHref?` | `string`    | —       | Renders a back arrow `Link` to it  |

Sticky top bar (`sticky top-0 z-10 border-b px-6 py-4`).

### Hero

File: `src/components/organisms/Hero.tsx`

| Prop            | Type                              | Default | Description                     |
| --------------- | --------------------------------- | ------- | ------------------------------- |
| `title`         | `string`                          | —       | `h1` headline                   |
| `tagline?`      | `string`                          | —       | Uppercase eyebrow text          |
| `description?`  | `string`                          | —       | Muted supporting paragraph      |
| `primaryCta?`   | `{ label: string; href: string }` | —       | Solid `Link` button             |
| `secondaryCta?` | `{ label: string; href: string }` | —       | Outline `Link` button           |
| `badge?`        | `string`                          | —       | `badge-primary` above the title |

Centered marketing hero (`rounded-2xl border bg-base-200`).

### Navbar

File: `src/components/organisms/Navbar.tsx` — client component.

| Prop        | Type                                                  | Default    | Description |
| ----------- | ----------------------------------------------------- | ---------- | ----------- |
| `items`     | `{ label: string; href: string; icon?: ReactNode }[]` | —          | Nav links   |
| `position?` | `'bottom' \| 'top'`                                   | `'bottom'` | Fixed edge  |

Active link is highlighted via `usePathname()` (`/` matches exactly; other links
match by `startsWith`).

### NewsletterSection

File: `src/components/organisms/NewsletterSection.tsx` — client component.

| Prop           | Type                      | Default                                        | Description                       |
| -------------- | ------------------------- | ---------------------------------------------- | --------------------------------- |
| `title?`       | `string`                  | `'Stay in the loop'`                           | Section heading                   |
| `description?` | `string`                  | `'Get product updates and news once a month.'` | Muted blurb                       |
| `buttonLabel?` | `string`                  | `'Subscribe'`                                  | Submit button text                |
| `onSubmit?`    | `(email: string) => void` | —                                              | Called after successful subscribe |

Validates the email (regex) and swaps the form for a success `role="status"`
badge; the form uses `noValidate` so the custom message shows.

### PricingSection

File: `src/components/organisms/PricingSection.tsx`

| Prop    | Type                                                                                            | Default | Description   |
| ------- | ----------------------------------------------------------------------------------------------- | ------- | ------------- |
| `plans` | `{ name; price; period?; description?; features: string[]; highlighted?; ctaLabel; ctaHref }[]` | —       | Pricing tiers |

Renders a 3-column grid of pricing cards; `highlighted` plans get the primary
border, tinted background, and a solid `btn-primary` CTA.

### Sidebar

File: `src/components/organisms/Sidebar.tsx` — client component.

| Prop      | Type                               | Default | Description           |
| --------- | ---------------------------------- | ------- | --------------------- |
| `title`   | `string`                           | —       | Sidebar heading       |
| `items`   | `{ label; href; icon?; badge? }[]` | —       | Nav links             |
| `footer?` | `ReactNode`                        | —       | Pinned footer content |

Active item is highlighted from `usePathname()` (`/` exact; others by prefix).

### StatsGrid

File: `src/components/organisms/StatsGrid.tsx`

| Prop       | Type                                                                                                | Default | Description             |
| ---------- | --------------------------------------------------------------------------------------------------- | ------- | ----------------------- |
| `stats`    | `{ label: string; value: string; icon?: ReactNode; description?: string; variant?: StatVariant }[]` | —       | Stats to display        |
| `columns?` | `2 \| 3 \| 4`                                                                                       | `4`     | Responsive grid columns |

Wraps each `Stat` in a bordered card and lays them out in a grid.

### TeamSection

File: `src/components/organisms/TeamSection.tsx`

| Prop      | Type                                                                 | Default      | Description       |
| --------- | -------------------------------------------------------------------- | ------------ | ----------------- |
| `members` | `{ name: string; role?: string; bio?: string; initials?: string }[]` | —            | Team member cards |
| `title?`  | `string`                                                             | `'Our team'` | Section heading   |

Centered heading with a responsive avatar grid. Each member gets a circular
initials avatar (`bg-neutral`), name, role, and optional bio.

```tsx
<TeamSection
  members={[
    { name: 'Alan Turing', role: 'Founder', bio: 'Math genius.' },
    { name: 'Katherine Johnson', role: 'CTO' },
  ]}
/>
```

### TestimonialSection

File: `src/components/organisms/TestimonialSection.tsx`

| Prop       | Type                                                                    | Default          | Description             |
| ---------- | ----------------------------------------------------------------------- | ---------------- | ----------------------- |
| `items`    | `{ quote: string; author: string; role?: string; initials?: string }[]` | —                | Quote cards             |
| `title?`   | `string`                                                                | `'Testimonials'` | Section heading         |
| `columns?` | `2 \| 3`                                                                | `3`              | Responsive grid columns |

Card-based quotes with initials avatars; initials fall back to the first two
letters of the author's name.

```tsx
<TestimonialSection
  items={[
    {
      quote: 'The best library we have used.',
      author: 'Ada Lovelace',
      role: 'Engineer',
    },
  ]}
/>
```

### Toolbar

File: `src/components/organisms/Toolbar.tsx`

| Prop        | Type          | Default | Description            |
| ----------- | ------------- | ------- | ---------------------- |
| `title?`    | `string`      | —       | Section heading        |
| `subtitle?` | `string`      | —       | Muted helper text      |
| `actions?`  | `ReactNode[]` | —       | Right-aligned controls |
| `children?` | `ReactNode`   | —       | Extra row below        |

### ActivityFeed

File: `src/components/organisms/ActivityFeed.tsx`

| Prop     | Type                                                                                                                   | Default | Description  |
| -------- | ---------------------------------------------------------------------------------------------------------------------- | ------- | ------------ |
| `items`  | `{ id: string; title: string; description?; time?; icon?; status?: 'neutral' \| 'success' \| 'warning' \| 'error' }[]` | —       | Feed entries |
| `title?` | `string`                                                                                                               | —       | Heading text |

Vertical feed where each row shows an icon (or a coloured status dot), a title,
an optional description, and a time.

```tsx
<ActivityFeed items={items} title="Recent activity" />
```

### AnnouncementBar

File: `src/components/organisms/AnnouncementBar.tsx` — client component.

| Prop           | Type                                 | Default     | Description              |
| -------------- | ------------------------------------ | ----------- | ------------------------ |
| `text`         | `string`                             | —           | Announcement message     |
| `link?`        | `{ label: string; href: string }`    | —           | Optional `next/link` CTA |
| `variant?`     | `'primary' \| 'accent' \| 'neutral'` | `'primary'` | Colour variant           |
| `dismissible?` | `boolean`                            | `false`     | Shows a dismiss button   |
| `onDismiss?`   | `() => void`                         | —           | Called when dismissed    |

```tsx
<AnnouncementBar
  text="Early bird sale"
  link={{ label: 'Shop', href: '/shop' }}
/>
```

### AuthForm

File: `src/components/organisms/AuthForm.tsx` — client component.

| Prop       | Type                                                                    | Default   | Description                   |
| ---------- | ----------------------------------------------------------------------- | --------- | ----------------------------- |
| `mode?`    | `'login' \| 'signup'`                                                   | `'login'` | Which fields to show          |
| `title?`   | `string`                                                                | —         | Overrides the default heading |
| `onSubmit` | `(payload: { name?: string; email: string; password: string }) => void` | —         | Submit handler                |
| `loading?` | `boolean`                                                               | `false`   | Renders a loading button      |
| `error?`   | `string`                                                                | —         | External error text           |

Client-side validation: signup requires a name, the email must match a basic
pattern, and the password must be at least 6 characters. Uses `TextField` +
`PasswordField`.

```tsx
<AuthForm mode="signup" onSubmit={handleSubmit} />
```

### CommandMenu

File: `src/components/organisms/CommandMenu.tsx` — client component.

| Prop           | Type                                                                 | Default                       | Description         |
| -------------- | -------------------------------------------------------------------- | ----------------------------- | ------------------- |
| `open`         | `boolean`                                                            | —                             | Show the menu       |
| `onClose`      | `() => void`                                                         | —                             | Called to dismiss   |
| `items`        | `{ id; label; description?; keywords?; icon?; onSelect?; group? }[]` | —                             | Command definitions |
| `placeholder?` | `string`                                                             | `'Type a command or search…'` | Search placeholder  |

Keyboard-navigable palette: `Escape` closes, `ArrowUp`/`ArrowDown` move the
active index, `Enter` selects. Filters by label, description, or keywords.

```tsx
<CommandMenu open={open} onClose={close} items={commands} />
```

### CookieBanner

File: `src/components/organisms/CookieBanner.tsx` — client component.

| Prop           | Type         | Default                                        | Description             |
| -------------- | ------------ | ---------------------------------------------- | ----------------------- |
| `onAccept`     | `() => void` | —                                              | Called on accept        |
| `onDecline`    | `() => void` | —                                              | Called on decline       |
| `message?`     | `string`     | `'We use cookies to improve your experience.'` | Banner text             |
| `policyHref?`  | `string`     | `'/privacy'`                                   | Policy `next/link` href |
| `policyLabel?` | `string`     | `'Privacy policy'`                             | Policy link label       |

Fixed bottom bar; both actions hide the banner.

```tsx
<CookieBanner onAccept={accept} onDecline={decline} />
```

### LogosSection

File: `src/components/organisms/LogosSection.tsx`

| Prop       | Type                                   | Default              | Description             |
| ---------- | -------------------------------------- | -------------------- | ----------------------- |
| `items`    | `{ name: string; icon?: ReactNode }[]` | —                    | Logos to display        |
| `title?`   | `string`                               | `'Trusted by teams'` | Muted heading           |
| `columns?` | `2 \| 3 \| 4 \| 5 \| 6`                | `6`                  | Responsive grid columns |

```tsx
<LogosSection items={logos} columns={4} />
```

### Marquee

File: `src/components/organisms/Marquee.tsx`

| Prop         | Type          | Default | Description      |
| ------------ | ------------- | ------- | ---------------- |
| `items`      | `ReactNode[]` | —       | Items to animate |
| `title?`     | `string`      | —       | Optional heading |
| `className?` | `string`      | `''`    | Extra classes    |

Duplicates the items and scrolls them via the `animate-marquee` utility (defined
in `src/styles/atomic-demo.css`).

```tsx
<Marquee title="Powered by" items={items} />
```

### ProfileCard

File: `src/components/organisms/ProfileCard.tsx`

| Prop       | Type                                 | Default | Description        |
| ---------- | ------------------------------------ | ------- | ------------------ |
| `name`     | `string`                             | —       | Display name       |
| `role?`    | `string`                             | —       | Primary role       |
| `bio?`     | `string`                             | —       | Short biography    |
| `avatar?`  | `{ src?; alt: string; initials? }`   | —       | Avatar atom props  |
| `badges?`  | `string[]`                           | `[]`    | Badge labels       |
| `stats?`   | `{ label: string; value: string }[]` | `[]`    | Three-up stats row |
| `actions?` | `ReactNode`                          | —       | Action buttons     |

Centered card built on the `Avatar` atom; stats render in a 3-column grid.

```tsx
<ProfileCard name="Jane Doe" role="Engineer" badges={['Fellow']} />
```

### Calendar

File: `src/components/organisms/Calendar.tsx` — client component.

| Prop         | Type                   | Default | Description                 |
| ------------ | ---------------------- | ------- | --------------------------- |
| `value?`     | `Date`                 | —       | Selected date               |
| `onChange?`  | `(date: Date) => void` | —       | Called when a day is chosen |
| `minDate?`   | `Date`                 | —       | Earliest selectable date    |
| `maxDate?`   | `Date`                 | —       | Latest selectable date      |
| `className?` | `string`               | `''`    | Extra classes               |

Full month grid with weekday headers, prev/next month navigation, and disabled
out-of-range days. Out-of-month cells render muted; month navigation is blocked
past `minDate`/`maxDate`.

```tsx
<Calendar value={selected} onChange={setSelected} minDate={new Date()} />
```

### Diff

File: `src/components/organisms/Diff.tsx`

| Prop           | Type        | Default         | Description      |
| -------------- | ----------- | --------------- | ---------------- |
| `before`       | `ReactNode` | —               | Left image/side  |
| `after`        | `ReactNode` | —               | Right image/side |
| `aspectClass?` | `string`    | `'aspect-16/9'` | Aspect ratio     |
| `className?`   | `string`    | `''`            | Extra classes    |

DaisyUI `diff` mockup with a draggable `diff-resizer` handle for before/after
comparisons.

```tsx
<Diff before={oldImage} after={newImage} aspectClass="aspect-video" />
```

### IntegrationsSection

File: `src/components/organisms/IntegrationsSection.tsx`

| Prop           | Type                                      | Default | Description       |
| -------------- | ----------------------------------------- | ------- | ----------------- |
| `title?`       | `string`                                  | —       | Centered heading  |
| `description?` | `string`                                  | —       | Muted subtitle    |
| `items`        | `{ name: string; description?; icon? }[]` | —       | Integration cards |
| `columns?`     | `number`                                  | `3`     | Grid column count |
| `className?`   | `string`                                  | `''`    | Extra classes     |

Marketing grid of integration cards used on landing pages.

```tsx
<IntegrationsSection title="Integrations" items={integrations} />
```

### PageHeader

File: `src/components/organisms/PageHeader.tsx`

| Prop           | Type        | Default | Description             |
| -------------- | ----------- | ------- | ----------------------- |
| `title`        | `string`    | —       | Page heading            |
| `description?` | `string`    | —       | Muted subtitle          |
| `eyebrow?`     | `string`    | —       | Uppercase eyebrow label |
| `actions?`     | `ReactNode` | —       | Right-aligned actions   |
| `className?`   | `string`    | `''`    | Extra classes           |

TailwindUI-style page header combining eyebrow, title, description, and an
actions slot.

```tsx
<PageHeader
  title="Settings"
  eyebrow="Account"
  actions={<Button>Save</Button>}
/>
```

### PricingCard

File: `src/components/organisms/PricingCard.tsx`

| Prop           | Type         | Default | Description                 |
| -------------- | ------------ | ------- | --------------------------- |
| `name`         | `string`     | —       | Plan name                   |
| `price`        | `string`     | —       | Price string                |
| `period?`      | `string`     | —       | Billing period              |
| `description?` | `string`     | —       | Muted subtitle              |
| `features`     | `string[]`   | —       | Feature list                |
| `ctaLabel`     | `string`     | —       | Call-to-action text         |
| `ctaHref?`     | `string`     | —       | Link CTA (next/link)        |
| `onCta?`       | `() => void` | —       | Button CTA fallback         |
| `highlighted?` | `boolean`    | `false` | Featured plan styling       |
| `badge?`       | `string`     | —       | Corner badge (e.g. Popular) |
| `className?`   | `string`     | `''`    | Extra classes               |

Single pricing card (TailwindUI-style) that composes into a
`PricingSection`-like grid. Use `ctaHref` for a link or `onCta` for a button.

```tsx
<PricingCard
  name="Pro"
  price="$12"
  features={features}
  ctaLabel="Start"
  highlighted
/>
```

### ProgressStepper

File: `src/components/organisms/ProgressStepper.tsx`

| Prop           | Type                         | Default        | Description                     |
| -------------- | ---------------------------- | -------------- | ------------------------------- |
| `steps`        | `string[]`                   | —              | Step labels                     |
| `activeStep`   | `number`                     | —              | Index of the current step       |
| `onStepClick?` | `(index: number) => void`    | —              | Makes reachable steps clickable |
| `orientation?` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction                |
| `className?`   | `string`                     | `''`           | Extra classes                   |

MUI `Stepper`-style progress tracker: completed steps show a check, the active
step gets `aria-current="step"`, and earlier steps can be revisited when
`onStepClick` is provided.

```tsx
<ProgressStepper
  steps={['Cart', 'Shipping', 'Payment']}
  activeStep={1}
  onStepClick={goTo}
/>
```

### TestimonialCarousel

File: `src/components/organisms/TestimonialCarousel.tsx` — client component.

| Prop         | Type                                                  | Default | Description      |
| ------------ | ----------------------------------------------------- | ------- | ---------------- |
| `items`      | `{ quote: string; author: string; role?; avatar? }[]` | —       | Quotes to rotate |
| `className?` | `string`                                              | `''`    | Extra classes    |

TailwindUI-style rotating quote carousel with prev/next buttons and dot
navigation; wraps around at either end and returns `null` when empty.

```tsx
<TestimonialCarousel items={quotes} />
```

### DashboardHeader

File: `src/components/organisms/DashboardHeader.tsx`

| Prop                 | Type                      | Default     | Description             |
| -------------------- | ------------------------- | ----------- | ----------------------- |
| `title`              | `string`                  | —           | Heading text            |
| `subtitle?`          | `string`                  | —           | Muted subheading        |
| `actions?`           | `ReactNode`               | —           | Right-aligned actions   |
| `searchValue?`       | `string`                  | —           | Controlled search value |
| `onSearchChange?`    | `(value: string) => void` | —           | Shows search when set   |
| `searchPlaceholder?` | `string`                  | `'Search…'` | Search placeholder      |

Dashboard page header with a title block and a trailing search input + actions
row. The search box only renders when `onSearchChange` is provided.

```tsx
<DashboardHeader title="Overview" searchValue={q} onSearchChange={setQ} />
```

### DataList

File: `src/components/organisms/DataList.tsx`

| Prop       | Type                                              | Default | Description       |
| ---------- | ------------------------------------------------- | ------- | ----------------- |
| `sections` | `{ id, title, items: { key, label, value }[] }[]` | —       | Grouped `dl` rows |

Sections each render a bordered `h3` title and a two-column `dl` of key/value
rows; returns `null` for an empty list.

```tsx
<DataList
  sections={[
    {
      id: 'srv',
      title: 'Server',
      items: [{ key: 'v', label: 'Version', value: '1.0.0' }],
    },
  ]}
/>
```

### EventTimeline

File: `src/components/organisms/EventTimeline.tsx`

| Prop     | Type                                                  | Default | Description      |
| -------- | ----------------------------------------------------- | ------- | ---------------- |
| `items`  | `{ id, title, date, description?, status?, icon? }[]` | —       | Timeline events  |
| `title?` | `string`                                              | —       | Optional heading |

Vertical `ol` timeline with colour-coded status dots (`neutral` / `success` /
`warning` / `error`) and optional leading icons.

```tsx
<EventTimeline
  items={[{ id: '1', title: 'Deployed', date: '10m', status: 'success' }]}
/>
```

### FaqAccordion

File: `src/components/organisms/FaqAccordion.tsx` — client component.

| Prop           | Type                         | Default | Description     |
| -------------- | ---------------------------- | ------- | --------------- |
| `items`        | `{ id, question, answer }[]` | —       | Q&A pairs       |
| `title?`       | `string`                     | —       | Section heading |
| `description?` | `string`                     | —       | Muted subtitle  |

Single-open accordion (`aria-expanded`) that opens the first item by default and
numbers each question `01`, `02`, ….

```tsx
<FaqAccordion items={[{ id: 'a', question: 'How?', answer: 'Like this.' }]} />
```

### GalleryGrid

File: `src/components/organisms/GalleryGrid.tsx`

| Prop         | Type                       | Default | Description        |
| ------------ | -------------------------- | ------- | ------------------ |
| `items`      | `{ src, alt, caption? }[]` | —       | Images to display  |
| `columns?`   | `2 \| 3 \| 4`              | `3`     | Responsive columns |
| `className?` | `string`                   | `''`    | Extra classes      |

Responsive image grid with hover zoom and a bottom gradient caption overlay.

```tsx
<GalleryGrid
  columns={4}
  items={[{ src: '/a.png', alt: 'A', caption: 'Shot' }]}
/>
```

### InfoCards

File: `src/components/organisms/InfoCards.tsx`

| Prop       | Type                                            | Default | Description        |
| ---------- | ----------------------------------------------- | ------- | ------------------ |
| `cards`    | `{ id, title, description?, icon?, accent? }[]` | —       | Feature cards      |
| `columns?` | `2 \| 3 \| 4`                                   | `3`     | Responsive columns |
| `title?`   | `string`                                        | —       | Section heading    |

Bordered card grid with an accent-coloured icon; `accent` is
`'neutral' \| 'primary' \| 'success' \| 'warning' \| 'error'`.

```tsx
<InfoCards
  title="Why us"
  cards={[{ id: 'a', title: 'Fast', accent: 'primary' }]}
/>
```

### PageBreadcrumbs

File: `src/components/organisms/PageBreadcrumbs.tsx`

| Prop           | Type                 | Default | Description           |
| -------------- | -------------------- | ------- | --------------------- |
| `items`        | `{ label, href? }[]` | —       | Breadcrumb trail      |
| `title`        | `string`             | —       | Page `h1`             |
| `description?` | `string`             | —       | Muted subtitle        |
| `actions?`     | `ReactNode`          | —       | Right-aligned actions |

DaisyUI `breadcrumbs` (last item gets `aria-current="page"` and never links)
plus a title/description/actions row.

```tsx
<PageBreadcrumbs
  items={[{ label: 'Home', href: '/' }, { label: 'Settings' }]}
  title="Settings"
/>
```

### PageTabs

File: `src/components/organisms/PageTabs.tsx` — client component.

| Prop            | Type                              | Default | Description              |
| --------------- | --------------------------------- | ------- | ------------------------ |
| `tabs`          | `{ id, label, content, icon? }[]` | —       | Tabs and panels          |
| `defaultValue?` | `string`                          | —       | Initial tab (else first) |
| `value?`        | `string`                          | —       | Controlled active tab    |
| `onChange?`     | `(value: string) => void`         | —       | Called on tab select     |

DaisyUI `tabs-boxed` (`role="tablist"` / `role="tab"`) that swaps the panel
content; controlled when `value` is provided.

```tsx
<PageTabs
  tabs={[{ id: 'a', label: 'A', content: <p>…</p> }]}
  defaultValue="a"
/>
```

### AccountMenu

File: `src/components/organisms/AccountMenu.tsx` — client component.

| Prop      | Type                                    | Default | Description             |
| --------- | --------------------------------------- | ------- | ----------------------- |
| `name`    | `string`                                | —       | Display name            |
| `email?`  | `string`                                | —       | Muted email line        |
| `avatar?` | `ReactNode`                             | —       | Optional avatar element |
| `items`   | `{ label, icon?, danger?, onClick? }[]` | —       | Menu entries            |

User menu (`role="menu"`) with danger styling and click-outside dismissal.

```tsx
<AccountMenu
  name="Jane"
  items={[{ label: 'Profile' }, { label: 'Sign out', danger: true }]}
/>
```

### FilterBar

File: `src/components/organisms/FilterBar.tsx` — client component.

| Prop            | Type                     | Default     | Description           |
| --------------- | ------------------------ | ----------- | --------------------- |
| `query`         | `string`                 | —           | Controlled query      |
| `onQueryChange` | `(next: string) => void` | —           | Called on input       |
| `placeholder?`  | `string`                 | `'Search…'` | Input placeholder     |
| `children?`     | `ReactNode`              | —           | Extra filter controls |

Search input plus a slot for additional filters, laid out responsively.

```tsx
<FilterBar query={q} onQueryChange={setQ}>
  <FilterGroup … />
</FilterBar>
```

### KanbanBoard

File: `src/components/organisms/KanbanBoard.tsx`

| Prop      | Type                                                          | Default | Description   |
| --------- | ------------------------------------------------------------- | ------- | ------------- |
| `columns` | `{ id, title, cards: { id, title, description?, tag? }[] }[]` | —       | Board columns |

Column-based board (`aria-label` per column) with a card count, empty states,
and tag badges mapped to DaisyUI colors.

```tsx
<KanbanBoard
  columns={[
    {
      id: 'todo',
      title: 'To do',
      cards: [{ id: '1', title: 'Task', tag: 'info' }],
    },
  ]}
/>
```

### NavigationMenu

File: `src/components/organisms/NavigationMenu.tsx` — client component.

| Prop         | Type                                   | Default     | Description |
| ------------ | -------------------------------------- | ----------- | ----------- |
| `items`      | `{ label, href?, icon?, children? }[]` | —           | Nav entries |
| `ariaLabel?` | `string`                               | `'Primary'` | `nav` label |

Navbar of `button`s (with `children` popovers) and plain links; popovers close
on click-outside or Escape.

```tsx
<NavigationMenu
  items={[
    { label: 'Docs', children: <Menu>…</Menu> },
    { label: 'Pricing', href: '/pricing' },
  ]}
/>
```

### NotificationCenter

File: `src/components/organisms/NotificationCenter.tsx` — client component.

| Prop             | Type                                            | Default | Description              |
| ---------------- | ----------------------------------------------- | ------- | ------------------------ |
| `notifications`  | `{ id, title, description?, time?, unread? }[]` | —       | Items                    |
| `onOpen?`        | `(notification) => void`                        | —       | Called when item clicked |
| `onMarkAllRead?` | `() => void`                                    | —       | Clears badge button      |
| `unreadCount?`   | `number`                                        | —       | Override badge count     |

Bell trigger (`aria-label="Notifications"`) with unread badge and a `dialog`
panel; closes on click-outside.

```tsx
<NotificationCenter notifications={notes} onOpen={openNote} />
```

### Section

File: `src/components/organisms/Section.tsx`

| Prop           | Type                  | Default   | Description         |
| -------------- | --------------------- | --------- | ------------------- |
| `title`        | `string`              | —         | Section heading     |
| `eyebrow?`     | `string`              | —         | Small primary label |
| `description?` | `string`              | —         | Muted intro text    |
| `action?`      | `ReactNode`           | —         | Right-side CTA      |
| `align?`       | `'start' \| 'center'` | `'start'` | Header alignment    |
| `children?`    | `ReactNode`           | —         | Body content        |
| `className?`   | `string`              | `''`      | Extra classes       |

Semantic `<section>` header block (eyebrow + heading + description + action)
with a content slot — the skeleton for landing-page sections.

```tsx
<Section eyebrow="Features" title="Do more" align="center">
  <Grid>…</Grid>
</Section>
```

### TableOfContents

File: `src/components/organisms/TableOfContents.tsx` — client component.

| Prop        | Type                         | Default          | Description          |
| ----------- | ---------------------------- | ---------------- | -------------------- |
| `items`     | `{ id, label, children? }[]` | —                | Nested TOC tree      |
| `activeId?` | `string`                     | —                | Highlighted item     |
| `onSelect?` | `(id: string) => void`       | —                | Called on item click |
| `title?`    | `string`                     | `'On this page'` | `nav` label          |

Sidebar `nav` of scroll-anchor links; the active item gets `text-primary` and
`aria-current="location"`.

```tsx
<TableOfContents items={[{ id: 'intro', label: 'Intro' }]} activeId="intro" />
```

### ComparisonSection

File: `src/components/organisms/ComparisonSection.tsx`

| Prop           | Type                     | Default | Description      |
| -------------- | ------------------------ | ------- | ---------------- |
| `columns`      | `{ title, featured? }[]` | —       | Table columns    |
| `rows`         | `{ label, values }[]`    | —       | Comparison rows  |
| `title?`       | `string`                 | —       | Section heading  |
| `description?` | `string`                 | —       | Muted intro text |
| `className?`   | `string`                 | `''`    | Extra classes    |

Feature comparison table; `featured` columns get a primary tint.

```tsx
<ComparisonSection
  columns={[{ title: 'Free', featured: true }, { title: 'Pro' }]}
  rows={[{ label: 'Seats', values: ['5', '∞'] }]}
/>
```

### Leaderboard

File: `src/components/organisms/Leaderboard.tsx`

| Prop         | Type                             | Default | Description        |
| ------------ | -------------------------------- | ------- | ------------------ |
| `entries`    | `{ id, name, score, avatar? }[]` | —       | Entries (unsorted) |
| `title?`     | `string`                         | —       | Section heading    |
| `limit?`     | `number`                         | —       | Top-N to show      |
| `className?` | `string`                         | `''`    | Extra classes      |

Sorts entries by descending score; the top three get 🥇🥈🥉 medals and the
leader gets a primary ring.

```tsx
<Leaderboard entries={players} limit={3} title="Top players" />
```

### ProcessSection

File: `src/components/organisms/ProcessSection.tsx`

| Prop         | Type                            | Default | Description     |
| ------------ | ------------------------------- | ------- | --------------- |
| `steps`      | `{ id, title, description? }[]` | —       | Ordered steps   |
| `current?`   | `string`                        | —       | Active step id  |
| `title?`     | `string`                        | —       | Section heading |
| `className?` | `string`                        | `''`    | Extra classes   |

DaisyUI `steps` (vertical on mobile, horizontal on `lg`); steps before `current`
render `step-primary`.

```tsx
<ProcessSection steps={steps} current="build" title="How it works" />
```

### ProductGrid

File: `src/components/organisms/ProductGrid.tsx`

| Prop         | Type                                                            | Default | Description     |
| ------------ | --------------------------------------------------------------- | ------- | --------------- |
| `items`      | `{ id, name, price, description?, rating?, badge?, action? }[]` | —       | Product cards   |
| `title?`     | `string`                                                        | —       | Section heading |
| `columns?`   | `2 \| 3 \| 4`                                                   | `3`     | Grid columns    |
| `className?` | `string`                                                        | `''`    | Extra classes   |

Product cards with optional badge, rating, and action slot.

```tsx
<ProductGrid items={products} columns={4} title="Catalog" />
```

### QuoteSection

File: `src/components/organisms/QuoteSection.tsx`

| Prop         | Type        | Default | Description        |
| ------------ | ----------- | ------- | ------------------ |
| `quote`      | `string`    | —       | Centered quotation |
| `author`     | `string`    | —       | Attribution name   |
| `role?`      | `string`    | —       | Author role        |
| `avatar?`    | `ReactNode` | —       | Avatar element     |
| `className?` | `string`    | `''`    | Extra classes      |

Large centered testimonial block with a decorative quote mark.

```tsx
<QuoteSection quote="Ship fast." author="Ada" role="CTO" />
```

### ShowcaseSection

File: `src/components/organisms/ShowcaseSection.tsx`

| Prop         | Type                                          | Default | Description     |
| ------------ | --------------------------------------------- | ------- | --------------- |
| `items`      | `{ id, title, description?, image?, cta? }[]` | —       | Cards to show   |
| `title?`     | `string`                                      | —       | Section heading |
| `columns?`   | `2 \| 3`                                      | `3`     | Grid columns    |
| `className?` | `string`                                      | `''`    | Extra classes   |

Project/showcase cards with an image (or titled placeholder) and optional CTA.

```tsx
<ShowcaseSection items={projects} columns={2} title="Work" />
```

### TestimonialGrid

File: `src/components/organisms/TestimonialGrid.tsx`

| Prop           | Type                             | Default | Description      |
| -------------- | -------------------------------- | ------- | ---------------- |
| `testimonials` | `{ id, quote, author, role? }[]` | —       | Quotes to render |
| `title?`       | `string`                         | —       | Section heading  |
| `columns?`     | `1 \| 2 \| 3`                    | `3`     | Grid columns     |
| `className?`   | `string`                         | `''`    | Extra classes    |

Grid of quoted testimonials with author attribution.

```tsx
<TestimonialGrid testimonials={reviews} columns={2} title="Loved by" />
```

### VideoSection

File: `src/components/organisms/VideoSection.tsx`

| Prop         | Type     | Default | Description            |
| ------------ | -------- | ------- | ---------------------- |
| `title?`     | `string` | —       | Heading (also `title`) |
| `src?`       | `string` | —       | Native video `mp4` URL |
| `videoId?`   | `string` | —       | YouTube ID (iframe)    |
| `poster?`    | `string` | —       | Native video poster    |
| `className?` | `string` | `''`    | Extra classes          |

If `videoId` is set, embeds `youtube-nocookie.com`; else a `<video>` with
controls when `src` is set; otherwise a fallback message.

```tsx
<VideoSection videoId="dQw4w9WgXcQ" title="Demo" />
```

---

[Back to index](README.md)
