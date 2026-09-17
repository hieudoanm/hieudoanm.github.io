# SendGrid Best Practices: 3. Deliverability & Events

## Source guidance

This example applies the **3. Deliverability & Events** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Consume Event Webhooks** (HTTPS POST) for delivered/bounced/spam-reports — don't poll
- Maintain a **suppression/unsubscribe list** from spam reports and unsubscribes
- **Stop sending to bounced/complained addresses** — reputation is shared across the domain
- **Monitor bounce rate and spam report rate** per sending domain/stream
- Warm up new domains or new sending streams gradually

## Example

```js
// bounce webhook → suppress address
if (event.event === "bounce" || event.event === "spamreport") {
  await suppressionList.add(event.email);
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for sendgrid.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
