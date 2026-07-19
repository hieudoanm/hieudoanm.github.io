import { notFound } from 'next/navigation';
import {
  BlogItemTemplate,
  type BlogPostData,
} from '@/components/templates/blog';

const posts: BlogPostData[] = [
  {
    slug: 'getting-started',
    title: 'Getting Started with Modern Web Development',
    description:
      'A comprehensive guide to building modern web applications with the latest tools and frameworks.',
    content:
      '## Introduction\n\nModern web development has evolved significantly over the past decade. With the advent of new frameworks, tools, and best practices, building web applications has become both more powerful and more complex.\n\n## Getting Started\n\nThis is a sample blog post used for previewing the BlogTemplate component. It demonstrates how content is rendered with headings, paragraphs, and other formatting.\n\n## Conclusion\n\nModern web development offers incredible opportunities for building rich, interactive experiences.',
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
    content:
      '## Advanced Patterns\n\nReact offers several advanced patterns for building reusable and composable components. This post covers render props, compound components, and custom hooks.',
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
    content:
      '## Best Practices\n\nTailwind CSS is a utility-first CSS framework that enables rapid UI development. This guide covers organization, responsive design, and performance optimization.',
    date: '2024-01-05',
    author: 'John Smith',
    tags: ['Tailwind CSS', 'Web Development'],
    readingTime: 6,
  },
];

const recentPosts = posts.map(({ slug, title, date }) => ({
  slug,
  title,
  date,
}));

const BlogPost = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();
  return <BlogItemTemplate post={post} recentPosts={recentPosts} />;
};

export function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }));
}

export default BlogPost;
