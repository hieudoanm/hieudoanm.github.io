import { render, screen } from '@testing-library/react';
import { ForbiddenTemplate } from '../ForbiddenTemplate';

describe('ForbiddenTemplate', () => {
  it('renders the 403 error page', () => {
    render(<ForbiddenTemplate />);
    expect(screen.getByText('Error 403')).toBeInTheDocument();
    expect(screen.getByText('403')).toBeInTheDocument();
    expect(
      screen.getByText('You do not have permission to access this page.')
    ).toBeInTheDocument();
    expect(screen.getByText('Access denied')).toBeInTheDocument();
  });

  it('links to home and support', () => {
    render(<ForbiddenTemplate />);
    expect(screen.getByRole('link', { name: 'Go home' })).toHaveAttribute(
      'href',
      '/'
    );
    expect(
      screen.getByRole('link', { name: 'Contact support' })
    ).toHaveAttribute('href', '/shared/about');
  });
});
