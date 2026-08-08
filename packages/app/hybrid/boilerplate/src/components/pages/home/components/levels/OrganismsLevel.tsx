import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import { motion } from 'motion/react';
import {
  AnnouncementStrip,
  AppShell,
  BillingPanel,
  DashboardWidget,
  MetricBar,
  NotificationDrawer,
  OnboardingFlow,
  ProjectTimeline,
  QuickActions,
  RecentActivity,
  SearchOverlay,
  SettingsPanel,
  StatusOverview,
  TeamRoster,
  UserMenu,
  WorkspaceGrid,
  AccountMenu,
  AccountRecovery,
  AnnouncementBar,
  AuthForm,
  AuthLayout,
  CookieBanner,
  InviteTeam,
  MfaSetup,
  NotificationCenter,
  OtpVerify,
  PasswordResetForm,
  PermissionMatrix,
  SessionTimeout,
  SignInForm,
  SignUpForm,
  SocialAuthRow,
  ArticleList,
  AuthorProfile,
  BlogSection,
  CategorySection,
  CourseLanding,
  EditorialStrip,
  FAQSection,
  FaqAccordion,
  FeaturedStory,
  GalleryGrid,
  LessonNavigation,
  NewsletterBanner,
  PinnedPost,
  QuizSection,
  QuoteShowcase,
  RecipeCollection,
  ActivityFeed,
  CustomerJourney,
  DealRoom,
  InfoCards,
  IntegrationsSection,
  InvoiceSection,
  KanbanBoard,
  LeadCapture,
  Leaderboard,
  LogosSection,
  OrderHistory,
  PricingCard,
  ProductGrid,
  ProfileCard,
  SalesPipeline,
  SupportInbox,
  ApiPlayground,
  BranchManager,
  ChangelogFeed,
  CodeExplorer,
  ComparisonSection,
  DeployPipeline,
  DevServerStatus,
  DocumentationView,
  EnvironmentSelector,
  GitCommitFeed,
  LogViewer,
  Marquee,
  MetricsDashboard,
  PackageManager,
  TerminalPanel,
  TestRunner,
  AccountOverview,
  BudgetOverview,
  CryptoPortfolio,
  ExpenseCategories,
  FinancialHealth,
  InvestmentPortfolio,
  InvoiceDashboard,
  LoanApplication,
  MarketWatch,
  PaymentMethods,
  RetirementPlanner,
  SavingsGoals,
  SpendingTrends,
  SubscriptionManager,
  TaxSummary,
  TransactionHistory,
  ActivityCalendar,
  AppointmentBooking,
  CareTeam,
  EmergencyContacts,
  FitnessGoals,
  HealthDashboard,
  HealthHistory,
  HydrationTracker,
  MealPlanner,
  MedicationSchedule,
  NutritionalSummary,
  SleepInsights,
  SymptomTracker,
  VitalsOverview,
  WellnessScore,
  WorkoutPlan,
  AttendanceDashboard,
  BenefitsPortal,
  CandidatePipeline,
  CompensationReview,
  EmployeeDirectory,
  HiringFunnel,
  JobBoard,
  LeaveCalendar,
  OnboardingProgram,
  OrgStructure,
  PayrollOverview,
  PerformanceReview,
  PolicyLibrary,
  RecognitionFeed,
  TimesheetDashboard,
  TrainingCatalog,
  CTASection,
  ContactSection,
  Footer,
  Hero,
  Navbar,
  NavigationMenu,
  NewsletterSection,
  PricingSection,
  ProcessSection,
  QuoteSection,
  ShowcaseSection,
  TeamSection,
  TestimonialCarousel,
  TestimonialGrid,
  TestimonialSection,
  VideoSection,
  ArchivePanel,
  AttachmentViewer,
  ComposeWindow,
  ConversationList,
  DraftList,
  EmailReader,
  FolderManager,
  InboxView,
  MailFilters,
  MailSearchOverlay,
  MailSidebar,
  ReplyComposer,
  SendLater,
  SignatureSettings,
  SpamFolder,
  StarredView,
  AlbumPage,
  ArtistProfile,
  BrowseGrid,
  DiscoverPage,
  DownloadManager,
  LiveChannel,
  LyricsView,
  MovieDetail,
  MusicLibrary,
  PlayerSection,
  PlaylistView,
  PodcastHub,
  QueueManager,
  RecommendationRow,
  TvSeriesPage,
  VideoCatalog,
  BreakingTicker,
  BusinessNews,
  DataViz,
  EditorialOpinion,
  EntertainmentFeed,
  LiveBlog,
  LocalNews,
  NewsletterSignup,
  PhotoGallery,
  PodcastFeed,
  PoliticsSection,
  SportsSection,
  TechnologySection,
  TopStories,
  WeatherForecast,
  WorldNews,
  Calendar,
  ChatWindow,
  ConnectionsPage,
  EventTimeline,
  EventsSection,
  ExploreGrid,
  FeatureGrid,
  FeedView,
  GroupsHub,
  HashtagPage,
  MessengerView,
  NotificationsFeed,
  ProfileTimeline,
  ReelsGrid,
  StoriesRow,
  TrendingTopics,
  BrandSection,
  CategoryShowcase,
  CheckoutFlow,
  DealsSection,
  GiftCardCenter,
  LoyaltyProgram,
  NewArrivals,
  OrderTracking,
  ProductList,
  ProductShowcase,
  ReturnCenter,
  ShippingTracker,
  ShoppingCart,
  StoreReviews,
  Storefront,
  WishlistView,
  CommandMenu,
  DashboardHeader,
  DataList,
  DataTable,
  Diff,
  FilterBar,
  Header,
  PageBreadcrumbs,
  PageHeader,
  PageTabs,
  ProgressStepper,
  Section,
  Sidebar,
  StatsGrid,
  TableOfContents,
  Toolbar,
  AdventureSection,
  BookingFlow,
  ChecklistSection,
  CurrencyConverter,
  DestinationShowcase,
  FlightResults,
  HotelSearch,
  ItineraryView,
  LocalGuides,
  LoyaltyDashboard,
  MapExplorer,
  PhotoJournal,
  ReviewHub,
  TravelAlerts,
  TravelPackages,
  TripPlanner,
} from '../../../../organisms';

const OrganismSection: FC<{
  title: string;
  index: number;
  children: ReactNode;
}> = ({ title, index, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 14, scale: 0.97 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
      delay: index * 0.07,
    }}>
    <h3 className="text-base-content/50 mb-2 font-mono text-xs uppercase">
      {title}
    </h3>
    {children}
  </motion.div>
);

