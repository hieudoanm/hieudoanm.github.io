# Templates

Page-level layout shells in `src/components/templates/<domain>/`. Each exports
`export const <Name>Template: FC = () => ...` with `.displayName` set.
Self-contained templates (no `XProps` interface) manage their own state; props
are listed where the interface exists.

**257 templates** across 16 domains plus `shared/` (helpers).

## shared

Theme-neutral helpers used across route groups.

| Template    | Props                                                                                                                                                                                                     | Client |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `PageShell` | `title: string; subtitle?: string; backHref?: string; headerAction?: ReactNode; headerBadges?: ReactNode; navItems?: NavItem[]; maxWidth?: string; gap?: string; children: ReactNode; className?: string` | —      |

## app

Workspace & productivity.

| Template                | Props                                                                                                                                                                                                                                                                                                                                                                 | Client |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `ActivityLogTemplate`   | `—`                                                                                                                                                                                                                                                                                                                                                                   | client |
| `AnalyticsTemplate`     | `—`                                                                                                                                                                                                                                                                                                                                                                   | client |
| `CalendarTemplate`      | `—`                                                                                                                                                                                                                                                                                                                                                                   | client |
| `ChatTemplate`          | `initialMessages?: ChatMessage[]; model?: string; onSendMessage?: (message: string) => Promise<string>; onModelChange?: (model: string) => void; onNewChat?: () => void; conversations?: ChatConversation[]; activeConversationId?: string; onConversationSelect?: (id: string) => void; models?: ModelOption[]; sidebarOpen?: boolean; onToggleSidebar?: () => void` | client |
| `ContactsTemplate`      | `—`                                                                                                                                                                                                                                                                                                                                                                   | client |
| `DashboardTemplate`     | `userName?: string; userEmail?: string`                                                                                                                                                                                                                                                                                                                               | client |
| `FilesTemplate`         | `—`                                                                                                                                                                                                                                                                                                                                                                   | client |
| `GoalsTemplate`         | `—`                                                                                                                                                                                                                                                                                                                                                                   | client |
| `HelpCenterTemplate`    | `—`                                                                                                                                                                                                                                                                                                                                                                   | client |
| `InboxTemplate`         | `—`                                                                                                                                                                                                                                                                                                                                                                   | client |
| `IntegrationsTemplate`  | `—`                                                                                                                                                                                                                                                                                                                                                                   | client |
| `KanbanTemplate`        | `—`                                                                                                                                                                                                                                                                                                                                                                   | client |
| `MeetingsTemplate`      | `—`                                                                                                                                                                                                                                                                                                                                                                   | client |
| `MembersTemplate`       | `—`                                                                                                                                                                                                                                                                                                                                                                   | client |
| `NotificationsTemplate` | `—`                                                                                                                                                                                                                                                                                                                                                                   | client |
| `TasksTemplate`         | `—`                                                                                                                                                                                                                                                                                                                                                                   | client |

## auth

Auth, security & account.

| Template                   | Props                                                                                                                                | Client |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| `ChangePasswordTemplate`   | `—`                                                                                                                                  | client |
| `DeleteAccountTemplate`    | `—`                                                                                                                                  | client |
| `ErrorTemplate`            | `code?: string \| number; description?: string; action?: ReactNode; variant?: 'error' \| 'not-found'`                                | client |
| `ForbiddenTemplate`        | `—`                                                                                                                                  | —      |
| `GlobalErrorTemplate`      | `error: Error & { digest?: string }; reset: () => void`                                                                              | client |
| `LockScreenTemplate`       | `—`                                                                                                                                  | client |
| `PasswordResetTemplate`    | `mode?: PasswordResetMode; onSubmit: (value: string) => void \| Promise<void>; error?: string; success?: boolean; loading?: boolean` | client |
| `PermissionsTemplate`      | `—`                                                                                                                                  | client |
| `RecoveryCodesTemplate`    | `—`                                                                                                                                  | client |
| `SecurityOverviewTemplate` | `—`                                                                                                                                  | client |
| `SecurityTemplate`         | `—`                                                                                                                                  | client |
| `SessionsTemplate`         | `—`                                                                                                                                  | client |
| `SignInTemplate`           | `onSubmit: (data: { email: string; password: string }) => void \| Promise<void>; error?: string; loading?: boolean`                  | client |
| `SignUpTemplate`           | `onSubmit: (data: { name: string; email: string; password: string; }) => void \| Promise<void>; error?: string; loading?: boolean`   | client |
| `TwoFactorTemplate`        | `—`                                                                                                                                  | client |
| `VerifyEmailTemplate`      | `—`                                                                                                                                  | client |

