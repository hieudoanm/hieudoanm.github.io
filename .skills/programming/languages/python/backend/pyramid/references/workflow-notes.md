# Workflow notes

Focused reference for **pyramid-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Views as plain functions decorated or routed:**

```python
@view_config(route_name="order", renderer="json")
def order_view(request):
    return {"id": request.matchdict["order_id"]}
```

- **`renderer` explicit (json/template); views return plain shapes — no strung responses.**
- **Validation at the boundary: `request.params`/`matchdict` checked before the domain.**

---

## 3. Traversal vs URL Dispatch

- **Default URL dispatch (routes) is fine for APIs; traversal for data-shaped URLs:**
- **Choose ONE primary model; document edge-hybrids (traversal contexts vs routes) sparingly.**
- **`request.context` meaningful in traversal; keep the models lean in dispatch mode.**

---

## 4. Authentication & Authorization

- **Security via `authentication_policy` + `authorization_policy`:**
