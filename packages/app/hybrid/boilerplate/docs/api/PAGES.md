# Pages

Thin `'use client';` wrappers in `src/app/`, one per route, default-exporting
the template (e.g. `const AnalyticsPage = () => <AnalyticsTemplate />;`). There
is a single root `layout.tsx` (mounts `CookieConsentTemplate`); there are **no**
per-route layout files.

The `PagesDirectory` (shown on `/`) lists every example page and reports the
live counts (`256 pages, 261 templates` today; the two extra template files
beyond 261 are the system pages — `NotFoundTemplate`, `ErrorTemplate`,
`GlobalErrorTemplate` — plus `CookieConsentTemplate`/`PageShell` helpers).

### Route structure

| Segment group                  | Base folder                       | Purpose                   |
| ------------------------------ | --------------------------------- | ------------------------- |
| `/`                            | `src/app/(main)/`                 | Main/global pages         |
| `/dashboard` … `/whiteboard`   | `src/app/(app)/`                  | App Workspace + Data & UI |
| `/sign-in` … `/security`       | `src/app/(auth)/`                 | Auth                      |
| `/landing` … `/changelog`      | `src/app/(marketing)/` + `(info)` | Marketing                 |
| `/store` … `/store/gift-cards` | `src/app/store/`                  | Commerce storefront       |
| `/blog` … `/blog/search`       | `src/app/blog/`                   | Blog                      |
| `/admin/*`                     | `src/app/(main)/admin/`           | Commerce Admin            |
| `/finance/*`                   | `src/app/(main)/finance/`         | Finance                   |
| `/developer/*`                 | `src/app/(main)/developer/`       | Developer                 |
| `/social/*`                    | `src/app/(main)/social/`          | Social                    |
| `/media/*`                     | `src/app/(main)/media/`           | Media                     |
| `/support/*`                   | `src/app/(main)/support/`         | Customer Support          |
| `/mail/*`                      | `src/app/(main)/mail/`            | Email                     |
| `/hr/*`                        | `src/app/(main)/hr/`              | HR                        |
| `/crm/*`                       | `src/app/(main)/crm/`             | Sales & CRM               |
| `/learning/*`                  | `src/app/(main)/learning/`        | Learning                  |
| `/news/*`                      | `src/app/(main)/news/`            | News & Magazine           |
| `/music/*`                     | `src/app/(main)/music/`           | Music                     |
| `/streaming/*`                 | `src/app/(main)/streaming/`       | Video Streaming           |
| `/gaming/*`                    | `src/app/(main)/gaming/`          | Gaming                    |
| `/sports/*`                    | `src/app/(main)/sports/`          | Sports                    |
| `/travel/*`                    | `src/app/(main)/travel/`          | Travel                    |
| `/food/*`                      | `src/app/(main)/food/`            | Food & Dining             |
| `/health/*`                    | `src/app/(main)/health/`          | Health & Fitness          |
| `/real-estate/*`               | `src/app/(main)/real-estate/`     | Real Estate               |
| `/iot/*`                       | `src/app/(main)/iot/`             | Smart Home / IoT          |
| `/portfolio/*`                 | `src/app/(main)/portfolio/`       | Portfolio                 |

### Main

| Label      | Route         | Template                                |
| ---------- | ------------- | --------------------------------------- |
| Home       | `/`           | `ComponentsTemplate` (`PagesDirectory`) |
| Dashboard  | `/dashboard`  | `DashboardTemplate`                     |
| Profile    | `/profile`    | `ProfileTemplate`                       |
| Settings   | `/settings`   | `SettingsTemplate`                      |
| Version    | `/version`    | `VersionTemplate`                       |
| Chat       | `/chat`       | `ChatTemplate`                          |
| Onboarding | `/onboarding` | `OnboardingTemplate`                    |
| Search     | `/search`     | `SearchTemplate`                        |

### App Workspace

