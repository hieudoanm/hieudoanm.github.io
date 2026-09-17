# C Best Practices: 3. Types, Qualifiers & Integers

## Source guidance

This example applies the **3. Types, Qualifiers & Integers** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Explicit-width integers** (`uint32_t`/`int64_t`/`size_t` from `<stdint.h>`) at every boundary and for anything serialized — plain `int` may be 16/32/64 bits across platforms:
- **`size_t` for sizes and indexes**; guard against size overflow before `malloc(a * b)`:
- **Signed for error-and-value** (`int64_t` returning `-1`/`ENOMEM`), unsigned for bit patterns/indices — mix deliberately, never casually.
- **Enable and honor `-Wconversion`/`-Wsign-conversion`** — silent integer truncation is a class of real CVEs.
- **`bool` only for truth values**; use `_Bool`/`stdbool.h` rather than `int` 0/1 flags.

## Example

```c
#include <stdint.h>
uint32_t crc32_tbl(size_t len, const uint8_t *data);
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for c-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
