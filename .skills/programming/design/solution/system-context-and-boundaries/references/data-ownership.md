# Data Ownership

Every important data concept should have an authoritative owner responsible for validation, lifecycle, access policy, and change. Other components should access it through an explicit contract rather than writing directly to another owner's storage.

Document source of truth, identifiers, consistency expectations, retention, correction process, and derived copies. Separate ownership from physical storage: shared infrastructure does not imply shared authority.

If multiple systems can update the same fact, define conflict resolution, ordering, reconciliation, and audit. Avoid dual writes without an explicit consistency design and repair process.