## blog

Blog, course & learning.

| Template                    | Props | Client |
| --------------------------- | ----- | ------ |
| `AchievementsTemplate`      | `—`   | client |
| `BlogArchiveTemplate`       | `—`   | client |
| `BlogAuthorTemplate`        | `—`   | client |
| `BlogCategoriesTemplate`    | `—`   | client |
| `BlogItemTemplate`          | `—`   | client |
| `BlogListTemplate`          | `—`   | client |
| `BlogNewsletterTemplate`    | `—`   | client |
| `BlogSearchTemplate`        | `—`   | client |
| `BlogTagsTemplate`          | `—`   | client |
| `CourseCatalogTemplate`     | `—`   | client |
| `CourseDetailTemplate`      | `—`   | client |
| `InstructorsTemplate`       | `—`   | client |
| `LearningAnalyticsTemplate` | `—`   | client |
| `LessonPlayerTemplate`      | `—`   | client |
| `MyCoursesTemplate`         | `—`   | client |
| `QuizzesTemplate`           | `—`   | client |

## crm

Sales, CRM & commerce ops.

| Template               | Props | Client |
| ---------------------- | ----- | ------ |
| `AccountsTemplate`     | `—`   | client |
| `CampaignsTemplate`    | `—`   | client |
| `CouponsTemplate`      | `—`   | client |
| `CrmContactsTemplate`  | `—`   | client |
| `CustomersTemplate`    | `—`   | client |
| `DealsTemplate`        | `—`   | client |
| `InventoryTemplate`    | `—`   | client |
| `LeadsTemplate`        | `—`   | client |
| `OrdersTemplate`       | `—`   | client |
| `PipelineTemplate`     | `—`   | client |
| `ProductsTemplate`     | `—`   | client |
| `PromotionsTemplate`   | `—`   | client |
| `QuoteBuilderTemplate` | `—`   | client |
| `RefundsTemplate`      | `—`   | client |
| `SalesReportsTemplate` | `—`   | client |
| `ShipmentsTemplate`    | `—`   | client |

## developer

Developer platform & IoT.

| Template                    | Props | Client |
| --------------------------- | ----- | ------ |
| `ApiKeysTemplate`           | `—`   | client |
| `AutomationsTemplate`       | `—`   | client |
| `BackupsTemplate`           | `—`   | client |
| `DeploymentsTemplate`       | `—`   | client |
| `DeviceDashboardTemplate`   | `—`   | client |
| `DeviceDetailTemplate`      | `—`   | client |
| `EndpointsTemplate`         | `—`   | client |
| `EnergyUsageTemplate`       | `—`   | client |
| `EnvironmentsTemplate`      | `—`   | client |
| `FeatureFlagsTemplate`      | `—`   | client |
| `LogsTemplate`              | `—`   | client |
| `MonitorsTemplate`          | `—`   | client |
| `ScenesTemplate`            | `—`   | client |
| `SensorDataTemplate`        | `—`   | client |
| `SmartHomeSettingsTemplate` | `—`   | client |
| `WebhooksTemplate`          | `—`   | client |

## finance

Finance & investing.

