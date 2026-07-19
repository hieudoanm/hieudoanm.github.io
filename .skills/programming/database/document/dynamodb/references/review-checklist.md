# Review checklist

Focused reference for **dynamodb**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Keys are the schema** — entity type and access path live in PK/SK
- **One table, sparse GSIs, no scans** — the DynamoDB idiom
- **Cost is a design input** — capacity mode and GSI count are decisions
- **Be truthful about unsupported queries** — if a pattern needs a scan/join, redesign

---

## Quick-Start Checklist

- [ ] Access patterns enumerated before any table exists
- [ ] Single table; PK/SK encode type + hierarchy; every item has a purpose
- [ ] No production `Scan`; queries via keys/GSIs; pagination designed in
- [ ] Sparse, deliberate GSIs; documents of supported queries kept per table
- [ ] Conditional writes for invariants; consistency chosen per read
- [ ] Hot partitions and unbounded collections avoided; TTL planned
- [ ] Capacity mode selected deliberately; throttling/capacity metrics monitored
- [ ] Access patterns load-tested; cost trade-offs documented
