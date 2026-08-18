# Roadmap

## Phase 1 — Core UI

> Foundation: all pages, navigation, theming, mock data

- [x] Authentication flow (login, register)
- [x] Dashboard with stats, recent activity
- [x] Tax Calculator (PIT gross↔net, progressive brackets)
- [x] Tax Submission list and detail views
- [x] Tax Submission creation form
- [x] Tax Audit list with risk scores
- [x] Tax Audit detail with findings and checklist
- [x] Profile and Settings pages
- [x] Responsive layout (bottom nav + sidebar)
- [x] 32 DaisyUI themes with dark default
- [x] IndexedDB data layer with mock data

## Phase 2 — Enhanced UX

> Polish: animations, accessibility, offline support

- [x] Page transition animations
- [x] Offline indicator banner
- [x] Screen reader announcements for toasts
- [ ] Pull-to-refresh on mobile
- [ ] Haptic feedback on key actions
- [ ] Keyboard navigation audit
- [ ] Service worker for static asset caching
- [ ] PWA manifest with install prompt

## Phase 3 — Calculator Enhancements

> Extended calculator features

- [ ] Save calculator history to IndexedDB
- [ ] Export tax breakdown (CSV, PDF)
- [ ] CIT (Corporate Income Tax) calculator
- [ ] VAT calculator
- [ ] FCT (Foreign Contractor Tax) calculator
- [ ] Tax comparison tool (multiple scenarios)
- [ ] Historical tax rate lookup

## Phase 4 — Submission Workflow

> Complete submission management

- [ ] Multi-step submission wizard
- [ ] Document upload with drag-and-drop
- [ ] Document preview (PDF, images)
- [ ] Submission approval workflow
- [ ] Email notifications for deadlines
- [ ] Batch submission creation
- [ ] Submission templates
- [ ] Integration with tax authority APIs (mock)

## Phase 5 — Audit Automation

> Smart audit features

- [ ] Automated audit scheduling
- [ ] AI-powered risk assessment
- [ ] Historical audit comparison
- [ ] Audit report generation (PDF)
- [ ] Compliance calendar
- [ ] Tax law change notifications
- [ ] Multi-company audit dashboard

## Phase 6 — Company Management

> Company profile and settings

- [ ] Company CRUD operations
- [ ] Company tax code validation (MST format)
- [ ] Employee tax profile management
- [ ] Department-level tax tracking
- [ ] Company settings and preferences
- [ ] Multi-user access (roles: admin, accountant, viewer)

## Phase 7 — Platform & Integration

> Ecosystem: native apps, APIs, third-party services

- [ ] Tauri desktop app build and signing
- [ ] iOS/Android native shells (Capacitor or Tauri Mobile)
- [ ] Push notifications via FCM/APNs
- [ ] Real tax authority API integration
- [ ] Accounting software integration (MISA, Vision)
- [ ] Bank account linking for auto-import
- [ ] Multi-currency support for foreign contractors
