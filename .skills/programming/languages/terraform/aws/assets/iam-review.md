# AWS IAM Change Review

- [ ] Principal and trust relationship are explicit and constrained.
- [ ] Actions are minimal; wildcard actions/resources have written justification.
- [ ] `iam:PassRole`, policy attachment, and privilege escalation paths are assessed.
- [ ] Resource and KMS key policies are consistent with identity policies.
- [ ] Cross-account principals and conditions are expected.
- [ ] Permission boundaries, SCPs, and service control layers are considered.
- [ ] Workload can operate without static credentials.
- [ ] Policy change is tested and rollback owner is identified.
