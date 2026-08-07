import { render, screen } from '@testing-library/react';
import { LinkButton } from '../LinkButton';

describe('LinkButton', () => {
  it('renders a link with the given href', () => {
    render(<LinkButton href="/about">About</LinkButton>);
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute(
      'href',
      '/about'
    );
  });

  it('applies variant and size classes', () => {
    render(
      <LinkButton href="/about" variant="outline" size="sm">
        About
      </LinkButton>
    );
    expect(screen.getByRole('link', { name: 'About' })).toHaveClass(
      'btn',
      'btn-outline',
      'btn-sm'
    );
  });
});
