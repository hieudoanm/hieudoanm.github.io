# Pages

Thin `'use client';` wrappers in `src/app/`, one per route, default-exporting
the template (e.g. `const CustomersPage = () => <CustomersTemplate />;`). A
single root `layout.tsx` mounts the shared chrome; there are no per-route layout
files.

**265 routes** across `(app)` and the `(templates)` route groups.

## `/` — `(app)` group

| Route     | Template |
| --------- | -------- |
| `/`       | `Home`   |
| `/colors` | `Colors` |

## `/…/app` — `(templates)/app`

Workspace & productivity.

| Route                | Template                |
| -------------------- | ----------------------- |
| `/app/activity`      | `ActivityLogTemplate`   |
| `/app/analytics`     | `AnalyticsTemplate`     |
| `/app/calendar`      | `CalendarTemplate`      |
| `/app/chat`          | `ChatTemplate`          |
| `/app/contacts`      | `ContactsTemplate`      |
| `/app/dashboard`     | `DashboardTemplate`     |
| `/app/files`         | `FilesTemplate`         |
| `/app/goals`         | `GoalsTemplate`         |
| `/app/help`          | `HelpCenterTemplate`    |
| `/app/inbox`         | `InboxTemplate`         |
| `/app/integrations`  | `IntegrationsTemplate`  |
| `/app/kanban`        | `KanbanTemplate`        |
| `/app/meetings`      | `MeetingsTemplate`      |
| `/app/members`       | `MembersTemplate`       |
| `/app/notifications` | `NotificationsTemplate` |
| `/app/tasks`         | `TasksTemplate`         |

## `/…/auth` — `(templates)/auth`

Auth, security & account.

| Route                   | Template                   |
| ----------------------- | -------------------------- |
| `/auth/change-password` | `ChangePasswordTemplate`   |
| `/auth/delete-account`  | `DeleteAccountTemplate`    |
| `/auth/error`           | `ErrorTemplate`            |
| `/auth/forbidden`       | `ForbiddenTemplate`        |
| `/auth/forgot-password` | `PasswordResetTemplate`    |
| `/auth/global-error`    | `GlobalErrorTemplate`      |
| `/auth/home-security`   | `SecurityTemplate`         |
| `/auth/lock-screen`     | `LockScreenTemplate`       |
| `/auth/not-found`       | `ErrorTemplate`            |
| `/auth/permissions`     | `PermissionsTemplate`      |
| `/auth/recovery-codes`  | `RecoveryCodesTemplate`    |
| `/auth/reset-password`  | `PasswordResetTemplate`    |
| `/auth/security`        | `SecurityOverviewTemplate` |
| `/auth/sessions`        | `SessionsTemplate`         |
| `/auth/sign-in`         | `SignInTemplate`           |
| `/auth/sign-up`         | `SignUpTemplate`           |
| `/auth/two-factor`      | `TwoFactorTemplate`        |
| `/auth/verify-email`    | `VerifyEmailTemplate`      |

## `/…/blog` — `(templates)/blog`

Blog, course & learning.

| Route                | Template                    |
| -------------------- | --------------------------- |
| `/blog`              | `BlogListTemplate`          |
| `/blog/[slug]`       | `BlogItemTemplate`          |
| `/blog/achievements` | `AchievementsTemplate`      |
| `/blog/analytics`    | `LearningAnalyticsTemplate` |
| `/blog/archive`      | `BlogArchiveTemplate`       |
| `/blog/author`       | `BlogAuthorTemplate`        |
| `/blog/catalog`      | `CourseCatalogTemplate`     |
| `/blog/categories`   | `BlogCategoriesTemplate`    |
| `/blog/course`       | `CourseDetailTemplate`      |
| `/blog/instructors`  | `InstructorsTemplate`       |
| `/blog/lesson`       | `LessonPlayerTemplate`      |
| `/blog/my-courses`   | `MyCoursesTemplate`         |
| `/blog/newsletter`   | `BlogNewsletterTemplate`    |
| `/blog/quizzes`      | `QuizzesTemplate`           |
| `/blog/search`       | `BlogSearchTemplate`        |
| `/blog/tags`         | `BlogTagsTemplate`          |

