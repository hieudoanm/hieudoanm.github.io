---
name: "research-data-management"
description: "Plan and document research data lifecycle, organization, provenance, quality, security, access, preservation, and sharing."
tags:
  - "research"
  - "data-management"
  - "provenance"
when_to_use: "Use when setting up or improving how research data and related files are organized, documented, protected, transformed, preserved, or shared."
prerequisites:
  - "A defined project, data types, responsible people, and applicable consent, governance, license, or funder conditions."
  - "Access to approved storage and a data steward or institutional guidance for restricted or sensitive data."
related_skills:
  - "../study-design-protocol/SKILL.md"
  - "../research-reproduction/SKILL.md"
  - "../systematic-review/SKILL.md"
avoid_when:
  - "When asking to analyze data statistically; use an appropriate analysis skill."
  - "When handling identifiable or restricted data without authorization; obtain governance approval and approved infrastructure first."
status: "active"
---

# Research Data Management

## Purpose

Make research data understandable, secure, traceable, and usable across the project lifecycle. A data-management plan assigns responsibilities and decisions; it does not replace institutional policy, ethics approval, legal advice, or secure infrastructure.

## Workflow

1. Inventory data types, formats, sources, sensitivity, rights, and expected volume.
2. Assign owners and approved storage locations; restrict access to the minimum necessary.
3. Define stable identifiers, folder conventions, file naming, metadata, and versioning.
4. Document collection, instruments, transformations, quality checks, and provenance.
5. Keep source data immutable; make derived data reproducible from documented steps where permitted.
6. Plan backup, recovery, retention, preservation, deletion, and sharing.
7. Review the plan when consent, data linkage, collaborators, or project scope changes.

## Organize for traceability

Separate raw/source material, processed data, analysis-ready data, code, documentation, and outputs. Do not overwrite originals. Record software versions, transformation order, units, missing-value conventions, and data dictionary updates. Use [assets/data-management-plan.md](assets/data-management-plan.md) to capture decisions.

## Protect people and rights

Classify data before moving or sharing it. De-identification reduces risk but does not guarantee anonymity, especially when records can be linked. Keep linkage keys separate with stricter access. Confirm consent, ethics conditions, data-use agreements, copyright, licenses, and jurisdictional requirements before reuse or release.

Never place secrets, identifiable records, or restricted data in public repositories, unapproved cloud services, or example files. Use synthetic or properly licensed sample data for demonstrations.

## Quality and reproducibility

Validate data at ingestion, preserve quality reports, and log corrections without erasing the source. Prefer machine-readable, documented formats where suitable, while retaining source formats and conversion provenance. Record decisions that affect interpretation and provide an execution environment or dependency record when appropriate.

## Sharing and preservation

Share data only when permission and risk assessment allow. Consider controlled access, aggregation, or metadata-only records when open release is inappropriate. Include data dictionaries, provenance, licenses, citation instructions, and access conditions. Assign retention and deletion dates; verify repository suitability and preservation commitments.

## Completion checks

- Data inventory, sensitivity, ownership, and storage are recorded.
- Raw data are protected and derived data transformations are traceable.
- Metadata and quality checks allow another authorized researcher to interpret files.
- Access, backup, retention, deletion, and sharing decisions follow applicable requirements.
- Limitations and unavailable materials are explicit.

## Further detail

- [Organization and metadata](references/organization-and-metadata.md)
- [Provenance and versioning](references/provenance-and-versioning.md)
- [Security and access](references/security-and-access.md)
- [Preservation and sharing](references/preservation-and-sharing.md)
