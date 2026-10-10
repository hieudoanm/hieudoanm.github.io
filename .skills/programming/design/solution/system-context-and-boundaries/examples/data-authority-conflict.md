# Example: Data Authority Conflict

**Illustrative scenario.**

Two systems both edit a customer's contact preference. The design identifies which system is authoritative, which systems hold derived copies, and how updates propagate and reconcile.

If authority cannot be assigned, define the business conflict rule and audit trail before adding another integration. A shared database may hide the ownership problem rather than solve it.