| Route            | Template                |
| ---------------- | ----------------------- |
| `/analytics`     | `AnalyticsTemplate`     |
| `/calendar`      | `CalendarTemplate`      |
| `/kanban`        | `KanbanTemplate`        |
| `/inbox`         | `InboxTemplate`         |
| `/tasks`         | `TasksTemplate`         |
| `/notes`         | `NotesTemplate`         |
| `/files`         | `FilesTemplate`         |
| `/help`          | `HelpCenterTemplate`    |
| `/members`       | `MembersTemplate`       |
| `/notifications` | `NotificationsTemplate` |
| `/billing`       | `BillingTemplate`       |
| `/integrations`  | `IntegrationsTemplate`  |
| `/activity`      | `ActivityLogTemplate`   |
| `/expenses`      | `ExpensesTemplate`      |
| `/timesheets`    | `TimesheetsTemplate`    |
| `/goals`         | `GoalsTemplate`         |
| `/roadmap`       | `RoadmapTemplate`       |
| `/sprints`       | `SprintsTemplate`       |
| `/reports`       | `ReportsTemplate`       |
| `/contacts`      | `ContactsTemplate`      |
| `/whiteboard`    | `WhiteboardTemplate`    |
| `/meetings`      | `MeetingsTemplate`      |
| `/shortcuts`     | `ShortcutsTemplate`     |
| `/import`        | `ImportTemplate`        |
| `/webhooks`      | `WebhooksTemplate`      |
| `/permissions`   | `PermissionsTemplate`   |

### Data & UI Showcase

| Route           | Template                |
| --------------- | ----------------------- |
| `/data-table`   | `DataTableTemplate`     |
| `/forms`        | `FormsShowcaseTemplate` |
| `/charts`       | `ChartsGalleryTemplate` |
| `/modals`       | `ModalsTemplate`        |
| `/forbidden`    | `ForbiddenTemplate`     |
| `/accordion`    | `AccordionTemplate`     |
| `/alerts`       | `AlertsTemplate`        |
| `/tabs`         | `TabsTemplate`          |
| `/pagination`   | `PaginationTemplate`    |
| `/tooltips`     | `TooltipsTemplate`      |
| `/stepper`      | `StepperTemplate`       |
| `/upload`       | `UploadTemplate`        |
| `/empty-states` | `EmptyStatesTemplate`   |

### Auth

| Route              | Template                   |
| ------------------ | -------------------------- |
| `/sign-in`         | `SignInTemplate`           |
| `/sign-up`         | `SignUpTemplate`           |
| `/forgot-password` | `ForgotPasswordTemplate`   |
| `/reset-password`  | `ResetPasswordTemplate`    |
| `/verify-email`    | `VerifyEmailTemplate`      |
| `/two-factor`      | `TwoFactorTemplate`        |
| `/lock-screen`     | `LockScreenTemplate`       |
| `/change-password` | `ChangePasswordTemplate`   |
| `/sessions`        | `SessionsTemplate`         |
| `/recovery-codes`  | `RecoveryCodesTemplate`    |
| `/delete-account`  | `DeleteAccountTemplate`    |
| `/security`        | `SecurityOverviewTemplate` |

### Marketing

| Route          | Template              |
| -------------- | --------------------- |
| `/landing`     | `LandingTemplate`     |
| `/about`       | `AboutTemplate`       |
| `/terms`       | `TermsTemplate`       |
| `/privacy`     | `PrivacyTemplate`     |
| `/coming-soon` | `ComingSoonTemplate`  |
| `/maintenance` | `MaintenanceTemplate` |
| `/resume`      | `ResumeTemplate`      |
| `/pricing`     | `PricingTemplate`     |
| `/contact`     | `ContactTemplate`     |
| `/careers`     | `CareersTemplate`     |
| `/team`        | `TeamTemplate`        |
| `/changelog`   | `ChangelogTemplate`   |

### Store

| Route                       | Template                    |
| --------------------------- | --------------------------- |
| `/store`                    | `StoreFrontTemplate`        |
| `/store/[id]`               | `StoreItemTemplate`         |
| `/store/cart`               | `CartTemplate`              |
| `/store/checkout`           | `CheckoutTemplate`          |
| `/store/order-confirmation` | `OrderConfirmationTemplate` |
| `/store/order-history`      | `OrderHistoryTemplate`      |
| `/store/wishlist`           | `WishlistTemplate`          |
| `/store/compare`            | `CompareTemplate`           |
| `/store/addresses`          | `AddressBookTemplate`       |
| `/store/payment-methods`    | `PaymentMethodsTemplate`    |
| `/store/tracking`           | `OrderTrackingTemplate`     |
| `/store/deals`              | `DealsTemplate`             |
| `/store/categories`         | `CategoriesTemplate`        |
| `/store/reviews`            | `ReviewsTemplate`           |
| `/store/support`            | `SupportTemplate`           |
| `/store/gift-cards`         | `GiftCardsTemplate`         |

### Blog

