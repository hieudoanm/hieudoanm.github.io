# FEATURE-04: MCP Server

## User-visible behavior
- Speaks newline-delimited JSON-RPC 2.0 on stdin/stdout
- Logs go to stderr only
- Tools operate on a Store (in-process or TCP proxy)

## Tools
kevin_ping, kevin_set, kevin_get, kevin_del, kevin_keys, kevin_len, kevin_ttl, kevin_expire, kevin_flush

## Rules
- Tool failures → ToolResult with IsError: true (not JSON-RPC errors)
- Notifications (nil ID) → never answered
- Framing/unknown method/unknown tool → JSON-RPC errors
- Sequential dispatch (one frame answered before next)
