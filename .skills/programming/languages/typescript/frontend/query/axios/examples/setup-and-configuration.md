# Axios Best Practices: 2. Interceptors

## Source guidance

This example applies the **2. Interceptors** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Request interceptor: attach auth from a store/session; response: normalize errors:**
- **Interceptors for cross-cutting only — no logic that belongs in handlers.**
- **Auth-refresh flows in the response interceptor (single-flight pattern) — throttled, not naive.**

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for axios-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
