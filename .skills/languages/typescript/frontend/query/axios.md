---
name: axios-best-practices
description: Best practices for HTTP requests with Axios — the promise-based HTTP client conventions for JS/TS apps. Use when writing, structuring, or reviewing Axios — covers instances, interceptors, error handling, typing, and testing.
---

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

```ts
api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getToken()}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) { refreshOrRedirect(); }
    return Promise.reject(error);
  },
);
```

- **Interceptors for cross-cutting only — no logic that belongs in handlers.**
- **Auth-refresh flows in the response interceptor (single-flight pattern) — throttled, not naive.**

---

## 3. Requests & Typing

- **Typed generics per call; validate the shape you trust:**

```ts
interface Order { id: string; amount: number }

export async function fetchOrders() {
  const { data } = await api.get<Order[]>("/orders");
  if (!Array.isArray(data)) throw new Error("malformed response");
  return data;
}
```

- **`{ data }` destructuring standard; `params`/`data`/`method` explicit.**
- **No implicit `any` from `.get()` — the payload shape is the contract (validate at the seam).**

---

## 4. Error Handling

- **Catch and translate at the boundary — typed failures for callers:**

```ts
try {
  return await getOrder(id);
} catch (err) {
  if (axios.isAxiosError(err) && err.response?.status === 404) {
    throw new NotFoundError();
  }
  throw err;
}
```

- **`axios.isAxiosError` narrows; distinguish network vs HTTP errors (`err.code`/`err.request`/`err.response`).**
- **Never swallow — convert errors into the domain shape for the UI layer.**

---

## 5. Abort & Cancellation

- **`AbortController` signal for requests tied to component lifecycles (no setState-after-unmount):**

```ts
const controller = new AbortController();
api.get("/slow", { signal: controller.signal });
controller.abort();
```

- **The signal passed in request; on unmount abort.**
- **Cancellation errors caught (not treated as failures).**

---

## 6. Testing

- **Mock via `axios-mock-adapter` or intercept the adapter; assert instance-level behavior:**

```ts
import MockAdapter from "axios-mock-adapter";
const mock = new MockAdapter(api);
mock.onGet("/orders").reply(200, [{ id: "1" }]);
```

- **Test interceptors in isolation (401 path, token attach); response-validation unit tests.**
- **`vi.mock("axios")` for full-mock when adapter too heavy — keep seams typed.**

---

## General Rules of Thumb

- **One configured instance per API; env-driven baseURL.**
- **Interceptors = cross-cutting seam (auth/errors) only.**
- **Typed calls + shape validation at the boundary.**
- **Translate errors to domain types; `isAxiosError` narrows.**
- **Abort with lifecycle; mocks via adapter; interceptor tests.**

---

## Quick-Start Checklist

- [ ] `axios.create` instance (baseURL/timeout/headers); env-driven
- [ ] Request/response interceptors for auth + error shape only
- [ ] Typed generics per call; response validated (`isAxiosError`, shape guards)
- [ ] Errors translated to domain errors (NotFound/Network) at the seam
- [ ] `AbortController` tied to component lifecycle
- [ ] Mock adapter tests; interceptor + validation unit tests