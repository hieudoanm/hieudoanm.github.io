# Organisms

Complex UI sections composed of molecules and atoms.

**256 components** across 16 domains, one file per component in
`src/components/organisms/<domain>/<Name>.tsx`. Every component exports
`export const <Name>: FC<<Name>Props>` with a colocated `interface <Name>Props`;
props are listed verbatim from the interface. `Client` marks components that
start with `'use client';`.

## app

Workspace & productivity.

| Component            | File                                   | Props                                                                                                                                                | Client |
| -------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `AnnouncementStrip`  | `organisms/app/AnnouncementStrip.tsx`  | `message: string; action?: AnnouncementAction; variant?: 'info' \| 'success' \| 'warning' \| 'error'; dismissible?: boolean; onDismiss?: () => void` | client |
| `AppShell`           | `organisms/app/AppShell.tsx`           | `title: string; navItems: AppShellNavItem[]; onNavigate?: (label: string) => void; user?: { name: string; initials: string }; children: ReactNode`   | client |
| `BillingPanel`       | `organisms/app/BillingPanel.tsx`       | `plan: string; price: string; billingCycle?: string; nextPayment?: string; usage?: Usage[]; onManageBilling?: () => void; onUpgrade?: () => void`    | client |
| `DashboardWidget`    | `organisms/app/DashboardWidget.tsx`    | `title: string; subtitle?: string; action?: ReactNode; className?: string; children: ReactNode`                                                      | —      |
| `MetricBar`          | `organisms/app/MetricBar.tsx`          | `metrics: Metric[]`                                                                                                                                  | —      |
| `NotificationDrawer` | `organisms/app/NotificationDrawer.tsx` | `open: boolean; onClose: () => void; notifications: Notification[]; onMarkAllRead?: () => void`                                                      | client |
| `OnboardingFlow`     | `organisms/app/OnboardingFlow.tsx`     | `steps: OnboardingStep[]; initialStep?: number; onComplete?: (index: number) => void`                                                                | client |
| `ProjectTimeline`    | `organisms/app/ProjectTimeline.tsx`    | `milestones: Milestone[]`                                                                                                                            | —      |
| `QuickActions`       | `organisms/app/QuickActions.tsx`       | `actions: QuickAction[]; onAction?: (id: string) => void`                                                                                            | client |
| `RecentActivity`     | `organisms/app/RecentActivity.tsx`     | `activities: Activity[]; onViewAll?: () => void; emptyText?: string`                                                                                 | client |
| `SearchOverlay`      | `organisms/app/SearchOverlay.tsx`      | `open: boolean; onClose: () => void; onSearch?: (query: string) => void; results?: SearchResult[]; placeholder?: string`                             | client |
| `SettingsPanel`      | `organisms/app/SettingsPanel.tsx`      | `sections: SettingsSection[]`                                                                                                                        | —      |
| `StatusOverview`     | `organisms/app/StatusOverview.tsx`     | `stats: StatusStat[]`                                                                                                                                | —      |
| `TeamRoster`         | `organisms/app/TeamRoster.tsx`         | `members: Member[]; onInvite?: () => void`                                                                                                           | client |
| `UserMenu`           | `organisms/app/UserMenu.tsx`           | `username: string; avatarInitials: string; role?: string; onSignOut?: () => void; onProfile?: () => void; onSettings?: () => void`                   | client |
| `WorkspaceGrid`      | `organisms/app/WorkspaceGrid.tsx`      | `workspaces: Workspace[]; onCreate?: () => void`                                                                                                     | client |

## auth

Auth, security & account.

| Component            | File                                    | Props                                                                                                                                                                  | Client |
| -------------------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `AccountMenu`        | `organisms/auth/AccountMenu.tsx`        | `name: string; email?: string; avatar?: ReactNode; items: AccountMenuItem[]`                                                                                           | client |
| `AccountRecovery`    | `organisms/auth/AccountRecovery.tsx`    | `onSubmit: (payload: { method: 'email' \| 'phone'; identifier: string; }) => void; loading?: boolean; error?: string`                                                  | client |
| `AnnouncementBar`    | `organisms/auth/AnnouncementBar.tsx`    | `text: string; link?: { label: string; href: string }; variant?: 'primary' \| 'accent' \| 'neutral'; dismissible?: boolean; onDismiss?: () => void`                    | client |
| `AuthForm`           | `organisms/auth/AuthForm.tsx`           | `mode?: 'login' \| 'signup'; title?: string; onSubmit: (payload: AuthPayload) => void; loading?: boolean; error?: string`                                              | client |
| `AuthLayout`         | `organisms/auth/AuthLayout.tsx`         | `title: string; subtitle?: string; children: ReactNode; footer?: ReactNode; brand?: string`                                                                            | —      |
| `CookieBanner`       | `organisms/auth/CookieBanner.tsx`       | `onAccept: () => void; onDecline: () => void; message?: string; policyHref?: string; policyLabel?: string`                                                             | client |
| `InviteTeam`         | `organisms/auth/InviteTeam.tsx`         | `onInvite: (payload: { email: string; role: string }) => void; roles?: string[]; loading?: boolean`                                                                    | client |
| `MfaSetup`           | `organisms/auth/MfaSetup.tsx`           | `secret?: string; onSubmit?: (code: string) => void; loading?: boolean; error?: string`                                                                                | client |
| `NotificationCenter` | `organisms/auth/NotificationCenter.tsx` | `notifications: Notification[]; onOpen?: (notification: Notification) => void; onMarkAllRead?: () => void; unreadCount?: number`                                       | client |
| `OtpVerify`          | `organisms/auth/OtpVerify.tsx`          | `digits?: number; onSubmit: (code: string) => void; loading?: boolean; error?: string; onResend?: () => void`                                                          | client |
| `PasswordResetForm`  | `organisms/auth/PasswordResetForm.tsx`  | `onSubmit: (email: string) => void; loading?: boolean; error?: string; successMessage?: string`                                                                        | client |
| `PermissionMatrix`   | `organisms/auth/PermissionMatrix.tsx`   | `roles: string[]; permissions: string[]; value: Record<string, string[]>; onChange?: (role: string, permission: string, checked: boolean) => void; readonly?: boolean` | client |
| `SessionTimeout`     | `organisms/auth/SessionTimeout.tsx`     | `timeoutSeconds?: number; warningThresholdSeconds?: number; onSignOut: () => void; onExtend: () => void`                                                               | client |
| `SignInForm`         | `organisms/auth/SignInForm.tsx`         | `onSubmit: (payload: { email: string; password: string }) => void; loading?: boolean; error?: string; title?: string; onForgotPassword?: () => void`                   | client |
| `SignUpForm`         | `organisms/auth/SignUpForm.tsx`         | `onSubmit: (payload: { name: string; email: string; password: string; }) => void; loading?: boolean; error?: string; title?: string`                                   | client |
| `SocialAuthRow`      | `organisms/auth/SocialAuthRow.tsx`      | `providers: SocialProvider[]; onProvider?: (id: string) => void; dividerText?: string`                                                                                 | client |

