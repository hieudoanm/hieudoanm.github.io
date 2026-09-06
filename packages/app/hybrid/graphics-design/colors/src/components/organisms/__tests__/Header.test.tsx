import { render, screen } from '@testing-library/react';
import { Header } from '../Header';

jest.mock('next/link', () => {
  const React = jest.requireActual<typeof import('react')>('react');
  return React.forwardRef<
    HTMLAnchorElement,
    React.HTMLAttributes<HTMLAnchorElement>
  >((props, ref) => <a ref={ref} {...props} />);
});

describe('Header', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the Colors logo text', () => {
    render(<Header />);
    expect(screen.getByText('Colors')).toBeInTheDocument();
  });

  it('renders About, Downloads, and Version nav links', () => {
    render(<Header />);
    const aboutLinks = screen.getAllByRole('link', { name: 'About' });
    expect(aboutLinks.length).toBeGreaterThanOrEqual(1);
    expect(aboutLinks[0]).toHaveAttribute('href', '/about');

    const downloadsLinks = screen.getAllByRole('link', { name: 'Downloads' });
    expect(downloadsLinks.length).toBeGreaterThanOrEqual(1);
    expect(downloadsLinks[0]).toHaveAttribute('href', '/downloads');

    const versionLinks = screen.getAllByRole('link', { name: 'Version' });
    expect(versionLinks.length).toBeGreaterThanOrEqual(1);
    expect(versionLinks[0]).toHaveAttribute('href', '/version');
  });

  it('renders the theme toggle button', () => {
    render(<Header />);
    expect(
      screen.getByRole('button', { name: 'Toggle theme' })
    ).toBeInTheDocument();
  });
});
