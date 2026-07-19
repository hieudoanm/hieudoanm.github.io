# Feature: Strict validation

`landify validate` reports every missing or invalid field at once and exits 1
on any problem; unknown YAML fields are rejected via `KnownFields(true)`.