| Template                    | Props | Client |
| --------------------------- | ----- | ------ |
| `AccountsTemplate`          | `—`   | client |
| `AlertsTemplate`            | `—`   | client |
| `BillingTemplate`           | `—`   | client |
| `BudgetsTemplate`           | `—`   | client |
| `DividendIncomeTemplate`    | `—`   | client |
| `ExpensesTemplate`          | `—`   | client |
| `HoldingsTemplate`          | `—`   | client |
| `InvoicesTemplate`          | `—`   | client |
| `PayrollTemplate`           | `—`   | client |
| `PerformanceTemplate`       | `—`   | client |
| `PortfolioOverviewTemplate` | `—`   | client |
| `PortfolioSettingsTemplate` | `—`   | client |
| `StatementsTemplate`        | `—`   | client |
| `SubscriptionsTemplate`     | `—`   | client |
| `TaxesTemplate`             | `—`   | client |
| `TransactionsTemplate`      | `—`   | client |

## health

Health, fitness & food.

| Template                   | Props | Client |
| -------------------------- | ----- | ------ |
| `ActivityTrackerTemplate`  | `—`   | client |
| `FoodDeliveryTemplate`     | `—`   | client |
| `GoalsTemplate`            | `—`   | client |
| `HealthDashboardTemplate`  | `—`   | client |
| `HealthProfileTemplate`    | `—`   | client |
| `MenuTemplate`             | `—`   | client |
| `NutritionTrackerTemplate` | `—`   | client |
| `RecipeDetailTemplate`     | `—`   | client |
| `RecipesTemplate`          | `—`   | client |
| `ReservationsTemplate`     | `—`   | client |
| `RestaurantDetailTemplate` | `—`   | client |
| `RestaurantListTemplate`   | `—`   | client |
| `SleepTrackerTemplate`     | `—`   | client |
| `WaterIntakeTemplate`      | `—`   | client |
| `WineListTemplate`         | `—`   | client |
| `WorkoutPlannerTemplate`   | `—`   | client |

## hr

HR, people & benefits.

| Template                     | Props | Client |
| ---------------------------- | ----- | ------ |
| `AccordionTemplate`          | `—`   | client |
| `AlertsTemplate`             | `—`   | client |
| `BenefitsTemplate`           | `—`   | client |
| `ChartsGalleryTemplate`      | `—`   | client |
| `DataTableTemplate`          | `—`   | client |
| `EmptyStatesTemplate`        | `—`   | client |
| `FormsShowcaseTemplate`      | `—`   | client |
| `HiringPipelineTemplate`     | `—`   | client |
| `ModalsTemplate`             | `—`   | client |
| `OrgChartTemplate`           | `—`   | client |
| `PeopleDirectoryTemplate`    | `—`   | client |
| `PerformanceReviewsTemplate` | `—`   | client |
| `PoliciesTemplate`           | `—`   | client |
| `ShiftScheduleTemplate`      | `—`   | client |
| `TabsTemplate`               | `—`   | client |
| `TimeOffTemplate`            | `—`   | client |

## landing

Marketing, landing & careers.

| Template             | Props                                                                                                                                                                                                                                                      | Client |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `CareersTemplate`    | `—`                                                                                                                                                                                                                                                        | client |
| `ChangelogTemplate`  | `—`                                                                                                                                                                                                                                                        | client |
| `ContactTemplate`    | `—`                                                                                                                                                                                                                                                        | client |
| `GameDetailTemplate` | `—`                                                                                                                                                                                                                                                        | client |
| `LandingTemplate`    | `name: string; tagline: string; description: string; features: Feature[]; ctaLabel?: string; ctaHref?: string; tiers?: PricingTier[]; faqs?: FAQItem[]`                                                                                                    | client |
| `LegalTemplate`      | `title: string; sections: LegalSection[]; contact: ReactNode`                                                                                                                                                                                              | —      |
| `NotesTemplate`      | `—`                                                                                                                                                                                                                                                        | client |
| `PricingTemplate`    | `—`                                                                                                                                                                                                                                                        | client |
| `ResumeTemplate`     | `profile: ResumeProfile; experiences: ResumeExperienceItem[]; projects: ResumeProjectItem[]; education: ResumeEducationItem[]; skills: ResumeSkillGroup[]`                                                                                                 | client |
| `RoadmapTemplate`    | `—`                                                                                                                                                                                                                                                        | client |
| `SettingsTemplate`   | `language: string; theme: string; dateTimeFormat: string; timezone: string; onLanguageChange: (value: string) => void; onThemeChange: (value: string) => void; onDateTimeFormatChange: (value: string) => void; onTimezoneChange: (value: string) => void` | client |
| `ShortcutsTemplate`  | `—`                                                                                                                                                                                                                                                        | client |
| `SprintsTemplate`    | `—`                                                                                                                                                                                                                                                        | client |
| `TeamTemplate`       | `—`                                                                                                                                                                                                                                                        | client |
| `VersionTemplate`    | `—`                                                                                                                                                                                                                                                        | client |
| `WhiteboardTemplate` | `—`                                                                                                                                                                                                                                                        | client |

