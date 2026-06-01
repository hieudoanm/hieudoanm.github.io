# TREE

```bash
├── prisma/
│   └── schema.prisma
├── public/
│   ├── favicon.ico
│   ├── manifest.json
│   ├── robots.txt
│   ├── sitemap.xml
│   └── sw.js
├── scripts/
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
│   │   │   │   ├── BlogDate.test.tsx
│   │   │   │   ├── ChatBubble.test.tsx
│   │   │   │   ├── ChatTimestamp.test.tsx
│   │   │   │   ├── ModalWrapper.test.tsx
│   │   │   │   └── TagBadge.test.tsx
│   │   │   ├── BlogDate.tsx
│   │   │   ├── ChatBubble.tsx
│   │   │   ├── ChatTimestamp.tsx
│   │   │   ├── ModalWrapper.tsx
│   │   │   ├── TagBadge.tsx
│   │   │   └── index.ts
│   │   ├── molecules/
│   │   │   ├── __tests__/
│   │   │   │   ├── BlogCard.test.tsx
│   │   │   │   ├── BlogCardList.test.tsx
│   │   │   │   ├── BlogSidebar.test.tsx
│   │   │   │   ├── ChatInput.test.tsx
│   │   │   │   ├── ChatMessageList.test.tsx
│   │   │   │   ├── ChatModelSelect.test.tsx
│   │   │   │   └── VirtualTable.test.tsx
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
│   │   │   │   │   ├── BlogFooter.test.tsx
│   │   │   │   │   └── BlogHeader.test.tsx
│   │   │   │   ├── BlogFooter.tsx
│   │   │   │   └── BlogHeader.tsx
│   │   │   ├── chat/
│   │   │   │   ├── __tests__/
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
│   │   │   └── start/
│   │   │       ├── cards/
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
│   │   │       │   │   ├── CalculatorModal.tsx
│   │   │       │   │   ├── EloModal.tsx
│   │   │       │   │   ├── InflationModal.tsx
│   │   │       │   │   ├── PokerModal.tsx
│   │   │       │   │   └── TaxModal.tsx
│   │   │       │   ├── clocks/
│   │   │       │   │   ├── ChessClockModal.tsx
│   │   │       │   │   ├── CountdownModal.tsx
│   │   │       │   │   ├── PomodoroModal.tsx
│   │   │       │   │   └── WatchfaceModal.tsx
│   │   │       │   ├── converters/
│   │   │       │   │   ├── BrailleModal.tsx
│   │   │       │   │   ├── ColorsModal.tsx
│   │   │       │   │   ├── MorseModal.tsx
│   │   │       │   │   └── OpenAPI2Postman.tsx
│   │   │       │   ├── editors/
│   │   │       │   │   ├── JSONSchemaModal.tsx
│   │   │       │   │   ├── ManifestModal.tsx
│   │   │       │   │   ├── MarkdownModal.tsx
│   │   │       │   │   ├── RedactModal.tsx
│   │   │       │   │   ├── ResumeModal.tsx
│   │   │       │   │   └── SlidesModal.tsx
│   │   │       │   ├── education/
│   │   │       │   │   ├── academic/
│   │   │       │   │   │   └── DOIModal.tsx
│   │   │       │   │   ├── chemistry/
│   │   │       │   │   │   └── PeriodicTableModal.tsx
│   │   │       │   │   ├── languages/
│   │   │       │   │   │   ├── EnglishModal.tsx
│   │   │       │   │   │   ├── FlashcardsModal.tsx
│   │   │       │   │   │   └── SignModal.tsx
│   │   │       │   │   └── music/
│   │   │       │   │       └── PitchModal.tsx
│   │   │       │   ├── eyes/
│   │   │       │   │   ├── LogMARChartModal.tsx
│   │   │       │   │   ├── SnellenChartModal.tsx
│   │   │       │   │   └── TumblingEChartModal.tsx
│   │   │       │   ├── games/
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
│   │   │       │       ├── CalendarTracker.tsx
│   │   │       │       └── LegislationModal.tsx
│   │   │       └── sidebars/
│   │   │           ├── LeftSidebar/
│   │   │           │   ├── tabs/
│   │   │           │   │   ├── FreeModelsTab.tsx
│   │   │           │   │   ├── StatusTab.tsx
│   │   │           │   │   ├── TasksTab.tsx
│   │   │           │   │   └── TimeTab.tsx
│   │   │           │   └── index.tsx
│   │   │           └── RightSidebar/
│   │   │               ├── tabs/
│   │   │               │   ├── CurrencyTab.tsx
│   │   │               │   ├── DateTimeTab.tsx
│   │   │               │   └── PassportTab.tsx
│   │   │               └── index.tsx
│   │   └── templates/
│   │       ├── app/
│   │       │   ├── ChatTemplate/
│   │       │   │   ├── ChatTemplate.tsx
│   │       │   │   └── index.ts
│   │       │   ├── DashboardTemplate/
│   │       │   │   ├── __tests__/
│   │       │   │   │   └── DashboardTemplate.test.tsx
│   │       │   │   ├── DashboardTemplate.tsx
│   │       │   │   └── index.ts
│   │       │   ├── DownloadsTemplate/
│   │       │   │   ├── DownloadsTemplate.tsx
│   │       │   │   └── index.ts
│   │       │   ├── LandingTemplate/
│   │       │   │   ├── LandingTemplate.tsx
│   │       │   │   └── index.ts
│   │       │   └── VersionTemplate/
│   │       │       ├── VersionTemplate.tsx
│   │       │       └── index.ts
│   │       ├── auth/
│   │       │   ├── PasswordForgetTemplate/
│   │       │   │   ├── PasswordForgetTemplate.tsx
│   │       │   │   └── index.ts
│   │       │   ├── PasswordResetTemplate/
│   │       │   │   ├── PasswordResetTemplate.tsx
│   │       │   │   └── index.ts
│   │       │   ├── ProfileTemplate/
│   │       │   │   ├── ProfileTemplate.tsx
│   │       │   │   └── index.ts
│   │       │   ├── SignInTemplate/
│   │       │   │   ├── SignInTemplate.tsx
│   │       │   │   └── index.ts
│   │       │   └── SignUpTemplate/
│   │       │       ├── SignUpTemplate.tsx
│   │       │       └── index.ts
│   │       ├── blog/
│   │       │   ├── BlogTemplate/
│   │       │   │   ├── BlogTemplate.tsx
│   │       │   │   └── index.ts
│   │       │   └── BlogsTemplate/
│   │       │       ├── BlogsTemplate.tsx
│   │       │       └── index.ts
│   │       ├── shared/
│   │       │   ├── ComponentsTemplate/
│   │       │   │   ├── ComponentsTemplate.tsx
│   │       │   │   └── index.ts
│   │       │   ├── ErrorTemplate/
│   │       │   │   ├── ErrorTemplate.tsx
│   │       │   │   └── index.ts
│   │       │   └── HeadTemplate/
│   │       │       ├── HeadTemplate.tsx
│   │       │       └── index.ts
│   │       └── store/
│   │           ├── StoreFrontTemplate/
│   │           │   ├── StoreFrontTemplate.tsx
│   │           │   └── index.ts
│   │           └── StoreItemTemplate/
│   │               ├── StoreItemTemplate.tsx
│   │               └── index.ts
│   ├── constants/
│   │   └── models.ts
│   ├── contexts/
│   │   ├── LanguageContext.tsx
│   │   ├── ModalContext.tsx
│   │   ├── NotificationContext.tsx
│   │   ├── SettingsContext.tsx
│   │   ├── TelegramContext.tsx
│   │   ├── ThemeContext.tsx
│   │   └── index.ts
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
│   ├── routes/
│   │   ├── api/
│   │   │   ├── trpc/
│   │   │   │   └── [trpc].ts
│   │   │   ├── youtube/
│   │   │   │   └── transcript/
│   │   │   │       └── [id].ts
│   │   │   └── openrouter.ts
│   │   ├── 500.tsx
│   │   ├── [...404].tsx
│   │   ├── app.tsx
│   │   ├── downloads.tsx
│   │   ├── index.tsx
│   │   └── version.tsx
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
│   ├── signals/
│   │   ├── boolean/
│   │   │   ├── create-boolean.ts
│   │   │   └── create-toggle.ts
│   │   ├── events/
│   │   │   ├── create-keyboard.ts
│   │   │   ├── create-media-query.ts
│   │   │   ├── create-resize.ts
│   │   │   └── create-scroll.ts
│   │   ├── info/
│   │   │   ├── create-browser.ts
│   │   │   ├── create-language.ts
│   │   │   └── create-screen.ts
│   │   ├── navigator/
│   │   │   ├── create-bluetooth.ts
│   │   │   └── create-camera.ts
│   │   ├── network/
│   │   │   ├── create-fetch.ts
│   │   │   └── create-online.ts
│   │   ├── time/
│   │   │   ├── create-countdown.ts
│   │   │   ├── create-interval.ts
│   │   │   └── create-timeout.ts
│   │   ├── create-dark-mode.ts
│   │   ├── create-debounce.ts
│   │   ├── create-indexed-db.ts
│   │   └── index.ts
│   ├── styles/
│   │   └── globals.css
│   ├── utils/
│   │   └── trpc.ts
│   ├── app.tsx
│   ├── entry-client.tsx
│   ├── entry-server.tsx
│   └── global.d.ts
├── src-tauri/
│   ├── capabilities/
│   │   └── default.json
│   ├── src/
│   │   ├── lib.rs
│   │   └── main.rs
│   ├── Cargo.toml
│   ├── build.rs
│   └── tauri.conf.json
├── README.md
├── TREE.md
├── capacitor.config.ts
├── env.d.ts
├── eslint.config.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
└── vitest.setup.ts
```

112 directories, 313 files
