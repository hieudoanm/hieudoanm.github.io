import { fireEvent, render, screen } from '@testing-library/react';
import BlogIndex from '../page';
import BlogPost, { generateStaticParams } from '../[slug]/page';
import BlogLoading from '../loading';

jest.mock('next/navigation', () => ({
  notFound: () => {
    throw new Error('NEXT_NOT_FOUND');
  },
}));

describe('BlogIndex', () => {
  it('renders the list of posts', () => {
    render(<BlogIndex />);
    expect(
      screen.getByText('Getting Started with Modern Web Development')
    ).toBeInTheDocument();
    expect(screen.getByText('Tailwind CSS Best Practices')).toBeInTheDocument();
  });

  it('filters posts by tag', () => {
    render(<BlogIndex />);
    fireEvent.click(screen.getByRole('button', { name: 'Tailwind CSS' }));
    expect(screen.getByText('Tailwind CSS Best Practices')).toBeInTheDocument();
    expect(
      screen.queryByText('Getting Started with Modern Web Development')
    ).not.toBeInTheDocument();
  });

  it('clears the tag filter', () => {
    render(<BlogIndex />);
    fireEvent.click(screen.getByRole('button', { name: 'React' }));
    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(
      screen.getByText('Getting Started with Modern Web Development')
    ).toBeInTheDocument();
  });
});

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

describe('BlogLoading', () => {
  it('renders skeleton placeholders', () => {
    const { container } = render(<BlogLoading />);
    expect(container.querySelectorAll('.animate-pulse').length).toBeGreaterThan(
      0
    );
  });
});
