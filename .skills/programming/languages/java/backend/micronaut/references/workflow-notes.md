# Workflow notes

Focused reference for **micronaut-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Constructor injection everywhere**; beans assembled by the compile-time graph:

```java
@Singleton
public class UserService {
    private final UserRepository repo;
    public UserService(UserRepository repo) { this.repo = repo; }
}
```

- **`@Factory` for beans that need post-processing (HTTP clients, clients-of-external-API):**

```java
@Factory
public class Clients {
    @Bean @Singleton
    public HttpClient http(UriBuilder uri) { return HttpClient.newHttpClient(); }
}
```

- **No `new` in bean code** — the graph resolves; testing changes the graph via `@MockBean`.
- **DI scopes used deliberately** — request-scoped state is a boundary with a teardown contract.

---

## 4. Configuration

- **Typed config via `@ConfigurationProperties` (or `@Configuration` + `@Value` scoped):**

```yaml
app:
  db:
    url: jdbc:postgresql://localhost/db
  retries: 3
```

```java
@ConfigurationProperties("app")
public class AppConfig {
    private Db db;
    public static class Db { private String url; /* getters/setters */ }
}
```

- **`@ConfigurationProperties` bean injected once; `@Value("${app.retries}")` for the odd scalar only.**
- **Env-driven overrides** (`APP_DB_URL`) via property mapping; secrets from env, never constants.
- **Validation of config at startup** (`@NotBlank` on config properties) — a bad config fails fast in dev and deploy.

---

## 5. Validation & Error Handling

- **Bean Validation (`@Valid`, `@NotBlank`, `@Size`) at the request boundary (see `@Valid CreateUser`); `@NotNull` in services:**