## `/…/crm` — `(templates)/crm`

Sales, CRM & commerce ops.

| Route                | Template               |
| -------------------- | ---------------------- |
| `/crm/accounts`      | `AccountsTemplate`     |
| `/crm/campaigns`     | `CampaignsTemplate`    |
| `/crm/contacts`      | `CrmContactsTemplate`  |
| `/crm/coupons`       | `CouponsTemplate`      |
| `/crm/customers`     | `CustomersTemplate`    |
| `/crm/deals`         | `DealsTemplate`        |
| `/crm/inventory`     | `InventoryTemplate`    |
| `/crm/leads`         | `LeadsTemplate`        |
| `/crm/orders`        | `OrdersTemplate`       |
| `/crm/pipeline`      | `PipelineTemplate`     |
| `/crm/products`      | `ProductsTemplate`     |
| `/crm/promotions`    | `PromotionsTemplate`   |
| `/crm/quote-builder` | `QuoteBuilderTemplate` |
| `/crm/refunds`       | `RefundsTemplate`      |
| `/crm/reports`       | `SalesReportsTemplate` |
| `/crm/shipments`     | `ShipmentsTemplate`    |

## `/…/developer` — `(templates)/developer`

Developer platform & IoT.

| Route                      | Template                    |
| -------------------------- | --------------------------- |
| `/developer/api-keys`      | `ApiKeysTemplate`           |
| `/developer/automations`   | `AutomationsTemplate`       |
| `/developer/backups`       | `BackupsTemplate`           |
| `/developer/dashboard`     | `DeviceDashboardTemplate`   |
| `/developer/deployments`   | `DeploymentsTemplate`       |
| `/developer/device`        | `DeviceDetailTemplate`      |
| `/developer/endpoints`     | `EndpointsTemplate`         |
| `/developer/energy`        | `EnergyUsageTemplate`       |
| `/developer/environments`  | `EnvironmentsTemplate`      |
| `/developer/feature-flags` | `FeatureFlagsTemplate`      |
| `/developer/logs`          | `LogsTemplate`              |
| `/developer/monitors`      | `MonitorsTemplate`          |
| `/developer/scenes`        | `ScenesTemplate`            |
| `/developer/sensors`       | `SensorDataTemplate`        |
| `/developer/settings`      | `SmartHomeSettingsTemplate` |
| `/developer/webhooks`      | `WebhooksTemplate`          |

## `/…/finance` — `(templates)/finance`

Finance & investing.

| Route                    | Template                    |
| ------------------------ | --------------------------- |
| `/finance/accounts`      | `AccountsTemplate`          |
| `/finance/alerts`        | `AlertsTemplate`            |
| `/finance/billing`       | `BillingTemplate`           |
| `/finance/budgets`       | `BudgetsTemplate`           |
| `/finance/dividends`     | `DividendIncomeTemplate`    |
| `/finance/expenses`      | `ExpensesTemplate`          |
| `/finance/holdings`      | `HoldingsTemplate`          |
| `/finance/invoices`      | `InvoicesTemplate`          |
| `/finance/overview`      | `PortfolioOverviewTemplate` |
| `/finance/payroll`       | `PayrollTemplate`           |
| `/finance/performance`   | `PerformanceTemplate`       |
| `/finance/settings`      | `PortfolioSettingsTemplate` |
| `/finance/statements`    | `StatementsTemplate`        |
| `/finance/subscriptions` | `SubscriptionsTemplate`     |
| `/finance/taxes`         | `TaxesTemplate`             |
| `/finance/transactions`  | `TransactionsTemplate`      |

## `/…/health` — `(templates)/health`

Health, fitness & food.

