import { render, screen } from '@testing-library/react';
import { Header } from '../Header';

jest.mock('next/navigation', () => ({
  usePathname: () => '/about/',
}));

jest.mock('next/link', () => {
  const React = jest.requireActual<typeof import('react')>('react');
  return React.forwardRef<
    HTMLAnchorElement,
    React.HTMLAttributes<HTMLAnchorElement>
  >((props, ref) => <a ref={ref} {...props} />);
});

jest.mock('@/components/atoms/ThemeToggle', () => ({
  ThemeToggle: () => <button type="button" aria-label="Toggle theme" />,
}));

describe('Header', () => {
  it('renders the Colors logo text', () => {
    render(<Header />);
    expect(screen.getByText('Colors')).toBeInTheDocument();
  });

  it('renders About, Downloads, and Version nav links', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute(
      'href',
      '/about/'
    );
    expect(screen.getByRole('link', { name: 'Downloads' })).toHaveAttribute(
      'href',
      '/downloads/'
    );
    expect(screen.getByRole('link', { name: 'Version' })).toHaveAttribute(
      'href',
      '/version/'
    );
  });

  it('highlights the active link based on pathname', () => {
    render(<Header />);
    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink.className).toContain('font-semibold');
  });

  it('renders the ThemeToggle', () => {
    render(<Header />);
    expect(
      screen.getByRole('button', { name: 'Toggle theme' })
    ).toBeInTheDocument();
  });
});
