# http4s Best Practices: Starter Template

A reusable starting point derived from the **1. Server & App Wiring** section of [http4s Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
