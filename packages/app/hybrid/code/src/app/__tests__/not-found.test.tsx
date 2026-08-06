import { render, screen } from '@testing-library/react';
import NotFound from '../not-found';

describe('NotFound page', () => {
  it('renders the 404 error page', () => {
    render(<NotFound />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Go home/i })).toBeInTheDocument();
  });
});