| Route                  | Template                   |
| ---------------------- | -------------------------- |
| `/health/activity`     | `ActivityTrackerTemplate`  |
| `/health/dashboard`    | `HealthDashboardTemplate`  |
| `/health/delivery`     | `FoodDeliveryTemplate`     |
| `/health/goals`        | `GoalsTemplate`            |
| `/health/menu`         | `MenuTemplate`             |
| `/health/nutrition`    | `NutritionTrackerTemplate` |
| `/health/profile`      | `HealthProfileTemplate`    |
| `/health/recipe`       | `RecipeDetailTemplate`     |
| `/health/recipes`      | `RecipesTemplate`          |
| `/health/reservations` | `ReservationsTemplate`     |
| `/health/restaurant`   | `RestaurantDetailTemplate` |
| `/health/restaurants`  | `RestaurantListTemplate`   |
| `/health/sleep`        | `SleepTrackerTemplate`     |
| `/health/water`        | `WaterIntakeTemplate`      |
| `/health/wine`         | `WineListTemplate`         |
| `/health/workout`      | `WorkoutPlannerTemplate`   |

## `/…/hr` — `(templates)/hr`

HR, people & benefits.

| Route              | Template                     |
| ------------------ | ---------------------------- |
| `/hr/accordion`    | `AccordionTemplate`          |
| `/hr/alerts`       | `AlertsTemplate`             |
| `/hr/benefits`     | `BenefitsTemplate`           |
| `/hr/charts`       | `ChartsGalleryTemplate`      |
| `/hr/data-table`   | `DataTableTemplate`          |
| `/hr/empty-states` | `EmptyStatesTemplate`        |
| `/hr/forms`        | `FormsShowcaseTemplate`      |
| `/hr/hiring`       | `HiringPipelineTemplate`     |
| `/hr/modals`       | `ModalsTemplate`             |
| `/hr/org-chart`    | `OrgChartTemplate`           |
| `/hr/people`       | `PeopleDirectoryTemplate`    |
| `/hr/policies`     | `PoliciesTemplate`           |
| `/hr/reviews`      | `PerformanceReviewsTemplate` |
| `/hr/shifts`       | `ShiftScheduleTemplate`      |
| `/hr/tabs`         | `TabsTemplate`               |
| `/hr/time-off`     | `TimeOffTemplate`            |

## `/…/landing` — `(templates)/landing`

Marketing, landing & careers.

| Route                 | Template             |
| --------------------- | -------------------- |
| `/landing/careers`    | `CareersTemplate`    |
| `/landing/changelog`  | `ChangelogTemplate`  |
| `/landing/contact`    | `ContactTemplate`    |
| `/landing/game`       | `GameDetailTemplate` |
| `/landing/landing`    | `LandingTemplate`    |
| `/landing/notes`      | `NotesTemplate`      |
| `/landing/pricing`    | `PricingTemplate`    |
| `/landing/privacy`    | `LegalTemplate`      |
| `/landing/resume`     | `ResumeTemplate`     |
| `/landing/roadmap`    | `RoadmapTemplate`    |
| `/landing/settings`   | `SettingsTemplate`   |
| `/landing/shortcuts`  | `ShortcutsTemplate`  |
| `/landing/sprints`    | `SprintsTemplate`    |
| `/landing/team`       | `TeamTemplate`       |
| `/landing/terms`      | `LegalTemplate`      |
| `/landing/version`    | `VersionTemplate`    |
| `/landing/whiteboard` | `WhiteboardTemplate` |

## `/…/mail` — `(templates)/mail`

Email, inbox & operations.

