# TREE

```bash
├── prisma/
│   └── schema.prisma
├── public/
│   ├── audio/
│   │   ├── 3/
│   │   │   ├── a.mp3
│   │   │   ├── as.mp3
│   │   │   ├── b.mp3
│   │   │   ├── c.mp3
│   │   │   ├── cs.mp3
│   │   │   ├── d.mp3
│   │   │   ├── ds.mp3
│   │   │   ├── e.mp3
│   │   │   ├── f.mp3
│   │   │   ├── fs.mp3
│   │   │   ├── g.mp3
│   │   │   └── gs.mp3
│   │   └── 4/
│   │       └── c.mp3
│   ├── db/
│   │   └── hieudoanm.db
│   ├── fonts/
│   │   ├── Roboto/
│   │   │   ├── Roboto-Italic.ttf
│   │   │   ├── Roboto-Medium.ttf
│   │   │   ├── Roboto-MediumItalic.ttf
│   │   │   └── Roboto-Regular.ttf
│   │   └── Times-New-Roman/
│   │       ├── Times-New-Roman-Bold-Italic.ttf
│   │       ├── Times-New-Roman-Bold.ttf
│   │       ├── Times-New-Roman-Italic.ttf
│   │       └── Times-New-Roman-Regular.ttf
│   ├── icons/
│   │   ├── icon-128x128.png
│   │   ├── icon-144x144.png
│   │   ├── icon-152x152.png
│   │   ├── icon-192x192.png
│   │   ├── icon-384x384.png
│   │   ├── icon-512x512.png
│   │   ├── icon-512x512.svg
│   │   ├── icon-72x72.png
│   │   └── icon-96x96.png
│   ├── models/
│   │   ├── invoice-parser.onnx
│   │   └── sign-model.onnx
│   ├── workers/
│   │   └── pdf.worker.min.js
│   ├── favicon.ico
│   ├── file.svg
│   ├── globe.svg
│   ├── manifest.json
│   ├── next.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── sw.js
│   ├── vercel.svg
│   └── window.svg
├── scripts/
│   ├── sh/
│   │   └── post-build.sh
│   ├── currency.ts
│   └── tsconfig.json
├── src/
│   ├── clients/
│   │   ├── gemini/
│   │   │   ├── gemini.client.ts
│   │   │   └── gemini.enums.ts
│   │   ├── openrouter/
│   │   │   ├── openrouter.client.ts
│   │   │   └── openrouter.enums.ts
│   │   └── wordsapi.com/
│   │       └── wordsapi.client.ts
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── __tests__/
│   │   │   │   ├── __snapshots__/
│   │   │   │   │   ├── BlogDate.test.tsx.snap
│   │   │   │   │   ├── ChatBubble.test.tsx.snap
│   │   │   │   │   ├── ChatTimestamp.test.tsx.snap
│   │   │   │   │   └── TagBadge.test.tsx.snap
│   │   │   │   ├── BlogDate.test.tsx
│   │   │   │   ├── ChatBubble.test.tsx
│   │   │   │   ├── ChatTimestamp.test.tsx
│   │   │   │   └── TagBadge.test.tsx
│   │   │   ├── BlogDate.tsx
│   │   │   ├── ChatBubble.tsx
│   │   │   ├── ChatTimestamp.tsx
│   │   │   ├── ModalWrapper.tsx
│   │   │   ├── TagBadge.tsx
│   │   │   └── index.ts
│   │   ├── molecules/
│   │   │   ├── __tests__/
│   │   │   │   ├── __snapshots__/
│   │   │   │   │   ├── BlogCard.test.tsx.snap
│   │   │   │   │   ├── BlogCardList.test.tsx.snap
│   │   │   │   │   ├── BlogSidebar.test.tsx.snap
│   │   │   │   │   ├── ChatInput.test.tsx.snap
│   │   │   │   │   ├── ChatMessageList.test.tsx.snap
│   │   │   │   │   └── ChatModelSelect.test.tsx.snap
│   │   │   │   ├── BlogCard.test.tsx
│   │   │   │   ├── BlogCardList.test.tsx
│   │   │   │   ├── BlogSidebar.test.tsx
│   │   │   │   ├── ChatInput.test.tsx
│   │   │   │   ├── ChatMessageList.test.tsx
│   │   │   │   └── ChatModelSelect.test.tsx
│   │   │   ├── BlogCard.tsx
│   │   │   ├── BlogCardList.tsx
│   │   │   ├── BlogSidebar.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   ├── ChatMessageList.tsx
│   │   │   ├── ChatModelSelect.tsx
│   │   │   ├── VirtualTable.tsx
│   │   │   └── index.ts
│   │   ├── organisms/
│   │   │   ├── auth/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   ├── PasswordForget.test.tsx.snap
│   │   │   │   │   │   ├── PasswordReset.test.tsx.snap
│   │   │   │   │   │   ├── SignInForm.test.tsx.snap
│   │   │   │   │   │   └── SignUpForm.test.tsx.snap
│   │   │   │   │   ├── PasswordForget.test.tsx
│   │   │   │   │   ├── PasswordReset.test.tsx
│   │   │   │   │   ├── SignInForm.test.tsx
│   │   │   │   │   └── SignUpForm.test.tsx
│   │   │   │   ├── PasswordForget.tsx
│   │   │   │   ├── PasswordReset.tsx
│   │   │   │   ├── SignInForm.tsx
│   │   │   │   └── SignUpForm.tsx
│   │   │   ├── blog/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   ├── BlogFooter.test.tsx.snap
│   │   │   │   │   │   └── BlogHeader.test.tsx.snap
│   │   │   │   │   ├── BlogFooter.test.tsx
│   │   │   │   │   └── BlogHeader.test.tsx
│   │   │   │   ├── BlogFooter.tsx
│   │   │   │   └── BlogHeader.tsx
│   │   │   ├── chat/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   ├── ChatFooter.test.tsx.snap
│   │   │   │   │   │   ├── ChatHeader.test.tsx.snap
│   │   │   │   │   │   └── ChatSidebar.test.tsx.snap
│   │   │   │   │   ├── ChatFooter.test.tsx
│   │   │   │   │   ├── ChatHeader.test.tsx
│   │   │   │   │   └── ChatSidebar.test.tsx
│   │   │   │   ├── ChatFooter.tsx
│   │   │   │   ├── ChatHeader.tsx
│   │   │   │   └── ChatSidebar.tsx
│   │   │   ├── common/
│   │   │   │   └── PhotosGrid.tsx
│   │   │   ├── landing/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   ├── CallToAction.test.tsx.snap
│   │   │   │   │   │   ├── Features.test.tsx.snap
│   │   │   │   │   │   ├── Footer.test.tsx.snap
│   │   │   │   │   │   ├── FrequentlyAskedQuestions.test.tsx.snap
│   │   │   │   │   │   ├── Header.test.tsx.snap
│   │   │   │   │   │   ├── Hero.test.tsx.snap
│   │   │   │   │   │   ├── Pricing.test.tsx.snap
│   │   │   │   │   │   └── Testimonials.test.tsx.snap
│   │   │   │   │   ├── CallToAction.test.tsx
│   │   │   │   │   ├── Features.test.tsx
│   │   │   │   │   ├── Footer.test.tsx
│   │   │   │   │   ├── FrequentlyAskedQuestions.test.tsx
│   │   │   │   │   ├── Header.test.tsx
│   │   │   │   │   ├── Hero.test.tsx
│   │   │   │   │   ├── Pricing.test.tsx
│   │   │   │   │   └── Testimonials.test.tsx
│   │   │   │   ├── CallToAction.tsx
│   │   │   │   ├── Features.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── FrequentlyAskedQuestions.tsx
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Hero.tsx
│   │   │   │   ├── Pricing.tsx
│   │   │   │   └── Testimonials.tsx
│   │   │   ├── mocks/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   ├── Browser.test.tsx.snap
│   │   │   │   │   │   ├── Phone.test.tsx.snap
│   │   │   │   │   │   ├── Terminal.test.tsx.snap
│   │   │   │   │   │   └── Window.test.tsx.snap
│   │   │   │   │   ├── Browser.test.tsx
│   │   │   │   │   ├── Phone.test.tsx
│   │   │   │   │   ├── Terminal.test.tsx
│   │   │   │   │   └── Window.test.tsx
│   │   │   │   ├── Browser.tsx
│   │   │   │   ├── Phone.tsx
│   │   │   │   ├── Terminal.tsx
│   │   │   │   └── Window.tsx
│   │   │   └── index.ts
│   │   ├── pages/
│   │   │   ├── attractors/
│   │   │   │   └── Attractors.tsx
│   │   │   └── start/
│   │   │       ├── cards/
│   │   │       │   ├── __tests__/
│   │   │       │   │   ├── __snapshots__/
│   │   │       │   │   │   ├── AppCard.test.tsx.snap
│   │   │       │   │   │   ├── BookmarkCard.test.tsx.snap
│   │   │       │   │   │   ├── CityCard.test.tsx.snap
│   │   │       │   │   │   └── ToolCard.test.tsx.snap
│   │   │       │   │   ├── AppCard.test.tsx
│   │   │       │   │   ├── BookmarkCard.test.tsx
│   │   │       │   │   ├── CityCard.test.tsx
│   │   │       │   │   └── ToolCard.test.tsx
│   │   │       │   ├── AppCard.tsx
│   │   │       │   ├── BookmarkCard.tsx
│   │   │       │   ├── CityCard.tsx
│   │   │       │   ├── DownloadCard.tsx
│   │   │       │   └── ToolCard.tsx
│   │   │       ├── modals/
│   │   │       │   ├── calculators/
│   │   │       │   │   ├── ConverterModal/
│   │   │       │   │   │   ├── tabs/
│   │   │       │   │   │   │   ├── math/
│   │   │       │   │   │   │   │   ├── Angle.tsx
│   │   │       │   │   │   │   │   ├── Base.tsx
│   │   │       │   │   │   │   │   ├── Data.tsx
│   │   │       │   │   │   │   │   └── Roman.tsx
│   │   │       │   │   │   │   └── physical/
│   │   │       │   │   │   │       ├── Length.tsx
│   │   │       │   │   │   │       ├── Temperature.tsx
│   │   │       │   │   │   │       ├── Time.tsx
│   │   │       │   │   │   │       └── Weight.tsx
│   │   │       │   │   │   └── index.tsx
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── __snapshots__/
│   │   │       │   │   │   │   ├── CalculatorModal.test.tsx.snap
│   │   │       │   │   │   │   ├── ConverterModal.test.tsx.snap
│   │   │       │   │   │   │   └── PokerModal.test.tsx.snap
│   │   │       │   │   │   ├── CalculatorModal.test.tsx
│   │   │       │   │   │   ├── ConverterModal.test.tsx
│   │   │       │   │   │   └── PokerModal.test.tsx
│   │   │       │   │   ├── CalculatorModal.tsx
│   │   │       │   │   ├── EloModal.tsx
│   │   │       │   │   ├── InflationModal.tsx
│   │   │       │   │   ├── PokerModal.tsx
│   │   │       │   │   └── TaxModal.tsx
│   │   │       │   ├── clocks/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── __snapshots__/
│   │   │       │   │   │   │   ├── ChessClockModal.test.tsx.snap
│   │   │       │   │   │   │   └── PomodoroModal.test.tsx.snap
│   │   │       │   │   │   ├── ChessClockModal.test.tsx
│   │   │       │   │   │   └── PomodoroModal.test.tsx
│   │   │       │   │   ├── ChessClockModal.tsx
│   │   │       │   │   ├── CountdownModal.tsx
│   │   │       │   │   ├── PomodoroModal.tsx
│   │   │       │   │   └── WatchfaceModal.tsx
│   │   │       │   ├── converters/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── __snapshots__/
│   │   │       │   │   │   │   ├── BrailleModal.test.tsx.snap
│   │   │       │   │   │   │   ├── ColorsModal.test.tsx.snap
│   │   │       │   │   │   │   ├── MorseModal.test.tsx.snap
│   │   │       │   │   │   │   └── OpenAPI2Postman.test.tsx.snap
│   │   │       │   │   │   ├── BrailleModal.test.tsx
│   │   │       │   │   │   ├── ColorsModal.test.tsx
│   │   │       │   │   │   ├── MorseModal.test.tsx
│   │   │       │   │   │   └── OpenAPI2Postman.test.tsx
│   │   │       │   │   ├── BrailleModal.tsx
│   │   │       │   │   ├── ColorsModal.tsx
│   │   │       │   │   ├── MorseModal.tsx
│   │   │       │   │   └── OpenAPI2Postman.tsx
│   │   │       │   ├── editors/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── __snapshots__/
│   │   │       │   │   │   │   ├── JSONSchemaModal.test.tsx.snap
│   │   │       │   │   │   │   ├── ManifestModal.test.tsx.snap
│   │   │       │   │   │   │   └── RedactModal.test.tsx.snap
│   │   │       │   │   │   ├── JSONSchemaModal.test.tsx
│   │   │       │   │   │   ├── ManifestModal.test.tsx
│   │   │       │   │   │   └── RedactModal.test.tsx
│   │   │       │   │   ├── JSONSchemaModal.tsx
│   │   │       │   │   ├── ManifestModal.tsx
│   │   │       │   │   ├── MarkdownModal.tsx
│   │   │       │   │   ├── RedactModal.tsx
│   │   │       │   │   ├── ResumeModal.tsx
│   │   │       │   │   └── SlidesModal.tsx
│   │   │       │   ├── education/
│   │   │       │   │   ├── academic/
│   │   │       │   │   │   ├── __tests__/
│   │   │       │   │   │   │   ├── __snapshots__/
│   │   │       │   │   │   │   │   └── DOIModal.test.tsx.snap
│   │   │       │   │   │   │   └── DOIModal.test.tsx
│   │   │       │   │   │   └── DOIModal.tsx
│   │   │       │   │   ├── chemistry/
│   │   │       │   │   │   ├── __tests__/
│   │   │       │   │   │   │   ├── __snapshots__/
│   │   │       │   │   │   │   │   └── PeriodicTableModal.test.tsx.snap
│   │   │       │   │   │   │   └── PeriodicTableModal.test.tsx
│   │   │       │   │   │   └── PeriodicTableModal.tsx
│   │   │       │   │   ├── languages/
│   │   │       │   │   │   ├── __tests__/
│   │   │       │   │   │   │   ├── __snapshots__/
│   │   │       │   │   │   │   │   └── FlashcardsModal.test.tsx.snap
│   │   │       │   │   │   │   └── FlashcardsModal.test.tsx
│   │   │       │   │   │   ├── EnglishModal.tsx
│   │   │       │   │   │   ├── FlashcardsModal.tsx
│   │   │       │   │   │   └── SignModal.tsx
│   │   │       │   │   └── music/
│   │   │       │   │       ├── __tests__/
│   │   │       │   │       │   ├── __snapshots__/
│   │   │       │   │       │   │   └── PitchModal.test.tsx.snap
│   │   │       │   │       │   └── PitchModal.test.tsx
│   │   │       │   │       └── PitchModal.tsx
│   │   │       │   ├── eyes/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── __snapshots__/
│   │   │       │   │   │   │   ├── LogMARChartModal.test.tsx.snap
│   │   │       │   │   │   │   ├── SnellenChartModal.test.tsx.snap
│   │   │       │   │   │   │   └── TumblingEChartModal.test.tsx.snap
│   │   │       │   │   │   ├── LogMARChartModal.test.tsx
│   │   │       │   │   │   ├── SnellenChartModal.test.tsx
│   │   │       │   │   │   └── TumblingEChartModal.test.tsx
│   │   │       │   │   ├── LogMARChartModal.tsx
│   │   │       │   │   ├── SnellenChartModal.tsx
│   │   │       │   │   └── TumblingEChartModal.tsx
│   │   │       │   ├── games/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── __snapshots__/
│   │   │       │   │   │   │   ├── Blackjack.test.tsx.snap
│   │   │       │   │   │   │   ├── PiModal.test.tsx.snap
│   │   │       │   │   │   │   ├── Pokedex.test.tsx.snap
│   │   │       │   │   │   │   ├── RecallModal.test.tsx.snap
│   │   │       │   │   │   │   ├── T3Modal.test.tsx.snap
│   │   │       │   │   │   │   ├── TowersModal.test.tsx.snap
│   │   │       │   │   │   │   └── WordleModal.test.tsx.snap
│   │   │       │   │   │   ├── Blackjack.test.tsx
│   │   │       │   │   │   ├── PiModal.test.tsx
│   │   │       │   │   │   ├── Pokedex.test.tsx
│   │   │       │   │   │   ├── RecallModal.test.tsx
│   │   │       │   │   │   ├── T3Modal.test.tsx
│   │   │       │   │   │   ├── TowersModal.test.tsx
│   │   │       │   │   │   └── WordleModal.test.tsx
│   │   │       │   │   ├── BlackjackModal.tsx
│   │   │       │   │   ├── PalindromeModal.tsx
│   │   │       │   │   ├── PiNumberModal.tsx
│   │   │       │   │   ├── PokedexModal.tsx
│   │   │       │   │   ├── QuizifyModal.tsx
│   │   │       │   │   ├── RecallModal.tsx
│   │   │       │   │   ├── T3Modal.tsx
│   │   │       │   │   ├── TowersModal.tsx
│   │   │       │   │   ├── TypoglycemiaModal.tsx
│   │   │       │   │   └── WordleModal.tsx
│   │   │       │   ├── images/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── __snapshots__/
│   │   │       │   │   │   │   ├── BreakingBadModal.test.tsx.snap
│   │   │       │   │   │   │   ├── CameraModal.test.tsx.snap
│   │   │       │   │   │   │   ├── GitHubSocialPreviewModal.test.tsx.snap
│   │   │       │   │   │   │   ├── HouseModal.test.tsx.snap
│   │   │       │   │   │   │   ├── InstaSizeModal.test.tsx.snap
│   │   │       │   │   │   │   ├── QRCodeModal.test.tsx.snap
│   │   │       │   │   │   │   └── YouTubeThumbnails.test.tsx.snap
│   │   │       │   │   │   ├── BreakingBadModal.test.tsx
│   │   │       │   │   │   ├── CameraModal.test.tsx
│   │   │       │   │   │   ├── GitHubSocialPreviewModal.test.tsx
│   │   │       │   │   │   ├── HouseModal.test.tsx
│   │   │       │   │   │   ├── InstaSizeModal.test.tsx
│   │   │       │   │   │   ├── QRCodeModal.test.tsx
│   │   │       │   │   │   └── YouTubeThumbnails.test.tsx
│   │   │       │   │   ├── BreakingBadModal.tsx
│   │   │       │   │   ├── CameraModal.tsx
│   │   │       │   │   ├── GitHubSocialPreviewModal.tsx
│   │   │       │   │   ├── HouseModal.tsx
│   │   │       │   │   ├── InstaSizeModal.tsx
│   │   │       │   │   ├── InvoiceParserModal.tsx
│   │   │       │   │   ├── QRCodeModal.tsx
│   │   │       │   │   └── YouTubeThumbnailsModal.tsx
│   │   │       │   ├── tools/
│   │   │       │   │   ├── ChatModal/
│   │   │       │   │   │   ├── ChatCounter.tsx
│   │   │       │   │   │   ├── ChatMessages.tsx
│   │   │       │   │   │   ├── ChatModal.tsx
│   │   │       │   │   │   └── index.ts
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── __snapshots__/
│   │   │       │   │   │   │   ├── EmojisModal.test.tsx.snap
│   │   │       │   │   │   │   ├── FigletModal.test.tsx.snap
│   │   │       │   │   │   │   ├── IPModal.test.tsx.snap
│   │   │       │   │   │   │   ├── KaprekarModal.test.tsx.snap
│   │   │       │   │   │   │   ├── ProxyModal.test.tsx.snap
│   │   │       │   │   │   │   ├── StringModal.test.tsx.snap
│   │   │       │   │   │   │   └── UUIDModal.test.tsx.snap
│   │   │       │   │   │   ├── EmojisModal.test.tsx
│   │   │       │   │   │   ├── FigletModal.test.tsx
│   │   │       │   │   │   ├── IPModal.test.tsx
│   │   │       │   │   │   ├── KaprekarModal.test.tsx
│   │   │       │   │   │   ├── ProxyModal.test.tsx
│   │   │       │   │   │   ├── StringModal.test.tsx
│   │   │       │   │   │   └── UUIDModal.test.tsx
│   │   │       │   │   ├── ClipboardModal.tsx
│   │   │       │   │   ├── EmojisModal.tsx
│   │   │       │   │   ├── FigletModal.tsx
│   │   │       │   │   ├── IPModal.tsx
│   │   │       │   │   ├── KaprekarModal.tsx
│   │   │       │   │   ├── NoSleepModal.tsx
│   │   │       │   │   ├── ProxyModal.tsx
│   │   │       │   │   ├── SVGModal.tsx
│   │   │       │   │   ├── SheetsModal.tsx
│   │   │       │   │   ├── ShopifyDetectModal.tsx
│   │   │       │   │   ├── StringModal.tsx
│   │   │       │   │   └── UUIDModal.tsx
│   │   │       │   └── visualization/
│   │   │       │       ├── __tests__/
│   │   │       │       │   ├── __snapshots__/
│   │   │       │       │   │   └── LegislationModal.test.tsx.snap
│   │   │       │       │   └── LegislationModal.test.tsx
│   │   │       │       ├── CalendarTracker.tsx
│   │   │       │       └── LegislationModal.tsx
│   │   │       ├── sidebars/
│   │   │       │   ├── LeftSidebar/
│   │   │       │   │   ├── tabs/
│   │   │       │   │   │   ├── __tests__/
│   │   │       │   │   │   │   ├── __snapshots__/
│   │   │       │   │   │   │   │   └── StatusTab.test.tsx.snap
│   │   │       │   │   │   │   └── StatusTab.test.tsx
│   │   │       │   │   │   ├── FreeModelsTab.tsx
│   │   │       │   │   │   ├── StatusTab.tsx
│   │   │       │   │   │   ├── TasksTab.tsx
│   │   │       │   │   │   └── TimeTab.tsx
│   │   │       │   │   └── index.tsx
│   │   │       │   └── RightSidebar/
│   │   │       │       ├── tabs/
│   │   │       │       │   ├── __tests__/
│   │   │       │       │   │   ├── __snapshots__/
│   │   │       │       │   │   │   ├── CurrencyTab.test.tsx.snap
│   │   │       │       │   │   │   └── PassportTab.test.tsx.snap
│   │   │       │       │   │   ├── CurrencyTab.test.tsx
│   │   │       │       │   │   └── PassportTab.test.tsx
│   │   │       │       │   ├── CurrencyTab.tsx
│   │   │       │       │   ├── DateTimeTab.tsx
│   │   │       │       │   └── PassportTab.tsx
│   │   │       │       └── index.tsx
│   │   │       └── Start.tsx
│   │   └── templates/
│   │       ├── BlogTemplate/
│   │       │   ├── __tests__/
│   │       │   │   ├── __snapshots__/
│   │       │   │   │   └── BlogTemplate.test.tsx.snap
│   │       │   │   └── BlogTemplate.test.tsx
│   │       │   ├── BlogTemplate.tsx
│   │       │   └── index.ts
│   │       ├── BlogsTemplate/
│   │       │   ├── __tests__/
│   │       │   │   ├── __snapshots__/
│   │       │   │   │   └── BlogsTemplate.test.tsx.snap
│   │       │   │   └── BlogsTemplate.test.tsx
│   │       │   ├── BlogsTemplate.tsx
│   │       │   └── index.ts
│   │       ├── ChatTemplate/
│   │       │   ├── __tests__/
│   │       │   │   ├── __snapshots__/
│   │       │   │   │   └── ChatTemplate.test.tsx.snap
│   │       │   │   └── ChatTemplate.test.tsx
│   │       │   ├── ChatTemplate.tsx
│   │       │   └── index.ts
│   │       ├── ComponentsTemplate/
│   │       │   ├── __tests__/
│   │       │   │   ├── __snapshots__/
│   │       │   │   │   └── ComponentsTemplate.test.tsx.snap
│   │       │   │   └── ComponentsTemplate.test.tsx
│   │       │   ├── ComponentsTemplate.tsx
│   │       │   └── index.ts
│   │       ├── DashboardTemplate/
│   │       │   ├── __tests__/
│   │       │   │   ├── __snapshots__/
│   │       │   │   │   └── DashboardTemplate.test.tsx.snap
│   │       │   │   └── DashboardTemplate.test.tsx
│   │       │   ├── DashboardTemplate.tsx
│   │       │   └── index.ts
│   │       ├── DownloadsTemplate/
│   │       │   ├── __tests__/
│   │       │   │   ├── __snapshots__/
│   │       │   │   │   └── DownloadsTemplate.test.tsx.snap
│   │       │   │   └── DownloadsTemplate.test.tsx
│   │       │   ├── DownloadsTemplate.tsx
│   │       │   └── index.ts
│   │       ├── ErrorTemplate/
│   │       │   ├── __tests__/
│   │       │   │   ├── __snapshots__/
│   │       │   │   │   └── ErrorTemplate.test.tsx.snap
│   │       │   │   └── ErrorTemplate.test.tsx
│   │       │   ├── ErrorTemplate.tsx
│   │       │   └── index.ts
│   │       ├── HeadTemplate/
│   │       │   ├── HeadTemplate.tsx
│   │       │   └── index.ts
│   │       ├── LandingTemplate/
│   │       │   ├── __tests__/
│   │       │   │   ├── __snapshots__/
│   │       │   │   │   └── LandingTemplate.test.tsx.snap
│   │       │   │   └── LandingTemplate.test.tsx
│   │       │   ├── LandingTemplate.tsx
│   │       │   └── index.ts
│   │       └── VersionTemplate/
│   │           ├── __tests__/
│   │           │   ├── __snapshots__/
│   │           │   │   └── VersionTemplate.test.tsx.snap
│   │           │   └── VersionTemplate.test.tsx
│   │           ├── VersionTemplate.tsx
│   │           └── index.ts
│   ├── constants/
│   │   └── models.ts
│   ├── contexts/
│   │   ├── LanguageContext.tsx
│   │   ├── ModalContext.tsx
│   │   ├── NotificationContext.tsx
│   │   ├── SettingsContext.tsx
│   │   └── ThemeContext.tsx
│   ├── data/
│   │   ├── bookmarks/
│   │   │   ├── chat.ts
│   │   │   ├── code.ts
│   │   │   ├── google.ts
│   │   │   ├── index.ts
│   │   │   ├── messaging.ts
│   │   │   ├── music.ts
│   │   │   ├── social.ts
│   │   │   └── work.ts
│   │   ├── calendar/
│   │   │   ├── events.ts
│   │   │   ├── months.ts
│   │   │   └── years.ts
│   │   ├── downloads/
│   │   │   ├── agents.ts
│   │   │   ├── clis.ts
│   │   │   ├── extensions.ts
│   │   │   ├── ides.ts
│   │   │   ├── index.ts
│   │   │   ├── packages.ts
│   │   │   └── types.ts
│   │   ├── manifest/
│   │   │   ├── extension.ts
│   │   │   └── pwa.ts
│   │   ├── apps.ts
│   │   ├── blog.ts
│   │   ├── chat.ts
│   │   ├── countries.ts
│   │   ├── currencies.ts
│   │   ├── emojis.ts
│   │   ├── models.ts
│   │   ├── periodic-table.ts
│   │   ├── pi.ts
│   │   ├── pokedex.ts
│   │   ├── timezones.ts
│   │   ├── twinkle-twinkle-little-star.ts
│   │   ├── weather.ts
│   │   └── wordle.ts
│   ├── examples/
│   │   └── example.yaml
│   ├── hooks/
│   │   ├── boolean/
│   │   │   ├── use-boolean.tsx
│   │   │   └── use-toggle.tsx
│   │   ├── events/
│   │   │   ├── use-keyboard.tsx
│   │   │   ├── use-media-query.tsx
│   │   │   ├── use-resize.tsx
│   │   │   └── use-scroll.tsx
│   │   ├── info/
│   │   │   ├── use-browser.tsx
│   │   │   ├── use-language.tsx
│   │   │   └── use-screen.tsx
│   │   ├── navigator/
│   │   │   ├── use-bluetooth.tsx
│   │   │   └── use-camera.tsx
│   │   ├── network/
│   │   │   ├── use-fetch.tsx
│   │   │   └── use-online.tsx
│   │   ├── ssr/
│   │   │   └── use-isomorphic-layout-effect.tsx
│   │   ├── time/
│   │   │   ├── use-countdown.tsx
│   │   │   ├── use-interval.tsx
│   │   │   └── use-timeout.tsx
│   │   ├── use-dark-mode.ts
│   │   ├── use-debounce.ts
│   │   └── use-indexed-db.ts
│   ├── json/
│   │   ├── inflation/
│   │   │   ├── countries_currencies.json
│   │   │   ├── currencies.json
│   │   │   └── history.json
│   │   ├── palindrome/
│   │   │   ├── emordnilap.json
│   │   │   └── palindrome.json
│   │   ├── currency.json
│   │   └── words.json
│   ├── middlewares/
│   │   └── rate-limit.ts
│   ├── pages/
│   │   ├── api/
│   │   │   ├── openrouter/
│   │   │   │   └── index.ts
│   │   │   ├── trpc/
│   │   │   │   └── [trpc].ts
│   │   │   └── youtube/
│   │   │       └── transcript/
│   │   │           └── [id]/
│   │   │               └── index.ts
│   │   ├── app/
│   │   │   └── attractors/
│   │   │       └── index.tsx
│   │   ├── components/
│   │   │   └── index.tsx
│   │   ├── downloads/
│   │   │   └── index.tsx
│   │   ├── version/
│   │   │   └── index.tsx
│   │   ├── 404.tsx
│   │   ├── 500.tsx
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   ├── _error.tsx
│   │   └── index.tsx
│   ├── server/
│   │   ├── routers/
│   │   │   └── _app.ts
│   │   └── trpc.ts
│   ├── services/
│   │   ├── openrouter/
│   │   │   └── openrouter.service.ts
│   │   ├── yaml2pdfmake/
│   │   │   ├── yaml2pdfmake.service.ts
│   │   │   └── yaml2pdfmake.types.ts
│   │   └── youtube/
│   │       └── youtube.service.ts
│   ├── styles/
│   │   └── globals.css
│   └── utils/
│       └── trpc.ts
├── src-tauri/
│   ├── capabilities/
│   │   └── default.json
│   ├── icons/
│   │   ├── 128x128.png
│   │   ├── 128x128@2x.png
│   │   ├── 32x32.png
│   │   ├── Square107x107Logo.png
│   │   ├── Square142x142Logo.png
│   │   ├── Square150x150Logo.png
│   │   ├── Square284x284Logo.png
│   │   ├── Square30x30Logo.png
│   │   ├── Square310x310Logo.png
│   │   ├── Square44x44Logo.png
│   │   ├── Square71x71Logo.png
│   │   ├── Square89x89Logo.png
│   │   ├── StoreLogo.png
│   │   ├── icon.icns
│   │   ├── icon.ico
│   │   └── icon.png
│   ├── src/
│   │   ├── lib.rs
│   │   └── main.rs
│   ├── Cargo.toml
│   ├── build.rs
│   └── tauri.conf.json
├── README.md
├── TREE.md
├── capacitor.config.ts
├── eslint.config.mts
├── jest.config.ts
├── jest.setup.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

177 directories, 497 files
