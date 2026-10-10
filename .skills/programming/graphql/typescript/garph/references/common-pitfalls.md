# 6. Common Pitfalls

Focused reference for **garph**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 6. Common Pitfalls

- Forgetting the resolver shape must mirror schema exactly (untyped key mismatch → runtime error or TS error).
- Relying on implicit `any` in inference for unions/interfaces loops — write them explicitly when tricky.
- Not leveraging `g.enum(..., {valueMap})` leading to string-only enums losing runtime values.
- Over-abusing `g.ref` circular references without `g.lazy(...)` for self-references.