## blog

Blog, course & learning.

| Component          | File                                  | Props                                                                                                                                 | Client |
| ------------------ | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `ArticleList`      | `organisms/blog/ArticleList.tsx`      | `articles: Article[]; title?: string`                                                                                                 | —      |
| `AuthorProfile`    | `organisms/blog/AuthorProfile.tsx`    | `name: string; role: string; bio?: string; initials?: string; stats?: { articles?: number; followers?: number; following?: number; }` | —      |
| `BlogSection`      | `organisms/blog/BlogSection.tsx`      | `posts: BlogPost[]; title?: string`                                                                                                   | —      |
| `CategorySection`  | `organisms/blog/CategorySection.tsx`  | `categories: Category[]; title?: string`                                                                                              | —      |
| `CourseLanding`    | `organisms/blog/CourseLanding.tsx`    | `title: string; description?: string; instructor?: string; rating?: number; curriculum: CurriculumItem[]; ctaLabel?: string`          | —      |
| `EditorialStrip`   | `organisms/blog/EditorialStrip.tsx`   | `items: Editorial[]; title?: string`                                                                                                  | —      |
| `FAQSection`       | `organisms/blog/FAQSection.tsx`       | `items: FaqItem[]; title?: string`                                                                                                    | —      |
| `FaqAccordion`     | `organisms/blog/FaqAccordion.tsx`     | `items: FaqAccordionItem[]; title?: string; description?: string`                                                                     | client |
| `FeaturedStory`    | `organisms/blog/FeaturedStory.tsx`    | `title: string; excerpt?: string; author?: string; date?: string; category?: string; readTime?: string`                               | —      |
| `GalleryGrid`      | `organisms/blog/GalleryGrid.tsx`      | `items: GalleryGridItem[]; columns?: 2 \| 3 \| 4; className?: string`                                                                 | —      |
| `LessonNavigation` | `organisms/blog/LessonNavigation.tsx` | `lessons: Lesson[]; activeLesson?: string; onSelect?: (lessonId: string) => void`                                                     | client |
| `NewsletterBanner` | `organisms/blog/NewsletterBanner.tsx` | `title?: string; description?: string; buttonLabel?: string; onSubscribe?: (email: string) => void`                                   | client |
| `PinnedPost`       | `organisms/blog/PinnedPost.tsx`       | `title: string; excerpt?: string; author?: string; date?: string; tags?: string[]`                                                    | —      |
| `QuizSection`      | `organisms/blog/QuizSection.tsx`      | `questions: Question[]; title?: string`                                                                                               | client |
| `QuoteShowcase`    | `organisms/blog/QuoteShowcase.tsx`    | `quotes: Quote[]; title?: string`                                                                                                     | —      |
| `RecipeCollection` | `organisms/blog/RecipeCollection.tsx` | `recipes: Recipe[]; title?: string`                                                                                                   | —      |

## crm

Sales, CRM & commerce ops.

| Component             | File                                    | Props                                                                                                                                                                                                       | Client |
| --------------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `ActivityFeed`        | `organisms/crm/ActivityFeed.tsx`        | `items: FeedItem[]; title?: string`                                                                                                                                                                         | —      |
| `CustomerJourney`     | `organisms/crm/CustomerJourney.tsx`     | `steps: JourneyStep[]; title?: string`                                                                                                                                                                      | —      |
| `DealRoom`            | `organisms/crm/DealRoom.tsx`            | `dealName: string; company?: string; value?: number; stage?: string; owner?: string; expectedClose?: string; contacts?: DealContact[]; activities?: DealActivity[]`                                         | —      |
| `InfoCards`           | `organisms/crm/InfoCards.tsx`           | `cards: InfoCard[]; columns?: 2 \| 3 \| 4; title?: string`                                                                                                                                                  | —      |
| `IntegrationsSection` | `organisms/crm/IntegrationsSection.tsx` | `title?: string; description?: string; items: Integration[]; columns?: number; className?: string`                                                                                                          | —      |
| `InvoiceSection`      | `organisms/crm/InvoiceSection.tsx`      | `invoices: Invoice[]; title?: string`                                                                                                                                                                       | —      |
| `KanbanBoard`         | `organisms/crm/KanbanBoard.tsx`         | `columns: KanbanColumn[]`                                                                                                                                                                                   | —      |
| `LeadCapture`         | `organisms/crm/LeadCapture.tsx`         | `title?: string; onCapture?: (lead: Lead) => void`                                                                                                                                                          | client |
| `Leaderboard`         | `organisms/crm/Leaderboard.tsx`         | `entries: LeaderboardEntry[]; title?: string; limit?: number; className?: string`                                                                                                                           | —      |
| `LogosSection`        | `organisms/crm/LogosSection.tsx`        | `items: Logo[]; title?: string; columns?: 2 \| 3 \| 4 \| 5 \| 6`                                                                                                                                            | —      |
| `OrderHistory`        | `organisms/crm/OrderHistory.tsx`        | `orders: Order[]; title?: string`                                                                                                                                                                           | —      |
| `PricingCard`         | `organisms/crm/PricingCard.tsx`         | `name: string; price: string; period?: string; description?: string; features: string[]; ctaLabel: string; ctaHref?: string; onCta?: () => void; highlighted?: boolean; badge?: string; className?: string` | —      |
| `ProductGrid`         | `organisms/crm/ProductGrid.tsx`         | `items: ProductItem[]; title?: string; columns?: 2 \| 3 \| 4; className?: string`                                                                                                                           | —      |
| `ProfileCard`         | `organisms/crm/ProfileCard.tsx`         | `name: string; role?: string; bio?: string; avatar?: { src?: string; alt: string; initials?: string }; badges?: string[]; stats?: ProfileStat[]; actions?: ReactNode`                                       | —      |
| `SalesPipeline`       | `organisms/crm/SalesPipeline.tsx`       | `stages: PipelineStage[]; title?: string`                                                                                                                                                                   | —      |
| `SupportInbox`        | `organisms/crm/SupportInbox.tsx`        | `tickets: Ticket[]; title?: string`                                                                                                                                                                         | —      |

