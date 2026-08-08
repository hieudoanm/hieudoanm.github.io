import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import type { FC } from 'react';

interface TemplateEntry {
  name: string;
  group: string;
  description: string;
  href: string;
}

const TEMPLATES: TemplateEntry[] = [
  {
    name: 'Dashboard',
    group: 'App',
    description: 'Overview dashboard with stats',
    href: '/dashboard',
  },
  {
    name: 'Analytics',
    group: 'App',
    description: 'Charts and traffic insights',
    href: '/analytics',
  },
  {
    name: 'Inbox',
    group: 'Mail',
    description: 'Email list and threads',
    href: '/mail/inbox',
  },
  {
    name: 'Tickets',
    group: 'Support',
    description: 'Support queue and ticket detail',
    href: '/support/tickets',
  },
  {
    name: 'People',
    group: 'HR',
    description: 'Employee directory',
    href: '/hr/people',
  },
  {
    name: 'Deals',
    group: 'CRM',
    description: 'Sales pipeline and deals',
    href: '/crm/deals',
  },
  {
    name: 'Catalog',
    group: 'Learning',
    description: 'Course catalog',
    href: '/learning/catalog',
  },
  {
    name: 'Now Playing',
    group: 'Music',
    description: 'Player and queue',
    href: '/music/now-playing',
  },
  {
    name: 'Home',
    group: 'Streaming',
    description: 'Streaming home with rows',
    href: '/streaming/home',
  },
  {
    name: 'Leaderboards',
    group: 'Gaming',
    description: 'Player rankings',
    href: '/gaming/leaderboards',
  },
  {
    name: 'Standings',
    group: 'Sports',
    description: 'League standings table',
    href: '/sports/standings',
  },
  {
    name: 'Destinations',
    group: 'Travel',
    description: 'Travel destinations grid',
    href: '/travel/destinations',
  },
  {
    name: 'Restaurants',
    group: 'Food',
    description: 'Restaurant discovery',
    href: '/food/restaurants',
  },
  {
    name: 'Dashboard',
    group: 'Health',
    description: 'Health and fitness overview',
    href: '/health/dashboard',
  },
  {
    name: 'Listings',
    group: 'Real Estate',
    description: 'Property listings',
    href: '/real-estate/listings',
  },
  {
    name: 'Overview',
    group: 'Portfolio',
    description: 'Investment portfolio',
    href: '/portfolio/overview',
  },
  {
    name: 'Landing',
    group: 'Marketing',
    description: 'Marketing landing page',
    href: '/landing',
  },
  {
    name: 'Pricing',
    group: 'Marketing',
    description: 'Pricing plans',
    href: '/pricing',
  },
  {
    name: 'Sign In',
    group: 'Auth',
    description: 'Authentication form',
    href: '/sign-in',
  },
];

export const TemplatesLevel: FC = () => (
  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    {TEMPLATES.map((template, index) => (
      <div
        key={`${template.group}-${template.name}`}
        className="card bg-base-200 border-base-content/10 animate-atomic-in border"
        style={{ animationDelay: `${index * 50}ms` }}>
        <div className="card-body">
          <span className="text-base-content/50 font-mono text-xs uppercase">
            {template.group} template
          </span>
          <h3 className="card-title text-lg">{template.name}</h3>
          <p className="text-base-content/50 text-sm">{template.description}</p>
          <div className="card-actions mt-2">
            <Link
              href={template.href}
              className="btn btn-primary btn-sm gap-2"
              aria-label={`Open ${template.name} template`}>
              Open template
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>
    ))}
  </div>
);

TemplatesLevel.displayName = 'TemplatesLevel';
