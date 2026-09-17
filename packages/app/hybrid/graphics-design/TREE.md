# TREE

```text
├── exhibit/
│   ├── docs/
│   │   ├── 00-overview/
│   │   │   └── [README.md](./exhibit/docs/00-overview/README.md)
│   │   ├── 01-requirements/
│   │   │   ├── [README.md](./exhibit/docs/01-requirements/README.md)
│   │   │   ├── [functional-requirements.md](./exhibit/docs/01-requirements/functional-requirements.md)
│   │   │   └── [non-functional-requirements.md](./exhibit/docs/01-requirements/non-functional-requirements.md)
│   │   ├── 02-features/
│   │   │   └── [README.md](./exhibit/docs/02-features/README.md)
│   │   ├── 03-user-stories/
│   │   │   └── [README.md](./exhibit/docs/03-user-stories/README.md)
│   │   ├── 04-architecture/
│   │   │   └── [README.md](./exhibit/docs/04-architecture/README.md)
│   │   ├── 05-data-model/
│   │   │   └── [README.md](./exhibit/docs/05-data-model/README.md)
│   │   ├── 06-api-specification/
│   │   │   └── [README.md](./exhibit/docs/06-api-specification/README.md)
│   │   ├── 07-ui-ux-design/
│   │   │   ├── brand/
│   │   │   │   ├── images/
│   │   │   │   │   ├── [logo-mark-dark.png](./exhibit/docs/07-ui-ux-design/brand/images/logo-mark-dark.png)
│   │   │   │   │   ├── [logo-mark-light.png](./exhibit/docs/07-ui-ux-design/brand/images/logo-mark-light.png)
│   │   │   │   │   ├── [logo-text-dark.png](./exhibit/docs/07-ui-ux-design/brand/images/logo-text-dark.png)
│   │   │   │   │   └── [logo-text-light.png](./exhibit/docs/07-ui-ux-design/brand/images/logo-text-light.png)
│   │   │   │   ├── svg/
│   │   │   │   │   ├── [logo-mark-dark.svg](./exhibit/docs/07-ui-ux-design/brand/svg/logo-mark-dark.svg)
│   │   │   │   │   ├── [logo-mark-light.svg](./exhibit/docs/07-ui-ux-design/brand/svg/logo-mark-light.svg)
│   │   │   │   │   ├── [logo-text-dark.svg](./exhibit/docs/07-ui-ux-design/brand/svg/logo-text-dark.svg)
│   │   │   │   │   └── [logo-text-light.svg](./exhibit/docs/07-ui-ux-design/brand/svg/logo-text-light.svg)
│   │   │   │   └── [brand.sh](./exhibit/docs/07-ui-ux-design/brand/brand.sh)
│   │   │   ├── system/
│   │   │   │   ├── [accessibility.md](./exhibit/docs/07-ui-ux-design/system/accessibility.md)
│   │   │   │   ├── [animation.md](./exhibit/docs/07-ui-ux-design/system/animation.md)
│   │   │   │   ├── [components.md](./exhibit/docs/07-ui-ux-design/system/components.md)
│   │   │   │   ├── [design-tokens.md](./exhibit/docs/07-ui-ux-design/system/design-tokens.md)
│   │   │   │   ├── [iconography.md](./exhibit/docs/07-ui-ux-design/system/iconography.md)
│   │   │   │   ├── [layout.md](./exhibit/docs/07-ui-ux-design/system/layout.md)
│   │   │   │   ├── [responsive.md](./exhibit/docs/07-ui-ux-design/system/responsive.md)
│   │   │   │   ├── [screens.md](./exhibit/docs/07-ui-ux-design/system/screens.md)
│   │   │   │   └── [states.md](./exhibit/docs/07-ui-ux-design/system/states.md)
│   │   │   └── [README.md](./exhibit/docs/07-ui-ux-design/README.md)
│   │   ├── 08-tech-stack/
│   │   │   └── [README.md](./exhibit/docs/08-tech-stack/README.md)
│   │   ├── 09-testing-strategy/
│   │   │   └── [README.md](./exhibit/docs/09-testing-strategy/README.md)
│   │   ├── 10-implementation-plan/
│   │   │   └── [README.md](./exhibit/docs/10-implementation-plan/README.md)
│   │   ├── 11-deployment/
│   │   │   └── [README.md](./exhibit/docs/11-deployment/README.md)
│   │   ├── 12-operations/
│   │   │   └── [README.md](./exhibit/docs/12-operations/README.md)
│   │   ├── [00-overview.md](./exhibit/docs/00-overview.md)
│   │   ├── [01-requirements.md](./exhibit/docs/01-requirements.md)
│   │   ├── [02-features.md](./exhibit/docs/02-features.md)
│   │   ├── [03-user-stories.md](./exhibit/docs/03-user-stories.md)
│   │   ├── [04-architecture.md](./exhibit/docs/04-architecture.md)
│   │   ├── [05-data-model.md](./exhibit/docs/05-data-model.md)
│   │   ├── [06-api-specification.md](./exhibit/docs/06-api-specification.md)
│   │   ├── [07-ui-ux-design.md](./exhibit/docs/07-ui-ux-design.md)
│   │   ├── [08-tech-stack.md](./exhibit/docs/08-tech-stack.md)
│   │   ├── [09-testing-strategy.md](./exhibit/docs/09-testing-strategy.md)
│   │   ├── [10-implementation-plan.md](./exhibit/docs/10-implementation-plan.md)
│   │   ├── [11-deployment.md](./exhibit/docs/11-deployment.md)
│   │   ├── [12-operations.md](./exhibit/docs/12-operations.md)
│   │   └── [README.md](./exhibit/docs/README.md)
│   ├── e2e/
│   │   ├── tax/
│   │   │   ├── [helpers.ts](./exhibit/e2e/tax/helpers.ts)
│   │   │   ├── [index.spec.ts](./exhibit/e2e/tax/index.spec.ts)
│   │   │   └── [navigation.spec.ts](./exhibit/e2e/tax/navigation.spec.ts)
│   │   ├── wallet/
│   │   │   ├── [cards.spec.ts](./exhibit/e2e/wallet/cards.spec.ts)
│   │   │   ├── [exchange.spec.ts](./exhibit/e2e/wallet/exchange.spec.ts)
│   │   │   ├── [helpers.ts](./exhibit/e2e/wallet/helpers.ts)
│   │   │   ├── [index.spec.ts](./exhibit/e2e/wallet/index.spec.ts)
│   │   │   ├── [navigation.spec.ts](./exhibit/e2e/wallet/navigation.spec.ts)
│   │   │   ├── [open-access.spec.ts](./exhibit/e2e/wallet/open-access.spec.ts)
│   │   │   ├── [pay.spec.ts](./exhibit/e2e/wallet/pay.spec.ts)
│   │   │   ├── [profile.spec.ts](./exhibit/e2e/wallet/profile.spec.ts)
│   │   │   ├── [transactions.spec.ts](./exhibit/e2e/wallet/transactions.spec.ts)
│   │   │   └── [transfer.spec.ts](./exhibit/e2e/wallet/transfer.spec.ts)
│   │   ├── [about.spec.ts](./exhibit/e2e/about.spec.ts)
│   │   ├── [downloads.spec.ts](./exhibit/e2e/downloads.spec.ts)
│   │   ├── [home.spec.ts](./exhibit/e2e/home.spec.ts)
│   │   └── [version.spec.ts](./exhibit/e2e/version.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./exhibit/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./exhibit/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./exhibit/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./exhibit/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./exhibit/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./exhibit/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./exhibit/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./exhibit/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./exhibit/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./exhibit/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512x512.png](./exhibit/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./exhibit/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./exhibit/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./exhibit/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./exhibit/public/icons/icon.svg)
│   │   ├── og/
│   │   │   ├── [og.png](./exhibit/public/og/og.png)
│   │   │   └── [og.svg](./exhibit/public/og/og.svg)
│   │   ├── [apple-touch-icon.png](./exhibit/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./exhibit/public/favicon.ico)
│   │   ├── [manifest.json](./exhibit/public/manifest.json)
│   │   ├── [robots.txt](./exhibit/public/robots.txt)
│   │   ├── [sitemap.xml](./exhibit/public/sitemap.xml)
│   │   └── [sw.js](./exhibit/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (app)/
│   │   │   │   ├── ai/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./exhibit/src/app/(app)/ai/__tests__/page.test.tsx)
│   │   │   │   │   ├── chat/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./exhibit/src/app/(app)/ai/chat/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./exhibit/src/app/(app)/ai/chat/page.tsx)
│   │   │   │   │   ├── settings/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./exhibit/src/app/(app)/ai/settings/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./exhibit/src/app/(app)/ai/settings/page.tsx)
│   │   │   │   │   └── [page.tsx](./exhibit/src/app/(app)/ai/page.tsx)
│   │   │   │   ├── chat/
│   │   │   │   │   ├── settings/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./exhibit/src/app/(app)/chat/settings/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./exhibit/src/app/(app)/chat/settings/page.tsx)
│   │   │   │   │   └── [page.tsx](./exhibit/src/app/(app)/chat/page.tsx)
│   │   │   │   ├── gallery/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./exhibit/src/app/(app)/gallery/__tests__/page.test.tsx)
│   │   │   │   │   ├── album/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./exhibit/src/app/(app)/gallery/album/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./exhibit/src/app/(app)/gallery/album/page.tsx)
│   │   │   │   │   ├── albums/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./exhibit/src/app/(app)/gallery/albums/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./exhibit/src/app/(app)/gallery/albums/page.tsx)
│   │   │   │   │   ├── photo/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./exhibit/src/app/(app)/gallery/photo/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./exhibit/src/app/(app)/gallery/photo/page.tsx)
│   │   │   │   │   ├── search/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./exhibit/src/app/(app)/gallery/search/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./exhibit/src/app/(app)/gallery/search/page.tsx)
│   │   │   │   │   └── [page.tsx](./exhibit/src/app/(app)/gallery/page.tsx)
│   │   │   │   ├── menu/
│   │   │   │   │   └── [page.tsx](./exhibit/src/app/(app)/menu/page.tsx)
│   │   │   │   ├── password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./exhibit/src/app/(app)/password/__tests__/page.test.tsx)
│   │   │   │   │   ├── generator/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./exhibit/src/app/(app)/password/generator/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./exhibit/src/app/(app)/password/generator/page.tsx)
│   │   │   │   │   ├── health/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [health-page.test.tsx](./exhibit/src/app/(app)/password/health/__tests__/health-page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./exhibit/src/app/(app)/password/health/page.tsx)
│   │   │   │   │   ├── item/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [item-page.test.tsx](./exhibit/src/app/(app)/password/item/__tests__/item-page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./exhibit/src/app/(app)/password/item/page.tsx)
│   │   │   │   │   ├── settings/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [settings-page.test.tsx](./exhibit/src/app/(app)/password/settings/__tests__/settings-page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./exhibit/src/app/(app)/password/settings/page.tsx)
│   │   │   │   │   ├── trash/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [trash-page.test.tsx](./exhibit/src/app/(app)/password/trash/__tests__/trash-page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./exhibit/src/app/(app)/password/trash/page.tsx)
│   │   │   │   │   └── [page.tsx](./exhibit/src/app/(app)/password/page.tsx)
│   │   │   │   ├── pos/
│   │   │   │   │   └── [page.tsx](./exhibit/src/app/(app)/pos/page.tsx)
│   │   │   │   ├── tax/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./exhibit/src/app/(app)/tax/__tests__/page.test.tsx)
│   │   │   │   │   ├── audit/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [detail-page.test.tsx](./exhibit/src/app/(app)/tax/audit/__tests__/detail-page.test.tsx)
│   │   │   │   │   │   │   └── [page.test.tsx](./exhibit/src/app/(app)/tax/audit/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./exhibit/src/app/(app)/tax/audit/page.tsx)
│   │   │   │   │   ├── settings/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./exhibit/src/app/(app)/tax/settings/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./exhibit/src/app/(app)/tax/settings/page.tsx)
│   │   │   │   │   ├── submission/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [detail-page.test.tsx](./exhibit/src/app/(app)/tax/submission/__tests__/detail-page.test.tsx)
│   │   │   │   │   │   │   └── [page.test.tsx](./exhibit/src/app/(app)/tax/submission/__tests__/page.test.tsx)
│   │   │   │   │   │   ├── new/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [page.test.tsx](./exhibit/src/app/(app)/tax/submission/new/__tests__/page.test.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./exhibit/src/app/(app)/tax/submission/new/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./exhibit/src/app/(app)/tax/submission/page.tsx)
│   │   │   │   │   ├── [layout.tsx](./exhibit/src/app/(app)/tax/layout.tsx)
│   │   │   │   │   └── [page.tsx](./exhibit/src/app/(app)/tax/page.tsx)
│   │   │   │   ├── video/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./exhibit/src/app/(app)/video/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./exhibit/src/app/(app)/video/page.tsx)
│   │   │   │   └── wallet/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/__tests__/page.test.tsx)
│   │   │   │       ├── accounts/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/accounts/__tests__/page.test.tsx)
│   │   │   │       │   ├── checking/
│   │   │   │       │   │   ├── __tests__/
│   │   │   │       │   │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/accounts/checking/__tests__/page.test.tsx)
│   │   │   │       │   │   └── [page.tsx](./exhibit/src/app/(app)/wallet/accounts/checking/page.tsx)
│   │   │   │       │   ├── credit/
│   │   │   │       │   │   ├── __tests__/
│   │   │   │       │   │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/accounts/credit/__tests__/page.test.tsx)
│   │   │   │       │   │   └── [page.tsx](./exhibit/src/app/(app)/wallet/accounts/credit/page.tsx)
│   │   │   │       │   ├── savings/
│   │   │   │       │   │   ├── __tests__/
│   │   │   │       │   │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/accounts/savings/__tests__/page.test.tsx)
│   │   │   │       │   │   └── [page.tsx](./exhibit/src/app/(app)/wallet/accounts/savings/page.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/accounts/page.tsx)
│   │   │   │       ├── bills/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/bills/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/bills/page.tsx)
│   │   │   │       ├── budget/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/budget/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/budget/page.tsx)
│   │   │   │       ├── card-rewards/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/card-rewards/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/card-rewards/page.tsx)
│   │   │   │       ├── cards/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/cards/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/cards/page.tsx)
│   │   │   │       ├── contacts/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/contacts/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/contacts/page.tsx)
│   │   │   │       ├── currency-alerts/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/currency-alerts/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/currency-alerts/page.tsx)
│   │   │   │       ├── exchange/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/exchange/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/exchange/page.tsx)
│   │   │   │       ├── fixed-deposits/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/fixed-deposits/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/fixed-deposits/page.tsx)
│   │   │   │       ├── help-support/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/help-support/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/help-support/page.tsx)
│   │   │   │       ├── insurance/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/insurance/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/insurance/page.tsx)
│   │   │   │       ├── loans/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/loans/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/loans/page.tsx)
│   │   │   │       ├── notifications/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/notifications/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/notifications/page.tsx)
│   │   │   │       ├── pay/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/pay/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/pay/page.tsx)
│   │   │   │       ├── payment-requests/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/payment-requests/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/payment-requests/page.tsx)
│   │   │   │       ├── privacy-policy/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/privacy-policy/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/privacy-policy/page.tsx)
│   │   │   │       ├── profile/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/profile/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/profile/page.tsx)
│   │   │   │       ├── rates/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/rates/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/rates/page.tsx)
│   │   │   │       ├── recurring-deposits/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/recurring-deposits/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/recurring-deposits/page.tsx)
│   │   │   │       ├── recurring-transfers/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/recurring-transfers/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/recurring-transfers/page.tsx)
│   │   │   │       ├── reports/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/reports/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/reports/page.tsx)
│   │   │   │       ├── savings-goals/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/savings-goals/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/savings-goals/page.tsx)
│   │   │   │       ├── settings/
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/settings/page.tsx)
│   │   │   │       ├── split-bill/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/split-bill/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/split-bill/page.tsx)
│   │   │   │       ├── terms-of-service/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/terms-of-service/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/terms-of-service/page.tsx)
│   │   │   │       ├── transactions/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/transactions/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/transactions/page.tsx)
│   │   │   │       ├── transfer/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/transfer/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/transfer/page.tsx)
│   │   │   │       ├── [layout.tsx](./exhibit/src/app/(app)/wallet/layout.tsx)
│   │   │   │       ├── [loading.tsx](./exhibit/src/app/(app)/wallet/loading.tsx)
│   │   │   │       ├── [page.tsx](./exhibit/src/app/(app)/wallet/page.tsx)
│   │   │   │       └── [template.tsx](./exhibit/src/app/(app)/wallet/template.tsx)
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./exhibit/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./exhibit/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./exhibit/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./exhibit/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./exhibit/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./exhibit/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./exhibit/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./exhibit/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./exhibit/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./exhibit/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   └── [page.tsx](./exhibit/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./exhibit/src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./exhibit/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       └── [page.tsx](./exhibit/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [about.test.tsx](./exhibit/src/app/__tests__/about.test.tsx)
│   │   │   │   ├── [default.test.tsx](./exhibit/src/app/__tests__/default.test.tsx)
│   │   │   │   ├── [error.test.tsx](./exhibit/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./exhibit/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./exhibit/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./exhibit/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./exhibit/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./exhibit/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [robots.test.ts](./exhibit/src/app/__tests__/robots.test.ts)
│   │   │   │   ├── [template.test.tsx](./exhibit/src/app/__tests__/template.test.tsx)
│   │   │   │   ├── [unauthorized.test.tsx](./exhibit/src/app/__tests__/unauthorized.test.tsx)
│   │   │   │   └── [version.test.tsx](./exhibit/src/app/__tests__/version.test.tsx)
│   │   │   ├── [default.tsx](./exhibit/src/app/default.tsx)
│   │   │   ├── [error.tsx](./exhibit/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./exhibit/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./exhibit/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./exhibit/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./exhibit/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./exhibit/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./exhibit/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./exhibit/src/app/page.tsx)
│   │   │   ├── [robots.ts](./exhibit/src/app/robots.ts)
│   │   │   ├── [template.tsx](./exhibit/src/app/template.tsx)
│   │   │   └── [unauthorized.tsx](./exhibit/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── ai/
│   │   │   │   ├── atoms/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [MessageBubble.test.tsx](./exhibit/src/components/ai/atoms/__tests__/MessageBubble.test.tsx)
│   │   │   │   │   │   └── [ModelBadge.test.tsx](./exhibit/src/components/ai/atoms/__tests__/ModelBadge.test.tsx)
│   │   │   │   │   ├── [MessageBubble.tsx](./exhibit/src/components/ai/atoms/MessageBubble.tsx)
│   │   │   │   │   ├── [ModelBadge.tsx](./exhibit/src/components/ai/atoms/ModelBadge.tsx)
│   │   │   │   │   └── [index.ts](./exhibit/src/components/ai/atoms/index.ts)
│   │   │   │   ├── molecules/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [ChatInput.test.tsx](./exhibit/src/components/ai/molecules/__tests__/ChatInput.test.tsx)
│   │   │   │   │   │   └── [ConversationCard.test.tsx](./exhibit/src/components/ai/molecules/__tests__/ConversationCard.test.tsx)
│   │   │   │   │   ├── [ChatInput.tsx](./exhibit/src/components/ai/molecules/ChatInput.tsx)
│   │   │   │   │   ├── [ConversationCard.tsx](./exhibit/src/components/ai/molecules/ConversationCard.tsx)
│   │   │   │   │   └── [index.ts](./exhibit/src/components/ai/molecules/index.ts)
│   │   │   │   ├── organisms/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [ChatHeader.test.tsx](./exhibit/src/components/ai/organisms/__tests__/ChatHeader.test.tsx)
│   │   │   │   │   │   ├── [OfflineBanner.test.tsx](./exhibit/src/components/ai/organisms/__tests__/OfflineBanner.test.tsx)
│   │   │   │   │   │   ├── [Sidebar.test.tsx](./exhibit/src/components/ai/organisms/__tests__/Sidebar.test.tsx)
│   │   │   │   │   │   └── [ToastContainer.test.tsx](./exhibit/src/components/ai/organisms/__tests__/ToastContainer.test.tsx)
│   │   │   │   │   ├── [ChatHeader.tsx](./exhibit/src/components/ai/organisms/ChatHeader.tsx)
│   │   │   │   │   ├── [OfflineBanner.tsx](./exhibit/src/components/ai/organisms/OfflineBanner.tsx)
│   │   │   │   │   ├── [Sidebar.tsx](./exhibit/src/components/ai/organisms/Sidebar.tsx)
│   │   │   │   │   ├── [ToastContainer.tsx](./exhibit/src/components/ai/organisms/ToastContainer.tsx)
│   │   │   │   │   └── [index.ts](./exhibit/src/components/ai/organisms/index.ts)
│   │   │   │   ├── templates/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [PageTransition.test.tsx](./exhibit/src/components/ai/templates/__tests__/PageTransition.test.tsx)
│   │   │   │   │   ├── [PageTransition.tsx](./exhibit/src/components/ai/templates/PageTransition.tsx)
│   │   │   │   │   └── [index.ts](./exhibit/src/components/ai/templates/index.ts)
│   │   │   │   └── [index.ts](./exhibit/src/components/ai/index.ts)
│   │   │   ├── chat/
│   │   │   │   ├── atoms/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [Avatar.test.tsx](./exhibit/src/components/chat/atoms/__tests__/Avatar.test.tsx)
│   │   │   │   │   │   ├── [Badge.test.tsx](./exhibit/src/components/chat/atoms/__tests__/Badge.test.tsx)
│   │   │   │   │   │   ├── [EmptyState.test.tsx](./exhibit/src/components/chat/atoms/__tests__/EmptyState.test.tsx)
│   │   │   │   │   │   ├── [IconButton.test.tsx](./exhibit/src/components/chat/atoms/__tests__/IconButton.test.tsx)
│   │   │   │   │   │   ├── [StatusDot.test.tsx](./exhibit/src/components/chat/atoms/__tests__/StatusDot.test.tsx)
│   │   │   │   │   │   └── [TypingIndicator.test.tsx](./exhibit/src/components/chat/atoms/__tests__/TypingIndicator.test.tsx)
│   │   │   │   │   ├── [Avatar.tsx](./exhibit/src/components/chat/atoms/Avatar.tsx)
│   │   │   │   │   ├── [Badge.tsx](./exhibit/src/components/chat/atoms/Badge.tsx)
│   │   │   │   │   ├── [EmptyState.tsx](./exhibit/src/components/chat/atoms/EmptyState.tsx)
│   │   │   │   │   ├── [IconButton.tsx](./exhibit/src/components/chat/atoms/IconButton.tsx)
│   │   │   │   │   ├── [StatusDot.tsx](./exhibit/src/components/chat/atoms/StatusDot.tsx)
│   │   │   │   │   ├── [TypingIndicator.tsx](./exhibit/src/components/chat/atoms/TypingIndicator.tsx)
│   │   │   │   │   └── [index.ts](./exhibit/src/components/chat/atoms/index.ts)
│   │   │   │   ├── molecules/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [CallControls.test.tsx](./exhibit/src/components/chat/molecules/__tests__/CallControls.test.tsx)
│   │   │   │   │   │   ├── [ChatHeader.test.tsx](./exhibit/src/components/chat/molecules/__tests__/ChatHeader.test.tsx)
│   │   │   │   │   │   ├── [ChatListItem.test.tsx](./exhibit/src/components/chat/molecules/__tests__/ChatListItem.test.tsx)
│   │   │   │   │   │   ├── [ChatSearchBar.test.tsx](./exhibit/src/components/chat/molecules/__tests__/ChatSearchBar.test.tsx)
│   │   │   │   │   │   ├── [Composer.test.tsx](./exhibit/src/components/chat/molecules/__tests__/Composer.test.tsx)
│   │   │   │   │   │   ├── [ContactRow.test.tsx](./exhibit/src/components/chat/molecules/__tests__/ContactRow.test.tsx)
│   │   │   │   │   │   ├── [DateDivider.test.tsx](./exhibit/src/components/chat/molecules/__tests__/DateDivider.test.tsx)
│   │   │   │   │   │   ├── [EmojiAutocomplete.test.tsx](./exhibit/src/components/chat/molecules/__tests__/EmojiAutocomplete.test.tsx)
│   │   │   │   │   │   ├── [LinkPreviewCard.test.tsx](./exhibit/src/components/chat/molecules/__tests__/LinkPreviewCard.test.tsx)
│   │   │   │   │   │   ├── [MediaComposer.test.tsx](./exhibit/src/components/chat/molecules/__tests__/MediaComposer.test.tsx)
│   │   │   │   │   │   ├── [MessageBubble.test.tsx](./exhibit/src/components/chat/molecules/__tests__/MessageBubble.test.tsx)
│   │   │   │   │   │   ├── [MessageContextMenu.test.tsx](./exhibit/src/components/chat/molecules/__tests__/MessageContextMenu.test.tsx)
│   │   │   │   │   │   ├── [ReactionBar.test.tsx](./exhibit/src/components/chat/molecules/__tests__/ReactionBar.test.tsx)
│   │   │   │   │   │   ├── [ReplyComposer.test.tsx](./exhibit/src/components/chat/molecules/__tests__/ReplyComposer.test.tsx)
│   │   │   │   │   │   ├── [SearchBar.test.tsx](./exhibit/src/components/chat/molecules/__tests__/SearchBar.test.tsx)
│   │   │   │   │   │   ├── [SecretChatBanner.test.tsx](./exhibit/src/components/chat/molecules/__tests__/SecretChatBanner.test.tsx)
│   │   │   │   │   │   ├── [StickerPicker.test.tsx](./exhibit/src/components/chat/molecules/__tests__/StickerPicker.test.tsx)
│   │   │   │   │   │   ├── [ToastViewport.test.tsx](./exhibit/src/components/chat/molecules/__tests__/ToastViewport.test.tsx)
│   │   │   │   │   │   ├── [VerificationCodeModal.test.tsx](./exhibit/src/components/chat/molecules/__tests__/VerificationCodeModal.test.tsx)
│   │   │   │   │   │   └── [VoiceRecorder.test.tsx](./exhibit/src/components/chat/molecules/__tests__/VoiceRecorder.test.tsx)
│   │   │   │   │   ├── [CallControls.tsx](./exhibit/src/components/chat/molecules/CallControls.tsx)
│   │   │   │   │   ├── [ChatHeader.tsx](./exhibit/src/components/chat/molecules/ChatHeader.tsx)
│   │   │   │   │   ├── [ChatListItem.tsx](./exhibit/src/components/chat/molecules/ChatListItem.tsx)
│   │   │   │   │   ├── [ChatSearchBar.tsx](./exhibit/src/components/chat/molecules/ChatSearchBar.tsx)
│   │   │   │   │   ├── [Composer.tsx](./exhibit/src/components/chat/molecules/Composer.tsx)
│   │   │   │   │   ├── [ContactRow.tsx](./exhibit/src/components/chat/molecules/ContactRow.tsx)
│   │   │   │   │   ├── [DateDivider.tsx](./exhibit/src/components/chat/molecules/DateDivider.tsx)
│   │   │   │   │   ├── [EmojiAutocomplete.tsx](./exhibit/src/components/chat/molecules/EmojiAutocomplete.tsx)
│   │   │   │   │   ├── [LinkPreviewCard.tsx](./exhibit/src/components/chat/molecules/LinkPreviewCard.tsx)
│   │   │   │   │   ├── [MediaComposer.tsx](./exhibit/src/components/chat/molecules/MediaComposer.tsx)
│   │   │   │   │   ├── [MessageBubble.tsx](./exhibit/src/components/chat/molecules/MessageBubble.tsx)
│   │   │   │   │   ├── [MessageContextMenu.tsx](./exhibit/src/components/chat/molecules/MessageContextMenu.tsx)
│   │   │   │   │   ├── [ReactionBar.tsx](./exhibit/src/components/chat/molecules/ReactionBar.tsx)
│   │   │   │   │   ├── [ReplyComposer.tsx](./exhibit/src/components/chat/molecules/ReplyComposer.tsx)
│   │   │   │   │   ├── [SearchBar.tsx](./exhibit/src/components/chat/molecules/SearchBar.tsx)
│   │   │   │   │   ├── [SecretChatBanner.tsx](./exhibit/src/components/chat/molecules/SecretChatBanner.tsx)
│   │   │   │   │   ├── [StickerPicker.tsx](./exhibit/src/components/chat/molecules/StickerPicker.tsx)
│   │   │   │   │   ├── [ToastViewport.tsx](./exhibit/src/components/chat/molecules/ToastViewport.tsx)
│   │   │   │   │   ├── [VerificationCodeModal.tsx](./exhibit/src/components/chat/molecules/VerificationCodeModal.tsx)
│   │   │   │   │   ├── [VoiceRecorder.tsx](./exhibit/src/components/chat/molecules/VoiceRecorder.tsx)
│   │   │   │   │   └── [index.ts](./exhibit/src/components/chat/molecules/index.ts)
│   │   │   │   ├── organisms/
│   │   │   │   │   ├── ChatPane/
│   │   │   │   │   │   ├── [MessageList.tsx](./exhibit/src/components/chat/organisms/ChatPane/MessageList.tsx)
│   │   │   │   │   │   └── [useChatPaneHandlers.ts](./exhibit/src/components/chat/organisms/ChatPane/useChatPaneHandlers.ts)
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [BlockedContactsPanel.test.tsx](./exhibit/src/components/chat/organisms/__tests__/BlockedContactsPanel.test.tsx)
│   │   │   │   │   │   ├── [CallHistoryPanel.test.tsx](./exhibit/src/components/chat/organisms/__tests__/CallHistoryPanel.test.tsx)
│   │   │   │   │   │   ├── [CallScreen.test.tsx](./exhibit/src/components/chat/organisms/__tests__/CallScreen.test.tsx)
│   │   │   │   │   │   ├── [ChatPane.test.tsx](./exhibit/src/components/chat/organisms/__tests__/ChatPane.test.tsx)
│   │   │   │   │   │   ├── [ChatSettingsPanel.test.tsx](./exhibit/src/components/chat/organisms/__tests__/ChatSettingsPanel.test.tsx)
│   │   │   │   │   │   ├── [ChatSidebar.test.tsx](./exhibit/src/components/chat/organisms/__tests__/ChatSidebar.test.tsx)
│   │   │   │   │   │   ├── [DeviceSyncPanel.test.tsx](./exhibit/src/components/chat/organisms/__tests__/DeviceSyncPanel.test.tsx)
│   │   │   │   │   │   ├── [DeviceTrustPanel.test.tsx](./exhibit/src/components/chat/organisms/__tests__/DeviceTrustPanel.test.tsx)
│   │   │   │   │   │   ├── [ForwardModal.test.tsx](./exhibit/src/components/chat/organisms/__tests__/ForwardModal.test.tsx)
│   │   │   │   │   │   ├── [GroupAdminPanel.test.tsx](./exhibit/src/components/chat/organisms/__tests__/GroupAdminPanel.test.tsx)
│   │   │   │   │   │   ├── [GroupCallView.test.tsx](./exhibit/src/components/chat/organisms/__tests__/GroupCallView.test.tsx)
│   │   │   │   │   │   ├── [ImageLightbox.test.tsx](./exhibit/src/components/chat/organisms/__tests__/ImageLightbox.test.tsx)
│   │   │   │   │   │   ├── [IncomingCallModal.test.tsx](./exhibit/src/components/chat/organisms/__tests__/IncomingCallModal.test.tsx)
│   │   │   │   │   │   ├── [MediaGallery.test.tsx](./exhibit/src/components/chat/organisms/__tests__/MediaGallery.test.tsx)
│   │   │   │   │   │   ├── [NewChatModal.test.tsx](./exhibit/src/components/chat/organisms/__tests__/NewChatModal.test.tsx)
│   │   │   │   │   │   ├── [PairingModal.test.tsx](./exhibit/src/components/chat/organisms/__tests__/PairingModal.test.tsx)
│   │   │   │   │   │   ├── [PinLockScreen.test.tsx](./exhibit/src/components/chat/organisms/__tests__/PinLockScreen.test.tsx)
│   │   │   │   │   │   └── [PrivacySettingsPanel.test.tsx](./exhibit/src/components/chat/organisms/__tests__/PrivacySettingsPanel.test.tsx)
│   │   │   │   │   ├── [BlockedContactsPanel.tsx](./exhibit/src/components/chat/organisms/BlockedContactsPanel.tsx)
│   │   │   │   │   ├── [CallHistoryPanel.tsx](./exhibit/src/components/chat/organisms/CallHistoryPanel.tsx)
│   │   │   │   │   ├── [CallScreen.tsx](./exhibit/src/components/chat/organisms/CallScreen.tsx)
│   │   │   │   │   ├── [ChatPane.tsx](./exhibit/src/components/chat/organisms/ChatPane.tsx)
│   │   │   │   │   ├── [ChatSettingsPanel.tsx](./exhibit/src/components/chat/organisms/ChatSettingsPanel.tsx)
│   │   │   │   │   ├── [ChatSidebar.tsx](./exhibit/src/components/chat/organisms/ChatSidebar.tsx)
│   │   │   │   │   ├── [DeviceSyncPanel.tsx](./exhibit/src/components/chat/organisms/DeviceSyncPanel.tsx)
│   │   │   │   │   ├── [DeviceTrustPanel.tsx](./exhibit/src/components/chat/organisms/DeviceTrustPanel.tsx)
│   │   │   │   │   ├── [ForwardModal.tsx](./exhibit/src/components/chat/organisms/ForwardModal.tsx)
│   │   │   │   │   ├── [GroupAdminPanel.tsx](./exhibit/src/components/chat/organisms/GroupAdminPanel.tsx)
│   │   │   │   │   ├── [GroupCallView.tsx](./exhibit/src/components/chat/organisms/GroupCallView.tsx)
│   │   │   │   │   ├── [Header.tsx](./exhibit/src/components/chat/organisms/Header.tsx)
│   │   │   │   │   ├── [ImageLightbox.tsx](./exhibit/src/components/chat/organisms/ImageLightbox.tsx)
│   │   │   │   │   ├── [IncomingCallModal.tsx](./exhibit/src/components/chat/organisms/IncomingCallModal.tsx)
│   │   │   │   │   ├── [MediaGallery.tsx](./exhibit/src/components/chat/organisms/MediaGallery.tsx)
│   │   │   │   │   ├── [NewChatModal.tsx](./exhibit/src/components/chat/organisms/NewChatModal.tsx)
│   │   │   │   │   ├── [PairingModal.tsx](./exhibit/src/components/chat/organisms/PairingModal.tsx)
│   │   │   │   │   ├── [PinLockScreen.tsx](./exhibit/src/components/chat/organisms/PinLockScreen.tsx)
│   │   │   │   │   └── [PrivacySettingsPanel.tsx](./exhibit/src/components/chat/organisms/PrivacySettingsPanel.tsx)
│   │   │   │   ├── templates/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [AboutTemplate.test.tsx](./exhibit/src/components/chat/templates/__tests__/AboutTemplate.test.tsx)
│   │   │   │   │   │   ├── [AppShell.test.tsx](./exhibit/src/components/chat/templates/__tests__/AppShell.test.tsx)
│   │   │   │   │   │   ├── [DownloadsTemplate.test.tsx](./exhibit/src/components/chat/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │   │   │   │   ├── [ErrorTemplate.test.tsx](./exhibit/src/components/chat/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │   │   │   │   └── [VersionTemplate.test.tsx](./exhibit/src/components/chat/templates/__tests__/VersionTemplate.test.tsx)
│   │   │   │   │   ├── [AboutTemplate.tsx](./exhibit/src/components/chat/templates/AboutTemplate.tsx)
│   │   │   │   │   ├── [AppShell.tsx](./exhibit/src/components/chat/templates/AppShell.tsx)
│   │   │   │   │   ├── [DownloadsTemplate.tsx](./exhibit/src/components/chat/templates/DownloadsTemplate.tsx)
│   │   │   │   │   ├── [ErrorTemplate.tsx](./exhibit/src/components/chat/templates/ErrorTemplate.tsx)
│   │   │   │   │   ├── [VersionTemplate.tsx](./exhibit/src/components/chat/templates/VersionTemplate.tsx)
│   │   │   │   │   └── [index.ts](./exhibit/src/components/chat/templates/index.ts)
│   │   │   │   └── [index.ts](./exhibit/src/components/chat/index.ts)
│   │   │   ├── gallery/
│   │   │   │   ├── atoms/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [PhotoThumb.test.tsx](./exhibit/src/components/gallery/atoms/__tests__/PhotoThumb.test.tsx)
│   │   │   │   │   ├── [PhotoThumb.tsx](./exhibit/src/components/gallery/atoms/PhotoThumb.tsx)
│   │   │   │   │   └── [index.ts](./exhibit/src/components/gallery/atoms/index.ts)
│   │   │   │   ├── molecules/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [AlbumTile.test.tsx](./exhibit/src/components/gallery/molecules/__tests__/AlbumTile.test.tsx)
│   │   │   │   │   │   ├── [CameraCapture.test.tsx](./exhibit/src/components/gallery/molecules/__tests__/CameraCapture.test.tsx)
│   │   │   │   │   │   ├── [ConfirmDialog.test.tsx](./exhibit/src/components/gallery/molecules/__tests__/ConfirmDialog.test.tsx)
│   │   │   │   │   │   ├── [EmptyState.test.tsx](./exhibit/src/components/gallery/molecules/__tests__/EmptyState.test.tsx)
│   │   │   │   │   │   ├── [NameDialog.test.tsx](./exhibit/src/components/gallery/molecules/__tests__/NameDialog.test.tsx)
│   │   │   │   │   │   ├── [PhotoTile.test.tsx](./exhibit/src/components/gallery/molecules/__tests__/PhotoTile.test.tsx)
│   │   │   │   │   │   └── [SearchBar.test.tsx](./exhibit/src/components/gallery/molecules/__tests__/SearchBar.test.tsx)
│   │   │   │   │   ├── [AlbumTile.tsx](./exhibit/src/components/gallery/molecules/AlbumTile.tsx)
│   │   │   │   │   ├── [CameraCapture.tsx](./exhibit/src/components/gallery/molecules/CameraCapture.tsx)
│   │   │   │   │   ├── [ConfirmDialog.tsx](./exhibit/src/components/gallery/molecules/ConfirmDialog.tsx)
│   │   │   │   │   ├── [EmptyState.tsx](./exhibit/src/components/gallery/molecules/EmptyState.tsx)
│   │   │   │   │   ├── [NameDialog.tsx](./exhibit/src/components/gallery/molecules/NameDialog.tsx)
│   │   │   │   │   ├── [PhotoTile.tsx](./exhibit/src/components/gallery/molecules/PhotoTile.tsx)
│   │   │   │   │   ├── [SearchBar.tsx](./exhibit/src/components/gallery/molecules/SearchBar.tsx)
│   │   │   │   │   └── [index.ts](./exhibit/src/components/gallery/molecules/index.ts)
│   │   │   │   ├── organisms/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [PhoneFrame.test.tsx](./exhibit/src/components/gallery/organisms/__tests__/PhoneFrame.test.tsx)
│   │   │   │   │   │   ├── [PhotoViewer.test.tsx](./exhibit/src/components/gallery/organisms/__tests__/PhotoViewer.test.tsx)
│   │   │   │   │   │   ├── [TabBar.test.tsx](./exhibit/src/components/gallery/organisms/__tests__/TabBar.test.tsx)
│   │   │   │   │   │   └── [ToastContainer.test.tsx](./exhibit/src/components/gallery/organisms/__tests__/ToastContainer.test.tsx)
│   │   │   │   │   ├── [PhoneFrame.tsx](./exhibit/src/components/gallery/organisms/PhoneFrame.tsx)
│   │   │   │   │   ├── [PhotoViewer.tsx](./exhibit/src/components/gallery/organisms/PhotoViewer.tsx)
│   │   │   │   │   ├── [TabBar.tsx](./exhibit/src/components/gallery/organisms/TabBar.tsx)
│   │   │   │   │   ├── [ToastContainer.tsx](./exhibit/src/components/gallery/organisms/ToastContainer.tsx)
│   │   │   │   │   └── [index.ts](./exhibit/src/components/gallery/organisms/index.ts)
│   │   │   │   └── [index.ts](./exhibit/src/components/gallery/index.ts)
│   │   │   ├── menu/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [CustomerMenu.test.tsx](./exhibit/src/components/menu/__tests__/CustomerMenu.test.tsx)
│   │   │   │   ├── [CustomerMenu.tsx](./exhibit/src/components/menu/CustomerMenu.tsx)
│   │   │   │   ├── [Header.tsx](./exhibit/src/components/menu/Header.tsx)
│   │   │   │   ├── [MenuManager.tsx](./exhibit/src/components/menu/MenuManager.tsx)
│   │   │   │   ├── [QrShare.tsx](./exhibit/src/components/menu/QrShare.tsx)
│   │   │   │   ├── [RestaurantDashboard.tsx](./exhibit/src/components/menu/RestaurantDashboard.tsx)
│   │   │   │   ├── [RestaurantManager.tsx](./exhibit/src/components/menu/RestaurantManager.tsx)
│   │   │   │   ├── [index.ts](./exhibit/src/components/menu/index.ts)
│   │   │   │   └── [types.ts](./exhibit/src/components/menu/types.ts)
│   │   │   ├── password/
│   │   │   │   ├── molecules/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [AccessLogCard.test.tsx](./exhibit/src/components/password/molecules/__tests__/AccessLogCard.test.tsx)
│   │   │   │   │   │   └── [ShareItemModal.test.tsx](./exhibit/src/components/password/molecules/__tests__/ShareItemModal.test.tsx)
│   │   │   │   │   ├── [AccessLogCard.tsx](./exhibit/src/components/password/molecules/AccessLogCard.tsx)
│   │   │   │   │   ├── [ConfirmDialog.tsx](./exhibit/src/components/password/molecules/ConfirmDialog.tsx)
│   │   │   │   │   ├── [HealthWidgets.tsx](./exhibit/src/components/password/molecules/HealthWidgets.tsx)
│   │   │   │   │   ├── [ShareItemModal.tsx](./exhibit/src/components/password/molecules/ShareItemModal.tsx)
│   │   │   │   │   ├── [VaultItemForm.tsx](./exhibit/src/components/password/molecules/VaultItemForm.tsx)
│   │   │   │   │   └── [index.ts](./exhibit/src/components/password/molecules/index.ts)
│   │   │   │   ├── organisms/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [EmergencyAccessCard.test.tsx](./exhibit/src/components/password/organisms/__tests__/EmergencyAccessCard.test.tsx)
│   │   │   │   │   │   ├── [FolderManager.test.tsx](./exhibit/src/components/password/organisms/__tests__/FolderManager.test.tsx)
│   │   │   │   │   │   ├── [LockScreen.test.tsx](./exhibit/src/components/password/organisms/__tests__/LockScreen.test.tsx)
│   │   │   │   │   │   ├── [RecentlyUsed.test.tsx](./exhibit/src/components/password/organisms/__tests__/RecentlyUsed.test.tsx)
│   │   │   │   │   │   ├── [ToastContainer.test.tsx](./exhibit/src/components/password/organisms/__tests__/ToastContainer.test.tsx)
│   │   │   │   │   │   ├── [TotpDisplay.test.tsx](./exhibit/src/components/password/organisms/__tests__/TotpDisplay.test.tsx)
│   │   │   │   │   │   └── [TransferCard.test.tsx](./exhibit/src/components/password/organisms/__tests__/TransferCard.test.tsx)
│   │   │   │   │   ├── [EmergencyAccessCard.tsx](./exhibit/src/components/password/organisms/EmergencyAccessCard.tsx)
│   │   │   │   │   ├── [FolderManager.tsx](./exhibit/src/components/password/organisms/FolderManager.tsx)
│   │   │   │   │   ├── [LockScreen.tsx](./exhibit/src/components/password/organisms/LockScreen.tsx)
│   │   │   │   │   ├── [MasterPasswordCard.tsx](./exhibit/src/components/password/organisms/MasterPasswordCard.tsx)
│   │   │   │   │   ├── [RecentlyUsed.tsx](./exhibit/src/components/password/organisms/RecentlyUsed.tsx)
│   │   │   │   │   ├── [SecuritySettingsCard.tsx](./exhibit/src/components/password/organisms/SecuritySettingsCard.tsx)
│   │   │   │   │   ├── [ToastContainer.tsx](./exhibit/src/components/password/organisms/ToastContainer.tsx)
│   │   │   │   │   ├── [TotpDisplay.tsx](./exhibit/src/components/password/organisms/TotpDisplay.tsx)
│   │   │   │   │   ├── [TransferCard.tsx](./exhibit/src/components/password/organisms/TransferCard.tsx)
│   │   │   │   │   ├── [VaultItemCard.tsx](./exhibit/src/components/password/organisms/VaultItemCard.tsx)
│   │   │   │   │   ├── [VaultToolbar.tsx](./exhibit/src/components/password/organisms/VaultToolbar.tsx)
│   │   │   │   │   └── [index.ts](./exhibit/src/components/password/organisms/index.ts)
│   │   │   │   └── [index.ts](./exhibit/src/components/password/index.ts)
│   │   │   ├── pos/
│   │   │   │   ├── atoms/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [EmptyState.test.tsx](./exhibit/src/components/pos/atoms/__tests__/EmptyState.test.tsx)
│   │   │   │   │   │   ├── [IconButton.test.tsx](./exhibit/src/components/pos/atoms/__tests__/IconButton.test.tsx)
│   │   │   │   │   │   ├── [Money.test.tsx](./exhibit/src/components/pos/atoms/__tests__/Money.test.tsx)
│   │   │   │   │   │   ├── [StatusBadge.test.tsx](./exhibit/src/components/pos/atoms/__tests__/StatusBadge.test.tsx)
│   │   │   │   │   │   └── [SuccessMark.test.tsx](./exhibit/src/components/pos/atoms/__tests__/SuccessMark.test.tsx)
│   │   │   │   │   ├── [EmptyState.tsx](./exhibit/src/components/pos/atoms/EmptyState.tsx)
│   │   │   │   │   ├── [IconButton.tsx](./exhibit/src/components/pos/atoms/IconButton.tsx)
│   │   │   │   │   ├── [Money.tsx](./exhibit/src/components/pos/atoms/Money.tsx)
│   │   │   │   │   ├── [StatusBadge.tsx](./exhibit/src/components/pos/atoms/StatusBadge.tsx)
│   │   │   │   │   ├── [SuccessMark.tsx](./exhibit/src/components/pos/atoms/SuccessMark.tsx)
│   │   │   │   │   └── [index.ts](./exhibit/src/components/pos/atoms/index.ts)
│   │   │   │   ├── molecules/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [CodeApplyField.test.tsx](./exhibit/src/components/pos/molecules/__tests__/CodeApplyField.test.tsx)
│   │   │   │   │   │   ├── [FilterTabs.test.tsx](./exhibit/src/components/pos/molecules/__tests__/FilterTabs.test.tsx)
│   │   │   │   │   │   ├── [LineItemRow.test.tsx](./exhibit/src/components/pos/molecules/__tests__/LineItemRow.test.tsx)
│   │   │   │   │   │   ├── [MoneyRow.test.tsx](./exhibit/src/components/pos/molecules/__tests__/MoneyRow.test.tsx)
│   │   │   │   │   │   ├── [PanelHeader.test.tsx](./exhibit/src/components/pos/molecules/__tests__/PanelHeader.test.tsx)
│   │   │   │   │   │   ├── [PaymentBreakdown.test.tsx](./exhibit/src/components/pos/molecules/__tests__/PaymentBreakdown.test.tsx)
│   │   │   │   │   │   ├── [SearchField.test.tsx](./exhibit/src/components/pos/molecules/__tests__/SearchField.test.tsx)
│   │   │   │   │   │   ├── [TransactionDetail.test.tsx](./exhibit/src/components/pos/molecules/__tests__/TransactionDetail.test.tsx)
│   │   │   │   │   │   ├── [ViewToolbar.test.tsx](./exhibit/src/components/pos/molecules/__tests__/ViewToolbar.test.tsx)
│   │   │   │   │   │   └── [reportPieces.test.tsx](./exhibit/src/components/pos/molecules/__tests__/reportPieces.test.tsx)
│   │   │   │   │   ├── [AdjustmentList.tsx](./exhibit/src/components/pos/molecules/AdjustmentList.tsx)
│   │   │   │   │   ├── [CodeApplyField.tsx](./exhibit/src/components/pos/molecules/CodeApplyField.tsx)
│   │   │   │   │   ├── [FilterTabs.tsx](./exhibit/src/components/pos/molecules/FilterTabs.tsx)
│   │   │   │   │   ├── [FormCard.tsx](./exhibit/src/components/pos/molecules/FormCard.tsx)
│   │   │   │   │   ├── [LineItemRow.tsx](./exhibit/src/components/pos/molecules/LineItemRow.tsx)
│   │   │   │   │   ├── [MoneyRow.tsx](./exhibit/src/components/pos/molecules/MoneyRow.tsx)
│   │   │   │   │   ├── [PanelHeader.tsx](./exhibit/src/components/pos/molecules/PanelHeader.tsx)
│   │   │   │   │   ├── [PaymentBreakdown.tsx](./exhibit/src/components/pos/molecules/PaymentBreakdown.tsx)
│   │   │   │   │   ├── [SearchField.tsx](./exhibit/src/components/pos/molecules/SearchField.tsx)
│   │   │   │   │   ├── [StatBlock.tsx](./exhibit/src/components/pos/molecules/StatBlock.tsx)
│   │   │   │   │   ├── [TopItemsList.tsx](./exhibit/src/components/pos/molecules/TopItemsList.tsx)
│   │   │   │   │   ├── [TransactionDetail.tsx](./exhibit/src/components/pos/molecules/TransactionDetail.tsx)
│   │   │   │   │   ├── [TransactionTotals.tsx](./exhibit/src/components/pos/molecules/TransactionTotals.tsx)
│   │   │   │   │   ├── [ViewToolbar.tsx](./exhibit/src/components/pos/molecules/ViewToolbar.tsx)
│   │   │   │   │   └── [index.ts](./exhibit/src/components/pos/molecules/index.ts)
│   │   │   │   ├── organisms/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [Cart.test.tsx](./exhibit/src/components/pos/organisms/__tests__/Cart.test.tsx)
│   │   │   │   │   │   ├── [Checkout.test.tsx](./exhibit/src/components/pos/organisms/__tests__/Checkout.test.tsx)
│   │   │   │   │   │   ├── [DailySummary.test.tsx](./exhibit/src/components/pos/organisms/__tests__/DailySummary.test.tsx)
│   │   │   │   │   │   ├── [DigitalReceipt.test.tsx](./exhibit/src/components/pos/organisms/__tests__/DigitalReceipt.test.tsx)
│   │   │   │   │   │   ├── [DiscountManager.test.tsx](./exhibit/src/components/pos/organisms/__tests__/DiscountManager.test.tsx)
│   │   │   │   │   │   ├── [GiftCardManager.test.tsx](./exhibit/src/components/pos/organisms/__tests__/GiftCardManager.test.tsx)
│   │   │   │   │   │   ├── [InventoryManager.test.tsx](./exhibit/src/components/pos/organisms/__tests__/InventoryManager.test.tsx)
│   │   │   │   │   │   ├── [ItemCatalog.test.tsx](./exhibit/src/components/pos/organisms/__tests__/ItemCatalog.test.tsx)
│   │   │   │   │   │   ├── [PaymentPanel.test.tsx](./exhibit/src/components/pos/organisms/__tests__/PaymentPanel.test.tsx)
│   │   │   │   │   │   ├── [Receipt.test.tsx](./exhibit/src/components/pos/organisms/__tests__/Receipt.test.tsx)
│   │   │   │   │   │   ├── [ReportingDashboard.test.tsx](./exhibit/src/components/pos/organisms/__tests__/ReportingDashboard.test.tsx)
│   │   │   │   │   │   ├── [ShiftManager.test.tsx](./exhibit/src/components/pos/organisms/__tests__/ShiftManager.test.tsx)
│   │   │   │   │   │   ├── [TaxConfigPanel.test.tsx](./exhibit/src/components/pos/organisms/__tests__/TaxConfigPanel.test.tsx)
│   │   │   │   │   │   ├── [TransactionHistory.test.tsx](./exhibit/src/components/pos/organisms/__tests__/TransactionHistory.test.tsx)
│   │   │   │   │   │   └── [UserManager.test.tsx](./exhibit/src/components/pos/organisms/__tests__/UserManager.test.tsx)
│   │   │   │   │   ├── [Cart.tsx](./exhibit/src/components/pos/organisms/Cart.tsx)
│   │   │   │   │   ├── [Checkout.tsx](./exhibit/src/components/pos/organisms/Checkout.tsx)
│   │   │   │   │   ├── [DailySummary.tsx](./exhibit/src/components/pos/organisms/DailySummary.tsx)
│   │   │   │   │   ├── [DigitalReceipt.tsx](./exhibit/src/components/pos/organisms/DigitalReceipt.tsx)
│   │   │   │   │   ├── [DiscountManager.tsx](./exhibit/src/components/pos/organisms/DiscountManager.tsx)
│   │   │   │   │   ├── [GiftCardManager.tsx](./exhibit/src/components/pos/organisms/GiftCardManager.tsx)
│   │   │   │   │   ├── [InventoryManager.tsx](./exhibit/src/components/pos/organisms/InventoryManager.tsx)
│   │   │   │   │   ├── [ItemCatalog.tsx](./exhibit/src/components/pos/organisms/ItemCatalog.tsx)
│   │   │   │   │   ├── [PaymentPanel.tsx](./exhibit/src/components/pos/organisms/PaymentPanel.tsx)
│   │   │   │   │   ├── [Receipt.tsx](./exhibit/src/components/pos/organisms/Receipt.tsx)
│   │   │   │   │   ├── [ReportingDashboard.tsx](./exhibit/src/components/pos/organisms/ReportingDashboard.tsx)
│   │   │   │   │   ├── [ShiftManager.tsx](./exhibit/src/components/pos/organisms/ShiftManager.tsx)
│   │   │   │   │   ├── [TaxConfigPanel.tsx](./exhibit/src/components/pos/organisms/TaxConfigPanel.tsx)
│   │   │   │   │   ├── [TransactionHistory.tsx](./exhibit/src/components/pos/organisms/TransactionHistory.tsx)
│   │   │   │   │   ├── [UserManager.tsx](./exhibit/src/components/pos/organisms/UserManager.tsx)
│   │   │   │   │   └── [index.ts](./exhibit/src/components/pos/organisms/index.ts)
│   │   │   │   ├── templates/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [PosTemplate.test.tsx](./exhibit/src/components/pos/templates/__tests__/PosTemplate.test.tsx)
│   │   │   │   │   ├── [PosTemplate.tsx](./exhibit/src/components/pos/templates/PosTemplate.tsx)
│   │   │   │   │   ├── [index.ts](./exhibit/src/components/pos/templates/index.ts)
│   │   │   │   │   └── [usePosState.ts](./exhibit/src/components/pos/templates/usePosState.ts)
│   │   │   │   ├── [UserManager.tsx](./exhibit/src/components/pos/UserManager.tsx)
│   │   │   │   ├── [index.ts](./exhibit/src/components/pos/index.ts)
│   │   │   │   └── [types.ts](./exhibit/src/components/pos/types.ts)
│   │   │   ├── shared/
│   │   │   │   ├── organisms/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [Header.test.tsx](./exhibit/src/components/shared/organisms/__tests__/Header.test.tsx)
│   │   │   │   │   ├── [Header.tsx](./exhibit/src/components/shared/organisms/Header.tsx)
│   │   │   │   │   ├── [OfflineBanner.tsx](./exhibit/src/components/shared/organisms/OfflineBanner.tsx)
│   │   │   │   │   └── [SkipToContent.tsx](./exhibit/src/components/shared/organisms/SkipToContent.tsx)
│   │   │   │   └── templates/
│   │   │   │       ├── __tests__/
│   │   │   │       │   ├── [AboutTemplate.test.tsx](./exhibit/src/components/shared/templates/__tests__/AboutTemplate.test.tsx)
│   │   │   │       │   ├── [DownloadsTemplate.test.tsx](./exhibit/src/components/shared/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │   │       │   ├── [ErrorTemplate.test.tsx](./exhibit/src/components/shared/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │   │       │   └── [VersionTemplate.test.tsx](./exhibit/src/components/shared/templates/__tests__/VersionTemplate.test.tsx)
│   │   │   │       ├── [AboutTemplate.tsx](./exhibit/src/components/shared/templates/AboutTemplate.tsx)
│   │   │   │       ├── [DownloadsTemplate.tsx](./exhibit/src/components/shared/templates/DownloadsTemplate.tsx)
│   │   │   │       ├── [ErrorTemplate.tsx](./exhibit/src/components/shared/templates/ErrorTemplate.tsx)
│   │   │   │       └── [VersionTemplate.tsx](./exhibit/src/components/shared/templates/VersionTemplate.tsx)
│   │   │   ├── tax/
│   │   │   │   ├── organisms/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [AuditDetail.test.tsx](./exhibit/src/components/tax/organisms/__tests__/AuditDetail.test.tsx)
│   │   │   │   │   │   ├── [AuditList.test.tsx](./exhibit/src/components/tax/organisms/__tests__/AuditList.test.tsx)
│   │   │   │   │   │   ├── [BottomNav.test.tsx](./exhibit/src/components/tax/organisms/__tests__/BottomNav.test.tsx)
│   │   │   │   │   │   ├── [Sidebar.test.tsx](./exhibit/src/components/tax/organisms/__tests__/Sidebar.test.tsx)
│   │   │   │   │   │   ├── [SubmissionDetail.test.tsx](./exhibit/src/components/tax/organisms/__tests__/SubmissionDetail.test.tsx)
│   │   │   │   │   │   └── [SubmissionList.test.tsx](./exhibit/src/components/tax/organisms/__tests__/SubmissionList.test.tsx)
│   │   │   │   │   ├── [AuditDetail.tsx](./exhibit/src/components/tax/organisms/AuditDetail.tsx)
│   │   │   │   │   ├── [AuditList.tsx](./exhibit/src/components/tax/organisms/AuditList.tsx)
│   │   │   │   │   ├── [BottomNav.tsx](./exhibit/src/components/tax/organisms/BottomNav.tsx)
│   │   │   │   │   ├── [Sidebar.tsx](./exhibit/src/components/tax/organisms/Sidebar.tsx)
│   │   │   │   │   ├── [SubmissionDetail.tsx](./exhibit/src/components/tax/organisms/SubmissionDetail.tsx)
│   │   │   │   │   └── [SubmissionList.tsx](./exhibit/src/components/tax/organisms/SubmissionList.tsx)
│   │   │   │   └── templates/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [DashboardTemplate.test.tsx](./exhibit/src/components/tax/templates/__tests__/DashboardTemplate.test.tsx)
│   │   │   │       └── [DashboardTemplate.tsx](./exhibit/src/components/tax/templates/DashboardTemplate.tsx)
│   │   │   ├── video/
│   │   │   │   ├── atoms/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [VideoFileUpload.test.tsx](./exhibit/src/components/video/atoms/__tests__/VideoFileUpload.test.tsx)
│   │   │   │   │   ├── [VideoFileUpload.tsx](./exhibit/src/components/video/atoms/VideoFileUpload.tsx)
│   │   │   │   │   └── [index.ts](./exhibit/src/components/video/atoms/index.ts)
│   │   │   │   ├── molecules/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [AudioTranscribeTool.test.tsx](./exhibit/src/components/video/molecules/__tests__/AudioTranscribeTool.test.tsx)
│   │   │   │   │   │   ├── [GenerateSubtitleTool.test.tsx](./exhibit/src/components/video/molecules/__tests__/GenerateSubtitleTool.test.tsx)
│   │   │   │   │   │   ├── [VideoCompressTool.test.tsx](./exhibit/src/components/video/molecules/__tests__/VideoCompressTool.test.tsx)
│   │   │   │   │   │   ├── [VideoConvertTool.test.tsx](./exhibit/src/components/video/molecules/__tests__/VideoConvertTool.test.tsx)
│   │   │   │   │   │   ├── [VideoCropTool.test.tsx](./exhibit/src/components/video/molecules/__tests__/VideoCropTool.test.tsx)
│   │   │   │   │   │   ├── [VideoDownloadTool.test.tsx](./exhibit/src/components/video/molecules/__tests__/VideoDownloadTool.test.tsx)
│   │   │   │   │   │   ├── [VideoExtractAudioTool.test.tsx](./exhibit/src/components/video/molecules/__tests__/VideoExtractAudioTool.test.tsx)
│   │   │   │   │   │   ├── [VideoExtractFramesTool.test.tsx](./exhibit/src/components/video/molecules/__tests__/VideoExtractFramesTool.test.tsx)
│   │   │   │   │   │   ├── [VideoMergeTool.test.tsx](./exhibit/src/components/video/molecules/__tests__/VideoMergeTool.test.tsx)
│   │   │   │   │   │   ├── [VideoMuteTool.test.tsx](./exhibit/src/components/video/molecules/__tests__/VideoMuteTool.test.tsx)
│   │   │   │   │   │   ├── [VideoResizeTool.test.tsx](./exhibit/src/components/video/molecules/__tests__/VideoResizeTool.test.tsx)
│   │   │   │   │   │   ├── [VideoSpeedTool.test.tsx](./exhibit/src/components/video/molecules/__tests__/VideoSpeedTool.test.tsx)
│   │   │   │   │   │   ├── [VideoStabilizeTool.test.tsx](./exhibit/src/components/video/molecules/__tests__/VideoStabilizeTool.test.tsx)
│   │   │   │   │   │   └── [VideoTrimTool.test.tsx](./exhibit/src/components/video/molecules/__tests__/VideoTrimTool.test.tsx)
│   │   │   │   │   ├── [AudioTranscribeTool.tsx](./exhibit/src/components/video/molecules/AudioTranscribeTool.tsx)
│   │   │   │   │   ├── [GenerateSubtitleTool.tsx](./exhibit/src/components/video/molecules/GenerateSubtitleTool.tsx)
│   │   │   │   │   ├── [VideoCompressTool.tsx](./exhibit/src/components/video/molecules/VideoCompressTool.tsx)
│   │   │   │   │   ├── [VideoConvertTool.tsx](./exhibit/src/components/video/molecules/VideoConvertTool.tsx)
│   │   │   │   │   ├── [VideoCropTool.tsx](./exhibit/src/components/video/molecules/VideoCropTool.tsx)
│   │   │   │   │   ├── [VideoDownloadTool.tsx](./exhibit/src/components/video/molecules/VideoDownloadTool.tsx)
│   │   │   │   │   ├── [VideoExtractAudioTool.tsx](./exhibit/src/components/video/molecules/VideoExtractAudioTool.tsx)
│   │   │   │   │   ├── [VideoExtractFramesTool.tsx](./exhibit/src/components/video/molecules/VideoExtractFramesTool.tsx)
│   │   │   │   │   ├── [VideoMergeTool.tsx](./exhibit/src/components/video/molecules/VideoMergeTool.tsx)
│   │   │   │   │   ├── [VideoMuteTool.tsx](./exhibit/src/components/video/molecules/VideoMuteTool.tsx)
│   │   │   │   │   ├── [VideoResizeTool.tsx](./exhibit/src/components/video/molecules/VideoResizeTool.tsx)
│   │   │   │   │   ├── [VideoSpeedTool.tsx](./exhibit/src/components/video/molecules/VideoSpeedTool.tsx)
│   │   │   │   │   ├── [VideoStabilizeTool.tsx](./exhibit/src/components/video/molecules/VideoStabilizeTool.tsx)
│   │   │   │   │   ├── [VideoTrimTool.tsx](./exhibit/src/components/video/molecules/VideoTrimTool.tsx)
│   │   │   │   │   └── [index.ts](./exhibit/src/components/video/molecules/index.ts)
│   │   │   │   ├── templates/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [VideoToolsPage.test.tsx](./exhibit/src/components/video/templates/__tests__/VideoToolsPage.test.tsx)
│   │   │   │   │   ├── [VideoToolsPage.tsx](./exhibit/src/components/video/templates/VideoToolsPage.tsx)
│   │   │   │   │   └── [index.ts](./exhibit/src/components/video/templates/index.ts)
│   │   │   │   └── [index.ts](./exhibit/src/components/video/index.ts)
│   │   │   └── wallet/
│   │   │       ├── atoms/
│   │   │       │   ├── __tests__/
│   │   │       │   │   ├── [AccountCard.test.tsx](./exhibit/src/components/wallet/atoms/__tests__/AccountCard.test.tsx)
│   │   │       │   │   ├── [AccountDetail.test.tsx](./exhibit/src/components/wallet/atoms/__tests__/AccountDetail.test.tsx)
│   │   │       │   │   ├── [BalanceCard.test.tsx](./exhibit/src/components/wallet/atoms/__tests__/BalanceCard.test.tsx)
│   │   │       │   │   ├── [BillItem.test.tsx](./exhibit/src/components/wallet/atoms/__tests__/BillItem.test.tsx)
│   │   │       │   │   ├── [BudgetCategoryCard.test.tsx](./exhibit/src/components/wallet/atoms/__tests__/BudgetCategoryCard.test.tsx)
│   │   │       │   │   ├── [CardActions.test.tsx](./exhibit/src/components/wallet/atoms/__tests__/CardActions.test.tsx)
│   │   │       │   │   ├── [CardDetail.test.tsx](./exhibit/src/components/wallet/atoms/__tests__/CardDetail.test.tsx)
│   │   │       │   │   ├── [CardItem.test.tsx](./exhibit/src/components/wallet/atoms/__tests__/CardItem.test.tsx)
│   │   │       │   │   ├── [CardSpending.branches.test.tsx](./exhibit/src/components/wallet/atoms/__tests__/CardSpending.branches.test.tsx)
│   │   │       │   │   ├── [CardSpending.test.tsx](./exhibit/src/components/wallet/atoms/__tests__/CardSpending.test.tsx)
│   │   │       │   │   ├── [NotificationItem.test.tsx](./exhibit/src/components/wallet/atoms/__tests__/NotificationItem.test.tsx)
│   │   │       │   │   ├── [RateItem.test.tsx](./exhibit/src/components/wallet/atoms/__tests__/RateItem.test.tsx)
│   │   │       │   │   ├── [Skeleton.test.tsx](./exhibit/src/components/wallet/atoms/__tests__/Skeleton.test.tsx)
│   │   │       │   │   ├── [SpendingChart.test.tsx](./exhibit/src/components/wallet/atoms/__tests__/SpendingChart.test.tsx)
│   │   │       │   │   ├── [SwipeableTransactionItem.test.tsx](./exhibit/src/components/wallet/atoms/__tests__/SwipeableTransactionItem.test.tsx)
│   │   │       │   │   ├── [TransactionItem.test.tsx](./exhibit/src/components/wallet/atoms/__tests__/TransactionItem.test.tsx)
│   │   │       │   │   └── [UserCard.test.tsx](./exhibit/src/components/wallet/atoms/__tests__/UserCard.test.tsx)
│   │   │       │   ├── [AccountCard.tsx](./exhibit/src/components/wallet/atoms/AccountCard.tsx)
│   │   │       │   ├── [AccountDetail.tsx](./exhibit/src/components/wallet/atoms/AccountDetail.tsx)
│   │   │       │   ├── [BalanceCard.tsx](./exhibit/src/components/wallet/atoms/BalanceCard.tsx)
│   │   │       │   ├── [BillItem.tsx](./exhibit/src/components/wallet/atoms/BillItem.tsx)
│   │   │       │   ├── [BudgetCategoryCard.tsx](./exhibit/src/components/wallet/atoms/BudgetCategoryCard.tsx)
│   │   │       │   ├── [CardActions.tsx](./exhibit/src/components/wallet/atoms/CardActions.tsx)
│   │   │       │   ├── [CardDetail.tsx](./exhibit/src/components/wallet/atoms/CardDetail.tsx)
│   │   │       │   ├── [CardItem.tsx](./exhibit/src/components/wallet/atoms/CardItem.tsx)
│   │   │       │   ├── [CardSpending.tsx](./exhibit/src/components/wallet/atoms/CardSpending.tsx)
│   │   │       │   ├── [NotificationItem.tsx](./exhibit/src/components/wallet/atoms/NotificationItem.tsx)
│   │   │       │   ├── [RateItem.tsx](./exhibit/src/components/wallet/atoms/RateItem.tsx)
│   │   │       │   ├── [Skeleton.tsx](./exhibit/src/components/wallet/atoms/Skeleton.tsx)
│   │   │       │   ├── [SpendingChart.tsx](./exhibit/src/components/wallet/atoms/SpendingChart.tsx)
│   │   │       │   ├── [SwipeableTransactionItem.tsx](./exhibit/src/components/wallet/atoms/SwipeableTransactionItem.tsx)
│   │   │       │   ├── [TransactionItem.tsx](./exhibit/src/components/wallet/atoms/TransactionItem.tsx)
│   │   │       │   ├── [UserCard.tsx](./exhibit/src/components/wallet/atoms/UserCard.tsx)
│   │   │       │   └── [index.ts](./exhibit/src/components/wallet/atoms/index.ts)
│   │   │       ├── molecules/
│   │   │       │   ├── __tests__/
│   │   │       │   │   ├── [BudgetSummary.test.tsx](./exhibit/src/components/wallet/molecules/__tests__/BudgetSummary.test.tsx)
│   │   │       │   │   ├── [CurrencyConverter.test.tsx](./exhibit/src/components/wallet/molecules/__tests__/CurrencyConverter.test.tsx)
│   │   │       │   │   ├── [QRCodeActions.test.tsx](./exhibit/src/components/wallet/molecules/__tests__/QRCodeActions.test.tsx)
│   │   │       │   │   ├── [QRCodeModal.test.tsx](./exhibit/src/components/wallet/molecules/__tests__/QRCodeModal.test.tsx)
│   │   │       │   │   ├── [QuickActions.test.tsx](./exhibit/src/components/wallet/molecules/__tests__/QuickActions.test.tsx)
│   │   │       │   │   ├── [QuickPayForm.test.tsx](./exhibit/src/components/wallet/molecules/__tests__/QuickPayForm.test.tsx)
│   │   │       │   │   ├── [RateList.test.tsx](./exhibit/src/components/wallet/molecules/__tests__/RateList.test.tsx)
│   │   │       │   │   ├── [TransactionFilters.test.tsx](./exhibit/src/components/wallet/molecules/__tests__/TransactionFilters.test.tsx)
│   │   │       │   │   ├── [TransferConfirmation.test.tsx](./exhibit/src/components/wallet/molecules/__tests__/TransferConfirmation.test.tsx)
│   │   │       │   │   └── [TransferForm.test.tsx](./exhibit/src/components/wallet/molecules/__tests__/TransferForm.test.tsx)
│   │   │       │   ├── [AddAccountModal.tsx](./exhibit/src/components/wallet/molecules/AddAccountModal.tsx)
│   │   │       │   ├── [AddBillModal.tsx](./exhibit/src/components/wallet/molecules/AddBillModal.tsx)
│   │   │       │   ├── [BudgetSummary.tsx](./exhibit/src/components/wallet/molecules/BudgetSummary.tsx)
│   │   │       │   ├── [ContactList.tsx](./exhibit/src/components/wallet/molecules/ContactList.tsx)
│   │   │       │   ├── [CurrencyAlerts.tsx](./exhibit/src/components/wallet/molecules/CurrencyAlerts.tsx)
│   │   │       │   ├── [CurrencyConverter.tsx](./exhibit/src/components/wallet/molecules/CurrencyConverter.tsx)
│   │   │       │   ├── [QRCodeActions.tsx](./exhibit/src/components/wallet/molecules/QRCodeActions.tsx)
│   │   │       │   ├── [QRCodeModal.tsx](./exhibit/src/components/wallet/molecules/QRCodeModal.tsx)
│   │   │       │   ├── [QuickActions.tsx](./exhibit/src/components/wallet/molecules/QuickActions.tsx)
│   │   │       │   ├── [QuickPayForm.tsx](./exhibit/src/components/wallet/molecules/QuickPayForm.tsx)
│   │   │       │   ├── [RateList.tsx](./exhibit/src/components/wallet/molecules/RateList.tsx)
│   │   │       │   ├── [SplitBill.tsx](./exhibit/src/components/wallet/molecules/SplitBill.tsx)
│   │   │       │   ├── [TransactionFilters.tsx](./exhibit/src/components/wallet/molecules/TransactionFilters.tsx)
│   │   │       │   ├── [TransferConfirmation.tsx](./exhibit/src/components/wallet/molecules/TransferConfirmation.tsx)
│   │   │       │   ├── [TransferForm.tsx](./exhibit/src/components/wallet/molecules/TransferForm.tsx)
│   │   │       │   └── [index.ts](./exhibit/src/components/wallet/molecules/index.ts)
│   │   │       ├── organisms/
│   │   │       │   ├── __tests__/
│   │   │       │   │   ├── [BottomNav.test.tsx](./exhibit/src/components/wallet/organisms/__tests__/BottomNav.test.tsx)
│   │   │       │   │   ├── [SettingsSection.test.tsx](./exhibit/src/components/wallet/organisms/__tests__/SettingsSection.test.tsx)
│   │   │       │   │   └── [Sidebar.test.tsx](./exhibit/src/components/wallet/organisms/__tests__/Sidebar.test.tsx)
│   │   │       │   ├── [BottomNav.tsx](./exhibit/src/components/wallet/organisms/BottomNav.tsx)
│   │   │       │   ├── [SettingsSection.tsx](./exhibit/src/components/wallet/organisms/SettingsSection.tsx)
│   │   │       │   ├── [Sidebar.tsx](./exhibit/src/components/wallet/organisms/Sidebar.tsx)
│   │   │       │   └── [index.ts](./exhibit/src/components/wallet/organisms/index.ts)
│   │   │       ├── templates/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [DashboardTemplate.test.tsx](./exhibit/src/components/wallet/templates/__tests__/DashboardTemplate.test.tsx)
│   │   │       │   ├── [DashboardTemplate.tsx](./exhibit/src/components/wallet/templates/DashboardTemplate.tsx)
│   │   │       │   └── [index.ts](./exhibit/src/components/wallet/templates/index.ts)
│   │   │       └── [PageTransition.tsx](./exhibit/src/components/wallet/PageTransition.tsx)
│   │   ├── content/
│   │   │   ├── [about.ts](./exhibit/src/content/about.ts)
│   │   │   ├── [download.ts](./exhibit/src/content/download.ts)
│   │   │   └── [version.ts](./exhibit/src/content/version.ts)
│   │   ├── data/
│   │   │   ├── __tests__/
│   │   │   │   └── [items.test.ts](./exhibit/src/data/__tests__/items.test.ts)
│   │   │   ├── ai/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [models.test.ts](./exhibit/src/data/ai/__tests__/models.test.ts)
│   │   │   │   │   └── [seed.test.ts](./exhibit/src/data/ai/__tests__/seed.test.ts)
│   │   │   │   ├── [index.ts](./exhibit/src/data/ai/index.ts)
│   │   │   │   ├── [models.ts](./exhibit/src/data/ai/models.ts)
│   │   │   │   └── [seed.ts](./exhibit/src/data/ai/seed.ts)
│   │   │   ├── chat/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [models.test.ts](./exhibit/src/data/chat/__tests__/models.test.ts)
│   │   │   │   │   └── [seed.test.ts](./exhibit/src/data/chat/__tests__/seed.test.ts)
│   │   │   │   ├── [index.ts](./exhibit/src/data/chat/index.ts)
│   │   │   │   ├── [models.ts](./exhibit/src/data/chat/models.ts)
│   │   │   │   ├── [seed.ts](./exhibit/src/data/chat/seed.ts)
│   │   │   │   └── [stickers.ts](./exhibit/src/data/chat/stickers.ts)
│   │   │   ├── gallery/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [models.test.ts](./exhibit/src/data/gallery/__tests__/models.test.ts)
│   │   │   │   │   └── [seed.test.ts](./exhibit/src/data/gallery/__tests__/seed.test.ts)
│   │   │   │   ├── [index.ts](./exhibit/src/data/gallery/index.ts)
│   │   │   │   ├── [models.ts](./exhibit/src/data/gallery/models.ts)
│   │   │   │   └── [seed.ts](./exhibit/src/data/gallery/seed.ts)
│   │   │   ├── password/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [models.test.ts](./exhibit/src/data/password/__tests__/models.test.ts)
│   │   │   │   │   └── [seed.test.ts](./exhibit/src/data/password/__tests__/seed.test.ts)
│   │   │   │   ├── [index.ts](./exhibit/src/data/password/index.ts)
│   │   │   │   ├── [models.ts](./exhibit/src/data/password/models.ts)
│   │   │   │   └── [seed.ts](./exhibit/src/data/password/seed.ts)
│   │   │   ├── tax/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [mock.test.ts](./exhibit/src/data/tax/__tests__/mock.test.ts)
│   │   │   │   │   └── [nav.test.ts](./exhibit/src/data/tax/__tests__/nav.test.ts)
│   │   │   │   ├── [mock.ts](./exhibit/src/data/tax/mock.ts)
│   │   │   │   └── [nav.ts](./exhibit/src/data/tax/nav.ts)
│   │   │   ├── video/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [video-tools.test.ts](./exhibit/src/data/video/__tests__/video-tools.test.ts)
│   │   │   │   └── [video-tools.ts](./exhibit/src/data/video/video-tools.ts)
│   │   │   ├── wallet/
│   │   │   │   ├── [mock.ts](./exhibit/src/data/wallet/mock.ts)
│   │   │   │   └── [nav.ts](./exhibit/src/data/wallet/nav.ts)
│   │   │   └── [items.ts](./exhibit/src/data/items.ts)
│   │   ├── hooks/
│   │   │   ├── ai/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [useKeyboard.test.ts](./exhibit/src/hooks/ai/__tests__/useKeyboard.test.ts)
│   │   │   │   │   ├── [useSWRegister.test.ts](./exhibit/src/hooks/ai/__tests__/useSWRegister.test.ts)
│   │   │   │   │   └── [useStreaming.test.ts](./exhibit/src/hooks/ai/__tests__/useStreaming.test.ts)
│   │   │   │   ├── [index.ts](./exhibit/src/hooks/ai/index.ts)
│   │   │   │   ├── [useKeyboard.ts](./exhibit/src/hooks/ai/useKeyboard.ts)
│   │   │   │   ├── [useSWRegister.ts](./exhibit/src/hooks/ai/useSWRegister.ts)
│   │   │   │   └── [useStreaming.ts](./exhibit/src/hooks/ai/useStreaming.ts)
│   │   │   ├── chat/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [useSWRegister.test.ts](./exhibit/src/hooks/chat/__tests__/useSWRegister.test.ts)
│   │   │   │   ├── [index.ts](./exhibit/src/hooks/chat/index.ts)
│   │   │   │   ├── [useAuthActions.ts](./exhibit/src/hooks/chat/useAuthActions.ts)
│   │   │   │   ├── [useCallActions.ts](./exhibit/src/hooks/chat/useCallActions.ts)
│   │   │   │   ├── [useChatActions.ts](./exhibit/src/hooks/chat/useChatActions.ts)
│   │   │   │   ├── [useDataEffects.ts](./exhibit/src/hooks/chat/useDataEffects.ts)
│   │   │   │   ├── [useMessageActions.ts](./exhibit/src/hooks/chat/useMessageActions.ts)
│   │   │   │   ├── [usePeerActions.ts](./exhibit/src/hooks/chat/usePeerActions.ts)
│   │   │   │   ├── [usePrivacyActions.ts](./exhibit/src/hooks/chat/usePrivacyActions.ts)
│   │   │   │   ├── [useSWRegister.ts](./exhibit/src/hooks/chat/useSWRegister.ts)
│   │   │   │   └── [useSettingsActions.ts](./exhibit/src/hooks/chat/useSettingsActions.ts)
│   │   │   ├── gallery/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [useSWRegister.test.ts](./exhibit/src/hooks/gallery/__tests__/useSWRegister.test.ts)
│   │   │   │   ├── [index.ts](./exhibit/src/hooks/gallery/index.ts)
│   │   │   │   └── [useSWRegister.ts](./exhibit/src/hooks/gallery/useSWRegister.ts)
│   │   │   ├── menu/
│   │   │   │   ├── [index.ts](./exhibit/src/hooks/menu/index.ts)
│   │   │   │   └── [useMenuStore.ts](./exhibit/src/hooks/menu/useMenuStore.ts)
│   │   │   ├── password/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [useSWRegister.test.tsx](./exhibit/src/hooks/password/__tests__/useSWRegister.test.tsx)
│   │   │   │   ├── [index.ts](./exhibit/src/hooks/password/index.ts)
│   │   │   │   └── [useSWRegister.ts](./exhibit/src/hooks/password/useSWRegister.ts)
│   │   │   ├── tax/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [useEntitySync.test.ts](./exhibit/src/hooks/tax/__tests__/useEntitySync.test.ts)
│   │   │   │   └── [useEntitySync.ts](./exhibit/src/hooks/tax/useEntitySync.ts)
│   │   │   └── wallet/
│   │   │       ├── [useEntitySync.ts](./exhibit/src/hooks/wallet/useEntitySync.ts)
│   │   │       ├── [useHaptic.ts](./exhibit/src/hooks/wallet/useHaptic.ts)
│   │   │       ├── [useMediaQuery.ts](./exhibit/src/hooks/wallet/useMediaQuery.ts)
│   │   │       ├── [usePullToRefresh.ts](./exhibit/src/hooks/wallet/usePullToRefresh.ts)
│   │   │       ├── [useSWRegister.ts](./exhibit/src/hooks/wallet/useSWRegister.ts)
│   │   │       └── [useWalletSession.ts](./exhibit/src/hooks/wallet/useWalletSession.ts)
│   │   ├── lib/
│   │   │   ├── __tests__/
│   │   │   │   └── [storage.test.ts](./exhibit/src/lib/__tests__/storage.test.ts)
│   │   │   ├── ai/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [db.test.ts](./exhibit/src/lib/ai/__tests__/db.test.ts)
│   │   │   │   ├── [db.ts](./exhibit/src/lib/ai/db.ts)
│   │   │   │   └── [index.ts](./exhibit/src/lib/ai/index.ts)
│   │   │   ├── chat/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [crypto.test.ts](./exhibit/src/lib/chat/__tests__/crypto.test.ts)
│   │   │   │   │   ├── [db.test.ts](./exhibit/src/lib/chat/__tests__/db.test.ts)
│   │   │   │   │   ├── [format.test.ts](./exhibit/src/lib/chat/__tests__/format.test.ts)
│   │   │   │   │   ├── [selectors.test.ts](./exhibit/src/lib/chat/__tests__/selectors.test.ts)
│   │   │   │   │   ├── [url.test.ts](./exhibit/src/lib/chat/__tests__/url.test.ts)
│   │   │   │   │   └── [webrtc.test.ts](./exhibit/src/lib/chat/__tests__/webrtc.test.ts)
│   │   │   │   ├── [crypto.ts](./exhibit/src/lib/chat/crypto.ts)
│   │   │   │   ├── [db.ts](./exhibit/src/lib/chat/db.ts)
│   │   │   │   ├── [format.ts](./exhibit/src/lib/chat/format.ts)
│   │   │   │   ├── [index.ts](./exhibit/src/lib/chat/index.ts)
│   │   │   │   ├── [selectors.ts](./exhibit/src/lib/chat/selectors.ts)
│   │   │   │   ├── [url.ts](./exhibit/src/lib/chat/url.ts)
│   │   │   │   └── [webrtc.ts](./exhibit/src/lib/chat/webrtc.ts)
│   │   │   ├── gallery/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [db.test.ts](./exhibit/src/lib/gallery/__tests__/db.test.ts)
│   │   │   │   │   └── [selectors.test.ts](./exhibit/src/lib/gallery/__tests__/selectors.test.ts)
│   │   │   │   ├── [db.ts](./exhibit/src/lib/gallery/db.ts)
│   │   │   │   ├── [index.ts](./exhibit/src/lib/gallery/index.ts)
│   │   │   │   └── [selectors.ts](./exhibit/src/lib/gallery/selectors.ts)
│   │   │   ├── menu/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [menu.test.ts](./exhibit/src/lib/menu/__tests__/menu.test.ts)
│   │   │   │   ├── [ids.ts](./exhibit/src/lib/menu/ids.ts)
│   │   │   │   ├── [index.ts](./exhibit/src/lib/menu/index.ts)
│   │   │   │   ├── [menu.ts](./exhibit/src/lib/menu/menu.ts)
│   │   │   │   ├── [qr.ts](./exhibit/src/lib/menu/qr.ts)
│   │   │   │   ├── [seed.ts](./exhibit/src/lib/menu/seed.ts)
│   │   │   │   └── [storage.ts](./exhibit/src/lib/menu/storage.ts)
│   │   │   ├── password/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [db.test.ts](./exhibit/src/lib/password/__tests__/db.test.ts)
│   │   │   │   │   ├── [health.test.ts](./exhibit/src/lib/password/__tests__/health.test.ts)
│   │   │   │   │   ├── [security.test.ts](./exhibit/src/lib/password/__tests__/security.test.ts)
│   │   │   │   │   ├── [totp.test.ts](./exhibit/src/lib/password/__tests__/totp.test.ts)
│   │   │   │   │   └── [transfer.test.ts](./exhibit/src/lib/password/__tests__/transfer.test.ts)
│   │   │   │   ├── [db.ts](./exhibit/src/lib/password/db.ts)
│   │   │   │   ├── [health.ts](./exhibit/src/lib/password/health.ts)
│   │   │   │   ├── [index.ts](./exhibit/src/lib/password/index.ts)
│   │   │   │   ├── [security.ts](./exhibit/src/lib/password/security.ts)
│   │   │   │   ├── [totp.ts](./exhibit/src/lib/password/totp.ts)
│   │   │   │   └── [transfer.ts](./exhibit/src/lib/password/transfer.ts)
│   │   │   ├── pos/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [cart.test.ts](./exhibit/src/lib/pos/__tests__/cart.test.ts)
│   │   │   │   │   ├── [discounts.test.ts](./exhibit/src/lib/pos/__tests__/discounts.test.ts)
│   │   │   │   │   ├── [export.test.ts](./exhibit/src/lib/pos/__tests__/export.test.ts)
│   │   │   │   │   ├── [money.test.ts](./exhibit/src/lib/pos/__tests__/money.test.ts)
│   │   │   │   │   ├── [payment.test.ts](./exhibit/src/lib/pos/__tests__/payment.test.ts)
│   │   │   │   │   └── [reports.test.ts](./exhibit/src/lib/pos/__tests__/reports.test.ts)
│   │   │   │   ├── [cart.ts](./exhibit/src/lib/pos/cart.ts)
│   │   │   │   ├── [discounts.ts](./exhibit/src/lib/pos/discounts.ts)
│   │   │   │   ├── [download.ts](./exhibit/src/lib/pos/download.ts)
│   │   │   │   ├── [export.ts](./exhibit/src/lib/pos/export.ts)
│   │   │   │   ├── [index.ts](./exhibit/src/lib/pos/index.ts)
│   │   │   │   ├── [inventory.ts](./exhibit/src/lib/pos/inventory.ts)
│   │   │   │   ├── [money.ts](./exhibit/src/lib/pos/money.ts)
│   │   │   │   ├── [payment.ts](./exhibit/src/lib/pos/payment.ts)
│   │   │   │   ├── [reports.ts](./exhibit/src/lib/pos/reports.ts)
│   │   │   │   └── [transactions.ts](./exhibit/src/lib/pos/transactions.ts)
│   │   │   ├── tax/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [constants.test.ts](./exhibit/src/lib/tax/__tests__/constants.test.ts)
│   │   │   │   │   ├── [db.test.ts](./exhibit/src/lib/tax/__tests__/db.test.ts)
│   │   │   │   │   └── [seed.test.ts](./exhibit/src/lib/tax/__tests__/seed.test.ts)
│   │   │   │   ├── [constants.ts](./exhibit/src/lib/tax/constants.ts)
│   │   │   │   ├── [db.ts](./exhibit/src/lib/tax/db.ts)
│   │   │   │   └── [seed.ts](./exhibit/src/lib/tax/seed.ts)
│   │   │   ├── video/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [video-tools.test.ts](./exhibit/src/lib/video/__tests__/video-tools.test.ts)
│   │   │   │   └── [video-tools.ts](./exhibit/src/lib/video/video-tools.ts)
│   │   │   ├── wallet/
│   │   │   │   ├── [db.ts](./exhibit/src/lib/wallet/db.ts)
│   │   │   │   ├── [export.ts](./exhibit/src/lib/wallet/export.ts)
│   │   │   │   ├── [format.ts](./exhibit/src/lib/wallet/format.ts)
│   │   │   │   ├── [iconMap.ts](./exhibit/src/lib/wallet/iconMap.ts)
│   │   │   │   ├── [seed.ts](./exhibit/src/lib/wallet/seed.ts)
│   │   │   │   └── [session.ts](./exhibit/src/lib/wallet/session.ts)
│   │   │   └── [storage.ts](./exhibit/src/lib/storage.ts)
│   │   ├── providers/
│   │   │   ├── ai/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [DataProvider.test.tsx](./exhibit/src/providers/ai/__tests__/DataProvider.test.tsx)
│   │   │   │   │   ├── [Providers.test.tsx](./exhibit/src/providers/ai/__tests__/Providers.test.tsx)
│   │   │   │   │   ├── [SWProvider.test.tsx](./exhibit/src/providers/ai/__tests__/SWProvider.test.tsx)
│   │   │   │   │   └── [ToastProvider.test.tsx](./exhibit/src/providers/ai/__tests__/ToastProvider.test.tsx)
│   │   │   │   ├── [DataProvider.tsx](./exhibit/src/providers/ai/DataProvider.tsx)
│   │   │   │   ├── [Providers.tsx](./exhibit/src/providers/ai/Providers.tsx)
│   │   │   │   ├── [SWProvider.tsx](./exhibit/src/providers/ai/SWProvider.tsx)
│   │   │   │   ├── [ToastProvider.tsx](./exhibit/src/providers/ai/ToastProvider.tsx)
│   │   │   │   └── [index.ts](./exhibit/src/providers/ai/index.ts)
│   │   │   ├── chat/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [DataProvider.test.tsx](./exhibit/src/providers/chat/__tests__/DataProvider.test.tsx)
│   │   │   │   │   ├── [Providers.test.tsx](./exhibit/src/providers/chat/__tests__/Providers.test.tsx)
│   │   │   │   │   ├── [SWProvider.test.tsx](./exhibit/src/providers/chat/__tests__/SWProvider.test.tsx)
│   │   │   │   │   └── [ToastProvider.test.tsx](./exhibit/src/providers/chat/__tests__/ToastProvider.test.tsx)
│   │   │   │   ├── [DataContext.ts](./exhibit/src/providers/chat/DataContext.ts)
│   │   │   │   ├── [DataProvider.tsx](./exhibit/src/providers/chat/DataProvider.tsx)
│   │   │   │   ├── [Providers.tsx](./exhibit/src/providers/chat/Providers.tsx)
│   │   │   │   ├── [SWProvider.tsx](./exhibit/src/providers/chat/SWProvider.tsx)
│   │   │   │   ├── [ToastProvider.tsx](./exhibit/src/providers/chat/ToastProvider.tsx)
│   │   │   │   ├── [data-helpers.ts](./exhibit/src/providers/chat/data-helpers.ts)
│   │   │   │   └── [index.ts](./exhibit/src/providers/chat/index.ts)
│   │   │   ├── gallery/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [DataProvider.test.tsx](./exhibit/src/providers/gallery/__tests__/DataProvider.test.tsx)
│   │   │   │   │   ├── [SWProvider.test.tsx](./exhibit/src/providers/gallery/__tests__/SWProvider.test.tsx)
│   │   │   │   │   └── [ToastProvider.test.tsx](./exhibit/src/providers/gallery/__tests__/ToastProvider.test.tsx)
│   │   │   │   ├── [DataProvider.tsx](./exhibit/src/providers/gallery/DataProvider.tsx)
│   │   │   │   ├── [Providers.tsx](./exhibit/src/providers/gallery/Providers.tsx)
│   │   │   │   ├── [SWProvider.tsx](./exhibit/src/providers/gallery/SWProvider.tsx)
│   │   │   │   ├── [ToastProvider.tsx](./exhibit/src/providers/gallery/ToastProvider.tsx)
│   │   │   │   └── [index.ts](./exhibit/src/providers/gallery/index.ts)
│   │   │   ├── password/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [DataProvider.test.tsx](./exhibit/src/providers/password/__tests__/DataProvider.test.tsx)
│   │   │   │   │   ├── [SWProvider.test.tsx](./exhibit/src/providers/password/__tests__/SWProvider.test.tsx)
│   │   │   │   │   ├── [SecurityProvider.test.tsx](./exhibit/src/providers/password/__tests__/SecurityProvider.test.tsx)
│   │   │   │   │   └── [ToastProvider.test.tsx](./exhibit/src/providers/password/__tests__/ToastProvider.test.tsx)
│   │   │   │   ├── [DataProvider.tsx](./exhibit/src/providers/password/DataProvider.tsx)
│   │   │   │   ├── [Providers.tsx](./exhibit/src/providers/password/Providers.tsx)
│   │   │   │   ├── [SWProvider.tsx](./exhibit/src/providers/password/SWProvider.tsx)
│   │   │   │   ├── [SecurityProvider.tsx](./exhibit/src/providers/password/SecurityProvider.tsx)
│   │   │   │   ├── [ToastProvider.tsx](./exhibit/src/providers/password/ToastProvider.tsx)
│   │   │   │   └── [index.ts](./exhibit/src/providers/password/index.ts)
│   │   │   ├── tax/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [DataProvider.test.tsx](./exhibit/src/providers/tax/__tests__/DataProvider.test.tsx)
│   │   │   │   │   └── [ToastProvider.test.tsx](./exhibit/src/providers/tax/__tests__/ToastProvider.test.tsx)
│   │   │   │   ├── auth/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [AuthProvider.test.tsx](./exhibit/src/providers/tax/auth/__tests__/AuthProvider.test.tsx)
│   │   │   │   │   └── [AuthProvider.tsx](./exhibit/src/providers/tax/auth/AuthProvider.tsx)
│   │   │   │   ├── entities/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [crud.test.tsx](./exhibit/src/providers/tax/entities/__tests__/crud.test.tsx)
│   │   │   │   │   │   └── [providers.test.tsx](./exhibit/src/providers/tax/entities/__tests__/providers.test.tsx)
│   │   │   │   │   ├── [AuditsProvider.tsx](./exhibit/src/providers/tax/entities/AuditsProvider.tsx)
│   │   │   │   │   ├── [CompaniesProvider.tsx](./exhibit/src/providers/tax/entities/CompaniesProvider.tsx)
│   │   │   │   │   ├── [SubmissionsProvider.tsx](./exhibit/src/providers/tax/entities/SubmissionsProvider.tsx)
│   │   │   │   │   └── [UserProvider.tsx](./exhibit/src/providers/tax/entities/UserProvider.tsx)
│   │   │   │   ├── [DataProvider.tsx](./exhibit/src/providers/tax/DataProvider.tsx)
│   │   │   │   ├── [Providers.tsx](./exhibit/src/providers/tax/Providers.tsx)
│   │   │   │   └── [ToastProvider.tsx](./exhibit/src/providers/tax/ToastProvider.tsx)
│   │   │   └── wallet/
│   │   │       ├── __tests__/
│   │   │       │   ├── [DataProvider.crud.test.tsx](./exhibit/src/providers/wallet/__tests__/DataProvider.crud.test.tsx)
│   │   │       │   ├── [DataProvider.loading.test.tsx](./exhibit/src/providers/wallet/__tests__/DataProvider.loading.test.tsx)
│   │   │       │   ├── [DataProvider.test.tsx](./exhibit/src/providers/wallet/__tests__/DataProvider.test.tsx)
│   │   │       │   └── [ToastProvider.test.tsx](./exhibit/src/providers/wallet/__tests__/ToastProvider.test.tsx)
│   │   │       ├── auth/
│   │   │       │   └── [AuthProvider.tsx](./exhibit/src/providers/wallet/auth/AuthProvider.tsx)
│   │   │       ├── entities/
│   │   │       │   ├── [AccountsProvider.tsx](./exhibit/src/providers/wallet/entities/AccountsProvider.tsx)
│   │   │       │   ├── [BillsProvider.tsx](./exhibit/src/providers/wallet/entities/BillsProvider.tsx)
│   │   │       │   ├── [BudgetProvider.tsx](./exhibit/src/providers/wallet/entities/BudgetProvider.tsx)
│   │   │       │   ├── [CardsProvider.tsx](./exhibit/src/providers/wallet/entities/CardsProvider.tsx)
│   │   │       │   ├── [ContactsProvider.tsx](./exhibit/src/providers/wallet/entities/ContactsProvider.tsx)
│   │   │       │   ├── [CurrencyAlertsProvider.tsx](./exhibit/src/providers/wallet/entities/CurrencyAlertsProvider.tsx)
│   │   │       │   ├── [CurrencyRatesProvider.tsx](./exhibit/src/providers/wallet/entities/CurrencyRatesProvider.tsx)
│   │   │       │   ├── [FDsProvider.tsx](./exhibit/src/providers/wallet/entities/FDsProvider.tsx)
│   │   │       │   ├── [GoalsProvider.tsx](./exhibit/src/providers/wallet/entities/GoalsProvider.tsx)
│   │   │       │   ├── [InsuranceProvider.tsx](./exhibit/src/providers/wallet/entities/InsuranceProvider.tsx)
│   │   │       │   ├── [LoansProvider.tsx](./exhibit/src/providers/wallet/entities/LoansProvider.tsx)
│   │   │       │   ├── [NotificationsProvider.tsx](./exhibit/src/providers/wallet/entities/NotificationsProvider.tsx)
│   │   │       │   ├── [PaymentRequestsProvider.tsx](./exhibit/src/providers/wallet/entities/PaymentRequestsProvider.tsx)
│   │   │       │   ├── [RDsProvider.tsx](./exhibit/src/providers/wallet/entities/RDsProvider.tsx)
│   │   │       │   ├── [RecurringTransfersProvider.tsx](./exhibit/src/providers/wallet/entities/RecurringTransfersProvider.tsx)
│   │   │       │   ├── [RewardsProvider.tsx](./exhibit/src/providers/wallet/entities/RewardsProvider.tsx)
│   │   │       │   ├── [TransactionsProvider.tsx](./exhibit/src/providers/wallet/entities/TransactionsProvider.tsx)
│   │   │       │   └── [UserProvider.tsx](./exhibit/src/providers/wallet/entities/UserProvider.tsx)
│   │   │       ├── [DataProvider.tsx](./exhibit/src/providers/wallet/DataProvider.tsx)
│   │   │       ├── [Providers.tsx](./exhibit/src/providers/wallet/Providers.tsx)
│   │   │       ├── [SWProvider.tsx](./exhibit/src/providers/wallet/SWProvider.tsx)
│   │   │       ├── [ToastProvider.tsx](./exhibit/src/providers/wallet/ToastProvider.tsx)
│   │   │       └── [WalletProviders.tsx](./exhibit/src/providers/wallet/WalletProviders.tsx)
│   │   ├── styles/
│   │   │   ├── [globals.css](./exhibit/src/styles/globals.css)
│   │   │   └── [themes.css](./exhibit/src/styles/themes.css)
│   │   ├── test-helpers/
│   │   │   ├── gallery/
│   │   │   │   ├── [fakeDb.ts](./exhibit/src/test-helpers/gallery/fakeDb.ts)
│   │   │   │   └── [index.ts](./exhibit/src/test-helpers/gallery/index.ts)
│   │   │   ├── password/
│   │   │   │   ├── [fakeDb.ts](./exhibit/src/test-helpers/password/fakeDb.ts)
│   │   │   │   └── [index.ts](./exhibit/src/test-helpers/password/index.ts)
│   │   │   └── wallet/
│   │   │       ├── [db-mock.ts](./exhibit/src/test-helpers/wallet/db-mock.ts)
│   │   │       ├── [index.ts](./exhibit/src/test-helpers/wallet/index.ts)
│   │   │       ├── [nav-mock.ts](./exhibit/src/test-helpers/wallet/nav-mock.ts)
│   │   │       └── [render.tsx](./exhibit/src/test-helpers/wallet/render.tsx)
│   │   ├── types/
│   │   │   ├── ai/
│   │   │   │   └── [index.ts](./exhibit/src/types/ai/index.ts)
│   │   │   ├── chat/
│   │   │   │   ├── [call.ts](./exhibit/src/types/chat/call.ts)
│   │   │   │   ├── [chat.ts](./exhibit/src/types/chat/chat.ts)
│   │   │   │   ├── [index.ts](./exhibit/src/types/chat/index.ts)
│   │   │   │   ├── [message.ts](./exhibit/src/types/chat/message.ts)
│   │   │   │   ├── [peer.ts](./exhibit/src/types/chat/peer.ts)
│   │   │   │   ├── [settings.ts](./exhibit/src/types/chat/settings.ts)
│   │   │   │   └── [user.ts](./exhibit/src/types/chat/user.ts)
│   │   │   ├── gallery/
│   │   │   │   └── [index.ts](./exhibit/src/types/gallery/index.ts)
│   │   │   ├── menu/
│   │   │   │   ├── [index.ts](./exhibit/src/types/menu/index.ts)
│   │   │   │   └── [menu.ts](./exhibit/src/types/menu/menu.ts)
│   │   │   ├── password/
│   │   │   │   └── [index.ts](./exhibit/src/types/password/index.ts)
│   │   │   ├── pos/
│   │   │   │   └── [index.ts](./exhibit/src/types/pos/index.ts)
│   │   │   ├── tax/
│   │   │   │   └── [index.ts](./exhibit/src/types/tax/index.ts)
│   │   │   ├── video/
│   │   │   │   └── [speech-recognition.d.ts](./exhibit/src/types/video/speech-recognition.d.ts)
│   │   │   └── wallet/
│   │   │       └── [index.ts](./exhibit/src/types/wallet/index.ts)
│   │   └── utils/
│   │       ├── ai/
│   │       │   ├── __tests__/
│   │       │   │   └── [format.test.ts](./exhibit/src/utils/ai/__tests__/format.test.ts)
│   │       │   ├── [format.ts](./exhibit/src/utils/ai/format.ts)
│   │       │   └── [index.ts](./exhibit/src/utils/ai/index.ts)
│   │       ├── gallery/
│   │       │   ├── __tests__/
│   │       │   │   └── [format.test.ts](./exhibit/src/utils/gallery/__tests__/format.test.ts)
│   │       │   ├── [format.ts](./exhibit/src/utils/gallery/format.ts)
│   │       │   └── [index.ts](./exhibit/src/utils/gallery/index.ts)
│   │       ├── password/
│   │       │   ├── __tests__/
│   │       │   │   └── [format.test.ts](./exhibit/src/utils/password/__tests__/format.test.ts)
│   │       │   ├── [format.ts](./exhibit/src/utils/password/format.ts)
│   │       │   └── [index.ts](./exhibit/src/utils/password/index.ts)
│   │       └── tax/
│   │           ├── __tests__/
│   │           │   └── [format.test.ts](./exhibit/src/utils/tax/__tests__/format.test.ts)
│   │           └── [format.ts](./exhibit/src/utils/tax/format.ts)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./exhibit/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── android/
│   │   │   │   ├── mipmap-anydpi-v26/
│   │   │   │   │   └── [ic_launcher.xml](./exhibit/src-tauri/icons/android/mipmap-anydpi-v26/ic_launcher.xml)
│   │   │   │   ├── mipmap-hdpi/
│   │   │   │   │   ├── [ic_launcher.png](./exhibit/src-tauri/icons/android/mipmap-hdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./exhibit/src-tauri/icons/android/mipmap-hdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./exhibit/src-tauri/icons/android/mipmap-hdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-mdpi/
│   │   │   │   │   ├── [ic_launcher.png](./exhibit/src-tauri/icons/android/mipmap-mdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./exhibit/src-tauri/icons/android/mipmap-mdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./exhibit/src-tauri/icons/android/mipmap-mdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./exhibit/src-tauri/icons/android/mipmap-xhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./exhibit/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./exhibit/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./exhibit/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./exhibit/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./exhibit/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./exhibit/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./exhibit/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./exhibit/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_round.png)
│   │   │   │   └── values/
│   │   │   │       └── [ic_launcher_background.xml](./exhibit/src-tauri/icons/android/values/ic_launcher_background.xml)
│   │   │   ├── ios/
│   │   │   │   ├── [AppIcon-20x20@1x.png](./exhibit/src-tauri/icons/ios/AppIcon-20x20@1x.png)
│   │   │   │   ├── [AppIcon-20x20@2x-1.png](./exhibit/src-tauri/icons/ios/AppIcon-20x20@2x-1.png)
│   │   │   │   ├── [AppIcon-20x20@2x.png](./exhibit/src-tauri/icons/ios/AppIcon-20x20@2x.png)
│   │   │   │   ├── [AppIcon-20x20@3x.png](./exhibit/src-tauri/icons/ios/AppIcon-20x20@3x.png)
│   │   │   │   ├── [AppIcon-29x29@1x.png](./exhibit/src-tauri/icons/ios/AppIcon-29x29@1x.png)
│   │   │   │   ├── [AppIcon-29x29@2x-1.png](./exhibit/src-tauri/icons/ios/AppIcon-29x29@2x-1.png)
│   │   │   │   ├── [AppIcon-29x29@2x.png](./exhibit/src-tauri/icons/ios/AppIcon-29x29@2x.png)
│   │   │   │   ├── [AppIcon-29x29@3x.png](./exhibit/src-tauri/icons/ios/AppIcon-29x29@3x.png)
│   │   │   │   ├── [AppIcon-40x40@1x.png](./exhibit/src-tauri/icons/ios/AppIcon-40x40@1x.png)
│   │   │   │   ├── [AppIcon-40x40@2x-1.png](./exhibit/src-tauri/icons/ios/AppIcon-40x40@2x-1.png)
│   │   │   │   ├── [AppIcon-40x40@2x.png](./exhibit/src-tauri/icons/ios/AppIcon-40x40@2x.png)
│   │   │   │   ├── [AppIcon-40x40@3x.png](./exhibit/src-tauri/icons/ios/AppIcon-40x40@3x.png)
│   │   │   │   ├── [AppIcon-512@2x.png](./exhibit/src-tauri/icons/ios/AppIcon-512@2x.png)
│   │   │   │   ├── [AppIcon-60x60@2x.png](./exhibit/src-tauri/icons/ios/AppIcon-60x60@2x.png)
│   │   │   │   ├── [AppIcon-60x60@3x.png](./exhibit/src-tauri/icons/ios/AppIcon-60x60@3x.png)
│   │   │   │   ├── [AppIcon-76x76@1x.png](./exhibit/src-tauri/icons/ios/AppIcon-76x76@1x.png)
│   │   │   │   ├── [AppIcon-76x76@2x.png](./exhibit/src-tauri/icons/ios/AppIcon-76x76@2x.png)
│   │   │   │   └── [AppIcon-83.5x83.5@2x.png](./exhibit/src-tauri/icons/ios/AppIcon-83.5x83.5@2x.png)
│   │   │   ├── [128x128.png](./exhibit/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./exhibit/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [256x256.png](./exhibit/src-tauri/icons/256x256.png)
│   │   │   ├── [32x32.png](./exhibit/src-tauri/icons/32x32.png)
│   │   │   ├── [64x64.png](./exhibit/src-tauri/icons/64x64.png)
│   │   │   ├── [Square107x107Logo.png](./exhibit/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./exhibit/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./exhibit/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./exhibit/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./exhibit/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./exhibit/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./exhibit/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./exhibit/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./exhibit/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./exhibit/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [create-icons.sh](./exhibit/src-tauri/icons/create-icons.sh)
│   │   │   ├── [icon-1024.png](./exhibit/src-tauri/icons/icon-1024.png)
│   │   │   ├── [icon.icns](./exhibit/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./exhibit/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./exhibit/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./exhibit/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./exhibit/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./exhibit/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./exhibit/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./exhibit/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./exhibit/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./exhibit/AGENTS.md)
│   ├── [Dockerfile](./exhibit/Dockerfile)
│   ├── [LICENSE](./exhibit/LICENSE)
│   ├── [README.md](./exhibit/README.md)
│   ├── [TREE.md](./exhibit/TREE.md)
│   ├── [docker-compose.yaml](./exhibit/docker-compose.yaml)
│   ├── [eslint.config.mts](./exhibit/eslint.config.mts)
│   ├── [jest.config.ts](./exhibit/jest.config.ts)
│   ├── [jest.setup.ts](./exhibit/jest.setup.ts)
│   ├── [next.config.ts](./exhibit/next.config.ts)
│   ├── [package.json](./exhibit/package.json)
│   ├── [playwright.config.ts](./exhibit/playwright.config.ts)
│   ├── [postcss.config.mjs](./exhibit/postcss.config.mjs)
│   └── [tsconfig.json](./exhibit/tsconfig.json)
├── [README.md](./README.md)
└── [TREE.md](./TREE.md)
```

324 directories, 970 files
