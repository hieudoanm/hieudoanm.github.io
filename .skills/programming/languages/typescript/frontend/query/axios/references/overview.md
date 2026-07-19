# Overview

Focused reference for **axios-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Axios Best Practices

Axios is the **promise-based HTTP client for browser + Node** — `axios.create(instance)` with interceptors, typed from TS generics. Practical Axios leans on **a single stamped `instance` per API (baseURL, timeout), interceptors for auth/error shaping only (not business logic), typed generic contracts, and defensive response validation** — the client is a boundary; interceptors cross it once.

---

## 1. Instances

- **One configured instance per backend/API contract:**

```ts
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
});
```

- **`baseURL`, `timeout`, credentials deliberate; never hardcode URLs in calls.**
- **Environment-specific config via env vars, validated at boot.**

---

## 2. Interceptors

- **Request interceptor: attach auth from a store/session; response: normalize errors:**