## developer

Developer platform & IoT.

| Component             | File                                          | Props                                                                                                          | Client |
| --------------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ------ |
| `ApiPlayground`       | `organisms/developer/ApiPlayground.tsx`       | `title?: string; onSend?: (request: { method: string; path: string; body?: string }) => void`                  | client |
| `BranchManager`       | `organisms/developer/BranchManager.tsx`       | `branches: Branch[]; currentBranch?: string; onCheckout?: (branchId: string) => void`                          | client |
| `ChangelogFeed`       | `organisms/developer/ChangelogFeed.tsx`       | `entries: ChangelogEntry[]; title?: string`                                                                    | —      |
| `CodeExplorer`        | `organisms/developer/CodeExplorer.tsx`        | `files: FileNode[]; title?: string`                                                                            | client |
| `ComparisonSection`   | `organisms/developer/ComparisonSection.tsx`   | `title?: string; description?: string; columns: ComparisonColumn[]; rows: ComparisonRow[]; className?: string` | —      |
| `DeployPipeline`      | `organisms/developer/DeployPipeline.tsx`      | `steps: PipelineStep[]; title?: string`                                                                        | —      |
| `DevServerStatus`     | `organisms/developer/DevServerStatus.tsx`     | `services: ServerService[]; title?: string`                                                                    | —      |
| `DocumentationView`   | `organisms/developer/DocumentationView.tsx`   | `sections: DocSection[]; title?: string`                                                                       | —      |
| `EnvironmentSelector` | `organisms/developer/EnvironmentSelector.tsx` | `environments: Environment[]; selected?: string; title?: string`                                               | —      |
| `GitCommitFeed`       | `organisms/developer/GitCommitFeed.tsx`       | `commits: Commit[]; title?: string`                                                                            | —      |
| `LogViewer`           | `organisms/developer/LogViewer.tsx`           | `entries: LogEntry[]; title?: string`                                                                          | —      |
| `Marquee`             | `organisms/developer/Marquee.tsx`             | `items: ReactNode[]; title?: string; className?: string`                                                       | client |
| `MetricsDashboard`    | `organisms/developer/MetricsDashboard.tsx`    | `metrics: Metric[]; title?: string`                                                                            | —      |
| `PackageManager`      | `organisms/developer/PackageManager.tsx`      | `packages: Package[]; title?: string`                                                                          | client |
| `TerminalPanel`       | `organisms/developer/TerminalPanel.tsx`       | `initialLines?: TerminalLine[]; onCommand?: (command: string) => void; prompt?: string; title?: string`        | client |
| `TestRunner`          | `organisms/developer/TestRunner.tsx`          | `results: TestResult[]; title?: string`                                                                        | —      |

## finance

Finance & investing.

| Component             | File                                        | Props                                                                                                                                                        | Client |
| --------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| `AccountOverview`     | `organisms/finance/AccountOverview.tsx`     | `balance: number; income: number; expenses: number; accountName?: string; currency?: string`                                                                 | —      |
| `BudgetOverview`      | `organisms/finance/BudgetOverview.tsx`      | `budgets: BudgetItem[]; currency?: string; title?: string`                                                                                                   | —      |
| `CryptoPortfolio`     | `organisms/finance/CryptoPortfolio.tsx`     | `assets: CryptoAsset[]; currency?: string; title?: string`                                                                                                   | —      |
| `ExpenseCategories`   | `organisms/finance/ExpenseCategories.tsx`   | `categories: ExpenseCategory[]; currency?: string; title?: string`                                                                                           | —      |
| `FinancialHealth`     | `organisms/finance/FinancialHealth.tsx`     | `score: number; metrics: HealthMetric[]; title?: string`                                                                                                     | —      |
| `InvestmentPortfolio` | `organisms/finance/InvestmentPortfolio.tsx` | `holdings: Holding[]; totalValue: number; currency?: string; title?: string`                                                                                 | —      |
| `InvoiceDashboard`    | `organisms/finance/InvoiceDashboard.tsx`    | `invoices: Invoice[]; currency?: string; title?: string`                                                                                                     | —      |
| `LoanApplication`     | `organisms/finance/LoanApplication.tsx`     | `onSubmit: (request: LoanRequest) => void; title?: string`                                                                                                   | client |
| `MarketWatch`         | `organisms/finance/MarketWatch.tsx`         | `quotes: Quote[]; currency?: string; title?: string`                                                                                                         | —      |
| `PaymentMethods`      | `organisms/finance/PaymentMethods.tsx`      | `methods: PaymentMethod[]; title?: string`                                                                                                                   | —      |
| `RetirementPlanner`   | `organisms/finance/RetirementPlanner.tsx`   | `currentAge: number; retirementAge: number; currentSavings: number; monthlyContribution: number; expectedReturn?: number; currency?: string; title?: string` | —      |
| `SavingsGoals`        | `organisms/finance/SavingsGoals.tsx`        | `goals: SavingsGoal[]; currency?: string; title?: string`                                                                                                    | —      |
| `SpendingTrends`      | `organisms/finance/SpendingTrends.tsx`      | `data: TrendPoint[]; currency?: string; title?: string`                                                                                                      | —      |
| `SubscriptionManager` | `organisms/finance/SubscriptionManager.tsx` | `subscriptions: Subscription[]; currency?: string; title?: string`                                                                                           | —      |
| `TaxSummary`          | `organisms/finance/TaxSummary.tsx`          | `grossIncome: number; deductions: number; credits: number; taxPaid: number; currency?: string; title?: string`                                               | —      |
| `TransactionHistory`  | `organisms/finance/TransactionHistory.tsx`  | `transactions: Transaction[]; currency?: string; title?: string`                                                                                             | —      |

