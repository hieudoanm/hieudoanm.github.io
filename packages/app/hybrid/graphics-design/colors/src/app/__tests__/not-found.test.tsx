import { render, screen } from '@testing-library/react';
import NotFoundPage from '../not-found';

describe('NotFoundPage', () => {
  it('renders the 404 error code and description', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(
      screen.getByText('The page you are looking for does not exist.')
    ).toBeInTheDocument();
  });

  it('renders a Go home link to the root', () => {
    render(<NotFoundPage />);
    expect(screen.getByRole('link', { name: 'Go home' })).toHaveAttribute(
      'href',
      '/'
    );
  });
});
