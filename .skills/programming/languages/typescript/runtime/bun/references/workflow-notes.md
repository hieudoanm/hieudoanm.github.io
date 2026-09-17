# Workflow notes

Focused reference for **bun-runtime**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 3. File I/O & Blobs

- **`Bun.file(path)`** gives a lazy file handle that streams and ranges and is a first-class `Response` body:

```ts
const file = Bun.file("./data/users.json");
const json = await file.json();        // or .text(), .bytes(), .stream()
return new Response(file);             // serves with content-type + range
```

- **`Bun.write(path, data)`** for a one-shot write (string/`Uint8Array`/`Blob`/`Response`-ish); **`Bun.stdin`/`Bun.stdout`** for terminal I/O.
- Iterate large files line-by-line with a `Bun.file(file).stream()` + a line reader rather than reading a multi-GB file at once.

---

## 4. Shell & Scripting (Bun.$, bunx)

- **`Bun.$` is a tagged shell** — run commands safely with interpolation, captured stdout, and piping without `child_process` string-squashing:

```ts
const { stdout } = await Bun.$`git rev-parse --abbrev-ref HEAD`;
const branch = stdout.toString().trim();
await Bun.$`echo "on ${branch}" > .branch`.cwd(repoPath);
```

- **`bunx <pkg>` runs npm-published tools without installing to the project** (`bunx prettier --write .`), and **`bun run <script>`** executes package.json scripts (bare `bun <script>` works for `bun`-aware targets).
- For one-off scripts, Bun's TS-native execution means a `scripts/*.ts` file is your whole harness — no ts-node/compile ceremony.
