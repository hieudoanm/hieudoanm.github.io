# Example: Event Notification

**Illustrative event contract; no broker technology is prescribed.**

An owning component publishes `OrderAccepted` only after its state transition is committed. The event carries a stable event ID, aggregate identifier, occurrence time, schema version, and only data consumers need.

Consumers tolerate duplicates and define ordering scope. The owner documents replay and retention rules; sensitive fields are excluded unless justified and authorized. The event states a fact, not a request for a consumer to perform a command.
