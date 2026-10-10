# Express.js Backend Best Practices: 4. Routing & Handlers

## Source guidance

This example applies the **4. Routing & Handlers** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`express@5` handles rejected promises natively** — async handlers that `throw` reach the error middleware without a manual `try/catch`; on `express@4`, wrap with a small `asyncHandler(fn)` helper.
- **Resource-noun routes, HTTP-verb methods, REST-ish naming** — `users/:id`, `POST/GET/PATCH/DELETE`; keep routes 2 levels deep (`/users/:id/orders` only when a real nested resource exists).
- **`req.params`/`req.query` are strings — validate and coerce** (see §5); never trust them raw.
- Use **`res.status(...).json(...)` explicitly** — default 200 can lie about a 201/204 you meant to return.

## Example

```ts
import { Router } from 'express';

const users = Router();

users.get('/', async (req, res, next) => {
  try {
    const list = await getUsers();
    res.json(list);
  } catch (err) {
    next(err); // delegate to the error middleware — never swallow
  }
});

users.post('/', validate(userCreateSchema), async (req, res, next) => {
  /* ... */
});

export default users;
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for express-backend.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
