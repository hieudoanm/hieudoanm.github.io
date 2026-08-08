# Templates

All templates live in `src/components/templates/<folder>/` as
`<Name>Template.tsx`. Each exports `<Name>Template` (arrow `FC`, `'use client';`
for interactive ones, `.displayName` set). Templates without a props interface
are self-contained (local `useState`). Props interfaces are listed where they
exist.

### shared

Theme-neutral templates used across route groups.

| Template                | Props                                                                                                         | Description                                                                                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AboutTemplate`         | `name: string; description: string; version: string; items: { label, value }[]`                               | App info with PageShell + bottom Navbar                                                                                                              |
| `AccordionTemplate`     | —                                                                                                             | Collapsible accordion rows                                                                                                                           |
| `AlertsTemplate`        | —                                                                                                             | Alert banner variants                                                                                                                                |
| `ChartsGalleryTemplate` | —                                                                                                             | Chart gallery                                                                                                                                        |
| `ComingSoonTemplate`    | —                                                                                                             | Launch placeholder                                                                                                                                   |
| `ComponentsTemplate`    | —                                                                                                             | Four-level atomic-design demo (Atoms / Molecules / Organisms / Templates) with level tabs that re-arrange the gallery (folder; drives the home page) |
| `CookieConsentTemplate` | —                                                                                                             | Cookie banner (mounted in root `layout.tsx`)                                                                                                         |
| `DataTableTemplate`     | —                                                                                                             | Sortable data grid                                                                                                                                   |
| `EmptyStatesTemplate`   | —                                                                                                             | Empty-state placeholders                                                                                                                             |
| `ErrorTemplate`         | `code: string; description?: string; action?: ReactNode`                                                      | 500 error page body                                                                                                                                  |
| `ForbiddenTemplate`     | —                                                                                                             | 403 access-denied page                                                                                                                               |
| `FormsShowcaseTemplate` | —                                                                                                             | Form control gallery                                                                                                                                 |
| `GlobalErrorTemplate`   | `error: Error & { digest?: string }; reset: () => void`                                                       | Root error boundary body                                                                                                                             |
| `MaintenanceTemplate`   | —                                                                                                             | Maintenance-mode page                                                                                                                                |
| `ModalsTemplate`        | —                                                                                                             | Modal/dialog examples                                                                                                                                |
| `NotFoundTemplate`      | `code?: number; message?: string`                                                                             | 404 page body                                                                                                                                        |
| `OnboardingTemplate`    | —                                                                                                             | Multi-step onboarding flow                                                                                                                           |
| `PaginationTemplate`    | —                                                                                                             | Paginated list                                                                                                                                       |
| `SearchTemplate`        | —                                                                                                             | Global search page                                                                                                                                   |
| `StepperTemplate`       | —                                                                                                             | Multi-step stepper                                                                                                                                   |
| `TabsTemplate`          | —                                                                                                             | Tab navigation examples                                                                                                                              |
| `TooltipsTemplate`      | —                                                                                                             | Tooltip examples                                                                                                                                     |
| `UploadTemplate`        | —                                                                                                             | File-upload dropzone                                                                                                                                 |
| `PageShell`             | `title, subtitle?, backHref?, headerAction?, headerBadges?, navItems?, maxWidth?, gap?, className?, children` | Wraps `Header` + `main` + optional `Navbar`; used by `AboutTemplate` and blog/info pages                                                             |

### app

Workspace/productivity templates (route group `(app)`).

| Template                | Props                                                                                                                                                                         | Description                                              |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `ActivityLogTemplate`   | —                                                                                                                                                                             | Recent user activity feed                                |
| `AnalyticsTemplate`     | —                                                                                                                                                                             | Usage-metrics dashboard                                  |
| `AppLoadingTemplate`    | —                                                                                                                                                                             | App boot loading state                                   |
| `BillingTemplate`       | —                                                                                                                                                                             | Plan & usage summary                                     |
| `CalendarTemplate`      | —                                                                                                                                                                             | Monthly event calendar                                   |
| `ChatTemplate`          | `initialMessages?, model?, onSendMessage?, onModelChange?, onNewChat?, conversations?, activeConversationId?, onConversationSelect?, models?, sidebarOpen?, onToggleSidebar?` | AI-style chat with sidebar, model select, message stream |
| `ContactsTemplate`      | —                                                                                                                                                                             | Contact list & search                                    |
| `DashboardTemplate`     | `userName?, userEmail?`                                                                                                                                                       | Overview dashboard with stat cards, nav, activity        |
| `ExpensesTemplate`      | —                                                                                                                                                                             | Expense tracker                                          |
| `FilesTemplate`         | —                                                                                                                                                                             | File browser                                             |
| `GoalsTemplate`         | —                                                                                                                                                                             | Objective & progress tracking                            |
| `HelpCenterTemplate`    | —                                                                                                                                                                             | Searchable FAQ categories                                |
| `ImportTemplate`        | —                                                                                                                                                                             | Data-import flow                                         |
| `InboxTemplate`         | —                                                                                                                                                                             | Email inbox                                              |
| `IntegrationsTemplate`  | —                                                                                                                                                                             | Connected services                                       |
| `KanbanTemplate`        | —                                                                                                                                                                             | Drag-style task board                                    |
| `MeetingsTemplate`      | —                                                                                                                                                                             | Scheduled meetings                                       |
| `MembersTemplate`       | —                                                                                                                                                                             | Team member roles                                        |
| `NotesTemplate`         | —                                                                                                                                                                             | Inline-editable notes                                    |
| `NotificationsTemplate` | —                                                                                                                                                                             | Notification feed                                        |
| `PermissionsTemplate`   | —                                                                                                                                                                             | Role permissions matrix                                  |
| `ProfileTemplate`       | `userName?, userEmail?, memberSince?`                                                                                                                                         | User profile                                             |
| `ReportsTemplate`       | —                                                                                                                                                                             | Generated report cards                                   |
| `RoadmapTemplate`       | —                                                                                                                                                                             | Product roadmap timeline                                 |
| `SettingsTemplate`      | `language, theme, dateTimeFormat, timezone, onLanguageChange, onThemeChange, onDateTimeFormatChange, onTimezoneChange`                                                        | Settings rows (language, theme, date/time, timezone)     |
| `ShortcutsTemplate`     | —                                                                                                                                                                             | Keyboard shortcuts                                       |
| `SprintsTemplate`       | —                                                                                                                                                                             | Sprint board & velocity                                  |
| `TasksTemplate`         | —                                                                                                                                                                             | Todo list with filters                                   |
| `TimesheetsTemplate`    | —                                                                                                                                                                             | Weekly timesheet entries                                 |
| `VersionTemplate`       | —                                                                                                                                                                             | Build version display                                    |
| `WebhooksTemplate`      | —                                                                                                                                                                             | Webhook endpoints                                        |
| `WhiteboardTemplate`    | —                                                                                                                                                                             | Collaborative whiteboard                                 |

### auth

Authentication flows (route group `(templates)/(auth)`).

| Template                   | Props                                                                               | Description                                  |
| -------------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------- |
| `AuthLoadingTemplate`      | —                                                                                   | Auth-boot loading state                      |
| `ChangePasswordTemplate`   | —                                                                                   | Password-change form with visibility toggles |
| `DeleteAccountTemplate`    | —                                                                                   | Account-deletion flow                        |
| `ForgotPasswordTemplate`   | `onSubmit: (email: string) => void \| Promise<void>; error?; success?; loading?`    | Reset request form                           |
| `LockScreenTemplate`       | —                                                                                   | Session lock page                            |
| `RecoveryCodesTemplate`    | —                                                                                   | Two-factor recovery codes                    |
| `ResetPasswordTemplate`    | `onSubmit: (password: string) => void \| Promise<void>; error?; success?; loading?` | Set-new-password form                        |
| `SecurityOverviewTemplate` | —                                                                                   | Security feature toggles                     |
| `SessionsTemplate`         | —                                                                                   | Active login sessions                        |
| `SignInTemplate`           | `onSubmit: ({ email, password }) => void \| Promise<void>; error?; loading?`        | Sign-in form                                 |
| `SignUpTemplate`           | —                                                                                   | Create-account form                          |
| `TwoFactorTemplate`        | —                                                                                   | 2FA code entry                               |
| `VerifyEmailTemplate`      | —                                                                                   | Email verification prompt                    |

### blog

Content templates (route group `blog`).

| Template                 | Props                                         | Description            |
| ------------------------ | --------------------------------------------- | ---------------------- |
| `BlogListTemplate`       | `posts: BlogPostData[]`                       | Blog index with posts  |
| `BlogItemTemplate`       | `post: BlogPostData; recentPosts: PostMeta[]` | Blog post detail       |
| `BlogArchiveTemplate`    | —                                             | Posts by month         |
| `BlogAuthorTemplate`     | —                                             | Author profile & posts |
| `BlogCategoriesTemplate` | —                                             | Category explorer      |
| `BlogNewsletterTemplate` | —                                             | Subscribe form         |
| `BlogSearchTemplate`     | —                                             | Live post search       |
| `BlogTagsTemplate`       | —                                             | Posts grouped by tag   |
| `BlogLoadingTemplate`    | —                                             | Blog loading state     |

### store

Commerce templates (route group `store`).

| Template                    | Props                | Description              |
| --------------------------- | -------------------- | ------------------------ |
| `StoreFrontTemplate`        | —                    | Product listing          |
| `StoreItemTemplate`         | `cartCount?: number` | Product detail           |
| `CartTemplate`              | —                    | Shopping cart            |
| `CheckoutTemplate`          | —                    | Checkout flow            |
| `OrderConfirmationTemplate` | —                    | Order success page       |
| `OrderHistoryTemplate`      | —                    | Past orders              |
| `StoreLoadingTemplate`      | —                    | Store loading state      |
| `WishlistTemplate`          | —                    | Saved products           |
| `CompareTemplate`           | —                    | Product comparison       |
| `AddressBookTemplate`       | —                    | Saved shipping addresses |
| `PaymentMethodsTemplate`    | —                    | Saved payment cards      |
| `OrderTrackingTemplate`     | —                    | Shipment timeline        |
| `DealsTemplate`             | —                    | Discount deals           |
| `CategoriesTemplate`        | —                    | Product categories       |
| `ReviewsTemplate`           | —                    | Customer reviews         |
| `SupportTemplate`           | —                    | Customer support         |
| `GiftCardsTemplate`         | —                    | Gift card purchase       |

### landing

Marketing pages (route group `marketing`).

| Template            | Description                                                                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `LandingTemplate`   | Marketing hero with features, pricing tiers, FAQs (props: `name, tagline, description, features, ctaLabel?, ctaHref?, tiers?, faqs?`) |
| `CareersTemplate`   | Job listings                                                                                                                          |
| `ChangelogTemplate` | Release notes                                                                                                                         |
| `ContactTemplate`   | Contact form                                                                                                                          |
| `PricingTemplate`   | Pricing plans                                                                                                                         |
| `PrivacyTemplate`   | Privacy policy                                                                                                                        |
| `TeamTemplate`      | Team directory                                                                                                                        |
| `TermsTemplate`     | Terms of service                                                                                                                      |

### resume

| Template         | Props                                                                          | Description                           |
| ---------------- | ------------------------------------------------------------------------------ | ------------------------------------- |
| `ResumeTemplate` | `profile, experiences, projects, education, skills` (typed shapes in the file) | Resume/portfolio single-page template |

### admin

Commerce admin (route group `admin`). All self-contained, interactive.

| Template             | Description                           |
| -------------------- | ------------------------------------- |
| `ProductsTemplate`   | Product catalog admin                 |
| `OrdersTemplate`     | Order management with status updates  |
| `CustomersTemplate`  | Customer directory with tier filters  |
| `InventoryTemplate`  | Stock level management (adjust/clamp) |
| `CouponsTemplate`    | Coupon CRUD with validation           |
| `PromotionsTemplate` | Promo campaign builder                |
| `RefundsTemplate`    | Refund requests                       |
| `ShipmentsTemplate`  | Shipment logistics                    |

### finance

Finance dashboard (route group `finance`). All self-contained, interactive.

| Template                | Description                                |
| ----------------------- | ------------------------------------------ |
| `InvoicesTemplate`      | Invoice tracking with status filters       |
| `BudgetsTemplate`       | Budget spending tracker with progress bars |
| `SubscriptionsTemplate` | Recurring subscription plans               |
| `TransactionsTemplate`  | Account transactions ledger                |
| `TaxesTemplate`         | Sales tax regions                          |
| `PayrollTemplate`       | Employee payroll runs                      |
| `StatementsTemplate`    | Monthly account statements                 |
| `AccountsTemplate`      | Linked bank accounts                       |

### developer

Developer tools (route group `developer`). All self-contained, interactive.

| Template               | Description                                  |
| ---------------------- | -------------------------------------------- |
| `ApiKeysTemplate`      | Key creation, reveal, revoke                 |
| `FeatureFlagsTemplate` | Per-environment feature toggles              |
| `EnvironmentsTemplate` | Deployment environment status                |
| `DeploymentsTemplate`  | Deployment history with rollback             |
| `LogsTemplate`         | Log list with level filters, search, clear   |
| `EndpointsTemplate`    | API endpoint list with method badges         |
| `MonitorsTemplate`     | Service uptime monitors (pause/resume/retry) |
| `BackupsTemplate`      | Backup schedules & restores                  |

### social

Social features (route group `social`). All self-contained, interactive.

| Template            | Description                       |
| ------------------- | --------------------------------- |
| `FeedTemplate`      | Post feed with likes and comments |
| `MessagesTemplate`  | Direct messages with thread list  |
| `EventsTemplate`    | Community events with RSVP        |
| `GroupsTemplate`    | Joinable interest groups          |
| `FollowersTemplate` | Follow/unfollow directory         |

### media

Media features (route group `media`). All self-contained, interactive.

| Template               | Description                                          |
| ---------------------- | ---------------------------------------------------- |
| `MediaLibraryTemplate` | Asset library with type filters, search, bulk delete |
| `AlbumsTemplate`       | Photo albums with expand/create                      |
| `VideoPlayerTemplate`  | Playlist + play/pause player                         |

### support

Customer support (route group `support`). All self-contained, interactive.

| Template                 | Description                                   |
| ------------------------ | --------------------------------------------- |
| `SupportTicketsTemplate` | Ticket inbox with status filters and search   |
| `TicketDetailTemplate`   | Conversation thread, priority & status update |
| `LiveChatTemplate`       | Chat with canned replies and transcript       |
| `KnowledgeBaseTemplate`  | Searchable help-article categories            |
| `FaqTemplate`            | Expandable FAQ accordion                      |
| `AnnouncementsTemplate`  | Service announcements list                    |
| `ServiceStatusTemplate`  | Uptime, incidents and current status          |
| `FeedbackTemplate`       | Feedback form with rating                     |

### mail

Email client (route group `mail`). All self-contained, interactive.

| Template             | Description                            |
| -------------------- | -------------------------------------- |
| `InboxTemplate`      | Message list with read/unread + labels |
| `ThreadTemplate`     | Message conversation with reply box    |
| `ComposeTemplate`    | New-message form                       |
| `DraftsTemplate`     | Unsent message drafts                  |
| `SentTemplate`       | Sent-message list                      |
| `SpamTemplate`       | Junk messages with restore actions     |
| `LabelsTemplate`     | Label management                       |
| `MailSearchTemplate` | Full-text message search               |

### hr

Human resources (route group `hr`). All self-contained, interactive.

| Template                     | Description                          |
| ---------------------------- | ------------------------------------ |
| `PeopleDirectoryTemplate`    | Employee directory with role filters |
| `OrgChartTemplate`           | Hierarchical company org chart       |
| `HiringPipelineTemplate`     | Candidates across pipeline stages    |
| `PoliciesTemplate`           | Company policy documents             |
| `BenefitsTemplate`           | Benefit packages & enrollments       |
| `PerformanceReviewsTemplate` | Review cycles and ratings            |
| `ShiftScheduleTemplate`      | Upcoming shifts                      |
| `TimeOffTemplate`            | Leave requests with balance          |

### crm

Sales & CRM (route group `crm`). All self-contained, interactive.

| Template               | Description                         |
| ---------------------- | ----------------------------------- |
| `AccountsTemplate`     | Customer accounts list              |
| `CrmContactsTemplate`  | Contacts with search and filters    |
| `LeadsTemplate`        | Prospect leads with source tracking |
| `DealsTemplate`        | Open opportunities with values      |
| `PipelineTemplate`     | Deals grouped by pipeline stage     |
| `CampaignsTemplate`    | Marketing campaign builder          |
| `QuoteBuilderTemplate` | Quote line-item builder             |
| `SalesReportsTemplate` | Team sales metrics                  |

### learning

Learning / LMS (route group `learning`). All self-contained, interactive.

| Template                    | Description                         |
| --------------------------- | ----------------------------------- |
| `MyCoursesTemplate`         | Enrolled courses with progress      |
| `CourseCatalogTemplate`     | Browse and filter courses           |
| `CourseDetailTemplate`      | Curriculum, syllabus and instructor |
| `LessonPlayerTemplate`      | Lesson video player with modules    |
| `InstructorsTemplate`       | Instructor directory                |
| `QuizzesTemplate`           | Quiz questions with scoring         |
| `AchievementsTemplate`      | Badges and milestones               |
| `LearningAnalyticsTemplate` | Learning progress analytics         |

### news

News & magazine (route group `news`). All self-contained, interactive.

| Template                   | Description                      |
| -------------------------- | -------------------------------- |
| `ArticleTemplate`          | Long-form article page           |
| `BreakingNewsTemplate`     | Breaking headline ticker         |
| `EditorialTemplate`        | Editor-picked stories            |
| `MagazineGridTemplate`     | Magazine feature layout          |
| `NewsCategoriesTemplate`   | Browse stories by category       |
| `NewsletterSignupTemplate` | Subscribe form with confirmation |
| `OpinionTemplate`          | Opinion columns                  |
| `PressReleasesTemplate`    | Media announcements              |

### music

Music app (route group `music`). All self-contained, interactive.

| Template              | Description                            |
| --------------------- | -------------------------------------- |
| `MusicHomeTemplate`   | Home feed with recommendations         |
| `AlbumDetailTemplate` | Album with track list and play buttons |
| `ArtistsTemplate`     | Artist directory                       |
| `ChartsTemplate`      | Top-track charts                       |
| `NowPlayingTemplate`  | Current track player                   |
| `PlaylistTemplate`    | Curated playlist                       |
| `LyricsTemplate`      | Lyrics view                            |
| `MusicSearchTemplate` | Search songs, artists and albums       |

### streaming

Video streaming (route group `streaming`). All self-contained, interactive.

| Template                   | Description                      |
| -------------------------- | -------------------------------- |
| `StreamingHomeTemplate`    | Home feed with title rows        |
| `MovieDetailTemplate`      | Movie details and related titles |
| `TvSeriesTemplate`         | Browse TV shows                  |
| `LiveChannelsTemplate`     | Live channel grid                |
| `ContinueWatchingTemplate` | Resume-in-progress titles        |
| `MyListTemplate`           | Saved titles with remove         |
| `WatchHistoryTemplate`     | Viewing history                  |
| `StreamingSearchTemplate`  | Search titles                    |

### gaming

Gaming hub (route group `gaming`). All self-contained, interactive.

| Template                 | Description                     |
| ------------------------ | ------------------------------- |
| `GameCatalogTemplate`    | Game listing with genre filters |
| `GameDetailTemplate`     | Game details and screenshots    |
| `GameChallengesTemplate` | Daily/weekly challenges         |
| `LeaderboardsTemplate`   | Ranked player leaderboard       |
| `LiveMatchesTemplate`    | Ongoing live matches            |
| `PlayerProfilesTemplate` | Player stats and profiles       |
| `TournamentsTemplate`    | Tournament brackets             |
| `GameNewsTemplate`       | Patch notes and game news       |

### sports

Sports tracker (route group `sports`). All self-contained, interactive.

| Template                  | Description                      |
| ------------------------- | -------------------------------- |
| `LiveScoresTemplate`      | Today's live scores              |
| `FixturesTemplate`        | Upcoming fixtures with reminders |
| `MatchDetailTemplate`     | Match details and events         |
| `SeasonStandingsTemplate` | League table with favorites      |
| `PlayerStatsTemplate`     | Goals/assists leaderboards       |
| `TeamRosterTemplate`      | Roster with position filters     |
| `FavoriteTeamsTemplate`   | Followed teams                   |
| `SportsNewsTemplate`      | Sports headlines                 |

### travel

Travel planner (route group `travel`). All self-contained, interactive.

| Template                | Description              |
| ----------------------- | ------------------------ |
| `BookingsTemplate`      | Upcoming trip bookings   |
| `BookingSearchTemplate` | Search stays and flights |
| `HotelDetailTemplate`   | Hotel details and rooms  |
| `DestinationsTemplate`  | Destination explorer     |
| `TravelGuidesTemplate`  | City travel guides       |
| `TravelStoriesTemplate` | Community travel stories |
| `PackingListTemplate`   | Checklist generator      |
| `TripPlannerTemplate`   | Itinerary builder        |

### food

Food & dining (route group `food`). All self-contained, interactive.

| Template                   | Description                       |
| -------------------------- | --------------------------------- |
| `RestaurantListTemplate`   | Restaurant directory with filters |
| `RestaurantDetailTemplate` | Restaurant details and reviews    |
| `MenuTemplate`             | Dishes and prices                 |
| `RecipesTemplate`          | Recipe collection                 |
| `RecipeDetailTemplate`     | Step-by-step recipe               |
| `ReservationsTemplate`     | Upcoming reservations             |
| `FoodDeliveryTemplate`     | Delivery ordering                 |
| `WineListTemplate`         | Wine pairings list                |

### health

Health & fitness (route group `health`). All self-contained, interactive.

| Template                   | Description                         |
| -------------------------- | ----------------------------------- |
| `HealthDashboardTemplate`  | Daily health overview               |
| `ActivityTrackerTemplate`  | Steps, distance, active minutes     |
| `WorkoutPlannerTemplate`   | Workout plans with intensity filter |
| `NutritionTrackerTemplate` | Macro tracking and meal log         |
| `SleepTrackerTemplate`     | Sleep quality and breakdown         |
| `WaterIntakeTemplate`      | Hydration goal counter              |
| `GoalsTemplate`            | Daily health targets                |
| `HealthProfileTemplate`    | Personal health metrics             |

### real-estate

Real estate (route group `real-estate`). All self-contained, interactive.

| Template                     | Description                          |
| ---------------------------- | ------------------------------------ |
| `PropertyListingsTemplate`   | Property cards with save actions     |
| `PropertyDetailTemplate`     | Property details and tour scheduling |
| `SearchFiltersTemplate`      | Filterable property search           |
| `MapViewTemplate`            | Map legend and layer toggles         |
| `SavedPropertiesTemplate`    | Saved shortlist with remove          |
| `MortgageCalculatorTemplate` | Monthly-payment calculator           |
| `OpenHousesTemplate`         | Open house events                    |
| `AgentProfileTemplate`       | Agent profile and contact            |

### iot

Smart home / IoT (route group `iot`). All self-contained, interactive.

| Template                    | Description                       |
| --------------------------- | --------------------------------- |
| `DeviceDashboardTemplate`   | Device grid with on/off toggles   |
| `DeviceDetailTemplate`      | Device control with modes         |
| `ScenesTemplate`            | One-tap scene activation          |
| `AutomationsTemplate`       | Scheduled automation toggles      |
| `EnergyUsageTemplate`       | Energy consumption by room        |
| `SecurityTemplate`          | Armed/disarmed status and cameras |
| `SensorDataTemplate`        | Live sensor readings              |
| `SmartHomeSettingsTemplate` | Home preferences                  |

### portfolio

Investment portfolio (route group `portfolio`). All self-contained, interactive.

| Template                    | Description                          |
| --------------------------- | ------------------------------------ |
| `PortfolioOverviewTemplate` | Net worth and summary stats          |
| `HoldingsTemplate`          | Holdings table with asset filters    |
| `TransactionsTemplate`      | Buy/sell ledger                      |
| `PerformanceTemplate`       | Returns over time-range tabs         |
| `AllocationTemplate`        | Asset-class allocation breakdown     |
| `WatchlistTemplate`         | Watched symbols with add/remove      |
| `AlertsTemplate`            | Price alerts with pause/resume       |
| `DividendIncomeTemplate`    | Dividend payouts and reinvest toggle |
| `PortfolioSettingsTemplate` | Portfolio preferences                |

---

[Back to index](README.md)
