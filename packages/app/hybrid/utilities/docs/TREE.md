# TREE

```text
├── docs/
│   ├── [ARCHITECTURE.md](./docs/ARCHITECTURE.md)
│   ├── [CONTRIBUTING.md](./docs/CONTRIBUTING.md)
│   ├── [DOWNLOADS.md](./docs/DOWNLOADS.md)
│   ├── [PACKAGING.md](./docs/PACKAGING.md)
│   └── [ROADMAP.md](./docs/ROADMAP.md)
├── e2e/
│   └── [index.spec.ts](./e2e/index.spec.ts)
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
│   │   ├── [icon-16x16.png](./public/icons/icon-16x16.png)
│   │   ├── [icon-180x180.png](./public/icons/icon-180x180.png)
│   │   ├── [icon-192x192.png](./public/icons/icon-192x192.png)
│   │   ├── [icon-256x256.png](./public/icons/icon-256x256.png)
│   │   ├── [icon-32x32.png](./public/icons/icon-32x32.png)
│   │   ├── [icon-384x384.png](./public/icons/icon-384x384.png)
│   │   ├── [icon-48x48.png](./public/icons/icon-48x48.png)
│   │   ├── [icon-512x512.png](./public/icons/icon-512x512.png)
│   │   ├── [icon-512x512.svg](./public/icons/icon-512x512.svg)
│   │   ├── [icon-64x64.png](./public/icons/icon-64x64.png)
│   │   ├── [icon-72x72.png](./public/icons/icon-72x72.png)
│   │   ├── [icon-96x96.png](./public/icons/icon-96x96.png)
│   │   └── [icon.svg](./public/icons/icon.svg)
│   ├── models/
│   │   └── [invoice-parser.onnx](./public/models/invoice-parser.onnx)
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
│   ├── [bookmarks.ts](./scripts/bookmarks.ts)
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
│   │   │   │   │   ├── weird-search/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/bored/weird-search/page.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/bored/page.tsx)
│   │   │   │   ├── calculator/
│   │   │   │   │   ├── calculator/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/calculator/calculator/page.tsx)
│   │   │   │   │   ├── inflation/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/calculator/inflation/page.tsx)
│   │   │   │   │   ├── split-bill/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/calculator/split-bill/page.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/calculator/page.tsx)
│   │   │   │   ├── clocks/
│   │   │   │   │   ├── cron/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/clocks/cron/page.tsx)
│   │   │   │   │   ├── epoch-convert/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/clocks/epoch-convert/page.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/clocks/page.tsx)
│   │   │   │   ├── data-excel/
│   │   │   │   │   ├── excel-to-pdf/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/data-excel/excel-to-pdf/page.tsx)
│   │   │   │   │   ├── excel-to-xml/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/data-excel/excel-to-xml/page.tsx)
│   │   │   │   │   ├── split-excel/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/data-excel/split-excel/page.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/data-excel/page.tsx)
│   │   │   │   ├── data-xml/
│   │   │   │   │   ├── json-to-xml/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/data-xml/json-to-xml/page.tsx)
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
│   │   │   │   │   ├── slides/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/editors/slides/page.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/editors/page.tsx)
│   │   │   │   ├── education/
│   │   │   │   │   ├── doi/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/education/doi/page.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/education/page.tsx)
│   │   │   │   ├── puzzle/
│   │   │   │   │   ├── game2048/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/puzzle/game2048/page.tsx)
│   │   │   │   │   ├── lights-out/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/puzzle/lights-out/page.tsx)
│   │   │   │   │   ├── sliding-puzzle/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/puzzle/sliding-puzzle/page.tsx)
│   │   │   │   │   ├── towers/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/puzzle/towers/page.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/puzzle/page.tsx)
│   │   │   │   ├── trivia/
│   │   │   │   │   ├── palindrome/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/trivia/palindrome/page.tsx)
│   │   │   │   │   ├── pokedex/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/trivia/pokedex/page.tsx)
│   │   │   │   │   ├── quizify/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/trivia/quizify/page.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/trivia/page.tsx)
│   │   │   │   ├── utilities/
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
│   │   │   │   │   ├── legislation/
│   │   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/visualization/legislation/page.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(products)/apps/visualization/page.tsx)
│   │   │   │   └── [page.tsx](./src/app/(products)/apps/page.tsx)
│   │   │   └── downloads/
│   │   │       └── [page.tsx](./src/app/(products)/downloads/page.tsx)
│   │   ├── (system)/
│   │   │   ├── me/
│   │   │   │   └── [page.tsx](./src/app/(system)/me/page.tsx)
│   │   │   ├── settings/
│   │   │   │   └── [page.tsx](./src/app/(system)/settings/page.tsx)
│   │   │   └── version/
│   │   │       └── [page.tsx](./src/app/(system)/version/page.tsx)
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
│   │   ├── [template.tsx](./src/app/template.tsx)
│   │   └── [unauthorized.tsx](./src/app/unauthorized.tsx)
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
│   │   ├── layout/
│   │   │   └── [RootLayoutClient.tsx](./src/components/layout/RootLayoutClient.tsx)
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
│   │   │   │   │   └── TasksTab/
│   │   │   │   │       ├── [TaskInput.tsx](./src/components/organisms/layout/tabs/TasksTab/TaskInput.tsx)
│   │   │   │   │       ├── [TaskItem.tsx](./src/components/organisms/layout/tabs/TasksTab/TaskItem.tsx)
│   │   │   │   │       ├── [index.tsx](./src/components/organisms/layout/tabs/TasksTab/index.tsx)
│   │   │   │   │       └── [types.ts](./src/components/organisms/layout/tabs/TasksTab/types.ts)
│   │   │   │   ├── [Breadcrumb.tsx](./src/components/organisms/layout/Breadcrumb.tsx)
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
│   │   │   │   │   │   │   │   │   │   │   └── [2026-07-31-fri-brainbrow-explained.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/07/2026-07-31-fri-brainbrow-explained.yaml)
│   │   │   │   │   │   │   │   │   │   ├── 08/
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-08-01-sat-connectomics-explained.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/08/2026-08-01-sat-connectomics-explained.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-08-02-sun-eeg-explained.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/08/2026-08-02-sun-eeg-explained.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-08-03-mon-github-stacked-pr.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/08/2026-08-03-mon-github-stacked-pr.yaml)
│   │   │   │   │   │   │   │   │   │   │   ├── [2026-08-04-tue-markdown-files.yaml](./src/components/routes/apps/bored/Ship/posts/archive/2026/Q3/08/2026-08-04-tue-markdown-files.yaml)
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
│   │   │   │   │   │   │   │   │   ├── [brainbrow-explained.yaml](./src/components/routes/apps/bored/Ship/posts/next/computational-neuroscience/brainbrow-explained.yaml)
│   │   │   │   │   │   │   │   │   ├── [connectomics-explained.yaml](./src/components/routes/apps/bored/Ship/posts/next/computational-neuroscience/connectomics-explained.yaml)
│   │   │   │   │   │   │   │   │   ├── [core-cpu-vs-prefrontal-cortex.yaml](./src/components/routes/apps/bored/Ship/posts/next/computational-neuroscience/core-cpu-vs-prefrontal-cortex.yaml)
│   │   │   │   │   │   │   │   │   ├── [core-motherboard-vs-white-matter.yaml](./src/components/routes/apps/bored/Ship/posts/next/computational-neuroscience/core-motherboard-vs-white-matter.yaml)
│   │   │   │   │   │   │   │   │   ├── [core-ram-vs-working-memory.yaml](./src/components/routes/apps/bored/Ship/posts/next/computational-neuroscience/core-ram-vs-working-memory.yaml)
│   │   │   │   │   │   │   │   │   ├── [core-ssd-controller-vs-hippocampus.yaml](./src/components/routes/apps/bored/Ship/posts/next/computational-neuroscience/core-ssd-controller-vs-hippocampus.yaml)
│   │   │   │   │   │   │   │   │   ├── [core-ssd-storage-vs-long-term-memory.yaml](./src/components/routes/apps/bored/Ship/posts/next/computational-neuroscience/core-ssd-storage-vs-long-term-memory.yaml)
│   │   │   │   │   │   │   │   │   ├── [eeg-explained.yaml](./src/components/routes/apps/bored/Ship/posts/next/computational-neuroscience/eeg-explained.yaml)
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
│   │   │   │   │   │   │   │   │   ├── [hydration.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-interviews/hydration.yaml)
│   │   │   │   │   │   │   │   │   └── [markdown-files.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-interviews/markdown-files.yaml)
│   │   │   │   │   │   │   │   └── software-news/
│   │   │   │   │   │   │   │       ├── [bun-zig-to-rust.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-news/bun-zig-to-rust.yaml)
│   │   │   │   │   │   │   │       ├── [claude-google-leak.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-news/claude-google-leak.yaml)
│   │   │   │   │   │   │   │       ├── [github-stacked-pr.yaml](./src/components/routes/apps/bored/Ship/posts/next/software-news/github-stacked-pr.yaml)
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
│   │   │   │   │   ├── WeirdSearch/
│   │   │   │   │   │   ├── data/
│   │   │   │   │   │   │   ├── scripts/
│   │   │   │   │   │   │   │   └── [convert-txt-to-json.ts](./src/components/routes/apps/bored/WeirdSearch/data/scripts/convert-txt-to-json.ts)
│   │   │   │   │   │   │   ├── [constants.ts](./src/components/routes/apps/bored/WeirdSearch/data/constants.ts)
│   │   │   │   │   │   │   ├── [howToContent.ts](./src/components/routes/apps/bored/WeirdSearch/data/howToContent.ts)
│   │   │   │   │   │   │   ├── [queries.json](./src/components/routes/apps/bored/WeirdSearch/data/queries.json)
│   │   │   │   │   │   │   └── [queries.txt](./src/components/routes/apps/bored/WeirdSearch/data/queries.txt)
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/bored/WeirdSearch/AGENTS.md)
│   │   │   │   │   │   └── [index.tsx](./src/components/routes/apps/bored/WeirdSearch/index.tsx)
│   │   │   │   │   ├── _shared/
│   │   │   │   │   │   ├── components/
│   │   │   │   │   │   │   ├── [HowToModal.tsx](./src/components/routes/apps/bored/_shared/components/HowToModal.tsx)
│   │   │   │   │   │   │   ├── [ItemSelect.tsx](./src/components/routes/apps/bored/_shared/components/ItemSelect.tsx)
│   │   │   │   │   │   │   ├── [RecordSpin.tsx](./src/components/routes/apps/bored/_shared/components/RecordSpin.tsx)
│   │   │   │   │   │   │   └── [Reel.tsx](./src/components/routes/apps/bored/_shared/components/Reel.tsx)
│   │   │   │   │   │   ├── hooks/
│   │   │   │   │   │   │   ├── [useReelRecorder.ts](./src/components/routes/apps/bored/_shared/hooks/useReelRecorder.ts)
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
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/calculator/Calculator/AGENTS.md)
│   │   │   │   │   │   ├── [convert.ts](./src/components/routes/apps/calculator/Calculator/convert.ts)
│   │   │   │   │   │   └── [index.tsx](./src/components/routes/apps/calculator/Calculator/index.tsx)
│   │   │   │   │   ├── Inflation/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [Inflation.test.tsx](./src/components/routes/apps/calculator/Inflation/__tests__/Inflation.test.tsx)
│   │   │   │   │   │   │   ├── [calculate.test.ts](./src/components/routes/apps/calculator/Inflation/__tests__/calculate.test.ts)
│   │   │   │   │   │   │   └── [constants.test.ts](./src/components/routes/apps/calculator/Inflation/__tests__/constants.test.ts)
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   │   │   └── [calculate.ts](./src/components/routes/apps/calculator/Inflation/utils/calculate.ts)
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/calculator/Inflation/AGENTS.md)
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/apps/calculator/Inflation/constants.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/calculator/Inflation/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/apps/calculator/Inflation/types.ts)
│   │   │   │   │   └── SplitBill/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   ├── [SplitBill.test.tsx](./src/components/routes/apps/calculator/SplitBill/__tests__/SplitBill.test.tsx)
│   │   │   │   │       │   └── [calculate.test.ts](./src/components/routes/apps/calculator/SplitBill/__tests__/calculate.test.ts)
│   │   │   │   │       ├── utils/
│   │   │   │   │       │   └── [calculate.ts](./src/components/routes/apps/calculator/SplitBill/utils/calculate.ts)
│   │   │   │   │       ├── [AGENTS.md](./src/components/routes/apps/calculator/SplitBill/AGENTS.md)
│   │   │   │   │       ├── [constants.ts](./src/components/routes/apps/calculator/SplitBill/constants.ts)
│   │   │   │   │       ├── [index.tsx](./src/components/routes/apps/calculator/SplitBill/index.tsx)
│   │   │   │   │       └── [types.ts](./src/components/routes/apps/calculator/SplitBill/types.ts)
│   │   │   │   ├── clocks/
│   │   │   │   │   ├── Cron/
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [format.test.ts](./src/components/routes/apps/clocks/Cron/utils/__tests__/format.test.ts)
│   │   │   │   │   │   │   ├── [format.ts](./src/components/routes/apps/clocks/Cron/utils/format.ts)
│   │   │   │   │   │   │   └── [parser.ts](./src/components/routes/apps/clocks/Cron/utils/parser.ts)
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/clocks/Cron/AGENTS.md)
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/apps/clocks/Cron/constants.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/clocks/Cron/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/apps/clocks/Cron/types.ts)
│   │   │   │   │   ├── EpochConvert/
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/clocks/EpochConvert/AGENTS.md)
│   │   │   │   │   │   └── [index.tsx](./src/components/routes/apps/clocks/EpochConvert/index.tsx)
│   │   │   │   │   └── __tests__/
│   │   │   │   │       └── [Cron.test.tsx](./src/components/routes/apps/clocks/__tests__/Cron.test.tsx)
│   │   │   │   ├── data/
│   │   │   │   │   ├── scripts/
│   │   │   │   │   │   └── [convert-csv-to-json.ts](./src/components/routes/apps/data/scripts/convert-csv-to-json.ts)
│   │   │   │   │   ├── [apps.csv](./src/components/routes/apps/data/apps.csv)
│   │   │   │   │   ├── [apps.json](./src/components/routes/apps/data/apps.json)
│   │   │   │   │   └── [apps.ts](./src/components/routes/apps/data/apps.ts)
│   │   │   │   ├── data-excel/
│   │   │   │   │   ├── ExcelToPdf/
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/data-excel/ExcelToPdf/AGENTS.md)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/data-excel/ExcelToPdf/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/data-excel/ExcelToPdf/utils.ts)
│   │   │   │   │   ├── ExcelToXml/
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/data-excel/ExcelToXml/AGENTS.md)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/data-excel/ExcelToXml/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/data-excel/ExcelToXml/utils.ts)
│   │   │   │   │   ├── SplitExcel/
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/data-excel/SplitExcel/AGENTS.md)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/data-excel/SplitExcel/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/data-excel/SplitExcel/utils.ts)
│   │   │   │   │   └── __tests__/
│   │   │   │   │       ├── [ExcelToPdf.test.tsx](./src/components/routes/apps/data-excel/__tests__/ExcelToPdf.test.tsx)
│   │   │   │   │       ├── [ExcelToXml.test.tsx](./src/components/routes/apps/data-excel/__tests__/ExcelToXml.test.tsx)
│   │   │   │   │       └── [SplitExcel.test.tsx](./src/components/routes/apps/data-excel/__tests__/SplitExcel.test.tsx)
│   │   │   │   ├── data-xml/
│   │   │   │   │   ├── JsonToXml/
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/data-xml/JsonToXml/AGENTS.md)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/data-xml/JsonToXml/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/data-xml/JsonToXml/utils.ts)
│   │   │   │   │   ├── XmlToExcel/
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/data-xml/XmlToExcel/AGENTS.md)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/data-xml/XmlToExcel/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/data-xml/XmlToExcel/utils.ts)
│   │   │   │   │   ├── XmlToJson/
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/data-xml/XmlToJson/AGENTS.md)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/data-xml/XmlToJson/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/data-xml/XmlToJson/utils.ts)
│   │   │   │   │   └── __tests__/
│   │   │   │   │       ├── [JsonToXml.test.tsx](./src/components/routes/apps/data-xml/__tests__/JsonToXml.test.tsx)
│   │   │   │   │       ├── [XmlToExcel.test.tsx](./src/components/routes/apps/data-xml/__tests__/XmlToExcel.test.tsx)
│   │   │   │   │       ├── [XmlToJson.test.tsx](./src/components/routes/apps/data-xml/__tests__/XmlToJson.test.tsx)
│   │   │   │   │       └── [utils.test.ts](./src/components/routes/apps/data-xml/__tests__/utils.test.ts)
│   │   │   │   ├── developer/
│   │   │   │   │   ├── Figlet/
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [render.test.ts](./src/components/routes/apps/developer/Figlet/utils/__tests__/render.test.ts)
│   │   │   │   │   │   │   └── [render.ts](./src/components/routes/apps/developer/Figlet/utils/render.ts)
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/developer/Figlet/AGENTS.md)
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
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/developer/IP/AGENTS.md)
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
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/developer/OpenAPI2Postman/AGENTS.md)
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/apps/developer/OpenAPI2Postman/constants.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/developer/OpenAPI2Postman/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/apps/developer/OpenAPI2Postman/types.ts)
│   │   │   │   │   ├── Proxy/
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/developer/Proxy/AGENTS.md)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/developer/Proxy/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/developer/Proxy/utils.ts)
│   │   │   │   │   ├── ShopifyDetect/
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   ├── [detect.test.ts](./src/components/routes/apps/developer/ShopifyDetect/utils/__tests__/detect.test.ts)
│   │   │   │   │   │   │   │   └── [storage.test.ts](./src/components/routes/apps/developer/ShopifyDetect/utils/__tests__/storage.test.ts)
│   │   │   │   │   │   │   ├── [detect.ts](./src/components/routes/apps/developer/ShopifyDetect/utils/detect.ts)
│   │   │   │   │   │   │   └── [storage.ts](./src/components/routes/apps/developer/ShopifyDetect/utils/storage.ts)
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/developer/ShopifyDetect/AGENTS.md)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/developer/ShopifyDetect/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/apps/developer/ShopifyDetect/types.ts)
│   │   │   │   │   ├── TextDiff/
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/developer/TextDiff/AGENTS.md)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/developer/TextDiff/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/developer/TextDiff/utils.ts)
│   │   │   │   │   ├── TextUrlTracer/
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/developer/TextUrlTracer/AGENTS.md)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/developer/TextUrlTracer/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/developer/TextUrlTracer/utils.ts)
│   │   │   │   │   ├── UUID/
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/developer/UUID/AGENTS.md)
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
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/editors/JSONSchema/AGENTS.md)
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/apps/editors/JSONSchema/constants.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/editors/JSONSchema/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/apps/editors/JSONSchema/types.ts)
│   │   │   │   │   ├── Manifest/
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/editors/Manifest/AGENTS.md)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/editors/Manifest/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/editors/Manifest/utils.ts)
│   │   │   │   │   ├── Regex/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [Regex.test.tsx](./src/components/routes/apps/editors/Regex/__tests__/Regex.test.tsx)
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [regex.test.ts](./src/components/routes/apps/editors/Regex/utils/__tests__/regex.test.ts)
│   │   │   │   │   │   │   └── [regex.ts](./src/components/routes/apps/editors/Regex/utils/regex.ts)
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/editors/Regex/AGENTS.md)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/editors/Regex/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/apps/editors/Regex/types.ts)
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
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/editors/Slides/AGENTS.md)
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/apps/editors/Slides/constants.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/editors/Slides/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/apps/editors/Slides/types.ts)
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
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/education/DOI/AGENTS.md)
│   │   │   │   │   │   ├── [ReferenceCard.tsx](./src/components/routes/apps/education/DOI/ReferenceCard.tsx)
│   │   │   │   │   │   ├── [ReferenceTable.tsx](./src/components/routes/apps/education/DOI/ReferenceTable.tsx)
│   │   │   │   │   │   └── [index.tsx](./src/components/routes/apps/education/DOI/index.tsx)
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   │   └── [DOI.test.tsx.snap](./src/components/routes/apps/education/__tests__/__snapshots__/DOI.test.tsx.snap)
│   │   │   │   │   │   └── [DOI.test.tsx](./src/components/routes/apps/education/__tests__/DOI.test.tsx)
│   │   │   │   │   └── data/
│   │   │   │   │       └── [twinkle-twinkle-little-star.ts](./src/components/routes/apps/education/data/twinkle-twinkle-little-star.ts)
│   │   │   │   ├── puzzle/
│   │   │   │   │   ├── Game2048/
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [game.test.ts](./src/components/routes/apps/puzzle/Game2048/utils/__tests__/game.test.ts)
│   │   │   │   │   │   │   └── [game.ts](./src/components/routes/apps/puzzle/Game2048/utils/game.ts)
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/puzzle/Game2048/AGENTS.md)
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/apps/puzzle/Game2048/constants.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/puzzle/Game2048/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/apps/puzzle/Game2048/types.ts)
│   │   │   │   │   ├── LightsOut/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [LightsOut.test.tsx](./src/components/routes/apps/puzzle/LightsOut/__tests__/LightsOut.test.tsx)
│   │   │   │   │   │   │   ├── [useLightsOut.test.ts](./src/components/routes/apps/puzzle/LightsOut/__tests__/useLightsOut.test.ts)
│   │   │   │   │   │   │   └── [utils.test.ts](./src/components/routes/apps/puzzle/LightsOut/__tests__/utils.test.ts)
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/puzzle/LightsOut/AGENTS.md)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/puzzle/LightsOut/index.tsx)
│   │   │   │   │   │   ├── [useLightsOut.ts](./src/components/routes/apps/puzzle/LightsOut/useLightsOut.ts)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/puzzle/LightsOut/utils.ts)
│   │   │   │   │   ├── SlidingPuzzle/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   │   │   └── [SlidingPuzzle.test.tsx.snap](./src/components/routes/apps/puzzle/SlidingPuzzle/__tests__/__snapshots__/SlidingPuzzle.test.tsx.snap)
│   │   │   │   │   │   │   ├── [SlidingPuzzle.test.tsx](./src/components/routes/apps/puzzle/SlidingPuzzle/__tests__/SlidingPuzzle.test.tsx)
│   │   │   │   │   │   │   ├── [useSlidingPuzzle.test.ts](./src/components/routes/apps/puzzle/SlidingPuzzle/__tests__/useSlidingPuzzle.test.ts)
│   │   │   │   │   │   │   └── [utils.test.ts](./src/components/routes/apps/puzzle/SlidingPuzzle/__tests__/utils.test.ts)
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/puzzle/SlidingPuzzle/AGENTS.md)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/puzzle/SlidingPuzzle/index.tsx)
│   │   │   │   │   │   ├── [useSlidingPuzzle.ts](./src/components/routes/apps/puzzle/SlidingPuzzle/useSlidingPuzzle.ts)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/puzzle/SlidingPuzzle/utils.ts)
│   │   │   │   │   ├── Towers/
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [towers.test.ts](./src/components/routes/apps/puzzle/Towers/utils/__tests__/towers.test.ts)
│   │   │   │   │   │   │   └── [towers.ts](./src/components/routes/apps/puzzle/Towers/utils/towers.ts)
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/puzzle/Towers/AGENTS.md)
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/apps/puzzle/Towers/constants.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/puzzle/Towers/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/apps/puzzle/Towers/types.ts)
│   │   │   │   │   └── __tests__/
│   │   │   │   │       ├── __snapshots__/
│   │   │   │   │       │   ├── [Game2048.test.tsx.snap](./src/components/routes/apps/puzzle/__tests__/__snapshots__/Game2048.test.tsx.snap)
│   │   │   │   │       │   └── [Towers.test.tsx.snap](./src/components/routes/apps/puzzle/__tests__/__snapshots__/Towers.test.tsx.snap)
│   │   │   │   │       ├── [Game2048.test.tsx](./src/components/routes/apps/puzzle/__tests__/Game2048.test.tsx)
│   │   │   │   │       └── [Towers.test.tsx](./src/components/routes/apps/puzzle/__tests__/Towers.test.tsx)
│   │   │   │   ├── trivia/
│   │   │   │   │   ├── Palindrome/
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [puzzle.test.ts](./src/components/routes/apps/trivia/Palindrome/utils/__tests__/puzzle.test.ts)
│   │   │   │   │   │   │   └── [puzzle.ts](./src/components/routes/apps/trivia/Palindrome/utils/puzzle.ts)
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/trivia/Palindrome/AGENTS.md)
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/apps/trivia/Palindrome/constants.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/trivia/Palindrome/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/apps/trivia/Palindrome/types.ts)
│   │   │   │   │   ├── Pokedex/
│   │   │   │   │   │   ├── components/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [PokemonDetail.test.tsx](./src/components/routes/apps/trivia/Pokedex/components/__tests__/PokemonDetail.test.tsx)
│   │   │   │   │   │   │   └── [PokemonDetail.tsx](./src/components/routes/apps/trivia/Pokedex/components/PokemonDetail.tsx)
│   │   │   │   │   │   ├── data/
│   │   │   │   │   │   │   └── [pokedex.ts](./src/components/routes/apps/trivia/Pokedex/data/pokedex.ts)
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [search.test.ts](./src/components/routes/apps/trivia/Pokedex/utils/__tests__/search.test.ts)
│   │   │   │   │   │   │   └── [search.ts](./src/components/routes/apps/trivia/Pokedex/utils/search.ts)
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/trivia/Pokedex/AGENTS.md)
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/apps/trivia/Pokedex/constants.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/trivia/Pokedex/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/apps/trivia/Pokedex/types.ts)
│   │   │   │   │   ├── Quizify/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [Quizify.test.tsx](./src/components/routes/apps/trivia/Quizify/__tests__/Quizify.test.tsx)
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [quiz.test.ts](./src/components/routes/apps/trivia/Quizify/utils/__tests__/quiz.test.ts)
│   │   │   │   │   │   │   └── [quiz.ts](./src/components/routes/apps/trivia/Quizify/utils/quiz.ts)
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/trivia/Quizify/AGENTS.md)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/trivia/Quizify/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/apps/trivia/Quizify/types.ts)
│   │   │   │   │   └── __tests__/
│   │   │   │   │       ├── __snapshots__/
│   │   │   │   │       │   ├── [Palindrome.test.tsx.snap](./src/components/routes/apps/trivia/__tests__/__snapshots__/Palindrome.test.tsx.snap)
│   │   │   │   │       │   └── [Pokedex.test.tsx.snap](./src/components/routes/apps/trivia/__tests__/__snapshots__/Pokedex.test.tsx.snap)
│   │   │   │   │       ├── [Palindrome.test.tsx](./src/components/routes/apps/trivia/__tests__/Palindrome.test.tsx)
│   │   │   │   │       └── [Pokedex.test.tsx](./src/components/routes/apps/trivia/__tests__/Pokedex.test.tsx)
│   │   │   │   ├── utilities/
│   │   │   │   │   ├── CreateZip/
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/utilities/CreateZip/AGENTS.md)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/utilities/CreateZip/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/utilities/CreateZip/utils.ts)
│   │   │   │   │   ├── Emojis/
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/utilities/Emojis/AGENTS.md)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/utilities/Emojis/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/utilities/Emojis/utils.ts)
│   │   │   │   │   ├── Kaprekar/
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/utilities/Kaprekar/AGENTS.md)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/utilities/Kaprekar/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/utilities/Kaprekar/utils.ts)
│   │   │   │   │   ├── LoremIpsum/
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/utilities/LoremIpsum/AGENTS.md)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/utilities/LoremIpsum/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/utilities/LoremIpsum/utils.ts)
│   │   │   │   │   ├── NoSleep/
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/utilities/NoSleep/AGENTS.md)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/utilities/NoSleep/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./src/components/routes/apps/utilities/NoSleep/utils.ts)
│   │   │   │   │   ├── ScreenRecorder/
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/utilities/ScreenRecorder/AGENTS.md)
│   │   │   │   │   │   └── [index.tsx](./src/components/routes/apps/utilities/ScreenRecorder/index.tsx)
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   │   ├── [Emojis.test.tsx.snap](./src/components/routes/apps/utilities/__tests__/__snapshots__/Emojis.test.tsx.snap)
│   │   │   │   │   │   │   └── [Kaprekar.test.tsx.snap](./src/components/routes/apps/utilities/__tests__/__snapshots__/Kaprekar.test.tsx.snap)
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
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/visualization/Attractors/AGENTS.md)
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/apps/visualization/Attractors/constants.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/visualization/Attractors/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/apps/visualization/Attractors/types.ts)
│   │   │   │   │   ├── Legislation/
│   │   │   │   │   │   ├── components/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [Hemicycle.test.tsx](./src/components/routes/apps/visualization/Legislation/components/__tests__/Hemicycle.test.tsx)
│   │   │   │   │   │   │   └── [Hemicycle.tsx](./src/components/routes/apps/visualization/Legislation/components/Hemicycle.tsx)
│   │   │   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/visualization/Legislation/AGENTS.md)
│   │   │   │   │   │   ├── [constants.ts](./src/components/routes/apps/visualization/Legislation/constants.ts)
│   │   │   │   │   │   ├── [index.tsx](./src/components/routes/apps/visualization/Legislation/index.tsx)
│   │   │   │   │   │   └── [types.ts](./src/components/routes/apps/visualization/Legislation/types.ts)
│   │   │   │   │   └── __tests__/
│   │   │   │   │       └── [Legislation.test.tsx](./src/components/routes/apps/visualization/__tests__/Legislation.test.tsx)
│   │   │   │   ├── [AGENTS.md](./src/components/routes/apps/AGENTS.md)
│   │   │   │   └── [index.tsx](./src/components/routes/apps/index.tsx)
│   │   │   ├── downloads/
│   │   │   │   ├── data/
│   │   │   │   │   ├── scripts/
│   │   │   │   │   │   └── [convert-csv-to-json.ts](./src/components/routes/downloads/data/scripts/convert-csv-to-json.ts)
│   │   │   │   │   ├── [downloads.csv](./src/components/routes/downloads/data/downloads.csv)
│   │   │   │   │   ├── [downloads.json](./src/components/routes/downloads/data/downloads.json)
│   │   │   │   │   └── [downloads.ts](./src/components/routes/downloads/data/downloads.ts)
│   │   │   │   └── [index.tsx](./src/components/routes/downloads/index.tsx)
│   │   │   ├── resume/
│   │   │   │   ├── [Sections.tsx](./src/components/routes/resume/Sections.tsx)
│   │   │   │   ├── [data.ts](./src/components/routes/resume/data.ts)
│   │   │   │   ├── [index.tsx](./src/components/routes/resume/index.tsx)
│   │   │   │   ├── [periods.ts](./src/components/routes/resume/periods.ts)
│   │   │   │   └── [projects.ts](./src/components/routes/resume/projects.ts)
│   │   │   ├── settings/
│   │   │   │   └── [index.tsx](./src/components/routes/settings/index.tsx)
│   │   │   ├── start/
│   │   │   │   ├── data/
│   │   │   │   │   ├── scripts/
│   │   │   │   │   │   └── [convert-csv-to-json.ts](./src/components/routes/start/data/scripts/convert-csv-to-json.ts)
│   │   │   │   │   ├── [bookmarks.csv](./src/components/routes/start/data/bookmarks.csv)
│   │   │   │   │   ├── [bookmarks.json](./src/components/routes/start/data/bookmarks.json)
│   │   │   │   │   └── [bookmarks.ts](./src/components/routes/start/data/bookmarks.ts)
│   │   │   │   ├── [AGENTS.md](./src/components/routes/start/AGENTS.md)
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
│   ├── middlewares/
│   │   └── [rate-limit.ts](./src/middlewares/rate-limit.ts)
│   ├── services/
│   │   ├── wordsapi.com/
│   │   │   └── [wordsapi.client.ts](./src/services/wordsapi.com/wordsapi.client.ts)
│   │   └── yaml2pdfmake/
│   │       ├── [index.ts](./src/services/yaml2pdfmake/index.ts)
│   │       ├── [pdf.types.ts](./src/services/yaml2pdfmake/pdf.types.ts)
│   │       ├── [resume.types.ts](./src/services/yaml2pdfmake/resume.types.ts)
│   │       └── [yaml2pdfmake.service.ts](./src/services/yaml2pdfmake/yaml2pdfmake.service.ts)
│   ├── styles/
│   │   ├── [base.css](./src/styles/base.css)
│   │   ├── [globals.css](./src/styles/globals.css)
│   │   └── [themes.css](./src/styles/themes.css)
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

412 directories, 1665 files
