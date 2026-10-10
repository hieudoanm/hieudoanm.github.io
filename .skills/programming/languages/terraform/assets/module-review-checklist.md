# Terraform Module Review Checklist

- [ ] Module has one clear responsibility and a supported provider contract.
- [ ] Inputs have accurate types, descriptions, and validation.
- [ ] Defaults are safe; environment and account identifiers are not silently assumed.
- [ ] Outputs expose only necessary, non-secret values.
- [ ] Resource identity is stable and refactors preserve addresses.
- [ ] Lifecycle rules and external ownership are documented.
- [ ] No embedded credentials, backend configuration, or environment-specific IDs.
- [ ] Tests cover representative inputs and failure or policy boundaries.
- [ ] Documentation describes assumptions, upgrade behavior, and destructive changes.
