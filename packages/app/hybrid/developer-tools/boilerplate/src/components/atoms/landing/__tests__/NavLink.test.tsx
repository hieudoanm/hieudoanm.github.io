import { render, screen } from '@testing-library/react';
import { NavLink } from '../NavLink';

describe('NavLink', () => {
  it('renders the label with the href', () => {
    render(<NavLink label="Pricing" href="/pricing" />);
    const link = screen.getByRole('link', { name: 'Pricing' });
    expect(link).toHaveAttribute('href', '/pricing');
  });

  it('marks the active link with aria-current', () => {
    render(<NavLink label="Home" href="/" active />);
    const link = screen.getByRole('link', { name: 'Home' });
    expect(link).toHaveAttribute('aria-current', 'page');
    expect(link).toHaveClass('text-primary');
  });

  it('omits aria-current when inactive', () => {
    render(<NavLink label="Docs" href="/docs" />);
    expect(screen.getByRole('link', { name: 'Docs' })).not.toHaveAttribute(
      'aria-current'
    );
  });
});
