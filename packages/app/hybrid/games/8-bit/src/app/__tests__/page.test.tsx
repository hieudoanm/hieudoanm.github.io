import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('HomePage', () => {
  it('renders the 8-bit games heading', () => {
    render(<HomePage />);
    expect(screen.getByText('8-BIT GAMES')).toBeInTheDocument();
  });

  it('renders game links', () => {
    render(<HomePage />);
    expect(screen.getByText('MAZE')).toBeInTheDocument();
    expect(screen.getByText('SNAKE')).toBeInTheDocument();
    expect(screen.getByText('DINO RUN')).toBeInTheDocument();
    expect(screen.getByText('ROCK PAPER SCISSORS')).toBeInTheDocument();
  });

  it('links to correct routes', () => {
    render(<HomePage />);
    expect(screen.getByText('MAZE').closest('a')).toHaveAttribute('href', '/maze');
    expect(screen.getByText('SNAKE').closest('a')).toHaveAttribute('href', '/snake');
  });
});
