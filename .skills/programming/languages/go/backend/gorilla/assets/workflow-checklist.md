# Gorilla Best Practices: Workflow Checklist

A practical run sheet for applying [Gorilla Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Router: **mux.NewRouter() as the top-level handler; route by path/method:** r.HandleFunc, r.Methods, r.PathPrefix:
- [ ] 1. Router: **Path parameters via mux.Vars(r)** — parse + validate at the handler boundary
- [ ] 2. Middleware: **Middleware wraps the handler** — func(next http.Handler) http.Handler or mux.MiddlewareFunc:
- [ ] 2. Middleware: **r.Use() to add middleware to the router/subrouter** — order matters
- [ ] 3. Handlers & Responses: **Handlers are http.HandleFunc-compatible** — they take (w, r) and return error via context; no framework-specific signature:
- [ ] 3. Handlers & Responses: **Parse + validate at the top of the handler** before mutation
- [ ] 4. JSON Handling: **json.NewEncoder(w).Encode(...) for output; json.NewDecoder(r.Body).Decode(&into) for input:**
- [ ] 4. JSON Handling: **Validate the decoded struct before touching any state** — validate tags / manual validation
- [ ] 5. WebSocket: **gorilla/websocket.Upgrader for the HTTP upgrade path:**
- [ ] 5. WebSocket: **Read/write handled in a goroutine pair**; the connection is shared; write-lock via Conn.WriteMessage

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
