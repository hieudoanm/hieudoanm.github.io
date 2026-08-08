import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import {
  FiBell,
  FiHome,
  FiLock,
  FiMail,
  FiSearch,
  FiUser,
} from 'react-icons/fi';
import {
  ActivityFeed,
  AccountMenu,
  AnnouncementBar,
  AuthForm,
  BlogSection,
  Calendar,
  ChatWindow,
  CommandMenu,
  ComparisonSection,
  ContactSection,
  CookieBanner,
  CTASection,
  DashboardHeader,
  DataList,
  DataTable,
  Diff,
  EventTimeline,
  FAQSection,
  FaqAccordion,
  FeatureGrid,
  FilterBar,
  Footer,
  GalleryGrid,
  Header,
  Hero,
  InfoCards,
  IntegrationsSection,
  KanbanBoard,
  Leaderboard,
  LogosSection,
  Marquee,
  Navbar,
  NavigationMenu,
  NewsletterSection,
  NotificationCenter,
  PageBreadcrumbs,
  PageHeader,
  PageTabs,
  PricingCard,
  PricingSection,
  ProcessSection,
  ProductGrid,
  ProfileCard,
  ProgressStepper,
  QuoteSection,
  Section,
  ShowcaseSection,
  Sidebar,
  StatsGrid,
  TableOfContents,
  TeamSection,
  TestimonialCarousel,
  TestimonialGrid,
  TestimonialSection,
  Toolbar,
  VideoSection,
} from '../../../../../organisms';
import { Button } from '../../../../../atoms';

const OrganismSection: FC<{
  title: string;
  index: number;
  children: ReactNode;
}> = ({ title, index, children }) => (
  <div
    className="animate-atomic-in"
    style={{ animationDelay: `${index * 70}ms` }}>
    <h3 className="text-base-content/50 mb-2 font-mono text-xs uppercase">
      {title}
    </h3>
    {children}
  </div>
);

const navItems = [
  { label: 'Home', href: '/', icon: <FiHome /> },
  { label: 'Mail', href: '/mail', icon: <FiMail /> },
  { label: 'Search', href: '/search', icon: <FiSearch /> },
];

const footerColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Changelog', href: '/changelog' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
];

const features = [
  { icon: <FiBell />, title: 'Fast', description: 'Optimised for speed.' },
  { icon: <FiLock />, title: 'Secure', description: 'End-to-end encrypted.' },
  { icon: <FiUser />, title: 'Personal', description: 'Adapts to you.' },
];

const plans = [
  {
    name: 'Starter',
    price: '$0',
    period: '/mo',
    features: ['1 project', 'Community support'],
    ctaLabel: 'Get started',
    ctaHref: '/signup',
  },
  {
    name: 'Pro',
    price: '$12',
    period: '/mo',
    description: 'Most popular',
    features: ['Unlimited projects', 'Priority support', 'Custom themes'],
    highlighted: true,
    ctaLabel: 'Upgrade',
    ctaHref: '/billing',
  },
  {
    name: 'Enterprise',
    price: '$49',
    period: '/mo',
    features: ['SSO', 'Audit logs', 'Dedicated manager'],
    ctaLabel: 'Contact sales',
    ctaHref: '/contact',
  },
];

