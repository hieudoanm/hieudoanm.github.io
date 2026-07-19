# Azure State Recovery Record

- State owner / service / environment:
- Tenant, subscription, storage account, container, and blob key:
- Blob version or recovery point:
- Lease state and active-run confirmation:
- Incident and reason for recovery:
- Terraform and provider versions:
- Backup location and access approval:
- Recovery plan and expected resource/state alignment:
- Reviewer:
- Post-recovery plan summary:
- Lock released and access restored:

Never break a blob lease or overwrite state before confirming the owning run is inactive and the recovery point is safe.
