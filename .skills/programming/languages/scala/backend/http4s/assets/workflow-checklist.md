# http4s Best Practices: Workflow Checklist

A practical run sheet for applying [http4s Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Server & App Wiring: **EmberServerBuilder at the edge; routes inside:**
- [ ] 1. Server & App Wiring: **orNotFound wraps the routes the standard 404; HttpRoutes is the tail.**
- [ ] 2. Routes & DSL: **The route DSL pattern-matches method + path; handlers are pure functions:**
- [ ] 2. Routes & DSL: **Extractors (UUIDVar, IntVar, LongVar) parse path segments typed at the pattern.**
- [ ] 3. Effects & Context: **F[_] threaded — IO/ZIO/CatEffect type in every signature; handlers are f: Request[F] => F[Response[F]]:**
- [ ] 3. Effects & Context: **No side effects outside F** — logging, DB, HTTP all returned/tracked, never planted tell in the handler body
- [ ] 4. Middleware & Errors: **Compose with middlewares** (RequestLogger, ResponseLogger, auth, CORS):
- [ ] 4. Middleware & Errors: **Error channel**: F[Either[AppError, Response[F]]] or raise-to-Response via HttpApp; a dedicated error handler converts domain errors to status codes once:
- [ ] 5. Client: **Client[F] with expect/run for outbound calls:**
- [ ] 5. Client: **One client per app (pooled); use typed decoders on the client too.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