## mail

Email, inbox & operations.

| Template               | Props                           | Client |
| ---------------------- | ------------------------------- | ------ |
| `AllocationTemplate`   | `—`                             | client |
| `ComposeTemplate`      | `—`                             | client |
| `DraftsTemplate`       | `—`                             | client |
| `GameCatalogTemplate`  | `—`                             | client |
| `ImportTemplate`       | `—`                             | client |
| `InboxTemplate`        | `—`                             | client |
| `LabelsTemplate`       | `—`                             | client |
| `LaunchStatusTemplate` | `variant?: LaunchStatusVariant` | client |
| `MailSearchTemplate`   | `—`                             | client |
| `OnboardingTemplate`   | `—`                             | client |
| `SentTemplate`         | `—`                             | client |
| `SpamTemplate`         | `—`                             | client |
| `ThreadTemplate`       | `—`                             | client |
| `TimesheetsTemplate`   | `—`                             | client |
| `TransactionsTemplate` | `—`                             | client |
| `WatchlistTemplate`    | `—`                             | client |

## media

Music, streaming & media.

| Template                   | Props | Client |
| -------------------------- | ----- | ------ |
| `AlbumDetailTemplate`      | `—`   | client |
| `AlbumsTemplate`           | `—`   | client |
| `ArtistsTemplate`          | `—`   | client |
| `ChartsTemplate`           | `—`   | client |
| `ContinueWatchingTemplate` | `—`   | client |
| `LyricsTemplate`           | `—`   | client |
| `MediaLibraryTemplate`     | `—`   | client |
| `MovieDetailTemplate`      | `—`   | client |
| `MusicHomeTemplate`        | `—`   | client |
| `MusicSearchTemplate`      | `—`   | client |
| `MyListTemplate`           | `—`   | client |
| `NowPlayingTemplate`       | `—`   | client |
| `PlaylistTemplate`         | `—`   | client |
| `StreamingHomeTemplate`    | `—`   | client |
| `TvSeriesTemplate`         | `—`   | client |
| `VideoPlayerTemplate`      | `—`   | client |

## news

News, magazine & sports.

| Template                   | Props | Client |
| -------------------------- | ----- | ------ |
| `ArticleTemplate`          | `—`   | client |
| `BreakingNewsTemplate`     | `—`   | client |
| `EditorialTemplate`        | `—`   | client |
| `FavoriteTeamsTemplate`    | `—`   | client |
| `FixturesTemplate`         | `—`   | client |
| `LiveScoresTemplate`       | `—`   | client |
| `MagazineGridTemplate`     | `—`   | client |
| `MatchDetailTemplate`      | `—`   | client |
| `NewsCategoriesTemplate`   | `—`   | client |
| `NewsletterSignupTemplate` | `—`   | client |
| `OpinionTemplate`          | `—`   | client |
| `PlayerStatsTemplate`      | `—`   | client |
| `PressReleasesTemplate`    | `—`   | client |
| `SeasonStandingsTemplate`  | `—`   | client |
| `SportsNewsTemplate`       | `—`   | client |
| `TeamRosterTemplate`       | `—`   | client |

## social

Social, community & gaming.

