# Gorilla Best Practices: Basic Usage

Best practices for using Gorilla Toolkit in Go — the classic library conventions for HTTP routing, middleware, JSON handling, and WebSocket sessions. Use when writing, structuring, or reviewing Gorilla-based services — covers mux, middleware, JSON handling, WebSocket, sessions, testing, and deployment.

## Scenario

Use this example as a starting point when applying **gorilla-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Router** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```go
r := mux.NewRouter()
r.HandleFunc("/users/{id:[0-9]+}", getUser).Methods("GET")
r.Use(middleware.RequestID)
http.ListenAndServe(":8080", r)
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
