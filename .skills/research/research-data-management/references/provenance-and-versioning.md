# Provenance and Versioning

Provenance records where data came from and how they changed. Preserve source files as read-only where feasible, calculate checksums for critical transfers, and record each transformation with inputs, outputs, code or procedure, date, operator, and software version.

Use version control for code, protocols, schemas, and non-sensitive text. Do not commit restricted data, credentials, or linkage keys. For large or sensitive datasets, use approved managed storage and a separate versioning or snapshot process.

Track manual corrections and exclusions in a log or reproducible script rather than silently editing values. Record the rationale and retain an auditable mapping to source records. Reconcile data releases with analysis versions and citations.

For computational work, document dependencies, parameters, random seeds where relevant, and execution instructions. A versioned pipeline supports reproduction but cannot guarantee the original data or environment remain accessible.
