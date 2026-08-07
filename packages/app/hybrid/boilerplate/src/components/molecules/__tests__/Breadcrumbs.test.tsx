import { render, screen } from '@testing-library/react';
import { Breadcrumbs } from '../Breadcrumbs';

describe('Breadcrumbs', () => {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Settings', href: '/settings' },
    { label: 'Profile' },
  ];

  it('renders links for items with href', () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute(
      'href',
      '/'
    );
    expect(screen.getByRole('link', { name: 'Settings' })).toHaveAttribute(
      'href',
      '/settings'
    );
  });

  it('marks the last item as current page', () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByText('Profile')).toHaveAttribute('aria-current', 'page');
  });

  it('renders plain text for items without href', () => {
    render(<Breadcrumbs items={[{ label: 'Home' }, { label: 'Profile' }]} />);
    expect(screen.queryAllByRole('link')).toHaveLength(0);
  });
});
