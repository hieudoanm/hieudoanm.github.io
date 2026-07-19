import { render, screen } from '@testing-library/react';
import BlogPost, {
  generateStaticParams,
} from '@/app/(templates)/blog/[slug]/page';

jest.mock('next/navigation', () => ({
  notFound: () => {
    throw new Error('NEXT_NOT_FOUND');
  },
}));

describe('BlogPost', () => {
  it('renders a post for a valid slug', async () => {
    const element = await BlogPost({
      params: Promise.resolve({ slug: 'getting-started' }),
    });
    render(element);
    expect(
      screen.getByText('Getting Started with Modern Web Development')
    ).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  it('calls notFound for an unknown slug', async () => {
    await expect(
      BlogPost({ params: Promise.resolve({ slug: 'missing' }) })
    ).rejects.toThrow('NEXT_NOT_FOUND');
  });

  it('generates static params for each post', () => {
    expect(generateStaticParams()).toEqual([
      { slug: 'getting-started' },
      { slug: 'advanced-patterns' },
      { slug: 'styling-guide' },
    ]);
  });
});
