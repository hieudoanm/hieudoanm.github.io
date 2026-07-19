# Resend Best Practices: 3. Deliverability & Events

## Source guidance

This example applies the **3. Deliverability & Events** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Configure DKIM/SPF/DMARC** in your DNS; verify the domain in the dashboard
- **Consume webhooks** to track delivered/opened/clicked/bounced/complained
- On **bounce or complaint**: stop sending to that address, log, and maintain suppression
- **Monitor bounce/complaint rates** — sustained high rates degrade your reputation
- **Warm up** new domains/volumes gradually

## Example

```ts
// bounce webhook → remove address from future sends
if (payload.data && payload.data.event === "email.bounced") {
  await suppressionList.add(payload.data.email);
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for resend.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
