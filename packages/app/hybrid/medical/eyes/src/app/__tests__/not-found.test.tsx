import { render, screen } from '@testing-library/react';
import NotFoundPage from '@/app/not-found';

describe('NotFoundPage', () => {
  it('renders the 404 template with a home link', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(
      screen.getByText('The page you are looking for does not exist.')
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Go home' })).toHaveAttribute(
      'href',
      '/'
    );
  });
});
