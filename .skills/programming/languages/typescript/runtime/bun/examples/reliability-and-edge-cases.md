# Bun Runtime Best Practices: 3. File I/O & Blobs

## Source guidance

This example applies the **3. File I/O & Blobs** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`Bun.file(path)`** gives a lazy file handle that streams and ranges and is a first-class `Response` body:
- **`Bun.write(path, data)`** for a one-shot write (string/`Uint8Array`/`Blob`/`Response`-ish); **`Bun.stdin`/`Bun.stdout`** for terminal I/O.
- Iterate large files line-by-line with a `Bun.file(file).stream()` + a line reader rather than reading a multi-GB file at once.

## Example

```ts
const file = Bun.file("./data/users.json");
const json = await file.json();        // or .text(), .bytes(), .stream()
return new Response(file);             // serves with content-type + range
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for bun-runtime.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
