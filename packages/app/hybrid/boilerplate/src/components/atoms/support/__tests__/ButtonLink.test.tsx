import { render, screen } from '@testing-library/react';
import { ButtonLink } from '../ButtonLink';

describe('ButtonLink', () => {
  it('renders a link with button classes and href', () => {
    render(
      <ButtonLink href="/signup" variant="outline" size="sm">
        Sign up
      </ButtonLink>
    );
    const link = screen.getByRole('link', { name: 'Sign up' });
    expect(link).toHaveAttribute('href', '/signup');
    expect(link).toHaveClass('btn', 'btn-outline', 'btn-sm');
  });
});
