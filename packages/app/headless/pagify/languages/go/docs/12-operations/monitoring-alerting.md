# pagify — Monitoring and Alerting

pagify generates static sites, so runtime monitoring is minimal. Monitor the build pipeline and static host instead.

## Metrics

- Build success/failure (CI)
- Build duration
- `dist/` output size
- Static host uptime (via the host's status page)

## Alerts

- CI build failure
- Build duration regression
- Deploy failure

No runtime server metrics exist because pagify output is static.
