# Implementation notes

Focused reference for **makefile-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 4. Phony & Helper Targets

- **`help` target** — list all targets with `##` comments for documentation:

```makefile
help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
```

- **`.DELETE_ON_ERROR`** — automatically remove partially-built targets on error.
- **`.SECONDARY`** — keep intermediate files that are not explicitly requested.

---

## 5. Common Patterns
