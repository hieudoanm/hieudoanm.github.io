# Neo4J: 5. Operations and Architecture

## Source guidance

This example applies the **5. Operations and Architecture** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Enterprise Edition** provides clustering, multi-database (named databases per instance), and causal clustering.
- **Desktop Edition**: local development; runs as an embedded server with a browser-based Neo4j Browser.
- **Cloud**: Neo4j Aura offers fully managed SaaS.
- Memory: set `dbms.memory.heap.initial_size` and `dbms.memory.pagecache.size` to fit the active working set.
- Backups via `neo4j-admin database dump/backup`; use online backups for production.
- Monitor via Neo4j Browser, JMX, or APM integrations.

## Example

A team applying **5. Operations and Architecture** to a Neo4J project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Enterprise Edition** provides clustering, multi-database (named databases per instance), and causal clustering.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for neo4j.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
