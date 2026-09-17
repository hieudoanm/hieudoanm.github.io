# Workflow notes

Focused reference for **beego-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
