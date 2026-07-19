# Workflow notes

Focused reference for **express-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Order is the entire contract** — middleware runs top-down; logging → body parsing → security → request-id → routes → error handler:

```ts
app.use(pinoHttp({ logger }));
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(requestId());
app.use('/api', routes);
app.use(errorHandler()); // LAST — see §4
```

- **`app.use` for global middleware, router-level `router.use` for namespaced**; mount versioned routers by path (`/api/v1`) for API evolution.
- **Add request-id middleware early** (e.g. `crypto.randomUUID()` + `x-request-id` echo) — it ties logs, downstream calls, and error responses together.
- **Body parsing with explicit `limit`** (`express.json({ limit: "1mb" })`) — unbounded JSON bodies are a memory-exhaustion vector.

---

## 4. Routing & Handlers

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

- **`express@5` handles rejected promises natively** — async handlers that `throw` reach the error middleware without a manual `try/catch`; on `express@4`, wrap with a small `asyncHandler(fn)` helper.
- **Resource-noun routes, HTTP-verb methods, REST-ish naming** — `users/:id`, `POST/GET/PATCH/DELETE`; keep routes 2 levels deep (`/users/:id/orders` only when a real nested resource exists).
- **`req.params`/`req.query` are strings — validate and coerce** (see §5); never trust them raw.
- Use **`res.status(...).json(...)` explicitly** — default 200 can lie about a 201/204 you meant to return.

---

## 5. Validation at the Boundary

- **Validate every request with zod at the route edge** — params, query, and body schemas fail fast with 400s and never reach the service:

```ts
const userCreateSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
});

const validate = (schema: z.ZodType) => (req, res, next) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res
      .status(400)
      .json({ error: 'invalid body', issues: parsed.error.issues });
    return;
  }
  req.body = parsed.data; // attach the parsed, narrowed value
  next();
};
```

- **Return narrowed parsed data, not the raw body** — the handler consumes `parsed.data`, so types stay honest downstream.
- **Coerce ids/numbers in the schema** (`z.coerce.number()`), don't `Number(req.params.id)` in handlers.
- **Validate `req.query` too** — query shapes are input as much as bodies.
