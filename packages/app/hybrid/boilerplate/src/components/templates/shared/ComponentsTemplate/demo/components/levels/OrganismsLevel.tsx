import type { FC, ReactNode } from 'react';
import {
  FiBell,
  FiHome,
  FiLock,
  FiMail,
  FiSearch,
  FiUser,
} from 'react-icons/fi';
import {
  DataTable,
  FeatureGrid,
  Footer,
  Header,
  Navbar,
  PricingSection,
  Sidebar,
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

export const OrganismsLevel: FC = () => (
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
          footer={<span className="text-base-content/50 text-sm">v1.0.0</span>}
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
  </div>
);

OrganismsLevel.displayName = 'OrganismsLevel';
