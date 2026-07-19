# Example: Monolith Decomposition

**Illustrative decomposition exercise.**

A monolith contains account, billing, and reporting modules. Before extraction, the team maps code dependencies, shared tables, release coupling, change frequency, and business ownership. It first creates explicit module APIs and tests around policy boundaries.

Only after a capability demonstrates independent change or operational needs does the team evaluate deployment separation. The decision includes data migration, compatibility, observability, and distributed failure costs.
