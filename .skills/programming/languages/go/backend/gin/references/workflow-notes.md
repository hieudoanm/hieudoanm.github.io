# Workflow notes

Focused reference for **gin-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Thin handlers** — parse, call the service, map the result; no business logic:

```go
func (h *UserHandler) Get(c *gin.Context) {
    id, err := strconv.Atoi(c.Param("id"))
    if err != nil { c.JSON(http.StatusBadRequest, ErrResponse{"invalid id"}); return }
    user, err := h.svc.Get(c.Request.Context(), id)
    if err != nil { c.JSON(http.StatusNotFound, ErrResponse{err.Error()}); return }
    c.JSON(http.StatusOK, user)
}
```

- **`c.JSON`, `c.BindJSON`, `c.Param`, `c.Query`** are the Gin surface — everything else is plain Go.
- **Use interfaces at boundaries, not everywhere** — handlers depend on a `Service` interface; repositories accept `*sql.DB`.
- **No business logic in middleware** — middleware only does cross-cutting (logging, auth, CORS, request-id); services own all business decisions.

---

## 4. Middleware Patterns

- **Compose with `router.Use(mw)` for global, `group.Use(mw)` for route families**:

```go
api := r.Group("/api/v1")
api.Use(middleware.RequestID(), middleware.Auth(jwtVerifier))
api.POST("/users", h.Create)
```

- **Auth/request-id/logging in middleware, exposed via `c.Set`/`c.Get`** — typed helpers avoid stringly context:

```go
func Auth(verifier *jwt.Verifier) gin.HandlerFunc {
    return func(c *gin.Context) {
        token, err := extractBearer(c.GetHeader("Authorization"))
        if err != nil || verifier.Verify(token) != nil {
            c.AbortWithStatusJSON(http.StatusUnauthorized, ErrResponse{"unauthorized"})
            return
        }
        c.Set("userID", verifier.Subject(token))
        c.Next()
    }
}
```

- **`c.Abort*` to stop the chain, `c.Next()` to continue** — middleware after `Next()` runs on the way out (logging timing).
- Keep middleware small and single-purpose; one concern, one function.

---

## 5. Validation

- **Bind typed structs with tags** and let Gin validate via `binding`:

```go
type CreateUserReq struct {
    Name  string `json:"name" binding:"required,min=1,max=200"`
    Email string `json:"email" binding:"required,email"`
}
if err := c.ShouldBindJSON(&req); err != nil { c.JSON(http.StatusBadRequest, ErrResponse{err.Error()}); return }
```