## health

Health, fitness & food.

| Component            | File                                      | Props                                                                                                        | Client |
| -------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------ |
| `ActivityCalendar`   | `organisms/health/ActivityCalendar.tsx`   | `days: CalendarDay[]; title?: string`                                                                        | —      |
| `AppointmentBooking` | `organisms/health/AppointmentBooking.tsx` | `doctors: string[]; onSubmit: (request: AppointmentRequest) => void; title?: string`                         | client |
| `CareTeam`           | `organisms/health/CareTeam.tsx`           | `members: CareMember[]; title?: string`                                                                      | —      |
| `EmergencyContacts`  | `organisms/health/EmergencyContacts.tsx`  | `contacts: EmergencyContact[]; title?: string`                                                               | —      |
| `FitnessGoals`       | `organisms/health/FitnessGoals.tsx`       | `goals: FitnessGoal[]; title?: string`                                                                       | —      |
| `HealthDashboard`    | `organisms/health/HealthDashboard.tsx`    | `name?: string; vitals: Vital[]; steps?: number; stepsGoal?: number; calories?: number; sleepHours?: number` | —      |
| `HealthHistory`      | `organisms/health/HealthHistory.tsx`      | `records: HealthRecord[]; title?: string`                                                                    | —      |
| `HydrationTracker`   | `organisms/health/HydrationTracker.tsx`   | `goal?: number; glassSize?: number; initialGlasses?: number; title?: string`                                 | client |
| `MealPlanner`        | `organisms/health/MealPlanner.tsx`        | `meals: DayMeals[]; title?: string`                                                                          | —      |
| `MedicationSchedule` | `organisms/health/MedicationSchedule.tsx` | `medications: Medication[]; title?: string`                                                                  | client |
| `NutritionalSummary` | `organisms/health/NutritionalSummary.tsx` | `nutrition: NutritionData; targetCalories?: number; title?: string`                                          | —      |
| `SleepInsights`      | `organisms/health/SleepInsights.tsx`      | `nights: SleepNight[]; title?: string`                                                                       | —      |
| `SymptomTracker`     | `organisms/health/SymptomTracker.tsx`     | `symptoms: Symptom[]; title?: string`                                                                        | —      |
| `VitalsOverview`     | `organisms/health/VitalsOverview.tsx`     | `vitals: Vital[]; title?: string`                                                                            | —      |
| `WellnessScore`      | `organisms/health/WellnessScore.tsx`      | `score: number; factors: WellnessFactor[]; title?: string`                                                   | —      |
| `WorkoutPlan`        | `organisms/health/WorkoutPlan.tsx`        | `workouts: Workout[]; title?: string`                                                                        | —      |

## hr

HR, people & benefits.

| Component             | File                                   | Props                                                            | Client |
| --------------------- | -------------------------------------- | ---------------------------------------------------------------- | ------ |
| `AttendanceDashboard` | `organisms/hr/AttendanceDashboard.tsx` | `records: AttendanceRecord[]`                                    | —      |
| `BenefitsPortal`      | `organisms/hr/BenefitsPortal.tsx`      | `benefits: Benefit[]`                                            | —      |
| `CandidatePipeline`   | `organisms/hr/CandidatePipeline.tsx`   | `stages: PipelineStage[]`                                        | —      |
| `CompensationReview`  | `organisms/hr/CompensationReview.tsx`  | `records: CompensationRecord[]`                                  | —      |
| `EmployeeDirectory`   | `organisms/hr/EmployeeDirectory.tsx`   | `employees: Employee[]; onSelect?: (employee: Employee) => void` | —      |
| `HiringFunnel`        | `organisms/hr/HiringFunnel.tsx`        | `stages: FunnelStage[]`                                          | —      |
| `JobBoard`            | `organisms/hr/JobBoard.tsx`            | `jobs: Job[]; onApply?: (job: Job) => void`                      | —      |
| `LeaveCalendar`       | `organisms/hr/LeaveCalendar.tsx`       | `leaves: Leave[]`                                                | client |
| `OnboardingProgram`   | `organisms/hr/OnboardingProgram.tsx`   | `steps: OnboardingStep[]; startIndex?: number`                   | client |
| `OrgStructure`        | `organisms/hr/OrgStructure.tsx`        | `nodes: OrgNode[]`                                               | —      |
| `PayrollOverview`     | `organisms/hr/PayrollOverview.tsx`     | `payroll: PayrollEntry[]`                                        | —      |
| `PerformanceReview`   | `organisms/hr/PerformanceReview.tsx`   | `reviews: Review[]`                                              | —      |
| `PolicyLibrary`       | `organisms/hr/PolicyLibrary.tsx`       | `policies: Policy[]`                                             | —      |
| `RecognitionFeed`     | `organisms/hr/RecognitionFeed.tsx`     | `items: Recognition[]`                                           | —      |
| `TimesheetDashboard`  | `organisms/hr/TimesheetDashboard.tsx`  | `entries: TimesheetEntry[]`                                      | —      |
| `TrainingCatalog`     | `organisms/hr/TrainingCatalog.tsx`     | `courses: Course[]`                                              | —      |