| Route                | Template               |
| -------------------- | ---------------------- |
| `/mail/allocation`   | `AllocationTemplate`   |
| `/mail/catalog`      | `GameCatalogTemplate`  |
| `/mail/coming-soon`  | `LaunchStatusTemplate` |
| `/mail/compose`      | `ComposeTemplate`      |
| `/mail/drafts`       | `DraftsTemplate`       |
| `/mail/import`       | `ImportTemplate`       |
| `/mail/inbox`        | `InboxTemplate`        |
| `/mail/labels`       | `LabelsTemplate`       |
| `/mail/maintenance`  | `LaunchStatusTemplate` |
| `/mail/onboarding`   | `OnboardingTemplate`   |
| `/mail/search`       | `MailSearchTemplate`   |
| `/mail/sent`         | `SentTemplate`         |
| `/mail/spam`         | `SpamTemplate`         |
| `/mail/thread`       | `ThreadTemplate`       |
| `/mail/timesheets`   | `TimesheetsTemplate`   |
| `/mail/transactions` | `TransactionsTemplate` |
| `/mail/watchlist`    | `WatchlistTemplate`    |

## `/…/media` — `(templates)/media`

Music, streaming & media.

| Route                      | Template                   |
| -------------------------- | -------------------------- |
| `/media/album`             | `AlbumDetailTemplate`      |
| `/media/albums`            | `AlbumsTemplate`           |
| `/media/artists`           | `ArtistsTemplate`          |
| `/media/charts`            | `ChartsTemplate`           |
| `/media/continue-watching` | `ContinueWatchingTemplate` |
| `/media/library`           | `MediaLibraryTemplate`     |
| `/media/lyrics`            | `LyricsTemplate`           |
| `/media/movie`             | `MovieDetailTemplate`      |
| `/media/music-home`        | `MusicHomeTemplate`        |
| `/media/my-list`           | `MyListTemplate`           |
| `/media/now-playing`       | `NowPlayingTemplate`       |
| `/media/playlist`          | `PlaylistTemplate`         |
| `/media/search`            | `MusicSearchTemplate`      |
| `/media/series`            | `TvSeriesTemplate`         |
| `/media/streaming-home`    | `StreamingHomeTemplate`    |
| `/media/video`             | `VideoPlayerTemplate`      |

## `/…/news` — `(templates)/news`

News, magazine & sports.

| Route              | Template                   |
| ------------------ | -------------------------- |
| `/news/article`    | `ArticleTemplate`          |
| `/news/breaking`   | `BreakingNewsTemplate`     |
| `/news/categories` | `NewsCategoriesTemplate`   |
| `/news/editorial`  | `EditorialTemplate`        |
| `/news/favorites`  | `FavoriteTeamsTemplate`    |
| `/news/fixtures`   | `FixturesTemplate`         |
| `/news/magazine`   | `MagazineGridTemplate`     |
| `/news/match`      | `MatchDetailTemplate`      |
| `/news/news`       | `SportsNewsTemplate`       |
| `/news/newsletter` | `NewsletterSignupTemplate` |
| `/news/opinion`    | `OpinionTemplate`          |
| `/news/press`      | `PressReleasesTemplate`    |
| `/news/roster`     | `TeamRosterTemplate`       |
| `/news/scores`     | `LiveScoresTemplate`       |
| `/news/standings`  | `SeasonStandingsTemplate`  |
| `/news/stats`      | `PlayerStatsTemplate`      |

## `/…/social` — `(templates)/social`

Social, community & gaming.

| Route                  | Template                  |
| ---------------------- | ------------------------- |
| `/social/challenges`   | `GameChallengesTemplate`  |
| `/social/events`       | `EventsTemplate`          |
| `/social/feed`         | `FeedTemplate`            |
| `/social/followers`    | `FollowersTemplate`       |
| `/social/groups`       | `GroupsTemplate`          |
| `/social/history`      | `WatchHistoryTemplate`    |
| `/social/leaderboards` | `LeaderboardsTemplate`    |
| `/social/live`         | `LiveChannelsTemplate`    |
| `/social/matches`      | `LiveMatchesTemplate`     |
| `/social/messages`     | `MessagesTemplate`        |
| `/social/news`         | `GameNewsTemplate`        |
| `/social/players`      | `PlayerProfilesTemplate`  |
| `/social/profile`      | `ProfileTemplate`         |
| `/social/reports`      | `ReportsTemplate`         |
| `/social/search`       | `StreamingSearchTemplate` |
| `/social/tournaments`  | `TournamentsTemplate`     |

