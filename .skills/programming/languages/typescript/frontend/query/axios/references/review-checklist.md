# Review checklist

Focused reference for **axios-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
