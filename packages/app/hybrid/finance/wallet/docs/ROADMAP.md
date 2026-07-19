# Roadmap

## Phase 1 — Core UI

> Foundation: all pages, navigation, theming, mock data

- [x] Authentication flow (login, register, forgot/reset password)
- [x] Dashboard with balance, accounts, quick actions, recent transactions
- [x] Accounts overview with type sections (checking, savings, credit)
- [x] Transaction list with search, type filter, date range filter
- [x] Transfer wizard (3-step: recipient, amount, review)
- [x] Card carousel with freeze/unfreeze
- [x] Budget summary with category cards
- [x] Recurring bills with mark-as-paid
- [x] Currency exchange calculator + rate list
- [x] Pay page with QR code generation + camera scanning
- [x] Notifications with filter and mark-as-read
- [x] Profile with user info, settings, theme picker
- [x] Responsive layout (bottom nav + sidebar)
- [x] 32 DaisyUI themes with dark default

## Phase 2 — Enhanced UX

> Polish: animations, accessibility, offline support

- [x] Page transition animations (Framer Motion)
- [x] Pull-to-refresh on mobile
- [x] Infinite scroll / pagination for transaction list
- [x] Swipe gestures on transaction items (delete, archive)
- [x] Haptic feedback on key actions (transfer confirm, payment sent)
- [x] Keyboard navigation and ARIA labels audit
- [x] Screen reader announcements for toasts
- [x] Offline indicator banner
- [x] Service worker for static asset caching
- [x] PWA manifest with install prompt

## Phase 3 — Data & Analytics

> Insights: charts, reports, smart categorization

- [x] Spending charts (pie chart by category, line chart over time)
- [x] Monthly/yearly spending reports (monthly trends; yearly selector pending)
- [x] Income vs. expense comparison
- [ ] Budget forecasting based on historical data
- [x] Transaction export (CSV, PDF)
- [ ] Recurring transaction detection
- [ ] Smart categorization with category suggestions
- [x] Search with filters (date range, amount range, category)

## Phase 4 — Social & Payments

> Peer-to-peer: contacts, splits, payment requests

- [x] Contact list with frequent recipients
- [x] Payment requests (send/receive)
- [x] Split bill feature (equal or custom splits)
- [x] Payment history with status (pending, completed, failed)
- [x] Recurring transfers (auto-pay setup)
- [ ] International transfer with fee calculator
- [ ] Multi-currency wallet balances (all mock data is USD-only)
- [x] Currency alert notifications (rate thresholds)

## Phase 5 — Bank Products

> Full banking: lending, deposits, insurance, financial planning

- [x] Loan product catalog (personal, auto, home, education)
- [x] EMI calculator with slider inputs
- [ ] Loan application multi-step form
- [x] Loan dashboard with active loans and repayment schedules
- [ ] Amortization table per loan
- [ ] Prepayment calculator (savings comparison)
- [ ] Fixed deposit product catalog with interest rates
- [x] FD interest calculator
- [x] FD management (active deposits, maturity tracking)
- [ ] Recurring deposit product catalog
- [x] RD deposit tracker (paid/upcoming/missed)
- [x] RD maturity forecast
- [x] Savings goal creation and management
- [ ] Goal progress tracking with milestones
- [ ] Auto-save rules for goals
- [ ] Insurance product catalog (life, health, auto, home)
- [x] Coverage summary dashboard
- [ ] Insurance claim status tracking
- [x] Premium payment from wallet
- [x] Card rewards: cashback tracking, reward points, tier status
- [x] Reward catalog (redeem points)
- [ ] Loan vs FD vs RD comparison tool
- [ ] Financial health score dashboard

## Phase 6 — Security & Compliance

> Production-ready: 2FA, KYC, audit logging

- [ ] Two-factor authentication (TOTP, SMS)
- [ ] Biometric authentication (WebAuthn)
- [ ] Session timeout with re-authentication
- [ ] KYC document upload and verification flow
- [ ] Transaction limits and daily caps
- [ ] Suspicious activity detection and alerts
- [ ] Audit log for all account actions
- [ ] Data encryption at rest (IndexedDB encryption)

## Phase 7 — Platform & Integration

> Ecosystem: native apps, APIs, third-party services

- [ ] Tauri desktop app build and signing (shell only, no bundle/signing)
- [ ] iOS/Android native shells (Capacitor or Tauri Mobile)
- [ ] Push notifications via FCM/APNs
- [ ] Open Banking API integration (Plaid, Stripe)
- [ ] Bank account linking (OAuth flow)
- [ ] Credit score monitoring
- [ ] Bill pay integration (utility providers)
- [ ] Investment portfolio tracking
- [ ] Crypto wallet integration
