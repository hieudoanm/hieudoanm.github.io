# Hyper Best Practices: Starter Template

A reusable starting point derived from the **1. Server Basics** section of [Hyper Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```rust
let make_svc = make_service_fn(|_conn| async { Ok::<_, Infallible>(service_fn(handle)) });

let server = Server::bind(&"127.0.0.1:8080".parse()?)
    .serve(make_svc)
    .await?;
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
