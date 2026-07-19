import { render, screen } from '@testing-library/react';
import { BlogSection } from '../BlogSection';

jest.mock('next/link', () => {
  return ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  );
});

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const { usePathname } = jest.requireMock('next/navigation');

describe('BlogSection', () => {
  const posts = [
    {
      id: '1',
      title: 'Announcing v2',
      excerpt: 'Big release.',
      date: 'Jan 2026',
      tag: 'Release',
    },
    { id: '2', title: 'How we test' },
  ];

  it('renders posts with tag, excerpt, and date', () => {
    render(<BlogSection posts={posts} />);
    expect(screen.getByText('Latest posts')).toBeInTheDocument();
    expect(screen.getByText('Announcing v2')).toBeInTheDocument();
    expect(screen.getByText('Big release.')).toBeInTheDocument();
    expect(screen.getByText('Jan 2026')).toBeInTheDocument();
    expect(screen.getByText('Release')).toBeInTheDocument();
  });

  it('renders posts without optional fields', () => {
    render(<BlogSection posts={posts} title="Updates" />);
    expect(screen.getByText('Updates')).toBeInTheDocument();
    expect(screen.getByText('How we test')).toBeInTheDocument();
    expect(screen.getByText('Jan 2026').tagName).toBe('TIME');
  });
});
