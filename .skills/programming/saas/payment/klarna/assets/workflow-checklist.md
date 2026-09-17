# Klarna Best Practices: Workflow Checklist

A practical run sheet for applying [Klarna Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Concepts: **Checkout v3**: POST /payments/v1/sessions → render iframe → authorization_token
- [ ] 1. Core Stack & Concepts: **Order Management**: POST /ordermanagement/v1/orders/{order_id}/authorize, then **capture**
- [ ] 2. Integration & Checkout: **Create the session server-side** with purchase_country, purchase_currency, locale, and line items
- [ ] 2. Integration & Checkout: Pass **order amounts/items from your cart logic**, never client-supplied totals
- [ ] 3. Authorization & Capture: After client approval, **authorize** then **capture** (full or partial)
- [ ] 3. Authorization & Capture: **Capture once** — double-capture is a chargeback/lost-money path
- [ ] 4. Webhooks & Notifications: Register **Webhooks** (payment/checkout) and verify integrity with the provided **pre-shared auth / signature**
- [ ] 4. Webhooks & Notifications: Events: payment.updated (authorized, captured, partially captured), checkout.order_completed, session expired
- [ ] 5. Security & Operations: **Credentials server-side** (username/password for API, not in browser)
- [ ] 5. Security & Operations: Separate **Playground and Production** credentials; never share across envs

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
