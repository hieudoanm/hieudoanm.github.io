# Performance and Capacity

Describe representative and peak workloads: concurrency, request mix, payload sizes, data growth, arrival patterns, and dependency behavior. Measure end-to-end user-visible latency and relevant percentiles; averages can conceal tail behavior.

Use a model or prototype to identify bottlenecks and estimate resource needs. Define load, stress, soak, and capacity tests with realistic data and environment limits. Include startup, warmup, cache state, and background work when they affect results.

State scaling assumptions and resource/cost budgets. Horizontal scaling may not help shared bottlenecks, serial work, external quotas, or stateful coordination. Verify performance and cost together.
