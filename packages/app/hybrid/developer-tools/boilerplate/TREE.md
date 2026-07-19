# TREE

```text
├── docs/
│   ├── api/
│   │   ├── [ADDING.md](./docs/api/ADDING.md)
│   │   ├── [API.md](./docs/api/API.md)
│   │   ├── [ATOMIC.md](./docs/api/ATOMIC.md)
│   │   ├── [ATOMS.md](./docs/api/ATOMS.md)
│   │   ├── [CONVENTIONS.md](./docs/api/CONVENTIONS.md)
│   │   ├── [MOLECULES.md](./docs/api/MOLECULES.md)
│   │   ├── [ORGANISMS.md](./docs/api/ORGANISMS.md)
│   │   ├── [PAGES.md](./docs/api/PAGES.md)
│   │   ├── [README.md](./docs/api/README.md)
│   │   ├── [REFERENCES.md](./docs/api/REFERENCES.md)
│   │   └── [TEMPLATES.md](./docs/api/TEMPLATES.md)
│   ├── [ARCHITECTURE.md](./docs/ARCHITECTURE.md)
│   ├── [CONTRIBUTING.md](./docs/CONTRIBUTING.md)
│   ├── [DOWNLOADS.md](./docs/DOWNLOADS.md)
│   ├── [PACKAGING.md](./docs/PACKAGING.md)
│   ├── [ROADMAP.md](./docs/ROADMAP.md)
│   └── [SETUP.md](./docs/SETUP.md)
├── e2e/
│   └── [index.spec.ts](./e2e/index.spec.ts)
├── public/
│   ├── icons/
│   │   ├── [icon-128x128.png](./public/icons/icon-128x128.png)
│   │   ├── [icon-144x144.png](./public/icons/icon-144x144.png)
│   │   ├── [icon-152x152.png](./public/icons/icon-152x152.png)
│   │   ├── [icon-16x16.png](./public/icons/icon-16x16.png)
│   │   ├── [icon-180x180.png](./public/icons/icon-180x180.png)
│   │   ├── [icon-192.png](./public/icons/icon-192.png)
│   │   ├── [icon-192x192.png](./public/icons/icon-192x192.png)
│   │   ├── [icon-256x256.png](./public/icons/icon-256x256.png)
│   │   ├── [icon-32x32.png](./public/icons/icon-32x32.png)
│   │   ├── [icon-384x384.png](./public/icons/icon-384x384.png)
│   │   ├── [icon-48x48.png](./public/icons/icon-48x48.png)
│   │   ├── [icon-512.png](./public/icons/icon-512.png)
│   │   ├── [icon-512x512.png](./public/icons/icon-512x512.png)
│   │   ├── [icon-64x64.png](./public/icons/icon-64x64.png)
│   │   ├── [icon-72x72.png](./public/icons/icon-72x72.png)
│   │   ├── [icon-96x96.png](./public/icons/icon-96x96.png)
│   │   └── [icon.svg](./public/icons/icon.svg)
│   ├── [apple-touch-icon.png](./public/apple-touch-icon.png)
│   ├── [favicon.ico](./public/favicon.ico)
│   ├── [manifest.json](./public/manifest.json)
│   ├── [robots.txt](./public/robots.txt)
│   ├── [sitemap.xml](./public/sitemap.xml)
│   └── [sw.js](./public/sw.js)
├── src/
│   ├── app/
│   │   ├── (app)/
│   │   │   └── [page.tsx](./src/app/(app)/page.tsx)
│   │   ├── (templates)/
│   │   │   ├── app/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [loading.test.tsx](./src/app/(templates)/app/__tests__/loading.test.tsx)
│   │   │   │   ├── activity/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/app/activity/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/app/activity/page.tsx)
│   │   │   │   ├── analytics/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/app/analytics/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/app/analytics/page.tsx)
│   │   │   │   ├── calendar/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/app/calendar/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/app/calendar/page.tsx)
│   │   │   │   ├── chat/
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/app/chat/page.tsx)
│   │   │   │   ├── contacts/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/app/contacts/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/app/contacts/page.tsx)
│   │   │   │   ├── dashboard/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/app/dashboard/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/app/dashboard/page.tsx)
│   │   │   │   ├── files/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/app/files/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/app/files/page.tsx)
│   │   │   │   ├── goals/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/app/goals/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/app/goals/page.tsx)
│   │   │   │   ├── help/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/app/help/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/app/help/page.tsx)
│   │   │   │   ├── inbox/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/app/inbox/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/app/inbox/page.tsx)
│   │   │   │   ├── integrations/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/app/integrations/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/app/integrations/page.tsx)
│   │   │   │   ├── kanban/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/app/kanban/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/app/kanban/page.tsx)
│   │   │   │   ├── meetings/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/app/meetings/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/app/meetings/page.tsx)
│   │   │   │   ├── members/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/app/members/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/app/members/page.tsx)
│   │   │   │   ├── notifications/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/app/notifications/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/app/notifications/page.tsx)
│   │   │   │   ├── tasks/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/app/tasks/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/app/tasks/page.tsx)
│   │   │   │   └── [loading.tsx](./src/app/(templates)/app/loading.tsx)
│   │   │   ├── auth/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [loading.test.tsx](./src/app/(templates)/auth/__tests__/loading.test.tsx)
│   │   │   │   ├── change-password/
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/auth/change-password/page.tsx)
│   │   │   │   ├── delete-account/
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/auth/delete-account/page.tsx)
│   │   │   │   ├── error/
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/auth/error/page.tsx)
│   │   │   │   ├── forbidden/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/auth/forbidden/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/auth/forbidden/page.tsx)
│   │   │   │   ├── forgot-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/auth/forgot-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/auth/forgot-password/page.tsx)
│   │   │   │   ├── global-error/
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/auth/global-error/page.tsx)
│   │   │   │   ├── home-security/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/auth/home-security/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/auth/home-security/page.tsx)
│   │   │   │   ├── lock-screen/
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/auth/lock-screen/page.tsx)
│   │   │   │   ├── not-found/
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/auth/not-found/page.tsx)
│   │   │   │   ├── permissions/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/auth/permissions/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/auth/permissions/page.tsx)
│   │   │   │   ├── recovery-codes/
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/auth/recovery-codes/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/auth/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/auth/reset-password/page.tsx)
│   │   │   │   ├── security/
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/auth/security/page.tsx)
│   │   │   │   ├── sessions/
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/auth/sessions/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/auth/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/auth/sign-in/page.tsx)
│   │   │   │   ├── sign-up/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/auth/sign-up/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/auth/sign-up/page.tsx)
│   │   │   │   ├── two-factor/
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/auth/two-factor/page.tsx)
│   │   │   │   ├── verify-email/
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/auth/verify-email/page.tsx)
│   │   │   │   └── [loading.tsx](./src/app/(templates)/auth/loading.tsx)
│   │   │   ├── blog/
│   │   │   │   ├── [slug]/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/blog/[slug]/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/blog/[slug]/page.tsx)
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [loading.test.tsx](./src/app/(templates)/blog/__tests__/loading.test.tsx)
│   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/blog/__tests__/page.test.tsx)
│   │   │   │   ├── achievements/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/blog/achievements/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/blog/achievements/page.tsx)
│   │   │   │   ├── analytics/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/blog/analytics/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/blog/analytics/page.tsx)
│   │   │   │   ├── archive/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/blog/archive/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/blog/archive/page.tsx)
│   │   │   │   ├── author/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/blog/author/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/blog/author/page.tsx)
│   │   │   │   ├── catalog/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/blog/catalog/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/blog/catalog/page.tsx)
│   │   │   │   ├── categories/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/blog/categories/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/blog/categories/page.tsx)
│   │   │   │   ├── course/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/blog/course/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/blog/course/page.tsx)
│   │   │   │   ├── instructors/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/blog/instructors/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/blog/instructors/page.tsx)
│   │   │   │   ├── lesson/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/blog/lesson/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/blog/lesson/page.tsx)
│   │   │   │   ├── my-courses/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/blog/my-courses/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/blog/my-courses/page.tsx)
│   │   │   │   ├── newsletter/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/blog/newsletter/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/blog/newsletter/page.tsx)
│   │   │   │   ├── quizzes/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/blog/quizzes/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/blog/quizzes/page.tsx)
│   │   │   │   ├── search/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/blog/search/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/blog/search/page.tsx)
│   │   │   │   ├── tags/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/blog/tags/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/blog/tags/page.tsx)
│   │   │   │   ├── [loading.tsx](./src/app/(templates)/blog/loading.tsx)
│   │   │   │   └── [page.tsx](./src/app/(templates)/blog/page.tsx)
│   │   │   ├── crm/
│   │   │   │   ├── accounts/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/crm/accounts/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/crm/accounts/page.tsx)
│   │   │   │   ├── campaigns/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/crm/campaigns/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/crm/campaigns/page.tsx)
│   │   │   │   ├── contacts/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/crm/contacts/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/crm/contacts/page.tsx)
│   │   │   │   ├── coupons/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/crm/coupons/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/crm/coupons/page.tsx)
│   │   │   │   ├── customers/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/crm/customers/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/crm/customers/page.tsx)
│   │   │   │   ├── deals/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/crm/deals/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/crm/deals/page.tsx)
│   │   │   │   ├── inventory/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/crm/inventory/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/crm/inventory/page.tsx)
│   │   │   │   ├── leads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/crm/leads/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/crm/leads/page.tsx)
│   │   │   │   ├── orders/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/crm/orders/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/crm/orders/page.tsx)
│   │   │   │   ├── pipeline/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/crm/pipeline/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/crm/pipeline/page.tsx)
│   │   │   │   ├── products/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/crm/products/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/crm/products/page.tsx)
│   │   │   │   ├── promotions/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/crm/promotions/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/crm/promotions/page.tsx)
│   │   │   │   ├── quote-builder/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/crm/quote-builder/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/crm/quote-builder/page.tsx)
│   │   │   │   ├── refunds/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/crm/refunds/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/crm/refunds/page.tsx)
│   │   │   │   ├── reports/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/crm/reports/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/crm/reports/page.tsx)
│   │   │   │   └── shipments/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./src/app/(templates)/crm/shipments/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./src/app/(templates)/crm/shipments/page.tsx)
│   │   │   ├── developer/
│   │   │   │   ├── api-keys/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/developer/api-keys/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/developer/api-keys/page.tsx)
│   │   │   │   ├── automations/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/developer/automations/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/developer/automations/page.tsx)
│   │   │   │   ├── backups/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/developer/backups/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/developer/backups/page.tsx)
│   │   │   │   ├── dashboard/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/developer/dashboard/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/developer/dashboard/page.tsx)
│   │   │   │   ├── deployments/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/developer/deployments/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/developer/deployments/page.tsx)
│   │   │   │   ├── device/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/developer/device/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/developer/device/page.tsx)
│   │   │   │   ├── endpoints/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/developer/endpoints/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/developer/endpoints/page.tsx)
│   │   │   │   ├── energy/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/developer/energy/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/developer/energy/page.tsx)
│   │   │   │   ├── environments/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/developer/environments/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/developer/environments/page.tsx)
│   │   │   │   ├── feature-flags/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/developer/feature-flags/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/developer/feature-flags/page.tsx)
│   │   │   │   ├── logs/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/developer/logs/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/developer/logs/page.tsx)
│   │   │   │   ├── monitors/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/developer/monitors/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/developer/monitors/page.tsx)
│   │   │   │   ├── scenes/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/developer/scenes/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/developer/scenes/page.tsx)
│   │   │   │   ├── sensors/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/developer/sensors/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/developer/sensors/page.tsx)
│   │   │   │   ├── settings/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/developer/settings/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/developer/settings/page.tsx)
│   │   │   │   └── webhooks/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./src/app/(templates)/developer/webhooks/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./src/app/(templates)/developer/webhooks/page.tsx)
│   │   │   ├── finance/
│   │   │   │   ├── accounts/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/finance/accounts/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/finance/accounts/page.tsx)
│   │   │   │   ├── alerts/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/finance/alerts/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/finance/alerts/page.tsx)
│   │   │   │   ├── billing/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/finance/billing/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/finance/billing/page.tsx)
│   │   │   │   ├── budgets/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/finance/budgets/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/finance/budgets/page.tsx)
│   │   │   │   ├── dividends/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/finance/dividends/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/finance/dividends/page.tsx)
│   │   │   │   ├── expenses/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/finance/expenses/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/finance/expenses/page.tsx)
│   │   │   │   ├── holdings/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/finance/holdings/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/finance/holdings/page.tsx)
│   │   │   │   ├── invoices/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/finance/invoices/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/finance/invoices/page.tsx)
│   │   │   │   ├── overview/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/finance/overview/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/finance/overview/page.tsx)
│   │   │   │   ├── payroll/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/finance/payroll/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/finance/payroll/page.tsx)
│   │   │   │   ├── performance/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/finance/performance/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/finance/performance/page.tsx)
│   │   │   │   ├── settings/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/finance/settings/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/finance/settings/page.tsx)
│   │   │   │   ├── statements/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/finance/statements/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/finance/statements/page.tsx)
│   │   │   │   ├── subscriptions/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/finance/subscriptions/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/finance/subscriptions/page.tsx)
│   │   │   │   ├── taxes/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/finance/taxes/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/finance/taxes/page.tsx)
│   │   │   │   └── transactions/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./src/app/(templates)/finance/transactions/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./src/app/(templates)/finance/transactions/page.tsx)
│   │   │   ├── health/
│   │   │   │   ├── activity/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/health/activity/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/health/activity/page.tsx)
│   │   │   │   ├── dashboard/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/health/dashboard/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/health/dashboard/page.tsx)
│   │   │   │   ├── delivery/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/health/delivery/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/health/delivery/page.tsx)
│   │   │   │   ├── goals/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/health/goals/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/health/goals/page.tsx)
│   │   │   │   ├── menu/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/health/menu/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/health/menu/page.tsx)
│   │   │   │   ├── nutrition/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/health/nutrition/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/health/nutrition/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/health/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/health/profile/page.tsx)
│   │   │   │   ├── recipe/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/health/recipe/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/health/recipe/page.tsx)
│   │   │   │   ├── recipes/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/health/recipes/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/health/recipes/page.tsx)
│   │   │   │   ├── reservations/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/health/reservations/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/health/reservations/page.tsx)
│   │   │   │   ├── restaurant/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/health/restaurant/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/health/restaurant/page.tsx)
│   │   │   │   ├── restaurants/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/health/restaurants/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/health/restaurants/page.tsx)
│   │   │   │   ├── sleep/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/health/sleep/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/health/sleep/page.tsx)
│   │   │   │   ├── water/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/health/water/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/health/water/page.tsx)
│   │   │   │   ├── wine/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/health/wine/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/health/wine/page.tsx)
│   │   │   │   └── workout/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./src/app/(templates)/health/workout/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./src/app/(templates)/health/workout/page.tsx)
│   │   │   ├── hr/
│   │   │   │   ├── accordion/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/hr/accordion/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/hr/accordion/page.tsx)
│   │   │   │   ├── alerts/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/hr/alerts/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/hr/alerts/page.tsx)
│   │   │   │   ├── benefits/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/hr/benefits/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/hr/benefits/page.tsx)
│   │   │   │   ├── charts/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/hr/charts/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/hr/charts/page.tsx)
│   │   │   │   ├── data-table/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/hr/data-table/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/hr/data-table/page.tsx)
│   │   │   │   ├── empty-states/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/hr/empty-states/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/hr/empty-states/page.tsx)
│   │   │   │   ├── forms/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/hr/forms/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/hr/forms/page.tsx)
│   │   │   │   ├── hiring/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/hr/hiring/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/hr/hiring/page.tsx)
│   │   │   │   ├── modals/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/hr/modals/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/hr/modals/page.tsx)
│   │   │   │   ├── org-chart/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/hr/org-chart/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/hr/org-chart/page.tsx)
│   │   │   │   ├── people/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/hr/people/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/hr/people/page.tsx)
│   │   │   │   ├── policies/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/hr/policies/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/hr/policies/page.tsx)
│   │   │   │   ├── reviews/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/hr/reviews/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/hr/reviews/page.tsx)
│   │   │   │   ├── shifts/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/hr/shifts/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/hr/shifts/page.tsx)
│   │   │   │   ├── tabs/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/hr/tabs/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/hr/tabs/page.tsx)
│   │   │   │   └── time-off/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./src/app/(templates)/hr/time-off/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./src/app/(templates)/hr/time-off/page.tsx)
│   │   │   ├── landing/
│   │   │   │   ├── careers/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/landing/careers/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/landing/careers/page.tsx)
│   │   │   │   ├── changelog/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/landing/changelog/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/landing/changelog/page.tsx)
│   │   │   │   ├── contact/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/landing/contact/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/landing/contact/page.tsx)
│   │   │   │   ├── game/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/landing/game/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/landing/game/page.tsx)
│   │   │   │   ├── landing/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/landing/landing/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/landing/landing/page.tsx)
│   │   │   │   ├── notes/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/landing/notes/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/landing/notes/page.tsx)
│   │   │   │   ├── pricing/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/landing/pricing/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/landing/pricing/page.tsx)
│   │   │   │   ├── privacy/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/landing/privacy/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/landing/privacy/page.tsx)
│   │   │   │   ├── resume/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/landing/resume/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/landing/resume/page.tsx)
│   │   │   │   ├── roadmap/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/landing/roadmap/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/landing/roadmap/page.tsx)
│   │   │   │   ├── settings/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/landing/settings/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/landing/settings/page.tsx)
│   │   │   │   ├── shortcuts/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/landing/shortcuts/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/landing/shortcuts/page.tsx)
│   │   │   │   ├── sprints/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/landing/sprints/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/landing/sprints/page.tsx)
│   │   │   │   ├── team/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/landing/team/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/landing/team/page.tsx)
│   │   │   │   ├── terms/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/landing/terms/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/landing/terms/page.tsx)
│   │   │   │   ├── version/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/landing/version/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/landing/version/page.tsx)
│   │   │   │   └── whiteboard/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./src/app/(templates)/landing/whiteboard/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./src/app/(templates)/landing/whiteboard/page.tsx)
│   │   │   ├── mail/
│   │   │   │   ├── allocation/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/mail/allocation/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/mail/allocation/page.tsx)
│   │   │   │   ├── catalog/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/mail/catalog/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/mail/catalog/page.tsx)
│   │   │   │   ├── coming-soon/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/mail/coming-soon/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/mail/coming-soon/page.tsx)
│   │   │   │   ├── compose/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/mail/compose/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/mail/compose/page.tsx)
│   │   │   │   ├── drafts/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/mail/drafts/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/mail/drafts/page.tsx)
│   │   │   │   ├── import/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/mail/import/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/mail/import/page.tsx)
│   │   │   │   ├── inbox/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/mail/inbox/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/mail/inbox/page.tsx)
│   │   │   │   ├── labels/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/mail/labels/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/mail/labels/page.tsx)
│   │   │   │   ├── maintenance/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/mail/maintenance/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/mail/maintenance/page.tsx)
│   │   │   │   ├── onboarding/
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/mail/onboarding/page.tsx)
│   │   │   │   ├── search/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/mail/search/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/mail/search/page.tsx)
│   │   │   │   ├── sent/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/mail/sent/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/mail/sent/page.tsx)
│   │   │   │   ├── spam/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/mail/spam/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/mail/spam/page.tsx)
│   │   │   │   ├── thread/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/mail/thread/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/mail/thread/page.tsx)
│   │   │   │   ├── timesheets/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/mail/timesheets/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/mail/timesheets/page.tsx)
│   │   │   │   ├── transactions/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/mail/transactions/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/mail/transactions/page.tsx)
│   │   │   │   └── watchlist/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./src/app/(templates)/mail/watchlist/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./src/app/(templates)/mail/watchlist/page.tsx)
│   │   │   ├── media/
│   │   │   │   ├── album/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/media/album/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/media/album/page.tsx)
│   │   │   │   ├── albums/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/media/albums/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/media/albums/page.tsx)
│   │   │   │   ├── artists/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/media/artists/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/media/artists/page.tsx)
│   │   │   │   ├── charts/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/media/charts/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/media/charts/page.tsx)
│   │   │   │   ├── continue-watching/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/media/continue-watching/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/media/continue-watching/page.tsx)
│   │   │   │   ├── library/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/media/library/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/media/library/page.tsx)
│   │   │   │   ├── lyrics/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/media/lyrics/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/media/lyrics/page.tsx)
│   │   │   │   ├── movie/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/media/movie/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/media/movie/page.tsx)
│   │   │   │   ├── music-home/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/media/music-home/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/media/music-home/page.tsx)
│   │   │   │   ├── my-list/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/media/my-list/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/media/my-list/page.tsx)
│   │   │   │   ├── now-playing/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/media/now-playing/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/media/now-playing/page.tsx)
│   │   │   │   ├── playlist/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/media/playlist/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/media/playlist/page.tsx)
│   │   │   │   ├── search/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/media/search/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/media/search/page.tsx)
│   │   │   │   ├── series/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/media/series/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/media/series/page.tsx)
│   │   │   │   ├── streaming-home/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/media/streaming-home/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/media/streaming-home/page.tsx)
│   │   │   │   └── video/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./src/app/(templates)/media/video/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./src/app/(templates)/media/video/page.tsx)
│   │   │   ├── news/
│   │   │   │   ├── article/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/news/article/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/news/article/page.tsx)
│   │   │   │   ├── breaking/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/news/breaking/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/news/breaking/page.tsx)
│   │   │   │   ├── categories/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/news/categories/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/news/categories/page.tsx)
│   │   │   │   ├── editorial/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/news/editorial/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/news/editorial/page.tsx)
│   │   │   │   ├── favorites/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/news/favorites/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/news/favorites/page.tsx)
│   │   │   │   ├── fixtures/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/news/fixtures/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/news/fixtures/page.tsx)
│   │   │   │   ├── magazine/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/news/magazine/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/news/magazine/page.tsx)
│   │   │   │   ├── match/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/news/match/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/news/match/page.tsx)
│   │   │   │   ├── news/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/news/news/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/news/news/page.tsx)
│   │   │   │   ├── newsletter/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/news/newsletter/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/news/newsletter/page.tsx)
│   │   │   │   ├── opinion/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/news/opinion/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/news/opinion/page.tsx)
│   │   │   │   ├── press/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/news/press/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/news/press/page.tsx)
│   │   │   │   ├── roster/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/news/roster/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/news/roster/page.tsx)
│   │   │   │   ├── scores/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/news/scores/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/news/scores/page.tsx)
│   │   │   │   ├── standings/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/news/standings/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/news/standings/page.tsx)
│   │   │   │   └── stats/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./src/app/(templates)/news/stats/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./src/app/(templates)/news/stats/page.tsx)
│   │   │   ├── social/
│   │   │   │   ├── challenges/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/social/challenges/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/social/challenges/page.tsx)
│   │   │   │   ├── events/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/social/events/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/social/events/page.tsx)
│   │   │   │   ├── feed/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/social/feed/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/social/feed/page.tsx)
│   │   │   │   ├── followers/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/social/followers/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/social/followers/page.tsx)
│   │   │   │   ├── groups/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/social/groups/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/social/groups/page.tsx)
│   │   │   │   ├── history/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/social/history/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/social/history/page.tsx)
│   │   │   │   ├── leaderboards/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/social/leaderboards/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/social/leaderboards/page.tsx)
│   │   │   │   ├── live/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/social/live/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/social/live/page.tsx)
│   │   │   │   ├── matches/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/social/matches/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/social/matches/page.tsx)
│   │   │   │   ├── messages/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/social/messages/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/social/messages/page.tsx)
│   │   │   │   ├── news/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/social/news/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/social/news/page.tsx)
│   │   │   │   ├── players/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/social/players/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/social/players/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/social/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/social/profile/page.tsx)
│   │   │   │   ├── reports/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/social/reports/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/social/reports/page.tsx)
│   │   │   │   ├── search/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/social/search/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/social/search/page.tsx)
│   │   │   │   └── tournaments/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./src/app/(templates)/social/tournaments/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./src/app/(templates)/social/tournaments/page.tsx)
│   │   │   ├── store/
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/store/[id]/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/store/[id]/page.tsx)
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [loading.test.tsx](./src/app/(templates)/store/__tests__/loading.test.tsx)
│   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/store/__tests__/page.test.tsx)
│   │   │   │   ├── addresses/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/store/addresses/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/store/addresses/page.tsx)
│   │   │   │   ├── cart/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/store/cart/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/store/cart/page.tsx)
│   │   │   │   ├── categories/
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/store/categories/page.tsx)
│   │   │   │   ├── checkout/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/store/checkout/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/store/checkout/page.tsx)
│   │   │   │   ├── compare/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/store/compare/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/store/compare/page.tsx)
│   │   │   │   ├── deals/
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/store/deals/page.tsx)
│   │   │   │   ├── gift-cards/
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/store/gift-cards/page.tsx)
│   │   │   │   ├── order-confirmation/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/store/order-confirmation/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/store/order-confirmation/page.tsx)
│   │   │   │   ├── order-history/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/store/order-history/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/store/order-history/page.tsx)
│   │   │   │   ├── payment-methods/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/store/payment-methods/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/store/payment-methods/page.tsx)
│   │   │   │   ├── reviews/
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/store/reviews/page.tsx)
│   │   │   │   ├── support/
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/store/support/page.tsx)
│   │   │   │   ├── tracking/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/store/tracking/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/store/tracking/page.tsx)
│   │   │   │   ├── wishlist/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/store/wishlist/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/store/wishlist/page.tsx)
│   │   │   │   ├── [loading.tsx](./src/app/(templates)/store/loading.tsx)
│   │   │   │   └── [page.tsx](./src/app/(templates)/store/page.tsx)
│   │   │   ├── support/
│   │   │   │   ├── about/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/support/about/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/support/about/page.tsx)
│   │   │   │   ├── announcements/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/support/announcements/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/support/announcements/page.tsx)
│   │   │   │   ├── cookie-consent/
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/support/cookie-consent/page.tsx)
│   │   │   │   ├── faqs/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/support/faqs/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/support/faqs/page.tsx)
│   │   │   │   ├── feedback/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/support/feedback/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/support/feedback/page.tsx)
│   │   │   │   ├── knowledge-base/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/support/knowledge-base/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/support/knowledge-base/page.tsx)
│   │   │   │   ├── live-chat/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/support/live-chat/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/support/live-chat/page.tsx)
│   │   │   │   ├── loading-app/
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/support/loading-app/page.tsx)
│   │   │   │   ├── loading-auth/
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/support/loading-auth/page.tsx)
│   │   │   │   ├── loading-blog/
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/support/loading-blog/page.tsx)
│   │   │   │   ├── loading-store/
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/support/loading-store/page.tsx)
│   │   │   │   ├── pagination/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/support/pagination/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/support/pagination/page.tsx)
│   │   │   │   ├── search/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/support/search/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/support/search/page.tsx)
│   │   │   │   ├── status/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/support/status/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/support/status/page.tsx)
│   │   │   │   ├── stepper/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/support/stepper/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/support/stepper/page.tsx)
│   │   │   │   ├── ticket-detail/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/support/ticket-detail/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/support/ticket-detail/page.tsx)
│   │   │   │   ├── tickets/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/support/tickets/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/support/tickets/page.tsx)
│   │   │   │   ├── tooltips/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(templates)/support/tooltips/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(templates)/support/tooltips/page.tsx)
│   │   │   │   └── upload/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./src/app/(templates)/support/upload/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./src/app/(templates)/support/upload/page.tsx)
│   │   │   └── travel/
│   │   │       ├── agents/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(templates)/travel/agents/__tests__/page.test.tsx)
│   │   │       │   └── [page.tsx](./src/app/(templates)/travel/agents/page.tsx)
│   │   │       ├── bookings/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(templates)/travel/bookings/__tests__/page.test.tsx)
│   │   │       │   └── [page.tsx](./src/app/(templates)/travel/bookings/page.tsx)
│   │   │       ├── destinations/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(templates)/travel/destinations/__tests__/page.test.tsx)
│   │   │       │   └── [page.tsx](./src/app/(templates)/travel/destinations/page.tsx)
│   │   │       ├── guides/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(templates)/travel/guides/__tests__/page.test.tsx)
│   │   │       │   └── [page.tsx](./src/app/(templates)/travel/guides/page.tsx)
│   │   │       ├── hotel/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(templates)/travel/hotel/__tests__/page.test.tsx)
│   │   │       │   └── [page.tsx](./src/app/(templates)/travel/hotel/page.tsx)
│   │   │       ├── listings/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(templates)/travel/listings/__tests__/page.test.tsx)
│   │   │       │   └── [page.tsx](./src/app/(templates)/travel/listings/page.tsx)
│   │   │       ├── map/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(templates)/travel/map/__tests__/page.test.tsx)
│   │   │       │   └── [page.tsx](./src/app/(templates)/travel/map/page.tsx)
│   │   │       ├── mortgage/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(templates)/travel/mortgage/__tests__/page.test.tsx)
│   │   │       │   └── [page.tsx](./src/app/(templates)/travel/mortgage/page.tsx)
│   │   │       ├── open-houses/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(templates)/travel/open-houses/__tests__/page.test.tsx)
│   │   │       │   └── [page.tsx](./src/app/(templates)/travel/open-houses/page.tsx)
│   │   │       ├── packing/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(templates)/travel/packing/__tests__/page.test.tsx)
│   │   │       │   └── [page.tsx](./src/app/(templates)/travel/packing/page.tsx)
│   │   │       ├── planner/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(templates)/travel/planner/__tests__/page.test.tsx)
│   │   │       │   └── [page.tsx](./src/app/(templates)/travel/planner/page.tsx)
│   │   │       ├── property/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(templates)/travel/property/__tests__/page.test.tsx)
│   │   │       │   └── [page.tsx](./src/app/(templates)/travel/property/page.tsx)
│   │   │       ├── property-search/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(templates)/travel/property-search/__tests__/page.test.tsx)
│   │   │       │   └── [page.tsx](./src/app/(templates)/travel/property-search/page.tsx)
│   │   │       ├── saved/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(templates)/travel/saved/__tests__/page.test.tsx)
│   │   │       │   └── [page.tsx](./src/app/(templates)/travel/saved/page.tsx)
│   │   │       ├── search/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(templates)/travel/search/__tests__/page.test.tsx)
│   │   │       │   └── [page.tsx](./src/app/(templates)/travel/search/page.tsx)
│   │   │       └── stories/
│   │   │           ├── __tests__/
│   │   │           │   └── [page.test.tsx](./src/app/(templates)/travel/stories/__tests__/page.test.tsx)
│   │   │           └── [page.tsx](./src/app/(templates)/travel/stories/page.tsx)
│   │   ├── __tests__/
│   │   │   └── [app.test.tsx](./src/app/__tests__/app.test.tsx)
│   │   ├── [default.tsx](./src/app/default.tsx)
│   │   ├── [error.tsx](./src/app/error.tsx)
│   │   ├── [favicon.ico](./src/app/favicon.ico)
│   │   ├── [forbidden.tsx](./src/app/forbidden.tsx)
│   │   ├── [global-error.tsx](./src/app/global-error.tsx)
│   │   ├── [layout.tsx](./src/app/layout.tsx)
│   │   ├── [loading.tsx](./src/app/loading.tsx)
│   │   ├── [not-found.tsx](./src/app/not-found.tsx)
│   │   ├── [robots.ts](./src/app/robots.ts)
│   │   ├── [template.tsx](./src/app/template.tsx)
│   │   └── [unauthorized.tsx](./src/app/unauthorized.tsx)
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── app/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Clock.test.tsx](./src/components/atoms/app/__tests__/Clock.test.tsx)
│   │   │   │   │   ├── [CountUp.test.tsx](./src/components/atoms/app/__tests__/CountUp.test.tsx)
│   │   │   │   │   ├── [Countdown.test.tsx](./src/components/atoms/app/__tests__/Countdown.test.tsx)
│   │   │   │   │   ├── [GlowCard.test.tsx](./src/components/atoms/app/__tests__/GlowCard.test.tsx)
│   │   │   │   │   ├── [GradientText.test.tsx](./src/components/atoms/app/__tests__/GradientText.test.tsx)
│   │   │   │   │   ├── [Magnetic.test.tsx](./src/components/atoms/app/__tests__/Magnetic.test.tsx)
│   │   │   │   │   ├── [Progress.test.tsx](./src/components/atoms/app/__tests__/Progress.test.tsx)
│   │   │   │   │   ├── [ProgressRing.test.tsx](./src/components/atoms/app/__tests__/ProgressRing.test.tsx)
│   │   │   │   │   ├── [Rating.test.tsx](./src/components/atoms/app/__tests__/Rating.test.tsx)
│   │   │   │   │   ├── [ScrollProgress.test.tsx](./src/components/atoms/app/__tests__/ScrollProgress.test.tsx)
│   │   │   │   │   ├── [Shimmer.test.tsx](./src/components/atoms/app/__tests__/Shimmer.test.tsx)
│   │   │   │   │   ├── [Spotlight.test.tsx](./src/components/atoms/app/__tests__/Spotlight.test.tsx)
│   │   │   │   │   ├── [StarBorder.test.tsx](./src/components/atoms/app/__tests__/StarBorder.test.tsx)
│   │   │   │   │   ├── [StatusDot.test.tsx](./src/components/atoms/app/__tests__/StatusDot.test.tsx)
│   │   │   │   │   ├── [Swap.test.tsx](./src/components/atoms/app/__tests__/Swap.test.tsx)
│   │   │   │   │   └── [ThemeController.test.tsx](./src/components/atoms/app/__tests__/ThemeController.test.tsx)
│   │   │   │   ├── [Clock.tsx](./src/components/atoms/app/Clock.tsx)
│   │   │   │   ├── [CountUp.tsx](./src/components/atoms/app/CountUp.tsx)
│   │   │   │   ├── [Countdown.tsx](./src/components/atoms/app/Countdown.tsx)
│   │   │   │   ├── [GlowCard.tsx](./src/components/atoms/app/GlowCard.tsx)
│   │   │   │   ├── [GradientText.tsx](./src/components/atoms/app/GradientText.tsx)
│   │   │   │   ├── [Magnetic.tsx](./src/components/atoms/app/Magnetic.tsx)
│   │   │   │   ├── [Progress.tsx](./src/components/atoms/app/Progress.tsx)
│   │   │   │   ├── [ProgressRing.tsx](./src/components/atoms/app/ProgressRing.tsx)
│   │   │   │   ├── [Rating.tsx](./src/components/atoms/app/Rating.tsx)
│   │   │   │   ├── [ScrollProgress.tsx](./src/components/atoms/app/ScrollProgress.tsx)
│   │   │   │   ├── [Shimmer.tsx](./src/components/atoms/app/Shimmer.tsx)
│   │   │   │   ├── [Spotlight.tsx](./src/components/atoms/app/Spotlight.tsx)
│   │   │   │   ├── [StarBorder.tsx](./src/components/atoms/app/StarBorder.tsx)
│   │   │   │   ├── [StatusDot.tsx](./src/components/atoms/app/StatusDot.tsx)
│   │   │   │   ├── [Swap.tsx](./src/components/atoms/app/Swap.tsx)
│   │   │   │   ├── [ThemeController.tsx](./src/components/atoms/app/ThemeController.tsx)
│   │   │   │   └── [index.ts](./src/components/atoms/app/index.ts)
│   │   │   ├── auth/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Checkbox.test.tsx](./src/components/atoms/auth/__tests__/Checkbox.test.tsx)
│   │   │   │   │   ├── [CopyButton.test.tsx](./src/components/atoms/auth/__tests__/CopyButton.test.tsx)
│   │   │   │   │   ├── [FileInput.test.tsx](./src/components/atoms/auth/__tests__/FileInput.test.tsx)
│   │   │   │   │   ├── [Kbd.test.tsx](./src/components/atoms/auth/__tests__/Kbd.test.tsx)
│   │   │   │   │   ├── [Label.test.tsx](./src/components/atoms/auth/__tests__/Label.test.tsx)
│   │   │   │   │   ├── [NumberField.test.tsx](./src/components/atoms/auth/__tests__/NumberField.test.tsx)
│   │   │   │   │   ├── [OTPInput.test.tsx](./src/components/atoms/auth/__tests__/OTPInput.test.tsx)
│   │   │   │   │   ├── [PasswordField.test.tsx](./src/components/atoms/auth/__tests__/PasswordField.test.tsx)
│   │   │   │   │   ├── [Radio.test.tsx](./src/components/atoms/auth/__tests__/Radio.test.tsx)
│   │   │   │   │   ├── [Select.test.tsx](./src/components/atoms/auth/__tests__/Select.test.tsx)
│   │   │   │   │   ├── [Slider.test.tsx](./src/components/atoms/auth/__tests__/Slider.test.tsx)
│   │   │   │   │   ├── [Switch.test.tsx](./src/components/atoms/auth/__tests__/Switch.test.tsx)
│   │   │   │   │   ├── [TextField.test.tsx](./src/components/atoms/auth/__tests__/TextField.test.tsx)
│   │   │   │   │   ├── [Textarea.test.tsx](./src/components/atoms/auth/__tests__/Textarea.test.tsx)
│   │   │   │   │   ├── [Validator.test.tsx](./src/components/atoms/auth/__tests__/Validator.test.tsx)
│   │   │   │   │   └── [VisuallyHidden.test.tsx](./src/components/atoms/auth/__tests__/VisuallyHidden.test.tsx)
│   │   │   │   ├── [Checkbox.tsx](./src/components/atoms/auth/Checkbox.tsx)
│   │   │   │   ├── [CopyButton.tsx](./src/components/atoms/auth/CopyButton.tsx)
│   │   │   │   ├── [FileInput.tsx](./src/components/atoms/auth/FileInput.tsx)
│   │   │   │   ├── [Kbd.tsx](./src/components/atoms/auth/Kbd.tsx)
│   │   │   │   ├── [Label.tsx](./src/components/atoms/auth/Label.tsx)
│   │   │   │   ├── [NumberField.tsx](./src/components/atoms/auth/NumberField.tsx)
│   │   │   │   ├── [OTPInput.tsx](./src/components/atoms/auth/OTPInput.tsx)
│   │   │   │   ├── [PasswordField.tsx](./src/components/atoms/auth/PasswordField.tsx)
│   │   │   │   ├── [Radio.tsx](./src/components/atoms/auth/Radio.tsx)
│   │   │   │   ├── [Select.tsx](./src/components/atoms/auth/Select.tsx)
│   │   │   │   ├── [Slider.tsx](./src/components/atoms/auth/Slider.tsx)
│   │   │   │   ├── [Switch.tsx](./src/components/atoms/auth/Switch.tsx)
│   │   │   │   ├── [TextField.tsx](./src/components/atoms/auth/TextField.tsx)
│   │   │   │   ├── [Textarea.tsx](./src/components/atoms/auth/Textarea.tsx)
│   │   │   │   ├── [Validator.tsx](./src/components/atoms/auth/Validator.tsx)
│   │   │   │   ├── [VisuallyHidden.tsx](./src/components/atoms/auth/VisuallyHidden.tsx)
│   │   │   │   └── [index.ts](./src/components/atoms/auth/index.ts)
│   │   │   ├── blog/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [ArticleBadge.test.tsx](./src/components/atoms/blog/__tests__/ArticleBadge.test.tsx)
│   │   │   │   │   ├── [AuthorAvatar.test.tsx](./src/components/atoms/blog/__tests__/AuthorAvatar.test.tsx)
│   │   │   │   │   ├── [CategoryTag.test.tsx](./src/components/atoms/blog/__tests__/CategoryTag.test.tsx)
│   │   │   │   │   ├── [DateStamp.test.tsx](./src/components/atoms/blog/__tests__/DateStamp.test.tsx)
│   │   │   │   │   ├── [ExcerptText.test.tsx](./src/components/atoms/blog/__tests__/ExcerptText.test.tsx)
│   │   │   │   │   ├── [HashtagLabel.test.tsx](./src/components/atoms/blog/__tests__/HashtagLabel.test.tsx)
│   │   │   │   │   ├── [HeadingText.test.tsx](./src/components/atoms/blog/__tests__/HeadingText.test.tsx)
│   │   │   │   │   ├── [KeywordTag.test.tsx](./src/components/atoms/blog/__tests__/KeywordTag.test.tsx)
│   │   │   │   │   ├── [MetaLabel.test.tsx](./src/components/atoms/blog/__tests__/MetaLabel.test.tsx)
│   │   │   │   │   ├── [ReadingTime.test.tsx](./src/components/atoms/blog/__tests__/ReadingTime.test.tsx)
│   │   │   │   │   ├── [Tag.test.tsx](./src/components/atoms/blog/__tests__/Tag.test.tsx)
│   │   │   │   │   ├── [TagCloud.test.tsx](./src/components/atoms/blog/__tests__/TagCloud.test.tsx)
│   │   │   │   │   ├── [Text.test.tsx](./src/components/atoms/blog/__tests__/Text.test.tsx)
│   │   │   │   │   ├── [TextRotate.test.tsx](./src/components/atoms/blog/__tests__/TextRotate.test.tsx)
│   │   │   │   │   ├── [TitleText.test.tsx](./src/components/atoms/blog/__tests__/TitleText.test.tsx)
│   │   │   │   │   └── [WordCount.test.tsx](./src/components/atoms/blog/__tests__/WordCount.test.tsx)
│   │   │   │   ├── [ArticleBadge.tsx](./src/components/atoms/blog/ArticleBadge.tsx)
│   │   │   │   ├── [AuthorAvatar.tsx](./src/components/atoms/blog/AuthorAvatar.tsx)
│   │   │   │   ├── [CategoryTag.tsx](./src/components/atoms/blog/CategoryTag.tsx)
│   │   │   │   ├── [DateStamp.tsx](./src/components/atoms/blog/DateStamp.tsx)
│   │   │   │   ├── [ExcerptText.tsx](./src/components/atoms/blog/ExcerptText.tsx)
│   │   │   │   ├── [HashtagLabel.tsx](./src/components/atoms/blog/HashtagLabel.tsx)
│   │   │   │   ├── [HeadingText.tsx](./src/components/atoms/blog/HeadingText.tsx)
│   │   │   │   ├── [KeywordTag.tsx](./src/components/atoms/blog/KeywordTag.tsx)
│   │   │   │   ├── [MetaLabel.tsx](./src/components/atoms/blog/MetaLabel.tsx)
│   │   │   │   ├── [ReadingTime.tsx](./src/components/atoms/blog/ReadingTime.tsx)
│   │   │   │   ├── [Tag.tsx](./src/components/atoms/blog/Tag.tsx)
│   │   │   │   ├── [TagCloud.tsx](./src/components/atoms/blog/TagCloud.tsx)
│   │   │   │   ├── [Text.tsx](./src/components/atoms/blog/Text.tsx)
│   │   │   │   ├── [TextRotate.tsx](./src/components/atoms/blog/TextRotate.tsx)
│   │   │   │   ├── [TitleText.tsx](./src/components/atoms/blog/TitleText.tsx)
│   │   │   │   ├── [WordCount.tsx](./src/components/atoms/blog/WordCount.tsx)
│   │   │   │   └── [index.ts](./src/components/atoms/blog/index.ts)
│   │   │   ├── crm/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AccountIcon.test.tsx](./src/components/atoms/crm/__tests__/AccountIcon.test.tsx)
│   │   │   │   │   ├── [BentoGrid.test.tsx](./src/components/atoms/crm/__tests__/BentoGrid.test.tsx)
│   │   │   │   │   ├── [CompanyIcon.test.tsx](./src/components/atoms/crm/__tests__/CompanyIcon.test.tsx)
│   │   │   │   │   ├── [ContactAvatar.test.tsx](./src/components/atoms/crm/__tests__/ContactAvatar.test.tsx)
│   │   │   │   │   ├── [ContactInitials.test.tsx](./src/components/atoms/crm/__tests__/ContactInitials.test.tsx)
│   │   │   │   │   ├── [DealPriority.test.tsx](./src/components/atoms/crm/__tests__/DealPriority.test.tsx)
│   │   │   │   │   ├── [Indicator.test.tsx](./src/components/atoms/crm/__tests__/Indicator.test.tsx)
│   │   │   │   │   ├── [LeadStatus.test.tsx](./src/components/atoms/crm/__tests__/LeadStatus.test.tsx)
│   │   │   │   │   ├── [PhoneIcon.test.tsx](./src/components/atoms/crm/__tests__/PhoneIcon.test.tsx)
│   │   │   │   │   ├── [PipelineStage.test.tsx](./src/components/atoms/crm/__tests__/PipelineStage.test.tsx)
│   │   │   │   │   ├── [RevenueBadge.test.tsx](./src/components/atoms/crm/__tests__/RevenueBadge.test.tsx)
│   │   │   │   │   ├── [SalesTrend.test.tsx](./src/components/atoms/crm/__tests__/SalesTrend.test.tsx)
│   │   │   │   │   ├── [StageCount.test.tsx](./src/components/atoms/crm/__tests__/StageCount.test.tsx)
│   │   │   │   │   ├── [TeamAvatar.test.tsx](./src/components/atoms/crm/__tests__/TeamAvatar.test.tsx)
│   │   │   │   │   ├── [ValueAmount.test.tsx](./src/components/atoms/crm/__tests__/ValueAmount.test.tsx)
│   │   │   │   │   └── [WinRate.test.tsx](./src/components/atoms/crm/__tests__/WinRate.test.tsx)
│   │   │   │   ├── [AccountIcon.tsx](./src/components/atoms/crm/AccountIcon.tsx)
│   │   │   │   ├── [BentoGrid.tsx](./src/components/atoms/crm/BentoGrid.tsx)
│   │   │   │   ├── [CompanyIcon.tsx](./src/components/atoms/crm/CompanyIcon.tsx)
│   │   │   │   ├── [ContactAvatar.tsx](./src/components/atoms/crm/ContactAvatar.tsx)
│   │   │   │   ├── [ContactInitials.tsx](./src/components/atoms/crm/ContactInitials.tsx)
│   │   │   │   ├── [DealPriority.tsx](./src/components/atoms/crm/DealPriority.tsx)
│   │   │   │   ├── [Indicator.tsx](./src/components/atoms/crm/Indicator.tsx)
│   │   │   │   ├── [LeadStatus.tsx](./src/components/atoms/crm/LeadStatus.tsx)
│   │   │   │   ├── [PhoneIcon.tsx](./src/components/atoms/crm/PhoneIcon.tsx)
│   │   │   │   ├── [PipelineStage.tsx](./src/components/atoms/crm/PipelineStage.tsx)
│   │   │   │   ├── [RevenueBadge.tsx](./src/components/atoms/crm/RevenueBadge.tsx)
│   │   │   │   ├── [SalesTrend.tsx](./src/components/atoms/crm/SalesTrend.tsx)
│   │   │   │   ├── [StageCount.tsx](./src/components/atoms/crm/StageCount.tsx)
│   │   │   │   ├── [TeamAvatar.tsx](./src/components/atoms/crm/TeamAvatar.tsx)
│   │   │   │   ├── [ValueAmount.tsx](./src/components/atoms/crm/ValueAmount.tsx)
│   │   │   │   ├── [WinRate.tsx](./src/components/atoms/crm/WinRate.tsx)
│   │   │   │   └── [index.ts](./src/components/atoms/crm/index.ts)
│   │   │   ├── developer/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Artboard.test.tsx](./src/components/atoms/developer/__tests__/Artboard.test.tsx)
│   │   │   │   │   ├── [AspectRatio.test.tsx](./src/components/atoms/developer/__tests__/AspectRatio.test.tsx)
│   │   │   │   │   ├── [Avatar.test.tsx](./src/components/atoms/developer/__tests__/Avatar.test.tsx)
│   │   │   │   │   ├── [BrowserMockup.test.tsx](./src/components/atoms/developer/__tests__/BrowserMockup.test.tsx)
│   │   │   │   │   ├── [CodeBlock.test.tsx](./src/components/atoms/developer/__tests__/CodeBlock.test.tsx)
│   │   │   │   │   ├── [Cube.test.tsx](./src/components/atoms/developer/__tests__/Cube.test.tsx)
│   │   │   │   │   ├── [Dock.test.tsx](./src/components/atoms/developer/__tests__/Dock.test.tsx)
│   │   │   │   │   ├── [Hover3D.test.tsx](./src/components/atoms/developer/__tests__/Hover3D.test.tsx)
│   │   │   │   │   ├── [HoverGallery.test.tsx](./src/components/atoms/developer/__tests__/HoverGallery.test.tsx)
│   │   │   │   │   ├── [Icon.test.tsx](./src/components/atoms/developer/__tests__/Icon.test.tsx)
│   │   │   │   │   ├── [ImageComparison.test.tsx](./src/components/atoms/developer/__tests__/ImageComparison.test.tsx)
│   │   │   │   │   ├── [LetterAvatar.test.tsx](./src/components/atoms/developer/__tests__/LetterAvatar.test.tsx)
│   │   │   │   │   ├── [Mask.test.tsx](./src/components/atoms/developer/__tests__/Mask.test.tsx)
│   │   │   │   │   ├── [MiniMap.test.tsx](./src/components/atoms/developer/__tests__/MiniMap.test.tsx)
│   │   │   │   │   ├── [PhoneMockup.test.tsx](./src/components/atoms/developer/__tests__/PhoneMockup.test.tsx)
│   │   │   │   │   └── [WindowMockup.test.tsx](./src/components/atoms/developer/__tests__/WindowMockup.test.tsx)
│   │   │   │   ├── [Artboard.tsx](./src/components/atoms/developer/Artboard.tsx)
│   │   │   │   ├── [AspectRatio.tsx](./src/components/atoms/developer/AspectRatio.tsx)
│   │   │   │   ├── [Avatar.tsx](./src/components/atoms/developer/Avatar.tsx)
│   │   │   │   ├── [BrowserMockup.tsx](./src/components/atoms/developer/BrowserMockup.tsx)
│   │   │   │   ├── [CodeBlock.tsx](./src/components/atoms/developer/CodeBlock.tsx)
│   │   │   │   ├── [Cube.tsx](./src/components/atoms/developer/Cube.tsx)
│   │   │   │   ├── [Dock.tsx](./src/components/atoms/developer/Dock.tsx)
│   │   │   │   ├── [Hover3D.tsx](./src/components/atoms/developer/Hover3D.tsx)
│   │   │   │   ├── [HoverGallery.tsx](./src/components/atoms/developer/HoverGallery.tsx)
│   │   │   │   ├── [Icon.tsx](./src/components/atoms/developer/Icon.tsx)
│   │   │   │   ├── [ImageComparison.tsx](./src/components/atoms/developer/ImageComparison.tsx)
│   │   │   │   ├── [LetterAvatar.tsx](./src/components/atoms/developer/LetterAvatar.tsx)
│   │   │   │   ├── [Mask.tsx](./src/components/atoms/developer/Mask.tsx)
│   │   │   │   ├── [MiniMap.tsx](./src/components/atoms/developer/MiniMap.tsx)
│   │   │   │   ├── [PhoneMockup.tsx](./src/components/atoms/developer/PhoneMockup.tsx)
│   │   │   │   ├── [WindowMockup.tsx](./src/components/atoms/developer/WindowMockup.tsx)
│   │   │   │   └── [index.ts](./src/components/atoms/developer/index.ts)
│   │   │   ├── finance/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AccountBalance.test.tsx](./src/components/atoms/finance/__tests__/AccountBalance.test.tsx)
│   │   │   │   │   ├── [AmountText.test.tsx](./src/components/atoms/finance/__tests__/AmountText.test.tsx)
│   │   │   │   │   ├── [BalanceLabel.test.tsx](./src/components/atoms/finance/__tests__/BalanceLabel.test.tsx)
│   │   │   │   │   ├── [BudgetBar.test.tsx](./src/components/atoms/finance/__tests__/BudgetBar.test.tsx)
│   │   │   │   │   ├── [CashFlow.test.tsx](./src/components/atoms/finance/__tests__/CashFlow.test.tsx)
│   │   │   │   │   ├── [CurrencyTag.test.tsx](./src/components/atoms/finance/__tests__/CurrencyTag.test.tsx)
│   │   │   │   │   ├── [ExpenseIcon.test.tsx](./src/components/atoms/finance/__tests__/ExpenseIcon.test.tsx)
│   │   │   │   │   ├── [IncomeIcon.test.tsx](./src/components/atoms/finance/__tests__/IncomeIcon.test.tsx)
│   │   │   │   │   ├── [InterestRate.test.tsx](./src/components/atoms/finance/__tests__/InterestRate.test.tsx)
│   │   │   │   │   ├── [LimitBadge.test.tsx](./src/components/atoms/finance/__tests__/LimitBadge.test.tsx)
│   │   │   │   │   ├── [MonthlyStat.test.tsx](./src/components/atoms/finance/__tests__/MonthlyStat.test.tsx)
│   │   │   │   │   ├── [PaymentStatus.test.tsx](./src/components/atoms/finance/__tests__/PaymentStatus.test.tsx)
│   │   │   │   │   ├── [PortfolioValue.test.tsx](./src/components/atoms/finance/__tests__/PortfolioValue.test.tsx)
│   │   │   │   │   ├── [SavingGoal.test.tsx](./src/components/atoms/finance/__tests__/SavingGoal.test.tsx)
│   │   │   │   │   ├── [TransactionType.test.tsx](./src/components/atoms/finance/__tests__/TransactionType.test.tsx)
│   │   │   │   │   └── [TrendArrow.test.tsx](./src/components/atoms/finance/__tests__/TrendArrow.test.tsx)
│   │   │   │   ├── [AccountBalance.tsx](./src/components/atoms/finance/AccountBalance.tsx)
│   │   │   │   ├── [AmountText.tsx](./src/components/atoms/finance/AmountText.tsx)
│   │   │   │   ├── [BalanceLabel.tsx](./src/components/atoms/finance/BalanceLabel.tsx)
│   │   │   │   ├── [BudgetBar.tsx](./src/components/atoms/finance/BudgetBar.tsx)
│   │   │   │   ├── [CashFlow.tsx](./src/components/atoms/finance/CashFlow.tsx)
│   │   │   │   ├── [CurrencyTag.tsx](./src/components/atoms/finance/CurrencyTag.tsx)
│   │   │   │   ├── [ExpenseIcon.tsx](./src/components/atoms/finance/ExpenseIcon.tsx)
│   │   │   │   ├── [IncomeIcon.tsx](./src/components/atoms/finance/IncomeIcon.tsx)
│   │   │   │   ├── [InterestRate.tsx](./src/components/atoms/finance/InterestRate.tsx)
│   │   │   │   ├── [LimitBadge.tsx](./src/components/atoms/finance/LimitBadge.tsx)
│   │   │   │   ├── [MonthlyStat.tsx](./src/components/atoms/finance/MonthlyStat.tsx)
│   │   │   │   ├── [PaymentStatus.tsx](./src/components/atoms/finance/PaymentStatus.tsx)
│   │   │   │   ├── [PortfolioValue.tsx](./src/components/atoms/finance/PortfolioValue.tsx)
│   │   │   │   ├── [SavingGoal.tsx](./src/components/atoms/finance/SavingGoal.tsx)
│   │   │   │   ├── [TransactionType.tsx](./src/components/atoms/finance/TransactionType.tsx)
│   │   │   │   ├── [TrendArrow.tsx](./src/components/atoms/finance/TrendArrow.tsx)
│   │   │   │   └── [index.ts](./src/components/atoms/finance/index.ts)
│   │   │   ├── health/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [ActiveMinutes.test.tsx](./src/components/atoms/health/__tests__/ActiveMinutes.test.tsx)
│   │   │   │   │   ├── [Badge.test.tsx](./src/components/atoms/health/__tests__/Badge.test.tsx)
│   │   │   │   │   ├── [BloodPressure.test.tsx](./src/components/atoms/health/__tests__/BloodPressure.test.tsx)
│   │   │   │   │   ├── [CalorieCount.test.tsx](./src/components/atoms/health/__tests__/CalorieCount.test.tsx)
│   │   │   │   │   ├── [DistanceValue.test.tsx](./src/components/atoms/health/__tests__/DistanceValue.test.tsx)
│   │   │   │   │   ├── [HeartRate.test.tsx](./src/components/atoms/health/__tests__/HeartRate.test.tsx)
│   │   │   │   │   ├── [HeightLabel.test.tsx](./src/components/atoms/health/__tests__/HeightLabel.test.tsx)
│   │   │   │   │   ├── [HydrationLevel.test.tsx](./src/components/atoms/health/__tests__/HydrationLevel.test.tsx)
│   │   │   │   │   ├── [MetricLabel.test.tsx](./src/components/atoms/health/__tests__/MetricLabel.test.tsx)
│   │   │   │   │   ├── [RestingRate.test.tsx](./src/components/atoms/health/__tests__/RestingRate.test.tsx)
│   │   │   │   │   ├── [SleepHours.test.tsx](./src/components/atoms/health/__tests__/SleepHours.test.tsx)
│   │   │   │   │   ├── [StepsCount.test.tsx](./src/components/atoms/health/__tests__/StepsCount.test.tsx)
│   │   │   │   │   ├── [TempValue.test.tsx](./src/components/atoms/health/__tests__/TempValue.test.tsx)
│   │   │   │   │   ├── [WaterIntake.test.tsx](./src/components/atoms/health/__tests__/WaterIntake.test.tsx)
│   │   │   │   │   ├── [WeightValue.test.tsx](./src/components/atoms/health/__tests__/WeightValue.test.tsx)
│   │   │   │   │   └── [WorkoutSets.test.tsx](./src/components/atoms/health/__tests__/WorkoutSets.test.tsx)
│   │   │   │   ├── [ActiveMinutes.tsx](./src/components/atoms/health/ActiveMinutes.tsx)
│   │   │   │   ├── [Badge.tsx](./src/components/atoms/health/Badge.tsx)
│   │   │   │   ├── [BloodPressure.tsx](./src/components/atoms/health/BloodPressure.tsx)
│   │   │   │   ├── [CalorieCount.tsx](./src/components/atoms/health/CalorieCount.tsx)
│   │   │   │   ├── [DistanceValue.tsx](./src/components/atoms/health/DistanceValue.tsx)
│   │   │   │   ├── [HeartRate.tsx](./src/components/atoms/health/HeartRate.tsx)
│   │   │   │   ├── [HeightLabel.tsx](./src/components/atoms/health/HeightLabel.tsx)
│   │   │   │   ├── [HydrationLevel.tsx](./src/components/atoms/health/HydrationLevel.tsx)
│   │   │   │   ├── [MetricLabel.tsx](./src/components/atoms/health/MetricLabel.tsx)
│   │   │   │   ├── [RestingRate.tsx](./src/components/atoms/health/RestingRate.tsx)
│   │   │   │   ├── [SleepHours.tsx](./src/components/atoms/health/SleepHours.tsx)
│   │   │   │   ├── [StepsCount.tsx](./src/components/atoms/health/StepsCount.tsx)
│   │   │   │   ├── [TempValue.tsx](./src/components/atoms/health/TempValue.tsx)
│   │   │   │   ├── [WaterIntake.tsx](./src/components/atoms/health/WaterIntake.tsx)
│   │   │   │   ├── [WeightValue.tsx](./src/components/atoms/health/WeightValue.tsx)
│   │   │   │   ├── [WorkoutSets.tsx](./src/components/atoms/health/WorkoutSets.tsx)
│   │   │   │   └── [index.ts](./src/components/atoms/health/index.ts)
│   │   │   ├── hr/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AttendanceDot.test.tsx](./src/components/atoms/hr/__tests__/AttendanceDot.test.tsx)
│   │   │   │   │   ├── [AwardBadge.test.tsx](./src/components/atoms/hr/__tests__/AwardBadge.test.tsx)
│   │   │   │   │   ├── [DepartmentTag.test.tsx](./src/components/atoms/hr/__tests__/DepartmentTag.test.tsx)
│   │   │   │   │   ├── [EmployeeAvatar.test.tsx](./src/components/atoms/hr/__tests__/EmployeeAvatar.test.tsx)
│   │   │   │   │   ├── [HireDate.test.tsx](./src/components/atoms/hr/__tests__/HireDate.test.tsx)
│   │   │   │   │   ├── [JobTitle.test.tsx](./src/components/atoms/hr/__tests__/JobTitle.test.tsx)
│   │   │   │   │   ├── [LeaveStatus.test.tsx](./src/components/atoms/hr/__tests__/LeaveStatus.test.tsx)
│   │   │   │   │   ├── [ManagerName.test.tsx](./src/components/atoms/hr/__tests__/ManagerName.test.tsx)
│   │   │   │   │   ├── [OvertimeValue.test.tsx](./src/components/atoms/hr/__tests__/OvertimeValue.test.tsx)
│   │   │   │   │   ├── [PayrollAmount.test.tsx](./src/components/atoms/hr/__tests__/PayrollAmount.test.tsx)
│   │   │   │   │   ├── [RoleTag.test.tsx](./src/components/atoms/hr/__tests__/RoleTag.test.tsx)
│   │   │   │   │   ├── [SkillLevel.test.tsx](./src/components/atoms/hr/__tests__/SkillLevel.test.tsx)
│   │   │   │   │   ├── [TeamSize.test.tsx](./src/components/atoms/hr/__tests__/TeamSize.test.tsx)
│   │   │   │   │   ├── [TenureLabel.test.tsx](./src/components/atoms/hr/__tests__/TenureLabel.test.tsx)
│   │   │   │   │   ├── [TitleBadge.test.tsx](./src/components/atoms/hr/__tests__/TitleBadge.test.tsx)
│   │   │   │   │   └── [WorkHours.test.tsx](./src/components/atoms/hr/__tests__/WorkHours.test.tsx)
│   │   │   │   ├── [AttendanceDot.tsx](./src/components/atoms/hr/AttendanceDot.tsx)
│   │   │   │   ├── [AwardBadge.tsx](./src/components/atoms/hr/AwardBadge.tsx)
│   │   │   │   ├── [DepartmentTag.tsx](./src/components/atoms/hr/DepartmentTag.tsx)
│   │   │   │   ├── [EmployeeAvatar.tsx](./src/components/atoms/hr/EmployeeAvatar.tsx)
│   │   │   │   ├── [HireDate.tsx](./src/components/atoms/hr/HireDate.tsx)
│   │   │   │   ├── [JobTitle.tsx](./src/components/atoms/hr/JobTitle.tsx)
│   │   │   │   ├── [LeaveStatus.tsx](./src/components/atoms/hr/LeaveStatus.tsx)
│   │   │   │   ├── [ManagerName.tsx](./src/components/atoms/hr/ManagerName.tsx)
│   │   │   │   ├── [OvertimeValue.tsx](./src/components/atoms/hr/OvertimeValue.tsx)
│   │   │   │   ├── [PayrollAmount.tsx](./src/components/atoms/hr/PayrollAmount.tsx)
│   │   │   │   ├── [RoleTag.tsx](./src/components/atoms/hr/RoleTag.tsx)
│   │   │   │   ├── [SkillLevel.tsx](./src/components/atoms/hr/SkillLevel.tsx)
│   │   │   │   ├── [TeamSize.tsx](./src/components/atoms/hr/TeamSize.tsx)
│   │   │   │   ├── [TenureLabel.tsx](./src/components/atoms/hr/TenureLabel.tsx)
│   │   │   │   ├── [TitleBadge.tsx](./src/components/atoms/hr/TitleBadge.tsx)
│   │   │   │   ├── [WorkHours.tsx](./src/components/atoms/hr/WorkHours.tsx)
│   │   │   │   └── [index.ts](./src/components/atoms/hr/index.ts)
│   │   │   ├── landing/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [ActionButton.test.tsx](./src/components/atoms/landing/__tests__/ActionButton.test.tsx)
│   │   │   │   │   ├── [ArrowLink.test.tsx](./src/components/atoms/landing/__tests__/ArrowLink.test.tsx)
│   │   │   │   │   ├── [BulletPoint.test.tsx](./src/components/atoms/landing/__tests__/BulletPoint.test.tsx)
│   │   │   │   │   ├── [CaptionText.test.tsx](./src/components/atoms/landing/__tests__/CaptionText.test.tsx)
│   │   │   │   │   ├── [CtaButton.test.tsx](./src/components/atoms/landing/__tests__/CtaButton.test.tsx)
│   │   │   │   │   ├── [EmptyPlaceholder.test.tsx](./src/components/atoms/landing/__tests__/EmptyPlaceholder.test.tsx)
│   │   │   │   │   ├── [FeatureIcon.test.tsx](./src/components/atoms/landing/__tests__/FeatureIcon.test.tsx)
│   │   │   │   │   ├── [HeroBadge.test.tsx](./src/components/atoms/landing/__tests__/HeroBadge.test.tsx)
│   │   │   │   │   ├── [LogoMark.test.tsx](./src/components/atoms/landing/__tests__/LogoMark.test.tsx)
│   │   │   │   │   ├── [NavLink.test.tsx](./src/components/atoms/landing/__tests__/NavLink.test.tsx)
│   │   │   │   │   ├── [PricingTag.test.tsx](./src/components/atoms/landing/__tests__/PricingTag.test.tsx)
│   │   │   │   │   ├── [SectionLabel.test.tsx](./src/components/atoms/landing/__tests__/SectionLabel.test.tsx)
│   │   │   │   │   ├── [StatNumber.test.tsx](./src/components/atoms/landing/__tests__/StatNumber.test.tsx)
│   │   │   │   │   ├── [StepNumber.test.tsx](./src/components/atoms/landing/__tests__/StepNumber.test.tsx)
│   │   │   │   │   ├── [TestimonialMark.test.tsx](./src/components/atoms/landing/__tests__/TestimonialMark.test.tsx)
│   │   │   │   │   └── [TrustBadge.test.tsx](./src/components/atoms/landing/__tests__/TrustBadge.test.tsx)
│   │   │   │   ├── [ActionButton.tsx](./src/components/atoms/landing/ActionButton.tsx)
│   │   │   │   ├── [ArrowLink.tsx](./src/components/atoms/landing/ArrowLink.tsx)
│   │   │   │   ├── [BulletPoint.tsx](./src/components/atoms/landing/BulletPoint.tsx)
│   │   │   │   ├── [CaptionText.tsx](./src/components/atoms/landing/CaptionText.tsx)
│   │   │   │   ├── [CtaButton.tsx](./src/components/atoms/landing/CtaButton.tsx)
│   │   │   │   ├── [EmptyPlaceholder.tsx](./src/components/atoms/landing/EmptyPlaceholder.tsx)
│   │   │   │   ├── [FeatureIcon.tsx](./src/components/atoms/landing/FeatureIcon.tsx)
│   │   │   │   ├── [HeroBadge.tsx](./src/components/atoms/landing/HeroBadge.tsx)
│   │   │   │   ├── [LogoMark.tsx](./src/components/atoms/landing/LogoMark.tsx)
│   │   │   │   ├── [NavLink.tsx](./src/components/atoms/landing/NavLink.tsx)
│   │   │   │   ├── [PricingTag.tsx](./src/components/atoms/landing/PricingTag.tsx)
│   │   │   │   ├── [SectionLabel.tsx](./src/components/atoms/landing/SectionLabel.tsx)
│   │   │   │   ├── [StatNumber.tsx](./src/components/atoms/landing/StatNumber.tsx)
│   │   │   │   ├── [StepNumber.tsx](./src/components/atoms/landing/StepNumber.tsx)
│   │   │   │   ├── [TestimonialMark.tsx](./src/components/atoms/landing/TestimonialMark.tsx)
│   │   │   │   ├── [TrustBadge.tsx](./src/components/atoms/landing/TrustBadge.tsx)
│   │   │   │   └── [index.ts](./src/components/atoms/landing/index.ts)
│   │   │   ├── mail/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AttachmentIcon.test.tsx](./src/components/atoms/mail/__tests__/AttachmentIcon.test.tsx)
│   │   │   │   │   ├── [ComposeIcon.test.tsx](./src/components/atoms/mail/__tests__/ComposeIcon.test.tsx)
│   │   │   │   │   ├── [EditableText.test.tsx](./src/components/atoms/mail/__tests__/EditableText.test.tsx)
│   │   │   │   │   ├── [EmailCount.test.tsx](./src/components/atoms/mail/__tests__/EmailCount.test.tsx)
│   │   │   │   │   ├── [FolderIcon.test.tsx](./src/components/atoms/mail/__tests__/FolderIcon.test.tsx)
│   │   │   │   │   ├── [InboxBadge.test.tsx](./src/components/atoms/mail/__tests__/InboxBadge.test.tsx)
│   │   │   │   │   ├── [MailAvatar.test.tsx](./src/components/atoms/mail/__tests__/MailAvatar.test.tsx)
│   │   │   │   │   ├── [PriorityFlag.test.tsx](./src/components/atoms/mail/__tests__/PriorityFlag.test.tsx)
│   │   │   │   │   ├── [ReadStatus.test.tsx](./src/components/atoms/mail/__tests__/ReadStatus.test.tsx)
│   │   │   │   │   ├── [ReplyIcon.test.tsx](./src/components/atoms/mail/__tests__/ReplyIcon.test.tsx)
│   │   │   │   │   ├── [SenderInitials.test.tsx](./src/components/atoms/mail/__tests__/SenderInitials.test.tsx)
│   │   │   │   │   ├── [SentIcon.test.tsx](./src/components/atoms/mail/__tests__/SentIcon.test.tsx)
│   │   │   │   │   ├── [SpamIcon.test.tsx](./src/components/atoms/mail/__tests__/SpamIcon.test.tsx)
│   │   │   │   │   ├── [StarMail.test.tsx](./src/components/atoms/mail/__tests__/StarMail.test.tsx)
│   │   │   │   │   ├── [SubjectLabel.test.tsx](./src/components/atoms/mail/__tests__/SubjectLabel.test.tsx)
│   │   │   │   │   └── [TrashIcon.test.tsx](./src/components/atoms/mail/__tests__/TrashIcon.test.tsx)
│   │   │   │   ├── [AttachmentIcon.tsx](./src/components/atoms/mail/AttachmentIcon.tsx)
│   │   │   │   ├── [ComposeIcon.tsx](./src/components/atoms/mail/ComposeIcon.tsx)
│   │   │   │   ├── [EditableText.tsx](./src/components/atoms/mail/EditableText.tsx)
│   │   │   │   ├── [EmailCount.tsx](./src/components/atoms/mail/EmailCount.tsx)
│   │   │   │   ├── [FolderIcon.tsx](./src/components/atoms/mail/FolderIcon.tsx)
│   │   │   │   ├── [InboxBadge.tsx](./src/components/atoms/mail/InboxBadge.tsx)
│   │   │   │   ├── [MailAvatar.tsx](./src/components/atoms/mail/MailAvatar.tsx)
│   │   │   │   ├── [PriorityFlag.tsx](./src/components/atoms/mail/PriorityFlag.tsx)
│   │   │   │   ├── [ReadStatus.tsx](./src/components/atoms/mail/ReadStatus.tsx)
│   │   │   │   ├── [ReplyIcon.tsx](./src/components/atoms/mail/ReplyIcon.tsx)
│   │   │   │   ├── [SenderInitials.tsx](./src/components/atoms/mail/SenderInitials.tsx)
│   │   │   │   ├── [SentIcon.tsx](./src/components/atoms/mail/SentIcon.tsx)
│   │   │   │   ├── [SpamIcon.tsx](./src/components/atoms/mail/SpamIcon.tsx)
│   │   │   │   ├── [StarMail.tsx](./src/components/atoms/mail/StarMail.tsx)
│   │   │   │   ├── [SubjectLabel.tsx](./src/components/atoms/mail/SubjectLabel.tsx)
│   │   │   │   ├── [TrashIcon.tsx](./src/components/atoms/mail/TrashIcon.tsx)
│   │   │   │   └── [index.ts](./src/components/atoms/mail/index.ts)
│   │   │   ├── media/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AlbumCover.test.tsx](./src/components/atoms/media/__tests__/AlbumCover.test.tsx)
│   │   │   │   │   ├── [ArtistInitials.test.tsx](./src/components/atoms/media/__tests__/ArtistInitials.test.tsx)
│   │   │   │   │   ├── [Collapse.test.tsx](./src/components/atoms/media/__tests__/Collapse.test.tsx)
│   │   │   │   │   ├── [DurationText.test.tsx](./src/components/atoms/media/__tests__/DurationText.test.tsx)
│   │   │   │   │   ├── [EpisodeBadge.test.tsx](./src/components/atoms/media/__tests__/EpisodeBadge.test.tsx)
│   │   │   │   │   ├── [GenreTag.test.tsx](./src/components/atoms/media/__tests__/GenreTag.test.tsx)
│   │   │   │   │   ├── [LikeCount.test.tsx](./src/components/atoms/media/__tests__/LikeCount.test.tsx)
│   │   │   │   │   ├── [PlayCount.test.tsx](./src/components/atoms/media/__tests__/PlayCount.test.tsx)
│   │   │   │   │   ├── [PlaylistIcon.test.tsx](./src/components/atoms/media/__tests__/PlaylistIcon.test.tsx)
│   │   │   │   │   ├── [QueueNumber.test.tsx](./src/components/atoms/media/__tests__/QueueNumber.test.tsx)
│   │   │   │   │   ├── [RatingStar.test.tsx](./src/components/atoms/media/__tests__/RatingStar.test.tsx)
│   │   │   │   │   ├── [StreamBadge.test.tsx](./src/components/atoms/media/__tests__/StreamBadge.test.tsx)
│   │   │   │   │   ├── [TrackNumber.test.tsx](./src/components/atoms/media/__tests__/TrackNumber.test.tsx)
│   │   │   │   │   ├── [VideoThumb.test.tsx](./src/components/atoms/media/__tests__/VideoThumb.test.tsx)
│   │   │   │   │   ├── [VolumeLevel.test.tsx](./src/components/atoms/media/__tests__/VolumeLevel.test.tsx)
│   │   │   │   │   └── [WatchTime.test.tsx](./src/components/atoms/media/__tests__/WatchTime.test.tsx)
│   │   │   │   ├── [AlbumCover.tsx](./src/components/atoms/media/AlbumCover.tsx)
│   │   │   │   ├── [ArtistInitials.tsx](./src/components/atoms/media/ArtistInitials.tsx)
│   │   │   │   ├── [Collapse.tsx](./src/components/atoms/media/Collapse.tsx)
│   │   │   │   ├── [DurationText.tsx](./src/components/atoms/media/DurationText.tsx)
│   │   │   │   ├── [EpisodeBadge.tsx](./src/components/atoms/media/EpisodeBadge.tsx)
│   │   │   │   ├── [GenreTag.tsx](./src/components/atoms/media/GenreTag.tsx)
│   │   │   │   ├── [LikeCount.tsx](./src/components/atoms/media/LikeCount.tsx)
│   │   │   │   ├── [PlayCount.tsx](./src/components/atoms/media/PlayCount.tsx)
│   │   │   │   ├── [PlaylistIcon.tsx](./src/components/atoms/media/PlaylistIcon.tsx)
│   │   │   │   ├── [QueueNumber.tsx](./src/components/atoms/media/QueueNumber.tsx)
│   │   │   │   ├── [RatingStar.tsx](./src/components/atoms/media/RatingStar.tsx)
│   │   │   │   ├── [StreamBadge.tsx](./src/components/atoms/media/StreamBadge.tsx)
│   │   │   │   ├── [TrackNumber.tsx](./src/components/atoms/media/TrackNumber.tsx)
│   │   │   │   ├── [VideoThumb.tsx](./src/components/atoms/media/VideoThumb.tsx)
│   │   │   │   ├── [VolumeLevel.tsx](./src/components/atoms/media/VolumeLevel.tsx)
│   │   │   │   ├── [WatchTime.tsx](./src/components/atoms/media/WatchTime.tsx)
│   │   │   │   └── [index.ts](./src/components/atoms/media/index.ts)
│   │   │   ├── news/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [ArticleCard.test.tsx](./src/components/atoms/news/__tests__/ArticleCard.test.tsx)
│   │   │   │   │   ├── [BreakingBadge.test.tsx](./src/components/atoms/news/__tests__/BreakingBadge.test.tsx)
│   │   │   │   │   ├── [CategoryChip.test.tsx](./src/components/atoms/news/__tests__/CategoryChip.test.tsx)
│   │   │   │   │   ├── [EditorTag.test.tsx](./src/components/atoms/news/__tests__/EditorTag.test.tsx)
│   │   │   │   │   ├── [HeadlineText.test.tsx](./src/components/atoms/news/__tests__/HeadlineText.test.tsx)
│   │   │   │   │   ├── [ImageCaption.test.tsx](./src/components/atoms/news/__tests__/ImageCaption.test.tsx)
│   │   │   │   │   ├── [LeadParagraph.test.tsx](./src/components/atoms/news/__tests__/LeadParagraph.test.tsx)
│   │   │   │   │   ├── [MediaBadge.test.tsx](./src/components/atoms/news/__tests__/MediaBadge.test.tsx)
│   │   │   │   │   ├── [PublishedDate.test.tsx](./src/components/atoms/news/__tests__/PublishedDate.test.tsx)
│   │   │   │   │   ├── [ReporterName.test.tsx](./src/components/atoms/news/__tests__/ReporterName.test.tsx)
│   │   │   │   │   ├── [ScoreLabel.test.tsx](./src/components/atoms/news/__tests__/ScoreLabel.test.tsx)
│   │   │   │   │   ├── [StoryKicker.test.tsx](./src/components/atoms/news/__tests__/StoryKicker.test.tsx)
│   │   │   │   │   ├── [TagBadge.test.tsx](./src/components/atoms/news/__tests__/TagBadge.test.tsx)
│   │   │   │   │   ├── [TimeAgo.test.tsx](./src/components/atoms/news/__tests__/TimeAgo.test.tsx)
│   │   │   │   │   ├── [TopStory.test.tsx](./src/components/atoms/news/__tests__/TopStory.test.tsx)
│   │   │   │   │   └── [UpdateBadge.test.tsx](./src/components/atoms/news/__tests__/UpdateBadge.test.tsx)
│   │   │   │   ├── [ArticleCard.tsx](./src/components/atoms/news/ArticleCard.tsx)
│   │   │   │   ├── [BreakingBadge.tsx](./src/components/atoms/news/BreakingBadge.tsx)
│   │   │   │   ├── [CategoryChip.tsx](./src/components/atoms/news/CategoryChip.tsx)
│   │   │   │   ├── [EditorTag.tsx](./src/components/atoms/news/EditorTag.tsx)
│   │   │   │   ├── [HeadlineText.tsx](./src/components/atoms/news/HeadlineText.tsx)
│   │   │   │   ├── [ImageCaption.tsx](./src/components/atoms/news/ImageCaption.tsx)
│   │   │   │   ├── [LeadParagraph.tsx](./src/components/atoms/news/LeadParagraph.tsx)
│   │   │   │   ├── [MediaBadge.tsx](./src/components/atoms/news/MediaBadge.tsx)
│   │   │   │   ├── [PublishedDate.tsx](./src/components/atoms/news/PublishedDate.tsx)
│   │   │   │   ├── [ReporterName.tsx](./src/components/atoms/news/ReporterName.tsx)
│   │   │   │   ├── [ScoreLabel.tsx](./src/components/atoms/news/ScoreLabel.tsx)
│   │   │   │   ├── [StoryKicker.tsx](./src/components/atoms/news/StoryKicker.tsx)
│   │   │   │   ├── [TagBadge.tsx](./src/components/atoms/news/TagBadge.tsx)
│   │   │   │   ├── [TimeAgo.tsx](./src/components/atoms/news/TimeAgo.tsx)
│   │   │   │   ├── [TopStory.tsx](./src/components/atoms/news/TopStory.tsx)
│   │   │   │   ├── [UpdateBadge.tsx](./src/components/atoms/news/UpdateBadge.tsx)
│   │   │   │   └── [index.ts](./src/components/atoms/news/index.ts)
│   │   │   ├── social/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [CommentCount.test.tsx](./src/components/atoms/social/__tests__/CommentCount.test.tsx)
│   │   │   │   │   ├── [ConnectionDot.test.tsx](./src/components/atoms/social/__tests__/ConnectionDot.test.tsx)
│   │   │   │   │   ├── [FollowButton.test.tsx](./src/components/atoms/social/__tests__/FollowButton.test.tsx)
│   │   │   │   │   ├── [FollowerCount.test.tsx](./src/components/atoms/social/__tests__/FollowerCount.test.tsx)
│   │   │   │   │   ├── [FriendAvatar.test.tsx](./src/components/atoms/social/__tests__/FriendAvatar.test.tsx)
│   │   │   │   │   ├── [GroupIcon.test.tsx](./src/components/atoms/social/__tests__/GroupIcon.test.tsx)
│   │   │   │   │   ├── [LikeButton.test.tsx](./src/components/atoms/social/__tests__/LikeButton.test.tsx)
│   │   │   │   │   ├── [MentionTag.test.tsx](./src/components/atoms/social/__tests__/MentionTag.test.tsx)
│   │   │   │   │   ├── [MessageIcon.test.tsx](./src/components/atoms/social/__tests__/MessageIcon.test.tsx)
│   │   │   │   │   ├── [OnlineBadge.test.tsx](./src/components/atoms/social/__tests__/OnlineBadge.test.tsx)
│   │   │   │   │   ├── [PostIcon.test.tsx](./src/components/atoms/social/__tests__/PostIcon.test.tsx)
│   │   │   │   │   ├── [ProfileBadge.test.tsx](./src/components/atoms/social/__tests__/ProfileBadge.test.tsx)
│   │   │   │   │   ├── [ShareIcon.test.tsx](./src/components/atoms/social/__tests__/ShareIcon.test.tsx)
│   │   │   │   │   ├── [StoryRing.test.tsx](./src/components/atoms/social/__tests__/StoryRing.test.tsx)
│   │   │   │   │   ├── [UnreadBadge.test.tsx](./src/components/atoms/social/__tests__/UnreadBadge.test.tsx)
│   │   │   │   │   └── [UsernameLabel.test.tsx](./src/components/atoms/social/__tests__/UsernameLabel.test.tsx)
│   │   │   │   ├── [CommentCount.tsx](./src/components/atoms/social/CommentCount.tsx)
│   │   │   │   ├── [ConnectionDot.tsx](./src/components/atoms/social/ConnectionDot.tsx)
│   │   │   │   ├── [FollowButton.tsx](./src/components/atoms/social/FollowButton.tsx)
│   │   │   │   ├── [FollowerCount.tsx](./src/components/atoms/social/FollowerCount.tsx)
│   │   │   │   ├── [FriendAvatar.tsx](./src/components/atoms/social/FriendAvatar.tsx)
│   │   │   │   ├── [GroupIcon.tsx](./src/components/atoms/social/GroupIcon.tsx)
│   │   │   │   ├── [LikeButton.tsx](./src/components/atoms/social/LikeButton.tsx)
│   │   │   │   ├── [MentionTag.tsx](./src/components/atoms/social/MentionTag.tsx)
│   │   │   │   ├── [MessageIcon.tsx](./src/components/atoms/social/MessageIcon.tsx)
│   │   │   │   ├── [OnlineBadge.tsx](./src/components/atoms/social/OnlineBadge.tsx)
│   │   │   │   ├── [PostIcon.tsx](./src/components/atoms/social/PostIcon.tsx)
│   │   │   │   ├── [ProfileBadge.tsx](./src/components/atoms/social/ProfileBadge.tsx)
│   │   │   │   ├── [ShareIcon.tsx](./src/components/atoms/social/ShareIcon.tsx)
│   │   │   │   ├── [StoryRing.tsx](./src/components/atoms/social/StoryRing.tsx)
│   │   │   │   ├── [UnreadBadge.tsx](./src/components/atoms/social/UnreadBadge.tsx)
│   │   │   │   ├── [UsernameLabel.tsx](./src/components/atoms/social/UsernameLabel.tsx)
│   │   │   │   └── [index.ts](./src/components/atoms/social/index.ts)
│   │   │   ├── store/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [CartBadge.test.tsx](./src/components/atoms/store/__tests__/CartBadge.test.tsx)
│   │   │   │   │   ├── [CategoryIcon.test.tsx](./src/components/atoms/store/__tests__/CategoryIcon.test.tsx)
│   │   │   │   │   ├── [CompareIcon.test.tsx](./src/components/atoms/store/__tests__/CompareIcon.test.tsx)
│   │   │   │   │   ├── [DiscountTag.test.tsx](./src/components/atoms/store/__tests__/DiscountTag.test.tsx)
│   │   │   │   │   ├── [FavoriteHeart.test.tsx](./src/components/atoms/store/__tests__/FavoriteHeart.test.tsx)
│   │   │   │   │   ├── [FreeShipping.test.tsx](./src/components/atoms/store/__tests__/FreeShipping.test.tsx)
│   │   │   │   │   ├── [GiftIcon.test.tsx](./src/components/atoms/store/__tests__/GiftIcon.test.tsx)
│   │   │   │   │   ├── [PriceLabel.test.tsx](./src/components/atoms/store/__tests__/PriceLabel.test.tsx)
│   │   │   │   │   ├── [ProductBadge.test.tsx](./src/components/atoms/store/__tests__/ProductBadge.test.tsx)
│   │   │   │   │   ├── [QuantityStepper.test.tsx](./src/components/atoms/store/__tests__/QuantityStepper.test.tsx)
│   │   │   │   │   ├── [RatingCount.test.tsx](./src/components/atoms/store/__tests__/RatingCount.test.tsx)
│   │   │   │   │   ├── [ReviewCount.test.tsx](./src/components/atoms/store/__tests__/ReviewCount.test.tsx)
│   │   │   │   │   ├── [StockStatus.test.tsx](./src/components/atoms/store/__tests__/StockStatus.test.tsx)
│   │   │   │   │   ├── [StoreLogo.test.tsx](./src/components/atoms/store/__tests__/StoreLogo.test.tsx)
│   │   │   │   │   ├── [UnitPrice.test.tsx](./src/components/atoms/store/__tests__/UnitPrice.test.tsx)
│   │   │   │   │   └── [WishlistIcon.test.tsx](./src/components/atoms/store/__tests__/WishlistIcon.test.tsx)
│   │   │   │   ├── [CartBadge.tsx](./src/components/atoms/store/CartBadge.tsx)
│   │   │   │   ├── [CategoryIcon.tsx](./src/components/atoms/store/CategoryIcon.tsx)
│   │   │   │   ├── [CompareIcon.tsx](./src/components/atoms/store/CompareIcon.tsx)
│   │   │   │   ├── [DiscountTag.tsx](./src/components/atoms/store/DiscountTag.tsx)
│   │   │   │   ├── [FavoriteHeart.tsx](./src/components/atoms/store/FavoriteHeart.tsx)
│   │   │   │   ├── [FreeShipping.tsx](./src/components/atoms/store/FreeShipping.tsx)
│   │   │   │   ├── [GiftIcon.tsx](./src/components/atoms/store/GiftIcon.tsx)
│   │   │   │   ├── [PriceLabel.tsx](./src/components/atoms/store/PriceLabel.tsx)
│   │   │   │   ├── [ProductBadge.tsx](./src/components/atoms/store/ProductBadge.tsx)
│   │   │   │   ├── [QuantityStepper.tsx](./src/components/atoms/store/QuantityStepper.tsx)
│   │   │   │   ├── [RatingCount.tsx](./src/components/atoms/store/RatingCount.tsx)
│   │   │   │   ├── [ReviewCount.tsx](./src/components/atoms/store/ReviewCount.tsx)
│   │   │   │   ├── [StockStatus.tsx](./src/components/atoms/store/StockStatus.tsx)
│   │   │   │   ├── [StoreLogo.tsx](./src/components/atoms/store/StoreLogo.tsx)
│   │   │   │   ├── [UnitPrice.tsx](./src/components/atoms/store/UnitPrice.tsx)
│   │   │   │   ├── [WishlistIcon.tsx](./src/components/atoms/store/WishlistIcon.tsx)
│   │   │   │   └── [index.ts](./src/components/atoms/store/index.ts)
│   │   │   ├── support/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Button.test.tsx](./src/components/atoms/support/__tests__/Button.test.tsx)
│   │   │   │   │   ├── [ButtonLink.test.tsx](./src/components/atoms/support/__tests__/ButtonLink.test.tsx)
│   │   │   │   │   ├── [Container.test.tsx](./src/components/atoms/support/__tests__/Container.test.tsx)
│   │   │   │   │   ├── [Divider.test.tsx](./src/components/atoms/support/__tests__/Divider.test.tsx)
│   │   │   │   │   ├── [Glow.test.tsx](./src/components/atoms/support/__tests__/Glow.test.tsx)
│   │   │   │   │   ├── [Grid.test.tsx](./src/components/atoms/support/__tests__/Grid.test.tsx)
│   │   │   │   │   ├── [IconButton.test.tsx](./src/components/atoms/support/__tests__/IconButton.test.tsx)
│   │   │   │   │   ├── [LinkButton.test.tsx](./src/components/atoms/support/__tests__/LinkButton.test.tsx)
│   │   │   │   │   ├── [Loading.test.tsx](./src/components/atoms/support/__tests__/Loading.test.tsx)
│   │   │   │   │   ├── [Separator.test.tsx](./src/components/atoms/support/__tests__/Separator.test.tsx)
│   │   │   │   │   ├── [Skeleton.test.tsx](./src/components/atoms/support/__tests__/Skeleton.test.tsx)
│   │   │   │   │   ├── [Slot.test.tsx](./src/components/atoms/support/__tests__/Slot.test.tsx)
│   │   │   │   │   ├── [Spacer.test.tsx](./src/components/atoms/support/__tests__/Spacer.test.tsx)
│   │   │   │   │   ├── [Spinner.test.tsx](./src/components/atoms/support/__tests__/Spinner.test.tsx)
│   │   │   │   │   ├── [Stack.test.tsx](./src/components/atoms/support/__tests__/Stack.test.tsx)
│   │   │   │   │   └── [Tooltip.test.tsx](./src/components/atoms/support/__tests__/Tooltip.test.tsx)
│   │   │   │   ├── [Button.tsx](./src/components/atoms/support/Button.tsx)
│   │   │   │   ├── [ButtonLink.tsx](./src/components/atoms/support/ButtonLink.tsx)
│   │   │   │   ├── [Container.tsx](./src/components/atoms/support/Container.tsx)
│   │   │   │   ├── [Divider.tsx](./src/components/atoms/support/Divider.tsx)
│   │   │   │   ├── [Glow.tsx](./src/components/atoms/support/Glow.tsx)
│   │   │   │   ├── [Grid.tsx](./src/components/atoms/support/Grid.tsx)
│   │   │   │   ├── [IconButton.tsx](./src/components/atoms/support/IconButton.tsx)
│   │   │   │   ├── [LinkButton.tsx](./src/components/atoms/support/LinkButton.tsx)
│   │   │   │   ├── [Loading.tsx](./src/components/atoms/support/Loading.tsx)
│   │   │   │   ├── [Separator.tsx](./src/components/atoms/support/Separator.tsx)
│   │   │   │   ├── [Skeleton.tsx](./src/components/atoms/support/Skeleton.tsx)
│   │   │   │   ├── [Slot.tsx](./src/components/atoms/support/Slot.tsx)
│   │   │   │   ├── [Spacer.tsx](./src/components/atoms/support/Spacer.tsx)
│   │   │   │   ├── [Spinner.tsx](./src/components/atoms/support/Spinner.tsx)
│   │   │   │   ├── [Stack.tsx](./src/components/atoms/support/Stack.tsx)
│   │   │   │   ├── [Tooltip.tsx](./src/components/atoms/support/Tooltip.tsx)
│   │   │   │   └── [index.ts](./src/components/atoms/support/index.ts)
│   │   │   ├── travel/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [ArrivalIcon.test.tsx](./src/components/atoms/travel/__tests__/ArrivalIcon.test.tsx)
│   │   │   │   │   ├── [DepartureIcon.test.tsx](./src/components/atoms/travel/__tests__/DepartureIcon.test.tsx)
│   │   │   │   │   ├── [DestinationTag.test.tsx](./src/components/atoms/travel/__tests__/DestinationTag.test.tsx)
│   │   │   │   │   ├── [DistanceLabel.test.tsx](./src/components/atoms/travel/__tests__/DistanceLabel.test.tsx)
│   │   │   │   │   ├── [FlightBadge.test.tsx](./src/components/atoms/travel/__tests__/FlightBadge.test.tsx)
│   │   │   │   │   ├── [GuestCount.test.tsx](./src/components/atoms/travel/__tests__/GuestCount.test.tsx)
│   │   │   │   │   ├── [HotelStar.test.tsx](./src/components/atoms/travel/__tests__/HotelStar.test.tsx)
│   │   │   │   │   ├── [MapMarker.test.tsx](./src/components/atoms/travel/__tests__/MapMarker.test.tsx)
│   │   │   │   │   ├── [NightCount.test.tsx](./src/components/atoms/travel/__tests__/NightCount.test.tsx)
│   │   │   │   │   ├── [PricePerNight.test.tsx](./src/components/atoms/travel/__tests__/PricePerNight.test.tsx)
│   │   │   │   │   ├── [RatingLabel.test.tsx](./src/components/atoms/travel/__tests__/RatingLabel.test.tsx)
│   │   │   │   │   ├── [RoomType.test.tsx](./src/components/atoms/travel/__tests__/RoomType.test.tsx)
│   │   │   │   │   ├── [SeatIcon.test.tsx](./src/components/atoms/travel/__tests__/SeatIcon.test.tsx)
│   │   │   │   │   ├── [TimeZone.test.tsx](./src/components/atoms/travel/__tests__/TimeZone.test.tsx)
│   │   │   │   │   ├── [TravelIcon.test.tsx](./src/components/atoms/travel/__tests__/TravelIcon.test.tsx)
│   │   │   │   │   └── [WeatherIcon.test.tsx](./src/components/atoms/travel/__tests__/WeatherIcon.test.tsx)
│   │   │   │   ├── [ArrivalIcon.tsx](./src/components/atoms/travel/ArrivalIcon.tsx)
│   │   │   │   ├── [DepartureIcon.tsx](./src/components/atoms/travel/DepartureIcon.tsx)
│   │   │   │   ├── [DestinationTag.tsx](./src/components/atoms/travel/DestinationTag.tsx)
│   │   │   │   ├── [DistanceLabel.tsx](./src/components/atoms/travel/DistanceLabel.tsx)
│   │   │   │   ├── [FlightBadge.tsx](./src/components/atoms/travel/FlightBadge.tsx)
│   │   │   │   ├── [GuestCount.tsx](./src/components/atoms/travel/GuestCount.tsx)
│   │   │   │   ├── [HotelStar.tsx](./src/components/atoms/travel/HotelStar.tsx)
│   │   │   │   ├── [MapMarker.tsx](./src/components/atoms/travel/MapMarker.tsx)
│   │   │   │   ├── [NightCount.tsx](./src/components/atoms/travel/NightCount.tsx)
│   │   │   │   ├── [PricePerNight.tsx](./src/components/atoms/travel/PricePerNight.tsx)
│   │   │   │   ├── [RatingLabel.tsx](./src/components/atoms/travel/RatingLabel.tsx)
│   │   │   │   ├── [RoomType.tsx](./src/components/atoms/travel/RoomType.tsx)
│   │   │   │   ├── [SeatIcon.tsx](./src/components/atoms/travel/SeatIcon.tsx)
│   │   │   │   ├── [TimeZone.tsx](./src/components/atoms/travel/TimeZone.tsx)
│   │   │   │   ├── [TravelIcon.tsx](./src/components/atoms/travel/TravelIcon.tsx)
│   │   │   │   ├── [WeatherIcon.tsx](./src/components/atoms/travel/WeatherIcon.tsx)
│   │   │   │   └── [index.ts](./src/components/atoms/travel/index.ts)
│   │   │   └── [index.ts](./src/components/atoms/index.ts)
│   │   ├── molecules/
│   │   │   ├── app/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [ButtonGroup.test.tsx](./src/components/molecules/app/__tests__/ButtonGroup.test.tsx)
│   │   │   │   │   ├── [CheckboxGroup.test.tsx](./src/components/molecules/app/__tests__/CheckboxGroup.test.tsx)
│   │   │   │   │   ├── [Combobox.test.tsx](./src/components/molecules/app/__tests__/Combobox.test.tsx)
│   │   │   │   │   ├── [Fieldset.test.tsx](./src/components/molecules/app/__tests__/Fieldset.test.tsx)
│   │   │   │   │   ├── [FilterGroup.test.tsx](./src/components/molecules/app/__tests__/FilterGroup.test.tsx)
│   │   │   │   │   ├── [FormRow.test.tsx](./src/components/molecules/app/__tests__/FormRow.test.tsx)
│   │   │   │   │   ├── [Gauge.test.tsx](./src/components/molecules/app/__tests__/Gauge.test.tsx)
│   │   │   │   │   ├── [InputGroup.test.tsx](./src/components/molecules/app/__tests__/InputGroup.test.tsx)
│   │   │   │   │   ├── [InputStepper.test.tsx](./src/components/molecules/app/__tests__/InputStepper.test.tsx)
│   │   │   │   │   ├── [MultiSelect.test.tsx](./src/components/molecules/app/__tests__/MultiSelect.test.tsx)
│   │   │   │   │   ├── [NumberInput.test.tsx](./src/components/molecules/app/__tests__/NumberInput.test.tsx)
│   │   │   │   │   ├── [RadioGroup.test.tsx](./src/components/molecules/app/__tests__/RadioGroup.test.tsx)
│   │   │   │   │   ├── [Stat.test.tsx](./src/components/molecules/app/__tests__/Stat.test.tsx)
│   │   │   │   │   ├── [StatTrend.test.tsx](./src/components/molecules/app/__tests__/StatTrend.test.tsx)
│   │   │   │   │   ├── [TagInput.test.tsx](./src/components/molecules/app/__tests__/TagInput.test.tsx)
│   │   │   │   │   └── [ToggleGroup.test.tsx](./src/components/molecules/app/__tests__/ToggleGroup.test.tsx)
│   │   │   │   ├── [ButtonGroup.tsx](./src/components/molecules/app/ButtonGroup.tsx)
│   │   │   │   ├── [CheckboxGroup.tsx](./src/components/molecules/app/CheckboxGroup.tsx)
│   │   │   │   ├── [Combobox.tsx](./src/components/molecules/app/Combobox.tsx)
│   │   │   │   ├── [Fieldset.tsx](./src/components/molecules/app/Fieldset.tsx)
│   │   │   │   ├── [FilterGroup.tsx](./src/components/molecules/app/FilterGroup.tsx)
│   │   │   │   ├── [FormRow.tsx](./src/components/molecules/app/FormRow.tsx)
│   │   │   │   ├── [Gauge.tsx](./src/components/molecules/app/Gauge.tsx)
│   │   │   │   ├── [InputGroup.tsx](./src/components/molecules/app/InputGroup.tsx)
│   │   │   │   ├── [InputStepper.tsx](./src/components/molecules/app/InputStepper.tsx)
│   │   │   │   ├── [MultiSelect.tsx](./src/components/molecules/app/MultiSelect.tsx)
│   │   │   │   ├── [NumberInput.tsx](./src/components/molecules/app/NumberInput.tsx)
│   │   │   │   ├── [RadioGroup.tsx](./src/components/molecules/app/RadioGroup.tsx)
│   │   │   │   ├── [Stat.tsx](./src/components/molecules/app/Stat.tsx)
│   │   │   │   ├── [StatTrend.tsx](./src/components/molecules/app/StatTrend.tsx)
│   │   │   │   ├── [TagInput.tsx](./src/components/molecules/app/TagInput.tsx)
│   │   │   │   ├── [ToggleGroup.tsx](./src/components/molecules/app/ToggleGroup.tsx)
│   │   │   │   └── [index.ts](./src/components/molecules/app/index.ts)
│   │   │   ├── auth/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Alert.test.tsx](./src/components/molecules/auth/__tests__/Alert.test.tsx)
│   │   │   │   │   ├── [AvatarGroup.test.tsx](./src/components/molecules/auth/__tests__/AvatarGroup.test.tsx)
│   │   │   │   │   ├── [Banner.test.tsx](./src/components/molecules/auth/__tests__/Banner.test.tsx)
│   │   │   │   │   ├── [Checklist.test.tsx](./src/components/molecules/auth/__tests__/Checklist.test.tsx)
│   │   │   │   │   ├── [Chip.test.tsx](./src/components/molecules/auth/__tests__/Chip.test.tsx)
│   │   │   │   │   ├── [ConfirmDialog.test.tsx](./src/components/molecules/auth/__tests__/ConfirmDialog.test.tsx)
│   │   │   │   │   ├── [ContextMenu.test.tsx](./src/components/molecules/auth/__tests__/ContextMenu.test.tsx)
│   │   │   │   │   ├── [DangerZone.test.tsx](./src/components/molecules/auth/__tests__/DangerZone.test.tsx)
│   │   │   │   │   ├── [Dropdown.test.tsx](./src/components/molecules/auth/__tests__/Dropdown.test.tsx)
│   │   │   │   │   ├── [FeatureList.test.tsx](./src/components/molecules/auth/__tests__/FeatureList.test.tsx)
│   │   │   │   │   ├── [InfoList.test.tsx](./src/components/molecules/auth/__tests__/InfoList.test.tsx)
│   │   │   │   │   ├── [InlineAlert.test.tsx](./src/components/molecules/auth/__tests__/InlineAlert.test.tsx)
│   │   │   │   │   ├── [KeyValue.test.tsx](./src/components/molecules/auth/__tests__/KeyValue.test.tsx)
│   │   │   │   │   ├── [Menu.test.tsx](./src/components/molecules/auth/__tests__/Menu.test.tsx)
│   │   │   │   │   ├── [Menubar.test.tsx](./src/components/molecules/auth/__tests__/Menubar.test.tsx)
│   │   │   │   │   └── [PasswordStrength.test.tsx](./src/components/molecules/auth/__tests__/PasswordStrength.test.tsx)
│   │   │   │   ├── [Alert.tsx](./src/components/molecules/auth/Alert.tsx)
│   │   │   │   ├── [AvatarGroup.tsx](./src/components/molecules/auth/AvatarGroup.tsx)
│   │   │   │   ├── [Banner.tsx](./src/components/molecules/auth/Banner.tsx)
│   │   │   │   ├── [Checklist.tsx](./src/components/molecules/auth/Checklist.tsx)
│   │   │   │   ├── [Chip.tsx](./src/components/molecules/auth/Chip.tsx)
│   │   │   │   ├── [ConfirmDialog.tsx](./src/components/molecules/auth/ConfirmDialog.tsx)
│   │   │   │   ├── [ContextMenu.tsx](./src/components/molecules/auth/ContextMenu.tsx)
│   │   │   │   ├── [DangerZone.tsx](./src/components/molecules/auth/DangerZone.tsx)
│   │   │   │   ├── [Dropdown.tsx](./src/components/molecules/auth/Dropdown.tsx)
│   │   │   │   ├── [FeatureList.tsx](./src/components/molecules/auth/FeatureList.tsx)
│   │   │   │   ├── [InfoList.tsx](./src/components/molecules/auth/InfoList.tsx)
│   │   │   │   ├── [InlineAlert.tsx](./src/components/molecules/auth/InlineAlert.tsx)
│   │   │   │   ├── [KeyValue.tsx](./src/components/molecules/auth/KeyValue.tsx)
│   │   │   │   ├── [Menu.tsx](./src/components/molecules/auth/Menu.tsx)
│   │   │   │   ├── [Menubar.tsx](./src/components/molecules/auth/Menubar.tsx)
│   │   │   │   ├── [PasswordStrength.tsx](./src/components/molecules/auth/PasswordStrength.tsx)
│   │   │   │   └── [index.ts](./src/components/molecules/auth/index.ts)
│   │   │   ├── blog/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [ArticleCard.test.tsx](./src/components/molecules/blog/__tests__/ArticleCard.test.tsx)
│   │   │   │   │   ├── [AuthorBio.test.tsx](./src/components/molecules/blog/__tests__/AuthorBio.test.tsx)
│   │   │   │   │   ├── [CategoryList.test.tsx](./src/components/molecules/blog/__tests__/CategoryList.test.tsx)
│   │   │   │   │   ├── [ChatBubble.test.tsx](./src/components/molecules/blog/__tests__/ChatBubble.test.tsx)
│   │   │   │   │   ├── [CommentBox.test.tsx](./src/components/molecules/blog/__tests__/CommentBox.test.tsx)
│   │   │   │   │   ├── [FeaturedPost.test.tsx](./src/components/molecules/blog/__tests__/FeaturedPost.test.tsx)
│   │   │   │   │   ├── [PostHeader.test.tsx](./src/components/molecules/blog/__tests__/PostHeader.test.tsx)
│   │   │   │   │   ├── [QuoteBlock.test.tsx](./src/components/molecules/blog/__tests__/QuoteBlock.test.tsx)
│   │   │   │   │   ├── [RelatedPosts.test.tsx](./src/components/molecules/blog/__tests__/RelatedPosts.test.tsx)
│   │   │   │   │   ├── [ReviewCard.test.tsx](./src/components/molecules/blog/__tests__/ReviewCard.test.tsx)
│   │   │   │   │   ├── [ShareButtons.test.tsx](./src/components/molecules/blog/__tests__/ShareButtons.test.tsx)
│   │   │   │   │   ├── [SkillBar.test.tsx](./src/components/molecules/blog/__tests__/SkillBar.test.tsx)
│   │   │   │   │   ├── [SocialLinks.test.tsx](./src/components/molecules/blog/__tests__/SocialLinks.test.tsx)
│   │   │   │   │   ├── [SubscribeForm.test.tsx](./src/components/molecules/blog/__tests__/SubscribeForm.test.tsx)
│   │   │   │   │   └── [TagChips.test.tsx](./src/components/molecules/blog/__tests__/TagChips.test.tsx)
│   │   │   │   ├── [ArticleCard.tsx](./src/components/molecules/blog/ArticleCard.tsx)
│   │   │   │   ├── [AuthorBio.tsx](./src/components/molecules/blog/AuthorBio.tsx)
│   │   │   │   ├── [CategoryList.tsx](./src/components/molecules/blog/CategoryList.tsx)
│   │   │   │   ├── [ChatBubble.tsx](./src/components/molecules/blog/ChatBubble.tsx)
│   │   │   │   ├── [CommentBox.tsx](./src/components/molecules/blog/CommentBox.tsx)
│   │   │   │   ├── [FeaturedPost.tsx](./src/components/molecules/blog/FeaturedPost.tsx)
│   │   │   │   ├── [PostHeader.tsx](./src/components/molecules/blog/PostHeader.tsx)
│   │   │   │   ├── [QuoteBlock.tsx](./src/components/molecules/blog/QuoteBlock.tsx)
│   │   │   │   ├── [RelatedPosts.tsx](./src/components/molecules/blog/RelatedPosts.tsx)
│   │   │   │   ├── [ReviewCard.tsx](./src/components/molecules/blog/ReviewCard.tsx)
│   │   │   │   ├── [ShareButtons.tsx](./src/components/molecules/blog/ShareButtons.tsx)
│   │   │   │   ├── [SkillBar.tsx](./src/components/molecules/blog/SkillBar.tsx)
│   │   │   │   ├── [SocialLinks.tsx](./src/components/molecules/blog/SocialLinks.tsx)
│   │   │   │   ├── [SubscribeForm.tsx](./src/components/molecules/blog/SubscribeForm.tsx)
│   │   │   │   ├── [TagChips.tsx](./src/components/molecules/blog/TagChips.tsx)
│   │   │   │   └── [index.ts](./src/components/molecules/blog/index.ts)
│   │   │   ├── crm/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [ActivityLog.test.tsx](./src/components/molecules/crm/__tests__/ActivityLog.test.tsx)
│   │   │   │   │   ├── [ContactCard.test.tsx](./src/components/molecules/crm/__tests__/ContactCard.test.tsx)
│   │   │   │   │   ├── [CustomerSegment.test.tsx](./src/components/molecules/crm/__tests__/CustomerSegment.test.tsx)
│   │   │   │   │   ├── [CustomerTable.test.tsx](./src/components/molecules/crm/__tests__/CustomerTable.test.tsx)
│   │   │   │   │   ├── [DealCard.test.tsx](./src/components/molecules/crm/__tests__/DealCard.test.tsx)
│   │   │   │   │   ├── [FollowUpTask.test.tsx](./src/components/molecules/crm/__tests__/FollowUpTask.test.tsx)
│   │   │   │   │   ├── [InventoryTable.test.tsx](./src/components/molecules/crm/__tests__/InventoryTable.test.tsx)
│   │   │   │   │   ├── [InvoiceCard.test.tsx](./src/components/molecules/crm/__tests__/InvoiceCard.test.tsx)
│   │   │   │   │   ├── [LeadCard.test.tsx](./src/components/molecules/crm/__tests__/LeadCard.test.tsx)
│   │   │   │   │   ├── [OrderCard.test.tsx](./src/components/molecules/crm/__tests__/OrderCard.test.tsx)
│   │   │   │   │   ├── [PipelineView.test.tsx](./src/components/molecules/crm/__tests__/PipelineView.test.tsx)
│   │   │   │   │   ├── [ProductCatalogCard.test.tsx](./src/components/molecules/crm/__tests__/ProductCatalogCard.test.tsx)
│   │   │   │   │   ├── [SalesFunnel.test.tsx](./src/components/molecules/crm/__tests__/SalesFunnel.test.tsx)
│   │   │   │   │   ├── [StatsRow.test.tsx](./src/components/molecules/crm/__tests__/StatsRow.test.tsx)
│   │   │   │   │   ├── [SupportTicket.test.tsx](./src/components/molecules/crm/__tests__/SupportTicket.test.tsx)
│   │   │   │   │   └── [TeamCard.test.tsx](./src/components/molecules/crm/__tests__/TeamCard.test.tsx)
│   │   │   │   ├── [ActivityLog.tsx](./src/components/molecules/crm/ActivityLog.tsx)
│   │   │   │   ├── [ContactCard.tsx](./src/components/molecules/crm/ContactCard.tsx)
│   │   │   │   ├── [CustomerSegment.tsx](./src/components/molecules/crm/CustomerSegment.tsx)
│   │   │   │   ├── [CustomerTable.tsx](./src/components/molecules/crm/CustomerTable.tsx)
│   │   │   │   ├── [DealCard.tsx](./src/components/molecules/crm/DealCard.tsx)
│   │   │   │   ├── [FollowUpTask.tsx](./src/components/molecules/crm/FollowUpTask.tsx)
│   │   │   │   ├── [InventoryTable.tsx](./src/components/molecules/crm/InventoryTable.tsx)
│   │   │   │   ├── [InvoiceCard.tsx](./src/components/molecules/crm/InvoiceCard.tsx)
│   │   │   │   ├── [LeadCard.tsx](./src/components/molecules/crm/LeadCard.tsx)
│   │   │   │   ├── [OrderCard.tsx](./src/components/molecules/crm/OrderCard.tsx)
│   │   │   │   ├── [PipelineView.tsx](./src/components/molecules/crm/PipelineView.tsx)
│   │   │   │   ├── [ProductCatalogCard.tsx](./src/components/molecules/crm/ProductCatalogCard.tsx)
│   │   │   │   ├── [SalesFunnel.tsx](./src/components/molecules/crm/SalesFunnel.tsx)
│   │   │   │   ├── [StatsRow.tsx](./src/components/molecules/crm/StatsRow.tsx)
│   │   │   │   ├── [SupportTicket.tsx](./src/components/molecules/crm/SupportTicket.tsx)
│   │   │   │   ├── [TeamCard.tsx](./src/components/molecules/crm/TeamCard.tsx)
│   │   │   │   └── [index.ts](./src/components/molecules/crm/index.ts)
│   │   │   ├── developer/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Carousel.test.tsx](./src/components/molecules/developer/__tests__/Carousel.test.tsx)
│   │   │   │   │   ├── [ColorPicker.test.tsx](./src/components/molecules/developer/__tests__/ColorPicker.test.tsx)
│   │   │   │   │   ├── [DatePicker.test.tsx](./src/components/molecules/developer/__tests__/DatePicker.test.tsx)
│   │   │   │   │   ├── [DateRange.test.tsx](./src/components/molecules/developer/__tests__/DateRange.test.tsx)
│   │   │   │   │   ├── [EmptyState.test.tsx](./src/components/molecules/developer/__tests__/EmptyState.test.tsx)
│   │   │   │   │   ├── [FileUpload.test.tsx](./src/components/molecules/developer/__tests__/FileUpload.test.tsx)
│   │   │   │   │   ├── [HoverCard.test.tsx](./src/components/molecules/developer/__tests__/HoverCard.test.tsx)
│   │   │   │   │   ├── [ImageGallery.test.tsx](./src/components/molecules/developer/__tests__/ImageGallery.test.tsx)
│   │   │   │   │   ├── [JsonViewer.test.tsx](./src/components/molecules/developer/__tests__/JsonViewer.test.tsx)
│   │   │   │   │   ├── [Pagination.test.tsx](./src/components/molecules/developer/__tests__/Pagination.test.tsx)
│   │   │   │   │   ├── [Resizable.test.tsx](./src/components/molecules/developer/__tests__/Resizable.test.tsx)
│   │   │   │   │   ├── [SearchBar.test.tsx](./src/components/molecules/developer/__tests__/SearchBar.test.tsx)
│   │   │   │   │   ├── [SpeedDial.test.tsx](./src/components/molecules/developer/__tests__/SpeedDial.test.tsx)
│   │   │   │   │   ├── [TimePicker.test.tsx](./src/components/molecules/developer/__tests__/TimePicker.test.tsx)
│   │   │   │   │   ├── [TransferList.test.tsx](./src/components/molecules/developer/__tests__/TransferList.test.tsx)
│   │   │   │   │   └── [TreeView.test.tsx](./src/components/molecules/developer/__tests__/TreeView.test.tsx)
│   │   │   │   ├── [Carousel.tsx](./src/components/molecules/developer/Carousel.tsx)
│   │   │   │   ├── [ColorPicker.tsx](./src/components/molecules/developer/ColorPicker.tsx)
│   │   │   │   ├── [DatePicker.tsx](./src/components/molecules/developer/DatePicker.tsx)
│   │   │   │   ├── [DateRange.tsx](./src/components/molecules/developer/DateRange.tsx)
│   │   │   │   ├── [EmptyState.tsx](./src/components/molecules/developer/EmptyState.tsx)
│   │   │   │   ├── [FileUpload.tsx](./src/components/molecules/developer/FileUpload.tsx)
│   │   │   │   ├── [HoverCard.tsx](./src/components/molecules/developer/HoverCard.tsx)
│   │   │   │   ├── [ImageGallery.tsx](./src/components/molecules/developer/ImageGallery.tsx)
│   │   │   │   ├── [JsonViewer.tsx](./src/components/molecules/developer/JsonViewer.tsx)
│   │   │   │   ├── [Pagination.tsx](./src/components/molecules/developer/Pagination.tsx)
│   │   │   │   ├── [Resizable.tsx](./src/components/molecules/developer/Resizable.tsx)
│   │   │   │   ├── [SearchBar.tsx](./src/components/molecules/developer/SearchBar.tsx)
│   │   │   │   ├── [SpeedDial.tsx](./src/components/molecules/developer/SpeedDial.tsx)
│   │   │   │   ├── [TimePicker.tsx](./src/components/molecules/developer/TimePicker.tsx)
│   │   │   │   ├── [TransferList.tsx](./src/components/molecules/developer/TransferList.tsx)
│   │   │   │   ├── [TreeView.tsx](./src/components/molecules/developer/TreeView.tsx)
│   │   │   │   └── [index.ts](./src/components/molecules/developer/index.ts)
│   │   │   ├── finance/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AccountSummary.test.tsx](./src/components/molecules/finance/__tests__/AccountSummary.test.tsx)
│   │   │   │   │   ├── [AlertsCard.test.tsx](./src/components/molecules/finance/__tests__/AlertsCard.test.tsx)
│   │   │   │   │   ├── [BalanceCard.test.tsx](./src/components/molecules/finance/__tests__/BalanceCard.test.tsx)
│   │   │   │   │   ├── [BudgetCard.test.tsx](./src/components/molecules/finance/__tests__/BudgetCard.test.tsx)
│   │   │   │   │   ├── [ExchangeCard.test.tsx](./src/components/molecules/finance/__tests__/ExchangeCard.test.tsx)
│   │   │   │   │   ├── [ExpenseList.test.tsx](./src/components/molecules/finance/__tests__/ExpenseList.test.tsx)
│   │   │   │   │   ├── [IncomeList.test.tsx](./src/components/molecules/finance/__tests__/IncomeList.test.tsx)
│   │   │   │   │   ├── [InvoiceRow.test.tsx](./src/components/molecules/finance/__tests__/InvoiceRow.test.tsx)
│   │   │   │   │   ├── [LoanCard.test.tsx](./src/components/molecules/finance/__tests__/LoanCard.test.tsx)
│   │   │   │   │   ├── [PaymentCard.test.tsx](./src/components/molecules/finance/__tests__/PaymentCard.test.tsx)
│   │   │   │   │   ├── [PortfolioCard.test.tsx](./src/components/molecules/finance/__tests__/PortfolioCard.test.tsx)
│   │   │   │   │   ├── [SavingsGoal.test.tsx](./src/components/molecules/finance/__tests__/SavingsGoal.test.tsx)
│   │   │   │   │   ├── [StockChart.test.tsx](./src/components/molecules/finance/__tests__/StockChart.test.tsx)
│   │   │   │   │   ├── [TaxCard.test.tsx](./src/components/molecules/finance/__tests__/TaxCard.test.tsx)
│   │   │   │   │   ├── [TransactionTable.test.tsx](./src/components/molecules/finance/__tests__/TransactionTable.test.tsx)
│   │   │   │   │   └── [WatchlistRow.test.tsx](./src/components/molecules/finance/__tests__/WatchlistRow.test.tsx)
│   │   │   │   ├── [AccountSummary.tsx](./src/components/molecules/finance/AccountSummary.tsx)
│   │   │   │   ├── [AlertsCard.tsx](./src/components/molecules/finance/AlertsCard.tsx)
│   │   │   │   ├── [BalanceCard.tsx](./src/components/molecules/finance/BalanceCard.tsx)
│   │   │   │   ├── [BudgetCard.tsx](./src/components/molecules/finance/BudgetCard.tsx)
│   │   │   │   ├── [ExchangeCard.tsx](./src/components/molecules/finance/ExchangeCard.tsx)
│   │   │   │   ├── [ExpenseList.tsx](./src/components/molecules/finance/ExpenseList.tsx)
│   │   │   │   ├── [IncomeList.tsx](./src/components/molecules/finance/IncomeList.tsx)
│   │   │   │   ├── [InvoiceRow.tsx](./src/components/molecules/finance/InvoiceRow.tsx)
│   │   │   │   ├── [LoanCard.tsx](./src/components/molecules/finance/LoanCard.tsx)
│   │   │   │   ├── [PaymentCard.tsx](./src/components/molecules/finance/PaymentCard.tsx)
│   │   │   │   ├── [PortfolioCard.tsx](./src/components/molecules/finance/PortfolioCard.tsx)
│   │   │   │   ├── [SavingsGoal.tsx](./src/components/molecules/finance/SavingsGoal.tsx)
│   │   │   │   ├── [StockChart.tsx](./src/components/molecules/finance/StockChart.tsx)
│   │   │   │   ├── [TaxCard.tsx](./src/components/molecules/finance/TaxCard.tsx)
│   │   │   │   ├── [TransactionTable.tsx](./src/components/molecules/finance/TransactionTable.tsx)
│   │   │   │   ├── [WatchlistRow.tsx](./src/components/molecules/finance/WatchlistRow.tsx)
│   │   │   │   └── [index.ts](./src/components/molecules/finance/index.ts)
│   │   │   ├── health/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [ActivityGoal.test.tsx](./src/components/molecules/health/__tests__/ActivityGoal.test.tsx)
│   │   │   │   │   ├── [AppointmentCard.test.tsx](./src/components/molecules/health/__tests__/AppointmentCard.test.tsx)
│   │   │   │   │   ├── [CalorieTracker.test.tsx](./src/components/molecules/health/__tests__/CalorieTracker.test.tsx)
│   │   │   │   │   ├── [DoctorCard.test.tsx](./src/components/molecules/health/__tests__/DoctorCard.test.tsx)
│   │   │   │   │   ├── [HealthTip.test.tsx](./src/components/molecules/health/__tests__/HealthTip.test.tsx)
│   │   │   │   │   ├── [HeartRateChart.test.tsx](./src/components/molecules/health/__tests__/HeartRateChart.test.tsx)
│   │   │   │   │   ├── [MealPlan.test.tsx](./src/components/molecules/health/__tests__/MealPlan.test.tsx)
│   │   │   │   │   ├── [MedicationCard.test.tsx](./src/components/molecules/health/__tests__/MedicationCard.test.tsx)
│   │   │   │   │   ├── [NutritionCard.test.tsx](./src/components/molecules/health/__tests__/NutritionCard.test.tsx)
│   │   │   │   │   ├── [SleepChart.test.tsx](./src/components/molecules/health/__tests__/SleepChart.test.tsx)
│   │   │   │   │   ├── [StepsChart.test.tsx](./src/components/molecules/health/__tests__/StepsChart.test.tsx)
│   │   │   │   │   ├── [SymptomCard.test.tsx](./src/components/molecules/health/__tests__/SymptomCard.test.tsx)
│   │   │   │   │   ├── [VitalsCard.test.tsx](./src/components/molecules/health/__tests__/VitalsCard.test.tsx)
│   │   │   │   │   ├── [WaterTracker.test.tsx](./src/components/molecules/health/__tests__/WaterTracker.test.tsx)
│   │   │   │   │   ├── [WeightChart.test.tsx](./src/components/molecules/health/__tests__/WeightChart.test.tsx)
│   │   │   │   │   └── [WorkoutCard.test.tsx](./src/components/molecules/health/__tests__/WorkoutCard.test.tsx)
│   │   │   │   ├── [ActivityGoal.tsx](./src/components/molecules/health/ActivityGoal.tsx)
│   │   │   │   ├── [AppointmentCard.tsx](./src/components/molecules/health/AppointmentCard.tsx)
│   │   │   │   ├── [CalorieTracker.tsx](./src/components/molecules/health/CalorieTracker.tsx)
│   │   │   │   ├── [DoctorCard.tsx](./src/components/molecules/health/DoctorCard.tsx)
│   │   │   │   ├── [HealthTip.tsx](./src/components/molecules/health/HealthTip.tsx)
│   │   │   │   ├── [HeartRateChart.tsx](./src/components/molecules/health/HeartRateChart.tsx)
│   │   │   │   ├── [MealPlan.tsx](./src/components/molecules/health/MealPlan.tsx)
│   │   │   │   ├── [MedicationCard.tsx](./src/components/molecules/health/MedicationCard.tsx)
│   │   │   │   ├── [NutritionCard.tsx](./src/components/molecules/health/NutritionCard.tsx)
│   │   │   │   ├── [SleepChart.tsx](./src/components/molecules/health/SleepChart.tsx)
│   │   │   │   ├── [StepsChart.tsx](./src/components/molecules/health/StepsChart.tsx)
│   │   │   │   ├── [SymptomCard.tsx](./src/components/molecules/health/SymptomCard.tsx)
│   │   │   │   ├── [VitalsCard.tsx](./src/components/molecules/health/VitalsCard.tsx)
│   │   │   │   ├── [WaterTracker.tsx](./src/components/molecules/health/WaterTracker.tsx)
│   │   │   │   ├── [WeightChart.tsx](./src/components/molecules/health/WeightChart.tsx)
│   │   │   │   ├── [WorkoutCard.tsx](./src/components/molecules/health/WorkoutCard.tsx)
│   │   │   │   └── [index.ts](./src/components/molecules/health/index.ts)
│   │   │   ├── hr/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AttendanceTable.test.tsx](./src/components/molecules/hr/__tests__/AttendanceTable.test.tsx)
│   │   │   │   │   ├── [BenefitCard.test.tsx](./src/components/molecules/hr/__tests__/BenefitCard.test.tsx)
│   │   │   │   │   ├── [CandidateCard.test.tsx](./src/components/molecules/hr/__tests__/CandidateCard.test.tsx)
│   │   │   │   │   ├── [EmployeeCard.test.tsx](./src/components/molecules/hr/__tests__/EmployeeCard.test.tsx)
│   │   │   │   │   ├── [InterviewCard.test.tsx](./src/components/molecules/hr/__tests__/InterviewCard.test.tsx)
│   │   │   │   │   ├── [JobPosting.test.tsx](./src/components/molecules/hr/__tests__/JobPosting.test.tsx)
│   │   │   │   │   ├── [LeaveCard.test.tsx](./src/components/molecules/hr/__tests__/LeaveCard.test.tsx)
│   │   │   │   │   ├── [OnboardingTask.test.tsx](./src/components/molecules/hr/__tests__/OnboardingTask.test.tsx)
│   │   │   │   │   ├── [OrgChart.test.tsx](./src/components/molecules/hr/__tests__/OrgChart.test.tsx)
│   │   │   │   │   ├── [PayrollSummary.test.tsx](./src/components/molecules/hr/__tests__/PayrollSummary.test.tsx)
│   │   │   │   │   ├── [PerformanceCard.test.tsx](./src/components/molecules/hr/__tests__/PerformanceCard.test.tsx)
│   │   │   │   │   ├── [PolicyCard.test.tsx](./src/components/molecules/hr/__tests__/PolicyCard.test.tsx)
│   │   │   │   │   ├── [RecruitmentCard.test.tsx](./src/components/molecules/hr/__tests__/RecruitmentCard.test.tsx)
│   │   │   │   │   ├── [TeamSummary.test.tsx](./src/components/molecules/hr/__tests__/TeamSummary.test.tsx)
│   │   │   │   │   ├── [TimesheetRow.test.tsx](./src/components/molecules/hr/__tests__/TimesheetRow.test.tsx)
│   │   │   │   │   └── [TrainingCard.test.tsx](./src/components/molecules/hr/__tests__/TrainingCard.test.tsx)
│   │   │   │   ├── [AttendanceTable.tsx](./src/components/molecules/hr/AttendanceTable.tsx)
│   │   │   │   ├── [BenefitCard.tsx](./src/components/molecules/hr/BenefitCard.tsx)
│   │   │   │   ├── [CandidateCard.tsx](./src/components/molecules/hr/CandidateCard.tsx)
│   │   │   │   ├── [EmployeeCard.tsx](./src/components/molecules/hr/EmployeeCard.tsx)
│   │   │   │   ├── [InterviewCard.tsx](./src/components/molecules/hr/InterviewCard.tsx)
│   │   │   │   ├── [JobPosting.tsx](./src/components/molecules/hr/JobPosting.tsx)
│   │   │   │   ├── [LeaveCard.tsx](./src/components/molecules/hr/LeaveCard.tsx)
│   │   │   │   ├── [OnboardingTask.tsx](./src/components/molecules/hr/OnboardingTask.tsx)
│   │   │   │   ├── [OrgChart.tsx](./src/components/molecules/hr/OrgChart.tsx)
│   │   │   │   ├── [PayrollSummary.tsx](./src/components/molecules/hr/PayrollSummary.tsx)
│   │   │   │   ├── [PerformanceCard.tsx](./src/components/molecules/hr/PerformanceCard.tsx)
│   │   │   │   ├── [PolicyCard.tsx](./src/components/molecules/hr/PolicyCard.tsx)
│   │   │   │   ├── [RecruitmentCard.tsx](./src/components/molecules/hr/RecruitmentCard.tsx)
│   │   │   │   ├── [TeamSummary.tsx](./src/components/molecules/hr/TeamSummary.tsx)
│   │   │   │   ├── [TimesheetRow.tsx](./src/components/molecules/hr/TimesheetRow.tsx)
│   │   │   │   ├── [TrainingCard.tsx](./src/components/molecules/hr/TrainingCard.tsx)
│   │   │   │   └── [index.ts](./src/components/molecules/hr/index.ts)
│   │   │   ├── landing/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AwardCard.test.tsx](./src/components/molecules/landing/__tests__/AwardCard.test.tsx)
│   │   │   │   │   ├── [BlogTeaser.test.tsx](./src/components/molecules/landing/__tests__/BlogTeaser.test.tsx)
│   │   │   │   │   ├── [ClientLogo.test.tsx](./src/components/molecules/landing/__tests__/ClientLogo.test.tsx)
│   │   │   │   │   ├── [ContactForm.test.tsx](./src/components/molecules/landing/__tests__/ContactForm.test.tsx)
│   │   │   │   │   ├── [CtaBanner.test.tsx](./src/components/molecules/landing/__tests__/CtaBanner.test.tsx)
│   │   │   │   │   ├── [FAQItem.test.tsx](./src/components/molecules/landing/__tests__/FAQItem.test.tsx)
│   │   │   │   │   ├── [HeroSection.test.tsx](./src/components/molecules/landing/__tests__/HeroSection.test.tsx)
│   │   │   │   │   ├── [MilestoneCard.test.tsx](./src/components/molecules/landing/__tests__/MilestoneCard.test.tsx)
│   │   │   │   │   ├── [PartnersRow.test.tsx](./src/components/molecules/landing/__tests__/PartnersRow.test.tsx)
│   │   │   │   │   ├── [PlanCard.test.tsx](./src/components/molecules/landing/__tests__/PlanCard.test.tsx)
│   │   │   │   │   ├── [PricingCard.test.tsx](./src/components/molecules/landing/__tests__/PricingCard.test.tsx)
│   │   │   │   │   ├── [ProcessStep.test.tsx](./src/components/molecules/landing/__tests__/ProcessStep.test.tsx)
│   │   │   │   │   ├── [ServiceCard.test.tsx](./src/components/molecules/landing/__tests__/ServiceCard.test.tsx)
│   │   │   │   │   ├── [StatHighlight.test.tsx](./src/components/molecules/landing/__tests__/StatHighlight.test.tsx)
│   │   │   │   │   ├── [TeamMemberCard.test.tsx](./src/components/molecules/landing/__tests__/TeamMemberCard.test.tsx)
│   │   │   │   │   └── [TestimonialCard.test.tsx](./src/components/molecules/landing/__tests__/TestimonialCard.test.tsx)
│   │   │   │   ├── [AwardCard.tsx](./src/components/molecules/landing/AwardCard.tsx)
│   │   │   │   ├── [BlogTeaser.tsx](./src/components/molecules/landing/BlogTeaser.tsx)
│   │   │   │   ├── [ClientLogo.tsx](./src/components/molecules/landing/ClientLogo.tsx)
│   │   │   │   ├── [ContactForm.tsx](./src/components/molecules/landing/ContactForm.tsx)
│   │   │   │   ├── [CtaBanner.tsx](./src/components/molecules/landing/CtaBanner.tsx)
│   │   │   │   ├── [FAQItem.tsx](./src/components/molecules/landing/FAQItem.tsx)
│   │   │   │   ├── [HeroSection.tsx](./src/components/molecules/landing/HeroSection.tsx)
│   │   │   │   ├── [MilestoneCard.tsx](./src/components/molecules/landing/MilestoneCard.tsx)
│   │   │   │   ├── [PartnersRow.tsx](./src/components/molecules/landing/PartnersRow.tsx)
│   │   │   │   ├── [PlanCard.tsx](./src/components/molecules/landing/PlanCard.tsx)
│   │   │   │   ├── [PricingCard.tsx](./src/components/molecules/landing/PricingCard.tsx)
│   │   │   │   ├── [ProcessStep.tsx](./src/components/molecules/landing/ProcessStep.tsx)
│   │   │   │   ├── [ServiceCard.tsx](./src/components/molecules/landing/ServiceCard.tsx)
│   │   │   │   ├── [StatHighlight.tsx](./src/components/molecules/landing/StatHighlight.tsx)
│   │   │   │   ├── [TeamMemberCard.tsx](./src/components/molecules/landing/TeamMemberCard.tsx)
│   │   │   │   ├── [TestimonialCard.tsx](./src/components/molecules/landing/TestimonialCard.tsx)
│   │   │   │   └── [index.ts](./src/components/molecules/landing/index.ts)
│   │   │   ├── mail/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AttachmentList.test.tsx](./src/components/molecules/mail/__tests__/AttachmentList.test.tsx)
│   │   │   │   │   ├── [ComposeForm.test.tsx](./src/components/molecules/mail/__tests__/ComposeForm.test.tsx)
│   │   │   │   │   ├── [DraftItem.test.tsx](./src/components/molecules/mail/__tests__/DraftItem.test.tsx)
│   │   │   │   │   ├── [EmailRow.test.tsx](./src/components/molecules/mail/__tests__/EmailRow.test.tsx)
│   │   │   │   │   ├── [FolderItem.test.tsx](./src/components/molecules/mail/__tests__/FolderItem.test.tsx)
│   │   │   │   │   ├── [InboxTable.test.tsx](./src/components/molecules/mail/__tests__/InboxTable.test.tsx)
│   │   │   │   │   ├── [LabelBadges.test.tsx](./src/components/molecules/mail/__tests__/LabelBadges.test.tsx)
│   │   │   │   │   ├── [LoadingOverlay.test.tsx](./src/components/molecules/mail/__tests__/LoadingOverlay.test.tsx)
│   │   │   │   │   ├── [MessageThread.test.tsx](./src/components/molecules/mail/__tests__/MessageThread.test.tsx)
│   │   │   │   │   ├── [NavItem.test.tsx](./src/components/molecules/mail/__tests__/NavItem.test.tsx)
│   │   │   │   │   ├── [ReplyForm.test.tsx](./src/components/molecules/mail/__tests__/ReplyForm.test.tsx)
│   │   │   │   │   ├── [SearchResults.test.tsx](./src/components/molecules/mail/__tests__/SearchResults.test.tsx)
│   │   │   │   │   ├── [SentItem.test.tsx](./src/components/molecules/mail/__tests__/SentItem.test.tsx)
│   │   │   │   │   ├── [SignatureCard.test.tsx](./src/components/molecules/mail/__tests__/SignatureCard.test.tsx)
│   │   │   │   │   ├── [SpamItem.test.tsx](./src/components/molecules/mail/__tests__/SpamItem.test.tsx)
│   │   │   │   │   └── [TrashItem.test.tsx](./src/components/molecules/mail/__tests__/TrashItem.test.tsx)
│   │   │   │   ├── [AttachmentList.tsx](./src/components/molecules/mail/AttachmentList.tsx)
│   │   │   │   ├── [ComposeForm.tsx](./src/components/molecules/mail/ComposeForm.tsx)
│   │   │   │   ├── [DraftItem.tsx](./src/components/molecules/mail/DraftItem.tsx)
│   │   │   │   ├── [EmailRow.tsx](./src/components/molecules/mail/EmailRow.tsx)
│   │   │   │   ├── [FolderItem.tsx](./src/components/molecules/mail/FolderItem.tsx)
│   │   │   │   ├── [InboxTable.tsx](./src/components/molecules/mail/InboxTable.tsx)
│   │   │   │   ├── [LabelBadges.tsx](./src/components/molecules/mail/LabelBadges.tsx)
│   │   │   │   ├── [LoadingOverlay.tsx](./src/components/molecules/mail/LoadingOverlay.tsx)
│   │   │   │   ├── [MessageThread.tsx](./src/components/molecules/mail/MessageThread.tsx)
│   │   │   │   ├── [NavItem.tsx](./src/components/molecules/mail/NavItem.tsx)
│   │   │   │   ├── [ReplyForm.tsx](./src/components/molecules/mail/ReplyForm.tsx)
│   │   │   │   ├── [SearchResults.tsx](./src/components/molecules/mail/SearchResults.tsx)
│   │   │   │   ├── [SentItem.tsx](./src/components/molecules/mail/SentItem.tsx)
│   │   │   │   ├── [SignatureCard.tsx](./src/components/molecules/mail/SignatureCard.tsx)
│   │   │   │   ├── [SpamItem.tsx](./src/components/molecules/mail/SpamItem.tsx)
│   │   │   │   ├── [TrashItem.tsx](./src/components/molecules/mail/TrashItem.tsx)
│   │   │   │   └── [index.ts](./src/components/molecules/mail/index.ts)
│   │   │   ├── media/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AlbumCard.test.tsx](./src/components/molecules/media/__tests__/AlbumCard.test.tsx)
│   │   │   │   │   ├── [AlbumTracks.test.tsx](./src/components/molecules/media/__tests__/AlbumTracks.test.tsx)
│   │   │   │   │   ├── [ArtistCard.test.tsx](./src/components/molecules/media/__tests__/ArtistCard.test.tsx)
│   │   │   │   │   ├── [EpisodeCard.test.tsx](./src/components/molecules/media/__tests__/EpisodeCard.test.tsx)
│   │   │   │   │   ├── [LyricsView.test.tsx](./src/components/molecules/media/__tests__/LyricsView.test.tsx)
│   │   │   │   │   ├── [MoodBoard.test.tsx](./src/components/molecules/media/__tests__/MoodBoard.test.tsx)
│   │   │   │   │   ├── [NowPlayingBar.test.tsx](./src/components/molecules/media/__tests__/NowPlayingBar.test.tsx)
│   │   │   │   │   ├── [PlaylistCard.test.tsx](./src/components/molecules/media/__tests__/PlaylistCard.test.tsx)
│   │   │   │   │   ├── [PodcastCard.test.tsx](./src/components/molecules/media/__tests__/PodcastCard.test.tsx)
│   │   │   │   │   ├── [QueueList.test.tsx](./src/components/molecules/media/__tests__/QueueList.test.tsx)
│   │   │   │   │   ├── [RadioStation.test.tsx](./src/components/molecules/media/__tests__/RadioStation.test.tsx)
│   │   │   │   │   ├── [RecentlyPlayed.test.tsx](./src/components/molecules/media/__tests__/RecentlyPlayed.test.tsx)
│   │   │   │   │   ├── [SimilarArtists.test.tsx](./src/components/molecules/media/__tests__/SimilarArtists.test.tsx)
│   │   │   │   │   ├── [StreamCard.test.tsx](./src/components/molecules/media/__tests__/StreamCard.test.tsx)
│   │   │   │   │   ├── [TrackRow.test.tsx](./src/components/molecules/media/__tests__/TrackRow.test.tsx)
│   │   │   │   │   └── [VideoCard.test.tsx](./src/components/molecules/media/__tests__/VideoCard.test.tsx)
│   │   │   │   ├── [AlbumCard.tsx](./src/components/molecules/media/AlbumCard.tsx)
│   │   │   │   ├── [AlbumTracks.tsx](./src/components/molecules/media/AlbumTracks.tsx)
│   │   │   │   ├── [ArtistCard.tsx](./src/components/molecules/media/ArtistCard.tsx)
│   │   │   │   ├── [EpisodeCard.tsx](./src/components/molecules/media/EpisodeCard.tsx)
│   │   │   │   ├── [LyricsView.tsx](./src/components/molecules/media/LyricsView.tsx)
│   │   │   │   ├── [MoodBoard.tsx](./src/components/molecules/media/MoodBoard.tsx)
│   │   │   │   ├── [NowPlayingBar.tsx](./src/components/molecules/media/NowPlayingBar.tsx)
│   │   │   │   ├── [PlaylistCard.tsx](./src/components/molecules/media/PlaylistCard.tsx)
│   │   │   │   ├── [PodcastCard.tsx](./src/components/molecules/media/PodcastCard.tsx)
│   │   │   │   ├── [QueueList.tsx](./src/components/molecules/media/QueueList.tsx)
│   │   │   │   ├── [RadioStation.tsx](./src/components/molecules/media/RadioStation.tsx)
│   │   │   │   ├── [RecentlyPlayed.tsx](./src/components/molecules/media/RecentlyPlayed.tsx)
│   │   │   │   ├── [SimilarArtists.tsx](./src/components/molecules/media/SimilarArtists.tsx)
│   │   │   │   ├── [StreamCard.tsx](./src/components/molecules/media/StreamCard.tsx)
│   │   │   │   ├── [TrackRow.tsx](./src/components/molecules/media/TrackRow.tsx)
│   │   │   │   ├── [VideoCard.tsx](./src/components/molecules/media/VideoCard.tsx)
│   │   │   │   └── [index.ts](./src/components/molecules/media/index.ts)
│   │   │   ├── news/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AnalysisCard.test.tsx](./src/components/molecules/news/__tests__/AnalysisCard.test.tsx)
│   │   │   │   │   ├── [ArticleList.test.tsx](./src/components/molecules/news/__tests__/ArticleList.test.tsx)
│   │   │   │   │   ├── [BreakingNews.test.tsx](./src/components/molecules/news/__tests__/BreakingNews.test.tsx)
│   │   │   │   │   ├── [CategoryNav.test.tsx](./src/components/molecules/news/__tests__/CategoryNav.test.tsx)
│   │   │   │   │   ├── [CultureCard.test.tsx](./src/components/molecules/news/__tests__/CultureCard.test.tsx)
│   │   │   │   │   ├── [EditorialCard.test.tsx](./src/components/molecules/news/__tests__/EditorialCard.test.tsx)
│   │   │   │   │   ├── [HeadlineRow.test.tsx](./src/components/molecules/news/__tests__/HeadlineRow.test.tsx)
│   │   │   │   │   ├── [LiveUpdate.test.tsx](./src/components/molecules/news/__tests__/LiveUpdate.test.tsx)
│   │   │   │   │   ├── [MarketIndex.test.tsx](./src/components/molecules/news/__tests__/MarketIndex.test.tsx)
│   │   │   │   │   ├── [OpinionColumn.test.tsx](./src/components/molecules/news/__tests__/OpinionColumn.test.tsx)
│   │   │   │   │   ├── [PhotoStory.test.tsx](./src/components/molecules/news/__tests__/PhotoStory.test.tsx)
│   │   │   │   │   ├── [ScoreBoard.test.tsx](./src/components/molecules/news/__tests__/ScoreBoard.test.tsx)
│   │   │   │   │   ├── [SportsScoreCard.test.tsx](./src/components/molecules/news/__tests__/SportsScoreCard.test.tsx)
│   │   │   │   │   ├── [TrendingList.test.tsx](./src/components/molecules/news/__tests__/TrendingList.test.tsx)
│   │   │   │   │   ├── [VideoStory.test.tsx](./src/components/molecules/news/__tests__/VideoStory.test.tsx)
│   │   │   │   │   └── [WeatherCard.test.tsx](./src/components/molecules/news/__tests__/WeatherCard.test.tsx)
│   │   │   │   ├── [AnalysisCard.tsx](./src/components/molecules/news/AnalysisCard.tsx)
│   │   │   │   ├── [ArticleList.tsx](./src/components/molecules/news/ArticleList.tsx)
│   │   │   │   ├── [BreakingNews.tsx](./src/components/molecules/news/BreakingNews.tsx)
│   │   │   │   ├── [CategoryNav.tsx](./src/components/molecules/news/CategoryNav.tsx)
│   │   │   │   ├── [CultureCard.tsx](./src/components/molecules/news/CultureCard.tsx)
│   │   │   │   ├── [EditorialCard.tsx](./src/components/molecules/news/EditorialCard.tsx)
│   │   │   │   ├── [HeadlineRow.tsx](./src/components/molecules/news/HeadlineRow.tsx)
│   │   │   │   ├── [LiveUpdate.tsx](./src/components/molecules/news/LiveUpdate.tsx)
│   │   │   │   ├── [MarketIndex.tsx](./src/components/molecules/news/MarketIndex.tsx)
│   │   │   │   ├── [OpinionColumn.tsx](./src/components/molecules/news/OpinionColumn.tsx)
│   │   │   │   ├── [PhotoStory.tsx](./src/components/molecules/news/PhotoStory.tsx)
│   │   │   │   ├── [ScoreBoard.tsx](./src/components/molecules/news/ScoreBoard.tsx)
│   │   │   │   ├── [SportsScoreCard.tsx](./src/components/molecules/news/SportsScoreCard.tsx)
│   │   │   │   ├── [TrendingList.tsx](./src/components/molecules/news/TrendingList.tsx)
│   │   │   │   ├── [VideoStory.tsx](./src/components/molecules/news/VideoStory.tsx)
│   │   │   │   ├── [WeatherCard.tsx](./src/components/molecules/news/WeatherCard.tsx)
│   │   │   │   └── [index.ts](./src/components/molecules/news/index.ts)
│   │   │   ├── social/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Backdrop.test.tsx](./src/components/molecules/social/__tests__/Backdrop.test.tsx)
│   │   │   │   │   ├── [BottomNavigation.test.tsx](./src/components/molecules/social/__tests__/BottomNavigation.test.tsx)
│   │   │   │   │   ├── [CommentList.test.tsx](./src/components/molecules/social/__tests__/CommentList.test.tsx)
│   │   │   │   │   ├── [EventCard.test.tsx](./src/components/molecules/social/__tests__/EventCard.test.tsx)
│   │   │   │   │   ├── [FloatingActionButton.test.tsx](./src/components/molecules/social/__tests__/FloatingActionButton.test.tsx)
│   │   │   │   │   ├── [FriendRequest.test.tsx](./src/components/molecules/social/__tests__/FriendRequest.test.tsx)
│   │   │   │   │   ├── [GroupCard.test.tsx](./src/components/molecules/social/__tests__/GroupCard.test.tsx)
│   │   │   │   │   ├── [LikeButton.test.tsx](./src/components/molecules/social/__tests__/LikeButton.test.tsx)
│   │   │   │   │   ├── [MessagePreview.test.tsx](./src/components/molecules/social/__tests__/MessagePreview.test.tsx)
│   │   │   │   │   ├── [NotificationItem.test.tsx](./src/components/molecules/social/__tests__/NotificationItem.test.tsx)
│   │   │   │   │   ├── [PostCard.test.tsx](./src/components/molecules/social/__tests__/PostCard.test.tsx)
│   │   │   │   │   ├── [ProfileHeader.test.tsx](./src/components/molecules/social/__tests__/ProfileHeader.test.tsx)
│   │   │   │   │   ├── [ReactionPicker.test.tsx](./src/components/molecules/social/__tests__/ReactionPicker.test.tsx)
│   │   │   │   │   ├── [ShareRow.test.tsx](./src/components/molecules/social/__tests__/ShareRow.test.tsx)
│   │   │   │   │   ├── [StoryStrip.test.tsx](./src/components/molecules/social/__tests__/StoryStrip.test.tsx)
│   │   │   │   │   └── [SuggestionCard.test.tsx](./src/components/molecules/social/__tests__/SuggestionCard.test.tsx)
│   │   │   │   ├── [Backdrop.tsx](./src/components/molecules/social/Backdrop.tsx)
│   │   │   │   ├── [BottomNavigation.tsx](./src/components/molecules/social/BottomNavigation.tsx)
│   │   │   │   ├── [CommentList.tsx](./src/components/molecules/social/CommentList.tsx)
│   │   │   │   ├── [EventCard.tsx](./src/components/molecules/social/EventCard.tsx)
│   │   │   │   ├── [FloatingActionButton.tsx](./src/components/molecules/social/FloatingActionButton.tsx)
│   │   │   │   ├── [FriendRequest.tsx](./src/components/molecules/social/FriendRequest.tsx)
│   │   │   │   ├── [GroupCard.tsx](./src/components/molecules/social/GroupCard.tsx)
│   │   │   │   ├── [LikeButton.tsx](./src/components/molecules/social/LikeButton.tsx)
│   │   │   │   ├── [MessagePreview.tsx](./src/components/molecules/social/MessagePreview.tsx)
│   │   │   │   ├── [NotificationItem.tsx](./src/components/molecules/social/NotificationItem.tsx)
│   │   │   │   ├── [PostCard.tsx](./src/components/molecules/social/PostCard.tsx)
│   │   │   │   ├── [ProfileHeader.tsx](./src/components/molecules/social/ProfileHeader.tsx)
│   │   │   │   ├── [ReactionPicker.tsx](./src/components/molecules/social/ReactionPicker.tsx)
│   │   │   │   ├── [ShareRow.tsx](./src/components/molecules/social/ShareRow.tsx)
│   │   │   │   ├── [StoryStrip.tsx](./src/components/molecules/social/StoryStrip.tsx)
│   │   │   │   ├── [SuggestionCard.tsx](./src/components/molecules/social/SuggestionCard.tsx)
│   │   │   │   └── [index.ts](./src/components/molecules/social/index.ts)
│   │   │   ├── store/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [BundleCard.test.tsx](./src/components/molecules/store/__tests__/BundleCard.test.tsx)
│   │   │   │   │   ├── [CartItem.test.tsx](./src/components/molecules/store/__tests__/CartItem.test.tsx)
│   │   │   │   │   ├── [CategoryCard.test.tsx](./src/components/molecules/store/__tests__/CategoryCard.test.tsx)
│   │   │   │   │   ├── [CheckoutSummary.test.tsx](./src/components/molecules/store/__tests__/CheckoutSummary.test.tsx)
│   │   │   │   │   ├── [ColorSwatch.test.tsx](./src/components/molecules/store/__tests__/ColorSwatch.test.tsx)
│   │   │   │   │   ├── [CompareTable.test.tsx](./src/components/molecules/store/__tests__/CompareTable.test.tsx)
│   │   │   │   │   ├── [CouponBox.test.tsx](./src/components/molecules/store/__tests__/CouponBox.test.tsx)
│   │   │   │   │   ├── [OrderSummary.test.tsx](./src/components/molecules/store/__tests__/OrderSummary.test.tsx)
│   │   │   │   │   ├── [ProductCard.test.tsx](./src/components/molecules/store/__tests__/ProductCard.test.tsx)
│   │   │   │   │   ├── [ProductRow.test.tsx](./src/components/molecules/store/__tests__/ProductRow.test.tsx)
│   │   │   │   │   ├── [ShippingInfo.test.tsx](./src/components/molecules/store/__tests__/ShippingInfo.test.tsx)
│   │   │   │   │   ├── [SizePicker.test.tsx](./src/components/molecules/store/__tests__/SizePicker.test.tsx)
│   │   │   │   │   ├── [StockBadge.test.tsx](./src/components/molecules/store/__tests__/StockBadge.test.tsx)
│   │   │   │   │   ├── [StoreCard.test.tsx](./src/components/molecules/store/__tests__/StoreCard.test.tsx)
│   │   │   │   │   ├── [StoreReviewCard.test.tsx](./src/components/molecules/store/__tests__/StoreReviewCard.test.tsx)
│   │   │   │   │   └── [WishlistItem.test.tsx](./src/components/molecules/store/__tests__/WishlistItem.test.tsx)
│   │   │   │   ├── [BundleCard.tsx](./src/components/molecules/store/BundleCard.tsx)
│   │   │   │   ├── [CartItem.tsx](./src/components/molecules/store/CartItem.tsx)
│   │   │   │   ├── [CategoryCard.tsx](./src/components/molecules/store/CategoryCard.tsx)
│   │   │   │   ├── [CheckoutSummary.tsx](./src/components/molecules/store/CheckoutSummary.tsx)
│   │   │   │   ├── [ColorSwatch.tsx](./src/components/molecules/store/ColorSwatch.tsx)
│   │   │   │   ├── [CompareTable.tsx](./src/components/molecules/store/CompareTable.tsx)
│   │   │   │   ├── [CouponBox.tsx](./src/components/molecules/store/CouponBox.tsx)
│   │   │   │   ├── [OrderSummary.tsx](./src/components/molecules/store/OrderSummary.tsx)
│   │   │   │   ├── [ProductCard.tsx](./src/components/molecules/store/ProductCard.tsx)
│   │   │   │   ├── [ProductRow.tsx](./src/components/molecules/store/ProductRow.tsx)
│   │   │   │   ├── [ShippingInfo.tsx](./src/components/molecules/store/ShippingInfo.tsx)
│   │   │   │   ├── [SizePicker.tsx](./src/components/molecules/store/SizePicker.tsx)
│   │   │   │   ├── [StockBadge.tsx](./src/components/molecules/store/StockBadge.tsx)
│   │   │   │   ├── [StoreCard.tsx](./src/components/molecules/store/StoreCard.tsx)
│   │   │   │   ├── [StoreReviewCard.tsx](./src/components/molecules/store/StoreReviewCard.tsx)
│   │   │   │   ├── [WishlistItem.tsx](./src/components/molecules/store/WishlistItem.tsx)
│   │   │   │   └── [index.ts](./src/components/molecules/store/index.ts)
│   │   │   ├── support/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Accordion.test.tsx](./src/components/molecules/support/__tests__/Accordion.test.tsx)
│   │   │   │   │   ├── [Breadcrumbs.test.tsx](./src/components/molecules/support/__tests__/Breadcrumbs.test.tsx)
│   │   │   │   │   ├── [Card.test.tsx](./src/components/molecules/support/__tests__/Card.test.tsx)
│   │   │   │   │   ├── [Dialog.test.tsx](./src/components/molecules/support/__tests__/Dialog.test.tsx)
│   │   │   │   │   ├── [Drawer.test.tsx](./src/components/molecules/support/__tests__/Drawer.test.tsx)
│   │   │   │   │   ├── [List.test.tsx](./src/components/molecules/support/__tests__/List.test.tsx)
│   │   │   │   │   ├── [Masonry.test.tsx](./src/components/molecules/support/__tests__/Masonry.test.tsx)
│   │   │   │   │   ├── [MenuGroup.test.tsx](./src/components/molecules/support/__tests__/MenuGroup.test.tsx)
│   │   │   │   │   ├── [Modal.test.tsx](./src/components/molecules/support/__tests__/Modal.test.tsx)
│   │   │   │   │   ├── [Popover.test.tsx](./src/components/molecules/support/__tests__/Popover.test.tsx)
│   │   │   │   │   ├── [ScrollArea.test.tsx](./src/components/molecules/support/__tests__/ScrollArea.test.tsx)
│   │   │   │   │   ├── [Sheet.test.tsx](./src/components/molecules/support/__tests__/Sheet.test.tsx)
│   │   │   │   │   ├── [Steps.test.tsx](./src/components/molecules/support/__tests__/Steps.test.tsx)
│   │   │   │   │   ├── [Table.test.tsx](./src/components/molecules/support/__tests__/Table.test.tsx)
│   │   │   │   │   ├── [Tabs.test.tsx](./src/components/molecules/support/__tests__/Tabs.test.tsx)
│   │   │   │   │   ├── [Timeline.test.tsx](./src/components/molecules/support/__tests__/Timeline.test.tsx)
│   │   │   │   │   └── [Toast.test.tsx](./src/components/molecules/support/__tests__/Toast.test.tsx)
│   │   │   │   ├── [Accordion.tsx](./src/components/molecules/support/Accordion.tsx)
│   │   │   │   ├── [Breadcrumbs.tsx](./src/components/molecules/support/Breadcrumbs.tsx)
│   │   │   │   ├── [Card.tsx](./src/components/molecules/support/Card.tsx)
│   │   │   │   ├── [Dialog.tsx](./src/components/molecules/support/Dialog.tsx)
│   │   │   │   ├── [Drawer.tsx](./src/components/molecules/support/Drawer.tsx)
│   │   │   │   ├── [List.tsx](./src/components/molecules/support/List.tsx)
│   │   │   │   ├── [Masonry.tsx](./src/components/molecules/support/Masonry.tsx)
│   │   │   │   ├── [MenuGroup.tsx](./src/components/molecules/support/MenuGroup.tsx)
│   │   │   │   ├── [Modal.tsx](./src/components/molecules/support/Modal.tsx)
│   │   │   │   ├── [Popover.tsx](./src/components/molecules/support/Popover.tsx)
│   │   │   │   ├── [ScrollArea.tsx](./src/components/molecules/support/ScrollArea.tsx)
│   │   │   │   ├── [Sheet.tsx](./src/components/molecules/support/Sheet.tsx)
│   │   │   │   ├── [Steps.tsx](./src/components/molecules/support/Steps.tsx)
│   │   │   │   ├── [Table.tsx](./src/components/molecules/support/Table.tsx)
│   │   │   │   ├── [Tabs.tsx](./src/components/molecules/support/Tabs.tsx)
│   │   │   │   ├── [Timeline.tsx](./src/components/molecules/support/Timeline.tsx)
│   │   │   │   ├── [Toast.tsx](./src/components/molecules/support/Toast.tsx)
│   │   │   │   └── [index.ts](./src/components/molecules/support/index.ts)
│   │   │   ├── travel/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AmenityList.test.tsx](./src/components/molecules/travel/__tests__/AmenityList.test.tsx)
│   │   │   │   │   ├── [AttractionCard.test.tsx](./src/components/molecules/travel/__tests__/AttractionCard.test.tsx)
│   │   │   │   │   ├── [BookingCard.test.tsx](./src/components/molecules/travel/__tests__/BookingCard.test.tsx)
│   │   │   │   │   ├── [ChecklistCard.test.tsx](./src/components/molecules/travel/__tests__/ChecklistCard.test.tsx)
│   │   │   │   │   ├── [DestinationCard.test.tsx](./src/components/molecules/travel/__tests__/DestinationCard.test.tsx)
│   │   │   │   │   ├── [FlightCard.test.tsx](./src/components/molecules/travel/__tests__/FlightCard.test.tsx)
│   │   │   │   │   ├── [HotelCard.test.tsx](./src/components/molecules/travel/__tests__/HotelCard.test.tsx)
│   │   │   │   │   ├── [ItineraryList.test.tsx](./src/components/molecules/travel/__tests__/ItineraryList.test.tsx)
│   │   │   │   │   ├── [LoyaltyCard.test.tsx](./src/components/molecules/travel/__tests__/LoyaltyCard.test.tsx)
│   │   │   │   │   ├── [MapPreview.test.tsx](./src/components/molecules/travel/__tests__/MapPreview.test.tsx)
│   │   │   │   │   ├── [PriceBreakdown.test.tsx](./src/components/molecules/travel/__tests__/PriceBreakdown.test.tsx)
│   │   │   │   │   ├── [ReviewSummary.test.tsx](./src/components/molecules/travel/__tests__/ReviewSummary.test.tsx)
│   │   │   │   │   ├── [SearchFilters.test.tsx](./src/components/molecules/travel/__tests__/SearchFilters.test.tsx)
│   │   │   │   │   ├── [TransportOption.test.tsx](./src/components/molecules/travel/__tests__/TransportOption.test.tsx)
│   │   │   │   │   ├── [TripSummary.test.tsx](./src/components/molecules/travel/__tests__/TripSummary.test.tsx)
│   │   │   │   │   └── [WeatherForecast.test.tsx](./src/components/molecules/travel/__tests__/WeatherForecast.test.tsx)
│   │   │   │   ├── [AmenityList.tsx](./src/components/molecules/travel/AmenityList.tsx)
│   │   │   │   ├── [AttractionCard.tsx](./src/components/molecules/travel/AttractionCard.tsx)
│   │   │   │   ├── [BookingCard.tsx](./src/components/molecules/travel/BookingCard.tsx)
│   │   │   │   ├── [ChecklistCard.tsx](./src/components/molecules/travel/ChecklistCard.tsx)
│   │   │   │   ├── [DestinationCard.tsx](./src/components/molecules/travel/DestinationCard.tsx)
│   │   │   │   ├── [FlightCard.tsx](./src/components/molecules/travel/FlightCard.tsx)
│   │   │   │   ├── [HotelCard.tsx](./src/components/molecules/travel/HotelCard.tsx)
│   │   │   │   ├── [ItineraryList.tsx](./src/components/molecules/travel/ItineraryList.tsx)
│   │   │   │   ├── [LoyaltyCard.tsx](./src/components/molecules/travel/LoyaltyCard.tsx)
│   │   │   │   ├── [MapPreview.tsx](./src/components/molecules/travel/MapPreview.tsx)
│   │   │   │   ├── [PriceBreakdown.tsx](./src/components/molecules/travel/PriceBreakdown.tsx)
│   │   │   │   ├── [ReviewSummary.tsx](./src/components/molecules/travel/ReviewSummary.tsx)
│   │   │   │   ├── [SearchFilters.tsx](./src/components/molecules/travel/SearchFilters.tsx)
│   │   │   │   ├── [TransportOption.tsx](./src/components/molecules/travel/TransportOption.tsx)
│   │   │   │   ├── [TripSummary.tsx](./src/components/molecules/travel/TripSummary.tsx)
│   │   │   │   ├── [WeatherForecast.tsx](./src/components/molecules/travel/WeatherForecast.tsx)
│   │   │   │   └── [index.ts](./src/components/molecules/travel/index.ts)
│   │   │   └── [index.ts](./src/components/molecules/index.ts)
│   │   ├── organisms/
│   │   │   ├── app/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AnnouncementStrip.test.tsx](./src/components/organisms/app/__tests__/AnnouncementStrip.test.tsx)
│   │   │   │   │   ├── [AppShell.test.tsx](./src/components/organisms/app/__tests__/AppShell.test.tsx)
│   │   │   │   │   ├── [BillingPanel.test.tsx](./src/components/organisms/app/__tests__/BillingPanel.test.tsx)
│   │   │   │   │   ├── [DashboardWidget.test.tsx](./src/components/organisms/app/__tests__/DashboardWidget.test.tsx)
│   │   │   │   │   ├── [MetricBar.test.tsx](./src/components/organisms/app/__tests__/MetricBar.test.tsx)
│   │   │   │   │   ├── [NotificationDrawer.test.tsx](./src/components/organisms/app/__tests__/NotificationDrawer.test.tsx)
│   │   │   │   │   ├── [OnboardingFlow.test.tsx](./src/components/organisms/app/__tests__/OnboardingFlow.test.tsx)
│   │   │   │   │   ├── [ProjectTimeline.test.tsx](./src/components/organisms/app/__tests__/ProjectTimeline.test.tsx)
│   │   │   │   │   ├── [QuickActions.test.tsx](./src/components/organisms/app/__tests__/QuickActions.test.tsx)
│   │   │   │   │   ├── [RecentActivity.test.tsx](./src/components/organisms/app/__tests__/RecentActivity.test.tsx)
│   │   │   │   │   ├── [SearchOverlay.test.tsx](./src/components/organisms/app/__tests__/SearchOverlay.test.tsx)
│   │   │   │   │   ├── [SettingsPanel.test.tsx](./src/components/organisms/app/__tests__/SettingsPanel.test.tsx)
│   │   │   │   │   ├── [StatusOverview.test.tsx](./src/components/organisms/app/__tests__/StatusOverview.test.tsx)
│   │   │   │   │   ├── [TeamRoster.test.tsx](./src/components/organisms/app/__tests__/TeamRoster.test.tsx)
│   │   │   │   │   ├── [UserMenu.test.tsx](./src/components/organisms/app/__tests__/UserMenu.test.tsx)
│   │   │   │   │   └── [WorkspaceGrid.test.tsx](./src/components/organisms/app/__tests__/WorkspaceGrid.test.tsx)
│   │   │   │   ├── [AnnouncementStrip.tsx](./src/components/organisms/app/AnnouncementStrip.tsx)
│   │   │   │   ├── [AppShell.tsx](./src/components/organisms/app/AppShell.tsx)
│   │   │   │   ├── [BillingPanel.tsx](./src/components/organisms/app/BillingPanel.tsx)
│   │   │   │   ├── [DashboardWidget.tsx](./src/components/organisms/app/DashboardWidget.tsx)
│   │   │   │   ├── [MetricBar.tsx](./src/components/organisms/app/MetricBar.tsx)
│   │   │   │   ├── [NotificationDrawer.tsx](./src/components/organisms/app/NotificationDrawer.tsx)
│   │   │   │   ├── [OnboardingFlow.tsx](./src/components/organisms/app/OnboardingFlow.tsx)
│   │   │   │   ├── [ProjectTimeline.tsx](./src/components/organisms/app/ProjectTimeline.tsx)
│   │   │   │   ├── [QuickActions.tsx](./src/components/organisms/app/QuickActions.tsx)
│   │   │   │   ├── [RecentActivity.tsx](./src/components/organisms/app/RecentActivity.tsx)
│   │   │   │   ├── [SearchOverlay.tsx](./src/components/organisms/app/SearchOverlay.tsx)
│   │   │   │   ├── [SettingsPanel.tsx](./src/components/organisms/app/SettingsPanel.tsx)
│   │   │   │   ├── [StatusOverview.tsx](./src/components/organisms/app/StatusOverview.tsx)
│   │   │   │   ├── [TeamRoster.tsx](./src/components/organisms/app/TeamRoster.tsx)
│   │   │   │   ├── [UserMenu.tsx](./src/components/organisms/app/UserMenu.tsx)
│   │   │   │   ├── [WorkspaceGrid.tsx](./src/components/organisms/app/WorkspaceGrid.tsx)
│   │   │   │   └── [index.ts](./src/components/organisms/app/index.ts)
│   │   │   ├── auth/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AccountMenu.test.tsx](./src/components/organisms/auth/__tests__/AccountMenu.test.tsx)
│   │   │   │   │   ├── [AccountRecovery.test.tsx](./src/components/organisms/auth/__tests__/AccountRecovery.test.tsx)
│   │   │   │   │   ├── [AnnouncementBar.test.tsx](./src/components/organisms/auth/__tests__/AnnouncementBar.test.tsx)
│   │   │   │   │   ├── [AuthForm.test.tsx](./src/components/organisms/auth/__tests__/AuthForm.test.tsx)
│   │   │   │   │   ├── [AuthLayout.test.tsx](./src/components/organisms/auth/__tests__/AuthLayout.test.tsx)
│   │   │   │   │   ├── [CookieBanner.test.tsx](./src/components/organisms/auth/__tests__/CookieBanner.test.tsx)
│   │   │   │   │   ├── [InviteTeam.test.tsx](./src/components/organisms/auth/__tests__/InviteTeam.test.tsx)
│   │   │   │   │   ├── [MfaSetup.test.tsx](./src/components/organisms/auth/__tests__/MfaSetup.test.tsx)
│   │   │   │   │   ├── [NotificationCenter.test.tsx](./src/components/organisms/auth/__tests__/NotificationCenter.test.tsx)
│   │   │   │   │   ├── [OtpVerify.test.tsx](./src/components/organisms/auth/__tests__/OtpVerify.test.tsx)
│   │   │   │   │   ├── [PasswordResetForm.test.tsx](./src/components/organisms/auth/__tests__/PasswordResetForm.test.tsx)
│   │   │   │   │   ├── [PermissionMatrix.test.tsx](./src/components/organisms/auth/__tests__/PermissionMatrix.test.tsx)
│   │   │   │   │   ├── [SessionTimeout.test.tsx](./src/components/organisms/auth/__tests__/SessionTimeout.test.tsx)
│   │   │   │   │   ├── [SignInForm.test.tsx](./src/components/organisms/auth/__tests__/SignInForm.test.tsx)
│   │   │   │   │   ├── [SignUpForm.test.tsx](./src/components/organisms/auth/__tests__/SignUpForm.test.tsx)
│   │   │   │   │   └── [SocialAuthRow.test.tsx](./src/components/organisms/auth/__tests__/SocialAuthRow.test.tsx)
│   │   │   │   ├── [AccountMenu.tsx](./src/components/organisms/auth/AccountMenu.tsx)
│   │   │   │   ├── [AccountRecovery.tsx](./src/components/organisms/auth/AccountRecovery.tsx)
│   │   │   │   ├── [AnnouncementBar.tsx](./src/components/organisms/auth/AnnouncementBar.tsx)
│   │   │   │   ├── [AuthForm.tsx](./src/components/organisms/auth/AuthForm.tsx)
│   │   │   │   ├── [AuthLayout.tsx](./src/components/organisms/auth/AuthLayout.tsx)
│   │   │   │   ├── [CookieBanner.tsx](./src/components/organisms/auth/CookieBanner.tsx)
│   │   │   │   ├── [InviteTeam.tsx](./src/components/organisms/auth/InviteTeam.tsx)
│   │   │   │   ├── [MfaSetup.tsx](./src/components/organisms/auth/MfaSetup.tsx)
│   │   │   │   ├── [NotificationCenter.tsx](./src/components/organisms/auth/NotificationCenter.tsx)
│   │   │   │   ├── [OtpVerify.tsx](./src/components/organisms/auth/OtpVerify.tsx)
│   │   │   │   ├── [PasswordResetForm.tsx](./src/components/organisms/auth/PasswordResetForm.tsx)
│   │   │   │   ├── [PermissionMatrix.tsx](./src/components/organisms/auth/PermissionMatrix.tsx)
│   │   │   │   ├── [SessionTimeout.tsx](./src/components/organisms/auth/SessionTimeout.tsx)
│   │   │   │   ├── [SignInForm.tsx](./src/components/organisms/auth/SignInForm.tsx)
│   │   │   │   ├── [SignUpForm.tsx](./src/components/organisms/auth/SignUpForm.tsx)
│   │   │   │   ├── [SocialAuthRow.tsx](./src/components/organisms/auth/SocialAuthRow.tsx)
│   │   │   │   └── [index.ts](./src/components/organisms/auth/index.ts)
│   │   │   ├── blog/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [ArticleList.test.tsx](./src/components/organisms/blog/__tests__/ArticleList.test.tsx)
│   │   │   │   │   ├── [AuthorProfile.test.tsx](./src/components/organisms/blog/__tests__/AuthorProfile.test.tsx)
│   │   │   │   │   ├── [BlogSection.test.tsx](./src/components/organisms/blog/__tests__/BlogSection.test.tsx)
│   │   │   │   │   ├── [CategorySection.test.tsx](./src/components/organisms/blog/__tests__/CategorySection.test.tsx)
│   │   │   │   │   ├── [CourseLanding.test.tsx](./src/components/organisms/blog/__tests__/CourseLanding.test.tsx)
│   │   │   │   │   ├── [EditorialStrip.test.tsx](./src/components/organisms/blog/__tests__/EditorialStrip.test.tsx)
│   │   │   │   │   ├── [FAQSection.test.tsx](./src/components/organisms/blog/__tests__/FAQSection.test.tsx)
│   │   │   │   │   ├── [FaqAccordion.test.tsx](./src/components/organisms/blog/__tests__/FaqAccordion.test.tsx)
│   │   │   │   │   ├── [FeaturedStory.test.tsx](./src/components/organisms/blog/__tests__/FeaturedStory.test.tsx)
│   │   │   │   │   ├── [GalleryGrid.test.tsx](./src/components/organisms/blog/__tests__/GalleryGrid.test.tsx)
│   │   │   │   │   ├── [LessonNavigation.test.tsx](./src/components/organisms/blog/__tests__/LessonNavigation.test.tsx)
│   │   │   │   │   ├── [NewsletterBanner.test.tsx](./src/components/organisms/blog/__tests__/NewsletterBanner.test.tsx)
│   │   │   │   │   ├── [PinnedPost.test.tsx](./src/components/organisms/blog/__tests__/PinnedPost.test.tsx)
│   │   │   │   │   ├── [QuizSection.test.tsx](./src/components/organisms/blog/__tests__/QuizSection.test.tsx)
│   │   │   │   │   ├── [QuoteShowcase.test.tsx](./src/components/organisms/blog/__tests__/QuoteShowcase.test.tsx)
│   │   │   │   │   └── [RecipeCollection.test.tsx](./src/components/organisms/blog/__tests__/RecipeCollection.test.tsx)
│   │   │   │   ├── [ArticleList.tsx](./src/components/organisms/blog/ArticleList.tsx)
│   │   │   │   ├── [AuthorProfile.tsx](./src/components/organisms/blog/AuthorProfile.tsx)
│   │   │   │   ├── [BlogSection.tsx](./src/components/organisms/blog/BlogSection.tsx)
│   │   │   │   ├── [CategorySection.tsx](./src/components/organisms/blog/CategorySection.tsx)
│   │   │   │   ├── [CourseLanding.tsx](./src/components/organisms/blog/CourseLanding.tsx)
│   │   │   │   ├── [EditorialStrip.tsx](./src/components/organisms/blog/EditorialStrip.tsx)
│   │   │   │   ├── [FAQSection.tsx](./src/components/organisms/blog/FAQSection.tsx)
│   │   │   │   ├── [FaqAccordion.tsx](./src/components/organisms/blog/FaqAccordion.tsx)
│   │   │   │   ├── [FeaturedStory.tsx](./src/components/organisms/blog/FeaturedStory.tsx)
│   │   │   │   ├── [GalleryGrid.tsx](./src/components/organisms/blog/GalleryGrid.tsx)
│   │   │   │   ├── [LessonNavigation.tsx](./src/components/organisms/blog/LessonNavigation.tsx)
│   │   │   │   ├── [NewsletterBanner.tsx](./src/components/organisms/blog/NewsletterBanner.tsx)
│   │   │   │   ├── [PinnedPost.tsx](./src/components/organisms/blog/PinnedPost.tsx)
│   │   │   │   ├── [QuizSection.tsx](./src/components/organisms/blog/QuizSection.tsx)
│   │   │   │   ├── [QuoteShowcase.tsx](./src/components/organisms/blog/QuoteShowcase.tsx)
│   │   │   │   ├── [RecipeCollection.tsx](./src/components/organisms/blog/RecipeCollection.tsx)
│   │   │   │   └── [index.ts](./src/components/organisms/blog/index.ts)
│   │   │   ├── crm/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [ActivityFeed.test.tsx](./src/components/organisms/crm/__tests__/ActivityFeed.test.tsx)
│   │   │   │   │   ├── [CustomerJourney.test.tsx](./src/components/organisms/crm/__tests__/CustomerJourney.test.tsx)
│   │   │   │   │   ├── [DealRoom.test.tsx](./src/components/organisms/crm/__tests__/DealRoom.test.tsx)
│   │   │   │   │   ├── [InfoCards.test.tsx](./src/components/organisms/crm/__tests__/InfoCards.test.tsx)
│   │   │   │   │   ├── [IntegrationsSection.test.tsx](./src/components/organisms/crm/__tests__/IntegrationsSection.test.tsx)
│   │   │   │   │   ├── [InvoiceSection.test.tsx](./src/components/organisms/crm/__tests__/InvoiceSection.test.tsx)
│   │   │   │   │   ├── [KanbanBoard.test.tsx](./src/components/organisms/crm/__tests__/KanbanBoard.test.tsx)
│   │   │   │   │   ├── [LeadCapture.test.tsx](./src/components/organisms/crm/__tests__/LeadCapture.test.tsx)
│   │   │   │   │   ├── [Leaderboard.test.tsx](./src/components/organisms/crm/__tests__/Leaderboard.test.tsx)
│   │   │   │   │   ├── [LogosSection.test.tsx](./src/components/organisms/crm/__tests__/LogosSection.test.tsx)
│   │   │   │   │   ├── [OrderHistory.test.tsx](./src/components/organisms/crm/__tests__/OrderHistory.test.tsx)
│   │   │   │   │   ├── [PricingCard.test.tsx](./src/components/organisms/crm/__tests__/PricingCard.test.tsx)
│   │   │   │   │   ├── [ProductGrid.test.tsx](./src/components/organisms/crm/__tests__/ProductGrid.test.tsx)
│   │   │   │   │   ├── [ProfileCard.test.tsx](./src/components/organisms/crm/__tests__/ProfileCard.test.tsx)
│   │   │   │   │   ├── [SalesPipeline.test.tsx](./src/components/organisms/crm/__tests__/SalesPipeline.test.tsx)
│   │   │   │   │   └── [SupportInbox.test.tsx](./src/components/organisms/crm/__tests__/SupportInbox.test.tsx)
│   │   │   │   ├── [ActivityFeed.tsx](./src/components/organisms/crm/ActivityFeed.tsx)
│   │   │   │   ├── [CustomerJourney.tsx](./src/components/organisms/crm/CustomerJourney.tsx)
│   │   │   │   ├── [DealRoom.tsx](./src/components/organisms/crm/DealRoom.tsx)
│   │   │   │   ├── [InfoCards.tsx](./src/components/organisms/crm/InfoCards.tsx)
│   │   │   │   ├── [IntegrationsSection.tsx](./src/components/organisms/crm/IntegrationsSection.tsx)
│   │   │   │   ├── [InvoiceSection.tsx](./src/components/organisms/crm/InvoiceSection.tsx)
│   │   │   │   ├── [KanbanBoard.tsx](./src/components/organisms/crm/KanbanBoard.tsx)
│   │   │   │   ├── [LeadCapture.tsx](./src/components/organisms/crm/LeadCapture.tsx)
│   │   │   │   ├── [Leaderboard.tsx](./src/components/organisms/crm/Leaderboard.tsx)
│   │   │   │   ├── [LogosSection.tsx](./src/components/organisms/crm/LogosSection.tsx)
│   │   │   │   ├── [OrderHistory.tsx](./src/components/organisms/crm/OrderHistory.tsx)
│   │   │   │   ├── [PricingCard.tsx](./src/components/organisms/crm/PricingCard.tsx)
│   │   │   │   ├── [ProductGrid.tsx](./src/components/organisms/crm/ProductGrid.tsx)
│   │   │   │   ├── [ProfileCard.tsx](./src/components/organisms/crm/ProfileCard.tsx)
│   │   │   │   ├── [SalesPipeline.tsx](./src/components/organisms/crm/SalesPipeline.tsx)
│   │   │   │   ├── [SupportInbox.tsx](./src/components/organisms/crm/SupportInbox.tsx)
│   │   │   │   └── [index.ts](./src/components/organisms/crm/index.ts)
│   │   │   ├── developer/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [ApiPlayground.test.tsx](./src/components/organisms/developer/__tests__/ApiPlayground.test.tsx)
│   │   │   │   │   ├── [BranchManager.test.tsx](./src/components/organisms/developer/__tests__/BranchManager.test.tsx)
│   │   │   │   │   ├── [ChangelogFeed.test.tsx](./src/components/organisms/developer/__tests__/ChangelogFeed.test.tsx)
│   │   │   │   │   ├── [CodeExplorer.test.tsx](./src/components/organisms/developer/__tests__/CodeExplorer.test.tsx)
│   │   │   │   │   ├── [ComparisonSection.test.tsx](./src/components/organisms/developer/__tests__/ComparisonSection.test.tsx)
│   │   │   │   │   ├── [DeployPipeline.test.tsx](./src/components/organisms/developer/__tests__/DeployPipeline.test.tsx)
│   │   │   │   │   ├── [DevServerStatus.test.tsx](./src/components/organisms/developer/__tests__/DevServerStatus.test.tsx)
│   │   │   │   │   ├── [DocumentationView.test.tsx](./src/components/organisms/developer/__tests__/DocumentationView.test.tsx)
│   │   │   │   │   ├── [EnvironmentSelector.test.tsx](./src/components/organisms/developer/__tests__/EnvironmentSelector.test.tsx)
│   │   │   │   │   ├── [GitCommitFeed.test.tsx](./src/components/organisms/developer/__tests__/GitCommitFeed.test.tsx)
│   │   │   │   │   ├── [LogViewer.test.tsx](./src/components/organisms/developer/__tests__/LogViewer.test.tsx)
│   │   │   │   │   ├── [Marquee.test.tsx](./src/components/organisms/developer/__tests__/Marquee.test.tsx)
│   │   │   │   │   ├── [MetricsDashboard.test.tsx](./src/components/organisms/developer/__tests__/MetricsDashboard.test.tsx)
│   │   │   │   │   ├── [PackageManager.test.tsx](./src/components/organisms/developer/__tests__/PackageManager.test.tsx)
│   │   │   │   │   ├── [TerminalPanel.test.tsx](./src/components/organisms/developer/__tests__/TerminalPanel.test.tsx)
│   │   │   │   │   └── [TestRunner.test.tsx](./src/components/organisms/developer/__tests__/TestRunner.test.tsx)
│   │   │   │   ├── [ApiPlayground.tsx](./src/components/organisms/developer/ApiPlayground.tsx)
│   │   │   │   ├── [BranchManager.tsx](./src/components/organisms/developer/BranchManager.tsx)
│   │   │   │   ├── [ChangelogFeed.tsx](./src/components/organisms/developer/ChangelogFeed.tsx)
│   │   │   │   ├── [CodeExplorer.tsx](./src/components/organisms/developer/CodeExplorer.tsx)
│   │   │   │   ├── [ComparisonSection.tsx](./src/components/organisms/developer/ComparisonSection.tsx)
│   │   │   │   ├── [DeployPipeline.tsx](./src/components/organisms/developer/DeployPipeline.tsx)
│   │   │   │   ├── [DevServerStatus.tsx](./src/components/organisms/developer/DevServerStatus.tsx)
│   │   │   │   ├── [DocumentationView.tsx](./src/components/organisms/developer/DocumentationView.tsx)
│   │   │   │   ├── [EnvironmentSelector.tsx](./src/components/organisms/developer/EnvironmentSelector.tsx)
│   │   │   │   ├── [GitCommitFeed.tsx](./src/components/organisms/developer/GitCommitFeed.tsx)
│   │   │   │   ├── [LogViewer.tsx](./src/components/organisms/developer/LogViewer.tsx)
│   │   │   │   ├── [Marquee.tsx](./src/components/organisms/developer/Marquee.tsx)
│   │   │   │   ├── [MetricsDashboard.tsx](./src/components/organisms/developer/MetricsDashboard.tsx)
│   │   │   │   ├── [PackageManager.tsx](./src/components/organisms/developer/PackageManager.tsx)
│   │   │   │   ├── [TerminalPanel.tsx](./src/components/organisms/developer/TerminalPanel.tsx)
│   │   │   │   ├── [TestRunner.tsx](./src/components/organisms/developer/TestRunner.tsx)
│   │   │   │   └── [index.ts](./src/components/organisms/developer/index.ts)
│   │   │   ├── finance/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AccountOverview.test.tsx](./src/components/organisms/finance/__tests__/AccountOverview.test.tsx)
│   │   │   │   │   ├── [BudgetOverview.test.tsx](./src/components/organisms/finance/__tests__/BudgetOverview.test.tsx)
│   │   │   │   │   ├── [CryptoPortfolio.test.tsx](./src/components/organisms/finance/__tests__/CryptoPortfolio.test.tsx)
│   │   │   │   │   ├── [ExpenseCategories.test.tsx](./src/components/organisms/finance/__tests__/ExpenseCategories.test.tsx)
│   │   │   │   │   ├── [FinancialHealth.test.tsx](./src/components/organisms/finance/__tests__/FinancialHealth.test.tsx)
│   │   │   │   │   ├── [InvestmentPortfolio.test.tsx](./src/components/organisms/finance/__tests__/InvestmentPortfolio.test.tsx)
│   │   │   │   │   ├── [InvoiceDashboard.test.tsx](./src/components/organisms/finance/__tests__/InvoiceDashboard.test.tsx)
│   │   │   │   │   ├── [LoanApplication.test.tsx](./src/components/organisms/finance/__tests__/LoanApplication.test.tsx)
│   │   │   │   │   ├── [MarketWatch.test.tsx](./src/components/organisms/finance/__tests__/MarketWatch.test.tsx)
│   │   │   │   │   ├── [PaymentMethods.test.tsx](./src/components/organisms/finance/__tests__/PaymentMethods.test.tsx)
│   │   │   │   │   ├── [RetirementPlanner.test.tsx](./src/components/organisms/finance/__tests__/RetirementPlanner.test.tsx)
│   │   │   │   │   ├── [SavingsGoals.test.tsx](./src/components/organisms/finance/__tests__/SavingsGoals.test.tsx)
│   │   │   │   │   ├── [SpendingTrends.test.tsx](./src/components/organisms/finance/__tests__/SpendingTrends.test.tsx)
│   │   │   │   │   ├── [SubscriptionManager.test.tsx](./src/components/organisms/finance/__tests__/SubscriptionManager.test.tsx)
│   │   │   │   │   ├── [TaxSummary.test.tsx](./src/components/organisms/finance/__tests__/TaxSummary.test.tsx)
│   │   │   │   │   └── [TransactionHistory.test.tsx](./src/components/organisms/finance/__tests__/TransactionHistory.test.tsx)
│   │   │   │   ├── [AccountOverview.tsx](./src/components/organisms/finance/AccountOverview.tsx)
│   │   │   │   ├── [BudgetOverview.tsx](./src/components/organisms/finance/BudgetOverview.tsx)
│   │   │   │   ├── [CryptoPortfolio.tsx](./src/components/organisms/finance/CryptoPortfolio.tsx)
│   │   │   │   ├── [ExpenseCategories.tsx](./src/components/organisms/finance/ExpenseCategories.tsx)
│   │   │   │   ├── [FinancialHealth.tsx](./src/components/organisms/finance/FinancialHealth.tsx)
│   │   │   │   ├── [InvestmentPortfolio.tsx](./src/components/organisms/finance/InvestmentPortfolio.tsx)
│   │   │   │   ├── [InvoiceDashboard.tsx](./src/components/organisms/finance/InvoiceDashboard.tsx)
│   │   │   │   ├── [LoanApplication.tsx](./src/components/organisms/finance/LoanApplication.tsx)
│   │   │   │   ├── [MarketWatch.tsx](./src/components/organisms/finance/MarketWatch.tsx)
│   │   │   │   ├── [PaymentMethods.tsx](./src/components/organisms/finance/PaymentMethods.tsx)
│   │   │   │   ├── [RetirementPlanner.tsx](./src/components/organisms/finance/RetirementPlanner.tsx)
│   │   │   │   ├── [SavingsGoals.tsx](./src/components/organisms/finance/SavingsGoals.tsx)
│   │   │   │   ├── [SpendingTrends.tsx](./src/components/organisms/finance/SpendingTrends.tsx)
│   │   │   │   ├── [SubscriptionManager.tsx](./src/components/organisms/finance/SubscriptionManager.tsx)
│   │   │   │   ├── [TaxSummary.tsx](./src/components/organisms/finance/TaxSummary.tsx)
│   │   │   │   ├── [TransactionHistory.tsx](./src/components/organisms/finance/TransactionHistory.tsx)
│   │   │   │   └── [index.ts](./src/components/organisms/finance/index.ts)
│   │   │   ├── health/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [ActivityCalendar.test.tsx](./src/components/organisms/health/__tests__/ActivityCalendar.test.tsx)
│   │   │   │   │   ├── [AppointmentBooking.test.tsx](./src/components/organisms/health/__tests__/AppointmentBooking.test.tsx)
│   │   │   │   │   ├── [CareTeam.test.tsx](./src/components/organisms/health/__tests__/CareTeam.test.tsx)
│   │   │   │   │   ├── [EmergencyContacts.test.tsx](./src/components/organisms/health/__tests__/EmergencyContacts.test.tsx)
│   │   │   │   │   ├── [FitnessGoals.test.tsx](./src/components/organisms/health/__tests__/FitnessGoals.test.tsx)
│   │   │   │   │   ├── [HealthDashboard.test.tsx](./src/components/organisms/health/__tests__/HealthDashboard.test.tsx)
│   │   │   │   │   ├── [HealthHistory.test.tsx](./src/components/organisms/health/__tests__/HealthHistory.test.tsx)
│   │   │   │   │   ├── [HydrationTracker.test.tsx](./src/components/organisms/health/__tests__/HydrationTracker.test.tsx)
│   │   │   │   │   ├── [MealPlanner.test.tsx](./src/components/organisms/health/__tests__/MealPlanner.test.tsx)
│   │   │   │   │   ├── [MedicationSchedule.test.tsx](./src/components/organisms/health/__tests__/MedicationSchedule.test.tsx)
│   │   │   │   │   ├── [NutritionalSummary.test.tsx](./src/components/organisms/health/__tests__/NutritionalSummary.test.tsx)
│   │   │   │   │   ├── [SleepInsights.test.tsx](./src/components/organisms/health/__tests__/SleepInsights.test.tsx)
│   │   │   │   │   ├── [SymptomTracker.test.tsx](./src/components/organisms/health/__tests__/SymptomTracker.test.tsx)
│   │   │   │   │   ├── [VitalsOverview.test.tsx](./src/components/organisms/health/__tests__/VitalsOverview.test.tsx)
│   │   │   │   │   ├── [WellnessScore.test.tsx](./src/components/organisms/health/__tests__/WellnessScore.test.tsx)
│   │   │   │   │   └── [WorkoutPlan.test.tsx](./src/components/organisms/health/__tests__/WorkoutPlan.test.tsx)
│   │   │   │   ├── [ActivityCalendar.tsx](./src/components/organisms/health/ActivityCalendar.tsx)
│   │   │   │   ├── [AppointmentBooking.tsx](./src/components/organisms/health/AppointmentBooking.tsx)
│   │   │   │   ├── [CareTeam.tsx](./src/components/organisms/health/CareTeam.tsx)
│   │   │   │   ├── [EmergencyContacts.tsx](./src/components/organisms/health/EmergencyContacts.tsx)
│   │   │   │   ├── [FitnessGoals.tsx](./src/components/organisms/health/FitnessGoals.tsx)
│   │   │   │   ├── [HealthDashboard.tsx](./src/components/organisms/health/HealthDashboard.tsx)
│   │   │   │   ├── [HealthHistory.tsx](./src/components/organisms/health/HealthHistory.tsx)
│   │   │   │   ├── [HydrationTracker.tsx](./src/components/organisms/health/HydrationTracker.tsx)
│   │   │   │   ├── [MealPlanner.tsx](./src/components/organisms/health/MealPlanner.tsx)
│   │   │   │   ├── [MedicationSchedule.tsx](./src/components/organisms/health/MedicationSchedule.tsx)
│   │   │   │   ├── [NutritionalSummary.tsx](./src/components/organisms/health/NutritionalSummary.tsx)
│   │   │   │   ├── [SleepInsights.tsx](./src/components/organisms/health/SleepInsights.tsx)
│   │   │   │   ├── [SymptomTracker.tsx](./src/components/organisms/health/SymptomTracker.tsx)
│   │   │   │   ├── [VitalsOverview.tsx](./src/components/organisms/health/VitalsOverview.tsx)
│   │   │   │   ├── [WellnessScore.tsx](./src/components/organisms/health/WellnessScore.tsx)
│   │   │   │   ├── [WorkoutPlan.tsx](./src/components/organisms/health/WorkoutPlan.tsx)
│   │   │   │   └── [index.ts](./src/components/organisms/health/index.ts)
│   │   │   ├── hr/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AttendanceDashboard.test.tsx](./src/components/organisms/hr/__tests__/AttendanceDashboard.test.tsx)
│   │   │   │   │   ├── [BenefitsPortal.test.tsx](./src/components/organisms/hr/__tests__/BenefitsPortal.test.tsx)
│   │   │   │   │   ├── [CandidatePipeline.test.tsx](./src/components/organisms/hr/__tests__/CandidatePipeline.test.tsx)
│   │   │   │   │   ├── [CompensationReview.test.tsx](./src/components/organisms/hr/__tests__/CompensationReview.test.tsx)
│   │   │   │   │   ├── [EmployeeDirectory.test.tsx](./src/components/organisms/hr/__tests__/EmployeeDirectory.test.tsx)
│   │   │   │   │   ├── [HiringFunnel.test.tsx](./src/components/organisms/hr/__tests__/HiringFunnel.test.tsx)
│   │   │   │   │   ├── [JobBoard.test.tsx](./src/components/organisms/hr/__tests__/JobBoard.test.tsx)
│   │   │   │   │   ├── [LeaveCalendar.test.tsx](./src/components/organisms/hr/__tests__/LeaveCalendar.test.tsx)
│   │   │   │   │   ├── [OnboardingProgram.test.tsx](./src/components/organisms/hr/__tests__/OnboardingProgram.test.tsx)
│   │   │   │   │   ├── [OrgStructure.test.tsx](./src/components/organisms/hr/__tests__/OrgStructure.test.tsx)
│   │   │   │   │   ├── [PayrollOverview.test.tsx](./src/components/organisms/hr/__tests__/PayrollOverview.test.tsx)
│   │   │   │   │   ├── [PerformanceReview.test.tsx](./src/components/organisms/hr/__tests__/PerformanceReview.test.tsx)
│   │   │   │   │   ├── [PolicyLibrary.test.tsx](./src/components/organisms/hr/__tests__/PolicyLibrary.test.tsx)
│   │   │   │   │   ├── [RecognitionFeed.test.tsx](./src/components/organisms/hr/__tests__/RecognitionFeed.test.tsx)
│   │   │   │   │   ├── [TimesheetDashboard.test.tsx](./src/components/organisms/hr/__tests__/TimesheetDashboard.test.tsx)
│   │   │   │   │   └── [TrainingCatalog.test.tsx](./src/components/organisms/hr/__tests__/TrainingCatalog.test.tsx)
│   │   │   │   ├── [AttendanceDashboard.tsx](./src/components/organisms/hr/AttendanceDashboard.tsx)
│   │   │   │   ├── [BenefitsPortal.tsx](./src/components/organisms/hr/BenefitsPortal.tsx)
│   │   │   │   ├── [CandidatePipeline.tsx](./src/components/organisms/hr/CandidatePipeline.tsx)
│   │   │   │   ├── [CompensationReview.tsx](./src/components/organisms/hr/CompensationReview.tsx)
│   │   │   │   ├── [EmployeeDirectory.tsx](./src/components/organisms/hr/EmployeeDirectory.tsx)
│   │   │   │   ├── [HiringFunnel.tsx](./src/components/organisms/hr/HiringFunnel.tsx)
│   │   │   │   ├── [JobBoard.tsx](./src/components/organisms/hr/JobBoard.tsx)
│   │   │   │   ├── [LeaveCalendar.tsx](./src/components/organisms/hr/LeaveCalendar.tsx)
│   │   │   │   ├── [OnboardingProgram.tsx](./src/components/organisms/hr/OnboardingProgram.tsx)
│   │   │   │   ├── [OrgStructure.tsx](./src/components/organisms/hr/OrgStructure.tsx)
│   │   │   │   ├── [PayrollOverview.tsx](./src/components/organisms/hr/PayrollOverview.tsx)
│   │   │   │   ├── [PerformanceReview.tsx](./src/components/organisms/hr/PerformanceReview.tsx)
│   │   │   │   ├── [PolicyLibrary.tsx](./src/components/organisms/hr/PolicyLibrary.tsx)
│   │   │   │   ├── [RecognitionFeed.tsx](./src/components/organisms/hr/RecognitionFeed.tsx)
│   │   │   │   ├── [TimesheetDashboard.tsx](./src/components/organisms/hr/TimesheetDashboard.tsx)
│   │   │   │   ├── [TrainingCatalog.tsx](./src/components/organisms/hr/TrainingCatalog.tsx)
│   │   │   │   └── [index.ts](./src/components/organisms/hr/index.ts)
│   │   │   ├── landing/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [CTASection.test.tsx](./src/components/organisms/landing/__tests__/CTASection.test.tsx)
│   │   │   │   │   ├── [ContactSection.test.tsx](./src/components/organisms/landing/__tests__/ContactSection.test.tsx)
│   │   │   │   │   ├── [Footer.test.tsx](./src/components/organisms/landing/__tests__/Footer.test.tsx)
│   │   │   │   │   ├── [Hero.test.tsx](./src/components/organisms/landing/__tests__/Hero.test.tsx)
│   │   │   │   │   ├── [Navbar.test.tsx](./src/components/organisms/landing/__tests__/Navbar.test.tsx)
│   │   │   │   │   ├── [NavigationMenu.test.tsx](./src/components/organisms/landing/__tests__/NavigationMenu.test.tsx)
│   │   │   │   │   ├── [NewsletterSection.test.tsx](./src/components/organisms/landing/__tests__/NewsletterSection.test.tsx)
│   │   │   │   │   ├── [PricingSection.test.tsx](./src/components/organisms/landing/__tests__/PricingSection.test.tsx)
│   │   │   │   │   ├── [ProcessSection.test.tsx](./src/components/organisms/landing/__tests__/ProcessSection.test.tsx)
│   │   │   │   │   ├── [QuoteSection.test.tsx](./src/components/organisms/landing/__tests__/QuoteSection.test.tsx)
│   │   │   │   │   ├── [ShowcaseSection.test.tsx](./src/components/organisms/landing/__tests__/ShowcaseSection.test.tsx)
│   │   │   │   │   ├── [TeamSection.test.tsx](./src/components/organisms/landing/__tests__/TeamSection.test.tsx)
│   │   │   │   │   ├── [TestimonialCarousel.test.tsx](./src/components/organisms/landing/__tests__/TestimonialCarousel.test.tsx)
│   │   │   │   │   ├── [TestimonialGrid.test.tsx](./src/components/organisms/landing/__tests__/TestimonialGrid.test.tsx)
│   │   │   │   │   ├── [TestimonialSection.test.tsx](./src/components/organisms/landing/__tests__/TestimonialSection.test.tsx)
│   │   │   │   │   └── [VideoSection.test.tsx](./src/components/organisms/landing/__tests__/VideoSection.test.tsx)
│   │   │   │   ├── [CTASection.tsx](./src/components/organisms/landing/CTASection.tsx)
│   │   │   │   ├── [ContactSection.tsx](./src/components/organisms/landing/ContactSection.tsx)
│   │   │   │   ├── [Footer.tsx](./src/components/organisms/landing/Footer.tsx)
│   │   │   │   ├── [Hero.tsx](./src/components/organisms/landing/Hero.tsx)
│   │   │   │   ├── [Navbar.tsx](./src/components/organisms/landing/Navbar.tsx)
│   │   │   │   ├── [NavigationMenu.tsx](./src/components/organisms/landing/NavigationMenu.tsx)
│   │   │   │   ├── [NewsletterSection.tsx](./src/components/organisms/landing/NewsletterSection.tsx)
│   │   │   │   ├── [PricingSection.tsx](./src/components/organisms/landing/PricingSection.tsx)
│   │   │   │   ├── [ProcessSection.tsx](./src/components/organisms/landing/ProcessSection.tsx)
│   │   │   │   ├── [QuoteSection.tsx](./src/components/organisms/landing/QuoteSection.tsx)
│   │   │   │   ├── [ShowcaseSection.tsx](./src/components/organisms/landing/ShowcaseSection.tsx)
│   │   │   │   ├── [TeamSection.tsx](./src/components/organisms/landing/TeamSection.tsx)
│   │   │   │   ├── [TestimonialCarousel.tsx](./src/components/organisms/landing/TestimonialCarousel.tsx)
│   │   │   │   ├── [TestimonialGrid.tsx](./src/components/organisms/landing/TestimonialGrid.tsx)
│   │   │   │   ├── [TestimonialSection.tsx](./src/components/organisms/landing/TestimonialSection.tsx)
│   │   │   │   ├── [VideoSection.tsx](./src/components/organisms/landing/VideoSection.tsx)
│   │   │   │   └── [index.ts](./src/components/organisms/landing/index.ts)
│   │   │   ├── mail/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [ArchivePanel.test.tsx](./src/components/organisms/mail/__tests__/ArchivePanel.test.tsx)
│   │   │   │   │   ├── [AttachmentViewer.test.tsx](./src/components/organisms/mail/__tests__/AttachmentViewer.test.tsx)
│   │   │   │   │   ├── [ComposeWindow.test.tsx](./src/components/organisms/mail/__tests__/ComposeWindow.test.tsx)
│   │   │   │   │   ├── [ConversationList.test.tsx](./src/components/organisms/mail/__tests__/ConversationList.test.tsx)
│   │   │   │   │   ├── [DraftList.test.tsx](./src/components/organisms/mail/__tests__/DraftList.test.tsx)
│   │   │   │   │   ├── [EmailReader.test.tsx](./src/components/organisms/mail/__tests__/EmailReader.test.tsx)
│   │   │   │   │   ├── [FolderManager.test.tsx](./src/components/organisms/mail/__tests__/FolderManager.test.tsx)
│   │   │   │   │   ├── [InboxView.test.tsx](./src/components/organisms/mail/__tests__/InboxView.test.tsx)
│   │   │   │   │   ├── [MailFilters.test.tsx](./src/components/organisms/mail/__tests__/MailFilters.test.tsx)
│   │   │   │   │   ├── [MailSearchOverlay.test.tsx](./src/components/organisms/mail/__tests__/MailSearchOverlay.test.tsx)
│   │   │   │   │   ├── [MailSidebar.test.tsx](./src/components/organisms/mail/__tests__/MailSidebar.test.tsx)
│   │   │   │   │   ├── [ReplyComposer.test.tsx](./src/components/organisms/mail/__tests__/ReplyComposer.test.tsx)
│   │   │   │   │   ├── [SendLater.test.tsx](./src/components/organisms/mail/__tests__/SendLater.test.tsx)
│   │   │   │   │   ├── [SignatureSettings.test.tsx](./src/components/organisms/mail/__tests__/SignatureSettings.test.tsx)
│   │   │   │   │   ├── [SpamFolder.test.tsx](./src/components/organisms/mail/__tests__/SpamFolder.test.tsx)
│   │   │   │   │   └── [StarredView.test.tsx](./src/components/organisms/mail/__tests__/StarredView.test.tsx)
│   │   │   │   ├── [ArchivePanel.tsx](./src/components/organisms/mail/ArchivePanel.tsx)
│   │   │   │   ├── [AttachmentViewer.tsx](./src/components/organisms/mail/AttachmentViewer.tsx)
│   │   │   │   ├── [ComposeWindow.tsx](./src/components/organisms/mail/ComposeWindow.tsx)
│   │   │   │   ├── [ConversationList.tsx](./src/components/organisms/mail/ConversationList.tsx)
│   │   │   │   ├── [DraftList.tsx](./src/components/organisms/mail/DraftList.tsx)
│   │   │   │   ├── [EmailReader.tsx](./src/components/organisms/mail/EmailReader.tsx)
│   │   │   │   ├── [FolderManager.tsx](./src/components/organisms/mail/FolderManager.tsx)
│   │   │   │   ├── [InboxView.tsx](./src/components/organisms/mail/InboxView.tsx)
│   │   │   │   ├── [MailFilters.tsx](./src/components/organisms/mail/MailFilters.tsx)
│   │   │   │   ├── [MailSearchOverlay.tsx](./src/components/organisms/mail/MailSearchOverlay.tsx)
│   │   │   │   ├── [MailSidebar.tsx](./src/components/organisms/mail/MailSidebar.tsx)
│   │   │   │   ├── [ReplyComposer.tsx](./src/components/organisms/mail/ReplyComposer.tsx)
│   │   │   │   ├── [SendLater.tsx](./src/components/organisms/mail/SendLater.tsx)
│   │   │   │   ├── [SignatureSettings.tsx](./src/components/organisms/mail/SignatureSettings.tsx)
│   │   │   │   ├── [SpamFolder.tsx](./src/components/organisms/mail/SpamFolder.tsx)
│   │   │   │   ├── [StarredView.tsx](./src/components/organisms/mail/StarredView.tsx)
│   │   │   │   └── [index.ts](./src/components/organisms/mail/index.ts)
│   │   │   ├── media/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AlbumPage.test.tsx](./src/components/organisms/media/__tests__/AlbumPage.test.tsx)
│   │   │   │   │   ├── [ArtistProfile.test.tsx](./src/components/organisms/media/__tests__/ArtistProfile.test.tsx)
│   │   │   │   │   ├── [BrowseGrid.test.tsx](./src/components/organisms/media/__tests__/BrowseGrid.test.tsx)
│   │   │   │   │   ├── [DiscoverPage.test.tsx](./src/components/organisms/media/__tests__/DiscoverPage.test.tsx)
│   │   │   │   │   ├── [DownloadManager.test.tsx](./src/components/organisms/media/__tests__/DownloadManager.test.tsx)
│   │   │   │   │   ├── [LiveChannel.test.tsx](./src/components/organisms/media/__tests__/LiveChannel.test.tsx)
│   │   │   │   │   ├── [LyricsView.test.tsx](./src/components/organisms/media/__tests__/LyricsView.test.tsx)
│   │   │   │   │   ├── [MovieDetail.test.tsx](./src/components/organisms/media/__tests__/MovieDetail.test.tsx)
│   │   │   │   │   ├── [MusicLibrary.test.tsx](./src/components/organisms/media/__tests__/MusicLibrary.test.tsx)
│   │   │   │   │   ├── [PlayerSection.test.tsx](./src/components/organisms/media/__tests__/PlayerSection.test.tsx)
│   │   │   │   │   ├── [PlaylistView.test.tsx](./src/components/organisms/media/__tests__/PlaylistView.test.tsx)
│   │   │   │   │   ├── [PodcastHub.test.tsx](./src/components/organisms/media/__tests__/PodcastHub.test.tsx)
│   │   │   │   │   ├── [QueueManager.test.tsx](./src/components/organisms/media/__tests__/QueueManager.test.tsx)
│   │   │   │   │   ├── [RecommendationRow.test.tsx](./src/components/organisms/media/__tests__/RecommendationRow.test.tsx)
│   │   │   │   │   ├── [TvSeriesPage.test.tsx](./src/components/organisms/media/__tests__/TvSeriesPage.test.tsx)
│   │   │   │   │   └── [VideoCatalog.test.tsx](./src/components/organisms/media/__tests__/VideoCatalog.test.tsx)
│   │   │   │   ├── [AlbumPage.tsx](./src/components/organisms/media/AlbumPage.tsx)
│   │   │   │   ├── [ArtistProfile.tsx](./src/components/organisms/media/ArtistProfile.tsx)
│   │   │   │   ├── [BrowseGrid.tsx](./src/components/organisms/media/BrowseGrid.tsx)
│   │   │   │   ├── [DiscoverPage.tsx](./src/components/organisms/media/DiscoverPage.tsx)
│   │   │   │   ├── [DownloadManager.tsx](./src/components/organisms/media/DownloadManager.tsx)
│   │   │   │   ├── [LiveChannel.tsx](./src/components/organisms/media/LiveChannel.tsx)
│   │   │   │   ├── [LyricsView.tsx](./src/components/organisms/media/LyricsView.tsx)
│   │   │   │   ├── [MovieDetail.tsx](./src/components/organisms/media/MovieDetail.tsx)
│   │   │   │   ├── [MusicLibrary.tsx](./src/components/organisms/media/MusicLibrary.tsx)
│   │   │   │   ├── [PlayerSection.tsx](./src/components/organisms/media/PlayerSection.tsx)
│   │   │   │   ├── [PlaylistView.tsx](./src/components/organisms/media/PlaylistView.tsx)
│   │   │   │   ├── [PodcastHub.tsx](./src/components/organisms/media/PodcastHub.tsx)
│   │   │   │   ├── [QueueManager.tsx](./src/components/organisms/media/QueueManager.tsx)
│   │   │   │   ├── [RecommendationRow.tsx](./src/components/organisms/media/RecommendationRow.tsx)
│   │   │   │   ├── [TvSeriesPage.tsx](./src/components/organisms/media/TvSeriesPage.tsx)
│   │   │   │   ├── [VideoCatalog.tsx](./src/components/organisms/media/VideoCatalog.tsx)
│   │   │   │   └── [index.ts](./src/components/organisms/media/index.ts)
│   │   │   ├── news/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [BreakingTicker.test.tsx](./src/components/organisms/news/__tests__/BreakingTicker.test.tsx)
│   │   │   │   │   ├── [BusinessNews.test.tsx](./src/components/organisms/news/__tests__/BusinessNews.test.tsx)
│   │   │   │   │   ├── [DataViz.test.tsx](./src/components/organisms/news/__tests__/DataViz.test.tsx)
│   │   │   │   │   ├── [EditorialOpinion.test.tsx](./src/components/organisms/news/__tests__/EditorialOpinion.test.tsx)
│   │   │   │   │   ├── [EntertainmentFeed.test.tsx](./src/components/organisms/news/__tests__/EntertainmentFeed.test.tsx)
│   │   │   │   │   ├── [LiveBlog.test.tsx](./src/components/organisms/news/__tests__/LiveBlog.test.tsx)
│   │   │   │   │   ├── [LocalNews.test.tsx](./src/components/organisms/news/__tests__/LocalNews.test.tsx)
│   │   │   │   │   ├── [NewsletterSignup.test.tsx](./src/components/organisms/news/__tests__/NewsletterSignup.test.tsx)
│   │   │   │   │   ├── [PhotoGallery.test.tsx](./src/components/organisms/news/__tests__/PhotoGallery.test.tsx)
│   │   │   │   │   ├── [PodcastFeed.test.tsx](./src/components/organisms/news/__tests__/PodcastFeed.test.tsx)
│   │   │   │   │   ├── [PoliticsSection.test.tsx](./src/components/organisms/news/__tests__/PoliticsSection.test.tsx)
│   │   │   │   │   ├── [SportsSection.test.tsx](./src/components/organisms/news/__tests__/SportsSection.test.tsx)
│   │   │   │   │   ├── [TechnologySection.test.tsx](./src/components/organisms/news/__tests__/TechnologySection.test.tsx)
│   │   │   │   │   ├── [TopStories.test.tsx](./src/components/organisms/news/__tests__/TopStories.test.tsx)
│   │   │   │   │   ├── [WeatherForecast.test.tsx](./src/components/organisms/news/__tests__/WeatherForecast.test.tsx)
│   │   │   │   │   └── [WorldNews.test.tsx](./src/components/organisms/news/__tests__/WorldNews.test.tsx)
│   │   │   │   ├── [BreakingTicker.tsx](./src/components/organisms/news/BreakingTicker.tsx)
│   │   │   │   ├── [BusinessNews.tsx](./src/components/organisms/news/BusinessNews.tsx)
│   │   │   │   ├── [DataViz.tsx](./src/components/organisms/news/DataViz.tsx)
│   │   │   │   ├── [EditorialOpinion.tsx](./src/components/organisms/news/EditorialOpinion.tsx)
│   │   │   │   ├── [EntertainmentFeed.tsx](./src/components/organisms/news/EntertainmentFeed.tsx)
│   │   │   │   ├── [LiveBlog.tsx](./src/components/organisms/news/LiveBlog.tsx)
│   │   │   │   ├── [LocalNews.tsx](./src/components/organisms/news/LocalNews.tsx)
│   │   │   │   ├── [NewsletterSignup.tsx](./src/components/organisms/news/NewsletterSignup.tsx)
│   │   │   │   ├── [PhotoGallery.tsx](./src/components/organisms/news/PhotoGallery.tsx)
│   │   │   │   ├── [PodcastFeed.tsx](./src/components/organisms/news/PodcastFeed.tsx)
│   │   │   │   ├── [PoliticsSection.tsx](./src/components/organisms/news/PoliticsSection.tsx)
│   │   │   │   ├── [SportsSection.tsx](./src/components/organisms/news/SportsSection.tsx)
│   │   │   │   ├── [TechnologySection.tsx](./src/components/organisms/news/TechnologySection.tsx)
│   │   │   │   ├── [TopStories.tsx](./src/components/organisms/news/TopStories.tsx)
│   │   │   │   ├── [WeatherForecast.tsx](./src/components/organisms/news/WeatherForecast.tsx)
│   │   │   │   ├── [WorldNews.tsx](./src/components/organisms/news/WorldNews.tsx)
│   │   │   │   └── [index.ts](./src/components/organisms/news/index.ts)
│   │   │   ├── social/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Calendar.test.tsx](./src/components/organisms/social/__tests__/Calendar.test.tsx)
│   │   │   │   │   ├── [ChatWindow.test.tsx](./src/components/organisms/social/__tests__/ChatWindow.test.tsx)
│   │   │   │   │   ├── [ConnectionsPage.test.tsx](./src/components/organisms/social/__tests__/ConnectionsPage.test.tsx)
│   │   │   │   │   ├── [EventTimeline.test.tsx](./src/components/organisms/social/__tests__/EventTimeline.test.tsx)
│   │   │   │   │   ├── [EventsSection.test.tsx](./src/components/organisms/social/__tests__/EventsSection.test.tsx)
│   │   │   │   │   ├── [ExploreGrid.test.tsx](./src/components/organisms/social/__tests__/ExploreGrid.test.tsx)
│   │   │   │   │   ├── [FeatureGrid.test.tsx](./src/components/organisms/social/__tests__/FeatureGrid.test.tsx)
│   │   │   │   │   ├── [FeedView.test.tsx](./src/components/organisms/social/__tests__/FeedView.test.tsx)
│   │   │   │   │   ├── [GroupsHub.test.tsx](./src/components/organisms/social/__tests__/GroupsHub.test.tsx)
│   │   │   │   │   ├── [HashtagPage.test.tsx](./src/components/organisms/social/__tests__/HashtagPage.test.tsx)
│   │   │   │   │   ├── [MessengerView.test.tsx](./src/components/organisms/social/__tests__/MessengerView.test.tsx)
│   │   │   │   │   ├── [NotificationsFeed.test.tsx](./src/components/organisms/social/__tests__/NotificationsFeed.test.tsx)
│   │   │   │   │   ├── [ProfileTimeline.test.tsx](./src/components/organisms/social/__tests__/ProfileTimeline.test.tsx)
│   │   │   │   │   ├── [ReelsGrid.test.tsx](./src/components/organisms/social/__tests__/ReelsGrid.test.tsx)
│   │   │   │   │   ├── [StoriesRow.test.tsx](./src/components/organisms/social/__tests__/StoriesRow.test.tsx)
│   │   │   │   │   └── [TrendingTopics.test.tsx](./src/components/organisms/social/__tests__/TrendingTopics.test.tsx)
│   │   │   │   ├── [Calendar.tsx](./src/components/organisms/social/Calendar.tsx)
│   │   │   │   ├── [ChatWindow.tsx](./src/components/organisms/social/ChatWindow.tsx)
│   │   │   │   ├── [ConnectionsPage.tsx](./src/components/organisms/social/ConnectionsPage.tsx)
│   │   │   │   ├── [EventTimeline.tsx](./src/components/organisms/social/EventTimeline.tsx)
│   │   │   │   ├── [EventsSection.tsx](./src/components/organisms/social/EventsSection.tsx)
│   │   │   │   ├── [ExploreGrid.tsx](./src/components/organisms/social/ExploreGrid.tsx)
│   │   │   │   ├── [FeatureGrid.tsx](./src/components/organisms/social/FeatureGrid.tsx)
│   │   │   │   ├── [FeedView.tsx](./src/components/organisms/social/FeedView.tsx)
│   │   │   │   ├── [GroupsHub.tsx](./src/components/organisms/social/GroupsHub.tsx)
│   │   │   │   ├── [HashtagPage.tsx](./src/components/organisms/social/HashtagPage.tsx)
│   │   │   │   ├── [MessengerView.tsx](./src/components/organisms/social/MessengerView.tsx)
│   │   │   │   ├── [NotificationsFeed.tsx](./src/components/organisms/social/NotificationsFeed.tsx)
│   │   │   │   ├── [ProfileTimeline.tsx](./src/components/organisms/social/ProfileTimeline.tsx)
│   │   │   │   ├── [ReelsGrid.tsx](./src/components/organisms/social/ReelsGrid.tsx)
│   │   │   │   ├── [StoriesRow.tsx](./src/components/organisms/social/StoriesRow.tsx)
│   │   │   │   ├── [TrendingTopics.tsx](./src/components/organisms/social/TrendingTopics.tsx)
│   │   │   │   └── [index.ts](./src/components/organisms/social/index.ts)
│   │   │   ├── store/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [BrandSection.test.tsx](./src/components/organisms/store/__tests__/BrandSection.test.tsx)
│   │   │   │   │   ├── [CategoryShowcase.test.tsx](./src/components/organisms/store/__tests__/CategoryShowcase.test.tsx)
│   │   │   │   │   ├── [CheckoutFlow.test.tsx](./src/components/organisms/store/__tests__/CheckoutFlow.test.tsx)
│   │   │   │   │   ├── [DealsSection.test.tsx](./src/components/organisms/store/__tests__/DealsSection.test.tsx)
│   │   │   │   │   ├── [GiftCardCenter.test.tsx](./src/components/organisms/store/__tests__/GiftCardCenter.test.tsx)
│   │   │   │   │   ├── [LoyaltyProgram.test.tsx](./src/components/organisms/store/__tests__/LoyaltyProgram.test.tsx)
│   │   │   │   │   ├── [NewArrivals.test.tsx](./src/components/organisms/store/__tests__/NewArrivals.test.tsx)
│   │   │   │   │   ├── [OrderTracking.test.tsx](./src/components/organisms/store/__tests__/OrderTracking.test.tsx)
│   │   │   │   │   ├── [ProductList.test.tsx](./src/components/organisms/store/__tests__/ProductList.test.tsx)
│   │   │   │   │   ├── [ProductShowcase.test.tsx](./src/components/organisms/store/__tests__/ProductShowcase.test.tsx)
│   │   │   │   │   ├── [ReturnCenter.test.tsx](./src/components/organisms/store/__tests__/ReturnCenter.test.tsx)
│   │   │   │   │   ├── [ShippingTracker.test.tsx](./src/components/organisms/store/__tests__/ShippingTracker.test.tsx)
│   │   │   │   │   ├── [ShoppingCart.test.tsx](./src/components/organisms/store/__tests__/ShoppingCart.test.tsx)
│   │   │   │   │   ├── [StoreReviews.test.tsx](./src/components/organisms/store/__tests__/StoreReviews.test.tsx)
│   │   │   │   │   ├── [Storefront.test.tsx](./src/components/organisms/store/__tests__/Storefront.test.tsx)
│   │   │   │   │   └── [WishlistView.test.tsx](./src/components/organisms/store/__tests__/WishlistView.test.tsx)
│   │   │   │   ├── [BrandSection.tsx](./src/components/organisms/store/BrandSection.tsx)
│   │   │   │   ├── [CategoryShowcase.tsx](./src/components/organisms/store/CategoryShowcase.tsx)
│   │   │   │   ├── [CheckoutFlow.tsx](./src/components/organisms/store/CheckoutFlow.tsx)
│   │   │   │   ├── [DealsSection.tsx](./src/components/organisms/store/DealsSection.tsx)
│   │   │   │   ├── [GiftCardCenter.tsx](./src/components/organisms/store/GiftCardCenter.tsx)
│   │   │   │   ├── [LoyaltyProgram.tsx](./src/components/organisms/store/LoyaltyProgram.tsx)
│   │   │   │   ├── [NewArrivals.tsx](./src/components/organisms/store/NewArrivals.tsx)
│   │   │   │   ├── [OrderTracking.tsx](./src/components/organisms/store/OrderTracking.tsx)
│   │   │   │   ├── [ProductList.tsx](./src/components/organisms/store/ProductList.tsx)
│   │   │   │   ├── [ProductShowcase.tsx](./src/components/organisms/store/ProductShowcase.tsx)
│   │   │   │   ├── [ReturnCenter.tsx](./src/components/organisms/store/ReturnCenter.tsx)
│   │   │   │   ├── [ShippingTracker.tsx](./src/components/organisms/store/ShippingTracker.tsx)
│   │   │   │   ├── [ShoppingCart.tsx](./src/components/organisms/store/ShoppingCart.tsx)
│   │   │   │   ├── [StoreReviews.tsx](./src/components/organisms/store/StoreReviews.tsx)
│   │   │   │   ├── [Storefront.tsx](./src/components/organisms/store/Storefront.tsx)
│   │   │   │   ├── [WishlistView.tsx](./src/components/organisms/store/WishlistView.tsx)
│   │   │   │   └── [index.ts](./src/components/organisms/store/index.ts)
│   │   │   ├── support/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [CommandMenu.test.tsx](./src/components/organisms/support/__tests__/CommandMenu.test.tsx)
│   │   │   │   │   ├── [DashboardHeader.test.tsx](./src/components/organisms/support/__tests__/DashboardHeader.test.tsx)
│   │   │   │   │   ├── [DataList.test.tsx](./src/components/organisms/support/__tests__/DataList.test.tsx)
│   │   │   │   │   ├── [DataTable.test.tsx](./src/components/organisms/support/__tests__/DataTable.test.tsx)
│   │   │   │   │   ├── [Diff.test.tsx](./src/components/organisms/support/__tests__/Diff.test.tsx)
│   │   │   │   │   ├── [FilterBar.test.tsx](./src/components/organisms/support/__tests__/FilterBar.test.tsx)
│   │   │   │   │   ├── [Header.test.tsx](./src/components/organisms/support/__tests__/Header.test.tsx)
│   │   │   │   │   ├── [PageBreadcrumbs.test.tsx](./src/components/organisms/support/__tests__/PageBreadcrumbs.test.tsx)
│   │   │   │   │   ├── [PageHeader.test.tsx](./src/components/organisms/support/__tests__/PageHeader.test.tsx)
│   │   │   │   │   ├── [PageTabs.test.tsx](./src/components/organisms/support/__tests__/PageTabs.test.tsx)
│   │   │   │   │   ├── [ProgressStepper.test.tsx](./src/components/organisms/support/__tests__/ProgressStepper.test.tsx)
│   │   │   │   │   ├── [Section.test.tsx](./src/components/organisms/support/__tests__/Section.test.tsx)
│   │   │   │   │   ├── [Sidebar.test.tsx](./src/components/organisms/support/__tests__/Sidebar.test.tsx)
│   │   │   │   │   ├── [StatsGrid.test.tsx](./src/components/organisms/support/__tests__/StatsGrid.test.tsx)
│   │   │   │   │   ├── [TableOfContents.test.tsx](./src/components/organisms/support/__tests__/TableOfContents.test.tsx)
│   │   │   │   │   └── [Toolbar.test.tsx](./src/components/organisms/support/__tests__/Toolbar.test.tsx)
│   │   │   │   ├── [CommandMenu.tsx](./src/components/organisms/support/CommandMenu.tsx)
│   │   │   │   ├── [DashboardHeader.tsx](./src/components/organisms/support/DashboardHeader.tsx)
│   │   │   │   ├── [DataList.tsx](./src/components/organisms/support/DataList.tsx)
│   │   │   │   ├── [DataTable.tsx](./src/components/organisms/support/DataTable.tsx)
│   │   │   │   ├── [Diff.tsx](./src/components/organisms/support/Diff.tsx)
│   │   │   │   ├── [FilterBar.tsx](./src/components/organisms/support/FilterBar.tsx)
│   │   │   │   ├── [Header.tsx](./src/components/organisms/support/Header.tsx)
│   │   │   │   ├── [PageBreadcrumbs.tsx](./src/components/organisms/support/PageBreadcrumbs.tsx)
│   │   │   │   ├── [PageHeader.tsx](./src/components/organisms/support/PageHeader.tsx)
│   │   │   │   ├── [PageTabs.tsx](./src/components/organisms/support/PageTabs.tsx)
│   │   │   │   ├── [ProgressStepper.tsx](./src/components/organisms/support/ProgressStepper.tsx)
│   │   │   │   ├── [Section.tsx](./src/components/organisms/support/Section.tsx)
│   │   │   │   ├── [Sidebar.tsx](./src/components/organisms/support/Sidebar.tsx)
│   │   │   │   ├── [StatsGrid.tsx](./src/components/organisms/support/StatsGrid.tsx)
│   │   │   │   ├── [TableOfContents.tsx](./src/components/organisms/support/TableOfContents.tsx)
│   │   │   │   ├── [Toolbar.tsx](./src/components/organisms/support/Toolbar.tsx)
│   │   │   │   └── [index.ts](./src/components/organisms/support/index.ts)
│   │   │   ├── travel/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AdventureSection.test.tsx](./src/components/organisms/travel/__tests__/AdventureSection.test.tsx)
│   │   │   │   │   ├── [BookingFlow.test.tsx](./src/components/organisms/travel/__tests__/BookingFlow.test.tsx)
│   │   │   │   │   ├── [ChecklistSection.test.tsx](./src/components/organisms/travel/__tests__/ChecklistSection.test.tsx)
│   │   │   │   │   ├── [CurrencyConverter.test.tsx](./src/components/organisms/travel/__tests__/CurrencyConverter.test.tsx)
│   │   │   │   │   ├── [DestinationShowcase.test.tsx](./src/components/organisms/travel/__tests__/DestinationShowcase.test.tsx)
│   │   │   │   │   ├── [FlightResults.test.tsx](./src/components/organisms/travel/__tests__/FlightResults.test.tsx)
│   │   │   │   │   ├── [HotelSearch.test.tsx](./src/components/organisms/travel/__tests__/HotelSearch.test.tsx)
│   │   │   │   │   ├── [ItineraryView.test.tsx](./src/components/organisms/travel/__tests__/ItineraryView.test.tsx)
│   │   │   │   │   ├── [LocalGuides.test.tsx](./src/components/organisms/travel/__tests__/LocalGuides.test.tsx)
│   │   │   │   │   ├── [LoyaltyDashboard.test.tsx](./src/components/organisms/travel/__tests__/LoyaltyDashboard.test.tsx)
│   │   │   │   │   ├── [MapExplorer.test.tsx](./src/components/organisms/travel/__tests__/MapExplorer.test.tsx)
│   │   │   │   │   ├── [PhotoJournal.test.tsx](./src/components/organisms/travel/__tests__/PhotoJournal.test.tsx)
│   │   │   │   │   ├── [ReviewHub.test.tsx](./src/components/organisms/travel/__tests__/ReviewHub.test.tsx)
│   │   │   │   │   ├── [TravelAlerts.test.tsx](./src/components/organisms/travel/__tests__/TravelAlerts.test.tsx)
│   │   │   │   │   ├── [TravelPackages.test.tsx](./src/components/organisms/travel/__tests__/TravelPackages.test.tsx)
│   │   │   │   │   └── [TripPlanner.test.tsx](./src/components/organisms/travel/__tests__/TripPlanner.test.tsx)
│   │   │   │   ├── [AdventureSection.tsx](./src/components/organisms/travel/AdventureSection.tsx)
│   │   │   │   ├── [BookingFlow.tsx](./src/components/organisms/travel/BookingFlow.tsx)
│   │   │   │   ├── [ChecklistSection.tsx](./src/components/organisms/travel/ChecklistSection.tsx)
│   │   │   │   ├── [CurrencyConverter.tsx](./src/components/organisms/travel/CurrencyConverter.tsx)
│   │   │   │   ├── [DestinationShowcase.tsx](./src/components/organisms/travel/DestinationShowcase.tsx)
│   │   │   │   ├── [FlightResults.tsx](./src/components/organisms/travel/FlightResults.tsx)
│   │   │   │   ├── [HotelSearch.tsx](./src/components/organisms/travel/HotelSearch.tsx)
│   │   │   │   ├── [ItineraryView.tsx](./src/components/organisms/travel/ItineraryView.tsx)
│   │   │   │   ├── [LocalGuides.tsx](./src/components/organisms/travel/LocalGuides.tsx)
│   │   │   │   ├── [LoyaltyDashboard.tsx](./src/components/organisms/travel/LoyaltyDashboard.tsx)
│   │   │   │   ├── [MapExplorer.tsx](./src/components/organisms/travel/MapExplorer.tsx)
│   │   │   │   ├── [PhotoJournal.tsx](./src/components/organisms/travel/PhotoJournal.tsx)
│   │   │   │   ├── [ReviewHub.tsx](./src/components/organisms/travel/ReviewHub.tsx)
│   │   │   │   ├── [TravelAlerts.tsx](./src/components/organisms/travel/TravelAlerts.tsx)
│   │   │   │   ├── [TravelPackages.tsx](./src/components/organisms/travel/TravelPackages.tsx)
│   │   │   │   ├── [TripPlanner.tsx](./src/components/organisms/travel/TripPlanner.tsx)
│   │   │   │   └── [index.ts](./src/components/organisms/travel/index.ts)
│   │   │   └── [index.ts](./src/components/organisms/index.ts)
│   │   ├── pages/
│   │   │   └── home/
│   │   │       ├── __tests__/
│   │   │       │   └── [home.test.tsx](./src/components/pages/home/__tests__/home.test.tsx)
│   │   │       ├── components/
│   │   │       │   ├── levels/
│   │   │       │   │   ├── [AtomsLevel.tsx](./src/components/pages/home/components/levels/AtomsLevel.tsx)
│   │   │       │   │   ├── [MoleculesLevel.tsx](./src/components/pages/home/components/levels/MoleculesLevel.tsx)
│   │   │       │   │   ├── [OrganismsLevel.tsx](./src/components/pages/home/components/levels/OrganismsLevel.tsx)
│   │   │       │   │   └── [TemplatesLevel.tsx](./src/components/pages/home/components/levels/TemplatesLevel.tsx)
│   │   │       │   └── [Atomic.tsx](./src/components/pages/home/components/Atomic.tsx)
│   │   │       ├── [Home.tsx](./src/components/pages/home/Home.tsx)
│   │   │       └── [index.ts](./src/components/pages/home/index.ts)
│   │   └── templates/
│   │       ├── app/
│   │       │   ├── __tests__/
│   │       │   │   ├── __snapshots__/
│   │       │   │   │   └── [ChatTemplate.test.tsx.snap](./src/components/templates/app/__tests__/__snapshots__/ChatTemplate.test.tsx.snap)
│   │       │   │   ├── [ActivityLogTemplate.test.tsx](./src/components/templates/app/__tests__/ActivityLogTemplate.test.tsx)
│   │       │   │   ├── [AnalyticsTemplate.test.tsx](./src/components/templates/app/__tests__/AnalyticsTemplate.test.tsx)
│   │       │   │   ├── [CalendarTemplate.test.tsx](./src/components/templates/app/__tests__/CalendarTemplate.test.tsx)
│   │       │   │   ├── [ChatTemplate.test.tsx](./src/components/templates/app/__tests__/ChatTemplate.test.tsx)
│   │       │   │   ├── [ContactsTemplate.test.tsx](./src/components/templates/app/__tests__/ContactsTemplate.test.tsx)
│   │       │   │   ├── [DashboardTemplate.test.tsx](./src/components/templates/app/__tests__/DashboardTemplate.test.tsx)
│   │       │   │   ├── [FilesTemplate.test.tsx](./src/components/templates/app/__tests__/FilesTemplate.test.tsx)
│   │       │   │   ├── [GoalsTemplate.test.tsx](./src/components/templates/app/__tests__/GoalsTemplate.test.tsx)
│   │       │   │   ├── [HelpCenterTemplate.test.tsx](./src/components/templates/app/__tests__/HelpCenterTemplate.test.tsx)
│   │       │   │   ├── [InboxTemplate.test.tsx](./src/components/templates/app/__tests__/InboxTemplate.test.tsx)
│   │       │   │   ├── [IntegrationsTemplate.test.tsx](./src/components/templates/app/__tests__/IntegrationsTemplate.test.tsx)
│   │       │   │   ├── [KanbanTemplate.test.tsx](./src/components/templates/app/__tests__/KanbanTemplate.test.tsx)
│   │       │   │   ├── [MeetingsTemplate.test.tsx](./src/components/templates/app/__tests__/MeetingsTemplate.test.tsx)
│   │       │   │   ├── [MembersTemplate.test.tsx](./src/components/templates/app/__tests__/MembersTemplate.test.tsx)
│   │       │   │   ├── [NotificationsTemplate.test.tsx](./src/components/templates/app/__tests__/NotificationsTemplate.test.tsx)
│   │       │   │   └── [TasksTemplate.test.tsx](./src/components/templates/app/__tests__/TasksTemplate.test.tsx)
│   │       │   ├── [ActivityLogTemplate.tsx](./src/components/templates/app/ActivityLogTemplate.tsx)
│   │       │   ├── [AnalyticsTemplate.tsx](./src/components/templates/app/AnalyticsTemplate.tsx)
│   │       │   ├── [CalendarTemplate.tsx](./src/components/templates/app/CalendarTemplate.tsx)
│   │       │   ├── [ChatTemplate.tsx](./src/components/templates/app/ChatTemplate.tsx)
│   │       │   ├── [ContactsTemplate.tsx](./src/components/templates/app/ContactsTemplate.tsx)
│   │       │   ├── [DashboardTemplate.tsx](./src/components/templates/app/DashboardTemplate.tsx)
│   │       │   ├── [FilesTemplate.tsx](./src/components/templates/app/FilesTemplate.tsx)
│   │       │   ├── [GoalsTemplate.tsx](./src/components/templates/app/GoalsTemplate.tsx)
│   │       │   ├── [HelpCenterTemplate.tsx](./src/components/templates/app/HelpCenterTemplate.tsx)
│   │       │   ├── [InboxTemplate.tsx](./src/components/templates/app/InboxTemplate.tsx)
│   │       │   ├── [IntegrationsTemplate.tsx](./src/components/templates/app/IntegrationsTemplate.tsx)
│   │       │   ├── [KanbanTemplate.tsx](./src/components/templates/app/KanbanTemplate.tsx)
│   │       │   ├── [MeetingsTemplate.tsx](./src/components/templates/app/MeetingsTemplate.tsx)
│   │       │   ├── [MembersTemplate.tsx](./src/components/templates/app/MembersTemplate.tsx)
│   │       │   ├── [NotificationsTemplate.tsx](./src/components/templates/app/NotificationsTemplate.tsx)
│   │       │   ├── [TasksTemplate.tsx](./src/components/templates/app/TasksTemplate.tsx)
│   │       │   └── [index.ts](./src/components/templates/app/index.ts)
│   │       ├── auth/
│   │       │   ├── __tests__/
│   │       │   │   ├── [ChangePasswordTemplate.test.tsx](./src/components/templates/auth/__tests__/ChangePasswordTemplate.test.tsx)
│   │       │   │   ├── [DeleteAccountTemplate.test.tsx](./src/components/templates/auth/__tests__/DeleteAccountTemplate.test.tsx)
│   │       │   │   ├── [ErrorTemplate.test.tsx](./src/components/templates/auth/__tests__/ErrorTemplate.test.tsx)
│   │       │   │   ├── [ForbiddenTemplate.test.tsx](./src/components/templates/auth/__tests__/ForbiddenTemplate.test.tsx)
│   │       │   │   ├── [GlobalErrorTemplate.test.tsx](./src/components/templates/auth/__tests__/GlobalErrorTemplate.test.tsx)
│   │       │   │   ├── [LockScreenTemplate.test.tsx](./src/components/templates/auth/__tests__/LockScreenTemplate.test.tsx)
│   │       │   │   ├── [PasswordResetTemplate.test.tsx](./src/components/templates/auth/__tests__/PasswordResetTemplate.test.tsx)
│   │       │   │   ├── [PermissionsTemplate.test.tsx](./src/components/templates/auth/__tests__/PermissionsTemplate.test.tsx)
│   │       │   │   ├── [RecoveryCodesTemplate.test.tsx](./src/components/templates/auth/__tests__/RecoveryCodesTemplate.test.tsx)
│   │       │   │   ├── [SecurityOverviewTemplate.test.tsx](./src/components/templates/auth/__tests__/SecurityOverviewTemplate.test.tsx)
│   │       │   │   ├── [SecurityTemplate.test.tsx](./src/components/templates/auth/__tests__/SecurityTemplate.test.tsx)
│   │       │   │   ├── [SessionsTemplate.test.tsx](./src/components/templates/auth/__tests__/SessionsTemplate.test.tsx)
│   │       │   │   ├── [SignInTemplate.test.tsx](./src/components/templates/auth/__tests__/SignInTemplate.test.tsx)
│   │       │   │   ├── [SignUpTemplate.test.tsx](./src/components/templates/auth/__tests__/SignUpTemplate.test.tsx)
│   │       │   │   ├── [TwoFactorTemplate.test.tsx](./src/components/templates/auth/__tests__/TwoFactorTemplate.test.tsx)
│   │       │   │   └── [VerifyEmailTemplate.test.tsx](./src/components/templates/auth/__tests__/VerifyEmailTemplate.test.tsx)
│   │       │   ├── [ChangePasswordTemplate.tsx](./src/components/templates/auth/ChangePasswordTemplate.tsx)
│   │       │   ├── [DeleteAccountTemplate.tsx](./src/components/templates/auth/DeleteAccountTemplate.tsx)
│   │       │   ├── [ErrorTemplate.tsx](./src/components/templates/auth/ErrorTemplate.tsx)
│   │       │   ├── [ForbiddenTemplate.tsx](./src/components/templates/auth/ForbiddenTemplate.tsx)
│   │       │   ├── [GlobalErrorTemplate.tsx](./src/components/templates/auth/GlobalErrorTemplate.tsx)
│   │       │   ├── [LockScreenTemplate.tsx](./src/components/templates/auth/LockScreenTemplate.tsx)
│   │       │   ├── [PasswordResetTemplate.tsx](./src/components/templates/auth/PasswordResetTemplate.tsx)
│   │       │   ├── [PermissionsTemplate.tsx](./src/components/templates/auth/PermissionsTemplate.tsx)
│   │       │   ├── [RecoveryCodesTemplate.tsx](./src/components/templates/auth/RecoveryCodesTemplate.tsx)
│   │       │   ├── [SecurityOverviewTemplate.tsx](./src/components/templates/auth/SecurityOverviewTemplate.tsx)
│   │       │   ├── [SecurityTemplate.tsx](./src/components/templates/auth/SecurityTemplate.tsx)
│   │       │   ├── [SessionsTemplate.tsx](./src/components/templates/auth/SessionsTemplate.tsx)
│   │       │   ├── [SignInTemplate.tsx](./src/components/templates/auth/SignInTemplate.tsx)
│   │       │   ├── [SignUpTemplate.tsx](./src/components/templates/auth/SignUpTemplate.tsx)
│   │       │   ├── [TwoFactorTemplate.tsx](./src/components/templates/auth/TwoFactorTemplate.tsx)
│   │       │   ├── [VerifyEmailTemplate.tsx](./src/components/templates/auth/VerifyEmailTemplate.tsx)
│   │       │   └── [index.ts](./src/components/templates/auth/index.ts)
│   │       ├── blog/
│   │       │   ├── __tests__/
│   │       │   │   ├── [AchievementsTemplate.test.tsx](./src/components/templates/blog/__tests__/AchievementsTemplate.test.tsx)
│   │       │   │   ├── [BlogArchiveTemplate.test.tsx](./src/components/templates/blog/__tests__/BlogArchiveTemplate.test.tsx)
│   │       │   │   ├── [BlogAuthorTemplate.test.tsx](./src/components/templates/blog/__tests__/BlogAuthorTemplate.test.tsx)
│   │       │   │   ├── [BlogCategoriesTemplate.test.tsx](./src/components/templates/blog/__tests__/BlogCategoriesTemplate.test.tsx)
│   │       │   │   ├── [BlogItemTemplate.test.tsx](./src/components/templates/blog/__tests__/BlogItemTemplate.test.tsx)
│   │       │   │   ├── [BlogListTemplate.test.tsx](./src/components/templates/blog/__tests__/BlogListTemplate.test.tsx)
│   │       │   │   ├── [BlogNewsletterTemplate.test.tsx](./src/components/templates/blog/__tests__/BlogNewsletterTemplate.test.tsx)
│   │       │   │   ├── [BlogSearchTemplate.test.tsx](./src/components/templates/blog/__tests__/BlogSearchTemplate.test.tsx)
│   │       │   │   ├── [BlogTagsTemplate.test.tsx](./src/components/templates/blog/__tests__/BlogTagsTemplate.test.tsx)
│   │       │   │   ├── [CourseCatalogTemplate.test.tsx](./src/components/templates/blog/__tests__/CourseCatalogTemplate.test.tsx)
│   │       │   │   ├── [CourseDetailTemplate.test.tsx](./src/components/templates/blog/__tests__/CourseDetailTemplate.test.tsx)
│   │       │   │   ├── [InstructorsTemplate.test.tsx](./src/components/templates/blog/__tests__/InstructorsTemplate.test.tsx)
│   │       │   │   ├── [LearningAnalyticsTemplate.test.tsx](./src/components/templates/blog/__tests__/LearningAnalyticsTemplate.test.tsx)
│   │       │   │   ├── [LessonPlayerTemplate.test.tsx](./src/components/templates/blog/__tests__/LessonPlayerTemplate.test.tsx)
│   │       │   │   ├── [MyCoursesTemplate.test.tsx](./src/components/templates/blog/__tests__/MyCoursesTemplate.test.tsx)
│   │       │   │   └── [QuizzesTemplate.test.tsx](./src/components/templates/blog/__tests__/QuizzesTemplate.test.tsx)
│   │       │   ├── [AchievementsTemplate.tsx](./src/components/templates/blog/AchievementsTemplate.tsx)
│   │       │   ├── [BlogArchiveTemplate.tsx](./src/components/templates/blog/BlogArchiveTemplate.tsx)
│   │       │   ├── [BlogAuthorTemplate.tsx](./src/components/templates/blog/BlogAuthorTemplate.tsx)
│   │       │   ├── [BlogCategoriesTemplate.tsx](./src/components/templates/blog/BlogCategoriesTemplate.tsx)
│   │       │   ├── [BlogItemTemplate.tsx](./src/components/templates/blog/BlogItemTemplate.tsx)
│   │       │   ├── [BlogListTemplate.tsx](./src/components/templates/blog/BlogListTemplate.tsx)
│   │       │   ├── [BlogNewsletterTemplate.tsx](./src/components/templates/blog/BlogNewsletterTemplate.tsx)
│   │       │   ├── [BlogSearchTemplate.tsx](./src/components/templates/blog/BlogSearchTemplate.tsx)
│   │       │   ├── [BlogTagsTemplate.tsx](./src/components/templates/blog/BlogTagsTemplate.tsx)
│   │       │   ├── [CourseCatalogTemplate.tsx](./src/components/templates/blog/CourseCatalogTemplate.tsx)
│   │       │   ├── [CourseDetailTemplate.tsx](./src/components/templates/blog/CourseDetailTemplate.tsx)
│   │       │   ├── [InstructorsTemplate.tsx](./src/components/templates/blog/InstructorsTemplate.tsx)
│   │       │   ├── [LearningAnalyticsTemplate.tsx](./src/components/templates/blog/LearningAnalyticsTemplate.tsx)
│   │       │   ├── [LessonPlayerTemplate.tsx](./src/components/templates/blog/LessonPlayerTemplate.tsx)
│   │       │   ├── [MyCoursesTemplate.tsx](./src/components/templates/blog/MyCoursesTemplate.tsx)
│   │       │   ├── [QuizzesTemplate.tsx](./src/components/templates/blog/QuizzesTemplate.tsx)
│   │       │   └── [index.ts](./src/components/templates/blog/index.ts)
│   │       ├── crm/
│   │       │   ├── __tests__/
│   │       │   │   ├── [AccountsTemplate.test.tsx](./src/components/templates/crm/__tests__/AccountsTemplate.test.tsx)
│   │       │   │   ├── [CampaignsTemplate.test.tsx](./src/components/templates/crm/__tests__/CampaignsTemplate.test.tsx)
│   │       │   │   ├── [CouponsTemplate.test.tsx](./src/components/templates/crm/__tests__/CouponsTemplate.test.tsx)
│   │       │   │   ├── [CrmContactsTemplate.test.tsx](./src/components/templates/crm/__tests__/CrmContactsTemplate.test.tsx)
│   │       │   │   ├── [CustomersTemplate.test.tsx](./src/components/templates/crm/__tests__/CustomersTemplate.test.tsx)
│   │       │   │   ├── [DealsTemplate.test.tsx](./src/components/templates/crm/__tests__/DealsTemplate.test.tsx)
│   │       │   │   ├── [InventoryTemplate.test.tsx](./src/components/templates/crm/__tests__/InventoryTemplate.test.tsx)
│   │       │   │   ├── [LeadsTemplate.test.tsx](./src/components/templates/crm/__tests__/LeadsTemplate.test.tsx)
│   │       │   │   ├── [OrdersTemplate.test.tsx](./src/components/templates/crm/__tests__/OrdersTemplate.test.tsx)
│   │       │   │   ├── [PipelineTemplate.test.tsx](./src/components/templates/crm/__tests__/PipelineTemplate.test.tsx)
│   │       │   │   ├── [ProductsTemplate.test.tsx](./src/components/templates/crm/__tests__/ProductsTemplate.test.tsx)
│   │       │   │   ├── [PromotionsTemplate.test.tsx](./src/components/templates/crm/__tests__/PromotionsTemplate.test.tsx)
│   │       │   │   ├── [QuoteBuilderTemplate.test.tsx](./src/components/templates/crm/__tests__/QuoteBuilderTemplate.test.tsx)
│   │       │   │   ├── [RefundsTemplate.test.tsx](./src/components/templates/crm/__tests__/RefundsTemplate.test.tsx)
│   │       │   │   ├── [SalesReportsTemplate.test.tsx](./src/components/templates/crm/__tests__/SalesReportsTemplate.test.tsx)
│   │       │   │   └── [ShipmentsTemplate.test.tsx](./src/components/templates/crm/__tests__/ShipmentsTemplate.test.tsx)
│   │       │   ├── [AccountsTemplate.tsx](./src/components/templates/crm/AccountsTemplate.tsx)
│   │       │   ├── [CampaignsTemplate.tsx](./src/components/templates/crm/CampaignsTemplate.tsx)
│   │       │   ├── [CouponsTemplate.tsx](./src/components/templates/crm/CouponsTemplate.tsx)
│   │       │   ├── [CrmContactsTemplate.tsx](./src/components/templates/crm/CrmContactsTemplate.tsx)
│   │       │   ├── [CustomersTemplate.tsx](./src/components/templates/crm/CustomersTemplate.tsx)
│   │       │   ├── [DealsTemplate.tsx](./src/components/templates/crm/DealsTemplate.tsx)
│   │       │   ├── [InventoryTemplate.tsx](./src/components/templates/crm/InventoryTemplate.tsx)
│   │       │   ├── [LeadsTemplate.tsx](./src/components/templates/crm/LeadsTemplate.tsx)
│   │       │   ├── [OrdersTemplate.tsx](./src/components/templates/crm/OrdersTemplate.tsx)
│   │       │   ├── [PipelineTemplate.tsx](./src/components/templates/crm/PipelineTemplate.tsx)
│   │       │   ├── [ProductsTemplate.tsx](./src/components/templates/crm/ProductsTemplate.tsx)
│   │       │   ├── [PromotionsTemplate.tsx](./src/components/templates/crm/PromotionsTemplate.tsx)
│   │       │   ├── [QuoteBuilderTemplate.tsx](./src/components/templates/crm/QuoteBuilderTemplate.tsx)
│   │       │   ├── [RefundsTemplate.tsx](./src/components/templates/crm/RefundsTemplate.tsx)
│   │       │   ├── [SalesReportsTemplate.tsx](./src/components/templates/crm/SalesReportsTemplate.tsx)
│   │       │   ├── [ShipmentsTemplate.tsx](./src/components/templates/crm/ShipmentsTemplate.tsx)
│   │       │   └── [index.ts](./src/components/templates/crm/index.ts)
│   │       ├── developer/
│   │       │   ├── __tests__/
│   │       │   │   ├── [ApiKeysTemplate.test.tsx](./src/components/templates/developer/__tests__/ApiKeysTemplate.test.tsx)
│   │       │   │   ├── [AutomationsTemplate.test.tsx](./src/components/templates/developer/__tests__/AutomationsTemplate.test.tsx)
│   │       │   │   ├── [BackupsTemplate.test.tsx](./src/components/templates/developer/__tests__/BackupsTemplate.test.tsx)
│   │       │   │   ├── [DeploymentsTemplate.test.tsx](./src/components/templates/developer/__tests__/DeploymentsTemplate.test.tsx)
│   │       │   │   ├── [DeviceDashboardTemplate.test.tsx](./src/components/templates/developer/__tests__/DeviceDashboardTemplate.test.tsx)
│   │       │   │   ├── [DeviceDetailTemplate.test.tsx](./src/components/templates/developer/__tests__/DeviceDetailTemplate.test.tsx)
│   │       │   │   ├── [EndpointsTemplate.test.tsx](./src/components/templates/developer/__tests__/EndpointsTemplate.test.tsx)
│   │       │   │   ├── [EnergyUsageTemplate.test.tsx](./src/components/templates/developer/__tests__/EnergyUsageTemplate.test.tsx)
│   │       │   │   ├── [EnvironmentsTemplate.test.tsx](./src/components/templates/developer/__tests__/EnvironmentsTemplate.test.tsx)
│   │       │   │   ├── [FeatureFlagsTemplate.test.tsx](./src/components/templates/developer/__tests__/FeatureFlagsTemplate.test.tsx)
│   │       │   │   ├── [LogsTemplate.test.tsx](./src/components/templates/developer/__tests__/LogsTemplate.test.tsx)
│   │       │   │   ├── [MonitorsTemplate.test.tsx](./src/components/templates/developer/__tests__/MonitorsTemplate.test.tsx)
│   │       │   │   ├── [ScenesTemplate.test.tsx](./src/components/templates/developer/__tests__/ScenesTemplate.test.tsx)
│   │       │   │   ├── [SensorDataTemplate.test.tsx](./src/components/templates/developer/__tests__/SensorDataTemplate.test.tsx)
│   │       │   │   ├── [SmartHomeSettingsTemplate.test.tsx](./src/components/templates/developer/__tests__/SmartHomeSettingsTemplate.test.tsx)
│   │       │   │   └── [WebhooksTemplate.test.tsx](./src/components/templates/developer/__tests__/WebhooksTemplate.test.tsx)
│   │       │   ├── [ApiKeysTemplate.tsx](./src/components/templates/developer/ApiKeysTemplate.tsx)
│   │       │   ├── [AutomationsTemplate.tsx](./src/components/templates/developer/AutomationsTemplate.tsx)
│   │       │   ├── [BackupsTemplate.tsx](./src/components/templates/developer/BackupsTemplate.tsx)
│   │       │   ├── [DeploymentsTemplate.tsx](./src/components/templates/developer/DeploymentsTemplate.tsx)
│   │       │   ├── [DeviceDashboardTemplate.tsx](./src/components/templates/developer/DeviceDashboardTemplate.tsx)
│   │       │   ├── [DeviceDetailTemplate.tsx](./src/components/templates/developer/DeviceDetailTemplate.tsx)
│   │       │   ├── [EndpointsTemplate.tsx](./src/components/templates/developer/EndpointsTemplate.tsx)
│   │       │   ├── [EnergyUsageTemplate.tsx](./src/components/templates/developer/EnergyUsageTemplate.tsx)
│   │       │   ├── [EnvironmentsTemplate.tsx](./src/components/templates/developer/EnvironmentsTemplate.tsx)
│   │       │   ├── [FeatureFlagsTemplate.tsx](./src/components/templates/developer/FeatureFlagsTemplate.tsx)
│   │       │   ├── [LogsTemplate.tsx](./src/components/templates/developer/LogsTemplate.tsx)
│   │       │   ├── [MonitorsTemplate.tsx](./src/components/templates/developer/MonitorsTemplate.tsx)
│   │       │   ├── [ScenesTemplate.tsx](./src/components/templates/developer/ScenesTemplate.tsx)
│   │       │   ├── [SensorDataTemplate.tsx](./src/components/templates/developer/SensorDataTemplate.tsx)
│   │       │   ├── [SmartHomeSettingsTemplate.tsx](./src/components/templates/developer/SmartHomeSettingsTemplate.tsx)
│   │       │   ├── [WebhooksTemplate.tsx](./src/components/templates/developer/WebhooksTemplate.tsx)
│   │       │   └── [index.ts](./src/components/templates/developer/index.ts)
│   │       ├── finance/
│   │       │   ├── __tests__/
│   │       │   │   ├── [AccountsTemplate.test.tsx](./src/components/templates/finance/__tests__/AccountsTemplate.test.tsx)
│   │       │   │   ├── [AlertsTemplate.test.tsx](./src/components/templates/finance/__tests__/AlertsTemplate.test.tsx)
│   │       │   │   ├── [BillingTemplate.test.tsx](./src/components/templates/finance/__tests__/BillingTemplate.test.tsx)
│   │       │   │   ├── [BudgetsTemplate.test.tsx](./src/components/templates/finance/__tests__/BudgetsTemplate.test.tsx)
│   │       │   │   ├── [DividendIncomeTemplate.test.tsx](./src/components/templates/finance/__tests__/DividendIncomeTemplate.test.tsx)
│   │       │   │   ├── [ExpensesTemplate.test.tsx](./src/components/templates/finance/__tests__/ExpensesTemplate.test.tsx)
│   │       │   │   ├── [HoldingsTemplate.test.tsx](./src/components/templates/finance/__tests__/HoldingsTemplate.test.tsx)
│   │       │   │   ├── [InvoicesTemplate.test.tsx](./src/components/templates/finance/__tests__/InvoicesTemplate.test.tsx)
│   │       │   │   ├── [PayrollTemplate.test.tsx](./src/components/templates/finance/__tests__/PayrollTemplate.test.tsx)
│   │       │   │   ├── [PerformanceTemplate.test.tsx](./src/components/templates/finance/__tests__/PerformanceTemplate.test.tsx)
│   │       │   │   ├── [PortfolioOverviewTemplate.test.tsx](./src/components/templates/finance/__tests__/PortfolioOverviewTemplate.test.tsx)
│   │       │   │   ├── [PortfolioSettingsTemplate.test.tsx](./src/components/templates/finance/__tests__/PortfolioSettingsTemplate.test.tsx)
│   │       │   │   ├── [StatementsTemplate.test.tsx](./src/components/templates/finance/__tests__/StatementsTemplate.test.tsx)
│   │       │   │   ├── [SubscriptionsTemplate.test.tsx](./src/components/templates/finance/__tests__/SubscriptionsTemplate.test.tsx)
│   │       │   │   ├── [TaxesTemplate.test.tsx](./src/components/templates/finance/__tests__/TaxesTemplate.test.tsx)
│   │       │   │   └── [TransactionsTemplate.test.tsx](./src/components/templates/finance/__tests__/TransactionsTemplate.test.tsx)
│   │       │   ├── [AccountsTemplate.tsx](./src/components/templates/finance/AccountsTemplate.tsx)
│   │       │   ├── [AlertsTemplate.tsx](./src/components/templates/finance/AlertsTemplate.tsx)
│   │       │   ├── [BillingTemplate.tsx](./src/components/templates/finance/BillingTemplate.tsx)
│   │       │   ├── [BudgetsTemplate.tsx](./src/components/templates/finance/BudgetsTemplate.tsx)
│   │       │   ├── [DividendIncomeTemplate.tsx](./src/components/templates/finance/DividendIncomeTemplate.tsx)
│   │       │   ├── [ExpensesTemplate.tsx](./src/components/templates/finance/ExpensesTemplate.tsx)
│   │       │   ├── [HoldingsTemplate.tsx](./src/components/templates/finance/HoldingsTemplate.tsx)
│   │       │   ├── [InvoicesTemplate.tsx](./src/components/templates/finance/InvoicesTemplate.tsx)
│   │       │   ├── [PayrollTemplate.tsx](./src/components/templates/finance/PayrollTemplate.tsx)
│   │       │   ├── [PerformanceTemplate.tsx](./src/components/templates/finance/PerformanceTemplate.tsx)
│   │       │   ├── [PortfolioOverviewTemplate.tsx](./src/components/templates/finance/PortfolioOverviewTemplate.tsx)
│   │       │   ├── [PortfolioSettingsTemplate.tsx](./src/components/templates/finance/PortfolioSettingsTemplate.tsx)
│   │       │   ├── [StatementsTemplate.tsx](./src/components/templates/finance/StatementsTemplate.tsx)
│   │       │   ├── [SubscriptionsTemplate.tsx](./src/components/templates/finance/SubscriptionsTemplate.tsx)
│   │       │   ├── [TaxesTemplate.tsx](./src/components/templates/finance/TaxesTemplate.tsx)
│   │       │   ├── [TransactionsTemplate.tsx](./src/components/templates/finance/TransactionsTemplate.tsx)
│   │       │   └── [index.ts](./src/components/templates/finance/index.ts)
│   │       ├── health/
│   │       │   ├── __tests__/
│   │       │   │   ├── [ActivityTrackerTemplate.test.tsx](./src/components/templates/health/__tests__/ActivityTrackerTemplate.test.tsx)
│   │       │   │   ├── [FoodDeliveryTemplate.test.tsx](./src/components/templates/health/__tests__/FoodDeliveryTemplate.test.tsx)
│   │       │   │   ├── [GoalsTemplate.test.tsx](./src/components/templates/health/__tests__/GoalsTemplate.test.tsx)
│   │       │   │   ├── [HealthDashboardTemplate.test.tsx](./src/components/templates/health/__tests__/HealthDashboardTemplate.test.tsx)
│   │       │   │   ├── [HealthProfileTemplate.test.tsx](./src/components/templates/health/__tests__/HealthProfileTemplate.test.tsx)
│   │       │   │   ├── [MenuTemplate.test.tsx](./src/components/templates/health/__tests__/MenuTemplate.test.tsx)
│   │       │   │   ├── [NutritionTrackerTemplate.test.tsx](./src/components/templates/health/__tests__/NutritionTrackerTemplate.test.tsx)
│   │       │   │   ├── [RecipeDetailTemplate.test.tsx](./src/components/templates/health/__tests__/RecipeDetailTemplate.test.tsx)
│   │       │   │   ├── [RecipesTemplate.test.tsx](./src/components/templates/health/__tests__/RecipesTemplate.test.tsx)
│   │       │   │   ├── [ReservationsTemplate.test.tsx](./src/components/templates/health/__tests__/ReservationsTemplate.test.tsx)
│   │       │   │   ├── [RestaurantDetailTemplate.test.tsx](./src/components/templates/health/__tests__/RestaurantDetailTemplate.test.tsx)
│   │       │   │   ├── [RestaurantListTemplate.test.tsx](./src/components/templates/health/__tests__/RestaurantListTemplate.test.tsx)
│   │       │   │   ├── [SleepTrackerTemplate.test.tsx](./src/components/templates/health/__tests__/SleepTrackerTemplate.test.tsx)
│   │       │   │   ├── [WaterIntakeTemplate.test.tsx](./src/components/templates/health/__tests__/WaterIntakeTemplate.test.tsx)
│   │       │   │   ├── [WineListTemplate.test.tsx](./src/components/templates/health/__tests__/WineListTemplate.test.tsx)
│   │       │   │   └── [WorkoutPlannerTemplate.test.tsx](./src/components/templates/health/__tests__/WorkoutPlannerTemplate.test.tsx)
│   │       │   ├── [ActivityTrackerTemplate.tsx](./src/components/templates/health/ActivityTrackerTemplate.tsx)
│   │       │   ├── [FoodDeliveryTemplate.tsx](./src/components/templates/health/FoodDeliveryTemplate.tsx)
│   │       │   ├── [GoalsTemplate.tsx](./src/components/templates/health/GoalsTemplate.tsx)
│   │       │   ├── [HealthDashboardTemplate.tsx](./src/components/templates/health/HealthDashboardTemplate.tsx)
│   │       │   ├── [HealthProfileTemplate.tsx](./src/components/templates/health/HealthProfileTemplate.tsx)
│   │       │   ├── [MenuTemplate.tsx](./src/components/templates/health/MenuTemplate.tsx)
│   │       │   ├── [NutritionTrackerTemplate.tsx](./src/components/templates/health/NutritionTrackerTemplate.tsx)
│   │       │   ├── [RecipeDetailTemplate.tsx](./src/components/templates/health/RecipeDetailTemplate.tsx)
│   │       │   ├── [RecipesTemplate.tsx](./src/components/templates/health/RecipesTemplate.tsx)
│   │       │   ├── [ReservationsTemplate.tsx](./src/components/templates/health/ReservationsTemplate.tsx)
│   │       │   ├── [RestaurantDetailTemplate.tsx](./src/components/templates/health/RestaurantDetailTemplate.tsx)
│   │       │   ├── [RestaurantListTemplate.tsx](./src/components/templates/health/RestaurantListTemplate.tsx)
│   │       │   ├── [SleepTrackerTemplate.tsx](./src/components/templates/health/SleepTrackerTemplate.tsx)
│   │       │   ├── [WaterIntakeTemplate.tsx](./src/components/templates/health/WaterIntakeTemplate.tsx)
│   │       │   ├── [WineListTemplate.tsx](./src/components/templates/health/WineListTemplate.tsx)
│   │       │   ├── [WorkoutPlannerTemplate.tsx](./src/components/templates/health/WorkoutPlannerTemplate.tsx)
│   │       │   └── [index.ts](./src/components/templates/health/index.ts)
│   │       ├── hr/
│   │       │   ├── __tests__/
│   │       │   │   ├── [AccordionTemplate.test.tsx](./src/components/templates/hr/__tests__/AccordionTemplate.test.tsx)
│   │       │   │   ├── [AlertsTemplate.test.tsx](./src/components/templates/hr/__tests__/AlertsTemplate.test.tsx)
│   │       │   │   ├── [BenefitsTemplate.test.tsx](./src/components/templates/hr/__tests__/BenefitsTemplate.test.tsx)
│   │       │   │   ├── [ChartsGalleryTemplate.test.tsx](./src/components/templates/hr/__tests__/ChartsGalleryTemplate.test.tsx)
│   │       │   │   ├── [DataTableTemplate.test.tsx](./src/components/templates/hr/__tests__/DataTableTemplate.test.tsx)
│   │       │   │   ├── [EmptyStatesTemplate.test.tsx](./src/components/templates/hr/__tests__/EmptyStatesTemplate.test.tsx)
│   │       │   │   ├── [FormsShowcaseTemplate.test.tsx](./src/components/templates/hr/__tests__/FormsShowcaseTemplate.test.tsx)
│   │       │   │   ├── [HiringPipelineTemplate.test.tsx](./src/components/templates/hr/__tests__/HiringPipelineTemplate.test.tsx)
│   │       │   │   ├── [ModalsTemplate.test.tsx](./src/components/templates/hr/__tests__/ModalsTemplate.test.tsx)
│   │       │   │   ├── [OrgChartTemplate.test.tsx](./src/components/templates/hr/__tests__/OrgChartTemplate.test.tsx)
│   │       │   │   ├── [PeopleDirectoryTemplate.test.tsx](./src/components/templates/hr/__tests__/PeopleDirectoryTemplate.test.tsx)
│   │       │   │   ├── [PerformanceReviewsTemplate.test.tsx](./src/components/templates/hr/__tests__/PerformanceReviewsTemplate.test.tsx)
│   │       │   │   ├── [PoliciesTemplate.test.tsx](./src/components/templates/hr/__tests__/PoliciesTemplate.test.tsx)
│   │       │   │   ├── [ShiftScheduleTemplate.test.tsx](./src/components/templates/hr/__tests__/ShiftScheduleTemplate.test.tsx)
│   │       │   │   ├── [TabsTemplate.test.tsx](./src/components/templates/hr/__tests__/TabsTemplate.test.tsx)
│   │       │   │   └── [TimeOffTemplate.test.tsx](./src/components/templates/hr/__tests__/TimeOffTemplate.test.tsx)
│   │       │   ├── [AccordionTemplate.tsx](./src/components/templates/hr/AccordionTemplate.tsx)
│   │       │   ├── [AlertsTemplate.tsx](./src/components/templates/hr/AlertsTemplate.tsx)
│   │       │   ├── [BenefitsTemplate.tsx](./src/components/templates/hr/BenefitsTemplate.tsx)
│   │       │   ├── [ChartsGalleryTemplate.tsx](./src/components/templates/hr/ChartsGalleryTemplate.tsx)
│   │       │   ├── [DataTableTemplate.tsx](./src/components/templates/hr/DataTableTemplate.tsx)
│   │       │   ├── [EmptyStatesTemplate.tsx](./src/components/templates/hr/EmptyStatesTemplate.tsx)
│   │       │   ├── [FormsShowcaseTemplate.tsx](./src/components/templates/hr/FormsShowcaseTemplate.tsx)
│   │       │   ├── [HiringPipelineTemplate.tsx](./src/components/templates/hr/HiringPipelineTemplate.tsx)
│   │       │   ├── [ModalsTemplate.tsx](./src/components/templates/hr/ModalsTemplate.tsx)
│   │       │   ├── [OrgChartTemplate.tsx](./src/components/templates/hr/OrgChartTemplate.tsx)
│   │       │   ├── [PeopleDirectoryTemplate.tsx](./src/components/templates/hr/PeopleDirectoryTemplate.tsx)
│   │       │   ├── [PerformanceReviewsTemplate.tsx](./src/components/templates/hr/PerformanceReviewsTemplate.tsx)
│   │       │   ├── [PoliciesTemplate.tsx](./src/components/templates/hr/PoliciesTemplate.tsx)
│   │       │   ├── [ShiftScheduleTemplate.tsx](./src/components/templates/hr/ShiftScheduleTemplate.tsx)
│   │       │   ├── [TabsTemplate.tsx](./src/components/templates/hr/TabsTemplate.tsx)
│   │       │   ├── [TimeOffTemplate.tsx](./src/components/templates/hr/TimeOffTemplate.tsx)
│   │       │   └── [index.ts](./src/components/templates/hr/index.ts)
│   │       ├── landing/
│   │       │   ├── __tests__/
│   │       │   │   ├── [CareersTemplate.test.tsx](./src/components/templates/landing/__tests__/CareersTemplate.test.tsx)
│   │       │   │   ├── [ChangelogTemplate.test.tsx](./src/components/templates/landing/__tests__/ChangelogTemplate.test.tsx)
│   │       │   │   ├── [ContactTemplate.test.tsx](./src/components/templates/landing/__tests__/ContactTemplate.test.tsx)
│   │       │   │   ├── [GameDetailTemplate.test.tsx](./src/components/templates/landing/__tests__/GameDetailTemplate.test.tsx)
│   │       │   │   ├── [LandingTemplate.test.tsx](./src/components/templates/landing/__tests__/LandingTemplate.test.tsx)
│   │       │   │   ├── [LegalTemplate.test.tsx](./src/components/templates/landing/__tests__/LegalTemplate.test.tsx)
│   │       │   │   ├── [NotesTemplate.test.tsx](./src/components/templates/landing/__tests__/NotesTemplate.test.tsx)
│   │       │   │   ├── [PricingTemplate.test.tsx](./src/components/templates/landing/__tests__/PricingTemplate.test.tsx)
│   │       │   │   ├── [ResumeTemplate.test.tsx](./src/components/templates/landing/__tests__/ResumeTemplate.test.tsx)
│   │       │   │   ├── [RoadmapTemplate.test.tsx](./src/components/templates/landing/__tests__/RoadmapTemplate.test.tsx)
│   │       │   │   ├── [SettingsTemplate.test.tsx](./src/components/templates/landing/__tests__/SettingsTemplate.test.tsx)
│   │       │   │   ├── [ShortcutsTemplate.test.tsx](./src/components/templates/landing/__tests__/ShortcutsTemplate.test.tsx)
│   │       │   │   ├── [SprintsTemplate.test.tsx](./src/components/templates/landing/__tests__/SprintsTemplate.test.tsx)
│   │       │   │   ├── [TeamTemplate.test.tsx](./src/components/templates/landing/__tests__/TeamTemplate.test.tsx)
│   │       │   │   ├── [VersionTemplate.test.tsx](./src/components/templates/landing/__tests__/VersionTemplate.test.tsx)
│   │       │   │   └── [WhiteboardTemplate.test.tsx](./src/components/templates/landing/__tests__/WhiteboardTemplate.test.tsx)
│   │       │   ├── [CareersTemplate.tsx](./src/components/templates/landing/CareersTemplate.tsx)
│   │       │   ├── [ChangelogTemplate.tsx](./src/components/templates/landing/ChangelogTemplate.tsx)
│   │       │   ├── [ContactTemplate.tsx](./src/components/templates/landing/ContactTemplate.tsx)
│   │       │   ├── [GameDetailTemplate.tsx](./src/components/templates/landing/GameDetailTemplate.tsx)
│   │       │   ├── [LandingTemplate.tsx](./src/components/templates/landing/LandingTemplate.tsx)
│   │       │   ├── [LegalTemplate.tsx](./src/components/templates/landing/LegalTemplate.tsx)
│   │       │   ├── [NotesTemplate.tsx](./src/components/templates/landing/NotesTemplate.tsx)
│   │       │   ├── [PricingTemplate.tsx](./src/components/templates/landing/PricingTemplate.tsx)
│   │       │   ├── [ResumeTemplate.tsx](./src/components/templates/landing/ResumeTemplate.tsx)
│   │       │   ├── [RoadmapTemplate.tsx](./src/components/templates/landing/RoadmapTemplate.tsx)
│   │       │   ├── [SettingsTemplate.tsx](./src/components/templates/landing/SettingsTemplate.tsx)
│   │       │   ├── [ShortcutsTemplate.tsx](./src/components/templates/landing/ShortcutsTemplate.tsx)
│   │       │   ├── [SprintsTemplate.tsx](./src/components/templates/landing/SprintsTemplate.tsx)
│   │       │   ├── [TeamTemplate.tsx](./src/components/templates/landing/TeamTemplate.tsx)
│   │       │   ├── [VersionTemplate.tsx](./src/components/templates/landing/VersionTemplate.tsx)
│   │       │   ├── [WhiteboardTemplate.tsx](./src/components/templates/landing/WhiteboardTemplate.tsx)
│   │       │   └── [index.ts](./src/components/templates/landing/index.ts)
│   │       ├── mail/
│   │       │   ├── __tests__/
│   │       │   │   ├── [AllocationTemplate.test.tsx](./src/components/templates/mail/__tests__/AllocationTemplate.test.tsx)
│   │       │   │   ├── [ComposeTemplate.test.tsx](./src/components/templates/mail/__tests__/ComposeTemplate.test.tsx)
│   │       │   │   ├── [DraftsTemplate.test.tsx](./src/components/templates/mail/__tests__/DraftsTemplate.test.tsx)
│   │       │   │   ├── [GameCatalogTemplate.test.tsx](./src/components/templates/mail/__tests__/GameCatalogTemplate.test.tsx)
│   │       │   │   ├── [ImportTemplate.test.tsx](./src/components/templates/mail/__tests__/ImportTemplate.test.tsx)
│   │       │   │   ├── [InboxTemplate.test.tsx](./src/components/templates/mail/__tests__/InboxTemplate.test.tsx)
│   │       │   │   ├── [LabelsTemplate.test.tsx](./src/components/templates/mail/__tests__/LabelsTemplate.test.tsx)
│   │       │   │   ├── [LaunchStatusTemplate.test.tsx](./src/components/templates/mail/__tests__/LaunchStatusTemplate.test.tsx)
│   │       │   │   ├── [MailSearchTemplate.test.tsx](./src/components/templates/mail/__tests__/MailSearchTemplate.test.tsx)
│   │       │   │   ├── [OnboardingTemplate.test.tsx](./src/components/templates/mail/__tests__/OnboardingTemplate.test.tsx)
│   │       │   │   ├── [SentTemplate.test.tsx](./src/components/templates/mail/__tests__/SentTemplate.test.tsx)
│   │       │   │   ├── [SpamTemplate.test.tsx](./src/components/templates/mail/__tests__/SpamTemplate.test.tsx)
│   │       │   │   ├── [ThreadTemplate.test.tsx](./src/components/templates/mail/__tests__/ThreadTemplate.test.tsx)
│   │       │   │   ├── [TimesheetsTemplate.test.tsx](./src/components/templates/mail/__tests__/TimesheetsTemplate.test.tsx)
│   │       │   │   ├── [TransactionsTemplate.test.tsx](./src/components/templates/mail/__tests__/TransactionsTemplate.test.tsx)
│   │       │   │   └── [WatchlistTemplate.test.tsx](./src/components/templates/mail/__tests__/WatchlistTemplate.test.tsx)
│   │       │   ├── [AllocationTemplate.tsx](./src/components/templates/mail/AllocationTemplate.tsx)
│   │       │   ├── [ComposeTemplate.tsx](./src/components/templates/mail/ComposeTemplate.tsx)
│   │       │   ├── [DraftsTemplate.tsx](./src/components/templates/mail/DraftsTemplate.tsx)
│   │       │   ├── [GameCatalogTemplate.tsx](./src/components/templates/mail/GameCatalogTemplate.tsx)
│   │       │   ├── [ImportTemplate.tsx](./src/components/templates/mail/ImportTemplate.tsx)
│   │       │   ├── [InboxTemplate.tsx](./src/components/templates/mail/InboxTemplate.tsx)
│   │       │   ├── [LabelsTemplate.tsx](./src/components/templates/mail/LabelsTemplate.tsx)
│   │       │   ├── [LaunchStatusTemplate.tsx](./src/components/templates/mail/LaunchStatusTemplate.tsx)
│   │       │   ├── [MailSearchTemplate.tsx](./src/components/templates/mail/MailSearchTemplate.tsx)
│   │       │   ├── [OnboardingTemplate.tsx](./src/components/templates/mail/OnboardingTemplate.tsx)
│   │       │   ├── [SentTemplate.tsx](./src/components/templates/mail/SentTemplate.tsx)
│   │       │   ├── [SpamTemplate.tsx](./src/components/templates/mail/SpamTemplate.tsx)
│   │       │   ├── [ThreadTemplate.tsx](./src/components/templates/mail/ThreadTemplate.tsx)
│   │       │   ├── [TimesheetsTemplate.tsx](./src/components/templates/mail/TimesheetsTemplate.tsx)
│   │       │   ├── [TransactionsTemplate.tsx](./src/components/templates/mail/TransactionsTemplate.tsx)
│   │       │   ├── [WatchlistTemplate.tsx](./src/components/templates/mail/WatchlistTemplate.tsx)
│   │       │   └── [index.ts](./src/components/templates/mail/index.ts)
│   │       ├── media/
│   │       │   ├── __tests__/
│   │       │   │   ├── [AlbumDetailTemplate.test.tsx](./src/components/templates/media/__tests__/AlbumDetailTemplate.test.tsx)
│   │       │   │   ├── [AlbumsTemplate.test.tsx](./src/components/templates/media/__tests__/AlbumsTemplate.test.tsx)
│   │       │   │   ├── [ArtistsTemplate.test.tsx](./src/components/templates/media/__tests__/ArtistsTemplate.test.tsx)
│   │       │   │   ├── [ChartsTemplate.test.tsx](./src/components/templates/media/__tests__/ChartsTemplate.test.tsx)
│   │       │   │   ├── [ContinueWatchingTemplate.test.tsx](./src/components/templates/media/__tests__/ContinueWatchingTemplate.test.tsx)
│   │       │   │   ├── [LyricsTemplate.test.tsx](./src/components/templates/media/__tests__/LyricsTemplate.test.tsx)
│   │       │   │   ├── [MediaLibraryTemplate.test.tsx](./src/components/templates/media/__tests__/MediaLibraryTemplate.test.tsx)
│   │       │   │   ├── [MovieDetailTemplate.test.tsx](./src/components/templates/media/__tests__/MovieDetailTemplate.test.tsx)
│   │       │   │   ├── [MusicHomeTemplate.test.tsx](./src/components/templates/media/__tests__/MusicHomeTemplate.test.tsx)
│   │       │   │   ├── [MusicSearchTemplate.test.tsx](./src/components/templates/media/__tests__/MusicSearchTemplate.test.tsx)
│   │       │   │   ├── [MyListTemplate.test.tsx](./src/components/templates/media/__tests__/MyListTemplate.test.tsx)
│   │       │   │   ├── [NowPlayingTemplate.test.tsx](./src/components/templates/media/__tests__/NowPlayingTemplate.test.tsx)
│   │       │   │   ├── [PlaylistTemplate.test.tsx](./src/components/templates/media/__tests__/PlaylistTemplate.test.tsx)
│   │       │   │   ├── [StreamingHomeTemplate.test.tsx](./src/components/templates/media/__tests__/StreamingHomeTemplate.test.tsx)
│   │       │   │   ├── [TvSeriesTemplate.test.tsx](./src/components/templates/media/__tests__/TvSeriesTemplate.test.tsx)
│   │       │   │   └── [VideoPlayerTemplate.test.tsx](./src/components/templates/media/__tests__/VideoPlayerTemplate.test.tsx)
│   │       │   ├── [AlbumDetailTemplate.tsx](./src/components/templates/media/AlbumDetailTemplate.tsx)
│   │       │   ├── [AlbumsTemplate.tsx](./src/components/templates/media/AlbumsTemplate.tsx)
│   │       │   ├── [ArtistsTemplate.tsx](./src/components/templates/media/ArtistsTemplate.tsx)
│   │       │   ├── [ChartsTemplate.tsx](./src/components/templates/media/ChartsTemplate.tsx)
│   │       │   ├── [ContinueWatchingTemplate.tsx](./src/components/templates/media/ContinueWatchingTemplate.tsx)
│   │       │   ├── [LyricsTemplate.tsx](./src/components/templates/media/LyricsTemplate.tsx)
│   │       │   ├── [MediaLibraryTemplate.tsx](./src/components/templates/media/MediaLibraryTemplate.tsx)
│   │       │   ├── [MovieDetailTemplate.tsx](./src/components/templates/media/MovieDetailTemplate.tsx)
│   │       │   ├── [MusicHomeTemplate.tsx](./src/components/templates/media/MusicHomeTemplate.tsx)
│   │       │   ├── [MusicSearchTemplate.tsx](./src/components/templates/media/MusicSearchTemplate.tsx)
│   │       │   ├── [MyListTemplate.tsx](./src/components/templates/media/MyListTemplate.tsx)
│   │       │   ├── [NowPlayingTemplate.tsx](./src/components/templates/media/NowPlayingTemplate.tsx)
│   │       │   ├── [PlaylistTemplate.tsx](./src/components/templates/media/PlaylistTemplate.tsx)
│   │       │   ├── [StreamingHomeTemplate.tsx](./src/components/templates/media/StreamingHomeTemplate.tsx)
│   │       │   ├── [TvSeriesTemplate.tsx](./src/components/templates/media/TvSeriesTemplate.tsx)
│   │       │   ├── [VideoPlayerTemplate.tsx](./src/components/templates/media/VideoPlayerTemplate.tsx)
│   │       │   └── [index.ts](./src/components/templates/media/index.ts)
│   │       ├── news/
│   │       │   ├── __tests__/
│   │       │   │   ├── [ArticleTemplate.test.tsx](./src/components/templates/news/__tests__/ArticleTemplate.test.tsx)
│   │       │   │   ├── [BreakingNewsTemplate.test.tsx](./src/components/templates/news/__tests__/BreakingNewsTemplate.test.tsx)
│   │       │   │   ├── [EditorialTemplate.test.tsx](./src/components/templates/news/__tests__/EditorialTemplate.test.tsx)
│   │       │   │   ├── [FavoriteTeamsTemplate.test.tsx](./src/components/templates/news/__tests__/FavoriteTeamsTemplate.test.tsx)
│   │       │   │   ├── [FixturesTemplate.test.tsx](./src/components/templates/news/__tests__/FixturesTemplate.test.tsx)
│   │       │   │   ├── [LiveScoresTemplate.test.tsx](./src/components/templates/news/__tests__/LiveScoresTemplate.test.tsx)
│   │       │   │   ├── [MagazineGridTemplate.test.tsx](./src/components/templates/news/__tests__/MagazineGridTemplate.test.tsx)
│   │       │   │   ├── [MatchDetailTemplate.test.tsx](./src/components/templates/news/__tests__/MatchDetailTemplate.test.tsx)
│   │       │   │   ├── [NewsCategoriesTemplate.test.tsx](./src/components/templates/news/__tests__/NewsCategoriesTemplate.test.tsx)
│   │       │   │   ├── [NewsletterSignupTemplate.test.tsx](./src/components/templates/news/__tests__/NewsletterSignupTemplate.test.tsx)
│   │       │   │   ├── [OpinionTemplate.test.tsx](./src/components/templates/news/__tests__/OpinionTemplate.test.tsx)
│   │       │   │   ├── [PlayerStatsTemplate.test.tsx](./src/components/templates/news/__tests__/PlayerStatsTemplate.test.tsx)
│   │       │   │   ├── [PressReleasesTemplate.test.tsx](./src/components/templates/news/__tests__/PressReleasesTemplate.test.tsx)
│   │       │   │   ├── [SeasonStandingsTemplate.test.tsx](./src/components/templates/news/__tests__/SeasonStandingsTemplate.test.tsx)
│   │       │   │   ├── [SportsNewsTemplate.test.tsx](./src/components/templates/news/__tests__/SportsNewsTemplate.test.tsx)
│   │       │   │   └── [TeamRosterTemplate.test.tsx](./src/components/templates/news/__tests__/TeamRosterTemplate.test.tsx)
│   │       │   ├── [ArticleTemplate.tsx](./src/components/templates/news/ArticleTemplate.tsx)
│   │       │   ├── [BreakingNewsTemplate.tsx](./src/components/templates/news/BreakingNewsTemplate.tsx)
│   │       │   ├── [EditorialTemplate.tsx](./src/components/templates/news/EditorialTemplate.tsx)
│   │       │   ├── [FavoriteTeamsTemplate.tsx](./src/components/templates/news/FavoriteTeamsTemplate.tsx)
│   │       │   ├── [FixturesTemplate.tsx](./src/components/templates/news/FixturesTemplate.tsx)
│   │       │   ├── [LiveScoresTemplate.tsx](./src/components/templates/news/LiveScoresTemplate.tsx)
│   │       │   ├── [MagazineGridTemplate.tsx](./src/components/templates/news/MagazineGridTemplate.tsx)
│   │       │   ├── [MatchDetailTemplate.tsx](./src/components/templates/news/MatchDetailTemplate.tsx)
│   │       │   ├── [NewsCategoriesTemplate.tsx](./src/components/templates/news/NewsCategoriesTemplate.tsx)
│   │       │   ├── [NewsletterSignupTemplate.tsx](./src/components/templates/news/NewsletterSignupTemplate.tsx)
│   │       │   ├── [OpinionTemplate.tsx](./src/components/templates/news/OpinionTemplate.tsx)
│   │       │   ├── [PlayerStatsTemplate.tsx](./src/components/templates/news/PlayerStatsTemplate.tsx)
│   │       │   ├── [PressReleasesTemplate.tsx](./src/components/templates/news/PressReleasesTemplate.tsx)
│   │       │   ├── [SeasonStandingsTemplate.tsx](./src/components/templates/news/SeasonStandingsTemplate.tsx)
│   │       │   ├── [SportsNewsTemplate.tsx](./src/components/templates/news/SportsNewsTemplate.tsx)
│   │       │   ├── [TeamRosterTemplate.tsx](./src/components/templates/news/TeamRosterTemplate.tsx)
│   │       │   └── [index.ts](./src/components/templates/news/index.ts)
│   │       ├── shared/
│   │       │   ├── __tests__/
│   │       │   │   └── [PageShell.test.tsx](./src/components/templates/shared/__tests__/PageShell.test.tsx)
│   │       │   ├── [PageShell.tsx](./src/components/templates/shared/PageShell.tsx)
│   │       │   └── [index.ts](./src/components/templates/shared/index.ts)
│   │       ├── social/
│   │       │   ├── __tests__/
│   │       │   │   ├── [EventsTemplate.test.tsx](./src/components/templates/social/__tests__/EventsTemplate.test.tsx)
│   │       │   │   ├── [FeedTemplate.test.tsx](./src/components/templates/social/__tests__/FeedTemplate.test.tsx)
│   │       │   │   ├── [FollowersTemplate.test.tsx](./src/components/templates/social/__tests__/FollowersTemplate.test.tsx)
│   │       │   │   ├── [GameChallengesTemplate.test.tsx](./src/components/templates/social/__tests__/GameChallengesTemplate.test.tsx)
│   │       │   │   ├── [GameNewsTemplate.test.tsx](./src/components/templates/social/__tests__/GameNewsTemplate.test.tsx)
│   │       │   │   ├── [GroupsTemplate.test.tsx](./src/components/templates/social/__tests__/GroupsTemplate.test.tsx)
│   │       │   │   ├── [LeaderboardsTemplate.test.tsx](./src/components/templates/social/__tests__/LeaderboardsTemplate.test.tsx)
│   │       │   │   ├── [LiveChannelsTemplate.test.tsx](./src/components/templates/social/__tests__/LiveChannelsTemplate.test.tsx)
│   │       │   │   ├── [LiveMatchesTemplate.test.tsx](./src/components/templates/social/__tests__/LiveMatchesTemplate.test.tsx)
│   │       │   │   ├── [MessagesTemplate.test.tsx](./src/components/templates/social/__tests__/MessagesTemplate.test.tsx)
│   │       │   │   ├── [PlayerProfilesTemplate.test.tsx](./src/components/templates/social/__tests__/PlayerProfilesTemplate.test.tsx)
│   │       │   │   ├── [ProfileTemplate.test.tsx](./src/components/templates/social/__tests__/ProfileTemplate.test.tsx)
│   │       │   │   ├── [ReportsTemplate.test.tsx](./src/components/templates/social/__tests__/ReportsTemplate.test.tsx)
│   │       │   │   ├── [StreamingSearchTemplate.test.tsx](./src/components/templates/social/__tests__/StreamingSearchTemplate.test.tsx)
│   │       │   │   ├── [TournamentsTemplate.test.tsx](./src/components/templates/social/__tests__/TournamentsTemplate.test.tsx)
│   │       │   │   └── [WatchHistoryTemplate.test.tsx](./src/components/templates/social/__tests__/WatchHistoryTemplate.test.tsx)
│   │       │   ├── [EventsTemplate.tsx](./src/components/templates/social/EventsTemplate.tsx)
│   │       │   ├── [FeedTemplate.tsx](./src/components/templates/social/FeedTemplate.tsx)
│   │       │   ├── [FollowersTemplate.tsx](./src/components/templates/social/FollowersTemplate.tsx)
│   │       │   ├── [GameChallengesTemplate.tsx](./src/components/templates/social/GameChallengesTemplate.tsx)
│   │       │   ├── [GameNewsTemplate.tsx](./src/components/templates/social/GameNewsTemplate.tsx)
│   │       │   ├── [GroupsTemplate.tsx](./src/components/templates/social/GroupsTemplate.tsx)
│   │       │   ├── [LeaderboardsTemplate.tsx](./src/components/templates/social/LeaderboardsTemplate.tsx)
│   │       │   ├── [LiveChannelsTemplate.tsx](./src/components/templates/social/LiveChannelsTemplate.tsx)
│   │       │   ├── [LiveMatchesTemplate.tsx](./src/components/templates/social/LiveMatchesTemplate.tsx)
│   │       │   ├── [MessagesTemplate.tsx](./src/components/templates/social/MessagesTemplate.tsx)
│   │       │   ├── [PlayerProfilesTemplate.tsx](./src/components/templates/social/PlayerProfilesTemplate.tsx)
│   │       │   ├── [ProfileTemplate.tsx](./src/components/templates/social/ProfileTemplate.tsx)
│   │       │   ├── [ReportsTemplate.tsx](./src/components/templates/social/ReportsTemplate.tsx)
│   │       │   ├── [StreamingSearchTemplate.tsx](./src/components/templates/social/StreamingSearchTemplate.tsx)
│   │       │   ├── [TournamentsTemplate.tsx](./src/components/templates/social/TournamentsTemplate.tsx)
│   │       │   ├── [WatchHistoryTemplate.tsx](./src/components/templates/social/WatchHistoryTemplate.tsx)
│   │       │   └── [index.ts](./src/components/templates/social/index.ts)
│   │       ├── store/
│   │       │   ├── __tests__/
│   │       │   │   ├── [AddressBookTemplate.test.tsx](./src/components/templates/store/__tests__/AddressBookTemplate.test.tsx)
│   │       │   │   ├── [CartTemplate.test.tsx](./src/components/templates/store/__tests__/CartTemplate.test.tsx)
│   │       │   │   ├── [CategoriesTemplate.test.tsx](./src/components/templates/store/__tests__/CategoriesTemplate.test.tsx)
│   │       │   │   ├── [CheckoutTemplate.test.tsx](./src/components/templates/store/__tests__/CheckoutTemplate.test.tsx)
│   │       │   │   ├── [CompareTemplate.test.tsx](./src/components/templates/store/__tests__/CompareTemplate.test.tsx)
│   │       │   │   ├── [DealsTemplate.test.tsx](./src/components/templates/store/__tests__/DealsTemplate.test.tsx)
│   │       │   │   ├── [GiftCardsTemplate.test.tsx](./src/components/templates/store/__tests__/GiftCardsTemplate.test.tsx)
│   │       │   │   ├── [OrderConfirmationTemplate.test.tsx](./src/components/templates/store/__tests__/OrderConfirmationTemplate.test.tsx)
│   │       │   │   ├── [OrderHistoryTemplate.test.tsx](./src/components/templates/store/__tests__/OrderHistoryTemplate.test.tsx)
│   │       │   │   ├── [OrderTrackingTemplate.test.tsx](./src/components/templates/store/__tests__/OrderTrackingTemplate.test.tsx)
│   │       │   │   ├── [PaymentMethodsTemplate.test.tsx](./src/components/templates/store/__tests__/PaymentMethodsTemplate.test.tsx)
│   │       │   │   ├── [ReviewsTemplate.test.tsx](./src/components/templates/store/__tests__/ReviewsTemplate.test.tsx)
│   │       │   │   ├── [StoreFrontTemplate.test.tsx](./src/components/templates/store/__tests__/StoreFrontTemplate.test.tsx)
│   │       │   │   ├── [StoreItemTemplate.test.tsx](./src/components/templates/store/__tests__/StoreItemTemplate.test.tsx)
│   │       │   │   ├── [SupportTemplate.test.tsx](./src/components/templates/store/__tests__/SupportTemplate.test.tsx)
│   │       │   │   └── [WishlistTemplate.test.tsx](./src/components/templates/store/__tests__/WishlistTemplate.test.tsx)
│   │       │   ├── [AddressBookTemplate.tsx](./src/components/templates/store/AddressBookTemplate.tsx)
│   │       │   ├── [CartTemplate.tsx](./src/components/templates/store/CartTemplate.tsx)
│   │       │   ├── [CategoriesTemplate.tsx](./src/components/templates/store/CategoriesTemplate.tsx)
│   │       │   ├── [CheckoutTemplate.tsx](./src/components/templates/store/CheckoutTemplate.tsx)
│   │       │   ├── [CompareTemplate.tsx](./src/components/templates/store/CompareTemplate.tsx)
│   │       │   ├── [DealsTemplate.tsx](./src/components/templates/store/DealsTemplate.tsx)
│   │       │   ├── [GiftCardsTemplate.tsx](./src/components/templates/store/GiftCardsTemplate.tsx)
│   │       │   ├── [OrderConfirmationTemplate.tsx](./src/components/templates/store/OrderConfirmationTemplate.tsx)
│   │       │   ├── [OrderHistoryTemplate.tsx](./src/components/templates/store/OrderHistoryTemplate.tsx)
│   │       │   ├── [OrderTrackingTemplate.tsx](./src/components/templates/store/OrderTrackingTemplate.tsx)
│   │       │   ├── [PaymentMethodsTemplate.tsx](./src/components/templates/store/PaymentMethodsTemplate.tsx)
│   │       │   ├── [ReviewsTemplate.tsx](./src/components/templates/store/ReviewsTemplate.tsx)
│   │       │   ├── [StoreFrontTemplate.tsx](./src/components/templates/store/StoreFrontTemplate.tsx)
│   │       │   ├── [StoreItemTemplate.tsx](./src/components/templates/store/StoreItemTemplate.tsx)
│   │       │   ├── [SupportTemplate.tsx](./src/components/templates/store/SupportTemplate.tsx)
│   │       │   ├── [WishlistTemplate.tsx](./src/components/templates/store/WishlistTemplate.tsx)
│   │       │   └── [index.ts](./src/components/templates/store/index.ts)
│   │       ├── support/
│   │       │   ├── __tests__/
│   │       │   │   ├── [AboutTemplate.test.tsx](./src/components/templates/support/__tests__/AboutTemplate.test.tsx)
│   │       │   │   ├── [AnnouncementsTemplate.test.tsx](./src/components/templates/support/__tests__/AnnouncementsTemplate.test.tsx)
│   │       │   │   ├── [CookieConsentTemplate.test.tsx](./src/components/templates/support/__tests__/CookieConsentTemplate.test.tsx)
│   │       │   │   ├── [FaqTemplate.test.tsx](./src/components/templates/support/__tests__/FaqTemplate.test.tsx)
│   │       │   │   ├── [FeedbackTemplate.test.tsx](./src/components/templates/support/__tests__/FeedbackTemplate.test.tsx)
│   │       │   │   ├── [KnowledgeBaseTemplate.test.tsx](./src/components/templates/support/__tests__/KnowledgeBaseTemplate.test.tsx)
│   │       │   │   ├── [LiveChatTemplate.test.tsx](./src/components/templates/support/__tests__/LiveChatTemplate.test.tsx)
│   │       │   │   ├── [LoadingTemplate.test.tsx](./src/components/templates/support/__tests__/LoadingTemplate.test.tsx)
│   │       │   │   ├── [PaginationTemplate.test.tsx](./src/components/templates/support/__tests__/PaginationTemplate.test.tsx)
│   │       │   │   ├── [SearchTemplate.test.tsx](./src/components/templates/support/__tests__/SearchTemplate.test.tsx)
│   │       │   │   ├── [ServiceStatusTemplate.test.tsx](./src/components/templates/support/__tests__/ServiceStatusTemplate.test.tsx)
│   │       │   │   ├── [StepperTemplate.test.tsx](./src/components/templates/support/__tests__/StepperTemplate.test.tsx)
│   │       │   │   ├── [TicketDetailTemplate.test.tsx](./src/components/templates/support/__tests__/TicketDetailTemplate.test.tsx)
│   │       │   │   ├── [TicketsTemplate.test.tsx](./src/components/templates/support/__tests__/TicketsTemplate.test.tsx)
│   │       │   │   ├── [TooltipsTemplate.test.tsx](./src/components/templates/support/__tests__/TooltipsTemplate.test.tsx)
│   │       │   │   └── [UploadTemplate.test.tsx](./src/components/templates/support/__tests__/UploadTemplate.test.tsx)
│   │       │   ├── [AboutTemplate.tsx](./src/components/templates/support/AboutTemplate.tsx)
│   │       │   ├── [AnnouncementsTemplate.tsx](./src/components/templates/support/AnnouncementsTemplate.tsx)
│   │       │   ├── [CookieConsentTemplate.tsx](./src/components/templates/support/CookieConsentTemplate.tsx)
│   │       │   ├── [FaqTemplate.tsx](./src/components/templates/support/FaqTemplate.tsx)
│   │       │   ├── [FeedbackTemplate.tsx](./src/components/templates/support/FeedbackTemplate.tsx)
│   │       │   ├── [KnowledgeBaseTemplate.tsx](./src/components/templates/support/KnowledgeBaseTemplate.tsx)
│   │       │   ├── [LiveChatTemplate.tsx](./src/components/templates/support/LiveChatTemplate.tsx)
│   │       │   ├── [LoadingTemplate.tsx](./src/components/templates/support/LoadingTemplate.tsx)
│   │       │   ├── [PaginationTemplate.tsx](./src/components/templates/support/PaginationTemplate.tsx)
│   │       │   ├── [SearchTemplate.tsx](./src/components/templates/support/SearchTemplate.tsx)
│   │       │   ├── [ServiceStatusTemplate.tsx](./src/components/templates/support/ServiceStatusTemplate.tsx)
│   │       │   ├── [StepperTemplate.tsx](./src/components/templates/support/StepperTemplate.tsx)
│   │       │   ├── [TicketDetailTemplate.tsx](./src/components/templates/support/TicketDetailTemplate.tsx)
│   │       │   ├── [TicketsTemplate.tsx](./src/components/templates/support/TicketsTemplate.tsx)
│   │       │   ├── [TooltipsTemplate.tsx](./src/components/templates/support/TooltipsTemplate.tsx)
│   │       │   ├── [UploadTemplate.tsx](./src/components/templates/support/UploadTemplate.tsx)
│   │       │   └── [index.ts](./src/components/templates/support/index.ts)
│   │       └── travel/
│   │           ├── __tests__/
│   │           │   ├── [AgentProfileTemplate.test.tsx](./src/components/templates/travel/__tests__/AgentProfileTemplate.test.tsx)
│   │           │   ├── [BookingSearchTemplate.test.tsx](./src/components/templates/travel/__tests__/BookingSearchTemplate.test.tsx)
│   │           │   ├── [BookingsTemplate.test.tsx](./src/components/templates/travel/__tests__/BookingsTemplate.test.tsx)
│   │           │   ├── [DestinationsTemplate.test.tsx](./src/components/templates/travel/__tests__/DestinationsTemplate.test.tsx)
│   │           │   ├── [HotelDetailTemplate.test.tsx](./src/components/templates/travel/__tests__/HotelDetailTemplate.test.tsx)
│   │           │   ├── [MapViewTemplate.test.tsx](./src/components/templates/travel/__tests__/MapViewTemplate.test.tsx)
│   │           │   ├── [MortgageCalculatorTemplate.test.tsx](./src/components/templates/travel/__tests__/MortgageCalculatorTemplate.test.tsx)
│   │           │   ├── [OpenHousesTemplate.test.tsx](./src/components/templates/travel/__tests__/OpenHousesTemplate.test.tsx)
│   │           │   ├── [PackingListTemplate.test.tsx](./src/components/templates/travel/__tests__/PackingListTemplate.test.tsx)
│   │           │   ├── [PropertyDetailTemplate.test.tsx](./src/components/templates/travel/__tests__/PropertyDetailTemplate.test.tsx)
│   │           │   ├── [PropertyListingsTemplate.test.tsx](./src/components/templates/travel/__tests__/PropertyListingsTemplate.test.tsx)
│   │           │   ├── [SavedPropertiesTemplate.test.tsx](./src/components/templates/travel/__tests__/SavedPropertiesTemplate.test.tsx)
│   │           │   ├── [SearchFiltersTemplate.test.tsx](./src/components/templates/travel/__tests__/SearchFiltersTemplate.test.tsx)
│   │           │   ├── [TravelGuidesTemplate.test.tsx](./src/components/templates/travel/__tests__/TravelGuidesTemplate.test.tsx)
│   │           │   ├── [TravelStoriesTemplate.test.tsx](./src/components/templates/travel/__tests__/TravelStoriesTemplate.test.tsx)
│   │           │   └── [TripPlannerTemplate.test.tsx](./src/components/templates/travel/__tests__/TripPlannerTemplate.test.tsx)
│   │           ├── [AgentProfileTemplate.tsx](./src/components/templates/travel/AgentProfileTemplate.tsx)
│   │           ├── [BookingSearchTemplate.tsx](./src/components/templates/travel/BookingSearchTemplate.tsx)
│   │           ├── [BookingsTemplate.tsx](./src/components/templates/travel/BookingsTemplate.tsx)
│   │           ├── [DestinationsTemplate.tsx](./src/components/templates/travel/DestinationsTemplate.tsx)
│   │           ├── [HotelDetailTemplate.tsx](./src/components/templates/travel/HotelDetailTemplate.tsx)
│   │           ├── [MapViewTemplate.tsx](./src/components/templates/travel/MapViewTemplate.tsx)
│   │           ├── [MortgageCalculatorTemplate.tsx](./src/components/templates/travel/MortgageCalculatorTemplate.tsx)
│   │           ├── [OpenHousesTemplate.tsx](./src/components/templates/travel/OpenHousesTemplate.tsx)
│   │           ├── [PackingListTemplate.tsx](./src/components/templates/travel/PackingListTemplate.tsx)
│   │           ├── [PropertyDetailTemplate.tsx](./src/components/templates/travel/PropertyDetailTemplate.tsx)
│   │           ├── [PropertyListingsTemplate.tsx](./src/components/templates/travel/PropertyListingsTemplate.tsx)
│   │           ├── [SavedPropertiesTemplate.tsx](./src/components/templates/travel/SavedPropertiesTemplate.tsx)
│   │           ├── [SearchFiltersTemplate.tsx](./src/components/templates/travel/SearchFiltersTemplate.tsx)
│   │           ├── [TravelGuidesTemplate.tsx](./src/components/templates/travel/TravelGuidesTemplate.tsx)
│   │           ├── [TravelStoriesTemplate.tsx](./src/components/templates/travel/TravelStoriesTemplate.tsx)
│   │           ├── [TripPlannerTemplate.tsx](./src/components/templates/travel/TripPlannerTemplate.tsx)
│   │           └── [index.ts](./src/components/templates/travel/index.ts)
│   ├── hooks/
│   │   ├── __tests__/
│   │   │   └── [useSWRegister.test.ts](./src/hooks/__tests__/useSWRegister.test.ts)
│   │   └── [useSWRegister.ts](./src/hooks/useSWRegister.ts)
│   ├── layout/
│   │   ├── editor/
│   │   │   ├── panes/
│   │   │   │   ├── [ColorPicker.tsx](./src/layout/editor/panes/ColorPicker.tsx)
│   │   │   │   ├── [ThemePane.tsx](./src/layout/editor/panes/ThemePane.tsx)
│   │   │   │   ├── [editor-controls.tsx](./src/layout/editor/panes/editor-controls.tsx)
│   │   │   │   └── [index.ts](./src/layout/editor/panes/index.ts)
│   │   │   ├── presets/
│   │   │   │   ├── [ThemePresets.tsx](./src/layout/editor/presets/ThemePresets.tsx)
│   │   │   │   ├── [ThemeSwatches.tsx](./src/layout/editor/presets/ThemeSwatches.tsx)
│   │   │   │   └── [index.ts](./src/layout/editor/presets/index.ts)
│   │   │   ├── [ThemeConfig.ts](./src/layout/editor/ThemeConfig.ts)
│   │   │   ├── [ThemeEditor.tsx](./src/layout/editor/ThemeEditor.tsx)
│   │   │   ├── [ThemeEditorPane.tsx](./src/layout/editor/ThemeEditorPane.tsx)
│   │   │   ├── [css-utils.ts](./src/layout/editor/css-utils.ts)
│   │   │   ├── [index.ts](./src/layout/editor/index.ts)
│   │   │   └── [theme-data.ts](./src/layout/editor/theme-data.ts)
│   │   ├── [ThemeEditorLayout.tsx](./src/layout/ThemeEditorLayout.tsx)
│   │   └── [index.ts](./src/layout/index.ts)
│   ├── providers/
│   │   ├── __tests__/
│   │   │   └── [SWProvider.test.tsx](./src/providers/__tests__/SWProvider.test.tsx)
│   │   └── [SWProvider.tsx](./src/providers/SWProvider.tsx)
│   └── styles/
│       ├── [base.css](./src/styles/base.css)
│       ├── [globals.css](./src/styles/globals.css)
│       └── [themes.css](./src/styles/themes.css)
├── src-tauri/
│   ├── capabilities/
│   │   └── [default.json](./src-tauri/capabilities/default.json)
│   ├── gen/
│   ├── icons/
│   │   ├── [128x128.png](./src-tauri/icons/128x128.png)
│   │   ├── [128x128@2x.png](./src-tauri/icons/128x128@2x.png)
│   │   ├── [32x32.png](./src-tauri/icons/32x32.png)
│   │   ├── [Square107x107Logo.png](./src-tauri/icons/Square107x107Logo.png)
│   │   ├── [Square142x142Logo.png](./src-tauri/icons/Square142x142Logo.png)
│   │   ├── [Square150x150Logo.png](./src-tauri/icons/Square150x150Logo.png)
│   │   ├── [Square284x284Logo.png](./src-tauri/icons/Square284x284Logo.png)
│   │   ├── [Square30x30Logo.png](./src-tauri/icons/Square30x30Logo.png)
│   │   ├── [Square310x310Logo.png](./src-tauri/icons/Square310x310Logo.png)
│   │   ├── [Square44x44Logo.png](./src-tauri/icons/Square44x44Logo.png)
│   │   ├── [Square71x71Logo.png](./src-tauri/icons/Square71x71Logo.png)
│   │   ├── [Square89x89Logo.png](./src-tauri/icons/Square89x89Logo.png)
│   │   ├── [StoreLogo.png](./src-tauri/icons/StoreLogo.png)
│   │   ├── [icon.icns](./src-tauri/icons/icon.icns)
│   │   ├── [icon.ico](./src-tauri/icons/icon.ico)
│   │   └── [icon.png](./src-tauri/icons/icon.png)
│   ├── src/
│   │   ├── [lib.rs](./src-tauri/src/lib.rs)
│   │   └── [main.rs](./src-tauri/src/main.rs)
│   ├── [Cargo.lock](./src-tauri/Cargo.lock)
│   ├── [Cargo.toml](./src-tauri/Cargo.toml)
│   ├── [build.rs](./src-tauri/build.rs)
│   └── [tauri.conf.json](./src-tauri/tauri.conf.json)
├── [AGENTS.md](./AGENTS.md)
├── [Dockerfile](./Dockerfile)
├── [LICENSE](./LICENSE)
├── [README.md](./README.md)
├── [TREE.md](./TREE.md)
├── [docker-compose.yaml](./docker-compose.yaml)
├── [eslint.config.mts](./eslint.config.mts)
├── [jest.config.ts](./jest.config.ts)
├── [jest.setup.ts](./jest.setup.ts)
├── [next.config.ts](./next.config.ts)
├── [package.json](./package.json)
├── [playwright.config.ts](./playwright.config.ts)
├── [postcss.config.mjs](./postcss.config.mjs)
└── [tsconfig.json](./tsconfig.json)
```

684 directories, 2751 files
