# Workflow notes

Focused reference for **insomnia-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 2. Environments and Templating

- **Use environment variables with the `{{variable}}` syntax,** declared in an environment file per deployment, and keep the values in Git with secrets excluded.
- **Do not put a live token in a request body template**; use a pre-request script to refresh it in one place, as in postman.md.
- **Keep environments minimal** — base URL, credentials reference, feature flags. An environment that mirrors every request parameter is a second source of truth.
- **Use the template helper for common values** (a base object, a timestamp) so a change to a shape is one edit rather than forty.

---

## 3. Design-First Workflow

- **Insomnia's design resources are its real differentiator:** define a resource's schema once, and Insomnia generates CRUD requests, environment variables, example payloads, and a mock response.
- **Design-first suits a greenfield API** where the shape is still being decided; a generated request set then documents the decision and tests it at the same time.
- **For an existing API, import the OpenAPI document** and edit the design from there; hand-editing generated requests creates a fork with no owner.
- **The mock server is the payoff** — frontend work proceeds against the design's mock, and the contract is enforced when the real service is ready.
- **A design is a specification, so it belongs in review.** Changes to a design resource are API changes and get the same scrutiny as any other interface change.
