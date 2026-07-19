# Actix-web Best Practices: Workflow Checklist

A practical run sheet for applying [Actix-web Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. App & Routing: **App::new() with scopes and services composes the tree:**
- [ ] 1. App & Routing: **web::scope("/users") groups paths; .route("/", web::get().to(handler)) declares verb + handler at the point.**
- [ ] 2. Extractors & Handlers: **Extractors appear in the handler signature — Json<T>, Path<T>, Query<T>, State<T>:**
- [ ] 2. Extractors & Handlers: **Max 3–4 extractors per handler** — a signature with five structs is a composite request type in disguise; define a QueryParams struct
- [ ] 3. State & Dependencies: **App::app_data(web::Data::new(...)) injects shared state; State<T> type in extractors:**
- [ ] 3. State & Dependencies: **Everything shared is Arc-wrapped and cloneable** — the actor/thread model means state moves across worker threads
- [ ] 4. Error Handling: **Handlers return actix_web::Result<T>; domain errors convert via From:**
- [ ] 4. Error Handling: **impl Error for MyError + a From<MyError> for actix_web::Error mapper** — one conversion per domain error type, at the boundary:
- [ ] 5. Middleware: **.wrap(middleware::Logger::default())/middleware::Compress/NormalizePath** for the common pipeline:
- [ ] 5. Middleware: **Custom middleware via middleware::from_fn/custom Transform** — keep it small; it's a Service wrapper over the route

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
