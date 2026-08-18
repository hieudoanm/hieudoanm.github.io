import { render, screen } from '@testing-library/react';
import ForbiddenPage from '@/app/(templates)/auth/forbidden/page';

describe('ForbiddenPage', () => {
  it('renders the 403 page', () => {
    render(<ForbiddenPage />);
    expect(screen.getByText('Error 403')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Go home' })).toHaveAttribute(
      'href',
      '/'
    );
  });
});
