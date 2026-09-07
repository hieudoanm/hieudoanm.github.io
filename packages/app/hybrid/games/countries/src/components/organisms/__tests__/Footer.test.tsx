import { render, screen } from '@testing-library/react';
import { buildBreadcrumbs, Footer } from '../Footer';

const mockUsePathname = jest.fn();

jest.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}));

describe('buildBreadcrumbs', () => {
  it('returns only Home for the root path', () => {
    expect(buildBreadcrumbs('/')).toEqual([{ href: '/', label: 'Home' }]);
  });

  it('builds nested crumbs from known labels', () => {
    expect(buildBreadcrumbs('/nyt/wordle')).toEqual([
      { href: '/', label: 'Home' },
      { href: '/nyt', label: 'NYT' },
      { href: '/nyt/wordle', label: 'Wordle' },
    ]);
  });

  it('humanizes unknown segments', () => {
    expect(buildBreadcrumbs('/some-page/deep')).toEqual([
      { href: '/', label: 'Home' },
      { href: '/some-page', label: 'Some Page' },
      { href: '/some-page/deep', label: 'Deep' },
    ]);
  });
});

describe('Footer', () => {
  it('links Home to the root route', () => {
    mockUsePathname.mockReturnValue('/about');
    render(<Footer />);
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
  });

  it('links intermediate crumbs and renders the current page as text', () => {
    mockUsePathname.mockReturnValue('/sort/continents');
    render(<Footer />);
    expect(screen.getByText('Sort').closest('a')).toHaveAttribute(
      'href',
      '/sort'
    );
    const current = screen.getByText('Continents Sort');
    expect(current.closest('a')).toBeNull();
  });
});
