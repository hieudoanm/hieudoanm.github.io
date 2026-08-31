import { render, screen } from '@testing-library/react';
import NotFoundPage from '@/app/not-found';

describe('NotFoundPage', () => {
  it('renders 404 with home link', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Go home')).toHaveAttribute('href', '/');
  });
});
