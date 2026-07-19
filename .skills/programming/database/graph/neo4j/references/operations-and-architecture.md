# 5. Operations and Architecture

Focused reference for **neo4j**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 5. Operations and Architecture

- **Enterprise Edition** provides clustering, multi-database (named databases per instance), and causal clustering.
- **Desktop Edition**: local development; runs as an embedded server with a browser-based Neo4j Browser.
- **Cloud**: Neo4j Aura offers fully managed SaaS.
- Memory: set `dbms.memory.heap.initial_size` and `dbms.memory.pagecache.size` to fit the active working set.
- Backups via `neo4j-admin database dump/backup`; use online backups for production.
- Monitor via Neo4j Browser, JMX, or APM integrations.
