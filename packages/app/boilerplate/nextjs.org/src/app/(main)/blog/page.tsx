import { BlogListTemplate } from '@/components/templates/blog';

const mockPosts = [
  {
    slug: 'getting-started',
    title: 'Getting Started with Modern Web Development',
    description:
      'A comprehensive guide to building modern web applications with the latest tools and frameworks.',
    content:
      '## Introduction\n\nModern web development has evolved significantly over the past decade.\n\n## Getting Started\n\nThis is a sample blog post used for previewing the BlogTemplate component.',
    date: '2024-01-15',
    author: 'Jane Doe',
    tags: ['Web Development', 'JavaScript', 'React'],
    coverImage:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop',
    readingTime: 8,
  },
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

const BlogIndex = () => <BlogListTemplate posts={mockPosts} />;

export default BlogIndex;
