# Contract Evolution

Contracts include semantics, schemas, error behavior, security, and operational expectations. Assign an owner and publish consumer expectations.

Prefer compatible additive changes when consumers may update independently. Define compatibility rules for field optionality, defaults, enum expansion, ordering, and unknown values. Breaking changes need a versioning or migration plan, consumer inventory, overlap period, telemetry, and retirement criteria.

Use consumer-driven or schema compatibility tests where suitable, but tests cannot replace agreement on business meaning. Test representative old and new consumers, and document behavior that schemas cannot express.
