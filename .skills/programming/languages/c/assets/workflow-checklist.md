# C Best Practices: Workflow Checklist

A practical run sheet for applying [C Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Memory Ownership & Lifetime: **Name the owner and the lifetime for every allocation** — heap vs stack, borrowed vs owned, who frees:
- [ ] 1. Memory Ownership & Lifetime: **Free in the same layer that allocates** (or transfer ownership explicitly at a named boundary); leak detection is easier when ownership doesn't zig-zag
- [ ] 2. Pointer & Array Discipline: **Pointers point to one object or to an unbounded array — say which**:
- [ ] 2. Pointer & Array Discipline: **Every array/every pointer + size arrives as a pair** — an array without a length is a crash waiting to happen; sized buffers or null-terminated, never assume
- [ ] 3. Types, Qualifiers & Integers: **Explicit-width integers** (uint32_t/int64_t/size_t from <stdint.h>) at every boundary and for anything serialized — plain int may be 16/32/64 bits across platforms:
- [ ] 3. Types, Qualifiers & Integers: **size_t for sizes and indexes**; guard against size overflow before malloc(a * b):
- [ ] 4. Error Handling: **Pick one error contract and apply it everywhere** — resulting 0 == success, pointer-with-NULL-on-error, or errno-style codes. Don't mix three styles in one file:
- [ ] 4. Error Handling: **Errors flow up, never down** — a function that can't succeed must not return a partially valid result; return the error
- [ ] 5. Strings: **There are no strings — only char * + length**; decide null-terminated vs (buf, len) per API and write it down:
- [ ] 5. Strings: **Prefer snprintf/strlcpy-style bounded operations**; never strcpy, strcat, sprintf, or gets — they are unbounded by design

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
