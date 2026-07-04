'use client';

import dynamic from 'next/dynamic';
import type { FC } from 'react';

const ChatTemplate = dynamic(
  () =>
    import('@hieudoanm.github.io/components/templates/app/ChatTemplate').then(
      (mod) => mod.ChatTemplate
    ),
  { ssr: false }
);
const DashboardTemplate = dynamic(
  () =>
    import('@hieudoanm.github.io/components/templates/app/DashboardTemplate').then(
      (mod) => mod.DashboardTemplate
    ),
  { ssr: false }
);
const MarketingTemplate = dynamic(
  () =>
    import('@hieudoanm.github.io/components/templates/landing/MarketingTemplate').then(
      (mod) => mod.MarketingTemplate
    ),
  { ssr: false }
);
const DownloadsTemplate = dynamic(
  () =>
    import('@hieudoanm.github.io/components/templates/landing/DownloadsTemplate').then(
      (mod) => mod.DownloadsTemplate
    ),
  { ssr: false }
);
const VersionTemplate = dynamic(
  () =>
    import('@hieudoanm.github.io/components/templates/app/VersionTemplate').then(
      (mod) => mod.VersionTemplate
    ),
  { ssr: false }
);
const PasswordForgetTemplate = dynamic(
  () =>
    import('@hieudoanm.github.io/components/templates/auth/PasswordForgetTemplate').then(
      (mod) => mod.PasswordForgetTemplate
    ),
  { ssr: false }
);
const PasswordResetTemplate = dynamic(
  () =>
    import('@hieudoanm.github.io/components/templates/auth/PasswordResetTemplate').then(
      (mod) => mod.PasswordResetTemplate
    ),
  { ssr: false }
);
const ProfileTemplate = dynamic(
  () =>
    import('@hieudoanm.github.io/components/templates/auth/ProfileTemplate').then(
      (mod) => mod.ProfileTemplate
    ),
  { ssr: false }
);
const SignInTemplate = dynamic(
  () =>
    import('@hieudoanm.github.io/components/templates/auth/SignInTemplate').then(
      (mod) => mod.SignInTemplate
    ),
  { ssr: false }
);
const SignUpTemplate = dynamic(
  () =>
    import('@hieudoanm.github.io/components/templates/auth/SignUpTemplate').then(
      (mod) => mod.SignUpTemplate
    ),
  { ssr: false }
);
const BlogTemplate = dynamic(
  () =>
    import('@hieudoanm.github.io/components/templates/blog/BlogTemplate').then(
      (mod) => mod.BlogTemplate
    ),
  { ssr: false }
);
const BlogsTemplate = dynamic(
  () =>
    import('@hieudoanm.github.io/components/templates/blog/BlogsTemplate').then(
      (mod) => mod.BlogsTemplate
    ),
  { ssr: false }
);
const ComponentsTemplate = dynamic(
  () =>
    import('@hieudoanm.github.io/components/templates/shared/ComponentsTemplate').then(
      (mod) => mod.ComponentsTemplate
    ),
  { ssr: false }
);
const ErrorTemplate = dynamic(
  () =>
    import('@hieudoanm.github.io/components/templates/shared/ErrorTemplate').then(
      (mod) => mod.ErrorTemplate
    ),
  { ssr: false }
);
const StoreFrontTemplate = dynamic(
  () =>
    import('@hieudoanm.github.io/components/templates/store/StoreFrontTemplate').then(
      (mod) => mod.StoreFrontTemplate
    ),
  { ssr: false }
);
const StoreItemTemplate = dynamic(
  () =>
    import('@hieudoanm.github.io/components/templates/store/StoreItemTemplate').then(
      (mod) => mod.StoreItemTemplate
    ),
  { ssr: false }
);

const mockPost = {
  slug: 'getting-started',
  title: 'Getting Started with Modern Web Development',
  description:
    'A comprehensive guide to building modern web applications with the latest tools and frameworks.',
  content: `## Introduction\n\nModern web development has evolved significantly over the past decade. With the advent of new frameworks, tools, and best practices, building web applications has become both more powerful and more complex.\n\n## Getting Started\n\nThis is a sample blog post used for previewing the BlogTemplate component. It demonstrates how content is rendered with headings, paragraphs, and other formatting.\n\n## Conclusion\n\nModern web development offers incredible opportunities for building rich, interactive experiences.`,
  date: '2024-01-15',
  author: 'Jane Doe',
  tags: ['Web Development', 'JavaScript', 'React'],
  coverImage:
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop',
  readingTime: 8,
};

const mockMeta = {
  totalPosts: 5,
  tags: [
    { name: 'Web Development', count: 3 },
    { name: 'JavaScript', count: 2 },
    { name: 'React', count: 1 },
    { name: 'TypeScript', count: 1 },
    { name: 'Tailwind CSS', count: 1 },
  ],
  recentPosts: [
    {
      slug: 'getting-started',
      title: 'Getting Started with Modern Web Development',
      date: '2024-01-15',
    },
    {
      slug: 'advanced-patterns',
      title: 'Advanced Patterns in React',
      date: '2024-01-10',
    },
    {
      slug: 'styling-guide',
      title: 'Tailwind CSS Best Practices',
      date: '2024-01-05',
    },
  ],
};

const mockPosts = [
  mockPost,
  {
    slug: 'advanced-patterns',
    title: 'Advanced Patterns in React',
    description:
      'Explore advanced React patterns including render props, compound components, and hooks.',
    content: 'Sample content for advanced React patterns.',
    date: '2024-01-10',
    author: 'Jane Doe',
    tags: ['React', 'JavaScript'],
    readingTime: 12,
  },
  {
    slug: 'styling-guide',
    title: 'Tailwind CSS Best Practices',
    description:
      'Learn how to effectively use Tailwind CSS in large-scale applications.',
    content: 'Sample content for Tailwind CSS best practices.',
    date: '2024-01-05',
    author: 'John Smith',
    tags: ['Tailwind CSS', 'Web Development'],
    readingTime: 6,
  },
];

const slugMap: Record<string, FC> = {
  'landing-marketing': () => <MarketingTemplate />,
  'landing-downloads': () => <DownloadsTemplate />,
  chat: () => <ChatTemplate />,
  dashboard: () => <DashboardTemplate />,
  version: () => <VersionTemplate version="2024.01.15.12.30.00" />,
  'sign-in': () => <SignInTemplate />,
  'sign-up': () => <SignUpTemplate />,
  profile: () => <ProfileTemplate />,
  'password-reset': () => <PasswordResetTemplate />,
  'password-forget': () => <PasswordForgetTemplate />,
  blog: () => <BlogTemplate post={mockPost} meta={mockMeta} />,
  blogs: () => <BlogsTemplate posts={mockPosts} meta={mockMeta} />,
  components: () => <ComponentsTemplate />,
  error: () => (
    <ErrorTemplate
      error={{ code: 404, message: 'Page Not Found' }}
      messages={[
        'Looks like you took a wrong turn.',
        'This page has gone on vacation.',
        'Nothing to see here.',
      ]}
    />
  ),
  store: () => <StoreFrontTemplate />,
  'store-item': () => <StoreItemTemplate />,
};

export const TemplateSlugClient = ({ slug }: { slug: string }) => {
  const Component = slugMap[slug];
  if (!Component) {
    return (
      <div className="bg-base-100 text-base-content flex min-h-screen items-center justify-center">
        <p className="text-base-content/60 text-sm">
          Template not found: {slug}
        </p>
      </div>
    );
  }
  return <Component />;
};
