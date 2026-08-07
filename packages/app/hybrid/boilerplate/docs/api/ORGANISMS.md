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

---

[Back to index](README.md)
