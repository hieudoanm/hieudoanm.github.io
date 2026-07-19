# Responsibility and Domain Boundaries

Group behavior around cohesive business rules and language. A useful boundary has a clear purpose, inputs, outputs, owner, and reason to change. Domain experts should validate that terms and policies mean the same thing across teams.

Assess candidate boundaries by independent change, policy ownership, data authority, scaling need, security isolation, and team responsibility. A new service adds network failure, deployment, observability, and data consistency costs; separation is not automatically improved modularity.

Watch for duplicated business rules, shared mutable state, chatty calls, and unclear ownership. A modular monolith or explicit module boundary may be a better first step than distributed deployment.
