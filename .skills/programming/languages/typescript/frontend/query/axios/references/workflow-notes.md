# Workflow notes

Focused reference for **axios-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
