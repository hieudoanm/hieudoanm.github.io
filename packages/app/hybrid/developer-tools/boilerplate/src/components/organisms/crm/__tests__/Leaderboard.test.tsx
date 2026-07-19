import { render, screen } from '@testing-library/react';
import { Leaderboard } from '../Leaderboard';

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

describe('Leaderboard', () => {
  const entries = [
    { id: 'a', name: 'Alice', score: 10 },
    { id: 'b', name: 'Bob', score: 50 },
    { id: 'c', name: 'Carol', score: 30 },
  ];

  it('renders the title', () => {
    render(<Leaderboard title="Top" entries={entries} />);
    expect(screen.getByRole('heading', { name: 'Top' })).toBeInTheDocument();
  });

  it('sorts entries by descending score', () => {
    render(<Leaderboard entries={entries} />);
    const items = document.querySelectorAll('ol li');
    expect(items[0]).toHaveTextContent('Bob');
    expect(items[1]).toHaveTextContent('Carol');
    expect(items[2]).toHaveTextContent('Alice');
  });

  it('honors the limit prop', () => {
    render(<Leaderboard entries={entries} limit={2} />);
    expect(document.querySelectorAll('ol li')).toHaveLength(2);
  });

  it('shows medals for the top three', () => {
    render(<Leaderboard entries={entries} />);
    expect(screen.getByText('🥇')).toBeInTheDocument();
    expect(screen.getByText('🥈')).toBeInTheDocument();
    expect(screen.getByText('🥉')).toBeInTheDocument();
  });
});
