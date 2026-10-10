# Overview

Focused reference for **beego-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
