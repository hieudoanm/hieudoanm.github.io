# Application Programming Interface (API)

This document is a reference for building on the hybrid boilerplate. It
documents every reusable component (atoms, molecules, organisms), every page
template, and every example route so agents can learn the conventions and reuse
them without re-reading source files.

---

## Table of Contents

- [Application Programming Interface (API)](#application-programming-interface-api)
  - [Table of Contents](#table-of-contents)
  - [Conventions](#conventions)
  - [Atoms](#atoms)
    - [Avatar](#avatar)
    - [Badge](#badge)
    - [Separator](#separator)
    - [Skeleton](#skeleton)
    - [Spinner](#spinner)
    - [TextField](#textfield)
  - [Molecules](#molecules)
    - [Card](#card)
    - [Dropdown](#dropdown)
    - [EmptyState](#emptystate)
    - [Modal](#modal)
    - [Tabs](#tabs)
    - [Toast](#toast)
  - [Organisms](#organisms)
    - [Header](#header)
    - [Navbar](#navbar)
    - [Templates](#templates)
    - [shared](#shared)
    - [app](#app)
    - [auth](#auth)
    - [blog](#blog)
    - [store](#store)
    - [landing](#landing)
    - [resume](#resume)
    - [admin](#admin)
    - [finance](#finance)
    - [developer](#developer)
    - [social](#social)
    - [media](#media)
    - [support](#support)
    - [mail](#mail)
    - [hr](#hr)
    - [crm](#crm)
    - [learning](#learning)
    - [news](#news)
    - [music](#music)
    - [streaming](#streaming)
    - [gaming](#gaming)
    - [sports](#sports)
    - [travel](#travel)
    - [food](#food)
    - [health](#health)
    - [real-estate](#real-estate)
    - [iot](#iot)
    - [portfolio](#portfolio)
  - [Pages](#pages)
    - [Route structure](#route-structure)
    - [Main](#main)
    - [App Workspace](#app-workspace)
    - [Data \& UI Showcase](#data--ui-showcase)
    - [Auth](#auth-1)
    - [Marketing](#marketing)
    - [Store](#store-1)
    - [Blog](#blog-1)
    - [Commerce Admin](#commerce-admin)
    - [Finance](#finance-1)
    - [Developer](#developer-1)
    - [Social \& Media](#social--media)
    - [Customer Support](#customer-support)
    - [Email](#email)
    - [HR](#hr-1)
    - [Sales \& CRM](#sales--crm)
    - [Learning](#learning-1)
    - [News \& Magazine](#news--magazine)
    - [Music](#music-1)
    - [Video Streaming](#video-streaming)
    - [Gaming](#gaming-1)
    - [Sports](#sports-1)
    - [Travel](#travel-1)
    - [Food \& Dining](#food--dining)
    - [Health \& Fitness](#health--fitness)
    - [Real Estate](#real-estate-1)
    - [Smart Home / IoT](#smart-home--iot)
    - [Portfolio](#portfolio-1)
    - [System pages](#system-pages)
  - [Adding new templates/pages](#adding-new-templatespages)

---

## Conventions

Every template and page in this project follows these rules. Follow them when
adding new templates/pages:

1. **Client components**: interactive templates start with `'use client';`.
2. **Shape**: `export const <Name>Template: FC = () => { ... };` followed by
   `<Name>Template.displayName = '<Name>Template';` as the last line.
3. **Imports**: `import type { FC } from 'react';`, then
   `import { useState } from 'react';`, then icons
   `import { FiXxx } from 'react-icons/fi';`. Only import what you use.
4. **No comments** in code.
5. **No lowercase JSX member expressions**: when mapping items with an `icon`
   component field, do `const Icon = item.icon;` first, then `<Icon />`.
6. **Interfaces for shapes**, arrow functions everywhere.
7. **Styling**: DaisyUI v5 + Tailwind. Cards are
   `card bg-base-200 border-base-content/10 border` with `card-body p-5`. Muted
   text is `text-base-content/50`. Tables use `card-body p-0` +
   `overflow-x-auto` + `w-full table` with a
   `text-base-content/40 ... text-xs tracking-wider uppercase` header row.
8. **Chrome**: workspace templates use
   `<div className="bg-base-100 text-base-content min-h-dvh">` with a
   `border-base-content/10 border-b px-6 py-5` header and
   `main className="mx-auto w-full max-w-5xl p-6"`. Marketing/store templates
   use a sticky top header with a "Boilerplate" logo and a footer.
9. **Pages**: thin `'use client';` wrappers, one per route, default export, e.g.
   `const XPage = () => <XTemplate />; export default XPage;`.
10. **Tests**: colocated in `__tests__/`, one suite per folder, via
    `@testing-library/react`. The repo gates coverage at 90% for statements,
    branches, functions, and lines.

---

## Atoms

Small, presentational, dependency-free building blocks in
`src/components/atoms/`.

### Avatar

File: `src/components/atoms/Avatar.tsx`

| Prop        | Type                   | Default | Description                           |
| ----------- | ---------------------- | ------- | ------------------------------------- |
| `src?`      | `string`               | —       | Image source; absent renders initials |
| `alt?`      | `string`               | `''`    | Alt text, also used for initials      |
| `size?`     | `'sm' \| 'md' \| 'lg'` | `'md'`  | Circle size                           |
| `fallback?` | `string`               | —       | Explicit initials override            |

Without `src` it renders a DaisyUI `avatar placeholder` circle with up to two
uppercase initials derived from `alt` (or `fallback`).

```tsx
<Avatar src="/me.png" alt="Jane Doe" size="lg" />
<Avatar alt="Alex Chen" size="sm" />
```

### Badge

File: `src/components/atoms/Badge.tsx`

| Prop       | Type                                                                                               | Default     | Description          |
| ---------- | -------------------------------------------------------------------------------------------------- | ----------- | -------------------- |
| `variant?` | `'neutral' \| 'primary' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'neutral'` | DaisyUI badge color  |
| `outline?` | `boolean`                                                                                          | `false`     | Adds `badge-outline` |
| `children` | `ReactNode`                                                                                        | —           | Badge content        |

```tsx
<Badge variant="success">Paid</Badge>
```

### Separator

File: `src/components/atoms/Separator.tsx`

| Prop         | Type     | Default | Description   |
| ------------ | -------- | ------- | ------------- |
| `className?` | `string` | `''`    | Extra classes |

Renders an `<hr>` with `border-base-content/20 my-4`.

### Skeleton

File: `src/components/atoms/Skeleton.tsx`

| Prop         | Type     | Default | Description                          |
| ------------ | -------- | ------- | ------------------------------------ |
| `className?` | `string` | `''`    | Size/shape classes (e.g. `h-4 w-24`) |

Renders a DaisyUI `skeleton` loading placeholder.

### Spinner

File: `src/components/atoms/Spinner.tsx`

| Prop    | Type                   | Default | Description          |
| ------- | ---------------------- | ------- | -------------------- |
| `size?` | `'sm' \| 'md' \| 'lg'` | `'md'`  | Loading spinner size |

Renders a DaisyUI `loading loading-spinner`.

### TextField

File: `src/components/atoms/TextField.tsx`

| Prop       | Type                                    | Default | Description                                     |
| ---------- | --------------------------------------- | ------- | ----------------------------------------------- |
| `label`    | `string` (required)                     | —       | Visible label; derives `id` when `id` is absent |
| `error?`   | `string`                                | —       | Error text; adds `input-error`                  |
| `...props` | `InputHTMLAttributes<HTMLInputElement>` | —       | Passed to the `<input>`                         |

```tsx
<TextField
  label="Email"
  type="email"
  placeholder="you@example.com"
  error="Required"
/>
```

---

## Molecules

Composites of atoms in `src/components/molecules/`.

### Card

File: `src/components/molecules/Card.tsx`

| Prop           | Type        | Default | Description            |
| -------------- | ----------- | ------- | ---------------------- |
| `title?`       | `string`    | —       | `card-title`           |
| `description?` | `string`    | —       | Muted subtitle         |
| `action?`      | `ReactNode` | —       | Rendered right-aligned |
| `children`     | `ReactNode` | —       | Card body              |

```tsx
<Card title="Recent activity" description="Last 30 days" action={<FiPlus />}>
  ...
</Card>
```

### Dropdown

File: `src/components/molecules/Dropdown.tsx` — client component.

| Prop      | Type                                                                           | Default | Description                |
| --------- | ------------------------------------------------------------------------------ | ------- | -------------------------- |
| `trigger` | `ReactNode`                                                                    | —       | Button that opens the menu |
| `items`   | `{ label: string; onClick: () => void; icon?: ReactNode; danger?: boolean }[]` | —       | Menu items                 |

Closes on outside click and `Escape`. Renders `role="menu"`/`role="menuitem"`.
`danger` items use the error color.

### EmptyState

File: `src/components/molecules/EmptyState.tsx`

| Prop           | Type        | Default | Description         |
| -------------- | ----------- | ------- | ------------------- |
| `icon`         | `ReactNode` | —       | Large centered icon |
| `title`        | `string`    | —       | Heading text        |
| `description?` | `string`    | —       | Muted helper text   |
| `action?`      | `ReactNode` | —       | Optional CTA below  |

### Modal

File: `src/components/molecules/Modal.tsx`

| Prop       | Type         | Default | Description                  |
| ---------- | ------------ | ------- | ---------------------------- |
| `open`     | `boolean`    | —       | When `false`, renders `null` |
| `onClose?` | `() => void` | —       | Clicking the backdrop        |
| `title?`   | `string`     | —       | Dialog heading               |
| `children` | `ReactNode`  | —       | Dialog body                  |
| `action?`  | `ReactNode`  | —       | `modal-action` footer        |

Renders a DaisyUI `dialog.modal.modal-open`.

### Tabs

File: `src/components/molecules/Tabs.tsx` — client component.

| Prop       | Type                                 | Default | Description         |
| ---------- | ------------------------------------ | ------- | ------------------- |
| `tabs`     | `{ label: string; value: string }[]` | —       | Tab definitions     |
| `value`    | `string`                             | —       | Active tab `value`  |
| `onChange` | `(value: string) => void`            | —       | Called on tab click |

Underline-style tabs (active tab gets `text-primary border-primary border-b-2`).

### Toast

File: `src/components/molecules/Toast.tsx` — client component.

| Prop        | Type                                          | Default  | Description       |
| ----------- | --------------------------------------------- | -------- | ----------------- |
| `message`   | `string`                                      | —        | Notification text |
| `variant?`  | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Alert color       |
| `duration?` | `number`                                      | `3000`   | Auto-dismiss ms   |
| `onClose?`  | `() => void`                                  | —        | Called on dismiss |

Fires the timer via `useEffect`; the close button dismisses immediately.

---

## Organisms

Full sections in `src/components/organisms/`.

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

### Navbar

File: `src/components/organisms/Navbar.tsx` — client component.

| Prop        | Type                                                  | Default    | Description |
| ----------- | ----------------------------------------------------- | ---------- | ----------- |
| `items`     | `{ label: string; href: string; icon?: ReactNode }[]` | —          | Nav links   |
| `position?` | `'bottom' \| 'top'`                                   | `'bottom'` | Fixed edge  |

Active link is highlighted via `usePathname()` (`/` matches exactly; other links
match by `startsWith`).

---

## Templates

All templates live in `src/components/templates/<folder>/` as
`<Name>Template.tsx`. Each exports `<Name>Template` (arrow `FC`, `'use client';`
for interactive ones, `.displayName` set). Templates without a props interface
are self-contained (local `useState`). Props interfaces are listed where they
exist.

### shared

Theme-neutral templates used across route groups.

| Template                | Props                                                                                                         | Description                                                                              |
| ----------------------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `AboutTemplate`         | `name: string; description: string; version: string; items: { label, value }[]`                               | App info with PageShell + bottom Navbar                                                  |
| `AccordionTemplate`     | —                                                                                                             | Collapsible accordion rows                                                               |
| `AlertsTemplate`        | —                                                                                                             | Alert banner variants                                                                    |
| `ChartsGalleryTemplate` | —                                                                                                             | Chart gallery                                                                            |
| `ComingSoonTemplate`    | —                                                                                                             | Launch placeholder                                                                       |
| `ComponentsTemplate`    | —                                                                                                             | Directory of demos (folder; drives the home page)                                        |
| `CookieConsentTemplate` | —                                                                                                             | Cookie banner (mounted in root `layout.tsx`)                                             |
| `DataTableTemplate`     | —                                                                                                             | Sortable data grid                                                                       |
| `EmptyStatesTemplate`   | —                                                                                                             | Empty-state placeholders                                                                 |
| `ErrorTemplate`         | `code: string; description?: string; action?: ReactNode`                                                      | 500 error page body                                                                      |
| `ForbiddenTemplate`     | —                                                                                                             | 403 access-denied page                                                                   |
| `FormsShowcaseTemplate` | —                                                                                                             | Form control gallery                                                                     |
| `GlobalErrorTemplate`   | `error: Error & { digest?: string }; reset: () => void`                                                       | Root error boundary body                                                                 |
| `MaintenanceTemplate`   | —                                                                                                             | Maintenance-mode page                                                                    |
| `ModalsTemplate`        | —                                                                                                             | Modal/dialog examples                                                                    |
| `NotFoundTemplate`      | `code?: number; message?: string`                                                                             | 404 page body                                                                            |
| `OnboardingTemplate`    | —                                                                                                             | Multi-step onboarding flow                                                               |
| `PaginationTemplate`    | —                                                                                                             | Paginated list                                                                           |
| `SearchTemplate`        | —                                                                                                             | Global search page                                                                       |
| `StepperTemplate`       | —                                                                                                             | Multi-step stepper                                                                       |
| `TabsTemplate`          | —                                                                                                             | Tab navigation examples                                                                  |
| `TooltipsTemplate`      | —                                                                                                             | Tooltip examples                                                                         |
| `UploadTemplate`        | —                                                                                                             | File-upload dropzone                                                                     |
| `PageShell`             | `title, subtitle?, backHref?, headerAction?, headerBadges?, navItems?, maxWidth?, gap?, className?, children` | Wraps `Header` + `main` + optional `Navbar`; used by `AboutTemplate` and blog/info pages |

### app

Workspace/productivity templates (route group `(app)`).

| Template                | Props                                                                                                                                                                         | Description                                              |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `ActivityLogTemplate`   | —                                                                                                                                                                             | Recent user activity feed                                |
| `AnalyticsTemplate`     | —                                                                                                                                                                             | Usage-metrics dashboard                                  |
| `AppLoadingTemplate`    | —                                                                                                                                                                             | App boot loading state                                   |
| `BillingTemplate`       | —                                                                                                                                                                             | Plan & usage summary                                     |
| `CalendarTemplate`      | —                                                                                                                                                                             | Monthly event calendar                                   |
| `ChatTemplate`          | `initialMessages?, model?, onSendMessage?, onModelChange?, onNewChat?, conversations?, activeConversationId?, onConversationSelect?, models?, sidebarOpen?, onToggleSidebar?` | AI-style chat with sidebar, model select, message stream |
| `ContactsTemplate`      | —                                                                                                                                                                             | Contact list & search                                    |
| `DashboardTemplate`     | `userName?, userEmail?`                                                                                                                                                       | Overview dashboard with stat cards, nav, activity        |
| `ExpensesTemplate`      | —                                                                                                                                                                             | Expense tracker                                          |
| `FilesTemplate`         | —                                                                                                                                                                             | File browser                                             |
| `GoalsTemplate`         | —                                                                                                                                                                             | Objective & progress tracking                            |
| `HelpCenterTemplate`    | —                                                                                                                                                                             | Searchable FAQ categories                                |
| `ImportTemplate`        | —                                                                                                                                                                             | Data-import flow                                         |
| `InboxTemplate`         | —                                                                                                                                                                             | Email inbox                                              |
| `IntegrationsTemplate`  | —                                                                                                                                                                             | Connected services                                       |
| `KanbanTemplate`        | —                                                                                                                                                                             | Drag-style task board                                    |
| `MeetingsTemplate`      | —                                                                                                                                                                             | Scheduled meetings                                       |
| `MembersTemplate`       | —                                                                                                                                                                             | Team member roles                                        |
| `NotesTemplate`         | —                                                                                                                                                                             | Inline-editable notes                                    |
| `NotificationsTemplate` | —                                                                                                                                                                             | Notification feed                                        |
| `PermissionsTemplate`   | —                                                                                                                                                                             | Role permissions matrix                                  |
| `ProfileTemplate`       | `userName?, userEmail?, memberSince?`                                                                                                                                         | User profile                                             |
| `ReportsTemplate`       | —                                                                                                                                                                             | Generated report cards                                   |
| `RoadmapTemplate`       | —                                                                                                                                                                             | Product roadmap timeline                                 |
| `SettingsTemplate`      | `language, theme, dateTimeFormat, timezone, onLanguageChange, onThemeChange, onDateTimeFormatChange, onTimezoneChange`                                                        | Settings rows (language, theme, date/time, timezone)     |
| `ShortcutsTemplate`     | —                                                                                                                                                                             | Keyboard shortcuts                                       |
| `SprintsTemplate`       | —                                                                                                                                                                             | Sprint board & velocity                                  |
| `TasksTemplate`         | —                                                                                                                                                                             | Todo list with filters                                   |
| `TimesheetsTemplate`    | —                                                                                                                                                                             | Weekly timesheet entries                                 |
| `VersionTemplate`       | —                                                                                                                                                                             | Build version display                                    |
| `WebhooksTemplate`      | —                                                                                                                                                                             | Webhook endpoints                                        |
| `WhiteboardTemplate`    | —                                                                                                                                                                             | Collaborative whiteboard                                 |

### auth

Authentication flows (route group `(auth)`).

| Template                   | Props                                                                               | Description                                  |
| -------------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------- |
| `AuthLoadingTemplate`      | —                                                                                   | Auth-boot loading state                      |
| `ChangePasswordTemplate`   | —                                                                                   | Password-change form with visibility toggles |
| `DeleteAccountTemplate`    | —                                                                                   | Account-deletion flow                        |
| `ForgotPasswordTemplate`   | `onSubmit: (email: string) => void \| Promise<void>; error?; success?; loading?`    | Reset request form                           |
| `LockScreenTemplate`       | —                                                                                   | Session lock page                            |
| `RecoveryCodesTemplate`    | —                                                                                   | Two-factor recovery codes                    |
| `ResetPasswordTemplate`    | `onSubmit: (password: string) => void \| Promise<void>; error?; success?; loading?` | Set-new-password form                        |
| `SecurityOverviewTemplate` | —                                                                                   | Security feature toggles                     |
| `SessionsTemplate`         | —                                                                                   | Active login sessions                        |
| `SignInTemplate`           | `onSubmit: ({ email, password }) => void \| Promise<void>; error?; loading?`        | Sign-in form                                 |
| `SignUpTemplate`           | —                                                                                   | Create-account form                          |
| `TwoFactorTemplate`        | —                                                                                   | 2FA code entry                               |
| `VerifyEmailTemplate`      | —                                                                                   | Email verification prompt                    |

### blog

Content templates (route group `blog`).

| Template                 | Props                                         | Description            |
| ------------------------ | --------------------------------------------- | ---------------------- |
| `BlogListTemplate`       | `posts: BlogPostData[]`                       | Blog index with posts  |
| `BlogItemTemplate`       | `post: BlogPostData; recentPosts: PostMeta[]` | Blog post detail       |
| `BlogArchiveTemplate`    | —                                             | Posts by month         |
| `BlogAuthorTemplate`     | —                                             | Author profile & posts |
| `BlogCategoriesTemplate` | —                                             | Category explorer      |
| `BlogNewsletterTemplate` | —                                             | Subscribe form         |
| `BlogSearchTemplate`     | —                                             | Live post search       |
| `BlogTagsTemplate`       | —                                             | Posts grouped by tag   |
| `BlogLoadingTemplate`    | —                                             | Blog loading state     |

### store

Commerce templates (route group `store`).

| Template                    | Props                | Description              |
| --------------------------- | -------------------- | ------------------------ |
| `StoreFrontTemplate`        | —                    | Product listing          |
| `StoreItemTemplate`         | `cartCount?: number` | Product detail           |
| `CartTemplate`              | —                    | Shopping cart            |
| `CheckoutTemplate`          | —                    | Checkout flow            |
| `OrderConfirmationTemplate` | —                    | Order success page       |
| `OrderHistoryTemplate`      | —                    | Past orders              |
| `StoreLoadingTemplate`      | —                    | Store loading state      |
| `WishlistTemplate`          | —                    | Saved products           |
| `CompareTemplate`           | —                    | Product comparison       |
| `AddressBookTemplate`       | —                    | Saved shipping addresses |
| `PaymentMethodsTemplate`    | —                    | Saved payment cards      |
| `OrderTrackingTemplate`     | —                    | Shipment timeline        |
| `DealsTemplate`             | —                    | Discount deals           |
| `CategoriesTemplate`        | —                    | Product categories       |
| `ReviewsTemplate`           | —                    | Customer reviews         |
| `SupportTemplate`           | —                    | Customer support         |
| `GiftCardsTemplate`         | —                    | Gift card purchase       |

### landing

Marketing pages (route group `marketing`).

| Template            | Description                                                                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `LandingTemplate`   | Marketing hero with features, pricing tiers, FAQs (props: `name, tagline, description, features, ctaLabel?, ctaHref?, tiers?, faqs?`) |
| `CareersTemplate`   | Job listings                                                                                                                          |
| `ChangelogTemplate` | Release notes                                                                                                                         |
| `ContactTemplate`   | Contact form                                                                                                                          |
| `PricingTemplate`   | Pricing plans                                                                                                                         |
| `PrivacyTemplate`   | Privacy policy                                                                                                                        |
| `TeamTemplate`      | Team directory                                                                                                                        |
| `TermsTemplate`     | Terms of service                                                                                                                      |

### resume

| Template         | Props                                                                          | Description                           |
| ---------------- | ------------------------------------------------------------------------------ | ------------------------------------- |
| `ResumeTemplate` | `profile, experiences, projects, education, skills` (typed shapes in the file) | Resume/portfolio single-page template |

### admin

Commerce admin (route group `admin`). All self-contained, interactive.

| Template             | Description                           |
| -------------------- | ------------------------------------- |
| `ProductsTemplate`   | Product catalog admin                 |
| `OrdersTemplate`     | Order management with status updates  |
| `CustomersTemplate`  | Customer directory with tier filters  |
| `InventoryTemplate`  | Stock level management (adjust/clamp) |
| `CouponsTemplate`    | Coupon CRUD with validation           |
| `PromotionsTemplate` | Promo campaign builder                |
| `RefundsTemplate`    | Refund requests                       |
| `ShipmentsTemplate`  | Shipment logistics                    |

### finance

Finance dashboard (route group `finance`). All self-contained, interactive.

| Template                | Description                                |
| ----------------------- | ------------------------------------------ |
| `InvoicesTemplate`      | Invoice tracking with status filters       |
| `BudgetsTemplate`       | Budget spending tracker with progress bars |
| `SubscriptionsTemplate` | Recurring subscription plans               |
| `TransactionsTemplate`  | Account transactions ledger                |
| `TaxesTemplate`         | Sales tax regions                          |
| `PayrollTemplate`       | Employee payroll runs                      |
| `StatementsTemplate`    | Monthly account statements                 |
| `AccountsTemplate`      | Linked bank accounts                       |

### developer

Developer tools (route group `developer`). All self-contained, interactive.

| Template               | Description                                  |
| ---------------------- | -------------------------------------------- |
| `ApiKeysTemplate`      | Key creation, reveal, revoke                 |
| `FeatureFlagsTemplate` | Per-environment feature toggles              |
| `EnvironmentsTemplate` | Deployment environment status                |
| `DeploymentsTemplate`  | Deployment history with rollback             |
| `LogsTemplate`         | Log list with level filters, search, clear   |
| `EndpointsTemplate`    | API endpoint list with method badges         |
| `MonitorsTemplate`     | Service uptime monitors (pause/resume/retry) |
| `BackupsTemplate`      | Backup schedules & restores                  |

### social

Social features (route group `social`). All self-contained, interactive.

| Template            | Description                       |
| ------------------- | --------------------------------- |
| `FeedTemplate`      | Post feed with likes and comments |
| `MessagesTemplate`  | Direct messages with thread list  |
| `EventsTemplate`    | Community events with RSVP        |
| `GroupsTemplate`    | Joinable interest groups          |
| `FollowersTemplate` | Follow/unfollow directory         |

### media

Media features (route group `media`). All self-contained, interactive.

| Template               | Description                                          |
| ---------------------- | ---------------------------------------------------- |
| `MediaLibraryTemplate` | Asset library with type filters, search, bulk delete |
| `AlbumsTemplate`       | Photo albums with expand/create                      |
| `VideoPlayerTemplate`  | Playlist + play/pause player                         |

### support

Customer support (route group `support`). All self-contained, interactive.

| Template                 | Description                                   |
| ------------------------ | --------------------------------------------- |
| `SupportTicketsTemplate` | Ticket inbox with status filters and search   |
| `TicketDetailTemplate`   | Conversation thread, priority & status update |
| `LiveChatTemplate`       | Chat with canned replies and transcript       |
| `KnowledgeBaseTemplate`  | Searchable help-article categories            |
| `FaqTemplate`            | Expandable FAQ accordion                      |
| `AnnouncementsTemplate`  | Service announcements list                    |
| `ServiceStatusTemplate`  | Uptime, incidents and current status          |
| `FeedbackTemplate`       | Feedback form with rating                     |

### mail

Email client (route group `mail`). All self-contained, interactive.

| Template             | Description                            |
| -------------------- | -------------------------------------- |
| `InboxTemplate`      | Message list with read/unread + labels |
| `ThreadTemplate`     | Message conversation with reply box    |
| `ComposeTemplate`    | New-message form                       |
| `DraftsTemplate`     | Unsent message drafts                  |
| `SentTemplate`       | Sent-message list                      |
| `SpamTemplate`       | Junk messages with restore actions     |
| `LabelsTemplate`     | Label management                       |
| `MailSearchTemplate` | Full-text message search               |

### hr

Human resources (route group `hr`). All self-contained, interactive.

| Template                     | Description                          |
| ---------------------------- | ------------------------------------ |
| `PeopleDirectoryTemplate`    | Employee directory with role filters |
| `OrgChartTemplate`           | Hierarchical company org chart       |
| `HiringPipelineTemplate`     | Candidates across pipeline stages    |
| `PoliciesTemplate`           | Company policy documents             |
| `BenefitsTemplate`           | Benefit packages & enrollments       |
| `PerformanceReviewsTemplate` | Review cycles and ratings            |
| `ShiftScheduleTemplate`      | Upcoming shifts                      |
| `TimeOffTemplate`            | Leave requests with balance          |

### crm

Sales & CRM (route group `crm`). All self-contained, interactive.

| Template               | Description                         |
| ---------------------- | ----------------------------------- |
| `AccountsTemplate`     | Customer accounts list              |
| `CrmContactsTemplate`  | Contacts with search and filters    |
| `LeadsTemplate`        | Prospect leads with source tracking |
| `DealsTemplate`        | Open opportunities with values      |
| `PipelineTemplate`     | Deals grouped by pipeline stage     |
| `CampaignsTemplate`    | Marketing campaign builder          |
| `QuoteBuilderTemplate` | Quote line-item builder             |
| `SalesReportsTemplate` | Team sales metrics                  |

### learning

Learning / LMS (route group `learning`). All self-contained, interactive.

| Template                    | Description                         |
| --------------------------- | ----------------------------------- |
| `MyCoursesTemplate`         | Enrolled courses with progress      |
| `CourseCatalogTemplate`     | Browse and filter courses           |
| `CourseDetailTemplate`      | Curriculum, syllabus and instructor |
| `LessonPlayerTemplate`      | Lesson video player with modules    |
| `InstructorsTemplate`       | Instructor directory                |
| `QuizzesTemplate`           | Quiz questions with scoring         |
| `AchievementsTemplate`      | Badges and milestones               |
| `LearningAnalyticsTemplate` | Learning progress analytics         |

### news

News & magazine (route group `news`). All self-contained, interactive.

| Template                   | Description                      |
| -------------------------- | -------------------------------- |
| `ArticleTemplate`          | Long-form article page           |
| `BreakingNewsTemplate`     | Breaking headline ticker         |
| `EditorialTemplate`        | Editor-picked stories            |
| `MagazineGridTemplate`     | Magazine feature layout          |
| `NewsCategoriesTemplate`   | Browse stories by category       |
| `NewsletterSignupTemplate` | Subscribe form with confirmation |
| `OpinionTemplate`          | Opinion columns                  |
| `PressReleasesTemplate`    | Media announcements              |

### music

Music app (route group `music`). All self-contained, interactive.

| Template              | Description                            |
| --------------------- | -------------------------------------- |
| `MusicHomeTemplate`   | Home feed with recommendations         |
| `AlbumDetailTemplate` | Album with track list and play buttons |
| `ArtistsTemplate`     | Artist directory                       |
| `ChartsTemplate`      | Top-track charts                       |
| `NowPlayingTemplate`  | Current track player                   |
| `PlaylistTemplate`    | Curated playlist                       |
| `LyricsTemplate`      | Lyrics view                            |
| `MusicSearchTemplate` | Search songs, artists and albums       |

### streaming

Video streaming (route group `streaming`). All self-contained, interactive.

| Template                   | Description                      |
| -------------------------- | -------------------------------- |
| `StreamingHomeTemplate`    | Home feed with title rows        |
| `MovieDetailTemplate`      | Movie details and related titles |
| `TvSeriesTemplate`         | Browse TV shows                  |
| `LiveChannelsTemplate`     | Live channel grid                |
| `ContinueWatchingTemplate` | Resume-in-progress titles        |
| `MyListTemplate`           | Saved titles with remove         |
| `WatchHistoryTemplate`     | Viewing history                  |
| `StreamingSearchTemplate`  | Search titles                    |

### gaming

Gaming hub (route group `gaming`). All self-contained, interactive.

| Template                 | Description                     |
| ------------------------ | ------------------------------- |
| `GameCatalogTemplate`    | Game listing with genre filters |
| `GameDetailTemplate`     | Game details and screenshots    |
| `GameChallengesTemplate` | Daily/weekly challenges         |
| `LeaderboardsTemplate`   | Ranked player leaderboard       |
| `LiveMatchesTemplate`    | Ongoing live matches            |
| `PlayerProfilesTemplate` | Player stats and profiles       |
| `TournamentsTemplate`    | Tournament brackets             |
| `GameNewsTemplate`       | Patch notes and game news       |

### sports

Sports tracker (route group `sports`). All self-contained, interactive.

| Template                  | Description                      |
| ------------------------- | -------------------------------- |
| `LiveScoresTemplate`      | Today's live scores              |
| `FixturesTemplate`        | Upcoming fixtures with reminders |
| `MatchDetailTemplate`     | Match details and events         |
| `SeasonStandingsTemplate` | League table with favorites      |
| `PlayerStatsTemplate`     | Goals/assists leaderboards       |
| `TeamRosterTemplate`      | Roster with position filters     |
| `FavoriteTeamsTemplate`   | Followed teams                   |
| `SportsNewsTemplate`      | Sports headlines                 |

### travel

Travel planner (route group `travel`). All self-contained, interactive.

| Template                | Description              |
| ----------------------- | ------------------------ |
| `BookingsTemplate`      | Upcoming trip bookings   |
| `BookingSearchTemplate` | Search stays and flights |
| `HotelDetailTemplate`   | Hotel details and rooms  |
| `DestinationsTemplate`  | Destination explorer     |
| `TravelGuidesTemplate`  | City travel guides       |
| `TravelStoriesTemplate` | Community travel stories |
| `PackingListTemplate`   | Checklist generator      |
| `TripPlannerTemplate`   | Itinerary builder        |

### food

Food & dining (route group `food`). All self-contained, interactive.

| Template                   | Description                       |
| -------------------------- | --------------------------------- |
| `RestaurantListTemplate`   | Restaurant directory with filters |
| `RestaurantDetailTemplate` | Restaurant details and reviews    |
| `MenuTemplate`             | Dishes and prices                 |
| `RecipesTemplate`          | Recipe collection                 |
| `RecipeDetailTemplate`     | Step-by-step recipe               |
| `ReservationsTemplate`     | Upcoming reservations             |
| `FoodDeliveryTemplate`     | Delivery ordering                 |
| `WineListTemplate`         | Wine pairings list                |

### health

Health & fitness (route group `health`). All self-contained, interactive.

| Template                   | Description                         |
| -------------------------- | ----------------------------------- |
| `HealthDashboardTemplate`  | Daily health overview               |
| `ActivityTrackerTemplate`  | Steps, distance, active minutes     |
| `WorkoutPlannerTemplate`   | Workout plans with intensity filter |
| `NutritionTrackerTemplate` | Macro tracking and meal log         |
| `SleepTrackerTemplate`     | Sleep quality and breakdown         |
| `WaterIntakeTemplate`      | Hydration goal counter              |
| `GoalsTemplate`            | Daily health targets                |
| `HealthProfileTemplate`    | Personal health metrics             |

### real-estate

Real estate (route group `real-estate`). All self-contained, interactive.

| Template                     | Description                          |
| ---------------------------- | ------------------------------------ |
| `PropertyListingsTemplate`   | Property cards with save actions     |
| `PropertyDetailTemplate`     | Property details and tour scheduling |
| `SearchFiltersTemplate`      | Filterable property search           |
| `MapViewTemplate`            | Map legend and layer toggles         |
| `SavedPropertiesTemplate`    | Saved shortlist with remove          |
| `MortgageCalculatorTemplate` | Monthly-payment calculator           |
| `OpenHousesTemplate`         | Open house events                    |
| `AgentProfileTemplate`       | Agent profile and contact            |

### iot

Smart home / IoT (route group `iot`). All self-contained, interactive.

| Template                    | Description                       |
| --------------------------- | --------------------------------- |
| `DeviceDashboardTemplate`   | Device grid with on/off toggles   |
| `DeviceDetailTemplate`      | Device control with modes         |
| `ScenesTemplate`            | One-tap scene activation          |
| `AutomationsTemplate`       | Scheduled automation toggles      |
| `EnergyUsageTemplate`       | Energy consumption by room        |
| `SecurityTemplate`          | Armed/disarmed status and cameras |
| `SensorDataTemplate`        | Live sensor readings              |
| `SmartHomeSettingsTemplate` | Home preferences                  |

### portfolio

Investment portfolio (route group `portfolio`). All self-contained, interactive.

| Template                    | Description                          |
| --------------------------- | ------------------------------------ |
| `PortfolioOverviewTemplate` | Net worth and summary stats          |
| `HoldingsTemplate`          | Holdings table with asset filters    |
| `TransactionsTemplate`      | Buy/sell ledger                      |
| `PerformanceTemplate`       | Returns over time-range tabs         |
| `AllocationTemplate`        | Asset-class allocation breakdown     |
| `WatchlistTemplate`         | Watched symbols with add/remove      |
| `AlertsTemplate`            | Price alerts with pause/resume       |
| `DividendIncomeTemplate`    | Dividend payouts and reinvest toggle |
| `PortfolioSettingsTemplate` | Portfolio preferences                |

---

## Pages

Thin `'use client';` wrappers in `src/app/`, one per route, default-exporting
the template (e.g. `const AnalyticsPage = () => <AnalyticsTemplate />;`). There
is a single root `layout.tsx` (mounts `CookieConsentTemplate`); there are **no**
per-route layout files.

The `PagesDirectory` (shown on `/`) lists every example page and reports the
live counts (`256 pages, 261 templates` today; the two extra template files
beyond 261 are the system pages — `NotFoundTemplate`, `ErrorTemplate`,
`GlobalErrorTemplate` — plus `CookieConsentTemplate`/`PageShell` helpers).

### Route structure

| Segment group                  | Base folder                       | Purpose                   |
| ------------------------------ | --------------------------------- | ------------------------- |
| `/`                            | `src/app/(main)/`                 | Main/global pages         |
| `/dashboard` … `/whiteboard`   | `src/app/(app)/`                  | App Workspace + Data & UI |
| `/sign-in` … `/security`       | `src/app/(auth)/`                 | Auth                      |
| `/landing` … `/changelog`      | `src/app/(marketing)/` + `(info)` | Marketing                 |
| `/store` … `/store/gift-cards` | `src/app/store/`                  | Commerce storefront       |
| `/blog` … `/blog/search`       | `src/app/blog/`                   | Blog                      |
| `/admin/*`                     | `src/app/(main)/admin/`           | Commerce Admin            |
| `/finance/*`                   | `src/app/(main)/finance/`         | Finance                   |
| `/developer/*`                 | `src/app/(main)/developer/`       | Developer                 |
| `/social/*`                    | `src/app/(main)/social/`          | Social                    |
| `/media/*`                     | `src/app/(main)/media/`           | Media                     |
| `/support/*`                   | `src/app/(main)/support/`         | Customer Support          |
| `/mail/*`                      | `src/app/(main)/mail/`            | Email                     |
| `/hr/*`                        | `src/app/(main)/hr/`              | HR                        |
| `/crm/*`                       | `src/app/(main)/crm/`             | Sales & CRM               |
| `/learning/*`                  | `src/app/(main)/learning/`        | Learning                  |
| `/news/*`                      | `src/app/(main)/news/`            | News & Magazine           |
| `/music/*`                     | `src/app/(main)/music/`           | Music                     |
| `/streaming/*`                 | `src/app/(main)/streaming/`       | Video Streaming           |
| `/gaming/*`                    | `src/app/(main)/gaming/`          | Gaming                    |
| `/sports/*`                    | `src/app/(main)/sports/`          | Sports                    |
| `/travel/*`                    | `src/app/(main)/travel/`          | Travel                    |
| `/food/*`                      | `src/app/(main)/food/`            | Food & Dining             |
| `/health/*`                    | `src/app/(main)/health/`          | Health & Fitness          |
| `/real-estate/*`               | `src/app/(main)/real-estate/`     | Real Estate               |
| `/iot/*`                       | `src/app/(main)/iot/`             | Smart Home / IoT          |
| `/portfolio/*`                 | `src/app/(main)/portfolio/`       | Portfolio                 |

### Main

| Label      | Route         | Template                                |
| ---------- | ------------- | --------------------------------------- |
| Home       | `/`           | `ComponentsTemplate` (`PagesDirectory`) |
| Dashboard  | `/dashboard`  | `DashboardTemplate`                     |
| Profile    | `/profile`    | `ProfileTemplate`                       |
| Settings   | `/settings`   | `SettingsTemplate`                      |
| Version    | `/version`    | `VersionTemplate`                       |
| Chat       | `/chat`       | `ChatTemplate`                          |
| Onboarding | `/onboarding` | `OnboardingTemplate`                    |
| Search     | `/search`     | `SearchTemplate`                        |

### App Workspace

| Route            | Template                |
| ---------------- | ----------------------- |
| `/analytics`     | `AnalyticsTemplate`     |
| `/calendar`      | `CalendarTemplate`      |
| `/kanban`        | `KanbanTemplate`        |
| `/inbox`         | `InboxTemplate`         |
| `/tasks`         | `TasksTemplate`         |
| `/notes`         | `NotesTemplate`         |
| `/files`         | `FilesTemplate`         |
| `/help`          | `HelpCenterTemplate`    |
| `/members`       | `MembersTemplate`       |
| `/notifications` | `NotificationsTemplate` |
| `/billing`       | `BillingTemplate`       |
| `/integrations`  | `IntegrationsTemplate`  |
| `/activity`      | `ActivityLogTemplate`   |
| `/expenses`      | `ExpensesTemplate`      |
| `/timesheets`    | `TimesheetsTemplate`    |
| `/goals`         | `GoalsTemplate`         |
| `/roadmap`       | `RoadmapTemplate`       |
| `/sprints`       | `SprintsTemplate`       |
| `/reports`       | `ReportsTemplate`       |
| `/contacts`      | `ContactsTemplate`      |
| `/whiteboard`    | `WhiteboardTemplate`    |
| `/meetings`      | `MeetingsTemplate`      |
| `/shortcuts`     | `ShortcutsTemplate`     |
| `/import`        | `ImportTemplate`        |
| `/webhooks`      | `WebhooksTemplate`      |
| `/permissions`   | `PermissionsTemplate`   |

### Data & UI Showcase

| Route           | Template                |
| --------------- | ----------------------- |
| `/data-table`   | `DataTableTemplate`     |
| `/forms`        | `FormsShowcaseTemplate` |
| `/charts`       | `ChartsGalleryTemplate` |
| `/modals`       | `ModalsTemplate`        |
| `/forbidden`    | `ForbiddenTemplate`     |
| `/accordion`    | `AccordionTemplate`     |
| `/alerts`       | `AlertsTemplate`        |
| `/tabs`         | `TabsTemplate`          |
| `/pagination`   | `PaginationTemplate`    |
| `/tooltips`     | `TooltipsTemplate`      |
| `/stepper`      | `StepperTemplate`       |
| `/upload`       | `UploadTemplate`        |
| `/empty-states` | `EmptyStatesTemplate`   |

### Auth

| Route              | Template                   |
| ------------------ | -------------------------- |
| `/sign-in`         | `SignInTemplate`           |
| `/sign-up`         | `SignUpTemplate`           |
| `/forgot-password` | `ForgotPasswordTemplate`   |
| `/reset-password`  | `ResetPasswordTemplate`    |
| `/verify-email`    | `VerifyEmailTemplate`      |
| `/two-factor`      | `TwoFactorTemplate`        |
| `/lock-screen`     | `LockScreenTemplate`       |
| `/change-password` | `ChangePasswordTemplate`   |
| `/sessions`        | `SessionsTemplate`         |
| `/recovery-codes`  | `RecoveryCodesTemplate`    |
| `/delete-account`  | `DeleteAccountTemplate`    |
| `/security`        | `SecurityOverviewTemplate` |

### Marketing

| Route          | Template              |
| -------------- | --------------------- |
| `/landing`     | `LandingTemplate`     |
| `/about`       | `AboutTemplate`       |
| `/terms`       | `TermsTemplate`       |
| `/privacy`     | `PrivacyTemplate`     |
| `/coming-soon` | `ComingSoonTemplate`  |
| `/maintenance` | `MaintenanceTemplate` |
| `/resume`      | `ResumeTemplate`      |
| `/pricing`     | `PricingTemplate`     |
| `/contact`     | `ContactTemplate`     |
| `/careers`     | `CareersTemplate`     |
| `/team`        | `TeamTemplate`        |
| `/changelog`   | `ChangelogTemplate`   |

### Store

| Route                       | Template                    |
| --------------------------- | --------------------------- |
| `/store`                    | `StoreFrontTemplate`        |
| `/store/[id]`               | `StoreItemTemplate`         |
| `/store/cart`               | `CartTemplate`              |
| `/store/checkout`           | `CheckoutTemplate`          |
| `/store/order-confirmation` | `OrderConfirmationTemplate` |
| `/store/order-history`      | `OrderHistoryTemplate`      |
| `/store/wishlist`           | `WishlistTemplate`          |
| `/store/compare`            | `CompareTemplate`           |
| `/store/addresses`          | `AddressBookTemplate`       |
| `/store/payment-methods`    | `PaymentMethodsTemplate`    |
| `/store/tracking`           | `OrderTrackingTemplate`     |
| `/store/deals`              | `DealsTemplate`             |
| `/store/categories`         | `CategoriesTemplate`        |
| `/store/reviews`            | `ReviewsTemplate`           |
| `/store/support`            | `SupportTemplate`           |
| `/store/gift-cards`         | `GiftCardsTemplate`         |

### Blog

| Route              | Template                 |
| ------------------ | ------------------------ |
| `/blog`            | `BlogListTemplate`       |
| `/blog/[slug]`     | `BlogItemTemplate`       |
| `/blog/archive`    | `BlogArchiveTemplate`    |
| `/blog/author`     | `BlogAuthorTemplate`     |
| `/blog/newsletter` | `BlogNewsletterTemplate` |
| `/blog/categories` | `BlogCategoriesTemplate` |
| `/blog/tags`       | `BlogTagsTemplate`       |
| `/blog/search`     | `BlogSearchTemplate`     |

### Commerce Admin

| Route               | Template             |
| ------------------- | -------------------- |
| `/admin/products`   | `ProductsTemplate`   |
| `/admin/orders`     | `OrdersTemplate`     |
| `/admin/customers`  | `CustomersTemplate`  |
| `/admin/inventory`  | `InventoryTemplate`  |
| `/admin/coupons`    | `CouponsTemplate`    |
| `/admin/promotions` | `PromotionsTemplate` |
| `/admin/refunds`    | `RefundsTemplate`    |
| `/admin/shipments`  | `ShipmentsTemplate`  |

### Finance

| Route                    | Template                |
| ------------------------ | ----------------------- |
| `/finance/invoices`      | `InvoicesTemplate`      |
| `/finance/budgets`       | `BudgetsTemplate`       |
| `/finance/subscriptions` | `SubscriptionsTemplate` |
| `/finance/transactions`  | `TransactionsTemplate`  |
| `/finance/taxes`         | `TaxesTemplate`         |
| `/finance/payroll`       | `PayrollTemplate`       |
| `/finance/statements`    | `StatementsTemplate`    |
| `/finance/accounts`      | `AccountsTemplate`      |

### Developer

| Route                      | Template               |
| -------------------------- | ---------------------- |
| `/developer/api-keys`      | `ApiKeysTemplate`      |
| `/developer/feature-flags` | `FeatureFlagsTemplate` |
| `/developer/environments`  | `EnvironmentsTemplate` |
| `/developer/deployments`   | `DeploymentsTemplate`  |
| `/developer/logs`          | `LogsTemplate`         |
| `/developer/endpoints`     | `EndpointsTemplate`    |
| `/developer/monitors`      | `MonitorsTemplate`     |
| `/developer/backups`       | `BackupsTemplate`      |

### Social & Media

| Route               | Template               |
| ------------------- | ---------------------- |
| `/social/feed`      | `FeedTemplate`         |
| `/social/messages`  | `MessagesTemplate`     |
| `/social/events`    | `EventsTemplate`       |
| `/social/groups`    | `GroupsTemplate`       |
| `/social/followers` | `FollowersTemplate`    |
| `/media/library`    | `MediaLibraryTemplate` |
| `/media/albums`     | `AlbumsTemplate`       |
| `/media/video`      | `VideoPlayerTemplate`  |

### Customer Support

| Route                     | Template                 |
| ------------------------- | ------------------------ |
| `/support/tickets`        | `SupportTicketsTemplate` |
| `/support/ticket-detail`  | `TicketDetailTemplate`   |
| `/support/live-chat`      | `LiveChatTemplate`       |
| `/support/knowledge-base` | `KnowledgeBaseTemplate`  |
| `/support/faqs`           | `FaqTemplate`            |
| `/support/announcements`  | `AnnouncementsTemplate`  |
| `/support/status`         | `ServiceStatusTemplate`  |
| `/support/feedback`       | `FeedbackTemplate`       |

### Email

| Route           | Template             |
| --------------- | -------------------- |
| `/mail/inbox`   | `InboxTemplate`      |
| `/mail/thread`  | `ThreadTemplate`     |
| `/mail/compose` | `ComposeTemplate`    |
| `/mail/drafts`  | `DraftsTemplate`     |
| `/mail/sent`    | `SentTemplate`       |
| `/mail/spam`    | `SpamTemplate`       |
| `/mail/labels`  | `LabelsTemplate`     |
| `/mail/search`  | `MailSearchTemplate` |

### HR

| Route           | Template                     |
| --------------- | ---------------------------- |
| `/hr/people`    | `PeopleDirectoryTemplate`    |
| `/hr/org-chart` | `OrgChartTemplate`           |
| `/hr/hiring`    | `HiringPipelineTemplate`     |
| `/hr/policies`  | `PoliciesTemplate`           |
| `/hr/benefits`  | `BenefitsTemplate`           |
| `/hr/reviews`   | `PerformanceReviewsTemplate` |
| `/hr/shifts`    | `ShiftScheduleTemplate`      |
| `/hr/time-off`  | `TimeOffTemplate`            |

### Sales & CRM

| Route                | Template               |
| -------------------- | ---------------------- |
| `/crm/accounts`      | `AccountsTemplate`     |
| `/crm/contacts`      | `CrmContactsTemplate`  |
| `/crm/leads`         | `LeadsTemplate`        |
| `/crm/deals`         | `DealsTemplate`        |
| `/crm/pipeline`      | `PipelineTemplate`     |
| `/crm/campaigns`     | `CampaignsTemplate`    |
| `/crm/quote-builder` | `QuoteBuilderTemplate` |
| `/crm/reports`       | `SalesReportsTemplate` |

### Learning

| Route                    | Template                    |
| ------------------------ | --------------------------- |
| `/learning/my-courses`   | `MyCoursesTemplate`         |
| `/learning/catalog`      | `CourseCatalogTemplate`     |
| `/learning/course`       | `CourseDetailTemplate`      |
| `/learning/lesson`       | `LessonPlayerTemplate`      |
| `/learning/instructors`  | `InstructorsTemplate`       |
| `/learning/quizzes`      | `QuizzesTemplate`           |
| `/learning/achievements` | `AchievementsTemplate`      |
| `/learning/analytics`    | `LearningAnalyticsTemplate` |

### News & Magazine

| Route              | Template                   |
| ------------------ | -------------------------- |
| `/news/article`    | `ArticleTemplate`          |
| `/news/breaking`   | `BreakingNewsTemplate`     |
| `/news/editorial`  | `EditorialTemplate`        |
| `/news/magazine`   | `MagazineGridTemplate`     |
| `/news/categories` | `NewsCategoriesTemplate`   |
| `/news/newsletter` | `NewsletterSignupTemplate` |
| `/news/opinion`    | `OpinionTemplate`          |
| `/news/press`      | `PressReleasesTemplate`    |

### Music

| Route                | Template              |
| -------------------- | --------------------- |
| `/music/home`        | `MusicHomeTemplate`   |
| `/music/album`       | `AlbumDetailTemplate` |
| `/music/artists`     | `ArtistsTemplate`     |
| `/music/charts`      | `ChartsTemplate`      |
| `/music/now-playing` | `NowPlayingTemplate`  |
| `/music/playlist`    | `PlaylistTemplate`    |
| `/music/lyrics`      | `LyricsTemplate`      |
| `/music/search`      | `MusicSearchTemplate` |

### Video Streaming

| Route                          | Template                   |
| ------------------------------ | -------------------------- |
| `/streaming/home`              | `StreamingHomeTemplate`    |
| `/streaming/movie`             | `MovieDetailTemplate`      |
| `/streaming/series`            | `TvSeriesTemplate`         |
| `/streaming/live`              | `LiveChannelsTemplate`     |
| `/streaming/continue-watching` | `ContinueWatchingTemplate` |
| `/streaming/my-list`           | `MyListTemplate`           |
| `/streaming/history`           | `WatchHistoryTemplate`     |
| `/streaming/search`            | `StreamingSearchTemplate`  |

### Gaming

| Route                  | Template                 |
| ---------------------- | ------------------------ |
| `/gaming/catalog`      | `GameCatalogTemplate`    |
| `/gaming/game`         | `GameDetailTemplate`     |
| `/gaming/challenges`   | `GameChallengesTemplate` |
| `/gaming/leaderboards` | `LeaderboardsTemplate`   |
| `/gaming/matches`      | `LiveMatchesTemplate`    |
| `/gaming/players`      | `PlayerProfilesTemplate` |
| `/gaming/tournaments`  | `TournamentsTemplate`    |
| `/gaming/news`         | `GameNewsTemplate`       |

### Sports

| Route               | Template                  |
| ------------------- | ------------------------- |
| `/sports/scores`    | `LiveScoresTemplate`      |
| `/sports/fixtures`  | `FixturesTemplate`        |
| `/sports/match`     | `MatchDetailTemplate`     |
| `/sports/standings` | `SeasonStandingsTemplate` |
| `/sports/stats`     | `PlayerStatsTemplate`     |
| `/sports/roster`    | `TeamRosterTemplate`      |
| `/sports/favorites` | `FavoriteTeamsTemplate`   |
| `/sports/news`      | `SportsNewsTemplate`      |

### Travel

| Route                  | Template                |
| ---------------------- | ----------------------- |
| `/travel/bookings`     | `BookingsTemplate`      |
| `/travel/search`       | `BookingSearchTemplate` |
| `/travel/hotel`        | `HotelDetailTemplate`   |
| `/travel/destinations` | `DestinationsTemplate`  |
| `/travel/guides`       | `TravelGuidesTemplate`  |
| `/travel/stories`      | `TravelStoriesTemplate` |
| `/travel/packing`      | `PackingListTemplate`   |
| `/travel/planner`      | `TripPlannerTemplate`   |

### Food & Dining

| Route                | Template                   |
| -------------------- | -------------------------- |
| `/food/restaurants`  | `RestaurantListTemplate`   |
| `/food/restaurant`   | `RestaurantDetailTemplate` |
| `/food/menu`         | `MenuTemplate`             |
| `/food/recipes`      | `RecipesTemplate`          |
| `/food/recipe`       | `RecipeDetailTemplate`     |
| `/food/reservations` | `ReservationsTemplate`     |
| `/food/delivery`     | `FoodDeliveryTemplate`     |
| `/food/wine`         | `WineListTemplate`         |

### Health & Fitness

| Route               | Template                   |
| ------------------- | -------------------------- |
| `/health/dashboard` | `HealthDashboardTemplate`  |
| `/health/activity`  | `ActivityTrackerTemplate`  |
| `/health/workout`   | `WorkoutPlannerTemplate`   |
| `/health/nutrition` | `NutritionTrackerTemplate` |
| `/health/sleep`     | `SleepTrackerTemplate`     |
| `/health/water`     | `WaterIntakeTemplate`      |
| `/health/goals`     | `GoalsTemplate`            |
| `/health/profile`   | `HealthProfileTemplate`    |

### Real Estate

| Route                      | Template                     |
| -------------------------- | ---------------------------- |
| `/real-estate/listings`    | `PropertyListingsTemplate`   |
| `/real-estate/property`    | `PropertyDetailTemplate`     |
| `/real-estate/search`      | `SearchFiltersTemplate`      |
| `/real-estate/map`         | `MapViewTemplate`            |
| `/real-estate/saved`       | `SavedPropertiesTemplate`    |
| `/real-estate/mortgage`    | `MortgageCalculatorTemplate` |
| `/real-estate/open-houses` | `OpenHousesTemplate`         |
| `/real-estate/agents`      | `AgentProfileTemplate`       |

### Smart Home / IoT

| Route              | Template                    |
| ------------------ | --------------------------- |
| `/iot/dashboard`   | `DeviceDashboardTemplate`   |
| `/iot/device`      | `DeviceDetailTemplate`      |
| `/iot/scenes`      | `ScenesTemplate`            |
| `/iot/automations` | `AutomationsTemplate`       |
| `/iot/energy`      | `EnergyUsageTemplate`       |
| `/iot/security`    | `SecurityTemplate`          |
| `/iot/sensors`     | `SensorDataTemplate`        |
| `/iot/settings`    | `SmartHomeSettingsTemplate` |

### Portfolio

| Route                     | Template                    |
| ------------------------- | --------------------------- |
| `/portfolio/overview`     | `PortfolioOverviewTemplate` |
| `/portfolio/holdings`     | `HoldingsTemplate`          |
| `/portfolio/transactions` | `TransactionsTemplate`      |
| `/portfolio/performance`  | `PerformanceTemplate`       |
| `/portfolio/allocation`   | `AllocationTemplate`        |
| `/portfolio/watchlist`    | `WatchlistTemplate`         |
| `/portfolio/alerts`       | `AlertsTemplate`            |
| `/portfolio/dividends`    | `DividendIncomeTemplate`    |
| `/portfolio/settings`     | `PortfolioSettingsTemplate` |

### System pages

| File                       | Template                | Description                           |
| -------------------------- | ----------------------- | ------------------------------------- |
| `src/app/not-found.tsx`    | `NotFoundTemplate`      | 404 page with "Go home" action        |
| `src/app/error.tsx`        | `ErrorTemplate`         | 500 page with "Try again" (`reset()`) |
| `src/app/global-error.tsx` | `GlobalErrorTemplate`   | Root error boundary                   |
| `src/app/layout.tsx`       | `CookieConsentTemplate` | Root layout wrapper                   |

---

## Adding new templates/pages

1. Create `<Name>Template.tsx` in the appropriate
   `src/components/templates/<folder>/` folder (create the folder if the domain
   is new).
2. Create the thin page wrapper at the route path, e.g.
   `src/app/(main)/<route>/page.tsx`.
3. Add the route to `GROUPS` in
   `src/components/templates/shared/ComponentsTemplate/demo/pages/PagesDirectory.tsx`
   (a `PageEntry` with `label`, `href`, `icon`, `description`) and bump
   `TEMPLATE_COUNT`.
4. Add a colocated suite in `<folder>/__tests__/`; every route and interaction
   must stay above the 90% coverage gate in `jest.config.ts`.
5. Verify with `pnpm exec tsc --noEmit` and `pnpm exec jest`.
