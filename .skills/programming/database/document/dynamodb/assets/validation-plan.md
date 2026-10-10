# DynamoDB Best Practices: Validation Plan

Use this plan to verify work guided by [DynamoDB Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Familiarity with the application’s data model and access patterns.
- For implementation, access to the database environment or representative schema.

## Skill-specific review

- [ ] DynamoDB **scales automatically — but keys still matter**
- [ ] Monitor: **consumed capacity, throttling events, hot partitions**
- [ ] Choose **capacity mode deliberately** (On-Demand vs Provisioned + autoscaling)
- [ ] Use **adaptive capacity correctly** — don't fight it, still avoid hot keys
- [ ] Design for **burst traffic**; use **DAX only when justified**
- [ ] Plan **TTL behavior** and background deletes
- [ ] **Test access patterns with production-like volume**; explain cost trade-offs clearly
- [ ] Use **IAM roles with least privilege**; prefer **fine-grained access (condition keys)**
- [ ] Decide **consistency per operation** — eventual (default) vs strong
- [ ] Use **conditional writes** to prevent lost updates

## Test record

| Check | Expected result | Evidence / command | Outcome |
|---|---|---|---|
| Primary success path | Meets the stated acceptance criteria |  |  |
| Boundary or failure case | Behaves safely and predictably |  |  |
| Regression / compatibility | Existing required behavior remains intact |  |  |

## Release decision

- Result: <!-- pass / pass with known limitations / fail -->
- Known limitations:
- Follow-up owner and date:
