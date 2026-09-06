# Agents

# ShopifyX - detect Shopify and Shopify Plus stores while you browse.

## Documentation

Reference docs live in `docs/`:

| Doc                    | Covers                                              |
| ---------------------- | --------------------------------------------------- |
| `docs/ARCHITECTURE.md` | Tech stack, build pipeline, MV2/MV3 strategy        |
| `docs/ROADMAP.md`      | Phased feature roadmap with progress tracking       |
| `docs/CONTRIBUTING.md` | Setup, dev commands, coding and testing conventions |
| `docs/PACKAGING.md`    | Packaging and store-submission checklist            |
| `docs/DOWNLOADS.md`    | Download links per browser                          |

## Key Conventions

- Detection is read-only: `shopifyIndicators` checks `window.Shopify`, the
  `meta[name="shopify-checkout-api-token"]` tag, `cdn.shopify.com` scripts,
  and `/cart.js`; `plusIndicators` adds the `checkout.shopify` hostname,
  `window.Shopify.checkout`, and `meta[name="shopify-digital-wallet"]`
- A store is Shopify if **any** shopify indicator is true; Plus if a shopify
  store also has **any** plus indicator
- Reply only on request: the content script answers the `CHECK_SHOPIFY` message
  with the `ShopifyDetectionResult` shape (`isShopify`, `isShopifyPlus`, plus
  the full indicator breakdown) — nothing is ever sent proactively
- Never load external resources, persist data, or modify the page; when
  Shopify's markup changes, update the two indicator objects and keep the
  `ShopifyDetectionResult` interface in sync
- Cross-browser: Chromium (MV3) + Firefox (MV2)
