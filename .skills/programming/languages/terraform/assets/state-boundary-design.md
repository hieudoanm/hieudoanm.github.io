# State Boundary Design

For each proposed state, record:

- **Owner and lifecycle:** team, service, environment, and destruction authority.
- **Resources:** objects included and excluded, with reason.
- **Backend:** location, encryption, lock behavior, recovery/versioning, and access policy.
- **Identity:** who can read state, plan, apply, and recover it.
- **Interfaces:** values consumed by other states and how they are published safely.
- **Isolation:** account/project/subscription and tenant boundaries.
- **Operations:** drift response, backup, restore, migration, and incident procedure.

Do not use workspaces or directory names as a substitute for access control.
