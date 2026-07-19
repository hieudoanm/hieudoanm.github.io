# TREE

```text
├── __mocks__/
│   └── [chess-ts.js](./__mocks__/chess-ts.js)
├── e2e/
│   └── [index.spec.ts](./e2e/index.spec.ts)
├── images/
├── prisma/
│   └── [schema.prisma](./prisma/schema.prisma)
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
│   ├── db/
│   │   ├── [chess.db](./public/db/chess.db)
│   │   └── [hieudoanm.db](./public/db/hieudoanm.db)
│   ├── fonts/
│   │   ├── Roboto/
│   │   │   ├── [Roboto-Italic.ttf](./public/fonts/Roboto/Roboto-Italic.ttf)
│   │   │   ├── [Roboto-Medium.ttf](./public/fonts/Roboto/Roboto-Medium.ttf)
│   │   │   ├── [Roboto-MediumItalic.ttf](./public/fonts/Roboto/Roboto-MediumItalic.ttf)
│   │   │   └── [Roboto-Regular.ttf](./public/fonts/Roboto/Roboto-Regular.ttf)
│   │   └── Times-New-Roman/
│   │       ├── [Times-New-Roman-Bold-Italic.ttf](./public/fonts/Times-New-Roman/Times-New-Roman-Bold-Italic.ttf)
│   │       ├── [Times-New-Roman-Bold.ttf](./public/fonts/Times-New-Roman/Times-New-Roman-Bold.ttf)
│   │       ├── [Times-New-Roman-Italic.ttf](./public/fonts/Times-New-Roman/Times-New-Roman-Italic.ttf)
│   │       └── [Times-New-Roman-Regular.ttf](./public/fonts/Times-New-Roman/Times-New-Roman-Regular.ttf)
│   ├── icons/
│   │   ├── [icon-128x128.png](./public/icons/icon-128x128.png)
│   │   ├── [icon-144x144.png](./public/icons/icon-144x144.png)
│   │   ├── [icon-152x152.png](./public/icons/icon-152x152.png)
│   │   ├── [icon-192x192.png](./public/icons/icon-192x192.png)
│   │   ├── [icon-384x384.png](./public/icons/icon-384x384.png)
│   │   ├── [icon-512x512.png](./public/icons/icon-512x512.png)
│   │   ├── [icon-512x512.svg](./public/icons/icon-512x512.svg)
│   │   ├── [icon-72x72.png](./public/icons/icon-72x72.png)
│   │   ├── [icon-96x96.png](./public/icons/icon-96x96.png)
│   │   └── [icon.svg](./public/icons/icon.svg)
│   ├── models/
│   │   ├── [invoice-parser.onnx](./public/models/invoice-parser.onnx)
│   │   └── [sign-model.onnx](./public/models/sign-model.onnx)
│   ├── workers/
│   │   └── [pdf.worker.min.js](./public/workers/pdf.worker.min.js)
│   ├── [apple-touch-icon.png](./public/apple-touch-icon.png)
│   ├── [favicon.ico](./public/favicon.ico)
│   ├── [file.svg](./public/file.svg)
│   ├── [globe.svg](./public/globe.svg)
│   ├── [manifest.json](./public/manifest.json)
│   ├── [next.svg](./public/next.svg)
│   ├── [robots.txt](./public/robots.txt)
│   ├── [sitemap.xml](./public/sitemap.xml)
│   ├── [sw.js](./public/sw.js)
│   ├── [vercel.svg](./public/vercel.svg)
│   └── [window.svg](./public/window.svg)
├── scripts/
│   ├── sh/
│   │   └── [post-build.sh](./scripts/sh/post-build.sh)
│   ├── [currency.ts](./scripts/currency.ts)
│   └── [tsconfig.json](./scripts/tsconfig.json)
├── src/
│   ├── app/
│   │   ├── (products)/
│   │   │   ├── apps/
│   │   │   │   ├── bored/
│   │   │   │   │   ├── develop/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/bored/develop/page.tsx)
│   │   │   │   │   ├── research/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/bored/research/page.tsx)
│   │   │   │   │   ├── ship/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/bored/ship/page.tsx)
│   │   │   │   │   ├── vibe-slot-code/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/bored/vibe-slot-code/page.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/bored/page.tsx)
│   │   │   │   ├── calculator/
│   │   │   │   │   ├── calculator/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/calculator/calculator/page.tsx)
│   │   │   │   │   ├── inflation/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/calculator/inflation/page.tsx)
│   │   │   │   │   ├── split-bill/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/calculator/split-bill/page.tsx)
│   │   │   │   │   ├── tax/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/calculator/tax/page.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/calculator/page.tsx)
│   │   │   │   ├── clocks/
│   │   │   │   │   ├── countdown/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/clocks/countdown/page.tsx)
│   │   │   │   │   ├── cron/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/clocks/cron/page.tsx)
│   │   │   │   │   ├── days-count/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/clocks/days-count/page.tsx)
│   │   │   │   │   ├── epoch-convert/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/clocks/epoch-convert/page.tsx)
│   │   │   │   │   ├── pomodoro/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/clocks/pomodoro/page.tsx)
│   │   │   │   │   ├── watchface/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/clocks/watchface/page.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/clocks/page.tsx)
│   │   │   │   ├── data-csv/
│   │   │   │   │   ├── csv-to-excel/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/data-csv/csv-to-excel/page.tsx)
│   │   │   │   │   ├── csv-to-json/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/data-csv/csv-to-json/page.tsx)
│   │   │   │   │   ├── csv-to-xml/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/data-csv/csv-to-xml/page.tsx)
│   │   │   │   │   ├── split-csv/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/data-csv/split-csv/page.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/data-csv/page.tsx)
│   │   │   │   ├── data-excel/
│   │   │   │   │   ├── excel-to-csv/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/data-excel/excel-to-csv/page.tsx)
│   │   │   │   │   ├── excel-to-pdf/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/data-excel/excel-to-pdf/page.tsx)
│   │   │   │   │   ├── excel-to-xml/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/data-excel/excel-to-xml/page.tsx)
│   │   │   │   │   ├── split-excel/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/data-excel/split-excel/page.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/data-excel/page.tsx)
│   │   │   │   ├── data-json/
│   │   │   │   │   ├── json-to-csv/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/data-json/json-to-csv/page.tsx)
│   │   │   │   │   ├── json-to-xml/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/data-json/json-to-xml/page.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/data-json/page.tsx)
│   │   │   │   ├── data-xml/
│   │   │   │   │   ├── xml-to-csv/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/data-xml/xml-to-csv/page.tsx)
│   │   │   │   │   ├── xml-to-excel/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/data-xml/xml-to-excel/page.tsx)
│   │   │   │   │   ├── xml-to-json/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/data-xml/xml-to-json/page.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/data-xml/page.tsx)
│   │   │   │   ├── developer/
│   │   │   │   │   ├── figlet/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/developer/figlet/page.tsx)
│   │   │   │   │   ├── ip/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/developer/ip/page.tsx)
│   │   │   │   │   ├── openapi/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/developer/openapi/page.tsx)
│   │   │   │   │   ├── proxy/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/developer/proxy/page.tsx)
│   │   │   │   │   ├── shopify-detect/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/developer/shopify-detect/page.tsx)
│   │   │   │   │   ├── text-diff/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/developer/text-diff/page.tsx)
│   │   │   │   │   ├── text-url-tracer/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/developer/text-url-tracer/page.tsx)
│   │   │   │   │   ├── uuid/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/developer/uuid/page.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/developer/page.tsx)
│   │   │   │   ├── editors/
│   │   │   │   │   ├── json-schema/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/editors/json-schema/page.tsx)
│   │   │   │   │   ├── manifest/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/editors/manifest/page.tsx)
│   │   │   │   │   ├── regex/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/editors/regex/page.tsx)
│   │   │   │   │   ├── resume/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/editors/resume/page.tsx)
│   │   │   │   │   ├── slides/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/editors/slides/page.tsx)
│   │   │   │   │   ├── word-counter/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/editors/word-counter/page.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/editors/page.tsx)
│   │   │   │   ├── education/
│   │   │   │   │   ├── doi/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/education/doi/page.tsx)
│   │   │   │   │   ├── english/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/education/english/page.tsx)
│   │   │   │   │   ├── flashcards/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/education/flashcards/page.tsx)
│   │   │   │   │   ├── periodic-table/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/education/periodic-table/page.tsx)
│   │   │   │   │   ├── pitch/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/education/pitch/page.tsx)
│   │   │   │   │   ├── sign/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/education/sign/page.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/education/page.tsx)
│   │   │   │   ├── health-vision/
│   │   │   │   │   ├── logmar/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/health-vision/logmar/page.tsx)
│   │   │   │   │   ├── snellen/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/health-vision/snellen/page.tsx)
│   │   │   │   │   ├── tumbling-e/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/health-vision/tumbling-e/page.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/health-vision/page.tsx)
│   │   │   │   ├── psychology/
│   │   │   │   │   ├── beck-depression-inventory/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/psychology/beck-depression-inventory/page.tsx)
│   │   │   │   │   ├── big-five-inventory/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/psychology/big-five-inventory/page.tsx)
│   │   │   │   │   ├── dyadic-adjustment-scale/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/psychology/dyadic-adjustment-scale/page.tsx)
│   │   │   │   │   ├── experiences-in-close-relationships/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/psychology/experiences-in-close-relationships/page.tsx)
│   │   │   │   │   ├── generalized-anxiety-disorder/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/psychology/generalized-anxiety-disorder/page.tsx)
│   │   │   │   │   ├── patient-health-questionnaire/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/psychology/patient-health-questionnaire/page.tsx)
│   │   │   │   │   ├── relationship-closeness-inventory/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/psychology/relationship-closeness-inventory/page.tsx)
│   │   │   │   │   ├── satisfaction-with-life/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/psychology/satisfaction-with-life/page.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/psychology/page.tsx)
│   │   │   │   ├── text-convert/
│   │   │   │   │   ├── braille/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/text-convert/braille/page.tsx)
│   │   │   │   │   ├── leetspeak/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/text-convert/leetspeak/page.tsx)
│   │   │   │   │   ├── morse/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/text-convert/morse/page.tsx)
│   │   │   │   │   ├── text-case/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/text-convert/text-case/page.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/text-convert/page.tsx)
│   │   │   │   ├── utilities/
│   │   │   │   │   ├── clipboard/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/utilities/clipboard/page.tsx)
│   │   │   │   │   ├── create-zip/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/utilities/create-zip/page.tsx)
│   │   │   │   │   ├── emojis/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/utilities/emojis/page.tsx)
│   │   │   │   │   ├── kaprekar/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/utilities/kaprekar/page.tsx)
│   │   │   │   │   ├── lorem-ipsum/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/utilities/lorem-ipsum/page.tsx)
│   │   │   │   │   ├── no-sleep/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/utilities/no-sleep/page.tsx)
│   │   │   │   │   ├── screen-recorder/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/utilities/screen-recorder/page.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/utilities/page.tsx)
│   │   │   │   ├── visualization/
│   │   │   │   │   ├── attractors/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/visualization/attractors/page.tsx)
│   │   │   │   │   ├── calendar-tracker/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/visualization/calendar-tracker/page.tsx)
│   │   │   │   │   ├── football/
│   │   │   │   │   │   ├── [tournament]/
│   │   │   │   │   │   │   ├── [year]/
│   │   │   │   │   │   │   │   ├── knock-out/
│   │   │   │   │   │   │   │   │   ├── [_client.tsx](./src/app/(products)/apps/visualization/football/[tournament]/[year]/knock-out/_client.tsx)
│   │   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/visualization/football/[tournament]/[year]/knock-out/page.tsx)
│   │   │   │   │   │   │   │   ├── [_client.tsx](./src/app/(products)/apps/visualization/football/[tournament]/[year]/_client.tsx)
│   │   │   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/visualization/football/[tournament]/[year]/page.tsx)
│   │   │   │   │   │   │   ├── [_client.tsx](./src/app/(products)/apps/visualization/football/[tournament]/_client.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/visualization/football/[tournament]/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/visualization/football/page.tsx)
│   │   │   │   │   ├── legislation/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/visualization/legislation/page.tsx)
│   │   │   │   │   ├── resume-timeline/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/visualization/resume-timeline/page.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/visualization/page.tsx)
│   │   │   │   └── [page.tsx](./src/app/(products)/apps/page.tsx)
│   │   │   ├── downloads/
│   │   │   │   └── [page.tsx](./src/app/(products)/downloads/page.tsx)
│   │   │   └── games/
│   │   │       ├── arcade/
│   │   │       │   ├── dino-run/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/arcade/dino-run/page.tsx)
│   │   │       │   ├── rps/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/arcade/rps/page.tsx)
│   │   │       │   ├── snake/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/arcade/snake/page.tsx)
│   │   │       │   └── [page.tsx](./src/app/(products)/games/arcade/page.tsx)
│   │   │       ├── casino/
│   │   │       │   ├── blackjack/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/casino/blackjack/page.tsx)
│   │   │       │   ├── dice-game/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/casino/dice-game/page.tsx)
│   │   │       │   ├── poker/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/casino/poker/page.tsx)
│   │   │       │   ├── slot-machine/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/casino/slot-machine/page.tsx)
│   │   │       │   ├── tai-baccarat/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/casino/tai-baccarat/page.tsx)
│   │   │       │   └── [page.tsx](./src/app/(products)/games/casino/page.tsx)
│   │   │       ├── chess/
│   │   │       │   ├── chess-board/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/chess/chess-board/page.tsx)
│   │   │       │   ├── chess-clock/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/chess/chess-clock/page.tsx)
│   │   │       │   ├── chess-elo/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/chess/chess-elo/page.tsx)
│   │   │       │   ├── chess-stats/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/chess/chess-stats/page.tsx)
│   │   │       │   └── [page.tsx](./src/app/(products)/games/chess/page.tsx)
│   │   │       ├── countries/
│   │   │       │   ├── countries-border/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/countries/countries-border/page.tsx)
│   │   │       │   ├── countries-connection/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/countries/countries-connection/page.tsx)
│   │   │       │   ├── countries-continents-sort/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/countries/countries-continents-sort/page.tsx)
│   │   │       │   ├── countries-higher-lower/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/countries/countries-higher-lower/page.tsx)
│   │   │       │   ├── emoji-guesser/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/countries/emoji-guesser/page.tsx)
│   │   │       │   ├── flag-guesser/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/countries/flag-guesser/page.tsx)
│   │   │       │   └── [page.tsx](./src/app/(products)/games/countries/page.tsx)
│   │   │       ├── memory/
│   │   │       │   ├── memory-match/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/memory/memory-match/page.tsx)
│   │   │       │   ├── n-back/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/memory/n-back/page.tsx)
│   │   │       │   ├── pi/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/memory/pi/page.tsx)
│   │   │       │   ├── quizify/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/memory/quizify/page.tsx)
│   │   │       │   ├── recall/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/memory/recall/page.tsx)
│   │   │       │   └── [page.tsx](./src/app/(products)/games/memory/page.tsx)
│   │   │       ├── nikoli/
│   │   │       │   ├── fillomino/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/nikoli/fillomino/page.tsx)
│   │   │       │   ├── heyawake/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/nikoli/heyawake/page.tsx)
│   │   │       │   ├── masyu/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/nikoli/masyu/page.tsx)
│   │   │       │   ├── norinori/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/nikoli/norinori/page.tsx)
│   │   │       │   ├── nurikabe/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/nikoli/nurikabe/page.tsx)
│   │   │       │   ├── shikaku/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/nikoli/shikaku/page.tsx)
│   │   │       │   ├── sudoku/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/nikoli/sudoku/page.tsx)
│   │   │       │   └── [page.tsx](./src/app/(products)/games/nikoli/page.tsx)
│   │   │       ├── puzzle/
│   │   │       │   ├── game2048/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/puzzle/game2048/page.tsx)
│   │   │       │   ├── lights-out/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/puzzle/lights-out/page.tsx)
│   │   │       │   ├── maze/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/puzzle/maze/page.tsx)
│   │   │       │   ├── sliding-puzzle/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/puzzle/sliding-puzzle/page.tsx)
│   │   │       │   ├── towers/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/puzzle/towers/page.tsx)
│   │   │       │   └── [page.tsx](./src/app/(products)/games/puzzle/page.tsx)
│   │   │       ├── tic-tac-toe/
│   │   │       │   ├── classic/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/tic-tac-toe/classic/page.tsx)
│   │   │       │   ├── duck/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/tic-tac-toe/duck/page.tsx)
│   │   │       │   ├── notakto/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/tic-tac-toe/notakto/page.tsx)
│   │   │       │   ├── reverse/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/tic-tac-toe/reverse/page.tsx)
│   │   │       │   ├── t3/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/tic-tac-toe/t3/page.tsx)
│   │   │       │   └── wild/
│   │   │       │       └── [page.tsx](./src/app/(products)/games/tic-tac-toe/wild/page.tsx)
│   │   │       ├── trivia/
│   │   │       │   ├── pd/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/trivia/pd/page.tsx)
│   │   │       │   ├── pokedex/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/trivia/pokedex/page.tsx)
│   │   │       │   ├── through-the-years/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/trivia/through-the-years/page.tsx)
│   │   │       │   └── [page.tsx](./src/app/(products)/games/trivia/page.tsx)
│   │   │       ├── word/
│   │   │       │   ├── palindrome/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/word/palindrome/page.tsx)
│   │   │       │   ├── typoglycemia/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/word/typoglycemia/page.tsx)
│   │   │       │   ├── wordle/
│   │   │       │   │   └── [page.tsx](./src/app/(products)/games/word/wordle/page.tsx)
│   │   │       │   └── [page.tsx](./src/app/(products)/games/word/page.tsx)
│   │   │       └── [page.tsx](./src/app/(products)/games/page.tsx)
│   │   ├── (system)/
│   │   │   ├── settings/
│   │   │   │   └── [page.tsx](./src/app/(system)/settings/page.tsx)
│   │   │   └── version/
│   │   │       └── [page.tsx](./src/app/(system)/version/page.tsx)
│   │   ├── [error.tsx](./src/app/error.tsx)
│   │   ├── [global-error.tsx](./src/app/global-error.tsx)
│   │   ├── [layout.tsx](./src/app/layout.tsx)
│   │   ├── [loading.tsx](./src/app/loading.tsx)
│   │   ├── [not-found.tsx](./src/app/not-found.tsx)
│   │   └── [page.tsx](./src/app/page.tsx)
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── __tests__/
│   │   │   │   ├── __snapshots__/
│   │   │   │   │   ├── [BlogDate.test.tsx.snap](./src/components/atoms/__tests__/__snapshots__/BlogDate.test.tsx.snap)
│   │   │   │   │   ├── [TagBadge.test.tsx.snap](./src/components/atoms/__tests__/__snapshots__/TagBadge.test.tsx.snap)
│   │   │   │   │   └── [ToolCard.test.tsx.snap](./src/components/atoms/__tests__/__snapshots__/ToolCard.test.tsx.snap)
│   │   │   │   ├── [BlogDate.test.tsx](./src/components/atoms/__tests__/BlogDate.test.tsx)
│   │   │   │   ├── [TagBadge.test.tsx](./src/components/atoms/__tests__/TagBadge.test.tsx)
│   │   │   │   └── [ToolCard.test.tsx](./src/components/atoms/__tests__/ToolCard.test.tsx)
│   │   │   ├── [BlogDate.tsx](./src/components/atoms/BlogDate.tsx)
│   │   │   ├── [Dropzone.tsx](./src/components/atoms/Dropzone.tsx)
│   │   │   ├── [GlyphLoading.tsx](./src/components/atoms/GlyphLoading.tsx)
│   │   │   ├── [TagBadge.tsx](./src/components/atoms/TagBadge.tsx)
│   │   │   ├── [ToolCard.tsx](./src/components/atoms/ToolCard.tsx)
│   │   │   └── [index.ts](./src/components/atoms/index.ts)
│   │   ├── molecules/
│   │   │   ├── __tests__/
│   │   │   │   ├── __snapshots__/
│   │   │   │   │   ├── [BlogCard.test.tsx.snap](./src/components/molecules/__tests__/__snapshots__/BlogCard.test.tsx.snap)
│   │   │   │   │   ├── [BlogCardList.test.tsx.snap](./src/components/molecules/__tests__/__snapshots__/BlogCardList.test.tsx.snap)
│   │   │   │   │   └── [BlogSidebar.test.tsx.snap](./src/components/molecules/__tests__/__snapshots__/BlogSidebar.test.tsx.snap)
│   │   │   │   ├── [BlogCard.test.tsx](./src/components/molecules/__tests__/BlogCard.test.tsx)
│   │   │   │   ├── [BlogCardList.test.tsx](./src/components/molecules/__tests__/BlogCardList.test.tsx)
│   │   │   │   └── [BlogSidebar.test.tsx](./src/components/molecules/__tests__/BlogSidebar.test.tsx)
│   │   │   ├── [BlogCard.tsx](./src/components/molecules/BlogCard.tsx)
│   │   │   ├── [BlogCardList.tsx](./src/components/molecules/BlogCardList.tsx)
│   │   │   ├── [BlogSidebar.tsx](./src/components/molecules/BlogSidebar.tsx)
│   │   │   ├── [SearchBar.tsx](./src/components/molecules/SearchBar.tsx)
│   │   │   ├── [Section.tsx](./src/components/molecules/Section.tsx)
│   │   │   ├── [VirtualTable.tsx](./src/components/molecules/VirtualTable.tsx)
│   │   │   └── [index.ts](./src/components/molecules/index.ts)
│   │   ├── organisms/
│   │   │   ├── auth/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   ├── [PasswordForget.test.tsx.snap](./src/components/organisms/auth/__tests__/__snapshots__/PasswordForget.test.tsx.snap)
│   │   │   │   │   │   ├── [PasswordReset.test.tsx.snap](./src/components/organisms/auth/__tests__/__snapshots__/PasswordReset.test.tsx.snap)
│   │   │   │   │   │   ├── [SignInForm.test.tsx.snap](./src/components/organisms/auth/__tests__/__snapshots__/SignInForm.test.tsx.snap)
│   │   │   │   │   │   └── [SignUpForm.test.tsx.snap](./src/components/organisms/auth/__tests__/__snapshots__/SignUpForm.test.tsx.snap)
│   │   │   │   │   ├── [PasswordForget.test.tsx](./src/components/organisms/auth/__tests__/PasswordForget.test.tsx)
│   │   │   │   │   ├── [PasswordReset.test.tsx](./src/components/organisms/auth/__tests__/PasswordReset.test.tsx)
│   │   │   │   │   ├── [SignInForm.test.tsx](./src/components/organisms/auth/__tests__/SignInForm.test.tsx)
│   │   │   │   │   └── [SignUpForm.test.tsx](./src/components/organisms/auth/__tests__/SignUpForm.test.tsx)
│   │   │   │   ├── [PasswordForget.tsx](./src/components/organisms/auth/PasswordForget.tsx)
│   │   │   │   ├── [PasswordReset.tsx](./src/components/organisms/auth/PasswordReset.tsx)
│   │   │   │   ├── [SignInForm.tsx](./src/components/organisms/auth/SignInForm.tsx)
│   │   │   │   └── [SignUpForm.tsx](./src/components/organisms/auth/SignUpForm.tsx)
│   │   │   ├── blog/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   ├── [BlogFooter.test.tsx.snap](./src/components/organisms/blog/__tests__/__snapshots__/BlogFooter.test.tsx.snap)
│   │   │   │   │   │   └── [BlogHeader.test.tsx.snap](./src/components/organisms/blog/__tests__/__snapshots__/BlogHeader.test.tsx.snap)
│   │   │   │   │   ├── [BlogFooter.test.tsx](./src/components/organisms/blog/__tests__/BlogFooter.test.tsx)
│   │   │   │   │   └── [BlogHeader.test.tsx](./src/components/organisms/blog/__tests__/BlogHeader.test.tsx)
│   │   │   │   ├── [BlogFooter.tsx](./src/components/organisms/blog/BlogFooter.tsx)
│   │   │   │   └── [BlogHeader.tsx](./src/components/organisms/blog/BlogHeader.tsx)
│   │   │   ├── chess/
│   │   │   │   └── [ChessBoard.tsx](./src/components/organisms/chess/ChessBoard.tsx)
│   │   │   ├── common/
│   │   │   │   └── [PhotosGrid.tsx](./src/components/organisms/common/PhotosGrid.tsx)
│   │   │   ├── landing/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   ├── [CallToAction.test.tsx.snap](./src/components/organisms/landing/__tests__/__snapshots__/CallToAction.test.tsx.snap)
│   │   │   │   │   │   ├── [Features.test.tsx.snap](./src/components/organisms/landing/__tests__/__snapshots__/Features.test.tsx.snap)
│   │   │   │   │   │   ├── [Footer.test.tsx.snap](./src/components/organisms/landing/__tests__/__snapshots__/Footer.test.tsx.snap)
│   │   │   │   │   │   ├── [FrequentlyAskedQuestions.test.tsx.snap](./src/components/organisms/landing/__tests__/__snapshots__/FrequentlyAskedQuestions.test.tsx.snap)
│   │   │   │   │   │   ├── [Header.test.tsx.snap](./src/components/organisms/landing/__tests__/__snapshots__/Header.test.tsx.snap)
│   │   │   │   │   │   ├── [Hero.test.tsx.snap](./src/components/organisms/landing/__tests__/__snapshots__/Hero.test.tsx.snap)
│   │   │   │   │   │   ├── [Pricing.test.tsx.snap](./src/components/organisms/landing/__tests__/__snapshots__/Pricing.test.tsx.snap)
│   │   │   │   │   │   └── [Testimonials.test.tsx.snap](./src/components/organisms/landing/__tests__/__snapshots__/Testimonials.test.tsx.snap)
│   │   │   │   │   ├── [CallToAction.test.tsx](./src/components/organisms/landing/__tests__/CallToAction.test.tsx)
│   │   │   │   │   ├── [Features.test.tsx](./src/components/organisms/landing/__tests__/Features.test.tsx)
│   │   │   │   │   ├── [Footer.test.tsx](./src/components/organisms/landing/__tests__/Footer.test.tsx)
│   │   │   │   │   ├── [FrequentlyAskedQuestions.test.tsx](./src/components/organisms/landing/__tests__/FrequentlyAskedQuestions.test.tsx)
│   │   │   │   │   ├── [Header.test.tsx](./src/components/organisms/landing/__tests__/Header.test.tsx)
│   │   │   │   │   ├── [Hero.test.tsx](./src/components/organisms/landing/__tests__/Hero.test.tsx)
│   │   │   │   │   ├── [Pricing.test.tsx](./src/components/organisms/landing/__tests__/Pricing.test.tsx)
│   │   │   │   │   └── [Testimonials.test.tsx](./src/components/organisms/landing/__tests__/Testimonials.test.tsx)
│   │   │   │   ├── [CallToAction.tsx](./src/components/organisms/landing/CallToAction.tsx)
│   │   │   │   ├── [Features.tsx](./src/components/organisms/landing/Features.tsx)
│   │   │   │   ├── [Footer.tsx](./src/components/organisms/landing/Footer.tsx)
│   │   │   │   ├── [FrequentlyAskedQuestions.tsx](./src/components/organisms/landing/FrequentlyAskedQuestions.tsx)
│   │   │   │   ├── [Header.tsx](./src/components/organisms/landing/Header.tsx)
│   │   │   │   ├── [Hero.tsx](./src/components/organisms/landing/Hero.tsx)
│   │   │   │   ├── [Pricing.tsx](./src/components/organisms/landing/Pricing.tsx)
│   │   │   │   └── [Testimonials.tsx](./src/components/organisms/landing/Testimonials.tsx)
│   │   │   ├── layout/
│   │   │   │   ├── tabs/
│   │   │   │   │   ├── CalendarTab/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   │   │   ├── [CalendarGrid.test.tsx.snap](./src/components/organisms/layout/tabs/CalendarTab/__tests__/__snapshots__/CalendarGrid.test.tsx.snap)
│   │   │   │   │   │   │   │   ├── [CalendarHeader.test.tsx.snap](./src/components/organisms/layout/tabs/CalendarTab/__tests__/__snapshots__/CalendarHeader.test.tsx.snap)
│   │   │   │   │   │   │   │   ├── [EventList.test.tsx.snap](./src/components/organisms/layout/tabs/CalendarTab/__tests__/__snapshots__/EventList.test.tsx.snap)
│   │   │   │   │   │   │   │   ├── [LunarDate.test.tsx.snap](./src/components/organisms/layout/tabs/CalendarTab/__tests__/__snapshots__/LunarDate.test.tsx.snap)
│   │   │   │   │   │   │   │   └── [index.test.tsx.snap](./src/components/organisms/layout/tabs/CalendarTab/__tests__/__snapshots__/index.test.tsx.snap)
│   │   │   │   │   │   │   ├── [CalendarGrid.test.tsx](./src/components/organisms/layout/tabs/CalendarTab/__tests__/CalendarGrid.test.tsx)
│   │   │   │   │   │   │   ├── [CalendarHeader.test.tsx](./src/components/organisms/layout/tabs/CalendarTab/__tests__/CalendarHeader.test.tsx)
│   │   │   │   │   │   │   ├── [EventList.test.tsx](./src/components/organisms/layout/tabs/CalendarTab/__tests__/EventList.test.tsx)
│   │   │   │   │   │   │   ├── [LunarDate.test.tsx](./src/components/organisms/layout/tabs/CalendarTab/__tests__/LunarDate.test.tsx)
│   │   │   │   │   │   │   └── [index.test.tsx](./src/components/organisms/layout/tabs/CalendarTab/__tests__/index.test.tsx)
│   │   │   │   │   │   ├── [CalendarGrid.tsx](./src/components/organisms/layout/tabs/CalendarTab/CalendarGrid.tsx)
│   │   │   │   │   │   ├── [CalendarHeader.tsx](./src/components/organisms/layout/tabs/CalendarTab/CalendarHeader.tsx)
│   │   │   │   │   │   ├── [EventList.tsx](./src/components/organisms/layout/tabs/CalendarTab/EventList.tsx)
│   │   │   │   │   │   ├── [LunarDate.tsx](./src/components/organisms/layout/tabs/CalendarTab/LunarDate.tsx)
│   │   │   │   │   │   └── [index.tsx](./src/components/organisms/layout/tabs/CalendarTab/index.tsx)
│   │   │   │   │   ├── ClockTab/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   │   │   ├── [CityCard.test.tsx.snap](./src/components/organisms/layout/tabs/ClockTab/__tests__/__snapshots__/CityCard.test.tsx.snap)
│   │   │   │   │   │   │   │   ├── [WeatherBadge.test.tsx.snap](./src/components/organisms/layout/tabs/ClockTab/__tests__/__snapshots__/WeatherBadge.test.tsx.snap)
│   │   │   │   │   │   │   │   └── [WorldClock.test.tsx.snap](./src/components/organisms/layout/tabs/ClockTab/__tests__/__snapshots__/WorldClock.test.tsx.snap)
│   │   │   │   │   │   │   ├── [CityCard.test.tsx](./src/components/organisms/layout/tabs/ClockTab/__tests__/CityCard.test.tsx)
│   │   │   │   │   │   │   ├── [WeatherBadge.test.tsx](./src/components/organisms/layout/tabs/ClockTab/__tests__/WeatherBadge.test.tsx)
│   │   │   │   │   │   │   └── [WorldClock.test.tsx](./src/components/organisms/layout/tabs/ClockTab/__tests__/WorldClock.test.tsx)
│   │   │   │   │   │   ├── [CityCard.tsx](./src/components/organisms/layout/tabs/ClockTab/CityCard.tsx)
│   │   │   │   │   │   ├── [WeatherBadge.tsx](./src/components/organisms/layout/tabs/ClockTab/WeatherBadge.tsx)
│   │   │   │   │   │   ├── [WorldClock.tsx](./src/components/organisms/layout/tabs/ClockTab/WorldClock.tsx)
│   │   │   │   │   │   └── [index.tsx](./src/components/organisms/layout/tabs/ClockTab/index.tsx)
│   │   │   │   │   ├── CurrencyTab/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   │   │   └── [CurrencyTab.test.tsx.snap](./src/components/organisms/layout/tabs/CurrencyTab/__tests__/__snapshots__/CurrencyTab.test.tsx.snap)
│   │   │   │   │   │   │   └── [CurrencyTab.test.tsx](./src/components/organisms/layout/tabs/CurrencyTab/__tests__/CurrencyTab.test.tsx)
│   │   │   │   │   │   ├── [ConversionResult.tsx](./src/components/organisms/layout/tabs/CurrencyTab/ConversionResult.tsx)
│   │   │   │   │   │   ├── [CurrencyInput.tsx](./src/components/organisms/layout/tabs/CurrencyTab/CurrencyInput.tsx)
│   │   │   │   │   │   ├── [CurrencySelect.tsx](./src/components/organisms/layout/tabs/CurrencyTab/CurrencySelect.tsx)
│   │   │   │   │   │   ├── [QuickPairs.tsx](./src/components/organisms/layout/tabs/CurrencyTab/QuickPairs.tsx)
│   │   │   │   │   │   └── [index.tsx](./src/components/organisms/layout/tabs/CurrencyTab/index.tsx)
│   │   │   │   │   ├── PassportTab/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   │   │   └── [PassportTab.test.tsx.snap](./src/components/organisms/layout/tabs/PassportTab/__tests__/__snapshots__/PassportTab.test.tsx.snap)
│   │   │   │   │   │   │   └── [PassportTab.test.tsx](./src/components/organisms/layout/tabs/PassportTab/__tests__/PassportTab.test.tsx)
│   │   │   │   │   │   ├── [CountryRow.tsx](./src/components/organisms/layout/tabs/PassportTab/CountryRow.tsx)
│   │   │   │   │   │   ├── [RegionFilter.tsx](./src/components/organisms/layout/tabs/PassportTab/RegionFilter.tsx)
│   │   │   │   │   │   ├── [SearchInput.tsx](./src/components/organisms/layout/tabs/PassportTab/SearchInput.tsx)
│   │   │   │   │   │   └── [index.tsx](./src/components/organisms/layout/tabs/PassportTab/index.tsx)
│   │   │   │   │   ├── StatusTab/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   │   │   └── [StatusTab.test.tsx.snap](./src/components/organisms/layout/tabs/StatusTab/__tests__/__snapshots__/StatusTab.test.tsx.snap)
│   │   │   │   │   │   │   └── [StatusTab.test.tsx](./src/components/organisms/layout/tabs/StatusTab/__tests__/StatusTab.test.tsx)
│   │   │   │   │   │   ├── [ServiceRow.tsx](./src/components/organisms/layout/tabs/StatusTab/ServiceRow.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/components/organisms/layout/tabs/StatusTab/constants.ts)
│   │   │   │   │   │   └── [index.tsx](./src/components/organisms/layout/tabs/StatusTab/index.tsx)
│   │   │   │   │   ├── TasksTab/
│   │   │   │   │   │   ├── [TaskInput.tsx](./src/components/organisms/layout/tabs/TasksTab/TaskInput.tsx)
│   │   │   │   │   │   ├── [TaskItem.tsx](./src/components/organisms/layout/tabs/TasksTab/TaskItem.tsx)
│   │   │   │   │   │   ├── [index.tsx](./src/components/organisms/layout/tabs/TasksTab/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/organisms/layout/tabs/TasksTab/types.ts)
│   │   │   │   │   └── TimeTab/
│   │   │   │   │       ├── [TimeBlock.tsx](./src/components/organisms/layout/tabs/TimeTab/TimeBlock.tsx)
│   │   │   │   │       ├── [constants.ts](./src/components/organisms/layout/tabs/TimeTab/constants.ts)
│   │   │   │   │       └── [index.tsx](./src/components/organisms/layout/tabs/TimeTab/index.tsx)
│   │   │   │   ├── [LeftSidebar.tsx](./src/components/organisms/layout/LeftSidebar.tsx)
│   │   │   │   ├── [RightSidebar.tsx](./src/components/organisms/layout/RightSidebar.tsx)
│   │   │   │   ├── [SidebarProvider.tsx](./src/components/organisms/layout/SidebarProvider.tsx)
│   │   │   │   └── [types.ts](./src/components/organisms/layout/types.ts)
│   │   │   ├── mocks/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   ├── [Browser.test.tsx.snap](./src/components/organisms/mocks/__tests__/__snapshots__/Browser.test.tsx.snap)
│   │   │   │   │   │   ├── [Phone.test.tsx.snap](./src/components/organisms/mocks/__tests__/__snapshots__/Phone.test.tsx.snap)
│   │   │   │   │   │   ├── [Terminal.test.tsx.snap](./src/components/organisms/mocks/__tests__/__snapshots__/Terminal.test.tsx.snap)
│   │   │   │   │   │   └── [Window.test.tsx.snap](./src/components/organisms/mocks/__tests__/__snapshots__/Window.test.tsx.snap)
│   │   │   │   │   ├── [Browser.test.tsx](./src/components/organisms/mocks/__tests__/Browser.test.tsx)
│   │   │   │   │   ├── [Phone.test.tsx](./src/components/organisms/mocks/__tests__/Phone.test.tsx)
│   │   │   │   │   ├── [Terminal.test.tsx](./src/components/organisms/mocks/__tests__/Terminal.test.tsx)
│   │   │   │   │   └── [Window.test.tsx](./src/components/organisms/mocks/__tests__/Window.test.tsx)
│   │   │   │   ├── [Browser.tsx](./src/components/organisms/mocks/Browser.tsx)
│   │   │   │   ├── [Phone.tsx](./src/components/organisms/mocks/Phone.tsx)
│   │   │   │   ├── [Terminal.tsx](./src/components/organisms/mocks/Terminal.tsx)
│   │   │   │   └── [Window.tsx](./src/components/organisms/mocks/Window.tsx)
│   │   │   └── [index.ts](./src/components/organisms/index.ts)
│   │   ├── routes/
│   │   │   ├── apps/
│   │   │   │   ├── bored/
│   │   │   │   │   ├── Build/
│   │   │   │   │   │   ├── data/
│   │   │   │   │   │   │   ├── [constants.ts](./src/components/routes/apps/bored/Build/data/constants.ts)
│   │   │   │   │   │   │   ├── [howToContent.ts](./src/components/routes/apps/bored/Build/data/howToContent.ts)
│   │   │   │   │   │   │   ├── [products.csv](./src/components/routes/apps/bored/Build/data/products.csv)
│   │   │   │   │   │   │   └── [products.json](./src/components/routes/apps/bored/Build/data/products.json)
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/bored/Build/AGENTS.md)
│   │   │   │   │   │   └── [index.tsx](./src/components/routes/apps/bored/Build/index.tsx)
│   │   │   │   │   ├── Develop/
│   │   │   │   │   │   ├── data/
│   │   │   │   │   │   │   ├── [constants.ts](./src/components/routes/apps/bored/Develop/data/constants.ts)
│   │   │   │   │   │   │   ├── [howToContent.ts](./src/components/routes/apps/bored/Develop/data/howToContent.ts)
│   │   │   │   │   │   │   ├── [skills.csv](./src/components/routes/apps/bored/Develop/data/skills.csv)
│   │   │   │   │   │   │   └── [skills.json](./src/components/routes/apps/bored/Develop/data/skills.json)
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/bored/Develop/AGENTS.md)
│   │   │   │   │   │   └── [index.tsx](./src/components/routes/apps/bored/Develop/index.tsx)
│   │   │   │   │   ├── Research/
│   │   │   │   │   │   ├── data/
│   │   │   │   │   │   │   ├── [constants.ts](./src/components/routes/apps/bored/Research/data/constants.ts)
│   │   │   │   │   │   │   ├── [howToContent.ts](./src/components/routes/apps/bored/Research/data/howToContent.ts)
│   │   │   │   │   │   │   ├── [topics.csv](./src/components/routes/apps/bored/Research/data/topics.csv)
│   │   │   │   │   │   │   └── [topics.json](./src/components/routes/apps/bored/Research/data/topics.json)
│   │   │   │   │   │   ├── docs/
│   │   │   │   │   │   │   └── [how-to.md](./src/components/routes/apps/bored/Research/docs/how-to.md)
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/bored/Research/AGENTS.md)
│   │   │   │   │   │   └── [index.tsx](./src/components/routes/apps/bored/Research/index.tsx)
│   │   │   │   │   ├── Ship/
│   │   │   │   │   │   ├── components/
│   │   │   │   │   │   │   ├── editor/
│   │   │   │   │   │   │   │   ├── [EditorFields.tsx](./src/components/routes/apps/bored/Ship/components/editor/EditorFields.tsx)
│   │   │   │   │   │   │   │   ├── [EditorSidebar.tsx](./src/components/routes/apps/bored/Ship/components/editor/EditorSidebar.tsx)
│   │   │   │   │   │   │   │   ├── [EditorTabBar.tsx](./src/components/routes/apps/bored/Ship/components/editor/EditorTabBar.tsx)
│   │   │   │   │   │   │   │   ├── [EditorToggle.tsx](./src/components/routes/apps/bored/Ship/components/editor/EditorToggle.tsx)
│   │   │   │   │   │   │   │   ├── [FullYamlPanel.tsx](./src/components/routes/apps/bored/Ship/components/editor/FullYamlPanel.tsx)
│   │   │   │   │   │   │   │   ├── [SingleYamlPanel.tsx](./src/components/routes/apps/bored/Ship/components/editor/SingleYamlPanel.tsx)
│   │   │   │   │   │   │   │   └── [YamlEditor.tsx](./src/components/routes/apps/bored/Ship/components/editor/YamlEditor.tsx)
│   │   │   │   │   │   │   ├── modal/
│   │   │   │   │   │   │   │   ├── [ModalHeader.tsx](./src/components/routes/apps/bored/Ship/components/modal/ModalHeader.tsx)
│   │   │   │   │   │   │   │   ├── [ModalTabs.tsx](./src/components/routes/apps/bored/Ship/components/modal/ModalTabs.tsx)
│   │   │   │   │   │   │   │   ├── [PreviewTab.tsx](./src/components/routes/apps/bored/Ship/components/modal/PreviewTab.tsx)
│   │   │   │   │   │   │   │   ├── [RawTab.tsx](./src/components/routes/apps/bored/Ship/components/modal/RawTab.tsx)
│   │   │   │   │   │   │   │   └── [TemplateDocModal.tsx](./src/components/routes/apps/bored/Ship/components/modal/TemplateDocModal.tsx)
│   │   │   │   │   │   │   ├── preview/
│   │   │   │   │   │   │   │   ├── [NavButton.tsx](./src/components/routes/apps/bored/Ship/components/preview/NavButton.tsx)
│   │   │   │   │   │   │   │   ├── [PostDots.tsx](./src/components/routes/apps/bored/Ship/components/preview/PostDots.tsx)
│   │   │   │   │   │   │   │   ├── [PreviewHeader.tsx](./src/components/routes/apps/bored/Ship/components/preview/PreviewHeader.tsx)
│   │   │   │   │   │   │   │   ├── [PreviewPane.tsx](./src/components/routes/apps/bored/Ship/components/preview/PreviewPane.tsx)
│   │   │   │   │   │   │   │   └── [ShipBadge.tsx](./src/components/routes/apps/bored/Ship/components/preview/ShipBadge.tsx)
│   │   │   │   │   │   │   ├── sidebar/
│   │   │   │   │   │   │   │   ├── [PostActions.tsx](./src/components/routes/apps/bored/Ship/components/sidebar/PostActions.tsx)
│   │   │   │   │   │   │   │   ├── [PostItemRow.tsx](./src/components/routes/apps/bored/Ship/components/sidebar/PostItemRow.tsx)
│   │   │   │   │   │   │   │   ├── [PostsList.tsx](./src/components/routes/apps/bored/Ship/components/sidebar/PostsList.tsx)
│   │   │   │   │   │   │   │   ├── [SidebarTabBar.tsx](./src/components/routes/apps/bored/Ship/components/sidebar/SidebarTabBar.tsx)
│   │   │   │   │   │   │   │   ├── [SidebarToggle.tsx](./src/components/routes/apps/bored/Ship/components/sidebar/SidebarToggle.tsx)
│   │   │   │   │   │   │   │   ├── [TemplateCategoryGroup.tsx](./src/components/routes/apps/bored/Ship/components/sidebar/TemplateCategoryGroup.tsx)
│   │   │   │   │   │   │   │   ├── [TemplateItem.tsx](./src/components/routes/apps/bored/Ship/components/sidebar/TemplateItem.tsx)
│   │   │   │   │   │   │   │   ├── [TemplateSearch.tsx](./src/components/routes/apps/bored/Ship/components/sidebar/TemplateSearch.tsx)
│   │   │   │   │   │   │   │   ├── [TemplateSelector.tsx](./src/components/routes/apps/bored/Ship/components/sidebar/TemplateSelector.tsx)
│   │   │   │   │   │   │   │   └── [TemplateSidebar.tsx](./src/components/routes/apps/bored/Ship/components/sidebar/TemplateSidebar.tsx)
│   │   │   │   │   │   │   ├── templates/
│   │   │   │   │   │   │   │   ├── _shared/
│   │   │   │   │   │   │   │   │   ├── [Background.tsx](./src/components/routes/apps/bored/Ship/components/templates/_shared/Background.tsx)
│   │   │   │   │   │   │   │   │   ├── [Footer.tsx](./src/components/routes/apps/bored/Ship/components/templates/_shared/Footer.tsx)
│   │   │   │   │   │   │   │   │   ├── [Header.tsx](./src/components/routes/apps/bored/Ship/components/templates/_shared/Header.tsx)
│   │   │   │   │   │   │   │   │   └── [index.ts](./src/components/routes/apps/bored/Ship/components/templates/_shared/index.ts)
│   │   │   │   │   │   │   │   ├── business-health/
│   │   │   │   │   │   │   │   │   ├── ecommerce/
│   │   │   │   │   │   │   │   │   │   ├── [DealBadge.tsx](./src/components/routes/apps/bored/Ship/components/templates/business-health/ecommerce/DealBadge.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [NewArrival.tsx](./src/components/routes/apps/bored/Ship/components/templates/business-health/ecommerce/NewArrival.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [ProductShowcase.tsx](./src/components/routes/apps/bored/Ship/components/templates/business-health/ecommerce/ProductShowcase.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [ProductSpecs.tsx](./src/components/routes/apps/bored/Ship/components/templates/business-health/ecommerce/ProductSpecs.tsx)
│   │   │   │   │   │   │   │   │   │   └── [Unboxing.tsx](./src/components/routes/apps/bored/Ship/components/templates/business-health/ecommerce/Unboxing.tsx)
│   │   │   │   │   │   │   │   │   ├── finance/
│   │   │   │   │   │   │   │   │   │   ├── [BillReminder.tsx](./src/components/routes/apps/bored/Ship/components/templates/business-health/finance/BillReminder.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [BillSplit.tsx](./src/components/routes/apps/bored/Ship/components/templates/business-health/finance/BillSplit.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [BudgetTracker.tsx](./src/components/routes/apps/bored/Ship/components/templates/business-health/finance/BudgetTracker.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [ExpenseLog.tsx](./src/components/routes/apps/bored/Ship/components/templates/business-health/finance/ExpenseLog.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [FinancialPlan.tsx](./src/components/routes/apps/bored/Ship/components/templates/business-health/finance/FinancialPlan.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [InvestmentTip.tsx](./src/components/routes/apps/bored/Ship/components/templates/business-health/finance/InvestmentTip.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [InvoiceCard.tsx](./src/components/routes/apps/bored/Ship/components/templates/business-health/finance/InvoiceCard.tsx)
│   │   │   │   │   │   │   │   │   │   └── [SavingsGoal.tsx](./src/components/routes/apps/bored/Ship/components/templates/business-health/finance/SavingsGoal.tsx)
│   │   │   │   │   │   │   │   │   ├── fitness/
│   │   │   │   │   │   │   │   │   │   ├── [BodyMeasurements.tsx](./src/components/routes/apps/bored/Ship/components/templates/business-health/fitness/BodyMeasurements.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [ChallengeCalendar.tsx](./src/components/routes/apps/bored/Ship/components/templates/business-health/fitness/ChallengeCalendar.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [ExerciseGuide.tsx](./src/components/routes/apps/bored/Ship/components/templates/business-health/fitness/ExerciseGuide.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [FitnessGoal.tsx](./src/components/routes/apps/bored/Ship/components/templates/business-health/fitness/FitnessGoal.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [WorkoutLog.tsx](./src/components/routes/apps/bored/Ship/components/templates/business-health/fitness/WorkoutLog.tsx)
│   │   │   │   │   │   │   │   │   │   └── [YogaPose.tsx](./src/components/routes/apps/bored/Ship/components/templates/business-health/fitness/YogaPose.tsx)
│   │   │   │   │   │   │   │   │   ├── food/
│   │   │   │   │   │   │   │   │   │   ├── [FoodReview.tsx](./src/components/routes/apps/bored/Ship/components/templates/business-health/food/FoodReview.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [IngredientSpotlight.tsx](./src/components/routes/apps/bored/Ship/components/templates/business-health/food/IngredientSpotlight.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [MealPlan.tsx](./src/components/routes/apps/bored/Ship/components/templates/business-health/food/MealPlan.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [MenuHighlights.tsx](./src/components/routes/apps/bored/Ship/components/templates/business-health/food/MenuHighlights.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [NutritionFacts.tsx](./src/components/routes/apps/bored/Ship/components/templates/business-health/food/NutritionFacts.tsx)
│   │   │   │   │   │   │   │   │   │   └── [RecipeCard.tsx](./src/components/routes/apps/bored/Ship/components/templates/business-health/food/RecipeCard.tsx)
│   │   │   │   │   │   │   │   │   ├── health/
│   │   │   │   │   │   │   │   │   │   ├── [MeditationGuide.tsx](./src/components/routes/apps/bored/Ship/components/templates/business-health/health/MeditationGuide.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [MoodTracker.tsx](./src/components/routes/apps/bored/Ship/components/templates/business-health/health/MoodTracker.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [SleepTips.tsx](./src/components/routes/apps/bored/Ship/components/templates/business-health/health/SleepTips.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [WaterTracker.tsx](./src/components/routes/apps/bored/Ship/components/templates/business-health/health/WaterTracker.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [WellnessTip.tsx](./src/components/routes/apps/bored/Ship/components/templates/business-health/health/WellnessTip.tsx)
│   │   │   │   │   │   │   │   │   │   └── [WorkoutCard.tsx](./src/components/routes/apps/bored/Ship/components/templates/business-health/health/WorkoutCard.tsx)
│   │   │   │   │   │   │   │   │   └── marketing/
│   │   │   │   │   │   │   │   │       ├── [Announcement.tsx](./src/components/routes/apps/bored/Ship/components/templates/business-health/marketing/Announcement.tsx)
│   │   │   │   │   │   │   │   │       ├── [FAQ.tsx](./src/components/routes/apps/bored/Ship/components/templates/business-health/marketing/FAQ.tsx)
│   │   │   │   │   │   │   │   │       ├── [Glossary.tsx](./src/components/routes/apps/bored/Ship/components/templates/business-health/marketing/Glossary.tsx)
│   │   │   │   │   │   │   │   │       ├── [OfferBanner.tsx](./src/components/routes/apps/bored/Ship/components/templates/business-health/marketing/OfferBanner.tsx)
│   │   │   │   │   │   │   │   │       ├── [PricingCard.tsx](./src/components/routes/apps/bored/Ship/components/templates/business-health/marketing/PricingCard.tsx)
│   │   │   │   │   │   │   │   │       └── [ValueProp.tsx](./src/components/routes/apps/bored/Ship/components/templates/business-health/marketing/ValueProp.tsx)
│   │   │   │   │   │   │   │   ├── content-design/
│   │   │   │   │   │   │   │   │   ├── charts/
│   │   │   │   │   │   │   │   │   │   ├── [AreaChart.tsx](./src/components/routes/apps/bored/Ship/components/templates/content-design/charts/AreaChart.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [BarChart.tsx](./src/components/routes/apps/bored/Ship/components/templates/content-design/charts/BarChart.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [PieChart.tsx](./src/components/routes/apps/bored/Ship/components/templates/content-design/charts/PieChart.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [ProgressRing.tsx](./src/components/routes/apps/bored/Ship/components/templates/content-design/charts/ProgressRing.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [RadarChart.tsx](./src/components/routes/apps/bored/Ship/components/templates/content-design/charts/RadarChart.tsx)
│   │   │   │   │   │   │   │   │   │   └── [ScatterChart.tsx](./src/components/routes/apps/bored/Ship/components/templates/content-design/charts/ScatterChart.tsx)
│   │   │   │   │   │   │   │   │   ├── compare/
│   │   │   │   │   │   │   │   │   │   ├── [Comparison.tsx](./src/components/routes/apps/bored/Ship/components/templates/content-design/compare/Comparison.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [FeatureTable.tsx](./src/components/routes/apps/bored/Ship/components/templates/content-design/compare/FeatureTable.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [MythVsFact.tsx](./src/components/routes/apps/bored/Ship/components/templates/content-design/compare/MythVsFact.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [ProsCons.tsx](./src/components/routes/apps/bored/Ship/components/templates/content-design/compare/ProsCons.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [RatingScale.tsx](./src/components/routes/apps/bored/Ship/components/templates/content-design/compare/RatingScale.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [SplitScreen.tsx](./src/components/routes/apps/bored/Ship/components/templates/content-design/compare/SplitScreen.tsx)
│   │   │   │   │   │   │   │   │   │   └── [Versus.tsx](./src/components/routes/apps/bored/Ship/components/templates/content-design/compare/Versus.tsx)
│   │   │   │   │   │   │   │   │   ├── data/
│   │   │   │   │   │   │   │   │   │   ├── [DataStats.tsx](./src/components/routes/apps/bored/Ship/components/templates/content-design/data/DataStats.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [DataTable.tsx](./src/components/routes/apps/bored/Ship/components/templates/content-design/data/DataTable.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [DonutChart.tsx](./src/components/routes/apps/bored/Ship/components/templates/content-design/data/DonutChart.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [FeatureGrid.tsx](./src/components/routes/apps/bored/Ship/components/templates/content-design/data/FeatureGrid.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [HeatmapGrid.tsx](./src/components/routes/apps/bored/Ship/components/templates/content-design/data/HeatmapGrid.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [ProgressList.tsx](./src/components/routes/apps/bored/Ship/components/templates/content-design/data/ProgressList.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [Sparkline.tsx](./src/components/routes/apps/bored/Ship/components/templates/content-design/data/Sparkline.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [StatRow.tsx](./src/components/routes/apps/bored/Ship/components/templates/content-design/data/StatRow.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [StatusGrid.tsx](./src/components/routes/apps/bored/Ship/components/templates/content-design/data/StatusGrid.tsx)
│   │   │   │   │   │   │   │   │   │   └── [Timeline.tsx](./src/components/routes/apps/bored/Ship/components/templates/content-design/data/Timeline.tsx)
│   │   │   │   │   │   │   │   │   ├── data-science/
│   │   │   │   │   │   │   │   │   │   ├── [ConfusionMatrix.tsx](./src/components/routes/apps/bored/Ship/components/templates/content-design/data-science/ConfusionMatrix.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [LossCurve.tsx](./src/components/routes/apps/bored/Ship/components/templates/content-design/data-science/LossCurve.tsx)
│   │   │   │   │   │   │   │   │   │   └── [ModelComparison.tsx](./src/components/routes/apps/bored/Ship/components/templates/content-design/data-science/ModelComparison.tsx)
│   │   │   │   │   │   │   │   │   ├── dev/
│   │   │   │   │   │   │   │   │   │   ├── [ApiEndpoint.tsx](./src/components/routes/apps/bored/Ship/components/templates/content-design/dev/ApiEndpoint.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [ArchitectureDiagram.tsx](./src/components/routes/apps/bored/Ship/components/templates/content-design/dev/ArchitectureDiagram.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [Changelog.tsx](./src/components/routes/apps/bored/Ship/components/templates/content-design/dev/Changelog.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [DatabaseSchema.tsx](./src/components/routes/apps/bored/Ship/components/templates/content-design/dev/DatabaseSchema.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [DependencyGraph.tsx](./src/components/routes/apps/bored/Ship/components/templates/content-design/dev/DependencyGraph.tsx)
│   │   │   │   │   │   │   │   │   │   └── [GitGraph.tsx](./src/components/routes/apps/bored/Ship/components/templates/content-design/dev/GitGraph.tsx)
│   │   │   │   │   │   │   │   │   └── typography/
│   │   │   │   │   │   │   │   │       ├── [GradientText.tsx](./src/components/routes/apps/bored/Ship/components/templates/content-design/typography/GradientText.tsx)
│   │   │   │   │   │   │   │   │       ├── [HighlightedTitle.tsx](./src/components/routes/apps/bored/Ship/components/templates/content-design/typography/HighlightedTitle.tsx)
│   │   │   │   │   │   │   │   │       ├── [IconText.tsx](./src/components/routes/apps/bored/Ship/components/templates/content-design/typography/IconText.tsx)
│   │   │   │   │   │   │   │   │       ├── [Strikethrough.tsx](./src/components/routes/apps/bored/Ship/components/templates/content-design/typography/Strikethrough.tsx)
│   │   │   │   │   │   │   │   │       ├── [TriWord.tsx](./src/components/routes/apps/bored/Ship/components/templates/content-design/typography/TriWord.tsx)
│   │   │   │   │   │   │   │   │       └── [WordStack.tsx](./src/components/routes/apps/bored/Ship/components/templates/content-design/typography/WordStack.tsx)
│   │   │   │   │   │   │   │   ├── creative-expression/
│   │   │   │   │   │   │   │   │   ├── art/
│   │   │   │   │   │   │   │   │   │   ├── [AnatomyStudy.tsx](./src/components/routes/apps/bored/Ship/components/templates/creative-expression/art/AnatomyStudy.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [ArtHistory.tsx](./src/components/routes/apps/bored/Ship/components/templates/creative-expression/art/ArtHistory.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [ColorWheel.tsx](./src/components/routes/apps/bored/Ship/components/templates/creative-expression/art/ColorWheel.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [PaletteInspiration.tsx](./src/components/routes/apps/bored/Ship/components/templates/creative-expression/art/PaletteInspiration.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [StyleGuide.tsx](./src/components/routes/apps/bored/Ship/components/templates/creative-expression/art/StyleGuide.tsx)
│   │   │   │   │   │   │   │   │   │   └── [TechniqueTutorial.tsx](./src/components/routes/apps/bored/Ship/components/templates/creative-expression/art/TechniqueTutorial.tsx)
│   │   │   │   │   │   │   │   │   ├── career/
│   │   │   │   │   │   │   │   │   │   ├── [CoverLetter.tsx](./src/components/routes/apps/bored/Ship/components/templates/creative-expression/career/CoverLetter.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [InterviewPrep.tsx](./src/components/routes/apps/bored/Ship/components/templates/creative-expression/career/InterviewPrep.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [NetworkingTip.tsx](./src/components/routes/apps/bored/Ship/components/templates/creative-expression/career/NetworkingTip.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [ResumeTip.tsx](./src/components/routes/apps/bored/Ship/components/templates/creative-expression/career/ResumeTip.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [SalaryGuide.tsx](./src/components/routes/apps/bored/Ship/components/templates/creative-expression/career/SalaryGuide.tsx)
│   │   │   │   │   │   │   │   │   │   └── [SkillRoadmap.tsx](./src/components/routes/apps/bored/Ship/components/templates/creative-expression/career/SkillRoadmap.tsx)
│   │   │   │   │   │   │   │   │   ├── gaming/
│   │   │   │   │   │   │   │   │   │   ├── [AchievementUnlocked.tsx](./src/components/routes/apps/bored/Ship/components/templates/creative-expression/gaming/AchievementUnlocked.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [GameReview.tsx](./src/components/routes/apps/bored/Ship/components/templates/creative-expression/gaming/GameReview.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [SettingsGuide.tsx](./src/components/routes/apps/bored/Ship/components/templates/creative-expression/gaming/SettingsGuide.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [SetupTour.tsx](./src/components/routes/apps/bored/Ship/components/templates/creative-expression/gaming/SetupTour.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [StatTracker.tsx](./src/components/routes/apps/bored/Ship/components/templates/creative-expression/gaming/StatTracker.tsx)
│   │   │   │   │   │   │   │   │   │   └── [Tournament.tsx](./src/components/routes/apps/bored/Ship/components/templates/creative-expression/gaming/Tournament.tsx)
│   │   │   │   │   │   │   │   │   ├── music/
│   │   │   │   │   │   │   │   │   │   ├── [AlbumReview.tsx](./src/components/routes/apps/bored/Ship/components/templates/creative-expression/music/AlbumReview.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [ChordChart.tsx](./src/components/routes/apps/bored/Ship/components/templates/creative-expression/music/ChordChart.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [GearReview.tsx](./src/components/routes/apps/bored/Ship/components/templates/creative-expression/music/GearReview.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [MusicTheory.tsx](./src/components/routes/apps/bored/Ship/components/templates/creative-expression/music/MusicTheory.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [Playlist.tsx](./src/components/routes/apps/bored/Ship/components/templates/creative-expression/music/Playlist.tsx)
│   │   │   │   │   │   │   │   │   │   └── [Setlist.tsx](./src/components/routes/apps/bored/Ship/components/templates/creative-expression/music/Setlist.tsx)
│   │   │   │   │   │   │   │   │   ├── quotes/
│   │   │   │   │   │   │   │   │   │   ├── [BookQuote.tsx](./src/components/routes/apps/bored/Ship/components/templates/creative-expression/quotes/BookQuote.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [DailyWisdom.tsx](./src/components/routes/apps/bored/Ship/components/templates/creative-expression/quotes/DailyWisdom.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [FamousQuote.tsx](./src/components/routes/apps/bored/Ship/components/templates/creative-expression/quotes/FamousQuote.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [MotivationalQuote.tsx](./src/components/routes/apps/bored/Ship/components/templates/creative-expression/quotes/MotivationalQuote.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [MovieQuote.tsx](./src/components/routes/apps/bored/Ship/components/templates/creative-expression/quotes/MovieQuote.tsx)
│   │   │   │   │   │   │   │   │   │   └── [SongLyric.tsx](./src/components/routes/apps/bored/Ship/components/templates/creative-expression/quotes/SongLyric.tsx)
│   │   │   │   │   │   │   │   │   └── writing/
│   │   │   │   │   │   │   │   │       ├── [CharacterSheet.tsx](./src/components/routes/apps/bored/Ship/components/templates/creative-expression/writing/CharacterSheet.tsx)
│   │   │   │   │   │   │   │   │       ├── [EditingChecklist.tsx](./src/components/routes/apps/bored/Ship/components/templates/creative-expression/writing/EditingChecklist.tsx)
│   │   │   │   │   │   │   │   │       ├── [GenreGuide.tsx](./src/components/routes/apps/bored/Ship/components/templates/creative-expression/writing/GenreGuide.tsx)
│   │   │   │   │   │   │   │   │       ├── [StoryStructure.tsx](./src/components/routes/apps/bored/Ship/components/templates/creative-expression/writing/StoryStructure.tsx)
│   │   │   │   │   │   │   │   │       ├── [WorldBuilding.tsx](./src/components/routes/apps/bored/Ship/components/templates/creative-expression/writing/WorldBuilding.tsx)
│   │   │   │   │   │   │   │   │       └── [WritingPrompt.tsx](./src/components/routes/apps/bored/Ship/components/templates/creative-expression/writing/WritingPrompt.tsx)
│   │   │   │   │   │   │   │   ├── lifestyle-tech/
│   │   │   │   │   │   │   │   │   ├── countdown/
│   │   │   │   │   │   │   │   │   │   ├── [Deadline.tsx](./src/components/routes/apps/bored/Ship/components/templates/lifestyle-tech/countdown/Deadline.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [EventTimer.tsx](./src/components/routes/apps/bored/Ship/components/templates/lifestyle-tech/countdown/EventTimer.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [GoalTracker.tsx](./src/components/routes/apps/bored/Ship/components/templates/lifestyle-tech/countdown/GoalTracker.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [LaunchCountdown.tsx](./src/components/routes/apps/bored/Ship/components/templates/lifestyle-tech/countdown/LaunchCountdown.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [Milestone.tsx](./src/components/routes/apps/bored/Ship/components/templates/lifestyle-tech/countdown/Milestone.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [SpeedRun.tsx](./src/components/routes/apps/bored/Ship/components/templates/lifestyle-tech/countdown/SpeedRun.tsx)
│   │   │   │   │   │   │   │   │   │   └── [StreakCounter.tsx](./src/components/routes/apps/bored/Ship/components/templates/lifestyle-tech/countdown/StreakCounter.tsx)
│   │   │   │   │   │   │   │   │   ├── device/
│   │   │   │   │   │   │   │   │   │   ├── [Browser.tsx](./src/components/routes/apps/bored/Ship/components/templates/lifestyle-tech/device/Browser.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [Code.tsx](./src/components/routes/apps/bored/Ship/components/templates/lifestyle-tech/device/Code.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [FileTree.tsx](./src/components/routes/apps/bored/Ship/components/templates/lifestyle-tech/device/FileTree.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [Mobile.tsx](./src/components/routes/apps/bored/Ship/components/templates/lifestyle-tech/device/Mobile.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [Notification.tsx](./src/components/routes/apps/bored/Ship/components/templates/lifestyle-tech/device/Notification.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [SmartWatch.tsx](./src/components/routes/apps/bored/Ship/components/templates/lifestyle-tech/device/SmartWatch.tsx)
│   │   │   │   │   │   │   │   │   │   └── [Terminal.tsx](./src/components/routes/apps/bored/Ship/components/templates/lifestyle-tech/device/Terminal.tsx)
│   │   │   │   │   │   │   │   │   ├── football/
│   │   │   │   │   │   │   │   │   │   ├── [FormationCard.tsx](./src/components/routes/apps/bored/Ship/components/templates/lifestyle-tech/football/FormationCard.tsx)
│   │   │   │   │   │   │   │   │   │   └── [TransferCard.tsx](./src/components/routes/apps/bored/Ship/components/templates/lifestyle-tech/football/TransferCard.tsx)
│   │   │   │   │   │   │   │   │   ├── media/
│   │   │   │   │   │   │   │   │   │   ├── [AspectRatio.tsx](./src/components/routes/apps/bored/Ship/components/templates/lifestyle-tech/media/AspectRatio.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [CardOverlay.tsx](./src/components/routes/apps/bored/Ship/components/templates/lifestyle-tech/media/CardOverlay.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [CinemaBanner.tsx](./src/components/routes/apps/bored/Ship/components/templates/lifestyle-tech/media/CinemaBanner.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [Collage.tsx](./src/components/routes/apps/bored/Ship/components/templates/lifestyle-tech/media/Collage.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [FullBleed.tsx](./src/components/routes/apps/bored/Ship/components/templates/lifestyle-tech/media/FullBleed.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [Mosaic.tsx](./src/components/routes/apps/bored/Ship/components/templates/lifestyle-tech/media/Mosaic.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [PodcastEpisode.tsx](./src/components/routes/apps/bored/Ship/components/templates/lifestyle-tech/media/PodcastEpisode.tsx)
│   │   │   │   │   │   │   │   │   │   └── [VideoStill.tsx](./src/components/routes/apps/bored/Ship/components/templates/lifestyle-tech/media/VideoStill.tsx)
│   │   │   │   │   │   │   │   │   ├── sports/
│   │   │   │   │   │   │   │   │   │   ├── [HeadToHead.tsx](./src/components/routes/apps/bored/Ship/components/templates/lifestyle-tech/sports/HeadToHead.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [LeagueTable.tsx](./src/components/routes/apps/bored/Ship/components/templates/lifestyle-tech/sports/LeagueTable.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [MatchSchedule.tsx](./src/components/routes/apps/bored/Ship/components/templates/lifestyle-tech/sports/MatchSchedule.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [PlayerStats.tsx](./src/components/routes/apps/bored/Ship/components/templates/lifestyle-tech/sports/PlayerStats.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [Scorecard.tsx](./src/components/routes/apps/bored/Ship/components/templates/lifestyle-tech/sports/Scorecard.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [SeasonStats.tsx](./src/components/routes/apps/bored/Ship/components/templates/lifestyle-tech/sports/SeasonStats.tsx)
│   │   │   │   │   │   │   │   │   │   └── [TournamentBracket.tsx](./src/components/routes/apps/bored/Ship/components/templates/lifestyle-tech/sports/TournamentBracket.tsx)
│   │   │   │   │   │   │   │   │   └── travel/
│   │   │   │   │   │   │   │   │       ├── [BucketList.tsx](./src/components/routes/apps/bored/Ship/components/templates/lifestyle-tech/travel/BucketList.tsx)
│   │   │   │   │   │   │   │   │       ├── [DestinationGuide.tsx](./src/components/routes/apps/bored/Ship/components/templates/lifestyle-tech/travel/DestinationGuide.tsx)
│   │   │   │   │   │   │   │   │       ├── [ItineraryDay.tsx](./src/components/routes/apps/bored/Ship/components/templates/lifestyle-tech/travel/ItineraryDay.tsx)
│   │   │   │   │   │   │   │   │       ├── [LandmarkSpotlight.tsx](./src/components/routes/apps/bored/Ship/components/templates/lifestyle-tech/travel/LandmarkSpotlight.tsx)
│   │   │   │   │   │   │   │   │       ├── [PackingChecklist.tsx](./src/components/routes/apps/bored/Ship/components/templates/lifestyle-tech/travel/PackingChecklist.tsx)
│   │   │   │   │   │   │   │   │       ├── [PackingList.tsx](./src/components/routes/apps/bored/Ship/components/templates/lifestyle-tech/travel/PackingList.tsx)
│   │   │   │   │   │   │   │   │       └── [TravelTip.tsx](./src/components/routes/apps/bored/Ship/components/templates/lifestyle-tech/travel/TravelTip.tsx)
│   │   │   │   │   │   │   │   ├── social-learning/
│   │   │   │   │   │   │   │   │   ├── education/
│   │   │   │   │   │   │   │   │   │   ├── [BookReview.tsx](./src/components/routes/apps/bored/Ship/components/templates/social-learning/education/BookReview.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [CheatSheet.tsx](./src/components/routes/apps/bored/Ship/components/templates/social-learning/education/CheatSheet.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [CourseHighlight.tsx](./src/components/routes/apps/bored/Ship/components/templates/social-learning/education/CourseHighlight.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [LearningPath.tsx](./src/components/routes/apps/bored/Ship/components/templates/social-learning/education/LearningPath.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [MindMap.tsx](./src/components/routes/apps/bored/Ship/components/templates/social-learning/education/MindMap.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [QuickQuiz.tsx](./src/components/routes/apps/bored/Ship/components/templates/social-learning/education/QuickQuiz.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [References.tsx](./src/components/routes/apps/bored/Ship/components/templates/social-learning/education/References.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [StudyTips.tsx](./src/components/routes/apps/bored/Ship/components/templates/social-learning/education/StudyTips.tsx)
│   │   │   │   │   │   │   │   │   │   └── [SubjectSummary.tsx](./src/components/routes/apps/bored/Ship/components/templates/social-learning/education/SubjectSummary.tsx)
│   │   │   │   │   │   │   │   │   ├── hierarchy/
│   │   │   │   │   │   │   │   │   │   ├── [Iceberg.tsx](./src/components/routes/apps/bored/Ship/components/templates/social-learning/hierarchy/Iceberg.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [Ladder.tsx](./src/components/routes/apps/bored/Ship/components/templates/social-learning/hierarchy/Ladder.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [Leaderboard.tsx](./src/components/routes/apps/bored/Ship/components/templates/social-learning/hierarchy/Leaderboard.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [OnionDiagram.tsx](./src/components/routes/apps/bored/Ship/components/templates/social-learning/hierarchy/OnionDiagram.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [Pyramid.tsx](./src/components/routes/apps/bored/Ship/components/templates/social-learning/hierarchy/Pyramid.tsx)
│   │   │   │   │   │   │   │   │   │   └── [TierList.tsx](./src/components/routes/apps/bored/Ship/components/templates/social-learning/hierarchy/TierList.tsx)
│   │   │   │   │   │   │   │   │   ├── inspirational/
│   │   │   │   │   │   │   │   │   │   ├── [Affirmation.tsx](./src/components/routes/apps/bored/Ship/components/templates/social-learning/inspirational/Affirmation.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [BeliefCard.tsx](./src/components/routes/apps/bored/Ship/components/templates/social-learning/inspirational/BeliefCard.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [MissionStatement.tsx](./src/components/routes/apps/bored/Ship/components/templates/social-learning/inspirational/MissionStatement.tsx)
│   │   │   │   │   │   │   │   │   │   └── [VisionBoard.tsx](./src/components/routes/apps/bored/Ship/components/templates/social-learning/inspirational/VisionBoard.tsx)
│   │   │   │   │   │   │   │   │   ├── interactive/
│   │   │   │   │   │   │   │   │   │   ├── [Abbreviation.tsx](./src/components/routes/apps/bored/Ship/components/templates/social-learning/interactive/Abbreviation.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [ChallengeCard.tsx](./src/components/routes/apps/bored/Ship/components/templates/social-learning/interactive/ChallengeCard.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [Chat.tsx](./src/components/routes/apps/bored/Ship/components/templates/social-learning/interactive/Chat.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [FillBlank.tsx](./src/components/routes/apps/bored/Ship/components/templates/social-learning/interactive/FillBlank.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [PollVote.tsx](./src/components/routes/apps/bored/Ship/components/templates/social-learning/interactive/PollVote.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [QandA.tsx](./src/components/routes/apps/bored/Ship/components/templates/social-learning/interactive/QandA.tsx)
│   │   │   │   │   │   │   │   │   │   └── [ThisOrThat.tsx](./src/components/routes/apps/bored/Ship/components/templates/social-learning/interactive/ThisOrThat.tsx)
│   │   │   │   │   │   │   │   │   ├── news/
│   │   │   │   │   │   │   │   │   │   ├── [BreakdownCard.tsx](./src/components/routes/apps/bored/Ship/components/templates/social-learning/news/BreakdownCard.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [BreakingNews.tsx](./src/components/routes/apps/bored/Ship/components/templates/social-learning/news/BreakingNews.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [DailyDigest.tsx](./src/components/routes/apps/bored/Ship/components/templates/social-learning/news/DailyDigest.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [FactCheck.tsx](./src/components/routes/apps/bored/Ship/components/templates/social-learning/news/FactCheck.tsx)
│   │   │   │   │   │   │   │   │   │   └── [TrendingTopic.tsx](./src/components/routes/apps/bored/Ship/components/templates/social-learning/news/TrendingTopic.tsx)
│   │   │   │   │   │   │   │   │   └── research/
│   │   │   │   │   │   │   │   │       ├── [Discussion.tsx](./src/components/routes/apps/bored/Ship/components/templates/social-learning/research/Discussion.tsx)
│   │   │   │   │   │   │   │   │       ├── [HypothesisCard.tsx](./src/components/routes/apps/bored/Ship/components/templates/social-learning/research/HypothesisCard.tsx)
│   │   │   │   │   │   │   │   │       ├── [IntroLiterature.tsx](./src/components/routes/apps/bored/Ship/components/templates/social-learning/research/IntroLiterature.tsx)
│   │   │   │   │   │   │   │   │       ├── [Limitations.tsx](./src/components/routes/apps/bored/Ship/components/templates/social-learning/research/Limitations.tsx)
│   │   │   │   │   │   │   │   │       ├── [Methods.tsx](./src/components/routes/apps/bored/Ship/components/templates/social-learning/research/Methods.tsx)
│   │   │   │   │   │   │   │   │       ├── [Participants.tsx](./src/components/routes/apps/bored/Ship/components/templates/social-learning/research/Participants.tsx)
│   │   │   │   │   │   │   │   │       └── [Results.tsx](./src/components/routes/apps/bored/Ship/components/templates/social-learning/research/Results.tsx)
│   │   │   │   │   │   │   │   ├── visual-layout/
│   │   │   │   │   │   │   │   │   ├── list/
│   │   │   │   │   │   │   │   │   │   ├── [BulletList.tsx](./src/components/routes/apps/bored/Ship/components/templates/visual-layout/list/BulletList.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [Checklist.tsx](./src/components/routes/apps/bored/Ship/components/templates/visual-layout/list/Checklist.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [ColorPalette.tsx](./src/components/routes/apps/bored/Ship/components/templates/visual-layout/list/ColorPalette.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [Listicle.tsx](./src/components/routes/apps/bored/Ship/components/templates/visual-layout/list/Listicle.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [StepByStep.tsx](./src/components/routes/apps/bored/Ship/components/templates/visual-layout/list/StepByStep.tsx)
│   │   │   │   │   │   │   │   │   │   └── [StepsHorizontal.tsx](./src/components/routes/apps/bored/Ship/components/templates/visual-layout/list/StepsHorizontal.tsx)
│   │   │   │   │   │   │   │   │   ├── photography/
│   │   │   │   │   │   │   │   │   │   ├── [CameraSettings.tsx](./src/components/routes/apps/bored/Ship/components/templates/visual-layout/photography/CameraSettings.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [Composition.tsx](./src/components/routes/apps/bored/Ship/components/templates/visual-layout/photography/Composition.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [LensGuide.tsx](./src/components/routes/apps/bored/Ship/components/templates/visual-layout/photography/LensGuide.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [LightingTips.tsx](./src/components/routes/apps/bored/Ship/components/templates/visual-layout/photography/LightingTips.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [MoodBoard.tsx](./src/components/routes/apps/bored/Ship/components/templates/visual-layout/photography/MoodBoard.tsx)
│   │   │   │   │   │   │   │   │   │   └── [PhotoEditing.tsx](./src/components/routes/apps/bored/Ship/components/templates/visual-layout/photography/PhotoEditing.tsx)
│   │   │   │   │   │   │   │   │   ├── profile/
│   │   │   │   │   │   │   │   │   │   ├── [Certifications.tsx](./src/components/routes/apps/bored/Ship/components/templates/visual-layout/profile/Certifications.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [Education.tsx](./src/components/routes/apps/bored/Ship/components/templates/visual-layout/profile/Education.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [ProfileHeader.tsx](./src/components/routes/apps/bored/Ship/components/templates/visual-layout/profile/ProfileHeader.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [Projects.tsx](./src/components/routes/apps/bored/Ship/components/templates/visual-layout/profile/Projects.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [Skills.tsx](./src/components/routes/apps/bored/Ship/components/templates/visual-layout/profile/Skills.tsx)
│   │   │   │   │   │   │   │   │   │   └── [WorkExperience.tsx](./src/components/routes/apps/bored/Ship/components/templates/visual-layout/profile/WorkExperience.tsx)
│   │   │   │   │   │   │   │   │   ├── social/
│   │   │   │   │   │   │   │   │   │   ├── [EventCard.tsx](./src/components/routes/apps/bored/Ship/components/templates/visual-layout/social/EventCard.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [Mention.tsx](./src/components/routes/apps/bored/Ship/components/templates/visual-layout/social/Mention.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [ProfileCard.tsx](./src/components/routes/apps/bored/Ship/components/templates/visual-layout/social/ProfileCard.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [ShareCTA.tsx](./src/components/routes/apps/bored/Ship/components/templates/visual-layout/social/ShareCTA.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [TeamRoster.tsx](./src/components/routes/apps/bored/Ship/components/templates/visual-layout/social/TeamRoster.tsx)
│   │   │   │   │   │   │   │   │   │   └── [Testimonial.tsx](./src/components/routes/apps/bored/Ship/components/templates/visual-layout/social/Testimonial.tsx)
│   │   │   │   │   │   │   │   │   ├── text/
│   │   │   │   │   │   │   │   │   │   ├── [Haiku.tsx](./src/components/routes/apps/bored/Ship/components/templates/visual-layout/text/Haiku.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [Minimal.tsx](./src/components/routes/apps/bored/Ship/components/templates/visual-layout/text/Minimal.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [PullQuote.tsx](./src/components/routes/apps/bored/Ship/components/templates/visual-layout/text/PullQuote.tsx)
│   │   │   │   │   │   │   │   │   │   ├── [Takeaway.tsx](./src/components/routes/apps/bored/Ship/components/templates/visual-layout/text/Takeaway.tsx)
│   │   │   │   │   │   │   │   │   │   └── [TipCard.tsx](./src/components/routes/apps/bored/Ship/components/templates/visual-layout/text/TipCard.tsx)
│   │   │   │   │   │   │   │   │   └── weather/
│   │   │   │   │   │   │   │   │       ├── [ClimateCompare.tsx](./src/components/routes/apps/bored/Ship/components/templates/visual-layout/weather/ClimateCompare.tsx)
│   │   │   │   │   │   │   │   │       ├── [Forecast.tsx](./src/components/routes/apps/bored/Ship/components/templates/visual-layout/weather/Forecast.tsx)
│   │   │   │   │   │   │   │   │       ├── [Season.tsx](./src/components/routes/apps/bored/Ship/components/templates/visual-layout/weather/Season.tsx)
│   │   │   │   │   │   │   │   │       ├── [SunriseSunset.tsx](./src/components/routes/apps/bored/Ship/components/templates/visual-layout/weather/SunriseSunset.tsx)
│   │   │   │   │   │   │   │   │       ├── [UVIndex.tsx](./src/components/routes/apps/bored/Ship/components/templates/visual-layout/weather/UVIndex.tsx)
│   │   │   │   │   │   │   │   │       └── [WeeklyOutlook.tsx](./src/components/routes/apps/bored/Ship/components/templates/visual-layout/weather/WeeklyOutlook.tsx)
│   │   │   │   │   │   │   │   ├── [common.ts](./src/components/routes/apps/bored/Ship/components/templates/common.ts)
│   │   │   │   │   │   │   │   └── [index.ts](./src/components/routes/apps/bored/Ship/components/templates/index.ts)
│   │   │   │   │   │   │   ├── toolbar/
│   │   │   │   │   │   │   │   ├── [AspectRatioSelect.tsx](./src/components/routes/apps/bored/Ship/components/toolbar/AspectRatioSelect.tsx)
│   │   │   │   │   │   │   │   ├── [FileNameInput.tsx](./src/components/routes/apps/bored/Ship/components/toolbar/FileNameInput.tsx)
│   │   │   │   │   │   │   │   ├── [FontSelect.tsx](./src/components/routes/apps/bored/Ship/components/toolbar/FontSelect.tsx)
│   │   │   │   │   │   │   │   ├── [ShipInput.tsx](./src/components/routes/apps/bored/Ship/components/toolbar/ShipInput.tsx)
│   │   │   │   │   │   │   │   └── [Toolbar.tsx](./src/components/routes/apps/bored/Ship/components/toolbar/Toolbar.tsx)
│   │   │   │   │   │   │   └── [_icons.tsx](./src/components/routes/apps/bored/Ship/components/_icons.tsx)
│   │   │   │   │   │   ├── data/
│   │   │   │   │   │   │   ├── [docs-import.ts](./src/components/routes/apps/bored/Ship/data/docs-import.ts)
│   │   │   │   │   │   │   └── [templates-schema.ts](./src/components/routes/apps/bored/Ship/data/templates-schema.ts)
│   │   │   │   │   │   ├── docs/
│   │   │   │   │   │   │   ├── [posts.md](./src/components/routes/apps/bored/Ship/docs/posts.md)
│   │   │   │   │   │   │   ├── [series.md](./src/components/routes/apps/bored/Ship/docs/series.md)
│   │   │   │   │   │   │   ├── [sizing.md](./src/components/routes/apps/bored/Ship/docs/sizing.md)
│   │   │   │   │   │   │   └── [templates.md](./src/components/routes/apps/bored/Ship/docs/templates.md)
│   │   │   │   │   │   ├── posts/
│   │   │   │   │   │   │   ├── archive/
│   │   │   │   │   │   │   │   ├── 2026/
│   │   │   │   │   │   │   │   │   ├── Q3/
│   │   │   │   │   │   │   │   │   │   ├── 07/
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-07-11-sat-js-runtimes.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/07/2026-07-11-sat-js-runtimes.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-07-12-sun-wc-qf.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/07/2026-07-12-sun-wc-qf.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-07-13-mon-about-me.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/07/2026-07-13-mon-about-me.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-07-14-tue-news-typescript-7.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/07/2026-07-14-tue-news-typescript-7.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-07-15-wed-my-dev-stack.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/07/2026-07-15-wed-my-dev-stack.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-07-16-thu-wc-sf.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/07/2026-07-16-thu-wc-sf.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-07-17-fri-news-bun-zig-to-rust.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/07/2026-07-17-fri-news-bun-zig-to-rust.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-07-18-sat-new-kimi-k3.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/07/2026-07-18-sat-new-kimi-k3.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-07-19-sun-wc-third-place.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/07/2026-07-19-sun-wc-third-place.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-07-20-mon-wc-final.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/07/2026-07-20-mon-wc-final.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-07-21-tue-wc-wrapped.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/07/2026-07-21-tue-wc-wrapped.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-07-22-wed-wc-euro.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/07/2026-07-22-wed-wc-euro.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-07-23-thu-api-idempotency.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/07/2026-07-23-thu-api-idempotency.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-07-24-fri-openai-hugging-face-hacking.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/07/2026-07-24-fri-openai-hugging-face-hacking.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-07-25-sat-my-languages.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/07/2026-07-25-sat-my-languages.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-07-26-sun-larp.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/07/2026-07-26-sun-larp.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-07-27-mon-ai-markdown.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/07/2026-07-27-mon-ai-markdown.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-07-28-tue-claude-google-leak.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/07/2026-07-28-tue-claude-google-leak.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-07-29-wed-hydration.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/07/2026-07-29-wed-hydration.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-07-30-thu-good-hobby.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/07/2026-07-30-thu-good-hobby.yaml)
│   │   │   │   │   │   │   │   │   │   │   └── [2026-07-31-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/07/2026-07-31-fri.yaml)
│   │   │   │   │   │   │   │   │   │   ├── 08/
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-08-01-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/08/2026-08-01-sat.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-08-02-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/08/2026-08-02-sun.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-08-03-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/08/2026-08-03-mon.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-08-04-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/08/2026-08-04-tue.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-08-05-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/08/2026-08-05-wed.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-08-06-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/08/2026-08-06-thu.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-08-07-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/08/2026-08-07-fri.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-08-08-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/08/2026-08-08-sat.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-08-09-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/08/2026-08-09-sun.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-08-10-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/08/2026-08-10-mon.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-08-11-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/08/2026-08-11-tue.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-08-12-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/08/2026-08-12-wed.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-08-13-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/08/2026-08-13-thu.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-08-14-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/08/2026-08-14-fri.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-08-15-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/08/2026-08-15-sat.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-08-16-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/08/2026-08-16-sun.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-08-17-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/08/2026-08-17-mon.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-08-18-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/08/2026-08-18-tue.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-08-19-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/08/2026-08-19-wed.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-08-20-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/08/2026-08-20-thu.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-08-21-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/08/2026-08-21-fri.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-08-22-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/08/2026-08-22-sat.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-08-23-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/08/2026-08-23-sun.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-08-24-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/08/2026-08-24-mon.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-08-25-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/08/2026-08-25-tue.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-08-26-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/08/2026-08-26-wed.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-08-27-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/08/2026-08-27-thu.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-08-28-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/08/2026-08-28-fri.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-08-29-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/08/2026-08-29-sat.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-08-30-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/08/2026-08-30-sun.yaml)
│   │   │   │   │   │   │   │   │   │   │   └── [2026-08-31-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/08/2026-08-31-mon.yaml)
│   │   │   │   │   │   │   │   │   │   └── 09/
│   │   │   │   │   │   │   │   │   │       ├── [2026-09-01-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/09/2026-09-01-tue.yaml)
│   │   │   │   │   │   │   │   │   │       ├── [2026-09-02-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/09/2026-09-02-wed.yaml)
│   │   │   │   │   │   │   │   │   │       ├── [2026-09-03-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/09/2026-09-03-thu.yaml)
│   │   │   │   │   │   │   │   │   │       ├── [2026-09-04-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/09/2026-09-04-fri.yaml)
│   │   │   │   │   │   │   │   │   │       ├── [2026-09-05-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/09/2026-09-05-sat.yaml)
│   │   │   │   │   │   │   │   │   │       ├── [2026-09-06-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/09/2026-09-06-sun.yaml)
│   │   │   │   │   │   │   │   │   │       ├── [2026-09-07-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/09/2026-09-07-mon.yaml)
│   │   │   │   │   │   │   │   │   │       ├── [2026-09-08-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/09/2026-09-08-tue.yaml)
│   │   │   │   │   │   │   │   │   │       ├── [2026-09-09-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/09/2026-09-09-wed.yaml)
│   │   │   │   │   │   │   │   │   │       ├── [2026-09-10-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/09/2026-09-10-thu.yaml)
│   │   │   │   │   │   │   │   │   │       ├── [2026-09-11-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/09/2026-09-11-fri.yaml)
│   │   │   │   │   │   │   │   │   │       ├── [2026-09-12-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/09/2026-09-12-sat.yaml)
│   │   │   │   │   │   │   │   │   │       ├── [2026-09-13-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/09/2026-09-13-sun.yaml)
│   │   │   │   │   │   │   │   │   │       ├── [2026-09-14-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/09/2026-09-14-mon.yaml)
│   │   │   │   │   │   │   │   │   │       ├── [2026-09-15-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/09/2026-09-15-tue.yaml)
│   │   │   │   │   │   │   │   │   │       ├── [2026-09-16-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/09/2026-09-16-wed.yaml)
│   │   │   │   │   │   │   │   │   │       ├── [2026-09-17-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/09/2026-09-17-thu.yaml)
│   │   │   │   │   │   │   │   │   │       ├── [2026-09-18-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/09/2026-09-18-fri.yaml)
│   │   │   │   │   │   │   │   │   │       ├── [2026-09-19-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/09/2026-09-19-sat.yaml)
│   │   │   │   │   │   │   │   │   │       ├── [2026-09-20-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/09/2026-09-20-sun.yaml)
│   │   │   │   │   │   │   │   │   │       ├── [2026-09-21-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/09/2026-09-21-mon.yaml)
│   │   │   │   │   │   │   │   │   │       ├── [2026-09-22-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/09/2026-09-22-tue.yaml)
│   │   │   │   │   │   │   │   │   │       ├── [2026-09-23-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/09/2026-09-23-wed.yaml)
│   │   │   │   │   │   │   │   │   │       ├── [2026-09-24-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/09/2026-09-24-thu.yaml)
│   │   │   │   │   │   │   │   │   │       ├── [2026-09-25-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/09/2026-09-25-fri.yaml)
│   │   │   │   │   │   │   │   │   │       ├── [2026-09-26-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/09/2026-09-26-sat.yaml)
│   │   │   │   │   │   │   │   │   │       ├── [2026-09-27-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/09/2026-09-27-sun.yaml)
│   │   │   │   │   │   │   │   │   │       ├── [2026-09-28-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/09/2026-09-28-mon.yaml)
│   │   │   │   │   │   │   │   │   │       ├── [2026-09-29-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/09/2026-09-29-tue.yaml)
│   │   │   │   │   │   │   │   │   │       └── [2026-09-30-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/09/2026-09-30-wed.yaml)
│   │   │   │   │   │   │   │   │   └── Q4/
│   │   │   │   │   │   │   │   │       ├── 10/
│   │   │   │   │   │   │   │   │       │   ├── [2026-10-01-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/10/2026-10-01-thu.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-10-02-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/10/2026-10-02-fri.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-10-03-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/10/2026-10-03-sat.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-10-04-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/10/2026-10-04-sun.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-10-05-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/10/2026-10-05-mon.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-10-06-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/10/2026-10-06-tue.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-10-07-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/10/2026-10-07-wed.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-10-08-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/10/2026-10-08-thu.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-10-09-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/10/2026-10-09-fri.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-10-10-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/10/2026-10-10-sat.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-10-11-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/10/2026-10-11-sun.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-10-12-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/10/2026-10-12-mon.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-10-13-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/10/2026-10-13-tue.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-10-14-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/10/2026-10-14-wed.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-10-15-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/10/2026-10-15-thu.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-10-16-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/10/2026-10-16-fri.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-10-17-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/10/2026-10-17-sat.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-10-18-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/10/2026-10-18-sun.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-10-19-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/10/2026-10-19-mon.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-10-20-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/10/2026-10-20-tue.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-10-21-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/10/2026-10-21-wed.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-10-22-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/10/2026-10-22-thu.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-10-23-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/10/2026-10-23-fri.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-10-24-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/10/2026-10-24-sat.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-10-25-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/10/2026-10-25-sun.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-10-26-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/10/2026-10-26-mon.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-10-27-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/10/2026-10-27-tue.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-10-28-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/10/2026-10-28-wed.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-10-29-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/10/2026-10-29-thu.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-10-30-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/10/2026-10-30-fri.yaml)
│   │   │   │   │   │   │   │   │       │   └── [2026-10-31-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/10/2026-10-31-sat.yaml)
│   │   │   │   │   │   │   │   │       ├── 11/
│   │   │   │   │   │   │   │   │       │   ├── [2026-11-01-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/11/2026-11-01-sun.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-11-02-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/11/2026-11-02-mon.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-11-03-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/11/2026-11-03-tue.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-11-04-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/11/2026-11-04-wed.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-11-05-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/11/2026-11-05-thu.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-11-06-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/11/2026-11-06-fri.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-11-07-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/11/2026-11-07-sat.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-11-08-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/11/2026-11-08-sun.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-11-09-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/11/2026-11-09-mon.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-11-10-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/11/2026-11-10-tue.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-11-11-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/11/2026-11-11-wed.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-11-12-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/11/2026-11-12-thu.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-11-13-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/11/2026-11-13-fri.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-11-14-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/11/2026-11-14-sat.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-11-15-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/11/2026-11-15-sun.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-11-16-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/11/2026-11-16-mon.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-11-17-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/11/2026-11-17-tue.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-11-18-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/11/2026-11-18-wed.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-11-19-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/11/2026-11-19-thu.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-11-20-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/11/2026-11-20-fri.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-11-21-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/11/2026-11-21-sat.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-11-22-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/11/2026-11-22-sun.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-11-23-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/11/2026-11-23-mon.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-11-24-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/11/2026-11-24-tue.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-11-25-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/11/2026-11-25-wed.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-11-26-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/11/2026-11-26-thu.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-11-27-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/11/2026-11-27-fri.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-11-28-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/11/2026-11-28-sat.yaml)
│   │   │   │   │   │   │   │   │       │   ├── [2026-11-29-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/11/2026-11-29-sun.yaml)
│   │   │   │   │   │   │   │   │       │   └── [2026-11-30-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/11/2026-11-30-mon.yaml)
│   │   │   │   │   │   │   │   │       └── 12/
│   │   │   │   │   │   │   │   │           ├── [2026-12-01-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/12/2026-12-01-tue.yaml)
│   │   │   │   │   │   │   │   │           ├── [2026-12-02-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/12/2026-12-02-wed.yaml)
│   │   │   │   │   │   │   │   │           ├── [2026-12-03-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/12/2026-12-03-thu.yaml)
│   │   │   │   │   │   │   │   │           ├── [2026-12-04-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/12/2026-12-04-fri.yaml)
│   │   │   │   │   │   │   │   │           ├── [2026-12-05-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/12/2026-12-05-sat.yaml)
│   │   │   │   │   │   │   │   │           ├── [2026-12-06-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/12/2026-12-06-sun.yaml)
│   │   │   │   │   │   │   │   │           ├── [2026-12-07-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/12/2026-12-07-mon.yaml)
│   │   │   │   │   │   │   │   │           ├── [2026-12-08-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/12/2026-12-08-tue.yaml)
│   │   │   │   │   │   │   │   │           ├── [2026-12-09-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/12/2026-12-09-wed.yaml)
│   │   │   │   │   │   │   │   │           ├── [2026-12-10-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/12/2026-12-10-thu.yaml)
│   │   │   │   │   │   │   │   │           ├── [2026-12-11-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/12/2026-12-11-fri.yaml)
│   │   │   │   │   │   │   │   │           ├── [2026-12-12-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/12/2026-12-12-sat.yaml)
│   │   │   │   │   │   │   │   │           ├── [2026-12-13-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/12/2026-12-13-sun.yaml)
│   │   │   │   │   │   │   │   │           ├── [2026-12-14-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/12/2026-12-14-mon.yaml)
│   │   │   │   │   │   │   │   │           ├── [2026-12-15-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/12/2026-12-15-tue.yaml)
│   │   │   │   │   │   │   │   │           ├── [2026-12-16-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/12/2026-12-16-wed.yaml)
│   │   │   │   │   │   │   │   │           ├── [2026-12-17-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/12/2026-12-17-thu.yaml)
│   │   │   │   │   │   │   │   │           ├── [2026-12-18-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/12/2026-12-18-fri.yaml)
│   │   │   │   │   │   │   │   │           ├── [2026-12-19-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/12/2026-12-19-sat.yaml)
│   │   │   │   │   │   │   │   │           ├── [2026-12-20-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/12/2026-12-20-sun.yaml)
│   │   │   │   │   │   │   │   │           ├── [2026-12-21-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/12/2026-12-21-mon.yaml)
│   │   │   │   │   │   │   │   │           ├── [2026-12-22-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/12/2026-12-22-tue.yaml)
│   │   │   │   │   │   │   │   │           ├── [2026-12-23-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/12/2026-12-23-wed.yaml)
│   │   │   │   │   │   │   │   │           ├── [2026-12-24-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/12/2026-12-24-thu.yaml)
│   │   │   │   │   │   │   │   │           ├── [2026-12-25-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/12/2026-12-25-fri.yaml)
│   │   │   │   │   │   │   │   │           ├── [2026-12-26-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/12/2026-12-26-sat.yaml)
│   │   │   │   │   │   │   │   │           ├── [2026-12-27-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/12/2026-12-27-sun.yaml)
│   │   │   │   │   │   │   │   │           ├── [2026-12-28-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/12/2026-12-28-mon.yaml)
│   │   │   │   │   │   │   │   │           ├── [2026-12-29-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/12/2026-12-29-tue.yaml)
│   │   │   │   │   │   │   │   │           ├── [2026-12-30-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/12/2026-12-30-wed.yaml)
│   │   │   │   │   │   │   │   │           └── [2026-12-31-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q4/12/2026-12-31-thu.yaml)
│   │   │   │   │   │   │   │   └── 2027/
│   │   │   │   │   │   │   │       ├── Q1/
│   │   │   │   │   │   │   │       │   ├── 01/
│   │   │   │   │   │   │   │       │   │   ├── [2027-01-01-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/01/2027-01-01-fri.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-01-02-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/01/2027-01-02-sat.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-01-03-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/01/2027-01-03-sun.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-01-04-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/01/2027-01-04-mon.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-01-05-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/01/2027-01-05-tue.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-01-06-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/01/2027-01-06-wed.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-01-07-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/01/2027-01-07-thu.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-01-08-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/01/2027-01-08-fri.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-01-09-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/01/2027-01-09-sat.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-01-10-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/01/2027-01-10-sun.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-01-11-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/01/2027-01-11-mon.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-01-12-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/01/2027-01-12-tue.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-01-13-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/01/2027-01-13-wed.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-01-14-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/01/2027-01-14-thu.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-01-15-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/01/2027-01-15-fri.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-01-16-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/01/2027-01-16-sat.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-01-17-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/01/2027-01-17-sun.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-01-18-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/01/2027-01-18-mon.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-01-19-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/01/2027-01-19-tue.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-01-20-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/01/2027-01-20-wed.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-01-21-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/01/2027-01-21-thu.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-01-22-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/01/2027-01-22-fri.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-01-23-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/01/2027-01-23-sat.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-01-24-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/01/2027-01-24-sun.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-01-25-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/01/2027-01-25-mon.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-01-26-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/01/2027-01-26-tue.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-01-27-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/01/2027-01-27-wed.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-01-28-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/01/2027-01-28-thu.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-01-29-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/01/2027-01-29-fri.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-01-30-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/01/2027-01-30-sat.yaml)
│   │   │   │   │   │   │   │       │   │   └── [2027-01-31-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/01/2027-01-31-sun.yaml)
│   │   │   │   │   │   │   │       │   ├── 02/
│   │   │   │   │   │   │   │       │   │   ├── [2027-02-01-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/02/2027-02-01-mon.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-02-02-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/02/2027-02-02-tue.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-02-03-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/02/2027-02-03-wed.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-02-04-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/02/2027-02-04-thu.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-02-05-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/02/2027-02-05-fri.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-02-06-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/02/2027-02-06-sat.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-02-07-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/02/2027-02-07-sun.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-02-08-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/02/2027-02-08-mon.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-02-09-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/02/2027-02-09-tue.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-02-10-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/02/2027-02-10-wed.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-02-11-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/02/2027-02-11-thu.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-02-12-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/02/2027-02-12-fri.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-02-13-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/02/2027-02-13-sat.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-02-14-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/02/2027-02-14-sun.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-02-15-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/02/2027-02-15-mon.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-02-16-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/02/2027-02-16-tue.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-02-17-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/02/2027-02-17-wed.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-02-18-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/02/2027-02-18-thu.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-02-19-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/02/2027-02-19-fri.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-02-20-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/02/2027-02-20-sat.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-02-21-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/02/2027-02-21-sun.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-02-22-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/02/2027-02-22-mon.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-02-23-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/02/2027-02-23-tue.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-02-24-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/02/2027-02-24-wed.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-02-25-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/02/2027-02-25-thu.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-02-26-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/02/2027-02-26-fri.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-02-27-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/02/2027-02-27-sat.yaml)
│   │   │   │   │   │   │   │       │   │   └── [2027-02-28-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/02/2027-02-28-sun.yaml)
│   │   │   │   │   │   │   │       │   └── 03/
│   │   │   │   │   │   │   │       │       ├── [2027-03-01-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/03/2027-03-01-mon.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-03-02-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/03/2027-03-02-tue.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-03-03-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/03/2027-03-03-wed.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-03-04-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/03/2027-03-04-thu.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-03-05-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/03/2027-03-05-fri.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-03-06-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/03/2027-03-06-sat.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-03-07-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/03/2027-03-07-sun.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-03-08-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/03/2027-03-08-mon.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-03-09-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/03/2027-03-09-tue.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-03-10-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/03/2027-03-10-wed.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-03-11-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/03/2027-03-11-thu.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-03-12-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/03/2027-03-12-fri.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-03-13-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/03/2027-03-13-sat.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-03-14-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/03/2027-03-14-sun.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-03-15-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/03/2027-03-15-mon.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-03-16-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/03/2027-03-16-tue.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-03-17-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/03/2027-03-17-wed.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-03-18-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/03/2027-03-18-thu.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-03-19-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/03/2027-03-19-fri.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-03-20-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/03/2027-03-20-sat.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-03-21-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/03/2027-03-21-sun.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-03-22-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/03/2027-03-22-mon.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-03-23-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/03/2027-03-23-tue.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-03-24-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/03/2027-03-24-wed.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-03-25-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/03/2027-03-25-thu.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-03-26-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/03/2027-03-26-fri.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-03-27-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/03/2027-03-27-sat.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-03-28-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/03/2027-03-28-sun.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-03-29-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/03/2027-03-29-mon.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-03-30-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/03/2027-03-30-tue.yaml)
│   │   │   │   │   │   │   │       │       └── [2027-03-31-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q1/03/2027-03-31-wed.yaml)
│   │   │   │   │   │   │   │       ├── Q2/
│   │   │   │   │   │   │   │       │   ├── 04/
│   │   │   │   │   │   │   │       │   │   ├── [2027-04-01-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/04/2027-04-01-thu.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-04-02-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/04/2027-04-02-fri.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-04-03-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/04/2027-04-03-sat.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-04-04-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/04/2027-04-04-sun.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-04-05-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/04/2027-04-05-mon.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-04-06-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/04/2027-04-06-tue.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-04-07-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/04/2027-04-07-wed.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-04-08-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/04/2027-04-08-thu.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-04-09-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/04/2027-04-09-fri.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-04-10-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/04/2027-04-10-sat.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-04-11-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/04/2027-04-11-sun.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-04-12-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/04/2027-04-12-mon.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-04-13-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/04/2027-04-13-tue.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-04-14-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/04/2027-04-14-wed.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-04-15-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/04/2027-04-15-thu.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-04-16-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/04/2027-04-16-fri.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-04-17-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/04/2027-04-17-sat.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-04-18-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/04/2027-04-18-sun.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-04-19-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/04/2027-04-19-mon.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-04-20-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/04/2027-04-20-tue.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-04-21-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/04/2027-04-21-wed.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-04-22-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/04/2027-04-22-thu.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-04-23-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/04/2027-04-23-fri.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-04-24-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/04/2027-04-24-sat.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-04-25-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/04/2027-04-25-sun.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-04-26-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/04/2027-04-26-mon.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-04-27-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/04/2027-04-27-tue.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-04-28-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/04/2027-04-28-wed.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-04-29-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/04/2027-04-29-thu.yaml)
│   │   │   │   │   │   │   │       │   │   └── [2027-04-30-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/04/2027-04-30-fri.yaml)
│   │   │   │   │   │   │   │       │   ├── 05/
│   │   │   │   │   │   │   │       │   │   ├── [2027-05-01-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/05/2027-05-01-sat.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-05-02-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/05/2027-05-02-sun.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-05-03-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/05/2027-05-03-mon.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-05-04-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/05/2027-05-04-tue.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-05-05-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/05/2027-05-05-wed.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-05-06-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/05/2027-05-06-thu.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-05-07-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/05/2027-05-07-fri.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-05-08-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/05/2027-05-08-sat.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-05-09-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/05/2027-05-09-sun.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-05-10-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/05/2027-05-10-mon.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-05-11-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/05/2027-05-11-tue.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-05-12-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/05/2027-05-12-wed.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-05-13-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/05/2027-05-13-thu.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-05-14-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/05/2027-05-14-fri.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-05-15-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/05/2027-05-15-sat.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-05-16-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/05/2027-05-16-sun.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-05-17-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/05/2027-05-17-mon.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-05-18-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/05/2027-05-18-tue.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-05-19-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/05/2027-05-19-wed.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-05-20-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/05/2027-05-20-thu.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-05-21-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/05/2027-05-21-fri.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-05-22-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/05/2027-05-22-sat.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-05-23-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/05/2027-05-23-sun.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-05-24-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/05/2027-05-24-mon.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-05-25-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/05/2027-05-25-tue.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-05-26-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/05/2027-05-26-wed.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-05-27-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/05/2027-05-27-thu.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-05-28-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/05/2027-05-28-fri.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-05-29-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/05/2027-05-29-sat.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-05-30-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/05/2027-05-30-sun.yaml)
│   │   │   │   │   │   │   │       │   │   └── [2027-05-31-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/05/2027-05-31-mon.yaml)
│   │   │   │   │   │   │   │       │   └── 06/
│   │   │   │   │   │   │   │       │       ├── [2027-06-01-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/06/2027-06-01-tue.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-06-02-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/06/2027-06-02-wed.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-06-03-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/06/2027-06-03-thu.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-06-04-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/06/2027-06-04-fri.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-06-05-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/06/2027-06-05-sat.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-06-06-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/06/2027-06-06-sun.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-06-07-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/06/2027-06-07-mon.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-06-08-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/06/2027-06-08-tue.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-06-09-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/06/2027-06-09-wed.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-06-10-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/06/2027-06-10-thu.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-06-11-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/06/2027-06-11-fri.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-06-12-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/06/2027-06-12-sat.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-06-13-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/06/2027-06-13-sun.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-06-14-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/06/2027-06-14-mon.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-06-15-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/06/2027-06-15-tue.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-06-16-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/06/2027-06-16-wed.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-06-17-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/06/2027-06-17-thu.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-06-18-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/06/2027-06-18-fri.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-06-19-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/06/2027-06-19-sat.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-06-20-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/06/2027-06-20-sun.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-06-21-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/06/2027-06-21-mon.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-06-22-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/06/2027-06-22-tue.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-06-23-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/06/2027-06-23-wed.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-06-24-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/06/2027-06-24-thu.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-06-25-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/06/2027-06-25-fri.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-06-26-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/06/2027-06-26-sat.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-06-27-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/06/2027-06-27-sun.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-06-28-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/06/2027-06-28-mon.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-06-29-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/06/2027-06-29-tue.yaml)
│   │   │   │   │   │   │   │       │       └── [2027-06-30-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q2/06/2027-06-30-wed.yaml)
│   │   │   │   │   │   │   │       ├── Q3/
│   │   │   │   │   │   │   │       │   ├── 07/
│   │   │   │   │   │   │   │       │   │   ├── [2027-07-01-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/07/2027-07-01-thu.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-07-02-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/07/2027-07-02-fri.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-07-03-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/07/2027-07-03-sat.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-07-04-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/07/2027-07-04-sun.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-07-05-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/07/2027-07-05-mon.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-07-06-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/07/2027-07-06-tue.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-07-07-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/07/2027-07-07-wed.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-07-08-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/07/2027-07-08-thu.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-07-09-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/07/2027-07-09-fri.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-07-10-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/07/2027-07-10-sat.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-07-11-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/07/2027-07-11-sun.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-07-12-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/07/2027-07-12-mon.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-07-13-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/07/2027-07-13-tue.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-07-14-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/07/2027-07-14-wed.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-07-15-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/07/2027-07-15-thu.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-07-16-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/07/2027-07-16-fri.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-07-17-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/07/2027-07-17-sat.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-07-18-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/07/2027-07-18-sun.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-07-19-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/07/2027-07-19-mon.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-07-20-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/07/2027-07-20-tue.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-07-21-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/07/2027-07-21-wed.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-07-22-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/07/2027-07-22-thu.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-07-23-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/07/2027-07-23-fri.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-07-24-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/07/2027-07-24-sat.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-07-25-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/07/2027-07-25-sun.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-07-26-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/07/2027-07-26-mon.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-07-27-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/07/2027-07-27-tue.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-07-28-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/07/2027-07-28-wed.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-07-29-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/07/2027-07-29-thu.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-07-30-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/07/2027-07-30-fri.yaml)
│   │   │   │   │   │   │   │       │   │   └── [2027-07-31-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/07/2027-07-31-sat.yaml)
│   │   │   │   │   │   │   │       │   ├── 08/
│   │   │   │   │   │   │   │       │   │   ├── [2027-08-01-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/08/2027-08-01-sun.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-08-02-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/08/2027-08-02-mon.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-08-03-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/08/2027-08-03-tue.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-08-04-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/08/2027-08-04-wed.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-08-05-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/08/2027-08-05-thu.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-08-06-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/08/2027-08-06-fri.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-08-07-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/08/2027-08-07-sat.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-08-08-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/08/2027-08-08-sun.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-08-09-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/08/2027-08-09-mon.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-08-10-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/08/2027-08-10-tue.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-08-11-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/08/2027-08-11-wed.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-08-12-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/08/2027-08-12-thu.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-08-13-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/08/2027-08-13-fri.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-08-14-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/08/2027-08-14-sat.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-08-15-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/08/2027-08-15-sun.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-08-16-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/08/2027-08-16-mon.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-08-17-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/08/2027-08-17-tue.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-08-18-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/08/2027-08-18-wed.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-08-19-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/08/2027-08-19-thu.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-08-20-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/08/2027-08-20-fri.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-08-21-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/08/2027-08-21-sat.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-08-22-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/08/2027-08-22-sun.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-08-23-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/08/2027-08-23-mon.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-08-24-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/08/2027-08-24-tue.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-08-25-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/08/2027-08-25-wed.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-08-26-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/08/2027-08-26-thu.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-08-27-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/08/2027-08-27-fri.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-08-28-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/08/2027-08-28-sat.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-08-29-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/08/2027-08-29-sun.yaml)
│   │   │   │   │   │   │   │       │   │   ├── [2027-08-30-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/08/2027-08-30-mon.yaml)
│   │   │   │   │   │   │   │       │   │   └── [2027-08-31-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/08/2027-08-31-tue.yaml)
│   │   │   │   │   │   │   │       │   └── 09/
│   │   │   │   │   │   │   │       │       ├── [2027-09-01-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/09/2027-09-01-wed.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-09-02-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/09/2027-09-02-thu.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-09-03-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/09/2027-09-03-fri.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-09-04-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/09/2027-09-04-sat.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-09-05-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/09/2027-09-05-sun.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-09-06-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/09/2027-09-06-mon.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-09-07-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/09/2027-09-07-tue.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-09-08-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/09/2027-09-08-wed.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-09-09-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/09/2027-09-09-thu.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-09-10-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/09/2027-09-10-fri.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-09-11-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/09/2027-09-11-sat.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-09-12-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/09/2027-09-12-sun.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-09-13-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/09/2027-09-13-mon.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-09-14-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/09/2027-09-14-tue.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-09-15-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/09/2027-09-15-wed.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-09-16-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/09/2027-09-16-thu.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-09-17-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/09/2027-09-17-fri.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-09-18-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/09/2027-09-18-sat.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-09-19-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/09/2027-09-19-sun.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-09-20-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/09/2027-09-20-mon.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-09-21-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/09/2027-09-21-tue.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-09-22-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/09/2027-09-22-wed.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-09-23-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/09/2027-09-23-thu.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-09-24-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/09/2027-09-24-fri.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-09-25-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/09/2027-09-25-sat.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-09-26-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/09/2027-09-26-sun.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-09-27-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/09/2027-09-27-mon.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-09-28-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/09/2027-09-28-tue.yaml)
│   │   │   │   │   │   │   │       │       ├── [2027-09-29-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/09/2027-09-29-wed.yaml)
│   │   │   │   │   │   │   │       │       └── [2027-09-30-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q3/09/2027-09-30-thu.yaml)
│   │   │   │   │   │   │   │       └── Q4/
│   │   │   │   │   │   │   │           ├── 10/
│   │   │   │   │   │   │   │           │   ├── [2027-10-01-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/10/2027-10-01-fri.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-10-02-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/10/2027-10-02-sat.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-10-03-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/10/2027-10-03-sun.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-10-04-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/10/2027-10-04-mon.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-10-05-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/10/2027-10-05-tue.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-10-06-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/10/2027-10-06-wed.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-10-07-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/10/2027-10-07-thu.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-10-08-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/10/2027-10-08-fri.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-10-09-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/10/2027-10-09-sat.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-10-10-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/10/2027-10-10-sun.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-10-11-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/10/2027-10-11-mon.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-10-12-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/10/2027-10-12-tue.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-10-13-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/10/2027-10-13-wed.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-10-14-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/10/2027-10-14-thu.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-10-15-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/10/2027-10-15-fri.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-10-16-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/10/2027-10-16-sat.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-10-17-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/10/2027-10-17-sun.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-10-18-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/10/2027-10-18-mon.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-10-19-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/10/2027-10-19-tue.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-10-20-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/10/2027-10-20-wed.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-10-21-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/10/2027-10-21-thu.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-10-22-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/10/2027-10-22-fri.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-10-23-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/10/2027-10-23-sat.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-10-24-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/10/2027-10-24-sun.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-10-25-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/10/2027-10-25-mon.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-10-26-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/10/2027-10-26-tue.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-10-27-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/10/2027-10-27-wed.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-10-28-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/10/2027-10-28-thu.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-10-29-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/10/2027-10-29-fri.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-10-30-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/10/2027-10-30-sat.yaml)
│   │   │   │   │   │   │   │           │   └── [2027-10-31-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/10/2027-10-31-sun.yaml)
│   │   │   │   │   │   │   │           ├── 11/
│   │   │   │   │   │   │   │           │   ├── [2027-11-01-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/11/2027-11-01-mon.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-11-02-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/11/2027-11-02-tue.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-11-03-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/11/2027-11-03-wed.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-11-04-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/11/2027-11-04-thu.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-11-05-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/11/2027-11-05-fri.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-11-06-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/11/2027-11-06-sat.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-11-07-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/11/2027-11-07-sun.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-11-08-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/11/2027-11-08-mon.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-11-09-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/11/2027-11-09-tue.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-11-10-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/11/2027-11-10-wed.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-11-11-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/11/2027-11-11-thu.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-11-12-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/11/2027-11-12-fri.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-11-13-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/11/2027-11-13-sat.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-11-14-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/11/2027-11-14-sun.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-11-15-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/11/2027-11-15-mon.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-11-16-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/11/2027-11-16-tue.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-11-17-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/11/2027-11-17-wed.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-11-18-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/11/2027-11-18-thu.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-11-19-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/11/2027-11-19-fri.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-11-20-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/11/2027-11-20-sat.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-11-21-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/11/2027-11-21-sun.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-11-22-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/11/2027-11-22-mon.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-11-23-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/11/2027-11-23-tue.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-11-24-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/11/2027-11-24-wed.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-11-25-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/11/2027-11-25-thu.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-11-26-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/11/2027-11-26-fri.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-11-27-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/11/2027-11-27-sat.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-11-28-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/11/2027-11-28-sun.yaml)
│   │   │   │   │   │   │   │           │   ├── [2027-11-29-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/11/2027-11-29-mon.yaml)
│   │   │   │   │   │   │   │           │   └── [2027-11-30-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/11/2027-11-30-tue.yaml)
│   │   │   │   │   │   │   │           └── 12/
│   │   │   │   │   │   │   │               ├── [2027-12-01-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/12/2027-12-01-wed.yaml)
│   │   │   │   │   │   │   │               ├── [2027-12-02-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/12/2027-12-02-thu.yaml)
│   │   │   │   │   │   │   │               ├── [2027-12-03-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/12/2027-12-03-fri.yaml)
│   │   │   │   │   │   │   │               ├── [2027-12-04-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/12/2027-12-04-sat.yaml)
│   │   │   │   │   │   │   │               ├── [2027-12-05-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/12/2027-12-05-sun.yaml)
│   │   │   │   │   │   │   │               ├── [2027-12-06-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/12/2027-12-06-mon.yaml)
│   │   │   │   │   │   │   │               ├── [2027-12-07-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/12/2027-12-07-tue.yaml)
│   │   │   │   │   │   │   │               ├── [2027-12-08-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/12/2027-12-08-wed.yaml)
│   │   │   │   │   │   │   │               ├── [2027-12-09-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/12/2027-12-09-thu.yaml)
│   │   │   │   │   │   │   │               ├── [2027-12-10-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/12/2027-12-10-fri.yaml)
│   │   │   │   │   │   │   │               ├── [2027-12-11-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/12/2027-12-11-sat.yaml)
│   │   │   │   │   │   │   │               ├── [2027-12-12-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/12/2027-12-12-sun.yaml)
│   │   │   │   │   │   │   │               ├── [2027-12-13-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/12/2027-12-13-mon.yaml)
│   │   │   │   │   │   │   │               ├── [2027-12-14-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/12/2027-12-14-tue.yaml)
│   │   │   │   │   │   │   │               ├── [2027-12-15-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/12/2027-12-15-wed.yaml)
│   │   │   │   │   │   │   │               ├── [2027-12-16-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/12/2027-12-16-thu.yaml)
│   │   │   │   │   │   │   │               ├── [2027-12-17-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/12/2027-12-17-fri.yaml)
│   │   │   │   │   │   │   │               ├── [2027-12-18-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/12/2027-12-18-sat.yaml)
│   │   │   │   │   │   │   │               ├── [2027-12-19-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/12/2027-12-19-sun.yaml)
│   │   │   │   │   │   │   │               ├── [2027-12-20-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/12/2027-12-20-mon.yaml)
│   │   │   │   │   │   │   │               ├── [2027-12-21-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/12/2027-12-21-tue.yaml)
│   │   │   │   │   │   │   │               ├── [2027-12-22-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/12/2027-12-22-wed.yaml)
│   │   │   │   │   │   │   │               ├── [2027-12-23-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/12/2027-12-23-thu.yaml)
│   │   │   │   │   │   │   │               ├── [2027-12-24-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/12/2027-12-24-fri.yaml)
│   │   │   │   │   │   │   │               ├── [2027-12-25-sat.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/12/2027-12-25-sat.yaml)
│   │   │   │   │   │   │   │               ├── [2027-12-26-sun.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/12/2027-12-26-sun.yaml)
│   │   │   │   │   │   │   │               ├── [2027-12-27-mon.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/12/2027-12-27-mon.yaml)
│   │   │   │   │   │   │   │               ├── [2027-12-28-tue.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/12/2027-12-28-tue.yaml)
│   │   │   │   │   │   │   │               ├── [2027-12-29-wed.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/12/2027-12-29-wed.yaml)
│   │   │   │   │   │   │   │               ├── [2027-12-30-thu.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/12/2027-12-30-thu.yaml)
│   │   │   │   │   │   │   │               └── [2027-12-31-fri.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2027/Q4/12/2027-12-31-fri.yaml)
│   │   │   │   │   │   │   ├── next/
│   │   │   │   │   │   │   │   ├── computational-neuroscience/
│   │   │   │   │   │   │   │   │   ├── [core-cpu-vs-prefrontal-cortex.yaml](./src/components/routes/apps/bored/Ship/posts/next/computational-neuroscience/core-cpu-vs-prefrontal-cortex.yaml)
│   │   │   │   │   │   │   │   │   ├── [core-motherboard-vs-white-matter.yaml](./src/components/routes/apps/bored/Ship/posts/next/computational-neuroscience/core-motherboard-vs-white-matter.yaml)
│   │   │   │   │   │   │   │   │   ├── [core-ram-vs-working-memory.yaml](./src/components/routes/apps/bored/Ship/posts/next/computational-neuroscience/core-ram-vs-working-memory.yaml)
│   │   │   │   │   │   │   │   │   ├── [core-ssd-controller-vs-hippocampus.yaml](./src/components/routes/apps/bored/Ship/posts/next/computational-neuroscience/core-ssd-controller-vs-hippocampus.yaml)
│   │   │   │   │   │   │   │   │   ├── [core-ssd-storage-vs-long-term-memory.yaml](./src/components/routes/apps/bored/Ship/posts/next/computational-neuroscience/core-ssd-storage-vs-long-term-memory.yaml)
│   │   │   │   │   │   │   │   │   ├── [sense-gpu-vs-visual-cortex.yaml](./src/components/routes/apps/bored/Ship/posts/next/computational-neuroscience/sense-gpu-vs-visual-cortex.yaml)
│   │   │   │   │   │   │   │   │   └── [sense-languages-processing.yaml](./src/components/routes/apps/bored/Ship/posts/next/computational-neuroscience/sense-languages-processing.yaml)
│   │   │   │   │   │   │   │   ├── football-2026-world-cup/
│   │   │   │   │   │   │   │   │   ├── [round-of-02-final.yaml](./src/components/routes/apps/bored/Ship/posts/next/football-2026-world-cup/round-of-02-final.yaml)
│   │   │   │   │   │   │   │   │   ├── [round-of-02-third-place.yaml](./src/components/routes/apps/bored/Ship/posts/next/football-2026-world-cup/round-of-02-third-place.yaml)
│   │   │   │   │   │   │   │   │   ├── [round-of-04-sf.yaml](./src/components/routes/apps/bored/Ship/posts/next/football-2026-world-cup/round-of-04-sf.yaml)
│   │   │   │   │   │   │   │   │   ├── [round-of-08-qf.yaml](./src/components/routes/apps/bored/Ship/posts/next/football-2026-world-cup/round-of-08-qf.yaml)
│   │   │   │   │   │   │   │   │   ├── [round-of-16.yaml](./src/components/routes/apps/bored/Ship/posts/next/football-2026-world-cup/round-of-16.yaml)
│   │   │   │   │   │   │   │   │   ├── [round-of-32.yaml](./src/components/routes/apps/bored/Ship/posts/next/football-2026-world-cup/round-of-32.yaml)
│   │   │   │   │   │   │   │   │   ├── [world-cup-euro.yaml](./src/components/routes/apps/bored/Ship/posts/next/football-2026-world-cup/world-cup-euro.yaml)
│   │   │   │   │   │   │   │   │   └── [wrapped.yaml](./src/components/routes/apps/bored/Ship/posts/next/football-2026-world-cup/wrapped.yaml)
│   │   │   │   │   │   │   │   ├── football-2028-euro/
│   │   │   │   │   │   │   │   │   ├── [round-of-02-final.yaml](./src/components/routes/apps/bored/Ship/posts/next/football-2028-euro/round-of-02-final.yaml)
│   │   │   │   │   │   │   │   │   ├── [round-of-04-sf.yaml](./src/components/routes/apps/bored/Ship/posts/next/football-2028-euro/round-of-04-sf.yaml)
│   │   │   │   │   │   │   │   │   ├── [round-of-08-qf.yaml](./src/components/routes/apps/bored/Ship/posts/next/football-2028-euro/round-of-08-qf.yaml)
│   │   │   │   │   │   │   │   │   └── [round-of-16.yaml](./src/components/routes/apps/bored/Ship/posts/next/football-2028-euro/round-of-16.yaml)
│   │   │   │   │   │   │   │   ├── fun-facts/
│   │   │   │   │   │   │   │   │   ├── [good-hobby.yaml](./src/components/routes/apps/bored/Ship/posts/next/fun-facts/good-hobby.yaml)
│   │   │   │   │   │   │   │   │   └── [larp.yaml](./src/components/routes/apps/bored/Ship/posts/next/fun-facts/larp.yaml)
│   │   │   │   │   │   │   │   ├── java-solid/
│   │   │   │   │   │   │   │   │   ├── [part-0-agenda.yaml](./src/components/routes/apps/bored/Ship/posts/next/java-solid/part-0-agenda.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-1-single-responsibility-principle.yaml](./src/components/routes/apps/bored/Ship/posts/next/java-solid/part-1-single-responsibility-principle.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-2-open-closed-principle.yaml](./src/components/routes/apps/bored/Ship/posts/next/java-solid/part-2-open-closed-principle.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-3-liskovs-substitution-principle.yaml](./src/components/routes/apps/bored/Ship/posts/next/java-solid/part-3-liskovs-substitution-principle.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-4-interface-segregation-principle.yaml](./src/components/routes/apps/bored/Ship/posts/next/java-solid/part-4-interface-segregation-principle.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-5-dependency-inversion-principle.yaml](./src/components/routes/apps/bored/Ship/posts/next/java-solid/part-5-dependency-inversion-principle.yaml)
│   │   │   │   │   │   │   │   │   └── [part-6-closing.yaml](./src/components/routes/apps/bored/Ship/posts/next/java-solid/part-6-closing.yaml)
│   │   │   │   │   │   │   │   ├── js-engines/
│   │   │   │   │   │   │   │   │   ├── [part-0-agenda.yaml](./src/components/routes/apps/bored/Ship/posts/next/js-engines/part-0-agenda.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-1-v8.yaml](./src/components/routes/apps/bored/Ship/posts/next/js-engines/part-1-v8.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-2-quickjs.yaml](./src/components/routes/apps/bored/Ship/posts/next/js-engines/part-2-quickjs.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-3-javascriptcore.yaml](./src/components/routes/apps/bored/Ship/posts/next/js-engines/part-3-javascriptcore.yaml)
│   │   │   │   │   │   │   │   │   └── [part-6-closing.yaml](./src/components/routes/apps/bored/Ship/posts/next/js-engines/part-6-closing.yaml)
│   │   │   │   │   │   │   │   ├── js-packages-managers/
│   │   │   │   │   │   │   │   │   ├── [part-0-agenda.yaml](./src/components/routes/apps/bored/Ship/posts/next/js-packages-managers/part-0-agenda.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-1-npm.yaml](./src/components/routes/apps/bored/Ship/posts/next/js-packages-managers/part-1-npm.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-2-yarn.yaml](./src/components/routes/apps/bored/Ship/posts/next/js-packages-managers/part-2-yarn.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-3-pnpm.yaml](./src/components/routes/apps/bored/Ship/posts/next/js-packages-managers/part-3-pnpm.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-4-bun.yaml](./src/components/routes/apps/bored/Ship/posts/next/js-packages-managers/part-4-bun.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-5-deno.yaml](./src/components/routes/apps/bored/Ship/posts/next/js-packages-managers/part-5-deno.yaml)
│   │   │   │   │   │   │   │   │   └── [part-6-closing.yaml](./src/components/routes/apps/bored/Ship/posts/next/js-packages-managers/part-6-closing.yaml)
│   │   │   │   │   │   │   │   ├── js-runtimes/
│   │   │   │   │   │   │   │   │   ├── [part-0-agenda.yaml](./src/components/routes/apps/bored/Ship/posts/next/js-runtimes/part-0-agenda.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-1-node.yaml](./src/components/routes/apps/bored/Ship/posts/next/js-runtimes/part-1-node.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-2-deno.yaml](./src/components/routes/apps/bored/Ship/posts/next/js-runtimes/part-2-deno.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-3-bun.yaml](./src/components/routes/apps/bored/Ship/posts/next/js-runtimes/part-3-bun.yaml)
│   │   │   │   │   │   │   │   │   └── [part-6-closing.yaml](./src/components/routes/apps/bored/Ship/posts/next/js-runtimes/part-6-closing.yaml)
│   │   │   │   │   │   │   │   ├── machine-learning-libraries/
│   │   │   │   │   │   │   │   │   ├── [part-0-agenda.yaml](./src/components/routes/apps/bored/Ship/posts/next/machine-learning-libraries/part-0-agenda.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-1-tensorflow.yaml](./src/components/routes/apps/bored/Ship/posts/next/machine-learning-libraries/part-1-tensorflow.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-2-pytorch.yaml](./src/components/routes/apps/bored/Ship/posts/next/machine-learning-libraries/part-2-pytorch.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-3-scikit-learn.yaml](./src/components/routes/apps/bored/Ship/posts/next/machine-learning-libraries/part-3-scikit-learn.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-4-onnx-runtime.yaml](./src/components/routes/apps/bored/Ship/posts/next/machine-learning-libraries/part-4-onnx-runtime.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-5-jax.yaml](./src/components/routes/apps/bored/Ship/posts/next/machine-learning-libraries/part-5-jax.yaml)
│   │   │   │   │   │   │   │   │   └── [part-6-closing.yaml](./src/components/routes/apps/bored/Ship/posts/next/machine-learning-libraries/part-6-closing.yaml)
│   │   │   │   │   │   │   │   ├── machine-learning-supervised-regression/
│   │   │   │   │   │   │   │   │   ├── [part-0-agenda.yaml](./src/components/routes/apps/bored/Ship/posts/next/machine-learning-supervised-regression/part-0-agenda.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-1-linear-regression.yaml](./src/components/routes/apps/bored/Ship/posts/next/machine-learning-supervised-regression/part-1-linear-regression.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-2-polynomial-regression.yaml](./src/components/routes/apps/bored/Ship/posts/next/machine-learning-supervised-regression/part-2-polynomial-regression.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-3-decision-tree-regression.yaml](./src/components/routes/apps/bored/Ship/posts/next/machine-learning-supervised-regression/part-3-decision-tree-regression.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-4-random-forest-regression.yaml](./src/components/routes/apps/bored/Ship/posts/next/machine-learning-supervised-regression/part-4-random-forest-regression.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-5-gradient-boosting-regression.yaml](./src/components/routes/apps/bored/Ship/posts/next/machine-learning-supervised-regression/part-5-gradient-boosting-regression.yaml)
│   │   │   │   │   │   │   │   │   └── [part-6-closing.yaml](./src/components/routes/apps/bored/Ship/posts/next/machine-learning-supervised-regression/part-6-closing.yaml)
│   │   │   │   │   │   │   │   ├── machine-learning-types/
│   │   │   │   │   │   │   │   │   ├── [part-0-agenda.yaml](./src/components/routes/apps/bored/Ship/posts/next/machine-learning-types/part-0-agenda.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-1-supervised-machine-learning.yaml](./src/components/routes/apps/bored/Ship/posts/next/machine-learning-types/part-1-supervised-machine-learning.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-2-unsupervised-machine-learning.yaml](./src/components/routes/apps/bored/Ship/posts/next/machine-learning-types/part-2-unsupervised-machine-learning.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-3-semini-supervised-machine-learning.yaml](./src/components/routes/apps/bored/Ship/posts/next/machine-learning-types/part-3-semini-supervised-machine-learning.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-4-reinforcement-learning.yaml](./src/components/routes/apps/bored/Ship/posts/next/machine-learning-types/part-4-reinforcement-learning.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-5-self-supervised.yaml](./src/components/routes/apps/bored/Ship/posts/next/machine-learning-types/part-5-self-supervised.yaml)
│   │   │   │   │   │   │   │   │   └── [part-6-closing.yaml](./src/components/routes/apps/bored/Ship/posts/next/machine-learning-types/part-6-closing.yaml)
│   │   │   │   │   │   │   │   ├── my/
│   │   │   │   │   │   │   │   │   ├── [my-data-science-kit.yaml](./src/components/routes/apps/bored/Ship/posts/next/my/my-data-science-kit.yaml)
│   │   │   │   │   │   │   │   │   ├── [my-dev-tools.yaml](./src/components/routes/apps/bored/Ship/posts/next/my/my-dev-tools.yaml)
│   │   │   │   │   │   │   │   │   ├── [my-languages.yaml](./src/components/routes/apps/bored/Ship/posts/next/my/my-languages.yaml)
│   │   │   │   │   │   │   │   │   └── [my-profile.yaml](./src/components/routes/apps/bored/Ship/posts/next/my/my-profile.yaml)
│   │   │   │   │   │   │   │   ├── operating-systems-linux/
│   │   │   │   │   │   │   │   │   ├── [part-0-agenda.yaml](./src/components/routes/apps/bored/Ship/posts/next/operating-systems-linux/part-0-agenda.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-1-ubuntu.yaml](./src/components/routes/apps/bored/Ship/posts/next/operating-systems-linux/part-1-ubuntu.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-2-mint.yaml](./src/components/routes/apps/bored/Ship/posts/next/operating-systems-linux/part-2-mint.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-3-arch.yaml](./src/components/routes/apps/bored/Ship/posts/next/operating-systems-linux/part-3-arch.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-4-debian.yaml](./src/components/routes/apps/bored/Ship/posts/next/operating-systems-linux/part-4-debian.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-5-fedora.yaml](./src/components/routes/apps/bored/Ship/posts/next/operating-systems-linux/part-5-fedora.yaml)
│   │   │   │   │   │   │   │   │   └── [part-6-closing.yaml](./src/components/routes/apps/bored/Ship/posts/next/operating-systems-linux/part-6-closing.yaml)
│   │   │   │   │   │   │   │   ├── software-back-end-database-orm/
│   │   │   │   │   │   │   │   │   ├── [part-0-agenda.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-orm/part-0-agenda.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-1-prisma.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-orm/part-1-prisma.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-2-drizzle.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-orm/part-2-drizzle.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-3-typeorm.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-orm/part-3-typeorm.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-4-prisma-vs-drizzle.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-orm/part-4-prisma-vs-drizzle.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-5-prisma-vs-typeorm.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-orm/part-5-prisma-vs-typeorm.yaml)
│   │   │   │   │   │   │   │   │   └── [part-6-closing.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-orm/part-6-closing.yaml)
│   │   │   │   │   │   │   │   ├── software-back-end-database-paradigm-document/
│   │   │   │   │   │   │   │   │   ├── [part-0-agenda.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-paradigm-document/part-0-agenda.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-1-mongodb.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-paradigm-document/part-1-mongodb.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-2-couchbase.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-paradigm-document/part-2-couchbase.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-3-couchdb.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-paradigm-document/part-3-couchdb.yaml)
│   │   │   │   │   │   │   │   │   └── [part-4-closing.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-paradigm-document/part-4-closing.yaml)
│   │   │   │   │   │   │   │   ├── software-back-end-database-paradigm-key-value/
│   │   │   │   │   │   │   │   │   ├── [part-0-agenda.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-paradigm-key-value/part-0-agenda.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-1-redis.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-paradigm-key-value/part-1-redis.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-2-valkey.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-paradigm-key-value/part-2-valkey.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-3-memcached.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-paradigm-key-value/part-3-memcached.yaml)
│   │   │   │   │   │   │   │   │   └── [part-4-closing.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-paradigm-key-value/part-4-closing.yaml)
│   │   │   │   │   │   │   │   ├── software-back-end-database-paradigm-relational/
│   │   │   │   │   │   │   │   │   ├── [part-0-agenda.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-paradigm-relational/part-0-agenda.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-1-postgresql.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-paradigm-relational/part-1-postgresql.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-2-mysql.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-paradigm-relational/part-2-mysql.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-3-mariadb.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-paradigm-relational/part-3-mariadb.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-4-sqlite.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-paradigm-relational/part-4-sqlite.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-5-cockroachdb.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-paradigm-relational/part-5-cockroachdb.yaml)
│   │   │   │   │   │   │   │   │   └── [part-6-closing.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-paradigm-relational/part-6-closing.yaml)
│   │   │   │   │   │   │   │   ├── software-back-end-database-paradigm-search-engine/
│   │   │   │   │   │   │   │   │   ├── [part-0-agenda.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-paradigm-search-engine/part-0-agenda.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-1-elasticsearch.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-paradigm-search-engine/part-1-elasticsearch.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-2-opensearch.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-paradigm-search-engine/part-2-opensearch.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-3-solr.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-paradigm-search-engine/part-3-solr.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-4-meilisearch.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-paradigm-search-engine/part-4-meilisearch.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-5-typesense.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-paradigm-search-engine/part-5-typesense.yaml)
│   │   │   │   │   │   │   │   │   └── [part-6-closing.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-paradigm-search-engine/part-6-closing.yaml)
│   │   │   │   │   │   │   │   ├── software-back-end-database-paradigm-wide-column/
│   │   │   │   │   │   │   │   │   ├── [part-0-agenda.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-paradigm-wide-column/part-0-agenda.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-1-cassandra.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-paradigm-wide-column/part-1-cassandra.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-2-hbase.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-paradigm-wide-column/part-2-hbase.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-3-accumulo.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-paradigm-wide-column/part-3-accumulo.yaml)
│   │   │   │   │   │   │   │   │   └── [part-4-closing.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-paradigm-wide-column/part-4-closing.yaml)
│   │   │   │   │   │   │   │   ├── software-back-end-database-paradigms/
│   │   │   │   │   │   │   │   │   ├── [part-0-agenda.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-paradigms/part-0-agenda.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-1-key-value.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-paradigms/part-1-key-value.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-2-wide-columns.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-paradigms/part-2-wide-columns.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-3-document.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-paradigms/part-3-document.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-4-relational.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-paradigms/part-4-relational.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-5-graph.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-paradigms/part-5-graph.yaml)
│   │   │   │   │   │   │   │   │   └── [part-6-search-engine.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-database-paradigms/part-6-search-engine.yaml)
│   │   │   │   │   │   │   │   ├── software-back-end-for-front-end-frameworks/
│   │   │   │   │   │   │   │   │   ├── [part-0-agenda.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-for-front-end-frameworks/part-0-agenda.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-1-graphql.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-for-front-end-frameworks/part-1-graphql.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-2-trpc.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-for-front-end-frameworks/part-2-trpc.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-3-express.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-for-front-end-frameworks/part-3-express.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-4-nest.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-for-front-end-frameworks/part-4-nest.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-5-hono.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-for-front-end-frameworks/part-5-hono.yaml)
│   │   │   │   │   │   │   │   │   └── [part-6-closing.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-for-front-end-frameworks/part-6-closing.yaml)
│   │   │   │   │   │   │   │   ├── software-back-end-messages-brokers/
│   │   │   │   │   │   │   │   │   ├── [part-0-agenda.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-messages-brokers/part-0-agenda.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-1-kafka.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-messages-brokers/part-1-kafka.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-2-rabbit-mq.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-messages-brokers/part-2-rabbit-mq.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-3-rabbit-mq.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-messages-brokers/part-3-rabbit-mq.yaml)
│   │   │   │   │   │   │   │   │   └── [part-4-closing.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-back-end-messages-brokers/part-4-closing.yaml)
│   │   │   │   │   │   │   │   ├── software-front-end-hybrid-desktop-frameworks/
│   │   │   │   │   │   │   │   │   ├── [part-0-agenda.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-hybrid-desktop-frameworks/part-0-agenda.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-1-electron.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-hybrid-desktop-frameworks/part-1-electron.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-2-wails.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-hybrid-desktop-frameworks/part-2-wails.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-3-tauri.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-hybrid-desktop-frameworks/part-3-tauri.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-4-deno-desktop.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-hybrid-desktop-frameworks/part-4-deno-desktop.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-5.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-hybrid-desktop-frameworks/part-5.yaml)
│   │   │   │   │   │   │   │   │   └── [part-6-closing.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-hybrid-desktop-frameworks/part-6-closing.yaml)
│   │   │   │   │   │   │   │   ├── software-front-end-hybrid-mobile-frameworks/
│   │   │   │   │   │   │   │   │   ├── [part-0-agenda.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-hybrid-mobile-frameworks/part-0-agenda.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-1-react-native.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-hybrid-mobile-frameworks/part-1-react-native.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-2-expo.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-hybrid-mobile-frameworks/part-2-expo.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-3-ionic.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-hybrid-mobile-frameworks/part-3-ionic.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-4-capacitor.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-hybrid-mobile-frameworks/part-4-capacitor.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-5-lynx.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-hybrid-mobile-frameworks/part-5-lynx.yaml)
│   │   │   │   │   │   │   │   │   └── [part-6-closing.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-hybrid-mobile-frameworks/part-6-closing.yaml)
│   │   │   │   │   │   │   │   ├── software-front-end-web-client-framework-react-advanced/
│   │   │   │   │   │   │   │   │   ├── [part-0-agenda.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-web-client-framework-react-advanced/part-0-agenda.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-1-context.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-web-client-framework-react-advanced/part-1-context.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-2-performance.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-web-client-framework-react-advanced/part-2-performance.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-3-client-vs-server.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-web-client-framework-react-advanced/part-3-client-vs-server.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-4.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-web-client-framework-react-advanced/part-4.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-5.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-web-client-framework-react-advanced/part-5.yaml)
│   │   │   │   │   │   │   │   │   └── [part-6.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-web-client-framework-react-advanced/part-6.yaml)
│   │   │   │   │   │   │   │   ├── software-front-end-web-client-framework-react-basics/
│   │   │   │   │   │   │   │   │   ├── [part-0-agenda.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-web-client-framework-react-basics/part-0-agenda.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-1-component.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-web-client-framework-react-basics/part-1-component.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-2-props-vs-state.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-web-client-framework-react-basics/part-2-props-vs-state.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-3-hooks.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-web-client-framework-react-basics/part-3-hooks.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-4-virtual-dom.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-web-client-framework-react-basics/part-4-virtual-dom.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-5.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-web-client-framework-react-basics/part-5.yaml)
│   │   │   │   │   │   │   │   │   └── [part-6-closing.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-web-client-framework-react-basics/part-6-closing.yaml)
│   │   │   │   │   │   │   │   ├── software-front-end-web-client-frameworks/
│   │   │   │   │   │   │   │   │   ├── [part-0-agenda.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-web-client-frameworks/part-0-agenda.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-1-react.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-web-client-frameworks/part-1-react.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-2-angular.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-web-client-frameworks/part-2-angular.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-3-vue.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-web-client-frameworks/part-3-vue.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-4-svelte.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-web-client-frameworks/part-4-svelte.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-5-solid.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-web-client-frameworks/part-5-solid.yaml)
│   │   │   │   │   │   │   │   │   └── [part-6-closing.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-web-client-frameworks/part-6-closing.yaml)
│   │   │   │   │   │   │   │   ├── software-front-end-web-meta-frameworks/
│   │   │   │   │   │   │   │   │   ├── [part-0-agenda.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-web-meta-frameworks/part-0-agenda.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-1-next.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-web-meta-frameworks/part-1-next.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-2-angular-ssr.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-web-meta-frameworks/part-2-angular-ssr.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-3-nuxt.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-web-meta-frameworks/part-3-nuxt.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-4-svelte-kit.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-web-meta-frameworks/part-4-svelte-kit.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-5-solid-start.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-web-meta-frameworks/part-5-solid-start.yaml)
│   │   │   │   │   │   │   │   │   └── [part-6-closing.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-web-meta-frameworks/part-6-closing.yaml)
│   │   │   │   │   │   │   │   ├── software-front-end-web-static-frameworks/
│   │   │   │   │   │   │   │   │   ├── [part-0-agenda.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-web-static-frameworks/part-0-agenda.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-1-astro.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-web-static-frameworks/part-1-astro.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-2-docusaurus.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-web-static-frameworks/part-2-docusaurus.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-3-gatsby.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-web-static-frameworks/part-3-gatsby.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-4-starlight.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-web-static-frameworks/part-4-starlight.yaml)
│   │   │   │   │   │   │   │   │   ├── [part-5-gitbook.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-web-static-frameworks/part-5-gitbook.yaml)
│   │   │   │   │   │   │   │   │   └── [part-6-closing.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-front-end-web-static-frameworks/part-6-closing.yaml)
│   │   │   │   │   │   │   │   ├── software-interviews/
│   │   │   │   │   │   │   │   │   ├── [ai-markdown.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-interviews/ai-markdown.yaml)
│   │   │   │   │   │   │   │   │   ├── [api-idempotency.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-interviews/api-idempotency.yaml)
│   │   │   │   │   │   │   │   │   └── [hydration.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-interviews/hydration.yaml)
│   │   │   │   │   │   │   │   └── software-news/
│   │   │   │   │   │   │   │       ├── [bun-zig-to-rust.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-news/bun-zig-to-rust.yaml)
│   │   │   │   │   │   │   │       ├── [claude-google-leak.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-news/claude-google-leak.yaml)
│   │   │   │   │   │   │   │       ├── [kimi-k3.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-news/kimi-k3.yaml)
│   │   │   │   │   │   │   │       ├── [openai-hugging-face-hacking.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-news/openai-hugging-face-hacking.yaml)
│   │   │   │   │   │   │   │       └── [typescript-7.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-news/typescript-7.yaml)
│   │   │   │   │   │   │   ├── [README.md](./src/components/routes/apps/bored/Ship/posts/README.md)
│   │   │   │   │   │   │   └── [TREE.md](./src/components/routes/apps/bored/Ship/posts/TREE.md)
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/bored/Ship/AGENTS.md)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/bored/Ship/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/apps/bored/Ship/types.ts)
│   │   │   │   │   ├── VibeSlotCode/
│   │   │   │   │   │   ├── components/
│   │   │   │   │   │   │   ├── [Header.tsx](./src/components/routes/apps/bored/VibeSlotCode/components/Header.tsx)
│   │   │   │   │   │   │   ├── [ReelBox.tsx](./src/components/routes/apps/bored/VibeSlotCode/components/ReelBox.tsx)
│   │   │   │   │   │   │   ├── [ReelGrid.tsx](./src/components/routes/apps/bored/VibeSlotCode/components/ReelGrid.tsx)
│   │   │   │   │   │   │   └── [SpinButton.tsx](./src/components/routes/apps/bored/VibeSlotCode/components/SpinButton.tsx)
│   │   │   │   │   │   ├── data/
│   │   │   │   │   │   │   ├── scripts/
│   │   │   │   │   │   │   │   ├── [convert-csv-to-json.ts](./src/components/routes/apps/bored/VibeSlotCode/data/scripts/convert-csv-to-json.ts)
│   │   │   │   │   │   │   │   └── [convert-projects-to-json.ts](./src/components/routes/apps/bored/VibeSlotCode/data/scripts/convert-projects-to-json.ts)
│   │   │   │   │   │   │   ├── [constants.ts](./src/components/routes/apps/bored/VibeSlotCode/data/constants.ts)
│   │   │   │   │   │   │   ├── [projects.csv](./src/components/routes/apps/bored/VibeSlotCode/data/projects.csv)
│   │   │   │   │   │   │   ├── [projects.json](./src/components/routes/apps/bored/VibeSlotCode/data/projects.json)
│   │   │   │   │   │   │   ├── [stacks.csv](./src/components/routes/apps/bored/VibeSlotCode/data/stacks.csv)
│   │   │   │   │   │   │   └── [stacks.json](./src/components/routes/apps/bored/VibeSlotCode/data/stacks.json)
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/bored/VibeSlotCode/AGENTS.md)
│   │   │   │   │   │   └── [index.tsx](./src/components/routes/apps/bored/VibeSlotCode/index.tsx)
│   │   │   │   │   ├── _shared/
│   │   │   │   │   │   ├── components/
│   │   │   │   │   │   │   ├── [HowToModal.tsx](./src/components/routes/apps/bored/_shared/components/HowToModal.tsx)
│   │   │   │   │   │   │   ├── [ItemSelect.tsx](./src/components/routes/apps/bored/_shared/components/ItemSelect.tsx)
│   │   │   │   │   │   │   └── [Reel.tsx](./src/components/routes/apps/bored/_shared/components/Reel.tsx)
│   │   │   │   │   │   ├── hooks/
│   │   │   │   │   │   │   └── [useTopicPicker.ts](./src/components/routes/apps/bored/_shared/hooks/useTopicPicker.ts)
│   │   │   │   │   │   ├── scripts/
│   │   │   │   │   │   │   ├── [convert-csv-to-json.ts](./src/components/routes/apps/bored/_shared/scripts/convert-csv-to-json.ts)
│   │   │   │   │   │   │   ├── [generate-build-data.ts](./src/components/routes/apps/bored/_shared/scripts/generate-build-data.ts)
│   │   │   │   │   │   │   ├── [get-categories.ts](./src/components/routes/apps/bored/_shared/scripts/get-categories.ts)
│   │   │   │   │   │   │   ├── [get-niches.ts](./src/components/routes/apps/bored/_shared/scripts/get-niches.ts)
│   │   │   │   │   │   │   └── [get-topics.ts](./src/components/routes/apps/bored/_shared/scripts/get-topics.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/bored/_shared/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/apps/bored/_shared/types.ts)
│   │   │   │   │   └── [AGENTS.md](./src/components/routes/apps/bored/AGENTS.md)
│   │   │   │   ├── calculator/
│   │   │   │   │   ├── Calculator/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [Calculator.test.tsx](./src/components/routes/apps/calculator/Calculator/__tests__/Calculator.test.tsx)
│   │   │   │   │   │   ├── [convert.ts](./src/components/routes/apps/calculator/Calculator/convert.ts)
│   │   │   │   │   │   └── [index.tsx](./src/components/routes/apps/calculator/Calculator/index.tsx)
│   │   │   │   │   ├── Inflation/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [Inflation.test.tsx](./src/components/routes/apps/calculator/Inflation/__tests__/Inflation.test.tsx)
│   │   │   │   │   │   │   ├── [calculate.test.ts](./src/components/routes/apps/calculator/Inflation/__tests__/calculate.test.ts)
│   │   │   │   │   │   │   └── [constants.test.ts](./src/components/routes/apps/calculator/Inflation/__tests__/constants.test.ts)
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   │   │   └── [calculate.ts](./src/components/routes/apps/calculator/Inflation/utils/calculate.ts)
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/apps/calculator/Inflation/constants.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/calculator/Inflation/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/apps/calculator/Inflation/types.ts)
│   │   │   │   │   ├── SplitBill/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [SplitBill.test.tsx](./src/components/routes/apps/calculator/SplitBill/__tests__/SplitBill.test.tsx)
│   │   │   │   │   │   │   └── [calculate.test.ts](./src/components/routes/apps/calculator/SplitBill/__tests__/calculate.test.ts)
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   │   │   └── [calculate.ts](./src/components/routes/apps/calculator/SplitBill/utils/calculate.ts)
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/apps/calculator/SplitBill/constants.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/calculator/SplitBill/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/apps/calculator/SplitBill/types.ts)
│   │   │   │   │   └── Tax/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [Tax.test.tsx](./src/components/routes/apps/calculator/Tax/__tests__/Tax.test.tsx)
│   │   │   │   │       ├── utils/
│   │   │   │   │       │   └── [tax.ts](./src/components/routes/apps/calculator/Tax/utils/tax.ts)
│   │   │   │   │       ├── [constants.ts](./src/components/routes/apps/calculator/Tax/constants.ts)
│   │   │   │   │       ├── [index.tsx](./src/components/routes/apps/calculator/Tax/index.tsx)
│   │   │   │   │       └── [types.ts](./src/components/routes/apps/calculator/Tax/types.ts)
│   │   │   │   ├── clocks/
│   │   │   │   │   ├── Countdown/
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/clocks/Countdown/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/clocks/Countdown/utils.ts)
│   │   │   │   │   ├── Cron/
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [format.test.ts](./src/components/routes/apps/clocks/Cron/utils/__tests__/format.test.ts)
│   │   │   │   │   │   │   ├── [format.ts](./src/components/routes/apps/clocks/Cron/utils/format.ts)
│   │   │   │   │   │   │   └── [parser.ts](./src/components/routes/apps/clocks/Cron/utils/parser.ts)
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/apps/clocks/Cron/constants.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/clocks/Cron/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/apps/clocks/Cron/types.ts)
│   │   │   │   │   ├── DaysCount/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [DaysCount.test.tsx](./src/components/routes/apps/clocks/DaysCount/__tests__/DaysCount.test.tsx)
│   │   │   │   │   │   │   └── [utils.test.ts](./src/components/routes/apps/clocks/DaysCount/__tests__/utils.test.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/clocks/DaysCount/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/clocks/DaysCount/utils.ts)
│   │   │   │   │   ├── EpochConvert/
│   │   │   │   │   │   └── [index.tsx](./src/components/routes/apps/clocks/EpochConvert/index.tsx)
│   │   │   │   │   ├── Pomodoro/
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/clocks/Pomodoro/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/clocks/Pomodoro/utils.ts)
│   │   │   │   │   ├── Watchface/
│   │   │   │   │   │   └── [index.tsx](./src/components/routes/apps/clocks/Watchface/index.tsx)
│   │   │   │   │   └── __tests__/
│   │   │   │   │       ├── [Countdown.test.tsx](./src/components/routes/apps/clocks/__tests__/Countdown.test.tsx)
│   │   │   │   │       ├── [Cron.test.tsx](./src/components/routes/apps/clocks/__tests__/Cron.test.tsx)
│   │   │   │   │       ├── [Pomodoro.test.tsx](./src/components/routes/apps/clocks/__tests__/Pomodoro.test.tsx)
│   │   │   │   │       └── [Watchface.test.tsx](./src/components/routes/apps/clocks/__tests__/Watchface.test.tsx)
│   │   │   │   ├── data-csv/
│   │   │   │   │   ├── CsvToExcel/
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/data-csv/CsvToExcel/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/data-csv/CsvToExcel/utils.ts)
│   │   │   │   │   ├── CsvToJson/
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/data-csv/CsvToJson/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/data-csv/CsvToJson/utils.ts)
│   │   │   │   │   ├── CsvToXml/
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/data-csv/CsvToXml/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/data-csv/CsvToXml/utils.ts)
│   │   │   │   │   ├── SplitCsv/
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/data-csv/SplitCsv/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/data-csv/SplitCsv/utils.ts)
│   │   │   │   │   └── __tests__/
│   │   │   │   │       ├── [CsvToExcel.test.tsx](./src/components/routes/apps/data-csv/__tests__/CsvToExcel.test.tsx)
│   │   │   │   │       ├── [CsvToJson.test.tsx](./src/components/routes/apps/data-csv/__tests__/CsvToJson.test.tsx)
│   │   │   │   │       ├── [CsvToXml.test.tsx](./src/components/routes/apps/data-csv/__tests__/CsvToXml.test.tsx)
│   │   │   │   │       ├── [SplitCsv.test.tsx](./src/components/routes/apps/data-csv/__tests__/SplitCsv.test.tsx)
│   │   │   │   │       └── [utils.test.ts](./src/components/routes/apps/data-csv/__tests__/utils.test.ts)
│   │   │   │   ├── data-excel/
│   │   │   │   │   ├── ExcelToCsv/
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/data-excel/ExcelToCsv/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/data-excel/ExcelToCsv/utils.ts)
│   │   │   │   │   ├── ExcelToPdf/
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/data-excel/ExcelToPdf/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/data-excel/ExcelToPdf/utils.ts)
│   │   │   │   │   ├── ExcelToXml/
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/data-excel/ExcelToXml/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/data-excel/ExcelToXml/utils.ts)
│   │   │   │   │   ├── SplitExcel/
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/data-excel/SplitExcel/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/data-excel/SplitExcel/utils.ts)
│   │   │   │   │   └── __tests__/
│   │   │   │   │       ├── [ExcelToCsv.test.tsx](./src/components/routes/apps/data-excel/__tests__/ExcelToCsv.test.tsx)
│   │   │   │   │       ├── [ExcelToPdf.test.tsx](./src/components/routes/apps/data-excel/__tests__/ExcelToPdf.test.tsx)
│   │   │   │   │       ├── [ExcelToXml.test.tsx](./src/components/routes/apps/data-excel/__tests__/ExcelToXml.test.tsx)
│   │   │   │   │       ├── [SplitExcel.test.tsx](./src/components/routes/apps/data-excel/__tests__/SplitExcel.test.tsx)
│   │   │   │   │       └── [utils.test.ts](./src/components/routes/apps/data-excel/__tests__/utils.test.ts)
│   │   │   │   ├── data-json/
│   │   │   │   │   ├── JsonToCsv/
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/data-json/JsonToCsv/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/data-json/JsonToCsv/utils.ts)
│   │   │   │   │   ├── JsonToXml/
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/data-json/JsonToXml/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/data-json/JsonToXml/utils.ts)
│   │   │   │   │   └── __tests__/
│   │   │   │   │       ├── [JsonToCsv.test.tsx](./src/components/routes/apps/data-json/__tests__/JsonToCsv.test.tsx)
│   │   │   │   │       ├── [JsonToXml.test.tsx](./src/components/routes/apps/data-json/__tests__/JsonToXml.test.tsx)
│   │   │   │   │       └── [utils.test.ts](./src/components/routes/apps/data-json/__tests__/utils.test.ts)
│   │   │   │   ├── data-xml/
│   │   │   │   │   ├── XmlToCsv/
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/data-xml/XmlToCsv/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/data-xml/XmlToCsv/utils.ts)
│   │   │   │   │   ├── XmlToExcel/
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/data-xml/XmlToExcel/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/data-xml/XmlToExcel/utils.ts)
│   │   │   │   │   ├── XmlToJson/
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/data-xml/XmlToJson/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/data-xml/XmlToJson/utils.ts)
│   │   │   │   │   └── __tests__/
│   │   │   │   │       ├── [XmlToCsv.test.tsx](./src/components/routes/apps/data-xml/__tests__/XmlToCsv.test.tsx)
│   │   │   │   │       ├── [XmlToExcel.test.tsx](./src/components/routes/apps/data-xml/__tests__/XmlToExcel.test.tsx)
│   │   │   │   │       ├── [XmlToJson.test.tsx](./src/components/routes/apps/data-xml/__tests__/XmlToJson.test.tsx)
│   │   │   │   │       └── [utils.test.ts](./src/components/routes/apps/data-xml/__tests__/utils.test.ts)
│   │   │   │   ├── developer/
│   │   │   │   │   ├── Figlet/
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [render.test.ts](./src/components/routes/apps/developer/Figlet/utils/__tests__/render.test.ts)
│   │   │   │   │   │   │   └── [render.ts](./src/components/routes/apps/developer/Figlet/utils/render.ts)
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/apps/developer/Figlet/constants.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/developer/Figlet/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/apps/developer/Figlet/types.ts)
│   │   │   │   │   ├── IP/
│   │   │   │   │   │   ├── components/
│   │   │   │   │   │   │   └── [Row.tsx](./src/components/routes/apps/developer/IP/components/Row.tsx)
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [lookup.test.ts](./src/components/routes/apps/developer/IP/utils/__tests__/lookup.test.ts)
│   │   │   │   │   │   │   └── [lookup.ts](./src/components/routes/apps/developer/IP/utils/lookup.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/developer/IP/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/apps/developer/IP/types.ts)
│   │   │   │   │   ├── OpenAPI2Postman/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [OpenAPI2Postman.test.tsx](./src/components/routes/apps/developer/OpenAPI2Postman/__tests__/OpenAPI2Postman.test.tsx)
│   │   │   │   │   │   │   ├── [converter.test.ts](./src/components/routes/apps/developer/OpenAPI2Postman/__tests__/converter.test.ts)
│   │   │   │   │   │   │   ├── [lineCount.test.ts](./src/components/routes/apps/developer/OpenAPI2Postman/__tests__/lineCount.test.ts)
│   │   │   │   │   │   │   ├── [schemaHelpers.test.ts](./src/components/routes/apps/developer/OpenAPI2Postman/__tests__/schemaHelpers.test.ts)
│   │   │   │   │   │   │   └── [yamlParser.test.ts](./src/components/routes/apps/developer/OpenAPI2Postman/__tests__/yamlParser.test.ts)
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   │   │   ├── [converter.ts](./src/components/routes/apps/developer/OpenAPI2Postman/utils/converter.ts)
│   │   │   │   │   │   │   ├── [schemaHelpers.ts](./src/components/routes/apps/developer/OpenAPI2Postman/utils/schemaHelpers.ts)
│   │   │   │   │   │   │   └── [yamlParser.ts](./src/components/routes/apps/developer/OpenAPI2Postman/utils/yamlParser.ts)
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/apps/developer/OpenAPI2Postman/constants.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/developer/OpenAPI2Postman/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/apps/developer/OpenAPI2Postman/types.ts)
│   │   │   │   │   ├── Proxy/
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/developer/Proxy/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/developer/Proxy/utils.ts)
│   │   │   │   │   ├── ShopifyDetect/
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   ├── [detect.test.ts](./src/components/routes/apps/developer/ShopifyDetect/utils/__tests__/detect.test.ts)
│   │   │   │   │   │   │   │   └── [storage.test.ts](./src/components/routes/apps/developer/ShopifyDetect/utils/__tests__/storage.test.ts)
│   │   │   │   │   │   │   ├── [detect.ts](./src/components/routes/apps/developer/ShopifyDetect/utils/detect.ts)
│   │   │   │   │   │   │   └── [storage.ts](./src/components/routes/apps/developer/ShopifyDetect/utils/storage.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/developer/ShopifyDetect/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/apps/developer/ShopifyDetect/types.ts)
│   │   │   │   │   ├── TextDiff/
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/developer/TextDiff/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/developer/TextDiff/utils.ts)
│   │   │   │   │   ├── TextUrlTracer/
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/developer/TextUrlTracer/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/developer/TextUrlTracer/utils.ts)
│   │   │   │   │   ├── UUID/
│   │   │   │   │   │   └── [index.tsx](./src/components/routes/apps/developer/UUID/index.tsx)
│   │   │   │   │   └── __tests__/
│   │   │   │   │       ├── __snapshots__/
│   │   │   │   │       │   ├── [Figlet.test.tsx.snap](./src/components/routes/apps/developer/__tests__/__snapshots__/Figlet.test.tsx.snap)
│   │   │   │   │       │   ├── [IP.test.tsx.snap](./src/components/routes/apps/developer/__tests__/__snapshots__/IP.test.tsx.snap)
│   │   │   │   │       │   ├── [OpenAPI2Postman.test.tsx.snap](./src/components/routes/apps/developer/__tests__/__snapshots__/OpenAPI2Postman.test.tsx.snap)
│   │   │   │   │       │   ├── [Proxy.test.tsx.snap](./src/components/routes/apps/developer/__tests__/__snapshots__/Proxy.test.tsx.snap)
│   │   │   │   │       │   └── [UUID.test.tsx.snap](./src/components/routes/apps/developer/__tests__/__snapshots__/UUID.test.tsx.snap)
│   │   │   │   │       ├── [Figlet.test.tsx](./src/components/routes/apps/developer/__tests__/Figlet.test.tsx)
│   │   │   │   │       ├── [IP.test.tsx](./src/components/routes/apps/developer/__tests__/IP.test.tsx)
│   │   │   │   │       ├── [OpenAPI2Postman.test.tsx](./src/components/routes/apps/developer/__tests__/OpenAPI2Postman.test.tsx)
│   │   │   │   │       ├── [Proxy.test.tsx](./src/components/routes/apps/developer/__tests__/Proxy.test.tsx)
│   │   │   │   │       ├── [ShopifyDetect.test.tsx](./src/components/routes/apps/developer/__tests__/ShopifyDetect.test.tsx)
│   │   │   │   │       └── [UUID.test.tsx](./src/components/routes/apps/developer/__tests__/UUID.test.tsx)
│   │   │   │   ├── editors/
│   │   │   │   │   ├── JSONSchema/
│   │   │   │   │   │   ├── hooks/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [useCodeMirror.test.ts](./src/components/routes/apps/editors/JSONSchema/hooks/__tests__/useCodeMirror.test.ts)
│   │   │   │   │   │   │   └── [useCodeMirror.ts](./src/components/routes/apps/editors/JSONSchema/hooks/useCodeMirror.ts)
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/apps/editors/JSONSchema/constants.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/editors/JSONSchema/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/apps/editors/JSONSchema/types.ts)
│   │   │   │   │   ├── Manifest/
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/editors/Manifest/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/editors/Manifest/utils.ts)
│   │   │   │   │   ├── Regex/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [Regex.test.tsx](./src/components/routes/apps/editors/Regex/__tests__/Regex.test.tsx)
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [regex.test.ts](./src/components/routes/apps/editors/Regex/utils/__tests__/regex.test.ts)
│   │   │   │   │   │   │   └── [regex.ts](./src/components/routes/apps/editors/Regex/utils/regex.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/editors/Regex/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/apps/editors/Regex/types.ts)
│   │   │   │   │   ├── Resume/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [Resume.test.tsx](./src/components/routes/apps/editors/Resume/__tests__/Resume.test.tsx)
│   │   │   │   │   │   │   └── [useCodeMirror.test.ts](./src/components/routes/apps/editors/Resume/__tests__/useCodeMirror.test.ts)
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/apps/editors/Resume/constants.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/editors/Resume/index.tsx)
│   │   │   │   │   │   └── [useCodeMirror.ts](./src/components/routes/apps/editors/Resume/useCodeMirror.ts)
│   │   │   │   │   ├── Slides/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [Slides.test.tsx](./src/components/routes/apps/editors/Slides/__tests__/Slides.test.tsx)
│   │   │   │   │   │   ├── components/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   ├── [CenterBlock.test.tsx](./src/components/routes/apps/editors/Slides/components/__tests__/CenterBlock.test.tsx)
│   │   │   │   │   │   │   │   ├── [LandingPage.test.tsx](./src/components/routes/apps/editors/Slides/components/__tests__/LandingPage.test.tsx)
│   │   │   │   │   │   │   │   ├── [SlidePreview.test.tsx](./src/components/routes/apps/editors/Slides/components/__tests__/SlidePreview.test.tsx)
│   │   │   │   │   │   │   │   └── [YamlEditor.test.tsx](./src/components/routes/apps/editors/Slides/components/__tests__/YamlEditor.test.tsx)
│   │   │   │   │   │   │   ├── [CenterBlock.tsx](./src/components/routes/apps/editors/Slides/components/CenterBlock.tsx)
│   │   │   │   │   │   │   ├── [LandingPage.tsx](./src/components/routes/apps/editors/Slides/components/LandingPage.tsx)
│   │   │   │   │   │   │   ├── [SlidePreview.tsx](./src/components/routes/apps/editors/Slides/components/SlidePreview.tsx)
│   │   │   │   │   │   │   ├── [TextBlock.tsx](./src/components/routes/apps/editors/Slides/components/TextBlock.tsx)
│   │   │   │   │   │   │   └── [YamlEditor.tsx](./src/components/routes/apps/editors/Slides/components/YamlEditor.tsx)
│   │   │   │   │   │   ├── hooks/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [useToast.test.ts](./src/components/routes/apps/editors/Slides/hooks/__tests__/useToast.test.ts)
│   │   │   │   │   │   │   └── [useToast.tsx](./src/components/routes/apps/editors/Slides/hooks/useToast.tsx)
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   ├── [colors.test.ts](./src/components/routes/apps/editors/Slides/utils/__tests__/colors.test.ts)
│   │   │   │   │   │   │   │   ├── [exportPdf.test.ts](./src/components/routes/apps/editors/Slides/utils/__tests__/exportPdf.test.ts)
│   │   │   │   │   │   │   │   ├── [formatCurrency.test.ts](./src/components/routes/apps/editors/Slides/utils/__tests__/formatCurrency.test.ts)
│   │   │   │   │   │   │   │   └── [yaml.test.ts](./src/components/routes/apps/editors/Slides/utils/__tests__/yaml.test.ts)
│   │   │   │   │   │   │   ├── [colors.ts](./src/components/routes/apps/editors/Slides/utils/colors.ts)
│   │   │   │   │   │   │   ├── [exportPdf.ts](./src/components/routes/apps/editors/Slides/utils/exportPdf.ts)
│   │   │   │   │   │   │   ├── [formatCurrency.ts](./src/components/routes/apps/editors/Slides/utils/formatCurrency.ts)
│   │   │   │   │   │   │   └── [yaml.ts](./src/components/routes/apps/editors/Slides/utils/yaml.ts)
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/apps/editors/Slides/constants.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/editors/Slides/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/apps/editors/Slides/types.ts)
│   │   │   │   │   ├── WordCounter/
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/editors/WordCounter/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/editors/WordCounter/utils.ts)
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   │   ├── [JSONSchema.test.tsx.snap](./src/components/routes/apps/editors/__tests__/__snapshots__/JSONSchema.test.tsx.snap)
│   │   │   │   │   │   │   └── [Manifest.test.tsx.snap](./src/components/routes/apps/editors/__tests__/__snapshots__/Manifest.test.tsx.snap)
│   │   │   │   │   │   ├── [JSONSchema.test.tsx](./src/components/routes/apps/editors/__tests__/JSONSchema.test.tsx)
│   │   │   │   │   │   └── [Manifest.test.tsx](./src/components/routes/apps/editors/__tests__/Manifest.test.tsx)
│   │   │   │   │   └── data/
│   │   │   │   │       └── manifest/
│   │   │   │   │           ├── [extension.ts](./src/components/routes/apps/editors/data/manifest/extension.ts)
│   │   │   │   │           └── [pwa.ts](./src/components/routes/apps/editors/data/manifest/pwa.ts)
│   │   │   │   ├── education/
│   │   │   │   │   ├── DOI/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [DOI.test.tsx](./src/components/routes/apps/education/DOI/__tests__/DOI.test.tsx)
│   │   │   │   │   │   │   └── [ReferenceCard.test.tsx](./src/components/routes/apps/education/DOI/__tests__/ReferenceCard.test.tsx)
│   │   │   │   │   │   ├── [ReferenceCard.tsx](./src/components/routes/apps/education/DOI/ReferenceCard.tsx)
│   │   │   │   │   │   ├── [ReferenceTable.tsx](./src/components/routes/apps/education/DOI/ReferenceTable.tsx)
│   │   │   │   │   │   └── [index.tsx](./src/components/routes/apps/education/DOI/index.tsx)
│   │   │   │   │   ├── English/
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/education/English/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/education/English/utils.ts)
│   │   │   │   │   ├── Flashcards/
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/education/Flashcards/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/education/Flashcards/utils.ts)
│   │   │   │   │   ├── PeriodicTable/
│   │   │   │   │   │   └── [index.tsx](./src/components/routes/apps/education/PeriodicTable/index.tsx)
│   │   │   │   │   ├── Pitch/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [Pitch.test.tsx](./src/components/routes/apps/education/Pitch/__tests__/Pitch.test.tsx)
│   │   │   │   │   │   │   ├── [useAudio.test.ts](./src/components/routes/apps/education/Pitch/__tests__/useAudio.test.ts)
│   │   │   │   │   │   │   ├── [useGame.test.ts](./src/components/routes/apps/education/Pitch/__tests__/useGame.test.ts)
│   │   │   │   │   │   │   └── [useSequence.test.ts](./src/components/routes/apps/education/Pitch/__tests__/useSequence.test.ts)
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/apps/education/Pitch/constants.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/education/Pitch/index.tsx)
│   │   │   │   │   │   ├── [keyClasses.ts](./src/components/routes/apps/education/Pitch/keyClasses.ts)
│   │   │   │   │   │   ├── [useAudio.ts](./src/components/routes/apps/education/Pitch/useAudio.ts)
│   │   │   │   │   │   ├── [useGame.ts](./src/components/routes/apps/education/Pitch/useGame.ts)
│   │   │   │   │   │   ├── [usePitchGame.ts](./src/components/routes/apps/education/Pitch/usePitchGame.ts)
│   │   │   │   │   │   └── [useSequence.ts](./src/components/routes/apps/education/Pitch/useSequence.ts)
│   │   │   │   │   ├── Sign/
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/education/Sign/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/education/Sign/utils.ts)
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   │   ├── [DOI.test.tsx.snap](./src/components/routes/apps/education/__tests__/__snapshots__/DOI.test.tsx.snap)
│   │   │   │   │   │   │   ├── [Flashcards.test.tsx.snap](./src/components/routes/apps/education/__tests__/__snapshots__/Flashcards.test.tsx.snap)
│   │   │   │   │   │   │   ├── [PeriodicTable.test.tsx.snap](./src/components/routes/apps/education/__tests__/__snapshots__/PeriodicTable.test.tsx.snap)
│   │   │   │   │   │   │   └── [Pitch.test.tsx.snap](./src/components/routes/apps/education/__tests__/__snapshots__/Pitch.test.tsx.snap)
│   │   │   │   │   │   ├── [DOI.test.tsx](./src/components/routes/apps/education/__tests__/DOI.test.tsx)
│   │   │   │   │   │   ├── [English.test.tsx](./src/components/routes/apps/education/__tests__/English.test.tsx)
│   │   │   │   │   │   ├── [Flashcards.test.tsx](./src/components/routes/apps/education/__tests__/Flashcards.test.tsx)
│   │   │   │   │   │   ├── [PeriodicTable.test.tsx](./src/components/routes/apps/education/__tests__/PeriodicTable.test.tsx)
│   │   │   │   │   │   ├── [Pitch.test.tsx](./src/components/routes/apps/education/__tests__/Pitch.test.tsx)
│   │   │   │   │   │   └── [Sign.test.tsx](./src/components/routes/apps/education/__tests__/Sign.test.tsx)
│   │   │   │   │   └── data/
│   │   │   │   │       └── [twinkle-twinkle-little-star.ts](./src/components/routes/apps/education/data/twinkle-twinkle-little-star.ts)
│   │   │   │   ├── health-vision/
│   │   │   │   │   ├── LogMARChart/
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [chart.test.ts](./src/components/routes/apps/health-vision/LogMARChart/utils/__tests__/chart.test.ts)
│   │   │   │   │   │   │   └── [chart.ts](./src/components/routes/apps/health-vision/LogMARChart/utils/chart.ts)
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/apps/health-vision/LogMARChart/constants.ts)
│   │   │   │   │   │   └── [index.tsx](./src/components/routes/apps/health-vision/LogMARChart/index.tsx)
│   │   │   │   │   ├── SnellenChart/
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/health-vision/SnellenChart/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/health-vision/SnellenChart/utils.ts)
│   │   │   │   │   ├── TumblingEChart/
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [chart.test.ts](./src/components/routes/apps/health-vision/TumblingEChart/utils/__tests__/chart.test.ts)
│   │   │   │   │   │   │   └── [chart.ts](./src/components/routes/apps/health-vision/TumblingEChart/utils/chart.ts)
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/apps/health-vision/TumblingEChart/constants.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/health-vision/TumblingEChart/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/apps/health-vision/TumblingEChart/types.ts)
│   │   │   │   │   └── __tests__/
│   │   │   │   │       ├── __snapshots__/
│   │   │   │   │       │   └── [SnellenChart.test.tsx.snap](./src/components/routes/apps/health-vision/__tests__/__snapshots__/SnellenChart.test.tsx.snap)
│   │   │   │   │       ├── [LogMARChart.test.tsx](./src/components/routes/apps/health-vision/__tests__/LogMARChart.test.tsx)
│   │   │   │   │       ├── [SnellenChart.test.tsx](./src/components/routes/apps/health-vision/__tests__/SnellenChart.test.tsx)
│   │   │   │   │       └── [TumblingEChart.test.tsx](./src/components/routes/apps/health-vision/__tests__/TumblingEChart.test.tsx)
│   │   │   │   ├── psychology/
│   │   │   │   │   ├── BeckDepressionInventory/
│   │   │   │   │   │   ├── components/
│   │   │   │   │   │   │   ├── [OptionsStep.tsx](./src/components/routes/apps/psychology/BeckDepressionInventory/components/OptionsStep.tsx)
│   │   │   │   │   │   │   └── [ResultsStep.tsx](./src/components/routes/apps/psychology/BeckDepressionInventory/components/ResultsStep.tsx)
│   │   │   │   │   │   ├── docs/
│   │   │   │   │   │   │   └── [beck-depression-inventory.md](./src/components/routes/apps/psychology/BeckDepressionInventory/docs/beck-depression-inventory.md)
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/psychology/BeckDepressionInventory/AGENTS.md)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/psychology/BeckDepressionInventory/index.tsx)
│   │   │   │   │   │   ├── [items.ts](./src/components/routes/apps/psychology/BeckDepressionInventory/items.ts)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/psychology/BeckDepressionInventory/utils.ts)
│   │   │   │   │   ├── BigFiveInventory/
│   │   │   │   │   │   ├── components/
│   │   │   │   │   │   │   ├── [AgreeStep.tsx](./src/components/routes/apps/psychology/BigFiveInventory/components/AgreeStep.tsx)
│   │   │   │   │   │   │   └── [ResultsStep.tsx](./src/components/routes/apps/psychology/BigFiveInventory/components/ResultsStep.tsx)
│   │   │   │   │   │   ├── docs/
│   │   │   │   │   │   │   └── [big-five-inventory.md](./src/components/routes/apps/psychology/BigFiveInventory/docs/big-five-inventory.md)
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/psychology/BigFiveInventory/AGENTS.md)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/psychology/BigFiveInventory/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/psychology/BigFiveInventory/utils.ts)
│   │   │   │   │   ├── DyadicAdjustmentScale/
│   │   │   │   │   │   ├── components/
│   │   │   │   │   │   │   ├── [OptionsStep.tsx](./src/components/routes/apps/psychology/DyadicAdjustmentScale/components/OptionsStep.tsx)
│   │   │   │   │   │   │   └── [ResultsStep.tsx](./src/components/routes/apps/psychology/DyadicAdjustmentScale/components/ResultsStep.tsx)
│   │   │   │   │   │   ├── docs/
│   │   │   │   │   │   │   └── [dyadic-adjustment-scale.md](./src/components/routes/apps/psychology/DyadicAdjustmentScale/docs/dyadic-adjustment-scale.md)
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/psychology/DyadicAdjustmentScale/AGENTS.md)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/psychology/DyadicAdjustmentScale/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/psychology/DyadicAdjustmentScale/utils.ts)
│   │   │   │   │   ├── ExperiencesInCloseRelationships/
│   │   │   │   │   │   ├── components/
│   │   │   │   │   │   │   ├── [ResultsStep.tsx](./src/components/routes/apps/psychology/ExperiencesInCloseRelationships/components/ResultsStep.tsx)
│   │   │   │   │   │   │   └── [ScaleStep.tsx](./src/components/routes/apps/psychology/ExperiencesInCloseRelationships/components/ScaleStep.tsx)
│   │   │   │   │   │   ├── docs/
│   │   │   │   │   │   │   └── [experiences-in-close-relationships.md](./src/components/routes/apps/psychology/ExperiencesInCloseRelationships/docs/experiences-in-close-relationships.md)
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/psychology/ExperiencesInCloseRelationships/AGENTS.md)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/psychology/ExperiencesInCloseRelationships/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/psychology/ExperiencesInCloseRelationships/utils.ts)
│   │   │   │   │   ├── GeneralizedAnxietyDisorderScale/
│   │   │   │   │   │   ├── components/
│   │   │   │   │   │   │   ├── [FrequencyStep.tsx](./src/components/routes/apps/psychology/GeneralizedAnxietyDisorderScale/components/FrequencyStep.tsx)
│   │   │   │   │   │   │   └── [ResultsStep.tsx](./src/components/routes/apps/psychology/GeneralizedAnxietyDisorderScale/components/ResultsStep.tsx)
│   │   │   │   │   │   ├── docs/
│   │   │   │   │   │   │   └── [generalized-anxiety-disorder-scale.md](./src/components/routes/apps/psychology/GeneralizedAnxietyDisorderScale/docs/generalized-anxiety-disorder-scale.md)
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/psychology/GeneralizedAnxietyDisorderScale/AGENTS.md)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/psychology/GeneralizedAnxietyDisorderScale/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/psychology/GeneralizedAnxietyDisorderScale/utils.ts)
│   │   │   │   │   ├── PatientHealthQuestionnaire/
│   │   │   │   │   │   ├── components/
│   │   │   │   │   │   │   ├── [FrequencyStep.tsx](./src/components/routes/apps/psychology/PatientHealthQuestionnaire/components/FrequencyStep.tsx)
│   │   │   │   │   │   │   └── [ResultsStep.tsx](./src/components/routes/apps/psychology/PatientHealthQuestionnaire/components/ResultsStep.tsx)
│   │   │   │   │   │   ├── docs/
│   │   │   │   │   │   │   └── [patient-health-questionnaire.md](./src/components/routes/apps/psychology/PatientHealthQuestionnaire/docs/patient-health-questionnaire.md)
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/psychology/PatientHealthQuestionnaire/AGENTS.md)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/psychology/PatientHealthQuestionnaire/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/psychology/PatientHealthQuestionnaire/utils.ts)
│   │   │   │   │   ├── RelationshipClosenessInventory/
│   │   │   │   │   │   ├── components/
│   │   │   │   │   │   │   ├── [ActivitiesStep.tsx](./src/components/routes/apps/psychology/RelationshipClosenessInventory/components/ActivitiesStep.tsx)
│   │   │   │   │   │   │   ├── [ResultsStep.tsx](./src/components/routes/apps/psychology/RelationshipClosenessInventory/components/ResultsStep.tsx)
│   │   │   │   │   │   │   ├── [ScaleStep.tsx](./src/components/routes/apps/psychology/RelationshipClosenessInventory/components/ScaleStep.tsx)
│   │   │   │   │   │   │   └── [TimeStep.tsx](./src/components/routes/apps/psychology/RelationshipClosenessInventory/components/TimeStep.tsx)
│   │   │   │   │   │   ├── docs/
│   │   │   │   │   │   │   └── [relationship-closeness-inventory-revised.md](./src/components/routes/apps/psychology/RelationshipClosenessInventory/docs/relationship-closeness-inventory-revised.md)
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/psychology/RelationshipClosenessInventory/AGENTS.md)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/psychology/RelationshipClosenessInventory/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/psychology/RelationshipClosenessInventory/utils.ts)
│   │   │   │   │   └── SatisfactionWithLifeScale/
│   │   │   │   │       ├── components/
│   │   │   │   │       │   ├── [ResultsStep.tsx](./src/components/routes/apps/psychology/SatisfactionWithLifeScale/components/ResultsStep.tsx)
│   │   │   │   │       │   └── [ScaleStep.tsx](./src/components/routes/apps/psychology/SatisfactionWithLifeScale/components/ScaleStep.tsx)
│   │   │   │   │       ├── docs/
│   │   │   │   │       │   └── [satisfacition-with-life-scale.md](./src/components/routes/apps/psychology/SatisfactionWithLifeScale/docs/satisfacition-with-life-scale.md)
│   │   │   │   │       ├── [AGENTS.md](./src/components/routes/apps/psychology/SatisfactionWithLifeScale/AGENTS.md)
│   │   │   │   │       ├── [index.tsx](./src/components/routes/apps/psychology/SatisfactionWithLifeScale/index.tsx)
│   │   │   │   │       └── [utils.ts](./src/components/routes/apps/psychology/SatisfactionWithLifeScale/utils.ts)
│   │   │   │   ├── text-convert/
│   │   │   │   │   ├── Braille/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [Braille.test.tsx](./src/components/routes/apps/text-convert/Braille/__tests__/Braille.test.tsx)
│   │   │   │   │   │   │   └── [braille.test.ts](./src/components/routes/apps/text-convert/Braille/__tests__/braille.test.ts)
│   │   │   │   │   │   ├── [braille.ts](./src/components/routes/apps/text-convert/Braille/braille.ts)
│   │   │   │   │   │   └── [index.tsx](./src/components/routes/apps/text-convert/Braille/index.tsx)
│   │   │   │   │   ├── LeetSpeak/
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/text-convert/LeetSpeak/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/text-convert/LeetSpeak/utils.ts)
│   │   │   │   │   ├── Morse/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [Morse.test.tsx](./src/components/routes/apps/text-convert/Morse/__tests__/Morse.test.tsx)
│   │   │   │   │   │   │   └── [morse.test.ts](./src/components/routes/apps/text-convert/Morse/__tests__/morse.test.ts)
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   │   │   └── [morse.ts](./src/components/routes/apps/text-convert/Morse/utils/morse.ts)
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/apps/text-convert/Morse/constants.ts)
│   │   │   │   │   │   └── [index.tsx](./src/components/routes/apps/text-convert/Morse/index.tsx)
│   │   │   │   │   ├── TextCase/
│   │   │   │   │   │   └── [index.tsx](./src/components/routes/apps/text-convert/TextCase/index.tsx)
│   │   │   │   │   └── __tests__/
│   │   │   │   │       ├── __snapshots__/
│   │   │   │   │       │   ├── [Braille.test.tsx.snap](./src/components/routes/apps/text-convert/__tests__/__snapshots__/Braille.test.tsx.snap)
│   │   │   │   │       │   └── [Morse.test.tsx.snap](./src/components/routes/apps/text-convert/__tests__/__snapshots__/Morse.test.tsx.snap)
│   │   │   │   │       ├── [Braille.test.tsx](./src/components/routes/apps/text-convert/__tests__/Braille.test.tsx)
│   │   │   │   │       ├── [LeetSpeak.test.tsx](./src/components/routes/apps/text-convert/__tests__/LeetSpeak.test.tsx)
│   │   │   │   │       └── [Morse.test.tsx](./src/components/routes/apps/text-convert/__tests__/Morse.test.tsx)
│   │   │   │   ├── utilities/
│   │   │   │   │   ├── Clipboard/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [useClipboard.test.ts](./src/components/routes/apps/utilities/Clipboard/__tests__/useClipboard.test.ts)
│   │   │   │   │   │   ├── [clipboard.ts](./src/components/routes/apps/utilities/Clipboard/clipboard.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/utilities/Clipboard/index.tsx)
│   │   │   │   │   │   └── [useClipboard.ts](./src/components/routes/apps/utilities/Clipboard/useClipboard.ts)
│   │   │   │   │   ├── Colors/
│   │   │   │   │   │   └── [index.tsx](./src/components/routes/apps/utilities/Colors/index.tsx)
│   │   │   │   │   ├── CreateZip/
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/utilities/CreateZip/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/utilities/CreateZip/utils.ts)
│   │   │   │   │   ├── Emojis/
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/utilities/Emojis/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/utilities/Emojis/utils.ts)
│   │   │   │   │   ├── Kaprekar/
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/utilities/Kaprekar/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/utilities/Kaprekar/utils.ts)
│   │   │   │   │   ├── LoremIpsum/
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/utilities/LoremIpsum/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/utilities/LoremIpsum/utils.ts)
│   │   │   │   │   ├── NoSleep/
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/utilities/NoSleep/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/utilities/NoSleep/utils.ts)
│   │   │   │   │   ├── ScreenRecorder/
│   │   │   │   │   │   └── [index.tsx](./src/components/routes/apps/utilities/ScreenRecorder/index.tsx)
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   │   ├── [Emojis.test.tsx.snap](./src/components/routes/apps/utilities/__tests__/__snapshots__/Emojis.test.tsx.snap)
│   │   │   │   │   │   │   └── [Kaprekar.test.tsx.snap](./src/components/routes/apps/utilities/__tests__/__snapshots__/Kaprekar.test.tsx.snap)
│   │   │   │   │   │   ├── [Clipboard.test.tsx](./src/components/routes/apps/utilities/__tests__/Clipboard.test.tsx)
│   │   │   │   │   │   ├── [Emojis.test.tsx](./src/components/routes/apps/utilities/__tests__/Emojis.test.tsx)
│   │   │   │   │   │   ├── [Kaprekar.test.tsx](./src/components/routes/apps/utilities/__tests__/Kaprekar.test.tsx)
│   │   │   │   │   │   ├── [LoremIpsum.test.tsx](./src/components/routes/apps/utilities/__tests__/LoremIpsum.test.tsx)
│   │   │   │   │   │   └── [NoSleep.test.tsx](./src/components/routes/apps/utilities/__tests__/NoSleep.test.tsx)
│   │   │   │   │   └── data/
│   │   │   │   │       └── [emojis.ts](./src/components/routes/apps/utilities/data/emojis.ts)
│   │   │   │   ├── visualization/
│   │   │   │   │   ├── Attractors/
│   │   │   │   │   │   ├── hooks/
│   │   │   │   │   │   │   └── [useAnimation.ts](./src/components/routes/apps/visualization/Attractors/hooks/useAnimation.ts)
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   │   │   ├── [attractors.ts](./src/components/routes/apps/visualization/Attractors/utils/attractors.ts)
│   │   │   │   │   │   │   └── [renderer.ts](./src/components/routes/apps/visualization/Attractors/utils/renderer.ts)
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/apps/visualization/Attractors/constants.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/visualization/Attractors/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/apps/visualization/Attractors/types.ts)
│   │   │   │   │   ├── CalendarTracker/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [CalendarTracker.test.tsx](./src/components/routes/apps/visualization/CalendarTracker/__tests__/CalendarTracker.test.tsx)
│   │   │   │   │   │   │   └── [constants.test.ts](./src/components/routes/apps/visualization/CalendarTracker/__tests__/constants.test.ts)
│   │   │   │   │   │   ├── components/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   ├── [DailyView.test.tsx](./src/components/routes/apps/visualization/CalendarTracker/components/__tests__/DailyView.test.tsx)
│   │   │   │   │   │   │   │   ├── [Dot.test.tsx](./src/components/routes/apps/visualization/CalendarTracker/components/__tests__/Dot.test.tsx)
│   │   │   │   │   │   │   │   ├── [MonthlyView.test.tsx](./src/components/routes/apps/visualization/CalendarTracker/components/__tests__/MonthlyView.test.tsx)
│   │   │   │   │   │   │   │   ├── [QuarterlyView.test.tsx](./src/components/routes/apps/visualization/CalendarTracker/components/__tests__/QuarterlyView.test.tsx)
│   │   │   │   │   │   │   │   ├── [Weekday.test.tsx](./src/components/routes/apps/visualization/CalendarTracker/components/__tests__/Weekday.test.tsx)
│   │   │   │   │   │   │   │   └── [WeeklyView.test.tsx](./src/components/routes/apps/visualization/CalendarTracker/components/__tests__/WeeklyView.test.tsx)
│   │   │   │   │   │   │   ├── [DailyView.tsx](./src/components/routes/apps/visualization/CalendarTracker/components/DailyView.tsx)
│   │   │   │   │   │   │   ├── [Dot.tsx](./src/components/routes/apps/visualization/CalendarTracker/components/Dot.tsx)
│   │   │   │   │   │   │   ├── [MonthlyView.tsx](./src/components/routes/apps/visualization/CalendarTracker/components/MonthlyView.tsx)
│   │   │   │   │   │   │   ├── [QuarterlyView.tsx](./src/components/routes/apps/visualization/CalendarTracker/components/QuarterlyView.tsx)
│   │   │   │   │   │   │   ├── [Weekday.tsx](./src/components/routes/apps/visualization/CalendarTracker/components/Weekday.tsx)
│   │   │   │   │   │   │   └── [WeeklyView.tsx](./src/components/routes/apps/visualization/CalendarTracker/components/WeeklyView.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/apps/visualization/CalendarTracker/constants.ts)
│   │   │   │   │   │   └── [index.tsx](./src/components/routes/apps/visualization/CalendarTracker/index.tsx)
│   │   │   │   │   ├── Football/
│   │   │   │   │   │   ├── components/
│   │   │   │   │   │   │   ├── [Breadcrumbs.tsx](./src/components/routes/apps/visualization/Football/components/Breadcrumbs.tsx)
│   │   │   │   │   │   │   ├── [ErrorState.tsx](./src/components/routes/apps/visualization/Football/components/ErrorState.tsx)
│   │   │   │   │   │   │   ├── [KnockoutLink.tsx](./src/components/routes/apps/visualization/Football/components/KnockoutLink.tsx)
│   │   │   │   │   │   │   ├── [PageHeader.tsx](./src/components/routes/apps/visualization/Football/components/PageHeader.tsx)
│   │   │   │   │   │   │   └── [PageShell.tsx](./src/components/routes/apps/visualization/Football/components/PageShell.tsx)
│   │   │   │   │   │   ├── data/
│   │   │   │   │   │   │   ├── club/
│   │   │   │   │   │   │   │   ├── bundesliga/
│   │   │   │   │   │   │   │   │   ├── [1992.ts](./src/components/routes/apps/visualization/Football/data/club/bundesliga/1992.ts)
│   │   │   │   │   │   │   │   │   ├── [1993.ts](./src/components/routes/apps/visualization/Football/data/club/bundesliga/1993.ts)
│   │   │   │   │   │   │   │   │   ├── [1994.ts](./src/components/routes/apps/visualization/Football/data/club/bundesliga/1994.ts)
│   │   │   │   │   │   │   │   │   ├── [1995.ts](./src/components/routes/apps/visualization/Football/data/club/bundesliga/1995.ts)
│   │   │   │   │   │   │   │   │   ├── [1996.ts](./src/components/routes/apps/visualization/Football/data/club/bundesliga/1996.ts)
│   │   │   │   │   │   │   │   │   ├── [1997.ts](./src/components/routes/apps/visualization/Football/data/club/bundesliga/1997.ts)
│   │   │   │   │   │   │   │   │   ├── [1998.ts](./src/components/routes/apps/visualization/Football/data/club/bundesliga/1998.ts)
│   │   │   │   │   │   │   │   │   ├── [1999.ts](./src/components/routes/apps/visualization/Football/data/club/bundesliga/1999.ts)
│   │   │   │   │   │   │   │   │   ├── [2000.ts](./src/components/routes/apps/visualization/Football/data/club/bundesliga/2000.ts)
│   │   │   │   │   │   │   │   │   ├── [2001.ts](./src/components/routes/apps/visualization/Football/data/club/bundesliga/2001.ts)
│   │   │   │   │   │   │   │   │   ├── [2002.ts](./src/components/routes/apps/visualization/Football/data/club/bundesliga/2002.ts)
│   │   │   │   │   │   │   │   │   ├── [2003.ts](./src/components/routes/apps/visualization/Football/data/club/bundesliga/2003.ts)
│   │   │   │   │   │   │   │   │   ├── [2004.ts](./src/components/routes/apps/visualization/Football/data/club/bundesliga/2004.ts)
│   │   │   │   │   │   │   │   │   ├── [2005.ts](./src/components/routes/apps/visualization/Football/data/club/bundesliga/2005.ts)
│   │   │   │   │   │   │   │   │   ├── [2006.ts](./src/components/routes/apps/visualization/Football/data/club/bundesliga/2006.ts)
│   │   │   │   │   │   │   │   │   ├── [2007.ts](./src/components/routes/apps/visualization/Football/data/club/bundesliga/2007.ts)
│   │   │   │   │   │   │   │   │   ├── [2008.ts](./src/components/routes/apps/visualization/Football/data/club/bundesliga/2008.ts)
│   │   │   │   │   │   │   │   │   ├── [2009.ts](./src/components/routes/apps/visualization/Football/data/club/bundesliga/2009.ts)
│   │   │   │   │   │   │   │   │   ├── [2010.ts](./src/components/routes/apps/visualization/Football/data/club/bundesliga/2010.ts)
│   │   │   │   │   │   │   │   │   ├── [2011.ts](./src/components/routes/apps/visualization/Football/data/club/bundesliga/2011.ts)
│   │   │   │   │   │   │   │   │   ├── [2012.ts](./src/components/routes/apps/visualization/Football/data/club/bundesliga/2012.ts)
│   │   │   │   │   │   │   │   │   ├── [2013.ts](./src/components/routes/apps/visualization/Football/data/club/bundesliga/2013.ts)
│   │   │   │   │   │   │   │   │   ├── [2014.ts](./src/components/routes/apps/visualization/Football/data/club/bundesliga/2014.ts)
│   │   │   │   │   │   │   │   │   ├── [2015.ts](./src/components/routes/apps/visualization/Football/data/club/bundesliga/2015.ts)
│   │   │   │   │   │   │   │   │   ├── [2016.ts](./src/components/routes/apps/visualization/Football/data/club/bundesliga/2016.ts)
│   │   │   │   │   │   │   │   │   ├── [2017.ts](./src/components/routes/apps/visualization/Football/data/club/bundesliga/2017.ts)
│   │   │   │   │   │   │   │   │   ├── [2018.ts](./src/components/routes/apps/visualization/Football/data/club/bundesliga/2018.ts)
│   │   │   │   │   │   │   │   │   ├── [2019.ts](./src/components/routes/apps/visualization/Football/data/club/bundesliga/2019.ts)
│   │   │   │   │   │   │   │   │   ├── [2020.ts](./src/components/routes/apps/visualization/Football/data/club/bundesliga/2020.ts)
│   │   │   │   │   │   │   │   │   ├── [2021.ts](./src/components/routes/apps/visualization/Football/data/club/bundesliga/2021.ts)
│   │   │   │   │   │   │   │   │   ├── [2022.ts](./src/components/routes/apps/visualization/Football/data/club/bundesliga/2022.ts)
│   │   │   │   │   │   │   │   │   ├── [2023.ts](./src/components/routes/apps/visualization/Football/data/club/bundesliga/2023.ts)
│   │   │   │   │   │   │   │   │   ├── [2024.ts](./src/components/routes/apps/visualization/Football/data/club/bundesliga/2024.ts)
│   │   │   │   │   │   │   │   │   ├── [2025.ts](./src/components/routes/apps/visualization/Football/data/club/bundesliga/2025.ts)
│   │   │   │   │   │   │   │   │   ├── [index.ts](./src/components/routes/apps/visualization/Football/data/club/bundesliga/index.ts)
│   │   │   │   │   │   │   │   │   └── [types.ts](./src/components/routes/apps/visualization/Football/data/club/bundesliga/types.ts)
│   │   │   │   │   │   │   │   ├── champions-league/
│   │   │   │   │   │   │   │   │   ├── [1992.ts](./src/components/routes/apps/visualization/Football/data/club/champions-league/1992.ts)
│   │   │   │   │   │   │   │   │   ├── [1993.ts](./src/components/routes/apps/visualization/Football/data/club/champions-league/1993.ts)
│   │   │   │   │   │   │   │   │   ├── [1994.ts](./src/components/routes/apps/visualization/Football/data/club/champions-league/1994.ts)
│   │   │   │   │   │   │   │   │   ├── [1995.ts](./src/components/routes/apps/visualization/Football/data/club/champions-league/1995.ts)
│   │   │   │   │   │   │   │   │   ├── [1996.ts](./src/components/routes/apps/visualization/Football/data/club/champions-league/1996.ts)
│   │   │   │   │   │   │   │   │   ├── [1997.ts](./src/components/routes/apps/visualization/Football/data/club/champions-league/1997.ts)
│   │   │   │   │   │   │   │   │   ├── [1998.ts](./src/components/routes/apps/visualization/Football/data/club/champions-league/1998.ts)
│   │   │   │   │   │   │   │   │   ├── [1999.ts](./src/components/routes/apps/visualization/Football/data/club/champions-league/1999.ts)
│   │   │   │   │   │   │   │   │   ├── [2000.ts](./src/components/routes/apps/visualization/Football/data/club/champions-league/2000.ts)
│   │   │   │   │   │   │   │   │   ├── [2001.ts](./src/components/routes/apps/visualization/Football/data/club/champions-league/2001.ts)
│   │   │   │   │   │   │   │   │   ├── [2002.ts](./src/components/routes/apps/visualization/Football/data/club/champions-league/2002.ts)
│   │   │   │   │   │   │   │   │   ├── [2003.ts](./src/components/routes/apps/visualization/Football/data/club/champions-league/2003.ts)
│   │   │   │   │   │   │   │   │   ├── [2004.ts](./src/components/routes/apps/visualization/Football/data/club/champions-league/2004.ts)
│   │   │   │   │   │   │   │   │   ├── [2005.ts](./src/components/routes/apps/visualization/Football/data/club/champions-league/2005.ts)
│   │   │   │   │   │   │   │   │   ├── [2006.ts](./src/components/routes/apps/visualization/Football/data/club/champions-league/2006.ts)
│   │   │   │   │   │   │   │   │   ├── [2007.ts](./src/components/routes/apps/visualization/Football/data/club/champions-league/2007.ts)
│   │   │   │   │   │   │   │   │   ├── [2008.ts](./src/components/routes/apps/visualization/Football/data/club/champions-league/2008.ts)
│   │   │   │   │   │   │   │   │   ├── [2009.ts](./src/components/routes/apps/visualization/Football/data/club/champions-league/2009.ts)
│   │   │   │   │   │   │   │   │   ├── [2010.ts](./src/components/routes/apps/visualization/Football/data/club/champions-league/2010.ts)
│   │   │   │   │   │   │   │   │   ├── [2011.ts](./src/components/routes/apps/visualization/Football/data/club/champions-league/2011.ts)
│   │   │   │   │   │   │   │   │   ├── [2012.ts](./src/components/routes/apps/visualization/Football/data/club/champions-league/2012.ts)
│   │   │   │   │   │   │   │   │   ├── [2013.ts](./src/components/routes/apps/visualization/Football/data/club/champions-league/2013.ts)
│   │   │   │   │   │   │   │   │   ├── [2014.ts](./src/components/routes/apps/visualization/Football/data/club/champions-league/2014.ts)
│   │   │   │   │   │   │   │   │   ├── [2015.ts](./src/components/routes/apps/visualization/Football/data/club/champions-league/2015.ts)
│   │   │   │   │   │   │   │   │   ├── [2016.ts](./src/components/routes/apps/visualization/Football/data/club/champions-league/2016.ts)
│   │   │   │   │   │   │   │   │   ├── [2017.ts](./src/components/routes/apps/visualization/Football/data/club/champions-league/2017.ts)
│   │   │   │   │   │   │   │   │   ├── [2018.ts](./src/components/routes/apps/visualization/Football/data/club/champions-league/2018.ts)
│   │   │   │   │   │   │   │   │   ├── [2019.ts](./src/components/routes/apps/visualization/Football/data/club/champions-league/2019.ts)
│   │   │   │   │   │   │   │   │   ├── [2020.ts](./src/components/routes/apps/visualization/Football/data/club/champions-league/2020.ts)
│   │   │   │   │   │   │   │   │   ├── [2021.ts](./src/components/routes/apps/visualization/Football/data/club/champions-league/2021.ts)
│   │   │   │   │   │   │   │   │   ├── [2022.ts](./src/components/routes/apps/visualization/Football/data/club/champions-league/2022.ts)
│   │   │   │   │   │   │   │   │   ├── [2023.ts](./src/components/routes/apps/visualization/Football/data/club/champions-league/2023.ts)
│   │   │   │   │   │   │   │   │   ├── [2024.ts](./src/components/routes/apps/visualization/Football/data/club/champions-league/2024.ts)
│   │   │   │   │   │   │   │   │   ├── [2025.ts](./src/components/routes/apps/visualization/Football/data/club/champions-league/2025.ts)
│   │   │   │   │   │   │   │   │   ├── [index.ts](./src/components/routes/apps/visualization/Football/data/club/champions-league/index.ts)
│   │   │   │   │   │   │   │   │   └── [types.ts](./src/components/routes/apps/visualization/Football/data/club/champions-league/types.ts)
│   │   │   │   │   │   │   │   ├── la-liga/
│   │   │   │   │   │   │   │   │   ├── [1997.ts](./src/components/routes/apps/visualization/Football/data/club/la-liga/1997.ts)
│   │   │   │   │   │   │   │   │   ├── [1998.ts](./src/components/routes/apps/visualization/Football/data/club/la-liga/1998.ts)
│   │   │   │   │   │   │   │   │   ├── [1999.ts](./src/components/routes/apps/visualization/Football/data/club/la-liga/1999.ts)
│   │   │   │   │   │   │   │   │   ├── [2000.ts](./src/components/routes/apps/visualization/Football/data/club/la-liga/2000.ts)
│   │   │   │   │   │   │   │   │   ├── [2001.ts](./src/components/routes/apps/visualization/Football/data/club/la-liga/2001.ts)
│   │   │   │   │   │   │   │   │   ├── [2002.ts](./src/components/routes/apps/visualization/Football/data/club/la-liga/2002.ts)
│   │   │   │   │   │   │   │   │   ├── [2003.ts](./src/components/routes/apps/visualization/Football/data/club/la-liga/2003.ts)
│   │   │   │   │   │   │   │   │   ├── [2004.ts](./src/components/routes/apps/visualization/Football/data/club/la-liga/2004.ts)
│   │   │   │   │   │   │   │   │   ├── [2005.ts](./src/components/routes/apps/visualization/Football/data/club/la-liga/2005.ts)
│   │   │   │   │   │   │   │   │   ├── [2006.ts](./src/components/routes/apps/visualization/Football/data/club/la-liga/2006.ts)
│   │   │   │   │   │   │   │   │   ├── [2007.ts](./src/components/routes/apps/visualization/Football/data/club/la-liga/2007.ts)
│   │   │   │   │   │   │   │   │   ├── [2008.ts](./src/components/routes/apps/visualization/Football/data/club/la-liga/2008.ts)
│   │   │   │   │   │   │   │   │   ├── [2009.ts](./src/components/routes/apps/visualization/Football/data/club/la-liga/2009.ts)
│   │   │   │   │   │   │   │   │   ├── [2010.ts](./src/components/routes/apps/visualization/Football/data/club/la-liga/2010.ts)
│   │   │   │   │   │   │   │   │   ├── [2011.ts](./src/components/routes/apps/visualization/Football/data/club/la-liga/2011.ts)
│   │   │   │   │   │   │   │   │   ├── [2012.ts](./src/components/routes/apps/visualization/Football/data/club/la-liga/2012.ts)
│   │   │   │   │   │   │   │   │   ├── [2013.ts](./src/components/routes/apps/visualization/Football/data/club/la-liga/2013.ts)
│   │   │   │   │   │   │   │   │   ├── [2014.ts](./src/components/routes/apps/visualization/Football/data/club/la-liga/2014.ts)
│   │   │   │   │   │   │   │   │   ├── [2015.ts](./src/components/routes/apps/visualization/Football/data/club/la-liga/2015.ts)
│   │   │   │   │   │   │   │   │   ├── [2016.ts](./src/components/routes/apps/visualization/Football/data/club/la-liga/2016.ts)
│   │   │   │   │   │   │   │   │   ├── [2017.ts](./src/components/routes/apps/visualization/Football/data/club/la-liga/2017.ts)
│   │   │   │   │   │   │   │   │   ├── [2018.ts](./src/components/routes/apps/visualization/Football/data/club/la-liga/2018.ts)
│   │   │   │   │   │   │   │   │   ├── [2019.ts](./src/components/routes/apps/visualization/Football/data/club/la-liga/2019.ts)
│   │   │   │   │   │   │   │   │   ├── [2020.ts](./src/components/routes/apps/visualization/Football/data/club/la-liga/2020.ts)
│   │   │   │   │   │   │   │   │   ├── [2021.ts](./src/components/routes/apps/visualization/Football/data/club/la-liga/2021.ts)
│   │   │   │   │   │   │   │   │   ├── [2022.ts](./src/components/routes/apps/visualization/Football/data/club/la-liga/2022.ts)
│   │   │   │   │   │   │   │   │   ├── [2023.ts](./src/components/routes/apps/visualization/Football/data/club/la-liga/2023.ts)
│   │   │   │   │   │   │   │   │   ├── [2024.ts](./src/components/routes/apps/visualization/Football/data/club/la-liga/2024.ts)
│   │   │   │   │   │   │   │   │   ├── [2025.ts](./src/components/routes/apps/visualization/Football/data/club/la-liga/2025.ts)
│   │   │   │   │   │   │   │   │   ├── [index.ts](./src/components/routes/apps/visualization/Football/data/club/la-liga/index.ts)
│   │   │   │   │   │   │   │   │   └── [types.ts](./src/components/routes/apps/visualization/Football/data/club/la-liga/types.ts)
│   │   │   │   │   │   │   │   └── premier-league/
│   │   │   │   │   │   │   │       ├── [1992.ts](./src/components/routes/apps/visualization/Football/data/club/premier-league/1992.ts)
│   │   │   │   │   │   │   │       ├── [1993.ts](./src/components/routes/apps/visualization/Football/data/club/premier-league/1993.ts)
│   │   │   │   │   │   │   │       ├── [1994.ts](./src/components/routes/apps/visualization/Football/data/club/premier-league/1994.ts)
│   │   │   │   │   │   │   │       ├── [1995.ts](./src/components/routes/apps/visualization/Football/data/club/premier-league/1995.ts)
│   │   │   │   │   │   │   │       ├── [1996.ts](./src/components/routes/apps/visualization/Football/data/club/premier-league/1996.ts)
│   │   │   │   │   │   │   │       ├── [1997.ts](./src/components/routes/apps/visualization/Football/data/club/premier-league/1997.ts)
│   │   │   │   │   │   │   │       ├── [1998.ts](./src/components/routes/apps/visualization/Football/data/club/premier-league/1998.ts)
│   │   │   │   │   │   │   │       ├── [1999.ts](./src/components/routes/apps/visualization/Football/data/club/premier-league/1999.ts)
│   │   │   │   │   │   │   │       ├── [2000.ts](./src/components/routes/apps/visualization/Football/data/club/premier-league/2000.ts)
│   │   │   │   │   │   │   │       ├── [2001.ts](./src/components/routes/apps/visualization/Football/data/club/premier-league/2001.ts)
│   │   │   │   │   │   │   │       ├── [2002.ts](./src/components/routes/apps/visualization/Football/data/club/premier-league/2002.ts)
│   │   │   │   │   │   │   │       ├── [2003.ts](./src/components/routes/apps/visualization/Football/data/club/premier-league/2003.ts)
│   │   │   │   │   │   │   │       ├── [2004.ts](./src/components/routes/apps/visualization/Football/data/club/premier-league/2004.ts)
│   │   │   │   │   │   │   │       ├── [2005.ts](./src/components/routes/apps/visualization/Football/data/club/premier-league/2005.ts)
│   │   │   │   │   │   │   │       ├── [2006.ts](./src/components/routes/apps/visualization/Football/data/club/premier-league/2006.ts)
│   │   │   │   │   │   │   │       ├── [2007.ts](./src/components/routes/apps/visualization/Football/data/club/premier-league/2007.ts)
│   │   │   │   │   │   │   │       ├── [2008.ts](./src/components/routes/apps/visualization/Football/data/club/premier-league/2008.ts)
│   │   │   │   │   │   │   │       ├── [2009.ts](./src/components/routes/apps/visualization/Football/data/club/premier-league/2009.ts)
│   │   │   │   │   │   │   │       ├── [2010.ts](./src/components/routes/apps/visualization/Football/data/club/premier-league/2010.ts)
│   │   │   │   │   │   │   │       ├── [2011.ts](./src/components/routes/apps/visualization/Football/data/club/premier-league/2011.ts)
│   │   │   │   │   │   │   │       ├── [2012.ts](./src/components/routes/apps/visualization/Football/data/club/premier-league/2012.ts)
│   │   │   │   │   │   │   │       ├── [2013.ts](./src/components/routes/apps/visualization/Football/data/club/premier-league/2013.ts)
│   │   │   │   │   │   │   │       ├── [2014.ts](./src/components/routes/apps/visualization/Football/data/club/premier-league/2014.ts)
│   │   │   │   │   │   │   │       ├── [2015.ts](./src/components/routes/apps/visualization/Football/data/club/premier-league/2015.ts)
│   │   │   │   │   │   │   │       ├── [2016.ts](./src/components/routes/apps/visualization/Football/data/club/premier-league/2016.ts)
│   │   │   │   │   │   │   │       ├── [2017.ts](./src/components/routes/apps/visualization/Football/data/club/premier-league/2017.ts)
│   │   │   │   │   │   │   │       ├── [2018.ts](./src/components/routes/apps/visualization/Football/data/club/premier-league/2018.ts)
│   │   │   │   │   │   │   │       ├── [2019.ts](./src/components/routes/apps/visualization/Football/data/club/premier-league/2019.ts)
│   │   │   │   │   │   │   │       ├── [2020.ts](./src/components/routes/apps/visualization/Football/data/club/premier-league/2020.ts)
│   │   │   │   │   │   │   │       ├── [2021.ts](./src/components/routes/apps/visualization/Football/data/club/premier-league/2021.ts)
│   │   │   │   │   │   │   │       ├── [2022.ts](./src/components/routes/apps/visualization/Football/data/club/premier-league/2022.ts)
│   │   │   │   │   │   │   │       ├── [2023.ts](./src/components/routes/apps/visualization/Football/data/club/premier-league/2023.ts)
│   │   │   │   │   │   │   │       ├── [2024.ts](./src/components/routes/apps/visualization/Football/data/club/premier-league/2024.ts)
│   │   │   │   │   │   │   │       ├── [2025.ts](./src/components/routes/apps/visualization/Football/data/club/premier-league/2025.ts)
│   │   │   │   │   │   │   │       ├── [index.ts](./src/components/routes/apps/visualization/Football/data/club/premier-league/index.ts)
│   │   │   │   │   │   │   │       └── [types.ts](./src/components/routes/apps/visualization/Football/data/club/premier-league/types.ts)
│   │   │   │   │   │   │   ├── international/
│   │   │   │   │   │   │   │   ├── afc/
│   │   │   │   │   │   │   │   │   ├── [1956.ts](./src/components/routes/apps/visualization/Football/data/international/afc/1956.ts)
│   │   │   │   │   │   │   │   │   ├── [1960.ts](./src/components/routes/apps/visualization/Football/data/international/afc/1960.ts)
│   │   │   │   │   │   │   │   │   ├── [1964.ts](./src/components/routes/apps/visualization/Football/data/international/afc/1964.ts)
│   │   │   │   │   │   │   │   │   ├── [1968.ts](./src/components/routes/apps/visualization/Football/data/international/afc/1968.ts)
│   │   │   │   │   │   │   │   │   ├── [1972.ts](./src/components/routes/apps/visualization/Football/data/international/afc/1972.ts)
│   │   │   │   │   │   │   │   │   ├── [1976.ts](./src/components/routes/apps/visualization/Football/data/international/afc/1976.ts)
│   │   │   │   │   │   │   │   │   ├── [1980.ts](./src/components/routes/apps/visualization/Football/data/international/afc/1980.ts)
│   │   │   │   │   │   │   │   │   ├── [1984.ts](./src/components/routes/apps/visualization/Football/data/international/afc/1984.ts)
│   │   │   │   │   │   │   │   │   ├── [1988.ts](./src/components/routes/apps/visualization/Football/data/international/afc/1988.ts)
│   │   │   │   │   │   │   │   │   ├── [1992.ts](./src/components/routes/apps/visualization/Football/data/international/afc/1992.ts)
│   │   │   │   │   │   │   │   │   ├── [1996.ts](./src/components/routes/apps/visualization/Football/data/international/afc/1996.ts)
│   │   │   │   │   │   │   │   │   ├── [2000.ts](./src/components/routes/apps/visualization/Football/data/international/afc/2000.ts)
│   │   │   │   │   │   │   │   │   ├── [2004.ts](./src/components/routes/apps/visualization/Football/data/international/afc/2004.ts)
│   │   │   │   │   │   │   │   │   ├── [2007.ts](./src/components/routes/apps/visualization/Football/data/international/afc/2007.ts)
│   │   │   │   │   │   │   │   │   ├── [2011.ts](./src/components/routes/apps/visualization/Football/data/international/afc/2011.ts)
│   │   │   │   │   │   │   │   │   ├── [2015.ts](./src/components/routes/apps/visualization/Football/data/international/afc/2015.ts)
│   │   │   │   │   │   │   │   │   ├── [2019.ts](./src/components/routes/apps/visualization/Football/data/international/afc/2019.ts)
│   │   │   │   │   │   │   │   │   ├── [2024.ts](./src/components/routes/apps/visualization/Football/data/international/afc/2024.ts)
│   │   │   │   │   │   │   │   │   ├── [index.ts](./src/components/routes/apps/visualization/Football/data/international/afc/index.ts)
│   │   │   │   │   │   │   │   │   └── [types.ts](./src/components/routes/apps/visualization/Football/data/international/afc/types.ts)
│   │   │   │   │   │   │   │   ├── afcon/
│   │   │   │   │   │   │   │   │   ├── [1957.ts](./src/components/routes/apps/visualization/Football/data/international/afcon/1957.ts)
│   │   │   │   │   │   │   │   │   ├── [1959.ts](./src/components/routes/apps/visualization/Football/data/international/afcon/1959.ts)
│   │   │   │   │   │   │   │   │   ├── [1962.ts](./src/components/routes/apps/visualization/Football/data/international/afcon/1962.ts)
│   │   │   │   │   │   │   │   │   ├── [1963.ts](./src/components/routes/apps/visualization/Football/data/international/afcon/1963.ts)
│   │   │   │   │   │   │   │   │   ├── [1965.ts](./src/components/routes/apps/visualization/Football/data/international/afcon/1965.ts)
│   │   │   │   │   │   │   │   │   ├── [1968.ts](./src/components/routes/apps/visualization/Football/data/international/afcon/1968.ts)
│   │   │   │   │   │   │   │   │   ├── [1970.ts](./src/components/routes/apps/visualization/Football/data/international/afcon/1970.ts)
│   │   │   │   │   │   │   │   │   ├── [1972.ts](./src/components/routes/apps/visualization/Football/data/international/afcon/1972.ts)
│   │   │   │   │   │   │   │   │   ├── [1974.ts](./src/components/routes/apps/visualization/Football/data/international/afcon/1974.ts)
│   │   │   │   │   │   │   │   │   ├── [1976.ts](./src/components/routes/apps/visualization/Football/data/international/afcon/1976.ts)
│   │   │   │   │   │   │   │   │   ├── [1978.ts](./src/components/routes/apps/visualization/Football/data/international/afcon/1978.ts)
│   │   │   │   │   │   │   │   │   ├── [1980.ts](./src/components/routes/apps/visualization/Football/data/international/afcon/1980.ts)
│   │   │   │   │   │   │   │   │   ├── [1982.ts](./src/components/routes/apps/visualization/Football/data/international/afcon/1982.ts)
│   │   │   │   │   │   │   │   │   ├── [1984.ts](./src/components/routes/apps/visualization/Football/data/international/afcon/1984.ts)
│   │   │   │   │   │   │   │   │   ├── [1986.ts](./src/components/routes/apps/visualization/Football/data/international/afcon/1986.ts)
│   │   │   │   │   │   │   │   │   ├── [1988.ts](./src/components/routes/apps/visualization/Football/data/international/afcon/1988.ts)
│   │   │   │   │   │   │   │   │   ├── [1990.ts](./src/components/routes/apps/visualization/Football/data/international/afcon/1990.ts)
│   │   │   │   │   │   │   │   │   ├── [1992.ts](./src/components/routes/apps/visualization/Football/data/international/afcon/1992.ts)
│   │   │   │   │   │   │   │   │   ├── [1994.ts](./src/components/routes/apps/visualization/Football/data/international/afcon/1994.ts)
│   │   │   │   │   │   │   │   │   ├── [1996.ts](./src/components/routes/apps/visualization/Football/data/international/afcon/1996.ts)
│   │   │   │   │   │   │   │   │   ├── [1998.ts](./src/components/routes/apps/visualization/Football/data/international/afcon/1998.ts)
│   │   │   │   │   │   │   │   │   ├── [2000.ts](./src/components/routes/apps/visualization/Football/data/international/afcon/2000.ts)
│   │   │   │   │   │   │   │   │   ├── [2002.ts](./src/components/routes/apps/visualization/Football/data/international/afcon/2002.ts)
│   │   │   │   │   │   │   │   │   ├── [2004.ts](./src/components/routes/apps/visualization/Football/data/international/afcon/2004.ts)
│   │   │   │   │   │   │   │   │   ├── [2006.ts](./src/components/routes/apps/visualization/Football/data/international/afcon/2006.ts)
│   │   │   │   │   │   │   │   │   ├── [2008.ts](./src/components/routes/apps/visualization/Football/data/international/afcon/2008.ts)
│   │   │   │   │   │   │   │   │   ├── [2010.ts](./src/components/routes/apps/visualization/Football/data/international/afcon/2010.ts)
│   │   │   │   │   │   │   │   │   ├── [2012.ts](./src/components/routes/apps/visualization/Football/data/international/afcon/2012.ts)
│   │   │   │   │   │   │   │   │   ├── [2013.ts](./src/components/routes/apps/visualization/Football/data/international/afcon/2013.ts)
│   │   │   │   │   │   │   │   │   ├── [2015.ts](./src/components/routes/apps/visualization/Football/data/international/afcon/2015.ts)
│   │   │   │   │   │   │   │   │   ├── [2017.ts](./src/components/routes/apps/visualization/Football/data/international/afcon/2017.ts)
│   │   │   │   │   │   │   │   │   ├── [2019.ts](./src/components/routes/apps/visualization/Football/data/international/afcon/2019.ts)
│   │   │   │   │   │   │   │   │   ├── [2022.ts](./src/components/routes/apps/visualization/Football/data/international/afcon/2022.ts)
│   │   │   │   │   │   │   │   │   ├── [2024.ts](./src/components/routes/apps/visualization/Football/data/international/afcon/2024.ts)
│   │   │   │   │   │   │   │   │   ├── [2025.ts](./src/components/routes/apps/visualization/Football/data/international/afcon/2025.ts)
│   │   │   │   │   │   │   │   │   ├── [2026.ts](./src/components/routes/apps/visualization/Football/data/international/afcon/2026.ts)
│   │   │   │   │   │   │   │   │   ├── [index.ts](./src/components/routes/apps/visualization/Football/data/international/afcon/index.ts)
│   │   │   │   │   │   │   │   │   └── [types.ts](./src/components/routes/apps/visualization/Football/data/international/afcon/types.ts)
│   │   │   │   │   │   │   │   ├── asean/
│   │   │   │   │   │   │   │   │   ├── [1996.ts](./src/components/routes/apps/visualization/Football/data/international/asean/1996.ts)
│   │   │   │   │   │   │   │   │   ├── [1998.ts](./src/components/routes/apps/visualization/Football/data/international/asean/1998.ts)
│   │   │   │   │   │   │   │   │   ├── [2000.ts](./src/components/routes/apps/visualization/Football/data/international/asean/2000.ts)
│   │   │   │   │   │   │   │   │   ├── [2002.ts](./src/components/routes/apps/visualization/Football/data/international/asean/2002.ts)
│   │   │   │   │   │   │   │   │   ├── [2004.ts](./src/components/routes/apps/visualization/Football/data/international/asean/2004.ts)
│   │   │   │   │   │   │   │   │   ├── [2005.ts](./src/components/routes/apps/visualization/Football/data/international/asean/2005.ts)
│   │   │   │   │   │   │   │   │   ├── [2007.ts](./src/components/routes/apps/visualization/Football/data/international/asean/2007.ts)
│   │   │   │   │   │   │   │   │   ├── [2008.ts](./src/components/routes/apps/visualization/Football/data/international/asean/2008.ts)
│   │   │   │   │   │   │   │   │   ├── [2010.ts](./src/components/routes/apps/visualization/Football/data/international/asean/2010.ts)
│   │   │   │   │   │   │   │   │   ├── [2012.ts](./src/components/routes/apps/visualization/Football/data/international/asean/2012.ts)
│   │   │   │   │   │   │   │   │   ├── [2014.ts](./src/components/routes/apps/visualization/Football/data/international/asean/2014.ts)
│   │   │   │   │   │   │   │   │   ├── [2016.ts](./src/components/routes/apps/visualization/Football/data/international/asean/2016.ts)
│   │   │   │   │   │   │   │   │   ├── [2018.ts](./src/components/routes/apps/visualization/Football/data/international/asean/2018.ts)
│   │   │   │   │   │   │   │   │   ├── [2021.ts](./src/components/routes/apps/visualization/Football/data/international/asean/2021.ts)
│   │   │   │   │   │   │   │   │   ├── [2022.ts](./src/components/routes/apps/visualization/Football/data/international/asean/2022.ts)
│   │   │   │   │   │   │   │   │   ├── [2023.ts](./src/components/routes/apps/visualization/Football/data/international/asean/2023.ts)
│   │   │   │   │   │   │   │   │   ├── [2024.ts](./src/components/routes/apps/visualization/Football/data/international/asean/2024.ts)
│   │   │   │   │   │   │   │   │   ├── [2025.ts](./src/components/routes/apps/visualization/Football/data/international/asean/2025.ts)
│   │   │   │   │   │   │   │   │   ├── [index.ts](./src/components/routes/apps/visualization/Football/data/international/asean/index.ts)
│   │   │   │   │   │   │   │   │   └── [types.ts](./src/components/routes/apps/visualization/Football/data/international/asean/types.ts)
│   │   │   │   │   │   │   │   ├── concacaf/
│   │   │   │   │   │   │   │   │   ├── [1991.ts](./src/components/routes/apps/visualization/Football/data/international/concacaf/1991.ts)
│   │   │   │   │   │   │   │   │   ├── [1993.ts](./src/components/routes/apps/visualization/Football/data/international/concacaf/1993.ts)
│   │   │   │   │   │   │   │   │   ├── [1996.ts](./src/components/routes/apps/visualization/Football/data/international/concacaf/1996.ts)
│   │   │   │   │   │   │   │   │   ├── [1998.ts](./src/components/routes/apps/visualization/Football/data/international/concacaf/1998.ts)
│   │   │   │   │   │   │   │   │   ├── [2000.ts](./src/components/routes/apps/visualization/Football/data/international/concacaf/2000.ts)
│   │   │   │   │   │   │   │   │   ├── [2002.ts](./src/components/routes/apps/visualization/Football/data/international/concacaf/2002.ts)
│   │   │   │   │   │   │   │   │   ├── [2003.ts](./src/components/routes/apps/visualization/Football/data/international/concacaf/2003.ts)
│   │   │   │   │   │   │   │   │   ├── [2005.ts](./src/components/routes/apps/visualization/Football/data/international/concacaf/2005.ts)
│   │   │   │   │   │   │   │   │   ├── [2007.ts](./src/components/routes/apps/visualization/Football/data/international/concacaf/2007.ts)
│   │   │   │   │   │   │   │   │   ├── [2009.ts](./src/components/routes/apps/visualization/Football/data/international/concacaf/2009.ts)
│   │   │   │   │   │   │   │   │   ├── [2011.ts](./src/components/routes/apps/visualization/Football/data/international/concacaf/2011.ts)
│   │   │   │   │   │   │   │   │   ├── [2013.ts](./src/components/routes/apps/visualization/Football/data/international/concacaf/2013.ts)
│   │   │   │   │   │   │   │   │   ├── [2015.ts](./src/components/routes/apps/visualization/Football/data/international/concacaf/2015.ts)
│   │   │   │   │   │   │   │   │   ├── [2017.ts](./src/components/routes/apps/visualization/Football/data/international/concacaf/2017.ts)
│   │   │   │   │   │   │   │   │   ├── [2019.ts](./src/components/routes/apps/visualization/Football/data/international/concacaf/2019.ts)
│   │   │   │   │   │   │   │   │   ├── [2021.ts](./src/components/routes/apps/visualization/Football/data/international/concacaf/2021.ts)
│   │   │   │   │   │   │   │   │   ├── [2023.ts](./src/components/routes/apps/visualization/Football/data/international/concacaf/2023.ts)
│   │   │   │   │   │   │   │   │   ├── [2025.ts](./src/components/routes/apps/visualization/Football/data/international/concacaf/2025.ts)
│   │   │   │   │   │   │   │   │   ├── [index.ts](./src/components/routes/apps/visualization/Football/data/international/concacaf/index.ts)
│   │   │   │   │   │   │   │   │   └── [types.ts](./src/components/routes/apps/visualization/Football/data/international/concacaf/types.ts)
│   │   │   │   │   │   │   │   ├── copa/
│   │   │   │   │   │   │   │   │   ├── [1916.ts](./src/components/routes/apps/visualization/Football/data/international/copa/1916.ts)
│   │   │   │   │   │   │   │   │   ├── [1917.ts](./src/components/routes/apps/visualization/Football/data/international/copa/1917.ts)
│   │   │   │   │   │   │   │   │   ├── [1919.ts](./src/components/routes/apps/visualization/Football/data/international/copa/1919.ts)
│   │   │   │   │   │   │   │   │   ├── [1920.ts](./src/components/routes/apps/visualization/Football/data/international/copa/1920.ts)
│   │   │   │   │   │   │   │   │   ├── [1921.ts](./src/components/routes/apps/visualization/Football/data/international/copa/1921.ts)
│   │   │   │   │   │   │   │   │   ├── [1922.ts](./src/components/routes/apps/visualization/Football/data/international/copa/1922.ts)
│   │   │   │   │   │   │   │   │   ├── [1923.ts](./src/components/routes/apps/visualization/Football/data/international/copa/1923.ts)
│   │   │   │   │   │   │   │   │   ├── [1924.ts](./src/components/routes/apps/visualization/Football/data/international/copa/1924.ts)
│   │   │   │   │   │   │   │   │   ├── [1925.ts](./src/components/routes/apps/visualization/Football/data/international/copa/1925.ts)
│   │   │   │   │   │   │   │   │   ├── [1926.ts](./src/components/routes/apps/visualization/Football/data/international/copa/1926.ts)
│   │   │   │   │   │   │   │   │   ├── [1927.ts](./src/components/routes/apps/visualization/Football/data/international/copa/1927.ts)
│   │   │   │   │   │   │   │   │   ├── [1929.ts](./src/components/routes/apps/visualization/Football/data/international/copa/1929.ts)
│   │   │   │   │   │   │   │   │   ├── [1935.ts](./src/components/routes/apps/visualization/Football/data/international/copa/1935.ts)
│   │   │   │   │   │   │   │   │   ├── [1936.ts](./src/components/routes/apps/visualization/Football/data/international/copa/1936.ts)
│   │   │   │   │   │   │   │   │   ├── [1937.ts](./src/components/routes/apps/visualization/Football/data/international/copa/1937.ts)
│   │   │   │   │   │   │   │   │   ├── [1939.ts](./src/components/routes/apps/visualization/Football/data/international/copa/1939.ts)
│   │   │   │   │   │   │   │   │   ├── [1941.ts](./src/components/routes/apps/visualization/Football/data/international/copa/1941.ts)
│   │   │   │   │   │   │   │   │   ├── [1942.ts](./src/components/routes/apps/visualization/Football/data/international/copa/1942.ts)
│   │   │   │   │   │   │   │   │   ├── [1945.ts](./src/components/routes/apps/visualization/Football/data/international/copa/1945.ts)
│   │   │   │   │   │   │   │   │   ├── [1946.ts](./src/components/routes/apps/visualization/Football/data/international/copa/1946.ts)
│   │   │   │   │   │   │   │   │   ├── [1947.ts](./src/components/routes/apps/visualization/Football/data/international/copa/1947.ts)
│   │   │   │   │   │   │   │   │   ├── [1949.ts](./src/components/routes/apps/visualization/Football/data/international/copa/1949.ts)
│   │   │   │   │   │   │   │   │   ├── [1953.ts](./src/components/routes/apps/visualization/Football/data/international/copa/1953.ts)
│   │   │   │   │   │   │   │   │   ├── [1955.ts](./src/components/routes/apps/visualization/Football/data/international/copa/1955.ts)
│   │   │   │   │   │   │   │   │   ├── [1956.ts](./src/components/routes/apps/visualization/Football/data/international/copa/1956.ts)
│   │   │   │   │   │   │   │   │   ├── [1957.ts](./src/components/routes/apps/visualization/Football/data/international/copa/1957.ts)
│   │   │   │   │   │   │   │   │   ├── [1959.ts](./src/components/routes/apps/visualization/Football/data/international/copa/1959.ts)
│   │   │   │   │   │   │   │   │   ├── [1963.ts](./src/components/routes/apps/visualization/Football/data/international/copa/1963.ts)
│   │   │   │   │   │   │   │   │   ├── [1967.ts](./src/components/routes/apps/visualization/Football/data/international/copa/1967.ts)
│   │   │   │   │   │   │   │   │   ├── [1975.ts](./src/components/routes/apps/visualization/Football/data/international/copa/1975.ts)
│   │   │   │   │   │   │   │   │   ├── [1979.ts](./src/components/routes/apps/visualization/Football/data/international/copa/1979.ts)
│   │   │   │   │   │   │   │   │   ├── [1983.ts](./src/components/routes/apps/visualization/Football/data/international/copa/1983.ts)
│   │   │   │   │   │   │   │   │   ├── [1987.ts](./src/components/routes/apps/visualization/Football/data/international/copa/1987.ts)
│   │   │   │   │   │   │   │   │   ├── [1989.ts](./src/components/routes/apps/visualization/Football/data/international/copa/1989.ts)
│   │   │   │   │   │   │   │   │   ├── [1991.ts](./src/components/routes/apps/visualization/Football/data/international/copa/1991.ts)
│   │   │   │   │   │   │   │   │   ├── [1993.ts](./src/components/routes/apps/visualization/Football/data/international/copa/1993.ts)
│   │   │   │   │   │   │   │   │   ├── [1995.ts](./src/components/routes/apps/visualization/Football/data/international/copa/1995.ts)
│   │   │   │   │   │   │   │   │   ├── [1997.ts](./src/components/routes/apps/visualization/Football/data/international/copa/1997.ts)
│   │   │   │   │   │   │   │   │   ├── [1999.ts](./src/components/routes/apps/visualization/Football/data/international/copa/1999.ts)
│   │   │   │   │   │   │   │   │   ├── [2001.ts](./src/components/routes/apps/visualization/Football/data/international/copa/2001.ts)
│   │   │   │   │   │   │   │   │   ├── [2004.ts](./src/components/routes/apps/visualization/Football/data/international/copa/2004.ts)
│   │   │   │   │   │   │   │   │   ├── [2007.ts](./src/components/routes/apps/visualization/Football/data/international/copa/2007.ts)
│   │   │   │   │   │   │   │   │   ├── [2011.ts](./src/components/routes/apps/visualization/Football/data/international/copa/2011.ts)
│   │   │   │   │   │   │   │   │   ├── [2015.ts](./src/components/routes/apps/visualization/Football/data/international/copa/2015.ts)
│   │   │   │   │   │   │   │   │   ├── [2016.ts](./src/components/routes/apps/visualization/Football/data/international/copa/2016.ts)
│   │   │   │   │   │   │   │   │   ├── [2019.ts](./src/components/routes/apps/visualization/Football/data/international/copa/2019.ts)
│   │   │   │   │   │   │   │   │   ├── [2021.ts](./src/components/routes/apps/visualization/Football/data/international/copa/2021.ts)
│   │   │   │   │   │   │   │   │   ├── [2024.ts](./src/components/routes/apps/visualization/Football/data/international/copa/2024.ts)
│   │   │   │   │   │   │   │   │   ├── [index.ts](./src/components/routes/apps/visualization/Football/data/international/copa/index.ts)
│   │   │   │   │   │   │   │   │   └── [types.ts](./src/components/routes/apps/visualization/Football/data/international/copa/types.ts)
│   │   │   │   │   │   │   │   ├── euro/
│   │   │   │   │   │   │   │   │   ├── [1960.ts](./src/components/routes/apps/visualization/Football/data/international/euro/1960.ts)
│   │   │   │   │   │   │   │   │   ├── [1964.ts](./src/components/routes/apps/visualization/Football/data/international/euro/1964.ts)
│   │   │   │   │   │   │   │   │   ├── [1968.ts](./src/components/routes/apps/visualization/Football/data/international/euro/1968.ts)
│   │   │   │   │   │   │   │   │   ├── [1972.ts](./src/components/routes/apps/visualization/Football/data/international/euro/1972.ts)
│   │   │   │   │   │   │   │   │   ├── [1976.ts](./src/components/routes/apps/visualization/Football/data/international/euro/1976.ts)
│   │   │   │   │   │   │   │   │   ├── [1980.ts](./src/components/routes/apps/visualization/Football/data/international/euro/1980.ts)
│   │   │   │   │   │   │   │   │   ├── [1984.ts](./src/components/routes/apps/visualization/Football/data/international/euro/1984.ts)
│   │   │   │   │   │   │   │   │   ├── [1988.ts](./src/components/routes/apps/visualization/Football/data/international/euro/1988.ts)
│   │   │   │   │   │   │   │   │   ├── [1992.ts](./src/components/routes/apps/visualization/Football/data/international/euro/1992.ts)
│   │   │   │   │   │   │   │   │   ├── [1996.ts](./src/components/routes/apps/visualization/Football/data/international/euro/1996.ts)
│   │   │   │   │   │   │   │   │   ├── [2000.ts](./src/components/routes/apps/visualization/Football/data/international/euro/2000.ts)
│   │   │   │   │   │   │   │   │   ├── [2004.ts](./src/components/routes/apps/visualization/Football/data/international/euro/2004.ts)
│   │   │   │   │   │   │   │   │   ├── [2008.ts](./src/components/routes/apps/visualization/Football/data/international/euro/2008.ts)
│   │   │   │   │   │   │   │   │   ├── [2012.ts](./src/components/routes/apps/visualization/Football/data/international/euro/2012.ts)
│   │   │   │   │   │   │   │   │   ├── [2016.ts](./src/components/routes/apps/visualization/Football/data/international/euro/2016.ts)
│   │   │   │   │   │   │   │   │   ├── [2021.ts](./src/components/routes/apps/visualization/Football/data/international/euro/2021.ts)
│   │   │   │   │   │   │   │   │   ├── [2024.ts](./src/components/routes/apps/visualization/Football/data/international/euro/2024.ts)
│   │   │   │   │   │   │   │   │   ├── [index.ts](./src/components/routes/apps/visualization/Football/data/international/euro/index.ts)
│   │   │   │   │   │   │   │   │   └── [types.ts](./src/components/routes/apps/visualization/Football/data/international/euro/types.ts)
│   │   │   │   │   │   │   │   └── world-cup/
│   │   │   │   │   │   │   │       ├── [1930.ts](./src/components/routes/apps/visualization/Football/data/international/world-cup/1930.ts)
│   │   │   │   │   │   │   │       ├── [1934.ts](./src/components/routes/apps/visualization/Football/data/international/world-cup/1934.ts)
│   │   │   │   │   │   │   │       ├── [1938.ts](./src/components/routes/apps/visualization/Football/data/international/world-cup/1938.ts)
│   │   │   │   │   │   │   │       ├── [1950.ts](./src/components/routes/apps/visualization/Football/data/international/world-cup/1950.ts)
│   │   │   │   │   │   │   │       ├── [1954.ts](./src/components/routes/apps/visualization/Football/data/international/world-cup/1954.ts)
│   │   │   │   │   │   │   │       ├── [1958.ts](./src/components/routes/apps/visualization/Football/data/international/world-cup/1958.ts)
│   │   │   │   │   │   │   │       ├── [1962.ts](./src/components/routes/apps/visualization/Football/data/international/world-cup/1962.ts)
│   │   │   │   │   │   │   │       ├── [1966.ts](./src/components/routes/apps/visualization/Football/data/international/world-cup/1966.ts)
│   │   │   │   │   │   │   │       ├── [1970.ts](./src/components/routes/apps/visualization/Football/data/international/world-cup/1970.ts)
│   │   │   │   │   │   │   │       ├── [1974.ts](./src/components/routes/apps/visualization/Football/data/international/world-cup/1974.ts)
│   │   │   │   │   │   │   │       ├── [1978.ts](./src/components/routes/apps/visualization/Football/data/international/world-cup/1978.ts)
│   │   │   │   │   │   │   │       ├── [1982.ts](./src/components/routes/apps/visualization/Football/data/international/world-cup/1982.ts)
│   │   │   │   │   │   │   │       ├── [1986.ts](./src/components/routes/apps/visualization/Football/data/international/world-cup/1986.ts)
│   │   │   │   │   │   │   │       ├── [1990.ts](./src/components/routes/apps/visualization/Football/data/international/world-cup/1990.ts)
│   │   │   │   │   │   │   │       ├── [1994.ts](./src/components/routes/apps/visualization/Football/data/international/world-cup/1994.ts)
│   │   │   │   │   │   │   │       ├── [1998.ts](./src/components/routes/apps/visualization/Football/data/international/world-cup/1998.ts)
│   │   │   │   │   │   │   │       ├── [2002.ts](./src/components/routes/apps/visualization/Football/data/international/world-cup/2002.ts)
│   │   │   │   │   │   │   │       ├── [2006.ts](./src/components/routes/apps/visualization/Football/data/international/world-cup/2006.ts)
│   │   │   │   │   │   │   │       ├── [2010.ts](./src/components/routes/apps/visualization/Football/data/international/world-cup/2010.ts)
│   │   │   │   │   │   │   │       ├── [2014.ts](./src/components/routes/apps/visualization/Football/data/international/world-cup/2014.ts)
│   │   │   │   │   │   │   │       ├── [2018.ts](./src/components/routes/apps/visualization/Football/data/international/world-cup/2018.ts)
│   │   │   │   │   │   │   │       ├── [2022.ts](./src/components/routes/apps/visualization/Football/data/international/world-cup/2022.ts)
│   │   │   │   │   │   │   │       ├── [2026.ts](./src/components/routes/apps/visualization/Football/data/international/world-cup/2026.ts)
│   │   │   │   │   │   │   │       ├── [index.ts](./src/components/routes/apps/visualization/Football/data/international/world-cup/index.ts)
│   │   │   │   │   │   │   │       ├── [knock-out.ts](./src/components/routes/apps/visualization/Football/data/international/world-cup/knock-out.ts)
│   │   │   │   │   │   │   │       └── [types.ts](./src/components/routes/apps/visualization/Football/data/international/world-cup/types.ts)
│   │   │   │   │   │   │   ├── [shared.ts](./src/components/routes/apps/visualization/Football/data/shared.ts)
│   │   │   │   │   │   │   └── [tournament.ts](./src/components/routes/apps/visualization/Football/data/tournament.ts)
│   │   │   │   │   │   ├── pages/
│   │   │   │   │   │   │   ├── group-stage/
│   │   │   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/visualization/Football/pages/group-stage/index.tsx)
│   │   │   │   │   │   │   │   └── [types.ts](./src/components/routes/apps/visualization/Football/pages/group-stage/types.ts)
│   │   │   │   │   │   │   ├── knock-out/
│   │   │   │   │   │   │   │   ├── components/
│   │   │   │   │   │   │   │   │   ├── [BracketActions.tsx](./src/components/routes/apps/visualization/Football/pages/knock-out/components/BracketActions.tsx)
│   │   │   │   │   │   │   │   │   ├── [BracketBoard.tsx](./src/components/routes/apps/visualization/Football/pages/knock-out/components/BracketBoard.tsx)
│   │   │   │   │   │   │   │   │   ├── [BracketContent.tsx](./src/components/routes/apps/visualization/Football/pages/knock-out/components/BracketContent.tsx)
│   │   │   │   │   │   │   │   │   ├── [BracketPill.tsx](./src/components/routes/apps/visualization/Football/pages/knock-out/components/BracketPill.tsx)
│   │   │   │   │   │   │   │   │   ├── [BranchLines.tsx](./src/components/routes/apps/visualization/Football/pages/knock-out/components/BranchLines.tsx)
│   │   │   │   │   │   │   │   │   ├── [FooterNote.tsx](./src/components/routes/apps/visualization/Football/pages/knock-out/components/FooterNote.tsx)
│   │   │   │   │   │   │   │   │   ├── [Header.tsx](./src/components/routes/apps/visualization/Football/pages/knock-out/components/Header.tsx)
│   │   │   │   │   │   │   │   │   ├── [Legend.tsx](./src/components/routes/apps/visualization/Football/pages/knock-out/components/Legend.tsx)
│   │   │   │   │   │   │   │   │   ├── [ResetButton.tsx](./src/components/routes/apps/visualization/Football/pages/knock-out/components/ResetButton.tsx)
│   │   │   │   │   │   │   │   │   ├── [RingsLayer.tsx](./src/components/routes/apps/visualization/Football/pages/knock-out/components/RingsLayer.tsx)
│   │   │   │   │   │   │   │   │   └── [StatusBar.tsx](./src/components/routes/apps/visualization/Football/pages/knock-out/components/StatusBar.tsx)
│   │   │   │   │   │   │   │   ├── [constants.ts](./src/components/routes/apps/visualization/Football/pages/knock-out/constants.ts)
│   │   │   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/visualization/Football/pages/knock-out/index.tsx)
│   │   │   │   │   │   │   │   ├── [tree.ts](./src/components/routes/apps/visualization/Football/pages/knock-out/tree.ts)
│   │   │   │   │   │   │   │   └── [types.ts](./src/components/routes/apps/visualization/Football/pages/knock-out/types.ts)
│   │   │   │   │   │   │   ├── tournaments/
│   │   │   │   │   │   │   │   ├── [TournamentCard.tsx](./src/components/routes/apps/visualization/Football/pages/tournaments/TournamentCard.tsx)
│   │   │   │   │   │   │   │   └── [index.tsx](./src/components/routes/apps/visualization/Football/pages/tournaments/index.tsx)
│   │   │   │   │   │   │   └── years/
│   │   │   │   │   │   │       ├── [StatList.tsx](./src/components/routes/apps/visualization/Football/pages/years/StatList.tsx)
│   │   │   │   │   │   │       ├── [YearCard.tsx](./src/components/routes/apps/visualization/Football/pages/years/YearCard.tsx)
│   │   │   │   │   │   │       └── [index.tsx](./src/components/routes/apps/visualization/Football/pages/years/index.tsx)
│   │   │   │   │   │   └── [AGENTS.md](./src/components/routes/apps/visualization/Football/AGENTS.md)
│   │   │   │   │   ├── Legislation/
│   │   │   │   │   │   ├── components/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [Hemicycle.test.tsx](./src/components/routes/apps/visualization/Legislation/components/__tests__/Hemicycle.test.tsx)
│   │   │   │   │   │   │   └── [Hemicycle.tsx](./src/components/routes/apps/visualization/Legislation/components/Hemicycle.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/apps/visualization/Legislation/constants.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/visualization/Legislation/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/apps/visualization/Legislation/types.ts)
│   │   │   │   │   ├── ResumeTimeline/
│   │   │   │   │   │   ├── [EntryCard.tsx](./src/components/routes/apps/visualization/ResumeTimeline/EntryCard.tsx)
│   │   │   │   │   │   ├── [EntryIcon.tsx](./src/components/routes/apps/visualization/ResumeTimeline/EntryIcon.tsx)
│   │   │   │   │   │   ├── [data.ts](./src/components/routes/apps/visualization/ResumeTimeline/data.ts)
│   │   │   │   │   │   └── [index.tsx](./src/components/routes/apps/visualization/ResumeTimeline/index.tsx)
│   │   │   │   │   └── __tests__/
│   │   │   │   │       ├── __snapshots__/
│   │   │   │   │       │   └── [ResumeTimeline.test.tsx.snap](./src/components/routes/apps/visualization/__tests__/__snapshots__/ResumeTimeline.test.tsx.snap)
│   │   │   │   │       ├── [Legislation.test.tsx](./src/components/routes/apps/visualization/__tests__/Legislation.test.tsx)
│   │   │   │   │       └── [ResumeTimeline.test.tsx](./src/components/routes/apps/visualization/__tests__/ResumeTimeline.test.tsx)
│   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/AGENTS.md)
│   │   │   │   ├── [apps-data.ts](./src/components/routes/apps/apps-data.ts)
│   │   │   │   └── [index.tsx](./src/components/routes/apps/index.tsx)
│   │   │   ├── downloads/
│   │   │   │   ├── [downloads-data.ts](./src/components/routes/downloads/downloads-data.ts)
│   │   │   │   └── [index.tsx](./src/components/routes/downloads/index.tsx)
│   │   │   ├── games/
│   │   │   │   ├── arcade/
│   │   │   │   │   ├── DinoRun/
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/games/arcade/DinoRun/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/components/routes/games/arcade/DinoRun/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/games/arcade/DinoRun/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/games/arcade/DinoRun/types.ts)
│   │   │   │   │   ├── RockPaperScissors/
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/games/arcade/RockPaperScissors/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/games/arcade/RockPaperScissors/utils.ts)
│   │   │   │   │   ├── Snake/
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [snake.test.ts](./src/components/routes/games/arcade/Snake/utils/__tests__/snake.test.ts)
│   │   │   │   │   │   │   └── [snake.ts](./src/components/routes/games/arcade/Snake/utils/snake.ts)
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/games/arcade/Snake/constants.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/games/arcade/Snake/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/games/arcade/Snake/types.ts)
│   │   │   │   │   └── __tests__/
│   │   │   │   │       ├── __snapshots__/
│   │   │   │   │       │   ├── [RockPaperScissors.test.tsx.snap](./src/components/routes/games/arcade/__tests__/__snapshots__/RockPaperScissors.test.tsx.snap)
│   │   │   │   │       │   └── [Snake.test.tsx.snap](./src/components/routes/games/arcade/__tests__/__snapshots__/Snake.test.tsx.snap)
│   │   │   │   │       ├── [RockPaperScissors.test.tsx](./src/components/routes/games/arcade/__tests__/RockPaperScissors.test.tsx)
│   │   │   │   │       └── [Snake.test.tsx](./src/components/routes/games/arcade/__tests__/Snake.test.tsx)
│   │   │   │   ├── casino/
│   │   │   │   │   ├── Baccarat/
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/games/casino/Baccarat/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/components/routes/games/casino/Baccarat/game.ts)
│   │   │   │   │   │   └── [index.tsx](./src/components/routes/games/casino/Baccarat/index.tsx)
│   │   │   │   │   ├── Blackjack/
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/games/casino/Blackjack/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/games/casino/Blackjack/utils.ts)
│   │   │   │   │   ├── DiceGame/
│   │   │   │   │   │   ├── [game.ts](./src/components/routes/games/casino/DiceGame/game.ts)
│   │   │   │   │   │   └── [index.tsx](./src/components/routes/games/casino/DiceGame/index.tsx)
│   │   │   │   │   ├── Poker/
│   │   │   │   │   │   ├── components/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   ├── [CardPicker.test.tsx](./src/components/routes/games/casino/Poker/components/__tests__/CardPicker.test.tsx)
│   │   │   │   │   │   │   │   └── [MeterBar.test.tsx](./src/components/routes/games/casino/Poker/components/__tests__/MeterBar.test.tsx)
│   │   │   │   │   │   │   ├── [CardChip.tsx](./src/components/routes/games/casino/Poker/components/CardChip.tsx)
│   │   │   │   │   │   │   ├── [CardPicker.tsx](./src/components/routes/games/casino/Poker/components/CardPicker.tsx)
│   │   │   │   │   │   │   └── [MeterBar.tsx](./src/components/routes/games/casino/Poker/components/MeterBar.tsx)
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [poker.test.ts](./src/components/routes/games/casino/Poker/utils/__tests__/poker.test.ts)
│   │   │   │   │   │   │   └── [poker.ts](./src/components/routes/games/casino/Poker/utils/poker.ts)
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/games/casino/Poker/constants.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/games/casino/Poker/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/games/casino/Poker/types.ts)
│   │   │   │   │   ├── SlotMachine/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   │   │   └── [SlotMachine.test.tsx.snap](./src/components/routes/games/casino/SlotMachine/__tests__/__snapshots__/SlotMachine.test.tsx.snap)
│   │   │   │   │   │   │   └── [SlotMachine.test.tsx](./src/components/routes/games/casino/SlotMachine/__tests__/SlotMachine.test.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/games/casino/SlotMachine/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./src/components/routes/games/casino/SlotMachine/game.ts)
│   │   │   │   │   │   └── [index.tsx](./src/components/routes/games/casino/SlotMachine/index.tsx)
│   │   │   │   │   └── __tests__/
│   │   │   │   │       ├── __snapshots__/
│   │   │   │   │       │   ├── [Blackjack.test.tsx.snap](./src/components/routes/games/casino/__tests__/__snapshots__/Blackjack.test.tsx.snap)
│   │   │   │   │       │   ├── [DiceGame.test.tsx.snap](./src/components/routes/games/casino/__tests__/__snapshots__/DiceGame.test.tsx.snap)
│   │   │   │   │       │   └── [Poker.test.tsx.snap](./src/components/routes/games/casino/__tests__/__snapshots__/Poker.test.tsx.snap)
│   │   │   │   │       ├── [Blackjack.test.tsx](./src/components/routes/games/casino/__tests__/Blackjack.test.tsx)
│   │   │   │   │       ├── [DiceGame.test.tsx](./src/components/routes/games/casino/__tests__/DiceGame.test.tsx)
│   │   │   │   │       └── [Poker.test.tsx](./src/components/routes/games/casino/__tests__/Poker.test.tsx)
│   │   │   │   ├── chess/
│   │   │   │   │   ├── ChessBoard/
│   │   │   │   │   │   ├── components/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   │   │   │   ├── [BoardSection.test.tsx.snap](./src/components/routes/games/chess/ChessBoard/components/__tests__/__snapshots__/BoardSection.test.tsx.snap)
│   │   │   │   │   │   │   │   │   ├── [EcoPanel.test.tsx.snap](./src/components/routes/games/chess/ChessBoard/components/__tests__/__snapshots__/EcoPanel.test.tsx.snap)
│   │   │   │   │   │   │   │   │   ├── [EnginePanel.test.tsx.snap](./src/components/routes/games/chess/ChessBoard/components/__tests__/__snapshots__/EnginePanel.test.tsx.snap)
│   │   │   │   │   │   │   │   │   ├── [ExportPanel.test.tsx.snap](./src/components/routes/games/chess/ChessBoard/components/__tests__/__snapshots__/ExportPanel.test.tsx.snap)
│   │   │   │   │   │   │   │   │   ├── [Header.test.tsx.snap](./src/components/routes/games/chess/ChessBoard/components/__tests__/__snapshots__/Header.test.tsx.snap)
│   │   │   │   │   │   │   │   │   └── [PositionPanel.test.tsx.snap](./src/components/routes/games/chess/ChessBoard/components/__tests__/__snapshots__/PositionPanel.test.tsx.snap)
│   │   │   │   │   │   │   │   ├── [BoardSection.test.tsx](./src/components/routes/games/chess/ChessBoard/components/__tests__/BoardSection.test.tsx)
│   │   │   │   │   │   │   │   ├── [EcoPanel.test.tsx](./src/components/routes/games/chess/ChessBoard/components/__tests__/EcoPanel.test.tsx)
│   │   │   │   │   │   │   │   ├── [EnginePanel.test.tsx](./src/components/routes/games/chess/ChessBoard/components/__tests__/EnginePanel.test.tsx)
│   │   │   │   │   │   │   │   ├── [ExportPanel.test.tsx](./src/components/routes/games/chess/ChessBoard/components/__tests__/ExportPanel.test.tsx)
│   │   │   │   │   │   │   │   ├── [Header.test.tsx](./src/components/routes/games/chess/ChessBoard/components/__tests__/Header.test.tsx)
│   │   │   │   │   │   │   │   └── [PositionPanel.test.tsx](./src/components/routes/games/chess/ChessBoard/components/__tests__/PositionPanel.test.tsx)
│   │   │   │   │   │   │   ├── [BoardSection.tsx](./src/components/routes/games/chess/ChessBoard/components/BoardSection.tsx)
│   │   │   │   │   │   │   ├── [EcoPanel.tsx](./src/components/routes/games/chess/ChessBoard/components/EcoPanel.tsx)
│   │   │   │   │   │   │   ├── [EnginePanel.tsx](./src/components/routes/games/chess/ChessBoard/components/EnginePanel.tsx)
│   │   │   │   │   │   │   ├── [ExportPanel.tsx](./src/components/routes/games/chess/ChessBoard/components/ExportPanel.tsx)
│   │   │   │   │   │   │   ├── [Header.tsx](./src/components/routes/games/chess/ChessBoard/components/Header.tsx)
│   │   │   │   │   │   │   └── [PositionPanel.tsx](./src/components/routes/games/chess/ChessBoard/components/PositionPanel.tsx)
│   │   │   │   │   │   ├── hooks/
│   │   │   │   │   │   │   ├── [boardReducer.ts](./src/components/routes/games/chess/ChessBoard/hooks/boardReducer.ts)
│   │   │   │   │   │   │   ├── [useChessBoard.ts](./src/components/routes/games/chess/ChessBoard/hooks/useChessBoard.ts)
│   │   │   │   │   │   │   ├── [useEcoData.ts](./src/components/routes/games/chess/ChessBoard/hooks/useEcoData.ts)
│   │   │   │   │   │   │   ├── [useEngineIntegration.ts](./src/components/routes/games/chess/ChessBoard/hooks/useEngineIntegration.ts)
│   │   │   │   │   │   │   └── [useExport.ts](./src/components/routes/games/chess/ChessBoard/hooks/useExport.ts)
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   │   │   └── [eco.ts](./src/components/routes/games/chess/ChessBoard/utils/eco.ts)
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/games/chess/ChessBoard/constants.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/games/chess/ChessBoard/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/games/chess/ChessBoard/types.ts)
│   │   │   │   │   ├── ChessClock/
│   │   │   │   │   │   ├── components/
│   │   │   │   │   │   │   └── [icons.tsx](./src/components/routes/games/chess/ChessClock/components/icons.tsx)
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [clock.test.ts](./src/components/routes/games/chess/ChessClock/utils/__tests__/clock.test.ts)
│   │   │   │   │   │   │   └── [clock.ts](./src/components/routes/games/chess/ChessClock/utils/clock.ts)
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/games/chess/ChessClock/constants.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/games/chess/ChessClock/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/games/chess/ChessClock/types.ts)
│   │   │   │   │   ├── ChessElo/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [Elo.test.tsx](./src/components/routes/games/chess/ChessElo/__tests__/Elo.test.tsx)
│   │   │   │   │   │   │   ├── [PerformanceTab.test.tsx](./src/components/routes/games/chess/ChessElo/__tests__/PerformanceTab.test.tsx)
│   │   │   │   │   │   │   └── [RatingTab.test.tsx](./src/components/routes/games/chess/ChessElo/__tests__/RatingTab.test.tsx)
│   │   │   │   │   │   ├── [PerformanceTab.tsx](./src/components/routes/games/chess/ChessElo/PerformanceTab.tsx)
│   │   │   │   │   │   ├── [RatingTab.tsx](./src/components/routes/games/chess/ChessElo/RatingTab.tsx)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/games/chess/ChessElo/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/games/chess/ChessElo/types.ts)
│   │   │   │   │   ├── ChessStats/
│   │   │   │   │   │   ├── components/
│   │   │   │   │   │   │   ├── [Analysis.tsx](./src/components/routes/games/chess/ChessStats/components/Analysis.tsx)
│   │   │   │   │   │   │   ├── [HistogramBar.tsx](./src/components/routes/games/chess/ChessStats/components/HistogramBar.tsx)
│   │   │   │   │   │   │   ├── [Percentile.tsx](./src/components/routes/games/chess/ChessStats/components/Percentile.tsx)
│   │   │   │   │   │   │   ├── [SearchBar.tsx](./src/components/routes/games/chess/ChessStats/components/SearchBar.tsx)
│   │   │   │   │   │   │   ├── [StatCard.tsx](./src/components/routes/games/chess/ChessStats/components/StatCard.tsx)
│   │   │   │   │   │   │   └── [TitleSection.tsx](./src/components/routes/games/chess/ChessStats/components/TitleSection.tsx)
│   │   │   │   │   │   ├── data/
│   │   │   │   │   │   │   └── [analysis.json](./src/components/routes/games/chess/ChessStats/data/analysis.json)
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   │   │   ├── [percentile.ts](./src/components/routes/games/chess/ChessStats/utils/percentile.ts)
│   │   │   │   │   │   │   └── [sql.ts](./src/components/routes/games/chess/ChessStats/utils/sql.ts)
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/games/chess/ChessStats/constants.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/games/chess/ChessStats/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/games/chess/ChessStats/types.ts)
│   │   │   │   │   └── __tests__/
│   │   │   │   │       └── [ChessClock.test.tsx](./src/components/routes/games/chess/__tests__/ChessClock.test.tsx)
│   │   │   │   ├── countries/
│   │   │   │   │   ├── Border/
│   │   │   │   │   │   ├── [borders.ts](./src/components/routes/games/countries/Border/borders.ts)
│   │   │   │   │   │   └── [index.tsx](./src/components/routes/games/countries/Border/index.tsx)
│   │   │   │   │   ├── Connection/
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/games/countries/Connection/index.tsx)
│   │   │   │   │   │   ├── [puzzles.ts](./src/components/routes/games/countries/Connection/puzzles.ts)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/games/countries/Connection/types.ts)
│   │   │   │   │   ├── ContinentsSort/
│   │   │   │   │   │   └── [index.tsx](./src/components/routes/games/countries/ContinentsSort/index.tsx)
│   │   │   │   │   ├── EmojiGuesser/
│   │   │   │   │   │   └── [index.tsx](./src/components/routes/games/countries/EmojiGuesser/index.tsx)
│   │   │   │   │   ├── FlagGuesser/
│   │   │   │   │   │   └── [index.tsx](./src/components/routes/games/countries/FlagGuesser/index.tsx)
│   │   │   │   │   └── HigherOrLower/
│   │   │   │   │       ├── [index.tsx](./src/components/routes/games/countries/HigherOrLower/index.tsx)
│   │   │   │   │       └── [population.ts](./src/components/routes/games/countries/HigherOrLower/population.ts)
│   │   │   │   ├── memory/
│   │   │   │   │   ├── MemoryMatch/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [MemoryMatch.test.tsx](./src/components/routes/games/memory/MemoryMatch/__tests__/MemoryMatch.test.tsx)
│   │   │   │   │   │   │   ├── [useMemoryMatch.test.ts](./src/components/routes/games/memory/MemoryMatch/__tests__/useMemoryMatch.test.ts)
│   │   │   │   │   │   │   └── [utils.test.ts](./src/components/routes/games/memory/MemoryMatch/__tests__/utils.test.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/games/memory/MemoryMatch/index.tsx)
│   │   │   │   │   │   ├── [useMemoryMatch.ts](./src/components/routes/games/memory/MemoryMatch/useMemoryMatch.ts)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/games/memory/MemoryMatch/utils.ts)
│   │   │   │   │   ├── NBack/
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/games/memory/NBack/constants.ts)
│   │   │   │   │   │   └── [index.tsx](./src/components/routes/games/memory/NBack/index.tsx)
│   │   │   │   │   ├── PiNumber/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [Pi.test.tsx](./src/components/routes/games/memory/PiNumber/__tests__/Pi.test.tsx)
│   │   │   │   │   │   │   └── [usePiGame.test.ts](./src/components/routes/games/memory/PiNumber/__tests__/usePiGame.test.ts)
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/games/memory/PiNumber/constants.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/games/memory/PiNumber/index.tsx)
│   │   │   │   │   │   ├── [keyHandlers.ts](./src/components/routes/games/memory/PiNumber/keyHandlers.ts)
│   │   │   │   │   │   └── [usePiGame.ts](./src/components/routes/games/memory/PiNumber/usePiGame.ts)
│   │   │   │   │   ├── Quizify/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [Quizify.test.tsx](./src/components/routes/games/memory/Quizify/__tests__/Quizify.test.tsx)
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [quiz.test.ts](./src/components/routes/games/memory/Quizify/utils/__tests__/quiz.test.ts)
│   │   │   │   │   │   │   └── [quiz.ts](./src/components/routes/games/memory/Quizify/utils/quiz.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/games/memory/Quizify/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/games/memory/Quizify/types.ts)
│   │   │   │   │   ├── Recall/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [Recall.test.tsx](./src/components/routes/games/memory/Recall/__tests__/Recall.test.tsx)
│   │   │   │   │   │   │   ├── [useHighStreak.test.ts](./src/components/routes/games/memory/Recall/__tests__/useHighStreak.test.ts)
│   │   │   │   │   │   │   └── [useRecall.test.ts](./src/components/routes/games/memory/Recall/__tests__/useRecall.test.ts)
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/games/memory/Recall/constants.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/games/memory/Recall/index.tsx)
│   │   │   │   │   │   ├── [useHighStreak.ts](./src/components/routes/games/memory/Recall/useHighStreak.ts)
│   │   │   │   │   │   └── [useRecall.ts](./src/components/routes/games/memory/Recall/useRecall.ts)
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   │   └── [Pi.test.tsx.snap](./src/components/routes/games/memory/__tests__/__snapshots__/Pi.test.tsx.snap)
│   │   │   │   │   │   ├── [Pi.test.tsx](./src/components/routes/games/memory/__tests__/Pi.test.tsx)
│   │   │   │   │   │   └── [Recall.test.tsx](./src/components/routes/games/memory/__tests__/Recall.test.tsx)
│   │   │   │   │   └── data/
│   │   │   │   │       └── [pi.ts](./src/components/routes/games/memory/data/pi.ts)
│   │   │   │   ├── nikoli/
│   │   │   │   │   ├── Fillomino/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [Fillomino.test.tsx](./src/components/routes/games/nikoli/Fillomino/__tests__/Fillomino.test.tsx)
│   │   │   │   │   │   │   ├── [useFillomino.test.ts](./src/components/routes/games/nikoli/Fillomino/__tests__/useFillomino.test.ts)
│   │   │   │   │   │   │   └── [utils.test.ts](./src/components/routes/games/nikoli/Fillomino/__tests__/utils.test.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/games/nikoli/Fillomino/index.tsx)
│   │   │   │   │   │   ├── [types.ts](./src/components/routes/games/nikoli/Fillomino/types.ts)
│   │   │   │   │   │   ├── [useFillomino.ts](./src/components/routes/games/nikoli/Fillomino/useFillomino.ts)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/games/nikoli/Fillomino/utils.ts)
│   │   │   │   │   ├── Heyawake/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [Heyawake.test.tsx](./src/components/routes/games/nikoli/Heyawake/__tests__/Heyawake.test.tsx)
│   │   │   │   │   │   │   ├── [useHeyawake.test.ts](./src/components/routes/games/nikoli/Heyawake/__tests__/useHeyawake.test.ts)
│   │   │   │   │   │   │   └── [utils.test.ts](./src/components/routes/games/nikoli/Heyawake/__tests__/utils.test.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/games/nikoli/Heyawake/index.tsx)
│   │   │   │   │   │   ├── [types.ts](./src/components/routes/games/nikoli/Heyawake/types.ts)
│   │   │   │   │   │   ├── [useHeyawake.ts](./src/components/routes/games/nikoli/Heyawake/useHeyawake.ts)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/games/nikoli/Heyawake/utils.ts)
│   │   │   │   │   ├── Masyu/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [Masyu.test.tsx](./src/components/routes/games/nikoli/Masyu/__tests__/Masyu.test.tsx)
│   │   │   │   │   │   │   ├── [useMasyu.test.ts](./src/components/routes/games/nikoli/Masyu/__tests__/useMasyu.test.ts)
│   │   │   │   │   │   │   └── [utils.test.ts](./src/components/routes/games/nikoli/Masyu/__tests__/utils.test.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/games/nikoli/Masyu/index.tsx)
│   │   │   │   │   │   ├── [types.ts](./src/components/routes/games/nikoli/Masyu/types.ts)
│   │   │   │   │   │   ├── [useMasyu.ts](./src/components/routes/games/nikoli/Masyu/useMasyu.ts)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/games/nikoli/Masyu/utils.ts)
│   │   │   │   │   ├── Norinori/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [Norinori.test.tsx](./src/components/routes/games/nikoli/Norinori/__tests__/Norinori.test.tsx)
│   │   │   │   │   │   │   ├── [useNorinori.test.ts](./src/components/routes/games/nikoli/Norinori/__tests__/useNorinori.test.ts)
│   │   │   │   │   │   │   └── [utils.test.ts](./src/components/routes/games/nikoli/Norinori/__tests__/utils.test.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/games/nikoli/Norinori/index.tsx)
│   │   │   │   │   │   ├── [types.ts](./src/components/routes/games/nikoli/Norinori/types.ts)
│   │   │   │   │   │   ├── [useNorinori.ts](./src/components/routes/games/nikoli/Norinori/useNorinori.ts)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/games/nikoli/Norinori/utils.ts)
│   │   │   │   │   ├── Nurikabe/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [Nurikabe.test.tsx](./src/components/routes/games/nikoli/Nurikabe/__tests__/Nurikabe.test.tsx)
│   │   │   │   │   │   │   ├── [useNurikabe.test.ts](./src/components/routes/games/nikoli/Nurikabe/__tests__/useNurikabe.test.ts)
│   │   │   │   │   │   │   └── [utils.test.ts](./src/components/routes/games/nikoli/Nurikabe/__tests__/utils.test.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/games/nikoli/Nurikabe/index.tsx)
│   │   │   │   │   │   ├── [types.ts](./src/components/routes/games/nikoli/Nurikabe/types.ts)
│   │   │   │   │   │   ├── [useNurikabe.ts](./src/components/routes/games/nikoli/Nurikabe/useNurikabe.ts)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/games/nikoli/Nurikabe/utils.ts)
│   │   │   │   │   ├── Shikaku/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [Shikaku.test.tsx](./src/components/routes/games/nikoli/Shikaku/__tests__/Shikaku.test.tsx)
│   │   │   │   │   │   │   ├── [useShikaku.test.ts](./src/components/routes/games/nikoli/Shikaku/__tests__/useShikaku.test.ts)
│   │   │   │   │   │   │   └── [utils.test.ts](./src/components/routes/games/nikoli/Shikaku/__tests__/utils.test.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/games/nikoli/Shikaku/index.tsx)
│   │   │   │   │   │   ├── [types.ts](./src/components/routes/games/nikoli/Shikaku/types.ts)
│   │   │   │   │   │   ├── [useShikaku.ts](./src/components/routes/games/nikoli/Shikaku/useShikaku.ts)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/games/nikoli/Shikaku/utils.ts)
│   │   │   │   │   ├── Sudoku/
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [sudoku.test.ts](./src/components/routes/games/nikoli/Sudoku/utils/__tests__/sudoku.test.ts)
│   │   │   │   │   │   │   └── [sudoku.ts](./src/components/routes/games/nikoli/Sudoku/utils/sudoku.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/games/nikoli/Sudoku/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/games/nikoli/Sudoku/types.ts)
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   │   └── [Sudoku.test.tsx.snap](./src/components/routes/games/nikoli/__tests__/__snapshots__/Sudoku.test.tsx.snap)
│   │   │   │   │   │   └── [Sudoku.test.tsx](./src/components/routes/games/nikoli/__tests__/Sudoku.test.tsx)
│   │   │   │   │   └── _shared/
│   │   │   │   │       ├── [GameInstructions.tsx](./src/components/routes/games/nikoli/_shared/GameInstructions.tsx)
│   │   │   │   │       └── [gameData.tsx](./src/components/routes/games/nikoli/_shared/gameData.tsx)
│   │   │   │   ├── puzzle/
│   │   │   │   │   ├── Game2048/
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [game.test.ts](./src/components/routes/games/puzzle/Game2048/utils/__tests__/game.test.ts)
│   │   │   │   │   │   │   └── [game.ts](./src/components/routes/games/puzzle/Game2048/utils/game.ts)
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/games/puzzle/Game2048/constants.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/games/puzzle/Game2048/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/games/puzzle/Game2048/types.ts)
│   │   │   │   │   ├── LightsOut/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [LightsOut.test.tsx](./src/components/routes/games/puzzle/LightsOut/__tests__/LightsOut.test.tsx)
│   │   │   │   │   │   │   ├── [useLightsOut.test.ts](./src/components/routes/games/puzzle/LightsOut/__tests__/useLightsOut.test.ts)
│   │   │   │   │   │   │   └── [utils.test.ts](./src/components/routes/games/puzzle/LightsOut/__tests__/utils.test.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/games/puzzle/LightsOut/index.tsx)
│   │   │   │   │   │   ├── [useLightsOut.ts](./src/components/routes/games/puzzle/LightsOut/useLightsOut.ts)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/games/puzzle/LightsOut/utils.ts)
│   │   │   │   │   ├── Maze/
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/games/puzzle/Maze/constants.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/games/puzzle/Maze/index.tsx)
│   │   │   │   │   │   ├── [maze.ts](./src/components/routes/games/puzzle/Maze/maze.ts)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/games/puzzle/Maze/types.ts)
│   │   │   │   │   ├── SlidingPuzzle/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   │   │   └── [SlidingPuzzle.test.tsx.snap](./src/components/routes/games/puzzle/SlidingPuzzle/__tests__/__snapshots__/SlidingPuzzle.test.tsx.snap)
│   │   │   │   │   │   │   ├── [SlidingPuzzle.test.tsx](./src/components/routes/games/puzzle/SlidingPuzzle/__tests__/SlidingPuzzle.test.tsx)
│   │   │   │   │   │   │   ├── [useSlidingPuzzle.test.ts](./src/components/routes/games/puzzle/SlidingPuzzle/__tests__/useSlidingPuzzle.test.ts)
│   │   │   │   │   │   │   └── [utils.test.ts](./src/components/routes/games/puzzle/SlidingPuzzle/__tests__/utils.test.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/games/puzzle/SlidingPuzzle/index.tsx)
│   │   │   │   │   │   ├── [useSlidingPuzzle.ts](./src/components/routes/games/puzzle/SlidingPuzzle/useSlidingPuzzle.ts)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/games/puzzle/SlidingPuzzle/utils.ts)
│   │   │   │   │   ├── Towers/
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [towers.test.ts](./src/components/routes/games/puzzle/Towers/utils/__tests__/towers.test.ts)
│   │   │   │   │   │   │   └── [towers.ts](./src/components/routes/games/puzzle/Towers/utils/towers.ts)
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/games/puzzle/Towers/constants.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/games/puzzle/Towers/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/games/puzzle/Towers/types.ts)
│   │   │   │   │   └── __tests__/
│   │   │   │   │       ├── __snapshots__/
│   │   │   │   │       │   ├── [Game2048.test.tsx.snap](./src/components/routes/games/puzzle/__tests__/__snapshots__/Game2048.test.tsx.snap)
│   │   │   │   │       │   └── [Towers.test.tsx.snap](./src/components/routes/games/puzzle/__tests__/__snapshots__/Towers.test.tsx.snap)
│   │   │   │   │       ├── [Game2048.test.tsx](./src/components/routes/games/puzzle/__tests__/Game2048.test.tsx)
│   │   │   │   │       └── [Towers.test.tsx](./src/components/routes/games/puzzle/__tests__/Towers.test.tsx)
│   │   │   │   ├── tic-tac-toe/
│   │   │   │   │   ├── Classic/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   │   │   └── [Classic.test.tsx.snap](./src/components/routes/games/tic-tac-toe/Classic/__tests__/__snapshots__/Classic.test.tsx.snap)
│   │   │   │   │   │   │   └── [Classic.test.tsx](./src/components/routes/games/tic-tac-toe/Classic/__tests__/Classic.test.tsx)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/games/tic-tac-toe/Classic/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/games/tic-tac-toe/Classic/utils.ts)
│   │   │   │   │   ├── Duck/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   │   │   └── [Duck.test.tsx.snap](./src/components/routes/games/tic-tac-toe/Duck/__tests__/__snapshots__/Duck.test.tsx.snap)
│   │   │   │   │   │   │   └── [Duck.test.tsx](./src/components/routes/games/tic-tac-toe/Duck/__tests__/Duck.test.tsx)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/games/tic-tac-toe/Duck/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/games/tic-tac-toe/Duck/utils.ts)
│   │   │   │   │   ├── Notakto/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   │   │   └── [Notakto.test.tsx.snap](./src/components/routes/games/tic-tac-toe/Notakto/__tests__/__snapshots__/Notakto.test.tsx.snap)
│   │   │   │   │   │   │   └── [Notakto.test.tsx](./src/components/routes/games/tic-tac-toe/Notakto/__tests__/Notakto.test.tsx)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/games/tic-tac-toe/Notakto/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/games/tic-tac-toe/Notakto/utils.ts)
│   │   │   │   │   ├── Reverse/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   │   │   └── [Reverse.test.tsx.snap](./src/components/routes/games/tic-tac-toe/Reverse/__tests__/__snapshots__/Reverse.test.tsx.snap)
│   │   │   │   │   │   │   └── [Reverse.test.tsx](./src/components/routes/games/tic-tac-toe/Reverse/__tests__/Reverse.test.tsx)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/games/tic-tac-toe/Reverse/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/games/tic-tac-toe/Reverse/utils.ts)
│   │   │   │   │   ├── T3/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   │   │   └── [TicTacToe.test.tsx.snap](./src/components/routes/games/tic-tac-toe/T3/__tests__/__snapshots__/TicTacToe.test.tsx.snap)
│   │   │   │   │   │   │   └── [TicTacToe.test.tsx](./src/components/routes/games/tic-tac-toe/T3/__tests__/TicTacToe.test.tsx)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/games/tic-tac-toe/T3/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/games/tic-tac-toe/T3/utils.ts)
│   │   │   │   │   └── Wild/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   ├── __snapshots__/
│   │   │   │   │       │   │   └── [Wild.test.tsx.snap](./src/components/routes/games/tic-tac-toe/Wild/__tests__/__snapshots__/Wild.test.tsx.snap)
│   │   │   │   │       │   └── [Wild.test.tsx](./src/components/routes/games/tic-tac-toe/Wild/__tests__/Wild.test.tsx)
│   │   │   │   │       ├── [index.tsx](./src/components/routes/games/tic-tac-toe/Wild/index.tsx)
│   │   │   │   │       └── [utils.ts](./src/components/routes/games/tic-tac-toe/Wild/utils.ts)
│   │   │   │   ├── trivia/
│   │   │   │   │   ├── Pokedex/
│   │   │   │   │   │   ├── components/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [PokemonDetail.test.tsx](./src/components/routes/games/trivia/Pokedex/components/__tests__/PokemonDetail.test.tsx)
│   │   │   │   │   │   │   └── [PokemonDetail.tsx](./src/components/routes/games/trivia/Pokedex/components/PokemonDetail.tsx)
│   │   │   │   │   │   ├── data/
│   │   │   │   │   │   │   └── [pokedex.ts](./src/components/routes/games/trivia/Pokedex/data/pokedex.ts)
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [search.test.ts](./src/components/routes/games/trivia/Pokedex/utils/__tests__/search.test.ts)
│   │   │   │   │   │   │   └── [search.ts](./src/components/routes/games/trivia/Pokedex/utils/search.ts)
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/games/trivia/Pokedex/constants.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/games/trivia/Pokedex/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/games/trivia/Pokedex/types.ts)
│   │   │   │   │   ├── PrisonerDilemma/
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [game.test.ts](./src/components/routes/games/trivia/PrisonerDilemma/utils/__tests__/game.test.ts)
│   │   │   │   │   │   │   └── [game.ts](./src/components/routes/games/trivia/PrisonerDilemma/utils/game.ts)
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/games/trivia/PrisonerDilemma/constants.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/games/trivia/PrisonerDilemma/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/games/trivia/PrisonerDilemma/types.ts)
│   │   │   │   │   ├── ThroughTheYears/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [engine.test.ts](./src/components/routes/games/trivia/ThroughTheYears/__tests__/engine.test.ts)
│   │   │   │   │   │   ├── components/
│   │   │   │   │   │   │   ├── [Card.tsx](./src/components/routes/games/trivia/ThroughTheYears/components/Card.tsx)
│   │   │   │   │   │   │   └── [Timeline.tsx](./src/components/routes/games/trivia/ThroughTheYears/components/Timeline.tsx)
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/games/trivia/ThroughTheYears/AGENTS.md)
│   │   │   │   │   │   ├── [engine.ts](./src/components/routes/games/trivia/ThroughTheYears/engine.ts)
│   │   │   │   │   │   ├── [events.ts](./src/components/routes/games/trivia/ThroughTheYears/events.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/games/trivia/ThroughTheYears/index.tsx)
│   │   │   │   │   │   ├── [store.ts](./src/components/routes/games/trivia/ThroughTheYears/store.ts)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/games/trivia/ThroughTheYears/types.ts)
│   │   │   │   │   └── __tests__/
│   │   │   │   │       ├── __snapshots__/
│   │   │   │   │       │   ├── [Pokedex.test.tsx.snap](./src/components/routes/games/trivia/__tests__/__snapshots__/Pokedex.test.tsx.snap)
│   │   │   │   │       │   └── [PrisonerDilemma.test.tsx.snap](./src/components/routes/games/trivia/__tests__/__snapshots__/PrisonerDilemma.test.tsx.snap)
│   │   │   │   │       ├── [Pokedex.test.tsx](./src/components/routes/games/trivia/__tests__/Pokedex.test.tsx)
│   │   │   │   │       └── [PrisonerDilemma.test.tsx](./src/components/routes/games/trivia/__tests__/PrisonerDilemma.test.tsx)
│   │   │   │   ├── word/
│   │   │   │   │   ├── Palindrome/
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [puzzle.test.ts](./src/components/routes/games/word/Palindrome/utils/__tests__/puzzle.test.ts)
│   │   │   │   │   │   │   └── [puzzle.ts](./src/components/routes/games/word/Palindrome/utils/puzzle.ts)
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/games/word/Palindrome/constants.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/games/word/Palindrome/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/games/word/Palindrome/types.ts)
│   │   │   │   │   ├── Typoglycemia/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [EditorTab.test.tsx](./src/components/routes/games/word/Typoglycemia/__tests__/EditorTab.test.tsx)
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [typoglycemia.test.ts](./src/components/routes/games/word/Typoglycemia/utils/__tests__/typoglycemia.test.ts)
│   │   │   │   │   │   │   └── [typoglycemia.ts](./src/components/routes/games/word/Typoglycemia/utils/typoglycemia.ts)
│   │   │   │   │   │   ├── [EditorTab.tsx](./src/components/routes/games/word/Typoglycemia/EditorTab.tsx)
│   │   │   │   │   │   ├── [ViewTab.tsx](./src/components/routes/games/word/Typoglycemia/ViewTab.tsx)
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/games/word/Typoglycemia/constants.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/games/word/Typoglycemia/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/games/word/Typoglycemia/types.ts)
│   │   │   │   │   ├── Wordle/
│   │   │   │   │   │   └── [index.tsx](./src/components/routes/games/word/Wordle/index.tsx)
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   │   ├── [Palindrome.test.tsx.snap](./src/components/routes/games/word/__tests__/__snapshots__/Palindrome.test.tsx.snap)
│   │   │   │   │   │   │   ├── [Typoglycemia.test.tsx.snap](./src/components/routes/games/word/__tests__/__snapshots__/Typoglycemia.test.tsx.snap)
│   │   │   │   │   │   │   └── [Wordle.test.tsx.snap](./src/components/routes/games/word/__tests__/__snapshots__/Wordle.test.tsx.snap)
│   │   │   │   │   │   ├── [Palindrome.test.tsx](./src/components/routes/games/word/__tests__/Palindrome.test.tsx)
│   │   │   │   │   │   ├── [Typoglycemia.test.tsx](./src/components/routes/games/word/__tests__/Typoglycemia.test.tsx)
│   │   │   │   │   │   └── [Wordle.test.tsx](./src/components/routes/games/word/__tests__/Wordle.test.tsx)
│   │   │   │   │   └── data/
│   │   │   │   │       └── [wordle.ts](./src/components/routes/games/word/data/wordle.ts)
│   │   │   │   ├── [AGENTS.md](./src/components/routes/games/AGENTS.md)
│   │   │   │   ├── [games-data.ts](./src/components/routes/games/games-data.ts)
│   │   │   │   └── [index.tsx](./src/components/routes/games/index.tsx)
│   │   │   ├── settings/
│   │   │   │   └── [index.tsx](./src/components/routes/settings/index.tsx)
│   │   │   ├── start/
│   │   │   │   ├── [bookmarks-data.ts](./src/components/routes/start/bookmarks-data.ts)
│   │   │   │   └── [index.tsx](./src/components/routes/start/index.tsx)
│   │   │   └── version/
│   │   │       └── [index.tsx](./src/components/routes/version/index.tsx)
│   │   └── templates/
│   │       ├── app/
│   │       │   ├── AppsStoreTemplate/
│   │       │   │   ├── __tests__/
│   │       │   │   │   ├── __snapshots__/
│   │       │   │   │   │   └── [AppsStoreTemplate.test.tsx.snap](./src/components/templates/app/AppsStoreTemplate/__tests__/__snapshots__/AppsStoreTemplate.test.tsx.snap)
│   │       │   │   │   └── [AppsStoreTemplate.test.tsx](./src/components/templates/app/AppsStoreTemplate/__tests__/AppsStoreTemplate.test.tsx)
│   │       │   │   ├── [AppsStoreTemplate.tsx](./src/components/templates/app/AppsStoreTemplate/AppsStoreTemplate.tsx)
│   │       │   │   └── [index.ts](./src/components/templates/app/AppsStoreTemplate/index.ts)
│   │       │   ├── DownloadsTemplate/
│   │       │   │   ├── __tests__/
│   │       │   │   │   ├── __snapshots__/
│   │       │   │   │   │   └── [DownloadsTemplate.test.tsx.snap](./src/components/templates/app/DownloadsTemplate/__tests__/__snapshots__/DownloadsTemplate.test.tsx.snap)
│   │       │   │   │   └── [DownloadsTemplate.test.tsx](./src/components/templates/app/DownloadsTemplate/__tests__/DownloadsTemplate.test.tsx)
│   │       │   │   ├── [AGENTS.md](./src/components/templates/app/DownloadsTemplate/AGENTS.md)
│   │       │   │   ├── [DownloadsTemplate.tsx](./src/components/templates/app/DownloadsTemplate/DownloadsTemplate.tsx)
│   │       │   │   └── [index.ts](./src/components/templates/app/DownloadsTemplate/index.ts)
│   │       │   ├── SettingsTemplate/
│   │       │   │   ├── [SettingsTemplate.tsx](./src/components/templates/app/SettingsTemplate/SettingsTemplate.tsx)
│   │       │   │   └── [index.ts](./src/components/templates/app/SettingsTemplate/index.ts)
│   │       │   └── VersionTemplate/
│   │       │       ├── __tests__/
│   │       │       │   ├── __snapshots__/
│   │       │       │   │   └── [VersionTemplate.test.tsx.snap](./src/components/templates/app/VersionTemplate/__tests__/__snapshots__/VersionTemplate.test.tsx.snap)
│   │       │       │   └── [VersionTemplate.test.tsx](./src/components/templates/app/VersionTemplate/__tests__/VersionTemplate.test.tsx)
│   │       │       ├── [VersionTemplate.tsx](./src/components/templates/app/VersionTemplate/VersionTemplate.tsx)
│   │       │       └── [index.ts](./src/components/templates/app/VersionTemplate/index.ts)
│   │       └── shared/
│   │           ├── ErrorTemplate/
│   │           │   ├── __tests__/
│   │           │   │   ├── __snapshots__/
│   │           │   │   │   └── [ErrorTemplate.test.tsx.snap](./src/components/templates/shared/ErrorTemplate/__tests__/__snapshots__/ErrorTemplate.test.tsx.snap)
│   │           │   │   └── [ErrorTemplate.test.tsx](./src/components/templates/shared/ErrorTemplate/__tests__/ErrorTemplate.test.tsx)
│   │           │   ├── [ErrorTemplate.tsx](./src/components/templates/shared/ErrorTemplate/ErrorTemplate.tsx)
│   │           │   └── [index.ts](./src/components/templates/shared/ErrorTemplate/index.ts)
│   │           └── HeadTemplate/
│   │               ├── [HeadTemplate.tsx](./src/components/templates/shared/HeadTemplate/HeadTemplate.tsx)
│   │               └── [index.ts](./src/components/templates/shared/HeadTemplate/index.ts)
│   ├── data/
│   │   ├── calendar/
│   │   │   ├── [events.ts](./src/data/calendar/events.ts)
│   │   │   ├── [months.ts](./src/data/calendar/months.ts)
│   │   │   └── [years.ts](./src/data/calendar/years.ts)
│   │   ├── chess/
│   │   │   └── [openings.ts](./src/data/chess/openings.ts)
│   │   ├── [blog.ts](./src/data/blog.ts)
│   │   ├── [countries.ts](./src/data/countries.ts)
│   │   ├── [currencies.ts](./src/data/currencies.ts)
│   │   ├── [models.ts](./src/data/models.ts)
│   │   ├── [periodic-table.ts](./src/data/periodic-table.ts)
│   │   ├── [timezones.ts](./src/data/timezones.ts)
│   │   └── [weather.ts](./src/data/weather.ts)
│   ├── examples/
│   │   └── [example.yaml](./src/examples/example.yaml)
│   ├── hooks/
│   │   └── [useSWRegister.ts](./src/hooks/useSWRegister.ts)
│   ├── json/
│   │   ├── inflation/
│   │   │   ├── [countries_currencies.json](./src/json/inflation/countries_currencies.json)
│   │   │   ├── [currencies.json](./src/json/inflation/currencies.json)
│   │   │   └── [history.json](./src/json/inflation/history.json)
│   │   ├── palindrome/
│   │   │   ├── [emordnilap.json](./src/json/palindrome/emordnilap.json)
│   │   │   └── [palindrome.json](./src/json/palindrome/palindrome.json)
│   │   ├── [currency.json](./src/json/currency.json)
│   │   └── [words.json](./src/json/words.json)
│   ├── markdown/
│   │   ├── [agents.md](./src/markdown/agents.md)
│   │   ├── [ai.md](./src/markdown/ai.md)
│   │   ├── [algorithms.md](./src/markdown/algorithms.md)
│   │   ├── [american-football.md](./src/markdown/american-football.md)
│   │   ├── [anime.md](./src/markdown/anime.md)
│   │   ├── [api.md](./src/markdown/api.md)
│   │   ├── [arts.md](./src/markdown/arts.md)
│   │   ├── [back-end.md](./src/markdown/back-end.md)
│   │   ├── [badminton.md](./src/markdown/badminton.md)
│   │   ├── [baseball.md](./src/markdown/baseball.md)
│   │   ├── [basketball.md](./src/markdown/basketball.md)
│   │   ├── [bicycling.md](./src/markdown/bicycling.md)
│   │   ├── [biology.md](./src/markdown/biology.md)
│   │   ├── [blockchain.md](./src/markdown/blockchain.md)
│   │   ├── [board-go.md](./src/markdown/board-go.md)
│   │   ├── [books.md](./src/markdown/books.md)
│   │   ├── [bored.md](./src/markdown/bored.md)
│   │   ├── [brain.md](./src/markdown/brain.md)
│   │   ├── [browsers.md](./src/markdown/browsers.md)
│   │   ├── [c.md](./src/markdown/c.md)
│   │   ├── [cars.md](./src/markdown/cars.md)
│   │   ├── [checker.md](./src/markdown/checker.md)
│   │   ├── [chemistry.md](./src/markdown/chemistry.md)
│   │   ├── [chess.md](./src/markdown/chess.md)
│   │   ├── [cities.md](./src/markdown/cities.md)
│   │   ├── [cli.md](./src/markdown/cli.md)
│   │   ├── [comics.md](./src/markdown/comics.md)
│   │   ├── [cricket.md](./src/markdown/cricket.md)
│   │   ├── [data-structures-and-algorithms.md](./src/markdown/data-structures-and-algorithms.md)
│   │   ├── [data-structures.md](./src/markdown/data-structures.md)
│   │   ├── [databases.md](./src/markdown/databases.md)
│   │   ├── [degrees.md](./src/markdown/degrees.md)
│   │   ├── [design.md](./src/markdown/design.md)
│   │   ├── [devices.md](./src/markdown/devices.md)
│   │   ├── [dota.md](./src/markdown/dota.md)
│   │   ├── [e-sports.md](./src/markdown/e-sports.md)
│   │   ├── [economics.md](./src/markdown/economics.md)
│   │   ├── [education.md](./src/markdown/education.md)
│   │   ├── [engineering.md](./src/markdown/engineering.md)
│   │   ├── [entertainment.md](./src/markdown/entertainment.md)
│   │   ├── [f&b.md](./src/markdown/f&b.md)
│   │   ├── [f1.md](./src/markdown/f1.md)
│   │   ├── [fields.md](./src/markdown/fields.md)
│   │   ├── [football.md](./src/markdown/football.md)
│   │   ├── [foss.md](./src/markdown/foss.md)
│   │   ├── [front-end.md](./src/markdown/front-end.md)
│   │   ├── [futsal.md](./src/markdown/futsal.md)
│   │   ├── [game-engines.md](./src/markdown/game-engines.md)
│   │   ├── [game-of-thrones.md](./src/markdown/game-of-thrones.md)
│   │   ├── [games.md](./src/markdown/games.md)
│   │   ├── [gaming-consoles.md](./src/markdown/gaming-consoles.md)
│   │   ├── [geography.md](./src/markdown/geography.md)
│   │   ├── [go.md](./src/markdown/go.md)
│   │   ├── [grammy.md](./src/markdown/grammy.md)
│   │   ├── [headphones.md](./src/markdown/headphones.md)
│   │   ├── [hosting.md](./src/markdown/hosting.md)
│   │   ├── [humanity-languages.md](./src/markdown/humanity-languages.md)
│   │   ├── [humanity.md](./src/markdown/humanity.md)
│   │   ├── [ide.md](./src/markdown/ide.md)
│   │   ├── [instruments.md](./src/markdown/instruments.md)
│   │   ├── [java.md](./src/markdown/java.md)
│   │   ├── [javascript.md](./src/markdown/javascript.md)
│   │   ├── [kotlin.md](./src/markdown/kotlin.md)
│   │   ├── [languages-languages.md](./src/markdown/languages-languages.md)
│   │   ├── [languages.md](./src/markdown/languages.md)
│   │   ├── [laptops.md](./src/markdown/laptops.md)
│   │   ├── [league-of-legends.md](./src/markdown/league-of-legends.md)
│   │   ├── [listening.md](./src/markdown/listening.md)
│   │   ├── [literature.md](./src/markdown/literature.md)
│   │   ├── [llm.md](./src/markdown/llm.md)
│   │   ├── [marathon.md](./src/markdown/marathon.md)
│   │   ├── [maslow-hierarchy.md](./src/markdown/maslow-hierarchy.md)
│   │   ├── [mathematics.md](./src/markdown/mathematics.md)
│   │   ├── [me.md](./src/markdown/me.md)
│   │   ├── [messaging.md](./src/markdown/messaging.md)
│   │   ├── [minimalism.md](./src/markdown/minimalism.md)
│   │   ├── [monday-fear.md](./src/markdown/monday-fear.md)
│   │   ├── [motorcycle.md](./src/markdown/motorcycle.md)
│   │   ├── [motorcycles.md](./src/markdown/motorcycles.md)
│   │   ├── [movies.md](./src/markdown/movies.md)
│   │   ├── [music.md](./src/markdown/music.md)
│   │   ├── [musical.md](./src/markdown/musical.md)
│   │   ├── [negative-thoughts.md](./src/markdown/negative-thoughts.md)
│   │   ├── [netball.md](./src/markdown/netball.md)
│   │   ├── [neuroscience.md](./src/markdown/neuroscience.md)
│   │   ├── [news.md](./src/markdown/news.md)
│   │   ├── [nobel.md](./src/markdown/nobel.md)
│   │   ├── [nothing.md](./src/markdown/nothing.md)
│   │   ├── [os.md](./src/markdown/os.md)
│   │   ├── [phones.md](./src/markdown/phones.md)
│   │   ├── [physics.md](./src/markdown/physics.md)
│   │   ├── [pickleball.md](./src/markdown/pickleball.md)
│   │   ├── [podcasts.md](./src/markdown/podcasts.md)
│   │   ├── [psychology.md](./src/markdown/psychology.md)
│   │   ├── [python.md](./src/markdown/python.md)
│   │   ├── [random-research.md](./src/markdown/random-research.md)
│   │   ├── [reading.md](./src/markdown/reading.md)
│   │   ├── [resolutions.md](./src/markdown/resolutions.md)
│   │   ├── [resume.md](./src/markdown/resume.md)
│   │   ├── [rugby.md](./src/markdown/rugby.md)
│   │   ├── [rust.md](./src/markdown/rust.md)
│   │   ├── [sample.md](./src/markdown/sample.md)
│   │   ├── [sciences.md](./src/markdown/sciences.md)
│   │   ├── [series.md](./src/markdown/series.md)
│   │   ├── [shogi.md](./src/markdown/shogi.md)
│   │   ├── [sports.md](./src/markdown/sports.md)
│   │   ├── [squash.md](./src/markdown/squash.md)
│   │   ├── [stem.md](./src/markdown/stem.md)
│   │   ├── [swift.md](./src/markdown/swift.md)
│   │   ├── [swimming.md](./src/markdown/swimming.md)
│   │   ├── [system-design.md](./src/markdown/system-design.md)
│   │   ├── [table-tennis.md](./src/markdown/table-tennis.md)
│   │   ├── [tablets.md](./src/markdown/tablets.md)
│   │   ├── [technology.md](./src/markdown/technology.md)
│   │   ├── [techstack.md](./src/markdown/techstack.md)
│   │   ├── [tennis.md](./src/markdown/tennis.md)
│   │   ├── [ui-components.md](./src/markdown/ui-components.md)
│   │   ├── [university.md](./src/markdown/university.md)
│   │   ├── [vehicles.md](./src/markdown/vehicles.md)
│   │   ├── [watches.md](./src/markdown/watches.md)
│   │   ├── [watching.md](./src/markdown/watching.md)
│   │   ├── [workspaces.md](./src/markdown/workspaces.md)
│   │   └── [xiangqi.md](./src/markdown/xiangqi.md)
│   ├── middlewares/
│   │   └── [rate-limit.ts](./src/middlewares/rate-limit.ts)
│   ├── pages/
│   │   ├── api/
│   │   │   └── rest/
│   │   │       └── [[endpoint].ts](./src/pages/api/rest/[endpoint].ts)
│   │   ├── md/
│   │   │   ├── [slug]/
│   │   │   │   └── [index.tsx](./src/pages/md/[slug]/index.tsx)
│   │   │   └── [index.tsx](./src/pages/md/index.tsx)
│   │   ├── [_app.tsx](./src/pages/_app.tsx)
│   │   ├── [_document.tsx](./src/pages/_document.tsx)
│   │   └── [_error.tsx](./src/pages/_error.tsx)
│   ├── server/
│   │   └── rest/
│   │       ├── handlers/
│   │       │   ├── metadata/
│   │       │   │   ├── [docs.ts](./src/server/rest/handlers/metadata/docs.ts)
│   │       │   │   ├── [health.ts](./src/server/rest/handlers/metadata/health.ts)
│   │       │   │   ├── [info.ts](./src/server/rest/handlers/metadata/info.ts)
│   │       │   │   ├── [status.ts](./src/server/rest/handlers/metadata/status.ts)
│   │       │   │   └── [version.ts](./src/server/rest/handlers/metadata/version.ts)
│   │       │   └── utils/
│   │       │       └── [proxy.ts](./src/server/rest/handlers/utils/proxy.ts)
│   │       ├── [index.ts](./src/server/rest/index.ts)
│   │       └── [types.ts](./src/server/rest/types.ts)
│   ├── services/
│   │   ├── wordsapi.com/
│   │   │   └── [wordsapi.client.ts](./src/services/wordsapi.com/wordsapi.client.ts)
│   │   └── yaml2pdfmake/
│   │       ├── [index.ts](./src/services/yaml2pdfmake/index.ts)
│   │       ├── [pdf.types.ts](./src/services/yaml2pdfmake/pdf.types.ts)
│   │       ├── [resume.types.ts](./src/services/yaml2pdfmake/resume.types.ts)
│   │       └── [yaml2pdfmake.service.ts](./src/services/yaml2pdfmake/yaml2pdfmake.service.ts)
│   ├── styles/
│   │   └── [globals.css](./src/styles/globals.css)
│   ├── utils/
│   │   └── [canvas.ts](./src/utils/canvas.ts)
│   └── [global.d.ts](./src/global.d.ts)
├── src-tauri/
│   ├── capabilities/
│   │   └── [default.json](./src-tauri/capabilities/default.json)
│   ├── icons/
│   │   ├── [128x128.png](./src-tauri/icons/128x128.png)
│   │   ├── [128x128@2x.png](./src-tauri/icons/128x128@2x.png)
│   │   ├── [32x32.png](./src-tauri/icons/32x32.png)
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
├── [LICENSE](./LICENSE)
├── [README.md](./README.md)
├── [TREE.md](./TREE.md)
├── [capacitor.config.ts](./capacitor.config.ts)
├── [eslint.config.mts](./eslint.config.mts)
├── [jest.config.ts](./jest.config.ts)
├── [jest.setup.ts](./jest.setup.ts)
├── [next.config.ts](./next.config.ts)
├── [package.json](./package.json)
├── [playwright.config.ts](./playwright.config.ts)
├── [postcss.config.mjs](./postcss.config.mjs)
└── [tsconfig.json](./tsconfig.json)
```

734 directories, 2632 files