## landing

Marketing, landing & careers.

| Component             | File                                        | Props                                                                                                                 | Client |
| --------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------ |
| `CTASection`          | `organisms/landing/CTASection.tsx`          | `title: string; description?: string; primaryCta?: CtaLink; secondaryCta?: CtaLink; badge?: string`                   | —      |
| `ContactSection`      | `organisms/landing/ContactSection.tsx`      | `title?: string; description?: string; onSubmit?: (payload: ContactPayload) => void`                                  | client |
| `Footer`              | `organisms/landing/Footer.tsx`              | `brand: string; description?: string; columns: FooterColumn[]; copyright?: string`                                    | —      |
| `Hero`                | `organisms/landing/Hero.tsx`                | `title: string; tagline?: string; description?: string; primaryCta?: HeroCta; secondaryCta?: HeroCta; badge?: string` | —      |
| `Navbar`              | `organisms/landing/Navbar.tsx`              | `items: NavbarItem[]; position?: 'bottom' \| 'top'`                                                                   | client |
| `NavigationMenu`      | `organisms/landing/NavigationMenu.tsx`      | `items: NavigationMenuItem[]; ariaLabel?: string`                                                                     | client |
| `NewsletterSection`   | `organisms/landing/NewsletterSection.tsx`   | `title?: string; description?: string; buttonLabel?: string; onSubmit?: (email: string) => void`                      | client |
| `PricingSection`      | `organisms/landing/PricingSection.tsx`      | `plans: PricingPlan[]`                                                                                                | —      |
| `ProcessSection`      | `organisms/landing/ProcessSection.tsx`      | `steps: ProcessStep[]; current?: string; title?: string; className?: string`                                          | —      |
| `QuoteSection`        | `organisms/landing/QuoteSection.tsx`        | `quote: string; author: string; role?: string; avatar?: ReactNode; className?: string`                                | —      |
| `ShowcaseSection`     | `organisms/landing/ShowcaseSection.tsx`     | `title?: string; items: ShowcaseItem[]; columns?: 2 \| 3; className?: string`                                         | —      |
| `TeamSection`         | `organisms/landing/TeamSection.tsx`         | `members: TeamMember[]; title?: string`                                                                               | —      |
| `TestimonialCarousel` | `organisms/landing/TestimonialCarousel.tsx` | `items: Testimonial[]; className?: string`                                                                            | client |
| `TestimonialGrid`     | `organisms/landing/TestimonialGrid.tsx`     | `testimonials: Testimonial[]; title?: string; columns?: 1 \| 2 \| 3; className?: string`                              | —      |
| `TestimonialSection`  | `organisms/landing/TestimonialSection.tsx`  | `items: Testimonial[]; title?: string; columns?: 2 \| 3`                                                              | —      |
| `VideoSection`        | `organisms/landing/VideoSection.tsx`        | `title?: string; src?: string; videoId?: string; poster?: string; className?: string`                                 | —      |

## mail

Email, inbox & operations.

| Component           | File                                   | Props                                                                                                                                                             | Client |
| ------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `ArchivePanel`      | `organisms/mail/ArchivePanel.tsx`      | `emails: ArchivedEmail[]; onRestore?: (email: ArchivedEmail) => void; onDelete?: (email: ArchivedEmail) => void`                                                  | —      |
| `AttachmentViewer`  | `organisms/mail/AttachmentViewer.tsx`  | `attachments: Attachment[]; onDownload?: (attachment: Attachment) => void`                                                                                        | —      |
| `ComposeWindow`     | `organisms/mail/ComposeWindow.tsx`     | `onSend?: (payload: { to: string; cc: string; subject: string; body: string; }) => void; onDiscard?: () => void`                                                  | client |
| `ConversationList`  | `organisms/mail/ConversationList.tsx`  | `conversations: Conversation[]; onSelect?: (conversation: Conversation) => void`                                                                                  | —      |
| `DraftList`         | `organisms/mail/DraftList.tsx`         | `drafts: Draft[]; onEdit?: (draft: Draft) => void; onDelete?: (draft: Draft) => void`                                                                             | —      |
| `EmailReader`       | `organisms/mail/EmailReader.tsx`       | `email: Email; onReply?: () => void; onForward?: () => void`                                                                                                      | —      |
| `FolderManager`     | `organisms/mail/FolderManager.tsx`     | `folders: Folder[]; onAdd?: (name: string) => void; onRename?: (id: string, name: string) => void; onDelete?: (id: string) => void`                               | client |
| `InboxView`         | `organisms/mail/InboxView.tsx`         | `emails: EmailSummary[]`                                                                                                                                          | client |
| `MailFilters`       | `organisms/mail/MailFilters.tsx`       | `filters?: MailFilter[]; onToggle?: (id: string, enabled: boolean) => void; onAdd?: (label: string) => void`                                                      | client |
| `MailSearchOverlay` | `organisms/mail/MailSearchOverlay.tsx` | `onSearch?: (query: string) => void; onSelect?: (result: SearchResult) => void; results?: SearchResult[]`                                                         | client |
| `MailSidebar`       | `organisms/mail/MailSidebar.tsx`       | `folders: MailFolder[]; activeId?: string; onSelect?: (folder: MailFolder) => void; onCompose?: () => void`                                                       | —      |
| `ReplyComposer`     | `organisms/mail/ReplyComposer.tsx`     | `recipient?: string; subject?: string; quoted?: string; onSend?: (payload: { recipient: string; subject: string; body: string; }) => void; onCancel?: () => void` | client |
| `SendLater`         | `organisms/mail/SendLater.tsx`         | `scheduled: ScheduledSend[]; onCancel?: (item: ScheduledSend) => void; onReschedule?: (item: ScheduledSend) => void`                                              | —      |
| `SignatureSettings` | `organisms/mail/SignatureSettings.tsx` | `name?: string; title?: string; signature?: string; onChange?: (payload: { name: string; title: string; signature: string; }) => void`                            | client |
| `SpamFolder`        | `organisms/mail/SpamFolder.tsx`        | `emails: SpamEmail[]; onNotSpam?: (email: SpamEmail) => void; onDelete?: (email: SpamEmail) => void`                                                              | —      |
| `StarredView`       | `organisms/mail/StarredView.tsx`       | `emails: StarredEmail[]; onUnstar?: (email: StarredEmail) => void`                                                                                                | —      |