export const OrganismsLevel: FC = () => {
  const [commandOpen, setCommandOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(2026, 7, 15)
  );
  const [activeStep, setActiveStep] = useState(1);
  const [pageTab, setPageTab] = useState('overview');
  const [filterQuery, setFilterQuery] = useState('');
  const [activeTocId, setActiveTocId] = useState('intro');
  const [chatMessages, setChatMessages] = useState([
    {
      id: '1',
      sender: 'assistant' as const,
      text: 'Hi, how can I help?',
      name: 'Support',
      time: '09:00',
    },
    {
      id: '2',
      sender: 'user' as const,
      text: 'I need a refund.',
      time: '09:01',
    },
  ]);

  return (
    <div className="flex flex-col gap-8">
      <OrganismSection title="Header" index={0}>
        <Header
          title="Dashboard"
          subtitle="Welcome back, Jane"
          badges={<span className="badge badge-accent badge-sm">Beta</span>}
          action={<Button size="sm">New report</Button>}
        />
      </OrganismSection>

      <OrganismSection title="Toolbar" index={1}>
        <Toolbar
          title="Reports"
          subtitle="Monthly summary"
          actions={[
            <Button key="e" size="sm" variant="outline">
              Export
            </Button>,
          ]}
        />
      </OrganismSection>

      <OrganismSection title="Sidebar" index={2}>
        <div className="border-base-content/10 flex h-64 justify-between gap-2 rounded-xl border">
          <Sidebar
            title="Workspace"
            items={[
              { label: 'Overview', href: '/', icon: <FiHome /> },
              { label: 'Inbox', href: '/inbox', icon: <FiMail />, badge: '3' },
              { label: 'Settings', href: '/settings', icon: <FiLock /> },
            ]}
            footer={
              <span className="text-base-content/50 text-sm">v1.0.0</span>
            }
          />
          <div className="bg-base-100 flex-1 p-6">
            <p className="text-base-content/50 text-sm">Main content area</p>
          </div>
        </div>
      </OrganismSection>

      <OrganismSection title="DataTable" index={3}>
        <div className="bg-base-200 border-base-content/10 rounded-xl border p-4">
          <DataTable
            columns={[
              { key: 'name', header: 'Member' },
              { key: 'role', header: 'Role' },
              { key: 'status', header: 'Status' },
            ]}
            rows={[
              { name: 'Jane Doe', role: 'Admin', status: 'Active' },
              { name: 'Alex Smith', role: 'Editor', status: 'Active' },
              { name: 'Pat Lee', role: 'Viewer', status: 'Invited' },
            ]}
          />
        </div>
      </OrganismSection>

      <OrganismSection title="FeatureGrid" index={4}>
        <FeatureGrid features={features} columns={3} />
      </OrganismSection>

      <OrganismSection title="PricingSection" index={5}>
        <PricingSection plans={plans} />
      </OrganismSection>

      <OrganismSection title="Navbar" index={6}>
        <Navbar items={navItems} />
      </OrganismSection>

      <OrganismSection title="Footer" index={7}>
        <Footer
          brand="Acme"
          description="A small description of the product."
          columns={footerColumns}
          copyright="© 2026 Acme. All rights reserved."
        />
      </OrganismSection>

      <OrganismSection title="StatsGrid" index={8}>
        <StatsGrid
          columns={4}
          stats={[
            { label: 'Users', value: '3,201', variant: 'primary' },
            { label: 'Revenue', value: '$12,480', variant: 'success' },
            { label: 'Sessions', value: '41,002', variant: 'accent' },
            { label: 'Errors', value: '12', variant: 'error' },
          ]}
        />
      </OrganismSection>

      <OrganismSection title="ChatWindow" index={9}>
        <ChatWindow
          title="Support chat"
          messages={chatMessages}
          onSend={(text) =>
            setChatMessages((prev) => [
              ...prev,
              {
                id: String(prev.length + 1),
                sender: 'user',
                text,
                time: new Date().toTimeString().slice(0, 5),
              },
            ])
          }
        />
      </OrganismSection>

      <OrganismSection title="FAQSection" index={10}>
        <FAQSection
          title="Frequently asked questions"
          items={[
            { question: 'How do I install it?', answer: 'Run pnpm install.' },
            { question: 'Is it free?', answer: 'Yes, MIT licensed.' },
            { question: 'Can I contribute?', answer: 'Open a pull request.' },
          ]}
        />
      </OrganismSection>

      <OrganismSection title="Hero" index={11}>
        <Hero
          badge="v2.0"
          tagline="Component library"
          title="Build interfaces faster with atomic design"
          description="Atoms, molecules, and organisms composed into clean, typed React components."
          primaryCta={{ label: 'Get started', href: '/components' }}
          secondaryCta={{ label: 'View docs', href: '/docs' }}
        />
      </OrganismSection>

      <OrganismSection title="NewsletterSection" index={12}>
        <NewsletterSection />
      </OrganismSection>

      <OrganismSection title="CTASection" index={13}>
        <CTASection
          badge="Limited offer"
          title="Ready to ship your next idea?"
          description="Join thousands of developers building faster with our component library."
          primaryCta={{ label: 'Get started', href: '/signup' }}
          secondaryCta={{ label: 'Talk to sales', href: '/contact' }}
        />
      </OrganismSection>

      <OrganismSection title="TestimonialSection" index={14}>
        <TestimonialSection
          title="What our users say"
          items={[
            {
              quote: 'The best component library we have used.',
              author: 'Ada Lovelace',
              role: 'Engineer',
              initials: 'AL',
            },
            {
              quote: 'Typed, accessible, and beautiful out of the box.',
              author: 'Grace Hopper',
              role: 'CTO',
            },
            {
              quote: 'We shipped our redesign in two weeks.',
              author: 'Katherine Johnson',
              role: 'Product lead',
            },
          ]}
        />
      </OrganismSection>

      <OrganismSection title="TeamSection" index={15}>
        <TeamSection
          title="Meet the team"
          members={[
            {
              name: 'Alan Turing',
              role: 'Founder',
              bio: 'Math genius.',
              initials: 'AT',
            },
            {
              name: 'Katherine Johnson',
              role: 'CTO',
              bio: 'Orbits the planet.',
            },
            {
              name: 'Grace Hopper',
              role: 'Engineer',
              bio: 'Builds the compiler.',
            },
            { name: 'Linus Pauling', role: 'Advisor' },
          ]}
        />
      </OrganismSection>

      <OrganismSection title="BlogSection" index={16}>
        <BlogSection
          title="Latest posts"
          posts={[
            {
              id: '1',
              title: 'Announcing v2.0',
              excerpt: 'Themes, more components, and a new demo.',
              date: 'Aug 2026',
              tag: 'Release',
            },
            {
              id: '2',
              title: 'Testing atomic components',
              excerpt: 'How we keep 90% coverage on every batch.',
              date: 'Jul 2026',
              tag: 'Engineering',
            },
            {
              id: '3',
              title: 'Design tokens deep dive',
              excerpt: 'Tailwind config and DaisyUI themes.',
              date: 'Jun 2026',
            },
          ]}
        />
      </OrganismSection>

      <OrganismSection title="ContactSection" index={17}>
        <ContactSection
          title="Contact us"
          description="We usually reply within one business day."
        />
      </OrganismSection>

      <OrganismSection title="AnnouncementBar" index={18}>
        <AnnouncementBar
          text="Early bird pricing ends this week."
          link={{ label: 'Claim 20% off', href: '/pricing' }}
          dismissible
        />
      </OrganismSection>

      <OrganismSection title="CookieBanner" index={19}>
        <CookieBanner onAccept={() => undefined} onDecline={() => undefined} />
      </OrganismSection>

      <OrganismSection title="CommandMenu" index={20}>
        <div className="flex flex-col items-start gap-3">
          <Button size="sm" onClick={() => setCommandOpen(true)}>
            Open command menu
          </Button>
          <span className="text-base-content/50 text-xs">
            Try typing "settings", "theme", or "deploy".
          </span>
        </div>
        <CommandMenu
          open={commandOpen}
          onClose={() => setCommandOpen(false)}
          items={[
            {
              id: 'settings',
              label: 'Open settings',
              description: 'App preferences',
              keywords: ['prefs', 'config'],
              group: 'Navigation',
            },
            {
              id: 'profile',
              label: 'Edit profile',
              description: 'Account details',
              group: 'Navigation',
            },
            {
              id: 'theme',
              label: 'Toggle theme',
              description: 'Dark / light',
              keywords: ['dark', 'light', 'mode'],
              group: 'Appearance',
            },
            {
              id: 'deploy',
              label: 'Deploy site',
              description: 'Trigger a production build',
              group: 'Actions',
            },
          ]}
        />
      </OrganismSection>

      <OrganismSection title="AuthForm" index={21}>
        <div className="bg-base-200 border-base-content/10 mx-auto w-full max-w-md rounded-xl border p-6">
          <AuthForm mode="signup" onSubmit={() => undefined} />
        </div>
      </OrganismSection>

      <OrganismSection title="Marquee" index={22}>
        <Marquee
          title="Powered by"
          items={[
            <span key="next">Next.js</span>,
            <span key="tailwind">Tailwind CSS</span>,
            <span key="daisy">DaisyUI</span>,
            <span key="tauri">Tauri</span>,
            <span key="typescript">TypeScript</span>,
            <span key="react">React</span>,
          ]}
        />
      </OrganismSection>

      <OrganismSection title="LogosSection" index={23}>
        <LogosSection
          title="Trusted by teams at"
          columns={4}
          items={[
            { name: 'Acme' },
            { name: 'Globex' },
            { name: 'Initech' },
            { name: 'Umbrella' },
            { name: 'Stark' },
            { name: 'Wayne' },
          ]}
        />
      </OrganismSection>

      <OrganismSection title="ProfileCard" index={24}>
        <div className="mx-auto w-full max-w-sm">
          <ProfileCard
            name="Jane Doe"
            role="Staff Engineer"
            bio="Building delightful interfaces with atomic design."
            avatar={{ src: '/avatar.png', alt: 'Jane Doe', initials: 'JD' }}
            badges={['Open source', 'Speaker']}
            stats={[
              { label: 'Repos', value: '120' },
              { label: 'Following', value: '340' },
              { label: 'Followers', value: '2.1k' },
            ]}
            actions={<Button size="sm">Follow</Button>}
          />
        </div>
      </OrganismSection>

      <OrganismSection title="ActivityFeed" index={25}>
        <ActivityFeed
          title="Recent activity"
          items={[
            {
              id: '1',
              title: 'Deployed v2.1.0',
              description: 'Production release',
              time: '10 min ago',
              status: 'success',
            },
            {
              id: '2',
              title: 'Build warning',
              description: 'Deprecated API in utils.ts',
              time: '1 hr ago',
              status: 'warning',
            },
            {
              id: '3',
              title: 'Pipeline failed',
              description: 'Integration test on main',
              time: '3 hr ago',
              status: 'error',
            },
            {
              id: '4',
              title: 'New contributor',
              description: 'Ada opened a pull request',
              time: 'Yesterday',
              status: 'neutral',
            },
          ]}
        />
      </OrganismSection>
      <OrganismSection title="Calendar" index={26}>
        <div className="mx-auto w-full max-w-sm">
          <Calendar
            value={selectedDate}
            onChange={setSelectedDate}
            minDate={new Date(2026, 0, 1)}
            maxDate={new Date(2026, 11, 31)}
          />
        </div>
      </OrganismSection>
      <OrganismSection title="Diff" index={27}>
        <div className="mx-auto w-full max-w-xl">
          <Diff
            aspectClass="aspect-16/9"
            before={
              <div className="bg-primary/20 flex h-full w-full items-center justify-center">
                Before
              </div>
            }
            after={
              <div className="bg-success/20 flex h-full w-full items-center justify-center">
                After
              </div>
            }
          />
        </div>
      </OrganismSection>
      <OrganismSection title="IntegrationsSection" index={28}>
        <IntegrationsSection
          title="Works with your stack"
          items={[
            { name: 'GitHub', description: 'Sync repositories' },
            { name: 'Slack', description: 'Share updates' },
            { name: 'Notion', description: 'Mirror docs' },
          ]}
          columns={3}
        />
      </OrganismSection>
      <OrganismSection title="PageHeader" index={29}>
        <PageHeader
          eyebrow="Settings"
          title="Team preferences"
          description="Customise how your workspace behaves."
          actions={<Button size="sm">Save</Button>}
        />
      </OrganismSection>
      <OrganismSection title="PricingCard" index={30}>
        <div className="mx-auto w-full max-w-sm">
          <PricingCard
            name="Pro"
            price="$12"
            period="/ month"
            description="For growing teams"
            features={[
              'Unlimited projects',
              'Priority support',
              'Advanced analytics',
            ]}
            ctaLabel="Get started"
            highlighted
            badge="Popular"
          />
        </div>
      </OrganismSection>
      <OrganismSection title="ProgressStepper" index={31}>
        <ProgressStepper
          steps={['Cart', 'Shipping', 'Payment', 'Done']}
          activeStep={activeStep}
          onStepClick={setActiveStep}
        />
      </OrganismSection>
      <OrganismSection title="TestimonialCarousel" index={32}>
        <div className="mx-auto w-full max-w-2xl">
          <TestimonialCarousel
            items={[
              {
                quote: 'The fastest way we shipped a product.',
                author: 'Ada Lovelace',
                role: 'CTO, Analytics Co',
              },
              {
                quote: 'Beautifully crafted components.',
                author: 'Grace Hopper',
                role: 'Engineering Lead',
              },
              {
                quote: 'Our team adopted it in a day.',
                author: 'Linus Torvalds',
                role: 'Founder',
              },
            ]}
          />
        </div>
      </OrganismSection>
      <OrganismSection title="DashboardHeader" index={33}>
        <DashboardHeader
          title="Overview"
          subtitle="Welcome back, Jane"
          searchValue=""
          onSearchChange={() => undefined}
          searchPlaceholder="Search projects..."
          actions={<Button size="sm">New report</Button>}
        />
      </OrganismSection>
      <OrganismSection title="DataList" index={34}>
        <DataList
          sections={[
            {
              id: 'server',
              title: 'Server',
              items: [
                { key: 'region', label: 'Region', value: 'ap-southeast-1' },
                { key: 'version', label: 'Version', value: 'v1.2.3' },
                { key: 'node', label: 'Node', value: '22 LTS' },
              ],
            },
            {
              id: 'limits',
              title: 'Limits',
              items: [
                { key: 'storage', label: 'Storage', value: '10 GB' },
                { key: 'requests', label: 'Requests', value: '100k / mo' },
              ],
            },
          ]}
        />
      </OrganismSection>
      <OrganismSection title="EventTimeline" index={35}>
        <EventTimeline
          title="Release history"
          items={[
            {
              id: '1',
              title: 'v2.1.0 deployed',
              date: '10 min ago',
              description: 'Production release with new components.',
              status: 'success',
            },
            {
              id: '2',
              title: 'Build warning',
              date: '1 hr ago',
              description: 'Deprecated API in utils.ts',
              status: 'warning',
            },
            {
              id: '3',
              title: 'Pipeline queued',
              date: '3 hr ago',
              status: 'neutral',
            },
          ]}
        />
      </OrganismSection>
      <OrganismSection title="FaqAccordion" index={36}>
        <FaqAccordion
          title="Frequently asked questions"
          description="Everything you need to know before getting started."
          items={[
            {
              id: 'a',
              question: 'How do I install it?',
              answer: 'Run pnpm install in your project root.',
            },
            {
              id: 'b',
              question: 'Is it free?',
              answer: 'Yes, the library is MIT licensed.',
            },
            {
              id: 'c',
              question: 'Can I contribute?',
              answer: 'Open a pull request on GitHub.',
            },
          ]}
        />
      </OrganismSection>
      <OrganismSection title="GalleryGrid" index={37}>
        <GalleryGrid
          columns={3}
          items={[
            {
              src: '/gallery-1.png',
              alt: 'Coastal landscape',
              caption: 'Coastal',
            },
            { src: '/gallery-2.png', alt: 'Mountain trail', caption: 'Trails' },
            { src: '/gallery-3.png', alt: 'City skyline', caption: 'City' },
          ]}
        />
      </OrganismSection>
      <OrganismSection title="InfoCards" index={38}>
        <InfoCards
          title="Why choose us"
          columns={3}
          cards={[
            {
              id: 'fast',
              title: 'Fast',
              description: 'Optimised for speed and small bundles.',
              icon: <FiBell />,
              accent: 'primary',
            },
            {
              id: 'secure',
              title: 'Secure',
              description: 'End-to-end encrypted by default.',
              icon: <FiLock />,
            },
            {
              id: 'personal',
              title: 'Personal',
              description: 'Adapts to your workflow.',
              icon: <FiUser />,
              accent: 'success',
            },
          ]}
        />
      </OrganismSection>
      <OrganismSection title="PageBreadcrumbs" index={39}>
        <PageBreadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Projects', href: '/projects' },
            { label: 'Settings' },
          ]}
          title="Project settings"
          description="Manage your project preferences."
          actions={<Button size="sm">Save</Button>}
        />
      </OrganismSection>
      <OrganismSection title="PageTabs" index={40}>
        <PageTabs
          tabs={[
            {
              id: 'overview',
              label: 'Overview',
              content: (
                <div className="bg-base-200 rounded-xl p-6 text-sm">
                  Overview panel content.
                </div>
              ),
            },
            {
              id: 'activity',
              label: 'Activity',
              icon: <FiBell />,
              content: (
                <div className="bg-base-200 rounded-xl p-6 text-sm">
                  Activity panel content.
                </div>
              ),
            },
            {
              id: 'settings',
              label: 'Settings',
              content: (
                <div className="bg-base-200 rounded-xl p-6 text-sm">
                  Settings panel content.
                </div>
              ),
            },
          ]}
          value={pageTab}
          onChange={setPageTab}
        />
      </OrganismSection>
      <OrganismSection title="Section" index={41}>
        <Section
          eyebrow="Features"
          title="Everything you need to ship"
          description="A short paragraph explaining the value of the section."
          action={<Button size="sm">Learn more</Button>}
          align="center">
          <div className="bg-base-200 border-base-content/10 rounded-xl border p-6 text-sm">
            Section body content.
          </div>
        </Section>
      </OrganismSection>
      <OrganismSection title="NavigationMenu" index={42}>
        <NavigationMenu
          items={[
            {
              label: 'Products',
              children: (
                <div className="flex flex-col gap-1 text-sm">
                  <span>Analytics</span>
                  <span>Realtime</span>
                  <span>Reports</span>
                </div>
              ),
            },
            {
              label: 'Resources',
              children: (
                <div className="flex flex-col gap-1 text-sm">
                  <span>Docs</span>
                  <span>Blog</span>
                  <span>Changelog</span>
                </div>
              ),
            },
            { label: 'Pricing', href: '/pricing' },
          ]}
        />
      </OrganismSection>
      <OrganismSection title="TableOfContents" index={43}>
        <div className="flex gap-8">
          <TableOfContents
            items={[
              { id: 'intro', label: 'Introduction' },
              {
                id: 'usage',
                label: 'Usage',
                children: [{ id: 'props', label: 'Props' }],
              },
              { id: 'theming', label: 'Theming' },
            ]}
            activeId={activeTocId}
            onSelect={setActiveTocId}
          />
          <div className="bg-base-200 border-base-content/10 flex-1 rounded-xl border p-6 text-sm">
            Article preview — click a link to update the active item.
          </div>
        </div>
      </OrganismSection>
      <OrganismSection title="NotificationCenter" index={44}>
        <div className="flex w-full justify-end">
          <NotificationCenter
            notifications={[
              {
                id: '1',
                title: 'Deploy complete',
                description: 'Production is live',
                time: '2m',
                unread: true,
              },
              {
                id: '2',
                title: 'Build failed',
                description: 'Integration tests',
                time: '1h',
                unread: true,
              },
              {
                id: '3',
                title: 'New comment',
                time: '3h',
              },
            ]}
          />
        </div>
      </OrganismSection>
      <OrganismSection title="AccountMenu" index={45}>
        <div className="flex w-full justify-end">
          <AccountMenu
            name="Jane Doe"
            email="jane@example.com"
            avatar={
              <div className="avatar placeholder">
                <div className="bg-primary text-primary-content w-8 rounded-full">
                  <span>JD</span>
                </div>
              </div>
            }
            items={[
              { label: 'Profile' },
              { label: 'Settings' },
              { label: 'Billing' },
              { label: 'Sign out', danger: true },
            ]}
          />
        </div>
      </OrganismSection>
      <OrganismSection title="FilterBar" index={46}>
        <FilterBar
          query={filterQuery}
          onQueryChange={setFilterQuery}
          placeholder="Search reports…">
          <Button size="sm" variant="outline">
            Filter
          </Button>
        </FilterBar>
      </OrganismSection>
      <OrganismSection title="KanbanBoard" index={47}>
        <KanbanBoard
          columns={[
            {
              id: 'todo',
              title: 'To do',
              cards: [
                {
                  id: '1',
                  title: 'Draft plan',
                  description: 'Write outline',
                  tag: 'info',
                },
                { id: '2', title: 'Collect feedback' },
              ],
            },
            {
              id: 'progress',
              title: 'In progress',
              cards: [
                {
                  id: '3',
                  title: 'Build demo',
                  description: 'Wire the components',
                  tag: 'warning',
                },
              ],
            },
            {
              id: 'done',
              title: 'Done',
              cards: [
                { id: '4', title: 'Setup repo', tag: 'success' },
                { id: '5', title: 'CI pipeline', tag: 'success' },
              ],
            },
          ]}
        />
      </OrganismSection>
      <OrganismSection title="ComparisonSection" index={48}>
        <ComparisonSection
          title="Compare plans"
          description="Free versus Pro at a glance."
          columns={[{ title: 'Free' }, { title: 'Pro', featured: true }]}
          rows={[
            { label: 'Projects', values: ['1', 'Unlimited'] },
            { label: 'Support', values: ['Community', 'Priority'] },
            { label: 'Analytics', values: ['7 days', 'Unlimited'] },
          ]}
        />
      </OrganismSection>
      <OrganismSection title="ProcessSection" index={49}>
        <ProcessSection
          title="How it works"
          steps={[
            { id: 'a', title: 'Plan', description: 'Define the scope' },
            { id: 'b', title: 'Design', description: 'Prototype the UI' },
            { id: 'c', title: 'Build', description: 'Implement the screens' },
            { id: 'd', title: 'Ship', description: 'Deploy to production' },
          ]}
          current="b"
        />
      </OrganismSection>
      <OrganismSection title="QuoteSection" index={50}>
        <QuoteSection
          quote="The best interface is the one your users never have to think about."
          author="Ada Lovelace"
          role="Staff Engineer"
          avatar={
            <div className="avatar placeholder">
              <div className="bg-primary text-primary-content h-8 w-8 rounded-full">
                <span>AL</span>
              </div>
            </div>
          }
        />
      </OrganismSection>
      <OrganismSection title="ShowcaseSection" index={51}>
        <ShowcaseSection
          title="Selected work"
          items={[
            {
              id: 'a',
              title: 'Admin portal',
              description: 'Real-time analytics',
              image: '/gallery-1.png',
            },
            {
              id: 'b',
              title: 'Mobile app',
              description: 'Cross-platform experience',
              image: '/gallery-2.png',
            },
            {
              id: 'c',
              title: 'Design system',
              description: 'Scalable components',
              image: '/gallery-3.png',
            },
          ]}
        />
      </OrganismSection>
      <OrganismSection title="VideoSection" index={52}>
        <div className="mx-auto w-full max-w-2xl">
          <VideoSection title="Product demo" videoId="dQw4w9WgXcQ" />
        </div>
      </OrganismSection>
      <OrganismSection title="ProductGrid" index={53}>
        <ProductGrid
          title="Best sellers"
          items={[
            {
              id: 'a',
              name: 'T-shirt',
              price: '$24',
              description: 'Organic cotton',
              rating: 4.8,
              badge: 'Popular',
            },
            {
              id: 'b',
              name: 'Hoodie',
              price: '$49',
              description: 'Fleece lined',
              rating: 4.6,
            },
            {
              id: 'c',
              name: 'Cap',
              price: '$19',
              description: 'Adjustable',
              rating: 4.9,
              badge: 'New',
            },
          ]}
        />
      </OrganismSection>
      <OrganismSection title="Leaderboard" index={54}>
        <Leaderboard
          title="Top contributors"
          entries={[
            { id: 'a', name: 'Ada Lovelace', score: 1280 },
            { id: 'b', name: 'Grace Hopper', score: 1040 },
            { id: 'c', name: 'Katherine Johnson', score: 920 },
            { id: 'd', name: 'Alan Turing', score: 610 },
          ]}
        />
      </OrganismSection>
      <OrganismSection title="TestimonialGrid" index={55}>
        <TestimonialGrid
          title="Loved by teams"
          testimonials={[
            {
              id: 'a',
              quote: 'Shipped our redesign in two weeks.',
              author: 'Grace Hopper',
              role: 'CTO',
            },
            {
              id: 'b',
              quote: 'The components are beautifully typed.',
              author: 'Linus Torvalds',
              role: 'Founder',
            },
            {
              id: 'c',
              quote: 'Our whole team adopted it in a day.',
              author: 'Katherine Johnson',
              role: 'Product lead',
            },
          ]}
        />
      </OrganismSection>
    </div>
  );
};

OrganismsLevel.displayName = 'OrganismsLevel';
