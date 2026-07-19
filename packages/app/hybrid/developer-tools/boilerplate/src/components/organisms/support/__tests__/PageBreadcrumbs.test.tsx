import { render, screen } from '@testing-library/react';
import { PageBreadcrumbs } from '../PageBreadcrumbs';

jest.mock('next/link', () => {
  return ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  );
});

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const { usePathname } = jest.requireMock('next/navigation');

describe('PageBreadcrumbs', () => {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Settings' },
  ];

  it('renders breadcrumbs with links and a current page', () => {
    render(
      <PageBreadcrumbs
        items={items}
        title="Project settings"
        description="Manage preferences"
      />
    );
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute(
      'href',
      '/'
    );
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute(
      'href',
      '/projects'
    );
    expect(screen.getByText('Settings')).toHaveAttribute(
      'aria-current',
      'page'
    );
    expect(screen.getByText('Project settings')).toBeInTheDocument();
    expect(screen.getByText('Manage preferences')).toBeInTheDocument();
  });

  it('renders actions', () => {
    render(
      <PageBreadcrumbs
        items={items}
        title="Settings"
        actions={<button>Save</button>}
      />
    );
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });
});
