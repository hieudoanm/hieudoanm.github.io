import { render, screen } from '@testing-library/react';
import { PageShell } from '../PageShell';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}));

describe('PageShell', () => {
  it('renders title, subtitle, and children', () => {
    render(
      <PageShell title="Dashboard" subtitle="Overview">
        Content
      </PageShell>
    );
    expect(
      screen.getByRole('heading', { name: 'Dashboard' })
    ).toBeInTheDocument();
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders back link and header action', () => {
    render(
      <PageShell
        title="Dashboard"
        backHref="/"
        headerAction={<button>Go</button>}>
        Content
      </PageShell>
    );
    expect(screen.getByText('Go')).toBeInTheDocument();
    expect(document.querySelector('a[href="/"]')).toBeInTheDocument();
  });

  it('renders nav items and applies custom className', () => {
    render(
      <PageShell
        title="Dashboard"
        className="custom"
        navItems={[{ label: 'Home', href: '/' }]}>
        Content
      </PageShell>
    );
    expect(screen.getByRole('link', { name: /Home/ })).toBeInTheDocument();
    expect(document.querySelector('.custom')).toBeInTheDocument();
  });

  it('does not render nav without items', () => {
    render(<PageShell title="Dashboard">Content</PageShell>);
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });
});
