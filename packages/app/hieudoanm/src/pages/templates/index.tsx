import { NextPage } from 'next';
import Link from 'next/link';
import { FC } from 'react';

interface TemplateCard {
  slug: string;
  name: string;
  description: string;
}

interface Category {
  title: string;
  templates: TemplateCard[];
}

const categories: Category[] = [
  {
    title: 'App',
    templates: [
      {
        slug: 'landing',
        name: 'LandingTemplate',
        description:
          'Marketing landing page with hero, features, pricing, testimonials',
      },
      {
        slug: 'chat',
        name: 'ChatTemplate',
        description: 'AI chat interface with sidebar, conversation management',
      },
      {
        slug: 'dashboard',
        name: 'DashboardTemplate',
        description: 'Admin dashboard with stats cards, activity feed',
      },
      {
        slug: 'version',
        name: 'VersionTemplate',
        description: 'Version display with copy-to-clipboard',
      },
      {
        slug: 'downloads',
        name: 'DownloadsTemplate',
        description: 'Download page for CLI, macOS, Ubuntu, Windows',
      },
    ],
  },
  {
    title: 'Auth',
    templates: [
      {
        slug: 'sign-in',
        name: 'SignInTemplate',
        description: 'Sign-in form with forgot password and sign-up links',
      },
      {
        slug: 'sign-up',
        name: 'SignUpTemplate',
        description: 'Registration form with sign-in link',
      },
      {
        slug: 'profile',
        name: 'ProfileTemplate',
        description: 'User profile with editable fields and danger zone',
      },
      {
        slug: 'password-reset',
        name: 'PasswordResetTemplate',
        description: 'Password reset form with token handling',
      },
      {
        slug: 'password-forget',
        name: 'PasswordForgetTemplate',
        description: 'Password forgot / email request form',
      },
    ],
  },
  {
    title: 'Blog',
    templates: [
      {
        slug: 'blog',
        name: 'BlogTemplate',
        description: 'Single blog post with sidebar and meta',
      },
      {
        slug: 'blogs',
        name: 'BlogsTemplate',
        description: 'Blog listing with tag filtering and sidebar',
      },
    ],
  },
  {
    title: 'Shared',
    templates: [
      {
        slug: 'components',
        name: 'ComponentsTemplate',
        description:
          'Design system showcase: buttons, forms, alerts, tables, modals',
      },
      {
        slug: 'error',
        name: 'ErrorTemplate',
        description: 'Error page with random messages and navigation',
      },
    ],
  },
  {
    title: 'Store',
    templates: [
      {
        slug: 'store',
        name: 'StoreFrontTemplate',
        description: 'Store front with product grid, categories, newsletter',
      },
      {
        slug: 'store-item',
        name: 'StoreItemTemplate',
        description: 'Single product detail with reviews and quantity',
      },
    ],
  },
];

const TemplateCard: FC<{ card: TemplateCard }> = ({ card }) => (
  <Link
    href={`/templates/${card.slug}`}
    className="card bg-base-200 border-base-300 hover:border-primary/50 border transition-all duration-200 hover:-translate-y-0.5">
    <div className="card-body p-5">
      <h3 className="card-title text-base">{card.name}</h3>
      <p className="text-base-content/60 text-xs leading-relaxed">
        {card.description}
      </p>
    </div>
  </Link>
);

const TemplatesIndex: NextPage = () => (
  <div className="bg-base-100 text-base-content min-h-screen px-6 py-16 md:px-12">
    <div className="mx-auto max-w-5xl">
      <div className="mb-12">
        <p className="text-primary mb-4 text-xs tracking-[0.2em] uppercase">
          Component Library
        </p>
        <h1 className="mb-3 font-serif text-4xl font-black tracking-tight">
          Templates
        </h1>
        <p className="text-base-content/60 max-w-lg text-sm leading-relaxed">
          Browse all available templates. Each template is a fully composed page
          component using atoms, molecules, and organisms.
        </p>
      </div>

      {categories.map((category) => (
        <section key={category.title} className="mb-12">
          <h2 className="mb-4 text-lg font-bold">{category.title}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {category.templates.map((card) => (
              <TemplateCard key={card.slug} card={card} />
            ))}
          </div>
        </section>
      ))}
    </div>
  </div>
);

export default TemplatesIndex;
