# Backbone — Critical Test Scenarios

| Scenario                                 | Expectation                                  |
| ---------------------------------------- | -------------------------------------------- |
| Auth                                     | Register/login returns valid JWT (72h)       |
| RBAC                                     | Role ↔ collection enforced per route         |
| Rate limiting                            | 429 after exceeding token bucket (200 tokens)|
| Webhook delivery                         | HMAC-SHA256 signature; attempts logged       |
| Cron job                                 | Schedule triggers; per-job run logs          |
| Secrets                                  | AES-256-GCM encrypted; list omits values     |
| E2E CRUD                                 | Full create/read/update/delete over HTTP     |
| Healthcheck                              | `GET /api/health` returns `{"status":"ok"}`  |
