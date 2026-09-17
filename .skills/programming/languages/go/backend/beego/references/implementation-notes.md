# Implementation notes

Focused reference for **beego-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 4. Middleware & Filters

- **`InsertFilter` for auth/CORS/rate-limit seams:**

```go
web.InsertFilter("/api/*", web.BeforeRouter, authJWTMiddleware)
```

- **Cross-cutting in filters; business behavior stays in handlers/services.**
- **Panic recovery + request logging wired once; metrics per route.**

---

## 5. Sessions & Caching

- **Session/cache providers configured deliberately (file/redis/memory):**

```go
web.BConfig.SessionOn = true
web.BConfig.SessionProvider = "redis"
```

- **Cache keys namespaced + TTL'd; secrets not cached client-side.**
- **Session/cache usage audited — prefer stateless JWT flows where sensible.**
