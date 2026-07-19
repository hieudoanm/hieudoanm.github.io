import { render, screen } from '@testing-library/react';
import { AuthorBio } from '../AuthorBio';

describe('AuthorBio', () => {
  it('renders name, role and bio', () => {
    render(
      <AuthorBio
        name="Jane Doe"
        role="Staff Writer"
        bio="Writes about web development."
      />
    );
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Staff Writer')).toBeInTheDocument();
    expect(
      screen.getByText('Writes about web development.')
    ).toBeInTheDocument();
  });

  it('shows the avatar fallback initial when no avatar is provided', () => {
    render(<AuthorBio name="Jane Doe" bio="Bio" />);
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('renders social links when provided', () => {
    render(
      <AuthorBio
        name="Jane Doe"
        bio="Bio"
        socials={[
          { label: 'Twitter', href: 'https://twitter.com/jane' },
          { label: 'GitHub', href: 'https://github.com/jane' },
        ]}
      />
    );
    expect(screen.getByRole('link', { name: 'Twitter' })).toHaveAttribute(
      'href',
      'https://twitter.com/jane'
    );
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/jane'
    );
  });
});
