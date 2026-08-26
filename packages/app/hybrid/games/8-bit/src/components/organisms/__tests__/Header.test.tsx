import { render, screen } from '@testing-library/react';
import { Header } from '../Header';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

jest.mock('next/link', () => {
  const MockLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>;
  MockLink.displayName = 'MockLink';
  return MockLink;
});

describe('Header', () => {
  it('renders the app title', () => {
    render(<Header />);
    expect(screen.getByText('8-BIT GAMES')).toBeInTheDocument();
  });

  it('renders a link to home', () => {
    render(<Header />);
    const link = screen.getByText('8-BIT GAMES').closest('a');
    expect(link).toHaveAttribute('href', '/');
  });

  it('renders about link', () => {
    render(<Header />);
    expect(screen.getByText('ABOUT')).toBeInTheDocument();
  });
});
