# Example: New Service

**Illustrative design sketch; technologies and scale are intentionally unspecified.**

A product team needs to isolate a capability that changes independently and has a clear data owner. Before creating a service, it confirms independent deployment and scaling are real requirements, not assumed benefits.

The design states the service contract, source of truth, failure behavior, authentication boundary, operational owner, and deployment path. It compares keeping the capability in the existing application with extracting it. A thin vertical slice validates deployment, observability, and contract behavior before broader migration.