## `/…/store` — `(templates)/store`

Storefront & e-commerce.

| Route                       | Template                    |
| --------------------------- | --------------------------- |
| `/store`                    | `StoreFrontTemplate`        |
| `/store/[id]`               | `StoreItemTemplate`         |
| `/store/addresses`          | `AddressBookTemplate`       |
| `/store/cart`               | `CartTemplate`              |
| `/store/categories`         | `CategoriesTemplate`        |
| `/store/checkout`           | `CheckoutTemplate`          |
| `/store/compare`            | `CompareTemplate`           |
| `/store/deals`              | `DealsTemplate`             |
| `/store/gift-cards`         | `GiftCardsTemplate`         |
| `/store/order-confirmation` | `OrderConfirmationTemplate` |
| `/store/order-history`      | `OrderHistoryTemplate`      |
| `/store/payment-methods`    | `PaymentMethodsTemplate`    |
| `/store/reviews`            | `ReviewsTemplate`           |
| `/store/support`            | `SupportTemplate`           |
| `/store/tracking`           | `OrderTrackingTemplate`     |
| `/store/wishlist`           | `WishlistTemplate`          |

## `/…/support` — `(templates)/support`

Support, knowledge & system.

| Route                     | Template                |
| ------------------------- | ----------------------- |
| `/support/about`          | `AboutTemplate`         |
| `/support/announcements`  | `AnnouncementsTemplate` |
| `/support/cookie-consent` | `CookieConsentTemplate` |
| `/support/faqs`           | `FaqTemplate`           |
| `/support/feedback`       | `FeedbackTemplate`      |
| `/support/knowledge-base` | `KnowledgeBaseTemplate` |
| `/support/live-chat`      | `LiveChatTemplate`      |
| `/support/loading-app`    | `LoadingTemplate`       |
| `/support/loading-auth`   | `LoadingTemplate`       |
| `/support/loading-blog`   | `LoadingTemplate`       |
| `/support/loading-store`  | `LoadingTemplate`       |
| `/support/pagination`     | `PaginationTemplate`    |
| `/support/search`         | `SearchTemplate`        |
| `/support/status`         | `ServiceStatusTemplate` |
| `/support/stepper`        | `StepperTemplate`       |
| `/support/ticket-detail`  | `TicketDetailTemplate`  |
| `/support/tickets`        | `TicketsTemplate`       |
| `/support/tooltips`       | `TooltipsTemplate`      |
| `/support/upload`         | `UploadTemplate`        |

## `/…/travel` — `(templates)/travel`

Travel, real estate & property.

| Route                     | Template                     |
| ------------------------- | ---------------------------- |
| `/travel/agents`          | `AgentProfileTemplate`       |
| `/travel/bookings`        | `BookingsTemplate`           |
| `/travel/destinations`    | `DestinationsTemplate`       |
| `/travel/guides`          | `TravelGuidesTemplate`       |
| `/travel/hotel`           | `HotelDetailTemplate`        |
| `/travel/listings`        | `PropertyListingsTemplate`   |
| `/travel/map`             | `MapViewTemplate`            |
| `/travel/mortgage`        | `MortgageCalculatorTemplate` |
| `/travel/open-houses`     | `OpenHousesTemplate`         |
| `/travel/packing`         | `PackingListTemplate`        |
| `/travel/planner`         | `TripPlannerTemplate`        |
| `/travel/property`        | `PropertyDetailTemplate`     |
| `/travel/property-search` | `SearchFiltersTemplate`      |
| `/travel/saved`           | `SavedPropertiesTemplate`    |
| `/travel/search`          | `BookingSearchTemplate`      |
| `/travel/stories`         | `TravelStoriesTemplate`      |

---

[Back to index](README.md)
