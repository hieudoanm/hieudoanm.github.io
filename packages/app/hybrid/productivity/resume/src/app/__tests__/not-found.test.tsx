import { render, screen } from '@testing-library/react';
import NotFound from '../not-found';

describe('NotFound', () => {
  it('renders 404 and go home link', () => {
    render(<NotFound />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /go home/i })).toBeInTheDocument();
  });
});
