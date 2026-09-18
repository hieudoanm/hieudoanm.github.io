---
name: beego-best-practices
description: Best practices for building web apps with Beego — the Go MVC web framework conventions. Use when writing, structuring, or reviewing Beego — covers controllers, routing, ORM, configuration, middleware, and deployment.
---

# Beego Best Practices

Beego is **an MVC web framework for Go** — batteries-included (routing, ORM, session, config, filters) with `bee` tooling. Practical Beego leans on **clean controller/router structure, typed configuration via `conf/app.conf`, the ORM with explicit models/transactions, and middleware/FilterChain for cross-cutting concerns** — the framework gives you structure; keep handlers thin and domain logic in services.

---

## 1. Controllers & Routing

- **Controllers as plain structs; actions return responses; router registration explicit:**

```go
import (
	"github.com/beego/beego/v2/server/web"
)

type OrderController struct {
	web.Controller
}

func (o *OrderController) List() {
	o.Data["orders"] = service.ListOrders()
	o.ServeJSON()
}

func init() {
	web.Router("/api/orders", &OrderController{}, "get:List")
}
```

- **REST mapping via `get:List` style; keep actions thin — logic in packages.**
- **`Ctx`/`Input` reads validated at the controller boundary; `Data`/`ServeJSON` contracts typed.**

---

## 2. Configuration

- **Centralized config (`conf/app.conf`) — env-overridable per deploy:**

```ini
appname = myservice
httpport = 8080
runmode = dev
[database]
driver = postgres
dsn = ${DB_DSN}
```

- **`web.AppConfig` API for typed reads; configs versioned (never secrets in the file).**
- **`runmode` gating for dev/prod behavior; secrets via env or a secret manager.**

---

## 3. ORM & Models

- **Explicit models; schema via `RegisterModel` + migrations:**

```go
type Order struct {
	ID     uint   `orm:"pk;auto"`
	Amount float64 `orm:"digits(12);decimals(2)"`
}
orm.RegisterModel(new(Order))
```

- **Transactions for multi-step writes (`orm.NewOrm().Begin()`/`Commit()/Rollback()`).**
- **Query via the ORM's queryset (filters/related); SQL fallback only when justified.**

---

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

---

## 6. Deployment & Testing

- **Config as env; graceful shutdown; `runmode=prod` with `AutoRender=false` for API mode:**
- **Tests: `httptest`+controller harness; service packages unit-tested; golden-response checks.**
- **Pin versions (`go.mod`); CI pipeline builds + tests + lint; health endpoints for SWR.**

---

## General Rules of Thumb

- **Thin controllers; domain logic in services.**
- **Route verbs explicit; config centralized + env-overridable.**
- **ORM models explicit; transactions for multi-writes.**
- **Filters for cross-cutting; sessions/cache deliberate.**
- **Env-config deploys; tests at the service+controller boundary.**

---

## Quick-Start Checklist

- [ ] `web.Router` with verb mapping; controllers thin
- [ ] `conf/app.conf` typed; secrets env/secret-manager only
- [ ] ORM models + migrations; transaction-scoped multi-writes
- [ ] `InsertFilter` for auth/CORS/ratelimit; recovery+logging wired
- [ ] Session/cache provider deliberate; API mode `AutoRender=false`
- [ ] Service+controller tests; version pinned; CI lint/build/test