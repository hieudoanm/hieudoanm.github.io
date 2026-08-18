import { render, screen } from '@testing-library/react';
import { SocialLinks } from '../SocialLinks';

describe('SocialLinks', () => {
  const items = [
    { platform: 'github' as const, href: 'https://github.com/x' },
    { platform: 'twitter' as const, href: 'https://twitter.com/x' },
  ];

  it('renders anchors with aria-labels', () => {
    render(<SocialLinks items={items} />);
    expect(screen.getByRole('link', { name: 'github' })).toHaveAttribute(
      'href',
      'https://github.com/x'
    );
    expect(screen.getByRole('link', { name: 'twitter' })).toHaveAttribute(
      'href',
      'https://twitter.com/x'
    );
  });

  it('uses a custom label', () => {
    render(
      <SocialLinks
        items={[{ platform: 'linkedin', href: 'https://linkedin.com/x' }]}
      />
    );
    expect(screen.getByRole('link', { name: 'linkedin' })).toBeInTheDocument();
  });

  it('applies the requested size class', () => {
    render(
      <SocialLinks items={[{ platform: 'github', href: '#' }]} size="lg" />
    );
    const icon = document.querySelector('span.h-5.w-5');
    expect(icon).toBeInTheDocument();
  });
});
