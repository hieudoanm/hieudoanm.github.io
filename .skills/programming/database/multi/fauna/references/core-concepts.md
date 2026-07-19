# 1. Core Concepts

Focused reference for **fauna**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 1. Core Concepts

- **Tables** hold documents; each document has a unique `ref`, a schema-driven shape, and automatic timestamps/versions.
- **FQL is the primary query language**: chaining structured operations with an elegant, C#-like syntax.
- **Temporal database**: every document keeps its full history via _time travel_ — you can query any point in the past.
- **Consistency**: Fauna provides strong (linearizable) consistency for single-document reads/writes by default.
- **Serverless**: no server provisioning, auto-scaling, pay-per-query pricing model.