| Route              | Template                 |
| ------------------ | ------------------------ |
| `/blog`            | `BlogListTemplate`       |
| `/blog/[slug]`     | `BlogItemTemplate`       |
| `/blog/archive`    | `BlogArchiveTemplate`    |
| `/blog/author`     | `BlogAuthorTemplate`     |
| `/blog/newsletter` | `BlogNewsletterTemplate` |
| `/blog/categories` | `BlogCategoriesTemplate` |
| `/blog/tags`       | `BlogTagsTemplate`       |
| `/blog/search`     | `BlogSearchTemplate`     |

### Commerce Admin

| Route               | Template             |
| ------------------- | -------------------- |
| `/admin/products`   | `ProductsTemplate`   |
| `/admin/orders`     | `OrdersTemplate`     |
| `/admin/customers`  | `CustomersTemplate`  |
| `/admin/inventory`  | `InventoryTemplate`  |
| `/admin/coupons`    | `CouponsTemplate`    |
| `/admin/promotions` | `PromotionsTemplate` |
| `/admin/refunds`    | `RefundsTemplate`    |
| `/admin/shipments`  | `ShipmentsTemplate`  |

### Finance

| Route                    | Template                |
| ------------------------ | ----------------------- |
| `/finance/invoices`      | `InvoicesTemplate`      |
| `/finance/budgets`       | `BudgetsTemplate`       |
| `/finance/subscriptions` | `SubscriptionsTemplate` |
| `/finance/transactions`  | `TransactionsTemplate`  |
| `/finance/taxes`         | `TaxesTemplate`         |
| `/finance/payroll`       | `PayrollTemplate`       |
| `/finance/statements`    | `StatementsTemplate`    |
| `/finance/accounts`      | `AccountsTemplate`      |

### Developer

| Route                      | Template               |
| -------------------------- | ---------------------- |
| `/developer/api-keys`      | `ApiKeysTemplate`      |
| `/developer/feature-flags` | `FeatureFlagsTemplate` |
| `/developer/environments`  | `EnvironmentsTemplate` |
| `/developer/deployments`   | `DeploymentsTemplate`  |
| `/developer/logs`          | `LogsTemplate`         |
| `/developer/endpoints`     | `EndpointsTemplate`    |
| `/developer/monitors`      | `MonitorsTemplate`     |
| `/developer/backups`       | `BackupsTemplate`      |

### Social & Media

| Route               | Template               |
| ------------------- | ---------------------- |
| `/social/feed`      | `FeedTemplate`         |
| `/social/messages`  | `MessagesTemplate`     |
| `/social/events`    | `EventsTemplate`       |
| `/social/groups`    | `GroupsTemplate`       |
| `/social/followers` | `FollowersTemplate`    |
| `/media/library`    | `MediaLibraryTemplate` |
| `/media/albums`     | `AlbumsTemplate`       |
| `/media/video`      | `VideoPlayerTemplate`  |

### Customer Support

| Route                     | Template                 |
| ------------------------- | ------------------------ |
| `/support/tickets`        | `SupportTicketsTemplate` |
| `/support/ticket-detail`  | `TicketDetailTemplate`   |
| `/support/live-chat`      | `LiveChatTemplate`       |
| `/support/knowledge-base` | `KnowledgeBaseTemplate`  |
| `/support/faqs`           | `FaqTemplate`            |
| `/support/announcements`  | `AnnouncementsTemplate`  |
| `/support/status`         | `ServiceStatusTemplate`  |
| `/support/feedback`       | `FeedbackTemplate`       |

### Email

| Route           | Template             |
| --------------- | -------------------- |
| `/mail/inbox`   | `InboxTemplate`      |
| `/mail/thread`  | `ThreadTemplate`     |
| `/mail/compose` | `ComposeTemplate`    |
| `/mail/drafts`  | `DraftsTemplate`     |
| `/mail/sent`    | `SentTemplate`       |
| `/mail/spam`    | `SpamTemplate`       |
| `/mail/labels`  | `LabelsTemplate`     |
| `/mail/search`  | `MailSearchTemplate` |

### HR

| Route           | Template                     |
| --------------- | ---------------------------- |
| `/hr/people`    | `PeopleDirectoryTemplate`    |
| `/hr/org-chart` | `OrgChartTemplate`           |
| `/hr/hiring`    | `HiringPipelineTemplate`     |
| `/hr/policies`  | `PoliciesTemplate`           |
| `/hr/benefits`  | `BenefitsTemplate`           |
| `/hr/reviews`   | `PerformanceReviewsTemplate` |
| `/hr/shifts`    | `ShiftScheduleTemplate`      |
| `/hr/time-off`  | `TimeOffTemplate`            |

