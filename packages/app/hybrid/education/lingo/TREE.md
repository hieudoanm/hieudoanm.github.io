# TREE

```text
├── docs/
│   ├── [ARCHITECTURE.md](./docs/ARCHITECTURE.md)
│   ├── [CONTRIBUTING.md](./docs/CONTRIBUTING.md)
│   ├── [DOWNLOADS.md](./docs/DOWNLOADS.md)
│   ├── [PACKAGING.md](./docs/PACKAGING.md)
│   └── [ROADMAP.md](./docs/ROADMAP.md)
├── e2e/
│   ├── screenshots/
│   │   ├── [about.png](./e2e/screenshots/about.png)
│   │   ├── [downloads.png](./e2e/screenshots/downloads.png)
│   │   ├── [home.png](./e2e/screenshots/home.png)
│   │   └── [version.png](./e2e/screenshots/version.png)
│   ├── [about.spec.ts](./e2e/about.spec.ts)
│   ├── [downloads.spec.ts](./e2e/downloads.spec.ts)
│   ├── [home.spec.ts](./e2e/home.spec.ts)
│   └── [version.spec.ts](./e2e/version.spec.ts)
├── public/
│   ├── audio/
│   │   ├── 3/
│   │   │   ├── [a.mp3](./public/audio/3/a.mp3)
│   │   │   ├── [as.mp3](./public/audio/3/as.mp3)
│   │   │   ├── [b.mp3](./public/audio/3/b.mp3)
│   │   │   ├── [c.mp3](./public/audio/3/c.mp3)
│   │   │   ├── [cs.mp3](./public/audio/3/cs.mp3)
│   │   │   ├── [d.mp3](./public/audio/3/d.mp3)
│   │   │   ├── [ds.mp3](./public/audio/3/ds.mp3)
│   │   │   ├── [e.mp3](./public/audio/3/e.mp3)
│   │   │   ├── [f.mp3](./public/audio/3/f.mp3)
│   │   │   ├── [fs.mp3](./public/audio/3/fs.mp3)
│   │   │   ├── [g.mp3](./public/audio/3/g.mp3)
│   │   │   └── [gs.mp3](./public/audio/3/gs.mp3)
│   │   └── 4/
│   │       └── [c.mp3](./public/audio/4/c.mp3)
│   ├── data/
│   │   └── [words.json](./public/data/words.json)
│   ├── icons/
│   │   ├── [icon-128x128.png](./public/icons/icon-128x128.png)
│   │   ├── [icon-144x144.png](./public/icons/icon-144x144.png)
│   │   ├── [icon-152x152.png](./public/icons/icon-152x152.png)
│   │   ├── [icon-16x16.png](./public/icons/icon-16x16.png)
│   │   ├── [icon-180x180.png](./public/icons/icon-180x180.png)
│   │   ├── [icon-192x192.png](./public/icons/icon-192x192.png)
│   │   ├── [icon-256x256.png](./public/icons/icon-256x256.png)
│   │   ├── [icon-32x32.png](./public/icons/icon-32x32.png)
│   │   ├── [icon-384x384.png](./public/icons/icon-384x384.png)
│   │   ├── [icon-48x48.png](./public/icons/icon-48x48.png)
│   │   ├── [icon-512x512.png](./public/icons/icon-512x512.png)
│   │   ├── [icon-64x64.png](./public/icons/icon-64x64.png)
│   │   ├── [icon-72x72.png](./public/icons/icon-72x72.png)
│   │   ├── [icon-96x96.png](./public/icons/icon-96x96.png)
│   │   └── [icon.svg](./public/icons/icon.svg)
│   ├── models/
│   │   └── [sign-model.onnx](./public/models/sign-model.onnx)
│   ├── [apple-touch-icon.png](./public/apple-touch-icon.png)
│   ├── [favicon.ico](./public/favicon.ico)
│   ├── [manifest.json](./public/manifest.json)
│   ├── [robots.txt](./public/robots.txt)
│   ├── [sitemap.xml](./public/sitemap.xml)
│   └── [sw.js](./public/sw.js)
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── forget-password/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(auth)/forget-password/page.tsx)
│   │   │   ├── profile/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(auth)/profile/page.tsx)
│   │   │   ├── reset-password/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(auth)/reset-password/page.tsx)
│   │   │   ├── sign-in/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(auth)/sign-in/page.tsx)
│   │   │   └── sign-up/
│   │   │       ├── __tests__/
│   │   │       │   └── [page.test.tsx](./src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │       └── [page.tsx](./src/app/(auth)/sign-up/page.tsx)
│   │   ├── (games)/
│   │   │   ├── (arts)/
│   │   │   │   ├── colors/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(games)/(arts)/colors/__tests__/page.test.tsx)
│   │   │   │   │   ├── css/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./src/app/(games)/(arts)/colors/css/__tests__/page.test.tsx)
│   │   │   │   │   │   ├── gradient/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [page.test.tsx](./src/app/(games)/(arts)/colors/css/gradient/__tests__/page.test.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(arts)/colors/css/gradient/page.tsx)
│   │   │   │   │   │   ├── palette/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [page.test.tsx](./src/app/(games)/(arts)/colors/css/palette/__tests__/page.test.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(arts)/colors/css/palette/page.tsx)
│   │   │   │   │   │   ├── theme/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [page.test.tsx](./src/app/(games)/(arts)/colors/css/theme/__tests__/page.test.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(arts)/colors/css/theme/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(arts)/colors/css/page.tsx)
│   │   │   │   │   ├── harmony/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./src/app/(games)/(arts)/colors/harmony/__tests__/page.test.tsx)
│   │   │   │   │   │   ├── mixer/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [page.test.tsx](./src/app/(games)/(arts)/colors/harmony/mixer/__tests__/page.test.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(arts)/colors/harmony/mixer/page.tsx)
│   │   │   │   │   │   ├── schemes/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [page.test.tsx](./src/app/(games)/(arts)/colors/harmony/schemes/__tests__/page.test.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(arts)/colors/harmony/schemes/page.tsx)
│   │   │   │   │   │   ├── wheel/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [page.test.tsx](./src/app/(games)/(arts)/colors/harmony/wheel/__tests__/page.test.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(arts)/colors/harmony/wheel/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(arts)/colors/harmony/page.tsx)
│   │   │   │   │   ├── models/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./src/app/(games)/(arts)/colors/models/__tests__/page.test.tsx)
│   │   │   │   │   │   ├── adjuster/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [page.test.tsx](./src/app/(games)/(arts)/colors/models/adjuster/__tests__/page.test.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(arts)/colors/models/adjuster/page.tsx)
│   │   │   │   │   │   ├── converter/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [page.test.tsx](./src/app/(games)/(arts)/colors/models/converter/__tests__/page.test.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(arts)/colors/models/converter/page.tsx)
│   │   │   │   │   │   ├── random/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [page.test.tsx](./src/app/(games)/(arts)/colors/models/random/__tests__/page.test.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(arts)/colors/models/random/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(arts)/colors/models/page.tsx)
│   │   │   │   │   ├── perception/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./src/app/(games)/(arts)/colors/perception/__tests__/page.test.tsx)
│   │   │   │   │   │   ├── color-blindness/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [page.test.tsx](./src/app/(games)/(arts)/colors/perception/color-blindness/__tests__/page.test.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(arts)/colors/perception/color-blindness/page.tsx)
│   │   │   │   │   │   ├── contrast/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [page.test.tsx](./src/app/(games)/(arts)/colors/perception/contrast/__tests__/page.test.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(arts)/colors/perception/contrast/page.tsx)
│   │   │   │   │   │   ├── temperature/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [page.test.tsx](./src/app/(games)/(arts)/colors/perception/temperature/__tests__/page.test.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(arts)/colors/perception/temperature/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(arts)/colors/perception/page.tsx)
│   │   │   │   │   ├── scales/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./src/app/(games)/(arts)/colors/scales/__tests__/page.test.tsx)
│   │   │   │   │   │   ├── css-scale/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [page.test.tsx](./src/app/(games)/(arts)/colors/scales/css-scale/__tests__/page.test.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(arts)/colors/scales/css-scale/page.tsx)
│   │   │   │   │   │   ├── opacity/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [page.test.tsx](./src/app/(games)/(arts)/colors/scales/opacity/__tests__/page.test.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(arts)/colors/scales/opacity/page.tsx)
│   │   │   │   │   │   ├── shades-tints/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [page.test.tsx](./src/app/(games)/(arts)/colors/scales/shades-tints/__tests__/page.test.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(arts)/colors/scales/shades-tints/page.tsx)
│   │   │   │   │   │   ├── tint-shade-tone/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [page.test.tsx](./src/app/(games)/(arts)/colors/scales/tint-shade-tone/__tests__/page.test.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(arts)/colors/scales/tint-shade-tone/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(arts)/colors/scales/page.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(games)/(arts)/colors/page.tsx)
│   │   │   │   └── music/
│   │   │   │       ├── pitch/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./src/app/(games)/(arts)/music/pitch/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./src/app/(games)/(arts)/music/pitch/page.tsx)
│   │   │   │       └── [page.tsx](./src/app/(games)/(arts)/music/page.tsx)
│   │   │   ├── (health)/
│   │   │   │   ├── ophthalmology/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(games)/(health)/ophthalmology/__tests__/page.test.tsx)
│   │   │   │   │   ├── vision/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./src/app/(games)/(health)/ophthalmology/vision/__tests__/page.test.tsx)
│   │   │   │   │   │   ├── logmar/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [page.test.tsx](./src/app/(games)/(health)/ophthalmology/vision/logmar/__tests__/page.test.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(health)/ophthalmology/vision/logmar/page.tsx)
│   │   │   │   │   │   ├── snellen/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [page.test.tsx](./src/app/(games)/(health)/ophthalmology/vision/snellen/__tests__/page.test.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(health)/ophthalmology/vision/snellen/page.tsx)
│   │   │   │   │   │   ├── tumbling-e/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [page.test.tsx](./src/app/(games)/(health)/ophthalmology/vision/tumbling-e/__tests__/page.test.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(health)/ophthalmology/vision/tumbling-e/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(health)/ophthalmology/vision/page.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(games)/(health)/ophthalmology/page.tsx)
│   │   │   │   └── psychology/
│   │   │   │       ├── (practices)/
│   │   │   │       │   ├── counselling/
│   │   │   │       │   │   ├── __tests__/
│   │   │   │       │   │   │   └── [page.test.tsx](./src/app/(games)/(health)/psychology/(practices)/counselling/__tests__/page.test.tsx)
│   │   │   │       │   │   └── [page.tsx](./src/app/(games)/(health)/psychology/(practices)/counselling/page.tsx)
│   │   │   │       │   ├── journaling/
│   │   │   │       │   │   ├── __tests__/
│   │   │   │       │   │   │   └── [page.test.tsx](./src/app/(games)/(health)/psychology/(practices)/journaling/__tests__/page.test.tsx)
│   │   │   │       │   │   └── [page.tsx](./src/app/(games)/(health)/psychology/(practices)/journaling/page.tsx)
│   │   │   │       │   └── mindfulness/
│   │   │   │       │       ├── __tests__/
│   │   │   │       │       │   └── [page.test.tsx](./src/app/(games)/(health)/psychology/(practices)/mindfulness/__tests__/page.test.tsx)
│   │   │   │       │       └── [page.tsx](./src/app/(games)/(health)/psychology/(practices)/mindfulness/page.tsx)
│   │   │   │       ├── (scales)/
│   │   │   │       │   ├── beck-depression-inventory/
│   │   │   │       │   │   └── [page.tsx](./src/app/(games)/(health)/psychology/(scales)/beck-depression-inventory/page.tsx)
│   │   │   │       │   ├── big-five-inventory/
│   │   │   │       │   │   └── [page.tsx](./src/app/(games)/(health)/psychology/(scales)/big-five-inventory/page.tsx)
│   │   │   │       │   ├── dyadic-adjustment-scale/
│   │   │   │       │   │   └── [page.tsx](./src/app/(games)/(health)/psychology/(scales)/dyadic-adjustment-scale/page.tsx)
│   │   │   │       │   ├── experiences-in-close-relationships/
│   │   │   │       │   │   └── [page.tsx](./src/app/(games)/(health)/psychology/(scales)/experiences-in-close-relationships/page.tsx)
│   │   │   │       │   ├── generalized-anxiety-disorder/
│   │   │   │       │   │   └── [page.tsx](./src/app/(games)/(health)/psychology/(scales)/generalized-anxiety-disorder/page.tsx)
│   │   │   │       │   ├── patient-health-questionnaire/
│   │   │   │       │   │   └── [page.tsx](./src/app/(games)/(health)/psychology/(scales)/patient-health-questionnaire/page.tsx)
│   │   │   │       │   ├── relationship-closeness-inventory/
│   │   │   │       │   │   └── [page.tsx](./src/app/(games)/(health)/psychology/(scales)/relationship-closeness-inventory/page.tsx)
│   │   │   │       │   └── satisfaction-with-life/
│   │   │   │       │       └── [page.tsx](./src/app/(games)/(health)/psychology/(scales)/satisfaction-with-life/page.tsx)
│   │   │   │       ├── (theory)/
│   │   │   │       │   ├── biology/
│   │   │   │       │   │   ├── __tests__/
│   │   │   │       │   │   │   └── [page.test.tsx](./src/app/(games)/(health)/psychology/(theory)/biology/__tests__/page.test.tsx)
│   │   │   │       │   │   └── [page.tsx](./src/app/(games)/(health)/psychology/(theory)/biology/page.tsx)
│   │   │   │       │   ├── cognitive/
│   │   │   │       │   │   ├── __tests__/
│   │   │   │       │   │   │   └── [page.test.tsx](./src/app/(games)/(health)/psychology/(theory)/cognitive/__tests__/page.test.tsx)
│   │   │   │       │   │   └── [page.tsx](./src/app/(games)/(health)/psychology/(theory)/cognitive/page.tsx)
│   │   │   │       │   ├── developmental/
│   │   │   │       │   │   ├── __tests__/
│   │   │   │       │   │   │   └── [page.test.tsx](./src/app/(games)/(health)/psychology/(theory)/developmental/__tests__/page.test.tsx)
│   │   │   │       │   │   └── [page.tsx](./src/app/(games)/(health)/psychology/(theory)/developmental/page.tsx)
│   │   │   │       │   └── social/
│   │   │   │       │       ├── __tests__/
│   │   │   │       │       │   └── [page.test.tsx](./src/app/(games)/(health)/psychology/(theory)/social/__tests__/page.test.tsx)
│   │   │   │       │       └── [page.tsx](./src/app/(games)/(health)/psychology/(theory)/social/page.tsx)
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./src/app/(games)/(health)/psychology/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./src/app/(games)/(health)/psychology/page.tsx)
│   │   │   ├── (humanities)/
│   │   │   │   ├── economics/
│   │   │   │   │   ├── (behavioral-economics)/
│   │   │   │   │   │   ├── behavioral-finance/
│   │   │   │   │   │   │   ├── bubble/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(behavioral-economics)/behavioral-finance/bubble/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(behavioral-economics)/behavioral-finance/page.tsx)
│   │   │   │   │   │   ├── behavioral-heuristics/
│   │   │   │   │   │   │   ├── lab/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(behavioral-economics)/behavioral-heuristics/lab/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(behavioral-economics)/behavioral-heuristics/page.tsx)
│   │   │   │   │   │   ├── endowment-effect/
│   │   │   │   │   │   │   ├── trade/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(behavioral-economics)/endowment-effect/trade/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(behavioral-economics)/endowment-effect/page.tsx)
│   │   │   │   │   │   ├── mental-accounting/
│   │   │   │   │   │   │   ├── scenarios/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(behavioral-economics)/mental-accounting/scenarios/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(behavioral-economics)/mental-accounting/page.tsx)
│   │   │   │   │   │   ├── nudge-and-behavioral-economics/
│   │   │   │   │   │   │   ├── choice/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(behavioral-economics)/nudge-and-behavioral-economics/choice/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(behavioral-economics)/nudge-and-behavioral-economics/page.tsx)
│   │   │   │   │   │   ├── overconfidence-bias/
│   │   │   │   │   │   │   ├── calibration/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(behavioral-economics)/overconfidence-bias/calibration/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(behavioral-economics)/overconfidence-bias/page.tsx)
│   │   │   │   │   │   ├── prospect-theory/
│   │   │   │   │   │   │   ├── framing/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(behavioral-economics)/prospect-theory/framing/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(behavioral-economics)/prospect-theory/page.tsx)
│   │   │   │   │   │   ├── social-preferences/
│   │   │   │   │   │   │   ├── dictator/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(behavioral-economics)/social-preferences/dictator/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(behavioral-economics)/social-preferences/page.tsx)
│   │   │   │   │   │   └── time-inconsistency/
│   │   │   │   │   │       ├── savings/
│   │   │   │   │   │       │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(behavioral-economics)/time-inconsistency/savings/page.tsx)
│   │   │   │   │   │       └── [page.tsx](./src/app/(games)/(humanities)/economics/(behavioral-economics)/time-inconsistency/page.tsx)
│   │   │   │   │   ├── (game-theory)/
│   │   │   │   │   │   ├── auction-theory/
│   │   │   │   │   │   │   ├── auction/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(game-theory)/auction-theory/auction/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(game-theory)/auction-theory/page.tsx)
│   │   │   │   │   │   ├── backward-induction/
│   │   │   │   │   │   │   ├── rollback/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(game-theory)/backward-induction/rollback/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(game-theory)/backward-induction/page.tsx)
│   │   │   │   │   │   ├── bargaining-theory/
│   │   │   │   │   │   │   ├── ultimatum/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(game-theory)/bargaining-theory/ultimatum/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(game-theory)/bargaining-theory/page.tsx)
│   │   │   │   │   │   ├── bayesian-updating/
│   │   │   │   │   │   │   ├── monty-hall/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(game-theory)/bayesian-updating/monty-hall/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(game-theory)/bayesian-updating/page.tsx)
│   │   │   │   │   │   ├── coordination-games/
│   │   │   │   │   │   │   ├── stag-hunt/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(game-theory)/coordination-games/stag-hunt/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(game-theory)/coordination-games/page.tsx)
│   │   │   │   │   │   ├── evolutionary-game-theory/
│   │   │   │   │   │   │   ├── replicator/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(game-theory)/evolutionary-game-theory/replicator/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(game-theory)/evolutionary-game-theory/page.tsx)
│   │   │   │   │   │   ├── game-theory-basics/
│   │   │   │   │   │   │   ├── matrix/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(game-theory)/game-theory-basics/matrix/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(game-theory)/game-theory-basics/page.tsx)
│   │   │   │   │   │   ├── mechanism-design/
│   │   │   │   │   │   │   ├── reveal/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(game-theory)/mechanism-design/reveal/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(game-theory)/mechanism-design/page.tsx)
│   │   │   │   │   │   ├── nash-equilibrium/
│   │   │   │   │   │   │   ├── solve/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(game-theory)/nash-equilibrium/solve/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(game-theory)/nash-equilibrium/page.tsx)
│   │   │   │   │   │   ├── prisoners-dilemma/
│   │   │   │   │   │   │   ├── bots/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(game-theory)/prisoners-dilemma/bots/page.tsx)
│   │   │   │   │   │   │   ├── simulation/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(game-theory)/prisoners-dilemma/simulation/page.tsx)
│   │   │   │   │   │   │   ├── versus/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(game-theory)/prisoners-dilemma/versus/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(game-theory)/prisoners-dilemma/page.tsx)
│   │   │   │   │   │   ├── repeated-games/
│   │   │   │   │   │   │   ├── tournament/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(game-theory)/repeated-games/tournament/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(game-theory)/repeated-games/page.tsx)
│   │   │   │   │   │   ├── signaling/
│   │   │   │   │   │   │   ├── job-market/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(game-theory)/signaling/job-market/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(game-theory)/signaling/page.tsx)
│   │   │   │   │   │   └── zero-sum-games/
│   │   │   │   │   │       ├── rps/
│   │   │   │   │   │       │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(game-theory)/zero-sum-games/rps/page.tsx)
│   │   │   │   │   │       └── [page.tsx](./src/app/(games)/(humanities)/economics/(game-theory)/zero-sum-games/page.tsx)
│   │   │   │   │   ├── (macroeconomics)/
│   │   │   │   │   │   ├── aggregate-demand-supply/
│   │   │   │   │   │   │   ├── shocks/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(macroeconomics)/aggregate-demand-supply/shocks/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(macroeconomics)/aggregate-demand-supply/page.tsx)
│   │   │   │   │   │   ├── business-cycles/
│   │   │   │   │   │   │   ├── predict/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(macroeconomics)/business-cycles/predict/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(macroeconomics)/business-cycles/page.tsx)
│   │   │   │   │   │   ├── development-rcts/
│   │   │   │   │   │   │   ├── experiment/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(macroeconomics)/development-rcts/experiment/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(macroeconomics)/development-rcts/page.tsx)
│   │   │   │   │   │   ├── economic-inequality/
│   │   │   │   │   │   │   ├── lorenz/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(macroeconomics)/economic-inequality/lorenz/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(macroeconomics)/economic-inequality/page.tsx)
│   │   │   │   │   │   ├── fiscal-policy/
│   │   │   │   │   │   │   ├── stimulus/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(macroeconomics)/fiscal-policy/stimulus/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(macroeconomics)/fiscal-policy/page.tsx)
│   │   │   │   │   │   ├── gdp-and-national-accounts/
│   │   │   │   │   │   │   ├── aggregate/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(macroeconomics)/gdp-and-national-accounts/aggregate/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(macroeconomics)/gdp-and-national-accounts/page.tsx)
│   │   │   │   │   │   ├── institutions-and-growth/
│   │   │   │   │   │   │   ├── lab/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(macroeconomics)/institutions-and-growth/lab/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(macroeconomics)/institutions-and-growth/page.tsx)
│   │   │   │   │   │   ├── is-lm-model/
│   │   │   │   │   │   │   ├── equilibrium/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(macroeconomics)/is-lm-model/equilibrium/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(macroeconomics)/is-lm-model/page.tsx)
│   │   │   │   │   │   ├── keynesian-economics/
│   │   │   │   │   │   │   ├── cross/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(macroeconomics)/keynesian-economics/cross/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(macroeconomics)/keynesian-economics/page.tsx)
│   │   │   │   │   │   ├── migration-economics/
│   │   │   │   │   │   │   ├── moves/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(macroeconomics)/migration-economics/moves/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(macroeconomics)/migration-economics/page.tsx)
│   │   │   │   │   │   ├── monetary-policy/
│   │   │   │   │   │   │   ├── interest/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(macroeconomics)/monetary-policy/interest/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(macroeconomics)/monetary-policy/page.tsx)
│   │   │   │   │   │   ├── phillips-curve/
│   │   │   │   │   │   │   ├── tradeoff/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(macroeconomics)/phillips-curve/tradeoff/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(macroeconomics)/phillips-curve/page.tsx)
│   │   │   │   │   │   ├── poverty-traps/
│   │   │   │   │   │   │   ├── escape/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(macroeconomics)/poverty-traps/escape/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(macroeconomics)/poverty-traps/page.tsx)
│   │   │   │   │   │   ├── trade-and-tariffs/
│   │   │   │   │   │   │   ├── lab/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(macroeconomics)/trade-and-tariffs/lab/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(macroeconomics)/trade-and-tariffs/page.tsx)
│   │   │   │   │   │   └── unemployment-okuns-law/
│   │   │   │   │   │       ├── lab/
│   │   │   │   │   │       │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(macroeconomics)/unemployment-okuns-law/lab/page.tsx)
│   │   │   │   │   │       └── [page.tsx](./src/app/(games)/(humanities)/economics/(macroeconomics)/unemployment-okuns-law/page.tsx)
│   │   │   │   │   ├── (markets-and-public-policy)/
│   │   │   │   │   │   ├── adverse-selection/
│   │   │   │   │   │   │   ├── lemons/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(markets-and-public-policy)/adverse-selection/lemons/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(markets-and-public-policy)/adverse-selection/page.tsx)
│   │   │   │   │   │   ├── arbitrage/
│   │   │   │   │   │   │   ├── triangular/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(markets-and-public-policy)/arbitrage/triangular/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(markets-and-public-policy)/arbitrage/page.tsx)
│   │   │   │   │   │   ├── capm-and-risk/
│   │   │   │   │   │   │   ├── portfolio/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(markets-and-public-policy)/capm-and-risk/portfolio/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(markets-and-public-policy)/capm-and-risk/page.tsx)
│   │   │   │   │   │   ├── efficient-market-hypothesis/
│   │   │   │   │   │   │   ├── random-walk/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(markets-and-public-policy)/efficient-market-hypothesis/random-walk/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(markets-and-public-policy)/efficient-market-hypothesis/page.tsx)
│   │   │   │   │   │   ├── externalities/
│   │   │   │   │   │   │   ├── pigou/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(markets-and-public-policy)/externalities/pigou/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(markets-and-public-policy)/externalities/page.tsx)
│   │   │   │   │   │   ├── market-failures/
│   │   │   │   │   │   │   ├── policies/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(markets-and-public-policy)/market-failures/policies/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(markets-and-public-policy)/market-failures/page.tsx)
│   │   │   │   │   │   ├── market-microstructure/
│   │   │   │   │   │   │   ├── order-book/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(markets-and-public-policy)/market-microstructure/order-book/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(markets-and-public-policy)/market-microstructure/page.tsx)
│   │   │   │   │   │   ├── moral-hazard/
│   │   │   │   │   │   │   ├── insurance/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(markets-and-public-policy)/moral-hazard/insurance/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(markets-and-public-policy)/moral-hazard/page.tsx)
│   │   │   │   │   │   ├── portfolio-theory/
│   │   │   │   │   │   │   ├── frontier/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(markets-and-public-policy)/portfolio-theory/frontier/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(markets-and-public-policy)/portfolio-theory/page.tsx)
│   │   │   │   │   │   ├── public-choice/
│   │   │   │   │   │   │   ├── voting/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(markets-and-public-policy)/public-choice/voting/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(markets-and-public-policy)/public-choice/page.tsx)
│   │   │   │   │   │   ├── public-goods-dilemma/
│   │   │   │   │   │   │   ├── contribute/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(markets-and-public-policy)/public-goods-dilemma/contribute/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(markets-and-public-policy)/public-goods-dilemma/page.tsx)
│   │   │   │   │   │   ├── time-value-of-money/
│   │   │   │   │   │   │   ├── lab/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(markets-and-public-policy)/time-value-of-money/lab/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(markets-and-public-policy)/time-value-of-money/page.tsx)
│   │   │   │   │   │   └── tragedy-of-the-commons/
│   │   │   │   │   │       ├── harvest/
│   │   │   │   │   │       │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(markets-and-public-policy)/tragedy-of-the-commons/harvest/page.tsx)
│   │   │   │   │   │       └── [page.tsx](./src/app/(games)/(humanities)/economics/(markets-and-public-policy)/tragedy-of-the-commons/page.tsx)
│   │   │   │   │   ├── (microeconomics)/
│   │   │   │   │   │   ├── causal-inference/
│   │   │   │   │   │   │   ├── experiments/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(microeconomics)/causal-inference/experiments/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(microeconomics)/causal-inference/page.tsx)
│   │   │   │   │   │   ├── consumer-theory/
│   │   │   │   │   │   │   ├── utility/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(microeconomics)/consumer-theory/utility/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(microeconomics)/consumer-theory/page.tsx)
│   │   │   │   │   │   ├── elasticity/
│   │   │   │   │   │   │   ├── pricing/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(microeconomics)/elasticity/pricing/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(microeconomics)/elasticity/page.tsx)
│   │   │   │   │   │   ├── human-capital/
│   │   │   │   │   │   │   ├── decision/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(microeconomics)/human-capital/decision/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(microeconomics)/human-capital/page.tsx)
│   │   │   │   │   │   ├── imperfect-competition/
│   │   │   │   │   │   │   ├── lab/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(microeconomics)/imperfect-competition/lab/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(microeconomics)/imperfect-competition/page.tsx)
│   │   │   │   │   │   ├── labor-markets/
│   │   │   │   │   │   │   ├── wage/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(microeconomics)/labor-markets/wage/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(microeconomics)/labor-markets/page.tsx)
│   │   │   │   │   │   ├── marginal-utility/
│   │   │   │   │   │   │   ├── lab/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(microeconomics)/marginal-utility/lab/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(microeconomics)/marginal-utility/page.tsx)
│   │   │   │   │   │   ├── monopoly-and-market-power/
│   │   │   │   │   │   │   ├── pricing/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(microeconomics)/monopoly-and-market-power/pricing/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(microeconomics)/monopoly-and-market-power/page.tsx)
│   │   │   │   │   │   ├── oligopoly/
│   │   │   │   │   │   │   ├── cournot/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(microeconomics)/oligopoly/cournot/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(microeconomics)/oligopoly/page.tsx)
│   │   │   │   │   │   ├── opportunity-cost/
│   │   │   │   │   │   │   ├── trade-offs/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(microeconomics)/opportunity-cost/trade-offs/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(microeconomics)/opportunity-cost/page.tsx)
│   │   │   │   │   │   ├── perfect-competition/
│   │   │   │   │   │   │   ├── firm/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(microeconomics)/perfect-competition/firm/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(microeconomics)/perfect-competition/page.tsx)
│   │   │   │   │   │   ├── price-discrimination/
│   │   │   │   │   │   │   ├── split/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(microeconomics)/price-discrimination/split/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(microeconomics)/price-discrimination/page.tsx)
│   │   │   │   │   │   ├── production-and-costs/
│   │   │   │   │   │   │   ├── lab/
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(microeconomics)/production-and-costs/lab/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(microeconomics)/production-and-costs/page.tsx)
│   │   │   │   │   │   └── supply-and-demand/
│   │   │   │   │   │       ├── price-lab/
│   │   │   │   │   │       │   └── [page.tsx](./src/app/(games)/(humanities)/economics/(microeconomics)/supply-and-demand/price-lab/page.tsx)
│   │   │   │   │   │       └── [page.tsx](./src/app/(games)/(humanities)/economics/(microeconomics)/supply-and-demand/page.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/economics/page.tsx)
│   │   │   │   ├── geography/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(games)/(humanities)/geography/__tests__/page.test.tsx)
│   │   │   │   │   ├── connections/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./src/app/(games)/(humanities)/geography/connections/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/geography/connections/page.tsx)
│   │   │   │   │   ├── guess/
│   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/geography/guess/page.tsx)
│   │   │   │   │   ├── higher-or-lower/
│   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/geography/higher-or-lower/page.tsx)
│   │   │   │   │   ├── sort-continents/
│   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/geography/sort-continents/page.tsx)
│   │   │   │   │   ├── wordle/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./src/app/(games)/(humanities)/geography/wordle/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/geography/wordle/page.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/geography/page.tsx)
│   │   │   │   ├── history/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(games)/(humanities)/history/__tests__/page.test.tsx)
│   │   │   │   │   ├── myth-vs-fact/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./src/app/(games)/(humanities)/history/myth-vs-fact/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/history/myth-vs-fact/page.tsx)
│   │   │   │   │   ├── through-the-years/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./src/app/(games)/(humanities)/history/through-the-years/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/history/through-the-years/page.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(games)/(humanities)/history/page.tsx)
│   │   │   │   └── languages/
│   │   │   │       ├── [language]/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./src/app/(games)/(humanities)/languages/[language]/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./src/app/(games)/(humanities)/languages/[language]/page.tsx)
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./src/app/(games)/(humanities)/languages/__tests__/page.test.tsx)
│   │   │   │       ├── english/
│   │   │   │       │   └── [page.tsx](./src/app/(games)/(humanities)/languages/english/page.tsx)
│   │   │   │       ├── sign/
│   │   │   │       │   └── [page.tsx](./src/app/(games)/(humanities)/languages/sign/page.tsx)
│   │   │   │       └── [page.tsx](./src/app/(games)/(humanities)/languages/page.tsx)
│   │   │   └── (stem)/
│   │   │       ├── chemistry/
│   │   │       │   ├── periodic-table/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   └── [page.test.tsx](./src/app/(games)/(stem)/chemistry/periodic-table/__tests__/page.test.tsx)
│   │   │       │   │   └── [page.tsx](./src/app/(games)/(stem)/chemistry/periodic-table/page.tsx)
│   │   │       │   └── [page.tsx](./src/app/(games)/(stem)/chemistry/page.tsx)
│   │   │       ├── engineering/
│   │   │       │   ├── (algorithms)/
│   │   │       │   │   ├── binary-search/
│   │   │       │   │   │   ├── interactive/
│   │   │       │   │   │   │   └── [page.tsx](./src/app/(games)/(stem)/engineering/(algorithms)/binary-search/interactive/page.tsx)
│   │   │       │   │   │   └── [page.tsx](./src/app/(games)/(stem)/engineering/(algorithms)/binary-search/page.tsx)
│   │   │       │   │   ├── bubble-sort/
│   │   │       │   │   │   ├── interactive/
│   │   │       │   │   │   │   └── [page.tsx](./src/app/(games)/(stem)/engineering/(algorithms)/bubble-sort/interactive/page.tsx)
│   │   │       │   │   │   └── [page.tsx](./src/app/(games)/(stem)/engineering/(algorithms)/bubble-sort/page.tsx)
│   │   │       │   │   ├── heap-sort/
│   │   │       │   │   │   ├── interactive/
│   │   │       │   │   │   │   └── [page.tsx](./src/app/(games)/(stem)/engineering/(algorithms)/heap-sort/interactive/page.tsx)
│   │   │       │   │   │   └── [page.tsx](./src/app/(games)/(stem)/engineering/(algorithms)/heap-sort/page.tsx)
│   │   │       │   │   ├── insertion-sort/
│   │   │       │   │   │   ├── interactive/
│   │   │       │   │   │   │   └── [page.tsx](./src/app/(games)/(stem)/engineering/(algorithms)/insertion-sort/interactive/page.tsx)
│   │   │       │   │   │   └── [page.tsx](./src/app/(games)/(stem)/engineering/(algorithms)/insertion-sort/page.tsx)
│   │   │       │   │   ├── linear-search/
│   │   │       │   │   │   ├── interactive/
│   │   │       │   │   │   │   └── [page.tsx](./src/app/(games)/(stem)/engineering/(algorithms)/linear-search/interactive/page.tsx)
│   │   │       │   │   │   └── [page.tsx](./src/app/(games)/(stem)/engineering/(algorithms)/linear-search/page.tsx)
│   │   │       │   │   ├── merge-sort/
│   │   │       │   │   │   ├── interactive/
│   │   │       │   │   │   │   └── [page.tsx](./src/app/(games)/(stem)/engineering/(algorithms)/merge-sort/interactive/page.tsx)
│   │   │       │   │   │   └── [page.tsx](./src/app/(games)/(stem)/engineering/(algorithms)/merge-sort/page.tsx)
│   │   │       │   │   ├── quick-sort/
│   │   │       │   │   │   ├── interactive/
│   │   │       │   │   │   │   └── [page.tsx](./src/app/(games)/(stem)/engineering/(algorithms)/quick-sort/interactive/page.tsx)
│   │   │       │   │   │   └── [page.tsx](./src/app/(games)/(stem)/engineering/(algorithms)/quick-sort/page.tsx)
│   │   │       │   │   └── selection-sort/
│   │   │       │   │       ├── interactive/
│   │   │       │   │       │   └── [page.tsx](./src/app/(games)/(stem)/engineering/(algorithms)/selection-sort/interactive/page.tsx)
│   │   │       │   │       └── [page.tsx](./src/app/(games)/(stem)/engineering/(algorithms)/selection-sort/page.tsx)
│   │   │       │   ├── (data-structures)/
│   │   │       │   │   ├── array/
│   │   │       │   │   │   ├── interactive/
│   │   │       │   │   │   │   └── [page.tsx](./src/app/(games)/(stem)/engineering/(data-structures)/array/interactive/page.tsx)
│   │   │       │   │   │   └── [page.tsx](./src/app/(games)/(stem)/engineering/(data-structures)/array/page.tsx)
│   │   │       │   │   ├── disjoint-set/
│   │   │       │   │   │   ├── interactive/
│   │   │       │   │   │   │   └── [page.tsx](./src/app/(games)/(stem)/engineering/(data-structures)/disjoint-set/interactive/page.tsx)
│   │   │       │   │   │   └── [page.tsx](./src/app/(games)/(stem)/engineering/(data-structures)/disjoint-set/page.tsx)
│   │   │       │   │   ├── fenwick-trees/
│   │   │       │   │   │   ├── interactive/
│   │   │       │   │   │   │   └── [page.tsx](./src/app/(games)/(stem)/engineering/(data-structures)/fenwick-trees/interactive/page.tsx)
│   │   │       │   │   │   └── [page.tsx](./src/app/(games)/(stem)/engineering/(data-structures)/fenwick-trees/page.tsx)
│   │   │       │   │   ├── hash-tables/
│   │   │       │   │   │   ├── interactive/
│   │   │       │   │   │   │   └── [page.tsx](./src/app/(games)/(stem)/engineering/(data-structures)/hash-tables/interactive/page.tsx)
│   │   │       │   │   │   └── [page.tsx](./src/app/(games)/(stem)/engineering/(data-structures)/hash-tables/page.tsx)
│   │   │       │   │   ├── linked-lists/
│   │   │       │   │   │   ├── interactive/
│   │   │       │   │   │   │   └── [page.tsx](./src/app/(games)/(stem)/engineering/(data-structures)/linked-lists/interactive/page.tsx)
│   │   │       │   │   │   └── [page.tsx](./src/app/(games)/(stem)/engineering/(data-structures)/linked-lists/page.tsx)
│   │   │       │   │   ├── queues/
│   │   │       │   │   │   ├── interactive/
│   │   │       │   │   │   │   └── [page.tsx](./src/app/(games)/(stem)/engineering/(data-structures)/queues/interactive/page.tsx)
│   │   │       │   │   │   └── [page.tsx](./src/app/(games)/(stem)/engineering/(data-structures)/queues/page.tsx)
│   │   │       │   │   ├── segment-trees/
│   │   │       │   │   │   ├── interactive/
│   │   │       │   │   │   │   └── [page.tsx](./src/app/(games)/(stem)/engineering/(data-structures)/segment-trees/interactive/page.tsx)
│   │   │       │   │   │   └── [page.tsx](./src/app/(games)/(stem)/engineering/(data-structures)/segment-trees/page.tsx)
│   │   │       │   │   ├── stacks/
│   │   │       │   │   │   ├── interactive/
│   │   │       │   │   │   │   └── [page.tsx](./src/app/(games)/(stem)/engineering/(data-structures)/stacks/interactive/page.tsx)
│   │   │       │   │   │   └── [page.tsx](./src/app/(games)/(stem)/engineering/(data-structures)/stacks/page.tsx)
│   │   │       │   │   ├── suffix-arrays/
│   │   │       │   │   │   ├── interactive/
│   │   │       │   │   │   │   └── [page.tsx](./src/app/(games)/(stem)/engineering/(data-structures)/suffix-arrays/interactive/page.tsx)
│   │   │       │   │   │   └── [page.tsx](./src/app/(games)/(stem)/engineering/(data-structures)/suffix-arrays/page.tsx)
│   │   │       │   │   └── trie/
│   │   │       │   │       ├── interactive/
│   │   │       │   │       │   └── [page.tsx](./src/app/(games)/(stem)/engineering/(data-structures)/trie/interactive/page.tsx)
│   │   │       │   │       └── [page.tsx](./src/app/(games)/(stem)/engineering/(data-structures)/trie/page.tsx)
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.tsx](./src/app/(games)/(stem)/engineering/__tests__/page.tsx)
│   │   │       │   └── [page.tsx](./src/app/(games)/(stem)/engineering/page.tsx)
│   │   │       ├── maths/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(games)/(stem)/maths/__tests__/page.test.tsx)
│   │   │       │   ├── attractors/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   └── [page.test.tsx](./src/app/(games)/(stem)/maths/attractors/__tests__/page.test.tsx)
│   │   │       │   │   └── [page.tsx](./src/app/(games)/(stem)/maths/attractors/page.tsx)
│   │   │       │   ├── cyclic/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   └── [page.test.tsx](./src/app/(games)/(stem)/maths/cyclic/__tests__/page.test.tsx)
│   │   │       │   │   └── [page.tsx](./src/app/(games)/(stem)/maths/cyclic/page.tsx)
│   │   │       │   ├── fibonacci-sequence/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   └── [page.test.tsx](./src/app/(games)/(stem)/maths/fibonacci-sequence/__tests__/page.test.tsx)
│   │   │       │   │   └── [page.tsx](./src/app/(games)/(stem)/maths/fibonacci-sequence/page.tsx)
│   │   │       │   ├── kaprekar-constant/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   └── [page.test.tsx](./src/app/(games)/(stem)/maths/kaprekar-constant/__tests__/page.test.tsx)
│   │   │       │   │   └── [page.tsx](./src/app/(games)/(stem)/maths/kaprekar-constant/page.tsx)
│   │   │       │   ├── prime-numbers/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   └── [page.test.tsx](./src/app/(games)/(stem)/maths/prime-numbers/__tests__/page.test.tsx)
│   │   │       │   │   └── [page.tsx](./src/app/(games)/(stem)/maths/prime-numbers/page.tsx)
│   │   │       │   └── [page.tsx](./src/app/(games)/(stem)/maths/page.tsx)
│   │   │       └── neuroscience/
│   │   │           ├── (anatomy)/
│   │   │           │   └── brain-atlas/
│   │   │           │       ├── __tests__/
│   │   │           │       │   └── [page.test.tsx](./src/app/(games)/(stem)/neuroscience/(anatomy)/brain-atlas/__tests__/page.test.tsx)
│   │   │           │       ├── basal-ganglia/
│   │   │           │       │   ├── __tests__/
│   │   │           │       │   │   └── [page.test.tsx](./src/app/(games)/(stem)/neuroscience/(anatomy)/brain-atlas/basal-ganglia/__tests__/page.test.tsx)
│   │   │           │       │   └── [page.tsx](./src/app/(games)/(stem)/neuroscience/(anatomy)/brain-atlas/basal-ganglia/page.tsx)
│   │   │           │       ├── brainstem/
│   │   │           │       │   ├── __tests__/
│   │   │           │       │   │   └── [page.test.tsx](./src/app/(games)/(stem)/neuroscience/(anatomy)/brain-atlas/brainstem/__tests__/page.test.tsx)
│   │   │           │       │   └── [page.tsx](./src/app/(games)/(stem)/neuroscience/(anatomy)/brain-atlas/brainstem/page.tsx)
│   │   │           │       ├── cerebellum/
│   │   │           │       │   ├── __tests__/
│   │   │           │       │   │   └── [page.test.tsx](./src/app/(games)/(stem)/neuroscience/(anatomy)/brain-atlas/cerebellum/__tests__/page.test.tsx)
│   │   │           │       │   └── [page.tsx](./src/app/(games)/(stem)/neuroscience/(anatomy)/brain-atlas/cerebellum/page.tsx)
│   │   │           │       ├── cerebral-cortex/
│   │   │           │       │   ├── __tests__/
│   │   │           │       │   │   └── [page.test.tsx](./src/app/(games)/(stem)/neuroscience/(anatomy)/brain-atlas/cerebral-cortex/__tests__/page.test.tsx)
│   │   │           │       │   └── [page.tsx](./src/app/(games)/(stem)/neuroscience/(anatomy)/brain-atlas/cerebral-cortex/page.tsx)
│   │   │           │       ├── corpus-callosum/
│   │   │           │       │   ├── __tests__/
│   │   │           │       │   │   └── [page.test.tsx](./src/app/(games)/(stem)/neuroscience/(anatomy)/brain-atlas/corpus-callosum/__tests__/page.test.tsx)
│   │   │           │       │   └── [page.tsx](./src/app/(games)/(stem)/neuroscience/(anatomy)/brain-atlas/corpus-callosum/page.tsx)
│   │   │           │       ├── diencephalon/
│   │   │           │       │   ├── __tests__/
│   │   │           │       │   │   └── [page.test.tsx](./src/app/(games)/(stem)/neuroscience/(anatomy)/brain-atlas/diencephalon/__tests__/page.test.tsx)
│   │   │           │       │   └── [page.tsx](./src/app/(games)/(stem)/neuroscience/(anatomy)/brain-atlas/diencephalon/page.tsx)
│   │   │           │       ├── interactive/
│   │   │           │       │   ├── __tests__/
│   │   │           │       │   │   └── [page.test.tsx](./src/app/(games)/(stem)/neuroscience/(anatomy)/brain-atlas/interactive/__tests__/page.test.tsx)
│   │   │           │       │   └── [page.tsx](./src/app/(games)/(stem)/neuroscience/(anatomy)/brain-atlas/interactive/page.tsx)
│   │   │           │       ├── limbic-structures/
│   │   │           │       │   ├── __tests__/
│   │   │           │       │   │   └── [page.test.tsx](./src/app/(games)/(stem)/neuroscience/(anatomy)/brain-atlas/limbic-structures/__tests__/page.test.tsx)
│   │   │           │       │   └── [page.tsx](./src/app/(games)/(stem)/neuroscience/(anatomy)/brain-atlas/limbic-structures/page.tsx)
│   │   │           │       ├── white-matter/
│   │   │           │       │   ├── __tests__/
│   │   │           │       │   │   └── [page.test.tsx](./src/app/(games)/(stem)/neuroscience/(anatomy)/brain-atlas/white-matter/__tests__/page.test.tsx)
│   │   │           │       │   └── [page.tsx](./src/app/(games)/(stem)/neuroscience/(anatomy)/brain-atlas/white-matter/page.tsx)
│   │   │           │       └── [page.tsx](./src/app/(games)/(stem)/neuroscience/(anatomy)/brain-atlas/page.tsx)
│   │   │           ├── (neuroimaging)/
│   │   │           │   ├── (eeg)/
│   │   │           │   │   ├── eeg/
│   │   │           │   │   │   ├── interactive/
│   │   │           │   │   │   │   └── [page.tsx](./src/app/(games)/(stem)/neuroscience/(neuroimaging)/(eeg)/eeg/interactive/page.tsx)
│   │   │           │   │   │   └── [page.tsx](./src/app/(games)/(stem)/neuroscience/(neuroimaging)/(eeg)/eeg/page.tsx)
│   │   │           │   │   └── qeeg/
│   │   │           │   │       └── [page.tsx](./src/app/(games)/(stem)/neuroscience/(neuroimaging)/(eeg)/qeeg/page.tsx)
│   │   │           │   ├── (meg)/
│   │   │           │   │   ├── meg/
│   │   │           │   │   │   ├── interactive/
│   │   │           │   │   │   │   └── [page.tsx](./src/app/(games)/(stem)/neuroscience/(neuroimaging)/(meg)/meg/interactive/page.tsx)
│   │   │           │   │   │   └── [page.tsx](./src/app/(games)/(stem)/neuroscience/(neuroimaging)/(meg)/meg/page.tsx)
│   │   │           │   │   └── opm-meg/
│   │   │           │   │       ├── interactive/
│   │   │           │   │       │   └── [page.tsx](./src/app/(games)/(stem)/neuroscience/(neuroimaging)/(meg)/opm-meg/interactive/page.tsx)
│   │   │           │   │       └── [page.tsx](./src/app/(games)/(stem)/neuroscience/(neuroimaging)/(meg)/opm-meg/page.tsx)
│   │   │           │   └── (mri)/
│   │   │           │       ├── fmri/
│   │   │           │       │   └── [page.tsx](./src/app/(games)/(stem)/neuroscience/(neuroimaging)/(mri)/fmri/page.tsx)
│   │   │           │       ├── fnirs/
│   │   │           │       │   └── [page.tsx](./src/app/(games)/(stem)/neuroscience/(neuroimaging)/(mri)/fnirs/page.tsx)
│   │   │           │       └── mri/
│   │   │           │           ├── interactive/
│   │   │           │           │   └── [page.tsx](./src/app/(games)/(stem)/neuroscience/(neuroimaging)/(mri)/mri/interactive/page.tsx)
│   │   │           │           └── [page.tsx](./src/app/(games)/(stem)/neuroscience/(neuroimaging)/(mri)/mri/page.tsx)
│   │   │           ├── (tasks)/
│   │   │           │   ├── flanker-task/
│   │   │           │   │   └── [page.tsx](./src/app/(games)/(stem)/neuroscience/(tasks)/flanker-task/page.tsx)
│   │   │           │   ├── lexical-decision/
│   │   │           │   │   └── [page.tsx](./src/app/(games)/(stem)/neuroscience/(tasks)/lexical-decision/page.tsx)
│   │   │           │   ├── memory-recognition/
│   │   │           │   │   └── [page.tsx](./src/app/(games)/(stem)/neuroscience/(tasks)/memory-recognition/page.tsx)
│   │   │           │   ├── numerical-comparison/
│   │   │           │   │   └── [page.tsx](./src/app/(games)/(stem)/neuroscience/(tasks)/numerical-comparison/page.tsx)
│   │   │           │   ├── random-dot-motion/
│   │   │           │   │   └── [page.tsx](./src/app/(games)/(stem)/neuroscience/(tasks)/random-dot-motion/page.tsx)
│   │   │           │   ├── stroop-task/
│   │   │           │   │   └── [page.tsx](./src/app/(games)/(stem)/neuroscience/(tasks)/stroop-task/page.tsx)
│   │   │           │   └── visual-search/
│   │   │           │       └── [page.tsx](./src/app/(games)/(stem)/neuroscience/(tasks)/visual-search/page.tsx)
│   │   │           ├── (theory)/
│   │   │           │   ├── attentional-drift-diffusion-model/
│   │   │           │   │   ├── interactive/
│   │   │           │   │   │   └── [page.tsx](./src/app/(games)/(stem)/neuroscience/(theory)/attentional-drift-diffusion-model/interactive/page.tsx)
│   │   │           │   │   └── [page.tsx](./src/app/(games)/(stem)/neuroscience/(theory)/attentional-drift-diffusion-model/page.tsx)
│   │   │           │   ├── drift-diffusion-model/
│   │   │           │   │   ├── interactive/
│   │   │           │   │   │   └── [page.tsx](./src/app/(games)/(stem)/neuroscience/(theory)/drift-diffusion-model/interactive/page.tsx)
│   │   │           │   │   └── [page.tsx](./src/app/(games)/(stem)/neuroscience/(theory)/drift-diffusion-model/page.tsx)
│   │   │           │   ├── hierarchical-drift-diffusion-model/
│   │   │           │   │   ├── interactive/
│   │   │           │   │   │   └── [page.tsx](./src/app/(games)/(stem)/neuroscience/(theory)/hierarchical-drift-diffusion-model/interactive/page.tsx)
│   │   │           │   │   └── [page.tsx](./src/app/(games)/(stem)/neuroscience/(theory)/hierarchical-drift-diffusion-model/page.tsx)
│   │   │           │   ├── leaky-competing-accumulator/
│   │   │           │   │   ├── interactive/
│   │   │           │   │   │   └── [page.tsx](./src/app/(games)/(stem)/neuroscience/(theory)/leaky-competing-accumulator/interactive/page.tsx)
│   │   │           │   │   └── [page.tsx](./src/app/(games)/(stem)/neuroscience/(theory)/leaky-competing-accumulator/page.tsx)
│   │   │           │   ├── linear-ballistic-accumulator/
│   │   │           │   │   ├── interactive/
│   │   │           │   │   │   └── [page.tsx](./src/app/(games)/(stem)/neuroscience/(theory)/linear-ballistic-accumulator/interactive/page.tsx)
│   │   │           │   │   └── [page.tsx](./src/app/(games)/(stem)/neuroscience/(theory)/linear-ballistic-accumulator/page.tsx)
│   │   │           │   └── race-models/
│   │   │           │       ├── interactive/
│   │   │           │       │   └── [page.tsx](./src/app/(games)/(stem)/neuroscience/(theory)/race-models/interactive/page.tsx)
│   │   │           │       └── [page.tsx](./src/app/(games)/(stem)/neuroscience/(theory)/race-models/page.tsx)
│   │   │           ├── __tests__/
│   │   │           │   └── [page.test.tsx](./src/app/(games)/(stem)/neuroscience/__tests__/page.test.tsx)
│   │   │           └── [page.tsx](./src/app/(games)/(stem)/neuroscience/page.tsx)
│   │   ├── (info)/
│   │   │   ├── about/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(info)/about/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(info)/about/page.tsx)
│   │   │   ├── downloads/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(info)/downloads/page.tsx)
│   │   │   └── version/
│   │   │       ├── __tests__/
│   │   │       │   └── [page.test.tsx](./src/app/(info)/version/__tests__/page.test.tsx)
│   │   │       └── [page.tsx](./src/app/(info)/version/page.tsx)
│   │   ├── __tests__/
│   │   │   ├── [error.test.tsx](./src/app/__tests__/error.test.tsx)
│   │   │   ├── [forbidden.test.tsx](./src/app/__tests__/forbidden.test.tsx)
│   │   │   ├── [global-error.test.tsx](./src/app/__tests__/global-error.test.tsx)
│   │   │   ├── [layout.test.tsx](./src/app/__tests__/layout.test.tsx)
│   │   │   ├── [loading.test.tsx](./src/app/__tests__/loading.test.tsx)
│   │   │   ├── [not-found.test.tsx](./src/app/__tests__/not-found.test.tsx)
│   │   │   ├── [page.test.tsx](./src/app/__tests__/page.test.tsx)
│   │   │   ├── [robots.test.ts](./src/app/__tests__/robots.test.ts)
│   │   │   └── [unauthorized.test.tsx](./src/app/__tests__/unauthorized.test.tsx)
│   │   ├── [default.tsx](./src/app/default.tsx)
│   │   ├── [error.tsx](./src/app/error.tsx)
│   │   ├── [favicon.ico](./src/app/favicon.ico)
│   │   ├── [forbidden.tsx](./src/app/forbidden.tsx)
│   │   ├── [global-error.tsx](./src/app/global-error.tsx)
│   │   ├── [layout.tsx](./src/app/layout.tsx)
│   │   ├── [loading.tsx](./src/app/loading.tsx)
│   │   ├── [not-found.tsx](./src/app/not-found.tsx)
│   │   ├── [page.tsx](./src/app/page.tsx)
│   │   ├── [robots.ts](./src/app/robots.ts)
│   │   └── [unauthorized.tsx](./src/app/unauthorized.tsx)
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── __tests__/
│   │   │   │   ├── [Badge.test.tsx](./src/components/atoms/__tests__/Badge.test.tsx)
│   │   │   │   └── [Button.test.tsx](./src/components/atoms/__tests__/Button.test.tsx)
│   │   │   ├── [AccentBadge.tsx](./src/components/atoms/AccentBadge.tsx)
│   │   │   ├── [Badge.tsx](./src/components/atoms/Badge.tsx)
│   │   │   ├── [Button.tsx](./src/components/atoms/Button.tsx)
│   │   │   ├── [CaretButton.tsx](./src/components/atoms/CaretButton.tsx)
│   │   │   ├── [DifficultyBadge.tsx](./src/components/atoms/DifficultyBadge.tsx)
│   │   │   ├── [FilterChip.tsx](./src/components/atoms/FilterChip.tsx)
│   │   │   └── [ThemeToggle.tsx](./src/components/atoms/ThemeToggle.tsx)
│   │   ├── molecules/
│   │   │   ├── __tests__/
│   │   │   │   └── [StrategyList.test.tsx](./src/components/molecules/__tests__/StrategyList.test.tsx)
│   │   │   ├── [CardActions.tsx](./src/components/molecules/CardActions.tsx)
│   │   │   ├── [FilterCheckbox.tsx](./src/components/molecules/FilterCheckbox.tsx)
│   │   │   ├── [FilterRow.tsx](./src/components/molecules/FilterRow.tsx)
│   │   │   ├── [GameResult.tsx](./src/components/molecules/GameResult.tsx)
│   │   │   ├── [GroupHeader.tsx](./src/components/molecules/GroupHeader.tsx)
│   │   │   ├── [MoveButtons.tsx](./src/components/molecules/MoveButtons.tsx)
│   │   │   ├── [PayoffMatrix.tsx](./src/components/molecules/PayoffMatrix.tsx)
│   │   │   ├── [RankingTable.tsx](./src/components/molecules/RankingTable.tsx)
│   │   │   ├── [RoundHistory.tsx](./src/components/molecules/RoundHistory.tsx)
│   │   │   ├── [RoundReveal.tsx](./src/components/molecules/RoundReveal.tsx)
│   │   │   ├── [ScoreBar.tsx](./src/components/molecules/ScoreBar.tsx)
│   │   │   ├── [SearchBar.tsx](./src/components/molecules/SearchBar.tsx)
│   │   │   ├── [SelectField.tsx](./src/components/molecules/SelectField.tsx)
│   │   │   └── [StrategyList.tsx](./src/components/molecules/StrategyList.tsx)
│   │   ├── organisms/
│   │   │   ├── [FilterPanel.tsx](./src/components/organisms/FilterPanel.tsx)
│   │   │   ├── [GroupSection.tsx](./src/components/organisms/GroupSection.tsx)
│   │   │   ├── [Header.tsx](./src/components/organisms/Header.tsx)
│   │   │   └── [ToolCard.tsx](./src/components/organisms/ToolCard.tsx)
│   │   └── templates/
│   │       ├── __tests__/
│   │       │   ├── [AboutTemplate.test.tsx](./src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │       │   ├── [DownloadsTemplate.test.tsx](./src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │       │   ├── [ErrorTemplate.test.tsx](./src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │       │   ├── [GamesTemplate.test.tsx](./src/components/templates/__tests__/GamesTemplate.test.tsx)
│   │       │   └── [VersionTemplate.test.tsx](./src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │       ├── [AboutTemplate.tsx](./src/components/templates/AboutTemplate.tsx)
│   │       ├── [DownloadsTemplate.tsx](./src/components/templates/DownloadsTemplate.tsx)
│   │       ├── [ErrorTemplate.tsx](./src/components/templates/ErrorTemplate.tsx)
│   │       ├── [GamesTemplate.tsx](./src/components/templates/GamesTemplate.tsx)
│   │       ├── [TheoryTemplate.tsx](./src/components/templates/TheoryTemplate.tsx)
│   │       └── [VersionTemplate.tsx](./src/components/templates/VersionTemplate.tsx)
│   ├── content/
│   │   ├── [about.ts](./src/content/about.ts)
│   │   ├── [download.ts](./src/content/download.ts)
│   │   └── [version.ts](./src/content/version.ts)
│   ├── games/
│   │   ├── arts/
│   │   │   ├── colors/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [colors.test.ts](./src/games/arts/colors/__tests__/colors.test.ts)
│   │   │   │   ├── adjuster/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [ColorAdjuster.test.tsx](./src/games/arts/colors/adjuster/__tests__/ColorAdjuster.test.tsx)
│   │   │   │   │   └── [index.tsx](./src/games/arts/colors/adjuster/index.tsx)
│   │   │   │   ├── color-blindness/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [ColorBlindnessSimulator.test.tsx](./src/games/arts/colors/color-blindness/__tests__/ColorBlindnessSimulator.test.tsx)
│   │   │   │   │   └── [index.tsx](./src/games/arts/colors/color-blindness/index.tsx)
│   │   │   │   ├── contrast/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [ContrastChecker.test.tsx](./src/games/arts/colors/contrast/__tests__/ContrastChecker.test.tsx)
│   │   │   │   │   └── [index.tsx](./src/games/arts/colors/contrast/index.tsx)
│   │   │   │   ├── converter/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [ColorConverter.test.tsx](./src/games/arts/colors/converter/__tests__/ColorConverter.test.tsx)
│   │   │   │   │   └── [index.tsx](./src/games/arts/colors/converter/index.tsx)
│   │   │   │   ├── css-scale/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [CssScaleExporter.test.tsx](./src/games/arts/colors/css-scale/__tests__/CssScaleExporter.test.tsx)
│   │   │   │   │   └── [index.tsx](./src/games/arts/colors/css-scale/index.tsx)
│   │   │   │   ├── gradient/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [GradientBuilder.test.tsx](./src/games/arts/colors/gradient/__tests__/GradientBuilder.test.tsx)
│   │   │   │   │   └── [index.tsx](./src/games/arts/colors/gradient/index.tsx)
│   │   │   │   ├── mixer/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [ColorMixer.test.tsx](./src/games/arts/colors/mixer/__tests__/ColorMixer.test.tsx)
│   │   │   │   │   └── [index.tsx](./src/games/arts/colors/mixer/index.tsx)
│   │   │   │   ├── opacity/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [OpacityOverlay.test.tsx](./src/games/arts/colors/opacity/__tests__/OpacityOverlay.test.tsx)
│   │   │   │   │   └── [index.tsx](./src/games/arts/colors/opacity/index.tsx)
│   │   │   │   ├── palette/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [PaletteGenerator.test.tsx](./src/games/arts/colors/palette/__tests__/PaletteGenerator.test.tsx)
│   │   │   │   │   └── [index.tsx](./src/games/arts/colors/palette/index.tsx)
│   │   │   │   ├── random/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [RandomColor.test.tsx](./src/games/arts/colors/random/__tests__/RandomColor.test.tsx)
│   │   │   │   │   └── [index.tsx](./src/games/arts/colors/random/index.tsx)
│   │   │   │   ├── schemes/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [ColorSchemes.test.tsx](./src/games/arts/colors/schemes/__tests__/ColorSchemes.test.tsx)
│   │   │   │   │   └── [index.tsx](./src/games/arts/colors/schemes/index.tsx)
│   │   │   │   ├── shades-tints/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [ShadesTints.test.tsx](./src/games/arts/colors/shades-tints/__tests__/ShadesTints.test.tsx)
│   │   │   │   │   └── [index.tsx](./src/games/arts/colors/shades-tints/index.tsx)
│   │   │   │   ├── shared/
│   │   │   │   │   ├── [ColorsTool.tsx](./src/games/arts/colors/shared/ColorsTool.tsx)
│   │   │   │   │   ├── [CopyRow.tsx](./src/games/arts/colors/shared/CopyRow.tsx)
│   │   │   │   │   ├── [Swatch.tsx](./src/games/arts/colors/shared/Swatch.tsx)
│   │   │   │   │   ├── [TheoryNote.tsx](./src/games/arts/colors/shared/TheoryNote.tsx)
│   │   │   │   │   ├── [index.ts](./src/games/arts/colors/shared/index.ts)
│   │   │   │   │   └── [useClipboard.ts](./src/games/arts/colors/shared/useClipboard.ts)
│   │   │   │   ├── temperature/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [ColorTemperature.test.tsx](./src/games/arts/colors/temperature/__tests__/ColorTemperature.test.tsx)
│   │   │   │   │   └── [index.tsx](./src/games/arts/colors/temperature/index.tsx)
│   │   │   │   ├── theme/
│   │   │   │   │   └── __tests__/
│   │   │   │   │       └── [ColorsTool.test.tsx](./src/games/arts/colors/theme/__tests__/ColorsTool.test.tsx)
│   │   │   │   ├── tint-shade-tone/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [TintShadeTone.test.tsx](./src/games/arts/colors/tint-shade-tone/__tests__/TintShadeTone.test.tsx)
│   │   │   │   │   └── [index.tsx](./src/games/arts/colors/tint-shade-tone/index.tsx)
│   │   │   │   ├── wheel/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [ColorWheel.test.tsx](./src/games/arts/colors/wheel/__tests__/ColorWheel.test.tsx)
│   │   │   │   │   └── [index.tsx](./src/games/arts/colors/wheel/index.tsx)
│   │   │   │   ├── [colors.ts](./src/games/arts/colors/colors.ts)
│   │   │   │   └── [themeColors.ts](./src/games/arts/colors/themeColors.ts)
│   │   │   └── music/
│   │   │       ├── __tests__/
│   │   │       │   ├── [index.test.tsx](./src/games/arts/music/__tests__/index.test.tsx)
│   │   │       │   ├── [keyClasses.test.ts](./src/games/arts/music/__tests__/keyClasses.test.ts)
│   │   │       │   ├── [useAudio.test.ts](./src/games/arts/music/__tests__/useAudio.test.ts)
│   │   │       │   ├── [useGame.test.ts](./src/games/arts/music/__tests__/useGame.test.ts)
│   │   │       │   └── [useSequence.test.ts](./src/games/arts/music/__tests__/useSequence.test.ts)
│   │   │       ├── [constants.ts](./src/games/arts/music/constants.ts)
│   │   │       ├── [index.tsx](./src/games/arts/music/index.tsx)
│   │   │       ├── [keyClasses.ts](./src/games/arts/music/keyClasses.ts)
│   │   │       ├── [twinkle-twinkle-little-star.ts](./src/games/arts/music/twinkle-twinkle-little-star.ts)
│   │   │       ├── [useAudio.ts](./src/games/arts/music/useAudio.ts)
│   │   │       ├── [useGame.ts](./src/games/arts/music/useGame.ts)
│   │   │       ├── [useMusicGame.ts](./src/games/arts/music/useMusicGame.ts)
│   │   │       └── [useSequence.ts](./src/games/arts/music/useSequence.ts)
│   │   ├── health/
│   │   │   ├── ophthalmology/
│   │   │   │   ├── logmar/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [index.test.tsx](./src/games/health/ophthalmology/logmar/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [utils.test.ts](./src/games/health/ophthalmology/logmar/__tests__/utils.test.ts)
│   │   │   │   │   ├── [constants.ts](./src/games/health/ophthalmology/logmar/constants.ts)
│   │   │   │   │   ├── [index.tsx](./src/games/health/ophthalmology/logmar/index.tsx)
│   │   │   │   │   └── [utils.ts](./src/games/health/ophthalmology/logmar/utils.ts)
│   │   │   │   ├── snellen/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [index.test.tsx](./src/games/health/ophthalmology/snellen/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [utils.test.ts](./src/games/health/ophthalmology/snellen/__tests__/utils.test.ts)
│   │   │   │   │   ├── [index.tsx](./src/games/health/ophthalmology/snellen/index.tsx)
│   │   │   │   │   └── [utils.ts](./src/games/health/ophthalmology/snellen/utils.ts)
│   │   │   │   └── tumbling-e/
│   │   │   │       ├── __tests__/
│   │   │   │       │   ├── [index.test.tsx](./src/games/health/ophthalmology/tumbling-e/__tests__/index.test.tsx)
│   │   │   │       │   └── [utils.test.ts](./src/games/health/ophthalmology/tumbling-e/__tests__/utils.test.ts)
│   │   │   │       ├── [constants.ts](./src/games/health/ophthalmology/tumbling-e/constants.ts)
│   │   │   │       ├── [index.tsx](./src/games/health/ophthalmology/tumbling-e/index.tsx)
│   │   │   │       ├── [types.ts](./src/games/health/ophthalmology/tumbling-e/types.ts)
│   │   │   │       └── [utils.ts](./src/games/health/ophthalmology/tumbling-e/utils.ts)
│   │   │   └── psychology/
│   │   │       ├── BeckDepressionInventory/
│   │   │       │   ├── __tests__/
│   │   │       │   │   ├── [index.test.tsx](./src/games/health/psychology/BeckDepressionInventory/__tests__/index.test.tsx)
│   │   │       │   │   └── [utils.test.ts](./src/games/health/psychology/BeckDepressionInventory/__tests__/utils.test.ts)
│   │   │       │   ├── components/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── [OptionsStep.test.tsx](./src/games/health/psychology/BeckDepressionInventory/components/__tests__/OptionsStep.test.tsx)
│   │   │       │   │   │   └── [ResultsStep.test.tsx](./src/games/health/psychology/BeckDepressionInventory/components/__tests__/ResultsStep.test.tsx)
│   │   │       │   │   ├── [OptionsStep.tsx](./src/games/health/psychology/BeckDepressionInventory/components/OptionsStep.tsx)
│   │   │       │   │   └── [ResultsStep.tsx](./src/games/health/psychology/BeckDepressionInventory/components/ResultsStep.tsx)
│   │   │       │   ├── docs/
│   │   │       │   │   └── [beck-depression-inventory.md](./src/games/health/psychology/BeckDepressionInventory/docs/beck-depression-inventory.md)
│   │   │       │   ├── [AGENTS.md](./src/games/health/psychology/BeckDepressionInventory/AGENTS.md)
│   │   │       │   ├── [index.tsx](./src/games/health/psychology/BeckDepressionInventory/index.tsx)
│   │   │       │   ├── [items.ts](./src/games/health/psychology/BeckDepressionInventory/items.ts)
│   │   │       │   └── [utils.ts](./src/games/health/psychology/BeckDepressionInventory/utils.ts)
│   │   │       ├── BigFiveInventory/
│   │   │       │   ├── __tests__/
│   │   │       │   │   ├── [index.test.tsx](./src/games/health/psychology/BigFiveInventory/__tests__/index.test.tsx)
│   │   │       │   │   └── [utils.test.ts](./src/games/health/psychology/BigFiveInventory/__tests__/utils.test.ts)
│   │   │       │   ├── components/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── [AgreeStep.test.tsx](./src/games/health/psychology/BigFiveInventory/components/__tests__/AgreeStep.test.tsx)
│   │   │       │   │   │   └── [ResultsStep.test.tsx](./src/games/health/psychology/BigFiveInventory/components/__tests__/ResultsStep.test.tsx)
│   │   │       │   │   ├── [AgreeStep.tsx](./src/games/health/psychology/BigFiveInventory/components/AgreeStep.tsx)
│   │   │       │   │   └── [ResultsStep.tsx](./src/games/health/psychology/BigFiveInventory/components/ResultsStep.tsx)
│   │   │       │   ├── docs/
│   │   │       │   │   └── [big-five-inventory.md](./src/games/health/psychology/BigFiveInventory/docs/big-five-inventory.md)
│   │   │       │   ├── [AGENTS.md](./src/games/health/psychology/BigFiveInventory/AGENTS.md)
│   │   │       │   ├── [index.tsx](./src/games/health/psychology/BigFiveInventory/index.tsx)
│   │   │       │   └── [utils.ts](./src/games/health/psychology/BigFiveInventory/utils.ts)
│   │   │       ├── DyadicAdjustmentScale/
│   │   │       │   ├── __tests__/
│   │   │       │   │   ├── [index.test.tsx](./src/games/health/psychology/DyadicAdjustmentScale/__tests__/index.test.tsx)
│   │   │       │   │   └── [utils.test.ts](./src/games/health/psychology/DyadicAdjustmentScale/__tests__/utils.test.ts)
│   │   │       │   ├── components/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── [OptionsStep.test.tsx](./src/games/health/psychology/DyadicAdjustmentScale/components/__tests__/OptionsStep.test.tsx)
│   │   │       │   │   │   └── [ResultsStep.test.tsx](./src/games/health/psychology/DyadicAdjustmentScale/components/__tests__/ResultsStep.test.tsx)
│   │   │       │   │   ├── [OptionsStep.tsx](./src/games/health/psychology/DyadicAdjustmentScale/components/OptionsStep.tsx)
│   │   │       │   │   └── [ResultsStep.tsx](./src/games/health/psychology/DyadicAdjustmentScale/components/ResultsStep.tsx)
│   │   │       │   ├── docs/
│   │   │       │   │   └── [dyadic-adjustment-scale.md](./src/games/health/psychology/DyadicAdjustmentScale/docs/dyadic-adjustment-scale.md)
│   │   │       │   ├── [AGENTS.md](./src/games/health/psychology/DyadicAdjustmentScale/AGENTS.md)
│   │   │       │   ├── [index.tsx](./src/games/health/psychology/DyadicAdjustmentScale/index.tsx)
│   │   │       │   └── [utils.ts](./src/games/health/psychology/DyadicAdjustmentScale/utils.ts)
│   │   │       ├── ExperiencesInCloseRelationships/
│   │   │       │   ├── __tests__/
│   │   │       │   │   ├── [index.test.tsx](./src/games/health/psychology/ExperiencesInCloseRelationships/__tests__/index.test.tsx)
│   │   │       │   │   └── [utils.test.ts](./src/games/health/psychology/ExperiencesInCloseRelationships/__tests__/utils.test.ts)
│   │   │       │   ├── components/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── [ResultsStep.test.tsx](./src/games/health/psychology/ExperiencesInCloseRelationships/components/__tests__/ResultsStep.test.tsx)
│   │   │       │   │   │   └── [ScaleStep.test.tsx](./src/games/health/psychology/ExperiencesInCloseRelationships/components/__tests__/ScaleStep.test.tsx)
│   │   │       │   │   ├── [ResultsStep.tsx](./src/games/health/psychology/ExperiencesInCloseRelationships/components/ResultsStep.tsx)
│   │   │       │   │   └── [ScaleStep.tsx](./src/games/health/psychology/ExperiencesInCloseRelationships/components/ScaleStep.tsx)
│   │   │       │   ├── docs/
│   │   │       │   │   └── [experiences-in-close-relationships.md](./src/games/health/psychology/ExperiencesInCloseRelationships/docs/experiences-in-close-relationships.md)
│   │   │       │   ├── [AGENTS.md](./src/games/health/psychology/ExperiencesInCloseRelationships/AGENTS.md)
│   │   │       │   ├── [index.tsx](./src/games/health/psychology/ExperiencesInCloseRelationships/index.tsx)
│   │   │       │   └── [utils.ts](./src/games/health/psychology/ExperiencesInCloseRelationships/utils.ts)
│   │   │       ├── GeneralizedAnxietyDisorderScale/
│   │   │       │   ├── __tests__/
│   │   │       │   │   ├── [index.test.tsx](./src/games/health/psychology/GeneralizedAnxietyDisorderScale/__tests__/index.test.tsx)
│   │   │       │   │   └── [utils.test.ts](./src/games/health/psychology/GeneralizedAnxietyDisorderScale/__tests__/utils.test.ts)
│   │   │       │   ├── components/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── [FrequencyStep.test.tsx](./src/games/health/psychology/GeneralizedAnxietyDisorderScale/components/__tests__/FrequencyStep.test.tsx)
│   │   │       │   │   │   └── [ResultsStep.test.tsx](./src/games/health/psychology/GeneralizedAnxietyDisorderScale/components/__tests__/ResultsStep.test.tsx)
│   │   │       │   │   ├── [FrequencyStep.tsx](./src/games/health/psychology/GeneralizedAnxietyDisorderScale/components/FrequencyStep.tsx)
│   │   │       │   │   └── [ResultsStep.tsx](./src/games/health/psychology/GeneralizedAnxietyDisorderScale/components/ResultsStep.tsx)
│   │   │       │   ├── docs/
│   │   │       │   │   └── [generalized-anxiety-disorder-scale.md](./src/games/health/psychology/GeneralizedAnxietyDisorderScale/docs/generalized-anxiety-disorder-scale.md)
│   │   │       │   ├── [AGENTS.md](./src/games/health/psychology/GeneralizedAnxietyDisorderScale/AGENTS.md)
│   │   │       │   ├── [index.tsx](./src/games/health/psychology/GeneralizedAnxietyDisorderScale/index.tsx)
│   │   │       │   └── [utils.ts](./src/games/health/psychology/GeneralizedAnxietyDisorderScale/utils.ts)
│   │   │       ├── PatientHealthQuestionnaire/
│   │   │       │   ├── __tests__/
│   │   │       │   │   ├── [index.test.tsx](./src/games/health/psychology/PatientHealthQuestionnaire/__tests__/index.test.tsx)
│   │   │       │   │   └── [utils.test.ts](./src/games/health/psychology/PatientHealthQuestionnaire/__tests__/utils.test.ts)
│   │   │       │   ├── components/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── [FrequencyStep.test.tsx](./src/games/health/psychology/PatientHealthQuestionnaire/components/__tests__/FrequencyStep.test.tsx)
│   │   │       │   │   │   └── [ResultsStep.test.tsx](./src/games/health/psychology/PatientHealthQuestionnaire/components/__tests__/ResultsStep.test.tsx)
│   │   │       │   │   ├── [FrequencyStep.tsx](./src/games/health/psychology/PatientHealthQuestionnaire/components/FrequencyStep.tsx)
│   │   │       │   │   └── [ResultsStep.tsx](./src/games/health/psychology/PatientHealthQuestionnaire/components/ResultsStep.tsx)
│   │   │       │   ├── docs/
│   │   │       │   │   └── [patient-health-questionnaire.md](./src/games/health/psychology/PatientHealthQuestionnaire/docs/patient-health-questionnaire.md)
│   │   │       │   ├── [AGENTS.md](./src/games/health/psychology/PatientHealthQuestionnaire/AGENTS.md)
│   │   │       │   ├── [index.tsx](./src/games/health/psychology/PatientHealthQuestionnaire/index.tsx)
│   │   │       │   └── [utils.ts](./src/games/health/psychology/PatientHealthQuestionnaire/utils.ts)
│   │   │       ├── RelationshipClosenessInventory/
│   │   │       │   ├── __tests__/
│   │   │       │   │   ├── [index.test.tsx](./src/games/health/psychology/RelationshipClosenessInventory/__tests__/index.test.tsx)
│   │   │       │   │   └── [utils.test.ts](./src/games/health/psychology/RelationshipClosenessInventory/__tests__/utils.test.ts)
│   │   │       │   ├── components/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── [ActivitiesStep.test.tsx](./src/games/health/psychology/RelationshipClosenessInventory/components/__tests__/ActivitiesStep.test.tsx)
│   │   │       │   │   │   ├── [ResultsStep.test.tsx](./src/games/health/psychology/RelationshipClosenessInventory/components/__tests__/ResultsStep.test.tsx)
│   │   │       │   │   │   └── [TimeStep.test.tsx](./src/games/health/psychology/RelationshipClosenessInventory/components/__tests__/TimeStep.test.tsx)
│   │   │       │   │   ├── [ActivitiesStep.tsx](./src/games/health/psychology/RelationshipClosenessInventory/components/ActivitiesStep.tsx)
│   │   │       │   │   ├── [ResultsStep.tsx](./src/games/health/psychology/RelationshipClosenessInventory/components/ResultsStep.tsx)
│   │   │       │   │   ├── [ScaleStep.tsx](./src/games/health/psychology/RelationshipClosenessInventory/components/ScaleStep.tsx)
│   │   │       │   │   └── [TimeStep.tsx](./src/games/health/psychology/RelationshipClosenessInventory/components/TimeStep.tsx)
│   │   │       │   ├── docs/
│   │   │       │   │   └── [relationship-closeness-inventory-revised.md](./src/games/health/psychology/RelationshipClosenessInventory/docs/relationship-closeness-inventory-revised.md)
│   │   │       │   ├── [AGENTS.md](./src/games/health/psychology/RelationshipClosenessInventory/AGENTS.md)
│   │   │       │   ├── [index.tsx](./src/games/health/psychology/RelationshipClosenessInventory/index.tsx)
│   │   │       │   └── [utils.ts](./src/games/health/psychology/RelationshipClosenessInventory/utils.ts)
│   │   │       └── SatisfactionWithLifeScale/
│   │   │           ├── __tests__/
│   │   │           │   ├── [index.test.tsx](./src/games/health/psychology/SatisfactionWithLifeScale/__tests__/index.test.tsx)
│   │   │           │   └── [utils.test.ts](./src/games/health/psychology/SatisfactionWithLifeScale/__tests__/utils.test.ts)
│   │   │           ├── components/
│   │   │           │   ├── [ResultsStep.tsx](./src/games/health/psychology/SatisfactionWithLifeScale/components/ResultsStep.tsx)
│   │   │           │   └── [ScaleStep.tsx](./src/games/health/psychology/SatisfactionWithLifeScale/components/ScaleStep.tsx)
│   │   │           ├── docs/
│   │   │           │   └── [satisfacition-with-life-scale.md](./src/games/health/psychology/SatisfactionWithLifeScale/docs/satisfacition-with-life-scale.md)
│   │   │           ├── [AGENTS.md](./src/games/health/psychology/SatisfactionWithLifeScale/AGENTS.md)
│   │   │           ├── [index.tsx](./src/games/health/psychology/SatisfactionWithLifeScale/index.tsx)
│   │   │           └── [utils.ts](./src/games/health/psychology/SatisfactionWithLifeScale/utils.ts)
│   │   ├── humanities/
│   │   │   ├── economics/
│   │   │   │   ├── behavioral-economics/
│   │   │   │   │   ├── bubbles/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/behavioral-economics/bubbles/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/behavioral-economics/bubbles/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/behavioral-economics/bubbles/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/behavioral-economics/bubbles/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/behavioral-economics/bubbles/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/behavioral-economics/bubbles/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/behavioral-economics/bubbles/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/behavioral-economics/bubbles/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/behavioral-economics/bubbles/types.ts)
│   │   │   │   │   ├── commitment/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/behavioral-economics/commitment/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/behavioral-economics/commitment/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/behavioral-economics/commitment/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/behavioral-economics/commitment/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/behavioral-economics/commitment/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/behavioral-economics/commitment/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/behavioral-economics/commitment/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/behavioral-economics/commitment/types.ts)
│   │   │   │   │   ├── dictator/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/behavioral-economics/dictator/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/behavioral-economics/dictator/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/behavioral-economics/dictator/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/behavioral-economics/dictator/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/behavioral-economics/dictator/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/behavioral-economics/dictator/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/behavioral-economics/dictator/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/behavioral-economics/dictator/types.ts)
│   │   │   │   │   ├── endowment/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/behavioral-economics/endowment/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/behavioral-economics/endowment/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/behavioral-economics/endowment/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/behavioral-economics/endowment/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/behavioral-economics/endowment/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/behavioral-economics/endowment/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/behavioral-economics/endowment/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/behavioral-economics/endowment/types.ts)
│   │   │   │   │   ├── framing/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/behavioral-economics/framing/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/behavioral-economics/framing/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/behavioral-economics/framing/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/behavioral-economics/framing/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/behavioral-economics/framing/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/behavioral-economics/framing/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/behavioral-economics/framing/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/behavioral-economics/framing/types.ts)
│   │   │   │   │   ├── heuristics/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/behavioral-economics/heuristics/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/behavioral-economics/heuristics/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/behavioral-economics/heuristics/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/behavioral-economics/heuristics/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/behavioral-economics/heuristics/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/behavioral-economics/heuristics/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/behavioral-economics/heuristics/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/behavioral-economics/heuristics/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/behavioral-economics/heuristics/types.ts)
│   │   │   │   │   ├── mental-accounting/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/behavioral-economics/mental-accounting/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/behavioral-economics/mental-accounting/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/behavioral-economics/mental-accounting/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/behavioral-economics/mental-accounting/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/behavioral-economics/mental-accounting/constants.ts)
│   │   │   │   │   │   ├── [framer.tsx](./src/games/humanities/economics/behavioral-economics/mental-accounting/framer.tsx)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/behavioral-economics/mental-accounting/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/behavioral-economics/mental-accounting/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/behavioral-economics/mental-accounting/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/behavioral-economics/mental-accounting/types.ts)
│   │   │   │   │   ├── nudge/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/behavioral-economics/nudge/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/behavioral-economics/nudge/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/behavioral-economics/nudge/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components-report.tsx](./src/games/humanities/economics/behavioral-economics/nudge/components-report.tsx)
│   │   │   │   │   │   ├── [components-simulator.tsx](./src/games/humanities/economics/behavioral-economics/nudge/components-simulator.tsx)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/behavioral-economics/nudge/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/behavioral-economics/nudge/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/behavioral-economics/nudge/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/behavioral-economics/nudge/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/behavioral-economics/nudge/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/behavioral-economics/nudge/types.ts)
│   │   │   │   │   └── overconfidence/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   ├── [game.test.ts](./src/games/humanities/economics/behavioral-economics/overconfidence/__tests__/game.test.ts)
│   │   │   │   │       │   ├── [index.test.tsx](./src/games/humanities/economics/behavioral-economics/overconfidence/__tests__/index.test.tsx)
│   │   │   │   │       │   └── [reducer.test.ts](./src/games/humanities/economics/behavioral-economics/overconfidence/__tests__/reducer.test.ts)
│   │   │   │   │       ├── [brackets.tsx](./src/games/humanities/economics/behavioral-economics/overconfidence/brackets.tsx)
│   │   │   │   │       ├── [calibration.tsx](./src/games/humanities/economics/behavioral-economics/overconfidence/calibration.tsx)
│   │   │   │   │       ├── [components.tsx](./src/games/humanities/economics/behavioral-economics/overconfidence/components.tsx)
│   │   │   │   │       ├── [constants.ts](./src/games/humanities/economics/behavioral-economics/overconfidence/constants.ts)
│   │   │   │   │       ├── [game.ts](./src/games/humanities/economics/behavioral-economics/overconfidence/game.ts)
│   │   │   │   │       ├── [index.tsx](./src/games/humanities/economics/behavioral-economics/overconfidence/index.tsx)
│   │   │   │   │       ├── [market.tsx](./src/games/humanities/economics/behavioral-economics/overconfidence/market.tsx)
│   │   │   │   │       ├── [question.tsx](./src/games/humanities/economics/behavioral-economics/overconfidence/question.tsx)
│   │   │   │   │       ├── [reducer.ts](./src/games/humanities/economics/behavioral-economics/overconfidence/reducer.ts)
│   │   │   │   │       └── [types.ts](./src/games/humanities/economics/behavioral-economics/overconfidence/types.ts)
│   │   │   │   ├── game-theory/
│   │   │   │   │   ├── auction/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/game-theory/auction/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/game-theory/auction/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/game-theory/auction/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/game-theory/auction/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/game-theory/auction/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/game-theory/auction/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/game-theory/auction/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/game-theory/auction/types.ts)
│   │   │   │   │   ├── bargaining/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/game-theory/bargaining/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/game-theory/bargaining/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/game-theory/bargaining/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/game-theory/bargaining/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/game-theory/bargaining/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/game-theory/bargaining/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/game-theory/bargaining/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/game-theory/bargaining/types.ts)
│   │   │   │   │   ├── basics/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/game-theory/basics/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/game-theory/basics/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/game-theory/basics/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/game-theory/basics/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/game-theory/basics/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/game-theory/basics/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/game-theory/basics/index.tsx)
│   │   │   │   │   │   ├── [panels.tsx](./src/games/humanities/economics/game-theory/basics/panels.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/game-theory/basics/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/game-theory/basics/types.ts)
│   │   │   │   │   ├── bayesian/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/game-theory/bayesian/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/game-theory/bayesian/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/game-theory/bayesian/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/game-theory/bayesian/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/game-theory/bayesian/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/game-theory/bayesian/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/game-theory/bayesian/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/game-theory/bayesian/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/game-theory/bayesian/types.ts)
│   │   │   │   │   ├── evolution/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/game-theory/evolution/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/game-theory/evolution/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/game-theory/evolution/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/game-theory/evolution/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/game-theory/evolution/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/game-theory/evolution/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/game-theory/evolution/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/game-theory/evolution/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/game-theory/evolution/types.ts)
│   │   │   │   │   ├── mechanism/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/game-theory/mechanism/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/game-theory/mechanism/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/game-theory/mechanism/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/game-theory/mechanism/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/game-theory/mechanism/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/game-theory/mechanism/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/game-theory/mechanism/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/game-theory/mechanism/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/game-theory/mechanism/types.ts)
│   │   │   │   │   ├── nash/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/game-theory/nash/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/game-theory/nash/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/game-theory/nash/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/game-theory/nash/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/game-theory/nash/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/game-theory/nash/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/game-theory/nash/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/game-theory/nash/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/game-theory/nash/types.ts)
│   │   │   │   │   ├── prisoners-dilemma/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/game-theory/prisoners-dilemma/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/game-theory/prisoners-dilemma/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [tournament.test.ts](./src/games/humanities/economics/game-theory/prisoners-dilemma/__tests__/tournament.test.ts)
│   │   │   │   │   │   ├── [behaviours.ts](./src/games/humanities/economics/game-theory/prisoners-dilemma/behaviours.ts)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/game-theory/prisoners-dilemma/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/game-theory/prisoners-dilemma/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/game-theory/prisoners-dilemma/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/game-theory/prisoners-dilemma/reducer.ts)
│   │   │   │   │   │   ├── [tournament.ts](./src/games/humanities/economics/game-theory/prisoners-dilemma/tournament.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/game-theory/prisoners-dilemma/types.ts)
│   │   │   │   │   ├── repeated/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/game-theory/repeated/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/game-theory/repeated/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/game-theory/repeated/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/game-theory/repeated/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/game-theory/repeated/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/game-theory/repeated/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/game-theory/repeated/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/game-theory/repeated/types.ts)
│   │   │   │   │   ├── rps/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/game-theory/rps/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/game-theory/rps/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/game-theory/rps/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/game-theory/rps/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/game-theory/rps/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/game-theory/rps/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/game-theory/rps/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/game-theory/rps/types.ts)
│   │   │   │   │   ├── sequential/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/game-theory/sequential/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/game-theory/sequential/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/game-theory/sequential/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/game-theory/sequential/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/game-theory/sequential/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/game-theory/sequential/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/game-theory/sequential/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/game-theory/sequential/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/game-theory/sequential/types.ts)
│   │   │   │   │   ├── signaling/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/game-theory/signaling/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/game-theory/signaling/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/game-theory/signaling/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/game-theory/signaling/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/game-theory/signaling/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/game-theory/signaling/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/game-theory/signaling/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/game-theory/signaling/types.ts)
│   │   │   │   │   └── stag-hunt/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   ├── [game.test.ts](./src/games/humanities/economics/game-theory/stag-hunt/__tests__/game.test.ts)
│   │   │   │   │       │   ├── [index.test.tsx](./src/games/humanities/economics/game-theory/stag-hunt/__tests__/index.test.tsx)
│   │   │   │   │       │   └── [reducer.test.ts](./src/games/humanities/economics/game-theory/stag-hunt/__tests__/reducer.test.ts)
│   │   │   │   │       ├── [constants.ts](./src/games/humanities/economics/game-theory/stag-hunt/constants.ts)
│   │   │   │   │       ├── [game.ts](./src/games/humanities/economics/game-theory/stag-hunt/game.ts)
│   │   │   │   │       ├── [index.tsx](./src/games/humanities/economics/game-theory/stag-hunt/index.tsx)
│   │   │   │   │       ├── [reducer.ts](./src/games/humanities/economics/game-theory/stag-hunt/reducer.ts)
│   │   │   │   │       └── [types.ts](./src/games/humanities/economics/game-theory/stag-hunt/types.ts)
│   │   │   │   ├── macroeconomics/
│   │   │   │   │   ├── ad-as/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/macroeconomics/ad-as/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/macroeconomics/ad-as/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/macroeconomics/ad-as/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/macroeconomics/ad-as/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/macroeconomics/ad-as/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/macroeconomics/ad-as/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/macroeconomics/ad-as/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/macroeconomics/ad-as/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/macroeconomics/ad-as/types.ts)
│   │   │   │   │   ├── business-cycles/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/macroeconomics/business-cycles/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/macroeconomics/business-cycles/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/macroeconomics/business-cycles/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/macroeconomics/business-cycles/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/macroeconomics/business-cycles/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/macroeconomics/business-cycles/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/macroeconomics/business-cycles/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/macroeconomics/business-cycles/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/macroeconomics/business-cycles/types.ts)
│   │   │   │   │   ├── fiscal/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/macroeconomics/fiscal/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/macroeconomics/fiscal/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/macroeconomics/fiscal/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/macroeconomics/fiscal/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/macroeconomics/fiscal/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/macroeconomics/fiscal/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/macroeconomics/fiscal/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/macroeconomics/fiscal/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/macroeconomics/fiscal/types.ts)
│   │   │   │   │   ├── gdp/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/macroeconomics/gdp/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/macroeconomics/gdp/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/macroeconomics/gdp/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/macroeconomics/gdp/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/macroeconomics/gdp/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/macroeconomics/gdp/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/macroeconomics/gdp/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/macroeconomics/gdp/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/macroeconomics/gdp/types.ts)
│   │   │   │   │   ├── inequality/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/macroeconomics/inequality/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/macroeconomics/inequality/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/macroeconomics/inequality/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/macroeconomics/inequality/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/macroeconomics/inequality/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/macroeconomics/inequality/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/macroeconomics/inequality/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/macroeconomics/inequality/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/macroeconomics/inequality/types.ts)
│   │   │   │   │   ├── institutions/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/macroeconomics/institutions/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/macroeconomics/institutions/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/macroeconomics/institutions/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/macroeconomics/institutions/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/macroeconomics/institutions/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/macroeconomics/institutions/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/macroeconomics/institutions/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/macroeconomics/institutions/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/macroeconomics/institutions/types.ts)
│   │   │   │   │   ├── is-lm/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/macroeconomics/is-lm/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/macroeconomics/is-lm/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/macroeconomics/is-lm/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/macroeconomics/is-lm/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/macroeconomics/is-lm/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/macroeconomics/is-lm/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/macroeconomics/is-lm/index.tsx)
│   │   │   │   │   │   ├── [plot.tsx](./src/games/humanities/economics/macroeconomics/is-lm/plot.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/macroeconomics/is-lm/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/macroeconomics/is-lm/types.ts)
│   │   │   │   │   ├── keynesian/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/macroeconomics/keynesian/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/macroeconomics/keynesian/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/macroeconomics/keynesian/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/macroeconomics/keynesian/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/macroeconomics/keynesian/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/macroeconomics/keynesian/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/macroeconomics/keynesian/index.tsx)
│   │   │   │   │   │   ├── [panels.tsx](./src/games/humanities/economics/macroeconomics/keynesian/panels.tsx)
│   │   │   │   │   │   ├── [primitives.tsx](./src/games/humanities/economics/macroeconomics/keynesian/primitives.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/macroeconomics/keynesian/reducer.ts)
│   │   │   │   │   │   ├── [results.tsx](./src/games/humanities/economics/macroeconomics/keynesian/results.tsx)
│   │   │   │   │   │   ├── [screens.tsx](./src/games/humanities/economics/macroeconomics/keynesian/screens.tsx)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/macroeconomics/keynesian/types.ts)
│   │   │   │   │   ├── migration/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/macroeconomics/migration/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/macroeconomics/migration/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/macroeconomics/migration/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/macroeconomics/migration/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/macroeconomics/migration/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/macroeconomics/migration/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/macroeconomics/migration/index.tsx)
│   │   │   │   │   │   ├── [panels.tsx](./src/games/humanities/economics/macroeconomics/migration/panels.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/macroeconomics/migration/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/macroeconomics/migration/types.ts)
│   │   │   │   │   ├── monetary-policy/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/macroeconomics/monetary-policy/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/macroeconomics/monetary-policy/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/macroeconomics/monetary-policy/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/macroeconomics/monetary-policy/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/macroeconomics/monetary-policy/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/macroeconomics/monetary-policy/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/macroeconomics/monetary-policy/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/macroeconomics/monetary-policy/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/macroeconomics/monetary-policy/types.ts)
│   │   │   │   │   ├── okuns/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/macroeconomics/okuns/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/macroeconomics/okuns/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/macroeconomics/okuns/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── components/
│   │   │   │   │   │   │   ├── [estimate.tsx](./src/games/humanities/economics/macroeconomics/okuns/components/estimate.tsx)
│   │   │   │   │   │   │   ├── [intro.tsx](./src/games/humanities/economics/macroeconomics/okuns/components/intro.tsx)
│   │   │   │   │   │   │   ├── [result.tsx](./src/games/humanities/economics/macroeconomics/okuns/components/result.tsx)
│   │   │   │   │   │   │   └── [steer.tsx](./src/games/humanities/economics/macroeconomics/okuns/components/steer.tsx)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/macroeconomics/okuns/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/macroeconomics/okuns/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/macroeconomics/okuns/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/macroeconomics/okuns/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/macroeconomics/okuns/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/macroeconomics/okuns/types.ts)
│   │   │   │   │   ├── phillips/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/macroeconomics/phillips/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/macroeconomics/phillips/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/macroeconomics/phillips/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/macroeconomics/phillips/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/macroeconomics/phillips/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/macroeconomics/phillips/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/macroeconomics/phillips/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/macroeconomics/phillips/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/macroeconomics/phillips/types.ts)
│   │   │   │   │   ├── poverty-trap/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/macroeconomics/poverty-trap/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/macroeconomics/poverty-trap/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/macroeconomics/poverty-trap/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/macroeconomics/poverty-trap/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/macroeconomics/poverty-trap/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/macroeconomics/poverty-trap/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/macroeconomics/poverty-trap/index.tsx)
│   │   │   │   │   │   ├── [panel.tsx](./src/games/humanities/economics/macroeconomics/poverty-trap/panel.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/macroeconomics/poverty-trap/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/macroeconomics/poverty-trap/types.ts)
│   │   │   │   │   ├── rcts/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/macroeconomics/rcts/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/macroeconomics/rcts/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/macroeconomics/rcts/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/macroeconomics/rcts/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/macroeconomics/rcts/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/macroeconomics/rcts/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/macroeconomics/rcts/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/macroeconomics/rcts/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/macroeconomics/rcts/types.ts)
│   │   │   │   │   └── trade/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   ├── [game.test.ts](./src/games/humanities/economics/macroeconomics/trade/__tests__/game.test.ts)
│   │   │   │   │       │   ├── [index.test.tsx](./src/games/humanities/economics/macroeconomics/trade/__tests__/index.test.tsx)
│   │   │   │   │       │   └── [reducer.test.ts](./src/games/humanities/economics/macroeconomics/trade/__tests__/reducer.test.ts)
│   │   │   │   │       ├── [chart-scaffold.tsx](./src/games/humanities/economics/macroeconomics/trade/chart-scaffold.tsx)
│   │   │   │   │       ├── [chart.tsx](./src/games/humanities/economics/macroeconomics/trade/chart.tsx)
│   │   │   │   │       ├── [components.tsx](./src/games/humanities/economics/macroeconomics/trade/components.tsx)
│   │   │   │   │       ├── [constants.ts](./src/games/humanities/economics/macroeconomics/trade/constants.ts)
│   │   │   │   │       ├── [game.ts](./src/games/humanities/economics/macroeconomics/trade/game.ts)
│   │   │   │   │       ├── [index.tsx](./src/games/humanities/economics/macroeconomics/trade/index.tsx)
│   │   │   │   │       ├── [panels.tsx](./src/games/humanities/economics/macroeconomics/trade/panels.tsx)
│   │   │   │   │       ├── [reducer.ts](./src/games/humanities/economics/macroeconomics/trade/reducer.ts)
│   │   │   │   │       ├── [retaliation.tsx](./src/games/humanities/economics/macroeconomics/trade/retaliation.tsx)
│   │   │   │   │       └── [types.ts](./src/games/humanities/economics/macroeconomics/trade/types.ts)
│   │   │   │   ├── markets-and-public-policy/
│   │   │   │   │   ├── arbitrage/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/markets-and-public-policy/arbitrage/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/markets-and-public-policy/arbitrage/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/markets-and-public-policy/arbitrage/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/markets-and-public-policy/arbitrage/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/markets-and-public-policy/arbitrage/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/markets-and-public-policy/arbitrage/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/markets-and-public-policy/arbitrage/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/markets-and-public-policy/arbitrage/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/markets-and-public-policy/arbitrage/types.ts)
│   │   │   │   │   ├── capm/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/markets-and-public-policy/capm/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/markets-and-public-policy/capm/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/markets-and-public-policy/capm/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/markets-and-public-policy/capm/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/markets-and-public-policy/capm/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/markets-and-public-policy/capm/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/markets-and-public-policy/capm/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/markets-and-public-policy/capm/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/markets-and-public-policy/capm/types.ts)
│   │   │   │   │   ├── commons/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/markets-and-public-policy/commons/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/markets-and-public-policy/commons/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/markets-and-public-policy/commons/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/markets-and-public-policy/commons/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/markets-and-public-policy/commons/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/markets-and-public-policy/commons/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/markets-and-public-policy/commons/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/markets-and-public-policy/commons/types.ts)
│   │   │   │   │   ├── emh/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/markets-and-public-policy/emh/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/markets-and-public-policy/emh/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/markets-and-public-policy/emh/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/markets-and-public-policy/emh/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/markets-and-public-policy/emh/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/markets-and-public-policy/emh/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/markets-and-public-policy/emh/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/markets-and-public-policy/emh/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/markets-and-public-policy/emh/types.ts)
│   │   │   │   │   ├── externalities/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/markets-and-public-policy/externalities/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/markets-and-public-policy/externalities/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/markets-and-public-policy/externalities/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/markets-and-public-policy/externalities/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/markets-and-public-policy/externalities/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/markets-and-public-policy/externalities/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/markets-and-public-policy/externalities/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/markets-and-public-policy/externalities/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/markets-and-public-policy/externalities/types.ts)
│   │   │   │   │   ├── lemons/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/markets-and-public-policy/lemons/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/markets-and-public-policy/lemons/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/markets-and-public-policy/lemons/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/markets-and-public-policy/lemons/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/markets-and-public-policy/lemons/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/markets-and-public-policy/lemons/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/markets-and-public-policy/lemons/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/markets-and-public-policy/lemons/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/markets-and-public-policy/lemons/types.ts)
│   │   │   │   │   ├── market-failures/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/markets-and-public-policy/market-failures/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/markets-and-public-policy/market-failures/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/markets-and-public-policy/market-failures/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/markets-and-public-policy/market-failures/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/markets-and-public-policy/market-failures/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/markets-and-public-policy/market-failures/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/markets-and-public-policy/market-failures/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/markets-and-public-policy/market-failures/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/markets-and-public-policy/market-failures/types.ts)
│   │   │   │   │   ├── moral-hazard/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/markets-and-public-policy/moral-hazard/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/markets-and-public-policy/moral-hazard/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/markets-and-public-policy/moral-hazard/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/markets-and-public-policy/moral-hazard/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/markets-and-public-policy/moral-hazard/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/markets-and-public-policy/moral-hazard/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/markets-and-public-policy/moral-hazard/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/markets-and-public-policy/moral-hazard/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/markets-and-public-policy/moral-hazard/types.ts)
│   │   │   │   │   ├── order-book/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/markets-and-public-policy/order-book/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/markets-and-public-policy/order-book/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/markets-and-public-policy/order-book/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/markets-and-public-policy/order-book/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/markets-and-public-policy/order-book/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/markets-and-public-policy/order-book/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/markets-and-public-policy/order-book/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/markets-and-public-policy/order-book/types.ts)
│   │   │   │   │   ├── portfolio/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/markets-and-public-policy/portfolio/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/markets-and-public-policy/portfolio/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/markets-and-public-policy/portfolio/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [challenge.tsx](./src/games/humanities/economics/markets-and-public-policy/portfolio/challenge.tsx)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/markets-and-public-policy/portfolio/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/markets-and-public-policy/portfolio/constants.ts)
│   │   │   │   │   │   ├── [frontier.tsx](./src/games/humanities/economics/markets-and-public-policy/portfolio/frontier.tsx)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/markets-and-public-policy/portfolio/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/markets-and-public-policy/portfolio/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/markets-and-public-policy/portfolio/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/markets-and-public-policy/portfolio/types.ts)
│   │   │   │   │   ├── public-choice/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/markets-and-public-policy/public-choice/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/markets-and-public-policy/public-choice/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/markets-and-public-policy/public-choice/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/markets-and-public-policy/public-choice/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/markets-and-public-policy/public-choice/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/markets-and-public-policy/public-choice/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/markets-and-public-policy/public-choice/index.tsx)
│   │   │   │   │   │   ├── [median.tsx](./src/games/humanities/economics/markets-and-public-policy/public-choice/median.tsx)
│   │   │   │   │   │   ├── [paradox.tsx](./src/games/humanities/economics/markets-and-public-policy/public-choice/paradox.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/markets-and-public-policy/public-choice/reducer.ts)
│   │   │   │   │   │   ├── [rent.tsx](./src/games/humanities/economics/markets-and-public-policy/public-choice/rent.tsx)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/markets-and-public-policy/public-choice/types.ts)
│   │   │   │   │   ├── public-goods/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/markets-and-public-policy/public-goods/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/markets-and-public-policy/public-goods/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/markets-and-public-policy/public-goods/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/markets-and-public-policy/public-goods/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/markets-and-public-policy/public-goods/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/markets-and-public-policy/public-goods/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/markets-and-public-policy/public-goods/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/markets-and-public-policy/public-goods/types.ts)
│   │   │   │   │   └── time-value/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   ├── [game.test.ts](./src/games/humanities/economics/markets-and-public-policy/time-value/__tests__/game.test.ts)
│   │   │   │   │       │   ├── [index.test.tsx](./src/games/humanities/economics/markets-and-public-policy/time-value/__tests__/index.test.tsx)
│   │   │   │   │       │   └── [reducer.test.ts](./src/games/humanities/economics/markets-and-public-policy/time-value/__tests__/reducer.test.ts)
│   │   │   │   │       ├── [calculator.tsx](./src/games/humanities/economics/markets-and-public-policy/time-value/calculator.tsx)
│   │   │   │   │       ├── [components.tsx](./src/games/humanities/economics/markets-and-public-policy/time-value/components.tsx)
│   │   │   │   │       ├── [constants.ts](./src/games/humanities/economics/markets-and-public-policy/time-value/constants.ts)
│   │   │   │   │       ├── [game.ts](./src/games/humanities/economics/markets-and-public-policy/time-value/game.ts)
│   │   │   │   │       ├── [index.tsx](./src/games/humanities/economics/markets-and-public-policy/time-value/index.tsx)
│   │   │   │   │       ├── [phases.tsx](./src/games/humanities/economics/markets-and-public-policy/time-value/phases.tsx)
│   │   │   │   │       ├── [reducer.ts](./src/games/humanities/economics/markets-and-public-policy/time-value/reducer.ts)
│   │   │   │   │       └── [types.ts](./src/games/humanities/economics/markets-and-public-policy/time-value/types.ts)
│   │   │   │   ├── microeconomics/
│   │   │   │   │   ├── causal/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/microeconomics/causal/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/microeconomics/causal/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/microeconomics/causal/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/microeconomics/causal/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/microeconomics/causal/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/microeconomics/causal/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/microeconomics/causal/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/microeconomics/causal/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/microeconomics/causal/types.ts)
│   │   │   │   │   ├── consumer/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/microeconomics/consumer/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/microeconomics/consumer/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/microeconomics/consumer/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/microeconomics/consumer/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/microeconomics/consumer/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/microeconomics/consumer/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/microeconomics/consumer/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/microeconomics/consumer/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/microeconomics/consumer/types.ts)
│   │   │   │   │   ├── elasticity/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/microeconomics/elasticity/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/microeconomics/elasticity/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/microeconomics/elasticity/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/microeconomics/elasticity/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/microeconomics/elasticity/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/microeconomics/elasticity/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/microeconomics/elasticity/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/microeconomics/elasticity/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/microeconomics/elasticity/types.ts)
│   │   │   │   │   ├── human-capital/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/microeconomics/human-capital/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/microeconomics/human-capital/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/microeconomics/human-capital/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/microeconomics/human-capital/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/microeconomics/human-capital/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/microeconomics/human-capital/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/microeconomics/human-capital/index.tsx)
│   │   │   │   │   │   ├── [panels.tsx](./src/games/humanities/economics/microeconomics/human-capital/panels.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/microeconomics/human-capital/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/microeconomics/human-capital/types.ts)
│   │   │   │   │   ├── labor/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/microeconomics/labor/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/microeconomics/labor/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/microeconomics/labor/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/microeconomics/labor/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/microeconomics/labor/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/microeconomics/labor/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/microeconomics/labor/index.tsx)
│   │   │   │   │   │   ├── [panels.tsx](./src/games/humanities/economics/microeconomics/labor/panels.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/microeconomics/labor/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/microeconomics/labor/types.ts)
│   │   │   │   │   ├── marginal-utility/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/microeconomics/marginal-utility/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/microeconomics/marginal-utility/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/microeconomics/marginal-utility/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [challenge.tsx](./src/games/humanities/economics/microeconomics/marginal-utility/challenge.tsx)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/microeconomics/marginal-utility/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/microeconomics/marginal-utility/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/microeconomics/marginal-utility/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/microeconomics/marginal-utility/index.tsx)
│   │   │   │   │   │   ├── [lab.tsx](./src/games/humanities/economics/microeconomics/marginal-utility/lab.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/microeconomics/marginal-utility/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/microeconomics/marginal-utility/types.ts)
│   │   │   │   │   ├── monopolistic/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/microeconomics/monopolistic/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/microeconomics/monopolistic/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/microeconomics/monopolistic/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [chart.tsx](./src/games/humanities/economics/microeconomics/monopolistic/chart.tsx)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/microeconomics/monopolistic/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/microeconomics/monopolistic/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/microeconomics/monopolistic/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/microeconomics/monopolistic/index.tsx)
│   │   │   │   │   │   ├── [lab.tsx](./src/games/humanities/economics/microeconomics/monopolistic/lab.tsx)
│   │   │   │   │   │   ├── [panels.tsx](./src/games/humanities/economics/microeconomics/monopolistic/panels.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/microeconomics/monopolistic/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/microeconomics/monopolistic/types.ts)
│   │   │   │   │   ├── monopoly/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/microeconomics/monopoly/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/microeconomics/monopoly/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/microeconomics/monopoly/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/microeconomics/monopoly/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/microeconomics/monopoly/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/microeconomics/monopoly/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/microeconomics/monopoly/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/microeconomics/monopoly/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/microeconomics/monopoly/types.ts)
│   │   │   │   │   ├── oligopoly/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/microeconomics/oligopoly/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/microeconomics/oligopoly/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/microeconomics/oligopoly/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/microeconomics/oligopoly/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/microeconomics/oligopoly/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/microeconomics/oligopoly/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/microeconomics/oligopoly/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/microeconomics/oligopoly/types.ts)
│   │   │   │   │   ├── opportunity-cost/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/microeconomics/opportunity-cost/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/microeconomics/opportunity-cost/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/microeconomics/opportunity-cost/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── components/
│   │   │   │   │   │   │   ├── [challenge.tsx](./src/games/humanities/economics/microeconomics/opportunity-cost/components/challenge.tsx)
│   │   │   │   │   │   │   ├── [format.ts](./src/games/humanities/economics/microeconomics/opportunity-cost/components/format.ts)
│   │   │   │   │   │   │   ├── [results.tsx](./src/games/humanities/economics/microeconomics/opportunity-cost/components/results.tsx)
│   │   │   │   │   │   │   └── [sandbox.tsx](./src/games/humanities/economics/microeconomics/opportunity-cost/components/sandbox.tsx)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/microeconomics/opportunity-cost/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/microeconomics/opportunity-cost/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/microeconomics/opportunity-cost/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/microeconomics/opportunity-cost/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/microeconomics/opportunity-cost/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/microeconomics/opportunity-cost/types.ts)
│   │   │   │   │   ├── perfect-competition/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/microeconomics/perfect-competition/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/microeconomics/perfect-competition/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/microeconomics/perfect-competition/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/microeconomics/perfect-competition/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/microeconomics/perfect-competition/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/microeconomics/perfect-competition/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/microeconomics/perfect-competition/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/microeconomics/perfect-competition/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/microeconomics/perfect-competition/types.ts)
│   │   │   │   │   ├── price-discrimination/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/microeconomics/price-discrimination/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/economics/microeconomics/price-discrimination/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./src/games/humanities/economics/microeconomics/price-discrimination/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/microeconomics/price-discrimination/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/microeconomics/price-discrimination/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/microeconomics/price-discrimination/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/microeconomics/price-discrimination/index.tsx)
│   │   │   │   │   │   ├── [panels.tsx](./src/games/humanities/economics/microeconomics/price-discrimination/panels.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./src/games/humanities/economics/microeconomics/price-discrimination/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/microeconomics/price-discrimination/types.ts)
│   │   │   │   │   ├── price-lab/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./src/games/humanities/economics/microeconomics/price-lab/__tests__/game.test.ts)
│   │   │   │   │   │   │   └── [index.test.tsx](./src/games/humanities/economics/microeconomics/price-lab/__tests__/index.test.tsx)
│   │   │   │   │   │   ├── [components.tsx](./src/games/humanities/economics/microeconomics/price-lab/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/games/humanities/economics/microeconomics/price-lab/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/games/humanities/economics/microeconomics/price-lab/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/games/humanities/economics/microeconomics/price-lab/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/games/humanities/economics/microeconomics/price-lab/types.ts)
│   │   │   │   │   └── production/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   ├── [game.test.ts](./src/games/humanities/economics/microeconomics/production/__tests__/game.test.ts)
│   │   │   │   │       │   ├── [index.test.tsx](./src/games/humanities/economics/microeconomics/production/__tests__/index.test.tsx)
│   │   │   │   │       │   └── [reducer.test.ts](./src/games/humanities/economics/microeconomics/production/__tests__/reducer.test.ts)
│   │   │   │   │       ├── [components.tsx](./src/games/humanities/economics/microeconomics/production/components.tsx)
│   │   │   │   │       ├── [constants.ts](./src/games/humanities/economics/microeconomics/production/constants.ts)
│   │   │   │   │       ├── [curves.tsx](./src/games/humanities/economics/microeconomics/production/curves.tsx)
│   │   │   │   │       ├── [game.ts](./src/games/humanities/economics/microeconomics/production/game.ts)
│   │   │   │   │       ├── [index.tsx](./src/games/humanities/economics/microeconomics/production/index.tsx)
│   │   │   │   │       ├── [metrics.tsx](./src/games/humanities/economics/microeconomics/production/metrics.tsx)
│   │   │   │   │       ├── [quiz.tsx](./src/games/humanities/economics/microeconomics/production/quiz.tsx)
│   │   │   │   │       ├── [reducer.ts](./src/games/humanities/economics/microeconomics/production/reducer.ts)
│   │   │   │   │       └── [types.ts](./src/games/humanities/economics/microeconomics/production/types.ts)
│   │   │   │   └── [data.ts](./src/games/humanities/economics/data.ts)
│   │   │   ├── geography/
│   │   │   │   ├── _shared/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [countries.test.ts](./src/games/humanities/geography/_shared/__tests__/countries.test.ts)
│   │   │   │   │   │   └── [quiz.test.ts](./src/games/humanities/geography/_shared/__tests__/quiz.test.ts)
│   │   │   │   │   ├── [borders.ts](./src/games/humanities/geography/_shared/borders.ts)
│   │   │   │   │   ├── [countries-data.ts](./src/games/humanities/geography/_shared/countries-data.ts)
│   │   │   │   │   ├── [countries.ts](./src/games/humanities/geography/_shared/countries.ts)
│   │   │   │   │   ├── [population.ts](./src/games/humanities/geography/_shared/population.ts)
│   │   │   │   │   └── [quiz.ts](./src/games/humanities/geography/_shared/quiz.ts)
│   │   │   │   ├── guess/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/geography/guess/__tests__/index.test.tsx)
│   │   │   │   │   │   ├── [useGuess.test.ts](./src/games/humanities/geography/guess/__tests__/useGuess.test.ts)
│   │   │   │   │   │   └── [utils.test.ts](./src/games/humanities/geography/guess/__tests__/utils.test.ts)
│   │   │   │   │   ├── [index.tsx](./src/games/humanities/geography/guess/index.tsx)
│   │   │   │   │   ├── [types.ts](./src/games/humanities/geography/guess/types.ts)
│   │   │   │   │   ├── [useGuess.ts](./src/games/humanities/geography/guess/useGuess.ts)
│   │   │   │   │   └── [utils.ts](./src/games/humanities/geography/guess/utils.ts)
│   │   │   │   ├── higher-or-lower/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/geography/higher-or-lower/__tests__/index.test.tsx)
│   │   │   │   │   │   ├── [useHigherOrLower.test.ts](./src/games/humanities/geography/higher-or-lower/__tests__/useHigherOrLower.test.ts)
│   │   │   │   │   │   └── [utils.test.ts](./src/games/humanities/geography/higher-or-lower/__tests__/utils.test.ts)
│   │   │   │   │   ├── [index.tsx](./src/games/humanities/geography/higher-or-lower/index.tsx)
│   │   │   │   │   ├── [types.ts](./src/games/humanities/geography/higher-or-lower/types.ts)
│   │   │   │   │   ├── [useHigherOrLower.ts](./src/games/humanities/geography/higher-or-lower/useHigherOrLower.ts)
│   │   │   │   │   └── [utils.ts](./src/games/humanities/geography/higher-or-lower/utils.ts)
│   │   │   │   ├── nyt-connections/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/geography/nyt-connections/__tests__/index.test.tsx)
│   │   │   │   │   │   ├── [puzzles.test.ts](./src/games/humanities/geography/nyt-connections/__tests__/puzzles.test.ts)
│   │   │   │   │   │   ├── [useConnections.test.ts](./src/games/humanities/geography/nyt-connections/__tests__/useConnections.test.ts)
│   │   │   │   │   │   └── [utils.test.ts](./src/games/humanities/geography/nyt-connections/__tests__/utils.test.ts)
│   │   │   │   │   ├── [index.tsx](./src/games/humanities/geography/nyt-connections/index.tsx)
│   │   │   │   │   ├── [puzzles.ts](./src/games/humanities/geography/nyt-connections/puzzles.ts)
│   │   │   │   │   ├── [types.ts](./src/games/humanities/geography/nyt-connections/types.ts)
│   │   │   │   │   ├── [useConnections.ts](./src/games/humanities/geography/nyt-connections/useConnections.ts)
│   │   │   │   │   └── [utils.ts](./src/games/humanities/geography/nyt-connections/utils.ts)
│   │   │   │   ├── nyt-wordle/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [index.test.tsx](./src/games/humanities/geography/nyt-wordle/__tests__/index.test.tsx)
│   │   │   │   │   │   ├── [useWordle.test.ts](./src/games/humanities/geography/nyt-wordle/__tests__/useWordle.test.ts)
│   │   │   │   │   │   └── [utils.test.ts](./src/games/humanities/geography/nyt-wordle/__tests__/utils.test.ts)
│   │   │   │   │   ├── [index.tsx](./src/games/humanities/geography/nyt-wordle/index.tsx)
│   │   │   │   │   ├── [types.ts](./src/games/humanities/geography/nyt-wordle/types.ts)
│   │   │   │   │   ├── [useWordle.ts](./src/games/humanities/geography/nyt-wordle/useWordle.ts)
│   │   │   │   │   └── [utils.ts](./src/games/humanities/geography/nyt-wordle/utils.ts)
│   │   │   │   └── sort-continents/
│   │   │   │       ├── __tests__/
│   │   │   │       │   ├── [index.test.tsx](./src/games/humanities/geography/sort-continents/__tests__/index.test.tsx)
│   │   │   │       │   ├── [useContinentsSort.test.ts](./src/games/humanities/geography/sort-continents/__tests__/useContinentsSort.test.ts)
│   │   │   │       │   └── [utils.test.ts](./src/games/humanities/geography/sort-continents/__tests__/utils.test.ts)
│   │   │   │       ├── [index.tsx](./src/games/humanities/geography/sort-continents/index.tsx)
│   │   │   │       ├── [types.ts](./src/games/humanities/geography/sort-continents/types.ts)
│   │   │   │       ├── [useContinentsSort.ts](./src/games/humanities/geography/sort-continents/useContinentsSort.ts)
│   │   │   │       └── [utils.ts](./src/games/humanities/geography/sort-continents/utils.ts)
│   │   │   ├── history/
│   │   │   │   ├── myth-vs-fact/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [index.test.tsx](./src/games/humanities/history/myth-vs-fact/__tests__/index.test.tsx)
│   │   │   │   │   ├── data/
│   │   │   │   │   │   ├── [items.csv](./src/games/humanities/history/myth-vs-fact/data/items.csv)
│   │   │   │   │   │   └── [items.json](./src/games/humanities/history/myth-vs-fact/data/items.json)
│   │   │   │   │   ├── utils/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [game.test.ts](./src/games/humanities/history/myth-vs-fact/utils/__tests__/game.test.ts)
│   │   │   │   │   │   └── [game.ts](./src/games/humanities/history/myth-vs-fact/utils/game.ts)
│   │   │   │   │   ├── [constants.ts](./src/games/humanities/history/myth-vs-fact/constants.ts)
│   │   │   │   │   ├── [index.tsx](./src/games/humanities/history/myth-vs-fact/index.tsx)
│   │   │   │   │   └── [types.ts](./src/games/humanities/history/myth-vs-fact/types.ts)
│   │   │   │   └── through-the-years/
│   │   │   │       ├── __tests__/
│   │   │   │       │   ├── components/
│   │   │   │       │   │   ├── [BrowseCompact.test.tsx](./src/games/humanities/history/through-the-years/__tests__/components/BrowseCompact.test.tsx)
│   │   │   │       │   │   ├── [BrowseSpread.test.tsx](./src/games/humanities/history/through-the-years/__tests__/components/BrowseSpread.test.tsx)
│   │   │   │       │   │   ├── [Card.test.tsx](./src/games/humanities/history/through-the-years/__tests__/components/Card.test.tsx)
│   │   │   │       │   │   └── [Timeline.test.tsx](./src/games/humanities/history/through-the-years/__tests__/components/Timeline.test.tsx)
│   │   │   │       │   ├── screens/
│   │   │   │       │   │   ├── [BrowseScreen.test.tsx](./src/games/humanities/history/through-the-years/__tests__/screens/BrowseScreen.test.tsx)
│   │   │   │       │   │   ├── [GameOverScreen.test.tsx](./src/games/humanities/history/through-the-years/__tests__/screens/GameOverScreen.test.tsx)
│   │   │   │       │   │   ├── [GameScreen.test.tsx](./src/games/humanities/history/through-the-years/__tests__/screens/GameScreen.test.tsx)
│   │   │   │       │   │   └── [SetupScreen.test.tsx](./src/games/humanities/history/through-the-years/__tests__/screens/SetupScreen.test.tsx)
│   │   │   │       │   ├── [engine.test.ts](./src/games/humanities/history/through-the-years/__tests__/engine.test.ts)
│   │   │   │       │   ├── [index.test.tsx](./src/games/humanities/history/through-the-years/__tests__/index.test.tsx)
│   │   │   │       │   └── [store.test.ts](./src/games/humanities/history/through-the-years/__tests__/store.test.ts)
│   │   │   │       ├── components/
│   │   │   │       │   ├── components/
│   │   │   │       │   │   ├── [BrowseCompact.tsx](./src/games/humanities/history/through-the-years/components/components/BrowseCompact.tsx)
│   │   │   │       │   │   ├── [BrowseSpread.tsx](./src/games/humanities/history/through-the-years/components/components/BrowseSpread.tsx)
│   │   │   │       │   │   ├── [Card.tsx](./src/games/humanities/history/through-the-years/components/components/Card.tsx)
│   │   │   │       │   │   └── [Timeline.tsx](./src/games/humanities/history/through-the-years/components/components/Timeline.tsx)
│   │   │   │       │   └── screens/
│   │   │   │       │       ├── [BrowseScreen.tsx](./src/games/humanities/history/through-the-years/components/screens/BrowseScreen.tsx)
│   │   │   │       │       ├── [GameOverScreen.tsx](./src/games/humanities/history/through-the-years/components/screens/GameOverScreen.tsx)
│   │   │   │       │       ├── [GameScreen.tsx](./src/games/humanities/history/through-the-years/components/screens/GameScreen.tsx)
│   │   │   │       │       └── [SetupScreen.tsx](./src/games/humanities/history/through-the-years/components/screens/SetupScreen.tsx)
│   │   │   │       ├── data/
│   │   │   │       │   ├── json/
│   │   │   │       │   │   ├── africa/
│   │   │   │       │   │   │   ├── [egypt-events.json](./src/games/humanities/history/through-the-years/data/json/africa/egypt-events.json)
│   │   │   │       │   │   │   └── [south-africa-events.json](./src/games/humanities/history/through-the-years/data/json/africa/south-africa-events.json)
│   │   │   │       │   │   ├── americas/
│   │   │   │       │   │   │   ├── [mexico-events.json](./src/games/humanities/history/through-the-years/data/json/americas/mexico-events.json)
│   │   │   │       │   │   │   └── [united-states-events.json](./src/games/humanities/history/through-the-years/data/json/americas/united-states-events.json)
│   │   │   │       │   │   ├── asia/
│   │   │   │       │   │   │   ├── [china-events.json](./src/games/humanities/history/through-the-years/data/json/asia/china-events.json)
│   │   │   │       │   │   │   ├── [india-events.json](./src/games/humanities/history/through-the-years/data/json/asia/india-events.json)
│   │   │   │       │   │   │   ├── [iraq-events.json](./src/games/humanities/history/through-the-years/data/json/asia/iraq-events.json)
│   │   │   │       │   │   │   ├── [japan-events.json](./src/games/humanities/history/through-the-years/data/json/asia/japan-events.json)
│   │   │   │       │   │   │   └── [vietnam-events.json](./src/games/humanities/history/through-the-years/data/json/asia/vietnam-events.json)
│   │   │   │       │   │   ├── europe/
│   │   │   │       │   │   │   ├── [france-events.json](./src/games/humanities/history/through-the-years/data/json/europe/france-events.json)
│   │   │   │       │   │   │   ├── [germany-events.json](./src/games/humanities/history/through-the-years/data/json/europe/germany-events.json)
│   │   │   │       │   │   │   ├── [greece-events.json](./src/games/humanities/history/through-the-years/data/json/europe/greece-events.json)
│   │   │   │       │   │   │   ├── [italy-events.json](./src/games/humanities/history/through-the-years/data/json/europe/italy-events.json)
│   │   │   │       │   │   │   └── [united-kingdom-events.json](./src/games/humanities/history/through-the-years/data/json/europe/united-kingdom-events.json)
│   │   │   │       │   │   └── world/
│   │   │   │       │   │       └── [world-events.json](./src/games/humanities/history/through-the-years/data/json/world/world-events.json)
│   │   │   │       │   ├── [categories.ts](./src/games/humanities/history/through-the-years/data/categories.ts)
│   │   │   │       │   ├── [constants.ts](./src/games/humanities/history/through-the-years/data/constants.ts)
│   │   │   │       │   ├── [continents.ts](./src/games/humanities/history/through-the-years/data/continents.ts)
│   │   │   │       │   ├── [decks.ts](./src/games/humanities/history/through-the-years/data/decks.ts)
│   │   │   │       │   └── [modes.ts](./src/games/humanities/history/through-the-years/data/modes.ts)
│   │   │   │       ├── testing/
│   │   │   │       │   └── [fixtures.ts](./src/games/humanities/history/through-the-years/testing/fixtures.ts)
│   │   │   │       ├── [engine.ts](./src/games/humanities/history/through-the-years/engine.ts)
│   │   │   │       ├── [index.tsx](./src/games/humanities/history/through-the-years/index.tsx)
│   │   │   │       ├── [store.ts](./src/games/humanities/history/through-the-years/store.ts)
│   │   │   │       └── [types.ts](./src/games/humanities/history/through-the-years/types.ts)
│   │   │   └── languages/
│   │   │       ├── __tests__/
│   │   │       │   ├── [index.test.tsx](./src/games/humanities/languages/__tests__/index.test.tsx)
│   │   │       │   └── [utils.test.ts](./src/games/humanities/languages/__tests__/utils.test.ts)
│   │   │       ├── english/
│   │   │       │   ├── __tests__/
│   │   │       │   │   ├── [index.test.tsx](./src/games/humanities/languages/english/__tests__/index.test.tsx)
│   │   │       │   │   └── [utils.test.ts](./src/games/humanities/languages/english/__tests__/utils.test.ts)
│   │   │       │   ├── [index.tsx](./src/games/humanities/languages/english/index.tsx)
│   │   │       │   └── [utils.ts](./src/games/humanities/languages/english/utils.ts)
│   │   │       ├── sign/
│   │   │       │   ├── __tests__/
│   │   │       │   │   ├── [index.test.tsx](./src/games/humanities/languages/sign/__tests__/index.test.tsx)
│   │   │       │   │   └── [utils.test.ts](./src/games/humanities/languages/sign/__tests__/utils.test.ts)
│   │   │       │   ├── [index.tsx](./src/games/humanities/languages/sign/index.tsx)
│   │   │       │   └── [utils.ts](./src/games/humanities/languages/sign/utils.ts)
│   │   │       ├── [LanguageList.tsx](./src/games/humanities/languages/LanguageList.tsx)
│   │   │       ├── [flags.ts](./src/games/humanities/languages/flags.ts)
│   │   │       ├── [index.tsx](./src/games/humanities/languages/index.tsx)
│   │   │       └── [utils.ts](./src/games/humanities/languages/utils.ts)
│   │   └── stem/
│   │       ├── chemistry/
│   │       │   └── periodic-table/
│   │       │       ├── __tests__/
│   │       │       │   ├── [index.test.tsx](./src/games/stem/chemistry/periodic-table/__tests__/index.test.tsx)
│   │       │       │   └── [utils.test.ts](./src/games/stem/chemistry/periodic-table/__tests__/utils.test.ts)
│   │       │       ├── [index.tsx](./src/games/stem/chemistry/periodic-table/index.tsx)
│   │       │       └── [utils.ts](./src/games/stem/chemistry/periodic-table/utils.ts)
│   │       ├── engineering/
│   │       │   ├── algorithms/
│   │       │   │   ├── __tests__/
│   │       │   │   │   ├── [searches.test.ts](./src/games/stem/engineering/algorithms/__tests__/searches.test.ts)
│   │       │   │   │   └── [sorts.test.ts](./src/games/stem/engineering/algorithms/__tests__/sorts.test.ts)
│   │       │   │   ├── binary-search/
│   │       │   │   │   └── [index.tsx](./src/games/stem/engineering/algorithms/binary-search/index.tsx)
│   │       │   │   ├── bubble-sort/
│   │       │   │   │   └── [index.tsx](./src/games/stem/engineering/algorithms/bubble-sort/index.tsx)
│   │       │   │   ├── heap-sort/
│   │       │   │   │   └── [index.tsx](./src/games/stem/engineering/algorithms/heap-sort/index.tsx)
│   │       │   │   ├── insertion-sort/
│   │       │   │   │   └── [index.tsx](./src/games/stem/engineering/algorithms/insertion-sort/index.tsx)
│   │       │   │   ├── linear-search/
│   │       │   │   │   └── [index.tsx](./src/games/stem/engineering/algorithms/linear-search/index.tsx)
│   │       │   │   ├── merge-sort/
│   │       │   │   │   └── [index.tsx](./src/games/stem/engineering/algorithms/merge-sort/index.tsx)
│   │       │   │   ├── quick-sort/
│   │       │   │   │   └── [index.tsx](./src/games/stem/engineering/algorithms/quick-sort/index.tsx)
│   │       │   │   ├── selection-sort/
│   │       │   │   │   └── [index.tsx](./src/games/stem/engineering/algorithms/selection-sort/index.tsx)
│   │       │   │   ├── [profiles.ts](./src/games/stem/engineering/algorithms/profiles.ts)
│   │       │   │   ├── [searches.ts](./src/games/stem/engineering/algorithms/searches.ts)
│   │       │   │   ├── [sorts-divide.ts](./src/games/stem/engineering/algorithms/sorts-divide.ts)
│   │       │   │   └── [sorts-quadratic.ts](./src/games/stem/engineering/algorithms/sorts-quadratic.ts)
│   │       │   ├── data-structures/
│   │       │   │   ├── __tests__/
│   │       │   │   │   ├── [structures-ui.test.tsx](./src/games/stem/engineering/data-structures/__tests__/structures-ui.test.tsx)
│   │       │   │   │   └── [structures.test.ts](./src/games/stem/engineering/data-structures/__tests__/structures.test.ts)
│   │       │   │   ├── array/
│   │       │   │   │   └── [index.tsx](./src/games/stem/engineering/data-structures/array/index.tsx)
│   │       │   │   ├── disjoint-set/
│   │       │   │   │   └── [index.tsx](./src/games/stem/engineering/data-structures/disjoint-set/index.tsx)
│   │       │   │   ├── fenwick-trees/
│   │       │   │   │   └── [index.tsx](./src/games/stem/engineering/data-structures/fenwick-trees/index.tsx)
│   │       │   │   ├── hash-tables/
│   │       │   │   │   └── [index.tsx](./src/games/stem/engineering/data-structures/hash-tables/index.tsx)
│   │       │   │   ├── linked-lists/
│   │       │   │   │   └── [index.tsx](./src/games/stem/engineering/data-structures/linked-lists/index.tsx)
│   │       │   │   ├── queues/
│   │       │   │   │   └── [index.tsx](./src/games/stem/engineering/data-structures/queues/index.tsx)
│   │       │   │   ├── segment-trees/
│   │       │   │   │   └── [index.tsx](./src/games/stem/engineering/data-structures/segment-trees/index.tsx)
│   │       │   │   ├── stacks/
│   │       │   │   │   └── [index.tsx](./src/games/stem/engineering/data-structures/stacks/index.tsx)
│   │       │   │   ├── suffix-arrays/
│   │       │   │   │   └── [index.tsx](./src/games/stem/engineering/data-structures/suffix-arrays/index.tsx)
│   │       │   │   ├── trie/
│   │       │   │   │   └── [index.tsx](./src/games/stem/engineering/data-structures/trie/index.tsx)
│   │       │   │   ├── [linear-structures.tsx](./src/games/stem/engineering/data-structures/linear-structures.tsx)
│   │       │   │   ├── [linear.ts](./src/games/stem/engineering/data-structures/linear.ts)
│   │       │   │   ├── [linked-list.tsx](./src/games/stem/engineering/data-structures/linked-list.tsx)
│   │       │   │   ├── [ranges.ts](./src/games/stem/engineering/data-structures/ranges.ts)
│   │       │   │   ├── [structures.tsx](./src/games/stem/engineering/data-structures/structures.tsx)
│   │       │   │   ├── [suffix.ts](./src/games/stem/engineering/data-structures/suffix.ts)
│   │       │   │   └── [trees.ts](./src/games/stem/engineering/data-structures/trees.ts)
│   │       │   └── shared/
│   │       │       ├── [ArrayBars.tsx](./src/games/stem/engineering/shared/ArrayBars.tsx)
│   │       │       ├── [Controls.tsx](./src/games/stem/engineering/shared/Controls.tsx)
│   │       │       ├── [SearchSimulator.tsx](./src/games/stem/engineering/shared/SearchSimulator.tsx)
│   │       │       ├── [SlotGrid.tsx](./src/games/stem/engineering/shared/SlotGrid.tsx)
│   │       │       ├── [SortSimulator.tsx](./src/games/stem/engineering/shared/SortSimulator.tsx)
│   │       │       ├── [random.ts](./src/games/stem/engineering/shared/random.ts)
│   │       │       ├── [recorder.ts](./src/games/stem/engineering/shared/recorder.ts)
│   │       │       ├── [types.ts](./src/games/stem/engineering/shared/types.ts)
│   │       │       └── [usePlayer.ts](./src/games/stem/engineering/shared/usePlayer.ts)
│   │       ├── maths/
│   │       │   ├── attractors/
│   │       │   │   ├── __tests__/
│   │       │   │   │   ├── [index.test.tsx](./src/games/stem/maths/attractors/__tests__/index.test.tsx)
│   │       │   │   │   ├── [renderer.test.ts](./src/games/stem/maths/attractors/__tests__/renderer.test.ts)
│   │       │   │   │   └── [utils.test.ts](./src/games/stem/maths/attractors/__tests__/utils.test.ts)
│   │       │   │   ├── utils/
│   │       │   │   │   ├── [attractors.ts](./src/games/stem/maths/attractors/utils/attractors.ts)
│   │       │   │   │   └── [renderer.ts](./src/games/stem/maths/attractors/utils/renderer.ts)
│   │       │   │   ├── [constants.ts](./src/games/stem/maths/attractors/constants.ts)
│   │       │   │   ├── [index.tsx](./src/games/stem/maths/attractors/index.tsx)
│   │       │   │   ├── [three.mock.ts](./src/games/stem/maths/attractors/three.mock.ts)
│   │       │   │   ├── [types.ts](./src/games/stem/maths/attractors/types.ts)
│   │       │   │   └── [useAttractors.ts](./src/games/stem/maths/attractors/useAttractors.ts)
│   │       │   ├── cyclic/
│   │       │   │   ├── __tests__/
│   │       │   │   │   ├── [index.test.tsx](./src/games/stem/maths/cyclic/__tests__/index.test.tsx)
│   │       │   │   │   └── [utils.test.ts](./src/games/stem/maths/cyclic/__tests__/utils.test.ts)
│   │       │   │   ├── [index.tsx](./src/games/stem/maths/cyclic/index.tsx)
│   │       │   │   └── [utils.ts](./src/games/stem/maths/cyclic/utils.ts)
│   │       │   ├── fibonacci-sequence/
│   │       │   │   ├── __tests__/
│   │       │   │   │   ├── [index.test.tsx](./src/games/stem/maths/fibonacci-sequence/__tests__/index.test.tsx)
│   │       │   │   │   └── [utils.test.ts](./src/games/stem/maths/fibonacci-sequence/__tests__/utils.test.ts)
│   │       │   │   ├── [index.tsx](./src/games/stem/maths/fibonacci-sequence/index.tsx)
│   │       │   │   └── [utils.ts](./src/games/stem/maths/fibonacci-sequence/utils.ts)
│   │       │   ├── kaprekar-constant/
│   │       │   │   ├── __tests__/
│   │       │   │   │   ├── [index.test.tsx](./src/games/stem/maths/kaprekar-constant/__tests__/index.test.tsx)
│   │       │   │   │   └── [utils.test.ts](./src/games/stem/maths/kaprekar-constant/__tests__/utils.test.ts)
│   │       │   │   ├── [index.tsx](./src/games/stem/maths/kaprekar-constant/index.tsx)
│   │       │   │   └── [utils.ts](./src/games/stem/maths/kaprekar-constant/utils.ts)
│   │       │   └── prime-numbers/
│   │       │       ├── __tests__/
│   │       │       │   ├── [index.test.tsx](./src/games/stem/maths/prime-numbers/__tests__/index.test.tsx)
│   │       │       │   └── [utils.test.ts](./src/games/stem/maths/prime-numbers/__tests__/utils.test.ts)
│   │       │       ├── [index.tsx](./src/games/stem/maths/prime-numbers/index.tsx)
│   │       │       └── [utils.ts](./src/games/stem/maths/prime-numbers/utils.ts)
│   │       └── neuroscience/
│   │           ├── anatomy/
│   │           │   └── brain-atlas/
│   │           │       ├── __tests__/
│   │           │       │   ├── [atlas.test.ts](./src/games/stem/neuroscience/anatomy/brain-atlas/__tests__/atlas.test.ts)
│   │           │       │   ├── [components.test.tsx](./src/games/stem/neuroscience/anatomy/brain-atlas/__tests__/components.test.tsx)
│   │           │       │   ├── [division-page.test.tsx](./src/games/stem/neuroscience/anatomy/brain-atlas/__tests__/division-page.test.tsx)
│   │           │       │   ├── [index.test.tsx](./src/games/stem/neuroscience/anatomy/brain-atlas/__tests__/index.test.tsx)
│   │           │       │   └── [outline-geometry.test.ts](./src/games/stem/neuroscience/anatomy/brain-atlas/__tests__/outline-geometry.test.ts)
│   │           │       ├── [atlas.ts](./src/games/stem/neuroscience/anatomy/brain-atlas/atlas.ts)
│   │           │       ├── [components.tsx](./src/games/stem/neuroscience/anatomy/brain-atlas/components.tsx)
│   │           │       ├── [division-page.tsx](./src/games/stem/neuroscience/anatomy/brain-atlas/division-page.tsx)
│   │           │       ├── [index.tsx](./src/games/stem/neuroscience/anatomy/brain-atlas/index.tsx)
│   │           │       ├── [outline-drawing.ts](./src/games/stem/neuroscience/anatomy/brain-atlas/outline-drawing.ts)
│   │           │       ├── [outline-geometry.ts](./src/games/stem/neuroscience/anatomy/brain-atlas/outline-geometry.ts)
│   │           │       ├── [region-body.tsx](./src/games/stem/neuroscience/anatomy/brain-atlas/region-body.tsx)
│   │           │       ├── [region-outline.tsx](./src/games/stem/neuroscience/anatomy/brain-atlas/region-outline.tsx)
│   │           │       ├── [structures-cerebrum.ts](./src/games/stem/neuroscience/anatomy/brain-atlas/structures-cerebrum.ts)
│   │           │       ├── [structures-hindbrain.ts](./src/games/stem/neuroscience/anatomy/brain-atlas/structures-hindbrain.ts)
│   │           │       └── [types.ts](./src/games/stem/neuroscience/anatomy/brain-atlas/types.ts)
│   │           ├── neuroimaging/
│   │           │   ├── eeg/
│   │           │   │   └── eeg/
│   │           │   │       ├── __tests__/
│   │           │   │       │   ├── [game.test.ts](./src/games/stem/neuroscience/neuroimaging/eeg/eeg/__tests__/game.test.ts)
│   │           │   │       │   └── [index.test.tsx](./src/games/stem/neuroscience/neuroimaging/eeg/eeg/__tests__/index.test.tsx)
│   │           │   │       ├── [components.tsx](./src/games/stem/neuroscience/neuroimaging/eeg/eeg/components.tsx)
│   │           │   │       ├── [game.ts](./src/games/stem/neuroscience/neuroimaging/eeg/eeg/game.ts)
│   │           │   │       ├── [index.tsx](./src/games/stem/neuroscience/neuroimaging/eeg/eeg/index.tsx)
│   │           │   │       └── [types.ts](./src/games/stem/neuroscience/neuroimaging/eeg/eeg/types.ts)
│   │           │   ├── meg/
│   │           │   │   ├── meg/
│   │           │   │   │   ├── __tests__/
│   │           │   │   │   │   ├── [game.test.ts](./src/games/stem/neuroscience/neuroimaging/meg/meg/__tests__/game.test.ts)
│   │           │   │   │   │   └── [index.test.tsx](./src/games/stem/neuroscience/neuroimaging/meg/meg/__tests__/index.test.tsx)
│   │           │   │   │   ├── [components.tsx](./src/games/stem/neuroscience/neuroimaging/meg/meg/components.tsx)
│   │           │   │   │   ├── [forward.ts](./src/games/stem/neuroscience/neuroimaging/meg/meg/forward.ts)
│   │           │   │   │   ├── [game.ts](./src/games/stem/neuroscience/neuroimaging/meg/meg/game.ts)
│   │           │   │   │   ├── [index.tsx](./src/games/stem/neuroscience/neuroimaging/meg/meg/index.tsx)
│   │           │   │   │   └── [types.ts](./src/games/stem/neuroscience/neuroimaging/meg/meg/types.ts)
│   │           │   │   └── opm-meg/
│   │           │   │       ├── __tests__/
│   │           │   │       │   ├── [game.test.ts](./src/games/stem/neuroscience/neuroimaging/meg/opm-meg/__tests__/game.test.ts)
│   │           │   │       │   └── [index.test.tsx](./src/games/stem/neuroscience/neuroimaging/meg/opm-meg/__tests__/index.test.tsx)
│   │           │   │       ├── [components.tsx](./src/games/stem/neuroscience/neuroimaging/meg/opm-meg/components.tsx)
│   │           │   │       ├── [game.ts](./src/games/stem/neuroscience/neuroimaging/meg/opm-meg/game.ts)
│   │           │   │       ├── [index.tsx](./src/games/stem/neuroscience/neuroimaging/meg/opm-meg/index.tsx)
│   │           │   │       └── [types.ts](./src/games/stem/neuroscience/neuroimaging/meg/opm-meg/types.ts)
│   │           │   └── mri/
│   │           │       └── mri/
│   │           │           ├── __tests__/
│   │           │           │   ├── [game.test.ts](./src/games/stem/neuroscience/neuroimaging/mri/mri/__tests__/game.test.ts)
│   │           │           │   └── [index.test.tsx](./src/games/stem/neuroscience/neuroimaging/mri/mri/__tests__/index.test.tsx)
│   │           │           ├── [components.tsx](./src/games/stem/neuroscience/neuroimaging/mri/mri/components.tsx)
│   │           │           ├── [game.ts](./src/games/stem/neuroscience/neuroimaging/mri/mri/game.ts)
│   │           │           ├── [index.tsx](./src/games/stem/neuroscience/neuroimaging/mri/mri/index.tsx)
│   │           │           └── [types.ts](./src/games/stem/neuroscience/neuroimaging/mri/mri/types.ts)
│   │           ├── shared/
│   │           │   ├── [Window.tsx](./src/games/stem/neuroscience/shared/Window.tsx)
│   │           │   └── [controls.tsx](./src/games/stem/neuroscience/shared/controls.tsx)
│   │           └── theory/
│   │               ├── attentional-drift-diffusion-model/
│   │               │   ├── [components.tsx](./src/games/stem/neuroscience/theory/attentional-drift-diffusion-model/components.tsx)
│   │               │   ├── [game.ts](./src/games/stem/neuroscience/theory/attentional-drift-diffusion-model/game.ts)
│   │               │   ├── [index.tsx](./src/games/stem/neuroscience/theory/attentional-drift-diffusion-model/index.tsx)
│   │               │   └── [types.ts](./src/games/stem/neuroscience/theory/attentional-drift-diffusion-model/types.ts)
│   │               ├── drift-diffusion-model/
│   │               │   ├── [components.tsx](./src/games/stem/neuroscience/theory/drift-diffusion-model/components.tsx)
│   │               │   ├── [constants.ts](./src/games/stem/neuroscience/theory/drift-diffusion-model/constants.ts)
│   │               │   ├── [game.ts](./src/games/stem/neuroscience/theory/drift-diffusion-model/game.ts)
│   │               │   ├── [index.tsx](./src/games/stem/neuroscience/theory/drift-diffusion-model/index.tsx)
│   │               │   └── [types.ts](./src/games/stem/neuroscience/theory/drift-diffusion-model/types.ts)
│   │               ├── hierarchical-drift-diffusion-model/
│   │               │   ├── [components.tsx](./src/games/stem/neuroscience/theory/hierarchical-drift-diffusion-model/components.tsx)
│   │               │   ├── [game.ts](./src/games/stem/neuroscience/theory/hierarchical-drift-diffusion-model/game.ts)
│   │               │   ├── [index.tsx](./src/games/stem/neuroscience/theory/hierarchical-drift-diffusion-model/index.tsx)
│   │               │   └── [types.ts](./src/games/stem/neuroscience/theory/hierarchical-drift-diffusion-model/types.ts)
│   │               ├── leaky-competing-accumulator/
│   │               │   ├── [components.tsx](./src/games/stem/neuroscience/theory/leaky-competing-accumulator/components.tsx)
│   │               │   ├── [game.ts](./src/games/stem/neuroscience/theory/leaky-competing-accumulator/game.ts)
│   │               │   ├── [index.tsx](./src/games/stem/neuroscience/theory/leaky-competing-accumulator/index.tsx)
│   │               │   └── [types.ts](./src/games/stem/neuroscience/theory/leaky-competing-accumulator/types.ts)
│   │               ├── linear-ballistic-accumulator/
│   │               │   ├── [components.tsx](./src/games/stem/neuroscience/theory/linear-ballistic-accumulator/components.tsx)
│   │               │   ├── [game.ts](./src/games/stem/neuroscience/theory/linear-ballistic-accumulator/game.ts)
│   │               │   ├── [index.tsx](./src/games/stem/neuroscience/theory/linear-ballistic-accumulator/index.tsx)
│   │               │   └── [types.ts](./src/games/stem/neuroscience/theory/linear-ballistic-accumulator/types.ts)
│   │               └── race-models/
│   │                   ├── [components.tsx](./src/games/stem/neuroscience/theory/race-models/components.tsx)
│   │                   ├── [game.ts](./src/games/stem/neuroscience/theory/race-models/game.ts)
│   │                   ├── [index.tsx](./src/games/stem/neuroscience/theory/race-models/index.tsx)
│   │                   └── [types.ts](./src/games/stem/neuroscience/theory/race-models/types.ts)
│   ├── hooks/
│   │   ├── __tests__/
│   │   │   ├── [useSWRegister.test.ts](./src/hooks/__tests__/useSWRegister.test.ts)
│   │   │   ├── [useTheme.test.ts](./src/hooks/__tests__/useTheme.test.ts)
│   │   │   └── [useUpdater.test.ts](./src/hooks/__tests__/useUpdater.test.ts)
│   │   ├── [useSWRegister.ts](./src/hooks/useSWRegister.ts)
│   │   ├── [useTheme.ts](./src/hooks/useTheme.ts)
│   │   └── [useUpdater.ts](./src/hooks/useUpdater.ts)
│   ├── lib/
│   │   ├── __tests__/
│   │   │   └── [progress.test.ts](./src/lib/__tests__/progress.test.ts)
│   │   ├── native/
│   │   │   ├── __tests__/
│   │   │   │   └── [index.test.ts](./src/lib/native/__tests__/index.test.ts)
│   │   │   └── [index.ts](./src/lib/native/index.ts)
│   │   ├── [catalog.ts](./src/lib/catalog.ts)
│   │   ├── [progress.ts](./src/lib/progress.ts)
│   │   └── [publicPaths.ts](./src/lib/publicPaths.ts)
│   ├── notes/
│   │   ├── arts/
│   │   │   └── colors/
│   │   │       ├── [css.md](./src/notes/arts/colors/css.md)
│   │   │       ├── [harmony.md](./src/notes/arts/colors/harmony.md)
│   │   │       ├── [models.md](./src/notes/arts/colors/models.md)
│   │   │       ├── [perception.md](./src/notes/arts/colors/perception.md)
│   │   │       └── [scales.md](./src/notes/arts/colors/scales.md)
│   │   ├── health/
│   │   │   ├── ophthalmology/
│   │   │   │   └── [vision.md](./src/notes/health/ophthalmology/vision.md)
│   │   │   └── psychology/
│   │   │       ├── practices/
│   │   │       │   ├── [counselling.md](./src/notes/health/psychology/practices/counselling.md)
│   │   │       │   ├── [journaling.md](./src/notes/health/psychology/practices/journaling.md)
│   │   │       │   └── [mindfulness.md](./src/notes/health/psychology/practices/mindfulness.md)
│   │   │       └── theory/
│   │   │           ├── [biology.md](./src/notes/health/psychology/theory/biology.md)
│   │   │           ├── [cognitive.md](./src/notes/health/psychology/theory/cognitive.md)
│   │   │           ├── [developmental.md](./src/notes/health/psychology/theory/developmental.md)
│   │   │           └── [social.md](./src/notes/health/psychology/theory/social.md)
│   │   ├── humanities/
│   │   │   └── economics/
│   │   │       ├── behavioral-economics/
│   │   │       │   ├── [behavioral-finance.md](./src/notes/humanities/economics/behavioral-economics/behavioral-finance.md)
│   │   │       │   ├── [behavioral-heuristics.md](./src/notes/humanities/economics/behavioral-economics/behavioral-heuristics.md)
│   │   │       │   ├── [endowment-effect.md](./src/notes/humanities/economics/behavioral-economics/endowment-effect.md)
│   │   │       │   ├── [mental-accounting.md](./src/notes/humanities/economics/behavioral-economics/mental-accounting.md)
│   │   │       │   ├── [nudge-and-behavioral-economics.md](./src/notes/humanities/economics/behavioral-economics/nudge-and-behavioral-economics.md)
│   │   │       │   ├── [overconfidence-bias.md](./src/notes/humanities/economics/behavioral-economics/overconfidence-bias.md)
│   │   │       │   ├── [prospect-theory.md](./src/notes/humanities/economics/behavioral-economics/prospect-theory.md)
│   │   │       │   ├── [social-preferences.md](./src/notes/humanities/economics/behavioral-economics/social-preferences.md)
│   │   │       │   └── [time-inconsistency.md](./src/notes/humanities/economics/behavioral-economics/time-inconsistency.md)
│   │   │       ├── game-theory/
│   │   │       │   ├── [auction-theory.md](./src/notes/humanities/economics/game-theory/auction-theory.md)
│   │   │       │   ├── [backward-induction.md](./src/notes/humanities/economics/game-theory/backward-induction.md)
│   │   │       │   ├── [bargaining-theory.md](./src/notes/humanities/economics/game-theory/bargaining-theory.md)
│   │   │       │   ├── [bayesian-updating.md](./src/notes/humanities/economics/game-theory/bayesian-updating.md)
│   │   │       │   ├── [coordination-games.md](./src/notes/humanities/economics/game-theory/coordination-games.md)
│   │   │       │   ├── [evolutionary-game-theory.md](./src/notes/humanities/economics/game-theory/evolutionary-game-theory.md)
│   │   │       │   ├── [game-theory-basics.md](./src/notes/humanities/economics/game-theory/game-theory-basics.md)
│   │   │       │   ├── [mechanism-design.md](./src/notes/humanities/economics/game-theory/mechanism-design.md)
│   │   │       │   ├── [nash-equilibrium.md](./src/notes/humanities/economics/game-theory/nash-equilibrium.md)
│   │   │       │   ├── [prisoners-dilemma.md](./src/notes/humanities/economics/game-theory/prisoners-dilemma.md)
│   │   │       │   ├── [repeated-games.md](./src/notes/humanities/economics/game-theory/repeated-games.md)
│   │   │       │   ├── [signaling.md](./src/notes/humanities/economics/game-theory/signaling.md)
│   │   │       │   └── [zero-sum-games.md](./src/notes/humanities/economics/game-theory/zero-sum-games.md)
│   │   │       ├── macroeconomics/
│   │   │       │   ├── [aggregate-demand-supply.md](./src/notes/humanities/economics/macroeconomics/aggregate-demand-supply.md)
│   │   │       │   ├── [business-cycles.md](./src/notes/humanities/economics/macroeconomics/business-cycles.md)
│   │   │       │   ├── [development-rcts.md](./src/notes/humanities/economics/macroeconomics/development-rcts.md)
│   │   │       │   ├── [economic-inequality.md](./src/notes/humanities/economics/macroeconomics/economic-inequality.md)
│   │   │       │   ├── [fiscal-policy.md](./src/notes/humanities/economics/macroeconomics/fiscal-policy.md)
│   │   │       │   ├── [gdp-and-national-accounts.md](./src/notes/humanities/economics/macroeconomics/gdp-and-national-accounts.md)
│   │   │       │   ├── [institutions-and-growth.md](./src/notes/humanities/economics/macroeconomics/institutions-and-growth.md)
│   │   │       │   ├── [is-lm-model.md](./src/notes/humanities/economics/macroeconomics/is-lm-model.md)
│   │   │       │   ├── [keynesian-economics.md](./src/notes/humanities/economics/macroeconomics/keynesian-economics.md)
│   │   │       │   ├── [migration-economics.md](./src/notes/humanities/economics/macroeconomics/migration-economics.md)
│   │   │       │   ├── [monetary-policy.md](./src/notes/humanities/economics/macroeconomics/monetary-policy.md)
│   │   │       │   ├── [phillips-curve.md](./src/notes/humanities/economics/macroeconomics/phillips-curve.md)
│   │   │       │   ├── [poverty-traps.md](./src/notes/humanities/economics/macroeconomics/poverty-traps.md)
│   │   │       │   ├── [trade-and-tariffs.md](./src/notes/humanities/economics/macroeconomics/trade-and-tariffs.md)
│   │   │       │   └── [unemployment-okuns-law.md](./src/notes/humanities/economics/macroeconomics/unemployment-okuns-law.md)
│   │   │       ├── markets-and-public-policy/
│   │   │       │   ├── [adverse-selection.md](./src/notes/humanities/economics/markets-and-public-policy/adverse-selection.md)
│   │   │       │   ├── [arbitrage.md](./src/notes/humanities/economics/markets-and-public-policy/arbitrage.md)
│   │   │       │   ├── [capm-and-risk.md](./src/notes/humanities/economics/markets-and-public-policy/capm-and-risk.md)
│   │   │       │   ├── [efficient-market-hypothesis.md](./src/notes/humanities/economics/markets-and-public-policy/efficient-market-hypothesis.md)
│   │   │       │   ├── [externalities.md](./src/notes/humanities/economics/markets-and-public-policy/externalities.md)
│   │   │       │   ├── [market-failures.md](./src/notes/humanities/economics/markets-and-public-policy/market-failures.md)
│   │   │       │   ├── [market-microstructure.md](./src/notes/humanities/economics/markets-and-public-policy/market-microstructure.md)
│   │   │       │   ├── [moral-hazard.md](./src/notes/humanities/economics/markets-and-public-policy/moral-hazard.md)
│   │   │       │   ├── [portfolio-theory.md](./src/notes/humanities/economics/markets-and-public-policy/portfolio-theory.md)
│   │   │       │   ├── [public-choice.md](./src/notes/humanities/economics/markets-and-public-policy/public-choice.md)
│   │   │       │   ├── [public-goods-dilemma.md](./src/notes/humanities/economics/markets-and-public-policy/public-goods-dilemma.md)
│   │   │       │   ├── [time-value-of-money.md](./src/notes/humanities/economics/markets-and-public-policy/time-value-of-money.md)
│   │   │       │   └── [tragedy-of-the-commons.md](./src/notes/humanities/economics/markets-and-public-policy/tragedy-of-the-commons.md)
│   │   │       └── microeconomics/
│   │   │           ├── [causal-inference.md](./src/notes/humanities/economics/microeconomics/causal-inference.md)
│   │   │           ├── [consumer-theory.md](./src/notes/humanities/economics/microeconomics/consumer-theory.md)
│   │   │           ├── [elasticity.md](./src/notes/humanities/economics/microeconomics/elasticity.md)
│   │   │           ├── [human-capital.md](./src/notes/humanities/economics/microeconomics/human-capital.md)
│   │   │           ├── [imperfect-competition.md](./src/notes/humanities/economics/microeconomics/imperfect-competition.md)
│   │   │           ├── [labor-markets.md](./src/notes/humanities/economics/microeconomics/labor-markets.md)
│   │   │           ├── [marginal-utility.md](./src/notes/humanities/economics/microeconomics/marginal-utility.md)
│   │   │           ├── [monopoly-and-market-power.md](./src/notes/humanities/economics/microeconomics/monopoly-and-market-power.md)
│   │   │           ├── [oligopoly.md](./src/notes/humanities/economics/microeconomics/oligopoly.md)
│   │   │           ├── [opportunity-cost.md](./src/notes/humanities/economics/microeconomics/opportunity-cost.md)
│   │   │           ├── [perfect-competition.md](./src/notes/humanities/economics/microeconomics/perfect-competition.md)
│   │   │           ├── [price-discrimination.md](./src/notes/humanities/economics/microeconomics/price-discrimination.md)
│   │   │           ├── [production-and-costs.md](./src/notes/humanities/economics/microeconomics/production-and-costs.md)
│   │   │           └── [supply-and-demand.md](./src/notes/humanities/economics/microeconomics/supply-and-demand.md)
│   │   ├── stem/
│   │   │   ├── engineering/
│   │   │   │   ├── algorithms/
│   │   │   │   │   ├── [binary-search.md](./src/notes/stem/engineering/algorithms/binary-search.md)
│   │   │   │   │   ├── [bubble-sort.md](./src/notes/stem/engineering/algorithms/bubble-sort.md)
│   │   │   │   │   ├── [heap-sort.md](./src/notes/stem/engineering/algorithms/heap-sort.md)
│   │   │   │   │   ├── [insertion-sort.md](./src/notes/stem/engineering/algorithms/insertion-sort.md)
│   │   │   │   │   ├── [linear-search.md](./src/notes/stem/engineering/algorithms/linear-search.md)
│   │   │   │   │   ├── [merge-sort.md](./src/notes/stem/engineering/algorithms/merge-sort.md)
│   │   │   │   │   ├── [quick-sort.md](./src/notes/stem/engineering/algorithms/quick-sort.md)
│   │   │   │   │   └── [selection-sort.md](./src/notes/stem/engineering/algorithms/selection-sort.md)
│   │   │   │   └── data-structures/
│   │   │   │       ├── [array.md](./src/notes/stem/engineering/data-structures/array.md)
│   │   │   │       ├── [disjoint-set.md](./src/notes/stem/engineering/data-structures/disjoint-set.md)
│   │   │   │       ├── [fenwick-trees.md](./src/notes/stem/engineering/data-structures/fenwick-trees.md)
│   │   │   │       ├── [hash-tables.md](./src/notes/stem/engineering/data-structures/hash-tables.md)
│   │   │   │       ├── [linked-lists.md](./src/notes/stem/engineering/data-structures/linked-lists.md)
│   │   │   │       ├── [queues.md](./src/notes/stem/engineering/data-structures/queues.md)
│   │   │   │       ├── [segment-trees.md](./src/notes/stem/engineering/data-structures/segment-trees.md)
│   │   │   │       ├── [stacks.md](./src/notes/stem/engineering/data-structures/stacks.md)
│   │   │   │       ├── [suffix-arrays.md](./src/notes/stem/engineering/data-structures/suffix-arrays.md)
│   │   │   │       └── [trie.md](./src/notes/stem/engineering/data-structures/trie.md)
│   │   │   └── neuroscience/
│   │   │       ├── neuroimaging/
│   │   │       │   ├── eeg/
│   │   │       │   │   ├── [eeg.md](./src/notes/stem/neuroscience/neuroimaging/eeg/eeg.md)
│   │   │       │   │   └── [qeeg.md](./src/notes/stem/neuroscience/neuroimaging/eeg/qeeg.md)
│   │   │       │   ├── meg/
│   │   │       │   │   ├── [meg.md](./src/notes/stem/neuroscience/neuroimaging/meg/meg.md)
│   │   │       │   │   └── [opm-meg.md](./src/notes/stem/neuroscience/neuroimaging/meg/opm-meg.md)
│   │   │       │   └── mri/
│   │   │       │       ├── [fmri.md](./src/notes/stem/neuroscience/neuroimaging/mri/fmri.md)
│   │   │       │       ├── [fnirs.md](./src/notes/stem/neuroscience/neuroimaging/mri/fnirs.md)
│   │   │       │       └── [mri.md](./src/notes/stem/neuroscience/neuroimaging/mri/mri.md)
│   │   │       └── theory/
│   │   │           ├── [attentional-drift-diffusion-model.md](./src/notes/stem/neuroscience/theory/attentional-drift-diffusion-model.md)
│   │   │           ├── [drift-diffusion-model.md](./src/notes/stem/neuroscience/theory/drift-diffusion-model.md)
│   │   │           ├── [hierarchical-drift-diffusion-model.md](./src/notes/stem/neuroscience/theory/hierarchical-drift-diffusion-model.md)
│   │   │           ├── [leaky-competing-accumulator.md](./src/notes/stem/neuroscience/theory/leaky-competing-accumulator.md)
│   │   │           ├── [linear-ballistic-accumulator.md](./src/notes/stem/neuroscience/theory/linear-ballistic-accumulator.md)
│   │   │           └── [race-models.md](./src/notes/stem/neuroscience/theory/race-models.md)
│   │   └── [TREE.md](./src/notes/TREE.md)
│   ├── providers/
│   │   ├── __tests__/
│   │   │   ├── [NativeProvider.test.tsx](./src/providers/__tests__/NativeProvider.test.tsx)
│   │   │   ├── [QueryProvider.test.tsx](./src/providers/__tests__/QueryProvider.test.tsx)
│   │   │   └── [SWProvider.test.tsx](./src/providers/__tests__/SWProvider.test.tsx)
│   │   ├── [NativeProvider.tsx](./src/providers/NativeProvider.tsx)
│   │   ├── [QueryProvider.tsx](./src/providers/QueryProvider.tsx)
│   │   └── [SWProvider.tsx](./src/providers/SWProvider.tsx)
│   └── styles/
│       ├── [globals.css](./src/styles/globals.css)
│       └── [themes.css](./src/styles/themes.css)
├── src-tauri/
│   ├── capabilities/
│   │   └── [default.json](./src-tauri/capabilities/default.json)
│   ├── icons/
│   │   ├── android/
│   │   │   ├── mipmap-anydpi-v26/
│   │   │   │   └── [ic_launcher.xml](./src-tauri/icons/android/mipmap-anydpi-v26/ic_launcher.xml)
│   │   │   ├── mipmap-hdpi/
│   │   │   │   ├── [ic_launcher.png](./src-tauri/icons/android/mipmap-hdpi/ic_launcher.png)
│   │   │   │   ├── [ic_launcher_foreground.png](./src-tauri/icons/android/mipmap-hdpi/ic_launcher_foreground.png)
│   │   │   │   └── [ic_launcher_round.png](./src-tauri/icons/android/mipmap-hdpi/ic_launcher_round.png)
│   │   │   ├── mipmap-mdpi/
│   │   │   │   ├── [ic_launcher.png](./src-tauri/icons/android/mipmap-mdpi/ic_launcher.png)
│   │   │   │   ├── [ic_launcher_foreground.png](./src-tauri/icons/android/mipmap-mdpi/ic_launcher_foreground.png)
│   │   │   │   └── [ic_launcher_round.png](./src-tauri/icons/android/mipmap-mdpi/ic_launcher_round.png)
│   │   │   ├── mipmap-xhdpi/
│   │   │   │   ├── [ic_launcher.png](./src-tauri/icons/android/mipmap-xhdpi/ic_launcher.png)
│   │   │   │   ├── [ic_launcher_foreground.png](./src-tauri/icons/android/mipmap-xhdpi/ic_launcher_foreground.png)
│   │   │   │   └── [ic_launcher_round.png](./src-tauri/icons/android/mipmap-xhdpi/ic_launcher_round.png)
│   │   │   ├── mipmap-xxhdpi/
│   │   │   │   ├── [ic_launcher.png](./src-tauri/icons/android/mipmap-xxhdpi/ic_launcher.png)
│   │   │   │   ├── [ic_launcher_foreground.png](./src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_foreground.png)
│   │   │   │   └── [ic_launcher_round.png](./src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_round.png)
│   │   │   ├── mipmap-xxxhdpi/
│   │   │   │   ├── [ic_launcher.png](./src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher.png)
│   │   │   │   ├── [ic_launcher_foreground.png](./src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_foreground.png)
│   │   │   │   └── [ic_launcher_round.png](./src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_round.png)
│   │   │   └── values/
│   │   │       └── [ic_launcher_background.xml](./src-tauri/icons/android/values/ic_launcher_background.xml)
│   │   ├── ios/
│   │   │   ├── [AppIcon-20x20@1x.png](./src-tauri/icons/ios/AppIcon-20x20@1x.png)
│   │   │   ├── [AppIcon-20x20@2x-1.png](./src-tauri/icons/ios/AppIcon-20x20@2x-1.png)
│   │   │   ├── [AppIcon-20x20@2x.png](./src-tauri/icons/ios/AppIcon-20x20@2x.png)
│   │   │   ├── [AppIcon-20x20@3x.png](./src-tauri/icons/ios/AppIcon-20x20@3x.png)
│   │   │   ├── [AppIcon-29x29@1x.png](./src-tauri/icons/ios/AppIcon-29x29@1x.png)
│   │   │   ├── [AppIcon-29x29@2x-1.png](./src-tauri/icons/ios/AppIcon-29x29@2x-1.png)
│   │   │   ├── [AppIcon-29x29@2x.png](./src-tauri/icons/ios/AppIcon-29x29@2x.png)
│   │   │   ├── [AppIcon-29x29@3x.png](./src-tauri/icons/ios/AppIcon-29x29@3x.png)
│   │   │   ├── [AppIcon-40x40@1x.png](./src-tauri/icons/ios/AppIcon-40x40@1x.png)
│   │   │   ├── [AppIcon-40x40@2x-1.png](./src-tauri/icons/ios/AppIcon-40x40@2x-1.png)
│   │   │   ├── [AppIcon-40x40@2x.png](./src-tauri/icons/ios/AppIcon-40x40@2x.png)
│   │   │   ├── [AppIcon-40x40@3x.png](./src-tauri/icons/ios/AppIcon-40x40@3x.png)
│   │   │   ├── [AppIcon-512@2x.png](./src-tauri/icons/ios/AppIcon-512@2x.png)
│   │   │   ├── [AppIcon-60x60@2x.png](./src-tauri/icons/ios/AppIcon-60x60@2x.png)
│   │   │   ├── [AppIcon-60x60@3x.png](./src-tauri/icons/ios/AppIcon-60x60@3x.png)
│   │   │   ├── [AppIcon-76x76@1x.png](./src-tauri/icons/ios/AppIcon-76x76@1x.png)
│   │   │   ├── [AppIcon-76x76@2x.png](./src-tauri/icons/ios/AppIcon-76x76@2x.png)
│   │   │   └── [AppIcon-83.5x83.5@2x.png](./src-tauri/icons/ios/AppIcon-83.5x83.5@2x.png)
│   │   ├── [128x128.png](./src-tauri/icons/128x128.png)
│   │   ├── [128x128@2x.png](./src-tauri/icons/128x128@2x.png)
│   │   ├── [256x256.png](./src-tauri/icons/256x256.png)
│   │   ├── [32x32.png](./src-tauri/icons/32x32.png)
│   │   ├── [64x64.png](./src-tauri/icons/64x64.png)
│   │   ├── [Square107x107Logo.png](./src-tauri/icons/Square107x107Logo.png)
│   │   ├── [Square142x142Logo.png](./src-tauri/icons/Square142x142Logo.png)
│   │   ├── [Square150x150Logo.png](./src-tauri/icons/Square150x150Logo.png)
│   │   ├── [Square284x284Logo.png](./src-tauri/icons/Square284x284Logo.png)
│   │   ├── [Square30x30Logo.png](./src-tauri/icons/Square30x30Logo.png)
│   │   ├── [Square310x310Logo.png](./src-tauri/icons/Square310x310Logo.png)
│   │   ├── [Square44x44Logo.png](./src-tauri/icons/Square44x44Logo.png)
│   │   ├── [Square71x71Logo.png](./src-tauri/icons/Square71x71Logo.png)
│   │   ├── [Square89x89Logo.png](./src-tauri/icons/Square89x89Logo.png)
│   │   ├── [StoreLogo.png](./src-tauri/icons/StoreLogo.png)
│   │   ├── [create-icons.sh](./src-tauri/icons/create-icons.sh)
│   │   ├── [icon.icns](./src-tauri/icons/icon.icns)
│   │   ├── [icon.ico](./src-tauri/icons/icon.ico)
│   │   └── [icon.png](./src-tauri/icons/icon.png)
│   ├── src/
│   │   ├── [lib.rs](./src-tauri/src/lib.rs)
│   │   └── [main.rs](./src-tauri/src/main.rs)
│   ├── [Cargo.lock](./src-tauri/Cargo.lock)
│   ├── [Cargo.toml](./src-tauri/Cargo.toml)
│   ├── [build.rs](./src-tauri/build.rs)
│   └── [tauri.conf.json](./src-tauri/tauri.conf.json)
├── [AGENTS.md](./AGENTS.md)
├── [Dockerfile](./Dockerfile)
├── [LICENSE](./LICENSE)
├── [README.md](./README.md)
├── [TREE.md](./TREE.md)
├── [docker-compose.yaml](./docker-compose.yaml)
├── [eslint.config.mts](./eslint.config.mts)
├── [jest.config.ts](./jest.config.ts)
├── [jest.setup.ts](./jest.setup.ts)
├── [next.config.ts](./next.config.ts)
├── [package.json](./package.json)
├── [playwright.config.ts](./playwright.config.ts)
├── [postcss.config.mjs](./postcss.config.mjs)
└── [tsconfig.json](./tsconfig.json)
```

775 directories, 1676 files
