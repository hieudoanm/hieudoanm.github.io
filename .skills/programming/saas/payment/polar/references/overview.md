# Overview

Focused reference for **polar**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Polar Best Practices

Polar is a payments platform aimed at **open-source monetization** — subscriptions, one-time purchases, donations, and benefits attached to repos/products, with the merchant-of-record handling tax. Best practice is letting Polar own checkout/tax, consuming **webhooks** for entitlement state, and treating **benefits** (license keys, repo access, Discord roles) as the product surface you grant.

---

## 1. Core Stack & Concepts

- **Products** (one-time purchases) and **subscriptions** (recurring) with **benefits**
- **Benefits** are the deliverables you control: license keys, private repo access, community roles
- **Storefront/Checkout** is Polar-hosted; embed via link or overlay
- **Merchant of record** — Polar handles tax and invoicing for your sales
- **Webhooks** for order/subscription events

---
