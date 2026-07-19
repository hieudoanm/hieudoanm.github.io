# Roadmap

## Phase 1 — Core

> Foundation: restaurant creation, menu builder, ordering

- [x] Create restaurants (name, description, accent color)
- [x] Add food and drink items (name, price, emoji, description)
- [x] Menu filtering by food / drink / all
- [x] Mark items in or out of stock
- [x] Customer menu via QR code and shared link
- [x] Order placement (name, table, note, line items)

## Phase 2 — Share & Persistence

> Polish: QR codes, localStorage, ordering history

- [x] Client-side QR code generation for a menu
- [x] Share-by-link (menu data encoded in query params)
- [x] localStorage persistence for restaurants and items
- [x] Order history stored per restaurant

## Phase 3 — Order Management

> Scale: owner dashboard for incoming orders

- [ ] Owner order inbox with live updates
- [ ] Order status transitions (placed → served → paid)
- [ ] Table management (mark tables occupied / free)
- [ ] Item availability schedule (e.g. lunch vs dinner)

## Phase 4 — Reporting

> Analytics: menu popularity, sales

- [ ] Daily sales totals by restaurant
- [ ] Top-selling items and categories
- [ ] Peak ordering times
- [ ] CSV export of order history

## Phase 5 — Platform & UX

> Polish: offline, dark/light themes, kiosk mode

- [ ] Light and dark theme toggle
- [ ] Offline-first PWA support
- [ ] Tauri kiosk mode for in-store ordering
- [ ] Board / ticket printer integration
