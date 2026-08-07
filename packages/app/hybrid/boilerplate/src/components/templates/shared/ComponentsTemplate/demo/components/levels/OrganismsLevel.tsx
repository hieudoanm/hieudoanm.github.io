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
  AnnouncementBar,
  AuthForm,
  BlogSection,
  ChatWindow,
  CommandMenu,
  ContactSection,
  CookieBanner,
  CTASection,
  DataTable,
  FAQSection,
  FeatureGrid,
  Footer,
  Header,
  Hero,
  LogosSection,
  Marquee,
  Navbar,
  NewsletterSection,
  PricingSection,
  ProfileCard,
  Sidebar,
  StatsGrid,
  TeamSection,
  TestimonialSection,
  Toolbar,
} from '../../../../../../organisms';
import { Button } from '../../../../../../atoms';

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
    </div>
  );
};

OrganismsLevel.displayName = 'OrganismsLevel';
