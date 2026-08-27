# Features

> Tax — Vietnamese tax management application.

## Authentication

- Login and registration flow
- Route guard for protected pages
- Local persistence with IndexedDB

## Dashboard

- Overview statistics (companies, submissions, pending, flagged audits)
- Recent submissions list
- Recent audits list
- Quick navigation to all features

## Tax Calculator

- Personal income tax (PIT) calculator
- Gross-to-Net and Net-to-Gross modes
- Monthly and annual period support
- Progressive tax brackets: 5% → 35% (7 brackets)
- Personal deduction: 11,000,000 VND/month
- Dependent deduction: 4,400,000 VND/dependent/month
- Social insurance toggle (employee + employer)
- Insurance cap: 36,000,000 VND/month
- Detailed tax breakdown table
- Effective tax rate calculation
- Total employer labor cost

## Tax Submission

- Company tax declaration management
- Tax types: PIT, CIT, VAT, FCT
- Status tracking: draft → submitted → accepted/rejected/amended
- Document management (01-KK/TNCN, GTGT, TNDN, etc.)
- Deadline management
- Period tracking (monthly, quarterly, annual)
- Notes and comments

## Tax Audit

- Automated compliance checks
- Manual internal audits
- Risk scoring (0-100)
- Finding tracking with severity levels (low/medium/high/critical)
- Finding categories: discrepancy, missing_document, compliance_error,
  overpayment, underpayment
- Resolution tracking
- Audit checklist (document, calculation, deadline, compliance)
- Company-level audit history

## Responsive Design

- Desktop: Sidebar navigation
- Mobile: Bottom navigation + header with hamburger menu
- 32 DaisyUI themes with dark default
- Accessible (skip to content, ARIA labels, screen reader announcements)

## Offline Support

- IndexedDB for local persistence
- Offline indicator banner
- Mock data with configurable delay

---

See [docs/ROADMAP.md](docs/ROADMAP.md) for the full phased roadmap.
