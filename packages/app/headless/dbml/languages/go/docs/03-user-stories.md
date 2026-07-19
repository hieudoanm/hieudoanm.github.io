# dbml (Go) — User Stories

## 1. Purpose

This document describes user stories for dbml, expressing user goals in terms of role, motivation, and acceptance criteria.

It complements `00-overview.md`, `01-requirements.md`, `02-features.md`, `04-architecture.md`, `05-data-model.md`, and `06-api-specification.md`.

## 2. User Roles

| Persona | Primary goal |
| ------- | ------------ |
| Developer | Convert DBML to SQL, Mermaid, and SVG via CLI |
| Developer/Operator | Run the HTTP server or MCP server for programmatic conversion |

dbml is a **single-user** tool. There are no accounts in the initial release.

## User Stories

- [US-001: Parse a DBML file](./03-user-stories/US-001.md)
- [US-002: Generate SQL DDL from DBML](./03-user-stories/US-002.md)
- [US-003: Generate a Mermaid ER diagram from DBML](./03-user-stories/US-003.md)
- [US-004: Generate an SVG diagram from DBML](./03-user-stories/US-004.md)
- [US-005: Generate all formats at once](./03-user-stories/US-005.md)
- [US-006: Convert DBML via the HTTP API](./03-user-stories/US-006.md)
- [US-007: Convert DBML via the MCP server](./03-user-stories/US-007.md)
- [US-008: Review conversion errors](./03-user-stories/US-008.md)
- [US-009: Check server health](./03-user-stories/US-009.md)
- [US-010: Handle malformed DBML input](./03-user-stories/US-010.md)
