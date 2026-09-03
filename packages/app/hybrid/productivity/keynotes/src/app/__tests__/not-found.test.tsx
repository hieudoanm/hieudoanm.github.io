import { render, screen } from '@testing-library/react';
import NotFound from '@/app/not-found';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('NotFound', () => {
  it('renders 404', () => {
    render(<NotFound />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders back home link', () => {
    render(<NotFound />);
    expect(screen.getByText('Back home')).toHaveAttribute('href', '/');
  });
});
