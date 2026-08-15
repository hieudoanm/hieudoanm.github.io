import { render, screen } from '@testing-library/react';
import NotFoundPage from '../not-found';

describe('NotFoundPage', () => {
  it('renders not-found variant with default message', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  it('links home', () => {
    render(<NotFoundPage />);
    expect(screen.getByRole('link', { name: /Go home/ })).toHaveAttribute(
      'href',
      '/'
    );
  });
});
