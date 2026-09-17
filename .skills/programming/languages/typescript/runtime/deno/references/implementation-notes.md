# Implementation notes

Focused reference for **deno-runtime**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Web standards are the native API** — `fetch`, `Response`/`Request`, `WebSocket`, `ReadableStream`, `Headers`, `URL`, `FormData`, `File`, `crypto` all work without imports.
- **`Deno.serve` for HTTP servers** — the modern, fast server built on Web APIs:

```ts
const server = Deno.serve(
    { port: 3000, onListen: ({ hostname, port }) => console.log(`on ${hostname}:${port}`) },
    (req) => new Response(await Deno.readTextFile("./index.html"), { headers: { "content-type": "text/html" } }),
);
```

- **Filesystem via `Deno.readTextFile`/`readFile`/`writeTextFile`** (async by default) — always prefer the `promise`-returning variants; `Deno.cwd`/`Deno.env`/`Deno.args` for process basics.
- Use **`@std/io` (`iterateReader`/`iterateWriter`)** for streaming large files instead of buffering whole files; `ServeStatic`/`@std/http` helpers for static + file responses.
- **JSON body handling**: `await req.json()` with try/catch + size limits; validate with zod (`npm:zod` or `jsr:` schema lib) at the boundary.

---

## 5. TypeScript & Strict Mode

- **TS is the runtime language** — `.ts` files run directly; `deno run --check` / `deno check` gates types before/at execution, so *every* run is a type-check when you want it to be.
- **`strict: true` in `deno.json` compilerOptions** aligns with the single-config style; `JSR`/`jsr:` packages are type-checked on publish, which is upstream quality leverage.
- **Self-document types** — annotate public signatures; derived `satisfies`, branded types etc. follow the TypeScript skill (see `.skills/typescript/typescript.md`).

---

## 6. Testing

- **`deno test`** — the built-in runner; `@std/assert` for assertions, `describe`/`it` from `@std/testing/bdd`, plus built-in coverage:

```ts
import { assertEquals } from "jsr:@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";

describe("getUser", () => {
    it("returns the user when found", async () => {
        assertEquals((await getUser("1")).id, 1);
    });
});
```