## media

Music, streaming & media.

| Component           | File                                    | Props                                                                                                                                 | Client |
| ------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `AlbumPage`         | `organisms/media/AlbumPage.tsx`         | `album: Album; onPlayTrack?: (id: string) => void; onPlayAll?: () => void`                                                            | —      |
| `ArtistProfile`     | `organisms/media/ArtistProfile.tsx`     | `name: string; genres: string[]; monthlyListeners?: number; topTracks: TopTrack[]; onFollow?: () => void`                             | —      |
| `BrowseGrid`        | `organisms/media/BrowseGrid.tsx`        | `items: BrowseItem[]; title?: string`                                                                                                 | —      |
| `DiscoverPage`      | `organisms/media/DiscoverPage.tsx`      | `items: DiscoverItem[]; title?: string; onOpen?: (id: string) => void`                                                                | —      |
| `DownloadManager`   | `organisms/media/DownloadManager.tsx`   | `downloads: DownloadItem[]; onPause?: (id: string, paused: boolean) => void; onCancel?: (id: string) => void`                         | client |
| `LiveChannel`       | `organisms/media/LiveChannel.tsx`       | `channel: ChannelInfo; streamTitle?: string; onFollow?: () => void`                                                                   | —      |
| `LyricsView`        | `organisms/media/LyricsView.tsx`        | `lines: LyricLine[]; activeIndex?: number; onSelect?: (index: number) => void`                                                        | client |
| `MovieDetail`       | `organisms/media/MovieDetail.tsx`       | `movie: Movie; onPlay?: () => void; onWatchlist?: () => void`                                                                         | —      |
| `MusicLibrary`      | `organisms/media/MusicLibrary.tsx`      | `songs: LibrarySong[]; title?: string; onPlay?: (id: string) => void`                                                                 | —      |
| `PlayerSection`     | `organisms/media/PlayerSection.tsx`     | `title: string; artist: string; duration?: number; progress?: number; onToggle?: (isPlaying: boolean) => void`                        | client |
| `PlaylistView`      | `organisms/media/PlaylistView.tsx`      | `name: string; tracks: PlaylistTrack[]; onPlay?: (id: string) => void; onPlayAll?: () => void`                                        | —      |
| `PodcastHub`        | `organisms/media/PodcastHub.tsx`        | `podcasts: PodcastItem[]; title?: string; onOpen?: (id: string) => void`                                                              | —      |
| `QueueManager`      | `organisms/media/QueueManager.tsx`      | `items: QueueItem[]; onRemove?: (id: string) => void; onMove?: (id: string, direction: 'up' \| 'down') => void; onClear?: () => void` | client |
| `RecommendationRow` | `organisms/media/RecommendationRow.tsx` | `items: Recommendation[]; title?: string; onSelect?: (id: string) => void`                                                            | —      |
| `TvSeriesPage`      | `organisms/media/TvSeriesPage.tsx`      | `series: TvSeries; onPlay?: (id: string) => void`                                                                                     | —      |
| `VideoCatalog`      | `organisms/media/VideoCatalog.tsx`      | `videos: VideoItem[]; title?: string; onPlay?: (id: string) => void`                                                                  | —      |

## news

News, magazine & sports.

| Component           | File                                   | Props                                                                                               | Client |
| ------------------- | -------------------------------------- | --------------------------------------------------------------------------------------------------- | ------ |
| `BreakingTicker`    | `organisms/news/BreakingTicker.tsx`    | `items: string[]; label?: string; intervalMs?: number`                                              | client |
| `BusinessNews`      | `organisms/news/BusinessNews.tsx`      | `market: MarketQuote[]; headlines: BusinessHeadline[]; title?: string`                              | —      |
| `DataViz`           | `organisms/news/DataViz.tsx`           | `data: DataPoint[]; title?: string; unit?: string`                                                  | —      |
| `EditorialOpinion`  | `organisms/news/EditorialOpinion.tsx`  | `columns: OpinionColumn[]; title?: string`                                                          | —      |
| `EntertainmentFeed` | `organisms/news/EntertainmentFeed.tsx` | `items: EntertainmentItem[]; title?: string`                                                        | —      |
| `LiveBlog`          | `organisms/news/LiveBlog.tsx`          | `posts: LivePost[]; title?: string; author?: string`                                                | client |
| `LocalNews`         | `organisms/news/LocalNews.tsx`         | `items: LocalItem[]; title?: string`                                                                | —      |
| `NewsletterSignup`  | `organisms/news/NewsletterSignup.tsx`  | `title?: string; description?: string; buttonLabel?: string; onSubscribe?: (email: string) => void` | client |
| `PhotoGallery`      | `organisms/news/PhotoGallery.tsx`      | `photos: Photo[]; title?: string`                                                                   | client |
| `PodcastFeed`       | `organisms/news/PodcastFeed.tsx`       | `podcasts: Podcast[]; title?: string`                                                               | —      |
| `PoliticsSection`   | `organisms/news/PoliticsSection.tsx`   | `lead: PoliticsArticle; articles: PoliticsArticle[]; poll?: PoliticsPoll; title?: string`           | —      |
| `SportsSection`     | `organisms/news/SportsSection.tsx`     | `matches: SportsMatch[]; title?: string`                                                            | —      |
| `TechnologySection` | `organisms/news/TechnologySection.tsx` | `articles: TechArticle[]; title?: string`                                                           | —      |
| `TopStories`        | `organisms/news/TopStories.tsx`        | `stories: TopStory[]; title?: string`                                                               | —      |
| `WeatherForecast`   | `organisms/news/WeatherForecast.tsx`   | `days: ForecastDay[]; title?: string`                                                               | —      |
| `WorldNews`         | `organisms/news/WorldNews.tsx`         | `articles: WorldArticle[]; title?: string`                                                          | —      |

