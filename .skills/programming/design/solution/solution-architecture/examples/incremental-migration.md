# Example: Incremental Migration

**Illustrative migration outline.**

For a new interface over an existing capability, preserve current clients while introducing a versioned adapter. Route a small, observable cohort to the new path, compare outputs, and reconcile data before expanding traffic.

Define rollback triggers, ownership, compatibility period, and criteria for removing the old path. Avoid dual writes unless consistency and repair behavior are explicitly designed and tested.