### Sales & CRM

| Route                | Template               |
| -------------------- | ---------------------- |
| `/crm/accounts`      | `AccountsTemplate`     |
| `/crm/contacts`      | `CrmContactsTemplate`  |
| `/crm/leads`         | `LeadsTemplate`        |
| `/crm/deals`         | `DealsTemplate`        |
| `/crm/pipeline`      | `PipelineTemplate`     |
| `/crm/campaigns`     | `CampaignsTemplate`    |
| `/crm/quote-builder` | `QuoteBuilderTemplate` |
| `/crm/reports`       | `SalesReportsTemplate` |

### Learning

| Route                    | Template                    |
| ------------------------ | --------------------------- |
| `/learning/my-courses`   | `MyCoursesTemplate`         |
| `/learning/catalog`      | `CourseCatalogTemplate`     |
| `/learning/course`       | `CourseDetailTemplate`      |
| `/learning/lesson`       | `LessonPlayerTemplate`      |
| `/learning/instructors`  | `InstructorsTemplate`       |
| `/learning/quizzes`      | `QuizzesTemplate`           |
| `/learning/achievements` | `AchievementsTemplate`      |
| `/learning/analytics`    | `LearningAnalyticsTemplate` |

### News & Magazine

| Route              | Template                   |
| ------------------ | -------------------------- |
| `/news/article`    | `ArticleTemplate`          |
| `/news/breaking`   | `BreakingNewsTemplate`     |
| `/news/editorial`  | `EditorialTemplate`        |
| `/news/magazine`   | `MagazineGridTemplate`     |
| `/news/categories` | `NewsCategoriesTemplate`   |
| `/news/newsletter` | `NewsletterSignupTemplate` |
| `/news/opinion`    | `OpinionTemplate`          |
| `/news/press`      | `PressReleasesTemplate`    |

### Music

| Route                | Template              |
| -------------------- | --------------------- |
| `/music/home`        | `MusicHomeTemplate`   |
| `/music/album`       | `AlbumDetailTemplate` |
| `/music/artists`     | `ArtistsTemplate`     |
| `/music/charts`      | `ChartsTemplate`      |
| `/music/now-playing` | `NowPlayingTemplate`  |
| `/music/playlist`    | `PlaylistTemplate`    |
| `/music/lyrics`      | `LyricsTemplate`      |
| `/music/search`      | `MusicSearchTemplate` |

### Video Streaming

| Route                          | Template                   |
| ------------------------------ | -------------------------- |
| `/streaming/home`              | `StreamingHomeTemplate`    |
| `/streaming/movie`             | `MovieDetailTemplate`      |
| `/streaming/series`            | `TvSeriesTemplate`         |
| `/streaming/live`              | `LiveChannelsTemplate`     |
| `/streaming/continue-watching` | `ContinueWatchingTemplate` |
| `/streaming/my-list`           | `MyListTemplate`           |
| `/streaming/history`           | `WatchHistoryTemplate`     |
| `/streaming/search`            | `StreamingSearchTemplate`  |

### Gaming

| Route                  | Template                 |
| ---------------------- | ------------------------ |
| `/gaming/catalog`      | `GameCatalogTemplate`    |
| `/gaming/game`         | `GameDetailTemplate`     |
| `/gaming/challenges`   | `GameChallengesTemplate` |
| `/gaming/leaderboards` | `LeaderboardsTemplate`   |
| `/gaming/matches`      | `LiveMatchesTemplate`    |
| `/gaming/players`      | `PlayerProfilesTemplate` |
| `/gaming/tournaments`  | `TournamentsTemplate`    |
| `/gaming/news`         | `GameNewsTemplate`       |

### Sports

| Route               | Template                  |
| ------------------- | ------------------------- |
| `/sports/scores`    | `LiveScoresTemplate`      |
| `/sports/fixtures`  | `FixturesTemplate`        |
| `/sports/match`     | `MatchDetailTemplate`     |
| `/sports/standings` | `SeasonStandingsTemplate` |
| `/sports/stats`     | `PlayerStatsTemplate`     |
| `/sports/roster`    | `TeamRosterTemplate`      |
| `/sports/favorites` | `FavoriteTeamsTemplate`   |
| `/sports/news`      | `SportsNewsTemplate`      |

