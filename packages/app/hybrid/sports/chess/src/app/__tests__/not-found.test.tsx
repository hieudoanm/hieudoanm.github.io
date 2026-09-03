import { render, screen } from '@testing-library/react';
import NotFoundPage from '@/app/not-found';

describe('NotFoundPage', () => {
  it('renders 404', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders not found message', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('This chess tool does not exist.')).toBeInTheDocument();
  });

  it('renders back link', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('Back to chess')).toHaveAttribute('href', '/');
  });
});