## social

Social, community & gaming.

| Component           | File                                     | Props                                                                                                               | Client |
| ------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------ |
| `Calendar`          | `organisms/social/Calendar.tsx`          | `value?: Date; onChange?: (date: Date) => void; minDate?: Date; maxDate?: Date; className?: string`                 | client |
| `ChatWindow`        | `organisms/social/ChatWindow.tsx`        | `messages: ChatMessage[]; onSend: (text: string) => void; title?: string; placeholder?: string; disabled?: boolean` | client |
| `ConnectionsPage`   | `organisms/social/ConnectionsPage.tsx`   | `connections: Connection[]; onConnect?: (id: string) => void`                                                       | —      |
| `EventTimeline`     | `organisms/social/EventTimeline.tsx`     | `items: EventTimelineItem[]; title?: string`                                                                        | —      |
| `EventsSection`     | `organisms/social/EventsSection.tsx`     | `events: EventItem[]; onAttend?: (id: string) => void`                                                              | —      |
| `ExploreGrid`       | `organisms/social/ExploreGrid.tsx`       | `items: ExploreItem[]; categories?: string[]; onSelect?: (id: string) => void`                                      | —      |
| `FeatureGrid`       | `organisms/social/FeatureGrid.tsx`       | `features: Feature[]; columns?: 1 \| 2 \| 3 \| 4`                                                                   | —      |
| `FeedView`          | `organisms/social/FeedView.tsx`          | `posts: Post[]; onLike?: (id: string) => void; onComment?: (id: string) => void`                                    | —      |
| `GroupsHub`         | `organisms/social/GroupsHub.tsx`         | `groups: Group[]; onJoin?: (id: string) => void`                                                                    | —      |
| `HashtagPage`       | `organisms/social/HashtagPage.tsx`       | `hashtag: string; stats: HashtagStats; posts: HashtagPost[]`                                                        | —      |
| `MessengerView`     | `organisms/social/MessengerView.tsx`     | `initialMessages?: ChatMessage[]; contactName?: string; placeholder?: string; onSend?: (text: string) => void`      | client |
| `NotificationsFeed` | `organisms/social/NotificationsFeed.tsx` | `notifications: Notification[]; onMarkRead?: (id: string) => void`                                                  | —      |
| `ProfileTimeline`   | `organisms/social/ProfileTimeline.tsx`   | `name: string; handle: string; bio?: string; stats: ProfileStats; activities: Activity[]`                           | —      |
| `ReelsGrid`         | `organisms/social/ReelsGrid.tsx`         | `reels: Reel[]; onPlay?: (id: string) => void`                                                                      | —      |
| `StoriesRow`        | `organisms/social/StoriesRow.tsx`        | `stories: Story[]; onOpen?: (id: string) => void; onCreate?: () => void`                                            | —      |
| `TrendingTopics`    | `organisms/social/TrendingTopics.tsx`    | `topics: Topic[]; onSelect?: (id: string) => void`                                                                  | —      |

## store

Storefront & e-commerce.

| Component          | File                                   | Props                                                                                                                               | Client |
| ------------------ | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `BrandSection`     | `organisms/store/BrandSection.tsx`     | `brands: Brand[]`                                                                                                                   | —      |
| `CategoryShowcase` | `organisms/store/CategoryShowcase.tsx` | `categories: Category[]; onSelect?: (id: string) => void`                                                                           | —      |
| `CheckoutFlow`     | `organisms/store/CheckoutFlow.tsx`     | `subtotal?: number; onComplete?: () => void`                                                                                        | client |
| `DealsSection`     | `organisms/store/DealsSection.tsx`     | `deals: Deal[]`                                                                                                                     | —      |
| `GiftCardCenter`   | `organisms/store/GiftCardCenter.tsx`   | `cards: GiftCard[]`                                                                                                                 | —      |
| `LoyaltyProgram`   | `organisms/store/LoyaltyProgram.tsx`   | `points: number; tier: string; pointsToNext?: number; rewards: Reward[]`                                                            | —      |
| `NewArrivals`      | `organisms/store/NewArrivals.tsx`      | `products: NewProduct[]`                                                                                                            | —      |
| `OrderTracking`    | `organisms/store/OrderTracking.tsx`    | `orderId: string; status: string; eta?: string; items: OrderItem[]; timeline: TimelineEntry[]`                                      | —      |
| `ProductList`      | `organisms/store/ProductList.tsx`      | `products: ListedProduct[]; onAddToCart?: (id: string) => void`                                                                     | —      |
| `ProductShowcase`  | `organisms/store/ProductShowcase.tsx`  | `product: Product; onAddToCart?: () => void`                                                                                        | —      |
| `ReturnCenter`     | `organisms/store/ReturnCenter.tsx`     | `orders: ReturnOrder[]; onStartReturn?: (id: string) => void`                                                                       | —      |
| `ShippingTracker`  | `organisms/store/ShippingTracker.tsx`  | `carrier: string; trackingNumber: string; status: string; estimatedDelivery?: string; updates: TrackingUpdate[]`                    | —      |
| `ShoppingCart`     | `organisms/store/ShoppingCart.tsx`     | `items: CartItem[]; onQuantityChange?: (id: string, qty: number) => void; onRemove?: (id: string) => void; onCheckout?: () => void` | client |
| `StoreReviews`     | `organisms/store/StoreReviews.tsx`     | `reviews: Review[]`                                                                                                                 | —      |
| `Storefront`       | `organisms/store/Storefront.tsx`       | `title: string; subtitle?: string; categories: Category[]; products: FeaturedProduct[]`                                             | —      |
| `WishlistView`     | `organisms/store/WishlistView.tsx`     | `items: WishlistItem[]; onRemove?: (id: string) => void; onAddToCart?: (id: string) => void`                                        | —      |

