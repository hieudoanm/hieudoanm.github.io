# Hyper Best Practices: Workflow Checklist

A practical run sheet for applying [Hyper Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Server Basics: **hyper::Server::bind + serve (or serve_connection) with a hyper::service::make_service_fn: into full ToT proto / h1c for tests:**
- [ ] 1. Server Basics: **service_fn as the quick handle-all** — one function gets the request, returns the response:
- [ ] 2. The Service Trait: **Services implement Service<Request<T>>; the request/response protocol is the boundary:**
- [ ] 2. The Service Trait: **poll_ready is org-mandatory for backpressure-aware services** (hyper respects readiness)
- [ ] 3. Requests, Bodies & Extractors: **Bodies are async streams — consume once, effectively:**
- [ ] 3. Requests, Bodies & Extractors: **hyper::body::to_bytes/aggregate when a full body is needed; use a framed/chunked read for streaming payloads** — a full-body read of a 10 GB upload is a resource bug
- [ ] 4. Routing (Hand-Rolled): **Hyper has no router — add one explicitly:**
- [ ] 4. Routing (Hand-Rolled): **Match on (method, path) pairs; parse params once; unknown → 404/405 uniformly.**
- [ ] 5. Errors & Middleware: **Errors are returned, converted at the boundary:**
- [ ] 5. Errors & Middleware: **Wrap services for middleware** — a Timing, Auth, Logger layer is a Service around another Service; keep each layer one concern

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
