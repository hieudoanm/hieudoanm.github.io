import { render, screen } from '@testing-library/react';
import NotFoundPage from '@/app/not-found';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

jest.mock('@/components/templates/NotFoundTemplate', () => ({
  NotFoundTemplate: ({ description, action }: { description: string; action: React.ReactNode }) => (
    <div>
      <span>404</span>
      <p>{description}</p>
      {action}
    </div>
  ),
}));

describe('NotFoundPage', () => {
  it('renders the not found template', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders go home link', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('Go home')).toHaveAttribute('href', '/');
  });
});
