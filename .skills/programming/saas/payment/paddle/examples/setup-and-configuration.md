# Paddle Best Practices: 2. Checkout & Subscription Modeling

## Source guidance

This example applies the **2. Checkout & Subscription Modeling** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Create products/prices in the Catalog**; subscribe users via Checkout/overlay
- **Pass `passthrough` meta** (user/order id) for reconciliation
- **Map Paddle subscription lifecycle → your entitlements**: active/paused/past_due/canceled
- Use **custom prices / pay-what-you-want** only where product strategy demands it
- **Never trust client-side totals** — tax/invoice generation belongs to Paddle; amounts are server-side

## Example

A team applying **2. Checkout & Subscription Modeling** to a Paddle Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Create products/prices in the Catalog**; subscribe users via Checkout/overlay**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for paddle.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
