# Implementation notes

Focused reference for **gorilla-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Validate the decoded struct before touching any state** — `validate` tags / manual validation.
- **`Content-Type: application/json` header set explicitly** — don't let middleware be the only source.
- **Use `gorilla/json` only when its features are needed** — the stdlib `encoding/json` is fine for the common case.

---

## 5. WebSocket

- **`gorilla/websocket.Upgrader` for the HTTP upgrade path:**

```go
var upgrader = websocket.Upgrader{
    ReadBufferSize:  1024,
    WriteBufferSize: 1024,
    CheckOrigin:     func(r *http.Request) bool { return true },
}
```

- **Read/write handled in a goroutine pair**; the connection is shared; write-lock via `Conn.WriteMessage`.
- **Handshake errors handled**; `SetReadDeadline`/`SetWriteDeadline` for connection timeouts.
- **`Pong` handler registered early**; heartbeat goroutine for keep-alive.
- **WS session scope** — the HTTP request context should carry auth/user; the WS connection carries the stream lifecycle.

---

## 6. Sessions

- **`gorilla/sessions` for cookie or server-side sessions**:

```go
var store = sessions.NewCookieStore([]byte(os.Getenv("SESSION_SECRET")))
func getSession(w http.ResponseWriter, r *http.Request) (*sessions.Session, error) {
    return store.Get(r, "session")
}
```

- **Session secret from env, never hardcoded**; rotate on deploy.
- **Session data minimal** — a user-ID, not the entire user; store heavy data in DB/DB-backed session store.
- **`MaxAge`/`HttpOnly`/`Secure` set explicitly** — cookie hygiene is a security decision.
