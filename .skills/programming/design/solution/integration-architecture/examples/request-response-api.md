# Example: Request-Response API

**Illustrative contract sketch.**

A client submits a request for a result needed before the next user step. The design defines authentication, input validation, response schema, error categories, deadline, rate limits, and compatibility policy. It specifies whether retries are safe and how the client receives correlation details.

Measure end-to-end latency and dependency failure behavior. If the operation may exceed the client deadline, consider an asynchronous job resource rather than holding a connection indefinitely.
