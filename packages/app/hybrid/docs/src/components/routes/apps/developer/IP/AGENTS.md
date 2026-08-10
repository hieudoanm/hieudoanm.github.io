# Apps / Developer / IP

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
IP/
  index.tsx            # Entry component — 3 tabs (network/location/dns) + refresh
  components/Row.tsx   # Label/value display row
  types.ts             # IPInfo interface
  utils/lookup.ts      # fetchFromIPInfo, fetchFromIpapi, detectVPN
```

## Overview

IP inspector that resolves the visitor's own address and looks up geolocation,
ASN, and org details via public APIs. Also provides a DNS A-record lookup
against Cloudflare's DNS-over-HTTPS endpoint, with a heuristic VPN detection
banner.

## Logic

- `fetchIPInfo` gets the IP from `api.ipify.org`, then tries `fetchFromIPInfo`
  and falls back to `fetchFromIpapi` on failure; both normalise responses into
  `IPInfo`
- `detectVPN(org)` flags Cloudflare/Amazon/Google/DigitalOcean/Microsoft orgs as
  shared hosting
- `fetchDNS` queries `cloudflare-dns.com/dns-query` with `application/dns-json`;
  an empty domain is ignored
- Results are shown as raw JSON via a collapsible section

## Routes

```tsx
// src/app/(products)/apps/developer/page.tsx      — category listing
// src/app/(products)/apps/developer/ip/page.tsx — tool
```

## Registration

- `data/apps.csv` → `Developer` section, `toolId: 'ip'`

## Coding Rules

1. Arrow functions only — no `function` keyword
2. Explicit types on all exports — never `any`
3. State management: `useState`/`useReducer` for local, React Context for shared
4. TailwindCSS v4 + DaisyUI v5 — no CSS modules, no styled-components
5. Icons: `react-icons/pi` (Phosphor)
6. Each tool component receives `onClose: () => void` prop
7. Keep files under 200 lines, functions under 30 lines
8. Pure logic in `utils.ts` — never mix UI and business logic
9. Test behaviour, not implementation — Jest + Testing Library
10. `APP_SECTIONS` consumes `data/apps.json` — never hardcode app sections in
    components
