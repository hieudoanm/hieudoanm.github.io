# Workflow notes

Focused reference for **quarkus-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **No servlet-style lifecycle coupling** — beans are plain CDI; resources are plain resources.
- **Mocking in tests uses `@InjectMock`/`Mockito`; `@Startup` for eager init beans only.**

---

## 3. REST Resources

- **JAX-RS-ish `@Path`/`@GET`/`@POST` on `resteasy-reactive` — small controllers, one route family each:**

```java
@Path("/users")
public class UserResource {
    @GET
    @Path("/{id}")
    public User get(@PathParam("id") long id) {
        return service.find(id);
    }
    @POST
    public User create(@Valid CreateUser body) { ... }
}
```

- **Reactive `Uni<T>`/`Multi<T>` or imperative returns** — pick per endpoint; a REST boundary with blocking I/O under a reactive stack declares it (`@Blocking` when needed):

```java
@GET @Blocking public Uni<User> heavy() { ... }
```

- **`@Valid`/Bean Validation at the boundary** — fail-fast before services.
- **JSON via Jackson/JSON-B configured once** — no per-route serializer ceremonies.

---

## 4. Configuration & Secrets

- **`application.properties` is the tree; env maps the same keys** (`OME_DB_URL` → `quarkus.datasource.jdbc.url` style):

```properties
%dev.quarkus.datasource.jdbc.url=jdbc:postgresql://localhost/db
quarkus.datasource.jdbc.url=${OME_DB_URL}
```

- **Typed config via `@ConfigProperty`/`@ConfigMapping`** — `@ConfigMapping` for grouped, immutable settings:
