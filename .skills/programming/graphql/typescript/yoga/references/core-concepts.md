# 1. Core Concepts

Focused reference for **yoga**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 1. Core Concepts

- **`createSchema`** (from `@graphql-tools/schema`) + **`createYoga`** to build a server with SDL + resolvers.
- Plugin architecture built on **Envelop** — hooks for every stage: `onParse`, `onValidate`, `onExecute`, `onSubscribe`, `onError`.
- Universal runtime: works in Node (Express/Fastify/Hono or standalone) and on Edge (Cloudflare Workers, Vercel).
- Supports **GraphQL over HTTP, WebSocket, and SSE** out of the box.
