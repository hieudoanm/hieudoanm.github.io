import { render, screen } from '@testing-library/react';
import { NotFoundTemplate } from '../NotFoundTemplate';

describe('NotFoundTemplate', () => {
  it('renders the app title', () => {
    render(<NotFoundTemplate />);
    expect(screen.getByText('Menu')).toBeInTheDocument();
  });

  it('renders 404 error code', () => {
    render(<NotFoundTemplate />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<NotFoundTemplate />);
    expect(
      screen.getByText('The page you are looking for does not exist.')
    ).toBeInTheDocument();
  });

  it('renders go home link', () => {
    render(<NotFoundTemplate />);
    const links = screen.getAllByRole('link');
    const homeLink = links.find((l) => l.textContent?.includes('Go home'));
    expect(homeLink).toBeDefined();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('renders back link to home', () => {
    render(<NotFoundTemplate />);
    const links = screen.getAllByRole('link');
    const backLink = links.find((l) => l.getAttribute('href') === '/');
    expect(backLink).toBeDefined();
  });
});
