# Overview

Focused reference for **spring-boot-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Spring Boot Backend Best Practices

Spring Boot is a configuration-first Java framework built on Spring MVC, Spring Data, and (optionally) Spring Security. Best practice is disciplined layering — controller/service/repository each with one responsibility — plus DTOs at every API boundary, centralized exception mapping, constructor injection, and explicit transaction and validation boundaries.

---

## 1. Core Stack & Constraints

- Java **17**; Spring Boot **3.x**; Spring MVC for REST APIs; Spring Data JPA for persistence
- Jakarta Validation (Bean Validation) for input validation
- `spring-boot-starter-test` + `@WebMvcTest`/`@SpringBootTest` for tests

```bash
curl -G https://start.spring.io -d dependencies=web,data-jpa,validation,security -d type=gradle-project -o app.zip
```

- **Pin Java to 17+ per the project**; no JVM-version drift across machines (toolchain in build config).

---

## 2. Layering & Structure

- **Separate layers with one responsibility** — `controller`, `service`, `repository`, `domain/entity`:

```text
src/main/java/com/example/app/
  controller/      # HTTP wiring, DTO mapping, validation triggers
  service/         # business logic + transaction boundaries
  repository/      # thin Spring Data interfaces
  domain/          # entities, value objects
```

- **Controllers are thin** — accept a request DTO, call a service, return a response DTO; no business logic.
- **Business logic lives in services, not controllers** — controllers orchestrate HTTP only.
- **Repositories are thin** — Spring Data interfaces for persistence; no business rules in queries.
- **Stateless services where possible**; prefer composition over inheritance.

---

## 3. Dependency Injection
