# Backbone — Risk Mitigation

| Risk                              | Mitigation                                                  |
| --------------------------------- | ----------------------------------------------------------- |
| Single SQLite file corruption     | Regular backups; SQLite WAL mode; backup/restore CLI        |
| Webhook delivery failures         | Delivery logged in `webhook_logs`; manual retry via dashboard|
| JWT secret exposure               | Rotate `JWT_SECRET`; use strong default in production       |
| Rate limit too strict/loose       | Tune token bucket (200 tokens) based on observed traffic    |
| Dependency creep                  | Evaluate each dependency against the dependency policy      |
