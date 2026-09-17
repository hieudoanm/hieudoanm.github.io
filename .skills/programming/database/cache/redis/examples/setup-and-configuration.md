# Redis Best Practices: 2. Architecture & Design

## Source guidance

This example applies the **2. Architecture & Design** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **One responsibility per keyspace**; model data around **access patterns**
- **Prefer Hashes over many small keys** (`HMSET user:42 {name,email,level}`)
- Use **Sets/ZSets for membership and ranking**; **Streams for event-like workloads**
- Use **Lua scripts** for atomic multi-step logic
- **Design idempotent writes** where possible
- Document **eviction behavior and failure modes**
- **Separate cache, queue, and coordination concerns** into distinct keyspaces/instances

## Example

A team applying **2. Architecture & Design** to a Redis Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****One responsibility per keyspace**; model data around **access patterns****, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for redis.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
