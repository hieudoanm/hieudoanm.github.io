# Google Cloud IAM Change Review

- [ ] Correct IAM resource type selected: additive member, authoritative binding, or full policy.
- [ ] No competing ownership for the same principal/role/scope.
- [ ] Principal identity, service account, project, and owner verified.
- [ ] Role is minimal; broad primitive roles are avoided or justified.
- [ ] Inherited grants, conditional bindings, and organization policy considered.
- [ ] Impersonation and `actAs` permissions are constrained.
- [ ] Runtime identity is separate from deployment identity.
- [ ] Rollback and access-recovery owner are identified.
