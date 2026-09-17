# Beego Best Practices: Basic Usage

Best practices for building web apps with Beego — the Go MVC web framework conventions. Use when writing, structuring, or reviewing Beego — covers controllers, routing, ORM, configuration, middleware, and deployment.

## Scenario

Use this example as a starting point when applying **beego-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Controllers & Routing** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
