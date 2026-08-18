import { render, screen } from '@testing-library/react';
import { Header } from '../Header';

jest.mock('next/link', () => {
  const MockLink = ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
  MockLink.displayName = 'MockLink';
  return { __esModule: true, default: MockLink };
});

describe('Header', () => {
  it('renders MEMORY GAMES link', () => {
    render(<Header />);
    expect(screen.getByText('MEMORY GAMES')).toHaveAttribute('href', '/');
  });

  it('renders ABOUT link', () => {
    render(<Header />);
    expect(screen.getByText('ABOUT')).toHaveAttribute('href', '/about');
  });

  it('has displayName', () => {
    expect(Header.displayName).toBe('Header');
  });
});