### Travel

| Route                  | Template                |
| ---------------------- | ----------------------- |
| `/travel/bookings`     | `BookingsTemplate`      |
| `/travel/search`       | `BookingSearchTemplate` |
| `/travel/hotel`        | `HotelDetailTemplate`   |
| `/travel/destinations` | `DestinationsTemplate`  |
| `/travel/guides`       | `TravelGuidesTemplate`  |
| `/travel/stories`      | `TravelStoriesTemplate` |
| `/travel/packing`      | `PackingListTemplate`   |
| `/travel/planner`      | `TripPlannerTemplate`   |

### Food & Dining

| Route                | Template                   |
| -------------------- | -------------------------- |
| `/food/restaurants`  | `RestaurantListTemplate`   |
| `/food/restaurant`   | `RestaurantDetailTemplate` |
| `/food/menu`         | `MenuTemplate`             |
| `/food/recipes`      | `RecipesTemplate`          |
| `/food/recipe`       | `RecipeDetailTemplate`     |
| `/food/reservations` | `ReservationsTemplate`     |
| `/food/delivery`     | `FoodDeliveryTemplate`     |
| `/food/wine`         | `WineListTemplate`         |

### Health & Fitness

| Route               | Template                   |
| ------------------- | -------------------------- |
| `/health/dashboard` | `HealthDashboardTemplate`  |
| `/health/activity`  | `ActivityTrackerTemplate`  |
| `/health/workout`   | `WorkoutPlannerTemplate`   |
| `/health/nutrition` | `NutritionTrackerTemplate` |
| `/health/sleep`     | `SleepTrackerTemplate`     |
| `/health/water`     | `WaterIntakeTemplate`      |
| `/health/goals`     | `GoalsTemplate`            |
| `/health/profile`   | `HealthProfileTemplate`    |

### Real Estate

| Route                      | Template                     |
| -------------------------- | ---------------------------- |
| `/real-estate/listings`    | `PropertyListingsTemplate`   |
| `/real-estate/property`    | `PropertyDetailTemplate`     |
| `/real-estate/search`      | `SearchFiltersTemplate`      |
| `/real-estate/map`         | `MapViewTemplate`            |
| `/real-estate/saved`       | `SavedPropertiesTemplate`    |
| `/real-estate/mortgage`    | `MortgageCalculatorTemplate` |
| `/real-estate/open-houses` | `OpenHousesTemplate`         |
| `/real-estate/agents`      | `AgentProfileTemplate`       |

### Smart Home / IoT

| Route              | Template                    |
| ------------------ | --------------------------- |
| `/iot/dashboard`   | `DeviceDashboardTemplate`   |
| `/iot/device`      | `DeviceDetailTemplate`      |
| `/iot/scenes`      | `ScenesTemplate`            |
| `/iot/automations` | `AutomationsTemplate`       |
| `/iot/energy`      | `EnergyUsageTemplate`       |
| `/iot/security`    | `SecurityTemplate`          |
| `/iot/sensors`     | `SensorDataTemplate`        |
| `/iot/settings`    | `SmartHomeSettingsTemplate` |

### Portfolio

| Route                     | Template                    |
| ------------------------- | --------------------------- |
| `/portfolio/overview`     | `PortfolioOverviewTemplate` |
| `/portfolio/holdings`     | `HoldingsTemplate`          |
| `/portfolio/transactions` | `TransactionsTemplate`      |
| `/portfolio/performance`  | `PerformanceTemplate`       |
| `/portfolio/allocation`   | `AllocationTemplate`        |
| `/portfolio/watchlist`    | `WatchlistTemplate`         |
| `/portfolio/alerts`       | `AlertsTemplate`            |
| `/portfolio/dividends`    | `DividendIncomeTemplate`    |
| `/portfolio/settings`     | `PortfolioSettingsTemplate` |

### System pages

| File                       | Template                | Description                           |
| -------------------------- | ----------------------- | ------------------------------------- |
| `src/app/not-found.tsx`    | `NotFoundTemplate`      | 404 page with "Go home" action        |
| `src/app/error.tsx`        | `ErrorTemplate`         | 500 page with "Try again" (`reset()`) |
| `src/app/global-error.tsx` | `GlobalErrorTemplate`   | Root error boundary                   |
| `src/app/layout.tsx`       | `CookieConsentTemplate` | Root layout wrapper                   |

---

[Back to index](README.md)
