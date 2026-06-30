# TREE

```text
├── prisma/
│   └── [schema.prisma](./prisma/schema.prisma)
├── public/
│   ├── [favicon.ico](./public/favicon.ico)
│   ├── [manifest.json](./public/manifest.json)
│   ├── [robots.txt](./public/robots.txt)
│   ├── [sitemap.xml](./public/sitemap.xml)
│   └── [sw.js](./public/sw.js)
├── scripts/
│   ├── [currency.ts](./scripts/currency.ts)
│   └── [tsconfig.json](./scripts/tsconfig.json)
├── src/
│   ├── clients/
│   │   ├── gemini/
│   │   │   ├── [gemini.client.ts](./src/clients/gemini/gemini.client.ts)
│   │   │   └── [gemini.enums.ts](./src/clients/gemini/gemini.enums.ts)
│   │   ├── openrouter/
│   │   │   ├── [openrouter.client.ts](./src/clients/openrouter/openrouter.client.ts)
│   │   │   └── [openrouter.enums.ts](./src/clients/openrouter/openrouter.enums.ts)
│   │   └── wordsapi.com/
│   │       └── [wordsapi.client.ts](./src/clients/wordsapi.com/wordsapi.client.ts)
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── __tests__/
│   │   │   │   ├── [BlogDate.test.tsx](./src/components/atoms/__tests__/BlogDate.test.tsx)
│   │   │   │   ├── [ChatBubble.test.tsx](./src/components/atoms/__tests__/ChatBubble.test.tsx)
│   │   │   │   ├── [ChatTimestamp.test.tsx](./src/components/atoms/__tests__/ChatTimestamp.test.tsx)
│   │   │   │   ├── [ModalWrapper.test.tsx](./src/components/atoms/__tests__/ModalWrapper.test.tsx)
│   │   │   │   └── [TagBadge.test.tsx](./src/components/atoms/__tests__/TagBadge.test.tsx)
│   │   │   ├── [BlogDate.tsx](./src/components/atoms/BlogDate.tsx)
│   │   │   ├── [ChatBubble.tsx](./src/components/atoms/ChatBubble.tsx)
│   │   │   ├── [ChatTimestamp.tsx](./src/components/atoms/ChatTimestamp.tsx)
│   │   │   ├── [ModalWrapper.tsx](./src/components/atoms/ModalWrapper.tsx)
│   │   │   ├── [TagBadge.tsx](./src/components/atoms/TagBadge.tsx)
│   │   │   └── [index.ts](./src/components/atoms/index.ts)
│   │   ├── molecules/
│   │   │   ├── __tests__/
│   │   │   │   ├── [BlogCard.test.tsx](./src/components/molecules/__tests__/BlogCard.test.tsx)
│   │   │   │   ├── [BlogCardList.test.tsx](./src/components/molecules/__tests__/BlogCardList.test.tsx)
│   │   │   │   ├── [BlogSidebar.test.tsx](./src/components/molecules/__tests__/BlogSidebar.test.tsx)
│   │   │   │   ├── [ChatInput.test.tsx](./src/components/molecules/__tests__/ChatInput.test.tsx)
│   │   │   │   ├── [ChatMessageList.test.tsx](./src/components/molecules/__tests__/ChatMessageList.test.tsx)
│   │   │   │   ├── [ChatModelSelect.test.tsx](./src/components/molecules/__tests__/ChatModelSelect.test.tsx)
│   │   │   │   └── [VirtualTable.test.tsx](./src/components/molecules/__tests__/VirtualTable.test.tsx)
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
│   │   │   │   │   ├── [BlogFooter.test.tsx](./src/components/organisms/blog/__tests__/BlogFooter.test.tsx)
│   │   │   │   │   └── [BlogHeader.test.tsx](./src/components/organisms/blog/__tests__/BlogHeader.test.tsx)
│   │   │   │   ├── [BlogFooter.tsx](./src/components/organisms/blog/BlogFooter.tsx)
│   │   │   │   └── [BlogHeader.tsx](./src/components/organisms/blog/BlogHeader.tsx)
│   │   │   ├── chat/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [ChatFooter.test.tsx](./src/components/organisms/chat/__tests__/ChatFooter.test.tsx)
│   │   │   │   │   ├── [ChatHeader.test.tsx](./src/components/organisms/chat/__tests__/ChatHeader.test.tsx)
│   │   │   │   │   └── [ChatSidebar.test.tsx](./src/components/organisms/chat/__tests__/ChatSidebar.test.tsx)
│   │   │   │   ├── [ChatFooter.tsx](./src/components/organisms/chat/ChatFooter.tsx)
│   │   │   │   ├── [ChatHeader.tsx](./src/components/organisms/chat/ChatHeader.tsx)
│   │   │   │   └── [ChatSidebar.tsx](./src/components/organisms/chat/ChatSidebar.tsx)
│   │   │   ├── common/
│   │   │   │   └── [PhotosGrid.tsx](./src/components/organisms/common/PhotosGrid.tsx)
│   │   │   ├── landing/
│   │   │   │   ├── __tests__/
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
│   │   │   └── start/
│   │   │       ├── cards/
│   │   │       │   ├── __tests__/
│   │   │       │   │   ├── [AppCard.test.tsx](./src/components/pages/start/cards/__tests__/AppCard.test.tsx)
│   │   │       │   │   ├── [BookmarkCard.test.tsx](./src/components/pages/start/cards/__tests__/BookmarkCard.test.tsx)
│   │   │       │   │   ├── [CityCard.test.tsx](./src/components/pages/start/cards/__tests__/CityCard.test.tsx)
│   │   │       │   │   ├── [DownloadCard.test.tsx](./src/components/pages/start/cards/__tests__/DownloadCard.test.tsx)
│   │   │       │   │   └── [ToolCard.test.tsx](./src/components/pages/start/cards/__tests__/ToolCard.test.tsx)
│   │   │       │   ├── [AppCard.tsx](./src/components/pages/start/cards/AppCard.tsx)
│   │   │       │   ├── [BookmarkCard.tsx](./src/components/pages/start/cards/BookmarkCard.tsx)
│   │   │       │   ├── [CityCard.tsx](./src/components/pages/start/cards/CityCard.tsx)
│   │   │       │   ├── [DownloadCard.tsx](./src/components/pages/start/cards/DownloadCard.tsx)
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
│   │   │       │   │   │   ├── [CalculatorModal.test.tsx](./src/components/pages/start/modals/calculators/__tests__/CalculatorModal.test.tsx)
│   │   │       │   │   │   ├── [EloModal.test.tsx](./src/components/pages/start/modals/calculators/__tests__/EloModal.test.tsx)
│   │   │       │   │   │   ├── [InflationModal.test.tsx](./src/components/pages/start/modals/calculators/__tests__/InflationModal.test.tsx)
│   │   │       │   │   │   ├── [PokerModal.test.tsx](./src/components/pages/start/modals/calculators/__tests__/PokerModal.test.tsx)
│   │   │       │   │   │   └── [TaxModal.test.tsx](./src/components/pages/start/modals/calculators/__tests__/TaxModal.test.tsx)
│   │   │       │   │   ├── [CalculatorModal.tsx](./src/components/pages/start/modals/calculators/CalculatorModal.tsx)
│   │   │       │   │   ├── [EloModal.tsx](./src/components/pages/start/modals/calculators/EloModal.tsx)
│   │   │       │   │   ├── [InflationModal.tsx](./src/components/pages/start/modals/calculators/InflationModal.tsx)
│   │   │       │   │   ├── [PokerModal.tsx](./src/components/pages/start/modals/calculators/PokerModal.tsx)
│   │   │       │   │   └── [TaxModal.tsx](./src/components/pages/start/modals/calculators/TaxModal.tsx)
│   │   │       │   ├── clocks/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   ├── [ChessClockModal.tsx](./src/components/pages/start/modals/clocks/ChessClockModal.tsx)
│   │   │       │   │   ├── [CountdownModal.tsx](./src/components/pages/start/modals/clocks/CountdownModal.tsx)
│   │   │       │   │   ├── [CronModal.tsx](./src/components/pages/start/modals/clocks/CronModal.tsx)
│   │   │       │   │   ├── [PomodoroModal.tsx](./src/components/pages/start/modals/clocks/PomodoroModal.tsx)
│   │   │       │   │   └── [WatchfaceModal.tsx](./src/components/pages/start/modals/clocks/WatchfaceModal.tsx)
│   │   │       │   ├── converters/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   ├── [BrailleModal.tsx](./src/components/pages/start/modals/converters/BrailleModal.tsx)
│   │   │       │   │   ├── [ColorsModal.tsx](./src/components/pages/start/modals/converters/ColorsModal.tsx)
│   │   │       │   │   ├── [MorseModal.tsx](./src/components/pages/start/modals/converters/MorseModal.tsx)
│   │   │       │   │   └── [OpenAPI2Postman.tsx](./src/components/pages/start/modals/converters/OpenAPI2Postman.tsx)
│   │   │       │   ├── editors/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   ├── [JSONSchemaModal.tsx](./src/components/pages/start/modals/editors/JSONSchemaModal.tsx)
│   │   │       │   │   ├── [ManifestModal.tsx](./src/components/pages/start/modals/editors/ManifestModal.tsx)
│   │   │       │   │   ├── [MarkdownModal.tsx](./src/components/pages/start/modals/editors/MarkdownModal.tsx)
│   │   │       │   │   ├── [RedactModal.tsx](./src/components/pages/start/modals/editors/RedactModal.tsx)
│   │   │       │   │   ├── [ResumeModal.tsx](./src/components/pages/start/modals/editors/ResumeModal.tsx)
│   │   │       │   │   └── [SlidesModal.tsx](./src/components/pages/start/modals/editors/SlidesModal.tsx)
│   │   │       │   ├── education/
│   │   │       │   │   ├── academic/
│   │   │       │   │   │   └── [DOIModal.tsx](./src/components/pages/start/modals/education/academic/DOIModal.tsx)
│   │   │       │   │   ├── chemistry/
│   │   │       │   │   │   └── [PeriodicTableModal.tsx](./src/components/pages/start/modals/education/chemistry/PeriodicTableModal.tsx)
│   │   │       │   │   ├── languages/
│   │   │       │   │   │   ├── [EnglishModal.tsx](./src/components/pages/start/modals/education/languages/EnglishModal.tsx)
│   │   │       │   │   │   ├── [FlashcardsModal.tsx](./src/components/pages/start/modals/education/languages/FlashcardsModal.tsx)
│   │   │       │   │   │   └── [SignModal.tsx](./src/components/pages/start/modals/education/languages/SignModal.tsx)
│   │   │       │   │   └── music/
│   │   │       │   │       └── [PitchModal.tsx](./src/components/pages/start/modals/education/music/PitchModal.tsx)
│   │   │       │   ├── eyes/
│   │   │       │   │   ├── [LogMARChartModal.tsx](./src/components/pages/start/modals/eyes/LogMARChartModal.tsx)
│   │   │       │   │   ├── [SnellenChartModal.tsx](./src/components/pages/start/modals/eyes/SnellenChartModal.tsx)
│   │   │       │   │   └── [TumblingEChartModal.tsx](./src/components/pages/start/modals/eyes/TumblingEChartModal.tsx)
│   │   │       │   ├── games/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── [BlackjackModal.test.tsx](./src/components/pages/start/modals/games/__tests__/BlackjackModal.test.tsx)
│   │   │       │   │   │   ├── [T3Modal.test.tsx](./src/components/pages/start/modals/games/__tests__/T3Modal.test.tsx)
│   │   │       │   │   │   ├── [TowersModal.test.tsx](./src/components/pages/start/modals/games/__tests__/TowersModal.test.tsx)
│   │   │       │   │   │   └── [WordleModal.test.tsx](./src/components/pages/start/modals/games/__tests__/WordleModal.test.tsx)
│   │   │       │   │   ├── [BlackjackModal.tsx](./src/components/pages/start/modals/games/BlackjackModal.tsx)
│   │   │       │   │   ├── [PalindromeModal.tsx](./src/components/pages/start/modals/games/PalindromeModal.tsx)
│   │   │       │   │   ├── [PiNumberModal.tsx](./src/components/pages/start/modals/games/PiNumberModal.tsx)
│   │   │       │   │   ├── [PokedexModal.tsx](./src/components/pages/start/modals/games/PokedexModal.tsx)
│   │   │       │   │   ├── [QuizifyModal.tsx](./src/components/pages/start/modals/games/QuizifyModal.tsx)
│   │   │       │   │   ├── [RecallModal.tsx](./src/components/pages/start/modals/games/RecallModal.tsx)
│   │   │       │   │   ├── [T3Modal.tsx](./src/components/pages/start/modals/games/T3Modal.tsx)
│   │   │       │   │   ├── [TowersModal.tsx](./src/components/pages/start/modals/games/TowersModal.tsx)
│   │   │       │   │   ├── [TypoglycemiaModal.tsx](./src/components/pages/start/modals/games/TypoglycemiaModal.tsx)
│   │   │       │   │   └── [WordleModal.tsx](./src/components/pages/start/modals/games/WordleModal.tsx)
│   │   │       │   ├── images/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   └── [HouseModal.test.tsx](./src/components/pages/start/modals/images/__tests__/HouseModal.test.tsx)
│   │   │       │   │   ├── [BreakingBadModal.tsx](./src/components/pages/start/modals/images/BreakingBadModal.tsx)
│   │   │       │   │   ├── [CameraModal.tsx](./src/components/pages/start/modals/images/CameraModal.tsx)
│   │   │       │   │   ├── [GitHubSocialPreviewModal.tsx](./src/components/pages/start/modals/images/GitHubSocialPreviewModal.tsx)
│   │   │       │   │   ├── [HouseModal.tsx](./src/components/pages/start/modals/images/HouseModal.tsx)
│   │   │       │   │   ├── [InstaSizeModal.tsx](./src/components/pages/start/modals/images/InstaSizeModal.tsx)
│   │   │       │   │   ├── [InvoiceParserModal.tsx](./src/components/pages/start/modals/images/InvoiceParserModal.tsx)
│   │   │       │   │   ├── [QRCodeModal.tsx](./src/components/pages/start/modals/images/QRCodeModal.tsx)
│   │   │       │   │   └── [YouTubeThumbnailsModal.tsx](./src/components/pages/start/modals/images/YouTubeThumbnailsModal.tsx)
│   │   │       │   ├── tools/
│   │   │       │   │   ├── ChatModal/
│   │   │       │   │   │   ├── [ChatCounter.tsx](./src/components/pages/start/modals/tools/ChatModal/ChatCounter.tsx)
│   │   │       │   │   │   ├── [ChatMessages.tsx](./src/components/pages/start/modals/tools/ChatModal/ChatMessages.tsx)
│   │   │       │   │   │   ├── [ChatModal.tsx](./src/components/pages/start/modals/tools/ChatModal/ChatModal.tsx)
│   │   │       │   │   │   └── [index.ts](./src/components/pages/start/modals/tools/ChatModal/index.ts)
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── [EmojisModal.test.tsx](./src/components/pages/start/modals/tools/__tests__/EmojisModal.test.tsx)
│   │   │       │   │   │   ├── [KaprekarModal.test.tsx](./src/components/pages/start/modals/tools/__tests__/KaprekarModal.test.tsx)
│   │   │       │   │   │   └── [ProxyModal.test.tsx](./src/components/pages/start/modals/tools/__tests__/ProxyModal.test.tsx)
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
│   │   │       │       ├── [CalendarTracker.tsx](./src/components/pages/start/modals/visualization/CalendarTracker.tsx)
│   │   │       │       └── [LegislationModal.tsx](./src/components/pages/start/modals/visualization/LegislationModal.tsx)
│   │   │       └── sidebars/
│   │   │           ├── LeftSidebar/
│   │   │           │   ├── __tests__/
│   │   │           │   │   └── [LeftSidebar.test.tsx](./src/components/pages/start/sidebars/LeftSidebar/__tests__/LeftSidebar.test.tsx)
│   │   │           │   ├── tabs/
│   │   │           │   │   ├── [FreeModelsTab.tsx](./src/components/pages/start/sidebars/LeftSidebar/tabs/FreeModelsTab.tsx)
│   │   │           │   │   ├── [StatusTab.tsx](./src/components/pages/start/sidebars/LeftSidebar/tabs/StatusTab.tsx)
│   │   │           │   │   ├── [TasksTab.tsx](./src/components/pages/start/sidebars/LeftSidebar/tabs/TasksTab.tsx)
│   │   │           │   │   └── [TimeTab.tsx](./src/components/pages/start/sidebars/LeftSidebar/tabs/TimeTab.tsx)
│   │   │           │   └── [index.tsx](./src/components/pages/start/sidebars/LeftSidebar/index.tsx)
│   │   │           └── RightSidebar/
│   │   │               ├── __tests__/
│   │   │               │   └── [RightSidebar.test.tsx](./src/components/pages/start/sidebars/RightSidebar/__tests__/RightSidebar.test.tsx)
│   │   │               ├── tabs/
│   │   │               │   ├── [CurrencyTab.tsx](./src/components/pages/start/sidebars/RightSidebar/tabs/CurrencyTab.tsx)
│   │   │               │   ├── [DateTimeTab.tsx](./src/components/pages/start/sidebars/RightSidebar/tabs/DateTimeTab.tsx)
│   │   │               │   └── [PassportTab.tsx](./src/components/pages/start/sidebars/RightSidebar/tabs/PassportTab.tsx)
│   │   │               └── [index.tsx](./src/components/pages/start/sidebars/RightSidebar/index.tsx)
│   │   └── templates/
│   │       ├── app/
│   │       │   ├── ChatTemplate/
│   │       │   │   ├── [ChatTemplate.tsx](./src/components/templates/app/ChatTemplate/ChatTemplate.tsx)
│   │       │   │   └── [index.ts](./src/components/templates/app/ChatTemplate/index.ts)
│   │       │   ├── DashboardTemplate/
│   │       │   │   ├── __tests__/
│   │       │   │   │   └── [DashboardTemplate.test.tsx](./src/components/templates/app/DashboardTemplate/__tests__/DashboardTemplate.test.tsx)
│   │       │   │   ├── [DashboardTemplate.tsx](./src/components/templates/app/DashboardTemplate/DashboardTemplate.tsx)
│   │       │   │   └── [index.ts](./src/components/templates/app/DashboardTemplate/index.ts)
│   │       │   ├── DownloadsTemplate/
│   │       │   │   ├── [DownloadsTemplate.tsx](./src/components/templates/app/DownloadsTemplate/DownloadsTemplate.tsx)
│   │       │   │   └── [index.ts](./src/components/templates/app/DownloadsTemplate/index.ts)
│   │       │   ├── LandingTemplate/
│   │       │   │   ├── [LandingTemplate.tsx](./src/components/templates/app/LandingTemplate/LandingTemplate.tsx)
│   │       │   │   └── [index.ts](./src/components/templates/app/LandingTemplate/index.ts)
│   │       │   └── VersionTemplate/
│   │       │       ├── [VersionTemplate.tsx](./src/components/templates/app/VersionTemplate/VersionTemplate.tsx)
│   │       │       └── [index.ts](./src/components/templates/app/VersionTemplate/index.ts)
│   │       ├── auth/
│   │       │   ├── PasswordForgetTemplate/
│   │       │   │   ├── [PasswordForgetTemplate.tsx](./src/components/templates/auth/PasswordForgetTemplate/PasswordForgetTemplate.tsx)
│   │       │   │   └── [index.ts](./src/components/templates/auth/PasswordForgetTemplate/index.ts)
│   │       │   ├── PasswordResetTemplate/
│   │       │   │   ├── [PasswordResetTemplate.tsx](./src/components/templates/auth/PasswordResetTemplate/PasswordResetTemplate.tsx)
│   │       │   │   └── [index.ts](./src/components/templates/auth/PasswordResetTemplate/index.ts)
│   │       │   ├── ProfileTemplate/
│   │       │   │   ├── [ProfileTemplate.tsx](./src/components/templates/auth/ProfileTemplate/ProfileTemplate.tsx)
│   │       │   │   └── [index.ts](./src/components/templates/auth/ProfileTemplate/index.ts)
│   │       │   ├── SignInTemplate/
│   │       │   │   ├── [SignInTemplate.tsx](./src/components/templates/auth/SignInTemplate/SignInTemplate.tsx)
│   │       │   │   └── [index.ts](./src/components/templates/auth/SignInTemplate/index.ts)
│   │       │   └── SignUpTemplate/
│   │       │       ├── [SignUpTemplate.tsx](./src/components/templates/auth/SignUpTemplate/SignUpTemplate.tsx)
│   │       │       └── [index.ts](./src/components/templates/auth/SignUpTemplate/index.ts)
│   │       ├── blog/
│   │       │   ├── BlogTemplate/
│   │       │   │   ├── [BlogTemplate.tsx](./src/components/templates/blog/BlogTemplate/BlogTemplate.tsx)
│   │       │   │   └── [index.ts](./src/components/templates/blog/BlogTemplate/index.ts)
│   │       │   └── BlogsTemplate/
│   │       │       ├── [BlogsTemplate.tsx](./src/components/templates/blog/BlogsTemplate/BlogsTemplate.tsx)
│   │       │       └── [index.ts](./src/components/templates/blog/BlogsTemplate/index.ts)
│   │       ├── shared/
│   │       │   ├── ComponentsTemplate/
│   │       │   │   ├── [ComponentsTemplate.tsx](./src/components/templates/shared/ComponentsTemplate/ComponentsTemplate.tsx)
│   │       │   │   └── [index.ts](./src/components/templates/shared/ComponentsTemplate/index.ts)
│   │       │   ├── ErrorTemplate/
│   │       │   │   ├── [ErrorTemplate.tsx](./src/components/templates/shared/ErrorTemplate/ErrorTemplate.tsx)
│   │       │   │   └── [index.ts](./src/components/templates/shared/ErrorTemplate/index.ts)
│   │       │   └── HeadTemplate/
│   │       │       ├── [HeadTemplate.tsx](./src/components/templates/shared/HeadTemplate/HeadTemplate.tsx)
│   │       │       └── [index.ts](./src/components/templates/shared/HeadTemplate/index.ts)
│   │       └── store/
│   │           ├── StoreFrontTemplate/
│   │           │   ├── [StoreFrontTemplate.tsx](./src/components/templates/store/StoreFrontTemplate/StoreFrontTemplate.tsx)
│   │           │   └── [index.ts](./src/components/templates/store/StoreFrontTemplate/index.ts)
│   │           └── StoreItemTemplate/
│   │               ├── [StoreItemTemplate.tsx](./src/components/templates/store/StoreItemTemplate/StoreItemTemplate.tsx)
│   │               └── [index.ts](./src/components/templates/store/StoreItemTemplate/index.ts)
│   ├── constants/
│   │   └── [models.ts](./src/constants/models.ts)
│   ├── data/
│   │   ├── bookmarks/
│   │   │   ├── [chat.ts](./src/data/bookmarks/chat.ts)
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
│   │   ├── downloads/
│   │   │   ├── [agents.ts](./src/data/downloads/agents.ts)
│   │   │   ├── [clis.ts](./src/data/downloads/clis.ts)
│   │   │   ├── [extensions.ts](./src/data/downloads/extensions.ts)
│   │   │   ├── [ides.ts](./src/data/downloads/ides.ts)
│   │   │   ├── [index.ts](./src/data/downloads/index.ts)
│   │   │   ├── [packages.ts](./src/data/downloads/packages.ts)
│   │   │   └── [types.ts](./src/data/downloads/types.ts)
│   │   ├── manifest/
│   │   │   ├── [extension.ts](./src/data/manifest/extension.ts)
│   │   │   └── [pwa.ts](./src/data/manifest/pwa.ts)
│   │   ├── [apps.ts](./src/data/apps.ts)
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
│   ├── routes/
│   │   ├── api/
│   │   │   ├── trpc/
│   │   │   │   └── [[trpc].ts](./src/routes/api/trpc/[trpc].ts)
│   │   │   ├── youtube/
│   │   │   │   └── transcript/
│   │   │   │       └── [[id].ts](./src/routes/api/youtube/transcript/[id].ts)
│   │   │   └── [openrouter.ts](./src/routes/api/openrouter.ts)
│   │   ├── [500.tsx](./src/routes/500.tsx)
│   │   ├── [[...404].tsx](./src/routes/[...404].tsx)
│   │   ├── [app.tsx](./src/routes/app.tsx)
│   │   ├── [downloads.tsx](./src/routes/downloads.tsx)
│   │   ├── [index.tsx](./src/routes/index.tsx)
│   │   └── [version.tsx](./src/routes/version.tsx)
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
│   ├── utils/
│   │   └── [trpc.ts](./src/utils/trpc.ts)
│   ├── [app.tsx](./src/app.tsx)
│   ├── [entry-client.tsx](./src/entry-client.tsx)
│   ├── [entry-server.tsx](./src/entry-server.tsx)
│   └── [global.d.ts](./src/global.d.ts)
├── src-tauri/
│   ├── capabilities/
│   │   └── [default.json](./src-tauri/capabilities/default.json)
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
├── [env.d.ts](./env.d.ts)
├── [eslint.config.ts](./eslint.config.ts)
├── [package.json](./package.json)
├── [tsconfig.json](./tsconfig.json)
├── [vite.config.ts](./vite.config.ts)
├── [vitest.config.ts](./vitest.config.ts)
└── [vitest.setup.ts](./vitest.setup.ts)
```

115 directories, 307 files
