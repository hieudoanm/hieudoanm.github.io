# 3. Data Modeling

Focused reference for **neo4j**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 3. Data Modeling

- Think **use-case-first**: model the question as a graph pattern, not as a canonical schema.
- Relationship properties can encode time, strength, or state; this is a strength over relational joins.
- Avoid deeply nested node trees; flatten where relationships are stable and traversal is frequent.
- Use **variable-length paths** (e.g., `[:FRIEND*1..5]`) sparingly — they can blow up exponentially without `MATCH` filters.
