# Backbone — FEATURE-04: RBAC

## 1. Summary

Role-based permissions (`admin`, `editor`, `viewer`) per collection.

## 2. Behaviour

- `internal/rbac` — role ↔ collection permission checks from the `permissions` table.
- `rbacMiddleware("admin", ...)` checks role ↔ collection on protected routes.

## 3. Acceptance criteria

- Admin can access all collections; editor/viewer limited by role.
- Unknown role or missing permission denies access.