## support

Support, knowledge & system.

| Component         | File                                    | Props                                                                                                                                               | Client |
| ----------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `CommandMenu`     | `organisms/support/CommandMenu.tsx`     | `open: boolean; onClose: () => void; items: CommandItem[]; placeholder?: string`                                                                    | client |
| `DashboardHeader` | `organisms/support/DashboardHeader.tsx` | `title: string; subtitle?: string; actions?: ReactNode; searchValue?: string; onSearchChange?: (value: string) => void; searchPlaceholder?: string` | —      |
| `DataList`        | `organisms/support/DataList.tsx`        | `sections: DataListSection[]`                                                                                                                       | —      |
| `DataTable`       | `organisms/support/DataTable.tsx`       | `columns: DataColumn[]; rows: DataRow[]; emptyText?: string`                                                                                        | —      |
| `Diff`            | `organisms/support/Diff.tsx`            | `before: ReactNode; after: ReactNode; aspectClass?: string; className?: string`                                                                     | —      |
| `FilterBar`       | `organisms/support/FilterBar.tsx`       | `query: string; onQueryChange: (next: string) => void; placeholder?: string; children?: ReactNode`                                                  | client |
| `Header`          | `organisms/support/Header.tsx`          | `title: string; subtitle?: string; badges?: ReactNode; action?: ReactNode; backHref?: string`                                                       | —      |
| `PageBreadcrumbs` | `organisms/support/PageBreadcrumbs.tsx` | `items: PageBreadcrumbsCrumb[]; title: string; description?: string; actions?: ReactNode`                                                           | —      |
| `PageHeader`      | `organisms/support/PageHeader.tsx`      | `title: string; description?: string; eyebrow?: string; actions?: ReactNode; className?: string`                                                    | —      |
| `PageTabs`        | `organisms/support/PageTabs.tsx`        | `tabs: PageTab[]; defaultValue?: string; value?: string; onChange?: (value: string) => void`                                                        | client |
| `ProgressStepper` | `organisms/support/ProgressStepper.tsx` | `steps: string[]; activeStep: number; onStepClick?: (index: number) => void; orientation?: 'horizontal' \| 'vertical'; className?: string`          | —      |
| `Section`         | `organisms/support/Section.tsx`         | `eyebrow?: string; title: string; description?: string; action?: ReactNode; align?: 'start' \| 'center'; children?: ReactNode; className?: string`  | —      |
| `Sidebar`         | `organisms/support/Sidebar.tsx`         | `title: string; items: SidebarItem[]; footer?: ReactNode`                                                                                           | client |
| `StatsGrid`       | `organisms/support/StatsGrid.tsx`       | `stats: StatItem[]; columns?: 2 \| 3 \| 4`                                                                                                          | —      |
| `TableOfContents` | `organisms/support/TableOfContents.tsx` | `items: TOCItem[]; activeId?: string; onSelect?: (id: string) => void; title?: string`                                                              | client |
| `Toolbar`         | `organisms/support/Toolbar.tsx`         | `title?: string; subtitle?: string; actions?: ReactNode[]; children?: ReactNode`                                                                    | —      |

## travel

Travel, real estate & property.

| Component             | File                                       | Props                                                              | Client |
| --------------------- | ------------------------------------------ | ------------------------------------------------------------------ | ------ |
| `AdventureSection`    | `organisms/travel/AdventureSection.tsx`    | `activities: Activity[]`                                           | —      |
| `BookingFlow`         | `organisms/travel/BookingFlow.tsx`         | `onComplete?: () => void`                                          | client |
| `ChecklistSection`    | `organisms/travel/ChecklistSection.tsx`    | `items: ChecklistItem[]; title?: string`                           | client |
| `CurrencyConverter`   | `organisms/travel/CurrencyConverter.tsx`   | `initialAmount?: number`                                           | client |
| `DestinationShowcase` | `organisms/travel/DestinationShowcase.tsx` | `destinations: Destination[]`                                      | —      |
| `FlightResults`       | `organisms/travel/FlightResults.tsx`       | `flights: Flight[]; onSelect?: (index: number) => void`            | —      |
| `HotelSearch`         | `organisms/travel/HotelSearch.tsx`         | `hotels: Hotel[]; onSelect?: (id: string) => void`                 | —      |
| `ItineraryView`       | `organisms/travel/ItineraryView.tsx`       | `title: string; dates: string; days: ItineraryDay[]`               | —      |
| `LocalGuides`         | `organisms/travel/LocalGuides.tsx`         | `guides: Guide[]`                                                  | —      |
| `LoyaltyDashboard`    | `organisms/travel/LoyaltyDashboard.tsx`    | `tier: string; points: number; miles: number; benefits: Benefit[]` | —      |
| `MapExplorer`         | `organisms/travel/MapExplorer.tsx`         | `pins: Pin[]; onSelect?: (id: string) => void`                     | —      |
| `PhotoJournal`        | `organisms/travel/PhotoJournal.tsx`        | `entries: JournalEntry[]`                                          | —      |
| `ReviewHub`           | `organisms/travel/ReviewHub.tsx`           | `reviews: TravelReview[]`                                          | —      |
| `TravelAlerts`        | `organisms/travel/TravelAlerts.tsx`        | `alerts: Alert[]`                                                  | —      |
| `TravelPackages`      | `organisms/travel/TravelPackages.tsx`      | `packages: Package[]; onSelect?: (id: string) => void`             | —      |
| `TripPlanner`         | `organisms/travel/TripPlanner.tsx`         | `trip: TripDetails; activities: PlannedActivity[]`                 | —      |

---

[Back to index](README.md)
