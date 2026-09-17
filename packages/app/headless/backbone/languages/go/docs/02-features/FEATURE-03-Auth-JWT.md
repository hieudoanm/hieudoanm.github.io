# Backbone — FEATURE-03: Auth (JWT)

## 1. Summary

Register/login with bcrypt password hashing and HS256 JWT tokens (72h expiry).

## 2. Behaviour

- `POST /api/auth/register` and `POST /api/auth/login`.
- `internal/auth` — bcrypt + JWT issue/validate (`JWTSecret`, `RegisterUser`, `LoginUser`).
- `JWTSecret()` reads `JWT_SECRET` (dev default `dev-secret-change-in-production`).

## 3. Acceptance criteria

- Register creates a user; login returns a valid HS256 JWT.
- Token valid for 72h.
- Protected routes reject missing/invalid tokens.
