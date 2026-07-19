# TREE

```text
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
│   │   └── [icon-96x96.png](./public/icons/icon-96x96.png)
│   ├── models/
│   │   ├── [invoice-parser.onnx](./public/models/invoice-parser.onnx)
│   │   └── [sign-model.onnx](./public/models/sign-model.onnx)
│   ├── workers/
│   │   └── [pdf.worker.min.js](./public/workers/pdf.worker.min.js)
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
│   ├── clients/
│   │   ├── openrouter/
│   │   │   ├── [openrouter.client.ts](./src/clients/openrouter/openrouter.client.ts)
│   │   │   └── [openrouter.enums.ts](./src/clients/openrouter/openrouter.enums.ts)
│   │   └── wordsapi.com/
│   │       └── [wordsapi.client.ts](./src/clients/wordsapi.com/wordsapi.client.ts)
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── __tests__/
│   │   │   │   ├── __snapshots__/
│   │   │   │   │   ├── [BlogDate.test.tsx.snap](./src/components/atoms/__tests__/__snapshots__/BlogDate.test.tsx.snap)
│   │   │   │   │   ├── [ChatBubble.test.tsx.snap](./src/components/atoms/__tests__/__snapshots__/ChatBubble.test.tsx.snap)
│   │   │   │   │   ├── [ChatTimestamp.test.tsx.snap](./src/components/atoms/__tests__/__snapshots__/ChatTimestamp.test.tsx.snap)
│   │   │   │   │   └── [TagBadge.test.tsx.snap](./src/components/atoms/__tests__/__snapshots__/TagBadge.test.tsx.snap)
│   │   │   │   ├── [BlogDate.test.tsx](./src/components/atoms/__tests__/BlogDate.test.tsx)
│   │   │   │   ├── [ChatBubble.test.tsx](./src/components/atoms/__tests__/ChatBubble.test.tsx)
│   │   │   │   ├── [ChatTimestamp.test.tsx](./src/components/atoms/__tests__/ChatTimestamp.test.tsx)
│   │   │   │   └── [TagBadge.test.tsx](./src/components/atoms/__tests__/TagBadge.test.tsx)
│   │   │   ├── [BlogDate.tsx](./src/components/atoms/BlogDate.tsx)
│   │   │   ├── [ChatBubble.tsx](./src/components/atoms/ChatBubble.tsx)
│   │   │   ├── [ChatTimestamp.tsx](./src/components/atoms/ChatTimestamp.tsx)
│   │   │   ├── [ModalWrapper.tsx](./src/components/atoms/ModalWrapper.tsx)
│   │   │   ├── [TagBadge.tsx](./src/components/atoms/TagBadge.tsx)
│   │   │   └── [index.ts](./src/components/atoms/index.ts)
│   │   ├── molecules/
│   │   │   ├── __tests__/
│   │   │   │   ├── __snapshots__/
│   │   │   │   │   ├── [BlogCard.test.tsx.snap](./src/components/molecules/__tests__/__snapshots__/BlogCard.test.tsx.snap)
│   │   │   │   │   ├── [BlogCardList.test.tsx.snap](./src/components/molecules/__tests__/__snapshots__/BlogCardList.test.tsx.snap)
│   │   │   │   │   ├── [BlogSidebar.test.tsx.snap](./src/components/molecules/__tests__/__snapshots__/BlogSidebar.test.tsx.snap)
│   │   │   │   │   ├── [ChatInput.test.tsx.snap](./src/components/molecules/__tests__/__snapshots__/ChatInput.test.tsx.snap)
│   │   │   │   │   ├── [ChatMessageList.test.tsx.snap](./src/components/molecules/__tests__/__snapshots__/ChatMessageList.test.tsx.snap)
│   │   │   │   │   └── [ChatModelSelect.test.tsx.snap](./src/components/molecules/__tests__/__snapshots__/ChatModelSelect.test.tsx.snap)
│   │   │   │   ├── [BlogCard.test.tsx](./src/components/molecules/__tests__/BlogCard.test.tsx)
│   │   │   │   ├── [BlogCardList.test.tsx](./src/components/molecules/__tests__/BlogCardList.test.tsx)
│   │   │   │   ├── [BlogSidebar.test.tsx](./src/components/molecules/__tests__/BlogSidebar.test.tsx)
│   │   │   │   ├── [ChatInput.test.tsx](./src/components/molecules/__tests__/ChatInput.test.tsx)
│   │   │   │   ├── [ChatMessageList.test.tsx](./src/components/molecules/__tests__/ChatMessageList.test.tsx)
│   │   │   │   └── [ChatModelSelect.test.tsx](./src/components/molecules/__tests__/ChatModelSelect.test.tsx)
│   │   │   ├── [BlogCard.tsx](./src/components/molecules/BlogCard.tsx)
│   │   │   ├── [BlogCardList.tsx](./src/components/molecules/BlogCardList.tsx)
│   │   │   ├── [BlogSidebar.tsx](./src/components/molecules/BlogSidebar.tsx)
│   │   │   ├── [ChatInput.tsx](./src/components/molecules/ChatInput.tsx)
│   │   │   ├── [ChatMessageList.tsx](./src/components/molecules/ChatMessageList.tsx)
│   │   │   ├── [ChatModelSelect.tsx](./src/components/molecules/ChatModelSelect.tsx)
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
│   │   │   ├── chat/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   ├── [ChatFooter.test.tsx.snap](./src/components/organisms/chat/__tests__/__snapshots__/ChatFooter.test.tsx.snap)
│   │   │   │   │   │   ├── [ChatHeader.test.tsx.snap](./src/components/organisms/chat/__tests__/__snapshots__/ChatHeader.test.tsx.snap)
│   │   │   │   │   │   └── [ChatSidebar.test.tsx.snap](./src/components/organisms/chat/__tests__/__snapshots__/ChatSidebar.test.tsx.snap)
│   │   │   │   │   ├── [ChatFooter.test.tsx](./src/components/organisms/chat/__tests__/ChatFooter.test.tsx)
│   │   │   │   │   ├── [ChatHeader.test.tsx](./src/components/organisms/chat/__tests__/ChatHeader.test.tsx)
│   │   │   │   │   └── [ChatSidebar.test.tsx](./src/components/organisms/chat/__tests__/ChatSidebar.test.tsx)
│   │   │   │   ├── [ChatFooter.tsx](./src/components/organisms/chat/ChatFooter.tsx)
│   │   │   │   ├── [ChatHeader.tsx](./src/components/organisms/chat/ChatHeader.tsx)
│   │   │   │   └── [ChatSidebar.tsx](./src/components/organisms/chat/ChatSidebar.tsx)
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
│   │   ├── pages/
│   │   │   ├── attractors/
│   │   │   │   └── [Attractors.tsx](./src/components/pages/attractors/Attractors.tsx)
│   │   │   └── start/
│   │   │       ├── cards/
│   │   │       │   ├── __tests__/
│   │   │       │   │   ├── __snapshots__/
│   │   │       │   │   │   ├── [CityCard.test.tsx.snap](./src/components/pages/start/cards/__tests__/__snapshots__/CityCard.test.tsx.snap)
│   │   │       │   │   │   ├── [ItemCard.test.tsx.snap](./src/components/pages/start/cards/__tests__/__snapshots__/ItemCard.test.tsx.snap)
│   │   │       │   │   │   └── [ToolCard.test.tsx.snap](./src/components/pages/start/cards/__tests__/__snapshots__/ToolCard.test.tsx.snap)
│   │   │       │   │   ├── [CityCard.test.tsx](./src/components/pages/start/cards/__tests__/CityCard.test.tsx)
│   │   │       │   │   ├── [ItemCard.test.tsx](./src/components/pages/start/cards/__tests__/ItemCard.test.tsx)
│   │   │       │   │   └── [ToolCard.test.tsx](./src/components/pages/start/cards/__tests__/ToolCard.test.tsx)
│   │   │       │   ├── [CityCard.tsx](./src/components/pages/start/cards/CityCard.tsx)
│   │   │       │   ├── [ItemCard.tsx](./src/components/pages/start/cards/ItemCard.tsx)
│   │   │       │   └── [ToolCard.tsx](./src/components/pages/start/cards/ToolCard.tsx)
│   │   │       ├── modals/
│   │   │       │   ├── calculators/
│   │   │       │   │   ├── ConverterModal/
│   │   │       │   │   │   ├── tabs/
│   │   │       │   │   │   │   ├── math/
│   │   │       │   │   │   │   │   ├── [Angle.tsx](./src/components/pages/start/modals/calculators/ConverterModal/tabs/math/Angle.tsx)
│   │   │       │   │   │   │   │   ├── [Base.tsx](./src/components/pages/start/modals/calculators/ConverterModal/tabs/math/Base.tsx)
│   │   │       │   │   │   │   │   ├── [Data.tsx](./src/components/pages/start/modals/calculators/ConverterModal/tabs/math/Data.tsx)
│   │   │       │   │   │   │   │   └── [Roman.tsx](./src/components/pages/start/modals/calculators/ConverterModal/tabs/math/Roman.tsx)
│   │   │       │   │   │   │   └── physical/
│   │   │       │   │   │   │       ├── [Length.tsx](./src/components/pages/start/modals/calculators/ConverterModal/tabs/physical/Length.tsx)
│   │   │       │   │   │   │       ├── [Temperature.tsx](./src/components/pages/start/modals/calculators/ConverterModal/tabs/physical/Temperature.tsx)
│   │   │       │   │   │   │       ├── [Time.tsx](./src/components/pages/start/modals/calculators/ConverterModal/tabs/physical/Time.tsx)
│   │   │       │   │   │   │       └── [Weight.tsx](./src/components/pages/start/modals/calculators/ConverterModal/tabs/physical/Weight.tsx)
│   │   │       │   │   │   └── [index.tsx](./src/components/pages/start/modals/calculators/ConverterModal/index.tsx)
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── __snapshots__/
│   │   │       │   │   │   │   ├── [CalculatorModal.test.tsx.snap](./src/components/pages/start/modals/calculators/__tests__/__snapshots__/CalculatorModal.test.tsx.snap)
│   │   │       │   │   │   │   └── [ConverterModal.test.tsx.snap](./src/components/pages/start/modals/calculators/__tests__/__snapshots__/ConverterModal.test.tsx.snap)
│   │   │       │   │   │   ├── [CalculatorModal.test.tsx](./src/components/pages/start/modals/calculators/__tests__/CalculatorModal.test.tsx)
│   │   │       │   │   │   └── [ConverterModal.test.tsx](./src/components/pages/start/modals/calculators/__tests__/ConverterModal.test.tsx)
│   │   │       │   │   ├── [CalculatorModal.tsx](./src/components/pages/start/modals/calculators/CalculatorModal.tsx)
│   │   │       │   │   ├── [EloModal.tsx](./src/components/pages/start/modals/calculators/EloModal.tsx)
│   │   │       │   │   ├── [InflationModal.tsx](./src/components/pages/start/modals/calculators/InflationModal.tsx)
│   │   │       │   │   └── [TaxModal.tsx](./src/components/pages/start/modals/calculators/TaxModal.tsx)
│   │   │       │   ├── casino/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── __snapshots__/
│   │   │       │   │   │   │   ├── [Blackjack.test.tsx.snap](./src/components/pages/start/modals/casino/__tests__/__snapshots__/Blackjack.test.tsx.snap)
│   │   │       │   │   │   │   └── [PokerModal.test.tsx.snap](./src/components/pages/start/modals/casino/__tests__/__snapshots__/PokerModal.test.tsx.snap)
│   │   │       │   │   │   ├── [Blackjack.test.tsx](./src/components/pages/start/modals/casino/__tests__/Blackjack.test.tsx)
│   │   │       │   │   │   └── [PokerModal.test.tsx](./src/components/pages/start/modals/casino/__tests__/PokerModal.test.tsx)
│   │   │       │   │   ├── [BlackjackModal.tsx](./src/components/pages/start/modals/casino/BlackjackModal.tsx)
│   │   │       │   │   └── [PokerModal.tsx](./src/components/pages/start/modals/casino/PokerModal.tsx)
│   │   │       │   ├── clocks/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── __snapshots__/
│   │   │       │   │   │   │   ├── [ChessClockModal.test.tsx.snap](./src/components/pages/start/modals/clocks/__tests__/__snapshots__/ChessClockModal.test.tsx.snap)
│   │   │       │   │   │   │   ├── [CronModal.test.tsx.snap](./src/components/pages/start/modals/clocks/__tests__/__snapshots__/CronModal.test.tsx.snap)
│   │   │       │   │   │   │   └── [PomodoroModal.test.tsx.snap](./src/components/pages/start/modals/clocks/__tests__/__snapshots__/PomodoroModal.test.tsx.snap)
│   │   │       │   │   │   ├── [ChessClockModal.test.tsx](./src/components/pages/start/modals/clocks/__tests__/ChessClockModal.test.tsx)
│   │   │       │   │   │   ├── [CronModal.test.tsx](./src/components/pages/start/modals/clocks/__tests__/CronModal.test.tsx)
│   │   │       │   │   │   └── [PomodoroModal.test.tsx](./src/components/pages/start/modals/clocks/__tests__/PomodoroModal.test.tsx)
│   │   │       │   │   ├── [ChessClockModal.tsx](./src/components/pages/start/modals/clocks/ChessClockModal.tsx)
│   │   │       │   │   ├── [CountdownModal.tsx](./src/components/pages/start/modals/clocks/CountdownModal.tsx)
│   │   │       │   │   ├── [CronModal.tsx](./src/components/pages/start/modals/clocks/CronModal.tsx)
│   │   │       │   │   ├── [PomodoroModal.tsx](./src/components/pages/start/modals/clocks/PomodoroModal.tsx)
│   │   │       │   │   └── [WatchfaceModal.tsx](./src/components/pages/start/modals/clocks/WatchfaceModal.tsx)
│   │   │       │   ├── converters/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── __snapshots__/
│   │   │       │   │   │   │   ├── [BrailleModal.test.tsx.snap](./src/components/pages/start/modals/converters/__tests__/__snapshots__/BrailleModal.test.tsx.snap)
│   │   │       │   │   │   │   ├── [ColorsModal.test.tsx.snap](./src/components/pages/start/modals/converters/__tests__/__snapshots__/ColorsModal.test.tsx.snap)
│   │   │       │   │   │   │   ├── [MorseModal.test.tsx.snap](./src/components/pages/start/modals/converters/__tests__/__snapshots__/MorseModal.test.tsx.snap)
│   │   │       │   │   │   │   └── [OpenAPI2Postman.test.tsx.snap](./src/components/pages/start/modals/converters/__tests__/__snapshots__/OpenAPI2Postman.test.tsx.snap)
│   │   │       │   │   │   ├── [BrailleModal.test.tsx](./src/components/pages/start/modals/converters/__tests__/BrailleModal.test.tsx)
│   │   │       │   │   │   ├── [ColorsModal.test.tsx](./src/components/pages/start/modals/converters/__tests__/ColorsModal.test.tsx)
│   │   │       │   │   │   ├── [MorseModal.test.tsx](./src/components/pages/start/modals/converters/__tests__/MorseModal.test.tsx)
│   │   │       │   │   │   └── [OpenAPI2Postman.test.tsx](./src/components/pages/start/modals/converters/__tests__/OpenAPI2Postman.test.tsx)
│   │   │       │   │   ├── [BrailleModal.tsx](./src/components/pages/start/modals/converters/BrailleModal.tsx)
│   │   │       │   │   ├── [ColorsModal.tsx](./src/components/pages/start/modals/converters/ColorsModal.tsx)
│   │   │       │   │   ├── [LeetSpeakModal.tsx](./src/components/pages/start/modals/converters/LeetSpeakModal.tsx)
│   │   │       │   │   ├── [MorseModal.tsx](./src/components/pages/start/modals/converters/MorseModal.tsx)
│   │   │       │   │   └── [OpenAPI2Postman.tsx](./src/components/pages/start/modals/converters/OpenAPI2Postman.tsx)
│   │   │       │   ├── editors/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── __snapshots__/
│   │   │       │   │   │   │   ├── [JSONSchemaModal.test.tsx.snap](./src/components/pages/start/modals/editors/__tests__/__snapshots__/JSONSchemaModal.test.tsx.snap)
│   │   │       │   │   │   │   ├── [ManifestModal.test.tsx.snap](./src/components/pages/start/modals/editors/__tests__/__snapshots__/ManifestModal.test.tsx.snap)
│   │   │       │   │   │   │   └── [RedactModal.test.tsx.snap](./src/components/pages/start/modals/editors/__tests__/__snapshots__/RedactModal.test.tsx.snap)
│   │   │       │   │   │   ├── [JSONSchemaModal.test.tsx](./src/components/pages/start/modals/editors/__tests__/JSONSchemaModal.test.tsx)
│   │   │       │   │   │   ├── [ManifestModal.test.tsx](./src/components/pages/start/modals/editors/__tests__/ManifestModal.test.tsx)
│   │   │       │   │   │   └── [RedactModal.test.tsx](./src/components/pages/start/modals/editors/__tests__/RedactModal.test.tsx)
│   │   │       │   │   ├── [JSONSchemaModal.tsx](./src/components/pages/start/modals/editors/JSONSchemaModal.tsx)
│   │   │       │   │   ├── [ManifestModal.tsx](./src/components/pages/start/modals/editors/ManifestModal.tsx)
│   │   │       │   │   ├── [MarkdownModal.tsx](./src/components/pages/start/modals/editors/MarkdownModal.tsx)
│   │   │       │   │   ├── [RedactModal.tsx](./src/components/pages/start/modals/editors/RedactModal.tsx)
│   │   │       │   │   ├── [RegexModal.tsx](./src/components/pages/start/modals/editors/RegexModal.tsx)
│   │   │       │   │   ├── [ResumeModal.tsx](./src/components/pages/start/modals/editors/ResumeModal.tsx)
│   │   │       │   │   └── [SlidesModal.tsx](./src/components/pages/start/modals/editors/SlidesModal.tsx)
│   │   │       │   ├── education/
│   │   │       │   │   ├── academic/
│   │   │       │   │   │   ├── __tests__/
│   │   │       │   │   │   │   ├── __snapshots__/
│   │   │       │   │   │   │   │   └── [DOIModal.test.tsx.snap](./src/components/pages/start/modals/education/academic/__tests__/__snapshots__/DOIModal.test.tsx.snap)
│   │   │       │   │   │   │   └── [DOIModal.test.tsx](./src/components/pages/start/modals/education/academic/__tests__/DOIModal.test.tsx)
│   │   │       │   │   │   └── [DOIModal.tsx](./src/components/pages/start/modals/education/academic/DOIModal.tsx)
│   │   │       │   │   ├── chemistry/
│   │   │       │   │   │   ├── __tests__/
│   │   │       │   │   │   │   ├── __snapshots__/
│   │   │       │   │   │   │   │   └── [PeriodicTableModal.test.tsx.snap](./src/components/pages/start/modals/education/chemistry/__tests__/__snapshots__/PeriodicTableModal.test.tsx.snap)
│   │   │       │   │   │   │   └── [PeriodicTableModal.test.tsx](./src/components/pages/start/modals/education/chemistry/__tests__/PeriodicTableModal.test.tsx)
│   │   │       │   │   │   └── [PeriodicTableModal.tsx](./src/components/pages/start/modals/education/chemistry/PeriodicTableModal.tsx)
│   │   │       │   │   ├── languages/
│   │   │       │   │   │   ├── __tests__/
│   │   │       │   │   │   │   ├── __snapshots__/
│   │   │       │   │   │   │   │   └── [FlashcardsModal.test.tsx.snap](./src/components/pages/start/modals/education/languages/__tests__/__snapshots__/FlashcardsModal.test.tsx.snap)
│   │   │       │   │   │   │   └── [FlashcardsModal.test.tsx](./src/components/pages/start/modals/education/languages/__tests__/FlashcardsModal.test.tsx)
│   │   │       │   │   │   ├── [EnglishModal.tsx](./src/components/pages/start/modals/education/languages/EnglishModal.tsx)
│   │   │       │   │   │   ├── [FlashcardsModal.tsx](./src/components/pages/start/modals/education/languages/FlashcardsModal.tsx)
│   │   │       │   │   │   └── [SignModal.tsx](./src/components/pages/start/modals/education/languages/SignModal.tsx)
│   │   │       │   │   └── music/
│   │   │       │   │       ├── __tests__/
│   │   │       │   │       │   ├── __snapshots__/
│   │   │       │   │       │   │   └── [PitchModal.test.tsx.snap](./src/components/pages/start/modals/education/music/__tests__/__snapshots__/PitchModal.test.tsx.snap)
│   │   │       │   │       │   └── [PitchModal.test.tsx](./src/components/pages/start/modals/education/music/__tests__/PitchModal.test.tsx)
│   │   │       │   │       └── [PitchModal.tsx](./src/components/pages/start/modals/education/music/PitchModal.tsx)
│   │   │       │   ├── eyes/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── __snapshots__/
│   │   │       │   │   │   │   ├── [LogMARChartModal.test.tsx.snap](./src/components/pages/start/modals/eyes/__tests__/__snapshots__/LogMARChartModal.test.tsx.snap)
│   │   │       │   │   │   │   ├── [SnellenChartModal.test.tsx.snap](./src/components/pages/start/modals/eyes/__tests__/__snapshots__/SnellenChartModal.test.tsx.snap)
│   │   │       │   │   │   │   └── [TumblingEChartModal.test.tsx.snap](./src/components/pages/start/modals/eyes/__tests__/__snapshots__/TumblingEChartModal.test.tsx.snap)
│   │   │       │   │   │   ├── [LogMARChartModal.test.tsx](./src/components/pages/start/modals/eyes/__tests__/LogMARChartModal.test.tsx)
│   │   │       │   │   │   ├── [SnellenChartModal.test.tsx](./src/components/pages/start/modals/eyes/__tests__/SnellenChartModal.test.tsx)
│   │   │       │   │   │   └── [TumblingEChartModal.test.tsx](./src/components/pages/start/modals/eyes/__tests__/TumblingEChartModal.test.tsx)
│   │   │       │   │   ├── [LogMARChartModal.tsx](./src/components/pages/start/modals/eyes/LogMARChartModal.tsx)
│   │   │       │   │   ├── [SnellenChartModal.tsx](./src/components/pages/start/modals/eyes/SnellenChartModal.tsx)
│   │   │       │   │   └── [TumblingEChartModal.tsx](./src/components/pages/start/modals/eyes/TumblingEChartModal.tsx)
│   │   │       │   ├── games/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── __snapshots__/
│   │   │       │   │   │   │   ├── [Game2048Modal.test.tsx.snap](./src/components/pages/start/modals/games/__tests__/__snapshots__/Game2048Modal.test.tsx.snap)
│   │   │       │   │   │   │   ├── [PalindromeModal.test.tsx.snap](./src/components/pages/start/modals/games/__tests__/__snapshots__/PalindromeModal.test.tsx.snap)
│   │   │       │   │   │   │   ├── [Pokedex.test.tsx.snap](./src/components/pages/start/modals/games/__tests__/__snapshots__/Pokedex.test.tsx.snap)
│   │   │       │   │   │   │   ├── [PrisonerDilemmaModal.test.tsx.snap](./src/components/pages/start/modals/games/__tests__/__snapshots__/PrisonerDilemmaModal.test.tsx.snap)
│   │   │       │   │   │   │   ├── [RockPaperScissorsModal.test.tsx.snap](./src/components/pages/start/modals/games/__tests__/__snapshots__/RockPaperScissorsModal.test.tsx.snap)
│   │   │       │   │   │   │   ├── [SnakeModal.test.tsx.snap](./src/components/pages/start/modals/games/__tests__/__snapshots__/SnakeModal.test.tsx.snap)
│   │   │       │   │   │   │   ├── [SudokuModal.test.tsx.snap](./src/components/pages/start/modals/games/__tests__/__snapshots__/SudokuModal.test.tsx.snap)
│   │   │       │   │   │   │   ├── [T3Modal.test.tsx.snap](./src/components/pages/start/modals/games/__tests__/__snapshots__/T3Modal.test.tsx.snap)
│   │   │       │   │   │   │   ├── [TowersModal.test.tsx.snap](./src/components/pages/start/modals/games/__tests__/__snapshots__/TowersModal.test.tsx.snap)
│   │   │       │   │   │   │   ├── [TypoglycemiaModal.test.tsx.snap](./src/components/pages/start/modals/games/__tests__/__snapshots__/TypoglycemiaModal.test.tsx.snap)
│   │   │       │   │   │   │   └── [WordleModal.test.tsx.snap](./src/components/pages/start/modals/games/__tests__/__snapshots__/WordleModal.test.tsx.snap)
│   │   │       │   │   │   ├── [Game2048Modal.test.tsx](./src/components/pages/start/modals/games/__tests__/Game2048Modal.test.tsx)
│   │   │       │   │   │   ├── [PalindromeModal.test.tsx](./src/components/pages/start/modals/games/__tests__/PalindromeModal.test.tsx)
│   │   │       │   │   │   ├── [Pokedex.test.tsx](./src/components/pages/start/modals/games/__tests__/Pokedex.test.tsx)
│   │   │       │   │   │   ├── [PrisonerDilemmaModal.test.tsx](./src/components/pages/start/modals/games/__tests__/PrisonerDilemmaModal.test.tsx)
│   │   │       │   │   │   ├── [RockPaperScissorsModal.test.tsx](./src/components/pages/start/modals/games/__tests__/RockPaperScissorsModal.test.tsx)
│   │   │       │   │   │   ├── [SnakeModal.test.tsx](./src/components/pages/start/modals/games/__tests__/SnakeModal.test.tsx)
│   │   │       │   │   │   ├── [SudokuModal.test.tsx](./src/components/pages/start/modals/games/__tests__/SudokuModal.test.tsx)
│   │   │       │   │   │   ├── [T3Modal.test.tsx](./src/components/pages/start/modals/games/__tests__/T3Modal.test.tsx)
│   │   │       │   │   │   ├── [TowersModal.test.tsx](./src/components/pages/start/modals/games/__tests__/TowersModal.test.tsx)
│   │   │       │   │   │   ├── [TypoglycemiaModal.test.tsx](./src/components/pages/start/modals/games/__tests__/TypoglycemiaModal.test.tsx)
│   │   │       │   │   │   └── [WordleModal.test.tsx](./src/components/pages/start/modals/games/__tests__/WordleModal.test.tsx)
│   │   │       │   │   ├── [Game2048Modal.tsx](./src/components/pages/start/modals/games/Game2048Modal.tsx)
│   │   │       │   │   ├── [PalindromeModal.tsx](./src/components/pages/start/modals/games/PalindromeModal.tsx)
│   │   │       │   │   ├── [PokedexModal.tsx](./src/components/pages/start/modals/games/PokedexModal.tsx)
│   │   │       │   │   ├── [PrisonerDilemmaModal.tsx](./src/components/pages/start/modals/games/PrisonerDilemmaModal.tsx)
│   │   │       │   │   ├── [RockPaperScissorsModal.tsx](./src/components/pages/start/modals/games/RockPaperScissorsModal.tsx)
│   │   │       │   │   ├── [SnakeModal.tsx](./src/components/pages/start/modals/games/SnakeModal.tsx)
│   │   │       │   │   ├── [SudokuModal.tsx](./src/components/pages/start/modals/games/SudokuModal.tsx)
│   │   │       │   │   ├── [T3Modal.tsx](./src/components/pages/start/modals/games/T3Modal.tsx)
│   │   │       │   │   ├── [TowersModal.tsx](./src/components/pages/start/modals/games/TowersModal.tsx)
│   │   │       │   │   ├── [TypoglycemiaModal.tsx](./src/components/pages/start/modals/games/TypoglycemiaModal.tsx)
│   │   │       │   │   └── [WordleModal.tsx](./src/components/pages/start/modals/games/WordleModal.tsx)
│   │   │       │   ├── images/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── __snapshots__/
│   │   │       │   │   │   │   ├── [BreakingBadModal.test.tsx.snap](./src/components/pages/start/modals/images/__tests__/__snapshots__/BreakingBadModal.test.tsx.snap)
│   │   │       │   │   │   │   ├── [CameraModal.test.tsx.snap](./src/components/pages/start/modals/images/__tests__/__snapshots__/CameraModal.test.tsx.snap)
│   │   │       │   │   │   │   ├── [GitHubSocialPreviewModal.test.tsx.snap](./src/components/pages/start/modals/images/__tests__/__snapshots__/GitHubSocialPreviewModal.test.tsx.snap)
│   │   │       │   │   │   │   ├── [HouseModal.test.tsx.snap](./src/components/pages/start/modals/images/__tests__/__snapshots__/HouseModal.test.tsx.snap)
│   │   │       │   │   │   │   ├── [InstaSizeModal.test.tsx.snap](./src/components/pages/start/modals/images/__tests__/__snapshots__/InstaSizeModal.test.tsx.snap)
│   │   │       │   │   │   │   ├── [QRCodeModal.test.tsx.snap](./src/components/pages/start/modals/images/__tests__/__snapshots__/QRCodeModal.test.tsx.snap)
│   │   │       │   │   │   │   └── [YouTubeThumbnails.test.tsx.snap](./src/components/pages/start/modals/images/__tests__/__snapshots__/YouTubeThumbnails.test.tsx.snap)
│   │   │       │   │   │   ├── [BreakingBadModal.test.tsx](./src/components/pages/start/modals/images/__tests__/BreakingBadModal.test.tsx)
│   │   │       │   │   │   ├── [CameraModal.test.tsx](./src/components/pages/start/modals/images/__tests__/CameraModal.test.tsx)
│   │   │       │   │   │   ├── [GitHubSocialPreviewModal.test.tsx](./src/components/pages/start/modals/images/__tests__/GitHubSocialPreviewModal.test.tsx)
│   │   │       │   │   │   ├── [HouseModal.test.tsx](./src/components/pages/start/modals/images/__tests__/HouseModal.test.tsx)
│   │   │       │   │   │   ├── [InstaSizeModal.test.tsx](./src/components/pages/start/modals/images/__tests__/InstaSizeModal.test.tsx)
│   │   │       │   │   │   ├── [QRCodeModal.test.tsx](./src/components/pages/start/modals/images/__tests__/QRCodeModal.test.tsx)
│   │   │       │   │   │   └── [YouTubeThumbnails.test.tsx](./src/components/pages/start/modals/images/__tests__/YouTubeThumbnails.test.tsx)
│   │   │       │   │   ├── [BreakingBadModal.tsx](./src/components/pages/start/modals/images/BreakingBadModal.tsx)
│   │   │       │   │   ├── [CameraModal.tsx](./src/components/pages/start/modals/images/CameraModal.tsx)
│   │   │       │   │   ├── [GitHubSocialPreviewModal.tsx](./src/components/pages/start/modals/images/GitHubSocialPreviewModal.tsx)
│   │   │       │   │   ├── [HouseModal.tsx](./src/components/pages/start/modals/images/HouseModal.tsx)
│   │   │       │   │   ├── [InstaSizeModal.tsx](./src/components/pages/start/modals/images/InstaSizeModal.tsx)
│   │   │       │   │   ├── [InvoiceParserModal.tsx](./src/components/pages/start/modals/images/InvoiceParserModal.tsx)
│   │   │       │   │   ├── [QRCodeModal.tsx](./src/components/pages/start/modals/images/QRCodeModal.tsx)
│   │   │       │   │   └── [YouTubeThumbnailsModal.tsx](./src/components/pages/start/modals/images/YouTubeThumbnailsModal.tsx)
│   │   │       │   ├── memory/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── __snapshots__/
│   │   │       │   │   │   │   ├── [PiModal.test.tsx.snap](./src/components/pages/start/modals/memory/__tests__/__snapshots__/PiModal.test.tsx.snap)
│   │   │       │   │   │   │   └── [RecallModal.test.tsx.snap](./src/components/pages/start/modals/memory/__tests__/__snapshots__/RecallModal.test.tsx.snap)
│   │   │       │   │   │   ├── [PiModal.test.tsx](./src/components/pages/start/modals/memory/__tests__/PiModal.test.tsx)
│   │   │       │   │   │   └── [RecallModal.test.tsx](./src/components/pages/start/modals/memory/__tests__/RecallModal.test.tsx)
│   │   │       │   │   ├── [PiNumberModal.tsx](./src/components/pages/start/modals/memory/PiNumberModal.tsx)
│   │   │       │   │   ├── [QuizifyModal.tsx](./src/components/pages/start/modals/memory/QuizifyModal.tsx)
│   │   │       │   │   └── [RecallModal.tsx](./src/components/pages/start/modals/memory/RecallModal.tsx)
│   │   │       │   ├── tools/
│   │   │       │   │   ├── ChatModal/
│   │   │       │   │   │   ├── [ChatCounter.tsx](./src/components/pages/start/modals/tools/ChatModal/ChatCounter.tsx)
│   │   │       │   │   │   ├── [ChatMessages.tsx](./src/components/pages/start/modals/tools/ChatModal/ChatMessages.tsx)
│   │   │       │   │   │   ├── [ChatModal.tsx](./src/components/pages/start/modals/tools/ChatModal/ChatModal.tsx)
│   │   │       │   │   │   ├── [ChatModels.tsx](./src/components/pages/start/modals/tools/ChatModal/ChatModels.tsx)
│   │   │       │   │   │   └── [index.ts](./src/components/pages/start/modals/tools/ChatModal/index.ts)
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── __snapshots__/
│   │   │       │   │   │   │   ├── [EmojisModal.test.tsx.snap](./src/components/pages/start/modals/tools/__tests__/__snapshots__/EmojisModal.test.tsx.snap)
│   │   │       │   │   │   │   ├── [FigletModal.test.tsx.snap](./src/components/pages/start/modals/tools/__tests__/__snapshots__/FigletModal.test.tsx.snap)
│   │   │       │   │   │   │   ├── [IPModal.test.tsx.snap](./src/components/pages/start/modals/tools/__tests__/__snapshots__/IPModal.test.tsx.snap)
│   │   │       │   │   │   │   ├── [KaprekarModal.test.tsx.snap](./src/components/pages/start/modals/tools/__tests__/__snapshots__/KaprekarModal.test.tsx.snap)
│   │   │       │   │   │   │   ├── [ProxyModal.test.tsx.snap](./src/components/pages/start/modals/tools/__tests__/__snapshots__/ProxyModal.test.tsx.snap)
│   │   │       │   │   │   │   └── [UUIDModal.test.tsx.snap](./src/components/pages/start/modals/tools/__tests__/__snapshots__/UUIDModal.test.tsx.snap)
│   │   │       │   │   │   ├── [EmojisModal.test.tsx](./src/components/pages/start/modals/tools/__tests__/EmojisModal.test.tsx)
│   │   │       │   │   │   ├── [FigletModal.test.tsx](./src/components/pages/start/modals/tools/__tests__/FigletModal.test.tsx)
│   │   │       │   │   │   ├── [IPModal.test.tsx](./src/components/pages/start/modals/tools/__tests__/IPModal.test.tsx)
│   │   │       │   │   │   ├── [KaprekarModal.test.tsx](./src/components/pages/start/modals/tools/__tests__/KaprekarModal.test.tsx)
│   │   │       │   │   │   ├── [ProxyModal.test.tsx](./src/components/pages/start/modals/tools/__tests__/ProxyModal.test.tsx)
│   │   │       │   │   │   └── [UUIDModal.test.tsx](./src/components/pages/start/modals/tools/__tests__/UUIDModal.test.tsx)
│   │   │       │   │   ├── [ClipboardModal.tsx](./src/components/pages/start/modals/tools/ClipboardModal.tsx)
│   │   │       │   │   ├── [EmojisModal.tsx](./src/components/pages/start/modals/tools/EmojisModal.tsx)
│   │   │       │   │   ├── [FigletModal.tsx](./src/components/pages/start/modals/tools/FigletModal.tsx)
│   │   │       │   │   ├── [IPModal.tsx](./src/components/pages/start/modals/tools/IPModal.tsx)
│   │   │       │   │   ├── [KaprekarModal.tsx](./src/components/pages/start/modals/tools/KaprekarModal.tsx)
│   │   │       │   │   ├── [NoSleepModal.tsx](./src/components/pages/start/modals/tools/NoSleepModal.tsx)
│   │   │       │   │   ├── [ProxyModal.tsx](./src/components/pages/start/modals/tools/ProxyModal.tsx)
│   │   │       │   │   ├── [SVGModal.tsx](./src/components/pages/start/modals/tools/SVGModal.tsx)
│   │   │       │   │   ├── [SheetsModal.tsx](./src/components/pages/start/modals/tools/SheetsModal.tsx)
│   │   │       │   │   ├── [ShopifyDetectModal.tsx](./src/components/pages/start/modals/tools/ShopifyDetectModal.tsx)
│   │   │       │   │   └── [UUIDModal.tsx](./src/components/pages/start/modals/tools/UUIDModal.tsx)
│   │   │       │   └── visualization/
│   │   │       │       ├── __tests__/
│   │   │       │       │   ├── __snapshots__/
│   │   │       │       │   │   ├── [LegislationModal.test.tsx.snap](./src/components/pages/start/modals/visualization/__tests__/__snapshots__/LegislationModal.test.tsx.snap)
│   │   │       │       │   │   └── [ResumeTimelineModal.test.tsx.snap](./src/components/pages/start/modals/visualization/__tests__/__snapshots__/ResumeTimelineModal.test.tsx.snap)
│   │   │       │       │   ├── [LegislationModal.test.tsx](./src/components/pages/start/modals/visualization/__tests__/LegislationModal.test.tsx)
│   │   │       │       │   └── [ResumeTimelineModal.test.tsx](./src/components/pages/start/modals/visualization/__tests__/ResumeTimelineModal.test.tsx)
│   │   │       │       ├── [CalendarTracker.tsx](./src/components/pages/start/modals/visualization/CalendarTracker.tsx)
│   │   │       │       ├── [LegislationModal.tsx](./src/components/pages/start/modals/visualization/LegislationModal.tsx)
│   │   │       │       └── [ResumeTimelineModal.tsx](./src/components/pages/start/modals/visualization/ResumeTimelineModal.tsx)
│   │   │       ├── sidebars/
│   │   │       │   ├── LeftSidebar/
│   │   │       │   │   ├── tabs/
│   │   │       │   │   │   ├── __tests__/
│   │   │       │   │   │   │   ├── __snapshots__/
│   │   │       │   │   │   │   │   └── [StatusTab.test.tsx.snap](./src/components/pages/start/sidebars/LeftSidebar/tabs/__tests__/__snapshots__/StatusTab.test.tsx.snap)
│   │   │       │   │   │   │   └── [StatusTab.test.tsx](./src/components/pages/start/sidebars/LeftSidebar/tabs/__tests__/StatusTab.test.tsx)
│   │   │       │   │   │   ├── [StatusTab.tsx](./src/components/pages/start/sidebars/LeftSidebar/tabs/StatusTab.tsx)
│   │   │       │   │   │   ├── [TasksTab.tsx](./src/components/pages/start/sidebars/LeftSidebar/tabs/TasksTab.tsx)
│   │   │       │   │   │   └── [TimeTab.tsx](./src/components/pages/start/sidebars/LeftSidebar/tabs/TimeTab.tsx)
│   │   │       │   │   └── [index.tsx](./src/components/pages/start/sidebars/LeftSidebar/index.tsx)
│   │   │       │   └── RightSidebar/
│   │   │       │       ├── tabs/
│   │   │       │       │   ├── __tests__/
│   │   │       │       │   │   ├── __snapshots__/
│   │   │       │       │   │   │   ├── [CurrencyTab.test.tsx.snap](./src/components/pages/start/sidebars/RightSidebar/tabs/__tests__/__snapshots__/CurrencyTab.test.tsx.snap)
│   │   │       │       │   │   │   └── [PassportTab.test.tsx.snap](./src/components/pages/start/sidebars/RightSidebar/tabs/__tests__/__snapshots__/PassportTab.test.tsx.snap)
│   │   │       │       │   │   ├── [CurrencyTab.test.tsx](./src/components/pages/start/sidebars/RightSidebar/tabs/__tests__/CurrencyTab.test.tsx)
│   │   │       │       │   │   └── [PassportTab.test.tsx](./src/components/pages/start/sidebars/RightSidebar/tabs/__tests__/PassportTab.test.tsx)
│   │   │       │       │   ├── [CurrencyTab.tsx](./src/components/pages/start/sidebars/RightSidebar/tabs/CurrencyTab.tsx)
│   │   │       │       │   ├── [DateTimeTab.tsx](./src/components/pages/start/sidebars/RightSidebar/tabs/DateTimeTab.tsx)
│   │   │       │       │   └── [PassportTab.tsx](./src/components/pages/start/sidebars/RightSidebar/tabs/PassportTab.tsx)
│   │   │       │       └── [index.tsx](./src/components/pages/start/sidebars/RightSidebar/index.tsx)
│   │   │       └── [Start.tsx](./src/components/pages/start/Start.tsx)
│   │   └── templates/
│   │       ├── app/
│   │       │   ├── ChatTemplate/
│   │       │   │   ├── __tests__/
│   │       │   │   │   ├── __snapshots__/
│   │       │   │   │   │   └── [ChatTemplate.test.tsx.snap](./src/components/templates/app/ChatTemplate/__tests__/__snapshots__/ChatTemplate.test.tsx.snap)
│   │       │   │   │   └── [ChatTemplate.test.tsx](./src/components/templates/app/ChatTemplate/__tests__/ChatTemplate.test.tsx)
│   │       │   │   ├── [ChatTemplate.tsx](./src/components/templates/app/ChatTemplate/ChatTemplate.tsx)
│   │       │   │   └── [index.ts](./src/components/templates/app/ChatTemplate/index.ts)
│   │       │   ├── DashboardTemplate/
│   │       │   │   ├── __tests__/
│   │       │   │   │   ├── __snapshots__/
│   │       │   │   │   │   └── [DashboardTemplate.test.tsx.snap](./src/components/templates/app/DashboardTemplate/__tests__/__snapshots__/DashboardTemplate.test.tsx.snap)
│   │       │   │   │   └── [DashboardTemplate.test.tsx](./src/components/templates/app/DashboardTemplate/__tests__/DashboardTemplate.test.tsx)
│   │       │   │   ├── [DashboardTemplate.tsx](./src/components/templates/app/DashboardTemplate/DashboardTemplate.tsx)
│   │       │   │   └── [index.ts](./src/components/templates/app/DashboardTemplate/index.ts)
│   │       │   ├── DownloadsTemplate/
│   │       │   │   ├── __tests__/
│   │       │   │   │   ├── __snapshots__/
│   │       │   │   │   │   └── [DownloadsTemplate.test.tsx.snap](./src/components/templates/app/DownloadsTemplate/__tests__/__snapshots__/DownloadsTemplate.test.tsx.snap)
│   │       │   │   │   └── [DownloadsTemplate.test.tsx](./src/components/templates/app/DownloadsTemplate/__tests__/DownloadsTemplate.test.tsx)
│   │       │   │   ├── [DownloadsTemplate.tsx](./src/components/templates/app/DownloadsTemplate/DownloadsTemplate.tsx)
│   │       │   │   └── [index.ts](./src/components/templates/app/DownloadsTemplate/index.ts)
│   │       │   ├── LandingTemplate/
│   │       │   │   ├── __tests__/
│   │       │   │   │   ├── __snapshots__/
│   │       │   │   │   │   └── [LandingTemplate.test.tsx.snap](./src/components/templates/app/LandingTemplate/__tests__/__snapshots__/LandingTemplate.test.tsx.snap)
│   │       │   │   │   └── [LandingTemplate.test.tsx](./src/components/templates/app/LandingTemplate/__tests__/LandingTemplate.test.tsx)
│   │       │   │   ├── [LandingTemplate.tsx](./src/components/templates/app/LandingTemplate/LandingTemplate.tsx)
│   │       │   │   └── [index.ts](./src/components/templates/app/LandingTemplate/index.ts)
│   │       │   └── VersionTemplate/
│   │       │       ├── __tests__/
│   │       │       │   ├── __snapshots__/
│   │       │       │   │   └── [VersionTemplate.test.tsx.snap](./src/components/templates/app/VersionTemplate/__tests__/__snapshots__/VersionTemplate.test.tsx.snap)
│   │       │       │   └── [VersionTemplate.test.tsx](./src/components/templates/app/VersionTemplate/__tests__/VersionTemplate.test.tsx)
│   │       │       ├── [VersionTemplate.tsx](./src/components/templates/app/VersionTemplate/VersionTemplate.tsx)
│   │       │       └── [index.ts](./src/components/templates/app/VersionTemplate/index.ts)
│   │       ├── auth/
│   │       │   ├── PasswordForgetTemplate/
│   │       │   │   ├── __tests__/
│   │       │   │   │   ├── __snapshots__/
│   │       │   │   │   │   └── [PasswordForgetTemplate.test.tsx.snap](./src/components/templates/auth/PasswordForgetTemplate/__tests__/__snapshots__/PasswordForgetTemplate.test.tsx.snap)
│   │       │   │   │   └── [PasswordForgetTemplate.test.tsx](./src/components/templates/auth/PasswordForgetTemplate/__tests__/PasswordForgetTemplate.test.tsx)
│   │       │   │   ├── [PasswordForgetTemplate.tsx](./src/components/templates/auth/PasswordForgetTemplate/PasswordForgetTemplate.tsx)
│   │       │   │   └── [index.ts](./src/components/templates/auth/PasswordForgetTemplate/index.ts)
│   │       │   ├── PasswordResetTemplate/
│   │       │   │   ├── __tests__/
│   │       │   │   │   ├── __snapshots__/
│   │       │   │   │   │   └── [PasswordResetTemplate.test.tsx.snap](./src/components/templates/auth/PasswordResetTemplate/__tests__/__snapshots__/PasswordResetTemplate.test.tsx.snap)
│   │       │   │   │   └── [PasswordResetTemplate.test.tsx](./src/components/templates/auth/PasswordResetTemplate/__tests__/PasswordResetTemplate.test.tsx)
│   │       │   │   ├── [PasswordResetTemplate.tsx](./src/components/templates/auth/PasswordResetTemplate/PasswordResetTemplate.tsx)
│   │       │   │   └── [index.ts](./src/components/templates/auth/PasswordResetTemplate/index.ts)
│   │       │   ├── ProfileTemplate/
│   │       │   │   ├── __tests__/
│   │       │   │   │   ├── __snapshots__/
│   │       │   │   │   │   └── [ProfileTemplate.test.tsx.snap](./src/components/templates/auth/ProfileTemplate/__tests__/__snapshots__/ProfileTemplate.test.tsx.snap)
│   │       │   │   │   └── [ProfileTemplate.test.tsx](./src/components/templates/auth/ProfileTemplate/__tests__/ProfileTemplate.test.tsx)
│   │       │   │   ├── [ProfileTemplate.tsx](./src/components/templates/auth/ProfileTemplate/ProfileTemplate.tsx)
│   │       │   │   └── [index.ts](./src/components/templates/auth/ProfileTemplate/index.ts)
│   │       │   ├── SignInTemplate/
│   │       │   │   ├── __tests__/
│   │       │   │   │   ├── __snapshots__/
│   │       │   │   │   │   └── [SignInTemplate.test.tsx.snap](./src/components/templates/auth/SignInTemplate/__tests__/__snapshots__/SignInTemplate.test.tsx.snap)
│   │       │   │   │   └── [SignInTemplate.test.tsx](./src/components/templates/auth/SignInTemplate/__tests__/SignInTemplate.test.tsx)
│   │       │   │   ├── [SignInTemplate.tsx](./src/components/templates/auth/SignInTemplate/SignInTemplate.tsx)
│   │       │   │   └── [index.ts](./src/components/templates/auth/SignInTemplate/index.ts)
│   │       │   └── SignUpTemplate/
│   │       │       ├── __tests__/
│   │       │       │   ├── __snapshots__/
│   │       │       │   │   └── [SignUpTemplate.test.tsx.snap](./src/components/templates/auth/SignUpTemplate/__tests__/__snapshots__/SignUpTemplate.test.tsx.snap)
│   │       │       │   └── [SignUpTemplate.test.tsx](./src/components/templates/auth/SignUpTemplate/__tests__/SignUpTemplate.test.tsx)
│   │       │       ├── [SignUpTemplate.tsx](./src/components/templates/auth/SignUpTemplate/SignUpTemplate.tsx)
│   │       │       └── [index.ts](./src/components/templates/auth/SignUpTemplate/index.ts)
│   │       ├── blog/
│   │       │   ├── BlogTemplate/
│   │       │   │   ├── __tests__/
│   │       │   │   │   ├── __snapshots__/
│   │       │   │   │   │   └── [BlogTemplate.test.tsx.snap](./src/components/templates/blog/BlogTemplate/__tests__/__snapshots__/BlogTemplate.test.tsx.snap)
│   │       │   │   │   └── [BlogTemplate.test.tsx](./src/components/templates/blog/BlogTemplate/__tests__/BlogTemplate.test.tsx)
│   │       │   │   ├── [BlogTemplate.tsx](./src/components/templates/blog/BlogTemplate/BlogTemplate.tsx)
│   │       │   │   └── [index.ts](./src/components/templates/blog/BlogTemplate/index.ts)
│   │       │   └── BlogsTemplate/
│   │       │       ├── __tests__/
│   │       │       │   ├── __snapshots__/
│   │       │       │   │   └── [BlogsTemplate.test.tsx.snap](./src/components/templates/blog/BlogsTemplate/__tests__/__snapshots__/BlogsTemplate.test.tsx.snap)
│   │       │       │   └── [BlogsTemplate.test.tsx](./src/components/templates/blog/BlogsTemplate/__tests__/BlogsTemplate.test.tsx)
│   │       │       ├── [BlogsTemplate.tsx](./src/components/templates/blog/BlogsTemplate/BlogsTemplate.tsx)
│   │       │       └── [index.ts](./src/components/templates/blog/BlogsTemplate/index.ts)
│   │       ├── shared/
│   │       │   ├── ComponentsTemplate/
│   │       │   │   ├── __tests__/
│   │       │   │   │   ├── __snapshots__/
│   │       │   │   │   │   └── [ComponentsTemplate.test.tsx.snap](./src/components/templates/shared/ComponentsTemplate/__tests__/__snapshots__/ComponentsTemplate.test.tsx.snap)
│   │       │   │   │   └── [ComponentsTemplate.test.tsx](./src/components/templates/shared/ComponentsTemplate/__tests__/ComponentsTemplate.test.tsx)
│   │       │   │   ├── [ComponentsTemplate.tsx](./src/components/templates/shared/ComponentsTemplate/ComponentsTemplate.tsx)
│   │       │   │   └── [index.ts](./src/components/templates/shared/ComponentsTemplate/index.ts)
│   │       │   ├── ErrorTemplate/
│   │       │   │   ├── __tests__/
│   │       │   │   │   ├── __snapshots__/
│   │       │   │   │   │   └── [ErrorTemplate.test.tsx.snap](./src/components/templates/shared/ErrorTemplate/__tests__/__snapshots__/ErrorTemplate.test.tsx.snap)
│   │       │   │   │   └── [ErrorTemplate.test.tsx](./src/components/templates/shared/ErrorTemplate/__tests__/ErrorTemplate.test.tsx)
│   │       │   │   ├── [ErrorTemplate.tsx](./src/components/templates/shared/ErrorTemplate/ErrorTemplate.tsx)
│   │       │   │   └── [index.ts](./src/components/templates/shared/ErrorTemplate/index.ts)
│   │       │   └── HeadTemplate/
│   │       │       ├── [HeadTemplate.tsx](./src/components/templates/shared/HeadTemplate/HeadTemplate.tsx)
│   │       │       └── [index.ts](./src/components/templates/shared/HeadTemplate/index.ts)
│   │       └── store/
│   │           ├── StoreFrontTemplate/
│   │           │   ├── __tests__/
│   │           │   │   ├── __snapshots__/
│   │           │   │   │   └── [StoreFrontTemplate.test.tsx.snap](./src/components/templates/store/StoreFrontTemplate/__tests__/__snapshots__/StoreFrontTemplate.test.tsx.snap)
│   │           │   │   └── [StoreFrontTemplate.test.tsx](./src/components/templates/store/StoreFrontTemplate/__tests__/StoreFrontTemplate.test.tsx)
│   │           │   ├── [StoreFrontTemplate.tsx](./src/components/templates/store/StoreFrontTemplate/StoreFrontTemplate.tsx)
│   │           │   └── [index.ts](./src/components/templates/store/StoreFrontTemplate/index.ts)
│   │           └── StoreItemTemplate/
│   │               ├── __tests__/
│   │               │   ├── __snapshots__/
│   │               │   │   └── [StoreItemTemplate.test.tsx.snap](./src/components/templates/store/StoreItemTemplate/__tests__/__snapshots__/StoreItemTemplate.test.tsx.snap)
│   │               │   └── [StoreItemTemplate.test.tsx](./src/components/templates/store/StoreItemTemplate/__tests__/StoreItemTemplate.test.tsx)
│   │               ├── [StoreItemTemplate.tsx](./src/components/templates/store/StoreItemTemplate/StoreItemTemplate.tsx)
│   │               └── [index.ts](./src/components/templates/store/StoreItemTemplate/index.ts)
│   ├── constants/
│   │   ├── [app.ts](./src/constants/app.ts)
│   │   └── [models.ts](./src/constants/models.ts)
│   ├── data/
│   │   ├── bookmarks/
│   │   │   ├── [agents.ts](./src/data/bookmarks/agents.ts)
│   │   │   ├── [code.ts](./src/data/bookmarks/code.ts)
│   │   │   ├── [google.ts](./src/data/bookmarks/google.ts)
│   │   │   ├── [index.ts](./src/data/bookmarks/index.ts)
│   │   │   ├── [messaging.ts](./src/data/bookmarks/messaging.ts)
│   │   │   ├── [music.ts](./src/data/bookmarks/music.ts)
│   │   │   ├── [social.ts](./src/data/bookmarks/social.ts)
│   │   │   └── [work.ts](./src/data/bookmarks/work.ts)
│   │   ├── calendar/
│   │   │   ├── [events.ts](./src/data/calendar/events.ts)
│   │   │   ├── [months.ts](./src/data/calendar/months.ts)
│   │   │   └── [years.ts](./src/data/calendar/years.ts)
│   │   ├── chess/
│   │   │   └── [openings.ts](./src/data/chess/openings.ts)
│   │   ├── downloads/
│   │   │   ├── [agents.ts](./src/data/downloads/agents.ts)
│   │   │   ├── [clis.ts](./src/data/downloads/clis.ts)
│   │   │   ├── [extensions.ts](./src/data/downloads/extensions.ts)
│   │   │   ├── [index.ts](./src/data/downloads/index.ts)
│   │   │   ├── [packages.ts](./src/data/downloads/packages.ts)
│   │   │   └── [types.ts](./src/data/downloads/types.ts)
│   │   ├── manifest/
│   │   │   ├── [extension.ts](./src/data/manifest/extension.ts)
│   │   │   └── [pwa.ts](./src/data/manifest/pwa.ts)
│   │   ├── [blog.ts](./src/data/blog.ts)
│   │   ├── [chat.ts](./src/data/chat.ts)
│   │   ├── [countries.ts](./src/data/countries.ts)
│   │   ├── [currencies.ts](./src/data/currencies.ts)
│   │   ├── [emojis.ts](./src/data/emojis.ts)
│   │   ├── [models.ts](./src/data/models.ts)
│   │   ├── [periodic-table.ts](./src/data/periodic-table.ts)
│   │   ├── [pi.ts](./src/data/pi.ts)
│   │   ├── [pokedex.ts](./src/data/pokedex.ts)
│   │   ├── [timezones.ts](./src/data/timezones.ts)
│   │   ├── [twinkle-twinkle-little-star.ts](./src/data/twinkle-twinkle-little-star.ts)
│   │   ├── [weather.ts](./src/data/weather.ts)
│   │   └── [wordle.ts](./src/data/wordle.ts)
│   ├── examples/
│   │   └── [example.yaml](./src/examples/example.yaml)
│   ├── json/
│   │   ├── chess/
│   │   │   └── [analysis.json](./src/json/chess/analysis.json)
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
│   ├── pages/
│   │   ├── api/
│   │   │   ├── proxy/
│   │   │   │   └── [index.ts](./src/pages/api/proxy/index.ts)
│   │   │   └── trpc/
│   │   │       └── [[trpc].ts](./src/pages/api/trpc/[trpc].ts)
│   │   ├── app/
│   │   │   ├── attractors/
│   │   │   │   └── [index.tsx](./src/pages/app/attractors/index.tsx)
│   │   │   └── chess/
│   │   │       ├── board/
│   │   │       │   └── [index.tsx](./src/pages/app/chess/board/index.tsx)
│   │   │       └── stats/
│   │   │           └── [index.tsx](./src/pages/app/chess/stats/index.tsx)
│   │   ├── components/
│   │   │   └── [index.tsx](./src/pages/components/index.tsx)
│   │   ├── downloads/
│   │   │   └── [index.tsx](./src/pages/downloads/index.tsx)
│   │   ├── templates/
│   │   │   ├── [[slug].tsx](./src/pages/templates/[slug].tsx)
│   │   │   └── [index.tsx](./src/pages/templates/index.tsx)
│   │   ├── version/
│   │   │   └── [index.tsx](./src/pages/version/index.tsx)
│   │   ├── [404.tsx](./src/pages/404.tsx)
│   │   ├── [500.tsx](./src/pages/500.tsx)
│   │   ├── [_app.tsx](./src/pages/_app.tsx)
│   │   ├── [_document.tsx](./src/pages/_document.tsx)
│   │   ├── [_error.tsx](./src/pages/_error.tsx)
│   │   └── [index.tsx](./src/pages/index.tsx)
│   ├── server/
│   │   ├── routers/
│   │   │   └── [_app.ts](./src/server/routers/_app.ts)
│   │   └── [trpc.ts](./src/server/trpc.ts)
│   ├── services/
│   │   ├── openrouter/
│   │   │   └── [openrouter.service.ts](./src/services/openrouter/openrouter.service.ts)
│   │   ├── yaml2pdfmake/
│   │   │   ├── [yaml2pdfmake.service.ts](./src/services/yaml2pdfmake/yaml2pdfmake.service.ts)
│   │   │   └── [yaml2pdfmake.types.ts](./src/services/yaml2pdfmake/yaml2pdfmake.types.ts)
│   │   └── youtube/
│   │       └── [youtube.service.ts](./src/services/youtube/youtube.service.ts)
│   ├── styles/
│   │   └── [globals.css](./src/styles/globals.css)
│   └── utils/
│       ├── [canvas.ts](./src/utils/canvas.ts)
│       └── [trpc.ts](./src/utils/trpc.ts)
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
│   ├── [Cargo.toml](./src-tauri/Cargo.toml)
│   ├── [build.rs](./src-tauri/build.rs)
│   └── [tauri.conf.json](./src-tauri/tauri.conf.json)
├── [LICENSE](./LICENSE)
├── [README.md](./README.md)
├── [TREE.md](./TREE.md)
├── [capacitor.config.ts](./capacitor.config.ts)
├── [eslint.config.mts](./eslint.config.mts)
├── [jest.config.ts](./jest.config.ts)
├── [jest.setup.ts](./jest.setup.ts)
├── [next.config.ts](./next.config.ts)
├── [package.json](./package.json)
├── [postcss.config.mjs](./postcss.config.mjs)
└── [tsconfig.json](./tsconfig.json)
```

203 directories, 526 files
