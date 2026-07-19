# Overview

Focused reference for **play-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Play Framework Backend Best Practices

Play Framework is an async-first Scala web framework built on Akka (classic Akka HTTP engine) with type-safe routing, built-in JSON support, and constructor-based dependency injection. Best practice is async-first design: `Future`-returning controllers, never blocking the default execution context, constructor-based DI (no globals), DTOs at API boundaries, and explicit failure modeling.

---

## 1. Core Stack & Constraints

- Scala **2.13+** or **Scala 3**; Play Framework **latest LTS**
- Play JSON (`play-json`) or Circe for serialization
- Slick/Doobie for database access
- `scalatest`/`scalatestplus-play` for tests

```scala
// build.sbt
libraryDependencies ++= Seq(
  ws,
  "com.typesafe.play" %% "play-json" % playVersion,
  "com.typesafe.slick" %% "slick" % slickVersion
)
```

- **Play is a framework, not the domain** — keep domain logic testable and portable outside the HTTP edge.
- **Pin Play to an LTS line** — official support windows matter; don't chase majors casually.

---

## 2. Project Structure & Architecture

- **Separate layers clearly** — `controllers`, `services`, `repositories`, `models/domain`:

```text
app/
  controllers/     # HTTP wiring — thin
  services/        # business logic (Future-returning)
  repositories/    # persistence only
  models/          # domain models & DTOs
  views/           # templates (if HTML; API-only apps skip)
conf/
  application.conf # config, env overrides
```

- **RESTful resource naming** (`/users`, `/orders/:id`); **version explicitly** (`/api/v1/...`).
- **Business logic lives in services; controllers orchestrate** — no business rules in controllers.
- **Repositories focus on persistence only** — Slick queries in, domain results out.
- **Stateless services where possible**; composition over inheritance.

---

## 3. Controllers (Thin HTTP Layer)
