import { render, screen } from '@testing-library/react';
import RootLayout from '../layout';

jest.mock('@/providers/SWProvider', () => ({
  SWProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe('RootLayout', () => {
  it('renders children inside the SW provider', () => {
    render(<RootLayout>hello world</RootLayout>);
    expect(screen.getByText('hello world')).toBeInTheDocument();
  });

  it('sets the html theme and language attributes', () => {
    render(<RootLayout>content</RootLayout>);
    const html = document.documentElement;
    expect(html.getAttribute('data-theme')).toBe('code-light');
    expect(html.getAttribute('lang')).toBe('en');
  });

  it('links the apple touch icon', () => {
    render(<RootLayout>content</RootLayout>);
    const link = document.querySelector('link[rel="apple-touch-icon"]');
    expect(link).toHaveAttribute('href', '/icons/icon-192x192.png');
  });
});
