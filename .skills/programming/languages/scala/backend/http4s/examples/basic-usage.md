# http4s Best Practices: Basic Usage

Best practices for building Scala HTTP services with http4s — the functional, cats-effect-based framework conventions. Use when writing, structuring, or reviewing http4s — covers server/client, routes, Kleisli/DSL, mtl-structured effects, error handling, and testing.

## Scenario

Use this example as a starting point when applying **http4s-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Server & App Wiring** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```scala
object Main extends IOApp {
  def run(args: List[String]): IO[ExitCode] =
    EmberServerBuilder
      .default[IO]
      .withHost(ipv4"0.0.0.0")
      .withPort(8080)
      .withHttpApp(routes.orNotFound)
      .build
      .use(_ => IO.never)
      .as(ExitCode.Success)
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