| Template                  | Props                                                         | Client |
| ------------------------- | ------------------------------------------------------------- | ------ |
| `EventsTemplate`          | `—`                                                           | client |
| `FeedTemplate`            | `—`                                                           | client |
| `FollowersTemplate`       | `—`                                                           | client |
| `GameChallengesTemplate`  | `—`                                                           | client |
| `GameNewsTemplate`        | `—`                                                           | client |
| `GroupsTemplate`          | `—`                                                           | client |
| `LeaderboardsTemplate`    | `—`                                                           | client |
| `LiveChannelsTemplate`    | `—`                                                           | client |
| `LiveMatchesTemplate`     | `—`                                                           | client |
| `MessagesTemplate`        | `—`                                                           | client |
| `PlayerProfilesTemplate`  | `—`                                                           | client |
| `ProfileTemplate`         | `userName?: string; userEmail?: string; memberSince?: string` | client |
| `ReportsTemplate`         | `—`                                                           | client |
| `StreamingSearchTemplate` | `—`                                                           | client |
| `TournamentsTemplate`     | `—`                                                           | client |
| `WatchHistoryTemplate`    | `—`                                                           | client |

## store

Storefront & e-commerce.

| Template                    | Props                | Client |
| --------------------------- | -------------------- | ------ |
| `AddressBookTemplate`       | `—`                  | client |
| `CartTemplate`              | `—`                  | client |
| `CategoriesTemplate`        | `—`                  | client |
| `CheckoutTemplate`          | `—`                  | client |
| `CompareTemplate`           | `—`                  | client |
| `DealsTemplate`             | `—`                  | client |
| `GiftCardsTemplate`         | `—`                  | client |
| `OrderConfirmationTemplate` | `—`                  | —      |
| `OrderHistoryTemplate`      | `—`                  | —      |
| `OrderTrackingTemplate`     | `—`                  | client |
| `PaymentMethodsTemplate`    | `—`                  | client |
| `ReviewsTemplate`           | `—`                  | client |
| `StoreFrontTemplate`        | `—`                  | client |
| `StoreItemTemplate`         | `cartCount?: number` | client |
| `SupportTemplate`           | `—`                  | client |
| `WishlistTemplate`          | `—`                  | client |

## support

Support, knowledge & system.

| Template                | Props                      | Client |
| ----------------------- | -------------------------- | ------ |
| `AboutTemplate`         | `—`                        | —      |
| `AnnouncementsTemplate` | `—`                        | client |
| `CookieConsentTemplate` | `—`                        | client |
| `FaqTemplate`           | `—`                        | client |
| `FeedbackTemplate`      | `—`                        | client |
| `KnowledgeBaseTemplate` | `—`                        | client |
| `LiveChatTemplate`      | `—`                        | client |
| `LoadingTemplate`       | `variant?: LoadingVariant` | —      |
| `PaginationTemplate`    | `—`                        | client |
| `SearchTemplate`        | `—`                        | client |
| `ServiceStatusTemplate` | `—`                        | client |
| `StepperTemplate`       | `—`                        | client |
| `TicketDetailTemplate`  | `—`                        | client |
| `TicketsTemplate`       | `—`                        | client |
| `TooltipsTemplate`      | `—`                        | client |
| `UploadTemplate`        | `—`                        | client |

## travel

Travel, real estate & property.

| Template                     | Props | Client |
| ---------------------------- | ----- | ------ |
| `AgentProfileTemplate`       | `—`   | client |
| `BookingSearchTemplate`      | `—`   | client |
| `BookingsTemplate`           | `—`   | client |
| `DestinationsTemplate`       | `—`   | client |
| `HotelDetailTemplate`        | `—`   | client |
| `MapViewTemplate`            | `—`   | client |
| `MortgageCalculatorTemplate` | `—`   | client |
| `OpenHousesTemplate`         | `—`   | client |
| `PackingListTemplate`        | `—`   | client |
| `PropertyDetailTemplate`     | `—`   | client |
| `PropertyListingsTemplate`   | `—`   | client |
| `SavedPropertiesTemplate`    | `—`   | client |
| `SearchFiltersTemplate`      | `—`   | client |
| `TravelGuidesTemplate`       | `—`   | client |
| `TravelStoriesTemplate`      | `—`   | client |
| `TripPlannerTemplate`        | `—`   | client |

---

[Back to index](README.md)