export const OrganismsLevel: FC = () => {
  const [search, setSearch] = useState('');

  const sections: {
    cat: string;
    tiles: { title: string; node: ReactNode }[];
  }[] = [
    {
      cat: 'app',
      tiles: [
        {
          title: 'AnnouncementStrip',
          node: (
            <OrganismSection title="AnnouncementStrip" index={0}>
              <AnnouncementStrip message={'Sample'} />
            </OrganismSection>
          ),
        },
        {
          title: 'AppShell',
          node: (
            <OrganismSection title="AppShell" index={1}>
              <AppShell title={'Sample title'} navItems={[{ label: 'Sample' }]}>
                Sample
              </AppShell>
            </OrganismSection>
          ),
        },
        {
          title: 'BillingPanel',
          node: (
            <OrganismSection title="BillingPanel" index={2}>
              <BillingPanel plan={'Sample'} price={'Sample'} />
            </OrganismSection>
          ),
        },
        {
          title: 'DashboardWidget',
          node: (
            <OrganismSection title="DashboardWidget" index={3}>
              <DashboardWidget title={'Sample title'}>Sample</DashboardWidget>
            </OrganismSection>
          ),
        },
        {
          title: 'MetricBar',
          node: (
            <OrganismSection title="MetricBar" index={4}>
              <MetricBar metrics={[{ label: 'Sample', value: 'Sample' }]} />
            </OrganismSection>
          ),
        },
        {
          title: 'NotificationDrawer',
          node: (
            <OrganismSection title="NotificationDrawer" index={5}>
              <NotificationDrawer
                open={false}
                onClose={() => undefined}
                notifications={[{ id: 'sample', title: 'Sample title' }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'OnboardingFlow',
          node: (
            <OrganismSection title="OnboardingFlow" index={6}>
              <OnboardingFlow
                steps={[
                  { id: 'sample', title: 'Sample title', content: 'Sample' },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'ProjectTimeline',
          node: (
            <OrganismSection title="ProjectTimeline" index={7}>
              <ProjectTimeline
                milestones={[
                  {
                    id: 'sample',
                    title: 'Sample title',
                    date: 'Aug 2026',
                    status: 'done',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'QuickActions',
          node: (
            <OrganismSection title="QuickActions" index={8}>
              <QuickActions actions={[{ id: 'sample', label: 'Sample' }]} />
            </OrganismSection>
          ),
        },
        {
          title: 'RecentActivity',
          node: (
            <OrganismSection title="RecentActivity" index={9}>
              <RecentActivity
                activities={[{ id: 'sample', title: 'Sample title' }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'SearchOverlay',
          node: (
            <OrganismSection title="SearchOverlay" index={10}>
              <SearchOverlay open={false} onClose={() => undefined} />
            </OrganismSection>
          ),
        },
        {
          title: 'SettingsPanel',
          node: (
            <OrganismSection title="SettingsPanel" index={11}>
              <SettingsPanel
                sections={[
                  { id: 'sample', title: 'Sample title', children: 'Sample' },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'StatusOverview',
          node: (
            <OrganismSection title="StatusOverview" index={12}>
              <StatusOverview stats={[{ label: 'Sample', value: 'Sample' }]} />
            </OrganismSection>
          ),
        },
        {
          title: 'TeamRoster',
          node: (
            <OrganismSection title="TeamRoster" index={13}>
              <TeamRoster
                members={[
                  {
                    id: 'sample',
                    name: 'Acme',
                    email: 'jane@example.com',
                    role: 'Admin',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'UserMenu',
          node: (
            <OrganismSection title="UserMenu" index={14}>
              <UserMenu username={'janedoe'} avatarInitials={'Sample'} />
            </OrganismSection>
          ),
        },
        {
          title: 'WorkspaceGrid',
          node: (
            <OrganismSection title="WorkspaceGrid" index={15}>
              <WorkspaceGrid
                workspaces={[{ id: 'sample', name: 'Acme', members: 0 }]}
              />
            </OrganismSection>
          ),
        },
      ],
    },
    {
      cat: 'auth',
      tiles: [
        {
          title: 'AccountMenu',
          node: (
            <OrganismSection title="AccountMenu" index={0}>
              <AccountMenu name={'Acme'} items={[{ label: 'Sample' }]} />
            </OrganismSection>
          ),
        },
        {
          title: 'AccountRecovery',
          node: (
            <OrganismSection title="AccountRecovery" index={1}>
              <AccountRecovery onSubmit={() => undefined} />
            </OrganismSection>
          ),
        },
        {
          title: 'AnnouncementBar',
          node: (
            <OrganismSection title="AnnouncementBar" index={2}>
              <AnnouncementBar text={'Sample text content.'} />
            </OrganismSection>
          ),
        },
        {
          title: 'AuthForm',
          node: (
            <OrganismSection title="AuthForm" index={3}>
              <AuthForm onSubmit={() => undefined} />
            </OrganismSection>
          ),
        },
        {
          title: 'AuthLayout',
          node: (
            <OrganismSection title="AuthLayout" index={4}>
              <AuthLayout title={'Sample title'}>Sample</AuthLayout>
            </OrganismSection>
          ),
        },
        {
          title: 'CookieBanner',
          node: (
            <OrganismSection title="CookieBanner" index={5}>
              <CookieBanner
                onAccept={() => undefined}
                onDecline={() => undefined}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'InviteTeam',
          node: (
            <OrganismSection title="InviteTeam" index={6}>
              <InviteTeam onInvite={() => undefined} />
            </OrganismSection>
          ),
        },
        {
          title: 'MfaSetup',
          node: (
            <OrganismSection title="MfaSetup" index={7}>
              <MfaSetup />
            </OrganismSection>
          ),
        },
        {
          title: 'NotificationCenter',
          node: (
            <OrganismSection title="NotificationCenter" index={8}>
              <NotificationCenter
                notifications={[{ id: 'sample', title: 'Sample title' }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'OtpVerify',
          node: (
            <OrganismSection title="OtpVerify" index={9}>
              <OtpVerify onSubmit={() => undefined} />
            </OrganismSection>
          ),
        },
        {
          title: 'PasswordResetForm',
          node: (
            <OrganismSection title="PasswordResetForm" index={10}>
              <PasswordResetForm onSubmit={() => undefined} />
            </OrganismSection>
          ),
        },
        {
          title: 'PermissionMatrix',
          node: (
            <OrganismSection title="PermissionMatrix" index={11}>
              <PermissionMatrix
                roles={['Sample']}
                permissions={['Sample']}
                value={{ sample: ['Sample'] }}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'SessionTimeout',
          node: (
            <OrganismSection title="SessionTimeout" index={12}>
              <SessionTimeout
                onSignOut={() => undefined}
                onExtend={() => undefined}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'SignInForm',
          node: (
            <OrganismSection title="SignInForm" index={13}>
              <SignInForm onSubmit={() => undefined} />
            </OrganismSection>
          ),
        },
        {
          title: 'SignUpForm',
          node: (
            <OrganismSection title="SignUpForm" index={14}>
              <SignUpForm onSubmit={() => undefined} />
            </OrganismSection>
          ),
        },
        {
          title: 'SocialAuthRow',
          node: (
            <OrganismSection title="SocialAuthRow" index={15}>
              <SocialAuthRow providers={[{ id: 'sample', label: 'Sample' }]} />
            </OrganismSection>
          ),
        },
      ],
    },
    {
      cat: 'blog',
      tiles: [
        {
          title: 'ArticleList',
          node: (
            <OrganismSection title="ArticleList" index={0}>
              <ArticleList
                articles={[{ id: 'sample', title: 'Sample title' }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'AuthorProfile',
          node: (
            <OrganismSection title="AuthorProfile" index={1}>
              <AuthorProfile name={'Acme'} role={'Admin'} />
            </OrganismSection>
          ),
        },
        {
          title: 'BlogSection',
          node: (
            <OrganismSection title="BlogSection" index={2}>
              <BlogSection posts={[{ id: 'sample', title: 'Sample title' }]} />
            </OrganismSection>
          ),
        },
        {
          title: 'CategorySection',
          node: (
            <OrganismSection title="CategorySection" index={3}>
              <CategorySection
                categories={[{ id: 'sample', name: 'Acme', count: 3 }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'CourseLanding',
          node: (
            <OrganismSection title="CourseLanding" index={4}>
              <CourseLanding
                title={'Sample title'}
                curriculum={[{ id: 'sample', title: 'Sample title' }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'EditorialStrip',
          node: (
            <OrganismSection title="EditorialStrip" index={5}>
              <EditorialStrip
                items={[{ id: 'sample', title: 'Sample title' }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'FAQSection',
          node: (
            <OrganismSection title="FAQSection" index={6}>
              <FAQSection
                items={[
                  {
                    question: 'A common question?',
                    answer: 'An answer to the question.',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'FaqAccordion',
          node: (
            <OrganismSection title="FaqAccordion" index={7}>
              <FaqAccordion
                items={[
                  {
                    id: 'sample',
                    question: 'A common question?',
                    answer: 'An answer to the question.',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'FeaturedStory',
          node: (
            <OrganismSection title="FeaturedStory" index={8}>
              <FeaturedStory title={'Sample title'} />
            </OrganismSection>
          ),
        },
        {
          title: 'GalleryGrid',
          node: (
            <OrganismSection title="GalleryGrid" index={9}>
              <GalleryGrid items={[{ src: '/img.png', alt: 'Sample image' }]} />
            </OrganismSection>
          ),
        },
        {
          title: 'LessonNavigation',
          node: (
            <OrganismSection title="LessonNavigation" index={10}>
              <LessonNavigation
                lessons={[{ id: 'sample', title: 'Sample title' }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'NewsletterBanner',
          node: (
            <OrganismSection title="NewsletterBanner" index={11}>
              <NewsletterBanner />
            </OrganismSection>
          ),
        },
        {
          title: 'PinnedPost',
          node: (
            <OrganismSection title="PinnedPost" index={12}>
              <PinnedPost title={'Sample title'} />
            </OrganismSection>
          ),
        },
        {
          title: 'QuizSection',
          node: (
            <OrganismSection title="QuizSection" index={13}>
              <QuizSection
                questions={[
                  {
                    question: 'A common question?',
                    options: ['Sample'],
                    answer: 0,
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'QuoteShowcase',
          node: (
            <OrganismSection title="QuoteShowcase" index={14}>
              <QuoteShowcase
                quotes={[{ id: 'sample', text: 'Sample text content.' }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'RecipeCollection',
          node: (
            <OrganismSection title="RecipeCollection" index={15}>
              <RecipeCollection recipes={[{ id: 'sample', name: 'Acme' }]} />
            </OrganismSection>
          ),
        },
      ],
    },
    {
      cat: 'crm',
      tiles: [
        {
          title: 'ActivityFeed',
          node: (
            <OrganismSection title="ActivityFeed" index={0}>
              <ActivityFeed items={[{ id: 'sample', title: 'Sample title' }]} />
            </OrganismSection>
          ),
        },
        {
          title: 'CustomerJourney',
          node: (
            <OrganismSection title="CustomerJourney" index={1}>
              <CustomerJourney
                steps={[{ id: 'sample', title: 'Sample title' }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'DealRoom',
          node: (
            <OrganismSection title="DealRoom" index={2}>
              <DealRoom dealName={'Sample'} />
            </OrganismSection>
          ),
        },
        {
          title: 'InfoCards',
          node: (
            <OrganismSection title="InfoCards" index={3}>
              <InfoCards cards={[{ id: 'sample', title: 'Sample title' }]} />
            </OrganismSection>
          ),
        },
        {
          title: 'IntegrationsSection',
          node: (
            <OrganismSection title="IntegrationsSection" index={4}>
              <IntegrationsSection items={[{ name: 'Acme' }]} />
            </OrganismSection>
          ),
        },
        {
          title: 'InvoiceSection',
          node: (
            <OrganismSection title="InvoiceSection" index={5}>
              <InvoiceSection
                invoices={[{ id: 'sample', number: 'Sample', amount: 120 }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'KanbanBoard',
          node: (
            <OrganismSection title="KanbanBoard" index={6}>
              <KanbanBoard
                columns={[
                  {
                    id: 'sample',
                    title: 'Sample title',
                    cards: [{ id: 'sample', title: 'Sample title' }],
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'LeadCapture',
          node: (
            <OrganismSection title="LeadCapture" index={7}>
              <LeadCapture />
            </OrganismSection>
          ),
        },
        {
          title: 'Leaderboard',
          node: (
            <OrganismSection title="Leaderboard" index={8}>
              <Leaderboard
                entries={[{ id: 'sample', name: 'Acme', score: 920 }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'LogosSection',
          node: (
            <OrganismSection title="LogosSection" index={9}>
              <LogosSection items={[{ name: 'Acme' }]} />
            </OrganismSection>
          ),
        },
        {
          title: 'OrderHistory',
          node: (
            <OrganismSection title="OrderHistory" index={10}>
              <OrderHistory orders={[{ id: 'sample', total: 0 }]} />
            </OrganismSection>
          ),
        },
        {
          title: 'PricingCard',
          node: (
            <OrganismSection title="PricingCard" index={11}>
              <PricingCard
                name={'Starter'}
                price={'Sample'}
                features={['Sample']}
                ctaLabel={'Get started'}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'ProductGrid',
          node: (
            <OrganismSection title="ProductGrid" index={12}>
              <ProductGrid
                items={[{ id: 'sample', name: 'Acme', price: 'Sample' }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'ProfileCard',
          node: (
            <OrganismSection title="ProfileCard" index={13}>
              <ProfileCard name={'Acme'} />
            </OrganismSection>
          ),
        },
        {
          title: 'SalesPipeline',
          node: (
            <OrganismSection title="SalesPipeline" index={14}>
              <SalesPipeline
                stages={[
                  {
                    id: 'sample',
                    name: 'Acme',
                    deals: [{ id: 'sample', name: 'Acme', value: 1280 }],
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'SupportInbox',
          node: (
            <OrganismSection title="SupportInbox" index={15}>
              <SupportInbox tickets={[{ id: 'sample', subject: 'Sample' }]} />
            </OrganismSection>
          ),
        },
      ],
    },
    {
      cat: 'developer',
      tiles: [
        {
          title: 'ApiPlayground',
          node: (
            <OrganismSection title="ApiPlayground" index={0}>
              <ApiPlayground />
            </OrganismSection>
          ),
        },
        {
          title: 'BranchManager',
          node: (
            <OrganismSection title="BranchManager" index={1}>
              <BranchManager branches={[{ id: 'sample', name: 'Acme' }]} />
            </OrganismSection>
          ),
        },
        {
          title: 'ChangelogFeed',
          node: (
            <OrganismSection title="ChangelogFeed" index={2}>
              <ChangelogFeed
                entries={[
                  { id: 'sample', version: 'Sample', changes: ['Sample'] },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'CodeExplorer',
          node: (
            <OrganismSection title="CodeExplorer" index={3}>
              <CodeExplorer
                files={[{ path: 'Sample', content: 'Sample content.' }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'ComparisonSection',
          node: (
            <OrganismSection title="ComparisonSection" index={4}>
              <ComparisonSection
                columns={[{ title: 'Sample title' }]}
                rows={[{ label: 'Sample', values: ['Sample'] }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'DeployPipeline',
          node: (
            <OrganismSection title="DeployPipeline" index={5}>
              <DeployPipeline
                steps={[{ id: 'sample', name: 'Acme', status: 'pending' }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'DevServerStatus',
          node: (
            <OrganismSection title="DevServerStatus" index={6}>
              <DevServerStatus
                services={[{ id: 'sample', name: 'Acme', status: 'online' }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'DocumentationView',
          node: (
            <OrganismSection title="DocumentationView" index={7}>
              <DocumentationView
                sections={[
                  {
                    id: 'sample',
                    title: 'Sample title',
                    content: 'Sample content.',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'EnvironmentSelector',
          node: (
            <OrganismSection title="EnvironmentSelector" index={8}>
              <EnvironmentSelector
                environments={[{ id: 'sample', name: 'Acme' }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'GitCommitFeed',
          node: (
            <OrganismSection title="GitCommitFeed" index={9}>
              <GitCommitFeed commits={[{ id: 'sample', message: 'Sample' }]} />
            </OrganismSection>
          ),
        },
        {
          title: 'LogViewer',
          node: (
            <OrganismSection title="LogViewer" index={10}>
              <LogViewer entries={[{ id: 'sample', message: 'Sample' }]} />
            </OrganismSection>
          ),
        },
        {
          title: 'Marquee',
          node: (
            <OrganismSection title="Marquee" index={11}>
              <Marquee items={['Sample']} />
            </OrganismSection>
          ),
        },
        {
          title: 'MetricsDashboard',
          node: (
            <OrganismSection title="MetricsDashboard" index={12}>
              <MetricsDashboard
                metrics={[{ id: 'sample', label: 'Sample', value: 'Sample' }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'PackageManager',
          node: (
            <OrganismSection title="PackageManager" index={13}>
              <PackageManager packages={[{ id: 'sample', name: 'Acme' }]} />
            </OrganismSection>
          ),
        },
        {
          title: 'TerminalPanel',
          node: (
            <OrganismSection title="TerminalPanel" index={14}>
              <TerminalPanel />
            </OrganismSection>
          ),
        },
        {
          title: 'TestRunner',
          node: (
            <OrganismSection title="TestRunner" index={15}>
              <TestRunner
                results={[{ id: 'sample', name: 'Acme', status: 'passed' }]}
              />
            </OrganismSection>
          ),
        },
      ],
    },
    {
      cat: 'finance',
      tiles: [
        {
          title: 'AccountOverview',
          node: (
            <OrganismSection title="AccountOverview" index={0}>
              <AccountOverview balance={0} income={0} expenses={0} />
            </OrganismSection>
          ),
        },
        {
          title: 'BudgetOverview',
          node: (
            <OrganismSection title="BudgetOverview" index={1}>
              <BudgetOverview
                budgets={[{ category: 'Sample', spent: 0, limit: 0 }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'CryptoPortfolio',
          node: (
            <OrganismSection title="CryptoPortfolio" index={2}>
              <CryptoPortfolio
                assets={[
                  {
                    symbol: '$',
                    name: 'Acme',
                    amount: 120,
                    value: 1280,
                    change: 0,
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'ExpenseCategories',
          node: (
            <OrganismSection title="ExpenseCategories" index={3}>
              <ExpenseCategories
                categories={[{ name: 'Acme', amount: 120, percentage: 0 }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'FinancialHealth',
          node: (
            <OrganismSection title="FinancialHealth" index={4}>
              <FinancialHealth
                score={920}
                metrics={[{ label: 'Sample', value: 'Sample' }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'InvestmentPortfolio',
          node: (
            <OrganismSection title="InvestmentPortfolio" index={5}>
              <InvestmentPortfolio
                holdings={[
                  { symbol: '$', name: 'Acme', value: 1280, change: 0 },
                ]}
                totalValue={0}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'InvoiceDashboard',
          node: (
            <OrganismSection title="InvoiceDashboard" index={6}>
              <InvoiceDashboard
                invoices={[
                  {
                    id: 'sample',
                    client: 'Sample',
                    amount: 120,
                    dueDate: 'Sample',
                    status: 'paid',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'LoanApplication',
          node: (
            <OrganismSection title="LoanApplication" index={7}>
              <LoanApplication onSubmit={() => undefined} />
            </OrganismSection>
          ),
        },
        {
          title: 'MarketWatch',
          node: (
            <OrganismSection title="MarketWatch" index={8}>
              <MarketWatch
                quotes={[{ symbol: '$', name: 'Acme', price: 49, change: 0 }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'PaymentMethods',
          node: (
            <OrganismSection title="PaymentMethods" index={9}>
              <PaymentMethods
                methods={[
                  {
                    id: 'sample',
                    brand: 'Acme',
                    last4: 'Sample',
                    expiry: 'Sample',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'RetirementPlanner',
          node: (
            <OrganismSection title="RetirementPlanner" index={10}>
              <RetirementPlanner
                currentAge={0}
                retirementAge={0}
                currentSavings={0}
                monthlyContribution={0}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'SavingsGoals',
          node: (
            <OrganismSection title="SavingsGoals" index={11}>
              <SavingsGoals goals={[{ name: 'Acme', current: 0, target: 0 }]} />
            </OrganismSection>
          ),
        },
        {
          title: 'SpendingTrends',
          node: (
            <OrganismSection title="SpendingTrends" index={12}>
              <SpendingTrends data={[{ month: 'Sample', amount: 120 }]} />
            </OrganismSection>
          ),
        },
        {
          title: 'SubscriptionManager',
          node: (
            <OrganismSection title="SubscriptionManager" index={13}>
              <SubscriptionManager
                subscriptions={[
                  {
                    id: 'sample',
                    name: 'Acme',
                    amount: 120,
                    billing: 'Sample',
                    status: 'active',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'TaxSummary',
          node: (
            <OrganismSection title="TaxSummary" index={14}>
              <TaxSummary
                grossIncome={0}
                deductions={0}
                credits={0}
                taxPaid={0}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'TransactionHistory',
          node: (
            <OrganismSection title="TransactionHistory" index={15}>
              <TransactionHistory
                transactions={[
                  {
                    id: 'sample',
                    date: 'Aug 2026',
                    description: 'A short description of the item.',
                    category: 'Sample',
                    amount: 120,
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
      ],
    },
    {
      cat: 'health',
      tiles: [
        {
          title: 'ActivityCalendar',
          node: (
            <OrganismSection title="ActivityCalendar" index={0}>
              <ActivityCalendar days={[{ day: 'Sample', level: 0 }]} />
            </OrganismSection>
          ),
        },
        {
          title: 'AppointmentBooking',
          node: (
            <OrganismSection title="AppointmentBooking" index={1}>
              <AppointmentBooking
                doctors={['Sample']}
                onSubmit={() => undefined}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'CareTeam',
          node: (
            <OrganismSection title="CareTeam" index={2}>
              <CareTeam
                members={[{ id: 'sample', name: 'Acme', role: 'Admin' }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'EmergencyContacts',
          node: (
            <OrganismSection title="EmergencyContacts" index={3}>
              <EmergencyContacts
                contacts={[
                  {
                    id: 'sample',
                    name: 'Acme',
                    relation: 'Sample',
                    phone: '+1 555 0001',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'FitnessGoals',
          node: (
            <OrganismSection title="FitnessGoals" index={4}>
              <FitnessGoals
                goals={[
                  {
                    id: 'sample',
                    name: 'Acme',
                    current: 0,
                    target: 0,
                    unit: 'km',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'HealthDashboard',
          node: (
            <OrganismSection title="HealthDashboard" index={5}>
              <HealthDashboard
                vitals={[{ label: 'Sample', value: 1280, unit: 'km' }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'HealthHistory',
          node: (
            <OrganismSection title="HealthHistory" index={6}>
              <HealthHistory
                records={[
                  {
                    id: 'sample',
                    date: 'Aug 2026',
                    type: 'default',
                    provider: 'Sample',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'HydrationTracker',
          node: (
            <OrganismSection title="HydrationTracker" index={7}>
              <HydrationTracker />
            </OrganismSection>
          ),
        },
        {
          title: 'MealPlanner',
          node: (
            <OrganismSection title="MealPlanner" index={8}>
              <MealPlanner
                meals={[
                  {
                    day: 'Sample',
                    items: [{ name: 'Acme', calories: 0, type: 'breakfast' }],
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'MedicationSchedule',
          node: (
            <OrganismSection title="MedicationSchedule" index={9}>
              <MedicationSchedule
                medications={[
                  {
                    id: 'sample',
                    name: 'Acme',
                    dosage: 'Sample',
                    time: '09:00',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'NutritionalSummary',
          node: (
            <OrganismSection title="NutritionalSummary" index={10}>
              <NutritionalSummary
                nutrition={{ calories: 0, protein: 0, carbs: 0, fat: 0 }}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'SleepInsights',
          node: (
            <OrganismSection title="SleepInsights" index={11}>
              <SleepInsights
                nights={[{ day: 'Sample', hours: 0, quality: 0 }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'SymptomTracker',
          node: (
            <OrganismSection title="SymptomTracker" index={12}>
              <SymptomTracker
                symptoms={[
                  { id: 'sample', name: 'Acme', severity: 0, date: 'Aug 2026' },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'VitalsOverview',
          node: (
            <OrganismSection title="VitalsOverview" index={13}>
              <VitalsOverview
                vitals={[{ label: 'Sample', value: 1280, unit: 'km' }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'WellnessScore',
          node: (
            <OrganismSection title="WellnessScore" index={14}>
              <WellnessScore
                score={920}
                factors={[{ label: 'Sample', value: 1280 }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'WorkoutPlan',
          node: (
            <OrganismSection title="WorkoutPlan" index={15}>
              <WorkoutPlan
                workouts={[
                  {
                    day: 'Sample',
                    focus: 'Sample',
                    duration: 12,
                    exercises: [{ name: 'Acme', sets: 0, reps: 0 }],
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
      ],
    },
    {
      cat: 'hr',
      tiles: [
        {
          title: 'AttendanceDashboard',
          node: (
            <OrganismSection title="AttendanceDashboard" index={0}>
              <AttendanceDashboard
                records={[
                  {
                    id: 'sample',
                    name: 'Acme',
                    date: 'Aug 2026',
                    checkIn: 'Sample',
                    checkOut: 'Sample',
                    hours: 0,
                    status: 'present',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'BenefitsPortal',
          node: (
            <OrganismSection title="BenefitsPortal" index={1}>
              <BenefitsPortal
                benefits={[
                  {
                    id: 'sample',
                    title: 'Sample title',
                    description: 'A short description of the item.',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'CandidatePipeline',
          node: (
            <OrganismSection title="CandidatePipeline" index={2}>
              <CandidatePipeline
                stages={[
                  {
                    id: 'sample',
                    title: 'Sample title',
                    candidates: [
                      { id: 'sample', name: 'Acme', role: 'Admin', score: 920 },
                    ],
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'CompensationReview',
          node: (
            <OrganismSection title="CompensationReview" index={3}>
              <CompensationReview
                records={[
                  {
                    id: 'sample',
                    name: 'Acme',
                    role: 'Admin',
                    base: 0,
                    bonus: 0,
                    change: 0,
                    status: 'approved',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'EmployeeDirectory',
          node: (
            <OrganismSection title="EmployeeDirectory" index={4}>
              <EmployeeDirectory
                employees={[
                  {
                    id: 'sample',
                    name: 'Acme',
                    role: 'Admin',
                    department: 'Sample',
                    email: 'jane@example.com',
                    status: 'active',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'HiringFunnel',
          node: (
            <OrganismSection title="HiringFunnel" index={5}>
              <HiringFunnel
                stages={[{ id: 'sample', name: 'Acme', count: 3 }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'JobBoard',
          node: (
            <OrganismSection title="JobBoard" index={6}>
              <JobBoard
                jobs={[
                  {
                    id: 'sample',
                    title: 'Sample title',
                    department: 'Sample',
                    location: 'Sample',
                    type: 'full-time',
                    posted: 'Sample',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'LeaveCalendar',
          node: (
            <OrganismSection title="LeaveCalendar" index={7}>
              <LeaveCalendar
                leaves={[{ date: 'Aug 2026', name: 'Acme', type: 'annual' }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'OnboardingProgram',
          node: (
            <OrganismSection title="OnboardingProgram" index={8}>
              <OnboardingProgram
                steps={[
                  {
                    id: 'sample',
                    title: 'Sample title',
                    description: 'A short description of the item.',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'OrgStructure',
          node: (
            <OrganismSection title="OrgStructure" index={9}>
              <OrgStructure
                nodes={[{ id: 'sample', name: 'Acme', title: 'Sample title' }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'PayrollOverview',
          node: (
            <OrganismSection title="PayrollOverview" index={10}>
              <PayrollOverview
                payroll={[
                  {
                    id: 'sample',
                    name: 'Acme',
                    period: '/mo',
                    gross: 0,
                    deductions: 0,
                    net: 0,
                    status: 'paid',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'PerformanceReview',
          node: (
            <OrganismSection title="PerformanceReview" index={11}>
              <PerformanceReview
                reviews={[
                  {
                    id: 'sample',
                    employee: 'Sample',
                    reviewer: 'Sample',
                    period: '/mo',
                    score: 920,
                    status: 'completed',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'PolicyLibrary',
          node: (
            <OrganismSection title="PolicyLibrary" index={12}>
              <PolicyLibrary
                policies={[
                  {
                    id: 'sample',
                    title: 'Sample title',
                    category: 'Sample',
                    version: 'Sample',
                    updated: 'Sample',
                    status: 'active',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'RecognitionFeed',
          node: (
            <OrganismSection title="RecognitionFeed" index={13}>
              <RecognitionFeed
                items={[
                  {
                    id: 'sample',
                    from: 'Sample',
                    to: 'Sample',
                    message: 'Sample',
                    time: '09:00',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'TimesheetDashboard',
          node: (
            <OrganismSection title="TimesheetDashboard" index={14}>
              <TimesheetDashboard
                entries={[
                  {
                    id: 'sample',
                    week: 'Sample',
                    project: 'Sample',
                    hours: 0,
                    billable: true,
                    status: 'approved',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'TrainingCatalog',
          node: (
            <OrganismSection title="TrainingCatalog" index={15}>
              <TrainingCatalog
                courses={[
                  {
                    id: 'sample',
                    title: 'Sample title',
                    category: 'Sample',
                    level: 'beginner',
                    duration: 'Sample',
                    enrolled: 0,
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
      ],
    },
    {
      cat: 'landing',
      tiles: [
        {
          title: 'CTASection',
          node: (
            <OrganismSection title="CTASection" index={0}>
              <CTASection title={'Sample title'} />
            </OrganismSection>
          ),
        },
        {
          title: 'ContactSection',
          node: (
            <OrganismSection title="ContactSection" index={1}>
              <ContactSection />
            </OrganismSection>
          ),
        },
        {
          title: 'Footer',
          node: (
            <OrganismSection title="Footer" index={2}>
              <Footer
                brand={'Acme'}
                columns={[
                  {
                    title: 'Sample title',
                    links: [{ label: 'Sample', href: '/about' }],
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'Hero',
          node: (
            <OrganismSection title="Hero" index={3}>
              <Hero title={'Sample title'} />
            </OrganismSection>
          ),
        },
        {
          title: 'Navbar',
          node: (
            <OrganismSection title="Navbar" index={4}>
              <Navbar items={[{ label: 'Sample', href: '/about' }]} />
            </OrganismSection>
          ),
        },
        {
          title: 'NavigationMenu',
          node: (
            <OrganismSection title="NavigationMenu" index={5}>
              <NavigationMenu items={[{ label: 'Sample' }]} />
            </OrganismSection>
          ),
        },
        {
          title: 'NewsletterSection',
          node: (
            <OrganismSection title="NewsletterSection" index={6}>
              <NewsletterSection />
            </OrganismSection>
          ),
        },
        {
          title: 'PricingSection',
          node: (
            <OrganismSection title="PricingSection" index={7}>
              <PricingSection
                plans={[
                  {
                    name: 'Acme',
                    price: 'Sample',
                    features: ['Sample'],
                    ctaLabel: 'Get started',
                    ctaHref: 'Sample',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'ProcessSection',
          node: (
            <OrganismSection title="ProcessSection" index={8}>
              <ProcessSection
                steps={[{ id: 'sample', title: 'Sample title' }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'QuoteSection',
          node: (
            <OrganismSection title="QuoteSection" index={9}>
              <QuoteSection quote={'A memorable quote.'} author={'Sample'} />
            </OrganismSection>
          ),
        },
        {
          title: 'ShowcaseSection',
          node: (
            <OrganismSection title="ShowcaseSection" index={10}>
              <ShowcaseSection
                items={[{ id: 'sample', title: 'Sample title' }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'TeamSection',
          node: (
            <OrganismSection title="TeamSection" index={11}>
              <TeamSection members={[{ name: 'Acme' }]} />
            </OrganismSection>
          ),
        },
        {
          title: 'TestimonialCarousel',
          node: (
            <OrganismSection title="TestimonialCarousel" index={12}>
              <TestimonialCarousel
                items={[{ quote: 'A memorable quote.', author: 'Sample' }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'TestimonialGrid',
          node: (
            <OrganismSection title="TestimonialGrid" index={13}>
              <TestimonialGrid
                testimonials={[
                  {
                    id: 'sample',
                    quote: 'A memorable quote.',
                    author: 'Sample',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'TestimonialSection',
          node: (
            <OrganismSection title="TestimonialSection" index={14}>
              <TestimonialSection
                items={[{ quote: 'A memorable quote.', author: 'Sample' }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'VideoSection',
          node: (
            <OrganismSection title="VideoSection" index={15}>
              <VideoSection />
            </OrganismSection>
          ),
        },
      ],
    },
    {
      cat: 'mail',
      tiles: [
        {
          title: 'ArchivePanel',
          node: (
            <OrganismSection title="ArchivePanel" index={0}>
              <ArchivePanel
                emails={[
                  {
                    id: 'sample',
                    from: 'Sample',
                    subject: 'Sample',
                    archivedAt: 'Sample',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'AttachmentViewer',
          node: (
            <OrganismSection title="AttachmentViewer" index={1}>
              <AttachmentViewer
                attachments={[
                  {
                    id: 'sample',
                    name: 'Acme',
                    size: 'Sample',
                    type: 'default',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'ComposeWindow',
          node: (
            <OrganismSection title="ComposeWindow" index={2}>
              <ComposeWindow />
            </OrganismSection>
          ),
        },
        {
          title: 'ConversationList',
          node: (
            <OrganismSection title="ConversationList" index={3}>
              <ConversationList
                conversations={[
                  {
                    id: 'sample',
                    participants: 'Sample',
                    subject: 'Sample',
                    preview: 'Sample',
                    lastTime: 'Sample',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'DraftList',
          node: (
            <OrganismSection title="DraftList" index={4}>
              <DraftList
                drafts={[
                  {
                    id: 'sample',
                    to: 'Sample',
                    subject: 'Sample',
                    preview: 'Sample',
                    updated: 'Sample',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'EmailReader',
          node: (
            <OrganismSection title="EmailReader" index={5}>
              <EmailReader
                email={{
                  id: 'sample',
                  from: 'Sample',
                  subject: 'Sample',
                  body: 'Sample',
                  time: '09:00',
                }}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'FolderManager',
          node: (
            <OrganismSection title="FolderManager" index={6}>
              <FolderManager
                folders={[{ id: 'sample', name: 'Acme', count: 3 }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'InboxView',
          node: (
            <OrganismSection title="InboxView" index={7}>
              <InboxView
                emails={[
                  {
                    id: 'sample',
                    from: 'Sample',
                    subject: 'Sample',
                    preview: 'Sample',
                    time: '09:00',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'MailFilters',
          node: (
            <OrganismSection title="MailFilters" index={8}>
              <MailFilters />
            </OrganismSection>
          ),
        },
        {
          title: 'MailSearchOverlay',
          node: (
            <OrganismSection title="MailSearchOverlay" index={9}>
              <MailSearchOverlay />
            </OrganismSection>
          ),
        },
        {
          title: 'MailSidebar',
          node: (
            <OrganismSection title="MailSidebar" index={10}>
              <MailSidebar
                folders={[{ id: 'sample', name: 'Acme', count: 3 }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'ReplyComposer',
          node: (
            <OrganismSection title="ReplyComposer" index={11}>
              <ReplyComposer />
            </OrganismSection>
          ),
        },
        {
          title: 'SendLater',
          node: (
            <OrganismSection title="SendLater" index={12}>
              <SendLater
                scheduled={[
                  {
                    id: 'sample',
                    to: 'Sample',
                    subject: 'Sample',
                    scheduledAt: 'Sample',
                    status: 'scheduled',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'SignatureSettings',
          node: (
            <OrganismSection title="SignatureSettings" index={13}>
              <SignatureSettings />
            </OrganismSection>
          ),
        },
        {
          title: 'SpamFolder',
          node: (
            <OrganismSection title="SpamFolder" index={14}>
              <SpamFolder
                emails={[
                  {
                    id: 'sample',
                    from: 'Sample',
                    subject: 'Sample',
                    reason: 'Sample',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'StarredView',
          node: (
            <OrganismSection title="StarredView" index={15}>
              <StarredView
                emails={[
                  {
                    id: 'sample',
                    from: 'Sample',
                    subject: 'Sample',
                    time: '09:00',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
      ],
    },
    {
      cat: 'media',
      tiles: [
        {
          title: 'AlbumPage',
          node: (
            <OrganismSection title="AlbumPage" index={0}>
              <AlbumPage
                album={{
                  title: 'Sample title',
                  artist: 'Sample',
                  tracks: [
                    { id: 'sample', title: 'Sample title', duration: 12 },
                  ],
                }}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'ArtistProfile',
          node: (
            <OrganismSection title="ArtistProfile" index={1}>
              <ArtistProfile
                name={'Acme'}
                genres={['Sample']}
                topTracks={[{ id: 'sample', title: 'Sample title', plays: 0 }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'BrowseGrid',
          node: (
            <OrganismSection title="BrowseGrid" index={2}>
              <BrowseGrid
                items={[
                  {
                    id: 'sample',
                    title: 'Sample title',
                    subtitle: 'A supporting subtitle.',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'DiscoverPage',
          node: (
            <OrganismSection title="DiscoverPage" index={3}>
              <DiscoverPage
                items={[
                  {
                    id: 'sample',
                    title: 'Sample title',
                    subtitle: 'A supporting subtitle.',
                    type: 'default',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'DownloadManager',
          node: (
            <OrganismSection title="DownloadManager" index={4}>
              <DownloadManager
                downloads={[
                  {
                    id: 'sample',
                    title: 'Sample title',
                    size: 'Sample',
                    progress: 65,
                    status: 'downloading',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'LiveChannel',
          node: (
            <OrganismSection title="LiveChannel" index={5}>
              <LiveChannel
                channel={{
                  name: 'Acme',
                  category: 'Sample',
                  viewers: 0,
                  quality: 'Sample',
                }}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'LyricsView',
          node: (
            <OrganismSection title="LyricsView" index={6}>
              <LyricsView
                lines={[
                  { id: 'sample', time: 0, text: 'Sample text content.' },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'MovieDetail',
          node: (
            <OrganismSection title="MovieDetail" index={7}>
              <MovieDetail
                movie={{
                  title: 'Sample title',
                  year: 0,
                  rating: 4.8,
                  genres: ['Sample'],
                  duration: 12,
                  synopsis: 'Sample',
                  cast: [{ name: 'Acme', role: 'Admin' }],
                }}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'MusicLibrary',
          node: (
            <OrganismSection title="MusicLibrary" index={8}>
              <MusicLibrary
                songs={[
                  {
                    id: 'sample',
                    title: 'Sample title',
                    artist: 'Sample',
                    album: 'Sample',
                    duration: 12,
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'PlayerSection',
          node: (
            <OrganismSection title="PlayerSection" index={9}>
              <PlayerSection title={'Sample title'} artist={'Sample'} />
            </OrganismSection>
          ),
        },
        {
          title: 'PlaylistView',
          node: (
            <OrganismSection title="PlaylistView" index={10}>
              <PlaylistView
                name={'Acme'}
                tracks={[
                  {
                    id: 'sample',
                    title: 'Sample title',
                    artist: 'Sample',
                    duration: 12,
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'PodcastHub',
          node: (
            <OrganismSection title="PodcastHub" index={11}>
              <PodcastHub
                podcasts={[
                  {
                    id: 'sample',
                    title: 'Sample title',
                    host: 'Sample',
                    episodes: 0,
                    category: 'Sample',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'QueueManager',
          node: (
            <OrganismSection title="QueueManager" index={12}>
              <QueueManager items={[{ id: 'sample', title: 'Sample title' }]} />
            </OrganismSection>
          ),
        },
        {
          title: 'RecommendationRow',
          node: (
            <OrganismSection title="RecommendationRow" index={13}>
              <RecommendationRow
                items={[
                  {
                    id: 'sample',
                    title: 'Sample title',
                    subtitle: 'A supporting subtitle.',
                    match: 0,
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'TvSeriesPage',
          node: (
            <OrganismSection title="TvSeriesPage" index={14}>
              <TvSeriesPage
                series={{
                  title: 'Sample title',
                  year: 0,
                  rating: 4.8,
                  seasons: 0,
                  episodes: [
                    {
                      id: 'sample',
                      title: 'Sample title',
                      season: 0,
                      episode: 0,
                      duration: 12,
                    },
                  ],
                }}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'VideoCatalog',
          node: (
            <OrganismSection title="VideoCatalog" index={15}>
              <VideoCatalog
                videos={[
                  {
                    id: 'sample',
                    title: 'Sample title',
                    category: 'Sample',
                    duration: 12,
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
      ],
    },
    {
      cat: 'news',
      tiles: [
        {
          title: 'BreakingTicker',
          node: (
            <OrganismSection title="BreakingTicker" index={0}>
              <BreakingTicker items={['Sample']} />
            </OrganismSection>
          ),
        },
        {
          title: 'BusinessNews',
          node: (
            <OrganismSection title="BusinessNews" index={1}>
              <BusinessNews
                market={[
                  {
                    symbol: '$',
                    name: 'Acme',
                    price: 'Sample',
                    change: 'Sample',
                  },
                ]}
                headlines={[{ title: 'Sample title', source: 'Sample' }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'DataViz',
          node: (
            <OrganismSection title="DataViz" index={2}>
              <DataViz data={[{ label: 'Sample', value: 1280 }]} />
            </OrganismSection>
          ),
        },
        {
          title: 'EditorialOpinion',
          node: (
            <OrganismSection title="EditorialOpinion" index={3}>
              <EditorialOpinion
                columns={[
                  {
                    author: 'Sample',
                    role: 'Admin',
                    initials: 'JD',
                    title: 'Sample title',
                    excerpt: 'A short excerpt.',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'EntertainmentFeed',
          node: (
            <OrganismSection title="EntertainmentFeed" index={4}>
              <EntertainmentFeed
                items={[
                  {
                    title: 'Sample title',
                    type: 'default',
                    time: '09:00',
                    imageAlt: 'Sample',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'LiveBlog',
          node: (
            <OrganismSection title="LiveBlog" index={5}>
              <LiveBlog
                posts={[
                  {
                    time: '09:00',
                    author: 'Sample',
                    text: 'Sample text content.',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'LocalNews',
          node: (
            <OrganismSection title="LocalNews" index={6}>
              <LocalNews
                items={[
                  {
                    title: 'Sample title',
                    city: 'Saigon',
                    time: '09:00',
                    excerpt: 'A short excerpt.',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'NewsletterSignup',
          node: (
            <OrganismSection title="NewsletterSignup" index={7}>
              <NewsletterSignup />
            </OrganismSection>
          ),
        },
        {
          title: 'PhotoGallery',
          node: (
            <OrganismSection title="PhotoGallery" index={8}>
              <PhotoGallery
                photos={[{ imageAlt: 'Sample', caption: 'Sample' }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'PodcastFeed',
          node: (
            <OrganismSection title="PodcastFeed" index={9}>
              <PodcastFeed
                podcasts={[
                  {
                    title: 'Sample title',
                    host: 'Sample',
                    duration: 'Sample',
                    topic: 'Sample',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'PoliticsSection',
          node: (
            <OrganismSection title="PoliticsSection" index={10}>
              <PoliticsSection
                lead={{
                  title: 'Sample title',
                  category: 'Sample',
                  imageAlt: 'Sample',
                }}
                articles={[
                  {
                    title: 'Sample title',
                    category: 'Sample',
                    imageAlt: 'Sample',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'SportsSection',
          node: (
            <OrganismSection title="SportsSection" index={11}>
              <SportsSection
                matches={[
                  {
                    teamA: 'Sample',
                    scoreA: 0,
                    teamB: 'Sample',
                    scoreB: 0,
                    status: 'active',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'TechnologySection',
          node: (
            <OrganismSection title="TechnologySection" index={12}>
              <TechnologySection
                articles={[
                  {
                    title: 'Sample title',
                    tag: 'Release',
                    readTime: 'Sample',
                    imageAlt: 'Sample',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'TopStories',
          node: (
            <OrganismSection title="TopStories" index={13}>
              <TopStories
                stories={[
                  {
                    title: 'Sample title',
                    category: 'Sample',
                    imageAlt: 'Sample',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'WeatherForecast',
          node: (
            <OrganismSection title="WeatherForecast" index={14}>
              <WeatherForecast
                days={[
                  {
                    day: 'Sample',
                    condition: 'Sample',
                    high: 0,
                    low: 0,
                    icon: 'Sample',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'WorldNews',
          node: (
            <OrganismSection title="WorldNews" index={15}>
              <WorldNews
                articles={[
                  {
                    title: 'Sample title',
                    region: 'Sample',
                    excerpt: 'A short excerpt.',
                    imageAlt: 'Sample',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
      ],
    },
    {
      cat: 'social',
      tiles: [
        {
          title: 'Calendar',
          node: (
            <OrganismSection title="Calendar" index={0}>
              <Calendar />
            </OrganismSection>
          ),
        },
        {
          title: 'ChatWindow',
          node: (
            <OrganismSection title="ChatWindow" index={1}>
              <ChatWindow
                messages={[
                  {
                    id: 'sample',
                    sender: 'user',
                    text: 'Sample text content.',
                  },
                ]}
                onSend={() => undefined}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'ConnectionsPage',
          node: (
            <OrganismSection title="ConnectionsPage" index={2}>
              <ConnectionsPage
                connections={[
                  { id: 'sample', name: 'Acme', handle: 'Sample', mutuals: 0 },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'EventTimeline',
          node: (
            <OrganismSection title="EventTimeline" index={3}>
              <EventTimeline
                items={[
                  { id: 'sample', title: 'Sample title', date: 'Aug 2026' },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'EventsSection',
          node: (
            <OrganismSection title="EventsSection" index={4}>
              <EventsSection
                events={[
                  {
                    id: 'sample',
                    title: 'Sample title',
                    date: 'Aug 2026',
                    location: 'Sample',
                    attendees: 0,
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'ExploreGrid',
          node: (
            <OrganismSection title="ExploreGrid" index={5}>
              <ExploreGrid
                items={[
                  { id: 'sample', label: 'Sample', type: 'photo', likes: 0 },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'FeatureGrid',
          node: (
            <OrganismSection title="FeatureGrid" index={6}>
              <FeatureGrid
                features={[
                  {
                    icon: 'Sample',
                    title: 'Sample title',
                    description: 'A short description of the item.',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'FeedView',
          node: (
            <OrganismSection title="FeedView" index={7}>
              <FeedView
                posts={[
                  {
                    id: 'sample',
                    author: 'Sample',
                    content: 'Sample content.',
                    likes: 0,
                    comments: 0,
                    time: '09:00',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'GroupsHub',
          node: (
            <OrganismSection title="GroupsHub" index={8}>
              <GroupsHub
                groups={[
                  {
                    id: 'sample',
                    name: 'Acme',
                    category: 'Sample',
                    members: 0,
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'HashtagPage',
          node: (
            <OrganismSection title="HashtagPage" index={9}>
              <HashtagPage
                hashtag={'Sample'}
                stats={{ posts: 0, followers: 0 }}
                posts={[
                  {
                    id: 'sample',
                    author: 'Sample',
                    content: 'Sample content.',
                    likes: 0,
                    comments: 0,
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'MessengerView',
          node: (
            <OrganismSection title="MessengerView" index={10}>
              <MessengerView />
            </OrganismSection>
          ),
        },
        {
          title: 'NotificationsFeed',
          node: (
            <OrganismSection title="NotificationsFeed" index={11}>
              <NotificationsFeed
                notifications={[
                  {
                    id: 'sample',
                    type: 'like',
                    text: 'Sample text content.',
                    time: '09:00',
                    read: true,
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'ProfileTimeline',
          node: (
            <OrganismSection title="ProfileTimeline" index={12}>
              <ProfileTimeline
                name={'Acme'}
                handle={'Sample'}
                stats={{ posts: 0, followers: 0, following: 0 }}
                activities={[
                  {
                    id: 'sample',
                    type: 'post',
                    title: 'Sample title',
                    time: '09:00',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'ReelsGrid',
          node: (
            <OrganismSection title="ReelsGrid" index={13}>
              <ReelsGrid
                reels={[
                  {
                    id: 'sample',
                    title: 'Sample title',
                    views: 0,
                    likes: 0,
                    duration: 'Sample',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'StoriesRow',
          node: (
            <OrganismSection title="StoriesRow" index={14}>
              <StoriesRow
                stories={[
                  { id: 'sample', username: 'janedoe', emoji: 'Sample' },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'TrendingTopics',
          node: (
            <OrganismSection title="TrendingTopics" index={15}>
              <TrendingTopics
                topics={[
                  {
                    id: 'sample',
                    tag: 'Release',
                    category: 'Sample',
                    posts: 0,
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
      ],
    },
    {
      cat: 'store',
      tiles: [
        {
          title: 'BrandSection',
          node: (
            <OrganismSection title="BrandSection" index={0}>
              <BrandSection brands={[{ id: 'sample', name: 'Acme' }]} />
            </OrganismSection>
          ),
        },
        {
          title: 'CategoryShowcase',
          node: (
            <OrganismSection title="CategoryShowcase" index={1}>
              <CategoryShowcase
                categories={[
                  { id: 'sample', name: 'Acme', icon: 'Sample', count: 3 },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'CheckoutFlow',
          node: (
            <OrganismSection title="CheckoutFlow" index={2}>
              <CheckoutFlow />
            </OrganismSection>
          ),
        },
        {
          title: 'DealsSection',
          node: (
            <OrganismSection title="DealsSection" index={3}>
              <DealsSection
                deals={[
                  {
                    id: 'sample',
                    title: 'Sample title',
                    price: 49,
                    oldPrice: 0,
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'GiftCardCenter',
          node: (
            <OrganismSection title="GiftCardCenter" index={4}>
              <GiftCardCenter
                cards={[
                  {
                    id: 'sample',
                    recipient: 'Sample',
                    amount: 120,
                    status: 'Pending',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'LoyaltyProgram',
          node: (
            <OrganismSection title="LoyaltyProgram" index={5}>
              <LoyaltyProgram
                points={0}
                tier={'Sample'}
                rewards={[{ id: 'sample', name: 'Acme', points: 0 }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'NewArrivals',
          node: (
            <OrganismSection title="NewArrivals" index={6}>
              <NewArrivals
                products={[
                  { id: 'sample', name: 'Acme', price: 49, category: 'Sample' },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'OrderTracking',
          node: (
            <OrganismSection title="OrderTracking" index={7}>
              <OrderTracking
                orderId={'Sample'}
                status={'active'}
                items={[{ name: 'Acme', qty: 0 }]}
                timeline={[
                  { status: 'active', label: 'Sample', time: '09:00' },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'ProductList',
          node: (
            <OrganismSection title="ProductList" index={8}>
              <ProductList
                products={[
                  { id: 'sample', name: 'Acme', price: 49, rating: 4.8 },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'ProductShowcase',
          node: (
            <OrganismSection title="ProductShowcase" index={9}>
              <ProductShowcase
                product={{
                  name: 'Acme',
                  brand: 'Acme',
                  price: 49,
                  rating: 4.8,
                  description: 'A short description of the item.',
                  features: ['Sample'],
                }}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'ReturnCenter',
          node: (
            <OrganismSection title="ReturnCenter" index={10}>
              <ReturnCenter
                orders={[
                  {
                    id: 'sample',
                    product: 'Sample',
                    orderDate: 'Sample',
                    status: 'active',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'ShippingTracker',
          node: (
            <OrganismSection title="ShippingTracker" index={11}>
              <ShippingTracker
                carrier={'Sample'}
                trackingNumber={'Sample'}
                status={'active'}
                updates={[
                  { time: '09:00', location: 'Sample', status: 'active' },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'ShoppingCart',
          node: (
            <OrganismSection title="ShoppingCart" index={12}>
              <ShoppingCart
                items={[{ id: 'sample', name: 'Acme', price: 49, qty: 0 }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'StoreReviews',
          node: (
            <OrganismSection title="StoreReviews" index={13}>
              <StoreReviews
                reviews={[
                  {
                    id: 'sample',
                    author: 'Sample',
                    rating: 4.8,
                    title: 'Sample title',
                    comment: 'Sample',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'Storefront',
          node: (
            <OrganismSection title="Storefront" index={14}>
              <Storefront
                title={'Sample title'}
                categories={[{ id: 'sample', name: 'Acme' }]}
                products={[{ id: 'sample', name: 'Acme', price: 49 }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'WishlistView',
          node: (
            <OrganismSection title="WishlistView" index={15}>
              <WishlistView
                items={[{ id: 'sample', name: 'Acme', price: 49 }]}
              />
            </OrganismSection>
          ),
        },
      ],
    },
    {
      cat: 'support',
      tiles: [
        {
          title: 'CommandMenu',
          node: (
            <OrganismSection title="CommandMenu" index={0}>
              <CommandMenu
                open={false}
                onClose={() => undefined}
                items={[{ id: 'sample', label: 'Sample' }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'DashboardHeader',
          node: (
            <OrganismSection title="DashboardHeader" index={1}>
              <DashboardHeader title={'Sample title'} />
            </OrganismSection>
          ),
        },
        {
          title: 'DataList',
          node: (
            <OrganismSection title="DataList" index={2}>
              <DataList
                sections={[
                  {
                    id: 'sample',
                    title: 'Sample title',
                    items: [
                      { key: 'sample', label: 'Sample', value: 'Sample' },
                    ],
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'DataTable',
          node: (
            <OrganismSection title="DataTable" index={3}>
              <DataTable
                columns={[{ key: 'sample', header: 'Sample' }]}
                rows={[{}]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'Diff',
          node: (
            <OrganismSection title="Diff" index={4}>
              <Diff before={'Sample'} after={'Sample'} />
            </OrganismSection>
          ),
        },
        {
          title: 'FilterBar',
          node: (
            <OrganismSection title="FilterBar" index={5}>
              <FilterBar query={'Sample'} onQueryChange={() => undefined} />
            </OrganismSection>
          ),
        },
        {
          title: 'Header',
          node: (
            <OrganismSection title="Header" index={6}>
              <Header title={'Dashboard'} />
            </OrganismSection>
          ),
        },
        {
          title: 'PageBreadcrumbs',
          node: (
            <OrganismSection title="PageBreadcrumbs" index={7}>
              <PageBreadcrumbs
                items={[{ label: 'Sample' }]}
                title={'Sample title'}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'PageHeader',
          node: (
            <OrganismSection title="PageHeader" index={8}>
              <PageHeader title={'Sample title'} />
            </OrganismSection>
          ),
        },
        {
          title: 'PageTabs',
          node: (
            <OrganismSection title="PageTabs" index={9}>
              <PageTabs
                tabs={[{ id: 'sample', label: 'Sample', content: 'Sample' }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'ProgressStepper',
          node: (
            <OrganismSection title="ProgressStepper" index={10}>
              <ProgressStepper steps={['Sample']} activeStep={0} />
            </OrganismSection>
          ),
        },
        {
          title: 'Section',
          node: (
            <OrganismSection title="Section" index={11}>
              <Section title={'Sample title'} />
            </OrganismSection>
          ),
        },
        {
          title: 'Sidebar',
          node: (
            <OrganismSection title="Sidebar" index={12}>
              <Sidebar
                title={'Workspace'}
                items={[{ label: 'Sample', href: '/about' }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'StatsGrid',
          node: (
            <OrganismSection title="StatsGrid" index={13}>
              <StatsGrid stats={[{ label: 'Sample', value: 'Sample' }]} />
            </OrganismSection>
          ),
        },
        {
          title: 'TableOfContents',
          node: (
            <OrganismSection title="TableOfContents" index={14}>
              <TableOfContents items={[{ id: 'sample', label: 'Sample' }]} />
            </OrganismSection>
          ),
        },
        {
          title: 'Toolbar',
          node: (
            <OrganismSection title="Toolbar" index={15}>
              <Toolbar />
            </OrganismSection>
          ),
        },
      ],
    },
    {
      cat: 'travel',
      tiles: [
        {
          title: 'AdventureSection',
          node: (
            <OrganismSection title="AdventureSection" index={0}>
              <AdventureSection
                activities={[
                  {
                    id: 'sample',
                    name: 'Acme',
                    difficulty: 'easy',
                    price: 49,
                    duration: 'Sample',
                    rating: 4.8,
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'BookingFlow',
          node: (
            <OrganismSection title="BookingFlow" index={1}>
              <BookingFlow />
            </OrganismSection>
          ),
        },
        {
          title: 'ChecklistSection',
          node: (
            <OrganismSection title="ChecklistSection" index={2}>
              <ChecklistSection items={[{ id: 'sample', label: 'Sample' }]} />
            </OrganismSection>
          ),
        },
        {
          title: 'CurrencyConverter',
          node: (
            <OrganismSection title="CurrencyConverter" index={3}>
              <CurrencyConverter />
            </OrganismSection>
          ),
        },
        {
          title: 'DestinationShowcase',
          node: (
            <OrganismSection title="DestinationShowcase" index={4}>
              <DestinationShowcase
                destinations={[
                  {
                    id: 'sample',
                    name: 'Acme',
                    country: 'Vietnam',
                    price: 49,
                    rating: 4.8,
                    highlights: ['Sample'],
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'FlightResults',
          node: (
            <OrganismSection title="FlightResults" index={5}>
              <FlightResults
                flights={[
                  {
                    airline: 'Sample',
                    from: 'Sample',
                    to: 'Sample',
                    price: 49,
                    duration: 'Sample',
                    departure: 'Sample',
                    arrival: 'Sample',
                    stops: 0,
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'HotelSearch',
          node: (
            <OrganismSection title="HotelSearch" index={6}>
              <HotelSearch
                hotels={[
                  {
                    id: 'sample',
                    name: 'Acme',
                    location: 'Sample',
                    price: 49,
                    rating: 4.8,
                    amenities: ['Sample'],
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'ItineraryView',
          node: (
            <OrganismSection title="ItineraryView" index={7}>
              <ItineraryView
                title={'Sample title'}
                dates={'Sample'}
                days={[
                  {
                    day: 0,
                    title: 'Sample title',
                    activities: [{ id: 'sample', time: '09:00', name: 'Acme' }],
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'LocalGuides',
          node: (
            <OrganismSection title="LocalGuides" index={8}>
              <LocalGuides
                guides={[
                  {
                    id: 'sample',
                    name: 'Acme',
                    city: 'Saigon',
                    languages: ['Sample'],
                    rating: 4.8,
                    trips: 0,
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'LoyaltyDashboard',
          node: (
            <OrganismSection title="LoyaltyDashboard" index={9}>
              <LoyaltyDashboard
                tier={'Sample'}
                points={0}
                miles={0}
                benefits={[{ id: 'sample', title: 'Sample title' }]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'MapExplorer',
          node: (
            <OrganismSection title="MapExplorer" index={10}>
              <MapExplorer
                pins={[
                  {
                    id: 'sample',
                    name: 'Acme',
                    type: 'food',
                    coordinates: 'Sample',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'PhotoJournal',
          node: (
            <OrganismSection title="PhotoJournal" index={11}>
              <PhotoJournal
                entries={[
                  {
                    id: 'sample',
                    title: 'Sample title',
                    date: 'Aug 2026',
                    location: 'Sample',
                    likes: 0,
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'ReviewHub',
          node: (
            <OrganismSection title="ReviewHub" index={12}>
              <ReviewHub
                reviews={[
                  {
                    id: 'sample',
                    author: 'Sample',
                    rating: 4.8,
                    destination: 'Sample',
                    title: 'Sample title',
                    comment: 'Sample',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'TravelAlerts',
          node: (
            <OrganismSection title="TravelAlerts" index={13}>
              <TravelAlerts
                alerts={[
                  {
                    id: 'sample',
                    type: 'advisory',
                    title: 'Sample title',
                    description: 'A short description of the item.',
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'TravelPackages',
          node: (
            <OrganismSection title="TravelPackages" index={14}>
              <TravelPackages
                packages={[
                  {
                    id: 'sample',
                    name: 'Acme',
                    destination: 'Sample',
                    price: 49,
                    duration: 'Sample',
                    rating: 4.8,
                  },
                ]}
              />
            </OrganismSection>
          ),
        },
        {
          title: 'TripPlanner',
          node: (
            <OrganismSection title="TripPlanner" index={15}>
              <TripPlanner
                trip={{
                  destination: 'Sample',
                  dates: 'Sample',
                  travelers: 0,
                  budget: 0,
                }}
                activities={[{ id: 'sample', name: 'Acme', date: 'Aug 2026' }]}
              />
            </OrganismSection>
          ),
        },
      ],
    },
  ];

  const term = search.trim().toLowerCase();
  const visible = term
    ? sections
        .map((s) => ({
          ...s,
          tiles: s.tiles.filter(
            (t) => t.title.toLowerCase().includes(term) || s.cat.includes(term)
          ),
        }))
        .filter((s) => s.tiles.length > 0)
    : sections;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-3 p-5">
      <label className="input input-bordered flex w-full items-center gap-2">
        <svg
          aria-hidden="true"
          className="text-base-content/50 size-4 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
          />
        </svg>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-testid="organisms-search"
          placeholder="Search organisms…"
          className="grow"
        />
      </label>
      {visible.map((section) => (
        <details
          key={section.cat}
          className="collapse-arrow border-base-300 collapse rounded-none border-b p-0"
          open>
          <summary className="collapse-title text-base-content/60 font-mono text-xs uppercase">
            {section.cat}
            <span className="badge badge-ghost badge-sm ml-2">
              {section.tiles.length}
            </span>
          </summary>
          <div className="collapse-content">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {section.tiles.map((tile) => tile.node)}
            </div>
          </div>
        </details>
      ))}
    </div>
  );
};

OrganismsLevel.displayName = 'OrganismsLevel';

export const ORGANISMS_COUNT = 256;
