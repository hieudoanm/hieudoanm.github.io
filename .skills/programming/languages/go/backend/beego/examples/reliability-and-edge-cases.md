# Beego Best Practices: 3. ORM & Models

## Source guidance

This example applies the **3. ORM & Models** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Explicit models; schema via `RegisterModel` + migrations:**
- **Transactions for multi-step writes (`orm.NewOrm().Begin()`/`Commit()/Rollback()`).**
- **Query via the ORM's queryset (filters/related); SQL fallback only when justified.**

## Example

```go
type Order struct {
	ID     uint   `orm:"pk;auto"`
	Amount float64 `orm:"digits(12);decimals(2)"`
}
orm.RegisterModel(new(Order))
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for beego-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
