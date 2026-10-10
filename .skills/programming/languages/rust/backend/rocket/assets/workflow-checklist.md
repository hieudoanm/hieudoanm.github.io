# Rocket Best Practices: Workflow Checklist

A practical run sheet for applying [Rocket Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Launch Structure: **#[launch] + rocket.routes![] assembles the app at one point:**
- [ ] 1. Launch Structure: **manage(...) registers state; mount("/prefix", routes![...]) maps route families to a path.**
- [ ] 2. Routes & Functions: **Route attributes define verb + path + format:**
- [ ] 2. Routes & Functions: **Extractors as parameters:** Path, Query<T>, Json<T>, &State<T>, Data — the signature names the request contract
- [ ] 3. Request Guards & State: **State/manage for shared deps (repo, client, config):**
- [ ] 3. Request Guards & State: **Custom guards via FromRequest** — auth-bearing headers parsed at the boundary:
- [ ] 4. JSON & Serialization: **Json<T> in and out with serde derive:**
- [ ] 4. JSON & Serialization: **#[catch(404)], #[catch(500)] handlers render errors uniformly:**
- [ ] 5. Errors & Logging: **#[catch] for the standard codes; domain errors integrated via Responder implementations:**
- [ ] 5. Errors & Logging: **Log at the boundary** — rocket::log/env_logger; no println in the request path

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
