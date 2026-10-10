# Tornado Best Practices: Workflow Checklist

A practical run sheet for applying [Tornado Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Handlers & Routing: **Handlers subclass RequestHandler; verbs as methods:**
- [ ] 1. Handlers & Routing: **Routing as tuples; handlers thin (service logic outside).**
- [ ] 2. Async Discipline: **Nothing blocking on the event loop — DB/HTTP/disk via awaited tools:**
- [ ] 2. Async Discipline: **async_fetch + concurrent.run_on_executor for CPU-bound work off the loop.**
- [ ] 3. IOLoop & Lifecycle: **asyncio.current_loop (Tornado runs asyncio by default):**
- [ ] 3. IOLoop & Lifecycle: **Graceful shutdown hooks; periodic tasks via IOLoop.call_later, not threads.**
- [ ] 4. Input/Output & Streaming: **RequestHandler I/O direct; streaming for large bodies/write_chunk:**
- [ ] 4. Input/Output & Streaming: **AsyncHTTPClient timeouts/retries explicit (connect/request timeout).**
- [ ] 5. Static & WebSockets: **Static serving via StaticFileHandler; WebSocket via WebSocketHandler:**
- [ ] 5. Static & WebSockets: **WebSockets: heartbeat/ping; latency monotonic (the client reconnects on silence).**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
